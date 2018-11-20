+++
title = "Reason and React Tutorial" TODO
description = "TODO"
+++

## Intro & PreRequisites

_AKA what this article isn't and what it is_

First off, this tutorial assumes that you have some knowledge of how React works. If you're just getting started to React, I'd highly recommend reading through "[The Road to learn React](https://roadtoreact.com/)" before trying to dive into ReasonReact. After all, ReasonReact is an abstraction _on top of React_!

Kinda reminds me of this Kyle Simpson quote from "[You Don't Know JS: Async & Performance](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/README.md)"

<!-- TODO -- see about quoting rules -->

> \[It's\] impossible to effectively use any abstraction if you don't understand what it's abstracting, and why.

<!-- TODO -- work this section. -->

In addition, another prerequisite this article assumes is that you know a little bit about Reason. If you're just getting started with Reason I'd recommend having the [Reason docs](https://reasonml.github.io/docs/en/what-and-why) up as you read this article, just in case you need any refreshers on the syntax. I also have an [introductory article](https://blog.logrocket.com/what-makes-reasonml-so-great-c2c2fc215ccb) to Reason that may be a good introduction if you're new to Reason.

## Getting Started

For this tutorial, we'll be building a Github Search app. This app will have a search bar at the top that takes any topic your heart desires. Then, when the search entry is submitted, we'll query the GitHub REST API for a list of repositories matching that topic.

I find it helpful to build an app of this size whenever I'm learnign something new&mdash;in fact, I often use _this exact app_ to learn a new technology or framework. Similar to the way people make counters, to-do lists, or Hacker News clones, a GitHub search app is just complex enough that we'll have to do things like state-management and API calls, yet simple enough to build in a single tutorial.

If you're looking to follow along with the source code you can check out the repo [here](https://github.com/benjamminj/reason-react-tutorial). To code along check out the `getting-started` branch — this will only contain the boilerplate to get a "hello world" on the screen.

```bash
git clone https://github.com/benjamminj/reason-react-tutorial.git

cd reason-react-tutorial

git checkout getting-started

npm install
npm run dev
```

That should start a simple dev server with a very plain "Hello World" on the screen.

## Making our first stateless ReasonReact component

First off, let's make a stateless component. We're gonna create one of the cards that contain the list results. Let's start off by making a new file in the `src` directory named `Card.re`.

The first thing we have to do for a ReasonReact component is create the component "template". Conceptually you can think of this as the `React.Component` that you would extend when creating a class component. However, ReasonReact doesn't use classes at all, these templates give us a record (similar to a JS object, but immutable) that we can override with our custom component code!

To make the component template we'll start with this line to generate the component template. Passing "Card" as the argument applies our component's name.

```reason
let component = ReasonReact.statelessComponent("Card");
```

Now that we've got a component template with all the defaults, let's define our `render` function & actually make our component.

To create the component, we need to define a function with the name of `make`. This `make` function takes our component's **props** as labelled arguments (a labelled argument in Reason is an argument starting with a `~`).

For our use cases, we'll have our `Card` component use `name`, `description` and an `href` props. This will give us enough to see what repos match our search as well as include links to them!

```reason
let make = (~name, ~description, ~href, _children) => {};
```

In addition, the `make` function _has to take a `children` argument as its' last argument_, even if the component doesn't do anything with its' children! This is to preserve the type-safety of ReasonReact so that it can do all of its' compile-time magic later on. If you don't plan on using the `children` prop, just prepend it with an underscore (`_children`) to tell the compiler not to throw a warning.

Now that we've got an empty `make` function, what does it return? ReasonReact expects `make` to return a record with a ton of internal keys and lifecycles hooks. Fortunately, we created a template! Let's spread the template into our `make` function's return value.

```reason
let make = (~name, ~description, ~href, _children) => {
  ...component,
}
```

It's also worth noting that if you're from JavaScript land, curly braces after an arrow in Reason don't behave like curly braces in JavaScript. In Reason, the curly braces after the arrow mean we're actually returning a record, as opposed to returning `undefined` in JavaScript.

Now that we've spread all of our template into `make`, let's add our own custom `render` to the return value of `make`. Let's take a quick look at the JSX first.

```reason
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

JSX is actually built-in to Reason at the language level, however, you might notice a few differences from the JSX you're used to.

First off, Reason JSX supports _punning_ props&mdash;when the prop name matches the variable name that's being passed into the component, you can just write the prop once instead of twice! So since we're already defining an `href` argument to our `make` function we don't need to write `make={make}` when applying it to our `<a>` tag.

```reason
<a href target="_blank" rel="noopener noreferrer">
  {ReasonReact.string(description)}
</a>
```

In addition, Reason JSX doesn't require prop assignments to be inside curly braces. So instead of `href={link}` you could do `href=link` inside of your JSX.

However, there is one really funny feeling difference from React in JavaScript. What's all this `{ReasonReact.string(description)` business? This is mainly to do with type safety and being in a compiled language. Since each component's `render` _has to return a React element_ ReasonReact provides a series of utility functions to convert strings, arrays, and null into the correct type for ReasonReact to use it correctly. It does feel a little awkward at first, especially coming from regular JSX. However, I will say the awkwardness does wear off a little bit, especially when you realize the absolute type safetly Reason is adding to your app.

If it still bugs you having to write `{ReasonReact.string(description)`, you can create a `<Str string={description} />` which just wraps `ReasonReact.string()`. This might feel a little less awkward and boils down to essentially the same thing.

We're done! This is what our completed `<Card />` component looks like.

```reason
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

Let's integrate it into our app so we can see it in action. If you cloned the repo check out `src/App.re`. You'll notice it's pretty bare.

```reason
let component = ReasonReact.statelessComponent("App");

let make = _children => {
  ...component,
  render: _self => <div> {ReasonReact.string("Hello world!")} </div>,
};
```

Let's replace the "Hello world!" text with our `<Card />` component. We'll have to add some fake props since we haven't added real data just yet (don't worry, we'll get there soon).

```reason
let component = ReasonReact.statelessComponent("App");

let make = _children => {
  ...component,
  render: _self =>
    <div>
      <Card name="reason" href="" description="This is cool" />
    </div>,
};
```

<!-- TODO work this paragraph -->

We also didn't need to actually _import_ our `<Card>` because every file in Reason is automatically a module in the global namespace. This takes a little getting used to, but I've found that the Reason/OCaml module system can be decently elegant. Not having to explicitly define an import path makes it easy to move files around or update our folder structure later on.

When we check out the page we can see that our card is indeed on the page correctly, although it's a little bare.

## Adding some CSS

Let's add some styles to our `<Card />` before we go any further. Any real app we build is gonna have styles, so I would be remiss if I skipped over any styling solutions when working with ReasonReact.

There's a few methods of styling in Reason, although I have yet to see a single method "win" as "the official way" to do styling just yet.

As a simple styling solution we can use inline styles. ReasonReact includes a binding that maps to the style object that React uses under the hood. This is what an inline style declaration woul look like.

```reason
/* Inside of `Card.re`*/

let make = (~name, ~description, ~href, _children) => {
  ...component,
  render: _self =>
    <div
      TODO -- highlight
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

`ReactDOMRe.Style.make` is a function that takes a number of optional labelled arguments, each argument mapping to a CSS property. The last argument to `ReactDOMRe.Style.make` is a value called _unit_ `()`. This is a pretty common convention in the Reason/OCaml community for managing large amounts of labelled optional arguments, but it looks a little strange if you've never seen it before.

Basically, the reason that unit has to be the final argument is to signal when to stop currying the function. Since Reason function automatically curry their arguments, calling `ReactDOMRe.Style.make(~padding="1rem");` returns _a new function_ that we could pass the other CSS properties into. Currying functions like this lets us progressively pass values into our styles throughout our application.

If we wanted to pull our styles outside of `render`, I've found it helpful to use a _[local module](https://reasonml.github.io/docs/en/module)_. This might help add some readability to our `render` if styles are getting a little long.

```reason
/* Inside of `Card.re` */
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

Another community solution to styling is `[bs-css](https://github.com/SentiaAnalytics/bs-css)`, which is a typed binding sitting on top of [emotion](https://emotion.sh/). If we wanted to use `bs-css` first we would need to install it.

```bash
npm install --save bs-css
```

And then we will need to add `bs-css` to the `"bs-dependencies"` field in our `bsconfig.json` file (if you cloned the sample repo it will be right there alongside `package.json`).

```json
"bs-dependencies": ["reason-react", "bs-css"],
```

Now we can go convert our styles to use `bs-css`, which will emit an emotion-generated classname. Using `bs-css` gives a little more type safety to our css styles, if that's something that you're looking for.

```reason
/* Inside `Card.re` */

module Styles = {
  let card = style([
    border(px(1), `solid, hex("898989")),
    borderRadius(px(4)),
    padding(rem(1.0))
  ])
};

/* Later, in our `render` JSX */
<div className={Styles.card}>
```

Lastly, there's a lot of other ways to manage styles in ReasonReact! These are only two of prevailing methods. I've personally used a [custom binding](https://github.com/benjamminj/solitaire/blob/master/src/__packages__/emotion.re) to Emotion that provides a little less type safety for style rules, but feels a little closer to the tagged template literal API.

There's also a really promising project for a [_PPX transform_ for CSS](https://github.com/astrada/ppx_bs_css). You can kinda think of a PPX transform as a Babel plugin for the Reason/OCaml language. This would allow something much closer to plain ol' CSS, without sacrificing any type-checking power.

For now, let's make do with `bs-css` as a styling solution, but it's always good to know that other options exist if `bs-css` isn't your cup of tea.

## Stateful Component

Now, let's build the search form. We're gonna do this directly inside of `App.re` for simplicity's sake, so we'll be converting `<App />` from a stateless component to a stateful component.

ReasonReact calls its' binding around stateful components a *reducer component*. In my opinion, reducer components showcase the benefit of adding the battleproof type-safety of Reason/OCaml to our React code. It's easier to be a little more comfortable going without type-safety when you're writing a simple card component, but once you start adding business logic to your components that type-safety helps protect us from making silly mistakes.

As we dive into statefulness with reducer components I find it helpful to think of [Redux]() reducers and how they work. You'll see that reducer components feel very similar to Redux, except that they're contained within the component itself rather carrying the overhead of a global store. If you're unfamiliar with Redux or want a refresher on how it works, check out ["Tips to learn React + Redux in 2018"](https://www.robinwieruch.de/tips-to-learn-react-redux/).

The first thing that we'll need to do to turn our `<App />` component into a reducer component is create a couple type declarations. The first one we'll need to create is a `state` type to describe what our component's state looks like.

```reason
type state = {
  input: string,
  loading: bool,
}
```

The second type we'll need to make is an `action` type. Similar to a Redux action, this will describe the types of state updates we can run. We'll define the `action` type as a [variant](TODO link) with all of our possible actions.

For now, we'll have two possible action to update our component's state, `UpdateInput` and `Search`. `UpdateInput` will represent when the user types into the search bar, passing the value of the `input` field as an argument. `Search` will represent when the search query is actually submitted and we hit the GitHub API to grab the search results.

```reason
type action =
  | UpdateInput(string)
  | Search
```

Then we need to switch our component template to create a reducer component template. To do that we'll need to change `ReasonReact.statelessComponent("App")` to use the `reducerComponent` template. It's not a big change, `reducerComponent` takes the exact same argument as `statelessComponent`: the name we want our component to have.

```reason
let component = ReasonReact.reducerComponent("App");
```

Now we're using the reducer component template! We're not quite done converting our stateless component just yet though. For a reducer component, we do need to provide a couple extra keys to our component record in addition to `render`.

The first thing we'll need to add is an `initialState` key. This key has to be a function and must return the same type as the `state` that we defined earlier.

```reason
let make = _children => {
  ...component,
  TODO -- highlight line
  initialState: () => {input: "", loading: false},
  render: ...
};
```

<!-- TODO -- fact-check on update type -->
The second thing we'll need to add is a `reducer` function. This works exactly the same as a Redux reducer&mdash;it takes an `action` and `state` as its' arguments and returns an updated state. Technically it returns a special `update` type that manages the `setState` that you would normally do. However, the argument to the `update` type is the next state that you would like your component to have.

Inside of our reducer, we'll use [pattern-matching](TODO link) to declare our state updates for each action. The pattern-matching syntax looks a little bit like a JavaScript `switch` statement. However, unlike a `switch` statement, Reason's pattern-matching is&mdash;you guessed it&mdash;100% type safe. The compiler will even warn us if we forgot to declare a state update for one of our actions!

```reason
let make = _children => {
  ...component,
  initialState: () => {input: "", loading: false},
  TODO -- highlight lines
  reducer: (action, state) =>
    switch (action) {
    | UpdateInput(newInput) => ReasonReact.Update({...state, input: newInput})
    | Search => ReasonReact.Update({...state, loading: true})
    },
  render: ...
};
```

The last thing left to do to convert our component is to modify our `render` function to use the state that we just added. Since this step is a little more involved, we'll make sure to do it in stages.

Let's start by replacing our `<Card />` with a form containing an input and a submit button. The input field will be hooked up our `state.input`. Don't worry about the event handlers just yet, we'll get there! For now, let's just get the elements hooked up to state correctly.

```reason
render: self => {
  <div>
    <form>
      <label htmlFor="search"> {ReasonReact.string("Search")} </label>
      <input id="search" name="search " value={self.state.input} />
      <button type_="submit">
        {ReasonReact.string("Submit Search")}
      </button>
    </form>
  </div>
}
```

A couple things to note in this example. Since Reason doesn't come with the concept of `this` the way JavaScript does, we'll have to use the `self` argument to `render` to access our component's state. Think of `self` as your workaround for `this`, without all of the baggage and confusion about context.

Another little "gotcha" is the `type_` attribute on the `<button>` tag. Since `type` is a keyword in Reason the Reason team has built in a workaround for variables (and props!) that match keywords: just append an underscore at the end and you're good to go!

This is all cool and all, but our form isn't really going to be much use if we can't update or submit it! Let's add a couple event handlers to make our form work as intended. For readability's sake, let's define the handlers *outside of render* as plain functions. We can just put them up above the `make` function.

The first event handler we'll add is on the `input` field.

TODO form submit handler.

TODO loading state on/off

## Data Fetching

## Gluing it all together (aka Conclusion)
