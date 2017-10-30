+++
title = "Redux State Keys - A predictable yet dynamic substate"
description = "Redux state keys enable a dynamically allocated yet predictable substate. In a rapid development environment it happens quite often: There is no time to plan state structure..."
date = "2016-10-31T13:50:46+02:00"
tags = ["React", "Redux", "JavaScript"]
categories = ["React", "Redux", "JavaScript"]
keywords = ["redux state keys"]
news_keywords = ["redux state keys"]
hashtag = "#ReactJs"
card = "img/posts/redux-state-keys/banner_640.jpg"
banner = "img/posts/redux-state-keys/banner.jpg"
contribute = "redux-state-keys.md"
headline = "Redux State Keys - A predictable yet dynamic substate"

summary = "In a rapid development environment it happens quite often: There is no time to plan state structure ahead. There is no time to refactor in favour of abstractions. There is no place to refactor, because you have multiple teams working on feature folders, where every team is relieved to have their owned place. Redux state keys solve that problem. They enable a dynamically allocated yet predictable substate."
+++

{{% pin_it_image "redux state keys" "img/posts/redux-state-keys/banner.jpg" "is-src-set" %}}

Sometimes I feel it's quite obvious, but I never saw it somewhere written down. The article is my attempt to show you a way to organize your state with **state keys**. I'm using it in my projects, others might already use a similar approach. But nobody advertised it so far.

{{% chapter_header "Table of Contents" "toc" %}}

