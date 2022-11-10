---
title: "TypeScript with Node.js"
description: "A TypeScript with Node.js setup which helps you with tsc (TypeScript compiler), ts-node (on the fly compilation), @types/node, and nodemon ..."
date: "2022-11-08T05:50:46+02:00"
categories: ["Node", "TypeScript"]
keywords: ["typescript node", "typescript node setup"]
hashtags: ["#TypeScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 3 in the series." links={[{ prefix: "Part 1:", label: "How to set up a modern JavaScript project", url: "/javascript-project-setup-tutorial/" }, { prefix: "Part 3:", label: "Fullstack TypeScript with tRPC and React", url: "/react-trpc/" }]} />

TypeScript is getting more popular these days for frontend and backend applications. Here you will learn how to set up TypeScript in Node.js for a backend project. The previous tutorial already demonstrated how to set up a JavaScript project with Node.js. With this as foundation, we will start migrating the project to TypeScript here.

First, install TypeScript on the command line for your project:

```text
npm install typescript
```

Next we will need a script in our *package.json* file:

```json{4}
{
  ...
  "scripts": {
    "tsc": "tsc",
    "start": "node src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  ...
}
```

Because we have installed TypeScript before, we can call `tsc` -- which is the TypeScript compiler -- within the project now. Next call the following instruction on the command line which generates a *tsconfig.json* file:

```text
npm run tsc -- --init
```

The *tsconfig.json* file comes with every TypeScript project, because it holds all the TypeScript relevant settings. Because we have used the fast forward initialization command (`--init`), it comes with the default settings. You can open up the *tsconfig.json* file to see all the enabled and disabled settings with commentary.

Next we will add a TypeScript file in the project called *src/index.ts* whereas the *.ts* extension makes it a TypeScript file. The implementation is only a function which takes a string and returns nothing:

```javascript
const sayHello = (subject: string): void => {
  console.log('Hello ' + subject);
};

sayHello('TypeScript');
```

However, we cannot run this file with the usual node script. Instead we have to use a package called [ts-node](https://www.npmjs.com/package/ts-node) which compiles the TypeScript file on the fly to a JavaScript file to make it executable in a Node.js environment.

```text
npm install ts-node --save-dev
```

We will adjust the start script in the project's *package.json* file to use ts-node instead of node to call the new *src/index.ts* file. In addition, we also removed the tsc script, because we only needed it to generate the initial *tsconfig.json* file:

```json{4}
{
  ...
  "scripts": {
    "start": "ts-node src/index.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  ...
}
```

Finally you can start the application by running the following command:

```text
npm start
```

As said, ts-node makes sure to compile TypeScript into JavaScript before running it in the Node.js environment. For the bare minimum we are done here. However, you may want to have a few more things. For example, what about a watcher which runs the start script every time again when a source code file changes. Let's install [nodemon](https://www.npmjs.com/package/nodemon) for this purpose on the command line:

```text
npm install nodemon --save-dev
```

Next, adjust the start script to accommodate nodemon which under the hood should execute ts-node with the *src/index.ts* file:

```json{4}
{
  ...
  "scripts": {
    "start": "nodemon --exec ts-node src/index.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  ...
}
```

When you re-run your npm start script, you should see that it should stay idle once it ran through the program. Whenever you change a source code file now, it will re-run automatically again.

Another topic that will come up is installing types for a package separately, because the package itself does not provide these types. For example, if you happen to use [Express](/node-express-server-rest-api/), your IDE (e.g. VSCode) may tell you that Express does not come with any types. Therefore you would have to install them yourself:

```text
npm install @types/express --save-dev
```

We are not using Express here, so it would not make sense to add the types of it to this project. However, what we are missing are Node.js specific types for APIs like `file`, `process`, and `path`. Therefore it's almost mandatory to install these to the project on the command line, because sooner or later you may use one of these Node.js specific APIs in your TypeScript project:

```text
npm install @types/node --save-dev
```

Last but not least, we want to be able to deploy this TypeScript in Node.js project. Using ts-node to run the application would be [okay](https://github.com/TypeStrong/ts-node/issues/104#issuecomment-250252708) for most web applications. However, keep in mind that ts-node has to compile TypeScript to JavaScript every time on the fly. What would make more sense would be pre-compiling TypeScript to JavaScript before deploying it. In your *tsconfig.json*, tell TypeScript where to output the compiled JavaScript:

```json
{
  "compilerOptions": {
    "outDir": "dist",
    ...
  }
}
```

Next in your *package.json* file add a new build script which executes TypeScript's compiler:

```json{5}
{
  ...
  "scripts": {
    "start": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  ...
}
```

After running `npm run build` on the command line, you should see a deployable JavaScript file in *dist/index.js* which should look similar to this one:

```javascript
"use strict";
const sayHello = (subject) => {
    console.log('Hello ' + subject);
};
sayHello('TypeScript');
```

That's it. You have a running TypeScript in Node.js project for development and production with the bare minimum setup.

<LinkCollection label="This tutorial is part 2 of 3 in the series." links={[{ prefix: "Part 1:", label: "How to set up a modern JavaScript project", url: "/javascript-project-setup-tutorial/" }, { prefix: "Part 3:", label: "Fullstack TypeScript with tRPC and React", url: "/react-trpc/" }]} />