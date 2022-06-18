---
title: "How to: React Table with Pagination"
description: "How to use React Table Library with Pagination by using its usePagination plugin for pages in a table ..."
date: "2021-07-05T13:56:46+02:00"
categories: ["React", "React Table Library"]
keywords: ["react table pagination"]
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

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) with its **usePagination** plugin to implement pagination. In the previous example, you installed React Table Library to create a table component. Now, you will enable your users to **paginate pages** in a table.

First, import the usePagination hook:

```javascript
import { usePagination } from '@table-library/react-table-library/pagination';
```

Second, initialize it with the table's data, plus an initial page number and page size, and pass it as a plugin prop to the Table component:

```javascript{4-9,12}
const App = () => {
  const data = { nodes };

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 2,
    },
  });

  return (
    <Table data={data} pagination={pagination}>
      ...
    </Table>
  );
};
```

And third, create your Pagination component (or inline HTML elements as in this example) and interact with the pagination feature programmatically by reading from its pagination state and writing to its pagination state with its functions:

```javascript{12,17-42}
const App = () => {
  const data = { nodes };

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 2,
    },
  });

  return (
    <>
      <Table data={data} pagination={pagination}>
        ...
      </Table>

      <div
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <span>
          Total Pages: {pagination.state.getTotalPages(data.nodes)}
        </span>

        <span>
          Page:{' '}
          {pagination.state.getPages(data.nodes).map((_, index) => (
            <button
              key={index}
              type="button"
              style={{
                fontWeight:
                  pagination.state.page === index
                    ? 'bold'
                    : 'normal',
              }}
              onClick={() => pagination.fns.onSetPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </span>
      </div>
    </>
  );
};
```

That's it. With just a few lines, you have pagination working in the table. Let's now create a notifier to **get pages** from the table. Let's see how this works with the usePagination hook:

```javascript{9,12-14}
const App = () => {
  const data = { nodes };

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 2,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

  ...
};
```

The onChange [callback function](/javascript-callback-function/) gives you access to the action which triggered the pagination change and to the current pagination state of your table (in this example, its page number and page size). With access to this information, you can trigger further table or non-table events (e.g. a side effect such as server-side pagination) based on it.

In addition, it is worth noting that the pagination object that you passed to the table is packed with the **pagination state** -- which gives you the ability to access it at any time -- and to all the functions to **paginate the table programmatically**.

You have only seen one possible version of pagination for the table. As you have full access to the pagination state and its functions, you can create your own version of it as well. Find more pagination examples in the [documentation](https://react-table-library.com).

