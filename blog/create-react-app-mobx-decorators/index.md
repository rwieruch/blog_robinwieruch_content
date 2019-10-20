---
title: "MobX (with Decorators) in create-react-app"
description: "Everything you need to know about using MobX in a create-react-app with React. The article shows you all the different edge cases on how to activate JavaScript decorators, how to use MobX without decorators, and as bonus how to use MobX in Next.js. Afterward, you are prepared to setup your application with MobX and React.js ..."
date: "2017-10-10T13:50:46+02:00"
categories: ["React", "MobX", "JavaScript"]
keywords: ["create-react-app mobx decorators"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

MobX is used for state management in modern applications. Often it is applied in a React.js application, but it is not necessarily bound to React. In addition, it is a [valuable alternative to Redux](https://www.robinwieruch.de/redux-mobx/) as state management solution. If you are using [create-react-app](https://github.com/facebookincubator/create-react-app) as your application boilerplate, you most likely run into the questions of how to setup MobX and how to use [decorators](https://tc39.github.io/proposal-decorators/) in create-react-app. The article should give you the essential knowledge to use MobX without and with decorators in create-react-app.

# MobX in create-react-app without Decorators

Basically using MobX without decorators in create-react-app is straight forward. After scaffolding your application with create-react-app on the command line, you can install [mobx](https://github.com/mobxjs/mobx) and [mobx-react](https://github.com/mobxjs/mobx-react):

```javascript
npm install --save mobx mobx-react
```

Whereas the former is used as your state management solution, the latter is used to connect the state layer to your React view layer. Now you can use it to create state containers or, as in the following example, to leverage local component state instead of using React's local state:

```javascript
import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer }  from 'mobx-react';

class App extends Component {
  constructor() {
    super();

    extendObservable(this, {
      counter: 0,
    })
  }

  onIncrement = () => {
    this.counter++;
  }

  onDecrement = () => {
    this.counter--;
  }

  render() {
    return (
      <div>
        {this.counter}

        <button onClick={this.onIncrement} type="button">Increment</button>
        <button onClick={this.onDecrement} type="button">Decrement</button>
      </div>
    );
  }
}

export default observer(App);
```

Whereas the `extendObservable` makes sure to create an observable value, the `observer` makes sure that the `App` component reacts when an observable value changes. The reaction leads to a re-rendering of the component. After all, that would be all the essentials to use MobX without decorators in create-react-app.

# Alternative Boilerplate: create-react-app-mobx

There exist a boilerplate project on GitHub, [create-react-app-mobx](https://github.com/mobxjs/create-react-app-mobx), that is maintained by Michel Weststrate the creator of MobX. It has MobX installed in a create-react-app bootstrapped application. The following commands are the installation instructions for the command line:

```javascript
git clone git@github.com:mobxjs/create-react-app-mobx.git
cd create-react-app-mobx
npm install
npm start
```

After that, you should find the running application in your browser. Furthermore, the GitHub repository is providing a git patch commit that you can use to upgrade your plain create-react-app to use MobX.

# But what about Decorators?

Basically everything shown before demonstrates that MobX can be used without decorators at all. The [official MobX documentation](https://mobx.js.org/best/decorators.html) showcases it as well. If someone says you have to use decorators in MobX, it isn't true. You can use plain functions for it. So why using decorators?

**Advantages of using decorators:**

- minimizes boilerplate
- declarative
- easy to use and read
- popular when using MobX

**Disadvantages of using decorators:**

- not in native Javascript available, therefore needs transpiling (e.g. via Babel)
- unstable specification

MobX is not the only library using decorators. There are plenty of them and most of them provide a non decorator solution too. Then you can use both variations. In MobX, both alternatives look like the following:

```javascript
import React, { Component } from 'react';
import { observer } from 'mobx-react';

// non decorator usage

class App extends Component {
  ...
}

export default observer(App);

// decorator usage

@observer class App extends Component {
  ...
}

export default App;
```

The annotation on a variable definition with `@observer class App` is the same as `observer(App)` if App is defined. That way it is possible to compose several decorators onto one component with solutions such as compose from the [recompose](https://github.com/acdlite/recompose) library:

```javascript
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { compose } from 'recompose';

// non decorator usage

class App extends Component {
  render() {
    const { foo } = this.props;
    ...
  }
}

export default compose(
  observer,
  inject('foo')
)(App);

// decorator usage

@inject('foo') @observer
class App extends Component {
  render() {
    const { foo } = this.props;
    ...
  }
}

export default App;
```

So what about decorators in React and create-react-app?

# Decorators in create-react-app

The current situation is that the maintainers of create-react-app are holding decorators back until Babel supports them in a stable stage:

> *"Our position is simple: we add transforms that are either stable enough (like async/await) or heavily used by Facebook (like class properties). Only that lets us be confident in suggesting them, because if something changes in the standard, we’ll write and release a codemod to migrate away from them."* (related issues [1](https://github.com/facebookincubator/create-react-app/issues/411) & [2](https://github.com/facebookincubator/create-react-app/issues/214))

But what if you want to use decorators for your create-react-app + MobX application right now?

```javascript{5,7}
import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer }  from 'mobx-react';

@observer
class App extends Component {
  @observable counter = 0;

  onIncrement = () => {
    this.counter++;
  }

  onDecrement = () => {
    this.counter--;
  }

  render() {
    return (
      <div>
        {this.counter}

        <button onClick={this.onIncrement} type="button">Increment</button>
        <button onClick={this.onDecrement} type="button">Decrement</button>
      </div>
    );
  }
}

export default App;
```

Running this code in a plain create-react-app application will yield a `Unexpected token` error in the developer console. You would have to add decorators to your Babel configuration. However, create-react-app doesn't give you access to the Babel configuration. There is only one way to access it: ejecting.

**Basically there are four steps to use decorators in create-react-app:**

* type `npm run eject` on the command line, if you have bootstrapped your app with create-react-app
* install the necessary Babel plugin `npm install --save-dev @babel/plugin-proposal-decorators`
* add the following Babel configuration to your *package.json*

```javascript{2,3,4}
"babel": {
  "plugins": [
    "@babel/plugin-proposal-decorators"
  ],
  "presets": [
    "react-app"
  ]
},
```

* install mobx and mobx-react, if you didn't do it already `npm install --save mobx mobx-react`

Now you should be able to use the @ annotation in create-react-app. The previous example has shown how to use decorators for MobX's local state management in a React component.

# How to avoid eject when using Decorators

There is one [fork with custom-react-scripts](https://github.com/kitze/custom-react-scripts) of create-react-app on GitHub where you can avoid ejecting your application. You would only have to follow the instructions in the GitHub repository to set it up. I will not write them down here, because they might change in the future.

But the fork of create-react-app has one drawback. Whereas create-react-app was designed to give you a simple to use, powerful yet zero-configuration boilerplate project for React, the fork of it comes with more complex configurations. Ultimately it's up to you to make the decision. It is a choice between ejecting your puristic create-react-app to only add decorators for your use case or to use the fork of create-react-app with custom-react-scripts to add overhaul more flexibility to configure your project.

# MobX and Decorators in Next.js

The article is mainly about MobX with and without decorators in create-react-app. But what about its alternative Next.js for server-side rendered React applications? Fortunately there exists [one sample project](https://github.com/zeit/next.js/tree/master/examples/with-mobx) that already demonstrates how to use MobX with decorators in a Next.js application.

In addition, you have access to the .babelrc file to configure Babel in your Next.js application. In a newly bootstrapped Next.js application, you would enable MobX with decorators with these two steps. First, install the dependencies of MobX and the decorator transpilation to your project:

```javascript
npm install --save mobx mobx-react
npm install --save-dev babel-plugin-transform-decorators-legacy
```

Second, add the decorator support to your *.babelrc* file at the root of the project:

```javascript
{
  "presets": [
    "next/babel"
  ],
  "plugins": [
    "transform-decorators-legacy"
  ]
}
```

After all, the choice is again up to you. You can either clone the Next.js with MobX example project or add MobX with or without decorators on your own to it.

<Divider />

After showing all these different alternatives, using MobX with or without decorators in a plain React, a create-react-app or Next.js application, you have no excuse anymnore to give MobX as alternative to Redux a shot. Try it in your next side project.
