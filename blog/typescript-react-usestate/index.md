---
title: "TypeScript: React useState Hook"
description: "How to use React's useState Hook with TypeScript by automatically inferring the type or by manually using type assertion ..."
date: "2022-08-02T08:52:46+02:00"
categories: ["React", "React Hooks", "TypeScript"]
keywords: ["typescript react usestate"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

When using React's useState Hook in TypeScript, the method usually infers the implicit type for the returned state from the provided argument automatically. In the following example, React's useState Hook in a [function component](/react-function-component/) knows that it deals with a `number` type. Hence the returned state (here: `count`) has the type `number` in addition to the state updater function (here: `setCount`) which takes a value of type `number` as argument:

```javascript{4}
import * as React from 'react';

const App = () => {
  const [count, setCount] = React.useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button type="button" onClick={handleIncrease}>
        Increase
      </button>

      <div>{count}</div>
    </div>
  );
};

export default App;
```

However, when working with other types than primitives (e.g. complex types for objects, nullish types, union types), inferring the type automatically does not always work. Then you can use type arguments with TypeScript with which you can tell React's useState Hook's generic type explicitly about the type. I like to use this as a best practice anyway, because it makes the code self-descriptive:

```javascript{4}
import * as React from 'react';

const App = () => {
  const [count, setCount] = React.useState<number>(0);

  ...
};
```

If the type argument becomes something else than a primitive, extract it as TypeScript interface:

```javascript{3-6,9-12}
import * as React from 'react';

interface UserFormState {
  email: string;
  password: string;
}

const App = () => {
  const [userForm, setUserForm] = React.useState<UserFormState>({
    email: '',
    password: '',
  });

  ...
};
```

That's it. Mostly you can rely on TypeScript's ability to automatically infer the type. However, sometimes you need to use type arguments from TypeScript to help the TS compiler out. If you want to have self-descriptive code, you can use type arguments anyway.