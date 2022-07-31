---
title: "Advanced List in React - Build a powerful Component (Part III)"
description: "The series of React tutorials focuses on building a complex yet elegant and powerful React component. It attempts to go beyond the fundamentals in React.js. This part introduces an advanced list in React that will enable you to opt-in infinite scrolling and pagination ..."
date: "2017-06-13T13:50:46+02:00"
categories: ["React"]
keywords: ["react list component"]
hashtags: ["#ReactJs"]
contribute: ""
banner: "./images/banner.jpg"
author: ""
---

<Sponsorship />

The last two parts of the tutorial series in React introduced two functionalities, [a paginated list](/react-paginated-list/) and an [infinite scroll](/react-infinite-scroll/), by using higher order components. However, these functionalities were used exclusively. In one scenario you used a paginated list, where you manually fetched the data, and in the other scenario you used an infinite scroll, where the data was fetched automatically.

You could use both features exclusively. But what about using them in combination to give your user an improved user experience? You could use infinite scroll as the default behavior for your list. Your users will thank you, because they don't have to fetch more list items by clicking a More button. Then, when your request runs into an error, you could use the More button as a fallback. The user can try to fetch the data again manually. That's a great user experience, and this is what applications like Twitter and Pocket do.

* [Paginated List in React - Build a powerful Component (Part I)](/react-paginated-list/)
* [Infinite Scroll in React - Build a powerful Component (Part II)](/react-infinite-scroll/)
* **Advanced List in React - Build a powerful Component (Part III)**

# Catching the Error in Local State

The goal is to give the user of your list component the possibility to jump in when an error occurs. First, you would have to track the error when a request fails. You will have to implement error handling in your React local state:

```javascript{4,11,15,16,17,18,28,35,40,41}
const applyUpdateResult = (result) => (prevState) => ({
  hits: [...prevState.hits, ...result.hits],
  page: result.page,
  isError: false,
  isLoading: false,
});

const applySetResult = (result) => (prevState) => ({
  hits: [...prevState.hits, ...result.hits],
  page: result.page,
  isError: false,
  isLoading: false,
});

const applySetError = (prevState) => ({
  isError: true,
  isLoading: false,
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      page: null,
      isLoading: false,
      isError: false,
    };
  }

  fetchStories = (value, page) => {
    this.setState({ isLoading: true });
    fetch(getHackerNewsUrl(value, page))
      .then(response => response.json())
      .then(result => this.onSetResult(result, page))
      .catch(this.onSetError);
  }

  onSetError = () =>
    this.setState(applySetError);

  onSetResult = (result, page) =>
    page === 0
      ? this.setState(applySetResult(result))
      : this.setState(applyUpdateResult(result));

  render() {
    ...
  }
}
```

Basically, when a request fails and your code executes the catch block of your fetch function, you will store a simple boolean in your local state that indicates an error. When the request succeeds, you will leave the `isError` property set to `false`. You can use this new property in your components now.

```javascript{14,16,20}
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

        <AdvancedList
          list={this.state.hits}
          isError={this.state.isError}
          isLoading={this.state.isLoading}
          page={this.state.page}
          onPaginatedSearch={this.onPaginatedSearch}
        />
      </div>
    );
  }
}
```

As you might have noticed, the enhanced List component was renamed to `AdvancedList`. How will it be composed? Basically, it uses both functionalities, the manual fetch with a More button and an automatic fetch with the infinite scroll, combined instead of exclusively.

# Combine Higher Order Components

The composition of these functionalities would look like this:

```javascript{1,2,3}
const AdvancedList = compose(
  withPaginated,
  withInfiniteScroll,
  withLoading,
)(List);
```

However, now both features would be used together without any prioritization. The goal would be to use the infinite scroll by default, but opt-in the More button when an error occurs. In addition, the More button should indicate to the user that an error occurred and they can try to fetch the sublist again. The manual paginated fetch is the fallback when an error happens.

Let's adjust the `withPaginate` higher order component to make it clear to the user that an error occurred and that they can try it again manually by clicking the More button.

