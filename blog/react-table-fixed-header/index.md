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
  label="This tutorial is part 2 of 2 in this series."
  links={[
    {
      prefix: "Part 1:",
      label: "How to create a React Table Component",
      url: "/react-table-component",
    },
  ]}
/>

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) with a **fixed header**. In the previous example, you have already installed React Table Library to create a table component. Now, we will enable users to have their **header sticky** to the top.

```javascript{12,36}
const App = () => {
  const data = { nodes };

  return (
    <Table data={data}>
      {(tableList) => (
        <>
          <Header>
            ...
          </Header>

          <div style={{ maxHeight: '150px', overflow: 'auto' }}>
            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  {(tableItem) => (
                    <>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          }
                        )}
                      </Cell>
                      <Cell>{tableItem.type}</Cell>
                      <Cell>{tableItem.isComplete.toString()}</Cell>
                    </>
                  )}
                </Row>
              ))}
            </Body>
          </div>
        </>
      )}
    </Table>
  );
};
```

As you can, everything that's need for a fixed table header is a container component around our body component. With this, the rows of the table will scroll in a vertical direction while the header stays sticky at the top of the table.
