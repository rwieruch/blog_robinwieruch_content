---
title: "Styled Components Best Practices"
description: "A comprehensive list of Styled Components Best Practices for React developers ..."
date: "2021-04-11T03:55:46+02:00"
categories: ["React"]
keywords: ["styled components best practices"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

When working with multiple developers on one React application, it's always good to align the team on a common set of best practices. This holds also true for [styling React components](/react-css-styling/). Over the past years, I was fortunate to work with many React freelance developers on different applications where we had to **align the best practices throughout the project**. While there were certainly applications styled with CSS-in-CSS (e.g. CSS Modules) or Utility-first CSS (e.g. Tailwind), the chance of working with Styled Components (CSS-in-JS) was pretty high, because it's one of the most popular styling approaches.

In this guide, I want to give you an overview of the best practices, we tried to establish as a team when working with Styled Components and which I tried to refine from project to project. As you will see, sometimes there is no right way to do it, because it depends more on the mindset your team aligns on. However, these tips and tricks should help you using Styled Components by example in a consistent way.

# Co-Located Styled Components

The great thing about styled components -- and CSS-in-JS in general -- is that CSS is defined in JavaScript files. When starting out with styled components, you will often just define a styled component next to your actual React component:

```javascript
const Headline = styled.h1`
  color: red;
`;

const Content = ({ title, children }) => {
  return (
    <section>
      <Headline>{title}</Headline>

      <span>{children}</span>
    </section>
  );
};
```

Co-locating styled components to your actual components comes with many benefits. If you happen to on-board new React developers to your codebase, it's simple for them to find the related style definitions for each component. If you want to delete a React component, it's easily deleted. If you want to change style for the actual component, just head over to the styled component and adjust it.

If the JavaScript file stays small, it's okay to keep the styled component(s) close to the actual component in one file. Some developers prefer to have the actual component at the top and the styled component(s) at the bottom though, which is possible due to JavaScript's hoisting:

```javascript
const Content = ({ title, children }) => {
  return (
    <section>
      <Headline>{title}</Headline>

      <span>{children}</span>
    </section>
  );
};

const Headline = styled.h1`
  color: red;
`;
```

Once a component file grows in size, me and the team always aligned on co-locating the styles in another file next to the actual component's file. This is always a great opportunity to take your [React project's folder structure](/react-folder-structure/) to a next level. You will often see some kind of variation of the following component folder:

```text
- Section/
--- index.js
--- styles.js
```

This still co-locates the styled components to your actual component, however, instead of having them within the same file, they are in the same component folder. Following this approach, you and your team still get the same benefits of co-locating your styles to your React components; and it adds even more advantages:

First, it's less noise for React developers, because they can focus either on the actual component's implementation details or on the component's style. Second, it helps developers who are used to work with CSS-in-CSS to align their mental model with the CSS-in-JS strategy by still having co-located files for styling. And third, developers can keep a high confidence in their code and that they are not breaking other styles, because everything is holding together in one component folder.

As a note on the side: If you come across style duplications across your styled components, consider using Styled Component's css utility function:

```javascript
import styled, { css } from 'styled-components';

const red = css`
  color: red;
`;

const Headline = styled.h1`
  ${red}

  font-size: 20px;
`;

const Text = styled.p`
  ${red}

  font-size: 16px;
`;
```

Last but not least: What happens if you want to **share a styled component across multiple components**? The answer is the same as for any other React component: Keep them in a more top-level folder where it can be imported by more than one component folder. If you change the style of the styled component, check all components which import it. If no component uses the style anymore, delete the styled component from the top-level folder. If you want to use global styles, then you may want to check Styled Component's `createGlobalStyle` utility function.

# Import Styled Components as Object

Co-locating styled components with an extra JavaScript file next to the actual component's file becomes the status quo for growing React applications eventually. The following pattern for importing styled components should be pretty familiar to developers:

```javascript
import { Headline } from './styles';

const Content = ({ title, children }) => {
  return (
    <section>
      <Headline>{title}</Headline>

      <span>{children}</span>
    </section>
  );
};
```

What's important here is that styled components from a co-located file get usually exported with a [named export](/javascript-import-export/), so that they can be imported with a named import. However, even though styled components should be simply seen as React components, it's not always easy to spot a styled component in a growing React component's JSX.

