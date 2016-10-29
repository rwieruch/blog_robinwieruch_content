+++
title = "Redux Ducks: Restructure your Redux App with Ducks"
description = "Redux Ducks: Restructure your Redux App with Ducks will teach you how to bundle action creators, action types and reducers side by side in your Redux app."
date = "2015-06-26T13:50:46+02:00"
tags = ["Redux"]
categories = ["Redux"]
keyword = "redux ducks"
news_keywords = ["redux ducks"]
banner = "img/posts/the-soundcloud-client-in-react-redux-ducks/banner.jpg"
dsq_thread_id = "4939644063"
contribute = "the-soundcloud-client-in-react-redux-ducks.md"

summary = "The Redux Ducks: Restructure your Redux App with Ducks tutorial will teach you how to bundle action creators, action types and reducers side by side in your Redux app. Usually in the beginning of learning Redux you have a technical separation of concerns which gets reflected in the folder structure. Basically there is one folder for your actions and one folder for your reducers. Additionally you collect all action types at one place that they can be reused by reducers and actions."
+++

# Redux Ducks: Restructure your Redux App with Ducks

{{% image_alt "redux ducks" "/img/posts/the-soundcloud-client-in-react-redux-ducks/banner.jpg" %}}

{{% read_before "This tutorial is part 2 of 2 in the series." "Part 1:" "The SoundCloud Client in React + Redux" "http://www.robinwieruch.de/the-soundcloud-client-in-react-redux/" %}}

The Redux Ducks: Restructure your Redux App with Ducks tutorial will teach you how to bundle action creators, action types and reducers side by side in your Redux app.

Usually in the beginning of learning Redux you have a technical separation of concerns which gets reflected in the folder structure. Basically there is one folder for your actions and one folder for your reducers. Additionally you collect all action types at one place that they can be reused by reducers and actions.

Since it is often the case that an action is followed by a reducer and both of them share the same action type, a new recommendation came up to collocate all of them at one place. They call it {{% a_blank "Ducks" "https://github.com/erikras/ducks-modular-redux" %}}.

The tutorial itself will not strictly follow all proposed guidelines of the recommendation, but it gives you a good understanding of how your app would look like after the refactoring and the advantages of using the bundling.

{{% build_on_the_soundcloud_client_in_react_redux %}}

{{% chapter_header "Table of Contents" "toc" %}}

* [Refactor Auth Redux Duck](#refactorAuthDuck)
* [Refactor Track Redux Duck](#refactorTrackDuck)
* [Troubleshoot](#troubleshoot)
* [Final Thoughts](#finalThoughts)

{{% chapter_header "Refactor Auth Redux Duck" "refactorAuthDuck" %}}

Basically we have two ducks in the SoundCloud app: There is one place for the authentication and data fetching and another place where the tracks are saved and played.

Let’s begin with the auth duck: In the existent app you will find the auth actions in *src/actions/auth.js* and the reducer in *src/reducers/auth.js*. Moreover there is one action type in the *src/constants/actionTypes.js* file.

A new folder for the ducks instead of actions / reducers folder pairs will help us to collocate actions and reducers.

*From src folder:*

{{< highlight javascript >}}
mkdir ducks
cd ducks
touch auth.js
{{< /highlight >}}

At first we can move the the sole auth action type.

*src/ducks/auth.js*

{{< highlight javascript >}}
const ME_SET = 'ME_SET';
{{< /highlight >}}

As you can see we are not exporting anything at this time. We can even more refactor the action type itself to represent the duck bundle. In a growing application it is an improved way to identify the actions and places in the source code.

*src/ducks/auth.js*

{{< highlight javascript "hl_lines=1" >}}
const ME_SET = 'auth/ME_SET';
{{< /highlight >}}

The next step is to move the action creators. I have highlighted the important pieces after the copy and paste from *src/actions/auth.js*.

*src/ducks/auth.js*

{{< highlight javascript "hl_lines=1 2 6 8 13 16 17 22 27 32 37" >}}
import SC from 'soundcloud';
import { setTracks as doSetTracks } from '../actions';

const ME_SET = 'auth/ME_SET';

function doSetMe(user) {
  return {
    type: ME_SET,
    user
  };
}

function doAuth() {
  return function (dispatch) {
    SC.connect().then((session) => {
      dispatch(doFetchMe(session));
      dispatch(doFetchStream(session));
    });
  };
}

function doFetchMe(session) {
    return function (dispatch) {
      fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
        .then((response) => response.json())
        .then((data) => {
          dispatch(doSetMe(data));
        });
    };
}

function doFetchStream(session) {
  return function (dispatch) {
    fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(doSetTracks(data.collection));
      });
  };
}
{{< /highlight >}}

Again we are not exporting anything. Moreover the action creators got prefixed. Since reducers and action creators will live side by side, it is a good way to keep the naming in your file tidy. Additionally we need to import the action creator to set tracks like we did before, but with an alias to follow the new naming convention. We will refactor that later when we have a duck for the track bundle as well.

Last but not least let’s move our reducer.

*src/ducks/auth.js*

{{< highlight javascript "hl_lines=24 26 27 32" >}}
import { CLIENT_ID, REDIRECT_URI } from '../constants/auth';
import { setTracks as doSetTracks } from '../actions';

const ME_SET = 'auth/ME_SET';

function doSetMe(user) {
  ...
}

function doAuth() {
  ...
}

function doFetchMe(session) {
  ...
}

function doFetchStream(me, session) {
  ...
}

const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ME_SET:
      return applySetMe(state, action);
  }
  return state;
}

