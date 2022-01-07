---
title: "How to use ESLint in Webpack 5 - Setup Tutorial"
description: "The tutorial walks you through a Webpack with ESLint setup to improve the code style of your JavaScript applications ..."
date: "2020-10-30T12:55:46+02:00"
categories: ["Webpack", "Babel", "ESLint"]
keywords: ["webpack eslint"]
hashtags: ["#Webpack"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 2 in 'Webpack with ESLint'-series." links={[{ prefix: "Part 1:", label: "How to set up Webpack 5 with Babel", url: "/webpack-babel-setup-tutorial/" }]} />

So far, you should have a working JavaScript with Webpack application. In this tutorial, we will take this one step further by introducing ESLint for an enforced unified code style without code smells. Code style becomes an important topic for developers. If you just code for yourself, it might be alright to violate best practices. However, in a team of developers you have to have a common code style as foundation. You should follow the same rules to make your code look alike. It helps others developers to read your code, but also to avoid code smells.

# ESLint

[ESLint](http://eslint.org/) in JavaScript helps you to set up rules and to enforce code style across your code base. Let’s get started by installing the [eslint](https://github.com/eslint/eslint) library (node package). You can install it in your project with `npm install eslint` from your project's root directory.

You may also want to install the ESLint extension/plugin for your editor/IDE. For instance, in VSCode you can find the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension on their marketplace. I guess it's quite similar for your IDE/editor of choice. Afterward, you should see all the ESLint errors in your editor's/IDE's output.

# ESLint + Webpack + Babel

Since the project uses Webpack, you have to tell Webpack that you want to use eslint in your build process. Therefore you can install [eslint-loader](https://github.com/MoOx/eslint-loader) on the command line to your project's dependencies from your project's root folder:

```javascript
npm install --save-dev eslint-loader
```

Next, you can use the Webpack Loader for ESLint in your Webpack *webpack.config.js* file:

```javascript{7}
...
module: {
  rules: [
    {
      test: /\.(js)$/,
      exclude: /node_modules/,
      use: ["babel-loader", "eslint-loader"]
    }
  ]
},
...
```

Now, all source code that goes through Weback will be checked by ESLint automatically. Once you start your application, it will output an error though: "No ESLint configuration found". You need this file to define your ESLint configuration. Create it in your project's root directory on the command line:

```javascript
touch .eslintrc
```

Then, create an empty ESLint rule set in this new *.eslintrc* file:

```javascript
{
  "rules": {}
}
```

Later on you can specify rules in this file. But first, let's try to start your app again. You might run (again) into Parsing errors such as "The keyword 'import' is reserved" or "The keyword 'export' is reserved". The error happens, because ESLint does not know about Babel enabled JavaScript features yet. For instance, the `import` or `export` statements are JavaScript ES6 features. Therefore, you have to use [babel-eslint](https://github.com/babel/babel-eslint) node package to lint source code that is valid Babel interpreted JavaScript. From your project's root directory type:

```javascript
npm install --save-dev babel-eslint
```

Then, in your *.eslintrc* configuration file, add babel-eslint as parser:

```javascript{2}
{
  "parser": "babel-eslint",
  "rules": {}
}
```

*Note: If the previous error regarding Babel enabled JavaScript features still shows up in your IDE/editor -- because you may have installed an ESLint plugin/extension, restart your IDE/editor and check whether the error still shows up. It shouldn't.*

You should be able to start your application without any ESLint errors now. There are no errors displayed, because you didn’t specify any rules yet.

# ESLint Rules

ESLint rules apply for a lot of different code style use cases. Check out the [list of available ESLint rules](http://eslint.org/docs/rules/) yourself. For the sake of learning about ESLint rules, let’s add our first rule in the *.eslintrc* configuration file for ESLint:

```javascript{4}
{
  ...
  "rules": {
    "max-len": [1, 70, 2, {ignoreComments: true}]
  }
  ...
}
```

The rule checks the length of characters in a line of code. If the length is more than 70 characters, you will get a warning once you start your application with `npm start` or in your IDE/editor in case a plugin or extension for ESLint. Try to call up this warning by writing a line of code longer than 70 characters. ESLint should tell you something like: "Line 5 exceeds the maximum line length of 70". You can adjust the rule to allow some more characters:

```javascript{4}
{
  ...
  "rules": {
    "max-len": [1, 120, 2, {ignoreComments: true}]
  }
  ...
}
```

If you still see warnings, it is your first chance to improve the code style in your codebase.

### Exercises:

* Fix all the code style violations in your source code
* Try out more ESLint rules yourself

# Shareable ESLint Configuration

Now, it would be very tidious to come up with a set of ESLint rules for every JavaScript project. That's why it's possible to share them as libraries (node packages). There are various shareable ESLint configs out there, however, one of the most popular one is the [Airbnb ESLint configuration](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) based on [Airbnb's Style Guide](https://github.com/airbnb/javascript). You can install the configuration in addition to all its peer dependencies with the following command on the command line from your project's root directory:

```javascript
npx install-peerdeps --dev eslint-config-airbnb
```

Afterward, you can introduce it in your *.eslintrc* configuration file for ESLint:

```javascript{3}
{
  "parser": "babel-eslint",
  "extends": ["airbnb"],
  "rules": {
    "max-len": [1, 70, 2, { "ignoreComments": true }]
  }
}
```

*Note: It's up to you to keep your own ESLint rules (e.g. max-len from before) to extend the ESLint rule set from Airbnb. However, my recommendation would not be to come with your own ESLint rules. Instead, pick one of the more popular ESLint configuration by large companies and follow their guidance. If you are already advanced in JavaScript, you (and your team) can start to add your own flavor to the ESLint rules by extending it or by coming up with a configuration entirely on your own.*

```javascript{3}
{
  "parser": "babel-eslint",
  "extends": ["airbnb"]
}
```

After starting your application on the command line again or checking the output in your IDE/editor with an installed ESLint plugin/extension, you may see new ESLint warnings/errors popping up. That's a good point in time to start fixing them.

### Exercises:

* Fix all your ESLint violations
* Get to know other reputable ESLint configurations (e.g. Google, Standard) other than Airbnb's ESLint configuration

# How to disable ESLint Rules

Sometimes you might see a lot of ESLint rule violations on your command line or in your IDE/editor. Often it is up to you to fix them to follow the common best practices. However, whenever you are unsure about the ESLint warning, search it in your favorite search engine and evaluate whether you want to have this ESLint rule or not. You can either fix the warning in the mentioned source code file or remove/disable the rule altogether, if you think you don’t need it.

In case you want to *remove* a ESLint rule globally, just remove it from your *.eslintrc* file in case you specified it yourself and it doesn't come from any popular style guide (e.g. Airbnb). If the latter is the case, you can only *disable* the rule. For instance, the no-unused-vars ESLint rule from Airbnb's ESLint configuration could be disable the following way:

```javascript{4,5,6}
{
  "parser": "babel-eslint",
  "extends": ["airbnb"],
  "rules": {
    "no-unused-vars": 0
  }
}
```

However, you can also disable your own or extended ESLint rules in the respective source code file:

```javascript{1,3}
/* eslint-disable no-unused-vars */
const myUnusedVariable = 42;
/* eslint-enable no-unused-vars */
```

Also you can disable an ESLint rule in the whole or rest of a file by not enabling the ESLint rule again:

```javascript{1,3}
/* eslint-disable no-unused-vars */
const myUnusedVariable = 42;
```

Now, you should have all the ESLint knowledge at your hands to have a unified code style with best practices by using a popular ESLint configuration such as the one from Airbnb. You also know how to add your own rules, how to show violations in your IDE/editor/command line, how to fix violations, and how to remove/disable ESLint rules.

# How to install ESLint globally

The tutorial has shown you how to install ESLint on a per project basis with `npm install --save-dev eslint`. Also you stepped through the whole process of setting up the ESLint configuration and installing a shareable ESLint configuration yourself. However, there is an more effortless way of doing it in the end. You can install ESLint globally to make it kinda accessible for all of your JavaScript projects with `npm install -g eslint`.

Still, once your JavaScript project is set up, you need to run `eslint --init` in the root directory of your project on the command line which will install a local copy of ESLint for your project again. Also you will see a command line prompt that you can step through to set up your ESLint configuration dynamically. In the end, that's my recommended way of setting up ESLint for your JavaScript project.

### Exercises:

* Set up a new JavaScript project and run `eslint --init` yourself

<LinkCollection label="This tutorial is part 1 of 3 in the series." links={[{ prefix: "Part 2:", label: "How to use Prettier in VS Code", url: "/how-to-use-prettier-vscode/" }, { prefix: "Part 3:", label: "How to make Prettier work with ESLint", url: "/prettier-eslint/" }]} />

<ReadMore label="How to set up an advanced Webpack application" link="/webpack-advanced-setup-tutorial/" />
