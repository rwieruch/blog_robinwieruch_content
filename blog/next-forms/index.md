---
title: "Exploring Next.js Forms with Server Actions"
description: "How to use Forms in Next.js with React Server Components (RSC), Server Actions in Next's App Router by using useFormState and useFormStatus. Learn about form validation, form reset, form feedback (field errors and toast messages) while using progressive enhancement and caching ..."
date: "2024-02-27T08:50:46+02:00"
categories: ["Next"]
keywords: ["next forms"]
hashtags: ["#NextJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

I delved deep into exploring Forms in Next.js 14 using Next's App Router, React Server Components (RSC), and Server Actions. This comprehensive tutorial covers React/Next native aspects like `useFormStatus`, `useFormState` and `revalidatePath`.

The tutorial also provides detailed insights into form validation using Zod, error handling on a fine- and coarse-grained level, offering user feedback through field-level errors and toast messages while also staying functional without JavaScript in the browser by leveraging the web's capabilties of progressive enhancement.

*Currently I am working on a new course called **"The Road to Next"** which will hopefully match the popularity of **The Road to React**. We will create a full-stack Next application which goes all the way from fundamental React knowledge to accessing a serverless database. I am more than excited to share all my knowledge about Next.js with you. **If you are interested**, feel free to sign up on my Newsletter for getting updates about it.*

# Remarks about the State of Forms in Next.js

This tutorial screams for a library that matches all the shown requirements. And there are already libraries out there to improve the DX for forms in Next, however, I wanted to stay unopinionated and show you the fundamentals of all the provided building blocks.

We are also pretty early on this new paradigm of server components/actions, so it's difficult to have an opinion on all the emerging options out there. Hence I try to approach things from a first principles perspective, explaining all the building blocks that are given to us by React/Next, and by doing so leveling the path for developers.

This extensive tutorial feels very similar to how I wrote the [data fetching with React Hooks](/react-hooks-fetch-data/) tutorial several years ago when React Query wasn't a thing yet and developers had to explore this new concept of Hooks in React and how to fetch data with them.

# Using Forms in Next.js

We'll start with a new Next.js installation with Next's App Router. On the root page, we'll use React Server Components (RSC) and Server Actions which enable us having a form component that creates messages and a list component to render all of them.

```tsx
import { MessageCreateForm } from '@/components/message-create-form';
import { MessageList } from '@/components/message-list';

export default function Home() {
  return (
    <main className="p-4">
      <MessageCreateForm />
      <MessageList />
    </main>
  );
}
```

Independent from the form topic at hand, notice how this is already different from client-side/SPA React, because we do not allocate shared state between both components in this parent component nor will we in the future.

We will not add more complexity here, like using `<Suspense>` for a loading boundary or adding more Tailwind CSS, because we want to keep things simple. We will add more complexity later, when we start to add form validation and form feedback, so do not let us get distracted at this stage.

Now let us render the [list](/react-list-component/) of messages in a server component and therefore perform the data fetching on the server. Do not forget to mark the [function component](/react-function-component/) as `async` and use `await` to fetch the data for this server component.

```tsx
import { getMessages } from '@/app/actions';

const MessageList = async () => {
  const messages = await getMessages();

  return (
    <ul>
      {messages.map((message) => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  );
};

export { MessageList };
```

Next create a function for fetching the messages from the server. In a real world application, you would use a database, but for the sake of simplicity, we will use an in-memory array that we can use to showcase read and write operations.

```tsx
type Message = {
  id: string;
  text: string;
};

let messages: Message[] = [
  {
    id: crypto.randomUUID(),
    text: 'First Message',
  },
  {
    id: crypto.randomUUID(),
    text: 'Second Message',
  },
  {
    id: crypto.randomUUID(),
    text: 'Third Message',
  },
];

export const getMessages = async (): Promise<Message[]> => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  return Promise.resolve(messages);
};
```

Note that even though this function sits in a *action.ts* file, it is not a server action. But we'll add later a server action to this file for creating a message and therefore we need to have both read/write functions at one place to operate on the same data in memory.

The `Message` entity defined by TypeScript has only an identifier (here `id`) and a `text`. For the initial messages, we will use a hard-coded array of messages. We will also add a pseudo delay of 250ms to simulate a slow network request for fetching the messages.

Let's create the form component now. We will not use a form library like Formik or React Hook Form, but we will use the new [useFormState](https://react.dev/reference/react-dom/hooks/useFormState) and [useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus) hooks that React provides us. There may be new libraries in the future that are built on top of these hooks, but for now, we will use the hooks directly to get a better understanding of them.

```tsx
import { createMessage } from '@/app/actions';

const MessageCreateForm = () => {
  return (
    <form action={createMessage} className="flex flex-col gap-y-2">
      <label htmlFor="text">Text</label>
      <textarea id="text" name="text" className="border-2" />

      <button type="submit" className="border-2">
        Create
      </button>
    </form>
  );
};

export { MessageCreateForm };
```

Note how all form field elements can stay be [uncontrolled](/react-controlled-components/) and we do not need to use React's `useState` hook for the form state. You'll see how this is possible by looking at the next code snippet.

We are still missing the `createMessage` function that we are using in the `action` attribute of the form. We will create this function in the other *action.ts* file where we already implemented the `getMessages` function, because only this way we can operate with both functions on the same pseudo data. But this time it is a server action.

```ts
export const createMessage = async (formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const text = formData.get('text') as string;

  messages.push({
    id: crypto.randomUUID(),
    text,
  });
};
```

Server actions passed to the form `action` attribute receive as first argument the `FormData` object of the form which encapsulates all the data of the form. We'll use this object to get the value of the `text` field to add a new message to the `messages` array.

Here we also added a pseudo delay of 250ms to simulate a slow network. In addition, we directly mutated the `messages` array in memory to add the new message to it.

You should see the following warning: *"Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server"."* We'll fix this by annotating the `createMessage` function with the `use server;` directive:

```ts{2}
export const createMessage = async (formData: FormData) => {
  'use server';

  await new Promise((resolve) => setTimeout(resolve, 250));

  const text = formData.get('text') as string;

  messages.push({
    id: crypto.randomUUID(),
    text,
  });
};
```

If you would add a logging in the `createMessage` function, you would only see it in the terminal and not the browser, because we are dealing here with a server action after all.

Now we have a form that creates a message and a list that renders all of them. We can already create a message and see it in the list, but to actually see the newly created message in the list of messages we still need to reload/refresh the browser. What's missing is revalidating Next's full route cache.

# revalidatePath after Form Submission

We will add a revalidation of the page's path (here: `'/'`) after the form submission to see the new message in the list (and all other revalidated data, if there were more of it) without reloading the page. For this, we will use Next's `revalidatePath` function.

```ts{1,16}
import { revalidatePath } from 'next/cache';

...

export const createMessage = async (formData: FormData) => {
  'use server';
  await new Promise((resolve) => setTimeout(resolve, 250));

  const text = formData.get('text') as string;

  messages.push({
    id: crypto.randomUUID(),
    text,
  });

  revalidatePath('/');
};
```

We will call the function after we mutated the data in memory to revalidate Next's [Full Route Cache](https://nextjs.org/docs/app/building-your-application/caching#full-route-cache) which instructs Next to take care of the cache for this page and to take care of rendering the revalidated data. After this change, you do not need to reload the browser anymore after creating a message.

# useFormStatus

Using this form does not give any feedback yet. For example, when creating a new message, a user may expect a loading spinner which informs them that the message is being created. We will add this feedback to the form with React's useFormStatus Hook which gives us the status of the form submission.

```tsx{1,5,13}
import { useFormStatus } from 'react-dom';
import { createMessage } from '@/app/actions';

const MessageCreateForm = () => {
  const { pending } = useFormStatus();

  return (
    <form action={createMessage} className="flex flex-col gap-y-2">
      <label htmlFor="text">Text</label>
      <textarea id="text" name="text" className="border-2" />

      <button disabled={pending} type="submit" className="border-2">
        {pending ? 'Creating ...' : 'Create'}
      </button>
    </form>
  );
};

export { MessageCreateForm };
```

To make this work, we need to jump through a few hoops whereas several of these hoops are related learning more about these new hooks, server actions, and React server components. At this point, you are likely  confronted with the following error:

*"You're importing a component that needs useFormStatus. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.".*

We will fix this by converting the `MessageCreateForm` component from a default server component to an explicit client component by annotating it with `use client;`.

```tsx{1}
'use client';

import { useFormStatus } from 'react-dom';
import { createMessage } from '@/app/actions';

const MessageCreateForm = () => {
  ...
};

export { MessageCreateForm };
```

We may be confronted with yet another error, not directly tied to the form component, but more so to the server action if you did the previous step the same way as I did:

*"Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server"."*

Fix it by putting `'use server';` directive at the top of the file for your action(s) and remove it from within the `createMessage` function. This is in general a good practice: first export actions to their own file, second annotate the top with the server directive.

```ts{1,6}
'use server';

...

export const createMessage = async (formData: FormData) => {
  // 'use server'; <--- remove

  await new Promise((resolve) => setTimeout(resolve, 250));

  const text = formData.get('text') as string;

  messages.push({
    id: crypto.randomUUID(),
    text,
  });

  revalidatePath('/');
};
```

After all these errors, you should be able to see the form again. But the "Creating ..." feedback is still not showing up. The reason: React's useFormStatus Hook can only access the form's status if it is a child component (!) of the form. If you look closely, nothing gets passed to this hook, hence it can only implicity track its relation to a form by being a child component of it.

Therefore extract the button into a new component and use `useFormStatus` there:

```tsx{1-4,6-14,22}
type SubmitButtonProps = {
  label: string;
  loading: React.ReactNode;
};

const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className="border-2">
      {pending ? loading : label}
    </button>
  );
};

const MessageCreateForm = () => {
  return (
    <form action={createMessage} className="flex flex-col gap-y-2">
      <label htmlFor="text">Text</label>
      <textarea id="text" name="text" className="border-2" />

      <SubmitButton label="Create" loading="Creating ..." />
    </form>
  );
};
```

Many people would extract this component into a reusable component in its own file, because it happens often that a stateful submit button for a form is needed. So go ahead yourself and put the `SubmitButton` into a new file and export it from there.

As you can see, I went through a couple of hoops (errors and learnings due to RSC and Server Actions) to make the form feedback with `useFormStatus` work here. I could have gone the happy path from the very beginning by giving a 100% correct instructions, but the end result here shows more realistically the initial DX of working with Server Components in Next when all the fundamentals are not fully manifested yet.

# Form Validation

Since we are communicating with the server anyway, we can also validate the form on the server. So we will not get into validation on the client side, for example with React Hook Form or Formik, here. Instead, when the form hits the server with the server action, we will use [Zod](https://zod.dev/) to validate the incoming data. Hence install Zod first:

```sh
npm install zod
```

Then import it for your server actions file and create a schema for the form data. We will use Zod's `object` function to create a schema for the form data. The schema will have a single field `text` which is a string, is required, and has a max length of 191 characters (default varchar limit in a MySQL database).

```ts{3,8-10,15-17}
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

...

const createMessageSchema = z.object({
  text: z.string().min(1).max(191),
});

export const createMessage = async (formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const { text } = createMessageSchema.parse({
    text: formData.get('text'),
  });

  messages.push({
    id: crypto.randomUUID(),
    text,
  });

  revalidatePath('/');
};
```

You may have noticed that we cheated earlier by using an `as string` type assertion for the form data which we obviously cannot guarantee, because anything could arrive from the form. Now we are using Zod's `parse` method which will throw an error if the form data does not match the schema.

Now when sending the form without a text, we get a "Unhandled Runtime Error". What's missing is handling this error and displaying it to the user. Entering useFormState ...

# useFormState

React's useFormState Hook is used in combination with a server action. At its core, it allows us to send custom information between server action and client component. As arguments, the new hook expects the server action and an initial state object. It returns the `formState` and the enhanced server action which comes with form state now.

```tsx{1,3,8-10,19}
'use client';

import { useFormState } from 'react-dom';
import { createMessage } from '@/app/actions';
import { SubmitButton } from './submit-button';

const MessageCreateForm = () => {
  const [formState, action] = useFormState(createMessage, {
    message: '',
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <label htmlFor="text">Text</label>
      <textarea id="text" name="text" className="border-2" />

      <SubmitButton label="Create" loading="Creating ..." />

      <span className="font-bold">{formState.message}</span>
    </form>
  );
};
```

Do not forget to annotate your component as client component again, because React hooks only work in client components. Otherwise you may see the following error:

*"You're importing a component that needs useFormState. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default."*.

Using TypeScript, you should also see that there is a TypeScript error, because the `createMessage` server action does accept nor return an object with a `message` which we just introduced with the new hook as initial form state.

We can fix this by returning the wanted form state from the server action and by adding the form state as additional parameter to the function. It's important to note that the new parameter is added as the first parameter to the function.

```ts{1-3,6,20-22}
type FormState = {
  message: string;
};

export const createMessage = async (
  formState: FormState,
  formData: FormData
) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const text = formData.get('text') as string;

  messages.push({
    id: crypto.randomUUID(),
    text,
  });

  revalidatePath('/');

  return {
    message: 'Message created',
  };
};
```

In this scenario we do not consume the incoming `formState` in the server action, however, we will use it to return useful information to the form component which then can be used to display feedback to the user.

With all of this done, you should see the "Message created" message now when you submit the form with a text. Next we will add a try-catch block to the server action to catch any errors that may occur during the form submission:

```ts{7,16-20}
export const createMessage = async (
  formState: FormState,
  formData: FormData
) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  try {
    const { text } = createMessageSchema.parse({
      text: formData.get('text'),
    });

    messages.push({
      id: crypto.randomUUID(),
      text,
    });
  } catch (error) {
    return {
      message: 'Something went wrong',
    };
  }

  revalidatePath('/');

  return {
    message: 'Message created',
  };
};
```

The error could happen on a validation level (Zod) or database level (here: in-memory data, but later through a ORM like Prisma). Hence we wrap both of these atomic operations in the try-block. You should see the "Something went wrong" message now when you submit the form without a text (or when you throw an deliberate error).

# Error Handling for Forms in Next

Let's dive deeper into the topic of error handling for forms in Next. At the moment the happy and unhappy path are very generic. We want to be more explicit how (success/error) and where (inline/toast) to show the messages.

Create a new file which holds utility functions for us. We will start with a function which takes an error and returns a form state object. This object will be used to display the user feedback in the form component. We will differentiate this error based on its type:

```ts
import { ZodError } from 'zod';

export type FormState = {
  message: string;
};

export const fromErrorToFormState = (error: unknown) => {
  // if validation error with Zod, return first error message
  if (error instanceof ZodError) {
    return {
      message: error.errors[0].message,
    };
  // if another error instance, return error message
  // e.g. database error
  } else if (error instanceof Error) {
    return {
      message: error.message,
    };
  // if not an error instance but something else crashed
  // return generic error message
  } else {
    return {
      message: 'An unknown error occurred',
    };
  }
};
```

Regarding the Zod validation error it's important to note that we just return the first error message. This is a simplification, because Zod's error object is nested and we want to have all error messages per form field later. But one step at a time.

Use the new utility function in the action where you create the message entity. Do not forget to import the `FormState` from the previously created file too, because this knowledge should not be in the action file anymore:

```ts{4}
try {
  ...
} catch (error) {
  return fromErrorToFormState(error);
}
```

Finally you should see the "String must contain at least 1 character(s)" validation error from Zod now if you send an empty text. Let's get deeper into form validation ...

# Field Errors for Forms in Next

We will add another field to our form, because a message should consist of `title` and `text` now. Adding this new property makes the validation on field level more obvious.

```tsx{8-9}
const MessageCreateForm = () => {
  const [formState, action] = useFormState(createMessage, {
    message: '',
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <label htmlFor="title">Title</label>
      <input id="title" name="title" className="border-2" />

      <label htmlFor="text">Text</label>
      <textarea id="text" name="text" className="border-2" />

      <SubmitButton label="Create" loading="Creating ..." />

      <span className="font-bold">{formState.message}</span>
    </form>
  );
};
```

We will also extend the schema for the server action with the new `title` property:

```ts{2,13,14,20}
const createMessageSchema = z.object({
  title: z.string().min(1).max(191),
  text: z.string().min(1).max(191),
});

export const createMessage = async (
  formState: FormState,
  formData: FormData
) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  try {
    const data = createMessageSchema.parse({
      title: formData.get('title'),
      text: formData.get('text'),
    });

    messages.push({
      id: crypto.randomUUID(),
      ...data,
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  ...
};
```

Now let's get into field errors (and later into toast messages). In the form, we want to show optional validation error messages for each form field. Again we will use React's useFormState Hook to deliver this information from the server action.

Replace the initial state with a constant which will later come from our new form related utility file. Also display the field errors, but only if there is one and only the first one, below of each form element.

```tsx{4,11-13,17-19}
const MessageCreateForm = () => {
  const [formState, action] = useFormState(
    createMessage,
    EMPTY_FORM_STATE
  );

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <label htmlFor="title">Title</label>
      <input id="title" name="title" className="border-2" />
      <span className="text-xs text-red-400">
        {formState.fieldErrors['title']?.[0]}
      </span>

      <label htmlFor="text">Text</label>
      <textarea id="text" name="text" className="border-2" />
      <span className="text-xs text-red-400">
        {formState.fieldErrors['text']?.[0]}
      </span>

      <SubmitButton label="Create" loading="Creating ..." />

      <span className="font-bold">{formState.message}</span>
    </form>
  );
};
```

In the form utility file, add the new `EMPTY_FORM_STATE` and enrich its function with the new field errors. For the sake of completeness, and to avoid all the back and forth in the future, we will also add a `status` and a `timestamp` to the `FormState` for later usage:

```ts{2,4-5,8-13,18,20-21,25,27-28,32,34-35}
export type FormState = {
  status: 'UNSET' | 'SUCCESS' | 'ERROR';
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
};

export const EMPTY_FORM_STATE: FormState = {
  status: 'UNSET' as const,
  message: '',
  fieldErrors: {},
  timestamp: Date.now(),
};

export const fromErrorToFormState = (error: unknown) => {
  if (error instanceof ZodError) {
    return {
      status: 'ERROR' as const,
      message: '',
      fieldErrors: error.flatten().fieldErrors,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: 'ERROR' as const,
      message: error.message,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  } else {
    return {
      status: 'ERROR' as const,
      message: 'An unknown error occurred',
      fieldErrors: {},
      timestamp: Date.now(),
    };
  }
};
```

What's immportant is the part where we flatten the Zod error. This is necessary, because Zod's error object is nested and we want to have all error messages per form field now. After the flattening, the `fieldErrors` reflect a dictionary where the keys are the form fields and the values are arrays of error messages.

```ts
{
  title: ['String must contain at least 1 character(s)'],
  text: [],
}
```

In the same file, we will also create another helper function which let's us more straigth forward create success or error messages without the burden of defining all required properties for the overall `FormState`.

```ts
export const toFormState = (
  status: FormState['status'],
  message: string
): FormState => {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  };
};
```

Next use this new function in the server action for returning a success message in a more straigth forward way:

```ts{9}
export const createMessage = async (
  formState: FormState,
  formData: FormData
) => {
  ...

  revalidatePath('/');

  return toFormState('SUCCESS', 'Message created');
};
```

You should see the field errors now when you submit the form without a `title` or `text`. Feel free to extract a new reusable `FormFieldError` component from the form:

```tsx
import { FormState } from '@/utils/to-form-state';

type FieldErrorProps = {
  formState: FormState;
  name: string;
};

const FieldError = ({ formState, name }: FieldErrorProps) => {
  return (
    <span className="text-xs text-red-400">
      {formState.fieldErrors[name]?.[0]}
    </span>
  );
};

export { FieldError };
```

For the sake of completness for this tutorial, this is how it can be reused in the form:

```tsx{8,12}
const MessageCreateForm = () => {
  ...

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <label htmlFor="title">Title</label>
      <input id="title" name="title" className="border-2" />
      <FieldError formState={formState} name="title" />

      <label htmlFor="text">Text</label>
      <textarea id="text" name="text" className="border-2" />
      <FieldError formState={formState} name="text" />

      <SubmitButton label="Create" loading="Creating ..." />
    </form>
  );
};
```

Finally, the formState object is the source of truth holding all the user feedback for the form component. But why did we add the `status` and the `timestamp` to the form state? We will get into this in the next section ...

# Toast Message with Server Actions in Next

We are displaying errors per form field by using Zod's schema parsing and derived the `fieldErrors` property of the form state. But we also want to show a general message to the user, for example when the message was successfully created or when something went wrong. We will use a toast message for this. Let's install a popular library as helper here, because we want to focus on the fundamentals of the form state and the server actions rather than implementing our own Toast component:

```sh
npm install react-hot-toast
```

Next create a new component which will be used as a provider for the toast messages. This component will be used in the root layout of the application and will be responsible for rendering the toast messages:

```tsx
'use client';

import { Toaster } from 'react-hot-toast';

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({
  children,
}: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
```

To make the setup complete, add the new Provider to the RootLayout in *app/layout.tsx*:

```tsx{2,8}
...
import ToastProvider from '@/components/toast-provider';

export default function RootLayout(...) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
```

Remark: There may be the question about why we didn't use the `<Toaster>` directly in the `RootLayout`. The reason is that the Toaster is a third-party component from a library which is not declared as client component (yet) within the library but should be declared as client component in this new paradigm of RSCs, because it makes use of [React's useContext Hook](/react-usecontext-hook/). Hence we created our own wrapper component Provider for it, where we declared the component as client component, and thus all child components of it become automatically client components too.

Now use the imported `toast` function from the library to show the general message in the form component. Since this form component is already a client component, we will use [React's useEffect Hook](/react-useeffect-hook/) to show the toast message where the `status` determines whether the message is a styled success or error message:

```tsx{2,10-18}
...
import { toast } from 'react-hot-toast';

const MessageCreateForm = () => {
  const [formState, action] = useFormState(
    createMessage,
    EMPTY_FORM_STATE
  );

  useEffect(() => {
    if (formState.message) {
      if (formState.status === 'ERROR') {
        toast.error(formState.message);
      } else {
        toast.success(formState.message);
      }
    }
  }, [formState.status, formState.message]);

  return (
    <form action={action} className="flex flex-col gap-y-2">
      ...

      <SubmitButton label="Create" loading="Creating ..." />
    </form>
  );
};
```

You should see the general `message` popping up as toast message now when you submit the form. Now the `message` is used as a general notification via a toaster while the `fieldErrors` are attached to the individual form fields.

You may have noticed that the toast shows up only once! That's where the `timestamp` comes in when creating a message, because the message does not change and therefore React's useEffect Hook is not running again.

We will extract the previous `useEffect` Hook into its own [custom hook](/react-custom-hook/) and add the `timestamp` to the dependency array and check whether the `timestamp` changed compared to the previous `timestamp` by using a [React's useRef Hook](/react-ref/):

```tsx
import { useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FormState } from '@/utils/to-form-state';

const useToastMessage = (formState: FormState) => {
  const prevTimestamp = useRef(formState.timestamp);

  const showToast =
    formState.message &&
    formState.timestamp !== prevTimestamp.current;

  useEffect(() => {
    if (showToast) {
      if (formState.status === 'ERROR') {
        toast.error(formState.message);
      } else {
        toast.success(formState.message);
      }

      prevTimestamp.current = formState.timestamp;
    }
  }, [formState, showToast]);
};

export { useToastMessage };
```

Then use the new custom hook in the form component and provide it with the form state with the general `message`, the `status` for the style, and the `timestamp` for the dependency array:

```tsx{2,10}
...
import { useToastMessage } from '@/hooks/use-toast-message';

const MessageCreateForm = () => {
  const [formState, action] = useFormState(
    createMessage,
    EMPTY_FORM_STATE
  );

  useToastMessage(formState);

  return ( ... );
};
```

The toast message should show up for a form submission now. If you want to simulate a database error, you can throw an error in the server action and see the error message as toast message. The field errors should still show up below the form fields if you submit the form without a `title` or `text`.

```ts{12}
try {
  const data = createMessageSchema.parse({
    title: formData.get('title'),
    text: formData.get('text'),
  });

  messages.push({
    id: crypto.randomUUID(),
    ...data,
  });

  throw new Error('Database error');
} catch (error) {
  return fromErrorToFormState(error);
}
```

# Progressive Enhancement

What's great about server components/actions and forms in Next.js combination: progressive enhancement is built-in. The form works without JavaScript in the browser. If you build and start the application (`npm run build` and `npm run start`), you can disable JavaScript in your browser and the form will still work.

You can create a message and see it in the list without JavaScript. There are two things missing though: The form will not show the loading feedback and the toast message. Let's improve the latter for users without JS:

```tsx{4-15}
const useToastMessage = (formState: FormState) => {
  ...

  // stay usable without JS
  return (
    <noscript>
      {formState.status === 'ERROR' && (
        <div style={{ color: 'red' }}>{formState.message}</div>
      )}

      {formState.status === 'SUCCESS' && (
        <div style={{ color: 'green' }}>{formState.message}</div>
      )}
    </noscript>
  );
};
```

The `useToastMessage` custom hook now returns a `noscript` element which will be rendered when JavaScript is disabled in the browser. It acts as a fallback feedback for users without JavaScript, because it will render the general message:

```tsx{7,15}
const MessageCreateForm = () => {
  const [formState, action] = useFormState(
    createMessage,
    EMPTY_FORM_STATE
  );

  const noScriptFallback = useToastMessage(formState);

  return (
    <form action={action} className="flex flex-col gap-y-2">
      ...

      <SubmitButton label="Create" loading="Creating ..." />

      {noScriptFallback}
    </form>
  );
};
```

# How to reset a Form in Next

Resetting the form after a successful submission is a common requirement. Normally in client-side React you could just attach a `ref` to the form and reset it on the event handler. Let's try this in the form component by using React's `useRef` Hook:

```tsx
const MessageCreateForm = () => {
  ...

  const formRef = useRef<HTMLFormElement>(null);

  const handleCreateTicket = async (formData: FormData) => {
    await action(formData);

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <form
      ref={formRef}
      action={handleCreateTicket}
      className="flex flex-col gap-y-2"
    >
      ...
    </form>
  );
};
```

However, this will break progressive enhancement when the compiled application is used without JavaScrpt. Fortunately, we have everything in place to reset the form by using the `formState` and the `timestamp`. Let's create a custom hook for this:

```tsx
import { useRef, useEffect } from 'react';
import { FormState } from '@/utils/to-form-state';

const useFormReset = (formState: FormState) => {
  const formRef = useRef<HTMLFormElement>(null);
  const prevTimestamp = useRef(formState.timestamp);

  useEffect(() => {
    if (!formRef.current) return;
    if (
      formState.status === 'SUCCESS' &&
      formState.timestamp !== prevTimestamp.current
    ) {
      formRef.current.reset();

      prevTimestamp.current = formState.timestamp;
    }
  }, [formState.status, formState.timestamp]);

  return formRef;
};

export { useFormReset };
```

Then use the new custom hook in the form component, provide it with the form state and attach the `ref` to the form, and experience yourself how it resets the form after a successful submission:

```tsx{8,13}
const MessageCreateForm = () => {
  const [formState, action] = useFormState(
    createMessage,
    EMPTY_FORM_STATE
  );

  const noScriptFallback = useToastMessage(formState);
  const formRef = useFormReset(formState);

  return (
    <form
      action={action}
      ref={formRef}
      className="flex flex-col gap-y-2"
    >
      ...
    </form>
  );
};
```

All of this is a great example of how to use the new React server components and actions in Next.js to build a form with progressive enhancement. The form works without JavaScript in the browser and has a great user experience with JavaScript enabled. The form has feedback for the user and resets after a successful submission.

# Pass additional arguments to a Server Action

In the previous sections, we have seen how to use the `useFormState` Hook to send custom information between server action and client component. But what if we want to send additional arguments to a server action? For example, we have a DatePicker component and want to send the date to the server action to create a message:

```tsx{2,5,17-18}
const MessageCreateForm = () => {
  const [date, setDate] = useState(new Date());

  const [formState, action] = useFormState(
    createMessage.bind(null, date.toISOString()),
    EMPTY_FORM_STATE
  );

  ...

  return (
    <form
      action={action}
      ref={formRef}
      className="flex flex-col gap-y-2"
    >
      <label>Date</label>
      <DatePicker value={date} onChange={setDate} />

      <label htmlFor="title">Title</label>
      ...
    </form>
  );
};
```

This additional argument is passed to the server action as the first argument. We use the `bind` method to create a new function with the `date` as the first argument:

```ts{2}
export const createMessage = async (
  date: string,
  formState: FormState,
  formData: FormData
) => {
  ...
};
```

An alternative would be using a hidden form field where we would not have to adjust the server action with an additional argument. With this in place, we would receive the `date` in the `formData` in the server action:

```tsx
<label>Date</label>
<DatePicker value={date} onChange={setDate} />
<input type="hidden" name="date" value={date.toISOString()} />
```

<Divider />

I hope you liked this extensive tutorial about forms in Next with server actions and server components. The tutorial shows us both sides of this new paradigm:

We see what's possible in a web native world with progressive enhancement where no JavaScript is needed. However, when using the barebone building blocks that Next and React are providing us, we have to do a lot of work to get to a result. There are many things that could be provided by default by the framework. In the end, it just shows how much potential and opportunity there is for open source to provide a better DX for developers. Just think about a new useAction hook provided by the framework which would be a combination of `useFormState`, `useToastMessage`, and `useFormReset` and would take care of all the things we did manually in this tutorial.

Anyway, I am hyped about Next, React Server Components and Server Actions. If you are too, subscribe to my Newsletter and stay tuned for more content about it and my new **The Road to Next** course!
