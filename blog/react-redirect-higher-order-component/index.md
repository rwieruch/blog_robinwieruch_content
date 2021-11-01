---
title: "React Redirect Higher-Order Component"
description: "A reusable higher-order component to redirect a user from a blank page with no data ..."
date: "2021-10-06T07:52:46+02:00"
categories: ["React"]
keywords: ["react redirect higher-order component", "react redirect component"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

When using React Router in React, one can use the Redirect component to navigate a user away from a page in case of a certain condition. For example, the following example does not [render a list](/react-list-component) if there is no data, but redirects a user to the home page instead:

```javascript
import { Redirect } from 'react-router-dom';

const List = ({ data }) => {
  if (!data.length) {
    return <Redirect to='/home' />;
  }

  return (
    <ul>
      {data.map((item) => {
        return <li key={item}>{item}</li>;
      })}
    </ul>
  );
};

export default List;
```

In this case the redirect is well placed. However, if there is much logic happening *before* of the conditional, e.g. by using [React Hooks](/react-hooks) (because they cannot be after a conditional rendering except with this [little trick](/react-conditional-hooks)), then the logic has to execute even though there may be a redirect.

```javascript{4-7}
import { Redirect } from 'react-router-dom';

const List = ({ data }) => {
  // lots of hooks here
  // which is bad, because they execute
  // even though there may be a redirect
  // and all the hooks logic may not be used after all

  if (!data.length) {
    return <Redirect to='/home' />;
  }

  return (
    <ul>
      {data.map((item) => {
        return <li key={item}>{item}</li>;
      })}
    </ul>
  );
};

export default List;
```

Therefore, you can use a [higher-order component](/react-higher-order-components) (HOC) for the redirect, because when wrapping the component into a HOC, the logic of the HOC would occur before the hooks from the wrapped component:

```javascript{1,15-18}
import { withRedirectIfBlank } from './withRedirect'

const List = ({ data }) => {
  // lots of hooks here

  return (
    <ul>
      {data.map((item) => {
        return <li key={item}>{item}</li>;
      })}
    </ul>
  );
};

export default withRedirectIfBlank({
  redirectCondition: (props) => !props.data.length,
  redirectTo: '/home',
})(List);
```

The HOC implementation could look like the following then:

```javascript
import { Redirect } from 'react-router-dom';

const withRedirectIfBlank = (config) => (Component) => (props) => {
  const { redirectCondition, redirectTo } = config;

  if (redirectCondition(props)) {
    return <Redirect to={redirectTo} />;
  }

  return <Component {...props} />;
};

export { withRedirectIfBlank };
```

Higher-Order Components are still useful these days, even though many React developers take them as legacy, because they are from a time when [React Class Components](/react-component-types) where used. Especially when they are used to render conditional JSX. However, if not using any conditional JSX, [using a Hook instead of a HOC](/react-hooks-higher-order-components) is often a better design choice in modern React.
