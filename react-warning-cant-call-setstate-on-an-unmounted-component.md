+++
title = "Prevent React setState on unmounted Component"
description = "How to avoid the React warning: Can only update a mounted or mounting component. It usually means you have called setState on an unmounted component ..."
date = "2018-10-07T13:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["can't call setstate on an unmounted component", "react prevent setState on unmounted Component"]
news_keywords = ["can't call setstate on an unmounted component", "react prevent setState on unmounted Component"]
hashtag = "#ReactJs"
card = "img/posts/react-warning-cant-call-setstate-on-an-unmounted-component/banner_640.jpg"
banner = "img/posts/react-warning-cant-call-setstate-on-an-unmounted-component/banner.jpg"
contribute = "react-warning-cant-call-setstate-on-an-unmounted-component.md"
headline = "Prevent React setState on unmounted Component"

summary = "There are too many people who encounter the following warnings. I have seen many GitHub issues regarding it and many people are asking me about it as well. That's why I wanted to have one article to address it."
+++

{{% sponsorship %}}

{{% pin_it_image "can't call setstate on an unmounted component" "img/posts/react-warning-cant-call-setstate-on-an-unmounted-component/banner.jpg" "is-src-set" %}}

There are too many people who encounter the following warnings. I have seen many GitHub issues regarding it and many people are asking me about it as well. That's why I wanted to have this article to address it and reference to it.

* **Warning: Can only update a mounted or mounting component. This usually means you called setState, replaceState, or forceUpdate on an unmounted component. This is a no-op.**

* **Warning: Can't call setState (or forceUpdate) on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.**

In general, warnings don't crash your application. But you should care about them. For instance, the previous warning(s) can lead to performance issues when not properly unmounting your stateful components. Let's discuss what these warnings are about.

The shown warning(s) usually show up when `this.setState()` is called in a component even though the component got already unmounted. The unmounting can happen for different cases:

* You don't render a component anymore due to [React's conditional rendering](https://www.robinwieruch.de/conditional-rendering-react/).

* You navigate away from a component by using a library such as React Router.

When not rendering the component anymore, it can still happen that `this.setState()` is called  if you have done asynchronous business logic in your component and updated the local state of the component afterward. The following cases are the most common causes:

* You made an asynchronous request to an [API](https://www.robinwieruch.de/what-is-an-api-javascript/), the request (e.g. Promise) isn't resolved yet, but you unmount the component. Then the request resolves, `this.setState()` is called to set the new state, but it hits an unmounted component.

* You have a {{% a_blank "listener" "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" %}} in your component, but didn't remove it on `componentWillUnmount()`. Then the listener may be triggered when the component unmounted.

* You have an interval (e.g. {{% a_blank "setInterval" "https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval" %}}) set up in your component and within the interval `this.setState()` is called. If you forgot to remove the interval on `componentWillUnmount()`, you will update state on an unmounted component again.

**What's the worst that can happen when seeing this warning?** It can have an performance impact on your React application, because it introduces memory leaks over time for your application running in the browser. If you only missed once preventing to set state after a component unmounted, it may doesn't have a huge performance impact. However, if you have a list of these components with asynchronous requests and you miss preventing to set state for all of them, it can start to slow down your React application. Still, that's not the worst about it. The worst case would be to miss removing event listeners and especially intervals. Imagine an interval every second updating the local state of a component even though the component got unmounted. If you miss to remove this interval, you may experience how it slows down your application.

{{% chapter_header "How to prevent setState for intervals/listeners on unmounted Components?" "react-prevent-setstate-unmounted-component-interval-listener" %}}

As you have noticed, most often the warning can be prevented by providing a mechanism in the unmounting lifecycle of a React component. For instance, listeners and intervals should be removed. {{% a_blank "Checkout this implementation of a game called Snake in React." "https://github.com/taming-the-state-in-react/react-snake/blob/master/src/App.js" %}}. There you will find both cases, clearing an interval and removing a listener, in the `componentWillUnmount()` lifecycle method of the App component.

I encourage you as well to try out {{% a_blank "this timer application" "https://github.com/the-road-to-learn-react/react-interval-setstate-unmounted-component-performance" %}}. You will see, when removing the `componentWillUnmount` lifecycle method, that the console logs from the interval should still show up in the browser's developer tools after toggling, in this case hiding, the timer. If you toggle the timer various times, you should see more and more console logs from orphan components which had this registered interval. The React warning for not calling setState on unmounted components should show up too.

{{% chapter_header "How to prevent setState for asynchronous requests on unmounted Components?" "react-prevent-setstate-unmounted-component-async-request" %}}

You have seen how straight forward it can be to avoid the warning for intervals and listeners. It's just about preventing a callback function, the one in `setInterval` or `addEventListener`, to be called when the component is unmounted. Actually there is no excuse not doing it.

But what about asynchronous requests in React components? It can happen that you [trigger an asynchronous request in your React component](https://www.robinwieruch.de/react-fetching-data/), which will call `this.setState()` eventually to set the result in the local state of the component. But what if the component has unmounted before. Then the warning will show up, because React cannot set the result in state when the component isn't there anymore.

{{< highlight javascript >}}
class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [],
    };
  }

  componentDidMount() {
    axios
      .get('https://hn.algolia.com/api/v1/search?query=react')
      .then(result =>
        this.setState({
          news: result.data.hits,
        }),
      );
  }

  render() {
    return (
      <ul>
        {this.state.news.map(topic => (
          <li key={topic.objectID}>{topic.title}</li>
        ))}
      </ul>
    );
  }
}
{{< /highlight >}}

