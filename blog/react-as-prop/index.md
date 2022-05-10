---
title: 'React "as" Prop'
description: 'Using the "as" prop in React, also calles "component" or "variant" prop, enables React developers to combine semantics with aesthetics in a flexible way ...'
date: "2022-05-10T11:52:46+02:00"
categories: ["React"]
keywords: ["react as prop"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

You may have noticed the "as" prop when working with [modern UI component libraries](/react-libraries/). Essentially the "as" prop allows you to replace rendered HTML elements in a React component from the outside by [passing them in as props](/react-pass-props-to-component/):

```javascript
const Headline = ({ as = 'h1', children }) => {
  const As = as;
  return <As>{children}</As>;
};

const App = () => {
  return (
    <>
      <Headline>Hello React</Headline>
      <Headline as="h2">Hello React</Headline>
    </>
  );
};
```

Usually it is called "as" prop, however, one can see it also as "component", "element", "variant" prop -- or a combination of two of them. For example, one use case for using a combination of "component" and "variant" prop could be the following:

```javascript
const Headline = ({ component, variant, children }) => {
  const Component = component;
  return <Component className={variant}>{children}</Component>;
};

const App = () => {
  return (
    <main>
      <div>
        <Headline component="h1" variant="h1">
          Web Development Explained
        </Headline>
      </div>
      <div>
        <Headline component="h2" variant="h1">
          React Explained
        </Headline>
      </div>
    </main>
  );
};
```

In this example, we have two headlines for two sections of an article. While both headlines should look the same in the article (variant), they should be semantically different (component), because there can only be one h1 HTML element on the page.

If you want to use TypeScript for the variant, component, or as prop, check out the following code snippet:

```javascript
interface HeadlineProps {
  component: React.ElementType;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
}

const Headline: React.FC<HeadlineProps> = ({
  component,
  variant,
  children,
}) => {
  const Component = component;
  return <Component className={variant}>{children}</Component>;
};
```

That's it. Especially when you are creating in-house UI component libraries or design systems, these props become important when dealing with combinations of semantics and aesthetics.