+++
title = "Paginated List in React - Build a powerful Component (Part I)"
description = "The series of React tutorials focuses on building a complex yet elegant and powerful React component. It attempts to go beyond the fundamentals in React. This part introduces a paginated list in React..."
date = "2017-05-29T13:50:46+02:00"
tags = ["react"]
categories = ["React"]
keyword = "react paginated list"
news_keywords = ["react paginated list"]
hashtag = "#ReactJs"
contribute = "react-paginated-list.md"
banner = "img/posts/react-paginated-list/banner.jpg"
headline = "Paginated List in React - Build a powerful Component (Part I)"

summary = "The series of React tutorials focuses on building a complex yet elegant and powerful React component. It attempts to go beyond the fundamentals in React. This part introduces a paginated List component in React. In addition, it handles the pending state of a request with a loading indicator. You will use higher order components to opt-in these functionalities in an elegant way."
+++

{{% pin_it_image "react paginated list" "img/posts/react-paginated-list/banner.jpg" %}}

There are a ton of tutorials about the implementation of applications in React. Most of the time, they use basic components to teach the fundamentals of React, because, to be fair, everything else is hard to cover in one tutorial. Only a handful of [long written content](https://www.robinwieruch.de/the-road-to-learn-react/) will take you on the journey to build more powerful components. I want to take you on this journey, after you have learned the fundamentals in React, to build a powerful component in a series of three tutorials.

**But what are you going to build in this series?**

Have you ever been confused how to deal with paginated data in React? Ever wondered how to implement an infinite scroll in React? This walkthrough gives you all the tools you need to implement both features. The first part of the series covers the paginated List component in React. The second part of the series covers infinite scroll in React. Both parts will conclude in the third part of the series into one advanced List component in React that composes functionalities into each other, introduces error handling and fallbacks to those errors.

The series uses several basic and advanced features of React. During the series you will use higher order components and compose multiple higher order components onto one base component. The state is managed locally in your React components. You will use a [real world API](https://www.robinwieruch.de/what-is-an-api-javascript/), the API of Hacker News to be more specific, to experiment outside of your own sandbox and use real world data. Otherwise it would be boring, wouldn't it?

If you are not familiar with these features of React, I can recommend to read the open source book [the Road to learn React](https://www.robinwieruch.de/the-road-to-learn-react/) where you will learn about the fundamentals of React. All the knowledge acquired in the book will be used as common ground for the next three parts of this series.

* **Paginated List in React - Build a powerful Component (Part I)**
* [Infinite Scroll in React - Build a powerful Component (Part II)](https://www.robinwieruch.de/react-infinite-scroll)
* [Advanced List in React - Build a powerful Component (Part III)](https://www.robinwieruch.de/react-advanced-list-component)

{{% chapter_header "The initial React Hacker News Setup" "initial-react-setup" %}}

The initial setup for the application, where the component will live, is performed by {{% a_blank "create-react-app" "https://github.com/facebookincubator/create-react-app" %}}. You will find all the things you need to setup your project in their documentation. In the beginning, you only need to replace the *src/index.css*, *src/App.css* and *src/App.js* files with the following code.

*src/index.css*

{{< highlight css >}}
body {
  color: #222;
  background: #f4f4f4;
  font: 400 14px CoreSans, Arial,sans-serif;
}

a {
  color: #222;
}

a:hover {
  text-decoration: underline;
}

input {
  padding: 10px;
  border-radius: 5px;
  outline: none;
  margin-right: 10px;
  border: 1px solid #dddddd;
}

button {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #dddddd;
  background: transparent;
  color: #808080;
  cursor: pointer;
}

button:hover {
  color: #222;
}

*:focus {
  outline: none;
}
{{< /highlight >}}

*src/App.css*

{{< highlight css >}}
.page {
  margin: 20px;
}

.interactions {
  text-align: center;
}

.list {
  margin: 20px 0;
}

.list-row {
  display: flex;
  line-height: 24px;
  white-space: nowrap;
  margin: 10px 0;
  padding: 10px;
  background: #ffffff;
  border: 1px solid #e3e3e3;
}
{{< /highlight >}}

*src/App.js*

{{< highlight javascript >}}
import React from 'react';

import './App.css';

const applyUpdateResult = (result) => (prevState) => ({
  hits: [...prevState.hits, ...result.hits],
  page: result.page,
});

const applySetResult = (result) => (prevState) => ({
  hits: result.hits,
  page: result.page,
});

const getHackerNewsUrl = (value, page) =>
  `https://hn.algolia.com/api/v1/search?query=${value}&page=${page}&hitsPerPage=100`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      page: null,
    };
  }

  onInitialSearch = (e) => {
    e.preventDefault();

    const { value } = this.input;

    if (value === '') {
      return;
    }

    this.fetchStories(value, 0);
  }

  fetchStories = (value, page) =>
    fetch(getHackerNewsUrl(value, page))
      .then(response => response.json())
      .then(result => this.onSetResult(result, page));

  onSetResult = (result, page) =>
    page === 0
      ? this.setState(applySetResult(result))
      : this.setState(applyUpdateResult(result));

  render() {
    return (
      <div className="page">
        <div className="interactions">
          <form type="submit" onSubmit={this.onInitialSearch}>
            <input type="text" ref={node => this.input = node} />
            <button type="submit">Search</button>
          </form>
        </div>

        <List
          list={this.state.hits}
        />
      </div>
    );
  }
}

const List = ({ list }) =>
  <div className="list">
    {list.map(item => <div className="list-row" key={item.objectID}>
      <a href={item.url}>{item.title}</a>
    </div>)}
  </div>

export default App;
{{< /highlight >}}

If you have read the book, the Road to learn React, you should be familiar with the code. However, this is a compact summary of what's happening:

The App component renders two important things: a form and a list. The form is used as input to search for stories on the Hacker News platform. Submitting the form leads to a request to the Hacker News API. Once the search request succeeded, the list is used to display the list of stories.

The initial state of the App component, initialized in the constructor, shows that it will use a list property and a page property. The result that will be returned from Hacker News, once a search request succeeded, is a paginated list object.

**What's a paginated list?** Essentially it means that you don't get the whole search result returned as list, but a subset of this list. The list on the Hacker News platform might be too big to return it in one single request, that's why applications use pagination in the first place. But that's not everything. It is not only the subset list of the whole list, but a complex object. Next to the subset list you have a page property in the paginated list object. It is the pointer for the subset list in the whole list. By using the page as pointer, you can decide which subset list of the whole list you want to retrieve from the Hacker News API.

Let's get back to the application. The functionalities of the application basically showcase the unidirectional data flow of a React application. A user makes a search request by [using a form](https://www.robinwieruch.de/react-ref-attribute-dom-node/"), the state (list, page) gets stored asynchronously in the App component and shows up in the next render cycle of the App component. The List components, that uses a [conditional rendering](https://www.robinwieruch.de/conditional-rendering-react/), shows up.

Apart from the unidirectional data flow, the application uses JavaScript ES6 features, such as arrow functions and spread operators, along the way to store efficiently the local state. In addition, the native fetch API of the browser is used. You could easily substitute it with another building block to complement React. [That's what makes React so powerful](https://www.robinwieruch.de/reasons-why-i-moved-from-angular-to-react/) in the first place.

Again, if you find it troublesome to follow the initial setup, I can recommend you to read the open source book, that is concisely written, that teaches you about all [the fundamentals in React, yet also JavaScript ES6](https://www.robinwieruch.de/the-road-to-learn-react/). This series of articles is actually recommended as learning resource in the book after you have read it.

{{% chapter_header "Paginated List in React" "paginated-list-react" %}}

The initial search request is already implemented. Now you want to make use of the page property to retrieve the next page of the list. The `applySetResult` and `applyUpdateResult` functionalities already leverage to store successive paginate list results. The `applyUpdateResult` function, that is triggered when the page does not equal 0, always uses the current page property, but concats the previous subset of the list with the newly returned subset of the next page.

The only thing left to do is to implement a dedicated method to fetch the next page of the list. This method gets passed down to the List component. The List component uses the function in a button in order to execute it.

{{< highlight javascript "hl_lines=40 41 65 66 73 74 81 82 83 84 85 86 87 88 89 90 91 92" >}}
import React from 'react';

import './App.css';

const applyUpdateResult = (result) => (prevState) => ({
  hits: [...prevState.hits, ...result.hits],
  page: result.page,
});

const applySetResult = (result) => (prevState) => ({
  hits: result.hits,
  page: result.page,
});

const getHackerNewsUrl = (value, page) =>
  `https://hn.algolia.com/api/v1/search?query=${value}&page=${page}&hitsPerPage=100`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      page: null,
    };
  }

  onInitialSearch = (e) => {
    e.preventDefault();

    const { value } = this.input;

    if (value === '') {
      return;
    }

    this.fetchStories(value, 0);
  }

  onPaginatedSearch = (e) =>
    this.fetchStories(this.input.value, this.state.page + 1);

  fetchStories = (value, page) =>
    fetch(getHackerNewsUrl(value, page))
      .then(response => response.json())
      .then(result => this.onSetResult(result, page));

  onSetResult = (result, page) =>
    page === 0
      ? this.setState(applySetResult(result))
      : this.setState(applyUpdateResult(result));

  render() {
    return (
      <div className="page">
        <div className="interactions">
          <form type="submit" onSubmit={this.onInitialSearch}>
            <input type="text" ref={node => this.input = node} />
            <button type="submit">Search</button>
          </form>
        </div>

        <List
          list={this.state.hits}
          page={this.state.page}
          onPaginatedSearch={this.onPaginatedSearch}
        />
      </div>
    );
  }
}

const List = ({ list, page, onPaginatedSearch }) =>
  <div>
    <div className="list">
      {list.map(item => <div className="list-row" key={item.objectID}>
        <a href={item.url}>{item.title}</a>
      </div>)}
    </div>

    <div className="interactions">
      {
        page !== null &&
        <button
          type="button"
          onClick={onPaginatedSearch}
        >
          More
        </button>
      }
    </div>
  </div>

export default App;
{{< /highlight >}}

Apart from your initial search, that is executed by the `onInitialSearch` class method, you use an `onPaginatedSearch` class method to retrieve the next pages of your paginated data. Based on the page argument, that is increased by one, you will retrieve the next subset of the whole list.

{{% chapter_header "What happens during the Request?" "loading-indicator-react" %}}

As you might have noticed, the user doesn't get any feedback when a request to the Hacker News API is made. Usually the user would see some kind of loading spinner. Let's introduce such loading indicator. First, you have to track the state of a property that indicates the loading.

{{< highlight javascript "hl_lines=6 12 22 28 29 33" >}}
...

const applyUpdateResult = (result) => (prevState) => ({
  hits: [...prevState.hits, ...result.hits],
  page: result.page,
  isLoading: false,
});

const applySetResult = (result) => (prevState) => ({
  hits: [...prevState.hits, ...result.hits],
  page: result.page,
  isLoading: false,
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      page: null,
      isLoading: false,
    };
  }

  ...

  fetchStories = (value, page) => {
    this.setState({ isLoading: true });
    fetch(getHackerNewsUrl(value, page))
      .then(response => response.json())
      .then(result => this.onSetResult(result, page));
  }

  ...
}
{{< /highlight >}}

