---
title: "TypeScript in a Node.js Project"
description: "Learn how to set up a TypeScript Node.js project from scratch with this step-by-step guide. Configure TypeScript, install dependencies, manage environment variables, and streamline development with tsx ..."
date: "2025-02-18T08:53:46+02:00"
categories: ["Node", "TypeScript"]
keywords: ["typescript node.js project setup", "typescript node.js project configuration", "typescript node.js project tutorial"]
hashtags: ["#TypeScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Setting up a TypeScript project with Node.js may seem like a hassle at first, but with the right steps, you'll have everything running smoothly in no time. Whether you're building a small script or a full-fledged application, this guide will walk you through the entire process.

We'll start from scratch, configure TypeScript, and set up a simple development environment with best practices. Let's dive in!

# Setup Node.js Project

First, you need a dedicated folder for your project. Open your terminal and run the following commands:

```sh
// Command Line
mkdir my-project
cd my-project
npm init -y
```

Let's break down what each command does:

- `mkdir my-project`: Creates a new project directory.
- `cd my-project`: Moves into the new directory.
- `npm init -y`: Initializes a new `package.json` file with default values.

This `package.json` file is essential for a Node.js project as it manages dependencies and scripts for your project.

# TypeScript in Node.js

Now, let's install TypeScript as a development dependency and create a configuration file:

```sh
// Command Line
npm install --save-dev typescript
touch tsconfig.json
```

Let's break down what each command does:

- `npm install --save-dev typescript`: Installs TS locally for your project.
- `touch tsconfig.json`: Creates a TypeScript configuration file.

Next, add the following configuration to your `tsconfig.json` file:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitAny": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "sourceMap": true,
    "declaration": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

Let's break down what each configuration option does:

- Modern JavaScript support: "target": "ES2020"
  - ensures compatibility with the latest Node.js features
- Cleaner project structure: "rootDir": "src" and "outDir": "dist"
  - keep the source and compiled files separate
- Stronger type safety: "strict": true" and "noImplicitAny": true"
  - catch potential bugs early
- Better cross-platform compatibility: "forceConsistentCasingInFileNames": true"
  - prevents case-sensitive import issues.
- JSON support: "resolveJsonModule": true"
  - allows importing JSON files in TypeScript
- Efficient compilation: "skipLibCheck": true"
  - speeds up TypeScript compilation

# Source Folder and Entry File

Create a `src` folder and an `index.ts` file inside it:

```sh
// Command Line
mkdir src
touch src/index.ts
```

Now, add a simple TypeScript script in `src/index.ts`:

```ts
// src/index.ts
console.log("Hello world!");
```

This will serve as our starting point to ensure everything is working correctly.

# Run & Compile TypeScript Files in Node.js

To run TypeScript files directly without compiling them first, install `tsx` which is a popular TypeScript runner. An alternative would be to use `ts-node`:

```sh
// Command Line
npm install tsx --save-dev
```

You can also use [type stripping](https://nodejs.org/api/typescript.html) natively in Node.js, but `tsx` fully supports TypeScript features. Now, update your `package.json` scripts to use `tsx`:

```json
// package.json
"scripts": {
  "dev": "tsx src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

Let's break down what each script does:

- `"dev": "tsx src/index.ts"`:
  - Runs the project in development mode using `tsx`. This script is used during development.
- `"build": "tsc"`:
  - Compiles TypeScript files into JavaScript with TypeScript compiler (`tsc`). The compiled files are stored in the `dist` folder.
- `"start": "node dist/index.js"`:
  - Runs the compiled JavaScript files. This script is used in production.

For automatic reloading, update the `dev` script:

```json
// package.json
"scripts": {
  "dev": "tsx --watch src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

The `--watch` flag makes `tsx` automatically recompile and reload files when changes are made.

# Environment Variables in Node.js

Many applications require sensitive API keys and environment variables. The best practice is to store them in a `.env` file instead of hardcoding them. Create a `.env` file in your project directory with the following content:

```sh
# .env
OPENAI_API_KEY="sk-proj-123abc"
```

Then, modify `src/index.ts` to read the environment variable:

```ts
// src/index.ts
console.log(process.env.OPENAI_API_KEY);
```

To ensure environment variables are recognized by TypeScript, install Node.js type definitions:

```sh
// Command Line
npm install @types/node --save-dev
```

If you're using Node.js 20.6.0 or newer, you can load environment variables directly using the `--env-file` flag:

```json
// package.json
"scripts": {
  "dev": "tsx --watch --env-file=.env src/index.ts",
  "build": "tsc",
  "start": "node --env-file=.env dist/index.js"
}
```

For a more sophisticated approach, consider using the `dotenv` package:

```sh
// Command Line
npm install dotenv
```

Modify `src/index.ts` to load the `.env` file using `dotenv`:

```ts
// src/index.ts
import "dotenv/config";

console.log(process.env.OPENAI_API_KEY);
```

Update the `package.json` scripts accordingly:

```json
// package.json
"scripts": {
  "dev": "tsx --watch src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

Now, your project can securely read environment variables.

<Divider />

That's it! You've successfully set up a TypeScript project with Node.js. Here's a quick recap of what we did:

* Created a new Node.js project with `npm init`
* Installed and configured TypeScript
* Set up a source directory with a TypeScript entry file
* Installed `tsx` for running TypeScript files efficiently
* Configured environment variables using `.env`
* Used `dotenv` for better environment variable management

Now you're ready to start building your TypeScript-powered Node.js application!