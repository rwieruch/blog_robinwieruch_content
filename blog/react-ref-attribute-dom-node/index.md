---
title: "When to use React's Ref on a DOM node in React"
description: "What about the ref attribute in React.js? This article gives you clarification around the ref attribute to access DOM nodes in React. It shows you how you can use it, when you should use it and where it can be used and where it shouldn't be used ..."
date: "2017-03-22T13:50:46+02:00"
categories: ["React"]
keywords: ["react ref"]
hashtags: ["#100DaysOfCode", "#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

**This tutorial is outdated. Please read over here everything you need to know about [React Ref](/react-ref).**

In the past there has been a lot of confusion around the `ref` attribute in React. The attribute makes it possible to reference a DOM node in order to access it and to interact with it. This article should give some clarification around the `ref` attribute in React. It shows you **how** you can use it, **when** you should use it and **where** it can be used.

On a side note: Don't mistake the `ref` attribute with the `this.refs` object. The latter was used in React in the past. There you would have used a string over a [callback function](/javascript-callback-function) to reference a DOM node. It was deprecated in favor of the `ref` attribute.

# How does React's Ref attribute work?

An input element is the perfect example to showcase the `ref` attribute. When you learn React, you often wonder how you can get the value in an input element. The following example shows how you can access it:

```javascript{10,24}
class SearchForm extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        const value = this.input.value;

        // do something with the search value
        // e.g. propagate it up to the parent component
        // (not relevant to show the use case of the ref attribute)
        this.props.onSearch(value);

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    ref={node => this.input = node}
                    type="text"
                />
                <button type="submit">
                    Search
                </button>
            </form>
        );
    }
}
```

The input element defines a `ref` attribute. The `ref` attribute definition always follows the same pattern: `ref={node => this.input = node}`. When the component renders the first time, you want to bind the DOM node to the `this` object of the component. Then you have access to the DOM node. In the code snippet above it is used to get the input value of the input element when you submit the form.

# When to use React's Ref attribute?

But it is not always a good idea to use the `ref` attribute. The general rule of thumb is to avoid it. The [official React documentation](https://facebook.github.io/react/docs/refs-and-the-dom.html) mentions three occasions where you can use it because you have no other choice.

* *Managing focus, text selection, or media playback.*
* *Integrating with third-party DOM libraries.*
* *Triggering imperative animations.*

First, you can use the `ref` attribute to access the DOM API ([What's an API?](/what-is-an-api-javascript/)). You can get a value of an input element yet you can also trigger methods like a `focus()`. It gives you control over the DOM API, for instance to use the media elements.

Second, you can use it to integrate with third-party libraries that rely on the DOM. [D3.js](https://d3js.org/) is such an use case, because it has to hook into the DOM and it has its own DOM manipulation API. For instance, you might want to integrate a D3 component in your React component hierarchy. Therefore you can use a `ref` attribute as an entry point for the D3 component. You leave the React world and access the D3 world.

Last but not least, you can trigger animations imperatively on your elements.

These are the only occasions where you should use the `ref` attribute in your React DOM.

Let's revisit the input element and the value retrieval. It could be solved differently, couldn't it? By using the state in React to store the input value instead of using the element instance, you can cut down the `ref` attribute.

```javascript{6,12,23}
class SearchForm extends Component {

    constructor(props) {
        super(props);

        this.state = { value: '' };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        const value = this.state.value;

        this.props.onSearch(value);

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    onChange={event => this.setState({ value: event.target.value })}
                    type="text"
                />
                <button type="submit">
                    Search
                </button>
            </form>
        );
    }
}
```

Now you would use the internal component state instead of the `ref` attribute. In addition, you have a single source of truth for the input value in your component state and can use it to close the loop of the unidirectional data flow in React.

```javascript{11}
class SearchForm extends Component {

    ...

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    onChange={event => this.setState({ value: event.target.value })}
                    type="text"
                    value={this.state.value}
                />
                <button type="submit">
                    Search
                </button>
            </form>
        );
    }
}
```

Especially in forms, with multiple input elements, it can make sense to exchange the `ref` attribute with the state solution. It follows the best practice of having an unidirectional data flow and [controlled components](/react-controlled-components/) in your application. You don't want to reference the elements in order to get their values. You want to keep the state at one place as single source of truth in your local state.

# What about functional stateless components?

Often functional stateless components are not mentioned regarding the `ref` attribute. Maybe it is because these components have no `this` object. They are stateless. Yet you can use the `ref` attribute with a variable.

```javascript{2,6,10}
function SearchForm({ onSearch }) {
    let input;
    return (
        <div>
            <input
                ref={node => input = node}
                type="text"
            />
            <button
                onClick={() => onSearch(input.value)}
                type="button"
            >
                Search
            </button>
        </div>
    );
}
```

Afterward, like in the example above, you can get the value of the input element and propagate it in the callback up to the parent component.

After all, often you have to refactor a functional stateless component to an ES6 class component, because you need the DOM node reference in a lifecycle method that is only available in a stateful component. For instance, consider you want to focus an input element when the component mounted.

```javascript{3,9}
class FocusedInput extends Component {
    componentDidMount() {
        this.input.focus();
    }

    render() {
        return (
            <input
                ref={node => this.input = node}
                type="text"
            />
        );
    }
}
```

Don't bother that the input component is useless in the example. It is only a focused input element. It doesn't handle any input value or `onChange()` event. But that's sufficient for the sake to showcase the `ref` attribute.

Still, you are able to see the difference compared to a stateless functional component where you don't have access to lifecycle methods. Hence you have to refactor components, depending on your use case, to ES6 class components to apply your desired behavior.

After all, you can use the `ref` attribute in ES6 class component and in functional stateless components in React.

<Divider />

I hope the article gave you some clarification on how, when and where to use the `ref` attribute to reference DOM nodes in React.
