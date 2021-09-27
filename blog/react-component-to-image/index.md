---
title: "Image from React Component (JPG or PNG)"
description: "How to generate an image from a React component by extracting it as JPG or PNG ..."
date: "2021-09-26T07:52:46+02:00"
categories: ["React"]
keywords: ["react component image", "react component jpg", "react component png"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A brief tutorial on how to **generate an image (JPG or PNG) from a React component**. Use case: Sometimes when you have a React project, you want to give users the ability to download an area of your application as image. For example, when you display charts based on data, a user should be able to export the chart as image. In this React tutorial, I want to show you how it works.

First, you have to declare a certain area in your application that should be downloadable as image by using an `id` attribute in your DOM:

```javascript{5}
const App = () => {
  return (
    <div>
      <div>I will not be in the image.</div>
      <div id="print">I will be in the image.</div>
    </div>
  );
};
```

Second, create a button with an [event handler](/react-event-handler) where you will implement the logic to download the part of the component as image:

```javascript{2-4,8-10}
const App = () => {
  const handleDownloadImage = () => {
    // TODO: logic
  };

  return (
    <div>
      <button type="button" onClick={handleDownloadImage}>
        Download as Image
      </button>

      <div>I will not be in the image.</div>
      <div id="print">I will be in the image.</div>
    </div>
  );
};
```

Third, install a library called [html2canvas](https://github.com/niklasvh/html2canvas) via your command line:

```text
npm install html2canvas
```

And fourth, use the library to draw the component on a canvas and to transform it into an image:

```javascript{1,4-21}
import html2canvas from 'html2canvas';

const App = () => {
  const handleDownloadImage = async () => {
    const element = document.getElementById('print');
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleDownloadImage}>
        Download as Image
      </button>

      <div>I will not be in the image.</div>
      <div id="print">I will be in the image.</div>
    </div>
  );
};
```

That's it. If you want to download the image as JPG and not PNG, just exchange jpg with png wherever it is used. If you want to go a bit further and download a PDF instead of an image, then head over to this tutorial: [How to create a PDF from a React component](/react-component-to-pdf).



