---
title: "React useState with Callback"
description: "If you have used setState before, you may be missing a callback function for the useState hook. This tutorial explains how to implement it with useEffect ..."
date: "2019-06-03T03:52:46+02:00"
categories: ["React"]
keywords: ["react usestate callback"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

If you have started to use [React's useState hook](https://www.robinwieruch.de/react-usestate-hook) for your application, you may be missing a callback function, because only the initial state can be passed to the hook. In React class components, the setState method offers an optional second argument to pass a callback function. However, this second argument isn't available for React's useState hook. If you are moving from [React class components to function components](https://www.robinwieruch.de/react-hooks-migration/), this may be a concern for you. In this tutorial, I want to explain you how to implement it.

Note: If you are just looking for an out of the box solution, check out this [custom useState hook with callback function](https://github.com/the-road-to-learn-react/use-state-with-callback). That's what you are going to implement in this tutorial anyway.

# React useState Callback

In [React Function Components](https://www.robinwieruch.de/react-function-component/) with [Hooks](https://www.robinwieruch.de/react-hooks/), you can implement a callback function for anything using the [useEffect hook](https://www.robinwieruch.de/react-useeffect-hook). For instance, if you want to have a callback function for a state change, you can make the useEffect hook dependent on this state:

```javascript
const App = () => {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (count > 1) {
      console.log('Threshold of over 1 reached.');
    } else {
      console.log('No threshold reached.');
    }
  }, [count]);

  return (
    <div>
      <p>{count}</p>

      <button type="button" onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
};
```

The function you pass to the useEffect hook is your callback function which runs after the provided state changes from the useState hook's second argument. If you perform changes in this callback function that should be reflected in your component's rendered output, you may want to use [useLayoutEffect instead of useEffect](https://www.robinwieruch.de/react-useeffect-vs-uselayouteffect).

If you are looking for an out of the box solution, check out [this custom hook](https://github.com/the-road-to-learn-react/use-state-with-callback) that works like useState but accepts as second parameter as callback function:

```javascript{1,4,5,6,7,8,9,10}
import useStateWithCallback from 'use-state-with-callback';

const App = () => {
  const [count, setCount] = useStateWithCallback(0, count => {
    if (count > 1) {
      console.log('Threshold of over 1 reached.');
    } else {
      console.log('No threshold reached.');
    }
  });

  return (
    <div>
      <p>{count}</p>

      <button type="button" onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
};
```

The custom hook can be installed via `npm install use-state-with-callback`. At the end, the React team decided consciously against a second argument for useState for providing a callback function, because useEffect or useLayoutEffect can be used instead. However, if you are lazy, you can use the custom hook to get the same effect as setState from React class components.
