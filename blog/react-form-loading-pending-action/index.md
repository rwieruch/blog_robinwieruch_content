---
title: "React Form with Loading State (Pending Action)"
description: "Learn how to add a loading state to React forms when using actions. Show a loading spinner while the form is submitting ..."
date: "2024-06-17T07:50:46+02:00"
categories: ["React"]
keywords: ["react form loading", "react form pending", "react form indicator", "react form spinner", "react action loading", "react action pending"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

In this short tutorial, you will learn about multiple ways to show a loading spinner in React forms when using actions with a pending state. You can use the loading state to indicate that the form is submitting and prevent users from submitting the form multiple times. We will start with the following React form component that sends a message:

```tsx
const App = () => {
  const sendMessage = (formData: FormData) => {
    const message = formData.get("message");

    console.log(message);

    // TODO: do call (e.g. API call) to send the message
  };

  return (
    <form action={sendMessage}>
      <label htmlFor="message">Message:</label>
      <input name="message" id="message" />

      <button type="submit">Send</button>
    </form>
  );
};
```

In the above code snippet, the `sendMessage` function is called when the form is submitted. The form action receives the raw form data as an argument and can extra the data from it. But what if you want to show a loading spinner while the form is submitting?

```tsx{2,7-8,13,20-21}
const App = () => {
  const sendMessage = async (formData: FormData) => {
    const message = formData.get("message");

    console.log(message);

    // artificial delay to simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // TODO: do call (e.g. API call) to send the message
  };

  const isPending = false; // how to get this value?

  return (
    <form action={sendMessage}>
      <label htmlFor="message">Message:</label>
      <input name="message" id="message" />

      <button type="submit" disabled={isPending}>
        {isPending ? "Sending ..." : "Send"}
      </button>
    </form>
  );
};
```

We will get to know three ways to show a loading spinner by using the pending state in a React form when submitting it with actions. The previous code will be our starting point for each of the three ways.

# React's useActionState Hook

React's **useActionState** Hook may be the most used way to show a loading spinner in React forms, because this hook allows you to attach state to an action. In other words: You can send state to the server and get the state back from the server -- covering the whole lifecycle of an action. However, in our case, we only need the pending state to show a loading spinner:

```tsx{1,4,14,17,20}
import { useActionState } from "react";

const App = () => {
  const sendMessage = async (_actionState: null, formData: FormData) => {
    const message = formData.get("message");

    console.log(message);

    // artificial delay to simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // TODO: do call (e.g. API call) to send the message

    return null;
  };

  const [_actionState, action, isPending] = useActionState(sendMessage, null);

  return (
    <form action={action}>
      <label htmlFor="message">Message:</label>
      <input name="message" id="message" />

      <button type="submit" disabled={isPending}>
        {isPending ? "Sending ..." : "Send"}
      </button>
    </form>
  );
};
```

We are enhancing the `sendMessage` action with React's useActionState Hook. The hook returns an array with three elements: The first element is the action state (which is `null` and unused in this example), the second element is the enhanced action, and the third element is the pending state. We are only interested in the pending state, which we use to disable the submit button and show a loading spinner, but we should not forget to use the enhanced action as the form action.

React's useActionState Hook may not be the easiest of the three ways to show a loading spinner in React forms, because it comes with so much more than a simple pending state. But if you need more than just a pending state, e.g. to show an error message by leveraging the `actionState`, you should consider using this hook.

# React's useFormStatus Hook

If it is only about the pending state of a form to show a loading indicator and you do not need any state attached to the action (read: `actionState`), then React's **useFormStatus** Hook is the way to go. It provides the pending state of a form, but in order to make it work, it needs to run in its own component which is rendered as a child in the HTML form element:

```tsx{1,3-11,30}
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Sending ..." : "Send"}
    </button>
  );
};

const App = () => {
  const sendMessage = async (formData: FormData) => {
    const message = formData.get("message");

    console.log(message);

    // artificial delay to simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // TODO: do call (e.g. API call) to send the message
  };

  return (
    <form action={sendMessage}>
      <label htmlFor="message">Message:</label>
      <input name="message" id="message" />

      <SubmitButton />
    </form>
  );
};
```

Using React's useFormStatus Hook in a child component of the form is a pitfall that you should be aware of. If the hook would be used in the `App` component, it would not know to which form it belongs, because the `App` component could render multiple forms. By using the hook in a child component, it knows its surrounding form with the pending action.

Of course you can use React's useActionState and useFormStatus Hooks together. While the former would not provide the pending state but only the action state, the latter would be used solely for the pending state. This way you can implement a reusable SubmitButton component that can be used in multiple forms and can be assured that it always shows the correct loading indicator.

# React's useTransition Hook

React's **useTransition** Hook is the underdog when it comes to showing a loading spinner in React forms. Usually you would go with React's useActionState or useFormStatus Hooks, but the useTransition Hook is an alternative if you work with more complex none blocking UI updates.

```tsx{1,15,17-21,24}
import { useTransition } from "react";

const App = () => {
  const sendMessage = async (formData: FormData) => {
    const message = formData.get("message");

    console.log(message);

    // artificial delay to simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // TODO: do call (e.g. API call) to send the message
  };

  const [isPending, startTransition] = useTransition();

  const action = (formData: FormData) => {
    startTransition(async () => {
      await sendMessage(formData);
    });
  };

  return (
    <form action={action}>
      <label htmlFor="message">Message:</label>
      <input name="message" id="message" />

      <button type="submit" disabled={isPending}>
        {isPending ? "Sending ..." : "Send"}
      </button>
    </form>
  );
};
```

The useTransition Hook is not only about showing a loading spinner, but it is about transitioning from one state to another. It is a powerful tool to handle complex UI updates, but it is also more complex to use than the other two hooks. If you only need to show a loading spinner in a React form, you should go with the useActionState or useFormStatus hook.

<Divider />

In this tutorial, you learned about three ways (useActionState, useFormStatus, and useTransition) to show a loading spinner in React forms when using actions with a pending state. You can use the loading state to indicate that the form is submitting and prevent users from submitting the form multiple times.