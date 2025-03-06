---
title: "React Server Actions with Toast Feedback"
description: "Learn how to display toast notifications from React Server Actions in React (and Next.js) ..."
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

Therefore we'll create a React Server Component that fetches user data and then allow users to upvote, downvote, and delete entries from a Client Component. Each React Server Action will trigger a toast message to provide real-time feedback for the happy and the unhappy path with error handling.

After this tutorial, you'll have a solid understanding of how to implement toast notifications for Server Actions in React. Let's get started!

# React Server Component with Toast

In this tutorial, we start with a basic page implemented as a React Server Component that fetches user data. To keep our code organized and maintainable, we use the [Data Access Object (DAO)](https://en.wikipedia.org/wiki/Data_access_object) pattern to separate the data access logic from the component.

<ReadMore label="React Folder Structure" link="/react-folder-structure/" />

However, feel free to use any design pattern that suits your project's needs.

```tsx
// src/app/page.tsx
import { getUsers } from "@/features/user/user-dao";
import { UserItem } from "@/features/user/user-item";

const Home = async () => {
  const users = await getUsers();

  return (
    <div>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Home;
```

For simplicity, we'll use an in-memory array to store user data in this tutorial. This approach allows us to focus on implementing [Server Actions](/next-server-actions/) and toast feedback without the complexity of setting up a database. So let's set up the DAO.

<ReadMore label="Next.js with Prisma and SQLite" link="/next-prisma-sqlite/" />

We'll also add an artificial delay to simulate real-world data fetching scenarios.

```ts
// src/features/user/user-dao.ts
const users = [
  {
    id: "1",
    name: "Alice",
    upvotes: 0,
  },
  {
    id: "2",
    name: "Bob",
    upvotes: 0,
  },
];

export const getUsers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  return users;
};
```

Since we'll be using [React hooks](/react-hooks/) to manage state and interactions, the User component needs to be a Client Component. This ensures that JavaScript runs on the client side, enabling interactive features like showing a toast notification or form validation:

```tsx
// src/features/user/user-item.tsx
"use client";

type UserItemProps = {
  user: {
    id: string;
    name: string;
    upvotes: number;
  };
};

const UserItem = ({ user }: UserItemProps) => {
  return (
    <div>
      {user.name} ({user.upvotes})
    </div>
  );
};

export { UserItem };
```

From here we'll implement three different Server Actions in this User component:

- Upvoting a user – Increases a user's upvotes count.
- Downvoting a user – Simulates an error scenario. (follow up tutorial)
- Deleting a user – Removes the user and refreshes the page. (follow up tutorial)

Each action will trigger a toast notification, providing feedback to the user.

# Toaster Setup in React

To display feedback messages, we need to install a toaster notification package. You can use any package you like or create a custom solution. We use a third-party:

```sh
npm install sonner
```

Once installed, we must import and add the Toaster component in the most top-level component. This ensures that toast notifications are globally available:

```tsx{2,9}
// src/app/layout.tsx
import { Toaster } from "sonner";

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

# Server Action with Toast Feedback

To allow users to upvote, we need to define a Server Action inside our DAO file. This function will find the user and increment their upvote count for the in-memory array. To simulate real-world conditions, we'll add a slight delay before returning a response.

```ts{6-21}
// src/features/user/user-dao.ts
export const getUsers = async () => {
  ...
};

export const upvoteUser = async (formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const userId = formData.get("userId");

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return { message: "User not found", status: "ERROR" };
  }

  user.upvotes += 1;

  revalidatePath("/");

  return { message: "User upvoted", status: "SUCCESS" };
};
```

Note that we are returning feedback for the happy and the unhappy path here. While we will only see the happy path in this case, the implementation of the unhappy path is important for a complete Server Action.

In addition, we also used a Next.js specific function [revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath) to refresh the page after the Server Action. This ensures that the user sees the updated upvote count immediately after clicking the button. Depending on the framework you are using, you might need to refresh the page after the Server Action to see the updated data:

```tsx
// src/features/user/user-dao.ts
import { revalidatePath } from "next/cache";
```

Since this function runs on the server, we need to mark the file with the "use server" directive. This tells React that the functions inside this file should execute on the server which would later allow us to access a database or other server-side resources:

```ts{2}
// src/features/user/user-dao.ts
"use server";
```

Now that the Server Action is ready, we need to trigger it from the client-side within our User component. This allows us to handle the returned object and display the toast message imperatively. We'll use a form with a submit button to trigger the action:

```tsx{3-13,18-21}
// src/features/user/user-item.tsx
const UserItem = ({ user }: UserItemProps) => {
  const upvoteAction = async (formData: FormData) => {
    const result = await upvoteUser(formData);

    if (result.message && result.status === "SUCCESS") {
      toast.success(result.message);
    }

    if (result.message && result.status === "ERROR") {
      toast.error(result.message);
    }
  };

  return (
    <div>
      {user.name} ({user.upvotes})
      <form action={upvoteAction}>
        <input type="hidden" name="userId" value={user.id} />
        <button type="submit">Upvote</button>
      </form>
    </div>
  );
};
```

The action is triggered by submitting the form, which calls the `upvoteAction` function. The handler function awaits the result of the Server Action and displays the returned message in a toast notification either as a success or error message.

This could also be done with a form button in addition to using JavaScript's bind method instead of a hidden input field for passing the user ID as a parameter.

<ReadMore label="React Form Button" link="/react-form-button/" />

<ReadMore label="Extra Arguments for Server Actions in React Forms" link="/react-form-server-action-extra-arguments/" />

For the complete implementation, do not forget the imports at the top of the file:

```tsx{4-5}
// src/features/user/user-item.tsx
"use client";

