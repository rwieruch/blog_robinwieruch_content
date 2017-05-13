+++
title = "MobX React: Refactor your application from Redux to MobX"
description = "Refactor your React application from Redux to MobX. Use MobX instead of Redux for state management in React JS. Get to know actions, reactions and derivations in MobX and best practices..."
date = "2016-07-18T13:50:46+02:00"
tags = ["Redux", "MobX"]
categories = ["Redux", "MobX"]
keyword = "mobx react"
news_keywords = ["mobx react"]
hashtag = "#ReactJs"
banner = "img/posts/mobx-react/banner.jpg"
contribute = "mobx-react.md"
headline = "MobX React: Refactor your application from Redux to MobX"

summary = "The MobX React: Refactor your application from Redux to MobX tutorial will teach you how to use MobX instead of Redux for state management in React. We will come from a Redux + React seed project and refactor it from Redux to MobX. While we do so, I will explain in detail the concepts behind MobX and the similarities and differences compared to Redux."
+++

{{% pin_it_image "mobx react" "img/posts/mobx-react/banner.jpg" %}}

{{% read_before "This React tutorial is part 2 of 2 in the series." "Part 1:" "The SoundCloud Client in React + Redux" "https://www.robinwieruch.de/the-soundcloud-client-in-react-redux/" %}}

MobX is a state management solution. It is a standalone pure technical solution without being opinionated about the architectural state management app design. The 4 pillars State, Actions, Reactions and Derivations make state management in MobX possible. First the State encapsulates all of your application state which can consist of primitives to complex objects. While Actions mutate the State, Reactions are running every time the State was mutated. Derivations are similar to Reactions, but they produce a new value depending on the State.

{{% pin_it_image "mobx react" "img/posts/mobx-react/four_pillars.png" %}}

The MobX React: Refactor your application from Redux to MobX tutorial will teach you how to use MobX instead of Redux for state management in React. We will come from a Redux + React seed project and refactor it from Redux to MobX. While we do so, I will explain in detail the concepts behind MobX and the similarities and differences compared to Redux.

{{% build_on_the_soundcloud_client_in_react_redux %}}

{{% chapter_header "Table of Contents" "toc" %}}

