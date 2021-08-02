---
title: "How to create a React Tree"
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
      url: "/react-table-component",
    },
  ]}
/>

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) for creating a **Tree Table** or **Tree List**. In the previous example, you have already installed React Table Library to create a table component. Now, we will enable users to expand and collapse rows in a **React Tree View**.

First, import the useTree hook:

```javascript
import { useTree } from '@table-library/react-table-library/tree';
```

And second, initialize it with the table's data and pass it as plugin prop to the Table component:

```javascript{4,7}
const App = () => {
  const data = { nodes };

  const tree = useTree(data);

  return (
    <Table data={data} tree={tree}>
      ...
    </Table>
  );
};
```

That's it. With just a few lines you have a working tree table view. Since the nodes that we have passed as data object to the tree have nested `nodes` (see previous tutorial), the tree plugin for the table will just pick these up as child rows.

What may be missing is a notifier as developer to **expanded and collapsed rows** from the table. Let's see how this works with the useTree hook:

```javascript{4-6,8-10}
const App = () => {
  const data = { nodes };

  const tree = useTree(data, {
    onChange: onTreeChange,
  });

  function onTreeChange(action, state) {
    console.log(action, state);
  }

  ...
};
```

The onChange [callback function](/javascript-callback-function) gives you access to the action which triggered the tree change and to the actual tree state of your table. By having access to this information, you can trigger further table or non-table events (e.g. side-effect such as server-side lazy fetching) based on it.

Last, it's worth to note that the tree object that you have passed to the table is packed with the **tree state** -- which gives you the ability to access it any time -- and all the functions to **expand and collapse rows programmatically**.

<Divider />

Anyway, a tree view in a table often comes with lots of more requirements: For example, at the moment the tree expand/collapse event is triggered with a row click. What about the same behavior on a button instead? Let's import the built-in table component from React Table Library:

```javascript{3}
import {
  useTree,
  CellTree,
} from '@table-library/react-table-library/tree';
```

And use these new tree component in the table composition:

```javascript{17-19}
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
                {(tableItem) => (
                  <>
                    <CellTree item={tableItem}>
                      {tableItem.name}
                    </CellTree>
                    ...
                  </>
                )}
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};
```

By using this new composable table component, we enabled our users to get a visual feedback of expandable/collapsable branches in our tree table. By using the tree options, we can enforce a **tree expand/collapse only by button** and not row click too:

```javascript{4,14-16}
import {
  useTree,
  CellTree,
  TREE_EXPAND_CLICK_TYPES,
} from '@table-library/react-table-library/tree';

...

const tree = useTree(
  data,
  {
    onChange: onTreeChange,
  },
  {
    clickType: TREE_EXPAND_CLICK_TYPES.ButtonClick,
  }
);
```

Last but not least, sometimes a user wants to have an **initial tree state**. This can be achieved with the useTree hook too, by passing in a **default tree state**:

```javascript{2-4}
const tree = useTree(data, {
  state: {
    ids: ['2', '62', '4'],
  },
  onChange: onTreeChange,
});
```

<Divider />

Finally, with React Table Library it's possible to exchange the tree icon with a custom tree icon. In the following, you will get an example of how to use Material UI icons as components in React Table Library.

First, import the custom icons from your third-party library:

```javascript
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
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
        <InsertDriveFileOutlinedIcon fontSize="small" />
      ),
      iconRight: <FolderIcon fontSize="small" />,
      iconDown: <FolderOpenIcon fontSize="small" />,
    },
  }
);
```

That's everything you need to know about React Table Library's tree view plugin. If you have feedback, please open up an issue on the [GitHub repository](https://github.com/table-library/react-table-library). If you want to read more about the table library, check out its [documentation](https://react-table-library.com).