---
title: "React: How to create a Custom Hook"
description: "How to create a custom hook in React. A step by step tutorial which walks you through an example ..."
date: "2022-04-06T05:52:46+02:00"
categories: ["React", "React Hooks"]
keywords: ["react custom hook", "react custom hook example"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

import ToggleBase from './components/ToggleBase.js';
import ToggleTrueFalse from './components/ToggleTrueFalse.js';
import ToggleExtended from './components/ToggleExtended.js';

React introduced [Hooks](/react-hooks/) quite a while ago. With their release, Hooks gave [function components](/react-function-components/) the ability to use state and side-effects with built-in Hooks such as [React's useState Hook](/react-usestate-hook) and [React's useEffect Hook](/react-useeffect-hook/).

There are only a handful built-in Hooks (e.g. [useReducer](/react-usereducer-hook/), [useCallback](/react-usecallback-hook/), [useMemo](/react-usememo-hook/), [useContext](/react-usecontext-hook/)) provided by React though. However, by using these Hooks as a foundation, React developers can create their own hooks called **custom hooks**. In this tutorial, I will walk you through creating a custom hook as a learning experience.

Before we create a custom hook, you need to know that there are two rules to creating one:

* Custom Hooks are named with "use" as prefix. For example, a custom hook could be named useLocalStorage or useAuthentication. In our case, the custom hook will be named useBoolean.
* Custom Hooks consist of built-in React Hooks or other custom Hooks. Therefore a custom Hook is always a new composition of one or multiple Hooks. If a custom Hook does not use any hooks internally, it's not a custom Hook and shouldn't have the prefix "use".

We will create a custom Hook called useBoolean which I almost use every time when I join a new project as a [React freelancer](/freelance-react-developer/). But before we implement this hook, let's see what problem it solves for us. Let's start with a little example:

```javascript
import * as React from 'react';

function App() {
  const [isToggle, setToggle] = React.useState(false);

  const handleToggle = () => setToggle(!isToggle);

  return (
    <div>
      <button type="button" onClick={handleToggle}>
        Toggle
      </button>

      {isToggle.toString()}
    </div>
  );
}

export default App;
```

<Box attached center>
  <ToggleBase />
</Box>

The component renders a button which toggles a boolean. In a real world React application, there is not much you can do with a stateful boolean. Either you toggle it (like in the previous example) or you set it explicitly to true or false (like in the next example):

```javascript{7-8,15-20}
import * as React from 'react';

function App() {
  const [isToggle, setToggle] = React.useState(false);

  const handleToggle = () => setToggle(!isToggle);
  const handleTrue = () => setToggle(true);
  const handleFalse = () => setToggle(false);

  return (
    <div>
      <button type="button" onClick={handleToggle}>
        Toggle
      </button>
      <button type="button" onClick={handleTrue}>
        To True
      </button>
      <button type="button" onClick={handleFalse}>
        To False
      </button>

      {isToggle.toString()}
    </div>
  );
}

export default App;
```

<Box attached center>
  <ToggleTrueFalse />
</Box>

Some developers may argue that we could have used [inline handlers](/react-event-handler/) instead, so there wouldn't be the repetitive declaration of event handlers. However, personally I try to avoid inline handlers as much as I can, because they inject too much logic into the JSX which instead should be defined between the component's function signature and the return statement. But that's just personal preference.

Anyway, every time you use a stateful boolean, you will encounter the same implementation details: Either you toggle the boolean or set it to one of its two possible values. To shield away this repetitive code when using stateful booleans in more than one React component, I started to create a custom hook for it:

```javascript
const useBoolean = () => {
  const [state, setState] = React.useState();

  const handleTrue = () => setState(true);
  const handleFalse = () => setState(false);
  const handleToggle = () => setState(!state);

  return [
    state,
    {
      setTrue: handleTrue,
      setFalse: handleFalse,
      setToggle: handleToggle,
    },
  ];
};
```

Essentially all implementation details, meaning the state and the event handlers, moved into this custom hook called useBoolean. In addition, the custom hook returns the state and the functions to update the state in an array.

Returning an array is a best practice when returning multiple values from a custom hook, because React's built-in Hooks -- in the case of returning multiple values -- make use of arrays and therefore array destructuring as well. Using array destructuring comes with the benefit of giving the destructured values any name (less code than renaming values in the case of object destructuring).

```javascript{1-2}
const useBoolean = (initialState = false) => {
  const [state, setState] = React.useState(initialState);

  const handleTrue = () => setState(true);
  const handleFalse = () => setState(false);
  const handleToggle = () => setState(!state);

  return [
    state,
    {
      setTrue: handleTrue,
      setFalse: handleFalse,
      setToggle: handleToggle,
    },
  ];
};
```

A good addition would be adding an initial state too (as seen in the last code snippet). Back in our App component, we can make use of this new custom hook by passing an initial state to it and by using its returned values to display the state and to update it:

```javascript{2,6}
function App() {
  const [isToggle, { setToggle }] = useBoolean(false);

  return (
    <div>
      <button type="button" onClick={setToggle}>
        Toggle
      </button>

      {isToggle.toString()}
    </div>
  );
}
```

Since the custom hook does not only offer the function to toggle the stateful boolean, but also to set it explicitly to true or false, we can make use of these functions too:

```javascript{4-5,13-18}
function App() {
  const [isToggle, {
    setToggle,
    setTrue,
    setFalse,
  }] = useBoolean(false);

  return (
    <div>
      <button type="button" onClick={setToggle}>
        Toggle
      </button>
      <button type="button" onClick={setTrue}>
        To True
      </button>
      <button type="button" onClick={setFalse}>
        To False
      </button>

      {isToggle.toString()}
    </div>
  );
}
```

<Box attached center>
  <ToggleExtended />
</Box>

Essentially we extracted the stateful boolean and all the event handlers -- which are operating on the boolean -- into a custom hook. By using this custom hook every time we need a stateful boolean, we can spare defining the event handlers which include the implementation details about how to manipulate the boolean and instead use the functions that are returned from the hook.

In conclusion, we have learned how to create a custom hook by using one of React's built-in Hooks called useState. This custom hooks is not complex, however, it should show you how you can either reduce complexity and redundancy in your React project.

<Divider />

There are many custom React Hooks out there suited for various problems. Most of them can be installed via [npm](/npm-crash-course/). However, whenever I find a good one myself, I try to write briefly about it. These are some of them you may want to check out:

- [React Hook: Detect click outside of Component](/react-hook-detect-click-outside-component/)
- [React Hook: Using the Local Storage](/react-uselocalstorage-hook/)
- [React Hook: Check if Overflow](/react-custom-hook-check-if-overflow/)
- [React Hook: Get Scroll Direction](/react-hook-scroll-direction/)
- [React Hook: Get Scrollbar Width](/react-hook-scrollbar-width/)