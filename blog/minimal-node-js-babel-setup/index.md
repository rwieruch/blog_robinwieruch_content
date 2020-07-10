---
title: "The minimal Node.js with Babel Setup"
description: "A common sense minimal Node.js setup guide which uses Babel and Nodemon: Whereas Babel with the Babel Cli is used for enabling recent JavaScript language features, Nodemon is used for keeping your node process up and running ..."
date: "2020-04-22T07:50:46+02:00"
categories: ["Node", "Tooling", "JavaScript"]
keywords: ["node setup", "node js setup", "node babel setup", "node js babel setup"]
hashtags: ["#NodeJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 2 in the series." links={[{ prefix: "Part 1:", label: "How to set up a modern JavaScript project", url: "/javascript-project-setup-tutorial/" }]} />

I have always been of the understanding there are no common sense rules about how to create a minimal Node.js application with Babel. In my search for these answers, it seemed that every tutorial I came across showed something different. As a result, I wanted to streamline this project setup for my readers and myself, so I developed a common approach for Node.js applications with Babel.

I strongly believe it is a good foundation for learning JavaScript on the command line, building sophisticated Node.js projects on top of it, releasing it as node package (library) on npm as an open source project, or to build a RESTful or GraphQL server on top of it. The final project you are going to implement here can be found in this [GitHub repository](https://github.com/rwieruch/node-babel-server).

# Table of Contents

<TableOfContents {...props} />

# Node.js with Nodemon

So far, you are able to start your application by running the npm start script. The only remaining concern is that you have to start the script every time you want to try your source code. You can change this behavior with an always-running node process. To remedy this, install the commonly used [nodemon](https://github.com/remy/nodemon) library on the command line as [development dependency](https://docs.npmjs.com/files/package.json#dependencies) to your project.

```javascript
npm install nodemon --save-dev
```

Next, exchange node with nodemon in your npm start script:

```javascript{5}
{
  ...
  "main": "index.js",
  "scripts": {
    "start": "nodemon src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  ...
}
```

When you run your application with `npm start` from the command line, it should keep running. The best part is that the script will execute again once you change the source code. Try adjusting your source code in the *src/index.js* file and see what happens in your command line.

```javascript{1}
console.log('Hello ever running Node.js project.');
```

This little adjustment to the environment gives developers a powerful tool, because the node process executes again once you change your code. If you introduce a bug, you will see a stack trace in the command line, and the script runs again without any flaws.

# Node.js with Babel

You should be able to develop a Node.js application by now, but there is more to setting up a sophisticated Node.js project that is capable of using recent JavaScript language features (ECMAScript) that are not included in the recent Node.js versions. That's where [Babel](https://babeljs.io/) becomes useful. You can install it from the command line for your project's development dependencies.

```javascript
npm install @babel/core @babel/node --save-dev
```

Next, add it to your npm start script:

```javascript{5}
{
  ...
  "main": "index.js",
  "scripts": {
    "start": "nodemon --exec babel-node src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  ...
}
```

Nothing should change when you run the application again, though that's just the surface. Under the hood, Babel transpiles your code to vanilla JavaScript. When you use an upcoming JavaScript language feature, which hasn't been introduced in Node.js, you can still use the feature in your source code. Babel makes sure that Node.js understands it. However, there is still one crucial step to include upcoming language features with Babel. You can activate different upcoming JavaScript features by adding them as presets to Babel. Let's add the most common used Babel preset to your application:

```javascript
npm install @babel/preset-env --save-dev
```


Now, in the project's root folder, create a *.babelrc* file in the command line:

```javascript
touch .babelrc
```

In this configuration file for Babel, you can include the recently installed dependency for unlocking the upcoming JavaScript language features.

```javascript
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

Now you can include upcoming JavaScript features in your *src/index.js* file. If you run into problems because your desired feature is not working, check whether there exists a dedicated Babel preset for it.

# Environment Variables in Node.js

It is important to set data like private API keys and user credentials like password, username, and email as environmental variables, but without exposing them in the source code. For this, we put environmental variables in a dedicated file that is safe from external access. The *.env* file lets you set Node.js environment variables as accessible in your project's source code. On the command line, in your project's root folder, create a *.env* file:

```javascript
touch .env
```

Now you can place any key value pair that you don't want in your source code in this new file.

```javascript
MY_SECRET=mysupersecretpassword
```

[dotenv](https://github.com/motdotla/dotenv) is another helpful library to make environmental variables accessible in the source code. First, install it on the command line as a normal dependency:

```javascript
npm install dotenv --save
```

Second, import it into your *src/index.js* file  to initialize it. The environment variable from your *.env* file is now accessible in your source code.

```javascript{1,5}
import 'dotenv/config';

console.log('Hello Node.js project.');

console.log(process.env.MY_SECRET);
```

Start the npm script again, and you should see the environmental variable in the command line. Now you are able to store sensitive data separate from the source code.

Now, consider the following code for your *src/index.js* file, where a function is imported from another file from this project.

```javascript
import saySomething from './my-other-file.js'

import 'dotenv/config';
```

If you use an environment variable in your *src/my-other-file.js*, it is undefined because the initialization of the dotenv package happens after the import in your *src/index.js* file. To fix it, put the dotenv initialization before your local file imports:

```javascript
import 'dotenv/config';

import saySomething from './my-other-file.js'
```

That's a basic understanding of Node.js environment variables. They should be used to keep sensitive data secure in JavaScript applications, but shouldn't be shared on public GitHub repositories when using git.

### Exercises:

* Confirm your [source code](https://github.com/rwieruch/node-babel-server).
* Ask yourself:
  * What's `npm init` doing when you setup your Node.js project?
  * What benefit is Nodemon giving us?
  * Why do we need Babel?
  * Why do we need Environment Variables?

<Divider />

This guide has shown you how to create a Node.js project from scratch, and how you can introduce upcoming JavaScript features in your Node.js environment using Babel. You have seen how npm scripts are used to start, test, and deploy applications, and how environment variables secure sensitive data like private API keys and user credentials. The finished product is a node package that can be open sourced on npm, another rewarding aspect of working with the Node.js ecosystem.

<LinkCollection label="This tutorial is part 1 of 2 in the series." links={[{ prefix: "Part 2:", label: "How to setup Express.js in Node.js", url: "/node-js-express-tutorial" }]} />

<LinkCollection label="This tutorial is part 1 of 2 in the series." links={[{ prefix: "Part 2:", label: "GraphQL Server Tutorial with Apollo Server and Express", url: "/graphql-apollo-server-tutorial/" }]} />

<LinkCollection label="This tutorial is part 1 of 2 in the series." links={[{ prefix: "Part 2:", label: "Node Testing Setup with Mocha and Chai", url: "/node-js-testing-mocha-chai/" }]} />

<LinkCollection label="This tutorial is part 1 of 2 in the series." links={[{ prefix: "Part 2:", label: "How to publish a npm package?", url: "/publish-npm-package-node/" }]} />
