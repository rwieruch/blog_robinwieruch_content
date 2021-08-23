---
title: "How to: React Table with Double Click"
description: "How to use React Table Library with a double click on a row ..."
date: "2021-07-20T13:56:46+02:00"
categories: ["React", "React Table Library"]
keywords: ["react table double click"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection
  label="This tutorial is part 2 of 2 in this series."
  links={[
    {
      prefix: "Part 1:",
      label: "How to create a React Table Component",
      url: "/react-table-component",
    },
  ]}
/>

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) with **double click** on a row. In the previous example, you have already installed React Table Library to create a table component. By example, a row single click is enabled the following way:

```javascript{4-6}
<Row
  key={item.id}
  item={item}
  onClick={(node, event) =>
    console.log('Click Row', node, event)
  }
>
```

In contrast, a double click on a row can be achieved this way:

```javascript{4-6}
<Row
  key={item.id}
  item={item}
  onDoubleClick={(node, event) =>
    console.log('Click Row', node, event)
  }
>
```

Keep in mind that enabling a double click on a row will lead to a slight delay in the single click, because the table waits for a certain time until it confirms a click as a single click, because a double click could still happen.
