---
title: "React Form Button"
description: "Learn how to trigger a server action with a form button without using a Client Component in React ..."
date: "2024-07-15T07:50:46+02:00"
categories: ["React"]
keywords: ["react form button", "react button server action", "react button server component"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Here you will learn how to use a form button in React to trigger a server action in a Server Component without any form fields or form data. This can be useful if you want to trigger a server action with a button click, but don't want to use a Client Component to assign a click event handler.

# React Button in a Client Component

We will start with a React component that displays a post and a button to delete it. The `PostItem` component receives a `post` object as a prop and displays the post title and a delete button:

```tsx
type Post = {
  id: string;
  title: string;
};

type PostItemProps = {
  post: Post;
};

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <div>
      <span>{post.title}</span>

      <button>Delete</button>
    </div>
  );
};
```

In a Client Component, you could attach a click handler to the button to call the server with an API request. In Next.js the API could be implemented with a Route Handler:

```tsx{2-5,11}
export const PostItem = ({ post }: PostItemProps) => {
  const handleDelete = () => {
    // logging in browser
    console.log("TODO: Call API to delete post");
  };

  return (
    <div>
      <span>{post.title}</span>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
```

However, in a Server Component, you cannot attach a click handler to the button like in the code above. You may get a similar error to the following:

```sh
Error: Event handlers cannot be passed to Client Component props.
If you need interactivity, consider converting part of this to a Client Component.
```

So you are free to transform a Server Component to a Client Component with a client directive (read: `"use client";`), but if you want to keep the component as a Server Component, you can also use a form button to trigger a server action without using a Client Component.

# React Form Button in a Server Component

If you want to keep it as a Server Component, you can use a form button to trigger a server action which runs on the server-side. The form button will submit the form and trigger the server action without any form fields or form data. Here is how you can do it:

```tsx{2-7,13-15}
export const PostItem = ({ post }: PostItemProps) => {
  const deletePost = async () => {
    "use server";

    // logging in terminal
    console.log("TODO: delete post in DB");
  };

  return (
    <div>
      <span>{post.title}</span>

      <form action={deletePost}>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};
```

Essentially you are just using a form without any form fields and only a submit button. For developers from the old days this may be obvious, but when you are only used to perform client-side interactions with React, using a form with just a button may be new to you, because you have been used to use a button with an `onClick` handler for a long time.

*Currently I am working on a new course called **["The Road to Next"](https://www.road-to-next.com/)** which will hopefully match the popularity of **The Road to React**. We will create a full-stack Next application which goes all the way from fundamental React knowledge to accessing a serverless database. I am more than excited to share all my knowledge about Next.js with you. **If you are interested**, check out the website and join the waitlist.*