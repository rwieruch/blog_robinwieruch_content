---
title: "React Hook: useLocalStorage"
description: "How to store state in local storage in React by using a custom useLocalStorage hook ..."
date: "2022-04-05T07:52:46+02:00"
categories: ["React", "React Hooks"]
keywords: ["react uselocalstorage hook", "how to store state in local storage"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

A neat [custom](/react-custom-hook/) [React Hook](/react-hooks) that shows how to use local storage in React to store state. You can just use it in any React component and it allows you to write and read state to and from the local storage:

```javascript{3-13,16}
import * as React from 'react';

const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(storageKey)) || fallbackState
  );

  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

const App = () => {
  const [isOpen, setOpen] = useLocalStorage('is-open', false);

  const handleToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleToggle}>Toggle</button>
      {isOpen && <div>Content</div>}
    </div>
  );
};

export default App;
```

The local storage hook is only there as a learning experience though. If you rely on the local storage for your React application in production, you should check out more widely used hooks (and therefore robust) hooks which are maintained as an open source library. For example, for the local storage I personally always fall back to this [local storage hook](https://www.npmjs.com/package/use-local-storage-state).