---
title: "React Batching"
description: "Learn about batching in React. Batching means that multiple state updates are batched as one update + render operation for an improved performance ..."
date: "2022-04-25T07:52:46+02:00"
categories: ["React"]
keywords: ["react batching"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

import ReactBatchingBasic from './components/ReactBatchingBasic.js';

<Sponsorship />

Batching in React describes the internal implementation detail of React which treats multiple state updates as one state update. The benefit: multiple state updates are batched as one state update and therefore trigger only one re-rendering of the component which improves the rendering performance especially for larger React applications. Let's explore batching in React with an example:

```javascript
import * as React from 'react';

const App = () => {
  const [counter, setCounter] = React.useState(42);
  const [clicked, setClicked] = React.useState(0);

  const handleCounter = (digit) => {
    setCounter(counter + digit);
    setClicked(clicked + 1);
  };

  console.log('component rendering');

  return (
    <div>
      <button type="button" onClick={() => handleCounter(1)}>
        Increase
      </button>
      <button type="button" onClick={() => handleCounter(-1)}>
        Decrease
      </button>

      <div>Counter: {counter}</div>
      <div>Clicked: {clicked}</div>
    </div>
  );
};

export default App;
```

<Box attached>
  <ReactBatchingBasic />
</Box>

When clicking either [button](/react-button/), even though there are two state updates happening in the [event handler](/react-event-handler/), the [function component](/react-function-component/) will re-render only once. Verify this behavior yourself by checking the console output.

Prior React 18, not all state updates were batched though. For example, state updates using asynchronous code (e.g. Promise) or third-party APIs (e.g. setTimeout) weren't batched and therefore triggered two re-renderings (for two respective state updates) of the component:

```javascript
import * as React from 'react';

const App = () => {
  const [counter, setCounter] = React.useState(42);
  const [clicked, setClicked] = React.useState(0);

  const handleCounterIncrease = () => {
    setTimeout(() => {
      setCounter(counter + 1);
      setClicked(clicked + 1);
    }, 0);
  };

  const handleCounterDecrease = async () => {
    await Promise.resolve();

    setCounter(counter - 1);
    setClicked(clicked + 1);
  };

  console.log('component rendering');

  return (
    <div>
      <button type="button" onClick={handleCounterIncrease}>
        Increase
      </button>
      <button type="button" onClick={handleCounterDecrease}>
        Decrease
      </button>

      <div>Counter: {counter}</div>
      <div>Clicked: {clicked}</div>
    </div>
  );
};

export default App;
```

However, with React's additions in React 18, [automatic batching](https://github.com/reactwg/react-18/discussions/21) became the default. If there are situations where a React developer would want to opt-out of batching, one could use the flushSync top-level API of React:

```javascript{2,9-11}
import * as React from 'react';
import { flushSync } from 'react-dom';

const App = () => {
  const [counter, setCounter] = React.useState(42);
  const [clicked, setClicked] = React.useState(0);

  const handleCounter = (digit) => {
    flushSync(() => {
      setCounter(counter + digit);
    });
    setClicked(clicked + 1);
  };

  console.log('component rendering');

  return (
    <div>
      <button type="button" onClick={() => handleCounter(1)}>
        Increase
      </button>
      <button type="button" onClick={() => handleCounter(-1)}>
        Decrease
      </button>

      <div>Counter: {counter}</div>
      <div>Clicked: {clicked}</div>
    </div>
  );
};

export default App;
```

The `flushSync()` forces React to apply the state updates in the callback function synchronously and therefore forces React to update the DOM immediately. Other pending state updates will be force applied too. After all, flushSync should be used sparingly (almost never), except for occassion where it is really needed, because it comes with caveats.

<Divider />

In conclusion, batching in React is just an implementation detail to improve the performance of state updates and therefore the re-rendering of each React component.