+++
title = "A gentle Introduction to React's Higher Order Components"
description = "Higher order components in React, or known under the abbreviation HOCs, are often a hard to grasp pattern in ReactJs. The article gives you an introduction to HOCs, how to use them elegantly in the case of conditional rendering and how to abstract them..."
date = "2017-04-04T13:50:46+02:00"
tags = ["React"]
categories = ["React"]
keyword = "react higher order component"
news_keywords = ["react higher order component"]
hashtag = "#ReactJs"
banner = "img/posts/gentle-introduction-higher-order-components/banner.jpg"
contribute = "gentle-introduction-higher-order-components.md"
headline = "A gentle Introduction to React's Higher Order Components"

summary = "Higher order components, or known under the abbreviation HOCs, are often a hard to grasp pattern in React. These components can be used for multiple use cases. I want to pick out one use case, the conditional rendering with higher order components, to give you two outcomes from this article as a reader: to learn higher order components and to see how you can use them in an elegant way."
+++

{{% pin_it_image "react higher order component" "img/posts/gentle-introduction-higher-order-components/banner.jpg" "is-src-set" %}}

Another fitting headline for the article could be: learn Higher Order Components with Conditional Rendering in React.

Higher order components, or known under the abbreviation HOCs, are often a hard to grasp pattern in React. These components can be used for multiple use cases. I want to pick out one use case, the [conditional rendering](https://www.robinwieruch.de/conditional-rendering-react/) with higher order components, to give you two outcomes from this article as a reader.

First, it should teach you about React's higher order components with the use case of conditional rendering. Keep in mind, that altering the look of a component with a higher order component, specifically in the context of conditional rendering, is only one of several use cases to use HOCs. For instance, you could use them to opt-in local state or to alter props as well.

Second, even though you might already know HOCs, the article goes a bit further by composing higher order components in React with the library recompose and by applying functional programming principles. You will get to know how to use higher order components in an elegant way.

In order to teach React higher order components, the article focuses on the use case of conditional rendering. A conditional rendering in React can be applied in multiple ways. You can use if-else statements, the ternary operator or the logical && operator. You can read more about the different ways in another article about [conditional renderings in React](https://www.robinwieruch.de/conditional-rendering-react/). If you are not familiar with conditional rendering in React, you could read the article first.

{{% chapter_header "A Growing React Component" "growing-react-component" %}}

We will start with a problem in React where higher order components could be used as solution. Let's assume our application has a `TodoList` component.

{{< highlight javascript >}}
function App(props) {
  return (
    <TodoList todos={props.todos} />
  );
}

function TodoList({ todos }) {
  return (
    <div>
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
}
{{< /highlight >}}

In a real world application that's not sufficient most of the time. You have to bother with *so much more*. Usually you would put the *so much more* related things outside of your `TodoList` in the parent component. But to keep the example and learning experience concise, I will place every *so much more* edge case in the `TodoList` component.

What are these edge cases I am speaking about?

First, what happens when your `todos` are null? You would apply a conditional rendering to opt-out earlier from your rendering.

{{< highlight javascript "hl_lines=2 3 4" >}}
function TodoList({ todos }) {
  if (!todos) {
    return null;
  }

  return (
    <div>
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
}
{{< /highlight >}}

Second, what happens when your todos are not null but empty? You would show a message in a conditional rendering to give your application user an improved user experience (UX).

{{< highlight javascript "hl_lines=6 7 8 9 10 11 12" >}}
function TodoList({ todos }) {
  if (!todos) {
    return null;
  }

  if (!todos.length) {
    return (
      <div>
        <p>You have no Todos.</p>
      </div>
    );
  }

  return (
    <div>
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
}
{{< /highlight >}}

Third, since the todos arrive asynchronously from your backend, you want to show a loading indicator in case the todos are still in a pending request. You would get one more property, such as 'isLoadingTodos', to know about the loading state.

{{< highlight javascript "hl_lines=1 2 3 4 5 6 7 8" >}}
function TodoList({ todos, isLoadingTodos }) {
  if (isLoadingTodos) {
    return (
      <div>
        <p>Loading todos ...</p>
      </div>
    );
  }

  if (!todos) {
    return null;
  }

  if (!todos.length) {
    return (
      <div>
        <p>You have no Todos.</p>
      </div>
    );
  }

  return (
    <div>
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
}
{{< /highlight >}}

Okay. I don't want to make this more complex as it is. But you get the idea that a lot of edge cases for conditional renderings can add up in a simple component. Higher order components can solves this issue. They can be used to shield away these edge cases as reusable functionalities. Thus the `TodoList` has not to worry about it anymore. Let's enter the concept of React's higher order components to deal with it.

{{% chapter_header "Entering React's Higher Order Components" "react-higher-order-component" %}}

Higher order components usually take a component and optional arguments as input and return an **enhanced component** of the **input component**. In our example, the goal would be to shield away specifically all the conditional rendering edge cases from the `TodoList` component.

Let's remove the first case from the `TodoList` where the `todos` are null.

{{< highlight javascript "hl_lines=10" >}}
function TodoList({ todos, isLoadingTodos }) {
  if (isLoadingTodos) {
    return (
      <div>
        <p>Loading todos ...</p>
      </div>
    );
  }

  // Removed conditional rendering with null check

  if (!todos.length) {
    return (
      <div>
        <p>You have no Todos.</p>
      </div>
    );
  }

  return (
    <div>
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
}
{{< /highlight >}}

Now let's implement our first higher order component in React to take ownership of this functionality. Higher order components can come with the naming prefix `with`, but it is not mandatory. In the end, it makes it easier to distinguish a React component from a React higher order component.

{{< highlight javascript >}}
function withTodosNull(Component) {
  return function (props) {
    ...
  }
}
{{< /highlight >}}

Now, let's slow down and let me explain what's happening in `withTodosNull`.

Basically the `withTodosNull` function is a higher order function. It takes an input and returns another function. Since we use it in the context of React, we can call it a higher order component. Because it takes a `Component` as input and returns another `Component`. We don't return another `Component` yet, but we will do later on. In this case it will return a functional stateless component, but it could return a ES6 class component as well. Depending on your use case you can use different component types. Yet a functional stateless component is sufficient for the sake of conditional rendering. When you would need access to `this.state` or React lifecycle methods, you could return an ES6 class component.

As mentioned, the **enhanced component** doesn't render anything. Let's add the rendered output of the enhanced component.

{{< highlight javascript "hl_lines=3 4 5" >}}
function withTodosNull(Component) {
  return function (props) {
    return !props.todos
      ? null
      : <Component { ...props } />
  }
}
{{< /highlight >}}

First, there is a conditional rendering with the ternary operator. The higher order component decides whether it shows nothing or the input component based on the condition. If the todos are null, it shows nothing. If the todos are not null, it shows the input component.

Second, all the props are passed - further down the component tree - to the input component. For instance, if you would use the `withTodosNull` HOC to enhance the `TodoList`, the latter would get all the props passed through the HOC as input with the {{% a_blank "JavaScript spread operator" "https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Spread_operator" %}}.

All the function and return statements make it hard to work with higher order components. You can use {{% a_blank "JavaScript ES6 arrow functions" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" %}} to make it concise again.

{{< highlight javascript "hl_lines=3 4 5" >}}
const withTodosNull = (Component) => (props) =>
  !props.todos
    ? null
    : <Component { ...props } />
{{< /highlight >}}

As a side note, to avoid confusion: In a JavaScript ES6 arrow function you can omit the curly braces. You transform the block body to a concise body. In a concise body you can omit the return statement because it will implicitly return.

Finally the first higher order component is finished. Let's use it:

{{< highlight javascript "hl_lines=8 12" >}}
const withTodosNull = (Component) => (props) =>
  ...

function TodoList({ todos }) {
  ...
}

const TodoListWithNull = withTodosNull(TodoList);

function App(props) {
  return (
    <TodoListWithNull todos={props.todos} />
  );
}
{{< /highlight >}}

That's it. As you can see, you can use it whenever you need it. Higher order components are reusable.

But there are more conditional renderings in the `TodoList` component. Let's quickly implement two more higher order components that take ownership of the loading indicator and an empty list.

{{< highlight javascript >}}
const withTodosEmpty = (Component) => (props) =>
  !props.todos.length
    ? <div><p>You have no Todos.</p></div>
    : <Component { ...props } />

const withLoadingIndicator = (Component) => (props) =>
  props.isLoadingTodos
    ? <div><p>Loading todos ...</p></div>
    : <Component { ...props } />
{{< /highlight >}}

There is only one nitpick. The `withLoadingIndicator` passes all the props to the input component. Even though the input component is not interested in the `isLoadingTodos`. You can use the {{% a_blank "JavaScript ES6 rest destructuring" "https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" %}} to split up the props.

{{< highlight javascript "hl_lines=1 2 4" >}}
const withLoadingIndicator = (Component) => ({ isLoadingTodos, ...others }) =>
  isLoadingTodos
    ? <div><p>Loading todos ...</p></div>
    : <Component { ...others } />
{{< /highlight >}}

Now the `isLoadingTodos` is split out from the props and only used in the HOC. All the `others` props are passed to the input component.

Last but not least, let's use all HOCs for our `TodoList` component.

{{< highlight javascript "hl_lines=14 15 16 20 21 22 23" >}}
const withTodosNull = (Component) => (props) =>
  ...

const withTodosEmpty = (Component) => (props) =>
  ...

const withLoadingIndicator = (Component) => ({ isLoadingTodos, ...others }) =>
  ...

function TodoList({ todos }) {
  ...
}

const TodoListOne = withTodosEmpty(TodoList);
const TodoListTwo = withTodosNull(TodoListOne);
const TodoListThree = withLoadingIndicator(TodoListTwo);

function App(props) {
  return (
    <TodoListThree
      todos={props.todos}
      isLoadingTodos={props.isLoadingTodos}
    />
  );
}
{{< /highlight >}}

The order to apply the higher order components should be the same as in the previous `TodoList` with all implemented conditional renderings. Otherwise, like in the basic `TodoList` component that had all the conditional renderings, you would run into bugs because of an `length` check on an null `todos` object.

Let's see what is left in the `TodoList` component:

{{< highlight javascript "hl_lines=10" >}}
function TodoList({ todos, isLoadingTodos }) {
  return (
    <div>
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
}
{{< /highlight >}}

Isn't that great? We shielded away all the conditional renderings and the `TodoList` component only bothers to render `todos`. Now you know how to use higher order components. As I said, the article taught HOCs leveraging conditional rendering. But you can use them for various use cases.

But it is kinda tedious to wrap all the components by hand into each other.

{{< highlight javascript >}}
const TodoListOne = withTodosEmpty(TodoList);
const TodoListTwo = withTodosNull(TodoListOne);
const TodoListThree = withLoadingIndicator(TodoListTwo);
{{< /highlight >}}

You could refactor it to:

{{< highlight javascript >}}
const TodoListWithConditionalRendering = withLoadingIndicator(withTodosNull(withTodosEmpty(TodoList)));
{{< /highlight >}}

Still, it is not readable. React embraces functional programming, so why are we not using these principles?

{{% chapter_header "Entering Recompose in React" "recompose-in-react" %}}

The little higher order component library {{% a_blank "recompose" "https://github.com/acdlite/recompose" %}} has a lot built-in higher order components that you can re-use. You should definitely check them out after you have read this article. However, it comes with a neat functionality called `compose` that allows you to return one function composed out of multiple functions. These multiple functions could be all of our conditional rendering HOCs. And that's how you use it:

{{< highlight javascript >}}
import { compose } from 'recompose';

...

const withConditionalRenderings = compose(
  withLoadingIndicator,
  withTodosNull,
  withTodosEmpty
);
{{< /highlight >}}

Now you can use the function to pass in your input component that needs to become an enhanced component with all the conditional renderings.

{{< highlight javascript >}}
const TodoListWithConditionalRendering = withConditionalRenderings(TodoList);
{{< /highlight >}}

That's convenient, isn't it? You can use `compose` to pass your input component through all higher order component functions. The input components gets an enhanced version of the component in each function.

{{< highlight javascript "hl_lines=1 16 17 18 19 20 22 26" >}}
import { compose } from 'recompose';

const withTodosNull = (Component) => (props) =>
  ...

const withTodosEmpty = (Component) => (props) =>
  ...

const withLoadingIndicator = (Component) => ({ isLoadingTodos, ...others }) =>
  ...

function TodoList({ todos }) {
  ...
}

const withConditionalRenderings = compose(
  withLoadingIndicator,
  withTodosNull,
  withTodosEmpty
);

const TodoListWithConditionalRendering = withConditionalRenderings(TodoList);

function App(props) {
  return (
    <TodoListWithConditionalRendering
      todos={props.todos}
      isLoadingTodos={props.isLoadingTodos}
    />
  );
}
{{< /highlight >}}

After all, higher order components themselves are reusable. By composing these components into each other, you get a lot of permutations of component enhancements.

{{% chapter_header "Reusability with abstracted Higher Order Components" "reusability-abstraction-higher-order-components" %}}

The higher order components of the last section were pretty specific. Each of them had a specific use case matching the requirements of the `TodoList` component. You wouldn't be able to use them in another context, to be more specific, in another component with a different props structure. Thinking about the long term investment in an application, you could abstract these higher order components to make them reusable by other components too.

As I mentioned, higher order components take an input component and an optional payload. These optional payloads are often used for configuration.

Let's give the `withTodosNull` an optional payload. The payload is a function that returns true or false to decide the conditional rendering.

{{< highlight javascript "hl_lines=1 2" >}}
const withTodosNull = (Component, conditionalRenderingFn) => (props) =>
  conditionalRenderingFn(props)
    ? null
    : <Component { ...props } />
{{< /highlight >}}

The name of the higher order component is misleading now. The HOC is not aware anymore of the props data structure nor is it aware of the `todos` at all. You could name it `withCondition`, because it takes a function that returns true or false.

{{< highlight javascript "hl_lines=1" >}}
const withCondition = (Component, conditionalRenderingFn) => (props) =>
  conditionalRenderingFn(props)
    ? null
    : <Component { ...props } />
{{< /highlight >}}

Now you could use the higher order component but with a function that determines the conditional rendering.

{{< highlight javascript "hl_lines=6 8" >}}
const withCondition = (Component, conditionalRenderingFn) => (props) =>
  conditionalRenderingFn(props)
    ? null
    : <Component { ...props } />

const conditionFn = (props) => !props.todos;

const TodoListWithCondition = withTodosNull(TodoList, conditionFn);
{{< /highlight >}}

The `withCondition` HOC enables you to re-use it everywhere for a conditional rendering that returns the input component or nothing. It is independent of the input component, independent of the condition and independent of the props structure.

Now let's use the `withCondition` in our composition of HOCs.

{{< highlight javascript "hl_lines=5" >}}
import { compose } from 'recompose';

const withConditionalRenderings = compose(
    withLoadingIndicator,
    withCondition,
    withTodosEmpty
);

const TodoListWithConditionalRendering = withConditionalRenderings(TodoList);
{{< /highlight >}}

That's not going to work. The function signature of `withCondition` has two arguments: the input component and the optional payload that is the conditional function. But composing works by passing only one value from function to function.

Here is the catch in functional programming. You will often pass only one argument, that's why currying exists. However, you don't need to bother with a curry function now. So instead of using two arguments in the `withCondition` higher order component, you can use another higher order function.

{{< highlight javascript "hl_lines=1" >}}
const withCondition = (conditionalRenderingFn) => (Component) => (props) =>
    conditionalRenderingFn(props)
        ? null
        : <Component { ...props } />
{{< /highlight >}}

Now, the first time you invoke `withCondition` you have to pass the condition function. It returns your higher order component. The HOC can then be used in the composition of recompose.

{{< highlight javascript "hl_lines=7" >}}
import { compose } from 'recompose';

...

const conditionFn = (props) => !props.todos;

const withConditionalRenderings = compose(
    withLoadingIndicator,
    withCondition(conditionFn),
    withTodosEmpty
);

const TodoListWithConditionalRendering = withConditionalRenderings(TodoList);
{{< /highlight >}}

That's a powerful abstraction, isn't it? You can use the first higher order function to pass the optional payload and return the higher order component that is used in the composition.

{{% chapter_header "Maybe and Either Higher Order Components" "maybe-either-higher-order-components" %}}

You can use the naming conventions and principles of functional programming (FP) to name your abstracted higher order components properly. Developers who are familiar with FP will know the use case of the HOC by seeing its name.

Let's take the `withCondition` higher order component.

{{< highlight javascript "hl_lines=1" >}}
const withCondition = (conditionalRenderingFn) => (Component) => (props) =>
  conditionalRenderingFn(props)
    ? null
    : <Component { ...props } />
{{< /highlight >}}

The component returns nothing or the input component. Such a type, nothing or value, is called Maybe (or Option) in functional programming. After knowing this, you could call the higher order component `withMaybe`. Even though the HOC is not an explicit type, it would use the naming convention of FP to make it simple to understand.

{{< highlight javascript "hl_lines=1" >}}
const withMaybe = (conditionalRenderingFn) => (Component) => (props) =>
  conditionalRenderingFn(props)
    ? null
    : <Component { ...props } />
{{< /highlight >}}

What about the other two HOCs? They are not abstracted yet. They are different from the `withMaybe` higher order component, because they return *either* the input component or another element. The Either type in FP defines these two differing values. In addition, similar to the `withMaybe`, the `withEither` could take as additional payload a component that should be shown if the condition doesn't match.

{{< highlight javascript "hl_lines=1 3" >}}
const withEither = (conditionalRenderingFn, EitherComponent) => (Component) => (props) =>
  conditionalRenderingFn(props)
    ? <EitherComponent />
    : <Component { ...props } />
{{< /highlight >}}

Now you can use it in the application by passing the conditional function and the `EitherComponent`.

{{< highlight javascript "hl_lines=3 4 5 6 8 9 10 11 13 14 15 18 20" >}}
import { compose } from 'recompose';

...

const EmptyMessage = () =>
  <div>
    <p>You have no Todos.</p>
  </div>

const LoadingIndicator = () =>
  <div>
    <p>Loading todos ...</p>
  </div>

const isLoadingConditionFn = (props) => props.isLoadingTodos;
const nullConditionFn = (props) => !props.todos;
const isEmptyConditionFn = (props) => !props.todos.length

const withConditionalRenderings = compose(
  withEither(isLoadingConditionFn, LoadingIndicator),
  withMaybe(nullConditionFn),
  withEither(isEmptyConditionFn, EmptyMessage)
);

const TodoListWithConditionalRendering = withConditionalRenderings(TodoList);
{{< /highlight >}}

Now every higher order component receives a payload apart from the input component. The payload is used in another higher order function, to keep the higher order component composeable with `compose`.

Last but least, let's see everything in context to each other.

{{< highlight javascript >}}
import { compose } from 'recompose';

const withMaybe = (conditionalRenderingFn) => (Component) => (props) =>
  conditionalRenderingFn(props)
    ? null
    : <Component { ...props } />

const withEither = (conditionalRenderingFn, EitherComponent) => (Component) => (props) =>
  conditionalRenderingFn(props)
    ? <EitherComponent />
    : <Component { ...props } />

const EmptyMessage = () =>
  <div>
    <p>You have no Todos.</p>
  </div>

const LoadingIndicator = () =>
  <div>
    <p>Loading todos ...</p>
  </div>

const isLoadingConditionFn = (props) => props.isLoadingTodos;
const nullConditionFn = (props) => !props.todos;
const isEmptyConditionFn = (props) => !props.todos.length

const withConditionalRenderings = compose(
  withEither(isLoadingConditionFn, LoadingIndicator),
  withMaybe(nullConditionFn),
  withEither(isEmptyConditionFn, EmptyMessage)
);

const TodoListWithConditionalRendering = withConditionalRenderings(TodoList);

function App(props) {
  return (
    <TodoListWithConditionalRendering
      todos={props.todos}
      isLoadingTodos={props.isLoadingTodos}
    />
  );
}

function TodoList({ todos }) {
  return (
    <div>
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
}
{{< /highlight >}}

I hope the article helped you to learn higher order components in the context of conditional rendering. In addition, I hope that it gave you inspiration on how you can use abstraction and functional programming with higher order components.