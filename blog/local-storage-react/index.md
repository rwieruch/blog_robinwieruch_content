---
title: "Local Storage in React"
description: "Learn how to use the local storage in React to store state by using a React Hook called useLocalStorage ..."
date: "2022-04-06T04:52:46+02:00"
categories: ["React"]
keywords: ["react local storage hook"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

import NoLocalStorageToggle from './components/NoLocalStorageToggle.js';
import LocalStorageToggle from './components/LocalStorageToggle.js';

<Sponsorship />

In this React tutorial, you will learn **how to store state in local storage** by using a custom [React Hook](/react-hooks/). We will address the session storage shortly as well, but essentially it is used the same way as the local storage in React. Before reading about using the local storage in React, I will give you a brief overview of how to use it and when to use it in just JavaScript.

# Table of Contents

<TableOfContents {...props} />

# Local Storage in JavaScript

The local storage is supported by modern browsers. You can check the [browser compatibility](https://caniuse.com/?search=localstorage) and read even more about it in [the official documentation](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage).

How to use the local storage in JavaScript? In your client-side JavaScript, running in the browser and therefore having access to the browser's API, you should have access to the `localStorage` instance which has setter and getter methods to write and read data to and from the local storage:

```javascript
const textForStorage = 'Hello World.'

// setter
localStorage.setItem('my-key', textForStorage);

// getter
const textFromStorage = localStorage.getItem('my-key');
```

Both methods require you to pass a string (here: `'my-key'`) which identifies the stored value in the local storage. With this key, you can either set or get an item to or from the local storage. In other words, whereas the first parameter is the key to write/read the data, the second parameter -- when storing the data -- is the actual data.

There are also methods on the local storage to remove individual items and to clear all items:

```javascript
// remove
localStorage.removeItem('my-key');

// remove all
localStorage.clear();
```

The data in the local storage persists over browser sessions, which means that even closing and opening the browser keeps this data alive.

What's important to note is that the data stored in the local storage should be in a JavaScript string format. For example, if you want to write and read an object to and from the local storage, you would need to use the JSON API to transform (`JSON.stringify()`) it from JavaScript object to JavaScript string (to write) and to transform (`JSON.parse()`) it back from JavaScript string to JavaScript object (to read):

```javascript
const person = { firstName: 'Robin', lastName: 'Wieruch' };

localStorage.setItem('user', JSON.stringify(person));

const stringifiedPerson = localStorage.getItem('user');
const personAsObjectAgain = JSON.parse(stringifiedPerson);
```

Having a persisted store at the client-side enables developers to unlock lots of UX for their application's users. For example, one could store user preferences such light/dark mode and language settings, so that the user keeps this settings semi persistent in the browser without having to deal with a backend API and its database.

# Local Storage in React

Next we will focus our attention on using the local storage in React. In the example, we have a [React function component](/react-function-component/) which uses [React's useState Hook](/react-usestate-hook/) to manage the [state](/react-state/) of a JavaScript boolean primitive. This boolean is toggled with a button HTML element and a [React event handler](/react-event-handler/). With the help of this boolean, we [conditionally render](/conditional-rendering-react/) text:

```javascript
import * as React from 'react';

const App = () => {
  const [isOpen, setOpen] = React.useState(false);

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

<Box attached>
  <NoLocalStorageToggle />
</Box>

You can toggle the content on and off by clicking the button. However, if you refresh the browser (or close and open it again), you will begin with `false` as initial state, because React's useState Hook is implementing it this way. So what about using the local storage as a cache between browser sessions for it? A solution could look like the following:

```javascript{5,9}
import * as React from 'react';

const App = () => {
  const [isOpen, setOpen] = React.useState(
    JSON.parse(localStorage.getItem('is-open')) || false
  );

  const handleToggle = () => {
    localStorage.setItem('is-open', JSON.stringify(!isOpen));

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

<Box attached>
  <LocalStorageToggle />
</Box>

At two places we established both reading and writing methods of the local storage. While we store the new boolean state as stringified value into the local storage in React's event handler, we read the from string to boolean parsed value from the local storage for the initial state used in React's useState Hook. If there is no value in the local storage, we default to `false` for the initial state.

The proposed solution works if local storage is available in your browser. Try to toggle the open state to either `true` or `false` and refresh the browser. The state should stay intact, because it is stored with every user interaction and retrieved for the initial state when rendering the component for the first time and therefore initializing its hooks.

However, the proposed solution is not a best practice for dealing with this kind of situations (called side-effects) in React. For example, what if the `setOpen` state updater function is called somewhere else? We would break the functionality, because we may miss to implement writing to the local storage there too. We could improve the implementation by reactively setting the `isOpen` state in the local storage whenever it changes by using [React's useEffect Hook](/react-useeffect-hook/):

```javascript{12-14}
import * as React from 'react';

const App = () => {
  const [isOpen, setOpen] = React.useState(
    JSON.parse(localStorage.getItem('is-open')) || false
  );

  const handleToggle = () => {
    setOpen(!isOpen);
  };

  React.useEffect(() => {
    localStorage.setItem('is-open', JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <div>
      <button onClick={handleToggle}>Toggle</button>
      {isOpen && <div>Content</div>}
    </div>
  );
};

export default App;
```

Now, whenever `isOpen` gets changed, the hook for the side-effect will run and to its thing (here: saving it to the local storage).

# React Local Storage Hook

Last but not least, you can extract the functionality as reusable [custom React hook](/react-custom-hook/) which synchronizes the local storage to React's state:

```javascript{3-13,16}
import * as React from 'react';

const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
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

By extracting the feature as a reusable hook, you can use it in more than one React component. Every component just needs to use a unique `storageKey` to not collide with other component's storages.

Anyway, even though this custom hook shows you the idea of how it works, you should rely on an open source variant of it for your React production application. Read in this [article](/react-uselocalstorage-hook/) which useLocalStorage hook I prefer use in my projects.

# Session Storage in React

Sometimes you want to cache/persist data **only in your current browser session**. When closing the browser, you want the cache to become empty again, but when you refresh the browser tab, you want to keep the cache intact.

For example, when handling [authentication in React](/react-router-authentication/), the user session can be saved in the session storage until the browser gets closed. Therefore, you would use the browser's session storage instead of the local storage:

```javascript
const textForStorage = 'Hello World.'

// setter
sessionStorage.setItem('my-key', textForStorage);

// getter
const textFromStorage = sessionStorage.getItem('my-key');
```

As you can see, the [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) is used in the same way as the local storage, it just behaves differently by not persisting the store across browser sessions.

# How to Cache Data in React

Let's take the local storage usage in React one step further by using it as cache for remote data which persists over browser sessions. Therefore, in the next example, you will fetch data from an remote [API](/what-is-an-api-javascript/) and store it in your React component's state.

<ReadMore label="How to fetch data in React" link="/react-hooks-fetch-data/" />

We will start with a component that fetches data from the a [popular API](https://hn.algolia.com):

```javascript
import * as React from 'react';
import axios from 'axios';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
const INITIAL_QUERY = 'react';

const App = () => {
  const [data, setData] = React.useState({ hits: [] });
  const [query, setQuery] = React.useState(INITIAL_QUERY);
  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${INITIAL_QUERY}`
  );

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);

      setData({ hits: result.data.hits });
    };

    fetchData();
  }, [url]);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() => setUrl(`${API_ENDPOINT}${query}`)}
      >
        Search
      </button>

      <ul>
        {data.hits.map((item) => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
```

Next, you will store the data in the local storage too. By using the previous learnings about how to use local storage in React, we can store the result with a key/value pair into the browser's store -- whereas the key is the API endpoint's URL and the value is the actual result:

```javascript{8}
const App = () => {
  ...

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);

      localStorage.setItem(url, JSON.stringify(result));

      setData({ hits: result.data.hits });
    };

    fetchData();
  }, [url]);

  return (
    ...
  );
};
```

The last step enables us to use the local storage as cache every time the user performs a search request to the API. If you search for a keyword and the result for this keyword has already been saved (read: cached) in the local storage, we will read from the local storage instead of executing another API call. If there is no result in the local storage, we will do the usual API request:

```javascript{6,8-12,15}
const App = () => {
  ...

  React.useEffect(() => {
    const fetchData = async () => {
      const cachedResult = JSON.parse(localStorage.getItem(url));

      let result;

      if (cachedResult) {
        result = cachedResult;
      } else {
        result = await axios(url);
        localStorage.setItem(url, JSON.stringify(result));
      }

      setData({ hits: result.data.hits });
    };

    fetchData();
  }, [url]);

  return (
    ...
  );
};
```

With this implementation in place, there shouldn't be an API request made twice for the same query, because the result should be cached in the local storage. If there is a `cachedResult` in the `localStorage` instance, the cached result is set as state and no API request is performed. Keep this in mind as a learning exercise though, because in modern React data fetching libraries like [React Query](/react-libraries/) take care of such caching mechanisms for you.
