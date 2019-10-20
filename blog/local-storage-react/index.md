---
title: "Session Storage and Local Storage in React"
description: "Tutorial to showcase the usage of session storage and local storage in React to persist your local state, to cache it for browser reloads, and to make it expire for sessions ..."
date: "2019-04-03T13:50:46+02:00"
categories: ["React"]
keywords: ["react local storage", "react session storage"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

After reading [the Road to learn React](http://www.robinwieruch.de/the-road-to-learn-react/), a few readers approached me with a question: How can I persist state in React? Obviously it would be possible by having a backend application to store it in a database. Once the frontend React application starts, it would make a request to the backend application to retrieve the data from the database. Afterward, the result could be stored in a component's state.

But a simpler yet most of the times more sufficient solution could be to use the native local storage of the browser. There is no backend and no additional library needed. The article gives you a step by step showcase on how to persist state in React with local storage, how to use it as a cache for data in a more elaborate example, and how to make it expire by using the session storage instead of the local storage.

# Table of Contents

* [Introduction to Local Storage](#local-storage)
* [Local Storage in React](#local-storage-react)
* [Expiration with Session Storage](#session-storage-react)
* [How to Cache Data in React?](#react-local-storage-as-cache)

# Introduction to Local Storage

The local storage is supported by many browsers. You can check the browser compatibility and read even more about it in [the official documentation](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage). The usage of the local storage is fairly straight forward. In your JavaScript code, running in the browser, you should have access to the `localStorage` instance which has setter and getter to store and retrieve data from the local storage. There are also methods on the local storage to remove items and to clear all items:

```javascript
// setter
localStorage.setItem('myData', data);

// getter
localStorage.getItem('myData');

// remove
localStorage.removeItem('myData');

// remove all
localStorage.clear();
```

Whereas the first argument is the key to store/retrieve the data, the second argument -- when storing the data -- is the actual data. Once you close the browser and open the JavaScript application again, you will find the data still in the local storage.

# Local Storage in React

Let's approach the local storage in React by example. In our scenario, we have a stateful [function component](https://www.robinwieruch.de/react-function-component/) which uses [React Hooks](https://www.robinwieruch.de/react-hooks/) to manage the state of an input field. Also the result of the state is shown as output with an HTML paragraph tag:

```javascript
import React from 'react';

const App = () => {
  const [value, setValue] = React.useState('');

  const onChange = event => setValue(event.target.value);

  return (
    <div>
      <h1>Hello React with Local Storage!</h1>

      <input value={value} type="text" onChange={onChange} />

      <p>{value}</p>
    </div>
  );
};

export default App;
```

If you start to type something into the input field, it will be shown below in the paragraph. However, even though you got the state, it's lost once you close the browser tab or refresh it. So what about adding the local storage as intermediate cache for it? A straight forward solution would be this one:

```javascript{6,7,10}
import React from 'react';

const App = () => {
  const [value, setValue] = React.useState('');

  const onChange = event => {
    localStorage.setItem('myValueInLocalStorage', event.target.value);

    setValue(event.target.value);
  };

  return (
    <div>
      <h1>Hello React with Local Storage!</h1>

      <input value={value} type="text" onChange={onChange} />

      <p>{value}</p>
    </div>
  );
};

export default App;
```

However, using the local storage in React's function components is a side-effect which is best implemented with the Effect Hook which runs every time the `value` property changes:

```javascript{6,7,8}
import React from 'react';

const App = () => {
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    localStorage.setItem('myValueInLocalStorage', value);
  }, [value]);

  const onChange = event => setValue(event.target.value);

  return (
    <div>
      <h1>Hello React with Local Storage!</h1>

      <input value={value} type="text" onChange={onChange} />

      <p>{value}</p>
    </div>
  );
};

export default App;
```

Every time the `value` state gets changed via the input field, the effect runs again and stores the recent `value` into the local storage. However, one step is missing: we only store the value and never retrieve it. Let's add this behavior in the next step:

```javascript{5}
import React from 'react';

const App = () => {
  const [value, setValue] = React.useState(
    localStorage.getItem('myValueInLocalStorage') || ''
  );

  React.useEffect(() => {
    localStorage.setItem('myValueInLocalStorage', value);
  }, [value]);

  const onChange = event => setValue(event.target.value);

  return (
    <div>
      <h1>Hello React with Local Storage!</h1>

      <input value={value} type="text" onChange={onChange} />

      <p>{value}</p>
    </div>
  );
};

export default App;
```

Now, the State Hook uses either the initial value from the local storage or an empty string as default. Try it yourself by entering something into the input field and refreshing the browser. You should see the same value as before. An additional step would be to extract this functionality as reusable custom hook:

```javascript{3,4,5,6,7,8,9,10,11,12,13,16,17,18}
import React from 'react';

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};

const App = () => {
  const [value, setValue] = useStateWithLocalStorage(
    'myValueInLocalStorage'
  );

  const onChange = event => setValue(event.target.value);

  return (
    <div>
      <h1>Hello React with Local Storage!</h1>

      <input value={value} type="text" onChange={onChange} />

      <p>{value}</p>
    </div>
  );
};

export default App;
```

Now you can cache your React state for different components by using one and the same custom hook for it. You can find the final source code for this project in [this GitHub repository](https://github.com/the-road-to-learn-react/react-local-storage). If you like it, make sure to star it. You can also head over to my other article, if you want to see the [same functionality implemented in different component types](https://www.robinwieruch.de/react-component-types/).

# Expiration with Session Storage

Sometimes you want to cache/persist data only in your current browser session. When closing the browser, you want the cache to become empty again; but when you refresh the browser tab, you want to keep the cache intact. For instance, this behavior can be useful when you [deal with an user session after a user logged in into your application](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial). The user session could be saved until the browser is closed. That's where you can use the native `sessionStorage` instead of the `localStorage`. The [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) is used in the same way as the local storage.

# How to Cache Data in React?

Let's take the local storage usage in React one step further by deploying it as cache for search results. In the following example, you will fetch data from an remote [API](https://www.robinwieruch.de/what-is-an-api-javascript/) and store it in your component's state.

Furthermore, you will store the result in the local storage as well. Afterward, we will use the local storage as cache every time we do another search request. If you search for a keyword and the result for this keyword has already been saved in the local storage, we will use the local storage instead of executing another API call. If there is no result in the local storage, we will do the usual API request.

Let's start with a component that fetches data from the [Hacker News API](https://hn.algolia.com):

```javascript
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { query: '', hits: [] };
  }

  onChange = event => {
    this.setState({ query: event.target.value });
  };

  onSearch = event => {
    event.preventDefault();

    const { query } = this.state;

    if (query === '') {
      return;
    }

    fetch('https://hn.algolia.com/api/v1/search?query=' + query)
      .then(response => response.json())
      .then(result => this.onSetResult(result, query));
  };

  onSetResult = (result, key) => {
    this.setState({ hits: result.hits });
  };

  render() {
    return (
      <div>
        <h1>Search Hacker News with Local Storage</h1>

        {/* Search Input */}
        <form onSubmit={this.onSearch}>
          <input type="text" onChange={this.onChange} />
          <button type="submit">Search</button>
        </form>

        {/* Result */}
        {this.state.hits.map(item => (
          <div key={item.objectID}>{item.title}</div>
        ))}
      </div>
    );
  }
}

export default App;
```

If it's difficult for you to grasp what's happening here, head over to my [data fetching tutorial for React](https://www.robinwieruch.de/react-fetching-data/). In the next step, you can add only a few lines to enable caching for your React application:

```javascript{23,25,26,27,31,35,44,45,46,47}
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { query: '', hits: [] };
  }

  onChange = event => {
    this.setState({ query: event.target.value });
  };

  onSearch = event => {
    event.preventDefault();

    const { query } = this.state;

    if (query === '') {
      return;
    }

    const cachedHits = localStorage.getItem(query);

    if (cachedHits) {
      this.setState({ hits: JSON.parse(cachedHits) });
    } else {
      fetch('https://hn.algolia.com/api/v1/search?query=' + query)
        .then(response => response.json())
        .then(result => this.onSetResult(result, query));
    }
  };

  onSetResult = (result, key) => {
    localStorage.setItem(key, JSON.stringify(result.hits));

    this.setState({ hits: result.hits });
  };

  render() {
    return (
      <div>
        <h1>Search Hacker News with Local Storage</h1>
        <p>
          There shouldn't be a second network request, when you search
          for a keyword twice.
        </p>

        {/* Search Input */}
        <form onSubmit={this.onSearch}>
          <input type="text" onChange={this.onChange} />
          <button type="submit">Search</button>
        </form>

        {/* Result */}
        {this.state.hits.map(item => (
          <div key={item.objectID}>{item.title}</div>
        ))}
      </div>
    );
  }
}

export default App;
```

There shouldn't be a request to the API made twice for the same search term, because the result should be cached in the local storage. If there are `cachedHits` in the `localStorage` instance, the cached result is set as state and no API request is performed. You can find the final project and source code in this [GitHub project](https://github.com/the-road-to-learn-react/react-local-storage-cache). If you like it, make sure to star it.

*Note: Every complex object needs to be stored as JSON in the local storage. Since the result from the API is a complex JavaScript object, and not only a primitive String, it needs to be stringified when stored and parsed when retrieved from the storage.*

<Divider />

As mentioned in the beginning, sometimes you don't need a sophisticated persistent layer in your application by deploying a backend with a database. Often it turns out to be sufficient to use the local storage or session storage as a cache.

If you are looking for more advanced local storage solutions, you can checkout [store.js](https://github.com/marcuswestin/store.js/) and [cross-storage](https://github.com/zendesk/cross-storage). The former is used for browser compatibility and the latter is used for cross domain synchronization of local storages. If you know any other great solutions for local storage and JavaScript, let me know in the comments below.
