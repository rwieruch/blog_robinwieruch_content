---
title: "How to: React Table with Search"
description: "How to use React Table Library with search. If you want to search your table data ..."
date: "2021-07-07T13:56:46+02:00"
categories: ["React", "React Table Library"]
keywords: ["react table search"]
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

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) with a **search** feature. In the previous example, you installed React Table Library to create a Table component. Now, we will enable users to **search data** in the table.

React Table Library does not come with a native search feature, however, as you have access to the data from the outside, you can manipulate it before passing it to the table. Let's see how this works.

First, create a new [React useState Hook](/react-usestate-hook/) -- which holds the state of the search -- and a new [event handler](/react-event-handler/) -- which acts as a callback function for the user interaction later on:

```javascript{2,4-6}
const App = () => {
  const [search, setSearch] = React.useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  ...
};
```

Next, add a HTML input field to the Table component, or somewhere entirely else if you want, to set the search state:

```javascript{6-9}
const App = () => {
  ...

  return (
    <>
      <label htmlFor="search">
        Search by Task:
        <input id="search" type="text" onChange={handleSearch} />
      </label>

      <Table data={data}>
        ...
      </Table>
    </>
  );
};
```

The search state is working. Finally, search the list of items (here: nodes) before it reaches the Table component:

```javascript{8-12}
const App = () => {
  const [search, setSearch] = React.useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const data = {
    nodes: list.filter((item) =>
      item.name.includes(search)
    ),
  };

  return (
    <>
      <label htmlFor="search">
        Search by Task:
        <input id="search" type="text" onChange={handleSearch} />
      </label>

      <Table data={data}>
        ...
      </Table>
    </>
  );
};
```

That's it. If you want the search to be case insensitive, then you have to change the filter function to:

```javascript{3}
const data = {
  nodes: list.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  ),
};
```

You have seen that React Table Library does not offer a native plugin for a search feature. However, as you can simply pass a searched list from the outside to the table, after searching it outside the Table component, you have all the options you need to hand.

If you want to see how a **table filter** works as well, head over to my [React Table with Filter](/react-table-filter/) tutorial.
