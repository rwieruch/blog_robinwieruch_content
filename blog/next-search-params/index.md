---
title: "Search Params in Next.js"
description: "How to use Search Params in Next with useSearchParams und SearchParams from Client and Server Components for URL state ..."
date: "2024-09-10T08:50:46+02:00"
categories: ["Next"]
keywords: ["next search params", "next searchparams", "next usesearchparams", "next url state"]
hashtags: ["#NextJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

- intro

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

- we are using a feature folders here

<ReadMore label="Feature Folders in React" link="/react-feature-folder/" />

- the Posts components can be either a Client or a Server Component
- in our case it will be a Server Component which performs server-side data fetching with a `getPosts` function from a pseudo database

<ReadMore label="Next.js with Server Actions" link="/next-server-actions/" />

- however, it could be a Client Component with client-side data fetching too

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

- for the sake of completeness, this would be the query function which gets called from our React Server Component

```ts
import { POSTS } from "../db";

export const getPosts = async () => {
  // artificial delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return POSTS;
};
```

- which essentially just mimics a database call by returning delayed data as `POSTS` from a file with the sample data

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

- asd

```ts
export type Post = {
  id: string;
  title: string;
  createdAt: Date;
  upvotes: number;
};
```

<ReadMore label="Next.js with Prisma and SQLite" link="/next-prisma-sqlite/" />

- now we will explore search params in Next.js with this example

# Search Params

- straightfoeard with Next hooks

```tsx{2,9}
import { getPosts } from "../queries/get-posts";
import { PostsSearch } from "./posts-search";

const Posts = async () => {
  const posts = await getPosts();

  return (
    <div>
      <PostsSearch placeholder="Search posts" />

      <ul>
        {posts.map((post) => (
          <span>
            {post.title} ({post.createdAt.toLocaleDateString()})
          </span>
          {" - "}
          <span>{post.upvotes} upvotes</span>
        ))}
      </ul>
    </div>
  );
};

export { Posts };
```

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

# URL State

```ts
export type SearchParams = {
  search: string;
};
```

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

- untyped search params

```ts{2}
export type SearchParams = {
  search: string | undefined;
};
```

- asd

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

- could be string array too

```ts{2}
export type SearchParams = {
  search: string | string[] | undefined;
};
```

- type assertion as cheat

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

- we want to have them typed!

# SearchParams vs useSearchParams

- page level
- client component
- at the time of writing, not possible to retrieve in a server component that's not on page level (please ping me once this changes)

# Typed Search Params

- typed search params and improved development experience (DX)
  - look at `type SearchParams` and `getPosts`
  - look at `PostsSearch` component

- using nuqs

```sh
npm install nuqs
```

- typed

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

- page, untyped to typed with `parse`

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

- using untyped `SearchParams`
- then using typed `ParsedSearchParams`

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

- getPosts without type assertion and without early return

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

# useQueryState

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

# Controlled Component (Optional)

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

# Debounce (Optional)

```sh
npm install use-debounce
```

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

- note nuqs has throttle and debounce too (links)

# useQueryStates

- TODO: posts-sort.tsx

# Default Search Params

- TODO: newest

<Divider />

You can find the repository for this tutorial over [here](https://github.com/rwieruch/next-prisma-sqlite). If you want to go beyond this, check out **["The Road to Next"](https://www.road-to-next.com/)** and get on the waitlist!