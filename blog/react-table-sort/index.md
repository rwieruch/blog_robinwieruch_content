---
title: "How to: React Table with Sort"
description: "How to use React Table Library with Sort by using its useSort plugin for sorting columns in a table by column header click. A table sort ..."
date: "2021-06-14T13:56:46+02:00"
categories: ["React", "React Table Library"]
keywords: ["react table select"]
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

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) with its **useSort** plugin to implement user sorting. In the previous example, you installed React Table Library to create a table component. Now, you will enable your users to **sort columns** in the table by clicking on a column's header.

First, import the useSort hook:

```javascript
import { useSort } from '@table-library/react-table-library/sort';
```

Second, initialize the hook with the table's data and pass it as a plugin prop to the Table component:

```javascript{4,7}
const App = () => {
  const data = { nodes: list };

  const sort = useSort(data);

  return (
    <Table data={data} sort={sort}>
      ...
    </Table>
  );
};
```

Third, convert your header columns to sortable header columns:

```javascript{3,15-26}
import {
  useSort,
  HeaderCellSort ,
} from '@table-library/react-table-library/sort';

const App = () => {
  ...

  return (
    <Table data={data} sort={sort}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCellSort sortKey="TASK">
                Task
              </HeaderCellSort>
              <HeaderCellSort sortKey="DEADLINE">
                Deadline
              </HeaderCellSort>
              <HeaderCellSort sortKey="TYPE">
                Type
              </HeaderCellSort>
              <HeaderCellSort sortKey="COMPLETE">
                Complete
              </HeaderCellSort>
            </HeaderRow>
          </Header>

          <Body>
            ...
          </Body>
        </>
      )}
    </Table>
  );
};
```

And fourth, create sort functions for each sort key:

```javascript{5-14}
const App = () => {
  const data = { nodes: list };

  const sort = useSort(data, null, {
    sortFns: {
      TASK: (array) =>
        array.sort((a, b) => a.name.localeCompare(b.name)),
      DEADLINE: (array) =>
        array.sort((a, b) => a.deadline - b.deadline),
      TYPE: (array) =>
        array.sort((a, b) => a.type.localeCompare(b.type)),
      COMPLETE: (array) =>
        array.sort((a, b) => a.isComplete - b.isComplete),
    },
  });

  return (
    <Table data={data} sort={sort}>
      ...
    </Table>
  );
};
```

That's it. With just a few lines of code, you have implemented table sort by users. You can sort by string (alphabetically), sort by date, sort by boolean, and sort by enum. As you are passing the sort functions yourself, it is up to you to write the code to sort a particular column.

Let's now create a notifier to **get the current sort** from the table. Let's see how this works with the useSort hook:

```javascript{5-7,12-14}
const App = () => {
  const data = { nodes: list };

  const sort = useSort(data,
    {
      onChange: onSortChange,
    }, {
      sortFns: ...,
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  ...
};
```

The onChange [callback function](/javascript-callback-function/) gives you access to the action which triggered the sort change and to the current sort state of your table. With access to this information, you can trigger further table or non-table events (e.g. a side effect such as a server-side sort) based on it.

In addition, it is worth noting that the sort object that you have passed to the table is packed with the **sorting state** -- which gives you the ability to access it at any time -- and all the functions to **sort columns programmatically**. We will see this later in detail when using the custom sort components in this React table.

<Divider />

A column sort of a table often has many more requirements. Let's look at two of them:

For example, sometimes a user wants to have an **initial sort state**. This can be achieved with the useSort hook too, by passing in a **default sorting state**:

```javascript{6-9}
const App = () => {
  ...

  const sort = useSort(data,
    {
      state: {
        sortKey: 'TASK',
        reverse: false,
      },
      onChange: onSortChange,
    }, {
      sortFns: ...,
    }
  );

  ...
};
```

Another example could be to exchange the sort icon with a **custom sort icon** from a third-party library (e.g. Material UI):

```javascript{1-3,13-22}
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const App = () => {
  ...

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        margin: '0px',
        iconDefault: <UnfoldMoreOutlinedIcon />,
        iconUp: <KeyboardArrowUpOutlinedIcon />,
        iconDown: (
          <KeyboardArrowDownOutlinedIcon />
        ),
      },
      sortFns: ...
    }
  );

  ...
};
```

There are many more options for the sort feature. Read the React Table Library documentation to find out more about them.

<Divider />

And finally, with React Table Library it is possible to replace the sort components entirely with custom components. In the case of the table sort plugin, you may want to replace the sorting header components with your own HTML buttons from a third-party library. The following example shows how to use Material UI components with React Table Library.

First, import the custom component (and custom icons) from your third-party library:

```javascript
import MaterialButton from '@mui/material/Button';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
```

Second, use the third-party button for the table header:

```javascript{4-14,22-35}
const App = () => {
  ...

  const getIcon = (sortKey) => {
    if (sort.state.sortKey === sortKey && sort.state.reverse) {
      return <KeyboardArrowDownOutlinedIcon />;
    }

    if (sort.state.sortKey === sortKey && !sort.state.reverse) {
      return <KeyboardArrowUpOutlinedIcon />;
    }

    return <UnfoldMoreOutlinedIcon />;
  };

  return (
    <Table data={data} sort={sort}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>
                <MaterialButton
                  fullWidth
                  style={{ justifyContent: 'flex-start' }}
                  endIcon={getIcon('TASK')}
                  onClick={() =>
                    sort.fns.onToggleSort({
                      sortKey: 'TASK',
                    })
                  }
                >
                  Task
                </MaterialButton>
              </HeaderCell>

              ...

            </HeaderRow>
          </Header>

          <Body>
            ...
          </Body>
        </>
      )}
    </Table>
  );
};
```

Note how the sort object from the useSort hook gives you everything that is needed to create your custom component. In this way, you can customize the sort component for each table column. With the sort state and all of the sort functions at your disposal, you can read from and write to the sort state from anywhere.

<Divider />

That's everything you need to know about React Table Library's sort plugin. If you have feedback, please open up an issue on the [GitHub repository](https://github.com/table-library/react-table-library). If you want to read more about the React Table Library, check out its [documentation](https://react-table-library.com).
