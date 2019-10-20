---
title: "How to Scroll to Item in React?"
description: "A brief tutorial which shows how to scroll to an item in a React List Component. The scroll event can be triggered from within or outside the component ..."
date: "2019-05-07T07:52:46+02:00"
categories: ["React"]
keywords: ["react scroll to item"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A brief tutorial which shows you two use cases on how to scroll to an item within a list of items in a [React List Component](https://www.robinwieruch.de/react-list-component/). We will use the [native browser API](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) to scroll to our React element with a button click. It's up to you how to trigger the event in the end. For both use cases, we will start with the same React list component that renders a list of items from an array of objects:

```javascript
import React from 'react';

const list = [
  {
    id: 'a',
    firstname: 'Robin',
    lastname: 'Wieruch',
    year: 1988,
  },
  {
    id: 'b',
    firstname: 'Dave',
    lastname: 'Davidds',
    year: 1990,
  },
  ...
];

const List = () => (
  <ul>
    {list.map(item => {
      return (
        <li
          key={item.id}
          style={{ height: '250px', border: '1px solid black' }}
        >
          <div>{item.id}</div>
          <div>{item.firstname}</div>
          <div>{item.lastname}</div>
          <div>{item.year}</div>
        </li>
      );
    })}
  </ul>
);

export default List;
```

Each list item has an artificial height; otherwise the scrolling wouldn't work. Let's see the implementation.

# Scroll to Item from within the List Component

The implementation to scroll from within the list to an item looks as follows:

```javascript{1,8,10,11,12,13,14,19,26,27,28}
import React, { createRef } from 'react';

const list = [ ... ];

const List = () => (
  <ul>
    {list.map(item => {
      const ref = createRef();

      const handleClick = () =>
        ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

      return (
        <li
          key={item.id}
          ref={ref}
          style={{ height: '250px', border: '1px solid black' }}
        >
          <div>{item.id}</div>
          <div>{item.firstname}</div>
          <div>{item.lastname}</div>
          <div>{item.year}</div>
          <button type="button" onClick={handleClick}>
            Scroll Into View
          </button>
        </li>
      );
    })}
  </ul>
);

export default List;
```

So how does this work? Let's get into the details: In order to scroll to an item from within the list component, we add for each item a button element with a onClick handler. Also each item in the list receives a [ref object for accessing the DOM node](https://www.robinwieruch.de/react-ref-attribute-dom-node/) later. Then in the click handler of the button, we can use the reference of the DOM node to use the scrollIntoView API. In our case, we are using a configuration object to make it a smooth scroll to the start of the list item.

# Scroll to Item from outside the List Component

The implementation to scroll from outside the list to an item looks as follows:

```javascript{1,6,7,8,9,11,12,13,14,15,19,20,21,22,23,24,25,26,27,28,29,30,36}
import React, { createRef } from 'react';

const list = [ ... ];

const List = () => {
  const refs = list.reduce((acc, value) => {
    acc[value.id] = createRef();
    return acc;
  }, {});

  const handleClick = id =>
    refs[id].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

  return (
    <div>
      <ul>
        {list.map(item => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => handleClick(item.id)}
            >
              Scroll Item {item.id} Into View
            </button>
          </li>
        ))}
      </ul>

      <ul>
        {list.map(item => (
          <li
            key={item.id}
            ref={refs[item.id]}
            style={{ height: '250px', border: '1px solid black' }}
          >
            <div>{item.id}</div>
            <div>{item.firstname}</div>
            <div>{item.lastname}</div>
            <div>{item.year}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
```

Again each item in the list receives a ref attribute to make the DOM node accessible later. However, since we need to operate from the outside, we cannot create the refs conveniently for each item within the iteration of the [map method](https://www.robinwieruch.de/javascript-map-array/) like before. Instead, we need to create refs on the outside for each list item with an extra reduce method and store them in an object accessible by the list item's ids (dictionary). Then we create an extra list of buttons for each list item, but outside of the actual rendered list. Each button uses the same handler, but provides the id of the item as parameter. The id is used to retrieve the correct ref from the object of refs, which is ultimately used to scroll to the list item.

Hopefully both brief examples help you to get started with scrolling imperatively from list item to list item in your React application. All examples can be found in this [GitHub repository](https://github.com/the-road-to-learn-react/react-list-component) among other React List Component examples.
