+++
title = "React Code Style with ESLint + Babel + Webpack"
description = "You want to setup ESLint in your ReactJs project? But your project includes Babel and Webpack? This article will guide you through all the options with style guides such as Airbnb's style guide, the setup process for ESLint in React, and more beneficial recommendations to follow styling rules in your project ..."
date = "2018-01-19T13:50:46+02:00"
tags = ["React", "JavaScript", "Tooling"]
categories = ["React", "JavaScript", "Tooling"]
keywords = ["react eslint"]
news_keywords = ["react eslint"]
hashtag = "#ReactJs"
card = "img/posts/react-eslint-webpack-babel/banner_640.jpg"
banner = "img/posts/react-eslint-webpack-babel/banner.jpg"
contribute = "react-eslint-webpack-babel.md"
headline = "React Code Style with ESLint + Babel + Webpack"

summary = "The React Code Style with ESLint + Babel + Webpack tutorial will teach you how to setup ESLint in a React + Babel + Webpack environment. In addition to the setup of usual code style rules, you will add React rules to enforce a better code style in your React environment as well. Moreover you will learn how to extend your ESLint rules with existing best practices rules of companies like Airbnb."
+++

{{% pin_it_image "react eslint" "img/posts/react-eslint-webpack-babel/banner.jpg" "is-src-set" %}}

Code style is an important topic for developers. When you code for yourself, it might be alright to violate best practices. However, in a team of developers you have to have a common code style. You should follow the same rules to make your code look alike. It helps others developers to read your code. It helps people to navigate in a new code base. ESLint in JavaScript helps you to set up rules and to enforce code style.

The article will teach you how to setup ESLint in a [React + Babel + Webpack](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/) environment. You can setup rules for JavaScript and React to enforce a unified code style. Every violated rule will ping you and your team members in the terminal or developer console in the browser. Additionally you will not only learn about custom rules, but also recommended best practices in the community. You will learn to extend your rules easily with a common set of rules in one line of configuration.

Apart from ESLint for as a code style checker, you should know about the alternatives as well: Prettier and StandardJS.

{{% chapter_header "Table of Contents" "toc" %}}

* [ESLint](#eslint)
* [ESLint + Babel](#eslintBabel)
* [ESLint Rules](#eslintRules)
* [ESLint Rules for React](#eslintRulesReact)
* [Extend ESLint Rules](#eslintExtendRules)
* [Disable ESLint Rules](#cleanUp)
* [Code Style Alternatives](#codeStyleAlternatives)

{{% chapter_header "ESLint" "eslint" %}}

A linter like {{% a_blank "ESLint" "http://eslint.org/" %}} helps you to maintain a consistent JavaScript and React code style in your project. Let’s get started by installing the {{% a_blank "eslint" "https://github.com/eslint/eslint" %}} node package.

*From root folder:*

{{< highlight javascript >}}
npm --save-dev install eslint
{{< /highlight >}}

Since the project uses Webpack, you have to tell Webpack that you want to use eslint in your build. Therefore you can install {{% a_blank "eslint-loader" "https://github.com/MoOx/eslint-loader" %}}.

*From root folder:*

{{< highlight javascript >}}
npm --save-dev install eslint-loader
{{< /highlight >}}

Now you can use the loader in your Webpack configuration.

*webpack.config.js*

{{< highlight javascript "hl_lines=9 10 11 12 13" >}}
...
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['eslint-loader']
    }
  ]
},
...
{{< /highlight >}}

When you start your application now, it will output an error; `No ESLint configuration found`. You need such a file to define your configuration:

*From root folder:*

{{< highlight javascript >}}
touch .eslintrc
{{< /highlight >}}

*.eslintrc*

{{< highlight javascript >}}
{
  "rules": {
  }
}
{{< /highlight >}}

Later on you can specify rules in the file. But first try to start your app again.

*From root folder:*

{{< highlight javascript >}}
npm start
{{< /highlight >}}

You might run into Parsing error: `The keyword 'import' is reserved`, which happens because ESLint does not know about ES6 features yet, which you might have enabled via Babel. The `import` statement is an ES6 feature. Let's install Babel support that ESLint can interpret the JavaScript code.

{{% chapter_header "ESLint + Babel" "eslintBabel" %}}

You might have already installed the {{% a_blank "babel-loader" "https://github.com/babel/babel-loader" %}} to transpile your code with Webpack. Otherwise you can do it by using npm.

{{< highlight javascript >}}
npm install --save-dev babel-loader
{{< /highlight >}}

Now you can use that loader and pair it with the eslint-loader.

*webpack.config.js*

{{< highlight javascript "hl_lines=12" >}}
...
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'eslint-loader']
    }
  ]
},
...
{{< /highlight >}}

