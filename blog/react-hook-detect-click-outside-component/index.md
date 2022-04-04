---
title: "React Hook: Detect Click outside of Component"
description: "How to detect a click outside of a React component by creating a custom hook for it ..."
date: "2022-04-04T07:52:46+02:00"
categories: ["React", "React Hooks"]
keywords: ["react custom hook", "react hook example", react detect click outside of component"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

import Count from './components/Count.js';
import WithHook from './components/WithHook.js';
import WithHookBug from './components/WithHookBug.js';
import WithoutHookBug from './components/WithoutHookBug.js';

A tutorial about how to **detect a click outside of a React component** by creating a [custom React hook](/react-custom-hook/) for it. For example, you may want such custom React hook for various components like a dialog or dropdown, because they should close when a user clicks outside of them. So we need a way to find out about this outside click.

Much of what you will learn here goes back to the concept of event bubbling and capturing in JavaScript. So if you need a refresher on the bubbling, target, and capturing phases, I'd suggest you to read the following article before which addresses this topic for React.

<ReadMore label="Event Capturing and Bubbling in React" link="/react-event-bubbling-capturing/" />

Let's kick things off with a [function component](/react-function-component/) in React where we increment a counter by using [React's useState Hook](/react-usestate-hook/) and an event handler:

```javascript
import * as React from 'react';

const style = {
  padding: '10px',
  border: '1px solid black',
  display: 'flex',
  justifyContent: 'flex-end',
};

function App() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount((state) => state + 1);
  };

  return (
    <div style={style}>
      <button type="button" onClick={handleClick}>
        Count: {count}
      </button>
    </div>
  );
}

export default App;
```

<Box attached>
  <Count />
</Box>

Everything works as expected. Next we want to reset the state (here: `count`) whenever a user clicks outside of the button. We can write the [event handler](/react-event-handler/) for resetting the state, however, it's not clear yet where to use it:

```javascript{4-6}
function App() {
  const [count, setCount] = React.useState(0);

  const handleClickOutside = () => {
    setCount(0);
  };

  const handleClick = () => {
    setCount((state) => state + 1);
  };

  return (
    <div style={style}>
      <button type="button" onClick={handleClick}>
        Count: {count}
      </button>
    </div>
  );
}
```

A naive approach would be using this new handler on the outermost HTML element of the top-level component (here: `<div>`). However, a better approach would be using this event handler on a document level as a best practice, because the outermost HTML element can change during the development process.

We will implement this in a custom hook straightaway to avoid a redundant refactoring:

```javascript
const useOutsideClick = (callback) => {
  const ref = React.useRef();

  React.useEffect(() => {
    const handleClick = (event) => {
      callback();
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return ref;
};
```

The custom hook initiates a [React ref](/react-ref/) which gets returned eventually. It's not really used yet in the hook's implementation details. In addition, the custom hook uses [React's useEffect Hook](/react-useeffect-hook/) to assign (and remove) an event listener (here: click event) on document level. After all, whenever the `document` gets clicked, the handler and thus the passed callback function will run.

Now the custom hook can be used the following way in our React component: pass the event handler as [callback function](/javascript-callback-function/) to the hook -- which executes whenever the document gets clicked. In addition, use the returned reference (here: `ref`) and assign it to the button HTML element:

```javascript{8,16}
function App() {
  const [count, setCount] = React.useState(0);

  const handleClickOutside = () => {
    setCount(0);
  };

  const ref = useOutsideClick(handleClickOutside);

  const handleClick = () => {
    setCount((state) => state + 1);
  };

  return (
    <div style={style}>
      <button ref={ref} type="button" onClick={handleClick}>
        Count: {count}
      </button>
    </div>
  );
}
```

However, as you will notice, the handler will *always* fire, also when the button itself gets clicked. If you check the custom hook again, you will see that the reference (read: `ref`) is not really used in there. What we want to accomplish: Execute the callback function *only* when anything outside of the passed `ref` (representing the button here) is clicked, not when the `ref` itself (or its content) gets clicked:

```javascript{6,8,16}
const useOutsideClick = (callback) => {
  const ref = React.useRef();

  React.useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref]);

  return ref;
};
```

<Box attached>
  <WithHook />
</Box>

That's it. The reference assigned to the button is the border between triggering the button's event handler and the document's event handler. Everything clicked that's outside of the reference will be considered as an outside click.

There is a small improvement missing though: What if we need to stop the event bubbling for [certain edge cases](/react-event-bubbling-capturing/) by using the `stopPropagation()` method on an event handler. For example, in the following we extend the component with a click on the container element and stop the propagation of the event there:

```javascript{5,23-27,30-31}
const style = {
  padding: '10px',
  border: '1px solid black',
  display: 'flex',
  justifyContent: 'space-between',
};

...

function App() {
  const [count, setCount] = React.useState(0);

  const handleClickOutside = () => {
    setCount(0);
  };

  const ref = useOutsideClick(handleClickOutside);

  const handleClick = () => {
    setCount((state) => state + 1);
  };

  const handleHeaderClick = (event) => {
    // do something

    event.stopPropagation();
  };

  return (
    <div style={style} onClick={handleHeaderClick}>
      <div>Header</div>
      <button ref={ref} type="button" onClick={handleClick}>
        Count: {count}
      </button>
    </div>
  );
}
```

<Box attached>
  <WithHookBug />
</Box>

When we try this example, we will see that the click on the container does not go through as "outside click", because even though it is an outside click, it never reaches the document's event listeners due to the event being stopped from bubbling.

By making use of the bubbling *and* capturing phase, we can adjust the custom hook to fire on the capturing phase instead. Because the capturing phase happens before the bubbling phase, the click on the document will run always even though events are being stopped from propagating in the bubbling phase:

```javascript{11,14}
const useOutsideClick = (callback) => {
  const ref = React.useRef();

  React.useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);

  return ref;
};
```

<Box attached>
  <WithoutHookBug />
</Box>

That's it. You created a custom hook which detects clicks outside of referenced components/elements. Again, read through the event bubbling and capturing article to get a more in-depth explanation of what's going on in these phases.

<Divider />

Last but not least, you may want to fall back to a library to deal with this subject. You can always implement custom hooks yourself -- it's a good way to exercise and a to understand implementation details under the hood -- however, if there is a bullet proof library out there which manages all the edge cases (see the capturing/bubbling edge case from before), you should make use of it.