In contrast, importing an entire file's content as an object is often more beneficial:

```javascript{1,6}
import * as Styled from './styles';

const Content = ({ title, children }) => {
  return (
    <section>
      <Styled.Headline>{title}</Styled.Headline>

      <span>{children}</span>
    </section>
  );
};
```

Developers tend to import all their styles either with `Styled` or in an even more short form naming convention:

```javascript{1,6}
import * as S from './styles';

const Content = ({ title, children }) => {
  return (
    <section>
      <S.Headline>{title}</S.Headline>

      <span>{children}</span>
    </section>
  );
};
```

Importing your styled components this way comes with three benefits: First, your import statement is simple, short and always stays the same. Second, to expose a new styled component from your co-located styles file, one only needs a named export from this file. And third, when aligning the team on a common naming structure for the imported style object, spotting styled components in your React component's JSX becomes straightforward.

In conclusion, when importing styled components with named imports, often the project will end up with multiple naming conventions for these components (usually named StyledHeadline or Headline) which are not always aligned to each other. If you team aligns on one [naming convention](/javascript-naming-conventions/) from the start, it's easier to avoid these bad practices when importing a file's entire content rather than importing every component one by one.

# Single/Multiple Styled Components

There are two ends of a spectrum for approaches when using Styled Components. It's important to know that this is a spectrum, and I will show two extreme versions of it, because after all there are many more liberal approaches in between.

On the left side of the spectrum, there is the approach when everything with style becomes a styled component. Thus every styled component is responsible for its style.

```javascript{1-4,6-8,10-12,16,17,19,20}
const Section = styled.section`
  border-bottom: 1px solid grey;
  padding: 20px;
`;

const Headline = styled.h1`
  color: red;
`;

const Text = styled.span`
  padding: 10px;
`;

const Content = ({ title, children }) => {
  return (
    <Section>
      <Headline>{title}</Headline>

      <Text>{children}</Text>
    </Section>
  );
};
```

Usually this is the most popular approach and I think it's mostly because developers have a greater acceptance of JavaScript over CSS. Thus using only styled components without the need for CSS classes or CSS selectors keeps it simpler. In addition, it supports the mental mindset of "everything is a component".

On the other side of the spectrum, a few proponents aligned on using only one root component (usually named Container or Wrapper) and everything else becomes CSS. Normally this approach is preferred by more CSS savvy developers, because they are using all the advantages of CSS (and its extensions). It also keeps the JSX more pure with HTML (semantically) and CSS instead of having components everywhere.

```javascript{1-12,16,17,19,20}
const Container = styled.section`
  border-bottom: 1px solid grey;
  padding: 20px;

  h1 {
    color: red;
  }

  .text {
    padding: 10px;
  }
`;

const Content = ({ title, children }) => {
  return (
    <Container>
      <h1>{title}</h1>

      <span className="text">{children}</span>
    </Container>
  );
};
```

However, this approach can be more error prone, because the style matchings are not as explicit anymore. Whereas you will be notified by your code environment when you have used a styled component that's not defined, you will not be notified if you have a typo in your CSS selectors. In addition, it becomes more difficult for tools like linting or code elimination to spot the erroneous or dead CSS.

As mentioned, this is a spectrum and you will see many versions in between. Here I learned that it becomes really difficult to enforce one code style among many developers and teams. However, once all developers align on one mindset, the maintainability of the styling will improve significantly over time. Depending on the team's experience with CSS, I'd recommend to use either a more JavaScript or CSS centred approach.

# Props or Class for Styled Components

Earlier I mentioned that developers are leaning more towards using JavaScript than CSS. You can often see this for using a [React prop](/react-pass-props-to-component/) or a CSS class for a styled component too. Let's take the following example where we could either use a prop or a class.

We will start this off with the CSS class:

```javascript{2,9-11,19}
import styled from 'styled-components';
import cs from 'classnames';

...

const Text = styled.span`
  padding: 10px;

  &.invalid {
    text-decoration: line-through;
  }
`;

const Content = ({ title, isStrikeThrough, children }) => {
  return (
    <Section>
      <Headline>{title}</Headline>

      <Text className={cs({ invalid: isStrikeThrough })}>
        {children}
      </Text>
    </Section>
  );
};
```

