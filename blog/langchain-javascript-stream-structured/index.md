---
title: "LangChain: Streaming Structured Output in JavaScript"
description: "How to: Streaming Structured Output in JavaScript with LangChain. A step by step example on how to stream structured data in JavaScript with LangChain ..."
date: "2025-02-10T08:53:46+02:00"
categories: ["LangChain"]
keywords: ["langchain javascript stream structured output"]
hashtags: ["#LangChain"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Let's learn about using **LangChain in JavaScript for streaming structured output** responses from the backend to the frontend while building a chatbot application that interacts with the OpenAI API to generate responses to user prompts. In this tutorial we will be using Next.js (with React.js) for the frontend (UI) and backend (API). The finished project can be found on [GitHub](https://github.com/rwieruch/examples/tree/main/langchain-javascript-stream-structured).

<ReadMore label="Learn Next.js" link="https://www.road-to-next.com/" />

<LinkCollection
  label="This tutorial is part 4 of 4 in this series."
  links={[
    {
      prefix: "Part 1:",
      label: "LangChain: OpenAI in JavaScript",
      url: "/langchain-javascript-openai/"
    },
    {
      prefix: "Part 2:",
      label: "LangChain: Streaming in JavaScript",
      url: "/langchain-javascript-streaming/"
    },
    {
      prefix: "Part 3:",
      label: "LangChain: Structured Output with JavaScript",
      url: "/langchain-javascript-structured/"
    },
  ]}
/>

When streaming structured data, we have to go from coarse-grained HTTP streaming to more fine-grained [Server-Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events). I tried everything to make it work without SSE, but wasn't able to make it work. So if you have a better solution, please let me know!

The API endpoint for streaming structured data is very similar to returning one instance for the structured output. The difference is that the backend has to use SSE to stream the structured output to the frontend:

```ts{24-27,29-31}
// src/app/api/chat/route.ts
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { chatResponseFormatterSchema } from "@/chat-response-formatter";

export async function POST(req: Request) {
  const { prompt: input } = await req.json();

  const model = new ChatOpenAI();

  const prompt = ChatPromptTemplate.fromMessages([
    new SystemMessage("You're a helpful assistant"),
    new HumanMessage(input),
  ]);

  const parser = StructuredOutputParser.fromZodSchema(
    chatResponseFormatterSchema
  );

  const chain = prompt.pipe(model.withStructuredOutput(parser));

  const stream = await chain.streamEvents(input, {
    version: "v2",
    encoding: "text/event-stream",
  });

  // stream() does not work with structured output
  // let me know if you find a way to make it work
  // const stream = await chain.stream(input);

  return new Response(stream, {
    headers: {
      Connection: "keep-alive",
      "Content-Encoding": "none",
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/event-stream; charset=utf-8",
    },
  });
}
```

Working with Server-Sent Events in the frontend is a bit more involved than with a regular HTTP request. We have to use the `EventSource` API to listen for incoming events from the server. The `EventSource` API is a browser API that allows you to open a connection to a server and receive events from it. However, we want to use the native fetch API in combination with SSE, so we resort to a library called [@microsoft/fetch-event-source](https://www.npmjs.com/package/@microsoft/fetch-event-source):

```sh
npm install @microsoft/fetch-event-source
```

Then we can use it the following way in the form submit handler:

```tsx{18-38,40}
// src/app/page.tsx
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  setIsLoading(true);
  setPrompt("");

  setMessages((prevState) => [
    ...prevState,
    {
      isUser: true,
      text: {
        answer: prompt,
      },
    },
  ]);

  await fetchEventSource("/api/chat", {
    method: "POST",
    body: JSON.stringify({ prompt }),
    onmessage: (message) => {
      if (message.event !== "data") return;

      const eventSourceMessage = JSON.parse(message.data);

      if (!eventSourceMessage.data.chunk) return;

      if (eventSourceMessage.event === "on_chain_stream") {
        setMessages((prevState) => [
          ...(prevState.at(-1)?.isUser ? prevState : prevState.slice(0, -1)),
          {
            isUser: false,
            text: eventSourceMessage.data.chunk,
          },
        ]);
      }
    },
  });

  setIsLoading(false);
};
```

Do not forget to import the new library in your frontend:

```tsx{2}
// src/app/page.tsx
import { fetchEventSource } from "@microsoft/fetch-event-source";
```

Congratulations! You have learned how to stream structured output in JavaScript with LangChain. If you want to learn more about LangChain, check out the [official documentation](https://js.langchain.com/).