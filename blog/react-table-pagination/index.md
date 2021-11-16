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
      url: "/react-table-component",
    },
  ]}
/>

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) with its **usePagination** plugin for a pagination feature. In the previous example, you have already installed React Table Library to create a table component. Now, we will enable users to **paginated pages** in the table

First, import the usePagination hook:

```javascript
import { usePagination } from '@table-library/react-table-library/pagination';
```

Second, initialize it with the table's data, plus an initial page and page size, and pass it as plugin prop to the Table component:

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

And third, create your pagination component (or inline HTML elements as in this example) and interact with the pagination feature programmatically by reading from its pagination state and writing pagination state by using its functions:

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

That's it. With just a few lines you have a working table pagination. What may be missing is a notifier as developer to **get pages** from the table. Let's see how this works with the usePagination hook:

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

The onChange [callback function](/javascript-callback-function/) gives you access to the action which triggered the pagination change and to the actual pagination state with its pages of your table. By having access to this information, you can trigger further table or non-table events (e.g. side-effect such as server-side pagination) based on it.

Last, it's worth to note that the pagination object that you have passed to the table is packed with the **pagination state** -- which gives you the ability to access it any time -- and all the functions to **paginate the table programmatically**.

You have only seen one possible version of pagination for the table. Since you have full access to pagination state and functions, you can do your own version of it as well. Find more pagination examples in the [documentation](https://react-table-library.com).

