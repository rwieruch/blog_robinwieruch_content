---
title: "Using a indeterminate React Checkbox"
description: "How to create an indeterminate checkbox in React, also known under the name tri state checkbox. By example you will learn how to use the indeterminate state ..."
date: "2021-05-16T13:56:46+02:00"
categories: ["React"]
keywords: ["react indeterminate checkbox"]
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
      label: "How to create a React Checkbox",
      url: "/react-checkbox",
    },
  ]}
/>

A short React tutorial by example for beginners on how to create an **indeterminate React Checkbox** which uses an indeterminate state (also called **tri state**).

Let's start with a checkbox example from our previous tutorial:

```javascript
const App = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <Checkbox
        label="Value"
        value={checked}
        onChange={handleChange}
      />

      <p>Is checked? {checked.toString()}</p>
    </div>
  );
};

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};
```

Now we want to extend the functionality of this checkbox for handling a tri state instead of a bi state. First, we need to transform our state from a boolean to an enum, because only this way we can create a tri state:

```javascript{1-5,8,11-19,30,40}
const CHECKBOX_STATES = {
  Checked: 'Checked',
  Indeterminate: 'Indeterminate',
  Empty: 'Empty',
};

const App = () => {
  const [checked, setChecked] = React.useState(CHECKBOX_STATES.Empty);

  const handleChange = () => {
    let updatedChecked;

    if (checked === CHECKBOX_STATES.Checked) {
      updatedChecked = CHECKBOX_STATES.Empty;
    } else if (checked === CHECKBOX_STATES.Empty) {
      updatedChecked = CHECKBOX_STATES.Checked;
    }

    setChecked(updatedChecked);
  };

  return (
    <div>
      <Checkbox
        label="Value"
        value={checked}
        onChange={handleChange}
      />

      <p>Is checked? {checked}</p>
    </div>
  );
};

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={value === CHECKBOX_STATES.Checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};
```

We have the same behavior as before, but enabled us to have more than two states for our checkbox.

Next comes the indeterminate state of a checkbox. Unfortunately it cannot be assigned via HTML and we need to use an imperative DOM manipulation here. Fortunately React has the concept of [refs](/react-ref) which gives React developers access to DOM elements:

```javascript{2,7}
const Checkbox = ({ label, value, onChange }) => {
  const checkboxRef = React.useRef();

  return (
    <label>
      <input
        ref={checkboxRef}
        type="checkbox"
        checked={value === CHECKBOX_STATES.Checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};
```

By having access to the checkbox element, we can set and unset the checked state imperatively instead of using the HTML in a declarative way:

```javascript{4-10,14}
const Checkbox = ({ label, value, onChange }) => {
  const checkboxRef = React.useRef();

  React.useEffect(() => {
    if (value === CHECKBOX_STATES.Checked) {
      checkboxRef.current.checked = true;
    } else {
      checkboxRef.current.checked = false;
    }
  }, [value]);

  return (
    <label>
      <input ref={checkboxRef} type="checkbox" onChange={onChange} />
      {label}
    </label>
  );
};
```

[React's useEffect Hook](/react-useeffect-hook) executes its passed side-effect function every time a variable in the dependency array (here: `value`) changes. Then in the side-effect function we evaluate the value: if it is checked, we set the checkbox's internal HTML state programmatically to checked; and vice versa for the unchecked state.

Finally, we can assign the indeterminate state this way too:

```javascript{7,10,11-14}
const Checkbox = ({ label, value, onChange }) => {
  const checkboxRef = React.useRef();

  React.useEffect(() => {
    if (value === CHECKBOX_STATES.Checked) {
      checkboxRef.current.checked = true;
      checkboxRef.current.indeterminate = false;
    } else if (value === CHECKBOX_STATES.Empty) {
      checkboxRef.current.checked = false;
      checkboxRef.current.indeterminate = false;
    } else if (value === CHECKBOX_STATES.Indeterminate) {
      checkboxRef.current.checked = false;
      checkboxRef.current.indeterminate = true;
    }
  }, [value]);

  return (
    <label>
      <input ref={checkboxRef} type="checkbox" onChange={onChange} />
      {label}
    </label>
  );
};
```

And don't forget to assign the proper value on state change in the first place:

```javascript{10,11-13}
const App = () => {
  const [checked, setChecked] = React.useState(CHECKBOX_STATES.Empty);

  const handleChange = () => {
    let updatedChecked;

    if (checked === CHECKBOX_STATES.Checked) {
      updatedChecked = CHECKBOX_STATES.Empty;
    } else if (checked === CHECKBOX_STATES.Empty) {
      updatedChecked = CHECKBOX_STATES.Indeterminate;
    } else if (checked === CHECKBOX_STATES.Indeterminate) {
      updatedChecked = CHECKBOX_STATES.Checked;
    }

    setChecked(updatedChecked);
  };

  return (
    <div>
      <Checkbox
        label="Value"
        value={checked}
        onChange={handleChange}
      />

      <p>Is checked? {checked}</p>
    </div>
  );
};
```

That's it. We transformed our React checkbox component from a bi state to a tri state by introducing the indeterminate state. I hope this tutorial is useful to you if you happen to need a checkbox with three states.