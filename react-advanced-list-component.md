+++
title = "Advanced List in React - Build a powerful Component (Part III)"
description = "The series of React tutorials focuses on building a complex yet elegant and powerful React component. It attempts to go beyond the fundamentals in React. This part introduces an advanced list in React..."
date = "2017-06-13T13:50:46+02:00"
tags = ["react"]
categories = ["React"]
keyword = "react advanced list component"
news_keywords = ["react advanced list component"]
hashtag = "#ReactJs"
contribute = "react-advanced-list-component.md"
card = "img/posts/react-advanced-list-component/banner_640.jpg"
banner = "img/posts/react-advanced-list-component/banner.jpg"
headline = "Advanced List in React - Build a powerful Component (Part III)"

summary = "The series of React tutorials focuses on building a complex yet elegant and powerful React component. It attempts to go beyond the fundamentals in React. This part introduces an advanced list in React. You will combine higher order components, configure them and opt-in fallbacks for an improved user experience."
+++

{{% pin_it_image "react advanced list component" "img/posts/react-advanced-list-component/banner.jpg" "is-src-set" %}}

The last two parts of the tutorial series in React introduced two functionalities, [a paginated list](https://www.robinwieruch.de/react-paginated-list) and an [infinite scroll](https://www.robinwieruch.de/react-infinite-scroll), by using higher order components. However, these functionalities were used exclusively. In one scenario you used a paginated list, where you manually fetched the data, then again in another scenario you used an infinite scroll, where the data was fetched automatically for you.

Now you could use both features exclusively. But what about using them in combination to give your user an improved user experience? You could use the infinite scroll as default behavior for your list. Your users will thank you, because they don't have to fetch more list items by using the More button. Then, when your request runs into an error, you could use the More button as fallback. The user can manually try again to fetch data. That's a great user experience and done already by applications like Twitter and Pocket.

* [Paginated List in React - Build a powerful Component (Part I)](https://www.robinwieruch.de/react-paginated-list)
* [Infinite Scroll in React - Build a powerful Component (Part II)](https://www.robinwieruch.de/react-infinite-scroll)
* **Advanced List in React - Build a powerful Component (Part III)**

{{% chapter_header "Catching the Error in Local State" "catch-error-react-local-state" %}}

The goal is to give the user of your list component a possibility to jump in when an error occurs. First, you would have to track the error when a request fails. You will have to implement error handling in your React local state:

{{< highlight javascript "hl_lines=4 11 15 16 17 18 28 35 40 41" >}}
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
      .catch(this.onSetError)
      .then(response => response.json())
      .then(result => this.onSetResult(result, page));
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
{{< /highlight >}}

Basically when a request fails and you run into the catch block of your fetch function, you will store a simple boolean in your local state that indicates an error. When the request succeeds, you will keep set the `isError` property to false. You can use the introduced property in your components now.

{{< highlight javascript "hl_lines=14 16 20" >}}
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
{{< /highlight >}}

As you might have noticed, the enhanced List component got renamed to `AdvancedList`. How will it be composed? Basically it uses both functionalities, the manual fetch with the More button and automatic fetch with the infinite scroll, combined instead of exclusively.

{{% chapter_header "Combine Higher Order Components" "combine-higher-order-components" %}}

The composition of these functionalities would look like the following:

{{< highlight javascript "hl_lines=1 2 3" >}}
const AdvancedList = compose(
  withPaginated,
  withInfiniteScroll,
  withLoading,
)(List);
{{< /highlight >}}

However, now both features would be used together without any prioritization. The goal would be to use the infinite scroll on default, but opt-in the More button when an error occurs. In addition, the More button should indicate the user that an error occurred and he or she can try again to fetch the sublist. The manual paginated fetch is the fallback when an error happens.

Let's adjust the `withPaginate` higher order component to make it clear for the user that an error happened and that he or she can try it  again manually by clicking the button.

{{< highlight javascript "hl_lines=7 8 9 10 11 16 18" >}}
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
{{< /highlight >}}

In addition, the infinite scroll higher order component should be inactive when there is an error.

{{< highlight javascript "hl_lines=10" >}}
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
{{< /highlight >}}

Now you can try the functionality in the browser. First, you make an initial search to trigger a request to the Hacker News API. Afterward you can scroll down several times to verify the working infinite scroll functionality. In the network tab of your developer console, you can simulate that your browser tab is offline. When you toggle it to offline and scroll again, you will see that the More button appears. That's your fallback because the request to the Hacker News API failed. The user of your application gets a great user experience, because he or she knows what happened and can try it again. You can click the More button, but it will fails as long as your toggled the browser tab as offline. Once you toggle it to online again, the manual fetch by using the More button should work. The next time you scroll down the default behavior, the infinite scroll, should work again.

{{% chapter_header "Configure Higher Order Components" "configure-higher-order-components" %}}

There is one last optimization left. Unfortunately both HOCs that provide the infinite scroll and paginated list behavior are dependent on each other. Both use props that are not really used in the higher order component itself. These props are unnecessary dependencies. For instance, the infinite scroll shouldn't know about the `isError` property. It would be good to make the components unaware of their conditions. These conditions could be extracted as configurations for the higher order components. Once again, if you are not sure about a configuration in a higher order component, you can read [the gentle introduction to higher order components article](https://www.robinwieruch.de/gentle-introduction-higher-order-components/).

Let's extract the conditions as configuration for each higher order components. First, give your higher order components a `conditionFn` function as configuration.

{{< highlight javascript "hl_lines=1 6 10 16 32 43" >}}
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
{{< /highlight >}}

Second, define these `conditionFn` functions outside of your higher order components. Thus, each higher order component can define flexible conditions.

{{< highlight javascript "hl_lines=1 2 4 5 6 7 8 10 11 14 15 16" >}}
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
{{< /highlight >}}

The condiditions will get evaluated in the higher order components themselves. That's it.

<hr class="section-divider">

In the last three parts of this React tutorial series you have learned to build a complex list component by using React's higher order components. The list component itself stays simple. It only displays a list. But it can be composed into useful higher order components to opt-in functionalities. By extracting the conditions from the higher order components and using them as configuration, you have the control about which component is used first as default and which should be used as opt-in feature. The full example application can be found in {{% a_blank "this repository" "https://github.com/rwieruch/react-example-paginated-list-infinite-scroll" %}}. If you are keen to explore more about these functionalities when working with lists in the local state of React, you can read [the Road to learn React](https://www.robinwieruch.de/the-road-to-learn-react/) to learn about caching in React.
