---
title: "Selecting from Multiple Models (LLMs) with AI SDK in React.js"
description: "Build a multi-model chat interface using Next.js and the AI SDK by Vercel ..."
date: "2025-04-28T13:50:46+02:00"
categories: ["React"]
keywords: ["react.js ai sdk", "react.js ai", "react.js ai chat"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

AI models are evolving fast, and developers are increasingly looking for ways to integrate **multiple models** into their applications, giving users the flexibility to choose the one that best fits their needs.

<LinkCollection label="This tutorial is part 3 of 3 in the series." links={[{ prefix: "Part 1:", label: "Full-Stack React.js AI Chat with OpenAI API", url: "/react-ai-chat/" }, { prefix: "Part 2:", label: "Full-Stack React.js Chat with AI SDK", url: "/react-ai-sdk-chat/" }]} />

In this post, we'll walk through how to build a simple multi-model chat interface using Next.js and the [@ai-sdk](https://sdk.vercel.ai/) package, allowing users to **switch between different large language models (LLMs)** like OpenAI's GPT-4 Turbo and Anthropic's Claude 3.

<ReadMore label="Learn Next.js" link="https://www.road-to-next.com/" />

Let's start by setting up a configuration for handling multiple AI models. The idea is to create a single place where you define the models your app supports. This makes it easy to scale as new models become available:

```ts
// src/app/model.ts
import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";

const openaiModel = openai("gpt-4-turbo");
const anthropic35Model = anthropic("claude-3-5-sonnet-latest");
const anthropic37Model = anthropic("claude-3-7-sonnet-20250219");

export const MODELS = {
  "gpt-4-turbo": openaiModel,
  "claude-3-5-sonnet-latest": anthropic35Model,
  "claude-3-7-sonnet-20250219": anthropic37Model,
  // add more models as they become available
} as const;
```

Here, we're importing model definitions and creating a MODELS object that maps human-readable keys to model instances. This approach gives us flexibility to refer to models by their key in the UI and in our API logic.

This implementation already shows how the AI SDK allows you to use multiple models in a clean and efficient way, without needing to install separate SDKs for each one. It also shows how ["easy"](https://x.com/rwieruch/status/1894787009882800542) it becomes to add models to your project once they are available in the SDK.

Now that we have our models defined, let's move on to the client side. We'll have a React component that allows the user to select a model, send a message, and receive a response:

```tsx{4,6,11-12,24-28,30-41}
// src/app/page.tsx
"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { MODELS } from "@/app/model";

const Home = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [selectedModel, setSelectedModel] =
    useState<keyof typeof MODELS>("gpt-4-turbo");

  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
        </div>
      ))}

      <form
        onSubmit={(event) => {
          handleSubmit(event, {
            body: { model: selectedModel },
          });
        }}
      >
        <select
          value={selectedModel}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedModel(event.target.value as keyof typeof MODELS);
          }}
        >
          {Object.keys(MODELS).map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>

        <input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Home;
```

This component does a few things. First, it displays the conversation history, showing both user inputs and AI responses. It also allows users to select from the available models through a dropdown menu, updating the selected model in the component's state. Finally, it handles form submission, sending the selected model along with the user's input to the server for processing.

To support this on the backend, we need an API route that accepts the chat messages and the selected model, streams the AI response, and returns it to the client:

```ts{2,7,11,13,16}
// src/app/api/chat/route.ts
import { MODELS } from "@/app/model";
import { Message, streamText } from "ai";

type RequestData = {
  messages: Message[];
  model: keyof typeof MODELS;
};

export async function POST(req: Request) {
  const { messages, model: selectedModel }: RequestData = await req.json();

  const model = MODELS[selectedModel];

  const result = await streamText({
    model,
    system: "You are a helpful assistant.",
    messages,
  });

  return result.toDataStreamResponse();
}
```

This handler extracts the selected model and message history from the incoming request. It retrieves the appropriate model instance from the MODELS object and uses it to stream a response back to the client.

<Divider />

With these pieces in place, you have a simple but powerful chat application where users can experiment with different LLMs. As new models become available, all you need to do is update the MODELS object and the UI will automatically reflect the changes. This kind of flexibility is becoming increasingly important as the AI landscape diversifies. Whether you're building tools for internal teams or customer-facing apps, giving users the option to choose the right AI model can greatly enhance their experience.