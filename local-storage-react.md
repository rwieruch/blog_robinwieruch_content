+++
title = "Session Storage and Local Storage in React"
description = "An article to showcase the usage of the session storage and local storage in React to persist your local state, to cache it for browser reloads and to make it expire ..."
date = "2017-04-27T13:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react local storage", "react session storage"]
news_keywords = ["react local storage"]
hashtag = "#ReactJs"
card = "img/posts/local-storage-react/banner_640.jpg"
banner = "img/posts/local-storage-react/banner.jpg"
contribute = "local-storage-react.md"
headline = "Session Storage and Local Storage in React"

summary = "After reading the Road to learn React, a few readers approached me with a question: How can I persist state in React? Obviously it would be possible by having a backend to persist it in a database. Once the app starts, the React app would make a request to the backend to retrieve the state. Then it could be stored in the local component state or via a state management library like Redux or MobX. But a simpler yet most of the times sufficient solution could be to use the native local storage of the browser. No backend and no additional library needed."
+++

{{% pin_it_image "react local storage" "img/posts/local-storage-react/banner.jpg" "is-src-set" %}}

After reading [the Road to learn React](http://www.robinwieruch.de/the-road-to-learn-react/), a few readers approached me with a question: How can I persist state in React? Obviously it would be possible by having a backend to persist it in a database. Once the app starts, the React app would make a request to the backend to retrieve the state. Then it could be stored in the local component state or in a state container of a state management library like [Redux or MobX](http://www.robinwieruch.de/redux-mobx-confusion/).

But a simpler yet most of the times sufficient solution could be to use the native local storage of the browser. There is no backend and no additional library needed. The article gives you a little showcase on how to persist state in React with local storage, how to use it as a cache and how to make it expire.

{{% chapter_header "Initiating the React App for Local Storage Example" "create-react-app-local-storage" %}}

You can use {{% a_blank "create-react-app" "https://github.com/facebookincubator/create-react-app" %}} or any other [React boilerplate](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/). It is recommended to use *create-react-app*.

In the following example you will fetch data from an [API](https://www.robinwieruch.de/what-is-an-api-javascript/) and store it in React's local state. Furthermore, you will use the local storage to store the result in the browser. So whenever you closer your browser and open it again, the fetched result from the API should be still available.

After you have set up your project with create-react-app, you can replace your root component with the following boilerplate.

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
        <p>
          There shouldn't be a second network request,
          when you search for something twice.
        </p>

        <form onSubmit={this.onSearch}>
          <input type="text" ref={node => this.input = node} />
          <button type="submit">Search</button>
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

If you understand everything that is happening here, you can head over to the next headline to add the local storage as feature. Otherwise you can read the brief recap:

In this sample application, you can experience the unidirectional data flow in React. The `onSubmit` handler of the form is used to execute the class method `onSearch()`. The `onSearch()` method will do nothing, if the input field was empty. If it wasn't empty, it will perform a request to the {{% a_blank "Hacker News API" "https://hn.algolia.com/api" %}}. After the request was successful, the method stores the result in the local component state by using React `setState()`. Read the following article to read more about [data fetching in React](https://www.robinwieruch.de/react-fetching-data/).

Furthermore, in the render class method, you will find a [form by using the ref attribute](https://www.robinwieruch.de/react-ref-attribute-dom-node/) and a [conditional rendering](https://www.robinwieruch.de/conditional-rendering-react/) for the fetched list from the API. The former is used to submit your search request to an API by having access to the input field's value. The latter will make sure that there is either a list or nothing at all rendered by your component when there is no result.

The `onSearch` class method uses the {{% a_blank "native fetch API of the browser" "https://developer.mozilla.org/en/docs/Web/API/Fetch_API" %}} to retrieve stories from the Hacker News platform. You could also use a third-party library like {{% a_blank "axios" "https://github.com/mzabriskie/axios" %}} or {{% a_blank "superagent" "https://github.com/visionmedia/superagent" %}} to perform such a request. That's [one of the things that makes React so powerful](https://www.robinwieruch.de/essential-react-libraries-framework/) in the first place, because you stay flexible in choosing your building blocks.

{{% chapter_header "Introduction to Local Storage" "localStorage" %}}

The local storage is supported by most of the browsers. You can check the browser compatibility and read even more about the topic in {{% a_blank "the official documentation" "https://developer.mozilla.org/en/docs/Web/API/Window/localStorage" %}}. The usage of the local storage is fairly straight forward. In your JavaScript code, running in the browser, you should have access to the `localStorage` object. The object has a setter and getter to store and retrieve data from the object.

{{< highlight javascript >}}
// setter
localStorage.setItem('myData', data);

// getter
localStorage.getItem('myData');
{{< /highlight >}}

Once you close the browser and open the app again, you will find the data still in the object.

{{% chapter_header "Local Storage in React (as Cache)" "local-storage-react" %}}

Now you can add only a few lines to enable caching in your application. Even if you close the browser and open the application again, you will have a cached result which was from the API.

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
        <p>
          There shouldn't be a second network request,
          when you search for something twice.
        </p>

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

There shouldn't be a request to the API made twice for the same search term, because the result should be cached in the local storage. If there are `cachedHits` in the localStorage object, the method returns earlier without performing a request. The result in the cache is an JavaScript object and thus needs to be stringified when stored and parsed when retrieved from the storage.

{{% chapter_header "Expiration with Session Storage" "session-storage-react" %}}

Sometimes you want the cache only in your current session. When closing the browser, you want the cache to become empty again. That's where you can use the native `sessionStorage` instead of the `localStorage`. The {{% a_blank "session storage" "https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage" %}} is used in the same way as the local storage:

{{< highlight javascript >}}
// setter
sessionStorage.setItem('myData', data);

// getter
sessionStorage.getItem('myData');
{{< /highlight >}}

It can be useful when you deal with an user session after a user logged in into your application. The login session could be saved until the browser is closed.

<hr class="section-divider">

You can find the {{% a_blank "source code in a GitHub repository" "https://github.com/rwieruch/react-local-storage" %}}. If you like it, make sure to star it. As mentioned, sometimes you don't need a sophisticated persistent layer in your application. It turns out to be sufficient to use the local storage or session storage as a cache.

If you are looking for more advanced local storage solutions, you can checkout {{% a_blank "store.js" "https://github.com/marcuswestin/store.js/" %}} and {{% a_blank "cross-storage" "https://github.com/zendesk/cross-storage" %}}. The former is used for browser compatibility and the latter is used for cross domain synchronization of local storages.

The book [the Road to learn React](http://www.robinwieruch.de/the-road-to-learn-react/) will show you how to implement a cache with paginated data by using `setState()` and `this.state`. After reading it, you could apply this tutorial to have a cached state even after the browser is closed.

The other book {{% a_blank "Taming the State in React" "https://roadtoreact.com/" %}} dives more deeply into state management in React with React's local state and Redux.
