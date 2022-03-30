---
title: "React Hook: Check if Overflow"
description: "A React hook by example that checks if an element's content has overflow (scroll) ..."
date: "2021-12-21T07:52:46+02:00"
categories: ["React", "React Hooks"]
keywords: ["react hook", "react hook example", "check if overflow"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A neat custom [React Hook](/react-hooks) that I used in some of my [React freelance projects](/freelance-react-developer) which checks if an element's content has overflow (here: vertical overflow):

```javascript
import * as React from 'react';

export const useIsOverflow = (ref, callback) => {
  const [isOverflow, setIsOverflow] = React.useState(undefined);

  React.useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflow = current.scrollHeight > current.clientHeight;

      setIsOverflow(hasOverflow);

      if (callback) callback(hasOverflow);
    };

    if (current) {
      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};
```

If you want to detect a horizontal overflow instead, you can exchange the `hasOverflow` assignment to the following:

```javascript
const hasOverflow = current.scrollWidth > current.clientWidth;
```

In a [function component](/react-function-component), the custom React hook can be used this way:

```javascript
import * as React from 'react';

import { useIsOverflow } from './useIsOverflow';

const App = () => {
  const ref = React.useRef();
  const isOverflow = useIsOverflow(ref);

  console.log(isOverflow);
  // true

  return (
    <div style={{ overflow: 'auto', height: '100px' }} ref={ref}>
      <div style={{ height: '200px' }}>Hello React</div>
    </div>
  );
};
```

The first time the hook returns an undefined, because the state hasn't been set yet.

The custom hook also accepts an optional [callback function](/javascript-callback-function) which fires after the overflow has been checked:

```javascript{3-6}
const App = () => {
  const ref = React.useRef();
  const isOverflow = useIsOverflow(ref, (isOverflowFromCallback) => {
    console.log(isOverflowFromCallback);
    // true
  });

  console.log(isOverflow);
  // true

  return (
    <div style={{ overflow: 'auto', height: '100px' }} ref={ref}>
      <div style={{ height: '200px' }}>Hello React</div>
    </div>
  );
};
```

If an element's size changes, you could adapt the custom hook to check verify again the overflow, but only if the browser supports the ResizeObserver:

```javascript{18-20}
import * as React from 'react';

export const useIsOverflow = (ref, callback) => {
  const [isOverflow, setIsOverflow] = React.useState(undefined);

  React.useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflow = current.scrollHeight > current.clientHeight;

      setIsOverflow(hasOverflow);

      if (callback) callback(hasOverflow);
    };

    if (current) {
      if ('ResizeObserver' in window) {
        new ResizeObserver(trigger).observe(current);
      }

      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};
```

That's it. There may be many ways to improve this custom hook (e.g. initializing the [ref](/react-ref) within the custom hook and return it from the custom hook to attach it to the element, fire the custom hook [only once](/react-useeffect-only-once)), but for my cases it has been sufficient for now.
