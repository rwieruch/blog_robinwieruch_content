---
title: "How to: React Table with Select"
description: "How to use React Table Library with Select by using its useRowSelect plugin for selecting single or multiple rows in a table by checkbox or row click ..."
date: "2021-07-26T13:56:46+02:00"
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

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) with its **useRowSelect** plugin to implement a select feature. In the previous example, you installed React Table Library to create a table component. Now, we will enable users to **select a row** in the table by either clicking the row or clicking a checkbox.

First, import the useRowSelect hook:

```javascript
import { useRowSelect } from '@table-library/react-table-library/select';
```

And second, initialize it with the table's data and pass it as a plugin prop to the Table component:

```javascript{4,7}
const App = () => {
  const data = { nodes };

  const select = useRowSelect(data);

  return (
    <Table data={data} select={select}>
      ...
    </Table>
  );
};
```

That's it. With just a few lines you have table selection working. Let's now create a notifier to **get selected rows** from the table. Let's see how this works with the useRowSelect hook:

```javascript{4-6,8-10}
const App = () => {
  const data = { nodes };

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  function onSelectChange(action, state) {
    console.log(action, state);
  }

  ...
};
```

The onChange [callback function](/javascript-callback-function/) gives you access to the action which triggered the selection change and to the current selection state of your table. With access to this information, you can trigger further table or non-table events (e.g. a side-effect such as data fetching) based on it.

In addition, it is worth noting that the select object that you have passed to the table is packed with the **selection state** -- which gives you the ability to access it any time -- and all the functions to **select rows programmatically**. We will see this later in detail when using custom select components in this React table.

<Divider />

A row select in a table often has many more requirements: for example, at the moment the row select event is triggered by clicking on a row. What about selecting a row by clicking a checkbox instead? Let's import the built-in table components from React Table Library:

```javascript{3-4}
import {
  useRowSelect,
  HeaderCellSelect,
  CellSelect,
} from '@table-library/react-table-library/select';
```

And use these new select components in the table composition:

```javascript{10,19}
const App = () => {
  ...

  return (
    <Table data={data} select={select}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCellSelect />
              <HeaderCell>Task</HeaderCell>
              ...
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <CellSelect item={item} />
                <Cell>{item.name}</Cell>
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

By using these new composable table components, we enable several table select features:

First, the top-level checkbox in the header of our table enables a user to **select all rows by checkbox**, and it also allows a user to unselect all the rows. In addition, the checkbox is displayed with an **indeterminate** state when only some rows are selected.

Second, each table row has a checkbox for selecting itself. You may notice that the row select and the checkbox select behave a little different by default: whereas the row select acts as a **single select**, the checkbox acts as **multi select**.

In other words, if a user clicks on a row, it **selects only one row**. If a user clicks on multiple checkboxes, it keeps the selection state over multiple rows. If you want to change the default single/multi select behavior, then you could use the useRowSelect options. In this way, you can inverse the behavior (example below), or **enforce only single or multi select**:

```javascript{5,15-18}
import {
  useRowSelect,
  HeaderCellSelect,
  CellSelect,
  SelectTypes,
} from '@table-library/react-table-library/select';

...

const select = useRowSelect(
  data,
  {
    onChange: onSelectChange,
  },
  {
    rowSelect: SelectTypes.MultiSelect,
    buttonSelect: SelectTypes.SingleSelect,
  }
);
```

If you don't want to have the seamless **transition from single select to multi select**, you can disable the carry-forward feature. By doing this, when a user performs a single select followed by a multi select, the multi select will exclude the previous single select in its final selection state:

```javascript{7}
const select = useRowSelect(
  data,
  {
    onChange: onSelectChange,
  },
  {
    isCarryForward: false,
  }
);
```

By using the selection options, we can enforce a **row select only by checkbox** and not by row click too:

```javascript{5,16}
import {
  useRowSelect,
  HeaderCellSelect,
  CellSelect,
  SelectClickTypes,
} from '@table-library/react-table-library/select';

...

const select = useRowSelect(
  data,
  {
    onChange: onSelectChange,
  },
  {
    clickType: SelectClickTypes.ButtonClick,
  }
);
```

Sometimes a user wants to have an **initial select state**. This can be achieved with the useRowSelect hook too, by passing in a **default selection state**:

```javascript{3,9}
// default single select
const select = useRowSelect(data, {
  state: { id: '1' },
  onChange: onSelectChange,
});

// default multi select
const select = useRowSelect(data, {
  state: { ids: ['2', '3'] },
  onChange: onSelectChange,
});
```

<Divider />

Finally, with React Table Library it's possible to replace the select components entirely with custom components. In the case of the table selection plugin, you may want to replace the checkbox components with your own HTML checkboxes or with checkboxes from a third-party library. The following example shows how to use Material UI components with React Table Library.

First, import the custom component from your third-party library:

```javascript
import MaterialCheckbox from '@mui/material/Checkbox';
```

Second, use the third-party checkbox for the table header:

```javascript{10-19}
const App = () => {
  ...

  return (
    <Table data={data} select={select}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell stiff>
                <MaterialCheckbox
                  size="small"
                  checked={select.state.all}
                  indeterminate={
                    !select.state.all && !select.state.none
                  }
                  onChange={select.fns.onToggleAll}
                />
              </HeaderCell>
              <HeaderCell>Task</HeaderCell>
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

Note how the select object from the useRowSelect hook gives you everything that is needed to create your custom component. In this way, you can customize the select component for each table row too:

```javascript{15-25}
const App = () => {
  ...

  return (
    <Table data={data} select={select}>
      {(tableList) => (
        <>
          <Header>
            ...
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <Cell stiff>
                  <MaterialCheckbox
                    size="small"
                    checked={select.state.ids.includes(
                      item.id
                    )}
                    onChange={() =>
                      select.fns.onToggleById(item.id)
                    }
                  />
                </Cell>
                <Cell>{item.name}</Cell>
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

With the select state and all of the select functions at your disposal, you can read from and write to the select state from anywhere.

<Divider />

That's everything you need to know about React Table Library's select plugin. If you have feedback, please open up an issue on the [GitHub repository](https://github.com/table-library/react-table-library). If you want to read more about the React Table Library, check out its [documentation](https://react-table-library.com).
