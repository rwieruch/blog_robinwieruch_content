+++
title = "What is preventDefault() in React?"
description = "A brief explanation why we need to call event.preventDefault() on button, form, or submit events ..."
date = "2019-04-06T07:52:46+02:00"
tags = ["JavaScript"]
categories = ["JavaScript"]
keywords = ["react preventdefault"]
news_keywords = ["react preventdefault"]
hashtag = "#ReactJs"
card = "img/posts/react-preventdefault/banner_640.jpg"
banner = "img/posts/react-preventdefault/banner.jpg"
contribute = "react-preventdefault.md"
headline = "What is preventDefault() in React?"

summary = "A brief explanation why we need to call event.preventDefault() on button, form, or submit events."
+++

{{% sponsorship %}}

React uses synthetic events to handle events from button, input and form elements. A synthetic event is a shell around the native DOM event with additional information for React. Sometimes you have to use `event.preventDefault();` in your application.

{{< highlight javascript "hl_lines=24" >}}
import React from 'react';

const initialList = [
  'Learn React',
  'Learn Firebase',
  'Learn GraphQL',
];

const ListWithAddItem = () => {
  const [value, setValue] = React.useState('');
  const [list, setList] = React.useState(initialList);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    if (value) {
      setList(list.concat(value));
    }

    setValue('');

    event.preventDefault();
  };

  return (
    <div>
      <ul>
        {list.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange} />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default ListWithAddItem;
{{< /highlight >}}

The [list component example](https://www.robinwieruch.de/react-list-component) is taken from this tutorial about [state management in React](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/) which uses [React hooks](https://www.robinwieruch.de/react-hooks/). It demonstrates how to add an item to a list by using a form element with input and button elements. In this case, a preventDefault is called on the event when submitting the form to **prevent a browser reload/refresh**. You can {{% a_blank "try the code yourself" "https://github.com/the-road-to-learn-react/react-list-component" %}} with and without the "prevent default".

**Why is a form submit reloading the browser?** All native HTML elements come with their internal native behavior. For instance, input elements store their internal state. That's why often [React is used to take over for having controlled components by managing the state via React](https://www.robinwieruch.de/react-controlled-components/). The same applies for a form element which has a submit event that is invoked via a submit button element. In the past, it was desired to refresh the browser to flush all state and to submit the data to a backend. Nowadays, a library such as React, gives us more flexibility to deal with the submit event ourselves. In this case, we deal with it by updating the list in our component's state.

In another scenario, you may [fetch data from a backend and store it in your component's state](https://www.robinwieruch.de/react-fetching-data). There is no native submission from the form expected anymore, that's why the developer is able to take over. The developer shouldn't need to worry about any undesired behavior of the browser.