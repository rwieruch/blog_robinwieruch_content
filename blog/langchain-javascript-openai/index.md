---
title: "LangChain: OpenAI in JavaScript with React.js & Next.js"
description: "How to: OpenAI in JavaScript with LangChain. A step by step example on how to use the OpenAI API in JavaScript with LangChain ..."
date: "2025-01-13T08:50:46+02:00"
categories: ["LangChain"]
keywords: ["langchain javascript openai"]
hashtags: ["#LangChain"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Let's learn about using **LangChain in JavaScript by using OpenAI's API** while building a chatbot application that interacts with the OpenAI API to generate responses to user prompts. In this tutorial we will be using Next.js (with React.js) for the frontend (UI) and backend (API). The finished project can be found on [GitHub](https://github.com/rwieruch/examples/tree/main/langchain-javascript-openai).

For the project setup you will need to go through the [Next.js installation](https://nextjs.org/docs/app/getting-started/installation).

<ReadMore label="Learn Next.js" link="https://www.road-to-next.com/" />

We will start with a set up for a React component. It includes an input field for entering prompts, a button to submit them, and a space to display messages exchanged between the user and the chatbot. The state variables `prompt`, `isLoading`, and `messages` will help manage the data and UI changes:

```tsx
// src/app/page.tsx
"use client";

import { useState } from "react";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    // TODO
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <ChatMessageItem key={index} message={message} />
        ))}
      </div>

      {isLoading && <p>Loading...</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
```

The `ChatMessageItem` component serves as reusable [function component](/react-function-component/) that displays individual messages. It takes a message object as a [prop](/react-pass-props-to-component/) and formats the output to indicate whether the message was sent by the user or generated by the bot:

```tsx
type ChatMessage = {
  isUser: boolean;
  text: string;
};

const ChatMessageItem = ({ message }: { message: ChatMessage }) => {
  return (
    <p className="whitespace-pre-line border border-b-1 border-slate-400 p-2 m-2">
      {message.isUser ? "You" : "Bot"}: {message.text}
    </p>
  );
};
```

The most important part of the chatbot application is the logic for [handling user input](/react-event-handler/) and bot responses. When the user submits a prompt, we first [prevent the default form behavior](/react-preventdefault/). Then, we reset the input field to be empty, set the loading state to `true`, and add the user's message to the messages array:

```tsx{2-7}
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  setIsLoading(true);
  setPrompt("");

  setMessages((prevState) => [...prevState, { isUser: true, text: prompt }]);

  // TODO
};
```

At this point, we are ready to integrate the backend API call to generate the bot's response. Therefore we send the user's prompt to the [server](/web-applications/) by making a HTTP POST request to the `/api/chat` endpoint in Next.js. This endpoint is responsible for processing the prompt and generating a response using the [OpenAI API](https://platform.openai.com/). Once the response is received, we'll process and display it later:

```tsx{9-12}
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  setIsLoading(true);
  setPrompt("");

  setMessages((prevState) => [...prevState, { isUser: true, text: prompt }]);

  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });

  // TODO
};
```

Before we can proceed, we will implement the server-side logic for handling chat interactions. We use LangChain's ChatOpenAI class to communicate with the OpenAI API. The `prompt` is received via the request body, and we use `SystemMessage` and `HumanMessage` classes to construct the conversation context. The result is parsed from an object to a string (see `StringOutputParser`) and returned to the UI:

```ts
// src/app/api/chat/route.ts
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export async function POST(req: Request) {
  const { prompt: input } = await req.json();

  const model = new ChatOpenAI();

  const prompt = ChatPromptTemplate.fromMessages([
    new SystemMessage("You're a helpful assistant"),
    new HumanMessage(input),
  ]);

  const parser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(parser);

  const result = await chain.invoke(input);

  return Response.json(result);
}
```

Before we can use [LangChain](https://www.langchain.com/) in JavaScript, we need to install the required packages. This command adds the core LangChain library and the OpenAI package, which contains the tools we need for integrating with OpenAI's models:

```sh
npm install @langchain/core @langchain/openai
```

The `.env` file stores your OpenAI API key securely. Never hard-code your API key directly into your application code, always use environment variables like this to protect sensitive information. Once you have your API key in the file, the `ChatOpenAI` constructor will automatically pick it up:

```sh
OPENAI_API_KEY="sk-proj-123abc"
```

Finally we can complete the `handleSubmit` function by processing the API's response. After sending the `prompt` to the backend, we parse the response and update the messages array with the bot's reply. Finally, we set the loading state back to `false` to indicate that the response has been received:

```tsx{9,11-12}
const handleSubmit = async (event: React.FormEvent) => {
  ...

  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });

  const result = await response.json();

  setMessages((prevState) => [...prevState, { isUser: false, text: result }]);
  setIsLoading(false);
};
```

Congratulations! You've now implemented a simple chatbot application using LangChain and OpenAI in JavaScript with the help of Next.js and React. This tutorial demonstrated how to set up the frontend, integrate with a backend API, and process responses from the OpenAI API. You can now experiment further by adding features like streaming responses, custom prompts, or improved error handling to enhance your chatbot.

<LinkCollection
  label="This tutorial is part 1 of 2 in this series."
  links={[
    {
      prefix: "Part 2:",
      label: "LangChain: Streaming in JavaScript",
      url: "/langchain-javascript-streaming/"
    },
  ]}
/>

<LinkCollection
  label="This tutorial is part 1 of 2 in this series."
  links={[
    {
      prefix: "Part 2:",
      label: "LangChain: Structured Data with JavaScript",
      url: "/langchain-javascript-structured/"
    },
  ]}
/>