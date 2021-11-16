---
title: "How to PostCSS with Webpack 5 - Setup Tutorial"
description: "Learn how to use PostCSS in a Webpack powered JavaScript application ..."
date: "2020-10-30T11:55:46+02:00"
categories: ["Tooling", "Webpack", "Babel"]
keywords: ["webpack postcss"]
hashtags: ["#Webpack"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 4 of 4 in 'Webpack with Style'-series." links={[{ prefix: "Part 1:", label: "How to set up Webpack 5 with Babel", url: "/webpack-babel-setup-tutorial/" }, { prefix: "Part 2:", label: "How to use Webpack with CSS", url: "/webpack-css/" }, { prefix: "Part 3:", label: "How to use Webpack with SASS", url: "/webpack-sass/" }]} />

If you happen to have a custom Webpack setup, you may be wondering how to set up PostCSS with Webpack. This short tutorial walks you through the process. First of all, you need to install the PostCSS loader and a sensible PostCSS configuration to your dev dependencies:

```javascript
npm install --save-dev postcss-loader postcss-preset-env
```

Next, create a *postcss.config.js* file where you will reference all your PostCSS plugins. In this case, we will use the most commonly used PostCSS plugin called [postcss-preset-env](https://www.npmjs.com/package/postcss-preset-env) which enables sensible defaults:

```javascript
module.exports = {
  plugins: [
    require('postcss-preset-env')({
      browsers: 'last 2 versions',
    }),
  ],
};

```

Last, use the PostCSS loader for all CSS (and SCSS, if you happen to have SASS too) files in your Webpack configuration:

```javascript{10}
...

module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  ...
};
```

Now, if you are using CSS like the following, it will be automatically prefixed for certain browsers:

```css
// before

.column {
  display: flex;
  flex-direction: column;
}

// after
.column {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
```

This is only one default coming with the PostCSS presets. You can explore more of them on their website or explore more [PostCSS plugins](https://postcss.org/).

<ReadMore label="How to use Fonts with Webpack" link="/webpack-font/" />