+++
title = "8 things to learn in React before using Redux"
description = "Facts about React that should be known before using Redux (or MobX). Most important: Learn React first, then opt-in Redux..."
date = "2017-07-19T13:50:46+02:00"
tags = ["Redux"]
categories = ["Redux"]
keyword = "learn react redux"
news_keywords = ["learn react redux"]
hashtag = "#ReactJs"
banner = "img/posts/learn-react-before-using-redux/banner.jpg"
contribute = "learn-react-before-using-redux.md"
headline = "8 things to learn in React before using Redux"

summary = "State management is difficult. A view library, such as React, enables you to manage local component state. But it only scales to a certain point. React is just a view layer library. Eventually you decide to move on to a more sophisticated state management solution such as Redux. Yet there are certain things, that I want to point out in this article, that you should know about React before you jump on the Redux train."
+++

{{% pin_it_image "learn react redux" "img/posts/learn-react-before-using-redux/banner.jpg" "is-src-set" %}}

State management is difficult. A view library, such as React, enables you to manage local component state. But it only scales to a certain point. React is just a view layer library. Eventually you decide to move on to a more sophisticated state management solution such as Redux. Yet there are certain things, that I want to point out in this article, that you should know about React before you jump on the Redux train.

Often people learn React and Redux altogether. But it has drawbacks:

* people never run into the problems of scaling state management with local state (this.state) only
  * thus people don't understand the need of a state management library like Redux
  * thus people complain that it adds too much boilerplate
* people never learn to manage local state in React
  * thus people will manage (and clutter) **all** of their state in a state container provided by Redux
  * thus people never use the local state management

Because of these drawbacks, you will often get the advice to learn React first and opt-in Redux to your tech stack in a later point in time. But only opt-in Redux if you run into issues scaling your state management. These scaling issues only apply for larger applications. Often you will {{% a_blank "not need a state management library" "https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367" %}} such as Redux on top. The book [The Road to learn React](https://www.robinwieruch.de/the-road-to-learn-react/) demonstrates how an application can be build in plain React without external dependencies like Redux.

However, now you decided to jump on the Redux train. So here comes my list of what you should know about React before using Redux.

{{% chapter_header "Local State in React becomes Second Nature" "react-local-state" %}}

The already mentioned most important advice is to learn React first. Thus you cannot avoid to breathe life into your components by using local state with `this.setState()` and `this.state`. You should feel comfortable using it.

{{< highlight javascript >}}
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state({ counter: 0 });
  }

  render() {
    return (
      <div>
        Counter: {this.state.counter}

        <button
          type="button"
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
        />
      </div>
    );
  }
}
{{< /highlight >}}

A React component has an initial state defined in the constructor. Afterward, you can update it with its `this.setState()` method. The updating of the state object is a shallow merge. Thus you can update the local state object partially yet it will keep other properties in the state object intact. Once the state got updated, the component re-renders. In the previous case, it will display the updated value: `this.state.counter`. Basically that's one closed loop in React's unidirectional data flow.

{{% chapter_header "React's Functional Local State" "react-functional-state" %}}

The `this.setState()` method updates the local state asynchronously. Thus, you cannot rely on the timing when your state updates. It will update eventually. That's just fine for a lot of cases.

However, imagine you rely on the current local state when computing the next state of your component. Basically as the previously example did:

{{< highlight javascript >}}
this.setState({ counter: this.state.counter + 1 });
{{< /highlight >}}

The local state (this.state.counter) that is used for the computation is only a snapshot in time. Thus when you update your state with `this.setState()` but the local state changes before the asynchronous execution kicks in, you would operate with a stale state. That can be difficult to grasp the first time being confronted with it. That's why a code snippet says more than a thousand words:

{{< highlight javascript >}}
this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }
this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }
this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }

// updated state: { counter: 1 }
// instead of: { counter: 3 }
{{< /highlight >}}

As you can see, you cannot rely on the local state being the updated state when updating the state depending on it. It could lead to bugs. That's why there is a second way to update your React's local state.

The `this.setState()` function takes as alternative a function instead of an object. The function that it takes has the local state in its function signature at the time when `this.setState()` executes asynchronously. It is a callback that executes with the correct state at this point in time and thus can be relied upon.

