+++
title = "Flow: Type Checking with Flow in React + Redux"
description = "The Flow: Type Checking with Flow in React + Redux tutorial will teach you how to use Flow in a React JS + Redux environment. JavaScript as dynamically typed.."
date = "2016-06-21T13:50:46+02:00"
tags = ["Redux"]
categories = ["Redux"]
keyword = "redux flow"
news_keywords = ["redux flow"]
banner = "img/posts/the-soundcloud-client-in-react-redux-flow/banner.jpg"
contribute = "the-soundcloud-client-in-react-redux-flow.md"

summary = "The Flow: Type Checking with Flow in React + Redux tutorial will teach you how to use Flow in a React + Redux environment. Since JavaScript itself is a dynamically typed language, you will end up with several bugs in your JavaScript career, which could have been prevented due type safety. In terms of using Flow for type safety, it only needs a simple setup to get the advantage of a more robust application."
+++

{{% header "Flow: Type Checking with Flow in React + Redux" %}}

{{% pin_it_image "redux flow" "img/posts/the-soundcloud-client-in-react-redux-flow/banner.jpg" %}}

{{% read_before "This tutorial is part 2 of 2 in the series." "Part 1:" "The SoundCloud Client in React + Redux" "https://www.robinwieruch.de/the-soundcloud-client-in-react-redux/" %}}

The Flow: Type Checking with Flow in React + Redux tutorial will teach you how to use {{% a_blank "Flow" "https://flowtype.org" %}} in a React + Redux environment. Since JavaScript itself is a dynamically typed language, you will end up with several bugs in your JavaScript career, which could have been prevented due type safety. In terms of using Flow for type safety, it only needs a simple setup to get the advantage of a more robust application. Moreover your feedback loop during development will improve, since you get the type safety in your terminal/IDE. Flow was introduced the first time at the {{% a_blank "Scale Conference in September 2014" "https://youtu.be/M8x0bc81smU" %}}.

{{% build_on_the_soundcloud_client_in_react_redux %}}

{{% chapter_header "Table of Contents" "toc" %}}

