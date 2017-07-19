+++
title = "Redux Normalizr: Improve your State Management"
description = "The Redux Normalizr: Improve your State Management tutorial will teach you how to use normalizr. Avoid deep nested data structures ..."
date = "2016-07-09T13:50:46+02:00"
tags = ["React", "Redux"]
categories = ["React", "Redux"]
keyword = "redux normalizr"
news_keywords = ["redux normalizr"]
hashtag = "#ReactJs"
banner = "img/posts/the-soundcloud-client-in-react-redux-normalizr/banner.jpg"
contribute = "the-soundcloud-client-in-react-redux-normalizr.md"
headline = "Redux Normalizr: Improve your State Management"

summary = "The Normalizr in Redux tutorial will teach you how to use normalizr for an improved data management in your Redux store. The library itself will help you to avoid deep nested data structures although the returned data from a server is deeply nested. Additionally it comes for free to enable a manageable single source of truth for data entities in your global store."
+++

{{% pin_it_image "redux normalizr" "img/posts/the-soundcloud-client-in-react-redux-normalizr/banner.jpg" "is-src-set" %}}

{{% read_before "This tutorial is part 2 of 2 in the series." "Part 1:" "The SoundCloud Client in React + Redux" "https://www.robinwieruch.de/the-soundcloud-client-in-react-redux/" %}}

The Normalizr in Redux tutorial will teach you how to use {{% a_blank "normalizr" "https://github.com/paularmstrong/normalizr" %}} for an improved data management in your Redux store. The library itself will help you to avoid deep nested data structures although the returned data from a server is deeply nested. Additionally it comes for free to enable a manageable single source of truth for data entities in your global store.

{{% build_on_the_soundcloud_client_in_react_redux %}}

{{% chapter_header "Table of Contents" "toc" %}}

* [Your Favorite Track](#favoriteTrack)
* [Normalizr](#normalizr)
* [Exercise](#exercise)
* [Troubleshoot](#troubleshoot)
* [Final Thoughts](#finalThoughts)

{{% chapter_header "Your Favorite Track" "favoriteTrack" %}}

In the beginning we will not add the normalizr module. First we want to add a new feature: to like or unlike a track in our SoundCloud client. That feature allows me to demonstrate a common problem in Redux and how normalizr can be used to solve it.

Let's start by displaying the playing track once the user hits a Play button.

*src/components/Stream/presenter.js*

{{< highlight javascript "hl_lines=24 27 28 29 30" >}}
...
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
      <br/>
      {
        activeTrack ?
          <div>
            <div>Playing: {activeTrack.origin.title}</div>
            <audio id="audio" ref="audio" src={`${activeTrack.origin.stream_url}?client_id=${CLIENT_ID}`}></audio>
          </div> :
          null
      }
    </div>
  );
...
{{< /highlight >}}

Now we can introduce a new child component - the LikeButton. We will use the button in the list of tracks but also for the currently playing track. The user should be able to like tracks from both places.

*src/components/Stream/presenter.js*

{{< highlight javascript "hl_lines=5 6 7 8 9 10 11 12 13 14 15 41 53" >}}
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CLIENT_ID } from '../../constants/auth';

function LikeButton({ track }) {
  return (
    <span>
      {
        track.origin.user_favorite ?
          <button type="button">Unlike</button> :
          <button type="button">Like</button>
      }
    </span>
  );
}

class Stream extends Component {

  ...

  render() {
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
                  <LikeButton track={track} />
                </div>
              );
          })
        }
        </div>
        <br/>
        {
          activeTrack ?
            <div>
              <div>
                Playing: {activeTrack.origin.title}
                <LikeButton track={activeTrack} />
              </div>
              <audio id="audio" ref="audio" src={`${activeTrack.origin.stream_url}?client_id=${CLIENT_ID}`}></audio>
            </div>:
            null
        }
      </div>
    );
  }

  ...

}
{{< /highlight >}}

The LikeButton gets a track and decides based on the user_favorite flag to show a Like or Unlike label. There is no functionality behind the button yet.

Let's implement the like functionality, but without having a real request to the SoundCloud server. We can fake it for the beginning by toggling the user_favorite flag on the track. First we need to pass in the new onLike function to our component and use it in the LikeButton.

*src/components/Stream/presenter.js*

{{< highlight javascript "hl_lines=5 10 11 20 39 51" >}}
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CLIENT_ID } from '../../constants/auth';

function LikeButton({ track, onLike }) {
  return (
    <span>
      {
        track.origin.user_favorite ?
          <button type="button" onClick={() => onLike(track)}>Unlike</button> :
          <button type="button" onClick={() => onLike(track)}>Like</button>
      }
    </span>
  );
}

