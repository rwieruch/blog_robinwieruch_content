---
title: "How to: React Table with Theme"
description: "How to use React Table Library with Theme to style your table ..."
date: "2021-06-22T13:56:46+02:00"
categories: ["React", "React Table Library"]
keywords: ["react table theme", "react table styling"]
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

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) with its **useTheme** plugin for theming your table with a custom style. In the previous example, you have already installed React Table Library to create a table component.

First, import the useTheme hook:

```javascript
import { useTheme } from '@table-library/react-table-library/theme';
```

And second, create a theme with it and pass it as plugin prop to the Table component:

```javascript{1,6,9}
const THEME = {};

const App = () => {
  const data = { nodes };

  const theme = useTheme(THEME);

  return (
    <Table data={data} theme={theme}>
      ...
    </Table>
  );
};
```

That's it. With just a few lines you created a custom theme for your table. However, the theme is empty, so let's see how we can adjust the table's style with it:

```javascript
const THEME = {
  HeaderRow: `
    font-size: 14px;

    background-color: #eaf5fd;
  `,
  Row: `
    font-size: 14px;

    &:nth-child(odd) {
      background-color: #d2e9fb;
    }

    &:nth-child(even) {
      background-color: #eaf5fd;
    }
  `,
};
```

Essentially the theme is a dictionary where you can style the different components of a table. In the last example, we styled the header rows and the row components. Since both components share some of the same style, you could extract this style to a common denominator too:

```javascript{2-4}
const THEME = {
  BaseRow: `
    font-size: 14px;
  `,
  HeaderRow: `
    background-color: #eaf5fd;
  `,
  Row: `
    &:nth-child(odd) {
      background-color: #d2e9fb;
    }

    &:nth-child(even) {
      background-color: #eaf5fd;
    }
  `,
};
```

The following components are available as keys for styling: Table, HeaderRow, Row, HeaderCell, Cell, BaseRow, BaseCell. In the end, this should give you all the entry points to style all the different components for your table. If you have feedback, please open up an issue on the [GitHub repository](https://github.com/table-library/react-table-library). If you want to see more themes, check out the library's [documentation](https://react-table-library.com).

<LinkCollection
  label="This tutorial is part 2 of 3 in this series."
  links={[
    {
      prefix: "Part 1:",
      label: "How to create a React Table Component",
      url: "/react-table-component/",
    },
    {
      prefix: "Part 3:",
      label: "How to: React Table with fixed Header",
      url: "/react-table-fixed-header/",
    },
  ]}
/>

<LinkCollection
  label="This tutorial is part 2 of 3 in this series."
  links={[
    {
      prefix: "Part 1:",
      label: "How to create a React Table Component",
      url: "/react-table-component/",
    },
    {
      prefix: "Part 3:",
      label: "How to: React Table with fixed Column",
      url: "/react-table-fixed-column/",
    },
  ]}
/>