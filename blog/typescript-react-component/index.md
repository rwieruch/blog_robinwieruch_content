---
title: "React Component with TypeScript"
description: "Learn how to use TypeScript for a React component by example for type safe props and a type safe render ..."
date: "2022-11-15T16:56:46+02:00"
categories: ["React", "TypeScript"]
keywords: ["typescript react component"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

When using [function components](/react-function-component/) in React, we may want to type their [props](/react-pass-props-to-component/) with TypeScript. Overall there are two ways of making a React component type safe with TypeScript, however, let's start by converting the following JavaScript React component to a TypeScript React component as leading example:

```javascript
const Select = ({ label, value, options, onChange }) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};
```

<ReadMore label="How to create a Select component in React" link="/react-select/" />

The straightforward yet most verbose way of typing this React component would be inlining the types in the functional component's function signature:

```typescript{6-11}
const Select = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};
```

From there, we would start extracting reusable types from the functional component's function signature into a standalone TypeScript type. It's up to you whether you prefer using a type or interface:

```typescript{1,3,13}
type Option = { label: string; value: string };

type Options = Option[];

const Select = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Options;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};
```

Since React props are just a JavaScript object, we can extract a type respectively to the React function component's props too:

```typescript{5-10,12}
type Option = { label: string; value: string };

type Options = Option[];

type SelectProps = {
  label: string;
  value: string;
  options: Options;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ label, value, options, onChange }: SelectProps) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};
```

In the beginning I mentioned that there are two ways of make a React component type safe. The last code snippet already showed you one way of doing it. A more popular way would be using TypeScript's type annotation syntax:

```typescript{12,17}
type Option = { label: string; value: string };

type Options = Option[];

type SelectProps = {
  label: string;
  value: string;
  options: Options;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select: React.FC<SelectProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};
```

After all, the syntax is up to you and your team. It would be important to align on one way of doing it though. Last but not least, you can also define a React component's return type even though it is usually inferred:

```typescript{6}
const Select: React.FC<SelectProps> = ({
  label,
  value,
  options,
  onChange,
}): JSX.Element => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};
```

That's it. You can make a function component's props type safe in TypeScript by using a type or interface. We have used the former here. In addition, you have two variations of defining types that I have presented here. Last but not least, you can optionally type a function component's return type.