```javascript{7,8,9,10,11,16,18}
const withPaginated = (Component) => (props) =>
  <div>
    <Component {...props} />

    <div className="interactions">
      {
        (props.page !== null && !props.isLoading && props.isError) &&
        <div>
          <div>
            Something went wrong...
          </div>
          <button
            type="button"
            onClick={props.onPaginatedSearch}
          >
            Try Again
          </button>
        </div>
      }
    </div>
  </div>
```

In addition, the infinite scroll higher order component should be inactive when there is an error.

```javascript{10}
const withInfiniteScroll = (Component) =>
  class WithInfiniteScroll extends React.Component {
    ...

    onScroll = () => {
      if (
        (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
        this.props.list.length &&
        !this.props.isLoading &&
        !this.props.isError
      ) {
        this.props.onPaginatedSearch();
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }
```

Now try the functionality in the browser. First, make an initial search to trigger a request to the Hacker News API. Next, scroll down several times to verify that infinite scroll functionality is working. In the network tab of your developer console, you can simulate that your browser tab is offline. When you toggle it to offline and scroll again, you will see that the More button appears. That's your fallback, because the request to the Hacker News API failed. The user of your application gets a great user experience, because they know what happened and can try it again. You can click the More button, but it will fail as long as the browser tab is toggled as offline. Once you toggle it online again, manual fetch by clicking the More button should work. The default behavior, namely the infinite scroll, should work again the next time you scroll down.

# Configure Higher Order Components

There is one last optimization left. Unfortunately, both HOCs that provide the infinite scroll and paginated list behavior are dependent on each other. Both use props that are not really used in the higher order component itself. These props are unnecessary dependencies. For instance, the infinite scroll should not know about the `isError` property. It would be better to make the components unaware of the condition of these properties. These conditions could be extracted as configurations for the higher order components. Once again, if you are not sure about configuration in a higher order component, then you can read [the gentle introduction to higher order components article](/react-higher-order-components/).

Let's extract the conditions as a configuration for each higher order component. First, give your higher order components a `conditionFn` function as configuration.

```javascript{1,6,10,16,32,43}
const withLoading = (conditionFn) => (Component) => (props) =>
  <div>
    <Component {...props} />

    <div className="interactions">
      {conditionFn(props) && <span>Loading...</span>}
    </div>
  </div>

const withPaginated = (conditionFn) => (Component) => (props) =>
  <div>
    <Component {...props} />

    <div className="interactions">
      {
        conditionFn(props) &&
        <div>
          <div>
            Something went wrong...
          </div>
          <button
            type="button"
            onClick={props.onPaginatedSearch}
          >
            Try Again
          </button>
        </div>
      }
    </div>
  </div>

const withInfiniteScroll = (conditionFn) => (Component) =>
  class WithInfiniteScroll extends React.Component {
    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () =>
      conditionFn(this.props) && this.props.onPaginatedSearch();

    render() {
      return <Component {...this.props} />;
    }
  }
```

Second, define these `conditionFn` functions outside of your higher order components. Thus, each higher order component can define flexible conditions.

```javascript{1,2,4,5,6,7,8,10,11,14,15,16}
const paginatedCondition = props =>
  props.page !== null && !props.isLoading && props.isError;

const infiniteScrollCondition = props =>
  (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)
  && props.list.length
  && !props.isLoading
  && !props.isError;

const loadingCondition = props =>
  props.isLoading;

const AdvancedList = compose(
  withPaginated(paginatedCondition),
  withInfiniteScroll(infiniteScrollCondition),
  withLoading(loadingCondition),
)(List);
```

The condiditions will be evaluated in the higher order components themselves. That's it.

<Divider />

In the last three parts of this React tutorial series, you learned to build a complex list component by using React's higher order components. The list component itself remains simple. It only displays a list. But it can be composed into useful higher order components with opt-in functionalities. By extracting the conditions from the higher order components and using them as a configuration, you can control which component is used first by default and which should be used as an opt-in feature. The full example application can be found in [this repository](https://github.com/rwieruch/react-example-paginated-list-infinite-scroll). If you are keen to explore more about these functionalities when working with lists in the local state of React, you can read [the Road to learn React](/the-road-to-learn-react/) to learn about caching in React.