The loading property is set to true, synchronously, when a request is made. It is again set to false, when the request finished asynchronously. The initial state of the `isLoading` property is false.

Now, you would need to pass the property to the List component.

{{< highlight javascript "hl_lines=14" >}}
...

class App extends React.Component {

  ...

  render() {
    return (
      <div className="page">
        ...

        <List
          list={this.state.hits}
          isLoading={this.state.isLoading}
          page={this.state.page}
          onPaginatedSearch={this.onPaginatedSearch}
        />
      </div>
    );
  }
}
{{< /highlight >}}

The List component uses the property to add a conditional rendering for a loading indicator. In addition, the More button doesn't need to show up when a request is pending.

{{< highlight javascript "hl_lines=1 9 10 11 15" >}}
const List = ({ list, page, isLoading, onPaginatedSearch }) =>
  <div>
    <div className="list">
      {list.map(item => <div className="list-row" key={item.objectID}>
        <a href={item.url}>{item.title}</a>
      </div>)}
    </div>

    <div className="interactions">
      {isLoading && <span>Loading...</span>}
    </div>

    <div className="interactions">
      {
        (page !== null && !isLoading) &&
        <button
          type="button"
          onClick={onPaginatedSearch}
        >
          More
        </button>
      }
    </div>
  </div>
{{< /highlight >}}

