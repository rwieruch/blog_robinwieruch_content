---
title: "React Server Actions with Toast Feedback"
description: "Learn how to return and display toast feedback from React Server Actions ..."
date: "2025-03-04T08:50:46+02:00"
categories: ["React"]
keywords: ["react server action toast"]
hashtags: ["#ReactJS"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

User feedback is an essential part of a great user experience. In this tutorial, we'll explore how to implement toast notifications when calling Server Actions in React.

We'll create a React Server Component that fetches user data and then allow users to upvote, downvote, and delete entries from a Client Component. Each React Server Action will trigger a toast message to provide real-time feedback.

After this tutorial, you'll have a solid understanding of how to implement toast notifications for Server Actions in React. Let's get started!

# Table of Contents

<TableOfContents {...props} />

# React Server Component with Toast

In this tutorial, we start with a basic page implemented as a React Server Component that fetches user data. To keep our code organized and maintainable, we use the [Data Access Object (DAO)](https://en.wikipedia.org/wiki/Data_access_object) pattern to separate the data access logic from the component. This approach allows us to easily manage and modify data retrieval and manipulation without affecting the component's structure.

<ReadMore label="React Folder Structure" link="/react-folder-structure/" />

However, feel free to use any design pattern that suits your project's needs.

```tsx
// src/app/page.tsx
import { User } from "@/components/user";
import { getUsers } from "@/daos/user-dao";

const Home = async () => {
  const users = await getUsers();

  return (
    <div>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Home;
```

While most real-world applications rely on a database, for simplicity, we'll use an in-memory array to store user data. This allows us to focus on implementing Server Actions and toast feedback without dealing with database setup.

<ReadMore label="Next.js with Prisma and SQLite" link="/next-prisma-sqlite/" />

We'll also add an artificial delay to simulate real-world data fetching scenarios.

```ts
// src/daos/user-dao.ts
const users = [
  {
    id: 1,
    name: "Alice",
    upvotes: 0,
  },
  {
    id: 2,
    name: "Bob",
    upvotes: 0,
  },
];

export const getUsers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  return users;
};
```

Since we'll be using React hooks to manage state and interactions, our User component needs to be a Client Component. This ensures that JavaScript runs on the client side, enabling interactions such as voting and deleting users.

```tsx
// src/components/user.tsx
"use client";

type UserProps = {
  user: {
    id: number;
    name: string;
    upvotes: number;
  };
};

const User = ({ user }: UserProps) => {
  return (
    <div className="flex gap-x-2">
      {user.name} ({user.upvotes})
    </div>
  );
};

export { User };
```

From here we'll implement three different Server Actions in this User component:

- Upvoting a user – Increases a user's upvotes count.
- Downvoting a user – Simulates an error scenario.
- Deleting a user – Removes the user and refreshes the page.

Each action will trigger a toast notification, providing feedback to the user.

# Toaster Setup in React

To display feedback messages, we need to install a toaster notification package. You can use any package you like or create a custom solution. We use a third-party:

```sh
npx shadcn@latest add toast
```

Once installed, we must import and add the Toaster component in the most top-level component. This ensures that toast notifications are globally available:

```tsx{2,9}
// src/app/layout.tsx
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout(...) {
  return (
    <html ...>
      <body ...>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

The Toaster component will handle displaying toast notifications throughout the application whenever we call the `toast` function. We'll use this function to show feedback messages coming from our Server Actions later in the User component.

<ReadMore label="React Libraries" link="/react-libraries/" />

# Return Toast Message from Server Action

To allow users to upvote, we need to define a Server Action inside our DAO file. This function will find the user and increment their upvote count for the in-memory array. To simulate real-world conditions, we'll add a slight delay before returning a response.

```ts{6-17}
// src/daos/user-dao.ts
export const getUsers = async () => {
  ...
};

export const upvoteUser = async (userId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return { message: "User not found", timestamp: Date.now() };
  }

  user.upvotes += 1;

  return { message: "Vote increased", timestamp: Date.now() };
};
```

Note that we are returning feedback for the happy and the unhappy path here. While we will only see the happy path in this case, the implementation of the unhappy path is important for a complete Server Action. Later you could also add a returned status to the object to differ between different types of feedback (e.g. success, error, warning).

The most critical part of the Server Action is returning a response object with a message and a timestamp. The message will be displayed in the toast notification, while the timestamp will help us track new responses from Server Actions, preventing duplicate toasts from appearing due to re-renders. More about this later.

<ReadMore label="Server Actions in Next.js" link="/next-server-actions/" />

Since this function runs on the server, we need to mark the file with "use server". This tells React that the functions inside this file should execute on the server side.

```ts{2}
// src/daos/user-dao.ts
"use server";
```

Now that the Server Action is ready, we need to trigger it from the client-side. This will be done inside our User component, because there we can actually receive the returned object and display the toast message.

# Receive Toast Feedback in Client Component

To manage Server Action's state, we use [React's useActionState Hook](https://react.dev/reference/react/useActionState). This hook allows us in a Client Component to transfer state between the client and server with a Server Action. We pass the Server Action function and an initial empty state object to the hook:

```tsx{3-6,11-17}
// src/components/user.tsx
const User = ({ user }: UserProps) => {
  const [upvoteState, upvoteAction, upvotePending] = useActionState(
    upvoteUser.bind(null, user.id),
    { message: "", timestamp: Date.now() }
  );

  return (
    <div className="flex gap-x-2">
      {user.name} ({user.upvotes})
      <FormButton
        action={upvoteAction}
        actionState={upvoteState}
        pending={upvotePending}
      >
        Upvote
      </FormButton>
    </div>
  );
};
```

Do not forget the imports at the top of the file:

```tsx{4-6}
// src/components/user.tsx
"use client";

import { useActionState } from "react";
import { upvoteUser } from "@/daos/user-dao";
import { FormButton } from "./form-button";
```

To improve code reusability, we'll already created a form button component that will handle interactions and feedback. It will receive the Server Action's state, the Server Action function, and a [loading state](/react-form-loading-pending-action/) to indicate when the request is being processed.

```tsx
// src/components/form-button.tsx
"use client";

type FormButtonProps = {
  action: () => void;
  actionState: { message: string; timestamp: number };
  pending: boolean;
  onSuccess?: () => void;
  children: React.ReactNode;
};

const FormButton = ({
  action,
  actionState,
  pending,
  onSuccess,
  children,
}: FormButtonProps) => {
  return (
    <form action={action}>
      <button type="submit" disabled={pending}>
        {children}
      </button>
    </form>
  );
};

export { FormButton };
```

Not all props are used yet, but we will use them later for different use cases. At the moment it's just a [form button](/react-form-button/) which triggers the Server Action when clicked.

When you interact with the button, there is no toast message yet because we will have to implement this toast feedback in the form button component. But the Server Action is already triggered and the user's upvotes are increased.

Depending on the framework you are using (e.g. Next.js), you might need to refresh the page after the Server Action. Otherwise, the upvotes will not be updated in the UI. We will cover this later as well.

# Show Toast Notification

Now that we have a button triggering the Server Action, we need to display a toast notification when the action completes. The simplest approach is to use [React's useEffect Hook](/react-useeffect-hook/) inside the form button component to listen for changes of the server Action's state and display the message with the toast function:

```tsx{4-5,10,12-16}
// src/components/form-button.tsx
"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type FormButtonProps = { ... };

const FormButton = ({ ... }: FormButtonProps) => {
  const { toast } = useToast();

  useEffect(() => {
    if (actionState && actionState.message) {
      toast({ description: actionState.message });
    }
  }, [actionState, toast]);

  return (
    <form action={action}>
      <button type="submit" disabled={pending}>
        {children}
      </button>
    </form>
  );
};
```

However, simply displaying the toast inside useEffect is not reliable. If the component re-renders, it might show an old toast message even if no new action was triggered. To prevent duplicate toasts, we use the returned timestamp to track when the state was last updated:

```tsx{4,12-13,16,20-21}
// src/components/form-button.tsx
"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

type FormButtonProps = { ...};

const FormButton = ({ ... }: FormButtonProps) => {
  const { toast } = useToast();

  const prevTimestamp = useRef(actionState?.timestamp);
  const isUpdate = prevTimestamp.current !== actionState?.timestamp;

  useEffect(() => {
    if (actionState && actionState.message && isUpdate) {
      toast({ description: actionState.message });
    }

    prevTimestamp.current = actionState.timestamp;
  }, [actionState, isUpdate, toast]);

  return (
    <form action={action}>
      <button type="submit" disabled={pending}>
        {children}
      </button>
    </form>
  );
};
```

The timestamp serves as a crucial [reference](/react-ref/) for tracking changes in the action state. By comparing the current timestamp with the previous one, we can determine if the action state has changed. If there's a change, we display the new toast message.

This setup already represents a minimal implementation of toasts: the Server Action returns both a message and a timestamp and the Client Component is responsible for displaying this information. In this minimal scenario, the FormButton abstraction wouldn't even be necessary, but it will be a good practice when there are more components that need to trigger Server Actions in the future.

To improve this implementation further, it would be beneficial to introduce a status flag within the action state. This flag could allow for the display of different toast types, such as success, error, or warning, enhancing the feedback provided to the user.

# Toast for failed Server Action

To demonstrate how to handle errors, we'll add a downvote Server Action that always returns an error message. This will allow us to test how our app handles failed Server Actions and displays appropriate toast notifications.

```ts
// src/daos/user-dao.ts
export const downvoteUser = async (userId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  // force error for debugging purposes
  return { message: "Something went wrong", timestamp: Date.now() };
};
```

Next, we add a new button in the User component that calls the new Server Action. When the action fails, it should trigger a toast notification informing the user that something went wrong:

```tsx{5-8,14-20}
// src/components/user.tsx
const User = ({ user }: UserProps) => {
  const [upvoteState, upvoteAction, upvotePending] = useActionState( ... );

  const [downvoteState, downvoteAction, downvotePending] = useActionState(
    downvoteUser.bind(null, user.id),
    { message: "", timestamp: Date.now() }
  );

  return (
    <div className="flex gap-x-2">
      {user.name} ({user.upvotes})
      <FormButton ... >Upvote</FormButton>
      <FormButton
        action={downvoteAction}
        actionState={downvoteState}
        pending={downvotePending}
      >
        Downvote
      </FormButton>
    </div>
  );
};
```

Do not forget the import for the new Server Action:

```tsx{2}
// src/components/user.tsx
import { downvoteUser, upvoteUser } from "@/daos/user-dao";
```

Now, when you click the new button, you should see a toast message displaying the failed Server Action message.

# Refresh Page after Server Action

If you're using Next.js, you might notice that upvotes don't update immediately after clicking the button. This happens because Next.js caches the data. To fix this, we use Next.js's revalidatePath function to refresh the page and show updated data immediately.

We modify our upvote function to include `revalidatePath("/")`, ensuring that the page refreshes after each upvote:

```ts{12}
// src/daos/user-dao.ts
export const upvoteUser = async (userId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return { message: "User not found", timestamp: Date.now() };
  }

  user.upvotes += 1;

  revalidatePath("/");

  return { message: "Vote increased", timestamp: Date.now() };
};
```

Don't forget to import revalidatePath from next/cache to make it work properly.

```ts{2}
// src/daos/user-dao.ts
import { revalidatePath } from "next/cache";
```

Now the page will refresh after the upvote Server Action. This ensures that the user sees the updated upvote count immediately after clicking the button.

# Refresh Page vs Display Toast

To test another real-world scenario, we'll add a delete Server Action that removes a user. However, deleting a user introduces an interesting issue related to toast feedback.

```tsx{7-10,17-23}
// src/components/user.tsx
const User = ({ user }: UserProps) => {
  const [upvoteState, upvoteAction, upvotePending] = useActionState( ... );

  const [downvoteState, downvoteAction, downvotePending] = useActionState( ... );

  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteUser.bind(null, user.id),
    { message: "", timestamp: Date.now() }
  );

  return (
    <div className="flex gap-x-2">
      {user.name} ({user.upvotes})
      <FormButton ... >Upvote</FormButton>
      <FormButton ... >Downvote</FormButton>
      <FormButton
        action={deleteAction}
        actionState={deleteState}
        pending={deletePending}
      >
        Delete
      </FormButton>
    </div>
  );
};
```

Do not forget the import for the new Server Action:

```tsx{2}
// src/components/user.tsx
import { deleteUser, downvoteUser, upvoteUser } from "@/daos/user-dao";
```

And next we implement the Server Action to delete a user:

```ts
// src/daos/user-dao.ts
export const deleteUser = async (userId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    return { message: "User not found", timestamp: Date.now() };
  }

  users.splice(index, 1);

  revalidatePath("/");

  return { message: "User deleted", timestamp: Date.now() };
};
```

The Server Action works as expected, but the toast message is not displayed because the page refreshes immediately after the Server Action completes. As a result, we never have the chance to compute the returned action state, since the component is unmounted due to the page refresh. This is a classic case of a race condition, where the component's lifecycle is interrupted before the state can be processed.

To work around this issue, I implemented a solution where the page is refreshed on the client-side, rather than on the server-side, after the Server Action is performed. This ensures that the toast message is displayed before the refresh occurs.

First, we remove the server-side cache invalidation from the delete Server Action:

```ts{14-17}
// src/daos/user-dao.ts
export const deleteUser = async (userId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    return { message: "User not found", timestamp: Date.now() };
  }

  users.splice(index, 1);

  await new Promise((resolve) => setTimeout(resolve, 250));

  // revalidatePath("/");
  // see refreshAllUnfortunatelyOnClient() as alternative/workaround
  // otherwise we do not see toast message for deleteUser
  // due to invalidate + unmount before toast is shown

  return { message: "User deleted", timestamp: Date.now() };
};
```

Second, we add a client-side application-wide cache refresh to the component:

```tsx{3,9,20}
// src/components/user.tsx
const User = ({ user }: UserProps) => {
  const router = useRouter();

  const [upvoteState, upvoteAction, upvotePending] = useActionState( ... );
  const [downvoteState, downvoteAction, downvotePending] = useActionState( ... );
  const [deleteState, deleteAction, deletePending] = useActionState( ... );

  const refreshAllUnfortunatelyOnClient = () => router.refresh();

  return (
    <div className="flex gap-x-2">
      {user.name} ({user.upvotes})
      <FormButton ... >Upvote</FormButton>
      <FormButton ... >Downvote</FormButton>
      <FormButton
        action={deleteAction}
        actionState={deleteState}
        pending={deletePending}
        onSuccess={refreshAllUnfortunatelyOnClient}
      >
        Delete
      </FormButton>
    </div>
  );
};
```

Do not forget the import for the client-side router:

```tsx{2}
// src/components/user.tsx
import { useRouter } from "next/navigation";
```

The FormButton component already accepts an onSuccess prop, but it hasn't been used yet. Let's update the component to call this prop optionally whenever it's provided. This way, if the onSuccess function is passed to the component, it will be executed after a successful action, giving us more flexibility in handling success scenarios.

```tsx{6}
// src/components/form-button.tsx
useEffect(() => {
  if (actionState && actionState.message && isUpdate) {
    toast({ description: actionState.message });

    onSuccess?.();
  }

  prevTimestamp.current = actionState.timestamp;
}, [actionState, isUpdate, onSuccess, toast]);
```

Now, we are performing a full client-side cache invalidation after the Server Action, which isn't ideal. However, this workaround allows us to display the toast message in Next.js for components that are unmounting after the Server Action. A better solution would be to trigger the toast message alongside the server-side cache invalidation, ensuring a more seamless user experience. Unfortunately, this doesn't seem possible with the current setup.

<Divider />

We learned how to implement React Server Actions with Toast Feedback by:

- Fetching data using a Server Component.
- Performing Server Actions such as upvoting, downvoting, and deleting users.
- Displaying toast messages for successful and failed actions.
- Handling Next.js caching issues by refreshing the page.
- Avoiding race conditions by ensuring toast messages appear before page refreshes.

This approach provides a better user experience by giving instant feedback while keeping the UI up to date. With these concepts, you can now apply toast feedback to other Server Actions in your React applications.