+++
title = "Why Frameworks matter"
description = "Newcomers to web development often start out with React, Vue or Angular far too early after they have learned vanilla JavaScript. There is not always the chance to experience the struggle why libraries like React were implemented in the first place ..."
date = "2018-02-11T13:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["why react matters"]
news_keywords = ["why react matters"]
hashtag = "#ReactJs"
card = "img/posts/why-frameworks-matter/banner_640.jpg"
banner = "img/posts/why-frameworks-matter/banner.jpg"
contribute = "why-frameworks-matter.md"
headline = "Why Frameworks matter"

summary = "The article shows you how a problem can be solved in vanilla JavaScript and React. It should give newcomers to web development a explanation of why libraries such as React are used nowadays. Both solutions are fine, but in the end React will outperform vanilla JavaScript once your application becomes larger."
+++

{{% pin_it_image "why react matters" "img/posts/why-frameworks-matter/banner.jpg" "is-src-set" %}}

There are many people entering the field of web development just now. It can be an overwhelming experience for newcomers to get to know all the tools which are used in modern web development nowadays. The historical gap between running HTML in Netscape and today widens with each of these tools that is put on top of the list. There comes a point in time where it makes no sense to learn jQuery anymore in between of learning vanilla JavaScript and the newest library. Students will [jump straight on their favorite framework](https://www.robinwieruch.de/how-to-learn-framework/) after learning vanilla JavaScript. What's missing for these people is all the historical knowledge from the gap in between. The question to be asked is: Why did we end up with React, Vue, and Angular?

In this article, I want to only focus on the leap from vanilla JavaScript to a modern library like React. When people are going to use such libraries, they most often never experienced the struggle from the past which led to these solutions. The question to be asked again: Why did we end up with these libraries? I want to showcase why a library such as React matters and why you wouldn't want implement applications in vanilla JavaScript. The whole story can be seen in analogy to any other library/framework such as Vue, Angular or Ember.

Sometimes I see people asking why they should use React. They have learned vanilla JavaScript and don't know why they should learn this new library on top of it. Often these people never build a larger application in vanilla JavaScript which people did back in the days with jQuery and JavaScript's DOM [API](https://www.robinwieruch.de/what-is-an-api-javascript/). When learning vanilla JavaScript nowadays, students most likely build a couple of smaller projects without a bigger scope. Thus there is no struggle involved in building these projects in vanilla JavaScript, because it just works for them. Which is great, because they need to experience that vanilla JavaScript should be used to solve smaller problems. In contrast, it's not the best move to default to a library to solve a problem for you.

In this article, I want to showcase how a small application can be build in vanilla JavaScript and React. If you are new to web development, it should give you a clear comparison why you would want to use a library such as React to build a larger application. If you already know React but newer built an application such as the following in vanilla JavaScript, it might be interesting to see it for you as well.

{{% chapter_header "Solving a problem in vanilla JavaScript" "vanilla-javascript" %}}

Let's build together an application in vanilla JavaScript. The problem: Search stories from {{% a_blank "Hacker News" "https://hn.algolia.com/api" %}} and show the result in a list in a browser. The application will only need an input field for the search request and a list to show the result. If a new search request is made, the list has to update.

In a folder of your choice, create a *index.html* file. Let's write a couple of lines of HTML in this file. First, there has to be some HTML boilerplate to render the content to the browser.

{{< highlight html >}}
<!DOCTYPE html>
<html>
  <head>
    <title>Vanilla JavaScript</title>
  </head>
  <body>
  </body>
  <script src="index.js"></script>
</html>
{{< /highlight >}}

The important part is the imported *index.js* file. That's the file where the vanilla JavaScript code will end up. You can create it next to your *index.html* file. But before you will start to write JavaScript, let's add some more HTML. The application should show an input field and a button to request data based on a search query from the input field.

{{< highlight html "hl_lines=7 8 9 10 11" >}}
<!DOCTYPE html>
<html>
  <head>
    <title>Vanilla JavaScript</title>
  </head>
  <body>
    <div id="app">
      <h1>Search Hacker News with vanilla JavaScript</h1>
      <input id="searchInput" />
      <button id="searchButton">Search</button>
    </div>
  </body>
  <script src="index.js"></script>
</html>
{{< /highlight >}}

You might have noticed that there is no container for the requested content yet. In a perfect world, there would be some kind of list container which has multiple items to show the requested stories from Hacker News. Since this content is unknown before the request happens, it should be rendered dynamically after a request is made. You will do this in JavaScript by using the DOM API for DOM manipulations in the next part.

The HTML element with the id `app` can be used to hook into the DOM later on. In addition, the button element can be used to assign a click event listener. That's the perfect place to start the JavaScript code. So let's start there in the *index.js* file.

{{< highlight javascript >}}
function addButtonEvent() {
  document.getElementById('searchButton')
    .addEventListener('click', function () {
      // (4) remove old list if there is already a list

      // (1) get value from input field
      // (2) search list from API with value

      // (3) append list to DOM
    });
};

addButtonEvent();
{{< /highlight >}}

That's everything needed for the application. Once the *index.js* file runs, there will be an event listener added to the button element with the id `searchButton`. You can find the button element in your *index.html* file.

The last line is important because someone has to call the function in the first place. The function itself is only the declaration but not the execution of it. All the following implementations will be just a couple of more functions which are executed once someone clicks the button.

The comments already show you the business logic which will be implemented step by step. Now, let's try to keep the code concise here. You can extract the function which is called on a button click event.

{{< highlight javascript "hl_lines=3 6 7 8" >}}
function addButtonEvent() {
  document.getElementById('searchButton')
    .addEventListener('click', onSearch);
};

function onSearch() {

};
{{< /highlight >}}

Now let's implement the business logic once the button is clicked. There are three things which need to happen. First, you need to retrieve the value from the HTML input field which is used for the search request. Second, you have to make the asynchronous search request. And third, you need to append the result from the search request to the DOM.

{{< highlight javascript "hl_lines=7 8" >}}
function addButtonEvent() {
  document.getElementById('searchButton')
    .addEventListener('click', onSearch);
};

function onSearch() {
  doSearch(getValueFromElementById('searchInput'))
    .then(appendList);
};
{{< /highlight >}}

There are three functions now which you will implement in the following steps. First, let's retrieve the value from the input element with the id `searchInput`.

{{< highlight javascript "hl_lines=6 7 8" >}}
function onSearch() {
  doSearch(getValueFromElementById('searchInput'))
    .then(appendList);
};

function getValueFromElementById(id) {
  return document.getElementById(id).value;
};
{{< /highlight >}}

If you type something in the rendered HTML input field in your browser, it should be picked up once you click the button. Now this value should be used in the `doSearch()` function which you will implement in the second part. The function returns a {{% a_blank "Promise" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" %}} and thus the `then()` method can be used to append the result (list) in the third step.

{{< highlight javascript "hl_lines=1 3 4 5 6 7 8 9 10 11" >}}
var BASE_URL = 'https://hn.algolia.com/api/v1/';

function doSearch(query) {
  var url = BASE_URL + 'search?query=' + query + '&hitsPerPage=200';
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      return result.hits;
    });
}

function onSearch() {
  doSearch(getValueFromElementById('searchInput'))
    .then(appendList);
};
{{< /highlight >}}

The function uses the {{% a_blank "native fetch API" "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" %}} which returns a promise. For the sake of simplification, I kept out the error handling in this scenario which could be implemented in a `catch()` block. The request is made to the Hacker News API and the value from the input field is inserted by using string concatenation. Afterward, the response is transformed and only the `hits` (list) are returned from the result. The third step is to append the list to the DOM.

{{< highlight javascript "hl_lines=6 7 8 9 10 11 12" >}}
function onSearch() {
  doSearch(getValueFromElementById('searchInput'))
    .then(appendList);
};

function appendList(list) {
  var listNode = document.createElement('div');
  listNode.setAttribute('id', 'list');
  document.getElementById('app').appendChild(listNode);

  // append items to list
};
{{< /highlight >}}

First, you create a new HTML element and second you give the element an id attribute to check. This id can be used later on to check whether there is already a list in the DOM once a second request is made. Third, you append the new element to your DOM by using the HTML element with the id `app` which you can find in the *index.html* file. What's missing is appending the list of items.

{{< highlight javascript "hl_lines=11 12 13 14 15" >}}
function onSearch() {
  doSearch(getValueFromElementById('searchInput'))
    .then(appendList);
};

function appendList(list) {
  var listNode = document.createElement('div');
  listNode.setAttribute('id', 'list');
  document.getElementById('app').appendChild(listNode);

  list.forEach(function (item) {
    var itemNode = document.createElement('div');
    itemNode.appendChild(document.createTextNode(item.title));
    listNode.appendChild(itemNode);
  });
};
{{< /highlight >}}

For each item in the list, you create a new HTML element, append text to the element and append the element to the list HTML element. You can extract the function to make it concise again. Therefore you have to use a higher order function to pass the list element to the function.

{{< highlight javascript "hl_lines=11 14 15 16 17 18 19 20" >}}
function onSearch() {
  doSearch(getValueFromElementById('searchInput'))
    .then(appendList);
};

function appendList(list) {
  var listNode = document.createElement('div');
  listNode.setAttribute('id', 'list');
  document.getElementById('app').appendChild(listNode);

  list.forEach(appendItem(listNode));
};

function appendItem(listNode) {
  return function (item) {
    var itemNode = document.createElement('div');
    itemNode.appendChild(document.createTextNode(item.title));
    listNode.appendChild(itemNode);
  };
};
{{< /highlight >}}

That's it for the implementation of the three steps. First, retrieve the value from the input field, Second, perform an asynchronous request with the value to retrieve the list from a result from the Hacker News API. And third, append the list and item elements to your DOM.

Last but not least, there is one crucial part missing. You shouldn't forget to remove the list from the DOM before requesting a new list from the API and appending it to the DOM. Otherwise, the new result from the search request will just be appended to your previous result in the DOM.

{{< highlight javascript "hl_lines=2 8 9 10 11 12 13 14" >}}
function onSearch() {
  removeList();

  doSearch(getValueFromElementById('searchInput'))
    .then(appendList);
};

function removeList() {
  var listNode = document.getElementById('list');

  if (listNode) {
    listNode.parentNode.removeChild(listNode);
  }
}
{{< /highlight >}}

You can see that it was quite some work to solve the defined problem from the article. There needs to be someone in charge of the DOM. The DOM update happens in a very naive way here because it just removes a previous result if there is already one and appends the new result to the DOM. Everything works just fine to solve the defined problem, but the code gets complex once you add functionality or extend the features of the application.

If you haven't npm installed, install it first via {{% a_blank "node" "https://nodejs.org/en/" %}}. Finally, you can test your two files as application in your local browser by installing a HTTP server on the command line with npm.

{{< highlight javascript >}}
npm install http-server -g
{{< /highlight >}}

Afterwards, you can start the HTTP server from the command line in the directory where you have created your index.html and index.js files:

{{< highlight javascript >}}
http-server
{{< /highlight >}}

The output should give you a URL where you can find your application in the browser. Let's move over to React now.

{{% chapter_header "Solving the same problem in React" "why-react-matters" %}}

In this part of the article, you are going to solve the same problem with React. It should give you a way to compare both solutions and maybe convince you why a library such as React is a good tool to solve such problems.

The project will consist again of a *index.html* and *index.js* file. Our implementation starts again with the HTML boilerplate in the *index.html* file. It requires the two necessary React and ReactDOM libraries. The latter is used to hook React into the DOM. In addition, the *index.js* is included too.

{{< highlight html >}}
<!DOCTYPE html>
<html>
  <head>
    <title>React</title>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  </head>
  <body>
    <script src="index.js"></script>
  </body>
</html>
{{< /highlight >}}

Second, add Babel to transpile your JavaScript code to vanilla JavaScript. It's because the following code in your *index.js* file will use non vanilla JavaScript functionalities, such as {{% a_blank "JavaScript ES6 classes" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" %}}, and thus you have to add Babel to transpile it down to vanilla JavaScript to make it work in all browsers.

{{< highlight html "hl_lines=7 10" >}}
<!DOCTYPE html>
<html>
  <head>
    <title>React</title>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>
  </head>
  <body>
    <script type="text/babel" src="index.js"></script>
  </body>
</html>
{{< /highlight >}}

Third, you have to define an element with an id. That's the crucial bridge to React, because this element will be used to hook in your React code. There is no need to define further HTML elements in your *index.html* file, because everything else will be defined in your React code in the *index.js* file.

{{< highlight html "hl_lines=10" >}}
<!DOCTYPE html>
<html>
  <head>
    <title>React</title>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>
  </head>
  <body>
    <div id="app" />
    <script type="text/babel" src="index.js"></script>
  </body>
</html>
{{< /highlight >}}

Let's jump into the implementation in the *index.js* file. First, you can define the search request at the top of your file as you have done before in vanilla JavaScript.

{{< highlight javascript >}}
var BASE_URL = 'https://hn.algolia.com/api/v1/';

function doSearch(query) {
  var url = BASE_URL + 'search?query=' + query + '&hitsPerPage=200';
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      return result.hits;
    });
}
{{< /highlight >}}