import { toast } from "sonner";
import { upvoteUser } from "./user-dao";
```

As a bonus, you could also add a loading state to the button with [React's useTransition Hook](https://react.dev/reference/react/useTransition) to indicate that the action is being processed and prevent multiple submissions:

```tsx{3,6,16,24-26}
// src/features/user/user-item.tsx
const UserItem = ({ user }: UserItemProps) => {
  const [isPending, startTransition] = useTransition();

  const upvoteAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await upvoteUser(formData);

      if (result.message && result.status === "SUCCESS") {
        toast.success(result.message);
      }

      if (result.message && result.status === "ERROR") {
        toast.error(result.message);
      }
    });
  };

  return (
    <div>
      {user.name} ({user.upvotes})
      <form action={upvoteAction}>
        <input type="hidden" name="userId" value={user.id} />
        <button type="submit" disabled={isPending}>
          {isPending ? "Upvoting" : "Upvote"}
        </button>
      </form>
    </div>
  );
};
```

Do not forget to import React's `useTransition` Hook at the top of the file:

```tsx{2}
// src/features/user/user-item.tsx
import { useTransition } from "react";
```

You can also show a loading toast message while the action is being processed. This can be done by adding a toast message before the Server Action is called and removing it after the action is completed:

```tsx{4,6-18}
// src/features/user/user-item.tsx
const upvoteAction = async (formData: FormData) => {
  startTransition(async () => {
    const promise = upvoteUser(formData);

    toast.promise(promise, {
      loading: "Upvoting ...",
      success: (result) => {
        if (result.message && result.status === "SUCCESS") {
          return result.message;
        }
      },
      error: (result) => {
        if (result.message && result.status === "ERROR") {
          return result.message;
        }
      },
    });
  });
};
```

This is how you can implement toast for Server Actions in React. You can now upvote users and see the toast message displayed in real-time for success and error states. We've also learned how to show a loading state while the action is being processed.

<ReadMore label="Loading States in React Forms" link="/react-form-loading-pending-action/" />

If you are not using **React's useActionState Hook**, you do not need to read any further. But if you are using it, you might be interested in the next sections.

# React's useActionState Hook for Toast

[React's useActionState Hook](https://react.dev/reference/react/useActionState) is used whenever you deal with actual action state which gets passed between the client and the server. It is a powerful tool to manage the state of a Server Action and its feedback. In this tutorial, we'll explore how to use the useActionState Hook to show toast notifications for Server Actions in React.

When using React's useActionState Hook, we would implement it the following way without showing the toast message yet. It receives a Server Action and an initial state object. The returned enhanced action can then be used in the form's action attribute, so we do not call it imperatively which makes it difficult to show the toast message:

```tsx{3-6,11-16}
// src/features/user/user-item.tsx
const UserItem = ({ user }: UserItemProps) => {
  const [actionState, upvoteAction, upvotePending] = useActionState(
    upvoteUser,
    null
  );

  return (
    <div>
      {user.name} ({user.upvotes})
      <form action={upvoteAction}>
        <input type="hidden" name="userId" value={user.id} />
        <button type="submit" disabled={upvotePending}>
          {upvotePending ? "Upvoting" : "Upvote"}
        </button>
      </form>
    </div>
  );
};
```

We will not be using the actionState here, because we will not show off form field validation. But we are using the action and pending state as you can see in the form.

```tsx{2}
// src/features/user/user-item.tsx
const [, upvoteAction, upvotePending] = useActionState(
  upvoteUser,
  null
);
```

For what it's worth, here you could use the same strategy of using JavaScript's bind method instead of a hidden input field for passing the user ID as a parameter.

<ReadMore label="React Form Validation" link="/react-form-validation/" />

Do not forget the new import at the top of the file:

```tsx{2}
// src/features/user/user-item.tsx
import { useActionState } from "react";
```

Since we are using React's useActionState Hook, the function signature of the Server Action has to be adjusted to receive the form data as an additional parameter:

```ts{3,12,19}
// src/features/user/user-dao.ts
export const upvoteUser = async (
  actionState: ActionState,
  formData: FormData
) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const userId = formData.get("userId");

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return toActionState("User not found", "ERROR");
  }

  user.upvotes += 1;

  revalidatePath("/");

  return toActionState("User upvoted", "SUCCESS");
};
```

In addition, we are returning the action state object from a helper function called toActionState. This function is used to create the action state object with a message and a status for us in a more convenient way. After all, it's an optional addition:

```ts
// src/features/user/user-dao.ts
const toActionState = (
  message: string,
  status: "SUCCESS" | "ERROR"
): ActionState => {
  return { message, status };
};
```

And last but not least, we also introduced a reusable type in a separate file for the action state object. This type is used to define the shape of the action state object that is passed between the client and the server with React's useActionState Hook:

```ts
// src/type.ts
export type ActionState =
  | {
      message: string;
      status: "SUCCESS" | "ERROR";
    }
  | null // initial state
  | undefined; // if server action does not return anything
