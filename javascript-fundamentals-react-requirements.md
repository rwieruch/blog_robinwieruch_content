+++
title = "JavaScript fundamentals before learning React"
description = "All the fundamentals in JavaScript for React applications. Often React beginners realize that most of the learnings are JavaScript, because React has only a small API ..."
date = "2018-07-18T13:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react javascript", "javascript fundamentals react", "react js requirements", "learn react"]
news_keywords = ["react javascript", "javascript fundamentals react", "react js requirements", "learn react"]
hashtag = "#ReactJs"
card = "img/posts/javascript-fundamentals-react-requirements/banner_640.jpg"
banner = "img/posts/javascript-fundamentals-react-requirements/banner.jpg"
contribute = "javascript-fundamentals-react-requirements.md"
headline = "JavaScript fundamentals before learning React"

summary = "After all my teachings about React, be it online for a larger audience or on-site for companies transitioning to web development and React, I always come to the conclusion that React is all about JavaScript. Newcomers to React but also myself see it as an advantage, because you carry your JavaScript knowledge for a longer time than your React skills."
+++

{{% sponsorship %}}

{{% pin_it_image "react js requirements" "img/posts/javascript-fundamentals-react-requirements/banner.jpg" "is-src-set" %}}

After all my teachings about React, be it online for a larger audience or on-site for companies transitioning to web development and React, I always come to the conclusion that React is all about JavaScript. Newcomers to React but also myself see it as an {{% a_blank "advantage" "https://www.quora.com/Why-choose-React/answer/Robin-Wieruch" %}}, because you carry your JavaScript knowledge for a longer time around compared to your React skills.