Since you have included Babel in your *index.html* file, you can refactor the last piece of code to JavaScript ES6 by using {{% a_blank "arrow functions" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" %}} and {{% a_blank "template literals" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" %}}.

{{< highlight javascript >}}
const BASE_URL = 'https://hn.algolia.com/api/v1/';

function doSearch(query) {
  const url = `${BASE_URL}search?query=${query}&hitsPerPage=200`;
  return fetch(url)
    .then(response => response.json())
    .then(result => result.hits);
}
{{< /highlight >}}

In the next part, let's hook a React component in your HTML by using ReactDOM. The HTML element with the id `app` is used to render your first root component with the name App.

{{< highlight javascript >}}
class App extends React.Component {
  render() {
    return <h1>Hello React</h1>;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
{{< /highlight >}}

The App component uses React's JSX syntax to display HTML. In JSX you can use JavaScript as well. Let's extend the rendered output to solve the defined problem in this article.

{{< highlight javascript "hl_lines=4 5 6 7 8 9 10 11 12 13" >}}
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Search Hacker News with React</h1>
        <form type="submit" onSubmit={}>
          <input type="text" onChange={} />
          <button type="text">Search</button>
        </form>

        {/* show the list of items */}
      </div>
    );
  }
}
{{< /highlight >}}

