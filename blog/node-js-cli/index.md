---
title: "Simple Interactive CLI App with Node.js"
description: "Learn how to build a simple interactive CLI app with Node.js and TypeScript. Create a chat interface that reads user input and responds interactively ..."
date: "2025-02-24T08:53:46+02:00"
categories: ["Node", "TypeScript"]
keywords: ["node.js cli app"]
hashtags: ["#TypeScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 2 in the series." links={[{ prefix: "Part 1:", label: "TypeScript in a Node.js Project", url: "/typescript-node-js/" }]} />

In this tutorial, you will learn how to build a simple interactive CLI app with Node.js and TypeScript. The app will create a chat interface that reads user input and responds interactively. Let's get started!

```ts
// src/index.ts
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chat = () => {
  rl.question('Enter a command (type "exit" to quit): ', (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
    } else {
      console.log(`You entered: ${input}`);
      chat();
    }
  });
};

console.log("Welcome to the CLI App!");

chat();
```

To run the app, execute the following command in your terminal:

```sh
// Command Line
npm run dev
```

This will start the CLI app and display the welcome message. You can now enter commands and interact with the app. To exit the app, type "exit" and press Enter. The app will display a goodbye message and close the interface.

That's it! You have successfully built a simple interactive CLI app with Node.js and TypeScript. Feel free to customize the app further and add more interactive features. Happy coding!