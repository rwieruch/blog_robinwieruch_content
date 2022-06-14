---
title: "How to: React Table with Resize"
description: "How to use React Table Library with column resizing. On a column, use the resize property with optional min width configuration ..."
date: "2021-05-30T13:56:46+02:00"
categories: ["React", "React Table Library"]
keywords: ["react table resize"]
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
      url: "/react-table-component/",
    },
  ]}
/>

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) with its **resize** feature. In the previous example, you installed React Table Library to create a table component. Now, we will enable users to **resize columns** in the table by clicking on a vertical bar in the header of the column, and dragging left or right.

All you need to do is set the resize property on each column of table:

```javascript{3-7}
<Header>
  <HeaderRow>
    <HeaderCell resize>Task</HeaderCell>
    <HeaderCell resize>Deadline</HeaderCell>
    <HeaderCell resize>Type</HeaderCell>
    <HeaderCell resize>Complete</HeaderCell>
    <HeaderCell resize>Tasks</HeaderCell>
  </HeaderRow>
</Header>
```

This is the easiest way to enable resizable columns for your table. However, if you want to configure more options then you can pass an object instead of a boolean (remember, setting a property in a React component without giving it a value defaults to a boolean true).

For example, you can specify a minimum width for each table column if you are not happy with the default.

```javascript
<HeaderCell resize={{ minWidth: 50 }}>Task</HeaderCell>
```

You can also change the highlight color of the resize vertical bar or increase its width:

```javascript
<HeaderCell
  resize={{
    resizerWidth: 15,
    resizerHighlight: '#98d8ff',
  }}
>
  Task
</HeaderCell>
```

That's it. With React Table Library, you can now create resizable tables in React.