The component renders a form with an input element and a button element. In addition, there is a placeholder to render the list from the search request in the end. The two handlers for the input element and the form submit are missing. In the next step, you can define the handlers in a declarative way in your component as class methods.

{{< highlight javascript "hl_lines=2 3 4 5 6 7 8 9 10 11 12 13 14 15 21 22" >}}
class App extends React.Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onChange(e) {

  }

  render() {
    return (
      <div>
        <h1>Search Hacker News with React</h1>
        <form type="submit" onSubmit={this.onSubmit}>
          <input type="text" onChange={this.onChange} />
          <button type="text">Search</button>
        </form>

        {/* show the list of items */}
      </div>
    );
  }
}
{{< /highlight >}}

The last code shows the declarative power of React. You can implement what every handler in your HTML is doing based on well defined class methods. These can be used as callbacks for your handlers.

Each handler has access to React's {{% a_blank "synthetic event" "https://reactjs.org/docs/events.html" %}}. For instance, it can be used to retrieve the value from the input element in the `onChange()` handler when someone types into the field. You will do this in the next step.

Note that the event is already used in the 'onSubmit()' class method to prevent the native browser behavior. Normally the browser would refresh the page after a submit event. But in React you don't want to refresh the page, you just want to let React deal with it.

Let's enter state handling in React. Your component has to manage state: the value in the input field and the list of items which is retrieved from the API eventually. It needs to know about those state in order to retrieve the value from the input field for the search request and in order to render the list eventually. Thus, you can define an initial state for the component in its constructor.

