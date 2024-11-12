---
title: "React and FormData"
description: "Learn how to handle FormData in React when submitting it with a (Server) Action to the server ..."
date: "2024-11-11T06:50:46+02:00"
categories: ["React"]
keywords: ["react form data"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

When submitting a form in React with a form action, you may be confronted with the question of how to handle the [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) when submitting it to the server with an action.

Let's start with a straight forward example where a user can create a invoice by using a form. When a user submits the form, the data is sent to the server with a form action:

```tsx
import { createInvoice } from "../actions/create-invoice";

const InvoiceCreateForm = () => {
  return (
    <form action={createInvoice}>
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" id="name" />

      <label htmlFor="amount">Amount:</label>
      <input type="number" name="amount" id="amount" />

      <button type="submit">Send</button>
    </form>
  );
};

export default InvoiceCreateForm;
```

The equivalent action in [another file of the same feature folder](/react-folder-structure/) would get the FormData and extract the data into a JavaScript object. Afterward you may want to send the data to the server (client-side action) or, when using a framework like [Next](https://www.road-to-next.com/) which supports Server Actions, directly create a invoice in the database (server-side action):

```ts
export const createInvoice = (formData: FormData) => {
  const data = {
    title: formData.get("title"),
    amount: formData.get("amount"),
  };
};
```

If the equivalent action should [run on the server](/next-server-actions/) or is called in a Server Component, you would have the add the server directive on top of the file and make the function async:

```ts{1,3}
"use server";

export const createInvoice = async (formData: FormData) => {
  const data = {
    title: formData.get("title"),
    amount: formData.get("amount"),
  };
};
```

We keep it a client-side action for the sake of simplicity. Now comes the question how to handle the FormData in a better way. Let's start by not extracting each entry one by one, but by converting the FormData into a JavaScript object in more concise way:

```ts{2}
export const createInvoice = (formData: FormData) => {
  const data = Object.fromEntries(formData);
};
```

To keep it descriptive though, you can destructure the returned values from the object:

```ts{2}
export const createInvoice = (formData: FormData) => {
  const { title, amount } = Object.fromEntries(formData);
};
```

Last you may also want to have them typed properly. Personally I like to use Zod for this use case (on the server-side if possible, due to the size of the library):

```ts{1,3-6,9,11}
import { z } from "zod";

const createInvoiceSchema = z.object({
  title: z.string().min(3).max(191),
  amount: z.coerce.number().positive(),
});

export const createInvoice = (formData: FormData) => {
  const { title, amount } = createInvoiceSchema.parse(
    Object.fromEntries(formData)
  );
};
```

By parsing the object with the schema, you can ensure that the data is typed. As a little bonus you get validation errors if the data doesn't match the schema.

However, with `Object.fromEntries` we introduced a bug where multiple values with the same key are not handled correctly. Take for instance the following form where it is possible to select multiple checkboxes with the same name or multiple options in a select HTML element:

```tsx{10-11,13-14,16-17,19-23}
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

      <label htmlFor="opts">Options:</label>
      <select name="opts" multiple id="opts">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>

      <button type="submit">Send</button>
    </form>
  );
};
```

Now `Object.fromEntries` would only take the last value of the same key, because it is not designed to handle multiple values with the same key. To handle this case, you can modify the function to handle multiple values with the same key by using `formData.getAll`:

```ts{6-8,12-16}
import { z } from "zod";

const createInvoiceSchema = z.object({
  title: z.string().min(3).max(191),
  amount: z.coerce.number().positive(),
  draft: z.coerce.boolean(),
  features: z.array(z.string()).optional(),
  opts: z.array(z.string()).optional(),
});

export const createInvoice = (formData: FormData) => {
  const { title, amount, draft, features, opts } = createInvoiceSchema.parse({
    ...Object.fromEntries(formData),
    features: formData.getAll("features"),
    opts: formData.getAll("opts"),
  });
};
```

Now you can handle multiple values with the same key correctly. If you have a React application with many forms and you don't want to deal with this edge case every time, you can use a library like [zod-form-data](https://www.npmjs.com/package/zod-form-data) which handles this case for you:

```ts{2,4-10,13-14}
import { z } from "zod";
import { zfd } from "zod-form-data";

const createInvoiceSchema = zfd.formData({
  title: zfd.text(z.string().min(3).max(191)),
  amount: zfd.numeric(z.number().positive()),
  draft: zfd.checkbox(),
  features: zfd.repeatable(),
  opts: zfd.repeatable(),
});

export const createInvoice = (formData: FormData) => {
  const { title, amount, draft, features, opts } =
    createInvoiceSchema.parse(formData);
};
```

That's it. By using `Object.fromEntries` you can convert the FormData into a JavaScript object in a concise way. By using Zod you can type the object and validate the data. And by using `formData.getAll` you can handle multiple values with the same key correctly. If this happens often in your application, you can use a library like zod-form-data to handle this case for you.