function applySetMe(state, action) {
  const { user } = action;
  return { ...state, user };
}
{{< /highlight >}}

Note that the reducer is a named function and we prefixed its functions as well. As last step we have to export all the necessary stakeholders.

*src/ducks/auth.js*

{{< highlight javascript "hl_lines=3 4 5 6 7 8 9 10 11 12 13 14 15 16" >}}
...

const actionCreators = {
  doAuth
};

const actionTypes = {
  ME_SET
};

export {
  actionCreators,
  actionTypes
};

export default reducer;
{{< /highlight >}}

> Usually you don’t need to export the action types, but there may be cases where you have to export. They could be used by tests or other side effect middleware like {{% a_blank "redux-saga" "https://github.com/yelouafi/redux-saga" %}}. The example just gives a suggestion how you would accomplish a clean export of all stakeholders.

Now it is time to clean up and remove the files which are unused.

*From src folder:*

{{< highlight javascript >}}
rm actions/auth.js
rm reducers/auth.js
{{< /highlight >}}

Remove the unused action type ME_SET as well. Keep the remaining action types for now.

*src/constants/actionTypes.js*

{{< highlight javascript >}}
export const TRACKS_SET = 'TRACKS_SET';
export const TRACK_PLAY = 'TRACK_PLAY';
{{< /highlight >}}

Moreover we can remove the dependency in the entry points of our legacy actions. The file should look like the following without the auth bundle:

*src/actions/index.js*

{{< highlight javascript >}}
import { setTracks, playTrack } from './track';

export {
  setTracks,
  playTrack
};
{{< /highlight >}}

After the auth duck is finished and all actions creators and reducers are side by side, we can use the new reducer location to export the combined reducers for the store and use the replaced action creators in the Stream container.

*src/reducers/index.js*

{{< highlight javascript "hl_lines=3" >}}
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from '../ducks/auth';
import track from './track';

export default combineReducers({
  auth,
  track,
  routing: routerReducer
});
{{< /highlight >}}

*src/components/Stream/index.js*

{{< highlight javascript "hl_lines=5 21" >}}
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { actionCreators as authActionCreators } from '../../ducks/auth';
import Stream from './presenter';

