---
title: "React.js AI Chat with OpenAI API"
description: "Build a simple AI chat app using React.js on Next.js and the OpenAI API ..."
date: "2025-04-14T13:50:46+02:00"
categories: ["React"]
keywords: ["react.js openai", "react.js ai", "react.js ai chat"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

In this tutorial, you'll build a simple AI chat app using React.js on Next.js and the OpenAI API. You'll learn how to set up an API route to send prompts to OpenAI and build a frontend that displays the conversation in real time. By the end, you'll have a working full-stack AI application that you can expand upon.

In addition, we will also learn how to stream responses from OpenAI, making the chat feel more interactive and responsive. This is a great way to enhance user experience and make your application feel more alive.

In this tutorial we will implement everything from scratch, but later we will make a case for using AI SDK that simplifies the process of building AI applications in JavaScript.

Before diving into the code, you need to set up your development environment with Next.js, the React-based framework we're using for this project. Follow the official [Next.js installation](https://nextjs.org/docs/app/getting-started/installation) guide to get started. This will ensure that you can write backend code with Next.js for your React application

<ReadMore label="Learn Next.js" link="https://www.road-to-next.com/" />

After your Next.js project is up and running, install the [OpenAI SDK](https://www.npmjs.com/package/openai). This library gives you access to OpenAI's API and allows you to send prompts and receive responses from models:

```sh
// Command Line
npm install openai
```

To use the OpenAI API securely, you'll need an API key. Create a `.env` file at the root of your project (if it doesn't exist yet) and add the following line:

```sh
// .env
OPENAI_API_KEY="sk-proj-123abc"
```

This is a placeholder value, replace it with your real API key from your OpenAI dashboard. By storing it in `.env`, you keep your credentials private and out of version control. After adding the API key, OpenAI will automatically pick it up from the environment variables.

Now let's create the API route that will connect your frontend (UI) to OpenAI:

```ts
// src/app/api/chat/route.ts
import OpenAI from "openai";

const client = new OpenAI();

export async function POST(req: Request) {
  const { prompt: input } = await req.json();

  const result = await client.responses.create({
    model: "gpt-4-turbo",
    input,
  });

  return Response.json(result.output_text);
}
```

We initialize the OpenAI client and define a POST handler with Next. This function extracts the prompt from the incoming request, sends it to OpenAI using the gpt-4-turbo model, and returns the model's result as JSON. This is the core logic that powers the chatbot experience.

In the React component, we build the UI and state logic for interacting with our chatbot:

```tsx
// src/app/page.tsx
import { useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    // TODO: call the API
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.role === "user" ? "User: " : "AI: "}
            {message.content}
          </div>
        ))}
      </div>

      {isLoading && <p>Loading...</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="content"
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

We track user input, loading state, and chat messages. When the form is submitted, the user's prompt is added to the chat history, and a request is sent to the API route we just created. Once a response comes back, we add it to the messages and display it:

```tsx
// src/app/page.tsx
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  setIsLoading(true);
  setPrompt("");

  setMessages((prevState) => [
    ...prevState,
    { role: "user", content: prompt },
  ]);

  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });

  const result = await response.json();

  setMessages((prevState) => [
    ...prevState,
    { role: "assistant", content: result },
  ]);
  setIsLoading(false);
};
```

This is a simple but complete frontend for a basic chat interface, and it demonstrates how to work with Route Handler in a Next.js App Router project.

<Divider />

And that's it, you've just built a full-stack mini chat app powered by OpenAI! Along the way, you installed and configured Next.js, securely connected to the OpenAI API, created a custom API route, and built a responsive frontend with stateful chat logic.

This project gives you a practical example of how to combine server-side logic with client-side interactivity in modern Next.js. From here, you can expand the app with features like message history persistence, streaming responses, or styling with Tailwind.

# Streaming AI Responses in React

So far, we've sent a full prompt and waited for the entire response before displaying it. But wouldn't it be better if the AI started replying right away, character by character, like a real conversation?

That's where streaming comes in. It creates a smoother, more responsive experience, especially for longer replies. Instead of waiting for the whole message to generate, we can show the user partial results as they arrive. This not only improves the perceived speed but also feels more natural, like chatting with a real assistant.

To make this work, we need to update our API route. OpenAI supports response streaming, and we enable it by setting `stream: true` when creating the response. Then, we turn the result into a `ReadableStream` that emits chunks of text as they arrive. In this stream, we listen for deltas (small pieces of the final response) and enqueue them one by one. This setup allows the frontend to consume and render the message progressively:

```ts{12,15-25,27-34}
// src/app/api/chat/route.ts
import OpenAI from "openai";

const client = new OpenAI();

export async function POST(req: Request) {
  const { prompt: input } = await req.json();

  const result = await client.responses.create({
    model: "gpt-4-turbo",
    input,
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result) {
        if (chunk.type === "response.output_text.delta" && chunk.delta) {
          controller.enqueue(new TextEncoder().encode(chunk.delta));
        }
      }

      controller.close();
    },
  });

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

On the frontend, we now need to manage a message that's still being written. We introduce a new piece of state: `incomingMessage`. This is updated as the stream flows in and displayed in the UI just like any other message, but only while it's incomplete. Once the stream finishes, we commit it to the main messages list. This little tweak gives us a responsive, dynamic chat interface:

```tsx{7,10,17,20-24}
// src/app/page.tsx
const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [incomingMessage, setIncomingMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    // TODO: extend this function to handle streaming
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <ChatMessageItem key={index} message={message} />
        ))}

        {incomingMessage && (
          <ChatMessageItem
            message={{ role: "assistant", content: incomingMessage }}
          />
        )}
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
```

Since we're rendering messages in two different places (the main history and the incoming stream), it's a good time to extract a reusable ChatMessageItem component. It takes a message and renders it consistently across the application:

```tsx{2-9}
// src/app/page.tsx
const ChatMessageItem = ({ message }: { message: ChatMessage }) => {
  return (
    <div>
      {message.role === "user" ? "User: " : "AI: "}
      {message.content}
    </div>
  );
};
```

Now we can upgrade `handleSubmit` to handle streaming. Instead of waiting for a single JSON response, we use a `ReadableStream` reader to consume the stream one chunk at a time. As each new piece of text arrives, we append it to the `incomingMessage` state.

Once the stream ends, we push the full message to the chat history and clear the temporary buffer. This gives users immediate visual feedback that the AI is responding in real time:

```tsx{18-47}
// src/app/page.tsx
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  setIsLoading(true);
  setPrompt("");

  setMessages((prevState) => [
    ...prevState,
    { role: "user", content: prompt },
  ]);

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
        { role: "assistant", content: incomingMessage },
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

That's it, you now have full real-time streaming from OpenAI working in your app! But as you've probably noticed, getting here required quite a bit of boilerplate: setting up a streaming API response, decoding chunks, managing incremental state, and stitching it all together on the frontend.

It works well, but it's a lot of moving parts.

Want a cleaner, simpler approach? In the next section, we'll explore how using a helper library like the [AI SDK](https://sdk.vercel.ai/) can drastically reduce the amount of code needed to achieve the same functionality, without giving up flexibility or performance.