Additionally you have to use {{% a_blank "babel-eslint" "https://github.com/babel/babel-eslint" %}} in your configuration to lint all valid ES6 code.

*From root folder:*

{{< highlight javascript >}}
npm install --save-dev babel-eslint
{{< /highlight >}}

*.eslintrc*

{{< highlight javascript >}}
{
  parser: "babel-eslint",
  "rules": {
  }
}
{{< /highlight >}}

You should be able to start your app. There are no errors displayed, because you didn’t specify rules yet.

{{% chapter_header "ESLint Rules" "eslintRules" %}}

ESLint rules apply for a lot of different code style use cases. You can check the {{% a_blank "list of available ESLint rules" "http://eslint.org/docs/rules/" %}}. Let’s add your first rule.

*.eslintrc*

{{< highlight javascript "hl_lines=3" >}}
...
"rules": {
  "max-len": [1, 70, 2, {ignoreComments: true}]
}
...
{{< /highlight >}}

The rule checks the length of the lines of code. When the length is more than 70 characters, you will get an error.

*From root folder:*

{{< highlight javascript >}}
npm start
{{< /highlight >}}

You might see some errors regarding your lines of code length, because some of your lines are longer than 70 characters. You can adjust the rule to allow some more characters.

*.eslintrc*

{{< highlight javascript "hl_lines=3" >}}
...
"rules": {
  "max-len": [1, 120, 2, {ignoreComments: true}]
}
...
{{< /highlight >}}

If you still see errors, it is your first chance to fix them in your codebase.

{{% chapter_header "ESLint Rules for React" "eslintRulesReact" %}}

Let’s add some code style checking for React. Therefore you need to add the {{% a_blank "eslint-plugin-react" "https://github.com/yannickcr/eslint-plugin-react" %}}.

*From root folder:*

{{< highlight javascript >}}
npm --save-dev install eslint-plugin-react
{{< /highlight >}}

Now you can use the react plugin and specify your first React rule, which says that you have to specify `PropTypes` for your React components.

*.eslintrc*

{{< highlight javascript "hl_lines=3 4 5 8" >}}
{
  parser: "babel-eslint",
  "plugins": [
    "react"
  ],
  "rules": {
    "max-len": [1, 120, 2, {ignoreComments: true}],
    "prop-types": [2]
  }
}
{{< /highlight >}}

When you start your app, you might see: `Definition for rule 'prop-types' was not found`. You might want to fix them by defining `PropTypes` for your React components.

These were your first custom JavaScript and React rules. But you can use common recommendations from the community. Such presets, like they {{% a_blank "exist for React" "https://github.com/yannickcr/eslint-plugin-react#user-content-recommended-configuration" %}}, give you a set of rules that everyone uses.

