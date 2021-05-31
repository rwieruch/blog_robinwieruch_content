---
title: "How to: React Table with Resize"
description: "How to use React Table Library with column resizing. On a column, use the resize property with optional min width configuration ..."
date: "2021-05-08T13:56:46+02:00"
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
      url: "/react-table-component",
    },
  ]}
/>

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) with its **resize** feature. In the previous example, you have already installed React Table Library to create a table component. Now, we will enable users to **resize columns** in the table.

Everything that's needed is setting the resize property on each table's column:

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

That's the most straightforward way to enable resizable columns for your table. However, if you want to have more options for configuration, you can pass an object instead of a boolean.

For example, you can define a min width for each table column if you don't agree with the default.

```javascript
<HeaderCell resize={{ minWidth: 50 }}>Task</HeaderCell>
```

Be careful if you table or your table rows have any additional padding due to CSS (e.g. padding, margin, border), then you need to define an offset which mitigates this padding:

```javascript{1,4-9,13}
import { useTheme } from '@table-library/react-table-library/theme';

const App = () => {
  const theme = useTheme({
    BaseRow: `
      padding-left: 32px;
      padding-right: 16px;
    `,
  });

  const data = { nodes };

  const resize = { offset: 48 };

  return (
    <Table data={data} theme={theme}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell resize={resize}>Task</HeaderCell>
              <HeaderCell resize={resize}>Deadline</HeaderCell>
              <HeaderCell resize={resize}>Type</HeaderCell>
              <HeaderCell resize={resize}>Complete</HeaderCell>
              <HeaderCell resize={resize}>Tasks</HeaderCell>
            </HeaderRow>
          </Header>

          ...
        </>
      )}
    </Table>
  );
};
```

That's it. With React Table Library, you are now able to create resizable tables in React.