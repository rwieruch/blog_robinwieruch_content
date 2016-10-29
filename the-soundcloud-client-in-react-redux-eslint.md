+++
title = "React ESLint: Code Style like Airbnb in React"
description = "The React ESLint: Code Style like Airbnb in React tutorial will teach you how to setup ESLint in a React + Babel + Webpack environment. In addition to the.."
date = "2015-06-18T13:50:46+02:00"
tags = ["React"]
categories = ["React"]
keyword = "react eslint"
news_keywords = ["react eslint"]
banner = "img/posts/the-soundcloud-client-in-react-redux-eslint/banner.jpg"
contribute = "the-soundcloud-client-in-react-redux-eslint.md"

summary = "The React ESLint: Code Style like Airbnb in React tutorial will teach you how to setup ESLint in a React + Babel + Webpack environment. In addition to the setup of usual code style rules, you will add React rules to enforce a better code style in your React environment as well. Moreover you will learn how to extend your ESLint rules with existing best practices rules of companies like Airbnb."
+++

# React ESLint: Code Style like Airbnb in React

{{% image_alt "react eslint" "/img/posts/the-soundcloud-client-in-react-redux-eslint/banner.jpg" %}}

{{% read_before "This tutorial is part 2 of 2 in the series." "Part 1:" "The SoundCloud Client in React + Redux" "http://www.robinwieruch.de/the-soundcloud-client-in-react-redux/" %}}

The React ESLint: Code Style like Airbnb in React tutorial will teach you how to setup ESLint in a React + Babel + Webpack environment. In addition to the setup of usual code style rules, you will add React rules to enforce a better code style in your React environment as well. Moreover you will learn how to extend your ESLint rules with existing best practices rules of companies like Airbnb.

{{% build_on_the_soundcloud_client_in_react_redux %}}

{{% chapter_header "Table of Contents" "toc" %}}

* [ESLint](#eslint)
* [ESLint + Babel](#eslintBabel)
* [ESLint Rules](#eslintRules)
* [ESLint Rules for React](#eslintRulesReact)
* [Extend ESLint Rules](#eslintExtendRules)
* [Clean Up](#cleanUp)
* [Troubleshoot](#troubleshoot)
* [Final Thoughts](#finalThoughts)

{{% chapter_header "ESLint" "eslint" %}}

Why do we want to install {{% a_blank "ESLint" "http://eslint.org/" %}} in the first place? A linter like ESLint helps you to maintain a consistent code style in your project. Especially when a project grows and multiple people are involved, you want to enforce some best practices.

Let’s get started by installing the {{% a_blank "eslint" "https://github.com/eslint/eslint" %}} package.

*From root folder:*

{{< highlight javascript >}}
npm --save-dev install eslint
{{< /highlight >}}

Since we are using Webpack, we have to tell Webpack that we want to use eslint in our build. Therefore we can install {{% a_blank "eslint-loader" "https://github.com/MoOx/eslint-loader" %}}.

*From root folder:*

{{< highlight javascript >}}
npm --save-dev install eslint-loader
{{< /highlight >}}

Now we can use the loader in our Webpack configuration.

*webpack.config.js*

{{< highlight javascript "hl_lines=9 10 11 12 13" >}}
...
module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }
  ]
},
...
{{< /highlight >}}

Moreover we can either specify our rules within the webpack configuration or follow a best practice to have a dedicated file for the rules. We will do the latter one.

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

Later on we can specify rules in the file. But first let’s require the file in our Webpack configuration.

*webpack.config.js*

{{< highlight javascript "hl_lines=7 8 9" >}}
...
devServer: {
  contentBase: './dist',
  hot: true,
  historyApiFallback: true
},
eslint: {
  configFile: './.eslintrc'
},
plugins: [
...
{{< /highlight >}}

Now you can start your app.

*From root folder:*

{{< highlight javascript >}}
npm start
{{< /highlight >}}

You might run into Parsing error: `The keyword 'import' is reserved`, which happens because ESLint does not know about ES6 features (like import) yet, which [we enabled via Babel](http://www.robinwieruch.de/the-soundcloud-client-in-react-redux/#babel).

{{% chapter_header "ESLint + Babel" "eslintBabel" %}}

Previously we already installed the {{% a_blank "babel-loader" "https://github.com/babel/babel-loader" %}} to transpile our code with Webpack. Now we can use that loader and pair it with the eslint-loader.

*webpack.config.js*

{{< highlight javascript "hl_lines=12" >}}
...
module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader', 'eslint-loader']
    }
  ]
},
...
{{< /highlight >}}

> An alternative would be to use Webpacks’ preLoaders.

*webpack.config.js*

{{< highlight javascript "hl_lines=3 4 5 6 7 8 9" >}}
...
module: {
  preLoaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    },
  ],
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }
  ]
},
...
{{< /highlight >}}

Additionally we have to use {{% a_blank "babel-eslint" "https://github.com/babel/babel-eslint" %}} to lint all valid ES6 code.

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

You should be able to start your app. There are no errors displayed, because we didn’t specify any rules yet.

{{% chapter_header "ESLint Rules" "eslintRules" %}}

Let’s add our first rule.

