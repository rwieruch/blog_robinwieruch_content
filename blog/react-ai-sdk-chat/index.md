---
title: "Full-Stack React.js Chat with AI SDK"
description: "Build a full-stack React.js AI chat application using the AI SDK by Vercel ..."
date: "2025-04-21T13:50:46+02:00"
categories: ["React"]
keywords: ["react.js ai sdk", "react.js ai", "react.js ai chat"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

In the previous guide, we built a streaming chat interface using the raw OpenAI API. It worked, but required a fair bit of manual work: decoding text streams, managing message state, and wiring everything together from scratch. That approach is great for learning, but in real-world projects, you often want something more ergonomic, robust, and reusable.

<LinkCollection label="This tutorial is part 2 of 2 in the series." links={[{ prefix: "Part 1:", label: "Full-Stack React.js AI Chat with OpenAI API", url: "/react-ai-chat/" }]} />

That's where the AI SDK comes in. It abstracts away the boilerplate and gives you a clean, developer-friendly interface for building chat UIs with streaming support out of the box, on both the server and client.

What You'll Learn
- How to install and configure the AI SDK
- How to replace your manual API route with a streaming one-liner
- How to simplify the frontend using useChat from @ai-sdk/react
- Why using the SDK can improve maintainability and developer experience

Let's start by installing the packages you'll need: one for working with OpenAI and another for the core AI SDK functionality:

```sh
// Command Line
npm install @ai-sdk/openai @ai-sdk/react ai
```

This gives you access to the OpenAI model bindings as well as utility functions like streamText.

Here's the magic: with just a few lines of code, you can handle streaming chat completions in your API route without manually managing the stream or setting response headers:

```ts
// src/app/api/chat/route.ts
import { openai } from "@ai-sdk/openai";
import { Message, streamText } from "ai";

type RequestData = {
  messages: Message[];
};

export async function POST(req: Request) {
  const { messages }: RequestData = await req.json();

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    system: "You are a helpful assistant.",
    messages,
  });

  return result.toDataStreamResponse();
}
```

With this, the SDK handles everything under the hood: it initiates the request, handles the stream, and returns a properly formatted text/event-stream response. No manual setup required.

To make the frontend just as elegant, we'll install the React integration package:

```sh
// Command Line
npm install @ai-sdk/react
```

This gives you access to `useChat`, a custom hook that handles message state, user input, and streaming updates automatically.

Previously, our UI had multiple useState hooks, a custom handleSubmit function, and logic for handling the incoming stream. Here's how all of that can now be replaced with useChat:

```tsx
// src/app/page.tsx
"use client";

import { useChat } from "@ai-sdk/react";

const Home = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Home;
```

With just a few lines, your component now supports full streaming chat behavior, input handling, message tracking, and real-time updates, all without the overhead of managing it yourself.

<Divider />

That's it! With the AI SDK, we've cut down the code dramatically, from dozens of lines across multiple files to just a few clean abstractions. Even better, we didn't lose any functionality, we gained maintainability, readability, and reusability.

This approach is great if you want to move fast, keep your codebase clean, and focus on the parts of your app that make it unique. In the next section, we'll look at ways to customize the behavior even further, like adding system prompts, handling errors, or styling the UI for production.