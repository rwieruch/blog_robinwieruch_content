+++
title = "How to fetch data with React Hooks?"
description = "A tutorial on how to fetch data in React with Hooks from third-party APIs. You will use state and effect hooks for the data request from a real API ..."
date = "2018-11-12T13:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react fetch data hooks"]
news_keywords = ["react fetch data hooks"]
hashtag = "#ReactJs"
card = "img/posts/react-hooks-fetch-data/banner_640.jpg"
banner = "img/posts/react-hooks-fetch-data/banner.jpg"
contribute = "react-hooks-fetch-data.md"
headline = "How to fetch data with React Hooks?"

summary = "A tutorial on how to fetch data with React Hooks by using local state and side-effects in React's function components. You will use local state and side-effects for fetching data from a real API."
+++

{{% sponsorship %}}

{{% pin_it_image "react fetch data hooks" "img/posts/react-hooks-fetch-data/banner.jpg" "is-src-set" %}}

In this tutorial, I want to show you **how to fetch data in React with Hooks** by using the {{% a_blank "state" "https://reactjs.org/docs/hooks-state.html" %}} and {{% a_blank "effect" "https://reactjs.org/docs/hooks-effect.html" %}} hooks. We will use the widely known {{% a_blank "Hacker News API" "https://hn.algolia.com/api" %}} to fetch popular articles from the tech world. You will also implement your custom hook for the data fetching that can be reused anywhere in your application or published on npm as standalone node package.

If you don't know anything about this new React feature, checkout this [introduction to React Hooks](https://www.robinwieruch.de/react-hooks/). If you want to checkout the finished project for the showcased examples that show how to fetch data in React with Hooks, checkout this {{% a_blank "GitHub repository" "https://github.com/the-road-to-learn-react/react-hooks-introduction" %}}.

**Note:** React Hooks are in React's alpha version (16.7.) and everything shown in this "how to"-article is under construction. The React team is {{% a_blank "collecting feedback for React Hooks" "https://github.com/reactjs/rfcs/pull/68" %}} which is your opportunity to contribute to this feature. If anything changes to the API, you can leave a hint in the comments below of this article too.

**Note:** In the future, React Hooks may not be intended for data fetching in React. Instead, a feature called Suspense will be in charge for it. The following walkthrough is nonetheless a great way to learn more about state and effect hooks in React.

{{% chapter_header "Data Fetching with React Hooks" "react-fetching-data-with-hooks" %}}

If you are not familiar with data fetching in React, checkout my [extensive data fetching in React article](https://www.robinwieruch.de/react-fetching-data/). It walks you through data fetching with React class components, how it can be made reusable with [Render Prop Components](https://www.robinwieruch.de/react-render-props-pattern/) and [Higher-Order Components](https://www.robinwieruch.de/gentle-introduction-higher-order-components/), and how it deals with error handling and loading spinners. In this article, I want to show you all of it with React Hooks in function components.

{{< highlight javascript >}}
import React, { useState } from 'react';

function App() {
  const [data, setData] = useState({ hits: [] });

  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default App;
{{< /highlight >}}

The App component shows a list of items (hits = Hacker News articles). The state and state update function come from the state hook called `useState` that is responsible to manage the local state for the data that we are going to fetch for the App component. The initial state is an empty list of hits in an object that represents the data. No one is setting any state for this data yet.

We are going to use {{% a_blank "axios" "https://github.com/axios/axios" %}} to fetch data, but it is up to you to use another data fetching library or the native fetch API of the browser. If you haven't installed axios yet, you can do so by on the command line with `npm install axios`. Then implement your effect hook for the data fetching:

{{< highlight javascript "hl_lines=1 2 7 8 9 10 11 12 13" >}}
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ hits: [] });

  useEffect(async () => {
    const result = await axios(
      'http://hn.algolia.com/api/v1/search?query=redux',
    );

    setData(result.data);
  });

  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default App;
{{< /highlight >}}

The effect hook called useEffect is used to fetch the data with axios from the API and to set the data in the local state of the component with the state hook's update function. The promise resolving happens with async/await.

However, when you run your application, you should stumble into a nasty loop. The effect hook runs when the component mounts but also when the component updates. Because we are setting the state after every data fetch, the component updates and the effect runs again. It fetches the data again and again. That's a bug and needs to be avoided. **We only want to fetch data when the component mounts.** That's why you can provide an empty array as second argument to the effect hook to avoid activating it on component updates but only for the mounting of the component.

{{< highlight javascript "hl_lines=13" >}}
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ hits: [] });

  useEffect(async () => {
    const result = await axios(
      'http://hn.algolia.com/api/v1/search?query=redux',
    );

    setData(result.data);
  }, []);

  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default App;
{{< /highlight >}}

The second argument can be used to define all the variables (allocated in this array) on which the hook depends. If one of the variables changes, the hook runs again. If the array with the variables is empty, the hook doesn't run when updating the component at all, because it doesn't have to watch any variables.

