---
title: "LangChain: Structured Output with JavaScript"
description: "How to: Structured Output in JavaScript with LangChain. A step by step example on how to use structured data in JavaScript with LangChain ..."
date: "2025-01-27T08:52:46+02:00"
categories: ["LangChain"]
keywords: ["langchain javascript structured output"]
hashtags: ["#LangChain"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Let's learn about using **LangChain in JavaScript for structured output** responses from the backend to the frontend while building a chatbot application that interacts with the OpenAI API to generate responses to user prompts. In this tutorial we will be using Next.js (with React.js) for the frontend (UI) and backend (API). The finished project can be found on [GitHub](https://github.com/rwieruch/examples/tree/main/langchain-javascript-streaming).

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

Even though this would work without Zod, it's a good idea to use it to define a schema for the structured output, because it's the industry standard for schema validation in JavaScript. This way, you can also ensure that the response from the backend is in the expected format before using it in the frontend:

```sh
npm install zod
```

In a separate file, define the schema for the structured output. This schema will be used to format the structured output in the backend and to validate it in the frontend. In this example, when asking a question to the chatbot, the response will include an answer, a confidence level, and a source URL if available:

```ts
// src/chat-response-formatter.ts
import { z } from "zod";

export const chatResponseFormatterSchema = z.object({
  answer: z.string().describe("The answer to the user's question"),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe("Confidence level of the answer, ranging from 0 to 1"),
  source: z
    .string()
    .url()
    .optional()
    .describe("A URL pointing to the source of the information, if available"),
});
```

In the frontend, adjust the component to deal with the JavaScript object rather than a plain string. The component will display the answer, confidence level, and source URL if available:

```tsx{4-8,13-19}
// src/app/page.tsx
type ChatMessage = {
  isUser: boolean;
  text: {
    answer: string;
    confidence?: number;
    source?: string;
  };
};

const ChatMessageItem = ({ message }: { message: ChatMessage }) => {
  return (
    <div className="whitespace-pre-line border border-b-1 border-slate-400 p-2 m-2">
      <p>
        {message.isUser ? "You" : "Bot"}: {message.text.answer}{" "}
        {message.text.source && <a href={message.text.source}>(Source)</a>}
      </p>
      {message.text.confidence && <p>Confidence: {message.text.confidence}</p>}
    </div>
  );
};
```

Next adjust the handler function to parse the response from the backend using the schema defined with Zod. If the response is not in the expected format, the function will return early and do nothing. Optionally you could also show an error with [conditional rendering](/conditional-rendering-react/) if needed:

```ts{10-15,23,25,29}
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

  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });

  const result = chatResponseFormatterSchema.safeParse(await response.json());

  if (!result.success) return;

  setMessages((prevState) => [
    ...prevState,
    { isUser: false, text: result.data },
  ]);

  setIsLoading(false);
};
```

Do not forget to import the schema for the frontend:

```tsx{2}
// src/app/page.tsx
import { chatResponseFormatterSchema } from "@/chat-response-formatter";
```

Last we have to adjust the backend to parse the response from the OpenAI API using the schema defined with Zod. Here we can use LangChain's `StructuredOutputParser` with their `withStructuredOutput` method on the language model to parse the response from the OpenAI API. The response will be returned to the frontend in the expected format:

```ts{4,6,18-20,22}
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

  const result = await chain.invoke(input);

  return Response.json(result);
}
```

Congratulations! You've now implemented structured output in JavaScript with LangChain. You've learned how to use Zod to define a schema for the structured output, how to parse the response in the backend, and how to format the response in the frontend.

<ReadMore label="Learn Next.js" link="https://www.road-to-next.com/" />