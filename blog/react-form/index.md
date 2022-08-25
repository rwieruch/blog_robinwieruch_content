---
title: "How to use Forms in React"
description: "How to use Forms in React by example. You will learn how to create a form template in a React functional component with validation to submit data ..."
date: "2022-08-16T06:52:46+02:00"
categories: ["React"]
keywords: ["react form", "react forms", "react form example", "react form template", "react form functional component", "react form submit", "react form onsubmit", "react hook form"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

import UncontrolledForm from './components/UncontrolledForm.js';
import ControlledForm from './components/ControlledForm.js';
import ValidationForm from './components/ValidationForm.js';

<Sponsorship />

Sooner or later every React developer has to handle forms. The following tutorial will give you a comprehensive overview about forms in React.

You will learn how to manage form state in React, the difference of controlled and uncontrolled forms (state vs reference), how to submit a form (e.g. callback handler), and how to reset a form (e.g. after submit). In addition you will learn about advanced topics such as dirty fields and validation in React forms.

While learning how to implement these advanced topics in React without any form library, you will get to know how form libraries would perform these tasks for you. Eventually you will use such form library yourself, for example React Hook Form, to accomplish these more advanced tasks for you.

# Table of Contents

<TableOfContents {...props} />

# React Form by Example

A common example of a form in a [web application](/web-applications/) these days is a login form. It allows the [authentication and authorization](/react-router-authentication/) of a user to access the application. In React, we would use a [functional component](/react-function-component/) to represent such form:

```javascript
import * as React from 'react';

const LoginForm = () => {
  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  );
};

export { LoginForm };
```

The form component displays two HTML input fields with each having an attached HTML label element. All elements are used within a HTML form element.

<ReadMore label="React Elements vs Components" link="/react-element-component/" />

For accessibility reasons in a form, a HTML label element can use a `htmlFor` attribute (React specific) which links to the HTML input element's `id` attribute. When clicking the form's labels, the respective input fields should get focused.

Note that the form does not receive any [props](/react-pass-props-to-component/) yet. Later it could receive props for its [initial state](https://www.robinwieruch.de/react-derive-state-props/) which populate the form or a [callback handler](/react-event-handler/) which gets executed when clicking the form's submit button.

# React Form with onSubmit

When a user clicks the submit button of a form, we can use the HTML form element's onSubmit attribute for attaching an event handler to it. In order to tell the form that the button should initiate the form's event handler, the button has to have the submit type:

```javascript{4-6,9,18}
import * as React from 'react';

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export { LoginForm };
```

For preventing the native browser behavior (which would perform a refresh on the browser), we can use the `preventDefault()` method on the form's event.

<ReadMore label="What is preventDefault in React" link="/react-preventdefault/" />

# Uncontrolled React Form

When submitting a form, we want to read the values from the form. In React we can get access to HTML elements by attaching references to them. So whenever we want to access a HTML element in JSX, we would be using [React's useRef Hook](/react-ref/):

```javascript{4-5,10-11,13,20,24}
import * as React from 'react';

const LoginForm = () => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = emailRef.current.value
    const password = passwordRef.current.value

    alert(email + ' ' + password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" ref={emailRef} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" ref={passwordRef} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export { LoginForm };
```

<Box attached>
  <UncontrolledForm />
</Box>

Attaching a ref to each form field may be too much hassle when taking the uncontrolled form approach. The lazy approach would be reading the form values directly from the form's event, because the form knows its elements and respective values:

```javascript{7-8,10}
import * as React from 'react';

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    alert(email + ' ' + password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export { LoginForm };
```

If we have a straightforward form where we do not need to fiddle with the form state, we could go with the uncontrolled form approach. However, the more idiomatic React way would be using controlled forms.

<ReadMore label="How to useRef with TypeScript" link="/typescript-react-useref/" />

# Controlled React Form

The idiomatic way of using forms in React would be using React's declarative nature. We would use [React's useState Hook](/react-usestate-hook/) to manage the form state ourselves. By updating this state with each input field's `onChange` handler, we can use the state (here: `email` and `password`) respectively by passing it to each input field. This way, each input field gets controlled by React and does not manage its internal native HTML state anymore:

```javascript{4-5,7-9,11-13,18,28-29,37-38}
import * as React from 'react';

const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(email + ' ' + password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmail}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePassword}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export { LoginForm };
```

<Box attached>
  <ControlledForm />
</Box>

Once the form grows gets bigger, you will get to a point where it has too many handlers for managing the state of each form field. Then you can use the following strategy:

```javascript{4-7,9-14,19,29-30,38-39}
import * as React from 'react';

const LoginForm = () => {
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(form.email + ' ' + form.password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export { LoginForm };
```

The strategy unifies all the form state into one object and all event handlers into one handler. By leveraging each form field's identifier, we can use it in the unified handler to update the state by using the identifier as dynamic key.

This scales a controlled form in React well, because state, handler, and form field are not in a 1:1:1 relationship anymore. In contrast, each handler can reuse the state and handler.

# Controlled vs Uncontrolled Forms

In practice there is not much discussion going on about uncontrolled vs controlled forms in React. If the form is simple, one can go with an uncontrolled form. However, once the form gets more requirements (e.g. having control over the state), you would have to use a controlled form.

<ReadMore label="Controlled vs Uncontrolled Components in React" link="/react-controlled-components/" />

The following form example illustrates how to reset a form after a submit operation:

```javascript{3-4,18-19}
const LoginForm = () => {
  const [form, setForm] = React.useState({
    email: 'john@doe.com',
    password: 'geheim',
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setForm({
      email: '',
      password: '',
    });
  };

  return (...);
};
```

While controlled forms are more popular in React, because they allow you a better developer experience for managing the form's state (e.g. initial state, updating state), they are more performance intensive. Each change of the state comes with a re-render of the form. For an uncontrolled form, there are no re-renders. Anyway, most of the time this performance impact isn't perceived by any user.

<ReadMore label="How to use Memo in React" link="/react-memo/" />

# Submit a React Form

You have already seen how to create a submit button for a form in React. So far, we only triggered this button and used its attached event handler, but we didn't send any form data yet. Usually a form component receives a [callback handler](/react-event-handler/) from a parent component which uses the form data:

```javascript{1,17}
const LoginForm = ({ onLogin }) => {
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onLogin(form);
  };

  return (...);
};
```

The example shows how form state is passed to the callback handler as form data. Therefore, once a user clicks the submit button, the parent component will receive the form data and perform a task with it (e.g. [post form data to a backend](/react-hooks-fetch-data/)).

# React Form Reset

Previously you have already seen a form reset example. However, in the previous example we reset each form field in the form state one by one (e.g. email and password). However, if we would extract the form state from the beginning as initial state to get started in the first place, we could reuse this initial state for the reset:

```javascript{1-4,7,16}
const INITIAL_STATE = {
  email: '',
  password: '',
};

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = React.useState(INITIAL_STATE);

  ...

  const handleSubmit = (event) => {
    event.preventDefault();

    // call your component's callback handler, e.g. onLogin

    setForm(INITIAL_STATE);
  };

  return (...);
};
```

<Box attached>
  <ControlledForm withReset />
</Box>

Extracting the initial form state as variable often makes sense when dealing with forms in React. The reset is only one valuable example where this approach comes to fruition.

# React Form Template

The previous examples have given you many copy and paste templates which get you started with a form in React. However, so far we have only used two HTML input elements in a React form. There are many other form fields that you could add as [reusable component](/react-reusable-components/):

- [React Checkbox](/react-checkbox/)
- [React Radio Button](/react-radio-button/)
- [React Dropdown](/react-dropdown/)

<Divider />

You have seen the basic usage of forms in React. Next we will walk through some more advanced form concepts which should illustrate the complexity of forms. While you walk through them, you learn how to implement these advanced concepts, however, note that eventually a dedicated form library will take care of these implementations.

# React Form Dirty

A form is dirty if one of its form fields has been changed by a user. When using forms, the dirty state helps with certain scenarios. For example, the submit button should only be enabled if a form field has changed:

```javascript{6-12,19,21-23,28}
const INITIAL_STATE = {
  email: '',
  password: '',
};

const getDirtyFields = (form) =>
  Object.keys(form).reduce((acc, key) => {
    // check all form fields that have changed
    const isDirty = form[key] !== INITIAL_STATE[key];

    return { ...acc, [key]: isDirty };
  }, {});

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = React.useState(INITIAL_STATE);

  ...

  const dirtyFields = getDirtyFields(form);

  const hasChanges = Object.values(dirtyFields).every(
    (isDirty) => !isDirty
  );

  return (
    <form onSubmit={handleSubmit}>
      ...
      <button disabled={hasChanges} type="submit">
        Submit
      </button>
    </form>
  );
};
```

The previous code snippet shows an implementation of establishing a [computed state](/react-computed-properties/) which knows about each form field's dirty state. However, this already shows the complexity of managing this dirty state yourself. Hence my recommendation of using a form library like React Hook Form.

# React Form with Validation

The most common culprit for using a form library is the validation of forms. While the following implementation seems rather straightforward, there are lots of moving parts which go into a sophisticated validation. So stay with me and learn how to perform such task yourself, but don't hesitate to use a form library for it eventually:

```javascript{6-23,25-40,47-48}
const INITIAL_STATE = {
  email: '',
  password: '',
};

const VALIDATION = {
  email: [
    {
      isValid: (value) => !!value,
      message: 'Is required.',
    },
    {
      isValid: (value) => /\S+@\S+\.\S+/.test(value),
      message: 'Needs to be an email.',
    },
  ],
  password: [
    {
      isValid: (value) => !!value,
      message: 'Is required.',
    },
  ],
};

const getErrorFields = (form) =>
  Object.keys(form).reduce((acc, key) => {
    if (!VALIDATION[key]) return acc;

    const errorsPerField = VALIDATION[key]
      // get a list of potential errors for each field
      // by running through all the checks
      .map((validation) => ({
        isValid: validation.isValid(form[key]),
        message: validation.message,
      }))
      // only keep the errors
      .filter((errorPerField) => !errorPerField.isValid);

    return { ...acc, [key]: errorsPerField };
  }, {});

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = React.useState(INITIAL_STATE);

  ...

  const errorFields = getErrorFields(form);
  console.log(errorFields);

  return (...);
};
```

By having all the errors per form field as computed properties, we can perform tasks like preventing a user from submitting the form if there is a validation error:

```javascript{7-8}
const LoginForm = ({ onLogin }) => {
  ...

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasErrors = Object.values(errorFields).flat().length > 0;
    if (hasErrors) return;

    // call your component's callback handler, e.g. onLogin
  };

  return (...);
};
```

What may be almost more important is showing the user feedback about form errors. Because we have all the errors there, we can display them [conditionally](/conditional-rendering-react/) as hints in JSX:

```javascript{16-20,30-34}
const LoginForm = () => {
  ...

  const errorFields = getErrorFields(form);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={form.email}
          onChange={handleChange}
        />
        {errorFields.email?.length ? (
          <span style={{ color: 'red' }}>
            {errorFields.email[0].message}
          </span>
        ) : null}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        {errorFields.password?.length ? (
          <span style={{ color: 'red' }}>
            {errorFields.password[0].message}
          </span>
        ) : null}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
```

<Box attached>
  <ValidationForm />
</Box>

<Divider />

Learning more and more about form handling in React reveals how complex certain topics become over time. We only touched the surface here. It's great to learn how everything works under the hood, hence this tutorial about forms in React, however, eventually you should opt-in a form library like React Hook Form.

# Form Library: React Hook Form

My go-to form library these days in [React Hook Form](https://react-hook-form.com/). One could say that it is a headless form library, because it doesn't come with any form components, but just with [custom React Hooks](/react-custom-hook/) which allow you to access form state, dirty state, and validation state. But there is much more: Integration in third-party UI libraries, performant re-renders, form watchers, and usage of third-party validation libraries like Yup and Zod.

<ReadMore label="Popular React Libraries" link="/react-libraries/" />