Now, your user should see some feedback once a request is pending. However, your powerful component, the List component, is cluttered by now. After all, it is only a List component, but it deals with so much more. It renders a button to retrieve the next page of the whole list and a loading indicator. Both functionalities could be outsourced. That would lead to two benefits: these functionalities could be reused somewhere else and the List component would again only have one responsibility: rendering a list.

{{% chapter_header "A paginated List as Higher Order Component in React" "paginated-list-higher-order-component" %}}

If you are not familiar to higher order components, I recommend to read [the gentle introduction to higher order components](https://www.robinwieruch.de/gentle-introduction-higher-order-components/). It gives not only an introduction, but shows how you can make an elegant use of composition to opt-in functionalities.

Now, after the foundations about HOCs are clear, let's outsource both functionalities of the List component and make it only render a list. The loading indicator and More button can be opt-in by using HOCs later on.

First, let's implement both higher order components in the *src/App.js* to outsource the functionalities.

{{< highlight javascript >}}
const withLoading = (Component) => (props) =>
  <div>
    <Component {...props} />

    <div className="interactions">
      {props.isLoading && <span>Loading...</span>}
    </div>
  </div>

const withPaginated = (Component) => (props) =>
  <div>
    <Component {...props} />

    <div className="interactions">
      {
        (props.page !== null && !props.isLoading) &&
        <button
          type="button"
          onClick={props.onPaginatedSearch}
        >
          More
        </button>
      }
    </div>
  </div>
{{< /highlight >}}

Now, you can use a library like recompose to compose your higher order components onto the List component. First, you have to install it from your command line:

{{< highlight javascript >}}
npm install --save recompose
{{< /highlight >}}

Second, you can use it in your *src/App.js*:

{{< highlight javascript "hl_lines=1 19 24 32 33 34 35" >}}
import { compose } from 'recompose';

...

class App extends React.Component {

  ...

  render() {
    return (
      <div className="page">
        <div className="interactions">
          <form type="submit" onSubmit={this.onInitialSearch}>
            <input type="text" ref={node => this.input = node} />
            <button type="submit">Search</button>
          </form>
        </div>

        <ListWithLoadingWithPaginated
          list={this.state.hits}
          isLoading={this.state.isLoading}
          page={this.state.page}
          onPaginatedSearch={this.onPaginatedSearch}
        />
      </div>
    );
  }
}

...

const ListWithLoadingWithPaginated = compose(
  withPaginated,
  withLoading,
)(List);
{{< /highlight >}}

Don't forget to omit the outsourced functionalities from your List component.

{{< highlight javascript "hl_lines=1 2 3 4 5 6 7" >}}
const List = ({ list }) =>
  <div className="list">
    {list.map(item => <div className="list-row" key={item.objectID}>
      <a href={item.url}>{item.title}</a>
    </div>)}
  </div>
{{< /highlight >}}

The List component only deals with the responsibility to render a List. Now, both functionalities, the retrieval of the paginated list and the loading indicator, are added on top by composition.

Your atomic problem solvers, the List and the HOCs can be composed in a flexible way. Imagine that you can use another List component now, that renders the stories from Hacker News in a different way. You could just exchange the List component in the composition.

{{< highlight javascript >}}
const DifferentList = ({ list }) =>
  <div className="list">
    {list.map(item => <div className="list-row" key={item.objectID}>
      <span>
        {item.author}
      </span>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>
        {item.num_comments}
      </span>
      <span>
        {item.points}
      </span>
    </div>)}
  </div>

const ListWithLoadingWithPaginated = compose(
  withPaginated,
  withLoading,
)(DifferentList);
{{< /highlight >}}

Or you decide to drop the paginated list feature.

{{< highlight javascript >}}
const ListWithLoading = compose(
  withLoading,
)(List);
{{< /highlight >}}

By using higher order components, you can opt-in and opt-out functionalities on basic components. The basic components can take care on only one responsibility, while the HOCs add some sugar on top.

<hr class="section-divider">

Your App component already renders a powerful React List component by now. While the List component only deals with the responsibility to render a list of items, the HOCs opt-in additional functionalities.

You can continue with the second part of the React tutorial series: [Infinite Scroll in React - Build a powerful Component (Part II)](https://www.robinwieruch.de/react-infinite-scroll).

