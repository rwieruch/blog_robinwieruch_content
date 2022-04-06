---
title: "How to use Props in React"
description: "Everything you need to know about props in React. How to pass props to components, how to set default props, how to know the difference between props and state, and how to pass components or functions as props, ..."
date: "2022-03-25T13:50:46+02:00"
categories: ["React"]
keywords: ["react props", react pass props to component", "react props vs state", "react props explained", "react props example", "react props best practices"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

import PropsStateToggle from './components/PropsStateToggle.js';
import PropsStateText from './components/PropsStateText.js';
import PropsCounter from './components/PropsCounter.js';
import PropsRenderProps from './components/PropsRenderProps.js';

<Sponsorship />

Everyone who is new to React is confused by **React props**, because they are never mentioned in any other framework, and rarely explained on their own. They are one of the early things you will learn in React after grasping React's JSX syntax. Essentially **React component props** are used to pass data from component to component. In this tutorial, I want to explain **props in React** in greater detail by going step by step through React props examples.

# Table of Contents

<TableOfContents {...props} />

# React Component Props by Example

Normally you start out with React's JSX syntax for rendering something to the browser when learning about React. Basically JSX mixes HTML with JavaScript to get the best of both worlds:

```javascript
import * as React from 'react';

const App = () => {
  const greeting = 'Welcome to React';

  return (
    <div>
      <h1>{greeting}</h1>
    </div>
  );
}

export default App;
```

A bit later you will split out your first React [function component](/react-function-component/):

```javascript{6,11-15}
import * as React from 'react';

const App = () => {
  return (
    <div>
      <Welcome />
    </div>
  );
};

const Welcome = () => {
  const greeting = 'Welcome to React';

  return <h1>{greeting}</h1>;
};

export default App;
```

A common question followed by this refactoring: **how to pass the data from one React component to another component?** After all, the new component should render a dynamic `greeting`, not the static `greeting` that is defined within the new component. It should behave like a function which I can pass parameters after all.

Entering React props -- where you can pass data from one component to another in React -- by defining custom HTML attributes to which you assign your data with JSX's syntax:

```javascript{4,8,13,14}
import * as React from 'react';

const App = () => {
  const greeting = 'Welcome to React';

  return (
    <div>
      <Welcome text={greeting} />
    </div>
  );
};

const Welcome = (props) => {
  return <h1>{props.text}</h1>;
};

export default App;
```

Since you will always find the props as first argument in the function signature of a function component, which is just the JavaScript object holding all data passed from component to component, you can [destructure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) the props early. One would call it **React Props Destructuring**:

```javascript{13}
import * as React from 'react';

const App = () => {
  const greeting = 'Welcome to React';

  return (
    <div>
      <Welcome text={greeting} />
    </div>
  );
};

const Welcome = ({ text }) => {
  return <h1>{text}</h1>;
};

export default App;
```

As you have seen, props enable you to pass values from one component to another component down the component tree. In the previous example, it was only a string variable. But props can be any JavaScript data type from integers over objects to arrays. Via props you can even pass React components as well, which you will learn about later.

For what it's worth, you can also define the props inline without declaring a variable before:

```javascript{6}
import * as React from 'react';

const App = () => {
  return (
    <div>
      <Welcome text={"Welcome to React"} />
    </div>
  );
};

const Welcome = ({ text }) => {
  return <h1>{text}</h1>;
};

export default App;
```

In the case of a JavaScript string, you can pass it as props inside double quotes (or single quotes) too:

```javascript{6}
import * as React from 'react';

const App = () => {
  return (
    <div>
      <Welcome text="Welcome to React" />
    </div>
  );
};

const Welcome = ({ text }) => {
  return <h1>{text}</h1>;
};

export default App;
```

But you can also pass other JavaScript data structures with these kind of **inline props**. In case of JavaScript objects, it can be confusing for React beginners, because you have two curly braces: one for the JSX and one for the JavaScript object notation:

```javascript{6,12}
import * as React from 'react';

const App = () => {
  return (
    <div>
      <Welcome text={{ greeting: 'Welcome to React' }} />
    </div>
  );
};

const Welcome = ({ text }) => {
  return <h1>{text.greeting}</h1>;
};

export default App;
```

When declaring the data as a proper JavaScript object, it gets more readable:

```javascript{4,8}
import * as React from 'react';

const App = () => {
  const greetingObject = { greeting: 'Welcome to React' };

  return (
    <div>
      <Welcome text={greetingObject} />
    </div>
  );
};

const Welcome = ({ text }) => {
  return <h1>{text.greeting}</h1>;
};

export default App;
```

Most React beginners notice this when passing a style object to a style attribute to a native HTML element in React for the first time:

```javascript{12}
import * as React from 'react';

const App = () => {
  return (
    <div>
      <Welcome text={{ greeting: 'Welcome to React' }} />
    </div>
  );
};

const Welcome = ({ text }) => {
  return <h1 style={{ color: 'red' }}>{text.greeting}</h1>;
};

export default App;
```

Basically that's how props are passed from component to component in React. As you may have noticed, props are only passed from top to bottom in React application's component hierarchy. There is no way to pass props up to a parent component from a child component. We will revisit this caveat later in this tutorial.

It's also important to note that React's props are read only (immutable). As a developer, you should never mutate props but only read them in your components. You can derive new values from them though (see computed properties later). After all, props are only used to pass data from a parent to a child component React. Essentially props are just the vehicle to transport data down the component tree.

# React Props vs. State

Passing props from component to component in React doesn't make components interactive, because props are read-only and therefore immutable. If you want interactive React components, you have to introduce stateful values by using [React State](/react-state/). Usually state is co-located to a React component by using [React's useState Hook](/react-usestate-hook/):

