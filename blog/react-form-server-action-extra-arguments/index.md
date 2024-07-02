---
title: "Pass Extra Arguments to Server Actions in React Forms"
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

In this short tutorial, you will learn how to pass extra arguments to server actions in React forms. We will start with the following React form component that updates a user's profile:

```tsx
type ProfileFormProps = {
  user: {
    id: string;
    name: string;
  };
};

const ProfileForm = ({ user }: ProfileFormProps) => {
  const updateProfile = (formData: FormData) => {
    const data = {
      username: formData.get("username"),
    };

    console.log(data);

    // TODO: do call (e.g. API call) to update the profile
  };

  return (
    <form action={updateProfile}>
      <label htmlFor="username">Username:</label>
      <input name="username" id="username" />

      <button type="submit">Send</button>
    </form>
  );
};
```

In the above code snippet, the `updateProfile` function is called when the form is submitted. The form action receives the raw form data as an argument and can extra the data from it. But what if you want to pass extra arguments to the `updateProfile` function? For example, you want to pass the user's `id` along with the form data. How can you achieve this?

```tsx
const App = () => {
  return (
    <ProfileForm
      // hardcoding the user object for demonstration
      user={{
        id: "1",
        name: "Alice",
      }}
    />
  );
};
```

In a client-side form action, you could just take the `id` from the outer scope and pass it to the `updateProfile` function before this function hits the server.

```tsx{8}
const ProfileForm = ({ user }: ProfileFormProps) => {
  const updateProfile = (formData: FormData) => {
    const data = {
      username: formData.get("username"),
    };

    console.log(data);
    console.log(user.id);
  };

  return ( ... );
};
```

But in a server-side form action (read: server action), you can't access the `user` object from the outer scope. Instead, we will learn about two ways to pass extra arguments to server actions in React forms.

# Hidden Form Fields for Extra Arguments

One way to pass extra arguments to server actions in React forms is by using hidden form fields. You can add hidden input fields to the form and set their values to the extra arguments you want to pass.

```tsx{3,6,15}
const ProfileForm = ({ user }: ProfileFormProps) => {
  const updateProfile = (formData: FormData) => {
    "use server";

    const data = {
      id: formData.get("id"),
      username: formData.get("username"),
    };

    console.log(data);
  };

  return (
    <form action={updateProfile}>
      <input type="hidden" name="id" value={user.id} />

      <label htmlFor="username">Username:</label>
      <input name="username" id="username" />

      <button type="submit">Send</button>
    </form>
  );
};
```

In the above code snippet, we added a hidden input field with the name `id` and the value of `user.id`. When the form action is submitted, the `updateProfile` function receives the `id` in the form data.

# Binding Extra Arguments to Server Actions

Another way to pass extra arguments to server actions in React forms is by binding the extra arguments to the server action. You can use the `Function.prototype.bind()` method to bind the extra arguments to the server action.

```tsx{2-3,6,14}
const ProfileForm = ({ user }: ProfileFormProps) => {
  const updateProfile = (id: string, formData: FormData) => {
    "use server";

    const data = {
      id,
      username: formData.get("username"),
    };

    console.log(data);
  };

  return (
    <form action={updateProfile.bind(null, user.id)}>
      <label htmlFor="username">Username:</label>
      <input name="username" id="username" />

      <button type="submit">Send</button>
    </form>
  );
};
```

In the above code snippet, we used the `updateProfile.bind(null, user.id)` to [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) the `user.id` to the `updateProfile` function. When the form action is submitted, the server action receives the `id` as the first argument and the form data as the second argument.

<Divider />

Now you know how to pass extra arguments to server actions in React forms. You can use hidden form fields or bind the extra arguments to the server action. Choose the method that best fits your use case and requirements.