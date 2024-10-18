---
title: "How to fetch data with React Hooks"
description: "Learn the fundamentals about data fetching in client-side React with React Hooks ..."
date: "2024-10-16T13:50:46+02:00"
categories: ["React", "React Hooks"]
keywords: ["react fetch data hooks"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

In the world of client-side React, React Query is the industry standard for data fetching. However, in this tutorial, you'll learn how to fetch data using React Hooks without any third-party libraries. This approach helps beginners grasp the fundamentals of state and effect management in React, and understand how to build custom hooks.

<ReadMore label="How to fetch data in React" link="/react-fetching-data/" />

We'll be using the [Hacker News API](https://hn.algolia.com/api) to fetch popular tech stories. By the end of this tutorial, you'll have created a reusable custom hook for data fetching that can be applied throughout your application.

Our custom hook will replicate some of React Query's functionality but with a focus on mastering the basics of React Hooks. Once you've built it, you can easily swap in React Query if you wish.

# Data Fetching with React Hooks

Let's start with our example of data fetching with React Hooks. We will mainly use React's built-in `useState` and `useEffect` hooks to manage the state of the data fetching process. React's useState Hook is used to manage the local state of the data that we are going to fetch while React's useEffect Hook is used to fetch the data from the API once the component mounts. But one step at a time.

<ReadMore label="React's useState Hook" link="/react-usestate-hook/" />

<ReadMore label="React's useEffect Hook" link="/react-useeffect-hook/" />

Let's start with the initial setup of a function component that renders a list:

```tsx
import { useState } from "react";

type Story = {
  objectID: string;
  title: string;
  url: string;
};

const App = () => {
  const [data, setData] = useState<Story[]>([]);

  return (
    <ul>
      {data.map((item) => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default App;
```

The App component renders an empty list of items. The state and state update function come from the state hook called `useState` that is responsible to manage the local state for the data that we are going to fetch for the App component. The initial state is an empty list that represents the data. No one is setting any state for this data yet.

<ReadMore label="Function Components in React" link="/react-function-component/" />

<ReadMore label="How to render lists in React" link="/react-list-component/" />

We are going to use [axios](https://github.com/axios/axios) to fetch data, but it is up to you to use another data fetching library or [the native fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) of the browser. If you haven't installed axios yet, you can do so by on the command line with `npm install axios`. Then implement your effect hook for the data fetching which runs when the component renders:

```tsx{1-2,4,11-15}
import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://hn.algolia.com/api/v1/search";

...

const App = () => {
  const [data, setData] = useState<Story[]>([]);

  useEffect(async () => {
    const result = await axios(`${API}?query=react`);

    setData(result.data.hits);
  });

  return (
    <ul>
      {data.map((item) => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default App;
```

You may get the following error saying: "Uncaught TypeError: destroy is not a function". That's because the effect hook doesn't return a cleanup function. The effect hook should return a cleanup function or nothing. Promises and `useEffect(async () => ...)` are not supported. You can call an async function inside an effect to fix this:

```tsx{1-2,6,8}
useEffect(() => {
  const fetchData = async () => {
    const result = await axios(`${API}?query=react`);

    setData(result.data.hits);
  };

  fetchData();
});
```

The effect hook called useEffect is used to fetch the data with axios from the API and to set the data in the local state of the component with the state hook's update function. The promise resolving happens with [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

However, when you run your application, you should stumble into a nasty loop. The effect hook runs when the component mounts but also when the component updates. Because we are setting the state after every data fetch, the component updates and the effect runs again. It fetches the data again and again. That's a bug and needs to be avoided. **We only want to fetch data when the component mounts.** That's why you can provide an empty array as second argument to the effect hook to avoid activating it on component updates but only for the mounting of the component:

```tsx{9}
useEffect(() => {
  const fetchData = async () => {
    const result = await axios(`${API}?query=react`);

    setData(result.data.hits);
  };

  fetchData();
}, []);
```

The second argument can be used to define all the variables (allocated in this array) on which the hook depends. If one of the variables changes, the hook runs again. If the array with the variables is empty, the hook doesn't run when updating the component at all, because it doesn't have to watch any variables.

<ReadMore label="How to run React's useEffect only Update" link="/react-useeffect-only-on-update/" />

<ReadMore label="How to run React's useEffect only Once" link="/react-useeffect-only-once/" />

That's data fetching with React hooks in a nutshell. But continue reading if you are interested in refetching data, error handling, loading indicators, how to trigger the data fetching from a form, and how to implement a reusable custom data fetching hook.

# How to refetch data with React Hooks

Great, we are fetching data once the component mounts. But what about using an input field to tell the API in which topic we are interested in? "React" is taken as default query. But what about topics related to "Next"?

<ReadMore label="The Road to Next" link="https://www.road-to-next.com/" />

Let's implement an input element to enable someone to fetch other stories than "React" stories. Therefore, introduce a new state and an [event handler](/react-event-handler/) for a new input field:

```tsx{3,15-17,20-21,30}
const App = () => {
  const [data, setData] = useState<Story[]>([]);
  const [search, setSearch] = useState("react");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${API}?query=react`);

      setData(result.data.hits);
    };

    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <input type="text" value={search} onChange={handleSearchChange} />

      <ul>
        {data.map((item) => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
};
```

At the moment, both the `search` state is not used to fetch the `data` state. We only implemented a controlled input field that sets the `search` state and renders the value of the `search` state (in a controlled manner) in the input field again.

<ReadMore label="Controlled Components in React" link="/react-controlled-components/" />

But we want to fetch data based on the `search` state. With the following change, the component should fetch all stories by search term once it mounted:

```tsx{3}
useEffect(() => {
  const fetchData = async () => {
    const result = await axios(`${API}?query=${search}`);

    setData(result.data.hits);
  };

  fetchData();
}, []);
```

One piece is missing: When you type something into the input field, there is no other data fetching after the mounting triggered from the effect. That's because you have provided the empty array as second argument to React's useEffect.

You mal also see the following warning with ESLint, because the effect runs on a stale closure: *"React Hook useEffect has a missing dependency: 'search'. Either include it or remove the dependency array"*.

The effect "depends" on no outside variables (even though this is not true), so it is only triggered once when the component mounts. However, now the effect should depend on the search, because once the search term changes, the data should be refetched:

```tsx{9}
useEffect(() => {
  const fetchData = async () => {
    const result = await axios(`${API}?query=${search}`);

    setData(result.data.hits);
  };

  fetchData();
}, [search]);
```

The refetching of the data should work once you change the value in the input field. But that opens up another problem: On every character you type into the input field, the effect is triggered and executes another data fetching request.

There are two solutions for this problem: Debouncing the input field or providing a button to trigger the data fetching manually. We will implement the latter here:

```tsx{3-4,8,14,20-23,28-30}
const App = () => {
  const [data, setData] = useState<Story[]>([]);
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("react");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${API}?query=${activeSearch}`);

      setData(result.data.hits);
    };

    fetchData();
  }, [activeSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    setActiveSearch(search);
    setSearch("");
  };

  return (
    <>
      <input type="text" value={search} onChange={handleSearchChange} />
      <button type="button" onClick={handleSearchSubmit}>
        Search
      </button>

      <ul>...</ul>
    </>
  );
};
```

We made the effect dependant on the active search state rather than the fluctuant search state that changes with every key stroke in the input field. Once the user clicks the button, the new active search state is set and should re-trigger the effect hook while resetting the search state for the controlled input field to an empty string.

<ReadMore label="React Batching" link="/react-batching/" />

That's if for the implicit programmatic data fetching with the effect hook. You can decide on which state the effect depends. Once you set this state on a click or in another side-effect, this effect will run again. In this case, if the active search state changes, the effect runs again to fetch stories from the API.

# Fetching Data with Forms and React

What about a form to fetch data? At the moment, we have only a combination of input field and button to fetch the data. Once you introduce more form elements though, you may want to wrap them with a native HTML form element:

```tsx{4,8,13,15-16}
const App = () => {
  ...

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setActiveSearch(search);
    setSearch("");

    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" value={search} onChange={handleSearchChange} />
        <button type="submit">Search</button>
      </form>

      <ul>...</ul>
    </>
  );
};
```

<ReadMore label="What is preventDefault() in React" link="/react-preventdefault/" />

Now the data fetching works as before, but this time with a form instead of the naive input field and button combination. You can press the "Enter" key on your keyboard too.

# Loading Indicator with React Hooks

Let's introduce a loading indicator to the data fetching. It's just another state that is managed by a state hook. The loading flag is used to render a loading indicator in the App component.

```tsx{3,10,15}
const App = () => {
  const [data, setData] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("react");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await axios(`${API}?query=${activeSearch}`);

      setData(result.data.hits);
      setIsLoading(false);
    };

    fetchData();
  }, [activeSearch]);

  ...
};
```

Once the effect is called for data fetching, which happens when the component mounts or the active search state changes, the loading state is set to true. Once the request resolves, the loading state is set to false again.

```tsx{2-4,10}
<ul>
  {isLoading ? (
    <div>Loading ...</div>
  ) : (
    data.map((item) => (
      <li key={item.objectID}>
        <a href={item.url}>{item.title}</a>
      </li>
    ))
  )}
</ul>
```

With a conditional rendering we can now show either a loading indicator or the list of stories. The loading indicator is therefore only shown when the loading state is true.

<ReadMore label="Conditional Rendering in React" link="/conditional-rendering-react/" />

# Error Handling with React Hooks

What about error handling for data fetching with a React hook? The error is just another state. Once there is an error state, the App component can render feedback for the user. When using async/await, it is common to use try/catch blocks for error handling:

```tsx{4,11,14,18-20}
const App = () => {
  const [data, setData] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("react");

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(`${API}?query=${activeSearch}`);

        setData(result.data.hits);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [activeSearch]);

  ...
};
```

The error state is reset every time the hook runs again. That's useful because after a failed request the user may want to try it again which should reset the error.

```tsx{11}
const App = () => {
  ...

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" value={search} onChange={handleSearchChange} />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      <ul>...</ul>
    </>
  );
};
```

In order to enforce an error yourself, you can alter the URL into something invalid. Then check whether the error message shows up.

At this stage, you may want to look into replacing React's useState Hook with React's useReducer Hook, which would allow you to group all related states (i.e. data, loading, error) into one actionable state object with defined transitions.

<ReadMore label="React's useReducer Hook" link="/react-usereducer-hook/" />

<ReadMore label="useState vs useReducer" link="/react-usereducer-vs-usestate/" />

# Data Fetching with Custom Hook

In order to extract a custom hook for data fetching, move everything that belongs to the data fetching to its own function, also called custom hook. Also make sure you return all the necessary variables from the function that are used in the App component.

```tsx{1,25-26}
const useQuery = (activeSearch: string) => {
  const [data, setData] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(`${API}?query=${activeSearch}`);

        setData(result.data.hits);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [activeSearch]);

  return { data, isLoading, isError };
};
```

Now, your custom React hook can be used in the App component again:

```tsx{5}
const App = () => {
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("react");

  const { data, isLoading, isError } = useQuery(activeSearch);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setActiveSearch(search);
    setSearch("");

    event.preventDefault();
  };

  return ( ... );
};
```

But we want to make the hook more generic, because it depends on too many domain specific things (i.e. the API URL, the data structure of the result, the `Story` type).

<ReadMore label="TypeScript Generics" link="/typescript-generics/" />

Let's make the custom hook more generic, in a way that it can be used for any data fetching similar to React Query where we can pass a query key and a query function to the hook:

```tsx{1-5,7-8,18,20,29}
type UseQueryArgs<T> = {
  queryKey: string[];
  queryFn: () => Promise<T>;
  initialData: T;
};

const useQuery = <T>({ queryFn, queryKey, initialData }: UseQueryArgs<T>) => {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await queryFn();

        setData(result);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [...queryKey]);

  return { data, isLoading, isError };
};
```

Now we can adjust the usage of the custom hook in the App component:

```tsx{5-13}
const App = () => {
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("react");

  const { data, isLoading, isError } = useQuery<Story[]>({
    queryKey: [activeSearch],
    queryFn: async () => {
      const result = await axios(`${API}?query=${activeSearch}`);

      return result.data.hits;
    },
    initialData: [],
  });

  ...
};
```

That's it for the data fetching with a custom hook. The hook itself doesn't know anything about the API. It receives all parameters from the outside and only manages necessary states such as the data, loading and error state. It executes the request and returns the data to the component using it as custom data fetching hook.

<ReadMore label="How to create a custom hook in React" link="/react-custom-hook/" />

# Abort Data Fetching with React Hooks

It's a common problem in React that component state is set even though the component got already unmounted (e.g. due to navigating away with React Router). Let's see how we can prevent to set state in our custom hook for the data fetching:

```tsx{5,14,16,24-26}
const useQuery = <T>(...) => {
  ...

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await queryFn();

        if (!didCancel) setData(result);
      } catch (error) {
        if (!didCancel) setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [...queryKey]);

  return { data, isLoading, isError };
};
```

Every Effect Hook comes with a clean up function which runs when a component unmounts. The clean up function is the one function returned from the hook. In our case, we use a boolean flag called `didCancel` to let our data fetching logic know about the state (mounted/unmounted) of the component. If the component did unmount, the flag should be set to `true` which results in preventing to set the component state after the data fetching has been asynchronously resolved eventually.

*Note: Actually not the data fetching is aborted -- which could be achieved with [Axios Cancellation](https://github.com/axios/axios#cancellation) -- but the state transition is not performed anymore for the unmounted component. Since Axios Cancellation has not the best API in my eyes, this boolean flag to prevent setting state does the job as well.*

# React Query

Enter [React Query](https://tanstack.com/query) which is the most popular library for data fetching in React and is used by many developers and companies. In essence, React Query is a data fetching and state management library for React that provides a set of hooks for fetching, caching, and updating asynchronous data in your application.

Let's replace our current custom hook with React Query. First, install React Query with `npm install @tanstack/react-query`. After setting up the `QueryClientProvider` with a `QueryClient` instance, replace the custom hook with the `useQuery` hook from React Query:

```tsx{1-2}
// import { useQuery } from "./use-query";
import { useQuery } from "@tanstack/react-query";
```

Et voilà, you have replaced your custom hook with React Query. The `useQuery` hook from React Query is used in the same way as our custom hook, but it comes with many more features such as caching, polling, race condition prevention, and more.

<Divider />

You can find the repository for this tutorial over [here](https://github.com/rwieruch/react-hooks-fetch-data). In this tutorial, you have learned how to use React hooks for managing state and effects to perform data fetching in React. Additionally, you've gained knowledge on building a custom hook for data fetching which you lastly replaced with React Query.
