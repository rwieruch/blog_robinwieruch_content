---
title: "A Reason React Tutorial for Beginners [2018]"
description: "Learn how to build a Reason React application with this tutorial. You will use the GitHub API to fetch real data, render forms and data, and style your ReasonReact application with inline style and bs-css ..."
date: "2018-12-01T07:52:46+02:00"
categories: ["React", "JavaScript", "Reason"]
keywords: ["reason react", "reason react tutorial", "reason react examples", "reasonreact"]
hashtags: ["#100DaysOfCode", "#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: "Benjamin Johnson"
---

<Sponsorship />

First off, this tutorial assumes that you have some knowledge of how React works. If you're just getting started to React, I'd highly recommend reading through [The Road to learn React](/the-road-to-learn-react/) before trying to dive into ReasonReact. It's really important to have at least a basic foundational understanding of React. After all, ReasonReact is an abstraction on top of React.

Kinda reminds me of this Kyle Simpson quote from [You Don't Know JS: Async & Performance](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/README.md): *It's impossible to effectively use any abstraction if you don't understand what it's abstracting, and why.*

The other abstraction that's important to know about is Reason itself, since ReasonReact is **React in Reason**. If you're just getting started with Reason I'd recommend having the [Reason docs](https://reasonml.github.io/docs/en/what-and-why) up as you read this article, just in case you need any refreshers on the syntax or language mechanics. I also have an [introductory article](https://blog.logrocket.com/what-makes-reasonml-so-great-c2c2fc215ccb) to Reason that may be a good read if you're just starting out with Reason and want to know what all the hype is about.

In addition, there's one disclaimer I'd like to add. We'll definitely see some "rough edges" and not-quite-finished language features as we go through this tutorial. This is largely because Reason is a newer community, even though it's based on OCaml's more mature community. It's important to remember that the teams behind Reason and ReasonReact are aware of the pain points and awkwardness around certain parts of the language, and are working hard to fix them. While certain parts (like async/await or CSS) aren't fully solved yet, there's a lot of really smart people working to solve them right now.

# Getting started with ReasonReact

For this tutorial, we'll be building a Github Search app. This app will have a search bar at the top that takes any topic your heart desires. Then, when the search entry is submitted, we'll query the GitHub REST API and display a list of repositories matching that topic.

Here's a [live link](https://benjamminj.github.io/reason-react-tutorial/) to the app if you want to poke around a little bit.

I find it helpful to build an app of this size whenever I'm learning something new&mdash;in fact, I often use *this exact app requirements* to learn a new technology or framework. Solving a familiar problem is a good way to get a feel for an unfamiliar technology. Similar to the way people make to-do lists or Hacker News clones, a GitHub search app is just complex enough that we'll have to do things like state-management and API calls, yet simple enough to build in a single tutorial.

If you're looking to look through the source code you can check out the repo [here](https://github.com/benjamminj/reason-react-tutorial). To code along check out the `getting-started` branch. This will only contain the boilerplate to get a "hello world" on the screen, and then we'll fill in the rest of the app from there.

```javascript
git clone https://github.com/benjamminj/reason-react-tutorial.git

cd reason-react-tutorial

git checkout getting-started

npm install

npm run dev
```

That should start a simple dev server at http://localhost:8000 with a very plain "Hello World" on the screen.

# Stateless ReasonReact Components

Let's start by making a stateless component. We're gonna create one of the cards that contain the list results. We'll add a new file to the *src* directory named *Card.re*.

You'll notice that while the dev server is running adding our *src/Card.re* file will generate a `Card.bs.js` file right next to it. This is the compiled Reason code for our *src/Card.re* file. The BuckleScript build system generates a JavaScript file per Reason file; this makes it easy to introduce Reason into a JavaScript codebase.

The first thing we have to do for a ReasonReact component is create a component "template". You can think of this as the `React.Component` that you would extend off of when creating a class component in JavaScript. ReasonReact doesn't use classes, so this template is a [record](https://reasonml.github.io/docs/en/record) (similar to a JS object, but immutable) that we can override with our custom component code.

To make our component template we'll call the `ReasonReact.statelessComponent` function. Passing `"Card"` as the argument gives our component its' name.

```javascript
let component = ReasonReact.statelessComponent("Card");
```

To actually create a component using our template we need to define a function with the name of `make`. This `make` function takes our component's **props** as labelled arguments (a labelled argument in Reason is an argument starting with a `~`).

For our use cases, we'll have our `Card` component use `name`, `description` and an `href` props. This will give us enough to see what repos match our search as well as include links to them.

```javascript
let make = (~name, ~description, ~href, _children) => {};
```

In addition, the `make` function has to take a `children` argument as its' last argument, even if the component doesn't do anything with its' children. This is to preserve the type-safety of ReasonReact so that it can do all of its' compile-time magic later on. If you don't plan on using the `children` prop, just add an underscore to the beginning (`_children`) to tell the compiler you didn't plan on using the variable.

Now that we've got an empty `make` function, what should it return? ReasonReact expects `make` to return a record with a bunch of internal keys and the component's lifecycle hooks. Fortunately, we can use that template we made earlier. Let's spread the template into our `make` function's return value.

```javascript{2}
let make = (~name, ~description, ~href, _children) => {
  ...component,
};
```

It's also worth noting that if you're coming from JavaScript land, curly braces after an arrow in Reason don't behave like curly braces in JavaScript. In Reason, the curly braces after the arrow mean we're actually returning a record, as opposed to just starting a new multiline function body.

Now that we've spread all of our template into `make`, let's add our own custom `render` function.

```javascript
let make = (~name, ~description, ~href, _children) => {
  ...component,
  render: _self =>
    <div>
      <h3>
        <a href target="_blank" rel="noopener noreferrer">
          {ReasonReact.string(name)}
        </a>
      </h3>
      <p> {ReasonReact.string(description)} </p>
    </div>,
};
```

Let's take a quick look at the JSX first. It's built-in to Reason at the language level but you might notice a few differences from the JSX you're used to.

First off, Reason JSX supports *punning*&mdash;when the prop name matches the variable that's being passed as its' value, you can just write the prop once instead of twice. So since we already a variable named `href` we don't need to write `make={make}` when applying it to our `<a>` tag. Instead, we can just do `<a href>`.

In addition, Reason JSX doesn't require prop assignments to be inside curly braces. So instead of `href={link}` you could do `href=link` and it will work exactly the same. If you prefer the curly braces go ahead, both are valid syntax.

However, there is one big difference from ReasonReact has compared to React JSX. What's all this `{ReasonReact.string(description)` business? Once again, this has to do with type safety and being in a compiled language. Since each component's `render` *has to return a React element* ReasonReact provides a series of utility functions to convert strings, arrays, and null into the correct type for ReasonReact to use it correctly. It does feel a little awkward at first, especially coming from regular JSX. However, I will say the awkwardness does wear off a little bit, especially when you realize the absolute type safety Reason is adding to your app.

If you're still annoyed by having to write `{ReasonReact.string(description)`, you can create a `<Str string={description} />` component that just wraps `ReasonReact.string()`. This might feel a little less awkward and boils down to essentially the same thing.

We're done! This is what our completed `<Card />` component looks like.

```javascript
let component = ReasonReact.statelessComponent("Card");

let make = (~name, ~description, ~href, _children) => {
  ...component,
  render: _self =>
    <div>
      <h3>
        <a href target="_blank" rel="noopener noreferrer">
          {ReasonReact.string(name)}
        </a>
      </h3>
      <p> {ReasonReact.string(description)} </p>
    </div>,
};
```

Let's integrate it into our app so we can see it in action. If you cloned the repo go check out the *src/App.re* file. You'll notice it's pretty bare right now.

```javascript
let component = ReasonReact.statelessComponent("App");

let make = _children => {
  ...component,
  render: _self => <div> {ReasonReact.string("Hello world!")} </div>,
};
```

Let's replace the "Hello world!" text with our `<Card />` component. We'll have to add some fake props since we haven't added real data just yet (don't worry, we'll get there soon).

```javascript{7}
let component = ReasonReact.statelessComponent("App");

let make = _children => {
  ...component,
  render: _self =>
    <div>
      <Card name="reason" href="" description="This is cool" />
    </div>,
};
```

We also didn't need to import our `<Card>` because every file in Reason is automatically a module in the global namespace. This takes a little getting used to, but I've found that the Reason/OCaml module system can be quite elegant. Not having to explicitly define an import path makes it easy to move files around or update folder structure later on. It also makes it easier to just pull in the modules you need without interrupting your workflow when you're in the middle of a project.

When we check out the page we can see that our card is indeed on the page correctly, although it's a little bare.

# CSS in ReasonReact

Let's add some styles to our `<Card />` before we go any further. Any real app will have styles, so it wouldn't feel right if I skipped over some of ReasonReact's styling approaches.

There's a few methods of styling in Reason, although I have yet to see a single method "win" as "the official way" to do styling just yet.

As a simple styling solution there's always inline styles. ReasonReact includes a way to create the same style object that React uses under the hood. This is what an inline style declaration would look like.

```javascript{6,7,8,9,10,11,12,13,14}
/* Inside of src/Card.re */

let make = (~name, ~description, ~href, _children) => {
  ...component,
  render: _self =>
    <div
      style={
        ReactDOMRe.Style.make(
          ~border="2px solid #898989",
          ~borderRadius="4px",
          ~padding="1rem",
          (),
        )
      }>
      <h3>
        <a href target="_blank" rel="noopener noreferrer">
          {ReasonReact.string(name)}
        </a>
      </h3>
      <p> {ReasonReact.string(description)} </p>
    </div>,
};

```


`ReactDOMRe.Style.make` is a function that takes a number of optional labelled arguments. Each argument directly maps to a CSS property. The last argument to `ReactDOMRe.Style.make` is a little different, it's a value called *unit* `()`. Believe it or not, this is a pretty common convention in the Reason/OCaml community for managing large amounts of labelled optional arguments. That said, it looks a little strange if you've never seen it before.

Basically, the reason that the final argument has to be unit is to signal when to stop currying the function. Since Reason function arguments are automatically [curried](https://github.com/getify/Functional-Light-JS/blob/13a3bdafb4edb83207db76212312472aab20d06a/manuscript/ch3.md/#one-at-a-time), calling `ReactDOMRe.Style.make(~padding="1rem");` returns *a new function* that we could pass more CSS properties into. Using functions like this lets us progressively apply values into our function throughout our application rather than all at once.

If we wanted to pull our styles outside of `render`, I've found it helpful to use a [local module](https://reasonml.github.io/docs/en/module). This can help add some readability to our `render` if styles are getting a little long.

```javascript
/* Inside of src/Card.re */
module Styles = {
  let card =
    ReactDOMRe.Style.make(
      ~border="2px solid #898989",
      ~borderRadius="4px",
      ~padding="1rem",
      (),
    );
};

/* Later, in our `render` JSX */
<div style=Styles.card>
```

Another commonly-used community solution to styling is [bs-css](https://github.com/SentiaAnalytics/bs-css), which is a typed wrapper around [emotion](https://emotion.sh/). If we wanted to use `bs-css` first we would need to install it.

```javascript
npm install --save bs-css
```

And then we will need to add `bs-css` to the `"bs-dependencies"` field in our `bsconfig.json` file (if you cloned the sample repo it will be right there alongside `package.json`).

```javascript
"bs-dependencies": ["reason-react", "bs-css"],
```

Now we can go convert our styles to use `bs-css`, which will generate a string that we can use as a `className`. Using `bs-css` gives a little more type safety to our css styles, if that's something that you're looking for.

```javascript
/* Inside src/Card.re */

module Styles = {
  open Css;
  let card = style([
    border(px(1), `solid, hex("898989")),
    borderRadius(px(4)),
    padding(rem(1.0))
  ])
};

