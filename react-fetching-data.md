+++
title = "How to fetch data in React"
description = "Do you want to go beyond a static React application? Then it's about time to fetch data from a third party API. This guide explains you all the basics and tricks to request data in React.js. You will reuse functionalities in higher order components and implement error handling for a more robust application ..."
date = "2017-08-10T13:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react fetching data", "react fetch API"]
news_keywords = ["react fetching data"]
hashtag = "#ReactJs"
card = "img/posts/react-fetching-data/banner_640.jpg"
banner = "img/posts/react-fetching-data/banner.jpg"
contribute = "react-fetching-data.md"
headline = "How to fetch data in React"

summary = "Newcomers to React often start with applications that don't need data fetching at all. Usually they are confronted with Counter, Todo or TicTacToe applications. That's good, because data fetching adds another layer of complexity to your application while taking the first steps in React. However, at some point you want to request real world data from an own or a third-party API."
+++

{{% pin_it_image "react fetching data" "img/posts/react-fetching-data/banner.jpg" "is-src-set" %}}

Newcomers to React often start with applications that don't need data fetching at all. Usually they are confronted with Counter, Todo or TicTacToe applications. That's good, because data fetching adds another layer of complexity to your application while taking the first steps in React.

However, at some point you want to request real world data from an own or a third-party [API](https://www.robinwieruch.de/what-is-an-api-javascript/). The article gives you a walkthrough on how to fetch data in plain React. There is no external state management solution involved to store your fetched data. It uses only React's local state management.

{{% chapter_header "Where to fetch in React's component tree?" "react-where-fetch" %}}

Imagine you already have a component tree that has several levels in its hierarchy. Now you are about to fetch a list of items from a third-party API. Which level in your component hierarchy, to be more precise, which specific component, should fetch the data? Basically it depends on three criteria:

* 1. Who is interested in this data? The fetching component should be a common parent component for all these components.

{{< highlight javascript >}}
                      +---------------+
                      |               |
                      |               |
                      |               |
                      |               |
                      +------+--------+
                             |
                   +---------+------------+
                   |                      |
                   |                      |
           +-------+-------+     +--------+------+
           |               |     |               |
           |               |     |               |
           |  Fetch here!  |     |               |
           |               |     |               |
           +-------+-------+     +---------------+
                   |
       +-----------+----------+---------------------+
       |                      |                     |
       |                      |                     |
+------+--------+     +-------+-------+     +-------+-------+
|               |     |               |     |               |
|               |     |               |     |               |
|    I am!      |     |               |     |     I am!     |
|               |     |               |     |               |
+---------------+     +-------+-------+     +---------------+
                              |
                              |
                              |
                              |
                      +-------+-------+
                      |               |
                      |               |
                      |     I am!     |
                      |               |
                      +---------------+
{{< /highlight >}}

* 2. Where do you want to show a conditional loading indicator (e.g. loading spinner, progress bar) when the fetched data from the asynchronous request is pending? The loading indicator could be shown in the common parent component from the first criteria. Then the common parent component would still be the component to fetch the data.

{{< highlight javascript >}}
                      +---------------+
                      |               |
                      |               |
                      |               |
                      |               |
                      +------+--------+
                             |
                   +---------+------------+
                   |                      |
                   |                      |
           +-------+-------+     +--------+------+
           |               |     |               |
           |               |     |               |
           |  Fetch here!  |     |               |
           |  Loading ...  |     |               |
           +-------+-------+     +---------------+
                   |
       +-----------+----------+---------------------+
       |                      |                     |
       |                      |                     |
+------+--------+     +-------+-------+     +-------+-------+
|               |     |               |     |               |
|               |     |               |     |               |
|    I am!      |     |               |     |     I am!     |
|               |     |               |     |               |
+---------------+     +-------+-------+     +---------------+
                              |
                              |
                              |
                              |
                      +-------+-------+
                      |               |
                      |               |
                      |     I am!     |
                      |               |
                      +---------------+
{{< /highlight >}}

* 2.1. But when the loading indicator should be shown in a more top level component, the data fetching needs to be lifted up to this component.

{{< highlight javascript >}}
                      +---------------+
                      |               |
                      |               |
                      |  Fetch here!  |
                      |  Loading ...  |
                      +------+--------+
                             |
                   +---------+------------+
                   |                      |
                   |                      |
           +-------+-------+     +--------+------+
           |               |     |               |
           |               |     |               |
           |               |     |               |
           |               |     |               |
           +-------+-------+     +---------------+
                   |
       +-----------+----------+---------------------+
       |                      |                     |
       |                      |                     |
+------+--------+     +-------+-------+     +-------+-------+
|               |     |               |     |               |
|               |     |               |     |               |
|    I am!      |     |               |     |     I am!     |
|               |     |               |     |               |
+---------------+     +-------+-------+     +---------------+
                              |
                              |
                              |
                              |
                      +-------+-------+
                      |               |
                      |               |
                      |     I am!     |
                      |               |
                      +---------------+
{{< /highlight >}}

* 2.2. When the loading indicator should be shown in child components of the common parent component, not necessarily the components that need the data, the common parent component would still be the component to fetch the data. The loading indicator state could then be passed down to all child components that would be interested to show a loading indicator.

{{< highlight javascript >}}
                      +---------------+
                      |               |
                      |               |
                      |               |
                      |               |
                      +------+--------+
                             |
                   +---------+------------+
                   |                      |
                   |                      |
           +-------+-------+     +--------+------+
           |               |     |               |
           |               |     |               |
           |  Fetch here!  |     |               |
           |               |     |               |
           +-------+-------+     +---------------+
                   |
       +-----------+----------+---------------------+
       |                      |                     |
       |                      |                     |
+------+--------+     +-------+-------+     +-------+-------+
|               |     |               |     |               |
|               |     |               |     |               |
|    I am!      |     |               |     |     I am!     |
|  Loading ...  |     |  Loading ...  |     |  Loading ...  |
+---------------+     +-------+-------+     +---------------+
                              |
                              |
                              |
                              |
                      +-------+-------+
                      |               |
                      |               |
                      |     I am!     |
                      |               |
                      +---------------+
{{< /highlight >}}

* 3. Where do you want to show an optional error message when the request fails? Here the same rules from the second criteria apply.

That's basically everything on where to fetch the data. But when should the data be fetched and how should it be fetched once the common parent component is agreed on?

{{% chapter_header "How to fetch data in React?" "react-how-fetch" %}}

React's ES6 class components have {{% a_blank "lifecycle methods" "https://facebook.github.io/react/docs/react-component.html" %}}. The `render()` lifecycle method is mandatory to output a React element, because after all you may want to display the fetched data at some point.

There is another lifecycle method that is a perfect match to fetch data: `componentDidMount()`. When this method runs, the component was already rendered once with the `render()` method, but it would render again when the fetched data would be stored in the local state of the component with `setState()`. Afterward, the local state could be used in the `render()` method to display it or to pass it down as props.

The `componentDidMount()` lifecycle method is the best place to fetch data. But how to fetch the data after all? [React's ecosystem is a flexible framework](https://www.robinwieruch.de/essential-react-libraries-framework/), thus you can choose your own solution to fetch data. For the sake of simplicity, the article will showcase it with the {{% a_blank "native fetch API" "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" %}} that comes with the browser. It uses {{% a_blank "JavaScript promises" "https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise" %}} to resolve the asynchronous response.

{{< highlight javascript >}}
import React, { Component } from 'react';

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'redux';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
    };
  }

  componentDidMount() {
    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => this.setState({ hits: data.hits }));
  }

  ...
}

