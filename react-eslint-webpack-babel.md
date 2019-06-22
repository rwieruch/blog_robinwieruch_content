+++
title = "How to use ESLint in React"
description = "You want to setup ESLint in your React application? Your project is set up with Babel and Webpack? This tutorial will guide you through the ESLint in React setup ..."
date = "2019-06-15T13:56:46+02:00"
tags = ["React", "JavaScript", "Tooling"]
categories = ["React", "JavaScript", "Tooling"]
keywords = ["react eslint"]
news_keywords = ["react eslint"]
hashtag = "#ReactJs"
card = "img/posts/react-eslint-webpack-babel/banner_640.jpg"
banner = "img/posts/react-eslint-webpack-babel/banner.jpg"
contribute = "react-eslint-webpack-babel.md"
headline = "How to use ESLint in React"

summary = "You want to setup ESLint in your React application? Your project is set up with Babel and Webpack? This tutorial will guide you through the ESLint in React setup."
+++

{{% sponsorship %}}

{{% pin_it_image "react eslint" "img/posts/react-eslint-webpack-babel/banner.jpg" "is-src-set" %}}

{{% read_before_2 "This tutorial is part 3 of 3 in the series." "Part 1:" "How to set up React with Webpack and Babel" "https://www.robinwieruch.de/minimal-react-webpack-babel-setup/" "Part 2:" "How to use ESLint in Webpack" "https://www.robinwieruch.de/eslint-webpack/" %}}

In this tutorial I want to walk you through setting up ESLint for React. You should go through the previous tutorials in order to learn about the basic setup for Webpack and ESLint though. It will also tell you about all the benefits that come with the code style improvements which ESLint is giving your projects.

{{% chapter_header "Webpack and Babel for React ESLint" "eslint-react" %}}

First, you need to make sure that your *.babelrc* (or *package.json*) supports JSX and the ESLint loader from the previous tutorials. It's important that ESLint is used within your Webpack build to enforce your code style for every of your npm scripts which run Webpack. Also Webpack needs to know about React (JSX) at all.

{{< highlight javascript "hl_lines=5 7" >}}
...
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ["babel-loader", "eslint-loader"]
    }
  ]
},
...
{{< /highlight >}}

That's everything you need to introduce your first ESLint rules for React.

{{% chapter_header "ESLint Rules for React" "eslint-rules-react" %}}

Previously, you have read that there are pre-configured ESLint configurations out there. Perhaps you have used the Airbnb configuration which already comes with rules for React. If not, a brief recap on how you would introduce the Airbnb style guide for your ESLint configuration. First, install the Airbnb configuration in addition to all its peer dependencies:

{{< highlight javascript >}}
npx install-peerdeps --dev eslint-config-airbnb
{{< /highlight >}}

Afterward, you can introduce it in your *.eslintrc* configuration file for ESLint:

{{< highlight javascript "hl_lines=3" >}}
{
  "parser": "babel-eslint",
  "extends": ["airbnb"]
}
{{< /highlight >}}

That's it. After running your npm start script which uses Webpack, you should see all the ESLint violations, regarding React but also JavaScript, on your command line. If you have installed an IDE/editor extension/plugin, you should see the ESLint violations there as well.

<hr class="section-divider">

Airbnb's ESLint config is only one of many popular pre-configured sets of ESLint rules. If you just want to double down on React, you may want to check out the {{% a_blank "ESLint plugin for React" "https://github.com/yannickcr/eslint-plugin-react" %}}. It comes with lots of recommendations from the React community. However, if you need a full-blown ESLint solution for React in addition to JavaScript, you are good to go with Airbnb's code style recommendations.

{{% read_before_2 "This tutorial is part 1 of 3 in the series." "Part 2:" "How to use Prettier in VS Code" "https://www.robinwieruch.de/how-to-use-prettier-vscode/" "Part 3:" "How to make Prettier work with ESLint" "https://www.robinwieruch.de/prettier-eslint/" %}}