/* Later, in our `render` JSX */
<div className={Styles.card}>
```

Sidenote&mdash;if your IDE is yelling about an unbound module warning after you added `bs-css`, try reloading it or re-opening the file. I use VSCode and I commonly get this error after installing new Reason packages. The reason (no pun intended) has to do with the IDE loading dependencies when a file is first opened and you adding dependencies after the file was opened. Chances are the compiler error will look like this: "Error: Unbound module Css".

That said, there's a lot of other ways to manage styles in ReasonReact. These are only two of commonly-used methods. I've personally used a [custom binding](https://github.com/benjamminj/solitaire/blob/master/src/__packages__/emotion.re) to Emotion that provides a little less type safety for style rules, but feels a little closer to the tagged template literal API.

There's also a really promising project for a [PPX transform for CSS](https://github.com/astrada/ppx_bs_css). You can kinda think of a PPX transform as a Babel plugin for the Reason/OCaml language. It allows the ability to use custom syntax to describe CSS. This would allow something much closer to plain ol' CSS, without sacrificing any type-checking power. I haven't fully played with it just yet, but I've heard good things so far.

For now, let's make do with `bs-css` as a styling solution, but it's always good to know that other options exist if `bs-css` isn't your cup of tea.

# Stateful Components in ReasonReact

Now, let's build the search form. We're gonna do this directly inside of *src/App.re* for simplicity's sake, so we'll be converting `<App />` from a stateless component to a stateful component.

ReasonReact calls its' stateful components *reducer components*. In my opinion, reducer components showcase the benefit of adding the battleproof type-safety of Reason/OCaml to our React code. It's easier to sacrifice type-safety when you're writing a simple card component, but once you start adding business logic to your components that type-safety helps protect us from silly mistakes.

As we dive into reducer components I find it helpful to think of the way that [Redux](https://redux.js.org/basics/reducers) reducers work. Reducer components feel very similar to Redux, except that they're contained within the component itself instead of being connect to a global state store. If you're unfamiliar with Redux or want a refresher on how it works, check out [Taming the State in React](https://roadtoreact.com/).

The first thing that we'll need to do to turn our `<App />` component into a reducer component is create a couple type declarations. The first one we'll need to create is a `state` type to describe what our component's state looks like. Let's just add it at the very top of the *src/App.re* file.

```javascript
type state = {
  input: string,
  isLoading: bool,
};
```

The second type we'll need to make is an `action` type. Similar to a Redux action, this will describe the types of ways we can update our component's state. We'll define the `action` type as a [variant](https://reasonml.github.io/docs/en/variant).

For now, we'll have two possible actions to update our component's state, `UpdateInput` and `Search`. `UpdateInput` will trigger whenever the user types into the search bar, passing the value of the `input` field as a value. `Search` will represent when the search query is actually submitted and we want to grab the search results from GitHub's API.

```javascript
type action =
  | UpdateInput(string)
  | Search;