```javascript{6,8-10,14-16,18}
import * as React from 'react';

const App = () => {
  const greeting = 'Welcome to React';

  const [isShow, setShow] = React.useState(true);

  const handleToggle = () => {
    setShow(!isShow);
  };

  return (
    <div>
      <button onClick={handleToggle} type="button">
        Toggle
      </button>

      {isShow ? <Welcome text={greeting} /> : null}
    </div>
  );
};

const Welcome = ({ text }) => {
  return <h1>{text}</h1>;
};

export default App;
```

<Box attached>
  <PropsStateToggle />
</Box>

In the last example, the App component uses a stateful value called `isShow` and a state updater function to update this state in an event handler. Depending on the boolean state of `isShow`, the parent component either renders its child component or not by using a [conditional rendering](/conditional-rendering-react/).

The example shows **how state is different from props**: While props are just a vehicle to pass information down the component tree, state can be changed over time to create interactive user interfaces. The next example shows how state *can* become props when it is passed to a child component. Event though the state becomes props in the child component, it can still get modified in the parent component as state via the state updater function. Once modified, the state is passed down as "modified" props:

```javascript{4,11-13,21}
import * as React from 'react';

const App = () => {
  const [greeting, setGreeting] = React.useState('Welcome to React');
  const [isShow, setShow] = React.useState(true);

  const handleToggle = () => {
    setShow(!isShow);
  };

  const handleChange = (event) => {
    setGreeting(event.target.value);
  };

  return (
    <div>
      <button onClick={handleToggle} type="button">
        Toggle
      </button>

      <input type="text" value={greeting} onChange={handleChange} />

      {isShow ? <Welcome text={greeting} /> : null}
    </div>
  );
};

const Welcome = ({ text }) => {
  return <h1>{text}</h1>;
};

export default App;
```

<Box attached>
  <PropsStateText />
</Box>

In other words one could say that the value (state) in the vehicle (props) has changed. The child component doesn't care whether the value inside the props are stateful values -- it just sees them as props which come from the parent component. Since every state change in a component (here the parent component) causes a re-render of this and all child components, the child component just receives the updated props in the end.