{{< highlight javascript >}}
this.setState(previousState => ({ counter: previousState.counter + 1 }));
{{< /highlight >}}

That way, you can keep using `this.setState()` but with a function instead of an object when you rely on previous state.

In addition, it also applies when the update depends on props. These can become stale as well when the received props from the parent component have changed before the asynchronous execution kicks. Therefore, the function in `this.setState()` gets as second argument the props.

{{< highlight javascript >}}
this.setState((prevState, props) => ...);
{{< /highlight >}}

This way you can ensure to update your state depending on correct state and props.

{{< highlight javascript >}}
this.setState((prevState, props) => ({ counter: prevState.counter + props.addition }));
{{< /highlight >}}

Another benefit is that you can test the state updating in isolation when using a function. Simply extract the callback function that is used in `this.setState(fn)` to be standalone and export it to make it testable. It should be a pure function where you can test simply the output depending on the input.

{{% chapter_header "React's State and Props" "react-state-props" %}}

State is managed in a component. It can be passed down as props to other components. These components can consume the props or pass it even further down to their child components. In addition, child components can receive callback functions in the props from their parent components. These functions can be used to alter the local state of parent components. Basically props flow down the component tree, state is managed by a component alone and functions can bubble up to alter the state in a component that manages state. The updated state can be passed down as props again.

A component can manage a whole lot of state, pass it down as props to its child components and pass a couple of functions along the way to enable child components to alter the state in the parent component again.

However, the child components are not aware of the origin nor the functionality of the functions received in the props. These functions can update the state in a parent component yet could do something else. The child components only execute them. The same applies for the props. A component doesn't know if the received props are props, state or other derived properties from the parent component. The child component just consumes them.

It is important that you grasp the idea of props and state. All the properties that are used in your component tree can be divided into state and props ( and derived properties from state/props). Everything that needs to stay interactive goes into the state. Everything else is just passed down as props.

Before relying on a sophisticated state management library, you should have passed your props a couple of components down the component tree. You should know the feeling of *"there needs to be a better way to do this"* when you only pass props down a handful of components without using these props in the components between but only in the very last child component.

{{% chapter_header "Lifting React's State" "lift-react-state" %}}

Do you lift your local state layer already? That's the most important strategy to scale your local state management in plain React. The state layer can be lifted up and down.

You can **lift your local state down** to make it less accessible for other components. Imagine you have a component A as parent component of components B and C. B and C are child components of A and they are siblings. Component A is the only component that manages local state but passes it down to its child components as props. In addition, it passes down the necessary functions to enable B and C to alter its own state in A.

{{< highlight javascript >}}
          +----------------+
          |                |
          |       A        |
          |                |
          |    Stateful    |
          |                |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|                |    |                |
|                |    |                |
|       B        |    |        C       |
|                |    |                |
|                |    |                |
+----------------+    +----------------+
{{< /highlight >}}

Now, half of the local state of component A is consumed as props by component C but not by component B. In addition, C receives functions in its props to alter the state in A that is only consumed in C. As you can see, component A manages the state on behalf of component C. In most cases, it is just fine to have one component that manages all the state of its child components. But imagine in addition that between component A and C are several other components. All the props that are needed from component A need to traverse down the component tree to reach component C eventually. Still component A manages the state on behalf of component C.

{{< highlight javascript >}}
          +----------------+
          |                |
          |       A        |
          |                |
          |                |
          |    Stateful    |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|                |    |                |
|                |    |        +       |
|       B        |    |        |Props  |
|                |    |        v       |
|                |    |                |
+----------------+    +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |        +       |
                      |        |Props  |
                      |        v       |
                      |                |
                      +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |                |
                      |        C       |
                      |                |
                      |                |
                      +----------------+
{{< /highlight >}}

That's the perfect use case to lift React state down. When component A only manages the state on behalf of component C, this slice of state could be solely managed in component C. It could be autonomous in this respective. When you lift the local state management down to component C, all the necessary props don't need to traverse down the whole component tree.

{{< highlight javascript >}}
          +----------------+
          |                |
          |       A        |
          |                |
          |                |
          |    Stateful    |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|                |    |                |
