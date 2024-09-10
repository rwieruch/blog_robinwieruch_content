---
title: "Search Params in Next.js for URL State"
description: "How to use Search Params in Next with useSearchParams und SearchParams from React Server Components and Client Components for URL state ..."
date: "2024-09-10T08:50:46+02:00"
categories: ["Next"]
keywords: ["next search params", "next searchparams", "next usesearchparams", "next url state"]
hashtags: ["#NextJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

State in web applications can have many forms. It can be local component state, global application state, browser state or shareable **URL state**. The latter is a special form of state that is stored in the URL which then can be shared with others or saved for later use. Once this URL is visited again, the application's state is restored from the URL. In this tutorial, we will explore how to use **Search Params in Next.js** to manage URL state.

We will start off with a example of a Next.js application that displays a [list](/react-list-component/) of posts. Later we will search and sort all posts on this page by using URL state. But one after the other. Let's start with a `Page` component on a page level of a Next application:

```tsx
import { Posts } from "@/features/post/components/posts";

const Page = () => {
  return (
    <div>
      <h1>Search Params in Next.js</h1>

      <Posts />
    </div>
  );
};

export default Page;
```

As you can see from the import, we are using a feature folders structure in our Next.js application. This means that all components related to "posts" are stored in a `post` folder in a `features` folder which allows us to group all related components, queries, actions, and types together in one place.

<!-- <ReadMore label="Feature Folders in React" link="/react-feature-folder/" /> -->

The Posts component will be a React Server Component because it performs server-side data fetching with a `getPosts` function from a pseudo database. However, it could be a Client Component with client-side data fetching too.

```tsx
import { getPosts } from "../queries/get-posts";

const Posts = async () => {
  const posts = await getPosts();

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <span>
              {post.title} ({post.createdAt.toLocaleDateString()})
            </span>
            {" - "}
            <span>{post.upvotes} upvotes</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Posts };
```

The implementation of the `getPosts` function returns a hard coded list of posts after an artificial delay. The latter should only mimic a performance hit of a database call.

```ts
import { POSTS } from "../db";

export const getPosts = async () => {
  // artificial delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return POSTS;
};
```

For the sake of completeness, the `POSTS` are just sample data for our application. They are stored in a separate file and exported as a constant. In a real application, you would fetch the posts from a database or a remote/third-party API.

```ts
import { Post } from "./types";

export const POSTS: Post[] = [
  {
    id: "1",
    title: "Post 1",
    createdAt: new Date("2021-02-01"),
    upvotes: 3,
  },
  {
    id: "2",
    title: "Post 2",
    createdAt: new Date("2021-01-01"),
    upvotes: 1,
  },
  {
    id: "3",
    title: "Post 3",
    createdAt: new Date("2021-03-01"),
    upvotes: 2,
  },
];
```

And not to forget, the `Post` type in a separate file in our feature folder which is used for the hard coded `POSTS` array. Later we should be able to search the posts by their title and sort them by their creation date or upvotes, hence all the properties in the type:

```ts
export type Post = {
  id: string;
  title: string;
  createdAt: Date;
  upvotes: number;
};
```

If you want to go further at this point, you could replace the hard coded data with a real database and ORM like [SQLite and Prisma](/next-prisma-sqlite/). On top of that, you could implement CRUD operations for posts in your application with [Server Actions](/next-server-actions/) which would allow you to create, read, update, and delete posts before searching and sorting them.

Now that we display a list of posts in our application, we want to search and sort them. So let's dive into updating the URL state with search and sort parameters by using native hooks provided by Next.js and later by using a dedicated library for it.

# URL State

The first step is to add a search input field to the `Posts` component. This input field will allow users to search for posts by their title. Since the search input field is a client-side feature where JavaScript is required, we will use an extra Client Component called `PostsSearch` for this purpose which allows us to keep `Posts` as a Server Component to still fetch the posts on the server-side.

```tsx{2,9}
import { getPosts } from "../queries/get-posts";
import { PostsSearch } from "./posts-search";

const Posts = async () => {
  const posts = await getPosts();

  return (
    <div>
      <PostsSearch placeholder="Search posts" />

      <ul>...</ul>
    </div>
  );
};
```

All client-side interactions mostly require JavaScript (i.e. adding an event listener to a HTML element, using hooks) and are therefore implemented in a Client Component. The `PostsSearch` component allows the user to interact with the search input field which will update the URL state of the application.

```tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PostsSearchProps = {
  placeholder: string;
};

const PostsSearch = ({ placeholder }: PostsSearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return <input placeholder={placeholder} onChange={handleSearch} />;
};

export { PostsSearch };
```

In the event handler you can see all the essential steps to update the URL state. While the `useSearchParams` hook gets us the current search parameters (read: everything as key-value pairs after the `?`) from the URL (if there are any), the `usePathname` hook retrieves the current pathname (read: everything before the potential `?` if there are search parameters).

Now if the user types something into the search input field (i.e. `value` is defined), the `search` parameter is set to the new value. The other way around (i.e. `else` block): if the user clears the search input field, the search parameter is removed from the URL. In the final step the `replace` function updates the URL state of the application with the new search parameter. As a little bonus, the `scroll: false` option prevents the page from scrolling to the top after the URL state has been updated.

# Search Params

We have learned how to *write* the search parameter to the URL state of the application. Now we need to *read* the search parameter from the URL state to search (read: filter) the posts accordingly. This will be done in the `getPosts` function which is responsible for fetching the posts from the pseudo database. But I am getting ahead of myself.

Before we can enhance the `getPosts` function, we have to get the so called **Search Params** somewhere in one of our components to pass them to the `getPosts` function. Since we were able to update the `search` Search Param of the URL state with the `PostsSearch` component in the previous section, we can define the assumed typed `SearchParams` object in a separate file:

```ts
export type SearchParams = {
  search: string;
};
```

Fortunately in Next.js, the `searchParams` are available in the [props](/react-pass-props-to-component/) of each page level component (i.e. the bundler's entry point components) in a Next.js application:

```tsx{2,4-6,8,13}
import { Posts } from "@/features/post/components/posts";
import { SearchParams } from "@/features/post/search-params";

export type PageProps = {
  searchParams: SearchParams;
};

const Page = ({ searchParams }: PageProps) => {
  return (
    <div>
      <h1>Search Params in Next.js</h1>

      <Posts searchParams={searchParams} />
    </div>
  );
};
```

If your consumer of the `searchParams` (here: `getPosts`) is not close to a page level component, you could also use Next.js' `useSearchParams` hook as an alternative in a Client Component.

But in our case, since we want to keep the `Posts` component as a Server Component and the `getPosts` function is close to our `Page` component, we will just pass the search params from the page level component to the `Posts` component.

```tsx{2,5-7,9-10}
import { getPosts } from "../queries/get-posts";
import { SearchParams } from "../search-params";
import { PostsSearch } from "./posts-search";

type PostsProps = {
  searchParams: SearchParams;
};

const Posts = async ({ searchParams }: PostsProps) => {
  const posts = await getPosts(searchParams);

  return ( ... );
};
```

The `Posts` component now receives the `searchParams` as props and passes them to the `getPosts` function. After all, the `getPosts` function is responsible for searching (read: filtering) the posts based on the search parameter. Therefore let's modify the `getPosts` function:

```ts{2,4,8-10,12}
import { POSTS } from "../db";
import { SearchParams } from "../search-params";

export const getPosts = async (searchParams: SearchParams) => {
  // artificial delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const filteredPosts = POSTS.filter((post) =>
    post.title.toLowerCase().includes(searchParams.search.toLowerCase())
  );

  return filteredPosts;
};
```

Usually this enhancement would be done in the query function of a ORM when reading from a real database. For example, with Prisma you would add (or extend) a `where` clause to the `findMany` function to filter the posts based on the search parameter. But since we are using a pseudo database in this tutorial, we have to filter the posts manually with JavaScript.

You may notice that the value of `search` in the search params is not guaranteed to be a string. It could be `undefined` too. To account for this, you would have to change the `SearchParams` type to allow for an `undefined` value for `search` as well:

```ts{2}
export type SearchParams = {
  search: string | undefined;
};
```

As consequence of this type change, you would have to adjust the `getPosts` function to handle the case where `search` is `undefined` by just returning all posts:

```ts{1,5-7}
export const getPosts = async (searchParams: SearchParams) => {
  // artificial delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!searchParams.search) {
    return POSTS;
  }

  const filteredPosts = POSTS.filter((post) =>
    post.title.toLowerCase().includes(searchParams.search.toLowerCase())
  );

  return filteredPosts;
};
```

The typing of the `search` parameter in the `SearchParams` object is not complete yet. It should also allow for an array of strings. This is useful when you want to search for multiple terms at once (i.e. dropdown with multiple options to choose from). So to follow the exact typing of the URLSearchParams object in JavaScript, you could change the `SearchParams` type to the following representation:

```ts{2}
export type SearchParams = {
  search: string | string[] | undefined;
};
```

As a quick fix for the `getPosts` function, because we do not want to add an elaborate array filter for the sake of simplicity here, you could add a type assertion to the `search` parameter to tell TypeScript that it *will* be a string:

```ts{7}
export const getPosts = async (searchParams: SearchParams) => {
  ...

  const filteredPosts = POSTS.filter((post) =>
    post.title
      .toLowerCase()
      .includes((searchParams.search as string).toLowerCase())
  );

  return filteredPosts;
};
```

That's it for the basic search functionality in this Next.js application. Now we can search for posts by their title in the search input field and the posts will be filtered accordingly. But you may also have witnessed the rather bad developer experience (DX) here. On the one hand, the typings seem not to be perfect (e.g. what happens in a key-value pair in the URL state is not a string but a number). On the other hand, the implementation of the `PostsSearch` component is not very elegant and could be improved.

# Typed Search Params

To improve the developer experience (DX), we can use a library called [nuqs](https://nuqs.47ng.com/). We will use it to parse the search parameters from the URL state and to provide a typed representation of the search parameters. This will make the search parameters more robust and easier to work with. At a later stage, we will use the same library to improve the DX of the `PostsSearch` component. But first things first. Let's install the library:

```sh
npm install nuqs
```

Now we can replace the manual type definition of the `SearchParams` object with a typed version by using the `createSearchParamsCache` function from the `nuqs` library. This function takes an object with keys and parsers as input and returns an object with a `parse` function that can be used to parse the untyped search parameters from the URL state into a typed representation:

```ts{1,3-5,7-9,11}
import { createSearchParamsCache, parseAsString } from "nuqs/server";

// export type SearchParams = {
//   search: string | string[] | undefined;
// };

export const searchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(""),
});

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>;
```

In our case, we want to handle `search` as a string datatype. But you could also use other parsers from the `nuqs` library like `parseAsNumber`, `parseAsBoolean`, `parseAsArray`, or `parseAsObject` to handle other cases. The additional chained `withDefault` function allows you to set a default value for the search parameter if it is not present in the URL state. We will later see how this can be useful for the sort feature where you always want to have a default sort key and value in the URL state.

Now you can see the whole transformation of untyped to typed search parameters in the `Page` component. While we don't use the manually typed `SearchParams` object anymore, because `nuqs` is providing it for us, we use the `parse` function on the `searchParamsCache` object to transform the Search Params to a typed version of it:

```tsx{2-4,15}
import { Posts } from "@/features/post/components/posts";
import { searchParamsCache } from "@/features/post/search-params";
// import { SearchParams } from "@/features/post/search-params";
import { SearchParams } from "nuqs/server";

export type PageProps = {
  searchParams: SearchParams;
};

const Page = ({ searchParams }: PageProps) => {
  return (
    <div>
      <h1>Search Params in Next.js</h1>

      <Posts searchParams={searchParamsCache.parse(searchParams)} />
    </div>
  );
};
```

While the `Page` component used the untyped (read: unparsed) search parameters, the `Posts` component uses the typed (read: parsed) search parameters from the URL state:

```tsx{2-3,7}
import { getPosts } from "../queries/get-posts";
import { ParsedSearchParams } from "../search-params";
// import { SearchParams } from "../search-params";
import { PostsSearch } from "./posts-search";

type PostsProps = {
  searchParams: ParsedSearchParams;
};

const Posts = async ({ searchParams }: PostsProps) => {
  const posts = await getPosts(searchParams);

  return ( ... );
};
```

Since the `searchParams` with its `search` parameter are now fully typed, you can remove all the burdens from uncertain typings in the `getPosts` function:

```ts{2-3,5,9-11,15-17}
import { POSTS } from "../db";
import { ParsedSearchParams } from "../search-params";
// import { SearchParams } from "../search-params";

export const getPosts = async (searchParams: ParsedSearchParams) => {
  // artificial delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // if (!searchParams.search) {
  //   return POSTS;
  // }

  const filteredPosts = POSTS.filter(
    (post) =>
      post.title.toLowerCase()
        .includes(searchParams.search.toLowerCase())
        // .includes((searchParams.search as string).toLowerCase())
  );

  return filteredPosts;
};
```

Instead of handling uncertain typings (such as `string[]` and `undefined`) in the `getPosts` function, you can now rely on the search parameter being a string. This is made possible by the `nuqs` library, which parses the search parameters from the URL state and provides a typed representation, significantly improving the DX.

# useQueryState

Next we are going to improve the DX in the `PostsSearch` component, because there we had to jump through several hoops (and hooks) to update the URL state. In order to prepare for this improvement, we have to touch once more the file where the `searchParamsCache` object is defined. There we will add additional options to the `parseAsString` parser:

```ts{3-6,9}
import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const searchParser = parseAsString.withDefault("").withOptions({
  shallow: false,
  clearOnDefault: true,
});

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
});

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>;
```

While `shallow` is set to `false` to trigger re-renders of React Server Components in Next (otherwise we would not get the re-fetched and therefore re-filtered list of posts), `clearOnDefault` is set to `true` to remove the search parameter from the URL state if it is the default value. This is useful when the user clears the search input field and the search parameter should not be represented with an empty `?search=` in the URL state.

Now comes the real improvement beyond typed search parameters. We will use the `useQueryState` hook from the `nuqs` library to update the URL state in a more elegant way. See yourself how much code disappears by using this hook:

```tsx{3-4,11,14}
"use client";

import { useQueryState } from "nuqs";
import { searchParser } from "../search-params";

type PostsSearchProps = {
  placeholder: string;
};

const PostsSearch = ({ placeholder }: PostsSearchProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return <input placeholder={placeholder} onChange={handleSearch} />;
};

export { PostsSearch };
```

The `useQueryState` hook has a similar API to the `useState` hook from React. It returns a tuple with the current value of the search parameter and a function to update the search parameter. The first argument of the `useQueryState` hook is the key of the search parameter in the URL state, and the second argument is the parser for the search parameter. The `handleSearch` function is now much simpler and only updates the search parameter with the new value from the input field.

What has been missing the whole time is the fact that the search input field is not controlled by the URL state. This means that the input field should display the current search parameter (e.g. `'react'`) from the URL state (e.g. `?search=react`) when the page is loaded. This can be achieved by passing the current search parameter to the input field as a `defaultValue`:

```tsx{11}
const PostsSearch = ({ placeholder }: PostsSearchProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <input
      placeholder={placeholder}
      defaultValue={search}
      onChange={handleSearch}
    />
  );
};
```

Now when there is a search term present in the input field and the URL, the input field will display the search term from the URL state whenever the page gets reloaded. This is a must have feature for a good user experience (UX) in a web application, because otherwise the input field and the URL state would be out of sync.

# Debounce (Optional)

Debouncing requests to the server on user input is a common practice in web applications. This is especially useful when the user types fast and you want to avoid sending a request to the server for every keystroke. Therefore we will install a custom hook as dependency:

```sh
npm install use-debounce
```

To debounce the search input field in the `PostsSearch` component, we can use the `useDebouncedCallback` hook from the `use-debounce` library. Note that `nuqs` comes with a throttle option and in the [future](https://github.com/47ng/nuqs/issues/291) with a debounce option too, which would make this extra dependency unnecessary. But for now, we will use the `useDebouncedCallback` hook to debounce the search input field by 250 milliseconds:

```tsx{4,12,16-17}
"use client";

import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { searchParser } from "../search-params";

...

const PostsSearch = ({ placeholder }: PostsSearchProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    250
  );

  return ( ... );
};
```

While debouncing is necessary for the search input field, it is not necessary for the sort select field. This is because the sort select is a single user interaction (i.e. selecting an option) and not a continuous one (i.e. typing into an input field).

# useQueryStates

The last feature we want to add to our application is the ability to sort the posts by their creation date or upvotes. This will be done with a select field in a new `PostsSort` component where the user is allowed to choose between two options: sort by creation date (newest first) or sort by upvotes (most upvotes first). The selected option will be stored in the URL state as a sort key and sort value, in other words the URL state will look like `?sortKey=createdAt&sortValue=desc` which is not a single string anymore.

With `nuqs` we can define more complex data structures by defining a dedicated parser (here: `sortParser`) for the sort key and sort value which will then be passed as key-value pairs in the `createSearchParamsCache` function's object:

```ts{3-6,8-11,15}
...

export const sortParser = {
  sortKey: parseAsString.withDefault("createdAt"),
  sortValue: parseAsString.withDefault("desc"),
};

export const sortOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  ...sortParser,
});

...
```

See how we can just reuse the same definition file for the search and the sort feature. While search params are the overarching term for all URL state parameters (e.g. search, sort, pagination etc.), the actual `search`, `sortKey` and `sortValue` are just different keys in the URL state. This is why we can define them all in the same file and reuse them across the application.

In the `Posts` component we will add another dedicated Client Component called `PostsSort` which will allow the user to sort the posts. This way we can keep the `Posts` component as a Server Component. At this point, feel free to pass `options` as props to the `PostsSort` component to make it more reusable. We will define these `options` later the `PostsSort` component:

```tsx{4,16}
import { getPosts } from "../queries/get-posts";
import { ParsedSearchParams } from "../search-params";
import { PostsSearch } from "./posts-search";
import { PostsSort } from "./posts-sort";

type PostsProps = {
  searchParams: ParsedSearchParams;
};

const Posts = async ({ searchParams }: PostsProps) => {
  const posts = await getPosts(searchParams);

  return (
    <div>
      <PostsSearch placeholder="Search posts" />
      <PostsSort />

      <ul>
        ...
      </ul>
    </div>
  );
};
```

The `PostsSort` component will use the `sortParser` and `sortOptions` objects to parse the sort key and sort value from the URL state and to update the URL state accordingly. Since this is a complex data structure, we will use the `useQueryStates` hook instead of the `useQueryState` hook from the `nuqs` library:

```tsx
"use client";

import { useQueryStates } from "nuqs";
import { sortParser, sortOptions } from "../search-params";

const PostsSort = () => {
  const options = [
    { label: "Newest", sortKey: "createdAt", sortValue: "desc" },
    { label: "Upvotes", sortKey: "upvotes", sortValue: "desc" },
  ];

  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const compositeKey = event.target.value;
    const [sortKey, sortValue] = compositeKey.split("_");

    setSort({
      sortKey,
      sortValue,
    });
  };

  return (
    <select value={sort.sortKey + "_" + sort.sortValue} onChange={handleSort}>
      {options.map((option) => (
        <option
          key={option.sortKey + option.sortValue}
          value={option.sortKey + "_" + option.sortValue}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export { PostsSort };
```

When you try updating the URL state with this new component now, you will notice that `desc` as `sortValue` is never set in the URL. This is because `desc` is defined as default value in the `sortParser` object the same way as `createdAt` is defined as default value for `sortKey`. This is why `desc`, but also `createdAt` are never seen in the URL state.

The final step is to update the `getPosts` function to sort the posts based on the sort key and sort value from the URL state. This is done by using the `sortKey` and `sortValue` from the `ParsedSearchParams` object which we already receive from the `Page` component as one encapsulated object:

```ts{8,10}
export const getPosts = async (searchParams: ParsedSearchParams) => {
  ...

  const filteredPosts = POSTS.filter((post) =>
    post.title.toLowerCase().includes(searchParams.search.toLowerCase())
  );

  const sortedPosts = filteredPosts; // EXERCISE: sort logic here

  return sortedPosts;
};
```

I will leave it to you to implement the sorting logic in the `getPosts` function, because usually we would not perform this operation on all posts in memory (like we do it with the filtering as well) but rather directly in the database with the help of an ORM like Prisma and its `where` (for filtering) and `orderBy` (for sorting) clauses:

```ts
const sortedPosts = await prisma.post.findMany({
  where: { ... },
  orderBy: {
    [searchParams.sortKey]: searchParams.sortValue,
  },
});
```

When looking at the ORM implementation, you can see why we allowed the sort key and sort value to be strings in the `sortParser` object. This is because the ORM expects the sort key to be a string (i.e. the column name in the database) and the sort value to be a string (i.e. `asc` or `desc`).

Once you have implemented the sorting logic in the `getPosts` function, you will have a fully functional search and sort feature in your Next.js application. The user can search for posts by their title and sort them by their creation date or upvotes. All of these parameters are stored in the URL state and can be shared with others, bookmarked or saved for later use.

<Divider />

URL state is a powerful concept and it seems that it' just getting rediscovered in modern web applications. Rather than storing this state on a component level (i.e. local state) or application level (i.e. global state), it is stored in the URL. This is especially useful for search, sort and pagination parameters in a web application, because when working with data sets you can easily share the current state of the application with others.

Based on my personal experience as a freelance web developer, I've consistently used URL state whenever it was beneficial over the past several years. It has always proven to be a great decision, because my clients have always loved seeing it in action!

In this tutorial we have learned how to use Search Params in Next.js to manage URL state. On top of that, we have improved the DX by using the `nuqs` library which allowed us to work with typed search parameters and to update the URL state in a more declarative way. In addition, we have also learned how to debounce the search input field.

You can find the repository for this tutorial over [here](https://github.com/rwieruch/next-prisma-sqlite). If you want to go beyond this, check out **["The Road to Next"](https://www.road-to-next.com/)** and get on the waitlist!