In conclusion, every time the state changes, the rendering mechanism of the affected component and all its child components get triggered. That's how the whole component tree becomes interactive, because after all, stateful values (state) are passed as props to child components, and once the state in a component changes, which may be passed as props to the child components, all re-rendering child components use the new props.

# How to pass Props from child to parent Component

When props can only be passed from parent to child components, how can a child component communicate with its parent component? This a common question for React beginners once they learned about props in React and the answer for it is brief: there is **no way to pass props from a child to a parent component**.

Let's revisit the previous example, but this time with a new [reusable component](/react-reusable-components/) called Button for the previously implemented display/hide toggle feature:

```javascript{12,21-33}
import * as React from 'react';

const App = () => {
  const [greeting, setGreeting] = React.useState('Welcome to React');

  const handleChange = (event) => {
    setGreeting(event.target.value);
  };

  return (
    <div>
      <Button label="Toggle" />

      <input type="text" value={greeting} onChange={handleChange} />

      {isShow ? <Welcome text={greeting} /> : null}
    </div>
  );
};

const Button = ({ label }) => {
  const [isShow, setShow] = React.useState(true);

  const handleToggle = () => {
    setShow(!isShow);
  };

  return (
    <button onClick={handleToggle} type="button">
      {label}
    </button>
  );
};

const Welcome = ({ text }) => {
  return <h1>{text}</h1>;
};

export default App;
```

So far, the new Button component manages its own co-located state. Since the Button component manages the `isShow` stateful value, there is no way to pass it up as props to the parent component where it is needed for the conditional rendering of the Welcome component. Because we do not have access to the `isShow` value in the App component, the application breaks. To fix this, let's enter how to **lift state in React**:

```javascript{5,11-13,17,26,28}
import * as React from 'react';

const App = () => {
  const [greeting, setGreeting] = React.useState('Welcome to React');
  const [isShow, setShow] = React.useState(true);

  const handleChange = (event) => {
    setGreeting(event.target.value);
  };

  const handleToggle = () => {
    setShow(!isShow);
  };

  return (
    <div>
      <Button label="Toggle" onClick={handleToggle} />

      <input type="text" value={greeting} onChange={handleChange} />

      {isShow ? <Welcome text={greeting} /> : null}
    </div>
  );
};

const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick} type="button">
      {label}
    </button>
  );
};

const Welcome = ({ text }) => {
  return <h1>{text}</h1>;
};

export default App;
```

The application works again. The important ingredient: the App component **passes down a function in the props** to the Button component. The function, named callback handler in React (because it is passed from component to component via props and calls back to the origin component), is used for the click handler in the Button component.

<ReadMore label="Learn about handlers, callback handlers, and inline handlers in React" link="/react-event-handler/" />

The Button doesn't know the business logic of the function though, only that it has to trigger the function when the button gets clicked. Above in the App component, the state is changed when the passed function is called, and therefore the parent component and all its child components re-render.

<ReadMore label="Learn more about Lifting State in React" link="/react-lift-state/" />

As said, there is no way passing props from a child to a parent component. But **you can always pass functions from parent to child components**, whereas the child components make use of these functions and the functions may change the state in a parent component above. Once the state has changed, the state is passed down as props again. All affected components will render again.

# React Props are just the Communication Channel

A component receiving props does not know where and how the information originates -- it just sees a JavaScript object called props in React.

* Where: The props can originate in the parent component or somewhere above the component hierarchy.
* How: The information can be stateful or something else.

For example, props can be passed not only from a parent to a child component, but also from ancestor components to descendant components:

```javascript
import * as React from 'react';

const App = () => {
  const greeting = {
    title: 'React',
    description: 'Your component library for ...',
  };

  return (
    <div>
      <Welcome text={greeting} />
    </div>
  );
};

const Welcome = ({ text }) => {
  return (
    <div>
      <Headline title={`Welcome to ${text.title}`} />
      <Description paragraph={text.description} />
    </div>
  );
};

const Headline = ({ title }) => <h1>{title}</h1>;
const Description = ({ paragraph }) => <p>{paragraph}</p>;

export default App;
```

Both, the Headline and the Description components do not know whether the information originates in the Welcome or App component. The same applies if `greeting` would become a stateful value in the App component by using React's useState Hook. Then the stateful `greeting` would become just `text` -- a property in the Welcome component's props -- which passes it down to its child components.

Last but not least, have a closer look at the Welcome component from the last example. It passes a title prop to the Headline component, but doesn't use just the `text.title` but creates a new string from it. Without modifying the props, the component uses the `title` property to derive a new value from it. This principle is called [computed properties in React](/react-computed-properties/).

# React Props Destructuring

Previously you have briefly learned about props destructuring in React and have used it throughout all the previous props examples. Let's quickly recap it here. Props in React is essentially all data that is passed from a parent to a child component. In a child component, props can be accessed in the function signature as parameter:

```javascript
import * as React from 'react';

const App = () => {
  return (
    <div>
      <Welcome text="Welcome to React" />
    </div>
  );
};

const Welcome = (props) => {
  return <h1>{props.text}</h1>;
};
```

If we understand props as vehicle to communicate from parent to child component, we often don't want to use the vehicle directly, but rather only want to use what's in there. Hence we can destructure the incoming argument:

```javascript{12-13}
import * as React from 'react';

const App = () => {
  return (
    <div>
      <Welcome text="Welcome to React" />
    </div>
  );
};

const Welcome = (props) => {
  const { text } = props;
  return <h1>{text}</h1>;
};
```

Because we can destructure a JavaScript object in a function signature too, we can leave out the intermediate variable assignment:

```javascript{11}
import * as React from 'react';

const App = () => {
  return (
    <div>
      <Welcome text="Welcome to React" />
    </div>
  );
};

const Welcome = ({ text }) => {
  return <h1>{text}</h1>;
};
```

If multiple props are passed to a child component, we can destructure all of them:

```javascript{6,11-12}
import * as React from 'react';

const App = () => {
  return (
    <div>
      <Welcome text="Welcome to React" myColor="red" />
    </div>
  );
};

const Welcome = ({ text, myColor }) => {
  return <h1 style={{ color: myColor }}>{text}</h1>;
};
```

However, there are occasions where we actually *keep* props as the object. So let's discuss them in the next sections.

# React Spread Props

A strategy for passing all properties of an object to a child component is using the [JavaScript spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax). JavaScript's spread operator in React is a useful power feature and you can read people referring to it as the **React ...props syntax** even though it is not really a React feature but just a thing coming from JavaScript.

```javascript{11,16}
import * as React from 'react';

const App = () => {
  const greeting = {
    title: 'React',
    description: 'Your component library for ...',
  };

  return (
    <div>
      <Welcome {...greeting} />
    </div>
  );
};

const Welcome = ({ title, description }) => {
  return (
    <div>
      <Headline title={`Welcome to ${title}`} />
      <Description paragraph={description} />
    </div>
  );
};

const Headline = ({ title }) => <h1>{title}</h1>;
const Description = ({ paragraph }) => <p>{paragraph}</p>;

export default App;
```

The props spreading can be used to spread a whole object with key value pairs down to a child component. It has the same effect as passing each property of the object property by property to the component. For example, sometimes you have a component in between which does not care about the props and just passes them along to the next component:

```javascript
import * as React from 'react';

const App = () => {
  const title = 'React';
  const description = 'Your component library for ...';

  return (
    <div>
      <Welcome title={title} description={description} />
    </div>
  );
};

const Welcome = (props) => {
  return (
    <div style={{
      border: '1px solid black',
      height: '200px',
      width: '400px',
    }}>
      <Message {...props} />
    </div>
  );
};

const Message = ({ title, description }) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
}

export default App;
```

