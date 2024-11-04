---
title: "How to (not) reset a form after a Server Action in React"
description: "Learn how not to reset a form after a erroneous server action in React. In other words, how to opt-out of the default form reset behavior in React ..."
date: "2024-11-04T08:50:46+02:00"
categories: ["React"]
keywords: ["react server action reset form"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

When submitting a form in React with a Server Action, you may be confronted with the question of how to (not) reset the form after the server action has been executed. Depending on the framework that you are using on top of React, the form may either reset automatically or you have to reset it manually.

The default behavior of a form in React is that it resets automatically after a submit action. It doesn't matter if the form submission was successful or not. When you are using [Next.js](https://www.road-to-next.com/) on top of React, because you have to use a framework to make use of Server Actions in the first place, this default behavior does not change.

In this tutorial I want to show how to keep the form state intact after a server action has been executed. This should only be the case for a failed server action though. If the server action was successful, the form should be reset as usual.

As a side note, I titled the article "How to (not) reset a form after Server Action in React", because the default behavior [in earlier React versions was the opposite](https://github.com/facebook/react/issues/29034). There you had to manually reset the form after a server action.

# How to NOT reset a form in React

We will start off with an example where a user can create a post by using a form with a server action in Next.js. When a user submits the form, the data is sent to the server:

```tsx
import { createPost } from "../actions/create-post";

const PostCreateForm = () => {
  return (
    <form action={createPost}>
      <label htmlFor="name">Name:</label>
      <input name="name" id="name" />

      <label htmlFor="content">Content:</label>
      <textarea name="content" id="content" />

      <button type="submit">Send</button>
    </form>
  );
};
```

The form has two fields and a submit button. When the user clicks on the submit button, the server action is called, the form data gets extracted and you would create a post in the database. If the form submission succeeds, the form is reset automatically:

```ts
"use server";

export const createPost = async (formData: FormData) => {
  const data = {
    name: formData.get("name"),
    content: formData.get("content"),
  };

  if (!data.name || !data.content) {
    throw new Error("Please fill in all fields");
  }

  // TODO: create post in database
};
```

But if the form submission fails, due to a validation or database error, the user has to re-enter the data which is not a great user experience. Let's demonstrate this by throwing an error in the server action which will crash the application if not handled properly.

Usually you would use React's [useActionState](https://react.dev/reference/react/useActionState) Hook to handle the server error and display a message to the user. But this does not (yet) prevent the form from being reset:

```tsx{1,3,7-9,12,22}
"use client";

import { useActionState } from "react";
import { createPost } from "../actions/create-post";

const PostCreateForm = () => {
  const [actionState, action] = useActionState(createPost, {
    message: "",
  });

  return (
    <form action={action}>
      <label htmlFor="name">Name:</label>
      <input name="name" id="name" />

      <label htmlFor="content">Content:</label>
      <textarea name="content" id="content" />

      <button type="submit">Send</button>

      {actionState.message}
    </form>
  );
};
```

On the server-side you would normally catch the error and return a message to the client. For the sake of simplicity, we will just return the message right away:

```ts{1,3-5,8,18,23}
"use server";

type ActionState = {
  message: string;
};

export const createPost = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const data = {
    name: formData.get("name"),
    content: formData.get("content"),
  };

  if (!data.name || !data.content) {
    // throw new Error("Please fill in all fields");
    return { message: "Please fill in all fields" };
  }

  // TODO: create post in database

  return { message: "Post created" };
};
```

Now we have established the basic setup. The form resets after a successful server action and displays an error message if the server action fails. But the form data is lost in the latter case. Let's fix it by preventing the form from resetting after a failed action.

First, we return the form data in the server action if the form submission fails:

```ts{5,20}
"use server";

type ActionState = {
  message: string;
  payload?: FormData;
};

export const createPost = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const data = {
    name: formData.get("name"),
    content: formData.get("content"),
  };

  if (!data.name || !data.content) {
    return {
      message: "Please fill in all fields",
      payload: formData,
    };
  }

  // TODO: create post in database

  return { message: "Post created" };
};
```

And second, we use the action state's returned form data to keep the form state intact when the server action fails by setting conditionally the form element's default values:

```tsx{12,19}
const PostCreateForm = () => {
  const [actionState, action] = useActionState(createPost, {
    message: "",
  });

  return (
    <form action={action}>
      <label htmlFor="name">Name:</label>
      <input
        name="name"
        id="name"
        defaultValue={(actionState.payload?.get("name") || "") as string}
      />

      <label htmlFor="content">Content:</label>
      <textarea
        name="content"
        id="content"
        defaultValue={(actionState.payload?.get("content") || "") as string}
      />

      <button type="submit">Send</button>

      {actionState.message}
    </form>
  );
};
```

Now the form data is kept intact after a failed server action. The user can correct the form data and resubmit the form without having to re-enter the data. On a successful server action, the form is reset as usual.