---
title: "Server Actions with Toast (useActionState)"
description: "Learn how to display toast notifications from React Server Actions in React (and Next.js) with useActionState ..."
date: "2025-03-06T08:51:46+02:00"
categories: ["React"]
keywords: ["react server action toast useActionState"]
hashtags: ["#ReactJS"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

In this tutorial we want to explore how to show toast notifications for Server Actions in React when using React's useActionState Hook.

*Note: This tutorial has been created following an insightful discussion with [Sebastien](https://x.com/sebastienlorber) on X. He suggested an [improved solution](https://x.com/sebastienlorber/status/1897313608167837998) to my [original approach](https://x.com/rwieruch/status/1896961335067594762), which we'll explore together. A big thanks to Sebastien for his valuable input.*

<LinkCollection label="This tutorial is part 2 of 2 in the series." links={[{ prefix: "Part 1:", label: "React Server Actions with Toast Feedback", url: "/react-server-actions-toast/" }]} />

<ReadMore label="Toast with useActionState (Alternative, but not Recommended)" link="/react-server-actions-useactionstate-toast/" />

Feel free to check out the whole implementation in the [GitHub repository](https://github.com/rwieruch/examples/tree/main/next-toast-feedback).

# Toast with useActionState

It's important to note that we will implement all the heavy lifting ourselves next. At the end, you have reusable primitives which will allow you to implement toast notifications with Server Actions when using React's useActionState Hook. However, if you don't want to implement the utilities yourself, check out [next-safe-action](https://next-safe-action.dev/).

Let's start with the initial implementation which should already work but which is not showing any toast notifications yet. We will implement the toast notifications afterward:

```tsx
// src/features/user/user-item.tsx
const UserItem = ({ user }: UserItemProps) => {
  const [, upvoteAction, upvotePending] = useActionState(upvoteUser, null);

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

To show toast notifications when using React's useActionState Hook, we literally hook into the server action's functionality. So let's wrap the Server Action with a higher-order function (HoF) that will allow us to add callback functions to the Server Action:

```tsx{3}
// src/features/user/user-item.tsx
const [, upvoteAction, upvotePending] = useActionState(
  withCallbacks(upvoteUser),
  null
);
```

The initial implementation of the higher-order function does not enhance the passed function in any way. It just calls the function and returns the result. We already know that this result is a promise, because the Server Action is an asynchronous function:

```ts
// src/features/user/user-item.tsx
const withCallbacks = <Args extends unknown[], T extends ActionState>(
  fn: (...args: Args) => Promise<T>
): ((...args: Args) => Promise<T>) => {
  return async (...args: Args) => {
    const promise = fn(...args);

    return promise;
  };
};
```

Without the type definitions, the higher-order function looks simpler. Essentially, it forwards the arguments to the Server Action and returns the promise:

```ts
// src/features/user/user-item.tsx
const withCallbacks = (fn) => {
  return async (...args) => {
    const promise = fn(...args);

    return promise;
  };
};
```

Feel free to move this utility to another file to make it reusable across files.

Now comes the actual enhancement in the higher-order function. First, we want to provide as a second argument callback functions for the success and error case. These callback functions will be called when the Server Action is completed:

```tsx{3}
// src/features/user/user-item.tsx
const [, upvoteAction, upvotePending] = useActionState(
  withCallbacks(upvoteUser, toastCallbacks),
  null
);
```

Second, we define the toastCallbacks object with two functions: one for the success case and one for the error case. Later we will add more callbacks in this object. Furthermore, this object could be defined for reusability in a separate file as well:

```tsx{2-13}
// src/features/user/user-item.tsx
const toastCallbacks = {
  onSuccess: (result: ActionState) => {
    if (result?.message) {
      toast.success(result.message);
    }
  },
  onError: (result: ActionState) => {
    if (result?.message) {
      toast.error(result.message);
    }
  },
};

const UserItem = ({ user }: UserItemProps) => {
  ...
};
```

And third, we need to add the second argument to the higher-order function as type definition and implementation detail. The latter will call these functions when the Server Action completes and passes the result for success and error cases to the callbacks:

```tsx{2-5,9,14,16-18,20-22}
// src/features/user/user-item.tsx
type Callbacks<T> = {
  onSuccess?: (result: T) => void;
  onError?: (result: T) => void;
};

const withCallbacks = <Args extends unknown[], T extends ActionState>(
  fn: (...args: Args) => Promise<T>,
  callbacks: Callbacks<T>
): ((...args: Args) => Promise<T>) => {
  return async (...args: Args) => {
    const promise = fn(...args);

    const result = await promise;

    if (result?.status === "SUCCESS") {
      callbacks.onSuccess?.(result);
    }

    if (result?.status === "ERROR") {
      callbacks.onError?.(result);
    }

    return promise;
  };
};
```

While we are able to hook into the the Server Action with the `withCallbacks`, we decoupled the actual implementation logic into the callbacks. This way we can reuse the `withCallbacks` for other Server Actions and may provide different callback functions for different actions.

The toast feedback should now work as expected when upvoting users. The implementation to get here may be a bit more complex, but it provides a more flexible and reusable solution for adding callback functions to Server Actions.

# Toast for loading Server Action

Next we want to show a toast notification for a pending Server Action. This is useful to inform the user that the action is being processed. We'll add a loading toast message when the Server Action is triggered and remove it when the action is completed.

First, we add a loading toast message to the `withCallbacks` higher-order function:

```tsx{3-8}
// src/features/user/user-item.tsx
const toastCallbacks = {
  onStart: () => {
    return toast.loading("Loading ...");
  },
  onEnd: (reference: string | number) => {
    toast.dismiss(reference);
  },
  onSuccess: (result: ActionState) => {
    if (result?.message) {
      toast.success(result.message);
    }
  },
  onError: (result: ActionState) => {
    if (result?.message) {
      toast.error(result.message);
    }
  },
};
```

Second, to make the toast callbacks reusable for other pending states, you can pass in the text for the loading toast message as a parameter:

```tsx{2,4-5,7,22-23}
// src/features/user/user-item.tsx
type CreateToastCallbacksOptions = { loadingMessage?: string };

const createToastCallbacks = (options: CreateToastCallbacksOptions) => {
  return {
    onStart: () => {
      return toast.loading(options.loadingMessage || "Loading ...");
    },
    onEnd: (reference: string | number) => {
      toast.dismiss(reference);
    },
    onSuccess: (result: ActionState) => {
      if (result?.message) {
        toast.success(result.message);
      }
    },
    onError: (result: ActionState) => {
      if (result?.message) {
        toast.error(result.message);
      }
    },
  };
};
```

Third, we add the new callbacks to the type definition with [TypeScript generics](/typescript-generics/):

```tsx{2-4}
// src/features/user/user-item.tsx
type Callbacks<T, R = unknown> = {
  onStart?: () => R;
  onEnd?: (reference: R) => void;
  onSuccess?: (result: T) => void;
  onError?: (result: T) => void;
};
```

Last but not least, we adjust the `withCallbacks` higher-order function to call the `onStart` and `onEnd` callbacks when the Server Action is triggered and completed:

```tsx{5,8,13,17-19}
// src/features/user/user-item.tsx
const withCallbacks = <
  Args extends unknown[],
  T extends ActionState,
  R = unknown
>(
  fn: (...args: Args) => Promise<T>,
  callbacks: Callbacks<T, R>
): ((...args: Args) => Promise<T>) => {
  return async (...args: Args) => {
    const promise = fn(...args);

    const reference = callbacks.onStart?.();

    const result = await promise;

    if (reference) {
      callbacks.onEnd?.(reference);
    }

    if (result?.status === "SUCCESS") {
      callbacks.onSuccess?.(result);
    }

    if (result?.status === "ERROR") {
      callbacks.onError?.(result);
    }

    return promise;
  };
};
```

And finally use the new function in the `withCallbacks` higher-order function:

```tsx{5-7}
// src/features/user/user-item.tsx
const [, upvoteAction, upvotePending] = useActionState(
  withCallbacks(
    upvoteUser,
    createToastCallbacks({
      loadingMessage: "Upvoting ...",
    })
  ),
  null
);
```

This way you can show a loading toast when the Server Action is triggered and remove it when the action is completed. In the next section, we will give an overview of what we have achieved by putting all reusable parts into separate files.

# Reusable Server Action Callbacks

To recap, we want to extract the `withCallbacks` and `toastCallbacks` to separate files to make them reusable across files. This way we can use the same toast feedback for other Server Actions in our application.

In addition, this allows us to see all the files in their entirety without the need to scroll up and down. First, we extract the `withCallbacks` HoF to a separate file:

```ts
// src/utils/action-state-callback/with-callbacks.ts
import { ActionState } from "@/type";

type Callbacks<T, R = unknown> = {
  onStart?: () => R;
  onEnd?: (reference: R) => void;
  onSuccess?: (result: T) => void;
  onError?: (result: T) => void;
};

export const withCallbacks = <
  Args extends unknown[],
  T extends ActionState,
  R = unknown
>(
  fn: (...args: Args) => Promise<T>,
  callbacks: Callbacks<T, R>
): ((...args: Args) => Promise<T>) => {
  return async (...args: Args) => {
    const promise = fn(...args);

    const reference = callbacks.onStart?.();

    const result = await promise;

    if (reference) {
      callbacks.onEnd?.(reference);
    }

    if (result?.status === "SUCCESS") {
      callbacks.onSuccess?.(result);
    }

    if (result?.status === "ERROR") {
      callbacks.onError?.(result);
    }

    return promise;
  };
};
```

And second, we extract the `createToastCallbacks` function to a separate file:

```ts
// src/utils/action-state-callback/toast-callbacks.ts
import { toast } from "sonner";
import { ActionState } from "@/type";

type CreateToastCallbacksOptions = { loadingMessage?: string };

export const createToastCallbacks = (options: CreateToastCallbacksOptions) => {
  return {
    onStart: () => {
      return toast.loading(options.loadingMessage || "Loading ...");
    },
    onEnd: (reference: string | number) => {
      toast.dismiss(reference);
    },
    onSuccess: (result: ActionState) => {
      if (result?.message) {
        toast.success(result.message);
      }
    },
    onError: (result: ActionState) => {
      if (result?.message) {
        toast.error(result.message);
      }
    },
  };
};
```

Finally all utilities can be used in a lightweight way in the User component:

```tsx
"use client";

import { useActionState } from "react";
import { createToastCallbacks } from "@/utils/action-state-callback/toast-callbacks";
import { withCallbacks } from "@/utils/action-state-callback/with-callback";
import { upvoteUser } from "./user-dao";

const useUpvoteUser = () => {
  return useActionState(
    withCallbacks(
      upvoteUser,
      createToastCallbacks({
        loadingMessage: "Upvoting ...",
      })
    ),
    null
  );
};

type UserItemProps = {
  user: {
    id: string;
    name: string;
    upvotes: number;
  };
};

const UserItem = ({ user }: UserItemProps) => {
  const [, upvoteAction, upvotePending] = useUpvoteUser();

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

export { UserItem };
```

Although the initial implementation may seem complex, it provides a look into the underlying mechanics, similar to what you would find in a library like next-safe-action.

Using it now in your application though is straightforward and provides a reusable solution for adding toast notifications to Server Actions. You had a first experience in the last code snippet and now we can reuse the same utilities for other Server Actions.

# Toast for failed Server Action

To demonstrate how to handle errors for failed Server Actions with toast notifications, we'll add a downvote Server Action that always returns an error message. This will allow us to test how our app handles failed Server Actions and displays toast notifications.

```ts
// src/features/user/user-dao.ts
export const downvoteUser = async (): Promise<ActionState> => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  // force error for debugging purposes
  return toActionState("Something went wrong", "ERROR");
};
```

Next, we add a new button in the User component that calls the new Server Action. When the action fails, it should trigger a toast notification informing the user:

```tsx
// src/features/user/user-item.tsx
const useDownvoteUser = () => {
  return useActionState(
    withCallbacks(
      downvoteUser,
      createToastCallbacks({
        loadingMessage: "Downvoting ...",
      })
    ),
    null
  );
};
```

Do not forget the import for the new Server Action:

```tsx{2}
// src/features/user/user-item.tsx
import { downvoteUser, upvoteUser } from "./user-dao";
```

And last, we add the new button to the User component:

```tsx{4,9-13}
// src/features/user/user-item.tsx
const UserItem = ({ user }: UserItemProps) => {
  const [, upvoteAction, upvotePending] = useUpvoteUser();
  const [, downvoteAction, downvotePending] = useDownvoteUser();

  return (
    <div>
      ...
      <form action={downvoteAction}>
        <button type="submit" disabled={downvotePending}>
          {downvotePending ? "Downvoting" : "Downvote"}
        </button>
      </form>
    </div>
  );
};
```

Now, when you click the new button, you should see a toast message displaying the failed Server Action message. The error handling with a toast notification is now in place, and the user receives feedback when a Server Action fails.

# Toast for unmounting Component

In the last section, we want prove that the toast notifications are also working for unmounting components, because this was a flaw in the alternative implementation where we used React's useEffect Hook for the toast notifications.

First, we are going to implement a delete Server Action that removes a user:

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

Second, we create a [custom hook](/react-custom-hook/) for the delete Server Action which reuses the `withCallbacks` and `createToastCallbacks` utilities:

```tsx
// src/features/user/user-item.tsx
const useDeleteUser = () => {
  return useActionState(
    withCallbacks(
      deleteUser,
      createToastCallbacks({
        loadingMessage: "Deleting ...",
      })
    ),
    null
  );
};
```

And third, we add a new button to the User component that calls the delete action:

```tsx{5,10-15}
// src/features/user/user-item.tsx
const UserItem = ({ user }: UserItemProps) => {
  const [, upvoteAction, upvotePending] = useUpvoteUser();
  const [, downvoteAction, downvotePending] = useDownvoteUser();
  const [, deleteAction, deletePending] = useDeleteUser();

  return (
    <div>
      ...
      <form action={deleteAction}>
        <input type="hidden" name="userId" value={user.id} />
        <button type="submit" disabled={deletePending}>
          {deletePending ? "Deleting" : "Delete"}
        </button>
      </form>
    </div>
  );
};
```

The toast notification should show up, even though the component unmounts, because the utility is not tied to the component lifecycle.

<Divider />

The last examples have shown you how straightforward it is to add toast notifications for Server Actions in React. The initial implementation for the utility functions is on a library level, but the usage in your application is lightweight and reusable.

In this tutorial, we learned how to implement React Server Actions with Toasts by:

- Fetching data using a Server Component.
- Performing Server Actions such as upvoting, downvoting, and deleting users.
- Displaying toast messages for successful and failed actions.
- Displaying a loading toast message when an action is pending.

If you enjoyed this tutorial and want to dig deeper into this topic, feel free to check out the alternative approach which has been referenced in this tutorial.