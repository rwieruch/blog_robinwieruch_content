---
title: "LangChain: Streaming in JavaScript with React.js & Next.js"
description: "How to: Streaming in JavaScript with LangChain. A step by step example on how to stream data in JavaScript with LangChain ..."
date: "2025-01-21T08:51:46+02:00"
categories: ["LangChain"]
keywords: ["langchain javascript streaming"]
hashtags: ["#LangChain"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Let's learn about using **LangChain in JavaScript for streaming** responses from the backend to the frontend while building a chatbot application that interacts with the OpenAI API to generate responses to user prompts. In this tutorial we will be using Next.js (with React.js) for the frontend (UI) and backend (API). The finished project can be found on [GitHub](https://github.com/rwieruch/examples/tree/main/langchain-javascript-streaming).

<ReadMore label="Learn Next.js" link="https://www.road-to-next.com/" />

<LinkCollection
  label="This tutorial is part 2 of 2 in this series."
  links={[
    {
      prefix: "Part 1:",
      label: "LangChain: OpenAI in JavaScript",
      url: "/langchain-javascript-openai/"
    },
  ]}
/>

We will continue with the previous OpenAI chatbot application and implement streaming responses from the backend to the frontend. We are already displaying the chat messages between user and bot in the frontend, now we add another state for the incoming message coming from the backend in real-time:

```tsx{7}
// src/app/page.tsx
const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [incomingMessage, setIncomingMessage] = useState("");

  ...
};
```

Next we are displaying the incoming message in the frontend below the previous chat messages:

```tsx{9-11}
// src/app/page.tsx
return (
  <div>
    <div>
      {messages.map((message, index) => (
        <ChatMessageItem key={index} message={message} />
      ))}

      {incomingMessage && (
        <ChatMessageItem message={{ isUser: false, text: incomingMessage }} />
      )}
    </div>

    {isLoading && <p>Loading...</p>}

    ...
  </div>
);
```

For the backend we have to adjust the API route to stream the response to the frontend. We are using the `Response` object to stream the response as an event stream and use `stream()` instead of `invoke()` to get the streamed response from LangChain:

```ts{15,17-24}
// src/app/api/chat/route.ts
export async function POST(req: Request) {
  const { prompt: input } = await req.json();

  const model = new ChatOpenAI();

  const prompt = ChatPromptTemplate.fromMessages([
    new SystemMessage("You're a helpful assistant"),
    new HumanMessage(input),
  ]);

  const parser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(parser);

  const result = await chain.stream(input);

  return new Response(result, {
    headers: {
      Connection: "keep-alive",
      "Content-Encoding": "none",
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/event-stream; charset=utf-8",
    },
  });
}
```

Last we have to adjust the handler in the frontend to handle the streamed response from the backend. We are using the `TextDecoderStream` to decode the streamed response and update the incoming message in the frontend. Once the response is fully streamed, we add the incoming message to the chat messages and reset the incoming message which has come in real-time:

```tsx{14-43}
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  setIsLoading(true);
  setPrompt("");

  setMessages((prevState) => [...prevState, { isUser: true, text: prompt }]);

  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });

  if (!response.body) return;

  const reader = response.body
    .pipeThrough(new TextDecoderStream())
    .getReader();

  if (reader) setIsLoading(false);

  let incomingMessage = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      setMessages((prevState) => [
        ...prevState,
        { isUser: false, text: incomingMessage },
      ]);

      setIncomingMessage("");

      break;
    }

    if (value) {
      incomingMessage += value;

      setIncomingMessage(incomingMessage);
    }
  }
};
```

Congratulations! You've now implemented a real-time chatbot application using LangChain and OpenAI in JavaScript with the help of Next.js and React. This tutorial demonstrated how responses can be streamed from the backend to the frontend, providing a more interactive user experience.

<ReadMore label="Learn Next.js" link="https://www.road-to-next.com/" />