+++
title = "The SoundCloud Client in React + Redux"
description = "Build a React + Redux SoundCloud Client. It is a huge tutorial where you build an example real world application. Learn React JS and Redux along the way. Consume the SoundCloud API, login and interact..."
date = "2016-06-11T13:50:46+02:00"
tags = ["React", "Redux", "JavaScript"]
categories = ["React", "Redux", "JavaScript"]
keywords = ["react redux"]
news_keywords = ["react redux"]
hashtag = "#ReactJs"
card = "img/posts/the-soundcloud-client-in-react-redux/banner_640.jpg"
banner = "img/posts/the-soundcloud-client-in-react-redux/banner.jpg"
contribute = "the-soundcloud-client-in-react-redux.md"
headline = "The SoundCloud Client in React + Redux"

summary = "At the end of this tutorial you can expect to have a running React + Redux app, which consumes the SoundCloud API. You will be able to login with your SoundCloud account, list your latest tracks and listen to them within the browser. Additionally you will learn a lot about tooling with Webpack and Babel."
+++

{{% sponsorship %}}

{{% pin_it_image "react redux" "img/posts/the-soundcloud-client-in-react-redux/banner.jpg" "is-src-set" %}}

In the beginning of 2016 it was time for me to deep dive into the ReactJs world. I read tons of articles about React and its environment, especially Redux, so far. Several of my colleagues used it in side projects and on a theoretical level I could participate in the discussions.

In my {{% a_blank "company" "https://www.small-improvements.com/?ref=robinwieruch.de" %}} we relied heavily on Angular 1 at this point. Since we are using it in a quite large code base, we know a lot about its flaws. Back in 2015 we already adopted our own flux architecture in the Angular world with the usage of stores and an unidirectional data flow. We were highly aware of the change coming with the React environment.

Again in the early days of 2016 I wanted to see this hyped paradigm shift in its natural environment (React and its flux successor Redux) with a hands on side project.

It took me some weeks to implement the {{% a_blank "SoundCloud Client FaveSound" "http://www.favesound.de/" %}}. Being both a passionate SoundCloud {{% a_blank "consumer and producer" "https://soundcloud.com/schlenkermitturnbeutel" %}}, it felt compelling for me to do my own SoundCloud client in React + Redux.

Professionally I grew with the code base, but also got an entry point into the open source community by providing a {{% a_blank "larger code base example for beginners" "https://github.com/rwieruch/favesound-redux" %}} in the React + Redux world. Since I made this great experience, I wanted to give the community this hands on tutorial, which will guide people to get started in React + Redux with a compelling real world application - a SoundCloud client.

