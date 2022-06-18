---
title: "How to: React Table with Filter"
description: "How to use React Table Library with filter. If you want to filter your table data ..."
date: "2021-05-08T13:56:46+02:00"
categories: ["React", "React Table Library"]
keywords: ["react table filter"]
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

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) with a **filter** feature. In the previous example, you installed React Table Library to create a Table component. Now, we will enable users to **filter data** in the table.

React Table Library does not come with a native filter feature, however, as you have access to the data from the outside, you can manipulate it before passing it to the table. Let's see how this works.

First, create a new [React useState Hook](/react-usestate-hook/) -- which holds the state of the filter -- and a new [event handler](/react-event-handler/) -- which acts as a callback function for the user interaction later on:

```javascript{2,4-6}
const App = () => {
  const [filters, setFilters] = React.useState(['SETUP', 'LEARN']);

  const handleFilter = (filter) => {
    filters.includes(filter)
      ? setFilters(filters.filter((value) => value !== filter))
      : setFilters(filters.concat(filter));
  };

  ...
};
```

Next, add a HTML checkbox group to the Table component, or somewhere entirely else if you want, to set the filter state:

```javascript{6-28}
const App = () => {
  ...

  return (
    <>
      <div>
        <label htmlFor="setup">
          Include SETUP:
          <input
            id="setup"
            type="checkbox"
            checked={filters.includes('SETUP')}
            onChange={() => handleFilter('SETUP')}
          />
        </label>
      </div>

      <div>
        <label htmlFor="learn">
          Include LEARN:
          <input
            id="learn"
            type="checkbox"
            checked={filters.includes('LEARN')}
            onChange={() => handleFilter('LEARN')}
          />
        </label>
      </div>

      <Table data={data}>
        ...
      </Table>
    </>
  );
};
```

The filter state is working. Finally, filter the list of items (here: nodes) before it reaches the Table component:

```javascript{10-16}
const App = () => {
  const [filters, setFilters] = React.useState(['SETUP', 'LEARN']);

  const handleFilter = (filter) => {
    filters.includes(filter)
      ? setFilters(filters.filter((value) => value !== filter))
      : setFilters(filters.concat(filter));
  };

  const data = {
    nodes: nodes.filter(
      (item) =>
        (filters.includes('SETUP') && item.type === 'SETUP') ||
        (filters.includes('LEARN') && item.type === 'LEARN')
    ),
  };

  return (
    <>
      ...

      <Table data={data}>
        ...
      </Table>
    </>
  );
};
```

We have used a checkbox in this tuorial, however, you can use a filter dropdown or any other React component to trigger the feature in the same way.

You have seen that React Table Library does not offer a native plugin for a filter feature. However, as you can simply pass a filtered list from the outside to the table after filtering it outside the Table component, you have all the options you need to hand.

If you want to see how a **table search** works as well, head over to my [React Table with Filter](/react-table-search/) tutorial.
