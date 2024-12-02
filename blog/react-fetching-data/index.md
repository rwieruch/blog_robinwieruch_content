---
title: "How to fetch data in React [2024]"
description: "There are different ways to fetch data in React from a remote API. In this guide we want to explore all the options available for data fetching in React ..."
date: "2024-09-23T13:50:46+02:00"
categories: ["React"]
keywords: ["react fetch data", "react data fetching", "react data API"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

There are multiple ways to fetch data in React from a remote API. Here we want to explore all the options available for data fetching in React that were introduced over the years and are still in use today. While some of them are newer and recommended, others are less recommended and should be avoided in most cases. Let's jump right in.

We will start with a simple example of a component where we want to fetch a list of `posts` from a remote API to display them as a list of items. We will use a fake DB and a fake API to simulate the data fetching process, because the goal is to show you how to fetch data in React with different methods, not how to set up a real API.

<Divider />

First of all, we have a `Post` type that represents a post for the sake of this example:

```ts
export type Post = {
  id: string;
  title: string;
};
```

Second, we have a fake database with some posts in memory:

```ts
import { Post } from "./types";

export const POSTS: Post[] = [
  {
    id: "1",
    title: "Post 1",
  },
  {
    id: "2",
    title: "Post 2",
  },
];
```

And third, we have a data fetching function which returns a promise with the posts. Depending on the case we are discussing later, the implementation details of this function may vary. But more about this later:

```ts
import { POSTS } from "../db";

export const getPosts = async () => {
  // artificial delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return POSTS;
};
```

Finally, we have a component where we want to fetch the posts:

```tsx
import { Post } from "@/features/post/types";

const PostsPage = () => {
  const posts: Post[] = [];
  // TODO: fetch posts from the API

  return (
    <div>
      <h1>Posts</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
```

From here we will explore different ways to fetch data in React.

# React Server Components for Data Fetching

If you are using a framework on top of React (e.g. Next.js) which implements React Server Components (RSC), you could perform **server-side data fetching**, because Server Components execute on the server before they return the HTML to the client:

```tsx{1,3-4}
import { getPosts } from "@/features/post/queries/get-posts";

const PostsPage = async () => {
  const posts = await getPosts();

  return (
    <div>
      <h1>React Server Component</h1>

      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
```

The async component would pause their execution until the asynchronous operation is done. Once the awaited promise is resolved, the component will continue rendering with the fetched data. In the case of a RSC, only the HTML will be returned to the client.

<ReadMore label="Server Actions in Next" link="/next-server-actions/" />

Because of the nature of Server Components, the data fetching is done on the server-side, which means that `getPosts` can directly read data from the database without the need for an API. You would just use your ORM or database client to retrieve the data:

```ts
export const getPosts = async () => {
  return await db.query("SELECT * FROM posts");
};
```

If you are using a framework that supports React Server Components (e.g. Next.js), I'd recommend to fetch data on the server, because you are avoiding the client-server communication roundtrip and you can directly access your server-side data source.

<ReadMore label="The Road to Next" link="https://www.road-to-next.com/" />

From here you can enhance the UX by adding error handling or a loading state to the component. The latter can be achieved by using the [Suspense](https://react.dev/reference/react/Suspense) component from React.

# React Suspense for Data Fetching

React Suspense is a feature that allows you to suspend the rendering of a component until some asynchronous operation is done. It's a powerful feature that can be used for data fetching, code splitting, and more. Let's see how you can use Suspense for data fetching by enhancing the previous example:

```tsx{1,4,9-11,16-26}
import { Suspense } from "react";
import { getPosts } from "@/features/post/queries/get-posts";

const PostsPage = () => {
  return (
    <div>
      <h1>React Server Component</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <PostList />
      </Suspense>
    </div>
  );
};

const PostList = async () => {
  const posts = await getPosts();

  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default PostsPage;
```

Now the `Suspense` component will show the fallback UI (i.e. "Loading...") until the posts are fetched. This way you can enhance the user experience by showing a loading state while the data is being fetched in the PostList component which is wrapped by the `Suspense` component.

# React Query for Data Fetching

When it comes to client-side rendered (CSR) React applications (i.e. SPAs), the most recommended way to fetch data is by using a library like React Query. It's a powerful library that provides hooks to fetch, cache, and update data in your React applications:

```tsx{1,3-4,7-10}
"use client";

import { getPosts } from "@/features/post/queries/get-posts";
import { useQuery } from "@tanstack/react-query";

const PostsPage = () => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <div>
      <h1>React Query</h1>

      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
```

In this example, we are using the `useQuery` hook from React Query to fetch the posts with **client-side data fetching**. The `useQuery` hook takes an object with a `queryKey` and a `queryFn`. The `queryKey` is an array that identifies the query (i.e. used for cache management) and the `queryFn` is the function that fetches the data.

In the case of client-side data fetching, the `getPosts` function cannot access backend code (e.g. ORM, database) and therefore needs to communicate with a remote API over HTTP (e.g. [REST](/node-express-server-rest-api/)). This is usually done with the [native fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) or a library like [axios](https://www.npmjs.com/package/axios). You also have to decide whether you want to use [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) or the [Promise API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) (i.e. `then`). All permutations are possible while async/await with fetch is the most popular:

```ts
export const getPosts = async () => {
  const response = await fetch("/api/posts");
  return response.json();
};
```

In contrast to server-side data fetching with Server Components, your result from `fetch` or `axios` is not automatically typed. You would have to introduce a typed schema generation by something like OpenAPI.

Moreover, by the nature of client-side data fetching, you have to deal with network errors, loading states, and caching yourself. Fortunately React Query helps you with all of these aspects, so you don't have to reinvent the wheel.

<ReadMore label="Web Applications 101" link="/web-applications/" />

Whenever you are performing client-side data fetching, React Query is the way to go. For example, it handles caching, race conditions, and stale data out of the box. If you would want to add error handling or a loading state to the component, you could already destructure the `isLoading` and `error` properties from the `useQuery` hook's result.

An alternative to React Query is [SWR](https://swr.vercel.app/). If you are using GraphQL instead of REST as your API layer, there are also [Relay](https://relay.dev/) and [Apollo Client](https://www.apollographql.com/docs/react/), even though React Query can also be used with GraphQL.

# Server Components + React Query

You have seen both server-side data fetching with React Server Components (built-in) and client-side data fetching with React Query (library). But what if you want to combine them?

For example, you want to fetch initial data on the server-side with React Server Components (if supported by your [React framework](/react-full-stack-framework/)) and then use React Query for continued client-side data fetching (e.g. infinite scrolling).

For this advanced data fetching example, you would need a Server Component that fetches the initial data on the server and then [passes it down](/react-pass-props-to-component/) to a Client Component that uses React Query for continued data fetching on the client:

```tsx{1-2,4-5,11}
import { getPosts } from "@/features/post/queries/get-posts";
import { PostList } from "./_components/post-list";

const PostsPage = async () => {
  const posts = await getPosts();

  return (
    <div>
      <h1>React Server Component + React Query</h1>

      <PostList initialPosts={posts} />
    </div>
  );
};

export default PostsPage;
```

Essentially the Server Component has the same implementation details as we had it in a previous example, however, instead of rendering the list of posts directly, we are passing them to a Client Component which further processes them as initial data:

```tsx{1,3-5,8,11-16}
"use client";

import { getPosts } from "@/features/post/queries/get-posts";
import { Post } from "@/features/post/types";
import { useQuery } from "@tanstack/react-query";

type PostListProps = {
  initialPosts: Post[];
};

const PostList = ({ initialPosts }: PostListProps) => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialData: initialPosts,
  });

  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export { PostList };
```

The Client Component uses the props from the Server Component as `initialData` in the `useQuery` hook. From there React Query takes over for caching, refetching, and updating the data. This way you can combine the best of both worlds: server-side data fetching with React Server Components and client-side data fetching with React Query.

The implementation details of the `getPosts` function are debatable: Whereas you would be able to access the data source (i.e. server) directly when executing it in the Server Component (see *React Server Components for Data Fetching*), you would have to use a remote API when executing it in the Client Component (see *React Query for Data Fetching*).

At the time of writing, you would have to implement two `getPosts` function here. Fortunately there is a little workaround (i.e. [Server Actions for data fetching](/next-server-actions-fetch-data/)) where you could use the same `getPosts` function for both Server and Client Components.

# React's use() API

React's `use` API is still in experimental mode. It allows you to pass a Promise from a Server Component to a Client Component and resolve it in the Client Component. This way you can avoid blocking the rendering of the Server Component with `await`:

```tsx{1-3,6,12-14}
import { Suspense } from "react";
import { getPosts } from "@/features/post/queries/get-posts";
import { PostList } from "./_components/post-list";

const PostsPage = () => {
  const postsPromise = getPosts();

  return (
    <div>
      <h1>use(Promise)</h1>

      <Suspense>
        <PostList promisedPosts={postsPromise} />
      </Suspense>
    </div>
  );
};

export default PostsPage;
```

This approach stays close to the Server Component example, but uses React's `use` API to pass the promise to the Client Component instead of resolving it directly in the RSC.

```tsx{1,3-4,7,10-11}
"use client";

import { use } from "react";
import { Post } from "@/features/post/types";

type PostListProps = {
  promisedPosts: Promise<Post[]>;
};

const PostList = ({ promisedPosts }: PostListProps) => {
  const posts = use(promisedPosts);

  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export { PostList };
```

Personally this feels a bit like a stepping stone towards asynchronous Client Components which are not available yet. Only Server Components, at the time of writing, can have the `async` keyword in their function signature. Once there are Async Client Components, we could omit the `use` API and just await the result from `getPosts` directly in the Client Component.

# React Hooks for Data Fetching

Instead of using a dedicated client-side data fetching library like React Query, one could implement their own data fetching logic with hooks. This is not recommended for production use, but it's a good way to learn the basics of data fetching in React:

```tsx{1,3-5,8,10-17}
"use client";

import { getPosts } from "@/features/post/queries/get-posts";
import { Post } from "@/features/post/types";
import { useEffect, useState } from "react";

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPosts(posts);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Hooks</h1>

      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
```

Before we had data fetching libraries like React Query, developers would use `useEffect` and `useState` to fetch data in React. But the implementation shows only the tip of the iceberg, because you would have to [handle everything](https://tkdodo.eu/blog/why-you-want-react-query) from loading state over to caching and race conditions yourself.

<ReadMore label="How to fetch data with React Hooks" link="/react-hooks-fetch-data/" />

But in any way, React beginners learn about this approach in The Road to React, because it's a good way to understand how data fetching works under the hood in a sophisticated library like React Query.

<ReadMore label="How to fetch data with React Class Components (Legacy)" link="/react-fetch-data-class-components/" />

# tRPC for typed data fetching

Typically data fetching is happening in a client-server architecture via REST. On the client-side, this would be achieved with React Query as we have seen before. But this solution lacks type safety across the network, because you would have to use a third-party like OpenAPI to generate a typed schema.

Entering remote procedure calls (RPC) like [tRPC](https://trpc.io/). It's a library that provides a type-safe API layer for your React applications. Here is how you would fetch posts with tRPC:

```tsx{1,3,6}
"use client";

import { trpc } from '~/trpc/client';

const PostsPage = () => {
  const posts = trpc.posts.getPosts.useQuery();

  return (
    <div>
      <h1>tRPC</h1>

      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
```

The benefit of tRPC is that everything from data fetching functions to the data itself is typed. This way you can avoid runtime errors and have a better developer experience. But keep in mind that tRPC is a full-stack solution, so you would need a Node.js with TypeScript backend to use it.

<ReadMore label="Full-Stack TypeScript with tRPC" link="/react-trpc/" />

<Divider />

So what's the recommended way for data fetching in React? It depends on your tech stack. If you are using a framework that supports React Server Components, I'd **strongly recommend** to fetch data on the server-side with RSC. If you are building a client-side rendered React application, you should use React Query for data fetching instead.

<ReadMore label="Data Fetching Patterns in React" link="/react-data-fetching-patterns/" />

If you are going the client-side data fetching approach in single page applications (SPAs), **React Query** is the way to go these days. There is no way around it, even in advanced server-side React applications (see below), because it handles lots of things (i.e. race conditions, caching, refetching, infinite scroll) for you.

If you have RSC enabled *and* want to support more **advanced data fetching patterns** such as infinite scrolling, you *can* combine React Server Components with React Query. This way you can fetch initial data on the server-side and then use React Query for continued data fetching on the client-side.

APIs like React's `use` API are still experimental and not recommended for production use (yet). In my optional, they are perhaps more like a stepping stone towards asynchronous Client Components which are only discussed at the time of writing.

As a beginner, if you just want to learn about data fetching and how everything works under the hood in a sophisticated library like React Query, you could **implement your own data fetching logic with hooks** (useEffect + useState).

But **in a real-world application**, you should use a library like React Query for client-side data fetching or React Server Components for server-side data fetching.

If you cannot use React Server Components, but you want to have **type-safe data fetching**, you could use tRPC. It's a library that provides a type-safe API layer for your React applications. This only works if you have a Node.js with TypeScript backend, because tRPC is a full-stack solution.