At the end of this tutorial you can expect to have a running React + Redux app, which consumes the SoundCloud API ([What's an API?](https://www.robinwieruch.de/what-is-an-api-javascript/)). You will be able to login with your SoundCloud account, list your latest tracks and listen to them within the browser. Additionally you will learn a lot about tooling with Webpack and Babel.

In the future I am going to write some [smaller tutorials](#extensions) based on this one. They will simply build on top of this project and help you to get started in various topics. So keep an eye on this tutorial, follow me on {{% a_blank "Twitter" "https://twitter.com/rwieruch" %}} or {{% a_blank "GitHub" "https://github.com/rwieruch" %}} or simply star the {{% a_blank "repository" "https://github.com/rwieruch/react-redux-soundcloud" %}} to get updates.

{{% chapter_header "Table of Contents" "toc" %}}

* [A project from scratch](#aProjectFromScratch)
* [Let’s get started](#getStarted)
* [Test Setup](#testSetup)
* [Redux](#redux)
  * [Redux Roundtrip](#reduxLoop)
  * [Dispatching an Action](#dispatchingAnAction)
  * [Constant Action Types](#constantActionTypes)
  * [Action Creators](#actionCreators)
  * [Reducers](#reducers)
  * [Store with Global State](#storeWithGlobalState)
* [Connect Redux and React](#connectReduxReact)
  * [Provider](#provider)
  * [Connect](#connect)
  * [Container and Presenter Component](#containerAndPresenterComponent)
* [SoundCloud App](#soundCloudApp)
  * [Registration](#registration)
  * [React Router](#reactRouter)
  * [Authentication](#authentication)
  * [Redux Thunk](#reduxThunk)
  * [Set Me](#setMe)
  * [Fetch Tracks](#fetchTracks)
* [SoundCloud Player](#soundCloudPlayer)
  * [Another Redux Roundtrip](#newReduxLoop)
  * [Listen to the music!](#listenToTheMusic)
* [What's next?](#whatsNext)
* [Troubleshoot](#troubleshoot)
* [Final Thoughts](#finalThoughts)
* [Contribute](#contribution)

{{% chapter_header "Extensions" "extensions" %}}

A list of extensions which can be applied on top of the SoundCloud Client with React + Redux tutorial afterwards.

* [React ESLint: Code Style like Airbnb in React](https://www.robinwieruch.de/the-soundcloud-client-in-react-redux-eslint)
* [Flow: Type Checking with Flow in React + Redux](https://www.robinwieruch.de/the-soundcloud-client-in-react-redux-flow)
* [Redux Ducks: Restructure your Redux App with Ducks](https://www.robinwieruch.de/the-soundcloud-client-in-react-redux-ducks)
* [Redux Normalizr: Improve your State Management](https://www.robinwieruch.de/the-soundcloud-client-in-react-redux-normalizr)
* [Redux Observable RxJS: Going Epic with Reactive Programming](https://www.robinwieruch.de/redux-observable-rxjs/)
* [MobX React: Simplified State Management in React](https://www.robinwieruch.de/mobx-react/)

{{% chapter_header "A project from scratch" "aProjectFromScratch" %}}

I must say I learned a lot from implementing a project from scratch. It makes totally sense to set up your side project from zero to one without having a boilerplate project. You will learn tons of stuff not only about React + Redux, but also about JavaScript in general and its environment. This tutorial will be learning by doing by understanding each step, like it was for me when I did this whole project, with some helpful explanations. After you have finished this, you should be able to set up your own React + Redux side project to provide another real world project for the community.

The whole tutorial contains a lot of information. I wouldn't suggest to do everything at once when you are still learning React + Redux. Make some breaks between the chapters. Once you build your first React component, don't continue with Redux immediately. Experiment a bit with the code, do some internal state management with React, before you use Redux for state management. Take your time.

Additionally I can recommend to read *The Road to learn React* before you dive into Redux. It teaches React by building a Hacker News App without configuration, tooling and Redux. If you are new to React, do yourself a favour and learn React first.

{{% package_box "The Road to learn React" "Build a Hacker News App along the way. No setup configuration. No tooling. No Redux. Plain React in 200+ pages of learning material. Pay what you want like <strong>50.000+ readers</strong>." "Get the Book" "img/page/cover.png" "https://roadtoreact.com/" %}}

{{% chapter_header "Let’s get started" "getStarted" %}}

Before you can write your first React component, you have to install Webpack and Babel. I extracted the React setup into an own article to make it reusable and maintainable for the future. You can follow the [instructions in the article](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/) to setup your project. After that you can come back to this tutorial and continue here to write your first React component.

Is your project set up? Then let's render some data. It makes sense to render a list of tracks, since we are writing a SoundCloud application.

*src/index.js*

{{< highlight javascript "hl_lines=4 5 6 7 8 9 10 11 14 15 16 17 18 19 20" >}}
import React from 'react';
import ReactDOM from 'react-dom';

const tracks = [
  {
    title: 'Some track'
  },
  {
    title: 'Some other track'
  }
];

ReactDOM.render(
  <div>
    {
      tracks.map((track) => {
        return <div className="track">{track.title}</div>;
      })
    }
  </div>,
  document.getElementById('app')
);

module.hot.accept();
{{< /highlight >}}

The {{% a_blank "JSX syntax" "https://facebook.github.io/react/docs/jsx-in-depth.html" %}} takes getting used to. Basically we can use JavaScript in HTML. In our code snippet we map over a list of tracks and return a HTML node with track properties.

The console output gives the hint of a missing key property. {{% a_blank "React elements need that key property to uniquely identify themselves in a list of elements" "https://facebook.github.io/react/docs/lists-and-keys.html" %}}. Let’s fix this, save the file and see how hot reloading kicks in and refreshes our page!

{{< highlight javascript "hl_lines=16 17" >}}
import React from 'react';
import ReactDOM from 'react-dom';

const tracks = [
  {
    title: 'Some track'
  },
  {
    title: 'Some other track'
  }
];

ReactDOM.render(
  <div>
    {
      tracks.map((track, key) => {
        return <div className="track" key={key}>{track.title}</div>;
      })
    }
  </div>,
  document.getElementById('app')
);
{{< /highlight >}}

Now it's time to write our first real component. We can extract the rendered list of tracks in an own component, because the *src/index.js* should be only seen as entry point to the React application.

*src/index.js*

{{< highlight javascript "hl_lines=3 15" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import Stream from './components/Stream';

const tracks = [
  {
    title: 'Some track'
  },
  {
    title: 'Some other track'
  }
];

ReactDOM.render(
  <Stream tracks={tracks} />,
  document.getElementById('app')
);

module.hot.accept();
{{< /highlight >}}

We import a Stream component which gets a list of tracks as props. Moreover we use that component as first parameter for `ReactDOM.render`. Now let's implement the Stream component.

*From src folder:*

{{< highlight javascript >}}
mkdir components
cd components
touch Stream.js
{{< /highlight >}}

Our src folder is getting its first structure. We will organise our files by a technical separation - starting with a components folder, but later on adding more folders aside.

> While it's good to have a technical separation of concerns in an early project, it may not scale for larger applications. You might want to consider to {{% a_blank "organise your app by features with a growing code base" "https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1" %}}.

Let’s give our recent created file some content.

*src/components/Stream.js*

{{< highlight javascript >}}
import React from 'react';

class Stream extends React.Component {

  render() {
    const { tracks = [] } = this.props;

    return (
      <div>
        {
          tracks.map((track, key) => {
            return <div className="track" key={key}>{track.title}</div>;
          })
        }
      </div>
    );
  }

}

export default Stream;
{{< /highlight >}}

The Stream component is a React ES6 class component. The render shorthand function returns the element. Additionally we retrieve the props from `this` by using ES6 destructuring and providing a default empty list.

React ES6 class components provide a slim API. These lifecycle methods can be used to hook into the component lifecycle. For instance you can do things before a component gets rendered with `componentWillMount()` or when it updated with `componentDidUpdate()`. You can read about all component {{% a_blank "lifecycle methods" "https://facebook.github.io/react/docs/react-component.html" %}}.

{{< highlight javascript >}}
class Stream extends React.Component {
  render() {
    ...
  }

  componentWillMount() {
    // do things
  }

  componentDidUpdate() {
    // do things
  }
}
{{< /highlight >}}

ES6 class components can have internal component state. Imagine you could like a track. You would have to save the state whether a track is liked or not liked. I will demonstrate how you can achieve it.

{{< highlight javascript "hl_lines=5 6 7 8 17 20 21 22 24" >}}
import React from 'react';

class Stream extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { tracks = [] } = this.props;

    return (
      <div>
        {
          tracks.map((track, key) => {
            return (
              <div className="track" key={key}>
                {track.title}
                <button onClick={() => this.setState({ [key]: !this.state[key] })} type="button">
                  { this.state[key] ? 'Dislike' : 'Like' }
                </button>
              </div>
            );
          })
        }
      </div>
    );
  }

}

export default Stream;
{{< /highlight >}}

You would need a contructor to setup the initial internal component state. Afterwards you can use `setState()` to modify the state and `this.state` to get the state. We modify the state in the `onClick` handler and get the state to show a button label.

Let's keep the state out of our component for the sake of simplicity.

*src/components/Stream.js*

{{< highlight javascript >}}
import React from 'react';

class Stream extends React.Component {

  render() {
    const { tracks = [] } = this.props;

    return (
      <div>
        {
          tracks.map((track, key) => {
            return <div className="track" key={key}>{track.title}</div>;
          })
        }
      </div>
    );
  }

}

export default Stream;
{{< /highlight >}}

Since we don't need internal component state nor lifecycle methods, we can refactor our ES6 class component to a {{% a_blank "stateless functional component" "https://facebook.github.io/react/docs/components-and-props.html" %}}.

*src/components/Stream.js*

{{< highlight javascript >}}
import React from 'react';

function Stream({ tracks = [] }) {
  return (
    <div>
      {
        tracks.map((track, key) => {
          return <div className="track" key={key}>{track.title}</div>;
        })
      }
    </div>
  );
}

export default Stream;
{{< /highlight >}}

It's called stateless functional component, because it only gets an input and generates an output. There are no side effects happening (functional) and our component doesn’t know internal state at all (stateless). It's only a function which gets a state and returns a view: `(State) => View`.

You can use ES6 class components whenever you need component lifecycle methods or internal component state. If that's not the case, use functional stateless components.

*Folder structure:*

{{< highlight javascript >}}
- dist
-- index.html
- node_modules
- src
-- components
--- Stream.js
-- index.js
- package.json
- webpack.config.js
{{< /highlight >}}

It’s done. We have written our first React code!

A lot of things already happened during the last chapters. Let’s summarise these with some notes:

* we use webpack + webpack-dev-server for bundling, building and serving our app
* we use Babel
  * to write in ES6 syntax
  * to have .js rather than .jsx files
* the src/index.js file is used by Webpack as entry point to bundle all of its used imports in one file named bundle.js
* bundle.js is used in dist/index.html
* dist/index.html provides us an identifier as entry point for our React root component
* we set up our first React hook via the id attribute in src/index.js
* we implemented our first component as stateless functional component src/components/Stream.js

> You may want to experiment a bit more with React before you dive into Redux. Build some more ES6 class and functional stateless components. Additionally use lifecycle methods and internal component state to get used to it. Only then you will see the benefits of using Redux for state management.

{{% read_more "The learning curve for state management in React" "https://www.robinwieruch.de/redux-mobx-confusion/" %}}

{{% chapter_header "Test Setup" "testSetup" %}}

I want to show you a simple setup to test your React components. I will do this by testing the Stream component, but later on I will not go any deeper into the topic of testing.

We will use {{% a_blank "mocha" "https://github.com/mochajs/mocha" %}} as test framework, {{% a_blank "chai" "https://github.com/chaijs/chai" %}} as assertion library and {{% a_blank "jsdom" "https://github.com/tmpvar/jsdom" %}} to provide us with a pure JavaScript DOM implementation which runs in node.

*From root folder:*

{{< highlight javascript >}}
npm install --save-dev mocha chai jsdom
{{< /highlight >}}

Moreover we need a test setup file for some more configuration especially for our virtual DOM setup.

*From root folder:*

{{< highlight javascript >}}
mkdir test
cd test
touch setup.js
{{< /highlight >}}

*test/setup.js*

{{< highlight javascript >}}
import React from 'react';
import { expect } from 'chai';
import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

global.React = React;
global.expect = expect;
{{< /highlight >}}

Essentially we are exposing globally a jsdom generated document and window object, which can be used by React during tests. Additionally we need to expose all properties from the window object that our running tests later on can use them. Last but not least we are giving global access to the objects React and expect. It helps us that we don’t have to import each of them in our tests.

In package.json we will have to add a new script to run our tests which respects Babel, uses mocha as test framework, uses our previously written *test/setup.js* file and traverses through all of our files within the *src* folder with a *spec.js* suffix.

*package.json*

{{< highlight javascript "hl_lines=4" >}}
...
  "scripts": {
    "start": "webpack-dev-server --progress --colors --hot --config ./webpack.config.js",
    "test": "mocha --compilers js:babel-core/register --require ./test/setup.js 'src/**/*spec.js'"
  },
...
{{< /highlight >}}

Additionally there are some more neat libraries to help us with React component tests. {{% a_blank "Enzyme" "https://github.com/airbnb/enzyme" %}} by Airbnb is a library to test React components. It relies on react-addons-test-utils and react-dom (the latter we already installed via npm).

> {{% a_blank "Jest" "https://facebook.github.io/jest/docs/tutorial-react.html" %}} can be used alone or in combination with enzyme to test React components. It's the official library by Facebook.

*From root folder:*

{{< highlight javascript >}}
npm install --save-dev react-addons-test-utils enzyme
{{< /highlight >}}

Now we are set to write our first component test.

*From components folder:*

{{< highlight javascript >}}
touch Stream.spec.js
{{< /highlight >}}

*src/components/Stream.spec.js*

{{< highlight javascript >}}
import Stream from './Stream';
import { shallow } from 'enzyme';

describe('Stream', () => {

  const props = {
    tracks: [{ title: 'x' }, { title: 'y' }],
  };

  it('shows two elements', () => {
    const element = shallow(<Stream { ...props } />);

    expect(element.find('.track')).to.have.length(2);
  });

});
{{< /highlight >}}

Here we are serving our Stream component with an array of two tracks. As we know both of these tracks should get rendered. The expect assertion checks whether we are rendering two DOM elements with the class track. When we run our tests, they should pass.

*From root folder:*

{{< highlight javascript >}}
npm test
{{< /highlight >}}

Moreover we can enhance our package.json scripts collection by a test:watch script.

*package.json*

{{< highlight javascript "hl_lines=5" >}}
...
  "scripts": {
    "start": "webpack-dev-server --progress --colors --hot --config ./webpack.config.js",
    "test": "mocha --compilers js:babel-core/register --require ./test/setup.js ‘src/**/*spec.js’”,
    "test:watch": "npm run test -- --watch"
  },
...
{{< /highlight >}}

By running the script we can see our tests executed every time we change something in our source code.

*From root folder:*

{{< highlight javascript >}}
npm run test:watch
{{< /highlight >}}

*Folder structure:*

{{< highlight javascript >}}
- dist
-- index.html
- node_modules
- src
-- components
--- Stream.js
--- Stream.spec.js
-- index.js
- test
-- setup.js
- package.json
- webpack.config.js
{{< /highlight >}}

We won't create anymore tests during this tutorial. As exercise feel free to add more tests during the next chapters!

{{% chapter_header "Redux" "redux" %}}

{{% a_blank "Redux" "https://github.com/reactjs/redux" %}} describes itself as predictable state container for JS apps. Most of the time you will see Redux coupled with React used in client side applications. But it's far more than that. Like JavaScript itself is spreading on server side applications or IoT applications, Redux can be used everywhere to have a predictable state container. You will see that Redux is not strictly coupled to React, because it has its own module, while you can install another module to {{% a_blank "connect it to the React world" "https://github.com/reactjs/react-redux" %}}. There exist modules to {{% a_blank "connect Redux to other frameworks" "https://github.com/angular-redux/ng-redux" %}} as well. Moreover the ecosystem around Redux itself is huge. Once you dive into it, you can learn tons of new stuff. Most of the time it is not only just another library: You have to look behind the facade to grasp which problem it will solve for you. Only then you should use it! When you don’t run into that problem, don’t use it. But be curious what is out there and how people get creative in that ecosystem!

At this point I want to show some respect to {{% a_blank "Dan Abramov" "https://twitter.com/dan_abramov" %}}, the inventor of Redux, who is not only providing us with a simple yet mature library to control our state, but also showing a huge contribution in the open source community on a daily basis. Watch his talk from React Europe 2016 where he speaks about {{% a_blank "the journey of Redux" "https://www.youtube.com/watch?v=uvAXVMwHJXU&amp;index=1&amp;list=PLCC436JpVnK09bZeayg-KeLuHfHgc-tDa" %}} and what made Redux successful.

{{% sub_chapter_header "Redux Roundtrip" "reduxLoop" %}}

I call it the Redux Roundtrip, because it encourages you to use a unidirectional data flow. The Redux Roundtrip evolved from the {{% a_blank "flux architecture" "https://facebook.github.io/flux/docs/actions-and-the-dispatcher.html" %}}. Basically you trigger an action in a component, it could be a button, someone listens to that action, uses the payload of that action, and generates a new global state object which gets provided to all components. The components can update and the roundtrip is finished.

Let’s get started with Redux by implementing our first roundtrip!

*From root folder:*

{{< highlight javascript >}}
npm install --save redux
{{< /highlight >}}

{{% sub_chapter_header "Dispatching an Action" "dispatchingAnAction" %}}

Let’s dispatch our first action and get some explanation afterwards.

*src/index.js*

{{< highlight javascript "hl_lines=3 4 16 17 20" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './stores/configureStore';
import * as actions from './actions';
import Stream from './components/Stream';

const tracks = [
  {
    title: 'Some track'
  },
  {
    title: 'Some other track'
  }
];

const store = configureStore();
store.dispatch(actions.setTracks(tracks));

ReactDOM.render(
  <Stream />,
  document.getElementById('app')
);

module.hot.accept();
{{< /highlight >}}

As you can see we initialise a store object with some imported function we didn’t define yet. The store is a singleton Redux object and holds our global state object. Moreover it is possible to use a lightweight store API to dispatch an action, get the state of the store or subscribe to the store when updates occur.

In this case we are dispatching our first action with a payload of our hardcoded tracks. Since we want to wire our Stream component directly to the store later on, we don’t need to pass anymore the tracks as properties to our Stream component.

Where will we continue? Either we can define our configureStore function which generates the store object or we can have a look at our first dispatched action. We will continue with the latter by explaining actions and action creators, go over to reducers which will deal with the global state object and at the end set up our store which holds the global state object. After that our component can subscribe to the store to get updates or use the stores interface to dispatch new actions to modify the global state.

{{% sub_chapter_header "Constant Action Types" "constantActionTypes" %}}

It is good to have a constants folder in general, but in early Redux projects you will often end up with some constants to identify your actions. These constants get shared by actions and reducers. In general it is a good approach to have all your action constants, which describe the change of your global state, at one place.

> When your project grows, there exist other {{% a_blank "folder/file structure patterns" "https://github.com/erikras/ducks-modular-redux" %}} to organise your Redux code.

*From src folder:*

{{< highlight javascript >}}
mkdir constants
cd constants
touch actionTypes.js
{{< /highlight >}}

*src/constants/actionTypes.js*

{{< highlight javascript >}}
export const TRACKS_SET = 'TRACKS_SET';
{{< /highlight >}}

{{% sub_chapter_header "Action Creators" "actionCreators" %}}

Now we get to the action creators. They return an object with a type and a payload. The type is an action constant like the one we defined in our previous created action types. The payload can be anything which will be used to change the global state.

*From src folder:*

{{< highlight javascript >}}
mkdir actions
cd actions
touch track.js
{{< /highlight >}}

*src/actions/track.js*

{{< highlight javascript >}}
import * as actionTypes from '../constants/actionTypes';

export function setTracks(tracks) {
  return {
    type: actionTypes.TRACKS_SET,
    tracks
  };
};
{{< /highlight >}}

Our first action creator takes as input some tracks which we want to set to our global state. It returns an object with an action type and a payload.

To keep our folder structure tidy, we need to setup an entry point to our action creators via an *index.js* file.

*From actions folder:*

{{< highlight javascript >}}
touch index.js
{{< /highlight >}}

*src/actions/index.js*

{{< highlight javascript >}}
import { setTracks } from './track';

export {
  setTracks
};
{{< /highlight >}}

In that file we can bundle all of our action creators to export them as public interface to the rest of the app. Whenever we need to access some action creator from somewhere else, we have a clearly defined interface for that, without reaching into every action creator file itself. We will do the same later on for our reducers.

{{% sub_chapter_header "Reducers" "reducers" %}}

After we dispatched our first action and implemented our first action creator, someone must be aware of that action type to access the global state. These functions are called reducers, because they take an action with its type and payload and reduce it to a new state `(previousState, action) => newState`. Important: Rather than modifying the `previousState`, we return a new object `newState` - the state is immutable.

The state in Redux must be treated as immutable state. You will never modify the previous state and you will always return a new state object. You want to keep your data structure immutable to avoid any side effects in your application.

Let’s create our first reducer.

*From src folder:*

{{< highlight javascript >}}
mkdir reducers
cd reducers
touch track.js
{{< /highlight >}}

*src/reducers/track.js*

{{< highlight javascript >}}
import * as actionTypes from '../constants/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TRACKS_SET:
      return setTracks(state, action);
  }
  return state;
}

function setTracks(state, action) {
  const { tracks } = action;
  return [ ...state, ...tracks ];
}
{{< /highlight >}}

As you can see we export an anonymous function, the reducer, as an interface to our existing app. The reducer gets a state and action like explained previously. Additionally you can define a default parameter as a function input. In this case we want to have an empty array as initial state.

> The initial state is the place where you normally would put something like our hardcoded tracks from the beginning, rater than dispatching an action (because they are hardcoded). But later on, we want to replace these tracks with tracks we fetched from the SoundCloud API, and thus we have to set these tracks as state via an action.

The reducer itself has a switch case to differ between action types. Now we have only one action type, but this will grow by adding more action types in an evolving application.

After all we use the ES6 spread operator to put our previous state plus the action payload, in that case the tracks, in our returned new state. We are using the spread operator to keep our object immutable. I can recommend libraries like {{% a_blank "Immutable.js" "https://facebook.github.io/immutable-js/" %}} in the beginning to enforce the usage of immutable data structures, but for the sake of simplicity I will go on with pure ES6 syntax.

Again to keep our folder interfaces tidy, we create an entry point to our reducers.

*From reducers folder:*

{{< highlight javascript >}}
touch index.js
{{< /highlight >}}

*src/reducers/index.js*

{{< highlight javascript >}}
import { combineReducers } from 'redux';
import track from './track';

export default combineReducers({
  track
});
{{< /highlight >}}

Saving us some refactoring, I already use a helper function {{% a_blank "combineReducers" "http://redux.js.org/docs/api/combineReducers.html" %}} here. Normally you would start to export one plain reducer. That reducer would return the *whole state*. When you use `combineReducers`, you are able to have multiple reducers, where each reducer only returns a *substate*. Without `combineReducers` you would access your tracks in the global state with `state.tracks`. But with `combineReducers` you get these intermediate layer to get to the subset of states produced by multiple reducers. In that case `state.track.tracks` where track is our substate to handle all track states in the future.

{{% sub_chapter_header "Store with Global State" "storeWithGlobalState" %}}

Now we dispatched our first action, implemented a pair of action type and action creator, and generated a new state via a reducer. What is missing is our store, which we already created from some not yet implemented function in our *src/index.js*.

Remember when we dispatched our first action via the store interface *store.dispatch(actionCreator(payload))*? The store is aware of the state and thus it is aware of our reducers with their state manipulations.

Let’s create the store file.

*From src folder:*

{{< highlight javascript >}}
mkdir stores
cd stores
touch configureStore.js
{{< /highlight >}}

*src/stores/configureStore.js*

{{< highlight javascript >}}
import { createStore } from 'redux';
import rootReducer from '../reducers/index';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}
{{< /highlight >}}

Redux provides us with a {{% a_blank "createStore" "http://redux.js.org/docs/api/createStore.html" %}} function which takes the `rootReducer` and an initial state.

Let's add a store middleware to even the way to a mature Redux application.

*src/stores/configureStore.js*

{{< highlight javascript "hl_lines=1 4 7" >}}
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';

const createStoreWithMiddleware = applyMiddleware()(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
{{< /highlight >}}

The Redux store is aware of a {{% a_blank "middleware" "http://redux.js.org/docs/advanced/Middleware.html" %}}, which can be used to do something between dispatching an action and the moment it reaches the reducer. There is already a lot of middleware for Redux out there. Let's use the {{% a_blank "logger middleware" "https://github.com/theaqua/redux-logger" %}} for the beginning.

{{< highlight javascript >}}
npm install --save redux-logger
{{< /highlight >}}

The logger middleware shows us console output for each action: the previous state, the action itself and the next state. It helps us to keep track of our state changes in our application.

*src/stores/configureStore.js*

{{< highlight javascript "hl_lines=2 5 7" >}}
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/index';

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
{{< /highlight >}}

Let’s start our app again and see what happens.

*From root folder:*

{{< highlight javascript >}}
npm start
{{< /highlight >}}

In the browser we don’t see the tracks from our global store, because we don’t pass any global state to our Stream component yet. But we can see in the console output our first action which gets dispatched.

Let’s connect our Stream component to the Redux store to close the Redux Roundtrip.

{{% chapter_header "Connect Redux and React" "connectReduxReact" %}}

As I mentioned early there exist some libraries to wire Redux to other environments. Since we are using React, we want to {{% a_blank "connect Redux to our React components" "https://github.com/reactjs/react-redux" %}}.

*From root folder:*

{{< highlight javascript >}}
npm install --save react-redux
{{< /highlight >}}

Do you remember when I told you about the lightweight Redux store API? We will never have the pleasure to enjoy the `store.subscribe` functionality to listen to store updates. With react-redux we are skipping that step and let this library take care of connecting our components to the store to listen to updates.

Essentially we need two steps to wire the Redux store to our components. Let’s begin with the first one.

{{% sub_chapter_header "Provider" "provider" %}}

The Provider from react-redux helps us to make the store and its functionalities available in all child components. The only thing we have to do is to initiate our store and wrap our child components within the Provider component. At the end the Provider component uses the store as property.

*src/index.js*

{{< highlight javascript "hl_lines=3 21 22 23" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import * as actions from './actions';
import Stream from './components/Stream';

const tracks = [
  {
    title: 'Some track'
  },
  {
    title: 'Some other track'
  }
];

const store = configureStore();
store.dispatch(actions.setTracks(tracks));

ReactDOM.render(
  <Provider store={store}>
    <Stream />
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();
{{< /highlight >}}

Now we made the Redux store available to all child components, in that case the Stream component.

{{% sub_chapter_header "Connect" "connect" %}}

The connect functionality from react-redux helps us to wire React components, which are embedded in the Provider helper component, to our Redux store. We can extend our Stream component as follows to get the required state from the Redux store.

Remember when we passed the hardcoded tracks directly to the Stream component? Now we set these tracks via the Redux Roundtrip in our global state and want to retrieve a part of this state in the Stream component.

*src/components/Stream.js*

{{< highlight javascript "hl_lines=2 16 17 18 19 20 21 22 23" >}}
import React from 'react';
import { connect } from 'react-redux';

function Stream({ tracks = [] }) {
  return (
    <div>
      {
        tracks.map((track, key) => {
          return <div className="track" key={key}>{track.title}</div>;
        })
      }
    </div>
  );
}

function mapStateToProps(state) {
  const tracks = state.track;
  return {
    tracks
  }
}

export default connect(mapStateToProps)(Stream);
{{< /highlight >}}

As you can see the component itself doesn’t change at all.

Basically we are using the returned function of connect to take our Stream component as argument to return a higher order component. The {{% a_blank "higher order component" "https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750" %}} is able to access the Redux store while the Stream component itself is only presenting our data.

Additionally the connect function takes as first argument a `mapStateToProps` function which returns an object. The object is a substate of our global state. In `mapStateToProps` we are only exposing the substate of the global state which is required by the component.

Moreover it is worth to mention that we could still access properties given from parent components via `<Stream something={thing} />` via the `mapStateToProps` function. The functions gives us as second argument these properties, which we could pass with out substate to the Stream component itself.

{{< highlight javascript >}}
function mapStateToProps(state, props) { … }
{{< /highlight >}}

Now start your app and you should see this time the rendered list of tracks in your browser. We already saw these tracks in a previous step, but this time we retrieve them from our Redux store.

The test should break right now, but we will fix that in the next step.

{{% sub_chapter_header "Container and Presenter Component" "containerAndPresenterComponent" %}}

Our Stream component has two responsibilities now. First it connects some state to our component and second it renders some DOM. We could split both into {{% a_blank "container and presenter component" "https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0" %}}, where the container component is responsible to connect the component to the Redux world and the presenter component only renders some DOM.

Let’s refactor!

First we need to organise our folder. Since we will not only end up with one file for the Stream component, we need to set up a dedicated Stream folder with all its files.

From components folder:

{{< highlight javascript >}}
mkdir Stream
cd Stream
touch index.js
touch presenter.js
touch spec.js
{{< /highlight >}}

The Stream folder consists of an index.js file (container), presenter.js file (presenter) and spec.js file (test). Later on we could have style.css/less/scss, {{% a_blank "story.js" "https://github.com/kadirahq/react-storybook" %}} etc. files in that folder as well.

Let’s refactor by each file. While every line of code is new in these files, I highlighted the important new parts coming with that refactoring. Most of the old code gets only separated in the new files.

*src/components/Stream/index.js*

{{< highlight javascript "hl_lines=3" >}}
import React from 'react';
import { connect } from 'react-redux';
import Stream from './presenter';

function mapStateToProps(state) {
  const tracks = state.track;
  return {
    tracks
  }
}

export default connect(mapStateToProps)(Stream);
{{< /highlight >}}

*src/components/Stream/presenter.js*

{{< highlight javascript >}}
import React from 'react';

function Stream({ tracks = [] }) {
  return (
    <div>
      {
        tracks.map((track, key) => {
          return <div className="track" key={key}>{track.title}</div>;
        })
      }
    </div>
  );
}

export default Stream;
{{< /highlight >}}

*src/components/Stream/spec.js*

{{< highlight javascript "hl_lines=1" >}}
import Stream from './presenter';
import { shallow } from 'enzyme';

describe('Stream', () => {

  const props = {
    tracks: [{ title: 'x' }, { title: 'y' }],
  };

  it('shows two elements', () => {
    const element = shallow(<Stream { ...props } />);

    expect(element.find('.track')).to.have.length(2);
  });

});
{{< /highlight >}}

Now you can delete the old files Stream.js and Stream.spec.js, because they got refactored into the new Stream folder.

When you start your app, you should still see the list of tracks rendered. Moreover the test should be fixed again.

In the last steps we finished the Redux Roundtrip and connected our components to the Redux environment. Now let’s dive into our real world application - the SoundCloud client.

{{% chapter_header "SoundCloud App" "soundCloudApp" %}}

There is nothing better than having an app with some real data showing up. Rather than having some hardcoded data to display, it is an awesome feeling to fetch some data from a well known service like SoundCloud.

In the chapter of this tutorial we will implement our SoundCloud client, which means that we login as SoundCloud user and show our latest track stream. Moreover we will be able to hit the play button for these tracks.

{{% sub_chapter_header "Registration" "registration" %}}

Before you can create a SoundCloud client, you need to have an account and register a new app. Visit {{% a_blank "Developers SoundCloud" "https://developers.soundcloud.com/" %}} and click the “Register a new app” link. Give your app a name and “Register” it.

{{% pin_it_image "react redux" "img/posts/the-soundcloud-client-in-react-redux/sc_register_your_app.jpg" "is-src-set" %}}

In the last registration step you give your app a “Redirect URI” to fulfil the registration later in the app via a login popup. Since we are developing locally, we will set this Redirect URI to “http://localhost:8080/callback”.

{{% pin_it_image "react redux" "img/posts/the-soundcloud-client-in-react-redux/sc_configuration_app.jpg" "is-src-set" %}}

> The port should be 8080 by default, but consider to change this according to your setup.

The previous step gives us two constants which we have to use in our app: Client ID and Redirect URI. We need both to setup our authentication process. Let’s transfer these constants into a file.

*From constants folder:*

{{< highlight javascript >}}
touch auth.js
{{< /highlight >}}

*src/constants/auth.js*

{{< highlight javascript >}}
export const CLIENT_ID = '1fb0d04a94f035059b0424154fd1b18c'; // Use your client ID
export const REDIRECT_URI = `${window.location.protocol}//${window.location.host}/callback`;
{{< /highlight >}}

Now we can authenticate with SoundCloud.

*From root folder:*

{{< highlight javascript >}}
npm --save install soundcloud
{{< /highlight >}}

*src/index.js*

{{< highlight javascript "hl_lines=1 8 10" >}}
import SC from 'soundcloud';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import * as actions from './actions';
import Stream from './components/Stream';
import { CLIENT_ID, REDIRECT_URI } from './constants/auth';

SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

const tracks = [
  {
    title: 'Some track'
  },
  {
    title: 'Some other track'
  }
];

const store = configureStore();
store.dispatch(actions.setTracks(tracks));

ReactDOM.render(
  <Provider store={store}>
    <Stream />
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();
{{< /highlight >}}

{{% sub_chapter_header "React Router" "reactRouter" %}}

The authentication process relies on a route called “/callback” in our app. Therefore we need to setup {{% a_blank "React Router" "https://github.com/reactjs/react-router" %}} to provide our app with some simple routing.

*From root folder:*

{{< highlight javascript >}}
npm --save install react-router react-router-redux
{{< /highlight >}}

You have to add the following line to your web pack configuration.

*webpack.config.js*

{{< highlight javascript "hl_lines=25" >}}
module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot-loader!babel-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true
  }
};
{{< /highlight >}}

The historyApiFallback allows our app to do routing purely on the client side. Usually a route change would result into a server request to fetch new resources.

Let’s provide our app with two routes: one for our app, another one for the callback and authentication handling. Therefore we use some helper components provided by react-router. In general we have to specify path and component pairs. Therefore we define to see the Stream component on the root path “/” and the Callback component on “/callback” (that’s where the authentication happens). Additionally we can specify a wrapper component like App. We will see during its implementation, why it is good to have a wrapper component like App. Moreover we use react-router-redux to synchronise the browser history with the store. This would help us to react to route changes.

*src/index.js*

{{< highlight javascript "hl_lines=4 5 9 10 28 32 33 34 35 36 37 38" >}}
import SC from 'soundcloud';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import * as actions from './actions';
import App from './components/App';
import Callback from './components/Callback';
import Stream from './components/Stream';
import { CLIENT_ID, REDIRECT_URI } from './constants/auth';

SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

const tracks = [
  {
    title: 'Some track'
  },
  {
    title: 'Some other track'
  }
];

const store = configureStore();
store.dispatch(actions.setTracks(tracks));

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Stream} />
        <Route path="/" component={Stream} />
        <Route path="/callback" component={Callback} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();
{{< /highlight >}}

At the end there are two new components: App as component wrapper and Callback for the authentication. Let’s create the first one.

*From components folder:*

{{< highlight javascript >}}
mkdir App
cd App
touch index.js
{{< /highlight >}}

*src/components/App/index.js*

{{< highlight javascript >}}
import React from 'react';

function App({ children }) {
  return <div>{children}</div>;
}

export default App;
{{< /highlight >}}

App does not much here but passing all children. We will not use this component in this tutorial anymore, but in future implementations you could use this component to have static Header, Footer, Playlist or Player components while the children are changing.

Let’s create our Callback component.

*From components folder:*

{{< highlight javascript >}}
mkdir Callback
cd Callback
touch index.js
{{< /highlight >}}

*src/components/Calback/index.js*

{{< highlight javascript >}}
import React from 'react';

class Callback extends React.Component {

  componentDidMount() {
    window.setTimeout(opener.SC.connectCallback, 1);
  }

  render() {
    return <div><p>This page should close soon.</p></div>;
  }
}

export default Callback;
{{< /highlight >}}

That’s the default implementation to create the callback for the SoundCloud API. We do not need to touch this file anymore in the future.

The last step for the Router setup is to provide our store with the route state when we navigate from page to page.

*src/reducers/index.js*

{{< highlight javascript "hl_lines=2 7" >}}
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import track from './track';

export default combineReducers({
  track,
  routing: routerReducer
});
{{< /highlight >}}

*src/stores/configureStore.js*

{{< highlight javascript "hl_lines=3 4 8 10" >}}
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/index';

const logger = createLogger();
const router = routerMiddleware(browserHistory);

const createStoreWithMiddleware = applyMiddleware(router, logger)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
{{< /highlight >}}

Moreover we sync our store with the browser history, so that we can listen later on to events based on our current route. We will not use that in this tutorial, but it can help you to fetch data on route changes for instance. Additionally properties like browser path or query params in the URL can be accessed in the store now.

{{% sub_chapter_header "Authentication" "authentication" %}}

Let’s authenticate with SoundCloud! We need to setup a new action to trigger that an event to authenticate. Let’s expose the auth function already and add the required action file afterwards.

*src/actions/index.js*

{{< highlight javascript "hl_lines=1 5" >}}
import { auth } from './auth';
import { setTracks } from './track';

export {
  auth,
  setTracks
};
{{< /highlight >}}

*From actions folder:*

{{< highlight javascript >}}
touch auth.js
{{< /highlight >}}

*src/actions/auth.js*

{{< highlight javascript >}}
import SC from 'soundcloud';

export function auth() {
  SC.connect().then((session) => {
    fetchMe(session);
  });
};

function fetchMe(session) {
  fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
{{< /highlight >}}

We are able to connect to the SoundCloud API, login with our credentials and see our account details in the console output.

Nobody is triggering that action though, so let’s do that for the sake of simplicity in our Stream component.

*src/components/Stream/index.js*

{{< highlight javascript "hl_lines=2 4 14 15 16 17 18 20" >}}
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Stream from './presenter';

function mapStateToProps(state) {
  const tracks = state.track;
  return {
    tracks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAuth: bindActionCreators(actions.auth, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
{{< /highlight >}}

In our container component we did only map some state to our presenter component. Now it comes to a second function we can pass to the connect function: mapDispatchToProps. This function helps us to pass actions to our presenter component. Within the mapDispatchToProps we return an object with functions, in this case one function named onAuth, and use our previously created action auth within that. Moreover we need to bind our action creator with the dispatch function.

Now let’s use this new available action in our presenter component.

*src/components/Stream/presenter.js*

{{< highlight javascript "hl_lines=3 6 7 8 9 10 16" >}}
import React from 'react';

function Stream({ tracks = [], onAuth }) {
  return (
    <div>
      <div>
        <button onClick={onAuth} type="button">Login</button>
      </div>
      <br/>
      <div>
        {
          tracks.map((track, key) => {
            return <div className="track" key={key}>{track.title}</div>;
          })
        }
      </div>
    </div>
  );
}

export default Stream;
{{< /highlight >}}

We simply put in a button and pass the onAuth function as onClick handler. After we start our app again, we should see the current user in the console output after we clicked the Login button. Additionally we will still see some error message, because our action goes nowhere, since we didn’t supply a according reducer for it.

> We might need to install a polyfill for fetch, because some browser do not support the fetch API yet.

*From root folder:*

{{< highlight javascript >}}
npm --save install whatwg-fetch
npm --save-dev install imports-loader exports-loader
{{< /highlight >}}

*webpack.config.js*

{{< highlight javascript "hl_lines=1 29 30 31 32 33" >}}
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot-loader!babel-loader'
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    })
  ]
};
{{< /highlight >}}

{{% sub_chapter_header "Redux Thunk" "reduxThunk" %}}

We can see our current user object in the console output, but we don’t store it yet! Moreover we are using our first asynchronous action, because we have to wait for the SoundCloud server to respond our request. The Redux environment provides several middleware to deal with asynchronous actions (see list below). One of them is {{% a_blank "redux-thunk" "https://github.com/gaearon/redux-thunk" %}}. The thunk middleware returns you a function instead of an action. Since we deal with an asynchronous call, we can delay the dispatch function with the middleware. Moreover the inner function gives us access to the store functions dispatch and getState.

> {{% a_blank "Building React Applications with Idiomatic Redux" "https://egghead.io/lessons/javascript-redux-dispatching-actions-asynchronously-with-thunks" %}} by egghead.io and Dan Abramov shows you how to implement your own thunk middleware.

Some side-effect middleware in Redux:

* {{% a_blank "Redux Thunk" "https://github.com/gaearon/redux-thunk" %}}
* {{% a_blank "Redux Promise" "https://github.com/acdlite/redux-promise" %}}
* {{% a_blank "Redux Saga" "https://github.com/yelouafi/redux-saga" %}}
* {{% a_blank "Redux Observable" "https://github.com/redux-observable/redux-observable" %}}

*From root folder:*

{{< highlight javascript >}}
npm --save install redux-thunk
{{< /highlight >}}

Let’s add thunk as middleware to our store.

*src/stores/configurationStore.js*

{{< highlight javascript "hl_lines=3 11" >}}
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers/index';

const logger = createLogger();
const router = routerMiddleware(browserHistory);

const createStoreWithMiddleware = applyMiddleware(thunk, router, logger)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
{{< /highlight >}}

{{% sub_chapter_header "Set Me" "setMe" %}}

Now we have everything in place to save our user object to the store. Therefore we need to create a new set of action type, action creator and reducer.

*src/constants/actionTypes.js*

{{< highlight javascript "hl_lines=1" >}}
export const ME_SET = 'ME_SET';
export const TRACKS_SET = 'TRACKS_SET';
{{< /highlight >}}

*src/actions/auth.js*

{{< highlight javascript "hl_lines=2 4 5 6 7 8 9 12 14 16 20 24 26" >}}
import SC from 'soundcloud';
import * as actionTypes from '../constants/actionTypes';

function setMe(user) {
  return {
    type: actionTypes.ME_SET,
    user
  };
}

export function auth() {
  return function (dispatch) {
    SC.connect().then((session) => {
      dispatch(fetchMe(session));
    });
  };
};

function fetchMe(session) {
  return function (dispatch) {
    fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setMe(data));
      });
  };
}
{{< /highlight >}}

Instead of doing the console output when we retrieved the user object, we simply call our action creator. Moreover we can see that the thunk middleware requires us to return a function instead of an object. The function gives us access to the dispatch functionality of the store.

Let's add the new reducer.

*src/reducers/index.js*

{{< highlight javascript "hl_lines=3 7" >}}
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import track from './track';

export default combineReducers({
  auth,
  track,
  routing: routerReducer
});
{{< /highlight >}}

*From reducers folder:*

{{< highlight javascript >}}
touch auth.js
{{< /highlight >}}

*src/reducers/auth.js*

{{< highlight javascript >}}
import * as actionTypes from '../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ME_SET:
      return setMe(state, action);
  }
  return state;
}

function setMe(state, action) {
  const { user } = action;
  return { ...state, user };
}
{{< /highlight >}}

The reducer respects the new action type and returns a newState with our user in place.

Now we want to see visually in our DOM whether the login was successful. Therefor we can exchange the Login button once the login itself was successful.

*src/components/Stream/index.js*

{{< highlight javascript "hl_lines=8 11" >}}
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Stream from './presenter';

function mapStateToProps(state) {
  const { user } = state.auth;
  const tracks = state.track;
  return {
    user,
    tracks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAuth: bindActionCreators(actions.auth, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
{{< /highlight >}}

In our container component we map our new state, the current user, to the presenter component.

*src/components/Stream/presenter.js*

{{< highlight javascript "hl_lines=3 7 8 9 10 11" >}}
import React from 'react';

function Stream({ user, tracks = [], onAuth }) {
  return (
    <div>
      <div>
        {
          user ?
            <div>{user.username}</div> :
            <button onClick={onAuth} type="button">Login</button>
        }
      </div>
      <br/>
      <div>
        {
          tracks.map((track, key) => {
            return <div className="track" key={key}>{track.title}</div>;
          })
        }
      </div>
    </div>
  );
}

export default Stream;
{{< /highlight >}}

The presenter component decides whether it has to show the username or the Login button. When we start our app again and login, we should the displayed username instead of a button.

*From root folder:*

{{< highlight javascript >}}
npm start
{{< /highlight >}}

{{% sub_chapter_header "Fetch Tracks" "fetchTracks" %}}

Now we are authenticated with the SoundCloud server. Let’s get real and fetch some real tracks and replace the hardcoded tracks.

*src/index.js*

{{< highlight javascript >}}
import SC from 'soundcloud';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import App from './components/App';
import Callback from './components/Callback';
import Stream from './components/Stream';
import { CLIENT_ID, REDIRECT_URI } from './constants/auth';

SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Stream} />
        <Route path="/" component={Stream} />
        <Route path="/callback" component={Callback} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();
{{< /highlight >}}

We only removed the hardcoded tracks in here. Moreover we don’t dispatch anymore an action to set some initial state.

*src/actions/auth.js*

{{< highlight javascript "hl_lines=3 16 31 32 33 34 35 36 37 38 39" >}}
import SC from 'soundcloud';
import * as actionTypes from '../constants/actionTypes';
import { setTracks } from '../actions/track';

function setMe(user) {
  return {
    type: actionTypes.ME_SET,
    user
  };
}

export function auth() {
  return function (dispatch) {
    SC.connect().then((session) => {
      dispatch(fetchMe(session));
      dispatch(fetchStream(session));
    });
  };
};

function fetchMe(session) {
    return function (dispatch) {
      fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
        .then((response) => response.json())
        .then((data) => {
          dispatch(setMe(data));
        });
    };
}

function fetchStream(session) {
  return function (dispatch) {
    fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTracks(data.collection));
      });
  };
}
{{< /highlight >}}

After the authentication we simply dispatch a new asynchronous action to fetch track data from the SoundCloud API. Since we already had an action creator to set tracks in our state, wen can reuse this.

> The returned data hasn’t only the list of tracks, it has some more meta data which could be used to fetch more paginated data afterwards. You would have to save the next_href property of data to do that.

The data structure of the SoundCloud tracks looks a bit different than our hardcoded tracks before. We need to change that in our Stream presenter component.

*src/components/Stream/presenter.js*

{{< highlight javascript "hl_lines=17" >}}
import React from 'react';

function Stream({ user, tracks = [], onAuth }) {
  return (
    <div>
      <div>
        {
          user ?
            <div>{user.username}</div> :
            <button onClick={onAuth} type="button">Login</button>
        }
      </div>
      <br/>
      <div>
        {
          tracks.map((track, key) => {
            return <div className="track" key={key}>{track.origin.title}</div>;
          })
        }
      </div>
    </div>
  );
}

export default Stream;
{{< /highlight >}}

Moreover we need to adjust our test that it respects the new track data structure.

*src/components/Stream/spec.js*

{{< highlight javascript "hl_lines=7" >}}
import Stream from './presenter';
import { shallow } from 'enzyme';

describe('Stream', () => {

  const props = {
    tracks: [{ origin: { title: 'x' } }, { origin: { title: 'y' } }],
  };

  it('shows two elements', () => {
    const element = shallow(<Stream { ...props } />);

    expect(element.find('.track')).to.have.length(2);
  });

});
{{< /highlight >}}

When you start your app now, you should see some tracks from your personal stream listed after the login.

> Even if you created a new SoundCloud account, I hope you have a stream displayed though. If you get some empty stream data, you have to use SoundCloud directly to generate some e.g. via following some people.

*From root folder:*

{{< highlight javascript >}}
npm start
{{< /highlight >}}

{{% chapter_header "SoundCloud Player" "soundCloudPlayer" %}}

How would it be to have your own audio player within the browser? Therefor the last step in this tutorial is to make the tracks playable!

{{% sub_chapter_header "Another Redux Roundtrip" "newReduxLoop" %}}

You should be already familiar with the procedure of creating action, action creator and reducer. Moreover you have to trigger that from within a component. Let’s start by providing our Stream component some yet not existing onPlay functionality. Moreover we will display a Play button next to each track which triggers that functionality.

*src/components/Stream/presenter.js*

{{< highlight javascript "hl_lines=3 17 18 19 20 21 22" >}}
import React from 'react';

function Stream({ user, tracks = [], onAuth, onPlay }) {
  return (
    <div>
      <div>
        {
          user ?
            <div>{user.username}</div> :
            <button onClick={onAuth} type="button">Login</button>
        }
      </div>
      <br/>
      <div>
        {
          tracks.map((track, key) => {
            return (
              <div className="track" key={key}>
                {track.origin.title}
                <button type="button" onClick={() => onPlay(track)}>Play</button>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default Stream;
{{< /highlight >}}

In our container Stream component we can map that action to the presenter component.

*src/components/Stream/index.js*

{{< highlight javascript "hl_lines=19" >}}
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Stream from './presenter';

function mapStateToProps(state) {
  const { user } = state.auth;
  const tracks = state.track;
  return {
    user,
    tracks
  }
};

function mapDispatchToProps(dispatch) {
  return {
    onAuth: bindActionCreators(actions.auth, dispatch),
    onPlay: bindActionCreators(actions.playTrack, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
{{< /highlight >}}

Now we will have to implement the non existent playTrack action creator.

*src/actions/index.js*

{{< highlight javascript "hl_lines=2 7" >}}
import { auth } from './auth';
import { setTracks, playTrack } from './track';

export {
  auth,
  setTracks,
  playTrack
};
{{< /highlight >}}

*src/actions/track.js*

{{< highlight javascript "hl_lines=10 11 12 13 14 15" >}}
import * as actionTypes from '../constants/actionTypes';

export function setTracks(tracks) {
  return {
    type: actionTypes.TRACKS_SET,
    tracks
  };
};

export function playTrack(track) {
  return {
    type: actionTypes.TRACK_PLAY,
    track
  };
}
{{< /highlight >}}

Don’t forget to export a new action type as constant.

*src/constants/actionTypes.js*

{{< highlight javascript "hl_lines=3" >}}
export const ME_SET = 'ME_SET';
export const TRACKS_SET = 'TRACKS_SET';
export const TRACK_PLAY = 'TRACK_PLAY';
{{< /highlight >}}

In our reducer we make place for another initial state. In the beginning there will be no active track set, but when we trigger to play a track, the track should be set as activeTrack.

*src/reducers/track.js*

{{< highlight javascript "hl_lines=3 4 5 6 12 13 20 23 24 25 26" >}}
import * as actionTypes from '../constants/actionTypes';

const initialState = {
    tracks: [],
    activeTrack: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TRACKS_SET:
      return setTracks(state, action);
    case actionTypes.TRACK_PLAY:
      return setPlay(state, action);
  }
  return state;
}

function setTracks(state, action) {
  const { tracks } = action;
  return { ...state, tracks };
}

function setPlay(state, action) {
  const { track } = action;
  return { ...state, activeTrack: track };
}
{{< /highlight >}}

Additionally we want to show the currently played track, therefore we need to map the activeTrack in our Stream container component.

*src/components/Stream/index.js*

{{< highlight javascript "hl_lines=9 13" >}}
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Stream from './presenter';

function mapStateToProps(state) {
  const { user } = state.auth;
  const { tracks, activeTrack } = state.track;
  return {
    user,
    tracks,
    activeTrack
  }
};

function mapDispatchToProps(dispatch) {
  return {
    onAuth: bindActionCreators(actions.auth, dispatch),
    onPlay: bindActionCreators(actions.playTrack, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
{{< /highlight >}}

By starting our app, we should be able to login, to see our tracks and to play a track. The redux-logger should show some console output that we have set an activeTrack. But there is no music yet! Let’s implement that!

{{% sub_chapter_header "Listen to the music!" "listenToTheMusic" %}}

In our last step we already handed the activeTrack to our presenter Stream component. Let’s see what we can do about that.

*src/components/Stream/presenter.js*

{{< highlight javascript "hl_lines=2 4 27 28 29 30 31" >}}
import React from 'react';
import { CLIENT_ID } from '../../constants/auth';

function Stream({ user, tracks = [], activeTrack, onAuth, onPlay }) {
  return (
    <div>
      <div>
        {
          user ?
            <div>{user.username}</div> :
            <button onClick={onAuth} type="button">Login</button>
        }
      </div>
      <br/>
      <div>
        {
          tracks.map((track, key) => {
            return (
              <div className="track" key={key}>
                {track.origin.title}
                <button type="button" onClick={() => onPlay(track)}>Play</button>
              </div>
            );
          })
        }
      </div>
      {
        activeTrack ?
          <audio id="audio" ref="audio" src={`${activeTrack.origin.stream_url}?client_id=${CLIENT_ID}`}></audio> :
          null
      }
    </div>
  );
}

export default Stream;
{{< /highlight >}}

We need the CLIENT_ID to authenticate the audio player with the SoundCloud API in order to stream a track via its stream_url. In React 15 you can return null, when there is no activeTrack. In older versions you had to return `<noscript />`.

When we start our app and try to play a track, the console output says that we cannot define refs on stateless functional components. But we need that reference on the audio element to be able to use its audio API. Let’s transform the Stream presenter component to a stateful component. We will see how it gives us control over the audio element.

> After all you should avoid to have stateful components and try to stick to functional stateless components. In this case we have no other choice.

*src/components/Stream/presenter.js*

{{< highlight javascript "hl_lines=1 2 5 7 8 10 12 14 15 16 17 18 19 21 22 53" >}}
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CLIENT_ID } from '../../constants/auth';

class Stream extends Component {

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if (!audioElement) { return; }

    const { activeTrack } = this.props;

    if (activeTrack) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  render () {
    const { user, tracks = [], activeTrack, onAuth, onPlay } = this.props;

    return (
      <div>
        <div>
          {
            user ?
              <div>{user.username}</div> :
              <button onClick={onAuth} type="button">Login</button>
          }
        </div>
        <br/>
        <div>
          {
            tracks.map((track, key) => {
              return (
                <div className="track" key={key}>
                  {track.origin.title}
                  <button type="button" onClick={() => onPlay(track)}>Play</button>
                </div>
              );
            })
          }
        </div>
        {
          activeTrack ?
            <audio id="audio" ref="audio" src={`${activeTrack.origin.stream_url}?client_id=${CLIENT_ID}`}></audio> :
            null
        }
      </div>
    );
  }
}

export default Stream;
{{< /highlight >}}

Let’s start our app again. We login, we see our tracks as a list, we are able to hit the play button, we listen to music! I hope it works for you!

{{% chapter_header "What's next?" "whatsNext" %}}

Add one of the following tutorials on top of your current SoundCloud project:

* [React ESLint: Code Style like Airbnb in React](https://www.robinwieruch.de/the-soundcloud-client-in-react-redux-eslint)
* [Flow: Type Checking with Flow in React + Redux](https://www.robinwieruch.de/the-soundcloud-client-in-react-redux-flow)
* [Redux Ducks: Restructure your Redux App with Ducks](https://www.robinwieruch.de/the-soundcloud-client-in-react-redux-ducks)
* [Redux Normalizr: Improve your State Management](https://www.robinwieruch.de/the-soundcloud-client-in-react-redux-normalizr)
* [Redux Observable RxJS: Going Epic with Reactive Programming](https://www.robinwieruch.de/redux-observable-rxjs)
* [MobX React: Simplified State Management in React](https://www.robinwieruch.de/mobx-react)

{{% chapter_header "Troubleshoot" "troubleshoot" %}}

In case you want to know which versions npm installed during that tutorial, here a list of all npm packages in my package.json.

*package.json*

{{< highlight javascript >}}
"devDependencies": {
  "babel-core": "^6.23.1",
  "babel-loader": "^6.3.2",
  "babel-preset-es2015": "^6.22.0",
  "babel-preset-react": "^6.23.0",
  "babel-preset-stage-2": "^6.22.0",
  "chai": "^3.5.0",
  "enzyme": "^2.7.1",
  "exports-loader": "^0.6.3",
  "imports-loader": "^0.7.0",
  "jsdom": "^9.11.0",
  "mocha": "^3.2.0",
  "react-addons-test-utils": "^15.4.2",
  "react-hot-loader": "^1.3.1",
  "webpack": "^2.2.1",
  "webpack-dev-server": "^2.4.1"
},
"dependencies": {
  "react": "^15.4.2",
  "react-dom": "^15.4.2",
  "react-redux": "^5.0.2",
  "react-router": "^3.0.2",
  "react-router-redux": "^4.0.8",
  "redux": "^3.6.0",
  "redux-logger": "^3.0.0",
  "redux-thunk": "^2.2.0",
  "soundcloud": "^3.1.2",
  "whatwg-fetch": "^2.0.2"
}
{{< /highlight >}}

{{% chapter_header "Final Thoughts" "finalThoughts" %}}

Hopefully you enjoyed this tutorial and learned a lot like I did. I didn’t plan to write so much in the first place, but I hope at the end it reaches enough people to encourage them to learn something new or simply to setup their own project.

I am open for feedback or bug reports on this tutorial. Please comment directly or reach out on {{% a_blank "Twitter" "https://twitter.com/rwieruch" %}}.

Moreover have a look again at {{% a_blank "favesound-redux" "https://github.com/rwieruch/favesound-redux" %}}. Feel free {{% a_blank "to try it" "http://www.favesound.de/" %}}, to contribute, to raise issues when you find bugs or to use it as blueprint for your own application.

In conclusion keep an eye on that tutorial. I will add more smaller content in the future. Have a look at the next chapter for more information.

{{% chapter_header "Contribute" "contribution" %}}

I already mentioned it, but feel free to contribute to {{% a_blank "favesound-redux" "https://github.com/rwieruch/favesound-redux" %}}. Get in contact with me, there is plenty of stuff to do and it gives you a start into the open source community.

Moreover I want to extend this tutorial with smaller tutorials on top. Like I explained in [Tutorial Extensions](#tutorialExtensions) you can contribute in this {{% a_blank "repository" "https://github.com/rwieruch/react-redux-soundcloud" %}} and add your own folder in there which builds on top of the init folder. In your own folder you can address a new topic. There is a lot of potential!
