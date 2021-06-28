---
title: "How to useContext in React"
description: "A tutorial about React's useContext hook by example for React's Context. The useReducer helps you to access React's Context in any function component below your Context Provider ..."
date: "2021-06-27T13:50:46+02:00"
categories: ["React"]
keywords: ["react usecontext"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 2 in this series." links={[{ prefix: "Part 1:", label: "React Context", url: "/react-context/" }]} />

React's [Function Components](/react-function-component) come with [React Hooks](/react-hooks) these days. Not only can React Hooks be used for [State in React](/react-state) (e.g. [useState](/react-usestate-hook) and [useReducer](/react-usereducer-hook)) but also for **consuming React's Context**.

This tutorial shows you how to use **React's useContext Hook**. Before, make sure to read my [React Context](/react-context) tutorial which offers answers to the following questions:

* Why React Context?
* What is React Context?
* How to use React Context?
* When to use React Context?

# React's useContext Hook

In the following example, we have a bookstore where we want to show the user a [list](/react-list-component) of books whereas each book has a title and a price tag. Depending on where the user comes from, we want to show the price in the desired currency. Let's say our *src/App.js* looks the following way:

```javascript
import React from 'react';

const DATA = [
  {
    id: '1',
    title: 'The Road to React',
    price: 19.99,
  },
  {
    id: '2',
    title: 'The Road to GraphQL',
    price: 29.99,
  },
];

const App = () => {
  return (
    <div>
      <Books list={DATA} />
    </div>
  );
};

const Books = ({ list }) => {
  return (
    <ul>
      {list.map((item) => (
        <Book key={item.id} item={item} />
      ))}
    </ul>
  );
};

const Book = ({ item }) => {
  return (
    <li>
      {item.title} - {item.price}
    </li>
  );
};

export default App;
```

React's Context is initialized with React's `createContext` top-level API. It's worth to note that context should always be initialized in a separate file (e.g. *src/currency-context.js* or *src/contexts/currency.js*), because we will reuse it across the entire application:

```javascript
import React from 'react';

const CurrencyContext = React.createContext(null);

export { CurrencyContext };
```

React's `createContext` function takes an *initial value* which will be the *default value* if the following Provider component does not provide one -- meaning if no `value` prop is defined. In our example though, the Provider component will provide a static (or unstateful) value as context:

```javascript{3,9,11}
import React from 'react';

import { CurrencyContext } from './currency-context';

...

const App = () => {
  return (
    <CurrencyContext.Provider value="€">
      <Books list={DATA} />
    </CurrencyContext.Provider>
  );
};
```

The Context object which we have created before exposes a Provider component -- which is most often used somewhere at the top-level (e.g. App component) of your React application to **provide its context to all child components** (who are interested in it) below.

This means that we are not passing the value via [props](/react-pass-props-to-component). Instead we **pass the value via context**.

In addition, the Context object exposes a Consumer component -- which can be used in all child components (somewhere below the Provider component) which need to access the context:

```javascript{3-4,6,8-9}
const Book = ({ item }) => {
  return (
    <CurrencyContext.Consumer>
      {(currency) => (
        <li>
          {item.title} - {item.price} {currency}
        </li>
      )}
    </CurrencyContext.Consumer>
  );
};
```

That's the most basic approach of using React's Context API with a single top-level Provider component and one Consumer component in a React child component without Hooks. There can be more than one child component using the Consumer component though.

Now comes the important act where we migrate to **React's useContext Hook**. As you can see, the Consumer component coming from React's Context is by default a [render prop component](/react-render-props). In a world where we can use React Hooks, a render prop component isn't always the best choice.

Let's see the previous example with React's useContext Hook instead:

```javascript{2,6}
const Book = ({ item }) => {
  const currency = React.useContext(CurrencyContext);

  return (
    <li>
      {item.title} - {item.price} {currency}
    </li>
  );
};
```

React's useContext Hook takes the Context as parameter to retrieve the `value` from it. Using the React Hook instead of the Consumer component makes the code more readable, less verbose, and doesn't introduce a component (here Consumer component) in between.

In our example, the App and Book components sit in the same file. This means that the context has to be imported only once and therefore putting it in a separate file isn't warranted. However, in a small application like this context isn't needed in the first place.

<ReadMore label="React Folder Structure" link="/react-folder-structure" />

# Stateful Context in React with useContext

In the previous example, the context has been a static (or unstateful) value. In most use cases though, context will be used to pass a stateful value. We will address this issue now, because a user may wants to change the currency and thus wants to see the respective symbol.

```javascript{2,5,6-11}
const App = () => {
  const [currency, setCurrency] = React.useState('€');

  return (
    <CurrencyContext.Provider value={currency}>
      <button type="button" onClick={() => setCurrency('€')}>
        Euro
      </button>
      <button type="button" onClick={() => setCurrency('$')}>
        US Dollar
      </button>

      <Books list={DATA} />
    </CurrencyContext.Provider>
  );
};
```

By clicking one of the buttons, the [inline event handlers](/react-event-handler) will change the stateful value. Because there is a re-rendering happening after the state change, the modified value gets passed via the Provider component to all child components which display it as dynamic value.

We have switched the context from unstateful to stateful. What's missing to make the example feature complete is the converted amount, because only changing the symbol isn't enough.

Making things more organized, we will first introduce a dictionary:

```javascript{1-10,13,19,21,25,27,42}
const CURRENCIES = {
  Euro: {
    symbol: '€',
    label: 'Euro',
  },
  Usd: {
    symbol: '$',
    label: 'US Dollar',
  },
};

const App = () => {
  const [currency, setCurrency] = React.useState(CURRENCIES.Euro);

  return (
    <CurrencyContext.Provider value={currency}>
      <button
        type="button"
        onClick={() => setCurrency(CURRENCIES.Euro)}
      >
        {CURRENCIES.Euro.label}
      </button>
      <button
        type="button"
        onClick={() => setCurrency(CURRENCIES.Usd)}
      >
        {CURRENCIES.Usd.label}
      </button>

      <Books list={DATA} />
    </CurrencyContext.Provider>
  );
};

...

const Book = ({ item }) => {
  const currency = React.useContext(CurrencyContext);

  return (
    <li>
      {item.title} - {item.price} {currency.symbol}
    </li>
  );
};
```

Second, we will use the dictionary to render the buttons, which change the context's value, in a more sophisticated way. Changes like these help in the long run, because now you can add more currencies in the dictionrary and our rendering engine will make sure to display all of them:

```javascript{17-25}
const CURRENCIES = {
  Euro: {
    symbol: '€',
    label: 'Euro',
  },
  Usd: {
    symbol: '$',
    label: 'US Dollar',
  },
};

const App = () => {
  const [currency, setCurrency] = React.useState(CURRENCIES.Euro);

  return (
    <CurrencyContext.Provider value={currency}>
      {Object.values(CURRENCIES).map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => setCurrency(item)}
        >
          {item.label}
        </button>
      ))}

      <Books list={DATA} />
    </CurrencyContext.Provider>
  );
};
```

Third, we will extract these buttons as [reusable components](/react-reusable-components) -- which also cleans up the App component:

```javascript{6,13-19,21-27}
const App = () => {
  const [currency, setCurrency] = React.useState(CURRENCIES.Euro);

  return (
    <CurrencyContext.Provider value={currency}>
      <CurrencyButtons onChange={setCurrency} />

      <Books list={DATA} />
    </CurrencyContext.Provider>
  );
};

const CurrencyButtons = ({ onChange }) => {
  return Object.values(CURRENCIES).map((item) => (
    <CurrencyButton key={item.label} onClick={() => onChange(item)}>
      {item.label}
    </CurrencyButton>
  ));
};

const CurrencyButton = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
};
```

And finally, we will use the conversion rate from the context to display the formatted amount:

```javascript{3,5,8,10,19-22,26}
const CURRENCIES = {
  Euro: {
    code: 'EUR',
    label: 'Euro',
    conversionRate: 1, // base conversion rate
  },
  Usd: {
    code: 'USD',
    label: 'US Dollar',
    conversionRate: 1.19,
  },
};

...

const Book = ({ item }) => {
  const currency = React.useContext(CurrencyContext);

  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
  }).format(item.price * currency.conversionRate);

  return (
    <li>
      {item.title} - {price}
    </li>
  );
};
```

That's it. We have migrated the context from unstateful to stateful and did a few refactorings along the way. You can imagine how a user in a larger application is able to change their currency and all prices across the whole website will be affected by it. That's the power of React Context.

<ReadMore label="Global State in React with Context" link="/react-state-usereducer-usestate-usecontext" />

# Best Practices for Context and useContext

There are a few best practices that can be followed when using React Context with useContext. By now you have seen the basics. This section goes beyond these basics by showing you how context is used in larger React projects.

When I create a new file for React Context, I always start with the essentials (as seen before):

```javascript
import React from 'react';

const CurrencyContext = React.createContext(null);

export { CurrencyContext };
```

First, what I like to improve is providing a **custom context hook** for accessing the context:

```javascript{5,7}
import React from 'react';

const CurrencyContext = React.createContext(null);

const useCurrency = () => React.useContext(CurrencyContext);

export { CurrencyContext, useCurrency };
```

Then I use this new custom context hook without having to use useContext as an intermediary:

```javascript{3,8}
import React from 'react';

import { CurrencyContext, useCurrency } from './currency-context';

...

const Book = ({ item }) => {
  const currency = useCurrency();

  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
  }).format(item.price * currency.conversionRate);

  return (
    <li>
      {item.title} - {price}
    </li>
  );
};
```

Optionally, I expose a [HOC](/react-hooks-higher-order-components), if I have to use context in third-parties like [Styled Components](/styled-components):

```javascript{7-11,22}
import React from 'react';

const CurrencyContext = React.createContext(null);

const useCurrency = () => React.useContext(CurrencyContext);

const withCurrency = (Component) => (props) => {
  const currency = useCurrency();

  return <Component {...props} currency={currency} />;
};

// if ref is used
//
// const withCurrency = (Component) =>
//   React.forwardRef((props, ref) => {
//     const currency = useCurrency();

//     return <Component {...props} ref={ref} currency={currency} />;
//   });

export { CurrencyContext, useCurrency, withCurrency };
```

Third, similar to the custom context hook, I also like to use a **custom Provider component**:

```javascript{7-13,15}
import React from 'react';

const CurrencyContext = React.createContext(null);

const useCurrency = () => React.useContext(CurrencyContext);

const CurrencyProvider = ({ value, children }) => {
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export { CurrencyProvider, useCurrency };
```

Note that the CurrencyContext itself isn't exported anymore. Instead, it's the new custom Provider component which gets used in the App component and which still receives the stateful value:

```javascript{3,11,15}
import React from 'react';

import { CurrencyProvider, useCurrency } from './currency-context';

...

const App = () => {
  const [currency, setCurrency] = React.useState(CURRENCIES.Euro);

  return (
    <CurrencyProvider value={currency}>
      <CurrencyButtons onChange={setCurrency} />

      <Books list={DATA} />
    </CurrencyProvider>
  );
};
```

From here on, no one can tamper with the Context object (here `CurrencyContext`) itself anymore. Everything is encapsulated in the custom context hook and custom Provider component -- which does not give us any addvantages if we don't implement on top of it. And that's what we will address next.

At the moment, the whole currency functionailty is scattered across the place. Let's see how we can encapsulate this feature more into React's Context by moving things in there and providing an API to the outside.

As prerequisite, we move the dictionrary into the context file:

```javascript{3-14,18}
import React from 'react';

const CURRENCIES = {
  Euro: {
    code: 'EUR',
    label: 'Euro',
    conversionRate: 1, // base conversion rate
  },
  Usd: {
    code: 'USD',
    label: 'US Dollar',
    conversionRate: 1.19,
  },
};

...

export { CurrencyProvider, useCurrency, CURRENCIES };
```

Do not forget to import the dictionary into the component's file again:

```javascript{4}
import {
  CurrencyProvider,
  useCurrency,
  CURRENCIES,
} from './currency-context';
```

Now, we move the state from the App into the Context's custom Provider component and provide not only state, but also state updater function in the context as value:

```javascript{1,2,5}
const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = React.useState(CURRENCIES.Euro);

  return (
    <CurrencyContext.Provider value={[currency, setCurrency]}>
      {children}
    </CurrencyContext.Provider>
  );
};
```

Next the custom context hook gets adapated as well. Now it exposes not only the state, but also the function to update the state:

```javascript{2,4-6,8}
const useCurrency = () => {
  const [currency, setCurrency] = React.useContext(CurrencyContext);

  const handleCurrency = (value) => {
    setCurrency(value);
  };

  return { value: currency, onChange: handleCurrency };
};
```

Then our components need to be adjusted on how they are using the custom Provider component without proving any props anymore, how they are consuming the context from the custom context hook with the adapated return values, and how they alter the context via the new API which got exposed by the custom context hook:

```javascript{3,4,11,12,24,28,29}
const App = () => {
  return (
    <CurrencyProvider>
      <CurrencyButtons />

      <Books list={DATA} />
    </CurrencyProvider>
  );
};

const CurrencyButtons = () => {
  const { onChange } = useCurrency();

  return Object.values(CURRENCIES).map((item) => (
    <CurrencyButton key={item.label} onClick={() => onChange(item)}>
      {item.label}
    </CurrencyButton>
  ));
};

...

const Book = ({ item }) => {
  const { value } = useCurrency();

  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: value.code,
  }).format(item.price * value.conversionRate);

  return (
    <li>
      {item.title} - {price}
    </li>
  );
};
```

That's it! We encapsulated the state and state update logic into our custom Provider component and custom context hook. Whoever is using this new API gets access to the state and a function to update it throughout the whole component tree in their React application.

<ReadMore label="React Context Injection" link="/react-context-injection" />
