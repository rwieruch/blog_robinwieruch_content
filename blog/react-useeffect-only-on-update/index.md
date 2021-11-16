---
title: "React useEffect only on Update"
description: "How to use React's useEffect Hook only on update. Learn about a custom hook to run useEffect only on update and not on mount (first render) ..."
date: "2020-11-07T07:52:46+02:00"
categories: ["React"]
keywords: ["react useEffect only on update"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

If you are wondering how to run React's useEffect Hook **only on update**, you may be surprised that you need [React's useRef Hook as helper to create an instance variable](/react-ref/) for tracking the component's lifecycle. The following code shows you how to achieve it:

```javascript{10,12-18}
import * as React from 'react';

const App = () => {
  const [toggle, setToggle] = React.useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current) {
      console.log('I run only if toggle changes.');
    } else {
      didMount.current = true;
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

If you want to have a reusable custom hook for it, which only triggers the effect function only on update (and not on mount), you can use the following hook for it:

```javascript{3-13,22-24}
import * as React from 'react';

const useEffectOnlyOnUpdate = (callback, dependencies) => {
  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current) {
      callback(dependencies);
    } else {
      didMount.current = true;
    }
  }, [callback, dependencies]);
};

const App = () => {
  const [toggle, setToggle] = React.useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffectOnlyOnUpdate((dependencies) => {
    console.log('I run only if toggle changes.');
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

That's it. React's useEffect Hook doesn't come with a feature to run it only on update, however, this custom hook should help you to accomplish it. Let me know if this helps you.