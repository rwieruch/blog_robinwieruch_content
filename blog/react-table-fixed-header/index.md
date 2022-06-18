---
title: "How to: React Table with fixed Header"
description: "How to use React Table Library with a fixed header. Also called a sticky header, can be enabled in React Table with  ..."
date: "2021-06-15T13:56:46+02:00"
categories: ["React", "React Table Library"]
keywords: ["react table fixed header", "react table sticky header"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection
  label="This tutorial is part 3 of 3 in this series."
  links={[
    {
      prefix: "Part 1:",
      label: "How to create a React Table Component",
      url: "/react-table-component/",
    },
    {
      prefix: "Part 2:",
      label: "How to: React Table with Theme",
      url: "/react-table-theme/",
    },
  ]}
/>

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) with a **fixed header**. In the previous example, you installed React Table Library to create a Table component and gave it a theme. Now, we will enable users to have their **header sticky** to the top:

```javascript{2,7-11,14-18,19,22}
...
import { useTheme } from '@table-library/react-table-library/theme';

const App = () => {
  const data = { nodes };

  const theme = useTheme({
    Table: `
      height: 100%;
    `,
  });

  return (
    <div
      style={{
        height: '150px',
      }}
    >
      <Table data={data} theme={theme}>
        ...
      </Table>
    </div>
  );
};
```

As you can see, all that's needed for a fixed table header is a container component around the Table component. You can now scroll the rows of the table in a vertical direction while the header remains sticky at the top of the table.
