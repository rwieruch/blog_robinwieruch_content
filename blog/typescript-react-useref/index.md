---
title: "TypeScript: React useRef Hook"
description: "How to use React's useRef Hook with TypeScript for using a ref ..."
date: "2022-07-19T06:52:46+02:00"
categories: ["React", "React Hooks"]
keywords: ["useRef typescript", "react ref typescript"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

import RefCounter from './components/RefCounter.js';
import RefCounterComplex from './components/RefCounterComplex.js';
import RefStopwatch from './components/RefStopwatch.js';

A brief summary of how to use React's useRef Hook for using a ref with TypeScript. First, a ref in React is mainly used to assign a HTML element to it. The assigned HTML element gives us imperative read and write operations on it which allows us to programmatically call functions. Take the following example for focusing an input element:

```javascript
import * as React from 'react';

const App = () => {
  const ref = React.useRef();

  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return <input ref={ref} />;
};

export default App;
```

When using this [function component](/react-function-component/) with its useRef hook in TypeScript, you will most likely encounter an error. The best practice would be initializing the ref with null. In addition, you have to use a type argument to cast the ref to the type of HTMLInputElement respectively to the element where it is used as `ref` attribute:

```javascript{4}
import * as React from 'react';

const App = () => {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return <input ref={ref} />;
};

export default App;
```

Essentially that's already it if you want to use an immutable ref for the HTML element. However, sometimes you want to use a [ref as an instance variable](/react-ref/) to capture a value. For example, a ref could keep track of all click interactions:

```javascript{6,9,14,24}
import * as React from 'react';

const App = () => {
  const [count, setCount] = React.useState<number>(0);

  const ref = React.useRef<number>(0);

  const handleIncrement = () => {
    ref.current++;
    setCount(count + 1);
  };

  const handleDecrement = () => {
    ref.current++;
    setCount(count - 1);
  };

  return (
    <>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>

      <div>Count: {count}</div>
      <div>Buttons {ref.current} times clicked</div>
    </>
  );
};

export default App;
```

<Box attached>
  <RefCounter />
</Box>


Similar example but with a complex object where we extracted the type argument as interface:

```javascript{3-6,11-14,17,22,32-35,37-38}
import * as React from 'react';

interface CounterTracker {
  increment: number;
  decrement: number;
}

const App = () => {
  const [count, setCount] = React.useState<number>(0);

  const ref = React.useRef<CounterTracker>({
    increment: 0,
    decrement: 0,
  });

  const handleIncrement = () => {
    ref.current.increment++;
    setCount(count + 1);
  };

  const handleDecrement = () => {
    ref.current.decrement++;
    setCount(count - 1);
  };

  return (
    <>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <div>Count: {count}</div>

      <div>
        Buttons {ref.current.increment + ref.current.decrement}{' '}
        times clicked
      </div>

      <div>Increment clicked: {ref.current.increment}</div>
      <div>Decrement clicked: {ref.current.decrement}</div>
    </>
  );
};

export default App;
```

<Box attached>
  <RefCounterComplex />
</Box>

If you happen to start with an instance variable that's not initialized in React's useRef Hook, but later in the code, then you would have to initialize React's useRef Hook with null and use a union type based on the actual type and null for the type argument:

```javascript{7}
import * as React from 'react';

const App = () => {
  const [seconds, setSeconds] = React.useState<number>(0);
  const [toggle, setToggle] = React.useState<boolean>(false);

  const ref = React.useRef<NodeJS.Timeout | null>(null);

  const toggleStopwatch = () => {
    setToggle(!toggle);
  };

  const resetStopwatch = () => {
    setToggle(false);
    setSeconds(0);
  };

  React.useEffect(() => {
    ref.current = setInterval(() => {
      if (toggle) setSeconds((state) => state + 1);
    }, 1000);

    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [toggle]);

  return (
    <>
      <div>{seconds}</div>

      <button onClick={toggleStopwatch}>
        {toggle ? 'Stop' : 'Start'}
      </button>

      <button onClick={resetStopwatch}>Reset</button>
    </>
  );
};

export default App;
```

<Box attached>
  <RefStopwatch />
</Box>

Essentially that's everything you need to know about using TypeScript, React's useRef Hook, and React's ref. After all, either the ref is used as HTML element by leveraging the ref attribute on an element or as instance variable to keep track of a state which does not cause React to re-render. If you happen to find other variations of using React's ref with TypeScript, let me know and I will add them to this guide.