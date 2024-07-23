---
title: "Data Fetching with Server Actions in Next.js"
description: "Can I fetch data with Server Actions in Next.js? There are different ways to fetch data. Normally Server Actions are used to mutate data, but ..."
date: "2024-07-22T08:50:46+02:00"
categories: ["Next"]
keywords: ["next data fetching server actions"]
hashtags: ["#NextJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

I have been working with React Server Components and Server Actions in Next.js for the last 6 months. While I am excited about Server Components and their ability to execute code on the server, I am not convinced (yet) by the story of data fetching in Client Components (without Server Actions).

Since I have seen the question ("Can I fetch data with Server Actions?") coming up several times among developers on different occasions, I want to share a few insights here.

# React Server Components

In a React Server Component, data fetching is straightforward. Since these components allow you to execute code on the server, you can directly access the data layer (e.g. database) from the UI:

```tsx
import { getPosts } from "@/data";
import { Posts } from "@/posts";

const Page = async () => {
  const posts = await getPosts();

  return (
    <div>
      <h1>React Server Component</h1>

      <Posts posts={posts} />
    </div>
  );
};

export default Page;
```

The `getPosts` function here just mimics a database query with an artificial delay. In the end `getPosts` could also implement a request to a third-party API or some other data source:

```ts
import { POSTS } from "./db";
import { Post } from "./types";

export const getPosts = async (): Promise<Post[]> => {
  // artificial delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return POSTS;
};
```

You can also extend the previous Server Component with a Suspense boundary to enable streaming and a loading state. This way the user can see the each piece of content as soon as it is available and gets a loading indicator in the meantime for the remaining content:

```tsx{3,5-9,16-18}
import { getPosts } from "@/data";
import { Posts } from "@/posts";
import { Suspense } from "react";

const MyPosts = async () => {
  const posts = await getPosts();

  return <Posts posts={posts} />;
};

const Page = () => {
  return (
    <div>
      <h1>React Server Component</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <MyPosts />
      </Suspense>
    </div>
  );
};

export default Page;
```

But what about the data fetching story in Client Components? Most often someone would just recommend you to just fetch data in Server Components and to pass it down to Client Components. And usually that's the best advice.

But there are cases where you want to fetch data in Client Components. For instance, when you want to fetch data on a button click (e.g. "Load More") or scroll event (e.g. infinite scroll). There you can surely pass down the initial subset of data from the Server Component to the Client Component, but you might want to fetch more data in the Client Component eventually.

# Route Handlers for Data Fetching

The official recommendation by Next.js is to use Route Handlers for data fetching in Client Components, because Route Handlers allow you to implement an API in your Next.js application. For example, in a `app/api/posts/route.ts` file you could implement a Route Handler to fetch posts via a GET request:

```ts
import { getPosts } from "@/data";

export async function GET() {
  const posts = await getPosts();

  return Response.json(posts);
}
```

Then you can fetch the data in your Client Component with a fetch request. We are using the most popular data fetching library `react-query` and omit its setup for the sake of keeping things simple here. The following only shows how to fetch the data in a Client Component:

```tsx
"use client";

import { Posts } from "@/posts";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch("/api/posts");
  return await response.json();
};

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts-route-handler"],
    queryFn: fetchPosts,
  });

  return (
    <div>
      <h1>Route Handler</h1>

      {isLoading
        ? <div>Loading...</div>
        : <Posts posts={data ?? []} />
      }
    </div>
  );
};

export default Page;
```

For end users this implementation with a Client Component will feel identical to the Server Component implementation, because they will see a loading indicator until the data is fetched and then the posts will be displayed.

There are two downsides to this approach:

* We cannot just reuse the `getPosts` function from the Server Component in the Client Component. We have to implement a Route Handler (as a proxy) and have to call this Route Handler with a HTTP fetch request (like we would do with any other remote API).
  * In other words: In a scenario where we would want to fetch an initial set of `posts` in a Server Component and then fetch more `posts` in a Client Component, we would have two different data fetching implementations instead of just reusing the same `getPosts` function.
* The returned data from the Route Handler is not type safe (here: `data: any`). We would have to manually type it ourselves or would rely on third parties like OpenAPI.

Let's check out how this *may* work with Server Actions.

# Server Actions for Data Fetching

The official Next.js documentation says that Server Actions are only for writing (mutating) and not for reading (querying) data. But let's do it nevertheless for fetching data in a Client Component with Server Actions for the sake of having this argument:

```tsx{3,8}
"use client";

import { getPosts } from "@/data";
import { Posts } from "@/posts";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  return await getPosts();
};

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts-server-action"],
    queryFn: fetchPosts,
  });

  return (
    <div>
      <h1>Server Action</h1>

      {isLoading
        ? <div>Loading...</div>
        : <Posts posts={data ?? []} />
      }
    </div>
  );
};

export default Page;
```

The user experience (UX) will be the same as with the Route Handler. But the developer experience (DX) is improved here:

* First, we can reuse the `getPosts` function from the Server Component in the Client Component. We don't have to implement a Route Handler and we don't have to call this route handler with a HTTP fetch request. From a DX perspective we are performing a typed remote procedure call (RPC) and not an untyped HTTP request.

* And second, the returned data from `getPosts` is type safe out of the box, because we are just calling a typed function here and no loosely typed API endpoint.

The only thing that we would have to change is marking the previous `getPosts` function as a Server Action, if it really accesses server-side resources (e.g. database):

```ts{1}
"use server";
```

And to be honest, this is how I did it over the last months.

Strategy: I started out by implementing query functions decoupled (meaning: `/queries/get-posts.ts`) from my Server Components. Whenever I had to reuse these query functions in Client Components, I just marked them as Server Actions and moved the file from the `/queries` folder to a `/actions` folder, i.e. `/actions/get-posts.ts`.

Benefits in a nutshell: This way I didn't have to implement a Route Handler, was able to reuse the query function in my Client Component, and would have a typed data fetching experience as a developer.

But I know that this is not the official recommendation. Data fetching with Server Actions comes with drawbacks too:

* Server Actions perform HTTP POST requests
* Server Actions run in sequence

So far I did not have any problems with these restrictions, because using a Server Action for data fetching in a Client Component only happens occasionally. However, I am curious to see how the official recommendation will evolve in the future.

<Divider />

But I know that this is not the end of the story. There is a reason why the React and Next teams are not recommending Server Actions for data fetching. In the future there will be better ways to fetch data in Client Components, they are just not here yet.

For example, I certainly know that React's [use](https://react.dev/reference/react/use) will be the next game changer for data fetching in Client Components. Perhaps this gets followed by [Async Client Components](https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md#why-cant-client-components-be-async-functions). And who knows how we will be using client-side data fetching like React Query in the future.

However, we are not there (yet) and personally I find the current data fetching story in Client Components (without Server Actions) not as compelling as the one in Server Components or the one in Client Components with Server Actions. What's your take on this topic? Feel free to join the discussion!

*Currently I am working on a new course called **["The Road to Next"](https://www.road-to-next.com/)** which will hopefully match the popularity of **The Road to React**. We will create a full-stack Next application which goes all the way from fundamental React knowledge to accessing a serverless database. I am more than excited to share all my knowledge about Next.js with you. **If you are interested**, check out the website and join the waitlist.*
