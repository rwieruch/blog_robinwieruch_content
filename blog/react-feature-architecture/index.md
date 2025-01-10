---
title: "Feature-based React Architecture"
description: "How to create a feature-based React architecture that allows large scale applications ..."
date: "2024-11-25T07:50:46+02:00"
categories: ["React"]
keywords: ["feature-based react architecture"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

React is becoming a full-stack framework with React Server Components and Server Actions. While React Server Components (RSC) allow us to read data in the UI from the database, Server Actions enable us to write data back to the database. Certainly UI and database will be close and simple in a small application, but in a larger application, there will always be the complexity of unintentionally intertwining vertical features.

Here I want to discuss how to create a feature-based architecture in React that allows large scale applications to be built and maintained. In a feature-based architecture, each feature is decoupled from the others as much as possible. This way we can keep the components and their data fetching functions focused on their domain.

<ReadMore label="Feature-based Folder Structure in React" link="/react-folder-structure/" />

# Feature-Based React Components

In a typical application, we will have a database with multiple tables that are related to each other. For example, a blog application might have a `users` table, a `posts` table, and a `comments` table. The `posts` table might have a foreign key to the `users` table, and the `comments` table might have foreign keys to both the `users` and `posts` tables.

Let's take the `posts` and `comments` relationship without taking the `user` table into consideration, for the sake of simplicity, and see how it will influence the architecture:

```ts
model Post {
  id        String  @id @default(cuid())
  title     String
  content   String
  comments  Comment[]
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  post      Post     @relation(fields: [postId], references: [id])
  postId    String
}
```

In a React component structure, we might have a `Post` component that renders a post and its comments. The `Post` component, as a Server Component, might look something like this, where we fetch the post and its comments from the database:

```tsx
import { getPost } from '@/features/post/queries/get-post';

const Post = async ({ postId }: { postId: string }) => {
  const post = await getPost(postId);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <ul>
        {post.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
}
```

However, in order to keep our components focused, we might want to split the `Post` component into two components: a `Post` component that renders the post itself, and a `Comments` component that renders the comments. We focus each component on a single feature and therefore can also enforce a clean feature-based architecture:

```tsx{1,11}
import { Comments } from '@/features/comment/components/comments';
import { getPost } from '@/features/post/queries/get-post';

const Post = async ({ postId }: { postId: string }) => {
  const post = await getPost(postId);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Comments comments={post.comments} />
    </div>
  );
}
```

Splitting up components into smaller components is a best practice which comes with many advantages. Here we want to focus on the feature architecture and how it simplifies each file in its own feature folder by decoupling features as much as possible.

# Feature-Based Data Fetching in React

Let's check how this feature-based architecture can be applied to data fetching functions in React. For example, in a naive approach the `getPost` function fetches the post and its comments from the database in one request. This might look like this:

```ts
const getPost = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { comments: true },
  });

  return post;
}
```

Here again we want to keep the data fetching functions focused on their domain, so we might split the `getPost` function into two functions: a `getPost` function that fetches the post itself, and a `getComments` function that fetches the comments.

This way we don't end up with permutations of nested relations in our data fetching functions (e.g. `getPostWithComments`) in a growing codebase.

*Note: These kind of queries with joins will certainly become a part of your larger application, sometimes they are just necessary to improve the performance on complex pages, but if possible, I'd recommend to keep these query functions single purpose, lightweight, and descriptive as long as possible.*

Let's start with the focused `getPost` function:

```ts{1,5}
// src/features/post/queries/get-post.ts
const getPost = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    // include: { comments: true },
  });

  return post;
}
```

And here is the focused `getComments` function which sits in its own feature folder:

```ts
// src/features/comment/queries/get-comments.ts
const getComments = async (postId: string) => {
  const comments = await prisma.comment.findMany({
    where: { postId },
  });

  return comments;
}
```

By not mixing features in components and data fetching functions, we will not have the problem of endless variations (e.g. `getPostWithAuthor`) of nested relations in our data fetching functions. But now we have the disadvantage of having two focused requests instead of one request:

```tsx{5,11}
import { Comments } from '@/features/comment/components/comments';

const Post = async ({ postId }: { postId: string }) => {
  const post = await getPost(postId);
  const comments = await getComments(postId);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Comments comments={comments} />
    </div>
  );
}
```

Now to improve performance, we could apply parallel (to be 100% correct: concurrent) instead of sequential data fetching for `post` and `comments` by using `Promise.all`. We will do this later in the article, for now we will focus on keeping the components and their data fetching functions focused on their feature.

To decouple the post feature from the comment feature even more, we could initiate the data fetching in the Comments component itself. This way the Post component doesn't need to know about the comments at all and would only need to pass the `postId`:

```tsx{1,3-4}
import { getComments } from '@/features/comment/queries/get-comments';

const Comments = async ({ postId }: { postId: string }) => {
  const comments = await getComments(postId);

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
}
```

And the `Post` component would change to this where it only passes the `postId`:

```tsx{11}
import { Comments } from '@/features/comment/components/comments';
import { getPost } from '@/features/post/queries/get-post';

const Post = async ({ postId }: { postId: string }) => {
  const post = await getPost(postId);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Comments postId={postId} />
    </div>
  );
}
```

By keeping the components and their data fetching functions focused on their feature, we can build a scalable React application that is easy to maintain and extend.

# Feature-Based Architecture in React

The current decoupling comes with the caveat that we have waterfall data fetching in the components. This means that the `Post` component fetches the post and only then (waterfall) the `Comments` component fetches the comments.

In other words, we have sequential data fetching in the components instead of parallel data fetching. This is not ideal for performance, especially when the comments do not need the post to be fetched, they only need the identifier of the post.

We could have fixed this earlier with parallel data fetching in the `Post` component, but we wanted to decouple the features first as much as possible. Fortunately, we can add this improvement now. Entering component composition in React which we will apply at the parent component of the `Post` component:

```tsx
import { Post } from '@/features/post/components/post';
import { getPost } from '@/features/post/queries/get-post';
import { Comments } from '@/features/comment/components/comments';
import { getComments } from '@/features/comment/queries/get-comments';

const PostPage = async ({ postId }: { postId: string }) => {
  const post = await getPost(postId);
  const comments = await getComments(postId);

  return (
    <Post
      post={post}
      comments={<Comments comments={comments} />}
    />
  );
}
```

In the case of the `comments` property, we could also use React's children prop, but I like to keep my props descriptive with a name that tells me what it is.

Now we can go from sequential data fetching to parallel data fetching in the component:

```tsx{2-3,5-8}
const PostPage = async ({ postId }: { postId: string }) => {
  const postPromise = getPost(postId);
  const commentsPromise = getComments(postId);

  const [post, comments] = await Promise.all([
    postPromise,
    commentsPromise,
  ]);

  return (
    <Post
      post={post}
      comments={<Comments comments={comments} />}
    />
  );
}
```

And the `Post` component would receive the `post` and the `comments` component:

```tsx
type PostProps = {
  post: Post;
  comments: ReactNode;
};

const Post = ({ post, comments }: PostProps) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {comments}
    </div>
  );
}
```

And the `Comments` component goes back to receiving the `comments`:

```tsx
type CommentsProps = {
  comments: Comment[];
};

const Comments = ({ comments }: CommentsProps) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
}
```

We get the best of both worlds: a feature-based architecture that is easy to maintain and extend, and parallel data fetching in the components for optimal performance.

<ReadMore label="Component Composition in React" link="/react-component-composition/" />

In addition, component composition allows us to make either the `Post` or the `Comments` component a Client Component without the other component suffering (i.e. becoming a Client Component too) from it.

In a smaller React project, these steps might not be essential. However, in larger projects, it's crucial to ensure that components and their associated logic (such as data fetching) remain focused on their specific domain. This approach helps prevent components within a vertical feature from becoming cluttered with unrelated logic.

There are exceptions though, as noted in the article, where you have to have query functions with joins to improve the performance on complex pages.

In addition, this article should not encourage anyone to introduce the N+1 problem. While we are in this example on the individual PostPage where we only make one post request and one comments request, we do not want to go on the PostsPage to make a request for all posts and then a request for all comments of *each* post (read: N+1 problem). This is where the query functions with joins come into play. However, first it makes sense to evaluate whether fetching all comments for each post on this page is really necessary. Perhaps fetching the comments lazily with a hidden pane is a better solution.