```

Next we need to modify our component template to use a reducer component. To do that we'll need to change `ReasonReact.statelessComponent("App")` to `ReasonReact.reducerComponent("App")`. It's not a big change, `reducerComponent` takes the exact same argument as `statelessComponent`: the name we want to give our component.

```javascript
let component = ReasonReact.reducerComponent("App");
```

Now we're using the reducer component template. We're not quite done converting our stateless component just yet though, so don't worry if you see compiler warnings for now. For a reducer component, we do need to provide a couple extra keys to our component record in addition to `render`.

The first thing we'll need to add is an `initialState` key. This key has to be a function, and it has to return the same `state` type that we defined earlier.

```javascript{3}
let make = _children => {
  ...component,
  initialState: () => {input: "", isLoading: false},
  render: ...
};
```

The second thing we'll need to add is a `reducer` function. This works exactly the same as a Redux reducer&mdash;it takes an `action` and `state` as arguments and returns an update to the state. Technically it returns a special `update` type that manages the `setState` that you would normally do in JavaScript. However, the argument to the `update` type is the next state that you would like your component to have, so we can just think about the reducer as returning the updated state.

Inside of our reducer, we'll use [pattern-matching](https://reasonml.github.io/docs/en/pattern-matching) to declare our state updates for each action. The pattern-matching syntax looks a little bit like a JavaScript `switch` statement. However, unlike a `switch` statement, Reason's pattern-matching is 100% type safe. The compiler will even warn us if we forgot to declare a state update for one of our actions.

For the `UpdateInput` actions we'll just pass that value along as the new input. This will make sure our input value stays in sync with whatever the user is typing. For the `Search` action, we'll just turn the `isLoading` state on. We'll flesh this out a little more when we cover data handling.

```javascript{3,4,5,6,7,8}
let make = _children => {
  ...component,
  initialState: () => {input: "", isLoading: false},
  reducer: (action, state) =>
    switch (action) {
    | UpdateInput(newInput) => ReasonReact.Update({...state, input: newInput})
    | Search => ReasonReact.Update({...state, isLoading: true})
    },
  render: ...
};
```

The last thing left to do to convert our component is to modify our `render` function to use the state that we just added. Since this step is a little more involved, we'll make sure to do it in a few stages.

Let's start by replacing our `<Card />` with a form containing an input and a submit button. The input field will be hooked up our `state.input`. Don't worry about adding the event handlers just yet, we'll get there soon!

In addition to the form, we'll also render the text "Loading..." if `state.isLoading` flag is `true`. Since we don't have any state updates built yet, this won't change yet. For now, let's just get the elements hooked up to state correctly.

```javascript
render: self => {
  <div>
    <form>
      <label htmlFor="search"> {ReasonReact.string("Search")} </label>
      <input id="search" name="search " value={self.state.input} />
      <button type_="submit">
        {ReasonReact.string("Submit Search")}
      </button>
    </form>
    <div>
      {
        self.state.isLoading ?
          ReasonReact.string("Loading...") : ReasonReact.null
      }
    </div>
  </div>
}
```

A couple things to note in this example. Since Reason doesn't come with the concept of `this` the way JavaScript does, we'll have to use the `self` argument in `render` to access our component's state. In addition to `state`, `self` contains a few functions to help with updating state, correctly binding event handlers (for functions outside of the component), stuff like that. Think of `self` as your workaround for `this`, without all of the baggage and confusion about context.

Another little "gotcha" is the `type_` attribute on the `<button>` tag. Since `type` is a keyword in Reason the Reason team has built in a workaround for variables (and props) that match keywords: just append an underscore at the end and you're good to go.

Lastly, the loading text isn't quite as simple as the `{state.isLoading && "Loading..."}` that we would see in JavaScript. This comes down to the type system once again&mdash;in JavaScript we can rely on falsy expressions magically converting to `null` which renders as empty in React. In Reason we have to explicitly say that we want to render `null` using `ReasonReact.null` and a ternary statement in order to satisfy the compiler.

This is all cool and all, but our form isn't really going to be much use if we can't update or submit it. Let's add a couple event handlers to make our form work as intended. For readability's sake, let's define the handlers *outside of render* as plain functions. We can just put them up above the `make` function.

The first event handler we'll add is on the `input` field. We'll just take the value out of `input.target.value` and trigger a state update with our `UpdateInput` action. Let's just define our event handler inline inside of render for now (if you would like to pull them out of render later on you're more than welcome to, however you will need to read up on using the [self.handle](https://reasonml.github.io/reason-react/docs/en/callback-handlers#reading-into-self) function to wrap your handler).

```javascript{6,7,8,9}
/* inside render */
<input
  id="search"
  name="search"
  value={self.state.input}
  onChange={ev => {
    let value = ReactEvent.Form.target(ev)##value
    self.send(UpdateInput(value))
  }}
