---
title: "How to use ESLint in React"
description: "You want to setup ESLint in your React application? Your project is set up with Babel and Webpack? This tutorial will guide you through the ESLint in React setup ..."
date: "2019-06-15T13:56:46+02:00"
categories: ["React", "Webpack", "Babel", "ESLint"]
keywords: ["react eslint"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 3 of 3 in the series." links={[{ prefix: "Part 1:", label: "How to set up React with Webpack and Babel", url: "/minimal-react-webpack-babel-setup/" }, { prefix: "Part 2:", label: "How to use ESLint in Webpack", url: "/webpack-eslint/" }]} />

In this tutorial I want to walk you through setting up ESLint for React. You should go through the previous tutorials in order to learn about the basic setup for Webpack and ESLint though. It will also tell you about all the benefits that come with the code style improvements which ESLint is giving your projects.

# Webpack and Babel for React ESLint

First, you need to make sure that your *.babelrc* (or *package.json* if that's the place where you have your Babel configuration) supports JSX and the Webpack plugin for ESLint from the previous tutorials got installed as well. It's important that ESLint is used within your Webpack build to enforce your code style for every of your npm scripts which run Webpack. Also Webpack needs to know about React (JSX) at all.

```javascript{2,7,13}
...
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ["babel-loader"]
    }
  ]
  ...
  plugins: [new ESLintPlugin()],
  ...
};
```

That's everything you need to introduce your first ESLint rules for React.

# ESLint Rules for React

Previously, you have read that there are pre-configured ESLint configurations out there. Perhaps you have used the Airbnb configuration which already comes with rules for React. If not, a brief recap on how you would introduce the Airbnb style guide for your ESLint configuration. First, install the Airbnb configuration in addition to all its peer dependencies:

```javascript
npx install-peerdeps --dev eslint-config-airbnb
```

Afterward, you can introduce it in your *.eslintrc* configuration file for ESLint:

```javascript{3}
{
  "parser": "@babel/eslint-parser",
  "extends": ["airbnb"]
}
```

That's it. After running your npm start script which uses Webpack, you should see all the ESLint violations, regarding React but also JavaScript, on your command line. If you have installed an IDE/editor extension/plugin, you should see the ESLint violations there as well.

<Divider />

Airbnb's ESLint config is only one of many popular pre-configured sets of ESLint rules. If you just want to double down on React, you may want to check out the [ESLint plugin for React](https://github.com/yannickcr/eslint-plugin-react). It comes with lots of recommendations from the React community. However, if you need a full-blown ESLint solution for React in addition to JavaScript, you are good to go with Airbnb's code style recommendations.

<LinkCollection label="This tutorial is part 1 of 3 in the series." links={[{ prefix: "Part 2:", label: "How to use Prettier in VS Code", url: "/how-to-use-prettier-vscode/" }, { prefix: "Part 3:", label: "How to use Prettier with ESLint", url: "/prettier-eslint/" }]} />