export default App;
{{< /highlight >}}

The example uses the {{% a_blank "Hacker News API" "https://hn.algolia.com/api" %}} but feel free to use your own API endpoints. When the data is fetched successfully, it will be stored in the local state with React's `this.setState()` method. Then the `render()` method will trigger again and you can display the fetched data.


{{< highlight javascript >}}
...

class App extends Component {
 ...

  render() {
    const { hits } = this.state;

    return (
      <div>
        {hits.map(hit =>
          <div key={hit.objectID}>
            <a href={hit.url}>{hit.title}</a>
          </div>
        )}
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

Even though the `render()` method already ran once before the `componentDidMount()` method, you don't run into any null pointer exceptions because you have initialized the `hits` property in the local state with an empty array.

{{% chapter_header "What about loading spinner and error handling?" "react-fetch-loading-error" %}}

Of course you need the fetched data in your local state. But what else? There are two more properties that you could store in the state: loading state and error state. Both will improve your user experience for end-users of your application.

The loading state should be used to indicated that an asynchronous request is happening. Between both `render()` methods the fetched data is pending due to arriving asynchronously. Thus you can add a loading indicator during the time of waiting. In your fetching lifecycle method, you would have to toggle the property from false to true and when the data is resolved from true to false.

{{< highlight javascript "hl_lines=9 14 18" >}}
...

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => this.setState({ hits: data.hits, isLoading: false }));
  }

  ...
}

export default App;
{{< /highlight >}}

