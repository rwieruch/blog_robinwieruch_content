---
title: "How to SASS with Webpack 5 - Setup Tutorial"
description: "Learn how to use SASS in a Webpack powered JavaScript application ..."
date: "2020-10-30T11:55:46+02:00"
categories: ["Tooling", "Webpack", "Babel"]
keywords: ["webpack sass"]
hashtags: ["#Webpack"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 3 of 4 in 'Webpack with Style'-series." links={[{ prefix: "Part 1:", label: "How to set up Webpack 5 with Babel", url: "/webpack-babel-setup-tutorial/" }, { prefix: "Part 2:", label: "How to use Webpack with CSS", url: "/webpack-css" }, { prefix: "Part 4:", label: "How to use Webpack with PostCSS", url: "/webpack-postcss" }]} />

If you happen to have a custom Webpack setup, you may be wondering how to set up SASS with Webpack. This short tutorial walks you through the process. First of all, you need to install a SASS loader and a SASS to your dev dependencies:

```javascript
npm install --save-dev sass-loader node-sass
```

And second, you can use the SASS loader for all CSS and SCSS files in your Webpack configuration:

```javascript{9-10}
...

module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  ...
};
```

Then in a new *src/style.scss* file, add some CSS with SASS specific features (e.g. nested selectors) to it:

```css
h1 {
  color: red;

  &:hover {
    color: blue;
  }
}
```

And in your *src/index.js* file, or any other JS file, import this new CSS file:

```javascript
import './style.scss';
```

That's it. From here you can use SASS in your JavaScript project which is powered by Webpack.

<LinkCollection label="This tutorial is part 3 of 4 in 'Webpack with Style'-series." links={[{ prefix: "Part 1:", label: "How to set up Webpack 5 with Babel", url: "/webpack-babel-setup-tutorial/" }, { prefix: "Part 2:", label: "How to use Webpack with CSS", url: "/webpack-css" }, { prefix: "Part 4:", label: "How to use Webpack with PostCSS", url: "/webpack-postcss" }]} />