function mapStateToProps(state) {
  const { user } = state.auth;
  const { tracks, activeTrack } = state.track;
  return {
    user,
    tracks,
    activeTrack
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onPlay: bindActionCreators(actions.playTrack, dispatch),
    onAuth: bindActionCreators(authActionCreators.doAuth, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
{{< /highlight >}}

The app should still be intact after all, but it comes with our first duck!

*From root folder:*

{{< highlight javascript >}}
npm start
{{< /highlight >}}

{{% chapter_header "Refactor Redux Track Duck" "refactorTrackDuck" %}}

Now it’s time to create the track duck.

*From ducks folder:*

{{< highlight javascript >}}
touch track.js
{{< /highlight >}}

Let’s move the action types, action creators and reducer. Again I highlighted the changed pieces after copy and pasting the relevant lines of code.

*src/ducks/track.js*

{{< highlight javascript "hl_lines=1 2 4 6 11 13 23 25 26 27 28 33 38 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58" >}}
const TRACKS_SET = 'track/TRACKS_SET';
const TRACK_PLAY = 'track/TRACK_PLAY';

function doSetTracks(tracks) {
  return {
    type: TRACKS_SET,
    tracks
  };
};

function doPlayTrack(track) {
  return {
    type: TRACK_PLAY,
    track
  };
}

const initialState = {
  tracks: [],
  activeTrack: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case TRACKS_SET:
      return applySetTracks(state, action);
    case TRACK_PLAY:
      return applySetPlay(state, action);
  }
  return state;
}

function applySetTracks(state, action) {
  const { tracks } = action;
  return { ...state, tracks };
}

function applySetPlay(state, action) {
  const { track } = action;
  return { ...state, activeTrack: track };
}

const actionCreators = {
  doSetTracks,
  doPlayTrack
};

const actionTypes = {
  TRACKS_SET,
  TRACK_PLAY
};

export {
  actionCreators,
  actionTypes
};

export default reducer;
{{< /highlight >}}

Now we provide the store with the relocated reducer like we did with the auth duck.

*src/reducers/index.js*

{{< highlight javascript "hl_lines=4" >}}
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from '../ducks/auth';
import track from '../ducks/track';

export default combineReducers({
  auth,
  track,
  routing: routerReducer
});
{{< /highlight >}}

Same applies for the Stream container component. We can import the actionCreators from their new place.

*src/components/Stream/index.js*

{{< highlight javascript "hl_lines=4 20" >}}
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as trackActionCreators } from '../../ducks/track';
import { actionCreators as authActionCreators } from '../../ducks/auth';
import Stream from './presenter';

function mapStateToProps(state) {
  const { user } = state.auth;
  const { tracks, activeTrack } = state.track;
  return {
    user,
    tracks,
    activeTrack
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onPlay: bindActionCreators(trackActionCreators.doPlayTrack, dispatch),
    onAuth: bindActionCreators(authActionCreators.doAuth, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
{{< /highlight >}}

Remember when we had to import the setTracks as doSetTracks alias in the auth duck? Now we renamed it due to the track duck refactoring and can change that in the auth duck.

*src/ducks/auth.js*

{{< highlight javascript "hl_lines=2 26" >}}
import SC from 'soundcloud';
import { actionCreators as trackActionCreators } from './track';

const ME_SET = 'auth/ME_SET';

function doSetMe(user) {
  return {
    type: ME_SET,
    user
  };
}

function doAuth() {
  ...
}

function doFetchMe() {
  ...
}

function doFetchStream(session) {
  return function (dispatch) {
    fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(trackActionCreators.doSetTracks(data.collection));
      });
  };
}

const initialState = {};

...
{{< /highlight >}}

As last step we can remove all unused folders and files now.

*From src folder:*

{{< highlight javascript >}}
rm -rf actions
rm constants/actionTypes.js
rm reducers/track.js
{{< /highlight >}}

After the refactoring the folder structure should look like the following:

*Folder structure:*

{{< highlight javascript >}}
-src
--components
--constants
--ducks
---auth.js
---track.js
--reducers
--stores
--index.js
{{< /highlight >}}

Finally we have a clean bundling of {action type, action creator and reducer} tuples with the ducks pattern. We still have a reducers folder to combine all of the reducers for the store, but one could move this next to the store to get rid of the reducers folder as well. After that the app would only have components and ducks as main bundling folders.

{{% chapter_header "Troubleshoot" "troubleshoot" %}}

You may encounter issues in that tutorial. Here you will find some references how to handle issues.

### Dependencies

In case you want to know which versions npm installed during that tutorial, here a list of all npm packages in my package.json.

{{< highlight javascript >}}
  "devDependencies": {
    "babel-core": "^6.9.1",
    "babel-loader": "^6.2.4",
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
