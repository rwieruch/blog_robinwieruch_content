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
      url: "/react-table-component",
    },
  ]}
/>

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) with its **useSort** plugin for a sort feature. In the previous example, you have already installed React Table Library to create a table component. Now, we will enable users to **sort columns** in the table by clicking on a column's header.

First, import the useSort hook:

```javascript
import { useSort } from '@table-library/react-table-library/sort';
```

And second, initialize it with the table's data and pass it as plugin prop to the Table component:

```javascript{4,7}
const App = () => {
  const data = { nodes };

  const sort = useSort(data);

  return (
    <Table data={data} sort={sort}>
      ...
    </Table>
  );
};
```

Last, convert your header columns to sortable header columns:

```javascript{3,15-58}
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
              <HeaderCellSort
                sortKey="TASK"
                sortFn={(array) =>
                  array.sort((a, b) => a.name.localeCompare(b.name))
                }
              >
                Task
              </HeaderCellSort>
              <HeaderCellSort
                sortKey="DEADLINE"
                sortFn={(array) =>
                  array.sort((a, b) => a.deadline - b.deadline)
                }
              >
                Deadline
              </HeaderCellSort>
              <HeaderCellSort
                sortKey="TYPE"
                sortFn={(array) =>
                  array.sort((a, b) => a.type.localeCompare(b.type))
                }
              >
                Type
              </HeaderCellSort>
              <HeaderCellSort
                sortKey="COMPLETE"
                sortFn={(array) =>
                  array.sort((a, b) => a.isComplete - b.isComplete)
                }
              >
                Complete
              </HeaderCellSort>
              <HeaderCellSort
                sortKey="TASKS"
                sortFn={(array) =>
                  array.sort(
                    (a, b) =>
                      (a.nodes || []).length -
                      (b.nodes || []).length
                  )
                }
              >
                Tasks
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

That's it. With just a few lines you have a working table sort. We can sort by string (alphabetically), sort by date, sort by boolean, and sort by enum. Since you are passing the sortBy function yourself, it's up to you how to sort the column.

What may be missing is a notifier as developer to **get the current sort** from the table. Let's see how this works with the useSort hook:

```javascript{4-6,8-10}
const App = () => {
  const data = { nodes };

  const sort = useSort(data, {
    onChange: onSortChange,
  });

  function onSortChange(action, state) {
    console.log(action, state);
  }

  ...
};
```

The onChange [callback function](/javascript-callback-function) gives you access to the action which triggered the sort change and to the actual sort state of your table. By having access to this information, you can trigger further table or non-table events (e.g. side-effect such as server-side sort) based on it.

Last, it's worth to note that the sort object that you have passed to the table is packed with the **sorting state** -- which gives you the ability to access it any time -- and all the functions to **sort columns programmatically**. We will see this later in detail when using custom sort components in this React table.

<Divider />

Anyway, a column sort in a table often comes with lots of more requirements. Let's go through two of them:

For example, sometimes a user wants to have an **initial sort state**. This can be achieved with the useSort hook too, by passing in a **default sorting state**:

```javascript{5-10}
const App = () => {
  ...

  const sort = useSort(data, {
    state: {
      sortKey: 'TASK',
      sortFn: (array) =>
        array.sort((a, b) => a.name.localeCompare(b.name)),
      reverse: false,
    },
    onChange: onSortChange,
  });

  ...
};
```

Another example would be exchanging the sort icon with a **custom sort icon** from a third-party library (e.g. Material UI):

```javascript{1-3,13-22}
import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';

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
        iconDefault: <UnfoldMoreOutlinedIcon fontSize="small" />,
        iconUp: <KeyboardArrowUpOutlinedIcon fontSize="small" />,
        iconDown: (
          <KeyboardArrowDownOutlinedIcon fontSize="small" />
        ),
      },
    }
  );

  ...
};
```

There are many more options for the sort feature. Just head over to the React Table documentation to find out more about them.

<Divider />

Finally, with React Table Library it's possible to exchange the sort components entirely with custom components. In the case of our table sort plugin, we may want to exchange the sorting header components with our own HTML buttons from a third-party library. In the following, you will get an example of how to use Material UI components in React Table Library.

First, import the custom component (and custom icons) from your third-party library:

```javascript
import Button from '@material-ui/core/Button';
import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
```

Second, use the third-party button for the table header:

```javascript{4-14,22-39}
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
                <Button
                  fullWidth
                  style={{ justifyContent: 'flex-start' }}
                  endIcon={getIcon('TASK')}
                  onClick={() =>
                    sort.fns.onToggleSort({
                      sortKey: 'TASK',
                      sortFn: (array) =>
                        array.sort((a, b) =>
                          a.name.localeCompare(b.name)
                        ),
                    })
                  }
                >
                  Task
                </Button>
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

Note how the sort object from the useSort hook gives you everything thats needed to create your custom component. This way, you can customize the sort component for each table column. By having the sort state and all the sort functions at your disposal, you can read and write from and to the sort state from anywhere.

<Divider />

That's everything you need to know about React Table Library's sort plugin. If you have feedback, please open up an issue on the [GitHub repository](https://github.com/table-library/react-table-library). If you want to read more about the table library, check out its [documentation](https://react-table-library.com).