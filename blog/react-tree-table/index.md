---
title: "How to: React Tree Table"
description: "How to create a React Tree, a React Tree View, or a React Tree List by using React Table Library ..."
date: "2021-08-01T13:56:46+02:00"
categories: ["React", "React Table Library"]
keywords: ["react tree", "react tree table", "react tree view", "react tree list"]
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

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) to create a **Tree Table** or **Tree List**. In the previous example, you installed React Table Library to create a table component. Now, we will enable users to expand and collapse rows in a **React Tree View**.

First, import the useTree hook:

```javascript
import { useTree } from '@table-library/react-table-library/tree';
```

And second, initialize it with the table's data and pass it as plugin prop to the Table component:

```javascript{4,7}
const App = () => {
  const data = { nodes: list };

  const tree = useTree(data);

  return (
    <Table data={data} tree={tree}>
      ...
    </Table>
  );
};
```

That's it. With just a few lines you have a working tree table view. As the nodes that we passed as a data object to the tree do not have nested `nodes` (see the previous tutorial), we need to use a different data object this time. The data object below has nested `nodes` and the tree plugin for the table simply picks these up as child rows.

```javascript
const list = [
  {
    id: "1",
    name: "VSCode",
    deadline: new Date(2020, 1, 17),
    type: "SETUP",
    isComplete: true,
  },
  {
    id: "2",
    name: "JavaScript",
    deadline: new Date(2020, 2, 28),
    type: "LEARN",
    isComplete: true,
    nodes: [
      {
        id: "2.1",
        name: "Data Types",
        deadline: new Date(2020, 2, 28),
        type: "LEARN",
        isComplete: true,
      },
      {
        id: "2.2",
        name: "Objects",
        deadline: new Date(2020, 2, 28),
        type: "LEARN",
        isComplete: true,
      },
      {
        id: "2.3",
        name: "Code Style",
        deadline: new Date(2020, 2, 28),
        type: "LEARN",
        isComplete: true,
      },
    ],
  },
  {
    id: "3",
    name: "React",
    deadline: new Date(2020, 3, 8),
    type: "LEARN",
    isComplete: false,
    nodes: [
      {
        id: "3.1",
        name: "Components",
        deadline: new Date(2020, 3, 8),
        type: "LEARN",
        isComplete: true,
      },
      {
        id: "3.2",
        name: "JSX",
        deadline: new Date(2020, 3, 8),
        type: "LEARN",
        isComplete: true,
      },
    ],
  },
];
```

Let's now create a notifier to **expand and collapse rows** of the table. Let's see how this works with the useTree hook:

```javascript{4-6,8-10}
const App = () => {
  const data = { nodes: list };

  const tree = useTree(data, {
    onChange: onTreeChange,
  });

  function onTreeChange(action, state) {
    console.log(action, state);
  }

  ...
};
```

The onChange [callback function](/javascript-callback-function/) gives you access to the action which triggered the tree change and to the current tree state of your table. With access to this information, you can trigger further table or non-table events (e.g. a side-effect such as server-side lazy fetching) based on it.

In addition, it is worth noting that the tree object that you passed to the table is packed with the **tree state** -- which gives you the ability to access it any time -- and all the functions to **expand and collapse rows programmatically**.

<Divider />

A tree view in a table often has many more requirements: for example, at the moment the tree expand/collapse event is triggered by clicking on a row. What about expanding/collapsing a tree by clicking on a button instead? Let's import a built-in table component from React Table Library:

```javascript{3}
import {
  useTree,
  CellTree,
} from '@table-library/react-table-library/tree';
```

And use this new tree component in the table composition:

```javascript{15-17}
const App = () => {
  ...

  return (
    <Table data={data} tree={tree}>
      {(tableList) => (
        <>
          <Header>
            ...
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <CellTree item={item}>
                  {item.name}
                </CellTree>
                ...
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};
```

By using this new composable table component, we enable our users to get visual feedback of the expandable/collapsable branches of the tree table. By using the tree options, we can enforce a **tree expand/collapse only by button** and not by row click too:

```javascript{4,14-16}
import {
  useTree,
  CellTree,
  TreeExpandClickTypes,
} from '@table-library/react-table-library/tree';

...

const tree = useTree(
  data,
  {
    onChange: onTreeChange,
  },
  {
    clickType: TreeExpandClickTypes.ButtonClick,
  }
);
```

Sometimes a user wants to have an **initial tree state**. This can be achieved with the useTree hook too, by passing in a **default tree state**:

```javascript{2-4}
const tree = useTree(data, {
  state: {
    ids: ['2', '62', '4'],
  },
  onChange: onTreeChange,
});
```

<Divider />

Finally, with React Table Library it's possible to replace the tree icon with a custom tree icon. The following example shows how to use Material UI components in React Table Library.

First, import the custom icons from your third-party library:

```javascript
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
```

And second, use the third-party icons for the tree rows:

```javascript{6-15}
const tree = useTree(
  data,
  {
    onChange: onTreeChange,
  },
  {
    treeIcon: {
      margin: '4px',
      iconDefault: (
        <InsertDriveFileOutlinedIcon />
      ),
      iconRight: <FolderIcon />,
      iconDown: <FolderOpenIcon />,
    },
  }
);
```

That's everything you need to know about React Table Library's tree view plugin. If you have feedback, please open up an issue on the [GitHub repository](https://github.com/table-library/react-table-library). If you want to read more about the React Table Library, check out its [documentation](https://react-table-library.com).