That's data fetching with React hooks in a nutshell. But continue reading if you are interested about error handling, loading indicators, how to trigger the data fetching from a form, and how to implment a reusable data fetching hook.

{{% chapter_header "How to trigger a hook programmatically/manually?" "react-hooks-programmatically" %}}

Great, we are fetching data once the component mounts. But what about using an input field to tell the API in which topic we are interested in? "Redux" is taken as default query. But what about topics about "React"? Let's implement an input element to enable someone to fetch other stories than "Redux" stories. Therefore, introduce a new state for the input element.

{{< highlight javascript "hl_lines=6 18 19 20 21 22" >}}
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');

  useEffect(async () => {
    const result = await axios(
      'http://hn.algolia.com/api/v1/search?query=redux',
    );

    setData(result.data);
  }, []);

  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default App;
{{< /highlight >}}

At the moment, both states are independent from each other, but now you want to couple them to only fetch articles that are specified by the query in the input field. With the following change, the component should fetch all articles by query term once it mounted.

{{< highlight javascript "hl_lines=9" >}}
...

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');

  useEffect(async () => {
    const result = await axios(
      `http://hn.algolia.com/api/v1/search?query=${query}`,
    );

    setData(result.data);
  }, []);

  return (
    ...
  );
}

export default App;
{{< /highlight >}}

One piece is missing: When you try to type something into the input field, there is no other data fetching after the mounting triggered from the effect. That's because you have provided the empty array as second argument to the effect. The effect depends on no variables, so it is only triggered when the component mounts. However, now the effect should depend on the query. Once the query changes, the data request should fire again.

{{< highlight javascript "hl_lines=13" >}}
...

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');

  useEffect(async () => {
    const result = await axios(
      `http://hn.algolia.com/api/v1/search?query=${query}`,
    );

    setData(result.data);
  }, [query]);

  return (
    ...
  );
}

export default App;
{{< /highlight >}}

The refetching of the data should work once you change the value in the input field. But that opens up another problem: On every character you type into the input field, the effect is triggered and executes another data fetching request. How about providing a button that triggers the request and therefore the hook manually?

{{< highlight javascript "hl_lines=4 24 25 26" >}}
function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [search, setSearch] = useState('');

  useEffect(
    async () => {
      const result = await axios(
        `http://hn.algolia.com/api/v1/search?query=${query}`,
      );

      setData(result.data);
    },
    [query],
  );

  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button type="button" onClick={() => setSearch(query)}>
        Search
      </button>

      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}
{{< /highlight >}}

Now, make the effect dependant on the search state rather than the fluctuant query state that changes with every key stroke in the input field. Once the user clicks the button, the new search state is set and should trigger the effect hook kinda manually.

{{< highlight javascript "hl_lines=6 11 16" >}}
...

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [search, setSearch] = useState('redux');

  useEffect(
    async () => {
      const result = await axios(
        `http://hn.algolia.com/api/v1/search?query=${search}`,
      );

      setData(result.data);
    },
    [search],
  );

  return (
    ...
  );
}

export default App;
{{< /highlight >}}

Also the initial state of the search state is set to the same state as the query state, because the component fetches data also on mount and therefore the result should mirror the value in the input field. However, having a similar query and search state is kinda confusing. Why not set the actual URL as state instead of the search state?

{{< highlight javascript "hl_lines=4 5 6 10 14 27" >}}
function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [url, setUrl] = useState(
    'http://hn.algolia.com/api/v1/search?query=redux',
  );

  useEffect(
    async () => {
      const result = await axios(url);

      setData(result.data);
    },
    [url],
  );

  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>

      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}
{{< /highlight >}}

That's if for the implicit programmatic data fetching with the effect hook. You can decide on which state the effect depends. Once you set this state on a click or in another side-effect, this effect will run again. In this case, if the URL state changes, the effect runs again to fetch stories from the API.

{{% chapter_header "Loading Indicator with React Hooks" "react-hooks-error-handling" %}}

Let's introduce a loading indicator to the data fetching. It's just another state that is manage by a state hook. The loading flag is used to render a loading indicator in the App component.

{{< highlight javascript "hl_lines=10 14 19 40 41 42 48" >}}
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [url, setUrl] = useState(
    'http://hn.algolia.com/api/v1/search?query=redux',
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    async () => {
      setIsLoading(true);

      const result = await axios(url);

      setData(result.data);
      setIsLoading(false);
    },
    [url],
  );

  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default App;
{{< /highlight >}}

Once the effect is called for data fetching, which happens when the component mounts or the URL state changes, the loading state is set to true. Once the request resolves, the loading state is set to false again.

{{% chapter_header "Error Handling with React Hooks" "react-hooks-error-handling" %}}