* [MobX Dependencies](#dependencies)
* [MobX State](#state)
* [MobX Actions](#actions)
* [Redux to MobX State Management](#reduxMobxStateManagement)
* [Redux to MobX Components](#components)
* [MobX Reactions](#reactions)
* [MobX Derivations](#derivations)
* [Explicit Actions](#explicitActions)
* [Provide and Inject](#provideAndInject)
* [Troubleshoot](#troubleshoot)
* [Final Thoughts](#finalThoughts)

{{% chapter_header "MobX Dependencies" "dependencies" %}}

Let's begin with the dependencies of MobX. It comes as standalone library, but can also be used in combination with React. Therefore we need to install both libraries, {{% a_blank "mobx" "https://github.com/mobxjs/mobx" %}} and {{% a_blank "mobx-react" "https://github.com/mobxjs/mobx-react" %}}, to use MobX in combination with React.

*From root folder:*

{{< highlight javascript >}}
npm install --save mobx mobx-react
{{< /highlight >}}

Moreover we need class property transformation and decorators to use MobX.

{{< highlight javascript >}}
npm install --save-dev babel-plugin-transform-class-properties
npm install --save-dev babel-plugin-transform-decorators-legacy
{{< /highlight >}}

Now we can add both plugins to our babel configuration, that Babel is able to transpile decorators and class properties.

*package.json*

{{< highlight javascript "hl_lines=7 8 9 10" >}}
"babel": {
  "presets": [
    "es2015",
    "react",
    "stage-2"
  ],
  "plugins": [
    "transform-decorators-legacy",
    "transform-class-properties"
  ]
}
{{< /highlight >}}

{{% chapter_header "MobX State" "state" %}}

Redux uses Actions to change the global state with the help of a Reducer. Actions never mutate the global state directly. MobX doesn't use Reducers. That's why MobX Actions mutate the state directly. Both libraries call it Action, but they apply them in a different way to change the state.

MobX revives the "old" single page application concepts, when you would have some service/object(/ES6 class) to hold some application state. In MobX one could call these containers either store or state. Let's begin by implementing the first store to hold our user state.

*From stores folder:*

{{< highlight javascript >}}
touch userStore.js
{{< /highlight >}}

*src/stores/userStore.js*

{{< highlight javascript >}}
import { observable } from 'mobx';

class UserStore {

  @observable me;

  constructor() {
    this.me = null;
  }

}

const userStore = new UserStore();

export default userStore;
export { UserStore };
{{< /highlight >}}

The UserStore class has a simple constructor which sets the initial state of a login user (me) to null. Nothing unusual so far. MobX comes into place when we decorate the me property with @observable to clarify that the property can change over time.

> These changes can be made visible in our components with a MobX Reaction. That will be explained when we refactor the components later on.

Moreover we can new the store to make sure that we export it as a singleton instance. Last but not least we can export the UserStore class directly to reuse it somewhere else independently (e.g. unit tests).

What else do we have as state in the present application? Next to the user object (me), there is an array of tracks and an active track once a user clicked a Play button. Let's implement the second store to hold that MobX State.

*From stores folder:*

{{< highlight javascript >}}
touch trackStore.js
{{< /highlight >}}

*src/stores/trackStore.js*

{{< highlight javascript >}}
import { observable } from 'mobx';

class TrackStore {

  @observable tracks;
  @observable activeTrack;

  constructor(tracks = []) {
    this.tracks = tracks;
    this.activeTrack = null;
  }

}

const trackStore = new TrackStore();

export default trackStore;
export { TrackStore };
{{< /highlight >}}

Similar to the UserStore, we decorate the two properties tracks and activeTrack with `@observable` to indicate that these can change over time. Additionally to the UserStore the TrackStore can be initialized with an array of tracks.

We are set up to save all of our state which was handled in the Redux global store before. But we don't use the stores yet. Let's do it by refactoring the authentication process. There we fetch data like login user and tracks from the SoundCloud API ([What's an API?](https://www.robinwieruch.de/what-is-an-api-javascript/)). Now we want to use MobX Actions to set the fetched data in our stores rather than using Redux Actions.

{{% chapter_header "MobX Actions" "actions" %}}

State mutations are called Actions in MobX. Rather than mutating the state via Actions and Reducers like in Redux, MobX mutates the state directly in the store.

Let's use our first MobX Action in the authentication process. Afterwards we can get rid of all the Redux Action aware implementations.

*src/actions/auth.js*

Before:

{{< highlight javascript >}}
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

After:

{{< highlight javascript >}}
import SC from 'soundcloud';
import userStore from '../stores/userStore';
import trackStore from '../stores/trackStore';

export function auth() {
  SC.connect().then((session) => {
    fetchMe(session);
    fetchStream(session);
  });
};

function fetchMe(session) {
  fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
    .then((response) => response.json())
    .then((me) => {
      userStore.me = me;
    });
}

function fetchStream(session) {
  fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
    .then((response) => response.json())
    .then((data) => {
      trackStore.tracks = data.collection;
    });
}
{{< /highlight >}}

Basically we replaced the dispatch wrapped action creators with mutations on our new stores. Moreover all functions are not Redux middleware aware anymore, so we removed the returned function which enabled us to access to dispatch functionality. Additionally we removed the plain Redux action creator setMe. You can already see that rather than having an Action to change our global state implicit with Reducers, we mutate the state directly in the stores.

{{% chapter_header "Redux to MobX State Management" "reduxMobxStateManagement" %}}

The state management with MobX is up and running. We are fetching data and set these data in our stores.

Let's remove some Redux dependent files/folders.

Since we are not using Redux Actions anymore, one can remove all remaining files in that folder.

*From actions folder: *

{{< highlight javascript >}}
rm index.js
rm track.js
{{< /highlight >}}

Additionally we don't need Action Types anymore.

*From constants folder:*

{{< highlight javascript >}}
rm actionTypes.js
{{< /highlight >}}

Moreover one can remove the reducers folder, because we mutate our state directly in the stores.

*From src folder:*

{{< highlight javascript >}}
rm -rf reducers
{{< /highlight >}}

Last but not least let's remove the configureStore.js file, which sets up the Redux store and uses the removed reducers.

*From stores folder:*

{{< highlight javascript >}}
rm configureStore.js
{{< /highlight >}}

The state management with MobX State and Actions is implemented.

{{% chapter_header "Redux to MobX Components" "components" %}}

We have our stores and the overhauled authentication process, which mutates the store state after fetching the data.

Now we have to marry the components with MobX instead of Redux. Let's begin with the entry point.

*src/index.js*

Before:

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
{{< /highlight >}}

After:

{{< highlight javascript >}}
import SC from 'soundcloud';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Callback from './components/Callback';
import Stream from './components/Stream';
import { CLIENT_ID, REDIRECT_URI } from './constants/auth';

SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Stream} />
      <Route path="/" component={Stream} />
      <Route path="/callback" component={Callback} />
    </Route>
  </Router>,
  document.getElementById('app')
);
{{< /highlight >}}

First we removed the wrapping Provider component. The {{% a_blank "react-redux" "https://github.com/reactjs/react-redux" %}} Provider helped us to inject the Redux store into the React component tree. We don't need that anymore, because we can import the stores directly. Later we will learn about a MobX decorator which helps us to update the components after observed properties changed.

> We are using the plain browserHistory and don't need to sync it anymore with the Redux store. That is less code, but we loose the benefit of a synced browser history in our state.

Now we can move on to the Stream component. There are no real best practices yet for MobX aware components, but the concept of container and presenter components can still be applied. We begin by refactoring the container component, because that one can still pass the state and the MobX Actions to the presenter component.

*src/components/Stream/index.js*

{{< highlight javascript >}}
import React from 'react';
import { observer } from 'mobx-react';
import Stream from './presenter';
import { CLIENT_ID } from '../../constants/auth';
import { auth } from '../../actions/auth';
import userStore from '../../stores/userStore';
import trackStore from '../../stores/trackStore';

const StreamContainer = observer(() => {
  return (
    <Stream
      me={userStore.me}
      tracks={trackStore.tracks}
      activeTrack={trackStore.activeTrack}
      clientId={CLIENT_ID}
      onAuth={auth}
      onPlay={(track) => trackStore.activeTrack = track}
    />
  );
})

export default StreamContainer;
{{< /highlight >}}

The stores get imported and their properties get passed to the presenter component. Moreover the onPlay callback mutates the state directly on the store. There is no Action and Reducer roundtrip like in Redux. The onAuth callback triggers the authentication and fetches all the relevant data. Additionally we wrapped the stateless functional component into an MobX observer helper function. Now every time an observable property in the stores changes, the component will trigger a re-render. I will dive more into details for the Stream presenter component.

{{% chapter_header "MobX Reactions" "reactions" %}}

Let's move on to the Stream presenter component. The component needs to show the recent data of the stores. In MobX the updates due to I/O and Networking are called Reactions.

*src/components/Stream/presenter.js*

{{< highlight javascript >}}
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

@observer
class Stream extends Component {

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if (!audioElement) { return; }

    if (this.props.activeTrack) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  render() {
    const { me, tracks, activeTrack, clientId, onAuth, onPlay } = this.props;

    return (
      <div>
        <div>
          {
            me ?
              <div>{me.username}</div> :
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
            <audio id="audio" ref="audio" src={`${activeTrack.origin.stream_url}?client_id=${clientId}`}></audio> :
            null
        }
      </div>
    );
  }
}

export default Stream;
{{< /highlight >}}

The component itself didn't change a lot. It receives the props as before consisting of some state and callbacks.

There is one little part which is new - the @observer decorator. In the Stream container component we used it differently because it was a stateless functional component. In extended React components one can use the same functionality as decorator. The decorator makes it possible to re-render the component every time an @observable decorated property from the store changes.

For instance whenever someone hits the Play button, the activeTrack gets mutated in the trackStore (which happens in the Stream container component). Since we changed the activeTrack @observable property, the render method of the React component gets triggered.

That's a lot of magic for one little @observer decorator. What happens exactly? Every time an @observable property changes MobX triggers an internal autrun method. Autorun creates a MobX Reaction, which runs every time and once in the beginning, whenever an @observable decorated property changed. The @observer decorator makes sure that the render method of the component gets wrapped into the MobX autorun. As result the changed property gets reflected in the presenter component due to an component re-render.

{{% chapter_header "MobX Derivations" "derivations" %}}

Let's introduce the last MobX concept: Derivations. A MobX Derivation is any value that can be computed from the MobX state. Rather than getting a value directly from the state, one can have a @computed decorated function to retrieve a computed value from the state.

> There is a similarity to Redux Selectors, which enable one to compute derived data from the Redux store.

Let's extend the TrackStore by a computation.

*src/stores/trackStore.js*

{{< highlight javascript "hl_lines=1 6 10 13 14 15 16 17 18 19 20 12" >}}
import { observable, computed } from 'mobx';

class TrackStore {

  @observable tracks;
  @observable activeTrackId;

  constructor(tracks = []) {
    this.tracks = tracks;
    this.activeTrackId = null;
  }

  @computed get activeTrack() {
    let activeTrack = null;
    trackStore.tracks.forEach((track) => {
      if (track.origin.id === trackStore.activeTrackId) {
        activeTrack = track;
      }
    });
    return activeTrack;
  }

}

const trackStore = new TrackStore();

export default trackStore;
export { TrackStore };
{{< /highlight >}}

The activeTrack decorated function uses an id and a list of tracks to derive the active track. Before we saved the activeTrack directly in the store. Now we save only the id of the active track.

After that we have to change the Stream container onPlay callback by setting an id rather than a whole track object.

*src/components/Stream/index.js*

{{< highlight javascript "hl_lines=17" >}}
import React from 'react';
import { observer } from 'mobx-react';
import Stream from './presenter';
import { CLIENT_ID } from '../../constants/auth';
import { auth } from '../../actions/auth';
import userStore from '../../stores/userStore';
import trackStore from '../../stores/trackStore';

const StreamContainer = observer(() => {
  return (
    <Stream
      me={userStore.me}
      tracks={trackStore.tracks}
      activeTrack={trackStore.activeTrack}
      clientId={CLIENT_ID}
      onAuth={auth}
      onPlay={(track) => trackStore.activeTrackId = track.origin.id}
    />
  );
})

export default StreamContainer;
{{< /highlight >}}

We don't have to change the Stream presenter component. There we can still derive the activeTrack with trackStore.activeTrack since it is a MobX Derivation.

{{% chapter_header "Explicit Actions" "explicitActions" %}}

MobX has a strict mode which is off by default. When the strict mode is enabled and it enforces globally that state mutations are only allowed inside actions. In our approach we are mutating the state from outside the stores. Let's use the strict mode globally and implement proper explicit actions to change the state.

*src/index.js*

{{< highlight javascript "hl_lines=5 13" >}}
import SC from 'soundcloud';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { useStrict } from 'mobx';
import App from './components/App';
import Callback from './components/Callback';
import StreamContainer from './components/Stream';
import { CLIENT_ID, REDIRECT_URI } from './constants/auth';

SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

useStrict(true);

...
{{< /highlight >}}

When you start your app now, the console output will give you an error that you are not allowed to change the state outside of an action.

Now let's implement the actions in our stores.

*src/stores/trackStore.js*

{{< highlight javascript "hl_lines=1 23 24 25 27 28 29" >}}
import { observable, computed, action } from 'mobx';

class TrackStore {

  @observable tracks;
  @observable activeTrackId;

  constructor(tracks = []) {
    this.tracks = tracks;
    this.activeTrackId = null;
  }

  @computed get activeTrack() {
    let activeTrack = null;
    trackStore.tracks.forEach((track) => {
      if (track.origin.id === trackStore.activeTrackId) {
        activeTrack = track;
      }
    });
    return activeTrack;
  }

  @action setTracks = (tracks) => {
    this.tracks = tracks;
  }

  @action onPlay = (track) => {
    this.activeTrackId = track.origin.id;
  }

}

const trackStore = new TrackStore();

export default trackStore;
export { TrackStore };
{{< /highlight >}}

The same applies for the userStore.

*src/stores/userStore.js*

{{< highlight javascript "hl_lines=1 11 12 13" >}}
import { observable, action } from 'mobx';

class UserStore {

  @observable me;

  constructor() {
    this.me = null;
  }

  @action setMe = (me) => {
    this.me = me;
  }

}

const userStore = new UserStore();

export default userStore;
export { UserStore };
{{< /highlight >}}

Last but not least we have to exchange all the direct state mutations on the store with explicit action invocations.

*src/components/Stream/index.js*

{{< highlight javascript "hl_lines=17" >}}
import React from 'react';
import { observer } from 'mobx-react';
import Stream from './presenter';
import { CLIENT_ID } from '../../constants/auth';
import { auth } from '../../actions/auth';
import userStore from '../../stores/userStore';
import trackStore from '../../stores/trackStore';

const StreamContainer = observer(() => {
  return (
    <Stream
      me={userStore.me}
      tracks={trackStore.tracks}
      activeTrack={trackStore.activeTrack}
      clientId={CLIENT_ID}
      onAuth={auth}
      onPlay={trackStore.onPlay}
    />
  );
})

export default StreamContainer;
{{< /highlight >}}

*src/actions/auth.js*

{{< highlight javascript "hl_lines=16 24" >}}
import SC from 'soundcloud';
import userStore from '../stores/userStore';
import trackStore from '../stores/trackStore';

export function auth() {
  SC.connect().then((session) => {
    fetchMe(session);
    fetchStream(session);
  });
};

function fetchMe(session) {
  fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
    .then((response) => response.json())
    .then((me) => {
      userStore.setMe(me);
    });
}

function fetchStream(session) {
  fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
    .then((response) => response.json())
    .then((data) => {
      trackStore.setTracks(data.collection);
    });
}
{{< /highlight >}}

I would recommend to turn strict mode on as best practice when using MobX, because you know always which action alters the state.

{{% chapter_header "Provide and Inject" "provideAndInject" %}}

One last step is missing. We are still importing our stores somewhere in between of our components hierarchy in the Stream container. MobX provides some helpers to inject stores, but also other objects, from above. Let's begin in the React root component to provide the stores to the underlying component hierarchy. Therefore we can use the Provider component, which makes all its props available for its children.

*src/index.js*

{{< highlight javascript "hl_lines=2 10 11 18 21 29" >}}
import SC from 'soundcloud';
import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { useStrict } from 'mobx';
import App from './components/App';
import Callback from './components/Callback';
import StreamContainer from './components/Stream';
import userStore from './stores/userStore';
import trackStore from './stores/trackStore';
import { CLIENT_ID, REDIRECT_URI } from './constants/auth';

SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

useStrict(true);

const stores = { userStore, trackStore };

ReactDOM.render(
  <Provider { ...stores }>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={StreamContainer} />
        <Route path="/" component={StreamContainer} />
        <Route path="/callback" component={Callback} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
{{< /highlight >}}

Now we can refactor the Stream container component to get the stores with the inject higher order component. Inject uses the React context to pass the props from the Provider component above.

*src/components/Stream/index.js*

{{< highlight javascript "hl_lines=2 9 20" >}}
import React from 'react';
import { observer, inject } from 'mobx-react';
import Stream from './presenter';
import { CLIENT_ID } from '../../constants/auth';
import { auth } from '../../actions/auth';

const StreamContainer = inject('userStore', 'trackStore')(observer(({ userStore, trackStore }) => {
  return (
    <Stream
      me={userStore.me}
      tracks={trackStore.tracks}
      activeTrack={trackStore.activeTrack}
      clientId={CLIENT_ID}
      onAuth={auth}
      onPlay={trackStore.onPlay}
    />
  );
}))

export default StreamContainer;
{{< /highlight >}}

At the end one can remove all the unused libraries which we used in the Redux environment.

*From root folder:*

{{< highlight javascript >}}
npm uninstall --save redux react-redux redux-logger redux-thunk react-router-redux
{{< /highlight >}}

Finally one can see that due to the refactoring a lot of Redux dependent code has been removed. That could be seen as an advantage, because after spending some time to set up a bunch of Action Types, Action Creators, Actions and Reducers, it feels like a lot of boilerplate. The paradox is the fact that these constraints and APIs of Redux make it so successful for state management even in larger applications. MobX leaves out the whole architectural design which comes with Redux. Be aware of that and don't mistake MobX as replacement for Redux. You can find the outcome of this React tutorial in the {{% a_blank "react-mobx-soundcloud repository" "https://github.com/rwieruch/react-mobx-soundcloud" %}}. Moreover there exists a real world {{% a_blank "MobX + React + SoundCloud application" "https://github.com/rwieruch/favesound-mobx" %}}.

{{% chapter_header "Troubleshoot" "troubleshoot" %}}

You may encounter issues in that tutorial. Here you will find some references how to handle issues.

### Dependencies

In case you want to know which versions npm installed during that tutorial, here a list of all npm packages in my package.json.

{{< highlight javascript >}}
  "devDependencies": {
    "babel-core": "^6.9.1",
    "babel-loader": "^6.2.4",
    "babel-plugin-transform-class-properties": "^6.10.2",
    "babel-plugin-transform-decorators-legacy": "^1.3.4",
    "babel-preset-es2015": "^6.9.0",
    "babel-preset-react": "^6.5.0",
    "babel-preset-stage-2": "^6.5.0",
    "chai": "^3.5.0",
    "enzyme": "^2.3.0",
    "exports-loader": "^0.6.3",
    "imports-loader": "^0.6.5",
    "jsdom": "^9.2.1",
    "mocha": "^2.5.3",
    "react-addons-test-utils": "^15.1.0",
    "react-hot-loader": "^1.3.0",
    "webpack": "^1.13.1",
    "webpack-dev-server": "^1.14.1"
  },
  "dependencies": {
    "mobx": "^2.3.7",
    "mobx-react": "^3.5.1",
    "react": "^15.1.0",
    "react-dom": "^15.1.0",
    "react-router": "^2.4.1",
    "soundcloud": "^3.1.2",
    "whatwg-fetch": "^1.0.0"
  }
{{< /highlight >}}

{{% chapter_header "Final Thoughts" "finalThoughts" %}}

{{% look_again_the_soundcloud_client_in_react_redux %}}