{{< highlight javascript "hl_lines=5 6 7 8" >}}
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      input: '',
      list: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  ...
}
{{< /highlight >}}

Now, you can update the state for the value of the input field by using React's local state management. In a React component, you have access to the `setState()` class method to update the local state. It uses a shallow merge and thus you don't need to worry about the list state when you update the input state.

{{< highlight javascript "hl_lines=17" >}}
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      input: '',
      list: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  ...

  onChange(e) {
    this.setState({ input: e.target.value });
  }

  ...
}
{{< /highlight >}}

By using `this.state` in your component you can access the state from the component again. You should provide the updated input state to your input element. This way, you take over controlling the state of the element and not the element doesn't do it itself. It becomes a so called {{% a_blank "controlled component" "https://reactjs.org/docs/uncontrolled-components.html" %}} which is a best practice in React.

{{< highlight javascript "hl_lines=25" >}}
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      input: '',
      list: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  ...

  onChange(e) {
    this.setState({ input: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>Search Hacker News with React</h1>
        <form type="submit" onSubmit={this.onSubmit}>
          <input type="text" onChange={this.onChange} value={this.state.input} />
          <button type="text">Search</button>
        </form>

        {/* show the list of items */}
      </div>
    );
  }
}
{{< /highlight >}}

Once the local state of a component updates in React, the `render()` method of the component runs again. Thus you have always the correct state available when rendering your elements. If you change the state again, for instance by typing something in the input field, the `render()` method will run for you again. You don't have to worry about creating or removing DOM elements when something changes.

In the next step, you will call the defined `doSearch()` function to make the request to the Hacker News API. It should happen in the `onSubmit()` class method. Once a request resolved successfully, you can set the new state for the list property.

