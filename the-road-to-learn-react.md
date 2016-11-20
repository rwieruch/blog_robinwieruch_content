+++
title = "TODO"
description = "TODO"
date = "2016-11-19T13:50:46+02:00"
tags = ["learn", "react", "redux"]
keyword = "learn react redux"
news_keywords = ["learn react redux"]
contribute = "the-road-to-learn-react.md"
type = "promo"
+++

{{% header "The Road to learn React [Free eBook]" %}}

I love to teach, even though I am no expert. I learn every day and I have the fortune to have great mentors. After all not everyone has the opportunity to learn from mentors and peers. That's why I hope that it helps to give something back.

The following article includes the first chapters of an eBook to learn React. It highly depends on your feedback and contribution. I try my best to teach in the best way possible, but I can only improve with your help.

In the past I have written a [fairly big tutorial](www.robinwieruch.de/the-soundcloud-client-in-react-redux) about the implementation of a SoundCloud Client in React + Redux. I learned a lot during the process of writing. But even more by getting honest feedback. I realized it's a tutorial for intermediate/advanced developers. It explains a lot of tools (Webpack, Babel) because there was no Create React App at this time. Still it helped a lot of people to get started. I use every free minute to improve the material, but its time consuming.

Now I want to make it even better. Less tooling, more React. More references to the official documentation (because it's amazing). More concepts and in depth explanations. I want to give a clear road to learn the React ecosystem. The article covers the first chapters, but you can [subscribe for updates](http://eepurl.com/caLPjr) which keeps even more motivated.

You can have a direct impact on [GitHub](https://github.com/rwieruch/blog_robinwieruch_content/blob/master/the-road-to-learn-react.md). Additionally I am keen to hear your honest thoughts on [Twitter](https://twitter.com/rwieruch).

{{% chapter_header "What you can expect (so far...)" "expectNow" %}}

* real world Hacker News Client
* running application in React without Redux (so far...)
* learning JavaScript ES6 along the way
* explore the React API with setState and lifecycle methods
* consume a real world API to have real data
* implement interactions like client-sided sorting and server-sided searching
* enable caching with React setState
* make use of higher order components
* test your components with Jest and Enzyme
* exercises and reads along the way to reinforce the learnings

{{% chapter_header "What you could expect (in the future...)" "expectLater" %}}

* refactor your app to composeable components
* arrive at the point to experience how state management could help you
* introduce Redux to your app
* give your folder/files a structure
* use common patterns in React and Redux
* neat libraries along the way
* advanced components and interactions to build a powerful dashboard

{{% chapter_header "Requirements" "requirements" %}}

You should be familiar with HTML, CSS, JavaScript. Additionally you need a working [editor, terminal](http://www.robinwieruch.de/developer-setup/) and an installation of {{% a_blank "node and npm" "https://nodejs.org/en/" %}}.

These are my versions of node and npm at the time of writing:

{{< highlight javascript >}}
node --version
*v5.0.0
npm --version
*v3.3.6
{{< /highlight >}}

{{% chapter_header "Table of Contents" "toc" %}}

* [Create React App](#cra)
* [Introduction to JSX](#jsx)
* [ReactDOM.render](#reactDomRender)
* [Map in JSX](#mapJsx)
* [Component State](#componentState)
* [Component Interactions](#componentInteractions)
* [Composeable Components](#componentComposeable)
* [Component Declarations](#componentDeclarations)
* [Component Style](#componentStyle)

{{% chapter_header "Create React App" "cra" %}}

We will use {{% a_blank "Create React App" "https://github.com/facebookincubator/create-react-app" %}} to bootstrap our app. The setup comes without configuration. To get started you will have to install the package to your global packages.

{{< highlight javascript >}}
npm install -g create-react-app
{{< /highlight >}}

Now you can bootstrap your first app:

{{< highlight javascript >}}
create-react-app hackernews
cd hackernews
{{< /highlight >}}

You will find the following folder structure:

{{< highlight javascript >}}
hackernews/
  README.md
  node_modules/
  package.json
  .gitignore
  public/
    favicon.ico
    index.html
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
{{< /highlight >}}

In the beginning everything you need is located in the *src* folder. Additionally Create React App comes with the following npm scripts:

{{< highlight javascript >}}
// Runs the app in http://localhost:3000
npm start

// Runs the tests
npm test

// Builds the app for production
npm run build
{{< /highlight >}}

You can read more in {{% a_blank "detail about Create React App" "https://github.com/facebookincubator/create-react-app" %}}.

### Exercises:

* start your app and visit it in your browser
* run the interactive test script
* make yourself familiar with the folder structure

{{% chapter_header "Introduction to JSX" "jsx" %}}

Let's dive into the source code. We will start to explore React in only one file.

*src/App.js*

{{< highlight javascript >}}
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

Create React App already scaffolded a boilerplate application. In the file we have an App ES6 class component which renders content. Basically when you use the component `<App />` now, it will return the content you specified in the `render()` function.

> In the next chapter I will show you where the App component is used. Otherwise we wouldn't see it, would we?

The content looks pretty similar to HTML, but it's JSX. JSX allows you to mix HTML and JavaScript. It's powerful yet confusing in the beginning. A good point to start is to write and render basic HTML. Then you can start to sprinkle some JavaScript in between by using curly braces. You can already try it by defining a property and render it in JSX.

*src/App.js*

{{< highlight javascript "hl_lines=7 12" >}}
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const helloWorld = 'Welcome to React';
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{helloWorld}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

Additionally you might have noticed the `className` attribute. Because of technical reasons JSX had to replace HTML attributes like class (className) and for (htmlFor).

### ES6 Sugar:

In ES5 you declare variables with var. In ES6 there are two more: const and let. I already used const for the variable declaration. A const variable can't be reassigned.

### Exercises:

* define more variables to render them in your JSX
* read more about ES6 {{% a_blank "const" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const" %}} and {{% a_blank "let" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let" %}}

{{% chapter_header "ReactDOM.render" "reactDomRender" %}}

Before we return to the App component, here you can see where the component is used.

*src/index.js*

{{< highlight javascript >}}
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
{{< /highlight >}}

ReactDOM.render expects two arguments. The first argument is JSX. It already takes our App component, but you don't need to pass a component. It would be sufficient to use `<div>Hello React World</div>`. After all the first argument is the content to be rendered. The second argument specifies the place where the React application hooks into our root index.html. It expects an element with an id root. When you open the *public/index.html* you can find the id.

{{% chapter_header "Map in JSX" "mapJsx" %}}

Let's get back to our App component. We will start with a list of data. Later we will fetch the data from an external API. That's more exciting!

In JSX it's possible to map over your data to display each item.

*src/App.js*

{{< highlight javascript "hl_lines=4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 28 29 30 31 32 33 34 35 36 37" >}}
import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 0,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 0,
    points: 5,
    objectID: 1,
  },
];

class App extends Component {

  render() {
    return (
      <div className="App">
        { list.map(function(item) {
          return (
            <div>
              <span><a href={item.url}>{item.title}</a></span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

Additionally you have to assign a key property to each list element. Only that way React is able to identify added, changed and removed items. Give your elements a stable id!

{{< highlight javascript "hl_lines=3" >}}
  { list.map(function(item) {
    return (
      <div key={item.objectID}>
        <span><a href={item.url}>{item.title}</a></span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </div>
    );
  })}
{{< /highlight >}}

Now when you open your app both list items should be visible.

### ES6 Sugar:

Let's have a look again at the map function which takes a function itself. In ES6 you can write it more concise.

First you can use the arrow function:

{{< highlight javascript "hl_lines=1" >}}
  { list.map((item) => {
    return (
      <div key={item.objectID}>
        <span><a href={item.url}>{item.title}</a></span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </div>
    );
  })}
{{< /highlight >}}

Second we can remove the block body and thus remove the return statement. In a concise body an implicit return is attached.

{{< highlight javascript "hl_lines=1 8" >}}
  { list.map((item) =>
    <div key={item.objectID}>
      <span><a href={item.url}>{item.title}</a></span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </div>
  )}
{{< /highlight >}}

### Exercises:

* read more about {{% a_blank "ES6 arrow functions and their pitfalls" "https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions" %}}
* read more about {{% a_blank "React lists and keys" "https://facebook.github.io/react/docs/lists-and-keys.html" %}}
* use more JavaScript expression on your own in JSX (e.g. {{% a_blank "ternary" "https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator" %}})
* make yourself comfortable with {{% a_blank "standard built-in functionalities" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" %}} like map

{{% chapter_header "Component State" "componentState" %}}

Now we want to allow some more interactions in our component. Therefore we need to keep internal component state. Let's introduce a constructor where we can set the initial state.

{{< highlight javascript "hl_lines=3 4 5 6 7 8 9 10 15" >}}
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: list,
    };

  }

  render() {
    return (
      <div className="App">
        { this.state.list.map((item) =>
          <div key={item.objectID}>
            <span><a href={item.url}>{item.title}</a></span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </div>
        )}
      </div>
    );
  }
}
{{< /highlight >}}

In our case the initial state is our list data which we can retrieve in the render function afterwards. Notice that we have to call `super(props);` to call the constructor of the parent class. It's mandatory.

### ES6 Sugar:

You can use shorthand syntax for initializing properties. Instead of `list: list` you can do:

{{< highlight javascript "hl_lines=2" >}}
  this.state = {
    list
  };
{{< /highlight >}}

### Exercises:

* read more about {{% a_blank "the ES6 class constructor" "https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor" %}}

{{% chapter_header "Component Interactions" "componentInteractions" %}}

Let's implement a search field. The query in the search field should be used to filter our list.

{{< highlight javascript "hl_lines=8 11 14 15 16 19 22 23 24" >}}
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      query: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({ query: event.target.value });
  }

  render() {
    const query = this.state.query;
    return (
      <div className="App">
        <form>
          <input type="text" value={query} onChange={this.onSearchChange} />
        </form>
        { this.state.list.map((item) =>
          <div key={item.objectID}>
            <span><a href={item.url}>{item.title}</a></span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </div>
        )}
      </div>
    );
  }
}
{{< /highlight >}}

First we need an input field which has a value and an onChange callback. Second we need to define and bind the `onSearchChange` callback in the component. The callback sets a query in the internal component state. Third we extend the initial state with the search query. Once you type something in the input field, the callback gets the event with the input field value, which can be set in the internal component state.

In React applications we strictly follow an unidirectional data flow. The input field already updated the internal component state, but to finish the roundtrip we have to update the value of the input field with the internal state. That's why we retrieve the query from the internal state and set it as value in the input field.

But we are not using the query to filter the list yet. Let's do this:

{{< highlight javascript "hl_lines=1 2 3 4 5 31" >}}
function isSearched(query) {
  return function(item) {
    return !query || item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      query: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({ query: event.target.value });
  }

  render() {
    const query = this.state.query;
    return (
      <div className="App">
        <form>
          <input type="text" value={query} onChange={this.onSearchChange} />
        </form>
        { this.state.list.filter(isSearched(query)).map((item) =>
          <div key={item.objectID}>
            <span><a href={item.url}>{item.title}</a></span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </div>
        )}
      </div>
    );
  }
}
{{< /highlight >}}

We filter the list only when a query is set. When a query is set, we match the incoming query pattern with the item titles. Only when the pattern matches we return true. Don't forget to lower case everything!

### ES6 Sugar:

Now we can add some more ES6 syntax again. First we can destructure the internal component state.

{{< highlight javascript "hl_lines=2 8" >}}
  render() {
    const { query, list } = this.state;
    return (
      <div className="App">
        <form>
          <input type="text" value={query} onChange={this.onSearchChange} />
        </form>
        { list.filter(isSearched(query)).map((item) =>
          <div key={item.objectID}>
            <span><a href={item.url}>{item.title}</a></span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </div>
        )}
      </div>
    );
{{< /highlight >}}

Second we can make the function more concise in ES6.

From:

{{< highlight javascript >}}
function isSearched(query) {
  return function(item) {
    return !query || item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  }
}
{{< /highlight >}}

To:

{{< highlight javascript >}}
const isSearched = (query) => (item) => !query || item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
{{< /highlight >}}

One could argue which one is more readable. But I prefer the second one. The React ecosystem uses a lot of functional programming concepts. It happens quite often that you will use a function which returns a function. These are called higher order functions. In ES6 you can express that more readable with arrow functions.

### Exercises:

* read more about {{% a_blank "the React unidirectional data flow" "https://facebook.github.io/react/docs/state-and-lifecycle.html" %}}
* read more about {{% a_blank "React events" "https://facebook.github.io/react/docs/handling-events.html" %}}
* read more about {{% a_blank "ES6 destructuring" "https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" %}}
* read more about {{% a_blank "higher order functions" "https://en.wikipedia.org/wiki/Higher-order_function" %}}

{{% chapter_header "Composeable Components" "componentComposeable" %}}

So far we have one big App component. Let's start to split them up into smaller composeable components. We can define a component for the search input and a component for the list items.

{{< highlight javascript "hl_lines=9 10 16 17 18 19 20 21 22 23 24 25 26 27 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46" >}}
class App extends Component {

  ...

  render() {
    const { query, list } = this.state;
    return (
      <div className="App">
        <SearchField value={query} onChange={this.onSearchChange} />
        <Table list={list} pattern={query} />
      </div>
    );
  }
}

class SearchField extends Component {

  render() {
    const { value, onChange } = this.props;
    return (
      <form>
        <input type="text" value={value} onChange={onChange} />
      </form>
    );
  }

}

class Table extends Component {

  render() {
    const { list, pattern } = this.props;
    return (
      <div>
      { list.filter(isSearched(pattern)).map((item) =>
        <div key={item.objectID}>
          <span><a href={item.url}>{item.title}</a></span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
        </div>
      )}
      </div>
    );
  }
}
{{< /highlight >}}

Propterties (short: props) can be passed to components. The components themselve have every property accessible in the props object.

Still you can't compose components into each other. That's why there exists the children property. You can try the following to see the children property in action.


{{< highlight javascript "hl_lines=9 10 11 21 24" >}}
class App extends Component {

  ...

  render() {
    const { query, list } = this.state;
    return (
      <div className="App">
        <SearchField value={query} onChange={this.onSearchChange}>
          Search:
        </SearchField>
        <Table list={list} pattern={query} />
      </div>
    );
  }
}

class SearchField extends Component {

  render() {
    const { value, onChange, children } = this.props;
    return (
      <form>
        {children} <input type="text" value={value} onChange={onChange} />
      </form>
    );
  }

  ...

}
{{< /highlight >}}

The children proptery enables you to compose components into each other, because you can pass components as children.

### Exercises:

* read more about {{% a_blank "the composition model of React" "https://facebook.github.io/react/docs/composition-vs-inheritance.html" %}}

{{% chapter_header "Component Declarations" "componentDeclarations" %}}

Now we have three ES6 class components. But we can do better be using functional stateless components.

Functional stateless components are functions which get an input and return an output (functional). There are no side effects. They have no internal state (stateless). You cannot access the state with this.state. Additionally they have no lifecycle methods. Keep this in your mind, when we come across the first lifecycle methods of a component in the future.

> There is a third type of component declaration: React.createClass. It was used in older versions of React, but is declared a deprecated now. Sometimes you will still those kind of declaration in older tutorials.

A good rule of thumb is to use functional stateless components when you don't need internal component state nor component lifecycle methods. Usually you start to implement your components as functional stateless components. Once you need access to the state or lifecycle methods, you will refactor it to an ES6 clas component.

The App component uses internal state. That's why it has to stay as ES6 class component. But both of our new components are stateless without lifecycle methods. Let's refactor one together to a stateless functional component. The other component refactoring will remain as your exercise.

{{< highlight javascript >}}
function SearchField(props) {
  const { value, onChange, children } = props;
  return (
    <form>
      {children} <input type="text" value={value} onChange={onChange} />
    </form>
  );
}
{{< /highlight >}}

You already know and apply the props destructuring. The best practice is use it in the function signature already.

{{< highlight javascript "hl_lines=1" >}}
function SearchField({ value, onChange, children }) {
  return (
    <form>
      {children} <input type="text" value={value} onChange={onChange} />
    </form>
  );
}
{{< /highlight >}}

But we can do better. We know that arrow functions allow us to keep our functions concise.

{{< highlight javascript >}}
const SearchField = ({ value, onChange, children }) =>
  <form>
    {children} <input type="text" value={value} onChange={onChange} />
  </form>
{{< /highlight >}}

The last step is especially useful to enforce only to have props as input and an element output. Nothing in between. Still you can do something in between by using a block body.

{{< highlight javascript >}}
const SearchField = ({ value, onChange, children }) => {

  // do something

  return (
    <form>
      {children} <input type="text" value={value} onChange={onChange} />
    </form>
  );
}
{{< /highlight >}}

### Exercises:

* refactor the Table component to a stateless functional component
* read more about {{% a_blank "ES6 class components and functional stateless components" "https://facebook.github.io/react/docs/components-and-props.html" %}}

{{% chapter_header "Component Style" "componentStyle" %}}

Let's add some basic styling for our app and components. We will reuse the *src/App.css* and *src/index.css*.

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

ul, li {
  list-style: none;
  padding: 0;
  margin: 0;
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

.table {
  margin: 20px 0;
}

.table-header {
  display: flex;
  line-height: 24px;
  font-size: 16px;
  padding: 0 10px;
  justify-content: space-between;
  text-transform: uppercase;
}

.table-empty {
  margin: 200px;
  text-align: center;
  font-size: 16px;
}

.table-row {
  display: flex;
  line-height: 24px;
  white-space: nowrap;
  margin: 10px 0;
  padding: 10px;
  background: #ffffff;
  border: 1px solid #e3e3e3;
}

.table-header > span {
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 5px;
}

.table-row > span {
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 5px;
}

.button-inline {
  border-width: 0;
  background: transparent;
  color: inherit;
  text-align: inherit;
  -webkit-font-smoothing: inherit;
  padding: 0;
  font-size: inherit;
  cursor: pointer;
}

.button-active {
  border-radius: 0;
  border-bottom: 1px solid #38BB6C;
}
{{< /highlight >}}

Now we can use the style for our components.

{{< highlight javascript "hl_lines=8 9 13 15 26 28 33 35">}}
class App extends Component {

  ...

  render() {
    const { query, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <SearchField value={query} onChange={this.onSearchChange}>
            Search:
          </SearchField>
        </div>
        <Table list={list} pattern={query} />
      </div>
    );
  }
}

const SearchField = ({ value, onChange, children }) =>
  <form>
    {children} <input type="text" value={value} onChange={onChange} />
  </form>

const Table = ({ list, pattern }) =>
  <div className="table">
    { list.filter(isSearched(pattern)).map((item) =>
      <div key={item.objectID} className="table-row">
        <span><a href={item.url}>{item.title}</a></span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </div>
    )}
  </div>
{{< /highlight >}}

We can give the table some inline style to keep it flexible for now.

{{< highlight javascript "hl_lines=5 6 7 8 9 10 11 12 13 14 15 16">}}
const Table = ({ list, pattern }) =>
  <div className="table">
    { list.filter(isSearched(pattern)).map((item) =>
      <div key={item.objectID} className="table-row">
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>
          {item.author}
        </span>
        <span style={{ width: '15%' }}>
          {item.num_comments}
        </span>
        <span style={{ width: '15%' }}>
          {item.points}
        </span>
      </div>
    )}
  </div>
{{< /highlight >}}

In general I want to leave some more words about styling in React. You will find a lot of different opinions and solutions for this topic. I don't want to be opinionated here.

<br>

You have learned the basics about React! It makes sense to internalize your learnings and experiment a bit on your own. Additionally you could read more in depth about it in the official {{% a_blank "Quickstart documentation" "https://facebook.github.io/react/docs/installation.html" %}}. The next chapter touches component lifecycle methods and real world data from the Hacker News API.