{{< highlight javascript "hl_lines=10" >}}
{
  parser: "babel-eslint",
  "plugins": [
    "react"
  ],
  "rules": {
    "max-len": [1, 120, 2, {ignoreComments: true}],
    "prop-types": [2]
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"]
}
{{< /highlight >}}

Let’s go one step further with extending the rules by another set of rules.

{{% chapter_header "Extend ESLint Rules" "eslintExtendRules" %}}

Since you don’t want to specify your own set of rules every time, there are plenty of recommendations out there. You already used one for React. Another one is the {{% a_blank "Airbnb Style Guide" "https://github.com/airbnb/javascript" %}}. Airbnb open sourced its own {{% a_blank "ESLint configuration" "https://www.npmjs.com/package/eslint-config-airbnb" %}} that everyone can use it in their ESLint configuration.

You have to install the required packages.

*From root folder:*

{{< highlight javascript >}}
npm --save-dev install eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y
{{< /highlight >}}

Now you can add Airbnbs’ ESLint configuration to your ESLint configuration. When you have a look at the installed node packages, you can see that the configuration includes JSX and React rules.

*.eslintrc*

{{< highlight javascript "hl_lines=7" >}}
{
  parser: "babel-eslint",
  "rules": {
    "max-len": [1, 120, 2, {ignoreComments: true}],
    "prop-types": [2]
  },
  "extends": ["airbnb-base"]
}
{{< /highlight >}}

You can see that it is very simple to extend the ESLint rules from someone else. We could use other extensions as well, but at this time the Airbnb Code Style and the according ESLint configuration are very popular and well accepted by developers.

{{% chapter_header "Disable ESLint Rules" "cleanUp" %}}

Now you are prepared to fix all the ESLint code style violations in your code. Start your application to see all the ESLint errors.

*From root folder:*

{{< highlight javascript >}}
npm start
{{< /highlight >}}

You might see a lot of errors in your terminal. Additionally they will appear in the developer console when you navigate to your app in the browser. Now you can begin to fix the errors. Whenever you are unsure about the error, google it and evaluate whether you want to have this rule in your code. You can either fix the error in the mentioned file or disable the rule, when you think you don’t need it.

You can disable a rule globally:

*.eslintrc*

{{< highlight javascript "hl_lines=5" >}}
{
  parser: "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "no-unused-vars": 0,
    "max-len": [1, 120, 2, {ignoreComments: true}],
    "prop-types": [2]
  }
}
{{< /highlight >}}

And you can disable a rule in a local file:

{{< highlight javascript "hl_lines=1 3" >}}
/*eslint-disable no-unused-vars*/
...some code...
/*eslint-enable no-unused-vars*/
{{< /highlight >}}

{{% chapter_header "Code Style Alternatives" "codeStyleAlternatives" %}}

There are a handful of useful **style guides** in the JavaScript and React community. It makes sense to read them even though you don't enforce every aspect in your set of rules in ESLint. As a JavaScript developer, I can highly recommend to read them though.

* {{% a_blank "Airbnb JavaScript" "https://github.com/airbnb/javascript" %}}
* {{% a_blank "Airbnb React" "https://github.com/airbnb/javascript/tree/master/react" %}}
* {{% a_blank "Idiomatic JavaScript" "https://github.com/rwaldron/idiomatic.js/" %}}

Another alternative are **code formatters**. In the JavaScript ecosystem there are two mainly used solutions that enforce an opinionated code style. These solutions will reformat your code on demand. You don't have to fix the code style violations yourself and you don't have to set up any rules. There is a default set of rules.

{{% a_blank "StandardJs" "https://github.com/feross/standard" %}} is one of these code formatters that is widely known and used in the JavaScript community. Yet recently there was another solution released with the name {{% a_blank "Prettier" "http://jlongster.com/A-Prettier-Formatter" %}}.

Both solutions can be installed globally or locally via npm. Afterward you can include these in your projects and reformat the code on demand. You can go one step further and install an editor or IDE plugin for StandardJS or Prettier. In my case, using Sublime as my editor of choice, I installed both plugins to experiment with both approaches. It is convenient to have an automatic code formatter. Finally you can configure your editor to reformat your code style, based on StandardJS or Prettier, whenever you save your file.

<hr class="section-divider">

The article taught you how to set up ESLint in a React, Babel and Webpack environment. You can now setup custom rules or extend your rules from well maintained open source projects. Additionally, you know about the common style guides to have a better understanding of how to write clean JavaScript and React code. In closing, I recommend you look for ESLint integrations for your editor, so your editor can warn you in real time whenever you violate an ESLint rule.

{{% read_more "The SoundCloud Client in React + Redux" "https://www.robinwieruch.de/the-soundcloud-client-in-react-redux/" %}}

{{% read_more "Tips to learn React + Redux" "https://www.robinwieruch.de/tips-to-learn-react-redux/" %}}
