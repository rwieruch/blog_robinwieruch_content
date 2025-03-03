---
title: "CLI Chatbot with LangChain and OpenAI in Node.js"
description: "How to: OpenAI in JavaScript with LangChain. A step by step example on how to use the OpenAI API in JavaScript with LangChain ..."
date: "2025-03-03T09:50:46+02:00"
categories: ["Node", "LangChain"]
keywords: ["langchain node.js openai"]
hashtags: ["#LangChain"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Want to build a chatbot in your Node.js terminal using JavaScript? We will walk through the most basic scenario when using LangChain and OpenAI. In this guide, we'll walk through creating a simple CLI chatbot using Node.js. You'll learn how to interact with OpenAI's language model and process user input in a terminal-based interface.

By the end, you'll have a working chatbot that can answer questions, generate text, and even hold a conversation—right from your terminal!

<LinkCollection label="This tutorial is part 3 of 3 in the series." links={[{ prefix: "Part 1:", label: "TypeScript in a Node.js Project", url: "/typescript-node-js/" }, { prefix: "Part 2:", label: "Simple Interactive CLI App with Node.js", url: "/node-js-cli/" }]} />

First, install the necessary dependencies:

```sh
npm install @langchain/core @langchain/openai
```

And second, to use OpenAI, we need to set up the API key. Sign up for an account at OpenAI and create an API key. Then, set the key as an environment variable:

```sh
# .env
OPENAI_API_KEY="sk-proj-123abc"
```

Now, let's write the core function that interacts with OpenAI using LangChain. We will create a function to send a message to the chatbot and receive a response:

```ts
// src/index.ts
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI();

const askModel = async (input: string) => {
  const prompt = ChatPromptTemplate.fromMessages([
    new SystemMessage("You're a helpful assistant"),
    new HumanMessage(input),
  ]);

  const parser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(parser);

  return await chain.invoke(input);
};
```

Here's what's happening:

- We define a chat model using ChatOpenAI from LangChain.
- We create a prompt template, where the system instructs the chatbot to act as a helpful assistant.
- The input message from the user is added dynamically.
- We process the response using LangChain's StringOutputParser.

We want users to interact with the chatbot from the command line. To achieve this, we'll use Node.js' built-in readline module. See the previous tutorial for a more detailed explanation:

```ts{8}
// src/index.ts
const chat = () => {
  rl.question('Enter a command (type "exit" to quit): ', async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
    } else {
      const result = await askModel(input);

      console.log(result);

      chat();
    }
  });
};
```

Let's try it by running the chat function with `npm run dev`. Now, you should see a prompt asking you to enter a command. Try asking it a question, like:

```sh
Enter a command (type "exit" to quit): What is LangChain?
```

The chatbot should respond with a helpful answer! Now that you have a working chatbot, here are some ways to improve it:

- Add Memory for Conversations
  - Right now, the chatbot doesn't remember previous messages. You can use LangChain's memory modules to keep track of conversation history.
- Support for Multiple Models
  - Instead of using OpenAI's chat model, you could integrate other LLMs like Anthropic Claude, Cohere, or local models via Llama.cpp.
- Create a GUI
  - Want a more user-friendly experience? Consider building a React or Electron-based UI for your chatbot.
- Enhance the Prompt
  - You can experiment with few-shot prompting, where you give multiple examples to improve response quality.

Congratulations! You've built a CLI chatbot using LangChain and OpenAI in Node.js. This is just the beginning—you can expand it with features like memory, API integrations, and even different AI models. Now it's your turn! Try modifying the chatbot, adding new features, and exploring more capabilities with LangChain.