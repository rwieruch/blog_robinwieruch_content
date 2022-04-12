---
title: "How to create a React Button"
description: "How create a React Button component by example. The HTML button element uses onClick ..."
date: "2022-04-12T05:56:46+02:00"
categories: ["React", "React Component"]
keywords: ["react button", "react button component"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A button may be the first interactive element that you are using in a React component. Therefore, this is a short React tutorial by example for beginners about creating a button in React, how to use it, and how to extract it as a reusable component. First of all, a button is just an HTML button element which can be rendered in React's JSX:

```javascript
import * as React from 'react';

const App = () => {
  return (
    <div>
      <button type="button">Click Me</button>
    </div>
  );
};

export default App;
```

By using an [event handler in React](/react-event-handler/), we can react to the button's click event:

```javascript{4-6,10}
import * as React from 'react';

const App = () => {
  const handleClick = () => {
    // implementation details
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
};

export default App;
```

This way, a button can be used to trigger various effects when clicking it. For example, it can change a stateful value by using [React's useState Hook](/react-usestate-hook/):

```javascript{4,7,16}
import * as React from 'react';

const App = () => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Click Me
      </button>

      {count}
    </div>
  );
};

export default App;
```

Another example would be toggling a [conditional rendering](/conditional-rendering-react/):

```javascript{4,7,16}
import * as React from 'react';

const App = () => {
  const [isOpen, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Click Me
      </button>

      {isOpen && <div>Content</div>}
    </div>
  );
};

export default App;
```

Anyway, whatever this button is performing on its onClick handler after all, you may want to create a reusable component for it. Therefore, we will extract it as a new [function component](/react-function-component/) and [pass the necessary props](/react-pass-props-to-component/) to it:

```javascript{12,19-25}
import * as React from 'react';

const App = () => {
  const [isOpen, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <div>
      <Button onClick={handleClick}>Toggle</Button>

      {isOpen && <div>Content</div>}
    </div>
  );
};

const Button = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default App;
```

Our Button component is a [reusable component](/react-reusable-components/) now. For example, if you would give your input field some [CSS style in React](/react-css-styling/), every Button component which is used in your React project would use the same style.

If you would want to create a button group now, you could just use multiple Button components side by side:

```javascript{6-8,10-12,16-17}
import * as React from 'react';

const App = () => {
  const [isOpen, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open</Button>
      <Button onClick={handleClose}>Close</Button>

      {isOpen && <div>Content</div>}
    </div>
  );
};

const Button = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default App;
```

From here you can extend your Button component with many features. For example, the type is not always button, but can be `submit` for handling forms in React. Therefore we could enable developers from the outside to pass an optional `type` prop for the Button which defaults internally to `button` if nothing is passed:

```javascript{1,3}
const Button = ({ type = 'button', onClick, children }) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};
```

Or you can pass a `disabled` prop to the Button component whenever it should not be clickable. Since it defaults to `undefined` if it is not provided, the button element will not be disabled:

```javascript{1,3}
const Button = ({ type = 'button', disabled, onClick, children }) => {
  return (
    <button type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
```

However, passing all these extra information to the Button component is cumbersome. In a perfect world, all this information should be taken by the Button component the same way as if we would be using a mere button element. We can make this happen by using the JavaScript's rest destructuring for React's props:

```javascript{1,3}
const Button = ({ type = 'button', onClick, children, ...rest }) => {
  return (
    <button type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
```

Now, whether we pass a `disabled` boolean or a `style` object to the Button component, internally it will pass it to the button element. This way, the Button element behaves similar to the button element. Everything that's more explicit, like the onClick handler or the default value for the `type` prop, needs to be written explicitly in the Button component's function signature.