* [Cluttered State](#clutteredState)
* [Organized State](#organizedState)
* [State Keys](#stateKeys)
  * [State Key Definition](#stateKeyDefinition)
  * [Reducer + Action Abstraction](#reducerActionAbstraction)
  * [(Optional) Selectors & Static Types](#selectorsAndTypes)
  * [Usage](#usage)
* [Primitives vs. Objects](#primitivesVsObjects)
* [Static vs. Dynamic](#staticVsDynamic)
* [Key Takeaways of State Keys](#keyTakeaways)

{{% chapter_header "Cluttered State" "clutteredState" %}}

React + Redux developers tend to use feature folders these days. Most of the time they are coupled to a nested reducer and actions and thus they are less accessible from the outside. They still get exposed yet overlooked. I'm advertising feature folders as well, but in larger applications one often ends up with a cluttered state.

The cluttered state happens because in feature folders it's fairly easy to mix up specific and unspecifc domain state. Without thinking in advance about the nested substate in a feature folder, the state gets easily messy.

Consider the following example: You want to show error messages when a request fails (1), loading indicators for asynchronous requests (2) and load more buttons to fetch paginated data from your backend (3). Everything happens in different domains like editing an user or showing lists of messages and authors. Your state might look like the following, where all the things typically nest in domain specific states.

{{< highlight javascript >}}
{
  user: {
    isError: false, // (1)
    isLoading: false, // (2)
    ...
    entity: { ... },
  },
  messages: {
    isLoading: true, // (2)
    nextHref: '/api/messages?offset=200&size=100', // (3)
    ...
    entities: { ... },
  },
  authors: {
    isError: false, // (1)
    isLoading: false, // (2)
    nextHref: '/api/authors?offset=50&size=25', // (3)
    ...
    entities: { ... },
  },
}
{{< /highlight >}}

Additionally you face a bunch of duplicated actions and overlapping action types to change your state.

{{< highlight javascript >}}
{
  type: 'USER_EDIT_ERROR',
  payload: {
    isError,
  },
}

{
  type: 'USER_IS_LOADING',
  payload: {
    isLoading,
  },
}

{
  type: 'MESSAGES_IS_LOADING',
  payload: {
    isLoading,
  },
}

{
  type: 'MESSAGES_NEXT_HREF',
  payload: {
    nextHref,
  },
}

{
  type: 'AUTHORS_FETCH_ERROR',
  payload: {
    isError,
  },
}

{
  type: 'AUTHORS_IS_LOADING',
  payload: {
    isLoading,
  },
}

{
  type: 'AUTHORS_NEXT_HREF',
  payload: {
    nextHref,
  },
}
{{< /highlight >}}

In a rapid development environment it happens quite often. There is no time to plan state structure ahead. There is no time to refactor in favour of abstractions. There is no place to refactor, because you have multiple teams working on feature folders, where every team is relieved to have their owned place.

{{% chapter_header "Organized State" "organizedState" %}}

On the other hand you can clearly see patterns of abstractions. Easy wins. You should take the time to plan your state from the beginning. You should do the refactoring. You should address these topics in an multi team environment.

In the example above you can clearly **separate domain specific state from abstract state**. You might want a state like the following:

{{< highlight javascript >}}
{
  isLoading: {
    user: false,
    messages: true,
    authors: false,
    ...
  },
  isError: {
    userEdit: false,
    authorsFetch: false,
    ...
  },
  nextHref: {
    messages: '/api/messages?offset=200&size=100',
    authors: '/api/authors?offset=50&size=25',
    ...
  },
  user: {
    ...
    entity: { ... },
  },
  messages: {
    ...
    entities: { ... },
  },
  authors: {
    ...
    entities: { ... },
  },
}
{{< /highlight >}}

You introduce abstractions for error messages, loading indicators and hrefs to fetch paginated data. The domain specific state (user, messages, authors) stays tidy. The new abstractions (isError, isLoading, nextHref) become domain specific states as well. That's where the attempt to introduce **state keys** comes into play.

{{% chapter_header "State Keys" "stateKeys" %}}

It's no magic. Like I said, people may already use it, but nobody documented it so far. State keys use the advantage of keys to allocate substate. I will demonstrate it by the **dividing domain specific state from abstract state**.

{{% sub_chapter_header "State Key Definition" "stateKeyDefinition" %}}

First define your state keys and second divide them into groups.

{{< highlight javascript >}}
// isLoading group
const USER = 'USER';
const MESSAGES = 'MESSAGES';
const AUTHORS = 'AUTHORS';
{{< /highlight >}}

{{< highlight javascript >}}
// isError group
const USER_EDIT = 'USER_EDIT';
const AUTHORS_FETCH = 'AUTHORS_FETCH';
{{< /highlight >}}

{{< highlight javascript >}}
// nextHref group
const MESSAGES = 'MESSAGES';
const AUTHORS = 'AUTHORS';
{{< /highlight >}}

You can have a constants file for each group.

{{< highlight javascript >}}
--StateKeys
----isLoading.js
----isError.js
----nextHref.js
{{< /highlight >}}

The constants file for each group is important. It describes a finite number of allocated keys, thus a finite number of substates [C] in a group. Each group itself represents a substate [B] in your global state [A].

{{< highlight javascript >}}
--[A] state
----[B] isLoading
------[C] USER
------[C] MESSAGES
------[C] AUTHORS
----[B] isError
------[C] USER_EDIT
------[C] AUTHORS_FETCH
----[B] nextHref
------[C] MESSAGES
------[C] AUTHORS
{{< /highlight >}}

Once again in JavaScript syntax with some dummy state:

{{< highlight javascript >}}
/* A */ state : {
/* B */   isLoading: {
/* C */     USER: false,
/* C */     MESSAGES: true,
/* C */     AUTHORS: false,
          },
/* B */   isError: {
/* C */     USER_EDIT: false,
/* C */     AUTHORS_FETCH: false,
          },
/* B */   nextHref: {
/* C */     MESSAGES: '/api/messages?offset=200&size=100',
/* C */     AUTHORS: '/api/authors?offset=50&size=25',
          },
        }
{{< /highlight >}}

{{% sub_chapter_header "Reducer + Action Abstraction" "reducerActionAbstraction" %}}

Now it's time to implement a reducer + action pair for each group. To keep it simple, I show it only for the isLoading group.

*reducer.js*

{{< highlight javascript >}}
export default function(state = {}, action) {
  switch (action.type) {
    case 'SET_IS_LOADING':
      return applyIsLoading(state, action);
  }
  return state;
}

function applyIsLoading(state, action) {
  const { stateKey, isLoading } = action.payload;
  return { ...state, [stateKey]: isLoading };
}
{{< /highlight >}}

*action.js*

{{< highlight javascript >}}
export function setIsLoading(stateKey, isLoading) {
  return {
    type: 'SET_IS_LOADING',
    payload: {
      isLoading,
      stateKey,
    },
  };
}
{{< /highlight >}}

After all you will end up with the following relationship.

{{< highlight javascript >}}
1-Group of Constants (file) : n-State Keys : 1-Reducer
{{< /highlight >}}

> It seems like we pair one action with one reducer very strictly. But that's not the case. On the one hand you can still keep your reducer accessible for other actions. On the other hand you can use the action in other reducers as well. **Keep your actions as global events and don't use them as local commands.**

Each group allocates the same payload though. All state keys sharing the same action + reducer pair store the same data model.

Now one could allocate all stateKeys (USER, MESSAGES, AUTHORS) in the group (substate) isLoading. Here is one example how you would indicate that a list of messages is loading:

{{< highlight javascript >}}
// dispatch an action to indicate loading
import * as loadingStateKeys from '../StateKeys/isLoading';

dispatch(setIsLoading(loadingStateKeys.MESSAGES, true));
{{< /highlight >}}

Since it is a finite number of state keys in each group, the substate is predictable when you follow the constraints of state keys.

{{< highlight javascript >}}
// predictable substate
{
  isLoading: {
    USER: true,
    MESSAGES: false,
    AUTHORS: false,
  },
}
{{< /highlight >}}

{{% sub_chapter_header "(Optional) Selectors & Static Types" "selectorsAndTypes" %}}

Moreover it's even possible to retrieve the substates easily by their state keys. We are using selectors for those cases nowadays.

{{< highlight javascript >}}
function getIsLoading(state, stateKey) {
  return state.isLoading[stateKey];
}
{{< /highlight >}}

Optionally you can even more decouple the substate from the state.

{{< highlight javascript >}}
const SUBSTATE_GROUP = 'isLoading';

function getIsLoading(state, stateKey) {
  return state[SUBSTATE_GROUP][stateKey];
}
{{< /highlight >}}

Additionally a static type checker like {{% a_blank "flow" "https://flowtype.org/" %}} would be another great benefit. One could register all state keys for specific reducer, actions and selectors. It gives one a very predictable substate container.

{{% sub_chapter_header "Usage" "usage" %}}

Maybe the theory looks more difficult than it is. Imagine we would have implemented reducer + action pair for each isLoading, isError and nextHref group. Moreover we would have the dedicated state keys in constant files and additional selectors to retrieve the state by using state keys.

Now the following use case: We want to fetch paginated data from the backend.

{{< highlight javascript >}}
function fetchMessages(nextHref) {
  return function(dispatch) {
    dispatch(setIsLoading(loadingStateKeys.MESSAGES, true));

    const promise = fetch(nextHref);

    promise.then((data) => {
      dispatch(setNextHref(nextHrefStateKeys.MESSAGES, data.nextHref));

      // todo: handle data
    });

    promise.catch((error) => {
      dispatch(setIsError(isErrorStateKeys.MESSAGES, true, 'Something Went Wrong'));

      // todo: handle error
    });

    promise.finally(() => {
      dispatch(setIsLoading(loadingStateKeys.MESSAGES, false));
    });
  };
}
{{< /highlight >}}

The state key abstraction made it easy to deal with all the shown cases for asynchronous requests.

* set loading indicator while fetching
* set nextHref from data to fetch even more paginated data
* set a error when request fails and even more store a error message
* reset loading indicator after fetching

Moreover imagine a button component beneath our list of messages, which could be responsible to fetch paginated data. Once you click the button, the implemented `fetchMessages` action would get triggered. The button knows about the `nextHref` to pass it to the `fetchMessages` action, since its container component retrieves `nextHref` by using a state key selector `getNextHref(state, 'MESSAGES')`.

The example shows it only for `MESSAGES`, but you could easily exchange the state key to `AUTHORS` and implement a `fetchAuthors` function. Additionally the pattern scales: Once you want to add a new domain like 'COMMENTS', it's quite simple to add another state key which benefits from the pattern from the beginning.

{{% chapter_header "Primitives vs. Objects" "primitivesVsObjects" %}}

In our example we only store primitives. But you can apply it for complex objects as well. Imagine a Table component which supports to sort, filter and select. You want to have these states in your global state to keep it accessible from the outside. Now you could register each table component depending on their set of features (select, filter, sort) to different substates (groups) with their state key. Not all tables need to support all features.

{{< highlight javascript >}}
--select
----MESSAGES_TABLE
----AUTHORS_TABLE
--filter
----AUTHORS_TABLE
--sort
----MESSAGES_TABLE
----AUTHORS_TABLE
{{< /highlight >}}

Now it's fairly easy to keep track of different Tables and their substates. You can retrieve everything by using state key selectors.

{{% chapter_header "Static vs. Dynamic" "staticVsDynamic" %}}

A static set of state keys describes a finite number of allocated substates. The substate is predictable. On the other hand you may be already used to a dynamic allocation. The following should be familiar to you, especially when you use {{% a_blank "normalizr" "https://github.com/paularmstrong/normalizr" %}}:

{{< highlight javascript >}}
messages: {
  1: {
    id: 1,
    title: '',
  },
  2: {
    id: 2,
    title: '',
  },
  ...
},
{{< /highlight >}}

{{% chapter_header "Key Takeaways of State Keys" "keyTakeaways" %}}

State keys enable a dynamically allocated yet predictable substate. State keys are used in {{% a_blank "favesound-redux" "https://github.com/rwieruch/favesound-redux" %}} - a real world SoundCloud Client application. They are located in *src/constants*.

At the end I want to give you some key takeaways of state keys:

* they organize abstract state
* they prevent clutter in domain specific state
* they define an own domain specific state
* they remove duplications of reducer and actions
* they are scalable: add a new state key which benefits from the available reducer + action pairs immediately
* they make substate accessible (with selectors) by using a finite number of constants
* they make feature folder specific state accessible again

Even though you can apply the pattern without a library, a very good friend of mine already implemented {{% a_blank "redux-state-keys" "https://github.com/LFDM/redux-state-keys" %}} for you.
