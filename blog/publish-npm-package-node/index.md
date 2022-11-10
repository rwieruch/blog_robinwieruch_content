---
title: "How to publish a npm Package"
description: "A tutorial on how to publish a npm package to the npm registry with Node, Babel and Webpack for getting started as an open source contributor ..."
date: "2019-05-12T07:52:46+02:00"
categories: ["Node", "JavaScript"]
keywords: ["publish npm package"]
hashtags: ["#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 2 in the series." links={[{ prefix: "Part 1:", label: "The minimal Node.js with Babel Setup", url: "/minimal-node-js-babel-setup/" }]} />

You may be already using npm (node package manager) for installing libraries (node packages) to your JavaScript projects. For instance, in Node.js you may be used to [Express.js](/node-js-express-tutorial/) for [creating REST APIs](/node-express-server-rest-api/). In frontend development, you may be used to [React.js](/learn-react-js/) to build component-based web applications. This makes you a consumer of the npm ecosystem, because you are regularly installing packages for your projects to get them running with the help of others.

But what about getting started as a producer for the JavaScript ecosystem yourself? There are many developers out there who contribute to open source by publishing their node packages to the npm registry. Afterward, other people can install these packages for their projects. This tutorial shows you how to get started. You can find the final project from this tutorial on [GitHub](https://github.com/rwieruch/node-open-source-boilerplate) as well.

Before we can get started, [create an account for npm](https://www.npmjs.com/) on their website. Afterward, execute `npm login` on the command line and provide your credentials to it (given you have installed [Node.js](https://nodejs.org/en/)). This last step connects you with the npm registry on the command line and that's how you are able to publish packages or new versions of your packages via the command line later on.

*Security Note: You may also want to add two factor authentication (2FA) for signing in to npm and for publishing new packages. Don't worry about it now, but revisit this topic later to secure your npm account and to prevent malicious code being published from your account by someone else to the npm ecosystem.*

# Publishing a Node Package with Babel

In this section, we will not use a sophisticated bundler (Webpack, Rollup) yet, because everything is possible with bare bones Node.js and Babel to bundle our code. Let's see how this works. Later you will see how this can be done with Webpack too.

First, create a few lines of source code that you want to share later as open source project via npm. Usually the source code ends up in a *src/* folder and the entry point to all source code is an *src/index.js* file:

```javascript
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

export { subtract };

export default add;
```

As you can see, you need to export at least *something* from this file. Also note that you could have more files or (nested) folders in your *src/* folder. Your bundler makes sure to wrap everything up. However, ultimately you want to export everything from this *src/index.js* file that's used from the outside (e.g. another project that installs your node package).

If you haven't installed the neccessary packages for Babel from the previous tutorial yet, you can do it with the following command:

```javascript
npm install @babel/core @babel/node @babel/preset-env @babel/cli --save-dev
```

In your *package.json* file, implement the following lines for bundling your project with Babel:

```javascript{5,7}
{
  "name": "my-library-name",
  "version": "1.0.0",
  "description": "",
  "main": "lib/index.js",
  "scripts": {
    "build": "babel src --out-dir lib",
    "test": "echo \"No test specified\" && exit 0"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "devDependencies": {
    ...
  }
}
```

The npm build script uses Babel to compile all files from your *src/* folder to a *lib/* folder. If the *lib/* folder isn't present yet, the script will create it for you. Also the `main` property points to the generated *lib/index.js* file.

Before you can run the build script, you may want to add Babel presets to your Babel transpile step. You can create a *.babelrc* file to add the desired presets. The previous tutorial has shown you how these Babel presets allow you to add additional JavaScript features:

```javascript
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

In your *package.json*, you can add additional information for your node package. The mandatory `name` property will be the name to be used in the npm registry, the `description` property helps other people to get to know your node package, and some other information point developers to further resources:

```javascript
{
  ...
  "repository": {
    "type": "git",
    "url": "git+https://github.com/rwieruch/node-open-source-boilerplate.git"
  },
  "keywords": [],
  "author": "“Robin <hello@rwieruch.com”> (https://www.robinwieruch.de)",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/rwieruch/node-open-source-boilerplate/issues"
  },
  "homepage": "https://github.com/rwieruch/node-open-source-boilerplate#readme"
}
```

You should also add a README.md markdown file where you tell people how to install your node package and how to use it. You can also give instructions on how to contribute to your project.

Finally, run `npm run build` to convert your source code to a bundled JavaScript file. After executing the command, in case you used the same source code in your *src/index.js* file, you should find the following source code in your *lib/index.js* file:

```javascript
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subtract = subtract;
exports["default"] = void 0;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

var _default = add;
exports["default"] = _default;
```

Now your bundled source code is ready to be published on npm as node package/library. Since you have to run `npm run build` before every publish, it's a good practice to automate this step with a prepare script in your *package.json* file:

```javascript{8}
{
  "name": "my-library-name",
  "version": "1.0.0",
  "description": "",
  "main": "lib/index.js",
  "scripts": {
    "build": "babel src --out-dir lib",
    "prepare": "npm run build",
    "test": "echo \"No test specified\" && exit 0"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "devDependencies": {
    ...
  }
}
```

Also you may want to add a *.npmignore* file to your project, to ignore all files/folders which shouldn't be included in the published node package. For instance, the *src/* folder shouldn't be included, because only the *lib/* folder matters for the final node package. Thus, in your *.npmignore* file, add the following line:

```javascript
src/
```

Finally, you can publish your node package with `npm publish`. Maybe you will be asked for your npm credentials again. After the publishing, you can "npm install" your open sourced library in any other project.

If you want to upgrade your node package; change the source code, and afterward go into your *package.json* file and increase the version number. Then do a `npm publish` and your recent version should be published to the npm registry.

### Exercises:

* Read more about [how to test your open sourced node package with Mocha and Chai](/node-js-testing-mocha-chai/)

# Publishing a Node Package with Webpack

Even though Babel is not a module bundler, it comes with a few handy features -- as you have seen in the previous section -- to create a bundled JavaScript file from a source code folder. However, eventually you run into more complex projects where a sophisticated bundler is needed. Let's see what needs to change in our project to use Webpack for this job.

First, install the necessary node packages for Webpack to your project:

```javascript
npm install webpack webpack-cli --save-dev
```

Then, instead of using Babel to covnert and to move your source code files from *src/* to *lib/*, let's use Webpack to perform the task:

```javascript{7}
{
  "name": "my-library-name",
  "version": "1.0.0",
  "description": "",
  "main": "lib/index.js",
  "scripts": {
    "build": "webpack --config ./webpack.config.js --mode=production",
    "prepare": "npm run build",
    "test": "echo \"No test specified\" && exit 0"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "devDependencies": {
    ...
  }
}
```

Since the Webpack task points to a *webpack.config.js* file, create this file and implement the following Webpack configuration:

```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/lib`,
    filename: 'index.js',
    library: 'my-library-name',
    libraryTarget: 'umd',
  }
};
```

Basically the Webpack configuration needs information about the entry and output for the task. The entry configuration stays the same for our *src/index.js* file. However, the output configuration takes more information than only the output path (e.g. */lib*) and file (e.g. *index.js*). The library name should be the same as the name for the node package in the *package.json*. The library target should be set to umd.

Since we want to use Babel in Webpack, we need to add Babel in our build step for all JavaScript files:

```javascript{9,10,11,12,13,14,15,16,17}
module.exports = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/lib`,
    filename: 'index.js',
    library: 'my-library-name',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};
```

Then, a so-called loader for Babel which is used in our Webpack configuration needs to be installed:

```javascript
npm install babel-loader --save-dev
```

Now you are ready to give `npm run build` a shot. Afterward, you should find a new *lib/index.js* file which looks different from the previous one, because Webpack adds further build steps (e.g. minification) per default. Finally, you can increase your node packages version in your *package.json* file again and execute `npm publish` to get your Webpack built open source project to npm.

*Note: Did you notice the JSX configuration in our Webpack configuration? It's not needed for our case, because we are dealing with JavaScript files. However, it might give a good hint on how to advance the setup from a JavaScript open source library to a React open source library.*

### Exercises:

* Read more about [Code Splitting in Webpack](/webpack-code-splitting-library/)

<Divider />

After all, it's up to you whether you use Babel, Webpack or any other bundler (e.g. Rollup) to create your open source project. In the end, it depends on your requirements. For instance, if you want to publish a library for frontend development (e.g. React), you may want to use a sophisticated bundler such as Webpack to not only include JavaScript, but also JSX, SVG and other files.
