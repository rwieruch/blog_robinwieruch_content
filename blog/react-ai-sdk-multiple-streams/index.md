---
title: "Streaming Multiple AI Models in Parallel with React.js and AI SDK"
description: "Build a multi-model chat interface using Next.js and the AI SDK by Vercel ..."
date: "2025-05-05T13:50:46+02:00"
categories: ["React"]
keywords: ["react.js ai sdk", "react.js ai", "react.js ai chat"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

With the growing number of large language models (LLMs) available, it's becoming more important for developers and users alike to compare how different models respond to the same prompts. Whether you're evaluating models for accuracy, speed, or style, being able to see their outputs side-by-side can help guide your decisions.

<LinkCollection label="This tutorial is part 3 of 3 in the series." links={[{ prefix: "Part 1:", label: "Full-Stack React.js AI Chat with OpenAI API", url: "/react-ai-chat/" }, { prefix: "Part 2:", label: "Full-Stack React.js Chat with AI SDK", url: "/react-ai-sdk-chat/" }]} />

In this post, we'll explore how to build a UI that sends the same input to multiple AI models at once and displays their responses in parallel using Next.js with the AI SDK by Vercel.

<ReadMore label="Learn Next.js" link="https://www.road-to-next.com/" />

We begin by creating a component that can handle user input and distribute it across multiple AI models. In this setup, we allow the user to enter a single prompt, which then gets submitted simultaneously to each model. The main component maps over all models and renders a ChatPerModel component for each, which handles its own responses:

```tsx
"use client";

import { useState } from "react";
import { MODELS } from "@/app/model";
import { ChatPerModel } from "@/components/chat-per-model";

const Home = () => {
  const [input, setInput] =
    useState<React.ChangeEvent<HTMLInputElement> | null>(null);

  const [prompt, setPrompt] = useState<React.FormEvent<HTMLFormElement> | null>(
    null
  );

  return (
    <div className="flex gap-4">
      {Object.keys(MODELS).map((key) => (
        <div key={key}>
          <h2>{key}</h2>
          <ChatPerModel model={key} input={input} prompt={prompt} />
        </div>
      ))}

      <form
        onSubmit={(event) => {
          event.preventDefault();

          setPrompt(event);
          setInput(null);
        }}
      >
        <input
          name="prompt"
          value={input?.target.value ?? ""}
          onChange={setInput}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
```

In this component, we store the input and form submission event in state, allowing us to pass them down to each ChatPerModel component. This design ensures that every model gets the same input at the same time, making it easy to compare responses. When the form is submitted, the prompt state triggers updates in all child components.

Each ChatPerModel component is responsible for managing its own conversation with a specific model. It listens for input and form submission events, syncing them with its internal chat state via useChat from @ai-sdk/react.

```tsx
import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";

type ChatPerModelProps = {
  model: string;
  input: React.ChangeEvent<HTMLInputElement> | null;
  prompt: React.FormEvent<HTMLFormElement> | null;
};

const ChatPerModel = ({ model, input, prompt }: ChatPerModelProps) => {
  const { messages, handleSubmit, handleInputChange } = useChat();

  //* Sync change handler with useChat

  useEffect(() => {
    if (!input) return;

    handleInputChange(input);
  }, [handleInputChange, input]);

  //* Sync submit handler with useChat

  const previousPrompt = useRef(prompt);

  useEffect(() => {
    if (!prompt) return;

    if (previousPrompt.current === prompt) return;
    previousPrompt.current = prompt;

    handleSubmit(prompt, {
      body: { model },
    });
  }, [handleSubmit, model, prompt]);

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
        </div>
      ))}
    </div>
  );
};

export { ChatPerModel };
```

This component leverages React's useEffect hook to synchronize the incoming input and prompt with the [useChat hook](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat). Whenever a new prompt is submitted, the effect triggers the chat request to the specified model, and its response is rendered in the UI. The use of useRef helps prevent duplicate submissions when the form hasn't actually changed.

What makes this setup powerful is how it allows you to visualize responses from different models at once. Each model runs independently, yet reacts to the same prompt. You can observe differences in language, detail, reasoning, or even tone—all without needing to refresh or manually switch between models. This pattern is especially useful when you're evaluating which model best suits your application's needs.

Moreover, this architecture is flexible. You can easily extend it to add more models by updating the MODELS object, and the UI will adapt accordingly. There's no need to write separate logic for each model, making the codebase maintainable and scalable.

<Divider />

This side-by-side comparison approach offers a practical way to evaluate multiple AI models within a single interface. By leveraging AI SDK and a state-driven React setup, you can quickly test and iterate on various prompts across different LLMs. Whether you're building an internal tool for model selection or just experimenting with what's possible, this method provides valuable insight into how models differ—and where they shine.