*.eslintrc*

{{< highlight javascript "hl_lines=3" >}}
...
"rules": {
  "max-len": [1, 70, 2, {ignoreComments: true}]
}
...
{{< /highlight >}}

We added a rule to check the length of our lines of code. When the length is over 70 characters, we will get an error.

*From root folder:*

{{< highlight javascript >}}
npm start
{{< /highlight >}}

You might see some errors regarding of your line of code length, because some of your lines are longer than 70 characters. We can adjust the rule to allow some more characters.

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

Let’s add some code style checking for React. Therefore we need to add the {{% a_blank "eslint-plugin-react" "https://github.com/yannickcr/eslint-plugin-react" %}}.

*From root folder:*

{{< highlight javascript >}}
npm --save-dev install eslint-plugin-react
{{< /highlight >}}

Now we can use the react plugin and specify our first rule, which says that we have to specify PropTypes for our components.

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

When you start your app, you might see PropTypes definition errors. You might want to fix them.

Additionally you can use {{% a_blank "presets" "https://github.com/yannickcr/eslint-plugin-react#user-content-recommended-configuration" %}} which will give you a rule set of recommended React rules. But let’s go one step further by extending our rules.

{{% chapter_header "Extend ESLint Rules" "eslintExtendRules" %}}

Since we don’t want to specify our own rule set every time, there are plenty of best practices rules out there. One of them is the {{% a_blank "Airbnb Style Guide" "https://github.com/airbnb/javascript" %}}. Moreover Airbnb open sourced its own {{% a_blank "ESLint configuration" "https://www.npmjs.com/package/eslint-config-airbnb" %}}.

Some of the required packages we already installed, but some are missing:

*From root folder:*

{{< highlight javascript >}}
npm --save-dev install eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y
{{< /highlight >}}

Now we can add a one-liner to our ESLint configuration to use Airbnbs’ ESLint configuration. When you look back at the packages we installed, you can see that the configuration includes JSX and React rules.

*.eslintrc*

{{< highlight javascript "hl_lines=3" >}}
{
  parser: "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "max-len": [1, 120, 2, {ignoreComments: true}],
    "prop-types": [2]
  }
}
{{< /highlight >}}

You can see that it is very simple to extend the ESLint rules from someone else. We could use other extensions as well, but at this time the Airbnb Code Style and the ESLint configuration are very popular and well accepted by developers.

{{% chapter_header "Clean Up" "cleanUp" %}}

Now we are ready to fix all the ESLint errors in our code base!

*From root folder:*

{{< highlight javascript >}}
npm start
{{< /highlight >}}

You might see a lot of errors in your terminal. Additionally they will appear in the console output, when you navigate to your app in the browser. Now you can start to fix the errors. Whenever you are unsure about the error, google it and evaluate whether you want to have this rule in your codebase. You can either fix the error in the mentioned file or disable the rule, when you think you don’t need it.

Here I have one example of disabling a rule globally:

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

But rather than disabling it globally, you can also do it for an area in your codebase.

{{< highlight javascript "hl_lines=1 3" >}}
/*eslint-disable no-unused-vars*/
...some code...
/*eslint-enable no-unused-vars*/
{{< /highlight >}}

{{% chapter_header "Troubleshoot" "troubleshoot" %}}

You may encounter issues in that tutorial. Here you will find some references how to handle issues.

### Dependencies

In case you want to know which versions npm installed during that tutorial, here a list of all npm packages in my package.json.

*package.json*

{{< highlight javascript >}}
  "devDependencies": {
    "babel-core": "^6.9.1",
    "babel-eslint": "^6.0.4",
    "babel-loader": "^6.2.4",
    "babel-preset-es2015": "^6.9.0",
    "babel-preset-react": "^6.5.0",
    "babel-preset-stage-2": "^6.5.0",
    "chai": "^3.5.0",
    "enzyme": "^2.3.0",
    "eslint": "^2.13.0",
    "eslint-config-airbnb": "^9.0.1",
    "eslint-loader": "^1.3.0",
    "eslint-plugin-import": "^1.8.1",
    "eslint-plugin-jsx-a11y": "^1.5.3",
    "eslint-plugin-react": "^5.2.2",
    "exports-loader": "^0.6.3",
    "imports-loader": "^0.6.5",
    "jsdom": "^9.2.1",
    "mocha": "^2.5.3",
    "react-addons-test-utils": "^15.1.0",
    "react-hot-loader": "^1.3.0",
    "webpack": "^1.13.1",
    "webpack-dev-server": "^1.14.1"
  },
  "dependencies": {
    "react": "^15.1.0",
    "react-dom": "^15.1.0",
    "react-redux": "^4.4.5",
    "react-router": "^2.4.1",
    "react-router-redux": "^4.0.5",
    "redux": "^3.5.2",
    "redux-logger": "^2.6.1",
    "redux-thunk": "^2.1.0",
    "soundcloud": "^3.1.2",
    "whatwg-fetch": "^1.0.0"
  }
{{< /highlight >}}

{{% chapter_header "Final Thoughts" "finalThoughts" %}}

{{% look_again_the_soundcloud_client_in_react_redux %}}