Be aware that the spreaded attribute/value pairs can be overridden as well:

```javascript{4}
const Welcome = (props) => {
  return (
    <div>
      <Message {...props} title="JavaScript" />
    </div>
  );
};

// Message prints title "JavaScript"
```

If the props spreading comes last, all the previous attributes get overridden if they are present in the props:

```javascript{4}
const Welcome = (props) => {
  return (
    <div>
      <Message title="JavaScript" {...props} />
    </div>
  );
};

// Message prints title "React"
```

After all, the spread operator can always be used to assign each key/value pair of an JavaScript object conveniently to a attribute/value pair of the HTML element.

# React Rest Props

The [JavaScript rest destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) can be applied for React props too. Let's walk through an example for the rest props. First, we define a button with an inline handler which increases the state of a number. The button got already extracted as a reusable component:

```javascript
import * as React from 'react';

const App = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Button label={count} onClick={() => setCount(count + 1)} />
    </div>
  );
};

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

export default App;
```

<Box attached center>
  <PropsCounter />
</Box>

A HTML button can receive lots of attributes. For example, it's not far fetched that a button is disabled for certain scenarios. So let's provide the Button component with this new prop:

```javascript{10,17-18}
import * as React from 'react';

const App = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Button
        label={count}
        disabled={true}
        onClick={() => setCount(count + 1)}
      />
    </div>
  );
};

const Button = ({ label, disabled, onClick }) => (
  <button disabled={disabled} onClick={onClick}>
    {label}
  </button>
);

export default App;
```

Over time, there will be more and more props that we want to pass to the button and therefore the Button component's function signature will grow in size. We could continue doing it this way, being explicit about every prop the Button component receives. However, could also use JavaScript's rest destructuring which collects all the remaining properties from an object which didn't get destructured:

```javascript{1-2}
const Button = ({ label, onClick, ...others }) => (
  <button disabled={others.disabled} onClick={onClick}>
    {label}
  </button>
);
```

Making this even more convenient for the implementation of the Button component, we can use JavaScript's spread operator for spreading the rest props to the button HTML element. This way, anytime we pass a new prop to the Button component and don't destructure it explicitly, it gets automatically assigned to the button HTML element:

```javascript{1-2}
const Button = ({ label, onClick, ...others }) => (
  <button onClick={onClick} {...others}>
    {label}
  </button>
);
```

Little unrelated gotcha at the end of this section: the next example shows how passing a boolean as an inline value of `true` can be written as a shorthand, because the attribute gets evaluated to true in the child component this way:

```javascript{8}
const App = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Button
        label={count}
        disabled
        onClick={() => setCount(count + 1)}
      />
    </div>
  );
};
```

In conclusion, props spreading and rest props can help tremendously to keep the implementation details in a readable size.

# React props with Default Value

In some cases, you may want to pass default values as props. Historically the best approach to it was using JavaScript's logical OR operator.

```javascript{2}
const Welcome = ({ title, description }) => {
  title = title || 'Earth';

  return (
    <div>
      <Title title={`Welcome to ${title}`} />
      <Description description={description} />
    </div>
  );
};
```

Which you could also inline as prop:

```javascript{3}
const Welcome = ({ title, description }) => (
  <div>
    <Title title={`Welcome to ${title || 'Earth'}`} />
    <Description description={description} />
  </div>
);
```

However, with modern JavaScript you can use the default value for the prop when using destructuring:

```javascript{1}
const Welcome = ({ title = 'Earth', description }) => (
  <div>
    <Title title={`Welcome to ${title}`} />
    <Description description={description} />
  </div>
);
```

That's it for defaulting to a fallback prop in React which is yet another tool in your toolchain to write effective and efficient React.

# React's children prop

The children prop in React can be used for composing React components into each other. Because of this feature, you can put JavaScript primitives or JSX between the opening and closing element's tags:

```javascript{9,15,16}
import * as React from 'react';

const App = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>
        {count}
      </Button>
    </div>
  );
};

const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

export default App;
```

In this case, only a string is put in between of the element's tags. Then in the child component, you can make use of everything which is in between of the tags by using **React's children prop**. For instance, you can just render the content of the children prop like it is done in this example. In the following sections, you will see how the children prop can be used as a function too.

# How to pass Components as Props

Before you have learned about React's children prop which allows you also to pass HTML/React element(s) to components as props:

```javascript{3,7,9}
const User = ({ user }) => (
  <Profile user={user}>
    <AvatarRound user={user} />
  </Profile>
);

const Profile = ({ user, children }) => (
  <div className="profile">
    <div>{children}</div>
    <div>
      <p>{user.name}</p>
    </div>
  </div>
);

const AvatarRound = ({ user }) => (
  <img className="round" alt="avatar" src={user.avatarUrl} />
);
```

However, what if you want to pass more than one React element and place them at different positions? Then again you don't need to use the children prop, because you have only one of them, and instead you just use regular props:

```javascript{4-5,9,11,14}
const User = ({ user }) => (
  <Profile
    user={user}
    avatar={<AvatarRound user={user} />}
    biography={<BiographyFat user={user} />}
  />
);

const Profile = ({ user, avatar, biography }) => (
  <div className="profile">
    <div>{avatar}</div>
    <div>
      <p>{user.name}</p>
      {biography}
    </div>
  </div>
);

const AvatarRound = ({ user }) => (
  <img className="round" alt="avatar" src={user.avatarUrl} />
);

const BiographyFat = ({ user }) => (
  <p className="fat">{user.biography}</p>
);
```

Often this approach is used when having a surrounding layout component which takes multiple components as content with props. Now you can exchange the Avatar or Biography components dynamically with other components such as:

```javascript
const AvatarSquare = ({ user }) => (
  <img className="square" alt="avatar" src={user.avatarUrl} />
);

const BiographyItalic = ({ user }) => (
  <p className="italic">{user.biography}</p>
);
```

