---
title: "How to use Fonts with Webpack"
description: "The tutorial walks you through a Webpack with Fonts setup to load a font as local asset to your JavaScript applications ..."
date: "2019-08-05T13:53:46+02:00"
categories: ["Tooling", "Webpack", "Babel"]
keywords: ["webpack font", "webpack fonts"]
hashtags: ["#Webpack"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 2 in 'Webpack with Fonts'-series." links={[{ prefix: "Part 1:", label: "How to set up Webpack with Babel", url: "/webpack-babel-setup-tutorial/" }]} />

In this tutorial, you will learn how to set up a local font with Webpack. We will use Open Sans, but you can decide to use any other web font as well. If you have your font files already at your disposal, don't bother about downloading them again. For our case, we will download the font to our local setup from [Google Webfonts](https://google-webfonts-helper.herokuapp.com). Therefore, follow the next steps to download your desired font files:

**1) Select Charset:** The default for the English language should be latin. If you need to support other languages, check which charsets you need to load (additionally) for your case.

**2) Select Style:** The best would be to go with as less as possible font styles, because each font style adds up to your web application's loading time. It's up to you to decide on how you want to support different font styles like bold, semibold, italic, light and a variation of all of them.

**3) Select Browser Support:** You can already see at this step that fonts come with different file extensions. If you choose the file formats woff and woff2, you are good to go with modern browsers. However, if you need to support other/older browsers, you may need to include fallbacks for truetype, embedded-opentype and svg too.

Finally download all your selected font styled in your desired charset(s) for all the selected browser supported extensions. For instance, if you have selected Open Sans with charset latin, the font style regular, italic and bold, and the modern browser supported extensions woff and woff2, you will end up with 6 font files (3 font styles * 2 browser supported extensions).

That's it for having your desired font files for your web application at your disposal. Next we are going to set up these fonts with Webpack.

*Note: If you don't want to download your font files for your local setup, but let the download happen on the fly when loading your web application, it's sufficient to just include a link in your HTML to load the font. [Here you can find the sources with their links to popular fonts.](https://fonts.google.com) If you are doing it this way, you don't need to set up Webpack for it.*

```javascript
<link
  href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
  rel="stylesheet"
>
```

# Webpack Font Setup

There is not much in Webpack to include your desired font for your web application. First, put your font files into one folder of your projects application. For instance, your *src/* folder may have a folder *assets/* which has a folder *fonts/*.

```javascript
- src/
--- assets/
----- fonts/
------- OpenSans-Bold.woff
------- OpenSans-Bold.woff2
------- OpenSans-Regular.woff
------- OpenSans-Regular.woff2
------- OpenSans-Italic.woff
------- OpenSans-Italic.woff2
```

Second, install a commonly used Webpack loader to include the fonts into your bundling process:

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
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  ...
};
```

It's quite similar to setting up [images with Webpack](/webpack-images/). In this case, we are only bundling the woff and woff2 font file extensions to our application. However, if you need to include other file extensions for older browsers as fallbacks, make sure to include them here as well. Also the [url-loader](https://github.com/webpack-contrib/url-loader) supports optional options which you should read more about in the official documentation.

# Define @font-face in CSS-in-JS

Previously, you included your font files in your Webpack bundle. Now you can import them in your web application and include them in your [@font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) definitions. In our example, we will be using CSS-in-JS to define your styles in general, but also to define our font in JavaScript.

```javascript
import OpenSansRegularWoffTwo from './assets/fonts/OpenSans-Regular.woff2';
import OpenSansRegularWoff from './assets/fonts/OpenSans-Regular.woff';

const myGlobalCSS = `
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: normal;
    src:
      url('${OpenSansRegularWoffTwo}') format('woff2'),
      url('${OpenSansRegularWoff}') format('woff');
  }

  html, body {
    font-family: 'Open Sans', sans-serif;
  }
`;
```

In this example, we are defining the regular font style for Open Sans in a @font-face definition. As sources, we are using the imported font files with the relevant extensions for modern browsers. Whereas the first defined url is our primary source, the second defined url is our fallback source. If none of these sources apply, our browser will fallback to a default font (e.g. Helvetica).

*Note: You can check your **actual** rendered font in your browser's web development tools with the following steps. Notice that the output in step 4 and 5 must not be the same, because 4 is your desired/defined font and 5 the actual rendered font. For instance, if the German ß is not supported by your font definition -- like in the image --, there would be a fallback to your browser's font.*

![rendered font](./images/rendered-font.jpg)

Also you can specify more than one font style with your font face definitions. If you wouldn't specify font styles for italic or semibold for example, your browser would do its own fallback for these font variations.

```javascript
import OpenSansRegularWoffTwo from './assets/fonts/OpenSans-Regular.woff2';
import OpenSansRegularItalicWoffTwo from './assets/fonts/OpenSans-RegularItalic.woff2';
import OpenSansSemiBoldWoffTwo from './assets/fonts/OpenSans-SemiBold.woff2';

import OpenSansRegularWoff from './assets/fonts/OpenSans-Regular.woff';
import OpenSansRegularItalicWoff from './assets/fonts/OpenSans-RegularItalic.woff';
import OpenSansSemiBoldWoff from './assets/fonts/OpenSans-SemiBold.woff';

const myGlobalCSS = `
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: normal;
    src:
      url('${OpenSansRegularWoffTwo}') format('woff2'),
      url('${OpenSansRegularWoff}') format('woff');
  }

  @font-face {
    font-family: 'Open Sans';
    font-style: italic;
    font-weight: normal;
    src:
      url('${OpenSansRegularItalicWoffTwo}') format('woff2'),
      url('${OpenSansRegularItalicWoff}') format('woff');
  }

  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    src:
      url('${OpenSansSemiBoldWoffTwo}') format('woff2'),
      url('${OpenSansSemiBoldWoff}') format('woff');
  }

  html, body {
    font-family: 'Open Sans', sans-serif;
  }
`;
```

Another example shows you how to use the popular [styled-components](/react-styled-components/) library for CSS-in-JS in a React application. Since Styled Components can be used in other frameworks as well, it could be your status quo on how to include your fonts next to your CSS-in-JS style definitions:

```javascript
import React from 'react';
import { createGlobalStyle } from 'styled-components';

import OpenSansRegularWoffTwo from './assets/fonts/OpenSans-Regular.woff2';
import OpenSansRegularWoff from './assets/fonts/OpenSans-Regular.woff';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: normal;
    src:
      url('${OpenSansRegularWoffTwo}') format('woff2'),
      url('${OpenSansRegularWoff}') format('woff');
  }

  html, body {
    font-family: 'Open Sans', sans-serif;
  }
`;

const App = ({ title }) => (
  <>
    <GlobalStyle />
    <div>{title}</div>
  </>
);

export default App;
```

Hopefully this tutorial has helped you to set up local fonts with Webpack in your JavaScript application. In the comments below, let me know about your techniques to include fonts and define font faces.