What about error handling for data fetching with a React hook? The error is just another state initialized with a state hook. Once there is an error state, the App component can render feedback for the user. When using async/await, it is common to use try/catch blocks for error handling. You can do it within the effect:

{{< highlight javascript "hl_lines=11 15 18 22 23 24 47" >}}
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [url, setUrl] = useState(
    'http://hn.algolia.com/api/v1/search?query=redux',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(
    async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    },
    [url],
  );

  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default App;
{{< /highlight >}}

The error state is reset every time the hook runs again. That's useful because after a failed request the user may want to try it again which should reset the error. In order to enforce an error yourself, you can alter the URL into something invalid. Then check whether the error message shows up.

{{% chapter_header "Fetching Data with Forms and React" "react-hooks-forms-data-fetching" %}}

What about a proper form to fetch data? So far, we have only a combination of input field and button. Once you introduce more input elements, you may want to wrap them with a form element. In addition, a form makes it possible to trigger the button with "Enter" on the keyboard too.

{{< highlight javascript "hl_lines=6 7 8 9 10 16 17" >}}
function App() {
  ...

  return (
    <Fragment>
      <form
        onSubmit={() =>
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      ...
    </Fragment>
  );
}
{{< /highlight >}}

But now the browser reloads when clicking the submit button, because that's the native behavior of the browser when submitting a form. In order to prevent the default behavior, we can invoke a function on the React event. That's how you do it in React class components too.

{{< highlight javascript "hl_lines=4 5 6 7 11" >}}
function App() {
  ...

  const doGet = event => {
    setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);
    event.preventDefault();
  };

  return (
    <Fragment>
      <form onSubmit={doGet}>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      ...
    </Fragment>
  );
}
{{< /highlight >}}

Now the browser shouldn't reload anymore when you click the submit button. It works as before, but this time with a form instead of the naive input field and button combination. You can press the "Enter" key on your keyboard too.

{{% chapter_header "Custom Data Fetching Hook" "react-hooks-custom-data-fetching" %}}

In order to extract a custom hook for data fetching, move everything that belongs to the data fetching, except for the query state that belongs to the input field, but including the loading indicator and error handling, to its own function. Also make sure you return all the necessary variables from the function that are used in the App component.

{{< highlight javascript "hl_lines=1 32 33" >}}
const useHackerNewsApi = () => {
  const [data, setData] = useState({ hits: [] });
  const [url, setUrl] = useState(
    'http://hn.algolia.com/api/v1/search?query=redux',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(
    async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    },
    [url],
  );

  const doGet = event => {
    setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);
    event.preventDefault();
  };

  return { data, isLoading, isError, doGet };
}
{{< /highlight >}}

Now, your new hook can be used in the App component again:

{{< highlight javascript "hl_lines=3" >}}
function App() {
  const [query, setQuery] = useState('redux');
  const { data, isLoading, isError, doGet } = useHackerNewsApi();

  return (
    <Fragment>
      ...
    </Fragment>
  );
}
{{< /highlight >}}

Next, pass the URL state from the outside the `doGet` function:

{{< highlight javascript "hl_lines=8 9 23 24 25 26 27 28" >}}
const useHackerNewsApi = () => {
  ...

  useEffect(
    ...
  );

  const doGet = (event, url) => {
    setUrl(url);
    event.preventDefault();
  };

  return { data, isLoading, isError, doGet };
};

function App() {
  const [query, setQuery] = useState('redux');
  const { data, isLoading, isError, doGet } = useHackerNewsApi();

  return (
    <Fragment>
      <form
        onSubmit={event =>
          doGet(
            event,
            `http://hn.algolia.com/api/v1/search?query=${query}`,
          )
        }
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      ...
    </Fragment>
  );
}
{{< /highlight >}}

The initial state can be made generic too. Pass it simply to the new custom hook:

{{< highlight javascript "hl_lines=4 5 6 39 40 41 42" >}}
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(
    async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    },
    [url],
  );

  const doGet = (event, url) => {
    setUrl(url);
    event.preventDefault();
  };

  return { data, isLoading, isError, doGet };
};

function App() {
  const [query, setQuery] = useState('redux');

  const { data, isLoading, isError, doGet } = useDataApi(
    'http://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] },
  );

  return (
    <Fragment>
      <form
        onSubmit={event =>
          doGet(
            event,
            `http://hn.algolia.com/api/v1/search?query=${query}`,
          )
        }
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default App;
{{< /highlight >}}

That's it for the data fetching with a custom hook. The hook itself doesn't know anything about the API. It receives all parameters from the outside and only manages necessary states such as the data, loading and error state. It executes the request and returns the data to the component using it as custom data fetching hook.

<hr class="section-divider">

You have learned how the React hooks for state and effects can be used in React for data fetching. If you are curious about data fetching in class components (and function components) with render props and higher-order components, checkout out my other article from the beginning. Otherwise, I hope this article was useful to you for learning about React Hooks and how to use them in a real world scenario.