```

Finally the feature is complete and you can now upvote users. But there is no feedback shown yet. We only implemented (and enhanced) the upvoting feature with the new useActionState Hook to manage the state of the Server Action.

<Divider />

Now we could try the same imperative approach as before to show the toast message. But we will see that it doesn't work as expected for the commented reasons below:

```tsx{5-10,15}
// src/features/user/user-item.tsx
const UserItem = ({ user }: UserItemProps) => {
  const [, upvoteAction, upvotePending] = useActionState(upvoteUser, null);

  const handleUpvote = async (formData: FormData) => {
    const result = await upvoteAction(formData);

    console.log(result);
    // undefined
  };

  return (
    <div>
      {user.name} ({user.upvotes})
      <form action={handleUpvote}>
        ...
      </form>
    </div>
  );
};
```

The returned result from the enhanced Server Action is undefined because the Server Action returned from React's useActionState Hook cannot be called imperatively. Instead, it is called by the form's action attribute. This makes it difficult to show the toast message imperatively.

We will have to find another way to show the toast message when the Server Action is completed. So let's explore how to show the toast message when using React's useActionState Hook in the next tutorial. There are two ways to do it:

<LinkCollection label="This tutorial is part 1 of 2 in the series." links={[{ prefix: "Part 2:", label: "Server Actions with Toast and useActionState (Recommended)", url: "/react-server-actions-toast-useactionstate/" }]} />

<LinkCollection label="This tutorial is part 1 of 2 in the series." links={[{ prefix: "Part 2:", label: "Server Actions with Toast and useActionState and useEffect (Alternative)", url: "/react-server-actions-useactionstate-toast/" }]} />