---
title: "How to CSS with Webpack 5 - Setup Tutorial"
description: "Learn how to use CSS in a Webpack powered JavaScript application ..."
date: "2020-10-30T11:55:46+02:00"
categories: ["Webpack", "Babel"]
keywords: ["webpack css"]
hashtags: ["#Webpack"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 4 in 'Webpack with Style'-series." links={[{ prefix: "Part 1:", label: "How to set up Webpack 5 with Babel", url: "/webpack-babel-setup-tutorial/" }, { prefix: "Part 3:", label: "How to use Webpack with SASS", url: "/webpack-sass/" }, { prefix: "Part 4:", label: "How to use Webpack with PostCSS", url: "/webpack-postcss/" }]} />

<LinkCollection label="This tutorial is part 2 of 3 in 'Webpack with Font'-series." links={[{ prefix: "Part 1:", label: "How to set up Webpack 5 with Babel", url: "/webpack-babel-setup-tutorial/" }, { prefix: "Part 3:", label: "How to use Webpack with Fonts", url: "/webpack-font/" }]} />

If you happen to have a custom Webpack setup, you may be wondering how to set up CSS with Webpack. This short tutorial walks you through the process. First of all, you need to install a CSS loader and a style loader to your dev dependencies:

```javascript
npm install --save-dev css-loader style-loader
```

And second, you can use both loaders for all CSS files in your Webpack configuration:

```javascript{8-11}
...

module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  ...
};
```

Then in a new *src/style.css* file, add some CSS to it:

```css
h1 {
  color: red;
}
```

And in your *src/index.js* file, or any other JS file, import this new CSS file:

```javascript
import './style.css';
```

That's it. From here you can use CSS in your JavaScript project which is powered by Webpack.

# CSS with Webpack in Production

If you happen to have a [Webpack configuration for development and production](/webpack-advanced-setup-tutorial/), you will need a different configuration for production when using CSS.

First, install the MiniCssExtractPlugin for Webpack to your dev dependencies:

```javascript
npm install --save-dev mini-css-extract-plugin
```

And second, use it in your Webpack's production configuration instead of style loader and additionally as a plugin:

```javascript{2,11,18}
...
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    ...
  ],
  ...
};
```

That's it. Once you build your project with Webpack, you will see the style files showing up in your *dist/* folder.

<LinkCollection label="This tutorial is part 2 of 4 in 'Webpack with Style'-series." links={[{ prefix: "Part 1:", label: "How to set up Webpack 5 with Babel", url: "/webpack-babel-setup-tutorial/" }, { prefix: "Part 3:", label: "How to use Webpack with SASS", url: "/webpack-sass/" }, { prefix: "Part 4:", label: "How to use Webpack with PostCSS", url: "/webpack-postcss/" }]} />

<LinkCollection label="This tutorial is part 2 of 3 in 'Webpack with Font'-series." links={[{ prefix: "Part 1:", label: "How to set up Webpack 5 with Babel", url: "/webpack-babel-setup-tutorial/" }, { prefix: "Part 3:", label: "How to use Webpack with Fonts", url: "/webpack-font/" }]} />