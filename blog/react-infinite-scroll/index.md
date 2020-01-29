---
title: "Infinite Scroll in React - Build a powerful Component (Part II)"
description: "The series of React tutorials focuses on building a complex yet elegant and powerful React component. It attempts to go beyond the fundamentals in React.js. This part introduces infinite scroll in React in an elegant way by using higher order components. You will implement an infinite scrolling higher order component ..."
date: "2017-06-07T13:50:46+02:00"
categories: ["React"]
keywords: ["react infinite scroll"]
hashtags: ["#ReactJs"]
contribute: ""
banner: "./images/banner.jpg"
author: ""
---

<Sponsorship />

The following React tutorial builds up on [Paginated List in React - Build a powerful Component (Part I)](/react-paginated-list). The series of tutorials goes beyond the basic React components that you encounter in other React tutorials.

This part of the series will show you how to build an infinite scroll in React. So far, your List component is able to opt-in two functionalities: showing a loading indicator and fetching more list items by using a More button. While the More button fetches manually more items, the infinite scroll should fetch more items once the user scrolled to the end of the list.

In this part of the series, both functionalities, the manual and automatic retrieval, should be opt-in exclusively. In the third part of the series you will learn how to combine both enhancements in one advanced List component with error and fallback handling.

* [Paginated List in React - Build a powerful Component (Part I)](/react-paginated-list)
* **Infinite Scroll in React - Build a powerful Component (Part II)**
* [Advanced List in React - Build a powerful Component (Part III)](/react-advanced-list-component)

# Infinite Scroll in React

The infinite scroll requires you to use lifecycle methods in the List component. These lifecycle methods are used to register the event listeners that trigger on scrolling. First, let's refactor the List component from a functional stateless component to a React ES6 class component. Otherwise we would not be able to access the lifecycle methods.

```javascript{10,11,12,13,14,15,16,17,18,19,20,21,22}
// functional stateless component
const List = ({ list }) =>
  <div className="list">
    {list.map(item => <div className="list-row" key={item.objectID}>
      <a href={item.url}>{item.title}</a>
    </div>)}
  </div>

// React ES6 class component
class List extends React.Component {
  render() {
    const { list } = this.props;
    return (
      <div className="list">
        {list.map(item => <div className="list-row" key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </div>)}
      </div>
    );
  };
}
```

Now it's about implementing the functionality that the List fetches more paginated lists on scroll.

```javascript{2,3,4,6,7,8,10,11,12,13,14,15,16,17}
class List extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
      this.props.list.length
    ) {
      this.props.onPaginatedSearch();
    }
  }

  render() {
    ...
  };
}
```

There are two registered event listeners now. First, when the component mounted, the `onScroll()` method is registered as callback for the `scroll` event. Second, the same method gets unregistered when the component unmounts.

The `onScroll()` class method itself is responsible to execute the `onPaginatedSearch()` method that fetches the next page, the next subset, of the whole list. But it comes with two conditions: First, it only executes when the user reached the bottom of the page. Second, it executes only when there is already an initial list.

# Infinite Scroll as Higher Order Component in React

Again, as for the paginated list in the first part of the tutorial series, you can extract the functionality to a higher order component. You can already see all the parts of the List component that could move into the HOC: all those that you have added to the List component in the last step.

If you are not familiar with higher order components, as in the first part of the series, I can recommend to read [the gentle introduction to higher order components](/react-higher-order-components/).

```javascript
const withInfiniteScroll = (Component) =>
  class WithInfiniteScroll extends React.Component {
    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
      if (
        (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
        this.props.list.length
      ) {
        this.props.onPaginatedSearch();
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }
```

The List component becomes simple again. In addition, it doesn't need lifecycle methods anymore and can be refactored to a functional stateless component again.

```javascript{1,2,3,4,5,6,7}
const List = ({ list }) =>
  <div className="list">
    {list.map(item => <div className="list-row" key={item.objectID}>
      <a href={item.url}>{item.title}</a>
    </div>)}
  </div>
```

Finally you can use the automatic infinite scroll instead of the manual paginated list.

```javascript{15,19,27,28,29}
class App extends React.Component {

  ...

  render() {
    return (
      <div>
        <h1>Search Hacker News</h1>

        <form type="submit" onSubmit={this.onInitialSearch}>
          <input type="text" ref={node => this.input = node} />
          <button type="submit">Search</button>
        </form>

        <ListWithLoadingWithInfinite
          list={this.state.hits}
          page={this.state.page}
          onPaginatedSearch={this.onPaginatedSearch}
        />
      </div>
    );
  }
}

...

const ListWithLoadingWithInfinite = compose(
  // withPaginated,
  withInfiniteScroll,
  withLoading,
)(List);
```

Now, the two HOCs, paginated list and infinite scroll, can be opted-in exclusively to substitute the functionalities of manual and automatic retrieval of the next page of the list. Both can be combined with the loading indicator HOC though.

# Too many Request on Infinite Scroll

There is one flaw in the infinite scroll higher order component. It executes too often, once the user reached the bottom of the page. But it should only execute once, wait for the result, and then be allowed to trigger again when the user reaches the bottom of the page.

```javascript{9}
const withInfiniteScroll = (Component) =>
  class WithInfiniteScroll extends React.Component {
    ...

    onScroll = () => {
      if (
        (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
        this.props.list.length &&
        !this.props.isLoading
      ) {
        this.props.onPaginatedSearch();
      }
    }

    ...
  }
```

Now the loading state prevents too many requests. Only when there is no pending request, the scroll event will trigger.

<Divider />

The upcoming and last part of this series will show you how to combine both functionalities, the paginated list and the infinite scroll, to make it a great user experience. A little hint: one of the two can be used as fallback when there was an erroneous request. Other platforms, such as Twitter and Pocket, are using this approach for an improved UX.

You can continue with the third part of the React tutorial series: [Advanced List in React - Build a powerful Component (Part III)](/react-advanced-list-component).