class Stream extends Component {
  ...
  render() {
    const { user, tracks = [], activeTrack, onAuth, onPlay, onLike } = this.props;

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
                  <LikeButton track={track} onLike={onLike} />
                </div>
              );
          })
        }
        </div>
        <br/>
        {
          activeTrack ?
            <div>
              <div>
                Playing: {activeTrack.origin.title}
                <LikeButton track={activeTrack} onLike={onLike} />
              </div>
              <audio id="audio" ref="audio" src={`${activeTrack.origin.stream_url}?client_id=${CLIENT_ID}`}></audio>
            </div>:
            null
        }
      </div>
    );
  }
  ...
}
{{< /highlight >}}

The function gets the track to like/unlike as parameter.

In the container component we need to map the new unimplemented functionality.

*src/components/Stream/index.js*

{{< highlight javascript "hl_lines=21" >}}
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
}

function mapDispatchToProps(dispatch) {
  return {
    onPlay: bindActionCreators(actions.playTrack, dispatch),
    onAuth: bindActionCreators(actions.auth, dispatch),
    onLike: bindActionCreators(actions.likeTrack, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
{{< /highlight >}}

Now let's implement the action + reducer functionality to fulfil the roundtrip. We begin this by declaring a new action type.

*src/constants/actionTypes.js*

{{< highlight javascript "hl_lines=4" >}}
export const ME_SET = 'ME_SET';
export const TRACKS_SET = 'TRACKS_SET';
export const TRACK_PLAY = 'TRACK_PLAY';
export const TRACK_LIKE = 'TRACK_LIKE';
{{< /highlight >}}

Moreover we need a new action creator.

*src/actions/track.js*

{{< highlight javascript "hl_lines=17 18 19 20 21 22" >}}
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

export function likeTrack(track) {
  return {
    type: actionTypes.TRACK_LIKE,
    track
  };
}
{{< /highlight >}}

And make it accessible in the entry point file for actions.

*src/actions/index.js*

{{< highlight javascript "hl_lines=2 8" >}}
import { auth } from './auth';
import { setTracks, playTrack, likeTrack } from './track';

export {
  auth,
  setTracks,
  playTrack,
  likeTrack,
};
{{< /highlight >}}

The last step of the roundtrip is to catch the new action type in the reducer.

*src/reducers/track.js*

{{< highlight javascript "hl_lines=2 15 16 31 32 33 34 35 36 37 38 39 40 41 42 43 44" >}}
import * as actionTypes from '../constants/actionTypes';
import { findIndex } from 'lodash';

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
    case actionTypes.TRACK_LIKE:
      return setLike(state, action);
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

function setLike(state, action) {
  const { track } = action;

  const index = findIndex(state.tracks, (t) => t.origin.id === track.origin.id);
  const newTrack = { ...track, origin: { ...track.origin, user_favorite: !state.tracks[index].origin.user_favorite } };

  const tracks = [
    ...state.tracks.slice(0, index),
    newTrack,
    ...state.tracks.slice(index + 1)
  ];

  return { ...state, tracks };
}
{{< /highlight >}}

Basically we construct a new tracks array based on the old tracks plus a newTrack with a toggled user_favorite flag. We don't mutate anything here, because we use the spread operator to create a copy of the track. Moreover we make sure that the list has still the same order.

Additionally we have to install {{% a_blank "Lodash" "https://lodash.com/" %}}, a utility library, to get access to a functionality like `findIndex`.

*From root folder:*

{{< highlight javascript >}}
npm install --save lodash
{{< /highlight >}}

We can try the new like functionality by starting our app.

*From root folder:*

{{< highlight javascript >}}
npm start
{{< /highlight >}}

We are now able to like a track from the list or like the playing track. But we can also see that it seems buggy, since whenever we like the playing track, only the track in the list gets updated. This happens because the tracks don't share the same reference. They are immutable objects and thus whenever one is updated the other one doesn't get the change. The activeTrack is a copy of one of our tracks from the list.

Moreover imagine when we login we would fetch all of our favorite tracks next to the stream list of tracks. Maybe we would have duplications in there and once we update one of the entities the other one wouldn't get an update. We would have to sync them all the time and that doesn't scale at all.

All of this sums up to a common problem users are facing today. In the past mutable objects allowed us to change references everywhere. That's how everyone learned JavaScript, because it doesn't come with an immutable data structure. In scaling applications it caused a lot of undesired side effects though. The rise of functional programming and immutability, especially with libraries like React, Redux and Immutable, allow us to avoid side effects. Now we need to learn how to manage the entities in the global store to avoid duplication and sync annoyance.

{{% chapter_header "Normalizr" "normalizr" %}}

Now {{% a_blank "normalizr" "https://github.com/paularmstrong/normalizr" %}} comes into play. The library helps us to keep the tracks in sync by giving us the ability to have only one source of truth for the tracks. The source of truth is a map of track entities. Everything else, like the activeTrack or the list of stream tracks, are only an id to reference an entity in the track entities map.

First we have to install the module.

*From root folder:*

{{< highlight javascript >}}
npm install --save normalizr
{{< /highlight >}}

Normalizr comes with schemas. A schema defines a type of entity. In our case an entity could be a track or an user (either the login user or the user within the track object). We can start by defining our first schema.

*From src folder:*

{{< highlight javascript >}}
mkdir schemas
cd schemas
touch track.js
{{< /highlight >}}

*src/schemas/track.js*

{{< highlight javascript >}}
import { Schema } from 'normalizr';

const trackSchema = new Schema('tracks');

export default trackSchema;
{{< /highlight >}}

Now we can use that schema in the fetchStream SoundCloud request.

*src/actions/auth.js*

{{< highlight javascript "hl_lines=2 3 4 15 16" >}}
import SC from 'soundcloud';
import { map } from 'lodash';
import { arrayOf, normalize } from 'normalizr';
import trackSchema from '../schemas/track';
import * as actionTypes from '../constants/actionTypes';
import { setTracks } from '../actions/track';

...

function fetchStream(session) {
  return function (dispatch) {
    fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
      .then((response) => response.json())
      .then((data) => {
        const normalized = normalize(map(data.collection, 'origin'), arrayOf(trackSchema));
        console.log(normalized);
        dispatch(setTracks(data.collection));
      });
  };
}
{{< /highlight >}}

The normalize function takes a list of objects and the schema as arguments. Moreover the schema can get wrapped into an arrayOf function to specify that the input objects are an array. Additionally we need to map the returned tracks, because the exposed object in the list has no id, but the underlying origin object has the track id.

We don't use the normalized data yet, but you can see it as console output. Once you start the app, the output shows the normalized data: a list of ids (track ids) and a map on entities (track entities).

One can even go one step further to demonstrate the mapping of nested data. We are not using user entities yet, but for later usage, you could already define an user schema.

*From schemas folder:*

{{< highlight javascript >}}
touch user.js
{{< /highlight >}}

*src/schemas/user.js*

{{< highlight javascript >}}
import { Schema } from 'normalizr';

const userSchema = new Schema('users');

export default userSchema;
{{< /highlight >}}

And use it as nested data in the track schema.

*src/schemas/track.js*

{{< highlight javascript "hl_lines=2 6 7 8" >}}
import { Schema } from 'normalizr';
import userSchema from './user';

const trackSchema = new Schema('tracks');

trackSchema.define({
  user: userSchema
});

export default trackSchema;
{{< /highlight >}}

Start again the app to see the console output. Now the normalized data should contain a list of ids (track ids) and two maps of entities (track and user entities). Moreover when you have a look at a track entity, you will find out that the user object in there is only referenced by an id rather than having the whole user object.

Now let's refactor first actions and reducer and second the component itself.

*src/actions/auth.js*

{{< highlight javascript "hl_lines=9" >}}
...

function fetchStream(me, session) {
  return function (dispatch) {
    fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
      .then((response) => response.json())
      .then((data) => {
        const normalized = normalize(map(data.collection, 'origin'), arrayOf(trackSchema));
        dispatch(setTracks(normalized.entities.tracks, normalized.result));
      });
  };
}
{{< /highlight >}}

The normalized data gets dispatched rather than the plain data. Moreover we already split it up into entities and ids.

The action creators will deal with ids rather than a whole object. This helps us to reference only to one source of truth later on.

*src/actions/track.js*

{{< highlight javascript "hl_lines=3 6 7 11 14 18 21" >}}
import * as actionTypes from '../constants/actionTypes';

export function setTracks(trackEntities, trackIds) {
  return {
    type: actionTypes.TRACKS_SET,
    trackEntities,
    trackIds
  };
};

export function playTrack(trackId) {
  return {
    type: actionTypes.TRACK_PLAY,
    trackId
  };
}

export function likeTrack(trackId) {
  return {
    type: actionTypes.TRACK_LIKE,
    trackId
  };
}
{{< /highlight >}}

The initialState of the reducer will change as well. Rather than having one list of track entities, you will end up with a map of entities and a list of track ids.

*src/reducers/track.js*

{{< highlight javascript "hl_lines=5 6 7 23 24 28 29 33 34 35" >}}
import * as actionTypes from '../constants/actionTypes';
import { findIndex } from 'lodash';

const initialState = {
    trackEntities: {},
    trackIds: [],
    activeTrackId: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TRACKS_SET:
      return setTracks(state, action);
    case actionTypes.TRACK_PLAY:
      return setPlay(state, action);
    case actionTypes.TRACK_LIKE:
      return setLike(state, action);
  }
  return state;
}

function setTracks(state, action) {
  const { trackEntities, trackIds } = action;
  return { ...state, trackEntities, trackIds };
}

function setPlay(state, action) {
  const { trackId } = action;
  return { ...state, activeTrackId: trackId };
}

function setLike(state, action) {
  const { trackId } = action;
  const newTrack = { ...state.trackEntities[trackId], user_favorite: !state.trackEntities[trackId].user_favorite };
  return { ...state, trackEntities: { ...state.trackEntities, [trackId]: newTrack } };
}
{{< /highlight >}}

Now comes the crucial point: Remember when we liked a track and the list of tracks and the playing track like states went out of sync? Now we have a list of ids for the list of tracks and a track id for the active track. Both point to one source of truth: the track entities. Therefore we had to refactor the setPlay and setLike functionality to make use of the new ids and entities. The code gets much more readable now.

The last step is to respect the new state structure in the Stream component. The container component gets the new list of ids and map of entities.

*src/components/Stream/index.js*

{{< highlight javascript "hl_lines=9 12 13 14" >}}
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Stream from './presenter';

function mapStateToProps(state) {
  const { user } = state.auth;
  const { trackIds, trackEntities, activeTrackId } = state.track;
  return {
    user,
    trackIds,
    trackEntities,
    activeTrackId,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onPlay: bindActionCreators(actions.playTrack, dispatch),
    onAuth: bindActionCreators(actions.auth, dispatch),
    onLike: bindActionCreators(actions.likeTrack, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
{{< /highlight >}}

Now the presenter component can get refactored to make usage of both entities and ids to retrieve the proper track object.

*src/components/Stream/presenter.js*

{{< highlight javascript "hl_lines=9 10 11 24 26 34 48 51 52 53 61 64 65 67" >}}
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CLIENT_ID } from '../../constants/auth';

function LikeButton({ track, onLike }) {
  return (
    <span>
      {
        track.user_favorite ?
          <button type="button" onClick={() => onLike(track.id)}>Unlike</button> :
          <button type="button" onClick={() => onLike(track.id)}>Like</button>
      }
    </span>
  );
}

class Stream extends Component {

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if (!audioElement) { return; }

    const { activeTrackId } = this.props;

    if (activeTrackId) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  render() {
    const { user, trackIds = [], trackEntities = {}, activeTrackId, onAuth, onPlay, onLike } = this.props;

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
          trackIds.map((id, key) => {
              return (
                <div className="track" key={key}>
                  {trackEntities[id].title}
                  <button type="button" onClick={() => onPlay(id)}>Play</button>
                  <LikeButton track={trackEntities[id]} onLike={onLike} />
                </div>
              );
          })
        }
        </div>
        <br/>
        {
          activeTrackId ?
            <div>
              <div>
                Playing: {trackEntities[activeTrackId].title}
                <LikeButton track={trackEntities[activeTrackId]} onLike={onLike} />
              </div>
              <audio id="audio" ref="audio" src={`${trackEntities[activeTrackId].stream_url}?client_id=${CLIENT_ID}`}></audio>
            </div> :
            null
        }
      </div>
    );
  }
}

export default Stream;
{{< /highlight >}}

When you start again the app, the like of both track in list and active track should be in sync. Both are only ids and point to the map of track entities.

*From root folder:*

{{< highlight javascript >}}
npm start
{{< /highlight >}}

Last but not least we can fix the broken test by respecting the new data structure as input for the Stream component.

*src/components/Stream/spec.js*

{{< highlight javascript "hl_lines=3 4" >}}
...
  const props = {
    trackIds: ['x', 'y'],
    trackEntities: { x: { title: 'x' }, y: { title: 'y' } }
  };
...
{{< /highlight >}}

Finally we are done using normalizr for our React + Redux app. Normalizr helps to organize deeply nested data structures. You can see how it already manages track and user entities even though SoundCloud returns that data in a nested structure. Moreover the normalized data structure allows us to manage our global state in an improved way. We can use one single source of truth to apply changes.

{{% chapter_header "Exercise" "exercise" %}}

You can use the SoundCloud API ([What's an API?](https://www.robinwieruch.de/what-is-an-api-javascript/)) to like the track for real without faking it. Look into the {{% a_blank "API Documentation" "https://developers.soundcloud.com/docs/api/guide" %}} for more advice.

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
    "lodash": "^4.13.1",
    "normalizr": "^2.1.0",
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