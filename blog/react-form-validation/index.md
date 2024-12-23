---
title: "React Form Validation"
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

In a server-driven React world with Server Components and Server Actions, the frontend is seamlessly and type-safely connected to the backend. Since providing server-side feedback is inevitable, whether for authorization, authentication, or other business logic, it makes sense to extend this approach to form validation too.

That's why my approach to form validation in full-stack React applications is server-side first, removing the need for a form library at the start. When extending validation to the client-side, you have the flexibility to opt-in a form library.

Once the server-side feedback is in place, you can be assured that all the happy and unhappy paths where a user interacts with the backend are covered from an architectural perspective. This is a great foundation to build upon and to extend with client-side validation.

## What are the benefits of server-side form validation first?

**DX/UX**: You create an end-to-end implementation which allows you to provide the user with feedback beyond forms (e.g. 401, 404 status codes). Often feedback from erroneous operations is an afterthought, but it is crucial for the user experience.

**Public APIs**: Structured feedback (field errors, authorization errors, ...) from the server allows you to provide a consistent public API for any client to interact with your application.

**Reusability**: You can use the same schema validation for the server and the client. This way you can ensure that the validation rules are consistent across the stack and for other clients like mobile or desktop applications.

## Why do we need client-side form validation?

**UX**: Due to the missing roundtrip to the server, client-side validation provides instant feedback to the user.

**Performance**: Client-side validation reduces the server load by preventing unnecessary requests to the server.

## Why you may want to opt-in a form library?

**Do not reinvent the wheel**: Form libraries provide a lot of features out of the box without the need to create a custom solution. If you need these features, you should go with a form library. But it's important to note that a form library does not help you with the general feedback from the server, so we already established a foundation for it.

**Common ground**: When working in a team, it's essential to establish a common ground for form handling, and a form library can serve as the foundation. Whether it's for robustness, comprehensive documentation, or advanced features, a form library ensures consistency and provides a shared framework that the entire team can rely on.

**UX**: Form libraries often provide a better user experience out of the box. They can handle form validation on change, on blur, or on submit. They can provide feedback in real-time, which is a great user experience.

<Divider />

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

Let's start with server-side validation followed by client-side form validation in React.

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

Whether we  follow the happy or unhappy path, we are returning an object which has a message and fieldErrors property. This object can be extended as needed (e.g. `data`, `status`), but it ensures that the API always returns the same structure.

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

Essentially you have built a form with server-side validation in React without a form library. You can extend it with client-side validation to improve the user experience and to decrease the server load, which we will cover next.

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

Now we will extract the schema from the server-side validation into a separate file away from the server action, because it cannot be exported from there. Later we can reuse the schema this way for the client-side validation:

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

Next we will introduce an event handler on the form component to validate the form data with the schema on the client-side before sending the form data to the server action:

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

Now we can display the client-side validation errors next to the form fields if there are any. Otherwise we check for the server-side validation errors:

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

This is client-side form validation without a form library in a nutshell. You can extend it with more complex validation rules, custom error messages, and more sophisticated error handling. With this foundation, you could also replace the form validation on submission with form validation on change or on blur.

I'd recommend to use a form library when you need more complex form validation rules, custom error messages, or a better user experience out of the box. But for simple forms, you might not need a form library at all.

<Divider />

Server-side feedback is essential in a full-stack application. It offers consistent feedback to users and provides a structured API for any client interacting with your application. Starting with server-side validation ensures that all user interactions with the backend, both successful and error-prone, are properly handled from an architectural standpoint. This creates a solid foundation that can be easily extended with client-side validation.