In your `render()` method you can use [React's conditional rendering](https://www.robinwieruch.de/conditional-rendering-react/) to display either a loading indicator or the resolved data.

{{< highlight javascript "hl_lines=7 9 10 11" >}}
...

class App extends Component {
  ...

  render() {
    const { hits, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
        {hits.map(hit =>
          <div key={hit.objectID}>
            <a href={hit.url}>{hit.title}</a>
          </div>
        )}
      </div>
    );
  }
}
{{< /highlight >}}

A loading indicator can be as simple as a Loading... message, but you can also use third-party libraries to show a spinner or {{% a_blank "pending content component" "https://github.com/danilowoz/react-content-loader" %}}. It is up to you to signalize your end-user that the data fetching is pending.

The second state that you could keep in your local state would be an error state. When an error occurs in your application, nothing is worse than giving your end-user no indication about the error.

{{< highlight javascript "hl_lines=10" >}}
...

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }

  ...

}
{{< /highlight >}}

When using promises, the `catch()` block is usually used after the `then()` block to handle errors. The same applies for the native fetch API.

{{< highlight javascript "hl_lines=13" >}}
...

class App extends Component {

  ...

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => this.setState({ hits: data.hits, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  ...

}
{{< /highlight >}}

Unfortunately, the native fetch API doesn't use its catch block for every erroneous status code. For instance, when a HTTP 404 happens, it wouldn't run into the catch block. But you can force it to run into the catch block by throwing an error when your response doesn't match your expected data.

{{< highlight javascript "hl_lines=11 12 13 14 15 16 17" >}}
...

class App extends Component {

  ...

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(API + DEFAULT_QUERY)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => this.setState({ hits: data.hits, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  ...

}
{{< /highlight >}}

Last but not least, you can show the error message in your `render()` method as conditional rendering again.

{{< highlight javascript "hl_lines=8 10 11 12" >}}
...

class App extends Component {

  ...

  render() {
    const { hits, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
        {hits.map(hit =>
          <div key={hit.objectID}>
            <a href={hit.url}>{hit.title}</a>
          </div>
        )}
      </div>
    );
  }
}
{{< /highlight >}}

That's all about the basics in data fetching with plain React. As already mentioned, you can substitute the native fetch API with another library. For instance, another library might run for every erroneous requests into the catch block on its own without you throwing an error in the first place.

{{% chapter_header "How to abstract the fetching away?" "react-fetch-higher-order-component" %}}

The shown way to fetch data can be repetitive in several components. Once a component mounted, you want to fetch data and show conditional loading or error indicators. The component so far can be split up into two responsibilities: showing the fetched data with conditional renderings and fetching the state with local state management. The latter could be made reusable by a [higher order component](https://www.robinwieruch.de/gentle-introduction-higher-order-components/). (If you are going to read the linked article, you will also see how you could abstract away the conditional renderings in higher order components. After that, your component would only be concerned to display the fetched data.)

First, you would have to split all the fetching and state logic into a higher order component.

{{< highlight javascript >}}
const withFetching = (url) => (Comp) =>
  class WithFetching extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data: {},
        isLoading: false,
        error: null,
      };
    }

    componentDidMount() {
      this.setState({ isLoading: true });

      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong ...');
          }
        })
        .then(data => this.setState({ data, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
      return <Comp { ...this.props } { ...this.state } />
    }
  }
{{< /highlight >}}

The higher order component receives an url that will be used to `fetch()` the data. The url that is passed later on will be the specific `API + DEFAULT_QUERY` as you have used before. If you need to pass more query parameters to your higher order component later on, you could extend the arguments in the function signature.

{{< highlight javascript >}}
const withFetching = (url, query) => (Comp) =>
  ...
{{< /highlight >}}

In addition, the higher order component uses a generic data container in the local state called `data`. It is not aware anymore of the specific property naming as before.

In the second step, you can dispose all of the fetching and state logic from your `App` component. Because it has no local state or lifecycle methods anymore, you can refactor it to a functional stateless component. The incoming property changes from the specific `hits` to the generic `data` property.

{{< highlight javascript >}}
const App = ({ data, isLoading, error }) => {
  const hits = data.hits || [];

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      {hits.map(hit =>
        <div key={hit.objectID}>
          <a href={hit.url}>{hit.title}</a>
        </div>
      )}
    </div>
  );
}
{{< /highlight >}}

Last but not least, you can use the higher order component to wrap your `App` component.

{{< highlight javascript >}}
const AppWithFetch = withFetching(API + DEFAULT_QUERY)(App);
{{< /highlight >}}

Basically that's it to abstract away the data fetching in React. By using higher order components to fetch the data, you can easily opt-in this feature for any component with any endpoint API url. In addition, you can extend it with query parameters as shown before.

<hr class="section-divider">

Even though you don't necessarily need to abstract away your data fetching layer with higher order components, I hope that you have learned the basics about data fetching in React. You can find the finished project in this {{% a_blank "GitHub repository" "https://github.com/rwieruch/react-data-fetching" %}}. If you like it, make sure to star it.