* [Setup Flow](#setupFlow)
* [Flow in Action](#flowInAction)
* [Functions and Type Aliases](#functionsAndTypeAliases)
* [Multiple Modules](#multipleModules)
* [Declarations](#declarations)
* [React Components](#reactComponents)
* [Troubleshoot](#troubleshoot)
* [Final Thoughts](#finalThoughts)

{{% chapter_header "Setup Flow" "setupFlow" %}}

First of all we have to install flow-bin in our project.

*From root folder:*

{{< highlight javascript >}}
npm install --save-dev flow-bin
{{< /highlight >}}

Next we have to create a flow configuration file.

*From root folder:*

{{< highlight javascript >}}
touch .flowconfig
{{< /highlight >}}

We keep our configuration empty in the beginning and add a flow script to our package.json.

*package.json*

{{< highlight javascript "hl_lines=4" >}}
...
  "scripts": {
    "start": "webpack-dev-server --progress --colors --hot --config ./webpack.config.js",
    "flow": "flow; test $? -eq 0 -o $? -eq 2",
    "test": "mocha --compilers js:babel-core/register --require ./test/setup.js 'src/**/*spec.js'",
    "test:watch": "npm run test -- --watch"
  },
...
{{< /highlight >}}

Now we can start our type checking already.

*From root folder:*

{{< highlight javascript >}}
npm run-script flow
{{< /highlight >}}

> You may see an error, because at this time of writing the tutorial there could still be an {{% a_blank "issue" "https://github.com/facebook/fbjs/issues/44" %}} after the setup. Please refer to the [Troubleshoot](#troubleshoot) chapter.

{{% chapter_header "Flow in Action" "flowInAction" %}}

There are no errors yet, but Flow should check our types shouldn’t it? It’s up to you to setup type checking for each file. Basically Flow will only check files which have either a /* @flow */ or // @flow annotations.

Let’s begin by adding our first type checking in one of our constant files.

*src/constants/actionTypes.js*

{{< highlight javascript "hl_lines=1" >}}
// @flow

export const ME_SET = 'ME_SET';
export const TRACKS_SET = 'TRACKS_SET';
export const TRACK_PLAY = 'TRACK_PLAY';
{{< /highlight >}}

Check again whether you have any errors now.

*From root folder:*

{{< highlight javascript >}}
npm run-script flow
{{< /highlight >}}

Still no errors, because we didn’t specify a type yet.

> When there would be an exported function in the file, we would have to specify the functions input and output from the beginning due to its module boundaries.

Let’s add our first type check. Flow comes with several {{% a_blank "built-in types" "https://flowtype.org/docs/builtins.html" %}}.

*src/constants/actionTypes.js*

{{< highlight javascript "hl_lines=3" >}}
// @flow

export const ME_SET: number = 'ME_SET';
export const TRACKS_SET = 'TRACKS_SET';
export const TRACK_PLAY = 'TRACK_PLAY';
{{< /highlight >}}

When we run our script again, we will see an error, because ME_SET is a string.

*From root folder:*

{{< highlight javascript >}}
npm run-script flow
{{< /highlight >}}

The output will show you the error with an additional description.


> You are still able to start the app with npm start and open it in a browser. Flow doesn’t prevent you from starting your app.

Let’s fix the type error and add more type checks.

*src/constants/actionTypes.js*

{{< highlight javascript "hl_lines=3 4 5" >}}
// @flow

export const ME_SET: string = 'ME_SET';
export const TRACKS_SET: string = 'TRACKS_SET';
export const TRACK_PLAY: string = 'TRACK_PLAY';
{{< /highlight >}}

There should be no errors when you run the script again.

{{% chapter_header "Functions and Type Aliases" "functionsAndTypeAliases" %}}

Let’s add some more type checking in our reducers. First only add the annotation.

*src/reducers/track.js*

{{< highlight javascript "hl_lines=1" >}}
// @flow

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

*From root folder:*

{{< highlight javascript >}}
npm run-script flow
{{< /highlight >}}

As already noted, flow requires to specify the input and output of exported functions by only annotating the file. We need to specify our {{% a_blank "function input and output" "https://flowtype.org/docs/functions.html" %}} to prevent these errors.

*src/reducers/track.js*

{{< highlight javascript "hl_lines=10" >}}
// @flow

import * as actionTypes from '../constants/actionTypes';

const initialState = {
    tracks: [],
    activeTrack: null
};

export default function(state: Object = initialState, action: Object): Object {
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

The reducers’ input and output gets type checked now. We say that the incoming state and action are generic Object types and the returned newState of the reducer is an Object as well. You can see that we can clearly specify the input and the output of a function. It is even more powerful in an functional programming environment where you have pure functions. When you run the script again, there should be no errors anymore.

At the end we didn’t win a lot here, because we still input two generic Objects and output one generic Object. We can use {{% a_blank "type aliases" "https://flowtype.org/docs/type-aliases.html" %}} to define our state object more specific.

*src/reducers/track.js*

{{< highlight javascript "hl_lines=3 4 5 6 15" >}}
// @flow

type State = {
  tracks: Array<Object>;
  activeTrack: ?Object;
};

import * as actionTypes from '../constants/actionTypes';

const initialState = {
    tracks: [],
    activeTrack: null
};

export default function(state: State = initialState, action: Object): State {
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

The initialState, which we already defined before, can be used in that case as blueprint for our type alias. Moreover we are using a {{% a_blank "maybe type" "https://flowtype.org/docs/nullable-types.html" %}}, because activeTrack can be null. Neither we want to specify a null check within the reducer for the activeTrack, nor we want to prevent activeTrack from being null, because there doesn’t need to be a set activeTrack in the first place.

There should be still no errors when you run the script again. We could even be more specific with the type Object here, by changing

{{< highlight javascript >}}
type State = {
  tracks: Array<Object>;
  activeTrack: ?Object;
};
{{< /highlight >}}

to

{{< highlight javascript >}}
type Track = {
  // specify your track object
};

type State = {
  tracks: Array<Track>;
  activeTrack: ?Track;
};
{{< /highlight >}}

but for the sake of simplicity, let’s leave the reducer as it is and be more specific in our next case.

So far we have type checked some of our actionTypes and one of our reducers. Let’s have a look at one of our action creators and make it type safe as well.

*src/actions/track.js*

{{< highlight javascript "hl_lines=1 3 4 5 7 8 9 10 12 13 14 15 19 26" >}}
// @flow

type Track = {
  foo: string;
};

type SetTracksAction = {
    type: string;
    tracks: Array<Track>;
};

type PlayTrackAction = {
    type: string;
    track: Track;
};

import * as actionTypes from '../constants/actionTypes';

export function setTracks(tracks: Array<Track>): SetTracksAction {
  return {
    type: actionTypes.TRACKS_SET,
    tracks
  };
};

export function playTrack(track: Track): PlayTrackAction {
  return {
    type: actionTypes.TRACK_PLAY,
    track
  };
}
{{< /highlight >}}

A lot is happening here already! Let’s examine it from top to bottom. We define a type alias Track which has a property foo typed as string. After that we define two more complex type aliases. Both SetTracksAction and PlayTrackAction have a defined type as string. Moreover the first one has a property tracks which is typed as an Array of our type alias Track. The latter one has simply a property track types as type alias Track. Now we can use everything we defined in our action creators as input and output types.

Additionally you could also describe all actions under one type, but it doesn’t guarantee you that you returned the correct object in the end.

*src/actions/track.js*

{{< highlight javascript "hl_lines=17 21 28" >}}
// @flow

type Track = {
  foo: string;
};

type SetTracksAction = {
    type: string;
    tracks: Array<Track>;
};

type PlayTrackAction = {
    type: string;
    track: Track;
};

type Action = SetTracksAction | PlayTrackAction;

import * as actionTypes from '../constants/actionTypes';

export function setTracks(tracks: Array<Track>): Action {
  return {
    type: actionTypes.TRACKS_SET,
    tracks
  };
};

export function playTrack(track: Track): Action {
  return {
    type: actionTypes.TRACK_PLAY,
    track
  };
}
{{< /highlight >}}

The unified type is called a {{% a_blank "disjoint union type" "https://flowtype.org/docs/disjoint-unions.html" %}}.

*From root folder:*

{{< highlight javascript >}}
npm run-script flow
{{< /highlight >}}

There should be no errors.

{{% chapter_header "Multiple Modules" "multipleModules" %}}

Let’s step in our file where we initially retrieve the track objects and make this one type safe.

*src/actions/auth.js*

{{< highlight javascript "hl_lines=3 4 5 7 8 9 23 32 42 45" >}}
// @flow

type Track = {
  foo: number;
};

type StreamData = {
  collection: Array<Track>;
};

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
  return function (dispatch: Function) {
    SC.connect().then((session) => {
      dispatch(fetchMe(session));
      dispatch(fetchStream(session));
    });
  };
};

function fetchMe(session) {
    return function (dispatch: Function) {
      fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
        .then((response) => response.json())
        .then((data) => {
          dispatch(setMe(data));
        });
    };
}

function fetchStream(session) {
  return function (dispatch: Function) {
    fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
      .then((response) => response.json())
      .then((data: StreamData) => {
        dispatch(setTracks(data.collection));
      });
  };
}
{{< /highlight >}}

Again we define a type alias for the track object. Moreover we define a more complex type alias StreamData which uses the Track type. It defines a property collection which is typed as an Array of Track types.

*From root folder:*

{{< highlight javascript >}}
npm run-script flow
{{< /highlight >}}

You should get an error now. If you look closer at the error, you will notice that it involves our action creators in track.js. Since we import the setTracks function from track.js, setTracks was already type checked before. When we have a look again at track.js, we will see that we defined the Track type alias different from the Track type alias in auth.js. One time it has a property foo typed as string and one time a property foo types as number. Now you see the power of the type safety which you will get with a static typed language. Flow is able to {{% a_blank "evaluate exported and imported modules" "https://flowtype.org/docs/modules.html" %}}.

We can easily fix that by changing our Track type.

*src/actions/auth.js*

{{< highlight javascript "hl_lines=4" >}}
// @flow

type Track = {
  foo: string;
};

type StreamData = {
  collection: Array<Track>;
};

import SC from 'soundcloud';
...
{{< /highlight >}}

You should see no errors anymore when you run the type checking script.

*From root folder:*

{{< highlight javascript >}}
npm run-script flow
{{< /highlight >}}

{{% chapter_header "Declarations" "declarations" %}}

One problem from the previous step still remains. We had to define two times the Track type. It would be more useful to define the Track type only once. Moreover the Track object has no property foo in our real world application in the first place. We will have a look at the latter one later during this tutorial. Let’s fix the duplicate Track type definition first.

We can use {{% a_blank "declarations" "https://flowtype.org/docs/declarations.html" %}} to define new types at one place and reuse them with Flow. Remember when we added the flow configuration? We can use that file to define the declarations.

*.flowconfig*

{{< highlight javascript >}}
[libs]

decls
{{< /highlight >}}

Now we need a folder decls where we can decelerate our types at one place.

*From root folder:*

{{< highlight javascript >}}
mkdir decls
cd decls
touch flowTypes.js
{{< /highlight >}}

*decls/flowTypes.js*

{{< highlight javascript >}}
declare type Track = {
  foo: string;
};
{{< /highlight >}}

Now we can remove the

{{< highlight javascript >}}
type Track = {
  foo: string;
};
{{< /highlight >}}

from the files src/actions/track.js and src/actions/auth.js. There should be no error when you run the type checking script.

*From root folder:*

{{< highlight javascript >}}
npm run-script flow
{{< /highlight >}}

{{% chapter_header "React Components" "reactComponents" %}}

Flow makes it possible to type check the {{% a_blank "props and state of nested components" "https://flowtype.org/docs/react.html" %}}. React already comes with PropTypes, they are awesome and you should use them, but they can be improved with Flow. PropTypes for instance cannot specify the input and output of a function.

Let’s add add the Flow annotation and the props objects we want to type check in the next step.

*src/components/Stream/presenter.js*

{{< highlight javascript "hl_lines=1 9 10" >}}
// @flow

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CLIENT_ID } from '../../constants/auth';

class Stream extends Component {

  props: {
  };

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

  render() {
    ...
  }
}

export default Stream;
{{< /highlight >}}

Since the prop object is an empty object, we will get several errors when we check our types. We can adjust our props type check to justify the required props of our component.

*src/components/Stream/presenter.js*

{{< highlight javascript "hl_lines=3 4 5 6 7" >}}
...
  props: {
    user: Object,
    tracks: Array<Track>,
    activeTrack: ?Track,
    onAuth: () => void,
    onPlay: (someTrack: Track) => void,
  };
...
{{< /highlight >}}

That way we can exactly specify each property. Moreover you can see that we can define onPlay more specific. Rather than having a generic Function type, we can define the input and output of onPlay.

We still get errors and now comes the crucial point. In our auth.js we defined the StreamData which we will get from the SoundCloud API. At this point we have no chance to know about the property types inside of Track. Since we are now defining the component where we want to make the tracks visible in the browser, we know which properties we need. Let’s change our Track declaration according to the properties we are showing in our Stream component.

*decls/flowTypes.js*

{{< highlight javascript "hl_lines=2" >}}
declare type Track = {
  origin: Object;
};
{{< /highlight >}}

We can even be more specific:

*decls/flowTypes.js*

{{< highlight javascript "hl_lines=1 2 3 4 7" >}}
declare type Origin = {
  stream_url: string;
  title: string;
};

declare type Track = {
  origin: Origin;
};
{{< /highlight >}}

Now the Track declaration should align with the required props on our track object in the Stream component.

As little extra we can declare a User type, which we can use in the Stream component.

*decls/flowTypes.js*

{{< highlight javascript "hl_lines=10 11 12" >}}
declare type Origin = {
  stream_url: string;
  title: string;
};

declare type Track = {
  origin: Origin;
};

declare type User = {
  username: string;
};
{{< /highlight >}}

*src/components/Stream/presenter.js*

{{< highlight javascript "hl_lines=3" >}}
...
  props: {
    user: User,
    tracks: Array<Track>,
    activeTrack: ?Track,
    onAuth: () => void,
    onPlay: (someTrack: Track) => void,
  };
...
{{< /highlight >}}

We have type checked one reducer, some action types, two action creators and one component. Moreover we declared globally Type aliases and made sure that our type checking runs across multiple files. Now you should be able to apply the type safety to the remaining files.

> You may run into the issue that you can't start your app again with npm start nor test it with npm test. Please refer to the [Troubleshoot](#troubleshoot) chapter.

{{% chapter_header "Troubleshoot" "troubleshoot" %}}

You may encounter issues in that tutorial. Here you will find some references how to handle issues.

### node_modules/fbjs

You may run into an issue where it says

{{< highlight javascript >}}
identifier `$FlowIssue`. Could not resolve name
{{< /highlight >}}

or

{{< highlight javascript >}}
property `done`. Property not found in
{{< /highlight >}}

which happens in node_modules/fbjs/lib/. We can ignore that error in the flow configuration.

*.flowconfig*

{{< highlight javascript >}}
[ignore]

.*node_modules/fbjs.*
{{< /highlight >}}

Now you should see no errors after running the type checking again.

### Missing class properties transform

After the type checking of the Stream component, you may run into a problem that your app doesn’t start anymore with npm start nor the tests get executed with npm test. You may see the following error:

{{< highlight javascript >}}
Missing class properties transform
{{< /highlight >}}

To fix that problem you can install the following package.

*From root folder:*

{{< highlight javascript >}}
npm --save-dev install babel-plugin-transform-class-properties
{{< /highlight >}}

*package.json*

{{< highlight javascript "hl_lines=8 9 19" >}}
...
  "babel": {
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": [
      "transform-class-properties"
    ]
  },
...
{{< /highlight >}}

### Dependencies

In case you want to know which versions npm installed during that tutorial, here a list of all npm packages in my package.json.

{{< highlight javascript >}}
  "devDependencies": {
    "babel-core": "^6.9.1",
    "babel-loader": "^6.2.4",
    "babel-plugin-transform-class-properties": "^6.10.2",
    "babel-preset-es2015": "^6.9.0",
    "babel-preset-react": "^6.5.0",
    "babel-preset-stage-2": "^6.5.0",
    "chai": "^3.5.0",
    "enzyme": "^2.3.0",
    "exports-loader": "^0.6.3",
    "flow-bin": "^0.27.0",
    "imports-loader": "^0.6.5",
    "jsdom": "^9.2.1",
    "mocha": "^2.5.3",
    "react-addons-test-utils": "^15.1.0",
    "react-hot-loader": "^1.3.0",
    "webpack": "^1.13.1",
    "webpack-dev-server": "^1.14.1"
  },
  "dependencies": {
    "react": "^15.1.0",
    "react-dom": "^15.1.0",
    "react-redux": "^4.4.5",
    "react-router": "^2.4.1",
    "react-router-redux": "^4.0.5",
    "redux": "^3.5.2",
    "redux-logger": "^2.6.1",
    "redux-thunk": "^2.1.0",
    "soundcloud": "^3.1.2",
    "whatwg-fetch": "^1.0.0"
  }
{{< /highlight >}}

{{% chapter_header "Final Thoughts" "finalThoughts" %}}

{{% look_again_the_soundcloud_client_in_react_redux %}}
