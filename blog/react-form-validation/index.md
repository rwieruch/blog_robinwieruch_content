---
# title: "React Form Validation"
title: "You might not need a React Form Library"
description: "How to validate forms in React without a form library on the server and the client ..."
date: "2024-12-16T07:50:46+02:00"
categories: ["React"]
keywords: ["react form validation"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

When I have written about my [React tech stack](/react-tech-stack/) for next year, lots of developers [[0](https://x.com/rwieruch/status/1866525030948929833), [1](https://www.linkedin.com/posts/robin-wieruch-971933a6_the-tech-stack-id-use-in-2025-nextjs-activity-7272290225891028993-VZol)] were almost confused by my suggestion that you might not need a form library in React.

In my experience, developers have often overcomplicated form handling (in React). Many immediately install a form library alongside their initial React setup. However, I believe most forms can be effectively managed in React without a form library, at least until they reach a certain level of complexity.

Let's dive into it here. We will start with a baseline of a React Form and a React Server Action. Let's start with the React Form Component:

```tsx
"use client";

import { createInvoice } from "../actions/create-invoice";

const InvoiceCreateForm = () => {
  return (
    <form action={createInvoice}>
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" id="name" />

      <label htmlFor="amount">Amount:</label>
      <input type="number" name="amount" id="amount" />

      <label htmlFor="draft">Draft:</label>
      <input type="checkbox" name="draft" id="draft" />

      <label htmlFor="feature1">Feature 1:</label>
      <input type="checkbox" name="features" value="feature1" id="feature1" />

      <label htmlFor="feature2">Feature 2:</label>
      <input type="checkbox" name="features" value="feature2" id="feature2" />

      <button type="submit">Send</button>
    </form>
  );
};

export default InvoiceCreateForm;
```

Followed by the React Server Action which handles the form request with its FormData:

```ts
"use server";

import { z } from "zod";
import { zfd } from "zod-form-data";

const createInvoiceSchema = zfd.formData({
  title: zfd.text(z.string().min(3).max(191)),
  amount: zfd.numeric(z.number().positive()),
  draft: zfd.checkbox(),
  features: zfd.repeatable(),
});

export const createInvoice = async (formData: FormData) => {
  const { title, amount, draft, features } =
    createInvoiceSchema.parse(formData);

  console.log(title, amount, draft, features);
};
```

We are already extracting the form data from the form and validating it with a schema on the server-side of the server action. If the schema validation fails, the application would crash in its current state.

<ReadMore label="Read more about Form Data in React" link="/react-form-data/" />

Let's start with server-side validation followed by optional client-side validation in React.

# Server-Side Form Validation in React

First of all, we need to handle the parsing error in the server action whenever the schema validation fails. This way, the application will not crash but log the error instead.

```ts{2,8-11,13}
export const createInvoice = async (formData: FormData) => {
  try {
    const { title, amount, draft, features } =
      createInvoiceSchema.parse(formData);

    console.log(title, amount, draft, features);

    // TODO: create invoice
  } catch (error) {
    console.error(error);
  }

  console.log("Success");
};
```

When using `parse` on the schema, it throws an error when the validation fails. As an alternative, if you don't want to use a try-catch statement, you could also use `safeParse` which returns an object with an optional error property.

The error handling in the server action needs to differentiate between different types of errors. For instance, when the schema validation fails, it should return a field error for each field that failed the validation. If the error is not a schema validation error, it should return a general error message:

```ts{10-25,28-31}
export const createInvoice = async (formData: FormData) => {
  try {
    const { title, amount, draft, features } =
      createInvoiceSchema.parse(formData);

    console.log(title, amount, draft, features);

    // TODO: create invoice
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        message: "",
        fieldErrors: error.flatten().fieldErrors,
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        fieldErrors: {},
      };
    } else {
      return {
        message: "An unknown error occurred",
        fieldErrors: {},
      };
    }
  }

  return {
    message: "Invoice created",
    fieldErrors: {},
  };
};
```

Whether we  follow the happy or unhappy path, we are returning an object which has a message and fieldErrors property.

The `message` property is a general message for the user (which could be displayed as a toast message), while the `fieldErrors` property is a dictionary of the form field names and their respective error messages (which could be displayed next to the form fields).

Because the (error) handling should be used across server actions, we can extract it into a helper function with some more utility types (here: `ActionState`) and constants (here: `EMPTY_ACTION_STATE`):

```ts{1,3-6,8-11,13,30,32-36}
import { ZodError } from "zod";

export type ActionState = {
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
};

export const fromErrorToActionState = (error: unknown): ActionState => {
  if (error instanceof ZodError) {
    return {
      message: "",
      fieldErrors: error.flatten().fieldErrors,
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
      fieldErrors: {},
    };
  } else {
    return {
      message: "An unknown error occurred",
      fieldErrors: {},
    };
  }
};

export const toActionState = (message: string): ActionState => ({
  message,
  fieldErrors: {},
});
```

Now we can reuse the new utility functions in the server action(s) to return either an error or success state. Here we just reuse it in one server action, but you can use it in all of your server actions for consistent error handling from now on:

```ts{10,13}
export const createInvoice = async (formData: FormData) => {
  try {
    const { title, amount, draft, features } =
      createInvoiceSchema.parse(formData);

    console.log(title, amount, draft, features);

    // TODO: create invoice
  } catch (error) {
    return fromErrorToActionState(error);
  }

  return toActionState("Invoice created");
};
```

Next we want to retrieve the returned success or error state in the form component. Hence we are using React's useActionState Hook which needs the server action and an initial state and returns the enhanced server action and the state from the server action:

```tsx{1,4-7,10,14}
import { useActionState } from "react";

const InvoiceCreateForm = () => {
  const [actionState, formAction] = useActionState(
    createInvoice,
    EMPTY_ACTION_STATE
  );

  return (
    <form action={formAction}>
      ...

      <button type="submit">Send</button>
      {actionState.message}
    </form>
  );
};
```

We can already display the general success or error message below of the form. This is the most simple solution for it, but you may want to show it later with a toast message.

Because we altered the usage of the server action in the form by using React's useActionState Hook, we need to adjust the server action with a new function signature:

```ts{2}
export const createInvoice = async (
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    ...
  } catch (error) {
    return fromErrorToActionState(error);
  }

  return toActionState("Invoice created");
};
```

Finally we can use the returned `fieldErrors` from the server action's state in the form component to display the error messages next to the form fields. Since the dictionary of field errors is a nested object, we need to access the error messages with the field name as a key. Then we only show the first error message for each field:

```tsx{5,9,13,21}
return (
  <form action={formAction}>
    <label htmlFor="title">Title:</label>
    <input type="text" name="title" id="name" />
    <span>{actionState.fieldErrors.title?.[0]}</span>

    <label htmlFor="amount">Amount:</label>
    <input type="number" name="amount" id="amount" />
    <span>{actionState.fieldErrors.amount?.[0]}</span>

    <label htmlFor="draft">Draft:</label>
    <input type="checkbox" name="draft" id="draft" />
    <span>{actionState.fieldErrors.draft?.[0]}</span>

    <label htmlFor="feature1">Feature 1:</label>
    <input type="checkbox" name="features" value="feature1" id="feature1" />

    <label htmlFor="feature2">Feature 2:</label>
    <input type="checkbox" name="features" value="feature2" id="feature2" />

    <span>{actionState.fieldErrors.features?.[0]}</span>

    <button type="submit">Send</button>
    {actionState.message}
  </form>
);
```

<ReadMore label="How to (not) reset a form after a Server Action in React" link="/react-form-data/" />

Here we can extract a FieldError component to reuse it for each form field.

```tsx
import { ActionState } from "./helper";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

const FieldError = ({ actionState, name }: FieldErrorProps) => {
  const message = actionState.fieldErrors[name]?.[0];

  if (!message) return null;

  return <span className="text-xs text-red-500">{message}</span>;
};

export { FieldError };
```

And use it in the form component for a less verbose form with a simple API:

```tsx{5,9,13,21}
return (
  <form action={formAction}>
    <label htmlFor="title">Title:</label>
    <input type="text" name="title" id="name" />
    <FieldError actionState={actionState} name="title" />

    <label htmlFor="amount">Amount:</label>
    <input type="number" name="amount" id="amount" />
    <FieldError actionState={actionState} name="amount" />

    <label htmlFor="draft">Draft:</label>
    <input type="checkbox" name="draft" id="draft" />
    <FieldError actionState={actionState} name="draft" />

    <label htmlFor="feature1">Feature 1:</label>
    <input type="checkbox" name="features" value="feature1" id="feature1" />

    <label htmlFor="feature2">Feature 2:</label>
    <input type="checkbox" name="features" value="feature2" id="feature2" />

    <FieldError actionState={actionState} name="features" />

    <button type="submit">Send</button>
    {actionState.message}
  </form>
);
```

From here you can optionally install your favorite UI library and replace the Label, Input, and Button components with your UI library components.

Essentially you have built a form with server-side validation in React without a form library. If you don't have lots of load on your server and you are okay for your users to have the validation roundtrip to the server, this is a minimal setup for form validation in React.

You can extend it with client-side validation to improve the user experience and to decrease the server load, which we will cover next.

# Client-Side Form Validation in React

We will extend the form component with client-side validation. In its simplest form, we can use the native HTML validation attributes like `required`, `min`, `max`, `pattern`, and `maxLength`:

```tsx{2,10-12}
<label htmlFor="title">Title:</label>
<input type="text" name="title" id="name" required maxLength={10} />
<FieldError actionState={actionState} name="title" />

<label htmlFor="amount">Amount:</label>
<input
  type="number"
  name="amount"
  id="amount"
  required
  min={0}
  max={999}
/>
```

Unfortunately, the native HTML validation gives not much control over customizations. If you need more control with client-side JavaScript, remove the native HTML validation.

Next extract the schema from the server-side validation into a separate file away from the server action, because it cannot be exported from there. Later we can reuse it this way for the client-side validation:

```ts
import { z } from "zod";
import { zfd } from "zod-form-data";

export const createInvoiceSchema = zfd.formData({
  title: zfd.text(z.string().min(3).max(191)),
  amount: zfd.numeric(z.number().positive()),
  draft: zfd.checkbox(),
  features: zfd.repeatable(),
});
```

Now we will introduce an event handler on the form component to validate the form data with the schema on the client-side before sending the form data to the server action:

```tsx{1}
<form action={formAction} onSubmit={handleSubmit}>
  ...
</form>
```

In the event handler, extract the form data from the form element and validate it with the schema. If the validation fails, prevent the form submission. Otherwise, send the form data to the server action. Here again you could use `safeParse` instead of `parse` to get an object with an optional error property if you don't want to use a try-catch statement:

```tsx
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  const formData = new FormData(event.currentTarget);

  try {
    createInvoiceSchema.parse(formData);
  } catch (error) {
    event.preventDefault();
  }
};
```

In order to display the client-side validation errors next to the form fields, we need to inform the form component with the validation errors. Therefore we introduce local component state with [React's useState Hook](/react-usestate-hook/). Do not forget to reset the validation state before each form submission:

```tsx{1,6,11}
const [validation, setValidation] = useState<ActionState | null>(null);

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  const formData = new FormData(event.currentTarget);

  setValidation(null);

  try {
    createInvoiceSchema.parse(formData);
  } catch (error) {
    setValidation(fromErrorToActionState(error));

    event.preventDefault();
  }
};
```

No we can display the client-side validation errors next to the form fields if there are any. Otherwise we check for the server-side validation errors:

```tsx{3,7}
<label htmlFor="title">Title:</label>
<input type="text" name="title" id="name" />
<FieldError actionState={validation ?? actionState} name="title" />

<label htmlFor="amount">Amount:</label>
<input type="number" name="amount" id="amount" />
<FieldError actionState={validation ?? actionState} name="amount" />

...
```

And for the general message, that could be shown as a toast feedback, or below the form, we will also check for the client-side validation errors first:

```tsx{2}
<button type="submit">Send</button>
{validation ? validation.message : actionState.message}
```

This is client-side form validation without a form library in a nutshell. You can extend it with more complex validation rules, custom error messages, and more sophisticated error handling. But for most forms, this is already a good starting point. With this foundation, you could also replace the form validation on submission with form validation on change or on blur.

<Divider />

In the end I am not saying you shouldn't use a form library for client-side (or server-side) form validation, however, I just wanted to make a point against premature abstractions that are not needed for many React applications out there. Start simple and always re-evaluate if you need a form library in your React application.


🌶️ React Take

You might not need a form library 🫠 It's surprising to me how many developers see a form library as essential. [see 0 in replies]

Yes, they're useful for complex form related needs, but they don't need to be the default for every project.

There are different stages of a product and it depends on the resources (i.e. time, money, developers) you have when launching it and the final scope (i.e. small sized vs large scale product).

This would be my rough outline:

1️⃣ The MVP: Go with server actions and server-side validation.

Negative impacts (which should not matter for a MVP):

- Higher server load.
- Delayed user feedback.

See screenshot 👇

2️⃣ The MVE: Add client-side validation with native HTML attributes.

Negative impacts (which should not matter for a small user base):

- Not much control over customization (i.e. style).
- Not much API surface for native HTML validation.

3️⃣ The MVE+: Add client-side validation with JavaScript without a form library.

Negative impacts:

- You create your own little abstraction ...
- ... but you have control over what you actually need.
- And when you have the right abstractions in place ...
- ... you can swap it any time with a form library later.

See tutorial [1] in replies 👇

4️⃣ The Product:

If your forms are complex, not because they have many fields, but because you genuinely need the advanced features a form library provides, then using a form library is the right choice.

❗ If you are working in a team of developers, they should not be required to learn a custom abstraction. Here a form library, whether you use all of its features or not, is a common ground for everyone.

💰 If you have sufficient resources when launching a new product, then go with a form library from the beginning.

Essentially this reflects a debate between founder and developer. The founder wants to get the product off the ground as soon as possible, while the developer wants to build a solid foundation for the future. Both are right, but it depends on the context.

As a freelance developer I see too many products not getting market fit, because developers who don't have any stake in the company over-engineer the product. It's a common pitfall in software development.

So I am not arguing against form libraries here, they definitely have their place. But I think there is this misconception that you need a form library for every React project as the default requirement.

You don't. Start simple and get your product off the ground 🚀