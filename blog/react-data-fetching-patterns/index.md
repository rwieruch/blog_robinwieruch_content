---
title: "React Data Fetching Patterns"
description: "Data fetching patterns for React components across Client and Server Components ..."
date: "2024-12-02T07:50:46+02:00"
categories: ["React"]
keywords: ["react data fetching patterns"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

When building React applications, fetching data is a common task. In this article, we'll explore different data fetching patterns for React components across client and server.

It's important to note that this article is not about the [different ways to fetch data in React applications](/react-fetching-data/), but rather about the patterns for fetching data in React components. So if you haven't read this article yet, I recommend you do so before continuing.

It's also important to note that this article is not comprehensive and doesn't cover every possible data fetching pattern. It's rather a collection of common patterns that I've encountered during my time building React applications.

# Sequential Data Fetching

Sequential data fetching (also known as *waterfall requests*) is the most common data fetching pattern in React applications. In this pattern, data is fetched one after the other, with each subsequent fetch depending on the data fetched before it. But you have to distinguish between accidental and intentional sequential data fetching.

Consider a component that fetches a `post` and a child component that fetches the `comments` for the post. The child component only fetches the `comments` after the `post` has been fetched. The following example may be straightforward in showing an accidental sequential data fetching, but in a large application this may be not so clear:

```tsx{2,14}
const Post = async ({ postId }: { postId: string }) => {
  const post = await getPost(postId);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Comments postId={post.id} />
    </div>
  );
};

const Comments = async ({ postId }: { postId: string }) => {
  const comments = await getComments(postId);

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};
```

In addition, the example demonstrates the use of React Server Components for server-side data fetching, but you could substitute it with a client-side data fetching library like React Query. In that case, you would typically implement an [early return](/conditional-rendering-react/) with loading, error, and data states, because you cannot pause the component's rendering:

```tsx{2,4-6,8-10}
const Post = ({ postId }: { postId: string }) => {
  const { data: post, isLoading } = usePost(postId);

  if (isLoading) {
    return <p>Loading post...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Comments postId={post.id} />
    </div>
  );
};
```

In a large application, you may have intentional sequential data fetching, where you need to fetch data in a specific order, because it depends on each other.

In such cases, you should consider the trade-offs between the user experience (i.e. is it just good enough?) and merging the multiple data fetching requests into a single request (i.e. a single API endpoint with a database join). This became one of the bigger use cases for GraphQL in the past, but you can also achieve it any other API (e.g. REST).

# Parallel Data Fetching

As mentioned earlier, the shown example is an accidental sequential data fetching pattern, because the `postId` is already known before the `post` is fetched. Whenever you spot these accidental sequential data fetching patterns, you can refactor them into parallel data fetching patterns by lifting the data fetching logic up:

```tsx{2-3,5-8,14,19}
const Post = async ({ postId }: { postId: string }) => {
  const postPromise = getPost(postId);
  const commentsPromise = getComments(postId);

  const [post, comments] = await Promise.all([
    postPromise,
    commentsPromise,
  ]);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Comments comments={comments} />
    </div>
  );
};

const Comments = ({ comments }: { comments: Comment[] }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};
```

By using the Promise API, we can fetch the `post` and `comments` in parallel (better: concurrently), which can improve the performance of our application. This is especially useful when the data fetching operations are independent of each other.

If you go down this rabbit hole, you may also want to introduce a feature-based architecture, which allows you to decouple the comments from the post in the future. This way you can easily move the `Comments` component into its own feature folder and keep the `Post` component focused on the post itself.

<ReadMore label="Feature-based Architecture in React" href="/react-feature-architecture/" />

# Prefetching Data in React

If you want to improve the perceived performance of your application, you can prefetch data before it's needed. This is especially useful for data that is likely to be needed soon, but not immediately. For example, when using a framework (e.g. Next.js) on top of React, you can prefetch the next page and its data with their Link component:

```tsx
<Link href="/posts/1" prefetch>
  <a>Post 1</a>
</Link>
```

Whenever this Link component enters the viewport, the data for the next page is already prefetched. These little tweaks can improve the perceived performance of your application and make it feel more responsive.

When using other libraries or frameworks on top of React, the implementation may look different. While the Link component from Next.js showcases a great declarative example, you may also come across imperative prefetching APIs in other libraries (e.g. React Query) where you manually have to trigger the prefetching of data.

# Initial Data

In a world of Client and Server Components in React, you may also come across the need to fetch data in a Server Component and provide it in a Client Component, because this component uses it as initial data for its client-side state (use case: infinite scroll). So in a Server Component, you can prefetch the data and serialize it for the Client Component:

```tsx
const Comments = async (
  { postId, page }:
  { postId: string, page: number }
) => {
  const comments = await getComments(postId, page);

  return (<CommentList initialComments={comments} />);
};
```

And in the Client Component, you can use the prefetched data as initial data for your client-side state:

```tsx
const CommentList = (
  { initialComments }:
  { initialComments: Comment[] }
) => {
  const [comments, setComment] = useState(initialComments);

  // TODO: implement infinite scroll

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};
```

This way you can improve the perceived performance of your application by providing initial data in a Server Component and using it in a Client Component without showing an initial loading state on the client-side.

<Divider />

As mentioned in the beginning of the article, the list of data fetching patterns is not exhaustive. There are many more patterns that you can use in your React applications. The key is to understand the trade-offs between the different patterns and choose the one that best fits your use case.