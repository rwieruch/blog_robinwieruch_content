---
title: "How to use ESLint in VSCode"
description: "How to install ESLint for VS Code (Visual Studio Code). Install ESLint, configure it per project, and use a local .prettierrc file ..."
date: "2022-02-14T07:50:46+02:00"
categories: ["JavaScript", "VS Code"]
keywords: ["vscode eslint", "install eslint vscode"]
hashtags: ["#VSCode"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 3 in this series." links={[{ prefix: "Part 1:", label: "How to use Prettier in VSCode", url: "/how-to-use-prettier-vscode/" }, { prefix: "Part 3:", label: "How to use Prettier with ESLint", url: "/prettier-eslint/" }]} />

A brief step by step tutorial on **how to install and use ESLint in VS Code (Visual Studio Code)**. [ESLint](https://eslint.org/) supports you and teams to follow a common code style in your project. It can be used in VS Code by installing it from the VS Code Marketplace. Once you have integrated it in VS Code, you can configure ESLint to enforce a code style in your files. This way, all team members working on a project follow the same code style standard.

As prerequisite you need to have ESLint installed for your project. When you are in charge of the build tools (e.g. Webpack), you can install and configure it with a *.eslintrc* file yourself:

<ReadMore label="How to set up ESLint for Webpack" link="/webpack-eslint/" />

<ReadMore label="How to set up ESLint for React" link="/react-eslint-webpack-babel/" />

However, most modern tools like [create-react-app](https://create-react-app.dev/) come with a built-in ESLint installation and configuration where you don't have to do anything about it.

Once you have a *eslintrc* file provided (either created by yourself or provided internally by a tool like create-react-app), you can make the ESLint warnings/errors visible in VS Code by installing the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) from the VS Code Marketplace.

Afterward, open your VS Code user's settings/preferences as JSON and enter the following configuration:

```javascript
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
"eslint.validate": ["javascript"],
```

With this setting, ESLint will check the code style of JavaScript files and will automatically try to fix warnings/errors on save. Try it yourself by violation an ESLint rule, validating that you see the warning/error in VSCode, and checking whether VS Code is able to fix the issue itself. That's it, you have integrated ESLint successfully in Visual Studio Code.

<LinkCollection label="This tutorial is part 2 of 3 in this series." links={[{ prefix: "Part 1:", label: "How to use Prettier in VSCode", url: "/how-to-use-prettier-vscode/" }, { prefix: "Part 3:", label: "How to use Prettier with ESLint", url: "/prettier-eslint/" }]} />