In contrast, when using a React prop it would look like the following:

```javascript{6-7,15}
...

const Text = styled.span`
  padding: 10px;

  text-decoration: ${(props) =>
    props.invalid ? 'line-through' : 'none'};
`;

const Content = ({ title, isStrikeThrough, children }) => {
  return (
    <Section>
      <Headline>{title}</Headline>

      <Text invalid={isStrikeThrough}>{children}</Text>
    </Section>
  );
};
```

Either way works and your team needs to decide what works best for you and the project. However, I like to go with the former approach of using a CSS class, even though it's seems less popular and even though the [classnames](https://www.npmjs.com/package/classnames) utility library is often needed to keep it clean.

However, using a CSS class comes with the benefit of keeping the CSS more towards its pure nature. If you have developers in your team that are CSS savvy, or that are more used to work with JavaScript and CSS from the time before React, consider using it. Using React props for CSS-in-JS is tightly coupled to how things work in React's universe and is not easily transferable to other environments.

After all, I am not against using React props for style, I am just in favor of using it for a more specific use case. My recommendation would be using props only if *dynamic* style is needed:

```javascript{2,16}
const Headline = styled.h1`
  color: ${(props) => props.color};
`;

const Text = styled.span`
  padding: 10px;

  &.invalid {
    text-decoration: line-through;
  }
`;

const Content = ({ title, isStrikeThrough, color, children }) => {
  return (
    <Section>
      <Headline color={color}>{title}</Headline>

      <Text className={cs({ invalid: isStrikeThrough })}>
        {children}
      </Text>
    </Section>
  );
};
```

The last example clearly shows how a team of developers could distinguish when to use a CSS class and when to use a React prop. A CSS class can always be used when it's either always there or when it can be toggled with a boolean flag. Beyond this, if something cannot be defined by a CSS class, like the `color`, one can use a prop for it.

# Styled Components Props Best Practices

There are a few best practices I see when using props for dynamic style in Styled Components. First, keeping the parameter name either short or destructuring it right away. Here the same rules as for [function components in React](/react-function-component/) apply, because props are almost never used directly, instead we want to use their content:

```javascript{2,6}
const Headline = styled.h1`
  color: ${(p) => p.color};
`;

const Text = styled.span`
  padding: ${({ padding }) => padding}px;
`;
```

Next we want to use [transient props](https://styled-components.com/docs/api#transient-props) with styled components, because they benefit us twofold: First, it marks the prop as only consumable by the styled component and thus the prop will not be passed to the HTML element as attribute. Second, it makes it more obvious for every developer when scanning React's JSX to see what props are consumed by the styled component and what props are used by the DOM:

```javascript{2,8}
const Button = styled.button`
  color: ${(p) => p.$color};
`;

const ClickMe = ({ color, disabled, onClick }) => {
  return (
    <Button
      $color={color}
      disabled={disabled}
      onClick={onClick}
    >
      Click Me
    </Button>
  );
};
```

Last but not least, use [polymorphic props](https://styled-components.com/docs/api#as-polymorphic-prop) if you want to change your styled component's underlying HTML element. For example, for a button which should just be a link to some other URL, you can conditionally assign a different HTML element:

```javascript
const ClickMe = ({ to = '', onClick = () => {} }) => {
  return (
    <ButtonOrLink
      as={to ? 'a' : 'button'}
      to={to}
      onClick={onClick}
    >
      Click Me
    </ButtonOrLink>
  );
};
```

There are several hidden gotchas in the Styled Component's API, so check all of them to get the best out of this world. It makes also sense to go through these features with the whole team to settle on agreed ways of doings things.

<ReadMore label="How to use Context in Styled Components" link="/react-usecontext-hook/" />

<Divider />

You see that there is not one right way to use Styled Components, however, once you know your options, you can decide more informed how to apply these to your React project. Most often it really depends on the developers, whether they are CSS purists or lean more towards JavaScript.

Last but not least, you may want to activate better [debugging for Styled Components](https://styled-components.com/docs/tooling#better-debugging). After enabling it, the browser's developer tools will show you the component's `displayName` attached to the element's CSS class. Therefore it becomes easier for every developer to spot which Styled Component is actually used in the compiled HTML.
