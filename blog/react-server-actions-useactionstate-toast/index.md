---
title: "Server Actions with Toast (useEffect)"
description: "Learn how to display toast notifications from React Server Actions in React (and Next.js) with useEffect and useActionState ..."
date: "2025-03-10T08:52:46+02:00"
categories: ["React"]
keywords: ["react server action toast useeffect"]
hashtags: ["#ReactJS"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

In this tutorial we want to explore how to show toast notifications for Server Actions in React when using React's useActionState Hook in combination with useEffect.

<LinkCollection label="This tutorial is part 2 of 2 in the series." links={[{ prefix: "Part 1:", label: "React Server Actions with Toast Feedback", url: "/react-server-actions-toast/" }]} />

<ReadMore label="Toast with useActionState (Alternative, Recommended)" link="/react-server-actions-toast-useactionstate/" />

Feel free to check out the whole implementation in the [GitHub repository](https://github.com/rwieruch/examples/tree/main/next-toast-feedback-server-actions).

# Return Toast Response from Server Action

In preparation for displaying toast notifications, we need to adjust our Server Action to return a response object that includes an additional timestamp which will allow us to execute callback functions in React's useEffect Hook later:

```ts{6}
// src/features/user/user-dao.ts
const toActionState = (
  message: string,
  status: "SUCCESS" | "ERROR"
): ActionState => {
  return { message, status, timestamp: Date.now() };
};
```

We also need to adjust the type definition for the Server Action's response object:

```ts{6}
// src/type.ts
export type ActionState =
  | {
      message: string;
      status: "SUCCESS" | "ERROR";
      timestamp: number;
    }
  | null
  | undefined;
```

Unfortunately, including the timestamp is necessary to prevent displaying outdated toast messages. We only want to show the toast messages once and not with every re-render of the component.

For the sake of completeness, the Server Action that we created in the previous tutorial:

```ts
// src/features/user/user-dao.ts
export const upvoteUser = async (
  _actionState: ActionState,
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

# Receive Toast Feedback in Client Component

To manage Server Action's state, we use [React's useActionState Hook](https://react.dev/reference/react/useActionState). This hook allows us in a Client Component to transfer state between the client and server with a Server Action. We pass the Server Action function and an initial empty state object to the hook:

```tsx{3,11-21}
// src/features/user/user-item.tsx
const UserItem = ({ user }: UserItemProps) => {
  const [upvoteState, upvoteAction, upvotePending] = useActionState(
    upvoteUser,
    null
  );

  return (
    <div>
      {user.name} ({user.upvotes})
      <Form
        action={upvoteAction}
        actionState={upvoteState}
        pending={upvotePending}
      >
        <input type="hidden" name="userId" value={user.id} />

        <button type="submit" disabled={upvotePending}>
          {upvotePending ? "Upvoting..." : "Upvote"}
        </button>
      </Form>
    </div>
  );
};
```

Do not forget the imports at the top of the file:

```tsx{2}
// src/features/user/user-item.tsx
import { Form } from "@/components/form-button";
```

We also use a handcrafted Form component which will allow us later to implement the toast notification by listening to the changing state of the Server Action. We encapsulate this in a Form component to make it reusable for other components later.

```tsx
// src/components/form.tsx
"use client";

import { ActionState } from "@/type";

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  pending: boolean;
  onSuccess?: () => void;
  children: React.ReactNode;
};

const Form = ({
  action,
  actionState,
  pending,
  onSuccess,
  children,
}: FormProps) => {
  return <form action={action}>{children}</form>;
};

export { Form };
```

Not all props are used yet, but we will use them later for different use cases.

When you interact with the button, there is no toast message yet because we will have to implement this toast feedback in the form button component. But the Server Action is already triggered and the user's upvotes are increased.

# Show Toast Notification

Now that we have a button triggering the Server Action, we need to display a toast notification when the action completes. The simplest approach is to use [React's useEffect Hook](/react-useeffect-hook/) inside the form button component to listen for changes of the server Action's state and display the message with the toast function:

```tsx{4-5,11-15}
// src/components/form.tsx
"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { ActionState } from "@/type";

type FormProps = { ... };

const Form = ( ... ) => {
  useEffect(() => {
    if (actionState && actionState.message) {
      toast(actionState.message);
    }
  }, [actionState]);

  return <form action={action}>{children}</form>;
};
```

However, simply displaying the toast inside useEffect is not reliable. If the component re-renders, it might show an old toast message even if no new action was triggered. To prevent duplicate toasts, we use the timestamp to track when the state was last updated:

```tsx{4,11-12,15,19-20}
// src/components/form.tsx
"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { ActionState } from "@/type";

type FormProps = { ... };

const Form = ( ... ) => {
  const prevTimestamp = useRef(actionState?.timestamp);
  const isUpdate = prevTimestamp.current !== actionState?.timestamp;

  useEffect(() => {
    if (actionState && actionState.message && isUpdate) {
      toast(actionState.message);
    }

    prevTimestamp.current = actionState?.timestamp;
  }, [actionState, isUpdate]);

  return <form action={action}>{children}</form>;
};
```

The timestamp serves as a crucial [reference](/react-ref/) for tracking changes in the action state. By comparing the current timestamp with the previous one, we can determine if the action state has changed. If there's a change, we display the new toast message.

Next we are going to include the status of the toast notification by either showing a success or error toast message depending on the status of the action state:

```tsx{4,6,8,10}
// src/components/form.tsx
useEffect(() => {
  if (actionState && actionState.message && isUpdate) {
    if (actionState.status === "SUCCESS") {
      toast.success(actionState.message);
    }

    if (actionState.status === "ERROR") {
      toast.error(actionState.message);
    }
  }

  prevTimestamp.current = actionState?.timestamp;
}, [actionState, isUpdate]);
```

Last but not least, we will show a pending toast message when the action is still pending:

```tsx{5,7-20}
// src/components/form.tsx
const Form = ( ... ) => {
  ...

  const pendingToastId = useRef<null | string | number>(null);

  useEffect(() => {
    if (!pending && pendingToastId.current) {
      toast.dismiss(pendingToastId.current);
      pendingToastId.current = null;
    } else if (pending && !pendingToastId.current) {
      pendingToastId.current = toast.loading("Loading...");
    }

    return () => {
      if (pendingToastId.current) {
        toast.dismiss(pendingToastId.current);
      }
    };
  }, [pending]);

  return <form action={action}>{children}</form>;
};
```

This setup already represents a minimal implementation of toasts: the Server Action returns both a message and a timestamp and the Client Component is responsible for displaying this information. In this minimal scenario, the FormButton abstraction wouldn't even be necessary, but it will be a good practice when there are more components that need to trigger Server Actions in the future.

# Toast for failed Server Action

To demonstrate how to handle errors, we'll add a downvote Server Action that always returns an error message. This will allow us to test how our app handles failed Server Actions and displays appropriate toast notifications.

```ts
// src/features/user/user-dao.ts
export const downvoteUser = async (): Promise<ActionState> => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  // force error for debugging purposes
  return toActionState("Something went wrong", "ERROR");
};
```

Next, we add a new button in the User component that calls the new Server Action. When the action fails, it should trigger a toast notification informing the user that something went wrong:

```tsx{5-8,14-22}
// src/features/user/user-item.tsx
const UserItem = ({ user }: UserProps) => {
  const [upvoteState, upvoteAction, upvotePending] = useActionState( ... );

  const [downvoteState, downvoteAction, downvotePending] = useActionState(
    downvoteUser,
    null
  );

  return (
    <div>
      {user.name} ({user.upvotes})
      <Form ... > ... </Form>
      <Form
        action={downvoteAction}
        actionState={downvoteState}
        pending={downvotePending}
      >
        <button type="submit" disabled={downvotePending}>
          {downvotePending ? "Downvoting..." : "Downvote"}
        </button>
      </Form>
    </div>
  );
};
```

Do not forget the import for the new Server Action:

```tsx{2}
// src/features/user/user-item.tsx
import { downvoteUser, upvoteUser } from "./user-dao";
```

Now, when you click the new button, you should see a toast message displaying the failed Server Action message.

# Refresh Page vs Display Toast

To test another real-world scenario, we'll add a delete Server Action that removes a user. However, deleting a user introduces an interesting issue related to toast feedback.

```tsx{5-8,13-23}
// src/features/user/user-item.tsx
const UserItem = ({ user }: UserItemProps) => {
  ...

  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteUser,
    null
  );

  return (
    <div>
      ...
      <Form
        action={deleteAction}
        actionState={deleteState}
        pending={deletePending}
      >
        <input type="hidden" name="userId" value={user.id} />

        <button type="submit" disabled={deletePending}>
          {deletePending ? "Deleting..." : "Delete"}
        </button>
      </Form>
    </div>
  );
};
```

Do not forget the import for the new Server Action:

```tsx{2}
// src/features/user/user-item.tsx
import { deleteUser, downvoteUser, upvoteUser } from "./user-dao";
```

And next we implement the Server Action to delete a user:

```ts
// src/features/user/user-dao.ts
export const deleteUser = async (
  _actionState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const userId = formData.get("userId");

  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    return toActionState("User not found", "ERROR");
  }

  users.splice(index, 1);

  revalidatePath("/");

  return toActionState("User deleted", "SUCCESS");
};
```

The Server Action works as expected, but the success toast message is not displayed because the page refreshes immediately after the Server Action completes. As a result, we never have the chance to compute the returned action state, since the component is unmounted due to the page refresh. This is a classic case of a race condition, where the component's lifecycle is interrupted before the state can be processed.

This is an important reason why I suggest to go with the [alternative approach](/react-server-actions-toast-useactionstate/), which handles the toast message independently from the page refreshes and component unmounts.

To work around this issue, I implemented a solution where the page is refreshed on the client-side, rather than on the server-side, after the Server Action is performed. This ensures that the toast message is displayed before the refresh occurs.

First, we remove the server-side cache invalidation from the delete Server Action:

```ts{14-17}
// src/features/user/user-dao.ts
export const deleteUser = async ( ... ): Promise<ActionState> => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const userId = formData.get("userId");

  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    return toActionState("User not found", "ERROR");
  }

  users.splice(index, 1);

  // revalidatePath("/");
  // see refreshAllUnfortunatelyOnClient() as alternative/workaround
  // otherwise we do not see toast message for deleteUser
  // due to invalidate + unmount before toast is shown

  return toActionState("User deleted", "SUCCESS");
};
```

Second, we add a client-side application-wide cache refresh to the component:

```tsx{3,14}
// src/features/user/user-item.tsx
const UserItem = ({ user }: UserItemProps) => {
  const router = useRouter();

  ...

  return (
    <div>
      ...
      <Form
        action={deleteAction}
        actionState={deleteState}
        pending={deletePending}
        onSuccess={() => router.refresh()}
      >
        <input type="hidden" name="userId" value={user.id} />

        <button type="submit" disabled={deletePending}>
          {deletePending ? "Deleting..." : "Delete"}
        </button>
      </Form>
    </div>
  );
};
```

Do not forget the import for the client-side router:

```tsx{2}
// src/features/user/user-item.tsx
import { useRouter } from "next/navigation";
```

The FormButton component already accepts an onSuccess prop, but it hasn't been used yet. Let's update the component to call this prop optionally whenever it's provided. This way, if the onSuccess function is passed to the component, it will be executed after a successful action:

```tsx{12,16}
// src/components/form.tsx
useEffect(() => {
  if (actionState && actionState.message && isUpdate) {
    if (actionState.status === "SUCCESS") {
      toast.success(actionState.message);
    }

    if (actionState.status === "ERROR") {
      toast.error(actionState.message);
    }

    onSuccess?.();
  }

  prevTimestamp.current = actionState?.timestamp;
}, [actionState, isUpdate, onSuccess]);
```

Now, we are performing a full client-side cache invalidation after the Server Action, which isn't ideal. However, this workaround allows us to display the toast message in Next.js for components that are unmounting after the Server Action. A better solution would be to trigger the toast message alongside the server-side cache invalidation, ensuring a more seamless user experience. Unfortunately, this doesn't seem possible with the current setup.

<Divider />

The example has shown you how to listen reactively to Server Actions in React and display toast notifications accordingly. We've also referenced the alternative approach which handles toast messages independently from page refreshes and component unmounts.

In this tutorial, we learned how to implement React Server Actions with Toasts:

- Fetching data using a Server Component.
- Performing Server Actions such as upvoting, downvoting, and deleting users.
- Displaying toast messages for successful and failed actions.
- Displaying a loading toast message when an action is pending.
- Handling Next.js caching issues by refreshing the page.
- Avoiding race conditions by ensuring toast messages appear before page refreshes.

If you enjoyed this tutorial and want to dig deeper into this topic, feel free to check out the alternative approach which has been referenced in this tutorial.