{{< highlight javascript "hl_lines=17 18" >}}
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      input: '',
      list: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    doSearch(this.state.input)
      .then((hits) => this.setState({ list: hits }));
  }

  ...

  render() {
    return (
      <div>
        <h1>Search Hacker News with React</h1>
        <form type="submit" onSubmit={this.onSubmit}>
          <input type="text" onChange={this.onChange} value={this.state.input} />
          <button type="text">Search</button>
        </form>

        {/* show the list of items */}
      </div>
    );
  }
}
{{< /highlight >}}

The state gets updated once the request fulfils successfully. Once the state is updated, the `render()` method runs again and you can use the list in your state to render your elements by using JavaScript's built-in map functionality.

{{% read_more "How to fetch data in React" "https://www.robinwieruch.de/react-fetching-data/" %}}

That's the power of JSX in React, because you can use vanilla JavaScript to render multiple elements.

{{< highlight javascript "hl_lines=32" >}}
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      input: '',
      list: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    doSearch(this.state.input)
      .then((hits) => this.setState({ list: hits }));
  }

  ...

  render() {
    return (
      <div>
        <h1>Search Hacker News with React</h1>
        <form type="submit" onSubmit={this.onSubmit}>
          <input type="text" onChange={this.onChange} value={this.state.input} />
          <button type="text">Search</button>
        </form>

        {this.state.list.map(item => <div key={item.objectID}>{item.title}</div>)}
      </div>
    );
  }
}
{{< /highlight >}}

That's it. Both class methods update the state in synchronous or asynchronous way. After the state updated eventually, the `render()` method runs again and displays all the HTML elements by using the current state. There is no need for you to remove or append DOM elements in an imperative way. You can declaratively say what you want to display with your component.

You can try out the application the same way as the vanilla JavaScript application. On the command line navigate into your folder and use the http-server to serve the application in the browser.

Overall both scenarios, using vanilla JavaScript and React, should have shown you a great comparison for imperative vs. declarative code. In imperative programming you describe with your code *how to do something*. That's what you have done in the vanilla JavaScript scenario. In contrast, in declarative programming you describe with your code *what you want to do*. That's the power of React and of using a library over vanilla JavaScript.

The implementation of both examples is quite small and should show you that the problem can be solved by either vanilla JavaScript or React. Both solutions are just fine. I would argue that the vanilla JavaScript solution is even better for this problem. However, once you scale your application, it becomes more complex in vanilla JavaScript to manage DOM and the state. There comes a point where you end up with spaghetti code like it happened for lots of jQuery applications in the past. In React, you keep your code declarative and can describe a whole HTML hierarchy with components These components manage their own state, can be reused and composed into each other. You can describe a whole component tree with them. React keeps your application readable, maintainable and scalable.

{{< highlight javascript "hl_lines=12 13 14 20 21" >}}
class App extends React.Component {
  ...

  render() {
    return (
      <div>
        <h1>Search Hacker News with React</h1>
        <form type="submit" onSubmit={this.onSubmit}>
          <input type="text" onChange={this.onChange} value={this.state.input} />
          <button type="text">Search</button>
        </form>
        {this.state.list.map(item =>
          <Item key={item.objectID} item={item} />
        )}
      </div>
    );
  }
}

const Item = ({ item }) =>
  <div>{item.title}</div>
{{< /highlight >}}

The last code snippet shows how you can extract another component from the App component. This way, you can scale your component hierarchy and maintain business logic in related components. It would be way more difficult in vanilla JavaScript to maintain such code.

<hr class="section-divider">

You can find the code for all the solutions in {{% a_blank "this GitHub repository" "https://github.com/rwieruch/why-frameworks-matter" %}}. There is also a solution for JavaScript ES6 which can be used in between of vanilla JavaScript and React. It would be great to find more contributors for implementing examples for other solutions such as Angular or Ember. If you can solve the same problem in a similar way with one solution which is not in the repository yet, feel free to contribute to it :)

If you enjoyed this journey from vanilla JavaScript to React and you decided to learn React, checkout [The Road to learn React](https://www.robinwieruch.de/the-road-to-learn-react/) as your next journey to learn React. Along the way, you will transition smoothly from vanilla JavaScript to JavaScript ES6 and beyond.

In the end, always remember that there are people working behind the curtains to enable these solutions for you. In the case of React, you can find the repository on GitHub. You can do the contributors a huge favor by cheering them up on Twitter once in a while by leaving a nice message for them. Another great way of helping them out is to get involved in open source by solving issues on GitHub. After all, nobody wants to build larger applications in vanilla JavaScript anymore. So cherish your library or framework and be grateful for the work open source people are doing every day.