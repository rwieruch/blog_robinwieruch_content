---
title: "Extra Arguments for Server Actions in React Forms"
description: "Learn how to pass extra arguments to server actions in React forms (or Next.js forms) using hidden form fields or binding the arguments to the server action ..."
date: "2024-07-02T07:50:46+02:00"
categories: ["React"]
keywords: ["react form action extra arguments", "react form server action extra arguments", "react form action second argument", "react form server action second argument"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

In this short tutorial, you will learn how to pass extra arguments to server actions in React forms. We will start with the following React form component that updates a post:

```tsx
type PostFormProps = {
  post: {
    id: string;
    name: string;
  };
};

const PostForm = ({ post }: PostFormProps) => {
  const updatePost = (formData: FormData) => {
    const data = {
      name: formData.get("name"),
    };

    console.log(data);

    // TODO: do call (e.g. API call) to update the post
  };

  return (
    <form action={updatePost}>
      <label htmlFor="name">Name:</label>
      <input name="name" id="name" />

      <button type="submit">Send</button>
    </form>
  );
};
```

In the above code snippet, the `updatePost` function is called when the form is submitted. The form action receives the raw form data as an argument and can extra the data from it. But what if you want to pass extra arguments to the `updatePost` function? For example, you want to pass the post's `id` along with the form data. How can you achieve this?

```tsx
const App = () => {
  return (
    <PostForm
      // hardcoding the post object for demonstration
      post={{
        id: "1",
        name: "Alice",
      }}
    />
  );
};
```

In a client-side form action, you could just take the `id` from the outer scope and pass it to the `updatePost` function before this function hits the server.

```tsx{8}
const PostForm = ({ post }: PostFormProps) => {
  const updatePost = (formData: FormData) => {
    const data = {
      name: formData.get("name"),
    };

    console.log(data);
    console.log(post.id);
  };

  return ( ... );
};
```

But in a server-side form action (read: server action), you can't access the `post` object from the outer scope. Instead, we will learn about two ways to pass extra arguments to server actions in React forms.

# Hidden Form Fields for Extra Arguments

One way to pass extra arguments to server actions in React forms is by using hidden form fields. You can add hidden input fields to the form and set their values to the extra arguments you want to pass.

```tsx{3,6,15}
const PostForm = ({ post }: PostFormProps) => {
  const updatePost = async (formData: FormData) => {
    "use server";

    const data = {
      id: formData.get("id"),
      name: formData.get("name"),
    };

    console.log(data);
  };

  return (
    <form action={updatePost}>
      <input type="hidden" name="id" value={post.id} />

      <label htmlFor="name">Name:</label>
      <input name="name" id="name" />

      <button type="submit">Send</button>
    </form>
  );
};
```

In the above code snippet, we added a hidden input field with the name `id` and the value of `post.id`. When the form action is submitted, the `updatePost` function receives the `id` in the form data.

# Binding Extra Arguments to Server Actions

Another way to pass extra arguments to server actions in React forms is by binding the extra arguments to the server action. You can use the `Function.prototype.bind()` method to bind the extra arguments to the server action.

```tsx{2-3,6,14}
const PostForm = ({ post }: PostFormProps) => {
  const updatePost = async (id: string, formData: FormData) => {
    "use server";

    const data = {
      id,
      name: formData.get("name"),
    };

    console.log(data);
  };

  return (
    <form action={updatePost.bind(null, post.id)}>
      <label htmlFor="name">Name:</label>
      <input name="name" id="name" />

      <button type="submit">Send</button>
    </form>
  );
};
```

In the above code snippet, we used the `updatePost.bind(null, post.id)` to [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) the `post.id` to the `updatePost` function. When the form action is submitted, the server action receives the `id` as the first argument and the form data as the second argument.

<Divider />

Now you know how to pass extra arguments to server actions in React forms. You can use hidden form fields or bind the extra arguments to the server action. Choose the method that best fits your use case and requirements.

You can find the repository for this tutorial over [here](https://github.com/rwieruch/examples/tree/main/react-form-server-action-extra-arguments). If you want to go beyond this, check out **["The Road to Next"](https://www.road-to-next.com/)** and get on the waitlist!