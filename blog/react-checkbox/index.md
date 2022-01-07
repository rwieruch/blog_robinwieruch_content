---
title: "How to create a React Checkbox"
description: "How to use a checkbox in React by example, how to create a React Checkbox component, and how to change its value with the onChange event handler ..."
date: "2021-05-15T13:56:46+02:00"
categories: ["React", "React Component"]
keywords: ["react checkbox", "react checkbox component"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A short React tutorial by example for beginners about using a checkbox in React. First of all, a checkbox is just an HTML input field with the type of checkbox which can be rendered in React's JSX:

```javascript{4}
const App = () => {
  return (
    <div>
      <input type="checkbox" />
    </div>
  );
};
```

What may be missing is an associated label to signal the user what value is changed with this checkbox:

```javascript{4,6-7}
const App = () => {
  return (
    <div>
      <label>
        <input type="checkbox" />
        My Value
      </label>
    </div>
  );
};
```

In your browser, this checkbox can already change its checked state by showing either a check mark or nothing. However, this is just the checkbox's internal HTML state which isn't controlled by React yet. Let's change this by transforming this checkbox from being [uncontrolled to controlled](/react-controlled-components/):

```javascript{2,4-6,13-14,19}
const App = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        My Value
      </label>

      <p>Is "My Value" checked? {checked.toString()}</p>
    </div>
  );
};
```

By using [React's useState Hook](/react-usestate-hook/) and an [event handler](/react-event-handler/), we can keep track of the checkbox's value via [React's state](/react-state/). Next we may want to create a Checkbox component which can be used more than once throughout a React project. Therefore, we will extract it as a new [function component](/react-function-component/) and [pass the necessary props](/react-pass-props-to-component/) to it:

```javascript{10-14,21-28}
const App = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <Checkbox
        label="My Value"
        value={checked}
        onChange={handleChange}
      />

      <p>Is "My Value" checked? {checked.toString()}</p>
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

Our Checkbox component is a [reusable component](/react-reusable-components/) now. For example, if you would give your input element some [CSS style in React](/react-css-styling/), every Checkbox component which is used in your React project would use the same style.

If you would want to create a checkbox group now, you could just use multiple Checkbox components side by side and maybe style them with some border and some alignment, so that a user perceives them as a group of checkboxes:

```javascript
const App = () => {
  const [checkedOne, setCheckedOne] = React.useState(false);
  const [checkedTwo, setCheckedTwo] = React.useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };

  return (
    <div>
      <Checkbox
        label="Value 1"
        value={checkedOne}
        onChange={handleChangeOne}
      />
      <Checkbox
        label="Value 2"
        value={checkedTwo}
        onChange={handleChangeTwo}
      />
    </div>
  );
};
```

That's is it for creating a Checkbox component in React. If you are a beginner in React, I hope this tutorial helped you to understand some concepts and patterns!