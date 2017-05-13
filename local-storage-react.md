+++
title = "Local Storage in React"
description = "The article gives you a little showcase on how to persist state in React with local storage, how to use it as a cache and how to make it expire..."
date = "2017-04-27T13:50:46+02:00"
tags = ["React"]
categories = ["React"]
keyword = "react local storage"
news_keywords = ["react local storage"]
hashtag = "#ReactJs"
banner = "img/posts/local-storage-react/banner.jpg"
contribute = "local-storage-react.md"
headline = "Local Storage in React"

summary = "After reading the Road to learn React, a few readers approached me with a question: How can I persist state in React? Obviously it would be possible by having a backend to persist it in a database. Once the app starts, the React app would make a request to the backend to retrieve the state. Then it could be stored in the local component state or via a state management library like Redux or MobX. But a simpler yet most of the times sufficient solution could be to use the native local storage of the browser. No backend and no additional library needed."
+++

{{% pin_it_image "react local storage" "img/posts/local-storage-react/banner.jpg" %}}

After reading [the Road to learn React](http://www.robinwieruch.de/the-road-to-learn-react/), a few readers approached me with a question: How can I persist state in React?

Obviously it would be possible by having a backend to persist it in a database. Once the app starts, the React app would make a request to the backend to retrieve the state. Then it could be stored in the local component state or via a state management library like [Redux or MobX](http://www.robinwieruch.de/redux-mobx-confusion/). But a simpler yet most of the times sufficient solution could be to use the native local storage of the browser. No backend and no additional library needed.

The article gives you a little showcase on how to persist state in React with local storage, how to use it as a cache and how to make it expire.

{{% chapter_header "Initiating the React App" "init" %}}

You can use {{% a_blank "create-react-app" "https://github.com/facebookincubator/create-react-app" %}} or any other [React boilerplate](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/). I can recommend to use *create-react-app*.

Since we will use the *native fetch API* ([What's an API?](https://www.robinwieruch.de/what-is-an-api-javascript/)) to retrieve data from an third-party API, you should make sure that *fetch* is supported by your browser. Otherwise you would need a polyfill to support it. That's why I recommend to use *create-react-app*, because the fetch API will work in every browser. They provide everything for you.

After you have set up your project, you can replace your root component with the following boilerplate.

{{< highlight javascript >}}
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hits: null };
  }

  onSearch = (e) => {
    e.preventDefault();

    const { value } = this.input;

    if (value === '') {
      return;
    }

    fetch('https://hn.algolia.com/api/v1/search?query=' + value)
      .then(response => response.json())
      .then(result => this.onSetResult(result));
  }

  onSetResult = (result) => {
    this.setState({ hits: result.hits });
  }

  render() {
    return (
      <div>
        <h1>Search Hacker News with Local Storage</h1>
        <p>There shouldn't be a second network request, when you search for something twice.</p>

        <form type="submit" onSubmit={this.onSearch}>
          <input type="text" ref={node => this.input = node} />
          <button type="button">Search</button>
        </form>

        {
          this.state.hits &&
          this.state.hits.map(item => <div key={item.objectID}>{item.title}</div>)
        }
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

If you understand everything that is happening here, you can head over to the next headline. Otherwise you can read the quick recap:

In the render class method you will find a [form by using the ref attribute](https://www.robinwieruch.de/react-ref-attribute-dom-node/) and a [conditional rendering](https://www.robinwieruch.de/conditional-rendering-react/) of an array.

In this straight forward application, you can experience the unidirectional data flow in React. The `onSubmit` callback of the form is used to execute the class method `onSearch()`. The `onSearch()` method will do nothing, if the input field was empty. If it wasn't empty, it will perform a request to the {{% a_blank "Hacker News API" "https://hn.algolia.com/api" %}}. After the request was successful, the method stores the result in the local component state by using React `setState()`.

The class method uses the {{% a_blank "native fetch API of the browser" "https://developer.mozilla.org/en/docs/Web/API/Fetch_API" %}} to retrieve stories from the Hacker News platform. You could also use a third-party library like {{% a_blank "axios" "https://github.com/mzabriskie/axios" %}} or {{% a_blank "superagent" "https://github.com/visionmedia/superagent" %}} to perform such a request. That's [one of the things that makes React so powerful](https://www.robinwieruch.de/reasons-why-i-moved-from-angular-to-react/) in the first place, because you stay flexible in choosing your building blocks.

{{% chapter_header "Introduction to Local Storage" "localStorage" %}}

The local storage is supported by most of the browsers. You can check the browser compatibility and read even more about the topic in {{% a_blank "the official documentation" "https://developer.mozilla.org/en/docs/Web/API/Window/localStorage" %}}.

The usage of the local storage is fairly straight forward. In your JavaScript code, running in the browser, you should have access to the `localStorage` object. The object has a setter and getter to store and retrieve data from the object.

{{< highlight javascript >}}
// setter
localStorage.setItem('myData', data);

// getter
localStorage.getItem('myData');
{{< /highlight >}}

When you close the browser and open the app again, you will find the data still in the object.

{{% chapter_header "Using Local Storage in React as Cache" "localStorageReact" %}}

Now you can add only a few lines to enable caching in your application. Even if you close the browser and open the app again, you will have a cached result.

{{< highlight javascript "hl_lines=19 20 21 22 23 27 30 31" >}}
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hits: null };
  }

  onSearch = (e) => {
    e.preventDefault();

    const { value } = this.input;

    if (value === '') {
      return;
    }

    const cachedHits = localStorage.getItem(value);
    if (cachedHits) {
      this.setState({ hits: JSON.parse(cachedHits) });
      return;
    }

    fetch('https://hn.algolia.com/api/v1/search?query=' + value)
      .then(response => response.json())
      .then(result => this.onSetResult(result, value));
  }

  onSetResult = (result, key) => {
    localStorage.setItem(key, JSON.stringify(result.hits));
    this.setState({ hits: result.hits });
  }

  render() {
    return (
      <div>
        <h1>Search Hacker News with Local Storage</h1>
        <p>There shouldn't be a second network request, when you search for something twice.</p>

        <form type="submit" onSubmit={this.onSearch}>
          <input type="text" ref={node => this.input = node} />
          <button type="button">Search</button>
        </form>

        {
          this.state.hits &&
          this.state.hits.map(item => <div key={item.objectID}>{item.title}</div>)
        }
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

There shouldn't be a request to the API made twice, because the result should be cached. If there are `cachedHits`, the method returns earlier without performing a request. The result in the cache is an JavaScript object and thus needs to be stringified when stored and parsed when retrieved from the storage.

{{% chapter_header "Expiration with Session Storage" "sessionStorageExpiration" %}}

Sometimes you want the cache only in your current session. When closing the browser, you want the cache to become empty again. That's where you can use the native `sessionStorage` instead of the `localStorage`.

The {{% a_blank "session storage" "https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage" %}} is used in the same way as the local storage:

{{< highlight javascript >}}
// setter
sessionStorage.setItem('myData', data);

// getter
sessionStorage.getItem('myData');
{{< /highlight >}}

It can be useful when you deal with a user session after a user logged in into your application. The login session could be saved until the browser is closed.

<hr class="section-divider">

You can find the {{% a_blank "source code in a GitHub repository" "https://github.com/rwieruch/react-local-storage" %}}. As I said, sometimes you don't need a sophisticated persistent layer in your application. It turns out to be sufficient to use a cache like local storage and session storage.

The book [the Road to learn React](http://www.robinwieruch.de/the-road-to-learn-react/) will show you how to implement a cache with paginated data by using `setState()` and `this.state`. After reading it, you could apply this tutorial to have a cached state even after the browser refreshed.