You can handle this issue either by aborting the request when your component unmounts or preventing `this.setState()` on an unmounted component. However, most promise-based libraries/API don't implement aborting a request, so we add a workaround, introducing a class field that holds the lifecycle state of your component, to prevent `this.setState()` being called. It can be initialized as false when the component initializes, changed to true when the component mounted, and then reset to false when the component unmounted. This way, you can keep track of your component's lifecycle state. It doesn't affect the local state stored and modified with `this.state` and `this.setState()`, because you can access it directly on the component instance without relying on React's local state management. Moreover, it doesn't lead to any re-rendering of the component when the class field is changed.

{{< highlight javascript "hl_lines=2 13 24 25 26" >}}
class News extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      news: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;

    axios
      .get('https://hn.algolia.com/api/v1/search?query=react')
      .then(result =>
        this.setState({
          news: result.data.hits,
        }),
      );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    ...
  }
}
{{< /highlight >}}

Finally, you can use this knowledge not to abort the request itself, but avoid calling `this.setState()` on your component instance, even though the component already unmounted. It will prevent the warning.

{{< highlight javascript "hl_lines=18 22" >}}
class News extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      news: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;

    axios
      .get('https://hn.algolia.com/api/v1/search?query=react')
      .then(result => {
        if (this._isMounted) {
          this.setState({
            news: result.data.hits,
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    ...
  }
}
{{< /highlight >}}

Now, even though the component got unmounted and the request resolves eventually, the flag in your component will prevent to set the state of the React component after it got unmounted. You can checkout {{% a_blank "this project on GitHub" "https://github.com/the-road-to-learn-react/react-asynchronous-request-setstate-unmounted-component" %}} that implements the shown example. In addition, the example comes with a toggle to trigger the warning (identical to the previous timer example) too. In order to see the warning happening, you have to remove the previous shown solution, throttle your network connection in your browser's developer tools, and click the toggle button once you see it. When you see the toggle button, the other component for fetching the data should have been rendered too. But the data fetching is still pending. Once you toggle the component with the data fetching with the conditional rendering to not render it anymore, you should see the warning once the response of the asynchronous request resolves. Now, if you add the solution for the problem again and repeat everything, you shouldn't see the warning anymore.

The solution with `this._isMounted` is agnostic to your library or third-party API that you are using to fetch data in React. It works with the native fetch API of the browser but also with the powerful axios library. Not every of these data fetching solutions comes with a feature to cancel requests, so it's good to know about this general solution to prevent setting the state in unmounted React components. However, if you are using axios, you can checkout its {{% a_blank "cancellation mechanism" "https://github.com/axios/axios#cancellation" %}}. I find it way more verbose than the more general solution with `this._isMounted`, but it's worth checking it out.

<hr class="section-divider">

Hopefully you got all the tools to prevent the warnings now, but more importantly to make your application more robust for memory leaks and performance issues. If you have any other suggestions on how to deal with the warning, leave a comment below.