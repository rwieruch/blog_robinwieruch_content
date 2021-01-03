---
title: "How to use React Testing Library Tutorial"
description: "Learn how to use React Testing Library in this tutorial. You will learn how to test your React components step by step with unit and integration tests ..."
date: "2020-06-01T09:52:46+02:00"
categories: ["React"]
keywords: ["react testing library tutorial"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

[React Testing Library (RTL)](https://github.com/testing-library/react-testing-library) by Kent C. Dodds got released as alternative to Airbnb's [Enzyme](/react-testing-jest-enzyme). While Enzyme gives React developers utilities to test internals of React components, React Testing Library takes a step back and questions us "how to test React components to get full confidence in our React components": Rather than testing a component's implementation details, React Testing Library puts the developer in the shoes of an end user of an React application.

In this **React Testing Library tutorial**, we will go through all the steps necessary to unit test and integration test your React components with confidence.

# Jest vs React Testing Library

React beginners often confuse the tools for testing in React. **React Testing Library is not an alternative to Jest**, because they need each other and every one of them has a clear task.

In modern React, developers will not get around Jest for testing, because its the most popular **testing framework** out there for JavaScript applications. Apart from being a **test runner** -- which you can run with `npm test` once you have set up your *package.json* with a test script -- Jest offers you the following functions for your tests:

```javascript
describe('my function or component', () => {
  test('does the following', () => {

  });
});
```

Whereas the describe-block is the **test suite**, the test-block (which also can be named `it` instead of `test`) is the **test case**. A test suite can have multiple test cases and a test case doesn't have to be in a test suite. What you put into the test cases are called **assertions** (e.g. `expect` in Jest) which either turn out to be successful (green) or erroneous (red). Here we have two assertions which should turn out successful:

```javascript
describe('true is truthy and false is falsy', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });

  test('false is falsy', () => {
    expect(false).toBe(false);
  });
});
```

If you put this test suite and the test case with its assertions in a *test.js* file, Jest will automatically pick it up for you when running `npm test`. When we run the test command, Jest's test runner matches all files with a *test.js* suffix by default. You could configure this matching pattern and others things in a custom Jest configuration file.

If you are using create-react-app, Jest (and React Testing Library) comes by default with the installation. If you are using a [custom React setup](/minimal-react-webpack-babel-setup/), you need to [install and set up Jest](/react-testing-jest) (and React Testing Library) yourself.

Once you run your tests via Jest's test runner with `npm test` (or whatever script you are using in your *package.json*), you will see the following output for the two previously defined tests:

```text
 PASS  src/App.test.js
  true is truthy and false is falsy
    ✓ true is truthy (3ms)
    ✓ false is falsy

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        2.999s
Ran all test suites related to changed files.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```

After running through all tests, which should turn green for your cases, Jest offers you an interactive interface where you can give it further instructions. However, often it's just the one test output you are looking for which should turn green for all your tests. If you are changing a file, be it source code or test, Jest runs all your tests again.

```javascript
function sum(x, y) {
  return x + y;
}

describe('sum', () => {
  test('sums up two values', () => {
    expect(sum(2, 4)).toBe(6);
  });
});
```

In an actual JavaScript project, the function that we want to test would be in another file while the test is in a test file which imports the function to test it:

```javascript
import sum from './math.js';

describe('sum', () => {
  test('sums up two values', () => {
    expect(sum(2, 4)).toBe(6);
  });
});
```

Essentially that's Jest in a nutshell. There is nothing about React components yet. Jest is a test runner, which gives you the ability to run tests with Jest from the command line. In addition, Jest offers you functions for test suites, test cases, and assertions. Of course the frameworks offers more than this (e.g. spies, mocks, stubs, etc.); but essentially that's everything needed for now to understand why we need Jest in the first place.

React Testing Library, in contrast to Jest, is one of the testing libraries to test React components. Another popular one in this category is Enzyme as mentioned earlier. We will see in the next sections how to use React Testing Library for testing React components.

# React Testing Library: Rendering a Component

If you are using create-react-app, React Testing Library will be there by default. If you are using a custom React setup (e.g. React with Webpack) or another React framework, you need to install it yourself. In this section, you will learn how to render a React component in test with React Testing Library. We will use the following App [function component](/react-function-component) from a *src/App.js* file:

```javascript
import React from 'react';

const title = 'Hello React';

function App() {
  return <div>{title}</div>;
}

export default App;
```

And test it in a *src/App.test.js* file:

```javascript
import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
  });
});
```

RTL's render function takes any JSX to render it. Afterward, you should have access to the React component in your test. To convince yourself that it's there, you can use RTL's debug function:

```javascript{2,10}
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    screen.debug();
  });
});
```

After running your test on the command line, you should see the HTML output of your App component. Whenever you write a test for a component with React Testing library, you can render the component first and then debug what's visible for RTL's renderer in the test. This way, you can write your test with more confidence:

```html
<body>
  <div>
    <div>
      Hello React
    </div>
  </div>
</body>
```

The great thing about it, React Testing Library doesn't care much about the actual components. Let's take the following React components which utilize different React features ([useState](/react-usestate-hook), [event handler](/react-event-handler), [props](/react-pass-props-to-component)) and concepts ([controlled component](/react-controlled-components)):

```javascript
import React from 'react';

function App() {
  const [search, setSearch] = React.useState('');

  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <div>
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>

      <p>Searches for {search ? search : '...'}</p>
    </div>
  );
}

function Search({ value, onChange, children }) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default App;
```

If you start the test of your App component again, you should see the following output from the debug function:

```html
<body>
  <div>
    <div>
      <div>
        <label
          for="search"
        >
          Search:
        </label>
        <input
          id="search"
          type="text"
          value=""
        />
      </div>
      <p>
        Searches for
        ...
      </p>
    </div>
  </div>
</body>
```

React Testing Library is used to interact with your React components like a human being. What a human being sees is just rendered HTML from your React components, so that's why you see this HTML structure as output rather than two individual React components.

# React Testing Library: Selecting Elements

After you have rendered your React component(s), React Testing Library offers you different search functions to grab elements. These elements are then used for assertions or for user interactions. But before we can do these things, let's learn about how to grab them:

```javascript{10}
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    screen.getByText('Search:');
  });
});
```

Always use RTL's debug function if you don't really know what's the rendered output of RTL's render function. After you know about the HTML structure, you can start to select elements with RTL's screen object's functions. The selected element can then be used for user interactions or assertions. We will do an assertion that checks whether the element is in the DOM:

```javascript{10}
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    expect(screen.getByText('Search:')).toBeInTheDocument();
  });
});
```

Conveniently `getByText` throws an error by default if the element cannot be found. This is useful for giving you a hint while writing the test that the selected element isn't there in the first place. A few people exploit this behavior to use search functions like `getByText` as implicit assertion replacement instead of an explicit assertion with `expect`:

```javascript{10-13,15-17}
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    // implicit assertion
    // because getByText would throw error
    // if element wouldn't be there
    screen.getByText('Search:');

    // explicit assertion
    // recommended
    expect(screen.getByText('Search:')).toBeInTheDocument();
  });
});
```

The `getByText` function accepts a string as input, as we are using it right now, but also a regular expression. Whereas a string argument is used for the exact match, a regular expression can be used for a partial match which is often more convenient:

```javascript{10-11,13-14,16-17}
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    // fails
    expect(screen.getByText('Search')).toBeInTheDocument();

    // succeeds
    expect(screen.getByText('Search:')).toBeInTheDocument();

    // succeeds
    expect(screen.getByText(/Search/)).toBeInTheDocument();
  });
});
```

The `getByText` function is only one of many types of search functions in React Testing Library. Let's see what else is there.

# React Testing Library: Search Types

You have learned about `getByText` where *Text* is one of several search types. While *Text* is often the common way to select elements with React Testing Library, another strong is *Role* with `getByRole`.

The `getByRole` function is usually used to retrieve elements by [aria-label attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute). However, there are also [implicit roles on HTML elements](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) -- like button for a button element. Thus you can select elements not only by visible text, but also by their accessibility role with React Testing Library. A neat feature of `getByRole` is that [it suggests roles if you provide a role that's not available](https://twitter.com/rwieruch/status/1260912349978013696). Both, `getByText` and `getByRole` are RTL's most widely used search functions.

The neat thing about `getByRole`: it shows all the selectable roles if you provide a role that isn't available in the rendered component's HTML:

```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    screen.getByRole('');
  });
});
```

This means that the previous test outputs the following to the command line after running it:

```text
Unable to find an accessible element with the role ""

Here are the accessible roles:

document:

Name "":
<body />

--------------------------------------------------
textbox:

Name "Search:":
<input
  id="search"
  type="text"
  value=""
/>

--------------------------------------------------
```

Because of the implicit roles of our HTML elements, we have at least a text box (here `<input />`) element that we can retrieve with this search type:

```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
```

So quite often it isn't necessary to assign aria roles to HTML elements explicitly for the sake of testing, because the DOM already has implicit roles attached to HTML elements. This is what makes `getByRole` a strong contender to the `getByText` search function from React Testing Library.

There are other search types which are more element specific:

* **LabelText:** getByLabelText: `<label for="search" />`
* **PlaceholderText:** getByPlaceholderText: `<input placeholder="Search" />`
* **AltText:** getByAltText: `<img alt="profile" />`
* **DisplayValue:** getByDisplayValue: `<input value="JavaScript" />`

And there is the last resort search type *TestId* with `getByTestId` where one needs to assign `data-testid` attributes in the source code's HTML. After all, `getByText` and `getByRole` should be your go-to search types to select elements from your rendered React components with React Testing Library.

* getByText
* getByRole
* getByLabelText
* getByPlaceholderText
* getByAltText
* getByDisplayValue

Again, these were all the different search types available in RTL.

# React Testing Library: Search Variants

In contrast to search types, there exist search variants as well. One of the search variants in React Testing Library is *getBy* which is used for `getByText` or `getByRole`. This is also the search variant which is used by default when testing React components.

Two other search variants are *queryBy* and *findBy*; which both can get extended by the same search types that getBy has access to. For example, *queryBy* with all its search types:

* queryByText
* queryByRole
* queryByLabelText
* queryByPlaceholderText
* queryByAltText
* queryByDisplayValue

And *findBy* with all its search types:

* findByText
* findByRole
* findByLabelText
* findByPlaceholderText
* findByAltText
* findByDisplayValue

## What's the difference between getBy vs queryBy?

The big question in the room: When to use getBy and when to use the other two variants queryBy and findBy. You already know that getBy returns an element or an error. It's a convenient side-effect of getBy that it returns an error, because it makes sure that we as developers notice early that there is something wrong in our test. However, this makes it difficult to check for elements which shouldn't be there:

```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    screen.debug();

    // fails
    expect(screen.getByText(/Searches for JavaScript/)).toBeNull();
  });
});
```

This doesn't work, because, even though debug output shows that the element with the text "Searches for JavaScript" isn't there, getBy throws an error before we can make the assertion, because it cannot find the element with this text. In order to assert elements which aren't there, we can exchange getBy with queryBy:

```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
  });
});
```

So every time you are asserting that an element isn't there, use queryBy. Otherwise default to getBy. So what about findBy then?

## When to use findBy?

The *findBy* search variant is used for asynchronous elements which will be there eventually. For a suitable scenario, let's extend our React components with the following feature (which is independent from the search input field): After its initial render, the App component fetches a user from a simulated API. The API returns a JavaScript promise which immediately resolves with a user object, and the component stores the user from the promise in the component's state. The component updates and re-renders; and afterward the [conditional rendering](/conditional-rendering-react) should render "Signed in as" after the component update:

```javascript{1-3,7,9-16,24}
function getUser() {
  return Promise.resolve({ id: '1', name: 'Robin' });
}

function App() {
  const [search, setSearch] = React.useState('');
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };

    loadUser();
  }, []);

  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <div>
      {user ? <p>Signed in as {user.name}</p> : null}

      <Search value={search} onChange={handleChange}>
        Search:
      </Search>

      <p>Searches for {search ? search : '...'}</p>
    </div>
  );
}
```

If we want to test the component over the stretch of its first render to its second render due to the resolved promise, we have to write an async test, because we have to wait for the promise to resolve asynchronously. In other words, we have to wait for the user to be rendered after the component updates for one time after fetching it:

```javascript{7,10,12}
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', async () => {
    render(<App />);

    expect(screen.queryByText(/Signed in as/)).toBeNull();

    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
  });
});
```

After its initial render, we assert that the "Signed in as" text is not there by using the queryBy instead of the getBy search variant. Then we await the new element to be found, and it will be found eventually when the promise resolves and the component re-renders again.

If you don't believe that this actually works, include these two debug functions and verify their outputs on the command line:

```javascript{12,16}
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', async () => {
    render(<App />);

    expect(screen.queryByText(/Signed in as/)).toBeNull();

    screen.debug();

    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();

    screen.debug();
  });
});
```

For any element that isn't there yet but will be there eventually, use findBy over getBy or queryBy. If you assert for a missing element, use queryBy. Otherwise default to getBy.

## What about multiple elements?

You have learned about the three search variants getBy, queryBy and findBy; which all can be associated with the search types (e.g. Text, Role, PlaceholderText, DisplayValue). If all of these search functions return only one element, how to assert if there are multiple elements (e.g. [a list in a React component](/react-list-component)). All search variants can be extended with the *All* word:

* getAllBy
* queryAllBy
* findAllBy

Whereas all of them return an array of elements and can be associated with the search types again.

## Assertive Functions

Assertive functions happen on the right hand-side of your assertion. In the previous tests, you have used two assertive functions: `toBeNull` and `toBeInTheDocument`. Both are primarily used in React Testing Library to check whether an element is present or not.

Usually all these assertive functions origin from Jest. However, React Testing Library extends this API with its own assertive functions like `toBeInTheDocument`. All these assertive functions come in an [extra package](https://github.com/testing-library/jest-dom) which are already set up for you when using create-react-app.

* toBeDisabled
* toBeEnabled
* toBeEmpty
* toBeEmptyDOMElement
* toBeInTheDocument
* toBeInvalid
* toBeRequired
* toBeValid
* toBeVisible
* toContainElement
* toContainHTML
* toHaveAttribute
* toHaveClass
* toHaveFocus
* toHaveFormValues
* toHaveStyle
* toHaveTextContent
* toHaveValue
* toHaveDisplayValue
* toBeChecked
* toBePartiallyChecked
* toHaveDescription

# React Testing Library: Fire Event

So far, we've only tested whether an element rendered (or not) in a React component with getBy (and queryBy) and whether the re-rendered React component has a desired element (findBy). What about actual user interactions? If a user types into an input field, the component may re-render (like in our example), and the new value should be displayed (or used somewhere).

We can use RTL's fireEvent function to simulate interactions of an end user. Let's see how this works for our input field:

```javascript{2,10,12-14,16}
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    screen.debug();

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });

    screen.debug();
  });
});
```

The fireEvent function takes an element (here the input field by textbox role) and an event (here an event which has the value "JavaScript"). The debug function's output should show the HTML structure before and after the event; and you should see that the new value of the input field gets rendered appropriately.

In addition, if your component is involved in an asynchronous task, like our App component because it fetches a user, you may see the following warning showing up: *"Warning: An update to App inside a test was not wrapped in act(...).".* For us, this means there is some asynchronous task happening and we need to make sure that our components handles it. Often this can be done with RTL's act function, but this time we just need to wait for the user to resolve:

```javascript{2,5-7}
describe('App', () => {
  test('renders App component', async () => {
    render(<App />);

    // wait for the user to resolve
    // needs only be used in our special case
    await screen.findByText(/Signed in as/);

    screen.debug();

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });

    screen.debug();
  });
});
```

Afterward, we can make the assertions from before and after the event:

```javascript{9,15}
describe('App', () => {
  test('renders App component', async () => {
    render(<App />);

    // wait for the user to resolve
    // needs only be used in our special case
    await screen.findByText(/Signed in as/);

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });

    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  });
});
```

We have used the queryBy search variant to check whether the element isn't there before the event and the getBy search variant to check whether it's there after the event. Sometimes you will see people use queryBy for the latter assertion too, because it can be used similar to getBy when it comes to elements which should be there.

That's it. Aside from the asynchronous behavior that we need to address in the test, RTL's fireEvent function can be used straightforward and assertions can be made afterward.

## React Testing Library: User Event

React Testing Library comes with an extended user event library which builds up on top of the fireEvent API. Previously we have used fireEvent to trigger user interactions; this time we will use userEvent as replacement, because the userEvent API mimics the actual browser behavior more closely than the fireEvent API. For example, a `fireEvent.change()` triggers only a `change` event whereas `userEvent.type` triggers a `change` event, but also `keyDown`, `keyPress`, and `keyUp` events.

```javascript{2-3,16}
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  test('renders App component', async () => {
    render(<App />);

    // wait for the user to resolve
    await screen.findByText(/Signed in as/);

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    await userEvent.type(screen.getByRole('textbox'), 'JavaScript');

    expect(
      screen.getByText(/Searches for JavaScript/)
    ).toBeInTheDocument();
  });
});
```

Whenever possible, use userEvent over fireEvent when using React Testing Library. At the time of writing this, userEvent doesn't include all the features of fireEvent, however, this may change in the future.

# React Testing Library: Callback Handlers

Sometimes you will test React components in isolation as unit tests. Often these components will not have any side-effects or state, but only input (props) and output (JSX, callback handlers). We have already seen how we can test the rendered JSX given a component and props. Now we will test callback handlers for this Search component:

```javascript
function Search({ value, onChange, children }) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
```

All the rendering and asserting happens as before. However, this time we are using a utility from Jest to mock the `onChange` function which is passed to the component. Then, after triggering the user interaction on the input field, we can assert that the `onChange` callback function has been called:

```javascript
describe('Search', () => {
  test('calls the onChange callback handler', () => {
    const onChange = jest.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
```

Here again, we can see how userEvent matches the user behavior in the browser more closely as fireEvent. While fireEvent executes the change event by only calling the callback function once, userEvent triggers it for every key stroke:

```javascript{2,11,13}
describe('Search', () => {
  test('calls the onChange callback handler', async () => {
    const onChange = jest.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    await userEvent.type(screen.getByRole('textbox'), 'JavaScript');

    expect(onChange).toHaveBeenCalledTimes(10);
  });
});
```

Anyway, React Testing Library encourages you to test your React components not too much in isolation, but in integration (integration test) with other components. Only this way you can actually test whether state changes were applied in the DOM and whether side-effects took effect.

# React Testing Library: Asynchronous / Async

We have seen before how we can use async await when testing with React Testing Library in order to wait for certain elements to appear with the findBy search variant. Now we will go through a small example for testing data fetching in React. Let's take the following React component which uses axios for [fetching data](https://www.robinwieruch.de/react-fetching-data) from a remote API:

```javascript
import React from 'react';
import axios from 'axios';

const URL = 'http://hn.algolia.com/api/v1/search';

function App() {
  const [stories, setStories] = React.useState([]);
  const [error, setError] = React.useState(null);

  async function handleFetch(event) {
    let result;

    try {
      result = await axios.get(`${URL}?query=React`);

      setStories(result.data.hits);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div>
      <button type="button" onClick={handleFetch}>
        Fetch Stories
      </button>

      {error && <span>Something went wrong ...</span>}

      <ul>
        {stories.map((story) => (
          <li key={story.objectID}>
            <a href={story.url}>{story.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

On button click, we are fetching a list of stories from the [Hacker News API](https://hn.algolia.com/api). If everything goes right, we will see the list of stories rendered as list in React. If something goes wrong, we will see an error. The test for the App component would look like the following:

```javascript
import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

jest.mock('axios');

describe('App', () => {
  test('fetches stories from an API and displays them', async () => {
    const stories = [
      { objectID: '1', title: 'Hello' },
      { objectID: '2', title: 'React' },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { hits: stories } })
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button'));

    const items = await screen.findAllByRole('listitem');

    expect(items).toHaveLength(2);
  });
});
```

Before we render the App component, we make sure that the API gets mocked. In our case, axios' return value from its `get` method gets mocked. However, if you are using another library or the browser's native fetch API for data fetching, you would have to mock these.

After mocking the API and rendering the component, we use the userEvent API to click to the button which leads us to the API request. Since the request is asynchronous, we have to wait for the component to update. As before, we are using RTL's findBy search variant to wait for element(s) which appear eventually.

```javascript{15-27}
import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

jest.mock('axios');

describe('App', () => {
  test('fetches stories from an API and displays them', async () => {
    ...
  });

  test('fetches stories from an API and fails', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error())
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button'));

    const message = await screen.findByText(/Something went wrong/);

    expect(message).toBeInTheDocument();
  });
});
```

This last test shows you how to test an API request from your React component that fails. Instead of mocking the API with a promise that resolves successfully, we reject the promise with an error. After rendering the component and clicking the button, we wait for the error message to show up.

```javascript{3,17,19,25,27}
import React from 'react';
import axios from 'axios';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

jest.mock('axios');

describe('App', () => {
  test('fetches stories from an API and displays them', async () => {
    const stories = [
      { objectID: '1', title: 'Hello' },
      { objectID: '2', title: 'React' },
    ];

    const promise = Promise.resolve({ data: { hits: stories } });

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    await userEvent.click(screen.getByRole('button'));

    await act(() => promise);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  test('fetches stories from an API and fails', async () => {
    ...
  });
});
```

For the sake of completeness, this last test shows you how to await a promise in a more explicit way which also works if you don't want to wait for a HTML to show up.

After all, it's not too difficult to test async behavior in React with React Testing Library. You have to use Jest for mocking external modules (here remote API), and then just await data or re-renders of your React components in your tests.

<Divider />

React Testing Library is my go-to test library for React components. I have used Enzyme by Airbnb all the way before, but I like how React Testing Library moves you towards testing user behavior and not implementation details. You are testing whether your user can use your application by writing tests that resemble true user scenarios.
