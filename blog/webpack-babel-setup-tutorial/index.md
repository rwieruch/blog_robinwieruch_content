---
title: "How to Webpack 5 with Babel - Setup Tutorial"
description: "A step by step tutorial on how to integrate Babel into Webpack to access powerful JavaScript features (ES6, ES7, ES8, ES9) from the future ..."
date: "2020-10-30T11:55:46+02:00"
categories: ["JavaScript", "Webpack", "Babel"]
keywords: ["webpack babel"]
hashtags: ["#Webpack"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 3 of 3 in the 'Frontend Setup'-series." links={[{ prefix: "Part 1:", label: "How to set up a modern JavaScript project", url: "/javascript-project-setup-tutorial/" }, { prefix: "Part 2:", label: "How to set up Webpack 5", url: "/webpack-setup-tutorial/" }]} />

[Babel](https://babeljs.io/) enables one writing code with JavaScript features that aren't supported by most browser yet. Perhaps you have heard about [JavaScript ES6 (ES2015)](https://babeljs.io/docs/learn-es2015/), ES7, and other versions of ECMAScript specification which are up and coming for the JavaScript language. At the time of reading this, various versions may be already included in the JavaScript language.

By using Babel, the code which isn't supported yet, will get transpiled back to vanilla JavaScript so that every environment (e.g. browser) can interpret it. In order to get Babel running, you need to install two of its main dependencies on the command line:

```javascript
npm install --save-dev @babel/core @babel/preset-env
```

Moreover, in case you have Webpack in place to bundle your JavaScript application, you will have to install a [Webpack Loader](https://webpack.js.org/loaders/) for Babel:

```javascript
npm install --save-dev babel-loader
```

Now, with all libraries (node packages) in place, you need to adjust your *package.json* and *webpack.config.js* (if necessary) to respect the Babel changes. These changes will include all packages you have installed before. First, in your *package.json*, include the [Babel Preset](https://babeljs.io/docs/en/presets):

```javascript{3-7}
{
  ...
  "babel": {
    "presets": [
      "@babel/preset-env"
    ]
  },
  ...
}
```

*"[The] @babel/preset-env [preset] is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This both makes your life easier and JavaScript bundles smaller!" ([Source](https://babeljs.io/docs/en/babel-preset-env))*

Second, your *webpack.config.js* file needs to include Babel in its build process as well. There, make use of the previously installed [Loader for Babel](https://github.com/babel/babel-loader). You need to tell Webpack on which files to use the loader (e.g. *.js* files) and optionally which folders to exclude from the process (e.g. *node_modules*):

```javascript{3-16}
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  },
};
```

You can start your application again. Nothing should have changed except for that you can use upcoming [ECMAScript features for JavaScript](https://github.com/tc39/proposals) now. An optional step would be to extract your Babel configuration into a separate *.babelrc* configuration file. You can create this file in your project's root directory on the command line:

```javascript
touch .babelrc
```

Then, add the configuration for Babel -- which you have previously added in your *package.json* -- in the *.babelrc* file. Don't forget to remove the configuration in the *package.json* afterward. It should be configured only once.

```javascript
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

Babel enables you to use future JavaScript features in your browser, because it transpiles it down to vanilla JavaScript. Try it yourself by installing your first plugin. Make sure to see that the JavaScript feature doesn't work at first in your *src/index.js* file, but once you installed the plugin for the feature and integrated it in your *.babelrc* file, it should be possible to run the JavaScript source code.

### Exercises:

* Confirm your [source code for the last section](https://github.com/rwieruch/minimal-webpack-babel-setup)
* Try out a Babel Plugin yourself
  * Install a [Babel Plugin](https://babeljs.io/docs/en/plugins) via npm to your project to support an upcoming JavaScript feature
  * Add the Plugin to your *.babelrc* file
  * Try the new JavaScript feature in your *src/index.js* file
* Try Imports
  * Create another JavaScript file in your *src/* folder
  * Import the new JavaScript file in your *src/index.js* file
  * Add a logging statement to your new JavaScript file and check whether it shows up in the browser

<LinkCollection label="This tutorial is part 1 of 2 in 'React Setup'-series." links={[{ prefix: "Part 2:", label: "How to set up React with Webpack and Babel", url: "/minimal-react-webpack-babel-setup/" }]} />

<LinkCollection label="This tutorial is part 1 of 2 in 'Webpack with ESLint'-series." links={[{ prefix: "Part 2:", label: "How to use ESLint in Webpack", url: "/webpack-eslint/" }]} />

<LinkCollection label="This tutorial is part 1 of 4 in 'Webpack with Style'-series." links={[{ prefix: "Part 2:", label: "How to use CSS with Webpack", url: "/webpack-css/" }, { prefix: "Part 3:", label: "How to use Webpack with SASS", url: "/webpack-sass/" }, { prefix: "Part 4:", label: "How to use Webpack with PostCSS", url: "/webpack-postcss/" }]} />

<LinkCollection label="This tutorial is part 1 of 3 in 'Webpack with Font'-series." links={[{ prefix: "Part 2:", label: "How to use CSS with Webpack", url: "/webpack-css/" }, { prefix: "Part 3:", label: "How to use Webpack with Fonts", url: "/webpack-font/" }]} />

<LinkCollection label="This tutorial is part 1 of 2 in 'Webpack with Images'-series." links={[{ prefix: "Part 2:", label: "How to use Images with Webpack", url: "/webpack-images/" }]} />

<LinkCollection label="This tutorial is part 2 of 3 in 'Webpack Advanced Setup'-series." links={[{ prefix: "Part 1:", label: "How to set up Webpack 5", url: "/webpack-setup-tutorial/" }, { prefix: "Part 3:", label: "How to set up an advanced Webpack application", url: "/webpack-advanced-setup-tutorial/" }]} />
