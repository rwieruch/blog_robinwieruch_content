---
title: "How to use CSS Modules in React?"
description: "How to set up CSS Modules in React with Webpack or Create React App. Everything you need to know to get started with CSS Modules in React ..."
date: "2019-10-19T13:50:46+02:00"
categories: ["React"]
keywords: ["react css modules"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection
  label="This tutorial is part 2 of 2 in the series."
  links={
    [
      {
        prefix: "Part 1:",
        label: "How to set up React with Webpack and Babel",
        url: "/minimal-react-webpack-babel-setup/"
      }
    ]
  }
/>

CSS Modules are one of the most popular ways for styling React components. Whether you are using only CSS or a more advanced pre-processor like SASS, it doesn't matter for CSS Modules: You can write all these styles in your style sheet files next to your React components.

Since we are building up on top of a custom React + Webpack application, it needs some set up from our side before we can start using CSS Modules in React. I want to thank [Arpit Batra for showing use how it works](https://github.com/rwieruch/advanced-react-webpack-babel-setup/pull/9).

*Note: If you are using create-react-app, just follow this [Create React App with CSS Modules tutorial](/create-react-app-css-modules/). It comes with CSS Modules out of the box. If you are using your custom React + Webpack setup, maybe from a previous tutorial of mine, keep reading for setting up CSS Modules in your custom React project.*

First, we need some more loaders for Webpack. These loaders enable Webpack to bundle CSS files as well:

```javascript
npm install css-loader style-loader --save-dev
```

And second, in your *webpack.config.js* file, add the new loaders for interpreting CSS files:

```javascript{6-18}
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  ...
};
```

That's already it for the CSS Modules setup in Webpack. Next, you can define your first CSS file. Let's name it *src/style.css*:

```css{1-3}
.title {
  color: blueviolet;
}
```

Then you can import the CSS file in one of your React components. Afterward, you are already able to use the CSS class defined in the CSS file in your React component. Just import it and use its defined CSS class as className prop in your React component.

```javascript{3,6}
import React from 'react';

import styles from './style.css';

const App = ({ title }) => (
  <div className={styles.title}>{title}</div>
);

export default App;
```

From here you are prepared to add more CSS files next to your React components. Normally one would use one style file for each React component. In this CSS file, you are free to add as many CSS classes as you need to style your React component. Simply import the styles from the CSS file and use them as shown before in your React component.

<ReadMore label="Alternative to CSS Modules: Styled Components" link="/react-styled-components/" />