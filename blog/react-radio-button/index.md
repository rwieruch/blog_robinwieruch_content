---
title: "How to create a React Radio Button"
description: "How to use a radio button in React by example and how to create a React Radio Component ..."
date: "2021-10-08T13:57:46+02:00"
categories: ["React", "React Component"]
keywords: ["react radio", "react radio button", "react radio button component"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A short React tutorial by example for beginners about using a radio button in React. First of all, a radio button is just an HTML input field with the type of radio which can be rendered in React's JSX:

```javascript{6}
import * as React from 'react';

const App = () => {
  return (
    <div>
      <input type="radio" />
    </div>
  );
};

export default App;
```

What may be missing is an associated label to signal the user what value is changed with this radio button:

```javascript{6-8}
import * as React from 'react';

const App = () => {
  return (
    <div>
      <label>
        <input type="radio" /> Cat
      </label>
    </div>
  );
};

export default App;
```

In your browser, this radio button can already change its checked state. However, this is just the radio button's internal HTML state which isn't controlled by React yet. Let's change this by transforming this radio button from being [uncontrolled to controlled](/react-controlled-components/):

```javascript{4,6-8,13}
import * as React from 'react';

const App = () => {
  const [value, setValue] = React.useState(false);

  const handleChange = () => {
    setValue(!value);
  };

  return (
    <div>
      <label>
        <input type="radio" checked={value} onChange={handleChange} />
        Cat
      </label>
    </div>
  );
};

export default App;
```

By using [React's useState Hook](/react-usestate-hook/) and an [event handler](/react-event-handler/), we can keep track of the radio button's value via [React's state](/react-state/). Next we may want to create a Radio Button component which can be used more than once throughout a React project. Therefore, we will extract it as a new [function component](/react-function-component/) and [pass the necessary props](/react-pass-props-to-component/) to it:

```javascript{12-16,21-28}
import * as React from 'react';

const App = () => {
  const [value, setValue] = React.useState(false);

  const handleChange = () => {
    setValue(!value);
  };

  return (
    <div>
      <RadioButton
        label="Cat"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

const RadioButton = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="radio" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

export default App;
```

Our Radio Button component is a [reusable component](/react-reusable-components/) now. For example, if you would give your input field some [CSS style in React](/react-css-styling/), every Radio Button component which is used in your React project would use the same style.

If you would want to create a radio button group now, you could just use multiple Radio Button components side by side and maybe style them with some border and some alignment, so that a user perceives them as a group of radio buttons:

```javascript
import * as React from 'react';

const App = () => {
  const [catPerson, setCatPerson] = React.useState(false);
  const [dogPerson, setDogPerson] = React.useState(false);

  const handleCatChange = () => {
    setCatPerson(!catPerson);
  };

  const handleDogChange = () => {
    setDogPerson(!dogPerson);
  };

  return (
    <div>
      <RadioButton
        label="Cat"
        value={catPerson}
        onChange={handleCatChange}
      />
      <RadioButton
        label="Dog"
        value={dogPerson}
        onChange={handleDogChange}
      />
    </div>
  );
};

export default App;
```

If you want to enforce that only one radio button can be checked for the radio button group, you need to change it the following way:

```javascript{4,7,11,18,23}
import * as React from 'react';

const App = () => {
  const [favorite, setFavorite] = React.useState('dog');

  const handleCatChange = () => {
    setFavorite('cat');
  };

  const handleDogChange = () => {
    setFavorite('dog');
  };

  return (
    <div>
      <RadioButton
        label="Cat"
        value={favorite === 'cat'}
        onChange={handleCatChange}
      />
      <RadioButton
        label="Dog"
        value={favorite === 'dog'}
        onChange={handleDogChange}
      />
    </div>
  );
};

export default App;
```

That's is it for creating a Radio Button component in React. If you are a beginner in React, I hope this tutorial helped you to understand some concepts and patterns!