|                |    |                |
|       B        |    |                |
|                |    |                |
|                |    |                |
+----------------+    +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |                |
                      |                |
                      |                |
                      |                |
                      +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |                |
                      |        C       |
                      |                |
                      |     Stateful   |
                      +----------------+
{{< /highlight >}}

In addition the state in component A gets decluttered. It only manages the necessary state of its own and of its closest child components.

The state lifting in React can go the other way too: **lifting state up**. Imagine you have again component A as parent component and component B and C as its child components. It doesn't matter how many components are between A and B and A and C. However, this time C already manages its own state.

{{< highlight javascript >}}
          +----------------+
          |                |
          |       A        |
          |                |
          |                |
          |    Stateful    |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|                |    |                |
|                |    |                |
|       B        |    |                |
|                |    |                |
|                |    |                |
+----------------+    +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |                |
                      |        C       |
                      |                |
                      |    Stateful    |
                      +----------------+
{{< /highlight >}}

What if component B needs state that is managed in C? It cannot be shared, because state can only be passed down as props. That's why you would lift the state up now. You can lift the state up from component C until you have a common parent component for B and C (which is A). If all state that is managed in C is needed in B, C becomes even a stateless component. The state can be managed in A but is shared across B and C.

{{< highlight javascript >}}
          +----------------+
          |                |
          |       A        |
          |                |
          |                |
          |    Stateful    |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|                |    |                |
|                |    |        +       |
|       B        |    |        |Props  |
|                |    |        v       |
|                |    |                |
+----------------+    +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |                |
                      |        C       |
                      |                |
                      |                |
                      +----------------+
{{< /highlight >}}

Lifting state up and down enables you to scale your state management with plain React. When more components are interested in particular state, you can lift the state up until you reach a common parent component for the components that need access to the state. In addition, the local state management stays maintainable, because a component only manages as much state as needed. If the state is not used in the component itself or its child components, it can be lifted down to its respective components where it is needed.

You can read more about lifting React's state in the {{% a_blank"official documentation" "https://facebook.github.io/react/docs/lifting-state-up.html" %}}.

{{% chapter_header "React's Higher Order Components" "react-higher-order-components" %}}

Higher order components (HOCs) are an advanced pattern in React. You can use them to abstract functionality away but reuse it as opt-in functionality for multiple components. A higher order component takes a component and optional configuration as input and returns an enhanced version of the component. It builds up on the principle of higher order functions in JavaScript: A function that returns a function.

If you are not familiar with higher order components, I can recommend you to read [the gentle Introduction to React's Higher Order Components](https://www.robinwieruch.de/gentle-introduction-higher-order-components/). It teaches React's higher order components with the use case of [React's conditional renderings](https://www.robinwieruch.de/conditional-rendering-react/).

Higher order components are important later on, because you will be confronted with them when using a library like Redux. When a library such as Redux "connects" its state managements layer with React's view layer, you will often run into a higher order component that takes care of it (connect HOC in {{% a_blank "react-redux" "https://github.com/reactjs/react-redux" %}}).

The same applies for other state management libraries such as MobX. Higher order components are used in these libraries to glue the state management layer to the view layer.

{{% chapter_header "React's Context" "react-context" %}}

React's {{% a_blank "context" "https://facebook.github.io/react/docs/context.html" %}} is rarely used. I wouldn't give the advice to use it, because its API is not stable and it adds implicit complexity to your application. However, it makes sense to understand its functionality.

So why should you bother about this? The context in React is used to pass down properties implicitly the component tree. You can declare properties as context somewhere up in a parent component and pick it up again in a child component somewhere down the component tree. Yet everything without the need to pass the props explicitly down each component that sits between the context producing parent component and the context consuming child component. It is an invisible container that you can reach down your component tree. So again, why should you care?

Often when using a sophisticated state management library, such as Redux or MobX, you glue the state management layer at some point to the React view layer. That's why you have the mentioned higher order components in React. The glueing should allow you to access the state and to modify the state. The state itself is often managed in some kind of state container.

But how would you make this state container accessible to all the React components that need to be glued to the state? It would be done by using React's context. In your top level component, basically your React root component, you would declare the state container in the React context so that it is implicitly accessible for each component down the component tree. The whole thing is accomplished by [React's Provider Pattern](https://www.robinwieruch.de/react-provider-pattern-context/).

After all, that doesn't mean that you need to deal with React's context yourself when using a library such as Redux. Such libraries already come with solutions for you to make the state container accessible in all components. But the underlying mechanics, why this works, are a good to know fact when making your state accessible in various components without worrying where the state container comes from.

{{% chapter_header "React's Stateful Components" "react-stateful-components" %}}

React comes with two versions of component declarations: ES6 class components and functional stateless components. A functional stateless component is only a function that receives props and outputs JSX. It doesn't hold any state nor does it have access to React's lifecycle methods. It is stateless as the name implies.

{{< highlight javascript >}}
function Counter({ counter }) {
  return (
    <div>
      {counter}
    </div>
  );
}
{{< /highlight >}}

React's ES6 class components, on the other hand, can have local state and lifecycle methods. These components have access to `this.state` and the `this.setState()` method. This means that ES6 class components can be stateful components. But they don't need to use the local state, so they can be stateless too. Usually ES6 class component that are stateless make use of lifecycle methods to justify that they are classes.

{{< highlight javascript >}}
class FocusedInputField extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.input.focus();
  }

  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        ref={node => this.input = node}
        onChange={event => this.props.onChange(event.target.value)}
      />
    );
  }
}
{{< /highlight >}}

