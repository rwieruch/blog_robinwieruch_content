---
title: "PDF from React Component"
description: "How to print a PDF from a React component and download it as PDF by generating ..."
date: "2021-09-26T07:52:46+02:00"
categories: ["React"]
keywords: ["react component pdf"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A brief tutorial on how to **generate a PDF from a React component**. Use case: Sometimes when you have a React project, you want to give users the ability to download an area of your application as PDF. For example, when you display charts based on data, a user should be able to export the chart as PDF. In this React tutorial, I want to show you how it works.

First, you have to declare a certain area in your application that should be downloadable as PDF by using a [React ref](/react-ref/):

```javascript{2,7}
const App = () => {
  const printRef = React.useRef();

  return (
    <div>
      <div>I will not be in the PDF.</div>
      <div ref={printRef}>I will be in the PDF.</div>
    </div>
  );
};
```

Second, create a button with an [event handler](/react-event-handler/) where you will implement the logic to download the part of the component as PDF:

```javascript{4-6,10-12}
const App = () => {
  const printRef = React.useRef();

  const handleDownloadPdf = () => {
    // TODO: logic
  };

  return (
    <div>
      <button type="button" onClick={handleDownloadPdf}>
        Download as PDF
      </button>

      <div>I will not be in the PDF.</div>
      <div ref={printRef}>I will be in the PDF.</div>
    </div>
  );
};
```

Third, install the libraries called [html2canvas](https://github.com/niklasvh/html2canvas) and [jspdf](https://github.com/parallax/jsPDF) via your command line:

```text
npm install html2canvas jspdf
```

And fourth, use the library to draw the component on a canvas, to transform it into an image, and finally to transform it into a PDF:

```javascript{1-2,7-20}
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const App = () => {
  const printRef = React.useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('print.pdf');
  };

  return (
    <div>
      <button type="button" onClick={handleDownloadPdf}>
        Download as PDF
      </button>

      <div>I will not be in the PDF.</div>
      <div ref={printRef}>I will be in the PDF.</div>
    </div>
  );
};
```

That's it. The code makes sure that the aspect ratio is preserved and that the image fits the width of the PDF. If you want to go a bit further and download an image instead of a PDF, then head over to this tutorial: [How to create an image from a React component](/react-component-to-image/).



