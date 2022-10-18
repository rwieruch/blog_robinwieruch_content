---
title: "How to create a React Dropdown"
description: "How create a React Dropdown component by example. The HTML select element displays a menu ..."
date: "2022-10-17T13:56:46+02:00"
categories: ["React", "React Component"]
keywords: ["react dropdown", "react dropdown component", "react dropdown menu", "react dropdown select"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A short React tutorial by example for beginners about creating a dropdown in React. First of all, there is no HTML equivalent to render a dropdown in React as straight forward as a [select component](/react-select/). However, here you will learn how to create a dropdown component in React step by step.

First, we need a HTML button element which will open (or close) a dropdown eventually. We are using an event handler in React to listen to the button's click event and [React's useState Hook](/react-usestate-hook/) to manage the dropdown's open state:

```javascript
import * as React from 'react';

const App = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button onClick={handleOpen}>Dropdown</button>
      {open ? <div>Is Open</div> : <div>Is Closed</div>}
    </div>
  );
};

export default App;
```

Since a dropdown comes with a menu which gets visible upon clicking the dropdown (and invisible once it gets closed), we will render this dropdown menu as a list of buttons. Respectively to the open state, the dropdown menu is either displayed or not by using a [conditional rendering](/conditional-rendering-react/):

```javascript{3,15-24}
import * as React from 'react';

import './App.css';

const App = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="dropdown">
      <button onClick={handleOpen}>Dropdown</button>
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <button>Menu 1</button>
          </li>
          <li className="menu-item">
            <button>Menu 2</button>
          </li>
        </ul>
      ) : null}
      {open ? <div>Is Open</div> : <div>Is Closed</div>}
    </div>
  );
};

export default App;
```

When clicking the dropdown button, you can see the list of buttons showing up. However, the menu pushes the "Is Open"/"Is Closed" text further to the bottom. In contrast, a real dropdown menu should float above the other HTML elements.

Therefore, the dropdown needs to be positioned absolutely to its container. While the last code snippet already introduced CSS classes in JSX, the next code snippet gives the dropdown its [styles in React](/react-css-styling/):

```css
.dropdown {
  position: relative;
}

.menu {
  position: absolute;

  list-style-type: none;
  margin: 5px 0;
  padding: 0;

  border: 1px solid grey;
  width: 150px;
}

.menu > li {
  margin: 0;

  background-color: white;
}

.menu > li:hover {
  background-color: lightgray;
}

.menu > li > button {
  width: 100%;
  height: 100%;
  text-align: left;

  background: none;
  color: inherit;
  border: none;
  padding: 5px;
  margin: 0;
  font: inherit;
  cursor: pointer;
}
```

The dropdown's menu should float above the other HTML elements now. What's missing are [event handlers](/react-event-handler/) for each button in the dropdown's menu. For each event handler, you can perform something specific like opening a dialog for example, while the handler also has to close the dropdown menu eventually:

```javascript{12-15,17-20,28,31}
import * as React from 'react';

import './App.css';

const App = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    // do something
    setOpen(false);
  };

  const handleMenuTwo = () => {
    // do something
    setOpen(false);
  };

  return (
    <div className="dropdown">
      <button onClick={handleOpen}>Dropdown</button>
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <button onClick={handleMenuOne}>Menu 1</button>
          </li>
          <li className="menu-item">
            <button onClick={handleMenuTwo}>Menu 2</button>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default App;
```

Eventually you want to move all this logic for a dropdown component into a [reusable React component](/react-reusable-components/). The new component comes with two slots. While one slot is for the trigger which opens/closes the dropdown, the other slot is for the buttons which are getting rendered in the dropdown's menu. The new dropdown component also receives the open state of the dropdown:

```javascript{19-26,30-43}
const App = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    // do something
    setOpen(false);
  };

  const handleMenuTwo = () => {
    // do something
    setOpen(false);
  };

  return (
    <Dropdown
      open={open}
      trigger={<button onClick={handleOpen}>Dropdown</button>}
      menu={[
        <button onClick={handleMenuOne}>Menu 1</button>,
        <button onClick={handleMenuTwo}>Menu 2</button>,
      ]}
    />
  );
};

const Dropdown = ({ open, trigger, menu }) => {
  return (
    <div className="dropdown">
      {trigger}
      {open ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">{menuItem}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
```

Internally, the dropdown renders the trigger and the menu [as a list](/react-list-component/).

<ReadMore label="Why is there a key property in a React list?" link="/react-list-key/" />

However, there is still logic (e.g. open state) of the dropdown component sitting in its parent component. When [instantiating](/react-element-component/) multiple dropdown components, this will become repetitive logic in each parent component.

Therefore, the next step shows how to elegantly move all repetitive implementation details into the dropdown component by using React's cloneElement API:

```javascript{3,7,13,22,23,25-27,31-33,38-43}
const App = () => {
  const handleMenuOne = () => {
    console.log('clicked one');
  };

  const handleMenuTwo = () => {
    console.log('clicked two');
  };

  return (
    <Dropdown
      open={open}
      trigger={<button>Dropdown</button>}
      menu={[
        <button onClick={handleMenuOne}>Menu 1</button>,
        <button onClick={handleMenuTwo}>Menu 2</button>,
      ]}
    />
  );
};

const Dropdown = ({ trigger, menu }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="dropdown">
      {React.cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">
              {React.cloneElement(menuItem, {
                onClick: () => {
                  menuItem.props.onClick();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
```

React's cloneElement API allows us to attach props to the passed `trigger` element (here: opening/closing the dropdown, because it toggles the open state within the dropdown component).

Furthermore, the high-level API allows us to close the dropdown once a menu item in a dropdown is clicked while still preserving its native implementation (here: `menuItem.props.onClick`).

The reusable dropdown component is finished. What's missing is the implementation detail to [close the dropdown if a user clicks outside](https://www.robinwieruch.de/react-hook-detect-click-outside-component/) of it. With the linked article though you should be able to get this done as well.

