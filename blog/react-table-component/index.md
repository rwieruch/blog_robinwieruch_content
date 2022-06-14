---
title: "Part 1 &ndash; How to create a React Table Component"
description: "A step by step tutorial on how to create a React table component with React Table Library ..."
date: "2021-05-17T13:56:46+02:00"
categories: ["React", "React Table Library"]
keywords: ["react table component"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) to **create a table component in React**. After this part, there are many other parts giving you examples for [searching](/react-table-search/), [filtering](/react-table-filter/), [sorting](/react-table-sort/), [selecting](/react-table-select/), nesting [tree tables](/react-tree-table/), and [pagination](/react-table-pagination/) for your React table by using React Table Library. Let's start with the basics.

First, install React Table Library from the command line:

```javascript
npm install @table-library/react-table-library @emotion/react
```

We are going to present the following list of items in a React table component:

```javascript
const list = [
  {
    id: '1',
    name: 'VSCode',
    deadline: new Date(2020, 1, 17),
    type: 'SETUP',
    isComplete: true,
  },
  {
    id: '2',
    name: 'JavaScript',
    deadline: new Date(2020, 2, 28),
    type: 'LEARN',
    isComplete: true,
  },
  {
    id: '3',
    name: 'React',
    deadline: new Date(2020, 3, 8),
    type: 'LEARN',
    isComplete: false,
  }
];
```

Next, the list is wrapped by an object which can be consumed by the Table component. The component itself is imported from the library:

```javascript{2,7,9}
import * as React from 'react';
import { Table } from '@table-library/react-table-library/table';

const list = [ ... ];

const App = () => {
  const data = { nodes: list };

  return <Table data={data}>{(tableList) => null}</Table>;
};
```

The Table component accepts a data object as a [prop](/react-pass-props-to-component/) with a `nodes` property. These nodes are the items in our list, however, the table keeps the naming of `nodes` more generic, because the Table component has the ability not only to display list structures but also [tree structures](/react-tree-table/).

Moreover, the Table component uses a [function as a child](/react-render-props/) giving access to the list within the table as `tableList`. Internally, the Table component applies many different modifications to the list &ndash; e.g. sorting, pagination, if these plugins are enabled &ndash; and so the `tableList` (and not `data` or `list`) should be used to render the items within the table.

React Table Library uses [composition over configuration](/react-component-composition/). Therefore, you get all the necessary building blocks as components from the library itself. Let's begin with the header of our table:

```javascript{4-6,17-24}
import * as React from 'react';
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
} from '@table-library/react-table-library/table';

const list = [ ... ];

const App = () => {
  const data = { nodes: list };

  return (
    <Table data={data}>
      {(tableList) => (
        <Header>
          <HeaderRow>
            <HeaderCell>Task</HeaderCell>
            <HeaderCell>Deadline</HeaderCell>
            <HeaderCell>Type</HeaderCell>
            <HeaderCell>Complete</HeaderCell>
          </HeaderRow>
        </Header>
      )}
    </Table>
  );
};
```

By using these components, you can create a table as a composition from components where each component has its own responsibility. For example, instead of having only one Table component which accepts one large configuration object, there are several composable components, such as Header, HeaderRow, and HeaderCell, which can all receive dedicated props.

Finally, let's display the items in the usual way when [rendering lists in React](/react-list-component/) by rendering Row components with a [key](/react-list-key/) for each item within a Body component:

```javascript{7-9,20,25-43,44}
import * as React from 'react';
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from '@table-library/react-table-library/table';

const list = [ ... ];

const App = () => {
  const data = { nodes: list };

  return (
    <Table data={data}>
      {(tableList) => (
        <>
          <Header>
            ...
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <Cell>{item.name}</Cell>
                <Cell>
                  {item.deadline.toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    }
                  )}
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

As you have full control over what to render in the Cell components, you can format the data as you need to. A boolean can be translated into a string and a date can be formatted to a readable version. There are no special props for the Cell components to do rendering. Using [React Table Library](https://react-table-library.com) makes it easy to render Table components in React. Go to the library's documentation to find out more about its features.

- [Part 2 &ndash; React Table with Theme](/react-table-theme/)
- [Part 3 &ndash; React Table with Resize](/react-table-resize/)
- [Part 4 &ndash; React Table with Sort](/react-table-sort/)
- [Part 5 &ndash; React Table with Search](/react-table-search/)
- [Part 6 &ndash; React Table with Filter](/react-table-filter/)
- [Part 7 &ndash; React Table with Select](/react-table-select/)
- [Part 8 &ndash; React Table with Tree](/react-tree-table/)
- [Part 9 &ndash; React Table with Fixed Header](/react-table-fixed-header/)
- [Part 10 &ndash; React Table with Fixed Column](/react-table-fixed-column/)
- [Part 11 &ndash; React Table with Pagination](/react-table-pagination/)
- [Part 12 &ndash; React Table with Server-Side Operations](/react-server-side-table/)
