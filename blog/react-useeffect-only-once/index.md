---
title: "React useEffect only Once"
description: "How to use React's useEffect Hook only Once. Learn about a custom hook to run useEffect only once if it meets a condition and afterward never again ..."
date: "2020-11-07T06:52:46+02:00"
categories: ["React"]
keywords: ["react useEffect only once"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

If you are wondering how to run React's useEffect Hook **only once**, you may be surprised that you need [React's useRef Hook as helper to create an instance variable](/react-ref/) for tracking the component's lifecycle. The following code shows you how to achieve it:

```javascript{10,12-22}
import * as React from 'react';

const App = () => {
  const [toggle, setToggle] = React.useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const calledOnce = React.useRef(false);

  React.useEffect(() => {
    if (calledOnce.current) {
      return;
    }

    if (toggle === false) {
      console.log('I run only once if toggle is false.');

      calledOnce.current = true;
    }
  }, [toggle]);

  return (
    <div>
      <button type="button" onClick={handleToggle}>
        Toggle
      </button>

      {toggle && <div>Hello React</div>}
    </div>
  );
};

export default App;
```

If you want to have a reusable custom hook for it, which only triggers the effect function once (and not on mount), you can use the following hook for it:

```javascript{3-17,26-32}
import * as React from 'react';

const useEffectOnlyOnce = (callback, dependencies, condition) => {
  const calledOnce = React.useRef(false);

  React.useEffect(() => {
    if (calledOnce.current) {
      return;
    }

    if (condition(dependencies)) {
      callback(dependencies);

      calledOnce.current = true;
    }
  }, [callback, condition, dependencies]);
};

const App = () => {
  const [toggle, setToggle] = React.useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffectOnlyOnce(
    (dependencies) => {
      console.log('I run only once if toggle is false.');
    },
    [toggle],
    (dependencies) => dependencies[0] === false
  );

  return (
    <div>
      <button type="button" onClick={handleToggle}>
        Toggle
      </button>

      {toggle && <div>Hello React</div>}
    </div>
  );
};

export default App;
```

That's it. React's useEffect Hook doesn't come with a feature to run it only once, however, this custom hook should help you to accomplish it. Let me know if this helps you.