Many people refer to this as **slot pattern** in React. You can find a working minimal project on [GitHub](https://github.com/the-road-to-learn-react/react-slot-pattern-example). And again, that's how composition in React shines. You don't need to touch the Profile component. Moreover, you don't need to pass props, in this case the user, multiple levels down the component tree, but rather pass it to the slotted components.

# Children as a Function

The concept of **children as a function** or **child as a function**, also called **render prop**, is one of the advanced patterns in React (next to [higher-order components](/react-higher-order-components/)). The components which implement this pattern can be called **render prop components.**

<ReadMore label="Learn Render Prop Components from 0 to 1" link="/react-render-props/" />

First, let's start with the render prop. Basically it is a function passed as prop. The function receives parameters (in this case the amount), but also renders JSX (in this case the components for the currency conversion).

```javascript{6,9,13,29}
import * as React from 'react';

const App = () => (
  <div>
    <h1>US Dollar to Euro:</h1>
    <Amount toCurrency={(amount) => <Euro amount={amount} />} />

    <h1>US Dollar to Pound:</h1>
    <Amount toCurrency={(amount) => <Pound amount={amount} />} />
  </div>
);

const Amount = ({ toCurrency }) => {
  const [amount, setAmount] = React.useState(0);

  const handleIncrement = () => setAmount(amount + 1);
  const handleDecrement = () => setAmount(amount - 1);

  return (
    <div>
      <button type="button" onClick={handleIncrement}>
        +
      </button>
      <button type="button" onClick={handleDecrement}>
        -
      </button>

      <p>US Dollar: {amount}</p>
      {toCurrency(amount)}
    </div>
  );
};

const Euro = ({ amount }) => <p>Euro: {amount * 0.86}</p>;

const Pound = ({ amount }) => <p>Pound: {amount * 0.76}</p>;

export default App;
```

<Box attached>
  <PropsRenderProps />
</Box>

Second, refactor the whole thing from having arbitrary render prop to having a more specific children as a function:

```javascript{6,9,13,29}
import * as React from 'react';

const App = () => (
  <div>
    <h1>US Dollar to Euro:</h1>
    <Amount>{(amount) => <Euro amount={amount} />}</Amount>

    <h1>US Dollar to Pound:</h1>
    <Amount>{(amount) => <Pound amount={amount} />}</Amount>
  </div>
);

const Amount = ({ children }) => {
  const [amount, setAmount] = React.useState(0);

  const handleIncrement = () => setAmount(amount + 1);
  const handleDecrement = () => setAmount(amount - 1);

  return (
    <div>
      <button type="button" onClick={handleIncrement}>
        +
      </button>
      <button type="button" onClick={handleDecrement}>
        -
      </button>

      <p>US Dollar: {amount}</p>
      {children(amount)}
    </div>
  );
};

const Euro = ({ amount }) => <p>Euro: {amount * 0.86}</p>;

const Pound = ({ amount }) => <p>Pound: {amount * 0.76}</p>;

export default App;
```

That's essentially everything to distinguish between a render prop or a more specific children as a function (which at its core is a render prop too). The former is passed as a arbitrary prop and the latter is passed as a children prop. You have seen before that functions can be passed as callback handlers (e.g. button click) to React components, but this time the function is passed to actually render something whereas the responsibility for *what to render* is partially moved outside of the render prop component while the props are provided by the render prop component itself.

You can find a working minimal project on [GitHub](https://github.com/the-road-to-learn-react/react-children-as-a-function-example). And again, if you had any problems following the last examples, check the referenced article, because this guide doesn't go into detail for render prop components in React.

# React's Context API for Prop Drilling

At some point, you are passing a lot of props down your component tree. Depending on the depth of the component tree, it can happen that many props are passed from a top level component to all the leaf components. Every component in between has to pass the props even though it may not be interested in the props. The problem is called **prop drilling** in React. There are a couple of solutions to overcome this "problem" (see component composition or slot pattern).

Another solution is React's Context API which can be used to pass props implicitly down to component tree. Every component which is interested in the props passed by React's Context API can consume them. All the other components don't need to consume them and thus they will never know about the props. Moreover, the components between the top level and the leaf components don't need to know about the props as well.

<LinkCollection
  label="A React Context tutorial series."
  links={[
    {
      prefix: "Part 1:",
      label: "Learn about React's Context API",
      url: "/react-context/"
    },
    {
      prefix: "Part 2:",
      label: "Learn about React's useContext Hook",
      url: "/react-usecontext-hook/"
    },
    {
      prefix: "Part 3:",
      label: "Combine useContext with useSatet/useReducer",
      url: "/react-state-usereducer-usestate-usecontext/"
    },
  ]}
/>

# How to set Props to State

Previously you have got to know more about props and state in React. Sometimes there is one question which comes up for React beginners, but also for experienced React developers when implementing React components: **How to set props to state?** In case of the initial state, it is totally fine to derive it from the props. You can just use the incoming prop as initial state for a hook like React's useState Hook:

```javascript{3}
const User = ({ user, onUpdateName }) => {
  // derive initial state from props
  const [name, setName] = React.useState(user.name);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  return (
    <li>
      {user.name}
      <input type="text" value={name} onChange={handleNameChange} />
      <button type="button" onClick={() => onUpdateName(user, name)}>
        Update
      </button>
    </li>
  );
}
```

That's a common pattern in React. If the state needs to change when the incoming props change, it gets a bit more complicated. If you want to read more about the solution, check out the following guide.

<ReadMore label="How to update state from props in React" link="/react-derive-state-props/" />

# React Props Pitfalls

There are a couple of pitfalls when passing props in React. Here I want to collect a list of these things in case someone stumbles upon them:

## React props are not being passed in Components

Sometimes you run into the problem that your React props are not being passed. Personally I ran into this issue several times when I forgot to use the curly braces for the props destructuring in my functional stateless components:

```javascript{1}
const Button = (onClick, children) => (
  <button onClick={onClick} type="button">
    {children}
  </button>
);
```

In this case, the `onClick` argument is the actual props. So you have to destructure it, so the first argument of the function, for accessing the `onClick` and `children` props.

```javascript{1}
const Button = ({ onClick, children }) => (
  <button onClick={onClick} type="button">
    {children}
  </button>
);
```

Most often that's already the solution to the problem. If not, you should track down the prop from parent to child component by adding `console.log(props)` calls to your components. If you have a functional stateless component, you don't necessarily need to add an arrow function body to your component for putting the `console.log()` in between. Instead you can use this neat trick:

```javascript{2}
const Button = ({ onClick, children }) =>
  console.log(onClick, children) || (
  <button onClick={onClick} type="button">
    {children}
  </button>
);
```

The `console.log()` always evaluates to undefined (a falsey value) and thus the component is still being rendered. That's how you can easily get a logging for your props in between your input and output of your functional stateless component.

## React props key is undefined

When rendering lists in React, you have to use a key prop identifying the element in the list. React uses the key for performance reasons, but also for keeping track of the element in case your list changes (e.g. due ordering, removing, adding of items). That's why you should use a unique identifier which is associated to the rendered item.

```javascript
const List = ({ users }) => (
  <ul>
    {users.map(user => <Item key={user.id}>{user.name}</Item>)}
  </ul>
);

const Item = ({ children }) => (
  <p>{children}</p>
);
```

So far, everything is alright with this code. However, sometimes you want to get the key prop in the child component.

```javascript{7,8}
const List = ({ users }) => (
  <ul>
    {users.map(user => <Item key={user.id}>{user.name}</Item>)}
  </ul>
);

const Item = ({ key, children }) => (
  <p>{key} {children}</p>
);
```

That's not working and you will also see a warning in your developer console log: *"... key is not a prop. Trying to access it will result in undefined being returned.* In this case, you have to pass a second prop when you want to get the key from the props.

```javascript{4,11,12}
const List = ({ users }) => (
  <ul>
    {users.map(user => (
      <Item key={user.id} id={user.id}>
        {user.name}
      </Item>
    ))}
  </ul>
);

const Item = ({ id, children }) => (
  <p>{id} {children}</p>
);
```

In the end, that's the workaround to pass props (e.g. key) which are internally used by React and not passed to the child components.

## Pass props to Styled Components

Did you hear about [styled components](/react-styled-components/)? They can be used for [styling your components](/react-css-styling/) in React. Rather than thinking about cascading style sheets as for HTML styles, you only style your components. So the style becomes more co-located to your components. In fact, in the case of styled components, the style becomes a React component:

```javascript
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const App = () => {
  const [value, setValue] = React.useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <div>
      <Input
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
```

The input element which is used to implement the Input styled component gets the `value` and `onChange` as props automatically. But what if you want to get props in a styled component to do something with them? Then you can add a string interpolation in the template literal and get the props in the inlined function's signature:

```javascript{9,24}
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: ${props => props.hasRadius ? '3px' : '0px'};
`;

const App = () => {
  const [value, setValue] = React.useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <div>
      <Input
        value={value}
        onChange={onChange}
        hasRadius={true}
      />
    </div>
  );
}
```

Basically that's how you pass props to styled components and how you get props in a styled component. If you haven't used styled components yet, you should give them a shot for styling your React components without thinking about CSS files.

<Divider />

I guess the article almost covered everything about passing props to React components. In the end, props aren't so difficult. They are read-only and enable you to pass data down the component tree. Everything else which makes React interactive is mostly state. So I hope this tutorial gave you a good overview about all the different usages of props in React.