/>
```

The first part (`let value = ReactEvent.Form.target(ev)##value;`) is roughly equivalent to `let value = ev.target.value;` in JavaScript. It's certainly less ergonomic than its' JavaScript cousin, but once again this has to do with getting the compiler to be happy. I've yet to find a simpler or cleaner way to do this, if you know of one let me know.

We can think of the second line of our handler (`self.send(UpdateInput(value))`) similarly to the way we would use a Redux [dispatcher](https://redux.js.org/api/store#dispatch). Essentially what `self.send` does is it makes sure that the `UpdateInput` action and the input value are passed into our `reducer` function so we can generate a new state.

Now that we've got our input handling changes to its' value correctly, let's wire up the form submission. The first thing we'll want to do is hook up a relatively small event handler to prevent the default form submission action (reloading the page) as well as firing the `Search` action with `self.send` to tell our component's `reducer` that it's time to handle the form submission.

```javascript
/* inside render */
<form onSubmit={
  ev => {
    ReactEvent.Form.preventDefault(ev);
    self.send(Search);
  }
}>
  ...other form JSX
</form>
```

We're keeping the event handler itself fairly lean so most of our fetching & data normalization logic can go inside the `reducer` function. However, to allow our component to run these functions in the `reducer` we'll need to modify the `Search` part of our `reducer` to use `ReasonReact.UpdateWithSideEffects` instead of just `ReasonReact.Update`. This function behaves exactly as its' name suggests: it updates the state, and then triggers a side effect. We can do *whatever* we want in those side effects, so this will be perfect for allowing us to trigger an API request and add some loading state after the form is submitted. Let's update our reducer now.

```javascript{5,6,7,8,9,10,11,12}
reducer: (action, state) =>
  switch (action) {
  | UpdateInput(input) => ReasonReact.Update({...state, input})
  | Search =>
    ReasonReact.UpdateWithSideEffects(
      {...state, isLoading: true},
      (
        self => {
          let value = self.state.input;
          /* This function needs to return a "unit" type, wo we'll insert it here */
          ();
        }
      ),
    )
  },
```

`UpdateWithSideEffects` allows us to pass a second argument to our state update&mdash;a callback to be executed *after* the state is set (If you're familiar with a [setState callback](https://reactjs.org/docs/react-component.html#setstate), this works similarly). Triggering our side effects this way sis the preferred method since it keeps most of our app's logic contained inside the `reducer` method. In addition, it's a little safer as far as preparing for the future of React with async rendering.

The first thing we've done inside of our side effect is pull our input value out of `self.state.input`. We'll use this for our API query coming up.

# Data Fetching in ReasonReact

We've come a long way! We've got an operating form that triggers our loading state and a `<Card />` component for once we've got a list of results. Now we just need to connect the dots and get the real data from GitHub's API into our app.

Data fetching in Reason is a lot easier said than done. Actually calling the API isn't too hard, but the trickiness starts once we receive a response. Because Reason is statically typed it needs to make sure that the API response is correctly mapped into valid Reason/OCaml types. We call this process of parsing the JSON and transforming it into valid types **JSON decoding**.

JSON decoding can be kind of tricky. The "proper" way to do it is to declare every single key* in the JSON that you care about. Then you try to map each key to the type you want it to be on the Reason side. If it maps, great! But if it doesn't map correctly you assume it's bad data and throw out the entire key, potentially replacing it with a default value. This can get really verbose, but this method ensures that you handle any malformed data when it enters your app instead of letting it cause bugs later on.

Granted, you could write some [external bindings](https://bucklescript.github.io/docs/en/intro-to-external#special-identity-external) and essentially tell the compiler "this is what my JSON looks like and it will never be different than this type". But rarely in the real world do our external APIs *always* returns *exactly* what we expect. Sometimes they crash or return 500 errors. Sometimes that key we expected to contain a number is actually `null`. Cutting corners on type bindings here might be convenient, but one of the main selling points of using a typed language like Reason is the compiler and the safety a it brings to the table.

All that said, since we're doing this tutorial to get a flavor of what ReasonReact feels like, we'll do the full JSON decoding. There's a few community libraries to make our JSON decoding and API fetching a bit easier. So before we jump into our fetching logic, lets install `bs-fetch` and `@glennsl/bs-json`. The first is a thin wrapper around the native `window.fetch` function, and the second will give us a bunch of utility functions to ease the decoding process.

```javascript
npm install bs-fetch @glennsl/bs-json
```


We'll also need to add them to the `bs-dependencies` field of our `bsconfig.json`.

```javascript
"bs-dependencies": ["reason-react", "bs-css", "bs-fetch", "@glennsl/bs-json"],
```


Since the data fetching and JSON decoding is gonna be quite a bit of code, let's create a local `Api` module inside of our *src/App.re* component. This will help encapsulate it and keep our code from getting too far nested. You can just put it between the `let component` declaration and the `make` function.

```javascript{3}
let component = ReasonReact.reducerComponent("App");

module Api = {};

let make = _children => {
  /* component contents */
};
```


Next thing we'll want to do is set up a function to make the API call. We'll use the `bs-fetch` module to send the request. For now, we can just convert the response to JSON and resolve the promise.

```javascript
module Api = {
  let getResults = query =>
    /* This is a local "open", it makes the Js.Promise module available inside of the parentheses */
    Js.Promise.(
      Fetch.fetch("https://api.github.com/search/repositories?q=" ++ query)
      |> then_(Fetch.Response.json)
      |> then_(json => {
        Js.log(json);
        resolve();
      })
    );
};
```


Sadly, Reason doesn't have a full-fledged async/await syntax just yet, although it's in progress (see this [PR](https://github.com/facebook/reason/issues/1321)). So we'll have to live with regular promises in Reason until a proper async/await solution is implemented.

Let's make sure our `getResults` function is actually fired when we submit the form. That way we can make sure our query is  getting a response before we start writing our decoders. We'll call `Api.getResults` from our reducer side effect.

```javascript{10}
reducer: (action, state) =>
    switch (action) {
    | UpdateInput(input) => ReasonReact.Update({...state, input})
    | Search =>
      ReasonReact.UpdateWithSideEffects(
        {...state, isLoading: true},
        (
          self => {
            let value = self.state.input;
            let _ = Api.getResults(value);
            /* this function needs to return a type of unit, not a promise */
            ();
          }
        ),
      )
    },
```


If you fill out the search input and submit the form, you'll see the API request triggered in your DevTools, as well as the response in the console. That means we can start decoding our results and turning them into something that Reason can accurately use for its' type system.

Before we write our decoder functions, we'll need to add a type declaration for the shape that we would like our data to be. This will be the return type of our JSON decoder and we'll eventually add it to our component state. Let's create a `repository` type that contains 3 keys: a name, the URL, and a short description. We can add it up above our `state` declaration.

```javascript
type repository = {
  name: string,
  description: string,
  href: string,
};
```


Great! Now we're finally ready to start adding the decoder function. To use all of the decoding functions inside of `bs-json`, we'll add `open Json.Decode;` at the top of our local `Api` module. This essentially pulls in all of the exported functions from the `Json.Decode` namespace into our local module. Instead of having to type `Json.Decode.functionName` we can just type `functionName`. While it's not good to always `open` a module it can greatly decrease verbosity.

```javascript{2}
module Api = {
  open Json.Decode;

  let getResults = query =>
    Js.Promise.(
      Fetch.fetch("https://api.github.com/search/repositories?q=" ++ query)
      |> then_(Fetch.Response.json)
      |> then_(json => {
        Js.log(json);
        resolve();
      })
    );
};
```


In the decoder function itself, we'll do a couple things. The part of the API response that we want is inside the `items` array. Each object in the `items` array contains a lot of data, but we only care about those 3 keys from our `repository` type. What we need to do is tell Reason to look at the `items` field of the JSON and turn it into a `list` of our `repository` type.

However, if any of our fields inside of the `repository` record isn't converted correctly, we don't want to convert the data. Because of this we'll wrap our `repository` decoder inside a special `optional` wrapper. This basically says to return an [option type](https://reasonml.github.io/docs/en/null-undefined-option)), so that we can have `Some(repository)` or `None` if the conversion was invalid.

Here's what the decoding function actually looks like. We'll call it `decodeResults`.

```javascript{4,5,6,7,8,9,10,11,12,13,14,15,16}
module Api = {
  open Json.Decode;

  let decodeResults =
    field(
      "items",
      list(
        optional(json =>
          {
            name: field("name", string, json),
            description: field("description", string, json),
            href: field("html_url", string, json),
          }
        ),
      ),
    );

  let getResults = query =>
    Js.Promise.(
      Fetch.fetch("https://api.github.com/search/repositories?q=" ++ query)
      |> then_(Fetch.Response.json)
      |> then_(json => {
        Js.log(json);
        resolve();
      })
    );
};
```



The last thing is to add our decoder function into our promise chain so that we actually execute it on the API results. We'll also need to add a step to filter out any repositories that didn't convert correctly.

```javascript{9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25}
let getResults = query =>
    /*
     * This is similar to `open Json.Decode`, it allows the Promise functions
     * to be available within the parentheses
     */
    Js.Promise.(
      Fetch.fetch("https://api.github.com/search/repositories?q=" ++ query)
      |> then_(Fetch.Response.json)
      |> then_(json => decodeResults(json) |> resolve)
      |> then_(results =>
           results
           |> List.filter(optionalItem =>
                switch (optionalItem) {
                | Some(_) => true
                | None => false
                }
              )
            /* Turn our items out of option types into a regular record */
           |> List.map(item =>
                switch (item) {
                | Some(item) => item
                }
              )
           |> resolve
         )
    );
```


And that's it! Our JSON will now be available through the resolved promise as a valid Reason data structure&mdash;a `list` of `repository` records, to be exact. While the actual decoding function isn't too large all by itself, I found that when I was first jumping into Reason decoding JSON was extremely tricky because I wasn't familiar with it yet. Compared to JavaScript it can easily feel like a lot of verbosity just to get some data into your app. In our case it was only 3 keys per item, but imagine if you needed 20 keys, or if you had data nested further inside of objects. That said, the practice of sanitizing data when it comes into our apps is a good thing to do, and having to do this decoding step forces us to verify that the data is the way we expect it to be later on when we use it.

Speaking of using the data, we're coming down the home stretch on our data handling. All that's left to do is add the data to our component's state. Since we're gonna want to store it in state, we'll need to update our `state` type to reflect this new data.

```javascript{4}
type state = {
  input: string,
  isLoading: bool,
  results: list(repository),
}
```


We'll also likely see a compiler error that we need to update our `initialState` function since we changed the `state`. Let's just start off with an empty list.

```javascript
initialState: () => {input: "", isLoading: false, results: []},
```


Now we can actually update our component to store the new data in state. Let's create a new action called `UpdateResults` in our `action` type and add another branch to the `reducer` to handle that action.

While we could cram all the state updates in with our API-calling code, that could easily start to get convoluted and messy. Separating the state updates into a new action will help untangle the logic there a little bit.

The only thing we'll do in our API-calling part of the `reducer` is trigger another action with `self.send`, this time telling the component to update state with our new `UpdateResults` action and our decoded JSON data.

```javascript{3,10,17,18,19,20,21,22}
type action =
  | UpdateInput(string)
  | UpdateResults(list(repository))
  | Search;

/* later, inside `make` function */
reducer: (action, state) =>
    switch (action) {
    | UpdateInput(input) => ReasonReact.Update({...state, input})
    | UpdateResults(results) => ReasonReact.Update({...state, isLoading: false, results})
    | Search =>
      ReasonReact.UpdateWithSideEffects(
        {...state, isLoading: true},
        (
          self => {
            let value = self.state.input;
            let _ =
              Api.getResults(value)
              |> Js.Promise.then_(results => {
                   self.send(UpdateResults(results))
                   Js.Promise.resolve();
                 });
            ();
          }
        ),
      )
    },
```

Whew. Give yourself a pat on the back. You've successfully fetched the JSON and brought it into your component's state. This is why I personally like to build this GitHub search app when learning  a new framework or language&mdash;it's simple enough you don't spend weeks on a project, but complex enough that you get a feel for more difficult things like data handling and state management. Having complex decoding steps is actually fairly common for static compile-to-JavaScript languages like Reason&mdash;believe it or not Reason is *less verbose* at decoding JSON than some others.

The *final* thing to do for our component is display our repository results inside of `render`. Since we've already built the stateless `<Card />` component we can just hook it up to our data.

```javascript{13,14,15,16,17,18,19,20,21,22,23,24,25}
render: self =>
  <div>
    <form
      onSubmit={
        ev => {
          ReactEvent.Form.preventDefault(ev);
          self.send(Search);
        }
      }>
      /* form JSX */
    </form>
    <div>
      {
        self.state.isLoading ?
          ReasonReact.string("Loading...") :
          self.state.results
          /* Convert to list to an array for ReasonReact's type bindings */
          |> Array.of_list
          /* Map each array item to a <Card /> component */
          |> Array.map(({name, href, description}) =>
                <Card key={href} name href description />
              )
          /* Transform the array into a valid React node, similar to ReasonReact.string */
          |> ReasonReact.array
      }
    </div>
  </div>,
```

<Divider />

That's it for our intro to ReasonReact. Although this was a simple app with barebones styling, we've covered a ton of ground. We saw what a stateless component looks like in ReasonReact and how ReasonReact handles statefulness with reducer components. We also went through the ceremony of data fetching and normalization that comes along with bringing unsafe JSON into a type-safe world.

If you're interested in adding Reason to a side-project or moving parts of a codebase into Reason, you're in luck. Since Reason compiles to plain JavaScript files you can incrementally introduce ReasonReact to your codebase. This means you can skip the massive rewrite and start playing with this new technology in a non-invasive manner. Just compile your ReasonReact components down to JavaScript and import them from your JavaScript React components.

I hope that throughout this article you've enjoyed getting a feel for ReasonReact and the value that it can bring to some logic-heavy components. Or at the very least I hope that peeking into ReasonReact's approach to state management and data handling brought some new approaches you can bring back with you to JavaScript codebases. Reason might not be fully mature enough to go all-in on just yet but it seems like it's got a bright future ahead of it. Lastly, if you have any ideas or if you know of better ways to set up the components we wrote today, let me know&mdash;I'd love to hear! Feel free to follow me on [Medium](https://medium.com/@benjamin.d.johnson) or check out my [Twitter](https://mobile.twitter.com/benjamminj).

