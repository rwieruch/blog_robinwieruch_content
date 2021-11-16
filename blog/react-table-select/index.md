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

In this tutorial, I want to show you how to use [React Table Library](https://react-table-library.com) with its **useRowSelect** plugin for a select feature. In the previous example, you have already installed React Table Library to create a table component. Now, we will enable users to **select a row** in the table by either clicking the row or clicking a checkbox.

First, import the useRowSelect hook:

```javascript
import { useRowSelect } from '@table-library/react-table-library/select';
```

And second, initialize it with the table's data and pass it as plugin prop to the Table component:

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

That's it. With just a few lines you have a working table selection. What may be missing is a notifier as developer to **get selected rows** from the table. Let's see how this works with the useRowSelect hook:

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

The onChange [callback function](/javascript-callback-function/) gives you access to the action which triggered the selection change and to the actual selection state of your table. By having access to this information, you can trigger further table or non-table events (e.g. side-effect such as data fetching) based on it.

Last, it's worth to note that the select object that you have passed to the table is packed with the **selection state** -- which gives you the ability to access it any time -- and all the functions to **select rows programmatically**. We will see this later in detail when using custom select components in this React table.

<Divider />

Anyway, a row select in a table often comes with lots of more requirements: For example, at the moment the row select event is triggered with a row click. What about a row select by checkbox instead? Let's import the built-in table components from React Table Library:

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

By using these new composable table components, we enabled several table select features:

First, the top-level checkbox in the header of our table enables users to **select all rows by checkbox**; and vice versa, it allows a user to unselect all rows too. In addition, the checkbox shows with an **indeterminate** state in case only some rows are selected.

Second, each table row has a checkbox for selecting itself. You may notice that the row select and the checkbox select behave a bit different by default: Whereas the row select acts as **single select**, the checkbox acts as **multi select**.

In other words: If a user clicks on a row, it **selects only one row**. If a user clicks on multiple checkboxes, it keeps the selection state over multiple rows. If you would want to change the default single/multi select behavior, you could use the useRowSelect options. This way, you can inverse the behavior (example below), or **enforce only single or multiselect**:

```javascript{5,15-18}
import {
  useRowSelect,
  HeaderCellSelect,
  CellSelect,
  SELECT_TYPES,
} from '@table-library/react-table-library/select';

...

const select = useRowSelect(
  data,
  {
    onChange: onSelectChange,
  },
  {
    rowSelect: SELECT_TYPES.MultiSelect,
    buttonSelect: SELECT_TYPES.SingleSelect,
  }
);
```

If you want to have a seamless **transition from single select to multi select**, you can enable the carry-forward feature. By doing this, when a user performs a single select followed by a multi select, the multi select will include the previous single select in its final selection state:

```javascript{7}
const select = useRowSelect(
  data,
  {
    onChange: onSelectChange,
  },
  {
    isCarryForward: true,
  }
);
```

By using the selection options, we can enforce a **row select only by checkbox** and not row click too:

```javascript{5,16}
import {
  useRowSelect,
  HeaderCellSelect,
  CellSelect,
  SELECT_CLICK_TYPES,
} from '@table-library/react-table-library/select';

...

const select = useRowSelect(
  data,
  {
    onChange: onSelectChange,
  },
  {
    clickType: SELECT_CLICK_TYPES.ButtonClick,
  }
);
```

Last but not least, sometimes a user wants to have an **initial select state**. This can be achieved with the useRowSelect hook too, by passing in a **default selection state**:

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

Finally, with React Table Library it's possible to exchange the select components entirely with custom components. In the case of our table selection plugin, we may want to exchange the checkbox components with our own HTML checkboxes or with checkboxes from a third-party library. In the following, you will get an example of how to use Material UI components in React Table Library.

First, import the custom component from your third-party library:

```javascript
import MaterialCheckbox from '@material-ui/core/Checkbox';
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
              <HeaderCell shrink>
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

Note how the select object from the useRowSelect hook gives you everything thats needed to create your custom component. This way, you can customize the select component for each table row too:

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
                <Cell shrink>
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

By having the select state and all the select functions at your disposal, you can read and write from and to the select state from anywhere.

<Divider />

That's everything you need to know about React Table Library's select plugin. If you have feedback, please open up an issue on the [GitHub repository](https://github.com/table-library/react-table-library). If you want to read more about the table library, check out its [documentation](https://react-table-library.com).