+++
title = "How to set up Webpack with Babel [Tutorial]"
description = "A step by step tutorial on how to integrate Babel into Webpack to access powerful JavaScript features (ES6, ES7, ES8, ES9) from the future ..."
date = "2019-06-15T13:52:46+02:00"
tags = ["JavaScript", "Tooling", "Webpack", "Babel"]
categories = ["JavaScript", "Tooling", "Webpack", "Babel"]
keywords = ["webpack babel"]
news_keywords = ["webpack babel"]
hashtag = "#Webpack"
card = "img/posts/webpack-babel-setup-tutorial/banner_640.jpg"
banner = "img/posts/webpack-babel-setup-tutorial/banner.jpg"
contribute = "webpack-babel-setup-tutorial.md"
headline = "How to set up Webpack with Babel [Tutorial]"

summary = "A step by step tutorial on how to integrate Babel into Webpack to access powerful JavaScript features (ES6, ES7, ES8, ES9) from the future."
+++

{{% sponsorship %}}

{{% pin_it_image "webpack babel" "img/posts/webpack-babel-setup-tutorial/banner.jpg" "is-src-set" %}}

{{% read_before_2 "This tutorial is part 3 of 3 in the 'Frontend Setup'-series." "Part 1:" "How to set up a modern JavaScript project" "https://www.robinwieruch.de/javascript-project-setup-tutorial/" "Part 2:" "How to set up a Webpack project" "https://www.robinwieruch.de/webpack-setup-tutorial/" %}}

{{% a_blank "Babel" "https://babeljs.io/" %}} enables one writing code with JavaScript features that aren't supported by most browser yet. Perhaps you have heard about {{% a_blank "JavaScript ES6 (ES2015)" "https://babeljs.io/docs/learn-es2015/" %}}, ES7, and other versions of ECMAScript specification which are up and coming for the JavaScript language. At the time of reading this, various versions may be already included in the JavaScript language.

By using Babel, the code which isn't supported yet, will get transpiled back to vanilla JavaScript so that every environment (e.g. browser) can interpret it. In order to get Babel running, you need to install two of its main dependencies on the command line:

{{< highlight javascript >}}
npm install --save-dev @babel/core @babel/preset-env
{{< /highlight >}}

Moreover, in case you have Webpack in place to bundle your JavaScript application, you will have to install a {{% a_blank "Webpack Loader" "https://webpack.js.org/loaders/" %}} for Babel:

{{< highlight javascript >}}
npm install --save-dev babel-loader
{{< /highlight >}}

Now, with all libraries (node packages) in place, you need to adjust your *package.json* and *webpack.config.js* (if necessary) to respect the Babel changes. These changes will include all packages you have installed before. First, in your *package.json*, include the {{% a_blank "Babel Preset" "https://babeljs.io/docs/en/presets" %}}:

{{< highlight javascript "hl_lines=3 4 5 6 7" >}}
{
  ...
  "babel": {
    "presets": [
      "@babel/preset-env"
    ]
  },
  ...
}
{{< /highlight >}}

*"[The] @babel/preset-env [preset] is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This both makes your life easier and JavaScript bundles smaller!" ({{% a_blank "Source" "https://babeljs.io/docs/en/babel-preset-env" %}})*

Second, your *webpack.config.js* file needs to include Babel in its build process as well. There, make use of the previously installed {{% a_blank "Loader for Babel" "https://github.com/babel/babel-loader" %}}. You need to tell Webpack on which files to use the loader (e.g. *.js* files) and optionally which folders to exclude from the process (e.g. *node_modules*):

{{< highlight javascript "hl_lines=3 4 5 6 7 8 9 10 11 12 13 14" >}}
module.exports = {
  entry: './src/index.js',
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
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  }
};
{{< /highlight >}}

You can start your application again. Nothing should have changed except for that you can use upcoming {{% a_blank "ECMAScript features for JavaScript" "https://github.com/tc39/proposals" %}} now. An optional step would be to extract your Babel configuration into a separate *.babelrc* configuration file. You can create this file in your project's root directory on the command line:

{{< highlight javascript >}}
touch .babelrc
{{< /highlight >}}

Then, add the configuration for Babel -- which you have previously added in your *package.json* -- in the *.babelrc* file. Don't forget to remove the configuration in the *package.json* afterward. It should be configured only once.

{{< highlight javascript >}}
{
  "presets": [
    "@babel/preset-env"
  ]
}
{{< /highlight >}}

Babel enables you to use future JavaScript features in your browser, because it transpiles it down to vanilla JavaScript. Try it yourself by installing your first plugin. Make sure to see that the JavaScript feature doesn't work at first in your *src/index.js* file, but once you installed the plugin for the feature and integrated it in your *.babelrc* file, it should be possible to run the JavaScript source code.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/rwieruch/minimal-webpack-babel-setup" %}}
* Try out a Babel Plugin yourself
  * Install a {{% a_blank "Babel Plugin" "https://babeljs.io/docs/en/plugins" %}} via npm to your project to support an upcoming JavaScript feature
  * Add the Plugin to your *.babelrc* file
  * Try the new JavaScript feature in your *src/index.js* file
* Try Imports
  * Create another JavaScript file in your *src/* folder
  * Import the new JavaScript file in your *src/index.js* file
  * Add a logging statement to your new JavaScript file and check whether it shows up in the browser

{{% read_before "This tutorial is part 1 of 2 in 'React Setup'-series." "Part 2:" "How to set up React with Webpack and Babel" "https://www.robinwieruch.de/minimal-react-webpack-babel-setup/" %}}

{{% read_before "This tutorial is part 1 of 2 in 'Webpack with ESLint'-series." "Part 2:" "How to use ESLint in Webpack" "https://www.robinwieruch.de/webpack-eslint/" %}}

{{% read_before "This tutorial is part 1 of 2 in 'Webpack with Fonts'-series." "Part 2:" "How to use Fonts with Webpack" "https://www.robinwieruch.de/webpack-font/" %}}

{{% read_before "This tutorial is part 1 of 2 in 'Webpack with Images'-series." "Part 2:" "How to use Images with Webpack" "https://www.robinwieruch.de/webpack-images/" %}}

{{% read_before_2 "This tutorial is part 2 of 3 in 'Webpack Setup'-series." "Part 1:" "How to set up a Webpack project" "https://www.robinwieruch.de/webpack-setup-tutorial/" "Part 3:" "How to set up an advanced Webpack application" "https://www.robinwieruch.de/webpack-advanced-setup-tutorial/" %}}