The conclusion is that only ES6 class components can be stateful, but they can be stateless too. Functional stateless components alone are always stateless.

In addition, higher order components can be used to add state to React components too. You can write your own higher order component that manages state or use a library such as {{% a_blank "recompose" "https://github.com/acdlite/recompose" %}} with its higher order component `withState`.

{{< highlight javascript >}}
import { withState } from `recompose`;

const enhance = withState('counter', 'setCounter', 0);

const Counter = enhance(({ counter, setCounter }) =>
  <div>
    Count: {counter}
    <button onClick={() => setCounter(n => n + 1)}>Increment</button>
    <button onClick={() => setCounter(n => n - 1)}>Decrement</button>
  </div>
);
{{< /highlight >}}

When using React's higher order components, you can opt-in local state to any component in React.

{{% chapter_header "Container and Presenter Pattern" "container-presenter-react" %}}

The container and presenter pattern got popular in a {{% a_blank "blog post" "https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0" %}} by Dan Abramov. If you are not familiar with it, now is your chance to dig into it. Basically it divides components into two types: container and presenter. A container component describes *how things work* and a presenter component describes *how things look*. Often it implies that a container component is a ES6 class component, for instance because it manages local state, and a presenter component is a functional stateless component, for instance because it only displays its props and uses a couple of functions that were passed down from the parent component.

Before diving into Redux, it makes sense to understand the principle behind this pattern. With a state management library you will "connect" components to your state. These component don't care *how things look*, but more about *how things work*. Thus these components are container components. To be more specific, you will often hear the term **connected component** when a component gets connected to the state management layer.

{{% chapter_header "MobX or Redux?" "mobx-redux" %}}

Among all state management libraries, Redux is the most popular one yet MobX is a valuable alternative to it. Both libraries follow different philosophies and programming paradigms.

Before you decide to use one of them, make sure that you know the things about React that were explained in the article. You should feel comfortable with the local state management, yet know enough about React to apply different concepts to scale your state management in plain React. In addition, be sure that you need to scale your state management solution because your application becomes larger in the future. Perhaps lifting your state or using React's context once with the React's provider pattern would already solve your problem.

So if you decide to make the step towards Redux or MobX, you can read up the following article to make a more elaborated decision: [Redux or MobX: An attempt to dissolve the Confusion](https://www.robinwieruch.de/redux-mobx-confusion/). It gives a useful comparison between both libraries and comes with a couple of recommendations to learn and apply them. Otherwise checkout the [Tips to learn React + Redux](https://www.robinwieruch.de/tips-to-learn-react-redux/) article to get started in Redux.

<hr class="section-divider">

Hopefully this article gave you clarification about what you should learn and know before using a state management library like Redux. At this time, I am writing a book about state management in React with local state, but also with Redux and MobX. You can {{% a_blank "subscribe if you don't want to miss its release" "https://www.getrevue.co/profile/rwieruch" %}}.
