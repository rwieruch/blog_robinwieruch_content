---
title: "React Conditional Rendering"
description: "Everything you need to know about conditional rendering in React. Learn about ternary operators, switch case, and if else statements in JSX to conditionally render elements in React ..."
date: "2020-01-16T13:50:46+02:00"
categories: ["React"]
keywords: ["react conditional rendering", "react conditional render"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Conditional rendering in React isn't difficult. In JSX - the syntax extension used for React - you can use plain JavaScript which includes if else statements, ternary operators, switch case statements, and much more. In a conditional render, a React component decides based on one or several conditions which DOM elements it will return. For instance, based on some logic it can either return a list of items or a text that says "Sorry, the list is empty". When a component has a conditional rendering, the appearance of the rendered component differs based on the condition. The article aims to be an exhaustive list of options for conditional renderings in React and best practices for these patterns.

# Table of Contents

<TableOfContents {...props} />

# Conditional Rendering in React: if

The most basic conditional rendering logic in React is done with a single **if** statement. Imagine you don't want to render something in your [React component](/react-function-component/), because it doesn't have the necessary [React props](/react-pass-props-to-component/) available. For instance, a [List component in React](/react-list-component) shouldn't render the list HTML elements in a view if there is no list of items in the first place. You can use a plain JavaScript if statement to return earlier (guard pattern):

```javascript{16-18}
const users = [
  { id: '1', firstName: 'Robin', lastName: 'Wieruch' },
  { id: '2', firstName: 'Dennis', lastName: 'Wieruch' },
];

function App() {
  return (
    <div>
      <h1>Hello Conditional Rendering</h1>
      <List list={users} />
    </div>
  );
}

function List({ list }) {
  if (!list) {
    return null;
  }

  return (
    <ul>
      {list.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
}

function Item({ item }) {
  return (
    <li>
      {item.firstName} {item.lastName}
    </li>
  );
}
```

Try it yourself by setting `users` to null oder undefined. If the information from the props is null or undefined, the React component returns null in the conditional rendering. There, a React component that returns null instead of JSX will render nothing.

In this example, we have done the conditional rendering based on props, but the conditional rendering could be based on [state](/react-state/) and [hooks](/react-hooks/) too. Notice, how we didn't use the if statement inside the JSX yet but only outside before the return statement.

# Conditional Rendering in React: if else

Let's move on with the previous example to learn about **if else** statements in React. If there is no list, we render nothing and hide the HTML as we have seen before with the single if statement. However, you may want to show a text as feedback for your user when the list is empty for a better user experience. This would work with another single if statement, but we will expand the example with an if else statement instead:

```javascript{6-8,16}
function List({ list }) {
  if (!list) {
    return null;
  }

  if (!list.length) {
    return <p>Sorry, the list is empty.</p>;
  } else {
    return (
      <div>
        {list.map(item => (
          <Item item={item} />
        ))}
      </div>
    );
  }
}
```

Now, the List component renders either nothing, a text, or the list of items based on some JavaScript logic. Even though the previous example shows you how to use if else statements in React, I suggest to use single if statements every time you want to guard your main return (here: returning the list) as a best practice:

```javascript{6-8}
function List({ list }) {
  if (!list) {
    return null;
  }

  if (!list.length) {
    return <p>Sorry, the list is empty.</p>;
  }

  return (
    <div>
      {list.map(item => (
        <Item item={item} />
      ))}
    </div>
  );
}
```

This is way more readable than the previous if else conditional rendering. All the guards are neatly aligned as single if statements before the main return statement which can be interpreted as an implicit else statement too. Still, none of the if and else statements were used inside the return statement yet.

# Conditional Rendering in React: ternary

It's true that we can use JavaScript in JSX, but it becomes difficult when using statements like **if, else, and switch case within JSX**. There is no real way to inline it. Another way to express an if else statement in JavaScript is the **[ternary operator](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)**:

```javascript
// if else
function getFood(isVegetarian) {
  if (isVegetarian) {
    return 'tofu';
  } else {
    return 'fish';
  }
}

// ternary operator
function getFood(isVegetarian) {
  return isVegetarian ? 'tofu' : 'fish';
}
```

For instance, imagine your component shows either a preview or edit mode. The condition is a JavaScript boolean which comes in as React prop. You can use the boolean to decide which element you want to conditionally render:

```javascript{6,8,10}
function Recipe({ food, isEdit }) {
  return (
    <div>
      {food.name}

      {isEdit ? (
        <EditRecipe food={food} />
      ) : (
        <ShowRecipe food={food} />
      )}
    </div>
  );
}
```

The parentheses `()` around both implicit return statements in the ternary operator enable you to return a single or multiple HTML elements or React components from there. If it's just a single element though, you can omit the parentheses.

Note: Sometimes you want to wrap multiple lines of elements with a div element as one block though. Anyway, try to keep it lightweight. If the wrapper between the `()` grows too big, consider extracting it as a component as shown in the example.

The ternary operation makes the conditional rendering in React not only more concise, but gives you an easy way to **inline the conditional rendering in your return**. This way, only a one part of your JSX is conditionally rendered, while other parts can stay intact without any condition.

# Conditional Rendering in React: &&

It happens often that you want to *render either an element or nothing*. You have learned that a simple if condition helps with that issue. However, then again you want to be able to inline the condition like a ternary operator. Take the following loading indicator component which uses a conditional ternary operator to return either the element or nothing:

```javascript
function LoadingIndicator({ isLoading }) {
  return <div>{isLoading ? <p>Loading...</p> : null}</div>;
}
```

This works just fine and you are done inlining the condition in your JSX. However, there exists an alternative way that omits the necessity to return null.

The **logical && operator** helps you to make conditions that would return null more concise. In JavaScript, a `true && 'Hello World'` always evaluates to 'Hello World'. A `false && 'Hello World'` always evaluates to false:

```javascript
const result = true && 'Hello World';
console.log(result);
// Hello World

const result = false && 'Hello World';
console.log(result);
// false
```

In React, you can make use of this behaviour. If the condition is true, the expression after the logical && operator will be the output. If the condition is false, React ignores and skips the expression:

```javascript{2}
function LoadingIndicator({ isLoading }) {
  return <div>{isLoading && <p>Loading...</p>}</div>;
}
```

That's your way to go when you want to **return nothing or an element inside JSX**. It's also called short-circuit evaluation which makes it even more concise than a ternary operator.

# Conditional Rendering in React: switch case

Now there might be cases where you have multiple conditional renderings. Take for example a notification component that renders an error, warning, or info component based on a status string:

```javascript
function Notification({ text, status }) {
  if (status === 'info') {
    return <Info text={text} />;
  }

  if (status === 'warning') {
    return <Warning text={text} />;
  }

  if (status === 'error') {
    return <Error text={text} />;
  }

  return null;
}
```

You can use a **switch case operator** for *multiple conditional renderings*:

```javascript
function Notification({ text, status }) {
  switch (status) {
    case 'info':
      return <Info text={text} />;
    case 'warning':
      return <Warning text={text} />;
    case 'error':
      return <Error text={text} />;
    default:
      return null;
  }
}
```

It's wise to use the default for the switch case operator, because a React component always has to return an element or null. If a component has a conditional rendering based on a string, it makes sense to describe the interface of the component with TypeScript:

```javascript{1,3-6,8}
type Status = 'info' | 'warning' | 'error';

type NotificationProps = {
  text: string;
  status: Status;
};

function Notification({ text, status }: NotificationProps) {
  switch (status) {
    case 'info':
      return <Info text={text} />;
    case 'warning':
      return <Warning text={text} />;
    case 'error':
      return <Error text={text} />;
    default:
      return null;
  }
}
```

A switch case is a good start for multiple conditional renderings. But it comes with the same drawbacks like an if else statement. A switch case cannot be used within JSX; can it? Actually it's possible with a conditional rendering function which is self invoking:

```javascript{4-5,16-16}
function Notification({ text, status }) {
  return (
    <div>
      {(function() {
        switch (status) {
          case 'info':
            return <Info text={text} />;
          case 'warning':
            return <Warning text={text} />;
          case 'error':
            return <Error text={text} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}
```

Optionally make the switch case more concise with an conditional rendering arrow function:

```javascript{4}
function Notification({ text, status }) {
  return (
    <div>
      {(() => {
        switch (status) {
          case 'info':
            return <Info text={text} />;
          case 'warning':
            return <Warning text={text} />;
          case 'error':
            return <Error text={text} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}
```

In conclusion, the switch case operator helps you to have multiple conditional renders. But is it the best way to do that? Let's see how we can have multiple conditional renderings with enums instead.

# Multiple Conditional Renderings in React

A JavaScript object with key value pairs for a mapping is called an enum:

```javascript
const NOTIFICATION_STATES = {
  info: 'Did you know? ...',
  warning: 'Be careful here ...',
  error: 'Something went wrong ...',
};
```

An **enum** is a great way to handle *conditional rendering with multiple conditions* in React. They are switch case statements on steroids, because they can be used within the JSX. Let's consider the notification component again, but this time with an enum as inlined object (inner curly braces):

```javascript
function Notification({ text, status }) {
  return (
    <div>
      {
        {
          info: <Info text={text} />,
          warning: <Warning text={text} />,
          error: <Error text={text} />,
        }[status]
      }
    </div>
  );
}
```

The status property key helps us to retrieve the value from the object. That's neat, isn't it? It is much more readable compared to the switch case operator.

In this example, we had to use an inlined object, because the values of the object depend on the text property. That would be my recommended way anyway. However, if it wouldn't depend on the text property, you could use an enum as a constant for the conditional render:

```javascript{1-5,10}
const NOTIFICATION_STATES = {
  info: <Info />,
  warning: <Warning />,
  error: <Error />,
};

function Notification({ status }) {
  return (
    <div>
      {NOTIFICATION_STATES[status]}
    </div>
  );
}
```

This cleans things up in the JSX. If we would still rely on the text property from before, we could use a conditional rendering with a function to retrieve the value too:

```javascript{1-5,8}
const getNotification = text => ({
  info: <Info text={text} />,
  warning: <Warning text={text} />,
  error: <Error text={text} />,
});

function Notification({ status, text }) {
  return <div>{getNotification(text)[status]}</div>;
}
```

After all, the enum conditional rendering in React is more elegant than the switch case statement. Objects as enums open up plenty of options to have multiple conditional renderings. Permutations of booleans are possible too:

```javascript
function Message({ isExtrovert, isVegetarian }) {
  const key = `${isExtrovert}-${isVegetarian}`;

  return (
    <div>
      {
        {
          'true-true': <p>I am an extroverted vegetarian.</p>,
          'true-false': <p>I am an extroverted meat eater.</p>,
          'false-true': <p>I am an introverted vegetarian.</p>,
          'false-false': <p>I am an introverted meat eater.</p>,
        }[key]
      }
    </div>
  );
}
```

The last example is a bit over the top though and I wouldn't advice to use it. However, enums are one of my favorite React patterns when it comes to conditional rendering.

# Nested Conditional Rendering in React

What about **nested conditional renderings** in React? Yes, it is possible. For instance, let's have a look at the List component from before that shows either a list, an empty text, or nothing:

```javascript
function List({ list }) {
  const isNotAvailable = !list;
  const isEmpty = !list.length;

  return (
    <div>
      {isNotAvailable
        ? <p>Sorry, the list is not there.</p>
        : (isEmpty
          ? <p>Sorry, the list is empty.</p>
          : <div>{list.map(item => <Item item={item} />)}</div>
        )
      }
    </div>
  );
}
```

It works, however I would recommend to avoid nested conditional renders, because they are verbose which makes it less readable. Instead try the following solutions:

* The guard pattern with only if statements before the main return statement.
* Splitting the component into multiple components whereas each component takes care of its own non nested conditional rendering.

# Conditional Rendering with HOC

[Higher-Order Components (HOCs)](/react-higher-order-components/) are a perfect match for a conditional rendering in React. HOCs can help with multiple use cases, yet one use case could be to alter the look of a component with a conditional rendering. Let's check out a HOC that either shows a element or a component:

```javascript
// Higher-Order Component
function withLoadingIndicator(Component) {
  return function EnhancedComponent({ isLoading, ...props }) {
    if (!isLoading) {
      return <Component {...props} />;
    }

    return (
      <div>
        <p>Loading</p>
      </div>
    );
  };
}

const ListWithLoadingIndicator = withLoadingIndicator(List);

function App({ list, isLoading }) {
  return (
    <div>
      <h1>Hello Conditional Rendering</h1>

      <ListWithLoadingIndicator isLoading={isLoading} list={list} />
    </div>
  );
}
```

In this example, the List component can focus on rendering the list. It doesn't have to bother with a loading status. A HOC hides away all the noise from your actual component. Ultimately, you could add multiple higher-order components (composition) to hide away more than one conditional rendering edge case. As alternative to HOCs, you could also use [conditional rendering with a render prop](/react-render-props/).

# If Else Components in React

Last but not least, there are external libraries to deal with conditional renderings on a markup level. They add control components to enable conditional renderings without the JS in JSX:

```javascript
<Choose>
  <When condition={isLoading}>
    <div><p>Loading...</p></div>
  </When>
  <Otherwise>
    <div>{list.map(item => <Item item={item} />)}</div>
  </Otherwise>
</Choose>
```

Some people use it, but personally I wouldn't recommend it. JSX allows you to use the powerful set of JavaScript functionalities to handle conditional renderings yourself. There is no need to add templating components to enable it. A lot of people consider React including JSX as their library of choice, because they can handle the rendering with pure HTML and JS in JSX.

<Divider />

I hope this React tutorial was helpful for you to learn about conditional renderings. If you liked it, please share it with your friends. In the end, I got an all conditional renderings in a cheatsheet for you:

* if
  * most basic conditional rendering
  * use to opt-out early from a rendering (guard pattern)
  * cannot be used within return statement and JSX (except self invoking function)
* if-else
  * use it rarely, because it's verbose
  * instead, use ternary operator or logical && operator
  * cannot be used inside return statement and JSX (except self invoking function)
* ternary operator
  * use it instead of an if-else statement
  * it can be used within JSX and return statement
* logical && operator
  * use it when one side of the ternary operation would return null
  * it can be used inside JSX and return statement
* switch case
  * avoid using it, because it's too verbose
  * instead, use enums
  * cannot be used within JSX and return (except self invoking function)
* enums
  * use it for conditional rendering based on multiple states
  * perfect to map more than one condition
* nested conditional rendering
  * avoid them for the sake of readability
  * instead, split out components, use if statements, or use HOCs
* HOCs
  * components can focus on their main purpose
  * use HOC to shield away conditional rendering
  * use multiple composable HOCs to shield away multiple conditional renderings
* external templating components
  * avoid them and be comfortable with JSX and JS