During my workshops a greater part of the material is about JavaScript and not React. Most of it boils down to JavaScript ES6 and beyond features and syntax, but also ternary operators, shorthand versions in the language, the `this` object, JavaScript built-in functions ([map](https://www.robinwieruch.de/javascript-map-array/), reduce, filter) or more general concepts such as [composability](https://www.robinwieruch.de/react-component-composition/), reusability, immutability or higher-order functions. These are the fundamentals, which you don't need necessarily to master before starting with React, but which will definitely come up while learning or practicing it.

The following walkthrough is my attempt giving you an almost extensive yet concise list about all the different JavaScript functionalities to complement your React application. If you have any other things which are not in the list, just leave a comment for this article and I will keep it up to date.

{{% chapter_header "Table of Contents" "toc" %}}

* [Entering React after learning JavaScript](#react-javascript)
* [React and JavaScript Classes](#react-javascript-classes)
* [Arrow Functions in React](#react-arrow-functions)
* [Functions as Components in React](#react-javascript-functional-components)
* [React Class Component Syntax](#react-class-component-syntax)
* [Map, Reduce and Filter in React](#react-javascript-map-reduce-filter)
* [var, let, and const in React](#react-javascript-variables)
* [Ternary Operator in React](#react-ternary-operator)
* [Import and Export Statements in React](#react-import-export-statements)
* [Libraries in React](#react-libraries)
* [Higher-Order Functions in React](#react-higher-order-functions)
* [Destructuring and Spread Operators in React](#react-destructuring-spread-operator)
* [There is more JavaScript than React](#react-javascript-learn)

{{% package_box "The Road to learn React" "Build a Hacker News App along the way. No setup configuration. No tooling. No Redux. Plain React in 200+ pages of learning material. Pay what you want like <strong>50.000+ readers</strong>." "Get the Book" "img/page/cover.png" "https://roadtoreact.com/" %}}

{{% chapter_header "Entering React after learning JavaScript" "react-javascript" %}}

When you enter the world of React, the usual suspect is {{% a_blank "create-react-app" "https://github.com/facebook/create-react-app" %}} for starting a React project. After you have set up your project, you are confronted with the following **React class component**:

{{< highlight javascript >}}
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

Arguably, a React class component may not be the best starting point. There are lots of things to digest for beginners which are not necessarily React: class statements, class methods and inheritance. Also the import statements are only adding complexity when learning React. Even though the main focus point should be JSX (React's syntax) in the very beginning, often all the things around demand explanations as well. This article is supposed to shed some light into all the things around, most of it JavaScript, without worrying too much about React.

{{% chapter_header "React and JavaScript Classes" "react-javascript-classes" %}}

Being confronted with a React class component in the beginning, requires the prior knowledge about JavaScript classes. One would assume that this is given knowledge, but it isn't, because JavaScript classes are fairly new in the language. Previously, there was only {{% a_blank "JavaScript's prototype chain" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain" %}} which could be used for inheritance too. JavaScript classes build up on top of the prototypical inheritance giving the whole thing a simpler representation.

One way to define a React component is using a JavaScript class. In order to understand JavaScript classes, you can take some time learning about them without React.

{{< highlight javascript >}}
class Developer {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  getName() {
    return this.firstname + ' ' + this.lastname;
  }
}

var me = new Developer('Robin', 'Wieruch');

console.log(me.getName());
{{< /highlight >}}

A class describes an **entity** which is used as a blueprint to create an **instance** of this entity. Once an instance of the class gets created with the `new` statement, the constructor of the class is called which instantiates the instance of the class. Therefore, a class can have properties which are usually located in its constructor. In addition, class methods (e.g. `getName()`) are used to read (or write) data of the instance. The instance of the class is represented as the `this` object within the class, but outside the instance is just assigned to a JavaScript variable.

Usually classes are used for inheritance in object-oriented programming. They are used for the same in JavaScript whereas the `extends` statement can be used to inherit with one class from another class. The more specialized class inherits all the abilities from the more general class with the `extends` statement, and can add its specialized abilities to it.

{{< highlight javascript "hl_lines=12 13 14 15 16 18 21" >}}
class Developer {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  getName() {
    return this.firstname + ' ' + this.lastname;
  }
}

class ReactDeveloper extends Developer {
  getJob() {
    return 'React Developer';
  }
}

var me = new ReactDeveloper('Robin', 'Wieruch');

console.log(me.getName());
console.log(me.getJob());
{{< /highlight >}}

Basically that's all it needs to fully understand React class components. A JavaScript class is used for defining a React component, but as you can see, the React component is only a React component because it inherits all the abilities from the React Component class which is imported from the React package:

{{< highlight javascript >}}
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to React</h1>
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

That's why the `render()` method is mandatory in React class components: The React Component from the imported React package instructs you to use it for displaying something in the browser. Furthermore, without extending from the React Component, you wouldn't be able to use other {{% a_blank "lifecycle methods" "https://reactjs.org/docs/react-component.html" %}} (including the `render()` method). For instance, there wouldn't be a `componentDidMount()` lifecycle method, because the component would be an instance of a vanilla JavaScript class. And not only the lifecycle methods would go away, React's API methods such as `this.setState()` for local state management wouldn't be available as well.

However, as you have seen, using a JavaScript class is beneficial for extending the general class with your specialized behavior. Thus you can introduce your own class methods or properties.

{{< highlight javascript "hl_lines=4 5 6 11" >}}
import React, { Component } from 'react';

class App extends Component {
  getGreeting() {
    return 'Welcome to React';
  }

  render() {
    return (
      <div>
        <h1>{this.getGreeting()}</h1>
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

Now you know why React uses JavaScript classes for defining React class components. They are used when you need access to React's API (lifecycle methods, `this.state` and `this.setState()`). In the following, you will see how React components can be defined in a different way without using a JavaScript class.

After all, JavaScript classes welcome one using inheritance in React, which isn't a desired outcome for React, {{% a_blank "because React favors composition over inheritance" "https://reactjs.org/docs/composition-vs-inheritance.html" %}}. So the only class you should extend from your React components should be the official React Component.

{{% chapter_header "Arrow Functions in React" "react-arrow-functions" %}}

When teaching someone about React, I explain {{% a_blank "JavaScript arrow functions" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" %}} pretty early. They are one of JavaScript's language additions in ES6 which pushed JavaScript forward in functional programming.

{{< highlight javascript >}}
// JavaScript ES5 function
function getGreeting() {
  return 'Welcome to JavaScript';
}

// JavaScript ES6 arrow function with body
const getGreeting = () => {
  return 'Welcome to JavaScript';
}

// JavaScript ES6 arrow function without body and implicit return
const getGreeting = () =>
  'Welcome to JavaScript';
{{< /highlight >}}

JavaScript arrow functions are often used in React applications for keeping the code concise and readable. I love them, teach them early, but always try to refactor my functions from JavaScript ES5 to ES6 functions along the way. At some point, when the differences between JavaScript ES5 functions and JavaScript ES6 functions are clear, I stick to the JavaScript ES6 way of doing it with arrow functions. However, I always see that too many different syntaxes can be overwhelming for React beginners. So I try to make the different characteristics of JavaScript functions clear before going all-in using them in React. In the following sections, you will see how JavaScript arrow functions are commonly used in React.

{{% chapter_header "Functions as Components in React" "react-javascript-functional-components" %}}

React uses the best of different programming paradigms. That's only possible because JavaScript is a many-sided programming language. On the object-oriented programming side, React's class components are a great way of leveraging the abilities of JavaScript classes (inheritance for the React component API, class methods and class properties such as `this.state`). On the other side, there are lots of concepts from functional programming used in React (and its ecosystem) too. For instance, **React's function components** are [another way of defining components in React](https://www.robinwieruch.de/react-component-types/). The question which led to [function components in React](https://www.robinwieruch.de/react-function-component/): What if components could be used like functions?

{{< highlight javascript >}}
function (props) {
  return view;
}
{{< /highlight >}}

It's a function which receives an input (e.g. [props](https://www.robinwieruch.de/react-pass-props-to-component/)) and returns the displayed HTML elements (view). Under the hood, the function only needs to use the rendering mechanism of the `render()` method from React components:

{{< highlight javascript >}}
function Greeting(props) {
  return <h1>{props.greeting}</h1>;
}
{{< /highlight >}}

Function components are the preferred way of defining components in React. They have less boilerplate, add less complexity, and are simpler to maintain than React class components. You can easily [migrate your class components to function components](https://www.robinwieruch.de/react-hooks-migration/) with [React Hooks](https://www.robinwieruch.de/react-hooks/). Previously, the article mentioned JavaScript arrow functions and how they improve your React code. Let's apply these kind of functions to your function components. The previous Greeting component has two different looks with JavaScript ES5 and ES6:

{{< highlight javascript >}}
// JavaScript ES5 function
function Greeting(props) {
  return <h1>{props.greeting}</h1>;
}

// JavaScript ES6 arrow function
const Greeting = (props) => {
  return <h1>{props.greeting}</h1>;
}

// JavaScript ES6 arrow function without body and implicit return
const Greeting = (props) =>
  <h1>{props.greeting}</h1>
{{< /highlight >}}

JavaScript arrow functions are a great way of keeping your function components in React concise. Even more when there is no computation in between and thus the function body and return statement can be left out.

{{% chapter_header "React Class Component Syntax" "react-class-component-syntax" %}}

React's way of defining components evolved over time. In its early stages, the `React.createClass()` method was the default way of creating a React class component. Nowadays, it isn't used anymore, because with the rise of JavaScript ES6, the previously used React class component syntax became the default.

However, JavaScript is evolving constantly and thus JavaScript enthusiast pick up new ways of doing things all the time. That's why you will find often different syntaxes for React class components. One way of defining a React class component, with state and class methods, is the following:

{{< highlight javascript >}}
class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
    };

    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  onIncrement() {
    this.setState(state => ({ counter: state.counter + 1 }));
  }

  onDecrement() {
    this.setState(state => ({ counter: state.counter - 1 }));
  }

  render() {
    return (
      <div>
        <p>{this.state.counter}</p>

        <button onClick={this.onIncrement} type="button">Increment</button>
        <button onClick={this.onDecrement} type="button">Decrement</button>
      </div>
    );
  }
}
{{< /highlight >}}

However, when implementing lots of React class components, the {{% a_blank "binding of class methods" "https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56" %}} in the constructor and having a constructor in the first place becomes a tedious implementation detail. Fortunately, there is a shorthand syntax for getting rid of both annoyances:

{{< highlight javascript "hl_lines=2 3 4 6 10" >}}
class Counter extends Component {
  state = {
    counter: 0,
  };

  onIncrement = () => {
    this.setState(state => ({ counter: state.counter + 1 }));
  }

  onDecrement = () => {
    this.setState(state => ({ counter: state.counter - 1 }));
  }

  render() {
    return (
      <div>
        <p>{this.state.counter}</p>

        <button onClick={this.onIncrement} type="button">Increment</button>
        <button onClick={this.onDecrement} type="button">Decrement</button>
      </div>
    );
  }
}
{{< /highlight >}}

By using JavaScript arrow functions, you can auto-bind class methods without having to bind them in the constructor. Also the constructor can be left out, when not using the props, by defining the state directly as a class property. (Note: Be aware that {{% a_blank "class properties" "https://babeljs.io/docs/en/babel-plugin-transform-class-properties/" %}} are not in the JavaScript language yet.) Therefore you can say that this way of defining a React class component is way more concise than the other version.

{{% chapter_header "Template Literals in React" "react-javascript-template-literals" %}}

{{% a_blank "Template literals" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" %}} are another JavaScript language specific feature that came with JavaScript ES6. It is worth to mention it shortly, because when people new to JavaScript and React see them, they can be confusing as well. What you are growing up with is the following syntax for concatenating a string:

{{< highlight javascript >}}
function getGreeting(what) {
  return 'Welcome to ' + what;
}

const greeting = getGreeting('JavaScript');
console.log(greeting);
// Welcome to JavaScript
{{< /highlight >}}

Template literals can be used for the same which is called string interpolation:

{{< highlight javascript "hl_lines=2" >}}
function getGreeting(what) {
  return `Welcome to ${what}`;
}
{{< /highlight >}}

You only have to use backticks and the `${}` notation for inserting JavaScript primitives. However, string literals are not only used for string interpolation, but also for multiline strings in JavaScript:

{{< highlight javascript >}}
function getGreeting(what) {
  return `
    Welcome
    to
    ${what}
  `;
}
{{< /highlight >}}

Basically that's how larger text blocks can be formatted on multiple lines. For instance, it can be seen with the [recent introduction of GraphQL in JavaScript](https://www.robinwieruch.de/react-with-graphql-tutorial/), because GraphQL queries are composed with template literals.

{{% chapter_header "Map, Reduce and Filter in React" "react-javascript-map-reduce-filter" %}}

What's the best approach teaching the JSX syntax for React beginners? Usually I start out with defining a variable in the `render()` method and using it as JavaScript in HTML in the return block.

{{< highlight javascript "hl_lines=5 8" >}}
import React, { Component } from 'react';

class App extends Component {
  render() {
    var greeting = 'Welcome to React';
    return (
      <div>
        <h1>{greeting}</h1>
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

You only have to use the curly braces to get your JavaScript in HTML. Going from rendering a string to a complex object isn't any different.

{{< highlight javascript "hl_lines=5 8" >}}
import React, { Component } from 'react';

class App extends Component {
  render() {
    var user = { name: 'Robin' };
    return (
      <div>
        <h1>{user.name}</h1>
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

Usually the next question then is: [How to render a list of items?](https://www.robinwieruch.de/react-list-component) That's one of the best parts about explaining React in my opinion. There is no React specific API such as a custom attribute on a HTML tag which enables you to render multiple items in React. You can use plain JavaScript for iterating over the list of items and returning HTML for each item.

{{< highlight javascript "hl_lines=5 6 7 8 12 13 14" >}}
import React, { Component } from 'react';

class App extends Component {
  render() {
    var users = [
      { name: 'Robin' },
      { name: 'Markus' },
    ];

    return (
      <ul>
        {users.map(function (user) {
          return <li>{user.name}</li>;
        })}
      </ul>
    );
  }
}

export default App;
{{< /highlight >}}

Having used the JavaScript arrow function before, you can get rid of the arrow function body and the return statement which leaves your rendered output way more concise.

{{< highlight javascript "hl_lines=5 6 7 8 12" >}}
import React, { Component } from 'react';

class App extends Component {
  render() {
    var users = [
      { name: 'Robin' },
      { name: 'Markus' },
    ];

    return (
      <ul>
        {users.map(user => <li>{user.name}</li>)}
      </ul>
    );
  }
}

export default App;
{{< /highlight >}}

Pretty soon, every React developer becomes used to the built-in JavaScript `map()` methods for arrays. It just makes so much sense to map over an array and return the rendered output for each item. The same can be applied for custom tailored cases where `filter()` or `reduce()` make more sense rather than rendering an output for each mapped item.

{{< highlight javascript "hl_lines=5 6 7 8 13" >}}
import React, { Component } from 'react';

class App extends Component {
  render() {
    var users = [
      { name: 'Robin', isDeveloper: true },
      { name: 'Markus', isDeveloper: false },
    ];

    return (
      <ul>
        {users
          .filter(user => user.isDeveloper)
          .map(user => <li>{user.name}</li>)
        }
      </ul>
    );
  }
}

export default App;
{{< /highlight >}}

In general, that's how React developers are getting used to these JavaScript built-in functions without having to use a React specific API for it. It is just JavaScript in HTML.

{{% chapter_header "var, let, and const in React" "react-javascript-variables" %}}

Also the different variable declarations with `var`, `let` and `const` can be confusing for beginners to React even though they are not React specific. Maybe it is because JavaScript ES6 was introduced when React became popular. In general, I try to introduce `let` and `const` very early in my workshops. It simply starts with exchanging var with const in a React component:

{{< highlight javascript "hl_lines=5" >}}
import React, { Component } from 'react';

class App extends Component {
  render() {
    const users = [
      { name: 'Robin' },
      { name: 'Markus' },
    ];

    return (
      <ul>
        {users.map(user => <li>{user.name}</li>)}
      </ul>
    );
  }
}

export default App;
{{< /highlight >}}

Then I give the rules of thumb when to use which variable declaration:

* (1) don't use `var`, because `let` and `const` are more specific
* (2) default to `const`, because it cannot be re-assigned or re-declared
* (3) use `let` when re-assigning the variable

While `let` is usually used in a for loop for incrementing the iterator, `const` is normally used for keeping JavaScript variables unchanged. Even though it is possible to change the inner properties of objects and arrays when using `const`, the variable declaration shows the intent of keeping the variable unchanged though.

{{% chapter_header "Ternary Operator in React" "react-ternary-operator" %}}

But it doesn't end with displaying JavaScript strings, objects, and arrays in React. What about an if-else statement for enabling conditional rendering? You cannot use an if-else statement directly in JSX, but you can return early from the rendering function. Returning null is valid in React when displaying nothing.

{{< highlight javascript "hl_lines=10 12 13 14" >}}
import React, { Component } from 'react';

class App extends Component {
  render() {
    const users = [
      { name: 'Robin' },
      { name: 'Markus' },
    ];

    const showUsers = false;

    if (!showUsers) {
      return null;
    }

    return (
      <ul>
        {users.map(user => <li>{user.name}</li>)}
      </ul>
    );
  }
}

export default App;
{{< /highlight >}}

However, if you want to use an if-else statement within the returned JSX, you can do it by using a {{% a_blank "JavaScripts ternary operator" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator" %}}:

{{< highlight javascript "hl_lines=15 16 17 18 19 20 21" >}}
import React, { Component } from 'react';

class App extends Component {
  render() {
    const users = [
      { name: 'Robin' },
      { name: 'Markus' },
    ];

    const showUsers = false;

    return (
      <div>
        {
          showUsers ? (
            <ul>
              {users.map(user => <li>{user.name}</li>)}
            </ul>
          ) : (
            null
          )
        }
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

Another way of doing it, if you only return one side of the conditional rendering anyway, is using the `&&` operator:

{{< highlight javascript "hl_lines=15 19" >}}
import React, { Component } from 'react';

class App extends Component {
  render() {
    const users = [
      { name: 'Robin' },
      { name: 'Markus' },
    ];

    const showUsers = false;

    return (
      <div>
        {
          showUsers && (
            <ul>
              {users.map(user => <li>{user.name}</li>)}
            </ul>
          )
        }
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

I will not go into detail why this works, but if you are curious, you can learn about it and other techniques for conditional rendering over here: [All the conditional renderings in React](https://www.robinwieruch.de/conditional-rendering-react/). After all, the conditional rendering in React only shows again that most of React is JavaScript and not anything React specific.

{{% chapter_header "Import and Export Statements in React" "react-import-export-statements" %}}

Fortunately, the JavaScript community settled on one way to import and export functionalities from files with JavaScript ES6 with {{% a_blank "import" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import" %}} and {{% a_blank "export" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export" %}} statements.

However, being new to React and JavaScript ES6, these import and export statements are just another topic which requires explanation when getting started with your first React application. Pretty early you will have your first imports for CSS, SVG or other JavaScript files. The create-react-app project already starts with those import statements:

{{< highlight javascript >}}
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

It's great for the starter project, because it offers you a well-rounded experience how other files can be imported and (exported). Also the App component gets imported in the *src/index.js* file. However, when doing your first steps in React, I try to avoid those imports in the beginning. Instead, I try to focus on JSX and React components. Only later the import and export statements are introduced when separating the first React component or JavaScript function in another file.

So how do these import and export statements work? Let's say in one file you want to export the following variables:

{{< highlight javascript >}}
const firstname = 'Robin';
const lastname = 'Wieruch';

export { firstname, lastname };
{{< /highlight >}}

Then you can import them in another file with a relative path to the first file:

{{< highlight javascript >}}
import { firstname, lastname } from './file1.js';

console.log(firstname);
// output: Robin
{{< /highlight >}}

So it's not necessarily about importing/exporting components or functions, it's about sharing everything that is assignable to a variable (leaving out CSS or SVG imports/exports, but speaking only about JS). You can also import all exported variables from another file as one object:

{{< highlight javascript >}}
import * as person from './file1.js';

console.log(person.firstname);
// output: Robin
{{< /highlight >}}

Imports can have an alias. It can happen that you import functionalities from multiple files that have the same named export. That's why you can use an alias:

{{< highlight javascript >}}
import { firstname as username } from './file1.js';

console.log(username);
// output: Robin
{{< /highlight >}}

All the previous cases are named imports and exports. But there exists the default statement too. It can be used for a few use cases:

* to export and import a single functionality
* to highlight the main functionality of the exported API of a module
* to have a fallback import functionality

{{< highlight javascript >}}
const robin = {
  firstname: 'Robin',
  lastname: 'Wieruch',
};

export default robin;
{{< /highlight >}}

You can leave out the curly braces for the import to import the default export:

{{< highlight javascript >}}
import developer from './file1.js';

console.log(developer);
// output: { firstname: 'Robin', lastname: 'Wieruch' }
{{< /highlight >}}

Furthermore, the import name can differ from the exported default name. You can also use it in conjunction with the named export and import statements:

{{< highlight javascript >}}
const firstname = 'Robin';
const lastname = 'Wieruch';

const person = {
  firstname,
  lastname,
};

export {
  firstname,
  lastname,
};

export default person;
{{< /highlight >}}

And import the default or the named exports in another file:

{{< highlight javascript >}}
import developer, { firstname, lastname } from './file1.js';

console.log(developer);
// output: { firstname: 'Robin', lastname: 'Wieruch' }
console.log(firstname, lastname);
// output: Robin Wieruch
{{< /highlight >}}

You can also spare additional lines and export the variables directly for named exports:

{{< highlight javascript >}}
export const firstname = 'Robin';
export const lastname = 'Wieruch';
{{< /highlight >}}

These are the main functionalities for ES6 modules. They help you to organize your code, to maintain your code and to design reusable module APIs. You can also export and import functionalities to test them.

{{% chapter_header "Libraries in React" "react-libraries" %}}

React is only the view layer for your application. There is some internal state management offered by React, but apart from this, it is only a component library which renders HTML for your browser. Everything else can be added from APIs (e.g. browser API, DOM API), JavaScript functionalities or external libraries. It's not always simple to choose the right library for complementing your React application, but [once you have a good overview of the different options](https://www.robinwieruch.de/essential-react-libraries-framework/), you can pick the one which fits best to your tech stack.

For instance, [fetching data in React](https://www.robinwieruch.de/react-fetching-data/) can be done with the native fetch API:

{{< highlight javascript >}}
import React, { Component } from 'react';

class App extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    fetch('https://api.mydomain.com')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render() {
    ...
  }
}

export default App;
{{< /highlight >}}

But it is up to you to use another library to fetch data in React. {{% a_blank "Axios" "https://github.com/axios/axios" %}} is one popular choice for React applications:

{{< highlight javascript "hl_lines=2 10" >}}
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    axios.get('https://api.mydomain.com')
      .then(data => this.setState({ data }));
  }

  render() {
    ...
  }
}

export default App;
{{< /highlight >}}

So once you know about your problem which need to be solved, [React's extensive and innovative ecosystem](https://www.robinwieruch.de/reasons-why-i-moved-from-angular-to-react/) should give you plenty of options solving it. There again it's not about React, but knowing about all the different JavaScript libraries which can be used to complement your application.

{{% chapter_header "Higher-Order Functions in React" "react-higher-order-functions" %}}

Higher-order functions are a great programming concept especially when moving towards functional programming. In React, it makes total sense to know about these kind of functions, because at some point you have to deal with higher-order components which can be explained best when knowing about higher-order functions in the first place.

Higher-order functions can be showcased in React early on without introducing higher-order components. For instance, let's say a rendered list of users can be filtered based on the value of an input field.

{{< highlight javascript "hl_lines=4 5 6 8 9 10 22 27 28 29 30" >}}
import React, { Component } from 'react';

class App extends Component {
  state = {
    query: '',
  };

  onChange = event => {
    this.setState({ query: event.target.value });
  }

  render() {
    const users = [
      { name: 'Robin' },
      { name: 'Markus' },
    ];

    return (
      <div>
        <ul>
          {users
            .filter(user => this.state.query === user.name)
            .map(user => <li>{user.name}</li>)
          }
        </ul>

        <input
          type="text"
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

It's not always desired to extract functions, because it can add unecessary complexity, but on the other side, it can have beneficial learning effects for JavaScript. In addition, [by extracting a function you make it testable in isolation from the React component](https://www.robinwieruch.de/react-testing-tutorial/). So let's showcase it with the function which is provided to the built-in filter function.

{{< highlight javascript "hl_lines=3 4 5 20" >}}
import React, { Component } from 'react';

function doFilter(user) {
  return query === user.name;
}

class App extends Component {
  ...

  render() {
    const users = [
      { name: 'Robin' },
      { name: 'Markus' },
    ];

    return (
      <div>
        <ul>
          {users
            .filter(doFilter)
            .map(user => <li>{user.name}</li>)
          }
        </ul>

        <input
          type="text"
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

The previous implementation doesn't work because the `doFilter()` function needs to know about the `query` property from the state. So you can pass it to the function by wrapping it with another function which leads to a higher-order function.

{{< highlight javascript "hl_lines=3 4 5 6 7 22" >}}
import React, { Component } from 'react';

function doFilter(query) {
  return function (user) {
    return query === user.name;
  }
}

class App extends Component {
  ...

  render() {
    const users = [
      { name: 'Robin' },
      { name: 'Markus' },
    ];

    return (
      <div>
        <ul>
          {users
            .filter(doFilter(this.state.query))
            .map(user => <li>{user.name}</li>)
          }
        </ul>

        <input
          type="text"
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

Basically a higher-order function is a function which returns a function. By using JavaScript ES6 arrow functions, you can make a higher-order function more concise. Furthermore, this shorthand version makes it more attractive composing functions into functions.

{{< highlight javascript >}}
const doFilter = query => user =>
  query === user.name;
{{< /highlight >}}

Now the `doFilter()` function can be exported from the file and tested in isolation as pure (higher-order) function. After learning about higher-order functions, all the fundamental knowledge is established to learn more about [React's higher-order components](https://www.robinwieruch.de/gentle-introduction-higher-order-components/).

Extracting these functions into (higher-order) functions outside of a React component can be beneficial for testing React's local state management in isolation as well.

{{< highlight javascript "hl_lines=1 2 4 5 13 17" >}}
export const doIncrement = state =>
  ({ counter: state.counter + 1 });

export const doDecrement = state =>
  ({ counter: state.counter - 1 });

class Counter extends Component {
  state = {
    counter: 0,
  };

  onIncrement = () => {
    this.setState(doIncrement);
  }

  onDecrement = () => {
    this.setState(doDecrement);
  }

  render() {
    return (
      <div>
        <p>{this.state.counter}</p>

        <button onClick={this.onIncrement} type="button">Increment</button>
        <button onClick={this.onDecrement} type="button">Decrement</button>
      </div>
    );
  }
}
{{< /highlight >}}

Moving functions around your code base is a great way to learn about the benefits of having functions as first class citizens in JavaScript. It's powerful when moving your code towards functional programming.

{{% chapter_header "Destructuring and Spread Operators in React" "react-destructuring-spread-operator" %}}

Another language feature introduced in JavaScript is called {{% a_blank "destructuring" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" %}}. It's often the case that you have to access plenty of properties from your state or props in your component. Rather than assigning them to a variable one by one, you can use destructuring assignment in JavaScript.

{{< highlight javascript >}}
// no destructuring
const users = this.state.users;
const counter = this.state.counter;

// destructuring
const { users, counter } = this.state;
{{< /highlight >}}

That's especially beneficial for functional stateless components, because they always receive the `props` object in their function signature. Often you will not use the props but its content, so you can destructure the content already in the function signature.

{{< highlight javascript >}}
// no destructuring
function Greeting(props) {
  return <h1>{props.greeting}</h1>;
}

// destructuring
function Greeting({ greeting }) {
  return <h1>{greeting}</h1>;
}
{{< /highlight >}}

The destructuring works for JavaScript arrays too. Another great feature is the **rest destructuring**. It is often used for splitting out a part of an object, but keeping the remaining properties in another object.

{{< highlight javascript >}}
// rest destructuring
const { users, ...rest } = this.state;
{{< /highlight >}}

Afterward, the users can be used to be rendered, for instance in a React component, whereas the remaining state is used somewhere else. That's where the {{% a_blank "JavaScript spread operator" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" %}} comes into play to forward the rest object to the next component. In the next section, you will see this operator in action.

{{% chapter_header "There is more JavaScript than React" "react-javascript-learn" %}}

In conclusion, there is lots of JavaScript which can be harnessed in React. Whereas React has only a slim API surface area, developers have to get used to all the functionalities JavaScript has to offer. The saying is not without any reason: *"being a React developer makes you a better JavaScript developer"*. Let's recap some of the learned aspects of JavaScript in React by refactoring a higher-order component.

{{< highlight javascript "hl_lines=4 10" >}}
function withLoading(Component) {
  return class WithLoading extends {
    render() {
      const { isLoading, ...props } = this.props;

      if (isLoading) {
        return <p>Loading</p>;
      }

      return <Component { ...props } />;
    }
  }
  };
}
{{< /highlight >}}

This higher-order component is only used for showing a conditional loading indicator when the `isLoading` prop is set to true. Otherwise it renders the input component. You can already see the (rest) destructuring and the spread operator in action. The latter can be seen for the rendered Component, because all the remaining properties from the `props` object are passed to the Component.

The first step for making the higher-order component more concise is refactoring the returned React class component to a functional stateless component:

{{< highlight javascript "hl_lines=2 8" >}}
function withLoading(Component) {
  return function ({ isLoading, ...props }) {
    if (isLoading) {
      return <p>Loading</p>;
    }

    return <Component { ...props } />;
  };
}
{{< /highlight >}}

You can see that the rest destructuring can be used in the function's signature too. Next, using JavaScript ES6 arrow functions makes the higher-order component more concise again:

{{< highlight javascript "hl_lines=1 7" >}}
const withLoading = Component => ({ isLoading, ...props }) => {
  if (isLoading) {
    return <p>Loading</p>;
  }

  return <Component { ...props } />;
}
{{< /highlight >}}

And adding the ternary operator shortens the function body into one line of code. Thus the function body can be left out and the return statement can be omitted.

{{< highlight javascript "hl_lines=2 3 4" >}}
const withLoading = Component => ({ isLoading, ...props }) =>
  isLoading
    ? <p>Loading</p>
    : <Component { ...props } />
{{< /highlight >}}

As you can see, the higher-order component uses various JavaScript and not React relevant techniques: arrow functions, higher-order functions, a ternary operator, destructuring and the spread operator. That's how JavaScript's functionalities can be used in React applications.

<hr class="section-divider">

Often people say that learning React has a steep learning curve. But it hasn't when only leaving React in the equation and leaving all the JavaScript out of it. React doesn't add any foreign abstraction layer on top as other web frameworks are doing it. Instead you have to use JavaScript. So hone your JavaScript skills and you will become a great React developer.
