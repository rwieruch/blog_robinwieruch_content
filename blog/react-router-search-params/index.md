---
title: "React Router 7: Search Params (alias Query Params)"
description: "How to: Search Params in React Router 7. A example on Search Params (also called Query Params) with React Router ..."
date: "2025-01-06T07:52:54+02:00"
categories: ["React", "React Router 7"]
keywords: ["react router search params", "react router query params", "react router params", "react router 7"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A React Router tutorial which teaches you how to use **Search Params with React Router 7**. The code for this React Router v7 tutorial can be found over [here](https://github.com/rwieruch/examples/tree/main/react-router-search-params).

<ReadMore label="React Router 7 Introduction" link="/react-router/" />

Search Params (also called **Query Params**) are a powerful feature, because they enable you to capture state in a URL. By having state in a URL, you can share it with other people. For example, if an application shows a catalog of products, a developer will enable a user to search it. In React this would translate into a list of items (here: products) and a HTML input field for filtering them.

Now there is a high chance that React developers will manage this search state with React's useState Hook. Which is fine for this one user, but bad for collaborating with other users.

Therefore a best practice would be managing this search state in a URL, because this way the search state becomes shareable with other users. If one user searches a list of items by title (e.g. "Rust"), the search param gets appended to the URL (e.g. `/bookshelf?title=Rust`) as a key value pair, and therefore can be shared with another user. Then the other user who gets the link will see the same filtered list of items on their page.

![](./images/react-router-search-params.png)

# React Router: From State to URL

To get things started, we will implement the previous image where we have a list of items and search it via a HTML input field. We will not be using React's useState Hook to capture the search state, but a shareable URL by using React Router. The App component will be the following -- which is similar to the App component from the previously mentioned React Router tutorial:

```tsx
const App = () => {
  return (
    <>
      <h1>React Router</h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/bookshelf">Bookshelf</Link>
      </nav>

      <Routes>
        <Route index element={<Home />} />
        <Route path="bookshelf" element={<Bookshelf />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};
```

While the Home and NoMatch components are just placeholder components with any implementation, we will focus on the Bookshelf component  which shows books as a [list component](/react-list-component/). These books are just sample data here, but they could be fetched from a [remote API](/node-express-server-rest-api/) (or [mock API](/react-mock-data/)) too:

```tsx
type Book = {
  title: string;
  isCompleted: boolean;
};

const Bookshelf = () => {
  const books = [
    {
      title: 'The Road to Next',
      isCompleted: false,
    },
    {
      title: 'The Road to React',
      isCompleted: true,
    },
  ];

  return (
    <>
      <h2>Bookshelf</h2>

      <ul>
        {books.map((book) => (
          <li key={book.title}>{book.title}</li>
        ))}
      </ul>
    </>
  );
};
```

A straightforward implementation of enabling a user to filter this list by a case insensitive title matching would be using [React's useState Hook](/react-usestate-hook/) and an HTML input field. Finally an [event handler](/react-event-handler/) would read the value from the input field and write it as state:

```tsx{1-2,7,9-11,17,20}
const byTitle = (title: string) => (book: Book) =>
  book.title.toLowerCase().includes((title || '').toLowerCase());

const Bookshelf = () => {
  const books = [...];

  const [title, setTitle] = useState("");

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <h2>Bookshelf</h2>

      <input type="text" value={title} onChange={handleTitle} />

      <ul>
        {books.filter(byTitle(title)).map((book) => (
          <li key={book.title}>{book.title}</li>
        ))}
      </ul>
    </>
  );
};
```

That's the "using state in React" version. Next we want to use React Router to capture this state in a URL instead. Fortunately, React Router offers us the **useSearchParams** hook which can be used almost as replacement for React's useState Hook:

```tsx{5,13,16,25,30}
import {
  Routes,
  Route,
  Link,
  useSearchParams,
} from 'react-router';

...

const Bookshelf = () => {
  const books = [...];

  const [search, setSearch] = useSearchParams();

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ title: event.target.value });
  };

  return (
    <>
      <h2>Bookshelf</h2>

      <input
        type="text"
        value={search.get("title") as string}
        onChange={handleTitle}
      />

      <ul>
        {books.filter(byTitle(search.get("title") as string)).map((book) => (
          <li key={book.title}>{book.title}</li>
        ))}
      </ul>
    </>
  );
};
```

Because of two things, it cannot be used a direct replacement for React's useState Hook. First, it operates on an object instead of a string, because a URL can have more than one search param (e.g. `/bookshelf?title=Rust&rating=4`) and therefore every search param becomes a property in this object (e.g. `{ title: 'Rust', rating: 4 }`).

Essentially it would have been similar to our previous implementation if we would have been using React's useState Hook with an object instead of a string:

```tsx
const [search, setSearch] = useState({ title: '' });
```

However, even though the stateful value returned by `useSearchParams` is of type object (`typeof search === 'object'`), it is still not accessible like a mere JavaScript object data structure because it is an instance of [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams). Hence we need to call its getter method (e.g. `search.get('title')`) instead.

And second, React Router's useSearchParams Hook does not accept an initial state, because the initial state comes from the URL. So when a user shares the URL with the search param (e.g. `/bookshelf?title=Rust`), another user would get `{ title: 'Rust' }` as initial state from React Router's Hook. The same happens when the application navigates a user to a route with search params with its optional search params set.

That's it for using a URL for state instead of using one of [React's state management Hooks](/react-state/). It improves the user experience tremendously, because a URL becomes more specific to what the user sees on a page. Hence this specific URL can be shared with other users who will see the page with the same UI then.

# URLSearchParams as Object

If you do not want to use URLSearchParams when dealing with React Router's useSearchParams Hook, you can write a custom hook which returns a  JavaScript object instead of an instance of URLSearchParams:

```tsx{1-8,13,25,30}
const useCustomSearchParams = () => {
  const [search, setSearch] = useSearchParams();
  const searchAsObject = Object.fromEntries(
    new URLSearchParams(search)
  );

  return [searchAsObject, setSearch] as const;
};

const Bookshelf = () => {
  const books = [...];

  const [search, setSearch] = useCustomSearchParams();

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ title: event.target.value });
  };

  return (
    <>
      <h2>Bookshelf</h2>

      <input
        type="text"
        value={search.title}
        onChange={handleTitle}
      />

      <ul>
        {books.filter(byTitle(search.title)).map((book) => (
          <li key={book.title}>{book.title}</li>
        ))}
      </ul>
    </>
  );
};
```

However, this custom hook should be taken with a grain of salt, because it does not work for repeated keys (e.g. array search params with `?editions=1&editions=3`) and other edge cases when working with sophisticated URLs.

In general, only using React Router's useSearchParams Hook (or this custom useCustomSearchParams hook) does not give you the whole experience for state management in URLs, because it is only usable for string primitives and no other data types. We will explore this and how to solve this problem in the next sections.

# Search Params and preserving Data Types

Not all state consist of only strings. In the previous example of using search params with React Router, we have used a string (here: `title`) that gets encoded in the URL. When decoding this string from the URL, we will get by default a string -- which works in our case because we expected a string. But what about other primitive data types like number or boolean? Not to speak of complex data types such as arrays.

<ReadMore label="React Checkbox Component" link="/react-checkbox/" />

To explore this caveat, we will continue our example from the previous section by implementing a checkbox. We will use this checkbox component and wire it up to React Router's search params:

```tsx{1-4,6-8,19-21,33-37,40}
type Search = {
  title: string;
  isCompleted: boolean;
};

const bySearch = (search: Search) => (book: Book) =>
  book.title.toLowerCase().includes((search.title || "").toLowerCase()) &&
  book.isCompleted === search.isCompleted;

const Bookshelf = () => {
  const books = [...];

  const [search, setSearch] = useCustomSearchParams();

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ title: event.target.value });
  };

  const handleIsCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ isCompleted: event.target.checked });
  };

  return (
    <>
      <h2>Bookshelf</h2>

      <input
        type="text"
        value={search.title}
        onChange={handleTitle}
      />

      <input
        type="checkbox"
        checked={search.isCompleted}
        onChange={handleIsCompleted}
      />

      <ul>
        {books.filter(bySearch(search)).map((book) => (
          <li key={book.title}>{book.title}</li>
        ))}
      </ul>
    </>
  );
};
```

Try it in your browser. You will see that the searching for the `isCompleted` boolean does not work, because `isCompleted` coming from our `search` object gets represented as a string as either `'true'` or `'false'`. We could circumvent this by enhancing our custom hook:

```tsx{1,5-11,13,16-18,24}
const useCustomSearchParams = (param = {}) => {
  const [search, setSearch] = useSearchParams();
  const searchAsObject = Object.fromEntries(new URLSearchParams(search));

  const transformedSearch = Object.keys(param).reduce(
    (acc, key) => ({
      ...acc,
      [key]: param[key](acc[key]),
    }),
    searchAsObject
  );

  return [transformedSearch, setSearch] as const;
};

const PARAMS = {
  BooleanParam: (string = '') => string === 'true',
};

const Bookshelf = () => {
  const books = [...];

  const [search, setSearch] = useCustomSearchParams({
    isCompleted: PARAMS.BooleanParam,
  });

  ...

  return (...);
};
```

Essential the new version of the custom hook takes an object with optional transformation functions. It iterates through each transformation function and if it finds a match between transformation function and search param it applies the function onto the search param. In this case, we transform a string boolean (either `'true'` or `'false'`) to an actual boolean. If no match is found, it just returns the original search param. Hence we do not need a transformation function for the `title`, because it's a string and can stay as string.

By having the implementation details for the custom hook in place, we could also create other transformer functions (e.g. `NumberParam`) and therefore fill the gaps for the missing data type conversions (e.g. `number`):

```tsx
const PARAMS = {
  BooleanParam: (string = '') => string === 'true',
  NumberParam: (string = '') => (string ? Number(string) : null),
  // other transformation functions to map all data types
};
```

Anyway, when I started to implement this myself I figured there must be already a library for this problem. And yes, there is ...

# React Router: Use Search Params

The [nuqs](https://nuqs.47ng.com/) library fits perfectly the use case of working with sophisticated URLs as state that go beyond mere strings. In this section, we will explore the nuqs library and therefore get rid of our custom useSearchParams hook.

```sh
npm install nuqs
```

Follow the library's installation instructions yourself. You will need to install the library on the command line and instantiate it on a root level in your React project:

```tsx{3,7,11}
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <NuqsAdapter>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </NuqsAdapter>
);
```

Now you are good to go to use nuqs for powerful URL state management in React. All you have to do is using the new `useQueryStates` hook instead of our custom hook from before to get the query params. Also notice that compared to our custom hook, you need to "transform" a string search param too:

```tsx{1,8-11}
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

...

const Bookshelf = () => {
  const books = [...];

  const [search, setSearch] = useQueryStates({
    title: parseAsString
    isCompleted: parseAsBoolean
  });

  ...

  return (...);
};
```

You can also provide sensible defaults. For example, at this time when navigating to `/bookshelf` without search params, `title` and `isComplete` would be undefined. However, if you expect them to be at least an empty string for `title` and `false` for `isCompleted`, you can provide these defaults if you want to:

```tsx{2-3}
const [search, setSearch] = useQueryStates({
  title: parseAsString.withDefault(""),
  isCompleted: parseAsBoolean.withDefault(false),
});
```

That's it. Besides the two data type conversions that we used here, there are also conversions for numbers, arrays, objects and others.

<Divider />

Using URLs as state is a powerful combination for an improved user experience. React Router's search params give you a great start when dealing with single or multiple string states. However, once you want to preserve the data types that you mapped onto the URL, you may want to use a library such as nuqs on top for sophisticated URL state management in React.
