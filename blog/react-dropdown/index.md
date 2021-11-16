---
title: "How to create a React Dropdown"
description: "How create a React Dropdown component by example. The HTML select element displays a menu ..."
date: "2021-10-08T13:56:46+02:00"
categories: ["React"]
keywords: ["react dropdown", "react dropdown component", "react dropdown menu", "react dropdown select"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A short React tutorial by example for beginners about creating a dropdown in React. First of all, a dropdown is just an HTML select element which can be rendered in React's JSX:

```javascript
const App = () => {
  return (
    <div>
      <select>
        <option value="fruit">Fruit</option>
        <option value="vegetable">Vegetable</option>
        <option value="meat">Meat</option>
      </select>
    </div>
  );
};
```

What may be missing is an associated label to signal the user what value is changed with this dropdown:

```javascript{4-5,11}
const App = () => {
  return (
    <div>
      <label>
        What do we eat?
        <select>
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
          <option value="meat">Meat</option>
        </select>
      </label>
    </div>
  );
};
```

In your browser, this dropdown can already change its select state by showing every of its values individually. However, this is just the select's internal HTML state which isn't controlled by React yet. Let's change this by transforming this select from being [uncontrolled to controlled](/react-controlled-components/):

```javascript{2,4-6,12,19}
const App = () => {
  const [value, setValue] = React.useState('fruit');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label>
        What do we eat?
        <select value={value} onChange={handleChange}>
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
          <option value="meat">Meat</option>
        </select>
      </label>

      <p>We eat {value}!</p>
    </div>
  );
};
```

By using [React's useState Hook](/react-usestate-hook/) and an [event handler](/react-event-handler/), we can keep track of the select's value via [React's state](/react-state/). We can refine this component by rendering the options more dynamically:

```javascript{2-6,19-21}
const App = () => {
  const options = [
    { label: 'Fruit', value: 'fruit' },
    { label: 'Vegetable', value: 'vegetable' },
    { label: 'Meat', value: 'meat' },
  ];

  const [value, setValue] = React.useState('fruit');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label>
        What do we eat?
        <select value={value} onChange={handleChange}>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>

      <p>We eat {value}!</p>
    </div>
  );
};
```

A great analogy for this refactoring of the component is the list component in React](/react-list-component/). Next we may want to create a Dropdown component which can be used more than once throughout a React project. Therefore, we will extract it as a new [function component](/react-function-component/) and [pass the necessary props](/react-pass-props-to-component/) to it:

```javascript{16-21,28-39}
const App = () => {
  const options = [
    { label: 'Fruit', value: 'fruit' },
    { label: 'Vegetable', value: 'vegetable' },
    { label: 'Meat', value: 'meat' },
  ];

  const [value, setValue] = React.useState('fruit');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <Dropdown
        label="What do we eat?"
        options={options}
        value={value}
        onChange={handleChange}
      />

      <p>We eat {value}!</p>
    </div>
  );
};

const Dropdown = ({ label, value, options, onChange }) => {
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

Our Dropdown component is a [reusable component](/react-reusable-components/) now. For example, if you would give your select element some [CSS style in React](/react-css-styling/), every Dropdown component which is used in your React project would use the same style.

If you would want to create a dropdown group now, you could just use multiple Dropdown components side by side and maybe style them with some border and some alignment, so that a user perceives them as a group of dropdowns:

```javascript
const App = () => {
  const [food, setFood] = React.useState('fruit');
  const [drink, setDrink] = React.useState('water');

  const handleFoodChange = (event) => {
    setFood(event.target.value);
  };

  const handleDrinkChange = (event) => {
    setDrink(event.target.value);
  };

  return (
    <div>
      <Dropdown
        label="What do we eat?"
        options={[
          { label: 'Fruit', value: 'fruit' },
          { label: 'Vegetable', value: 'vegetable' },
          { label: 'Meat', value: 'meat' },
        ]}
        value={food}
        onChange={handleFoodChange}
      />

      <Dropdown
        label="What do we drink?"
        options={[
          { label: 'Water', value: 'water' },
          { label: 'Beer', value: 'beer' },
          { label: 'Wine', value: 'wine' },
        ]}
        value={drink}
        onChange={handleDrinkChange}
      />

      <p>We eat {food}!</p>
      <p>We drink {drink}!</p>
    </div>
  );
};
```

That's is it for creating a Dropdown component in React. If you are a beginner in React, I hope this tutorial helped you to understand some concepts and patterns!