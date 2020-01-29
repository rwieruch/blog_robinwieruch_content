---
date: "2019-08-05T13:53:46+02:00"
title: "How to use Images with Webpack"
description: "The tutorial walks you through a Webpack with Images setup to load an image as local asset to your JavaScript applications ..."
categories: ["Tooling", "Webpack", "Babel"]
keywords: ["webpack images"]
hashtags: ["#JavaScript", "#Webpack"]
banner: "./images/banner.jpg"
author: ""
contribute: ""
---

<Sponsorship />

<LinkCollection
  label="This tutorial is part 2 of 2 in this series."
  links={[
    {
      prefix: "Part 1:",
      label: "How to set up Webpack with Babel",
      url: "https://www.robinwieruch.de/webpack-babel-setup-tutorial/",
    },
  ]}
/>

In this tutorial, you will learn how to set up Webpack to use images as assets for your application. Essentially, there is not much in Webpack to include your desired images for your web application. First, put your image files into one folder of your projects application. For instance, your *src/* folder may have a folder *assets/* which has a folder *images/*.

```javascript
- src/
--- assets/
----- images/
------- myimage.jpg
```

Second, install a commonly used Webpack loader to include the images into your bundling process:

```javascript
npm install url-loader --save-dev
```

And third, include the new loader in your Webpack configuration:

```javascript{6,7,8,9,10,11}
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  ...
};
```

It's quite similar to setting up [fonts with Webpack](/webpack-font/). In this case, we are only bundling the jpg and png image file extensions to our application. However, if you need to include other file extensions for images, make sure to include them here as well. Also the [url-loader](https://github.com/webpack-contrib/url-loader) supports optional options which you should read more about in the official documentation.

Now you are able to import your images as assets from your bundled folders. For instance, in React you can include an image the following way by using an img HTML element and its src attribute:

```javascript
import React from 'react';

import MyImage from './assets/images/myimage.jpg';

const App = ({ title }) => (
  <div>
    <span>{title}</span>
    <img src={MyImage} alt="torchlight in the sky" />
  </div>
);

export default App;
```

Hopefully this tutorial has helped you to set up images with Webpack in your JavaScript application. In the comments below, let me know about your techniques to include images.
