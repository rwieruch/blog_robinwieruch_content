---
title: "How to: React Table with fixed Column"
description: "How to use React Table Library with a fixed column. Also called a sticky column, can be enabled in React Table with  ..."
date: "2022-03-14T13:56:46+02:00"
categories: ["React", "React Table Library"]
keywords: ["react table fixed column", "react table sticky column"]
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

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) with a **fixed column**. In the previous example, you installed React Table Library to create a Table component and gave it a theme. Now, you will enable your users to make a **column sticky** to the side:

```javascript{9-14,16-21}
...
import { useTheme } from '@table-library/react-table-library/theme';

const App = () => {
  const data = { nodes };

  const theme = useTheme({
    BaseCell: `
      &:nth-of-type(1) {
        left: 0px;

        min-width: 250px;
        width: 250px;
      }

      &:nth-of-type(2) {
        left: 250px;

        min-width: 150px;
        width: 150px;
      }

      &:nth-of-type(3),
      &:nth-of-type(4) {
        min-width: 50%;
        width: 50%;
      }
    `,
  });

  return (...);
};
```

The columns are fixed to the left side. You can fix columns in the same way to the right side as well. What is now needed is to give the Cell components a `pinLeft` (or `pinRight`) prop to indicate that they can be stuck to the side:

```javascript{5,10-11,20-21}
const App = () => {
  ...

  return (
    <Table data={data} theme={theme} layout={{ custom: true, horizontalScroll: true }}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell pinLeft>Task</HeaderCell>
              <HeaderCell pinLeft>Deadline</HeaderCell>
              <HeaderCell>Type</HeaderCell>
              <HeaderCell>Complete</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <Cell pinLeft>{item.name}</Cell>
                <Cell pinLeft>
                  {item.deadline.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </Cell>
                <Cell>{item.type}</Cell>
                <Cell>{item.isComplete.toString()}</Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};
```

With everything now in place, the non-fixed columns of the table will scroll vertically while the fixed columns remain sticky at the side of the table.
