---
title: "React Table with server-side Data"
description: "React Table with server-side data with examples for pagination (paging), search (searching), sort (sorting), filter (filtering), ..."
date: "2021-06-06T07:52:46+02:00"
categories: ["React", "React Table Library"]
keywords: ["react"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) to retrieve **server-side data** featuring examples of **server-side pagination, server-side search and filter, and server-side sort**. Let's start by installing React Table Library on the command line:

```javascript
npm install @table-library/react-table-library styled-components
```

We will use the feature rich [Hacker News API](https://hn.algolia.com/api) for fetching server-side data, but also for performing server-side operations like **paging, searching and filtering, and sorting**. Let's start by [fetching some initial data](/react-hooks-fetch-data/) in our React component. We will be using [axios to fetch the server-side data](/react-axios/), but feel free to use something else. If you want to use axios as well, do not forget to install it on the command line.

```javascript
import * as React from 'react';
import axios from 'axios';

const BASE_URL = 'http://hn.algolia.com/api/v1/search';

const App = () => {
  const [data, setData] = React.useState({ nodes: [] });

  const fetchData = React.useCallback(async () => {
    const url = `${BASE_URL}?query=react`;
    const result = await axios.get(url);

    setData({ nodes: result.data.hits });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    ...
  );
};
```

React Table Library first renders the empty list, because we have set the nodes as an empty list as the initial state, and when the server-side data arrive, after a second or two, React Table Library will render the Table component for the fetched list:

```javascript{3-11,19-54}
...

import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from '@table-library/react-table-library/table';

...

const App = () => {
  ...

  return (
    <Table data={data}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>Title</HeaderCell>
              <HeaderCell>Created At</HeaderCell>
              <HeaderCell>Points</HeaderCell>
              <HeaderCell>Comments</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.objectID} item={item}>
                <Cell>
                  <a href={item.url}>{item.title}</a>
                </Cell>
                <Cell>
                  {new Date(
                    item.created_at
                  ).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </Cell>
                <Cell>{item.points}</Cell>
                <Cell>{item.num_comments}</Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};
```

If you haven't worked with React Table Library before, have a look at ([How to create a React Table Component](/react-table-component/)) to learn more about it. That's it for the **initial fetching of server-side data**. In this first case, we are fetching data based on one fixed search term (`query`). In the following case, we will replace this search with a server-side search.

# Server-Side Search

If you want to see how search works with React Table Library, have a look first at the client-side [React Table with Search](/react-table-search/) tutorial. In this tutorial though, we want to enhance the functionality with **server-side search**.

First, add an HTML input field and a search state, which can be changed by typing into the input field:

```javascript{4,6,8-10,13,14-22,27}
const App = () => {
  ...

  // server-side search

  const [search, setSearch] = React.useState('react');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <label htmlFor="search">
        Search by Task:
        <input
          id="search"
          type="text"
          value={search}
          onChange={handleSearch}
        />
      </label>

      <Table data={data}>
        ...
      </Table>
    </>
  );
};
```

The input field isn't doing anything yet, except for updating the state. In addition, we can see that the search term is kind of duplicated right now, because we are using it for the search state and for the initial search request. Let's DRY this up by extracting it:

```javascript{1-3,8-9,16-18,23}
const INITIAL_PARAMS = {
  search: 'react',
};

const App = () => {
  const [data, setData] = React.useState({ nodes: [] });

  const fetchData = React.useCallback(async (params) => {
    const url = `${BASE_URL}?query=${params.search}`;
    const result = await axios.get(url);

    setData({ nodes: result.data.hits });
  }, []);

  React.useEffect(() => {
    fetchData({
      search: INITIAL_PARAMS.search,
    });
  }, [fetchData]);

  // server-side search

  const [search, setSearch] = React.useState(INITIAL_PARAMS.search);

  ...

};
```

What's missing is a way to be notified of the changing search state -- so that we can perform another server-side search request. We could do this in the [event handler](/react-event-handler/) for the search feature or in another [useEffect hook](/react-useeffect-hook/), however, React Table Library gives us a neat way to merge an outside state (here `search`) with the table state in one of its hooks:

```javascript{9}
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
  useCustom,
} from '@table-library/react-table-library/table';
```

With the 'useCustom' hook, we can define a key for the state (here `search`), a state object, and a callback function which notifies us whenever the state object changes:

```javascript{12-15,19-23}
const App = () => {
  ...

  // server-side search

  const [search, setSearch] = React.useState(INITIAL_PARAMS.search);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useCustom('search', data, {
    state: { search },
    onChange: onSearchChange,
  });

  // listeners

  function onSearchChange(action, state) {
    fetchData({
      search: state.search,
    });
  }

  ...

};
```

By having access to the changing search term, we can then perform a server-side search request by reusing our function which we used for the initial server-side data request. This function now fetches the data with a changing search term which makes the server-side search complete.

There is one caveat though: you may have noticed that we perform a request with every keystroke made in the search field. We can debounce this with some JavaScript:

```javascript{5,7-15}
const App = () => {

  ...

  const timeout = React.useRef();
  function onSearchChange(action, state) {
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(
      () =>
        fetchData({
          search: state.search,
        }),
      500
    );
  }

  ...
};
```

However, feel free to use your own debounce code here. And so, the server-side search feature is complete with this last improvement. Instead of performing the search operation on our initial client-side list of nodes, we make another request every time the search term changes and let the server search the nodes for us.

# Server-Side Filter

Server-side filtering is quite similar to server-side searching. However, by going through an example of **server-side filter**, you will see how we can merge multiple server-side operations. Let's introduce a checkbox, which is unchecked by default, which enables us to request only *Ask HN* topics when it is checked:

```javascript{3,9,11,13-15,27-35}
const INITIAL_PARAMS = {
  search: 'react',
  filter: false,
};

const App = () => {
  ...

  // server-side filter

  const [filter, setFilter] = React.useState(INITIAL_PARAMS.filter);

  const handleFilter = (event) => {
    setFilter(event.target.checked);
  };

  // listeners

  ...

  return (
    <>
      <label htmlFor="search">
        ...
      </label>

      <label htmlFor="filter">
        <input
          id="filter"
          type="checkbox"
          checked={filter}
          onChange={handleFilter}
        />
        Only "Ask HN"
      </label>

      <Table data={data}>
        ...
      </Table>
    </>
  );
};
```

For the initial request, we can incorporate the new filter property by passing it as params and conditionally concatenating it to the requested URL (in this example, note that the variable url must be declared with let and not const as previously):

```javascript{5-9,19}
const App = () => {
  const [data, setData] = React.useState({ nodes: [] });

  const fetchData = React.useCallback(async (params) => {
    let url = `${BASE_URL}?query=${params.search}`;

    if (params.filter) {
      url = `${url}&tags=ask_hn`;
    }

    const result = await axios.get(url);

    setData({ nodes: result.data.hits });
  }, []);

  React.useEffect(() => {
    fetchData({
      search: INITIAL_PARAMS.search,
      filter: INITIAL_PARAMS.filter,
    });
  }, [fetchData]);

  ...

};
```

Finally, create a new notification and act upon it whenever the filter changes. In addition, include the filter for the server-side search and include the search for the server-side filter. Thus, every request, whether it's a search or a filter, incorporates the other parameter too:

```javascript{5-8,20,26-31}
const App = () => {

  ...

  useCustom('filter', data, {
    state: { filter },
    onChange: onFilterChange,
  });

  // listeners

  const timeout = React.useRef();
  function onSearchChange(action, state) {
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(
      () =>
        fetchData({
          search: state.search,
          filter,
        }),
      500
    );
  }

  function onFilterChange(action, state) {
    fetchData({
      search,
      filter: state.filter,
    });
  }

  ...

};
```

Both server-side operations have been merged, because we can use both states, the filter and the search state, in the callback functions when one of the states changes.

# Server-Side Pagination

If you want to learn about client-side pagination first, have a look at this tutorial: [React Table with Pagination](/react-table-pagination/). Now, we are going to implement **server-side pagination**. First of all, we need to adjust data fetching based on a new page parameter. We will start with the first page (here indexed by `0`) by default:

```javascript{4,10,14,24,32}
const INITIAL_PARAMS = {
  search: 'react',
  filter: false,
  page: 0,
};

const App = () => {
  const [data, setData] = React.useState({
    nodes: [],
    totalPages: 0,
  });

  const fetchData = React.useCallback(async (params) => {
    let url = `${BASE_URL}?query=${params.search}&page=${params.page}`;

    if (params.filter) {
      url = `${url}&tags=ask_hn`;
    }

    const result = await axios.get(url);

    setData({
      nodes: result.data.hits,
      totalPages: result.data.nbPages,
    });
  }, []);

  React.useEffect(() => {
    fetchData({
      search: INITIAL_PARAMS.search,
      filter: INITIAL_PARAMS.filter,
      page: INITIAL_PARAMS.page,
    });
  }, [fetchData]);

  ...

};
```

Now, we are fetching the first page explicitly and, after the server-side data resolves, we store the number of available pages (here `totalPages`) in addition to the nodes in local state.

The next step is to set up the pagination feature itself. Fortunately, React Table Library gives us a dedicated hook for setting up pagination:

```javascript{1,9,11-22,30}
import { usePagination } from '@table-library/react-table-library/pagination';

...

const App = () => {

  ...

  // server-side pagination

  const pagination = usePagination(
    data,
    {
      state: {
        page: INITIAL_PARAMS.page,
      },
      onChange: onPaginationChange,
    },
    {
      isServer: true,
    }
  );

  ...

  return (
    <>
      ...

      <Table data={data} pagination={pagination}>
        ...
      </Table>
    </>
  );
};
```

Because we are using the server flag, the data is not automatically client-side paginated by the Table component. Instead, we need to implement the server-side pagination logic ourselves inside the onChange callback function. Do not forget to merge the other features with the new pagination as well:

```javascript{16,26,30-36}
const App = () => {

  ...

  // listeners

  const timeout = React.useRef();
  function onSearchChange(action, state) {
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(
      () =>
        fetchData({
          search: state.search,
          filter,
          page: pagination.state.page,
        }),
      500
    );
  }

  function onFilterChange(action, state) {
    fetchData({
      search,
      filter: state.filter,
      page: pagination.state.page,
    });
  }

  function onPaginationChange(action, state) {
    fetchData({
      search,
      filter,
      page: state.page,
    });
  }

  ...

};
```

From the request perspective, server-side pagination is complete. Finally, we need to trigger the pagination somewhere in the UI. We can just insert some HTML wherever we want to give our users the option to paginate through the pages. The pagination object from the usePagination hook helps us to change the pages programmatically:

```javascript{13-41}
const App = () => {

  ...

  return (
    <>
      ...

      <Table data={data} pagination={pagination}>
        ...
      </Table>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>Total Pages: {data.totalPages}</span>

        <span>
          Page:{' '}
          {Array(data.totalPages)
            .fill()
            .map((_, index) => (
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

That's it. Server-side pagination works for our users. If you are curious, have a look at more pagination examples from the React Table Library documentation. For example, the Hacker News API gives us everything we need to implement dynamic page sizes (e.g. 10, 25, 50 items per page). You could easily implement something like this with React Table Library.

<Divider />

In this React Table Library tutorial, we learned how to combine multiple server-side features like pagination, searching, and filtering. Server-side sorting would be possible from a library perspective as well, however, the given API does not give us the appropriate parameter for handling this feature. Anyway, please have a look at the [React Table Library](https://react-table-library.com) documentation to find out about all of its server-side capabilities. You will also find a running demo of this tutorial over there.
