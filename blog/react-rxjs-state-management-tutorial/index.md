---
title: "React with RxJS for State Management Tutorial"
description: "A tutorial on how to use RxJS in React for state management. It shows how to implement a Rx.js higher-order component (hoc) that takes over the observable streams ..."
date: "2018-10-22T13:50:46+02:00"
categories: ["React"]
keywords: ["react rxjs tutorial", "rxjs react js tutorial", "react rxjs hoc", "react with rxjs", "react rxjs example", "react rxjs event", "react rxjs state", "react rxjs observable", "react rxjs component"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Recently a [client of mine](/work-with-me/) inspired me to learn [RxJS](https://www.learnrxjs.io) for State Management in React. When I did a code audit for their application, they wanted to get my opinion about how to proceed with it after [only using React's local state](/learn-react-before-using-redux/). They reached a point where it wasn't feasible to only rely on [React's state management](/react-state/). The initial discussion was about [Redux or MobX](/redux-mobx/) for a more sophisticated state management. They had built a prototype for each of these technologies. However, they had also a prototype for a React application with RxJS. That's where the discussion got interesting.

**The application was a marketplace for cryptocurrencies which had lots of real-time widgets. The challenges:**

* Managing the control flow of many (asynchronously) data requests
* Real-time updates of various widgets on the dashboard
* Widgets and data coupling, because widgets needed data from other widgets too

In conclusion, the challenge was not about React itself, even though I was able to help here and there with it, but managing everything behind the scenes that couple the cryptocurrency domain to React. That's where RxJS got interesting and the prototype they showed me looked really promising.

In this tutorial, I want to guide you through building a simple application with RxJS in React. I am by no means an expert with RxJS, just learning it myself, and maybe some people can help me out here and there, but in the end, I just hope to offer you inspiration on how to do things differently in React. This tutorial is no introduction to RxJS but only one of many ways of using RxJS with React.

# RxJS in React

Let's say we have an application which will make a request to a [third-party API](https://hn.algolia.com/api) eventually. Before we can do this request, we have to capture a search term that is used for the data fetching to create the API URL.

```javascript
import React from 'react';

const App = ({ query, onChangeQuery }) => (
  <div>
    <h1>React with RxJS</h1>

    <input
      type="text"
      value={query}
      onChange={event => onChangeQuery(event.target.value)}
    />

    <p>{`http://hn.algolia.com/api/v1/search?query=${query}`}</p>
  </div>
);

export default App;
```

What's missing in this React component is the state management. No one stores the state for the `query` property and no one updates the state with the `onChangeQuery` function. Usually you would add local state management to this React component.

```javascript{2,3,4,5,6,7,8,10,11,12,21,23,28}
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };
  }

  onChangeQuery = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div>
        <h1>React with RxJS</h1>

        <input
          type="text"
          value={this.state.query}
          onChange={event =>
            this.onChangeQuery(event.target.value)
          }
        />

        <p>{`http://hn.algolia.com/api/v1/search?query=${
          this.state.query
        }`}</p>
      </div>
    );
  }
}

export default App;
```

But that's not the approach we are going to use here. Instead, we want to manage the state somehow with RxJS. Let's see how we can do this with a higher-order component. If you want, you can implement the following logic in your App component too, but you will most likely extract it as a [reusable higher-order component (HOC)](/react-higher-order-components/) at some point anyway.

# React + RxJS Higher-Order Component (HOC)

Let's introduce a way on how to manage state in React with RxJS by having a higher-order component for it. You could also implement a [render prop component](/react-render-props/) instead. In the end, if you don't want to implement your own higher-order component for it, checkout [recompose's observable higher-order components](https://github.com/acdlite/recompose/blob/master/docs/API.md#observable-utilities) with `mapPropsStream()` and `componentFromStream()`. In this tutorial though, you will build your own.

```javascript{3,4,5,6,7,8,9,10,11,12,13,14,15,31}
import React from 'react';

const withObservableStream = (...) => Component => {
  return class extends React.Component {
    componentDidMount() {}

    componentWillUnmount() {}

    render() {
      return (
        <Component {...this.props} {...this.state} />
      );
    }
  };
};

const App = ({ query, onChangeQuery }) => (
  <div>
    <h1>React with RxJS</h1>

    <input
      type="text"
      value={query}
      onChange={event => onChangeQuery(event.target.value)}
    />

    <p>{`http://hn.algolia.com/api/v1/search?query=${query}`}</p>
  </div>
);

export default withObservableStream(...)(App);
```

The RxJS HOC is not doing anything yet. It only [passes its own state and props](/react-pass-props-to-component/) to the input component which is going to be enhanced by it. As you can see, the higher-order component will manage React state eventually. However, this state will be derived from an observable stream. Before we can start implementing the HOC and using it for App component, we have to install RxJS:

```javascript
npm install rxjs --save
```

Now, let's start by using the HOC and implementing the logic of the HOC afterward:

```javascript{2,20,22,23,24,25,26,27}
import React from 'react';
import { BehaviorSubject } from 'rxjs';

...

const App = ({ query, onChangeQuery }) => (
  <div>
    <h1>React with RxJS</h1>

    <input
      type="text"
      value={query}
      onChange={event => onChangeQuery(event.target.value)}
    />

    <p>{`http://hn.algolia.com/api/v1/search?query=${query}`}</p>
  </div>
);

const query$ = new BehaviorSubject({ query: 'react' });

export default withObservableStream(
  query$,
  {
    onChangeQuery: value => query$.next({ query: value }),
  }
)(App);
```

The App component itself didn't change. We have only passed two arguments to the higher-order component.

* **Observable:** The `query` argument is an observable which has an initial value, but also emits its new values over time (hence the BehaviorSubject). Anyone can subscribe to this observable. Explanation from the [RxJS documentation](http://reactivex.io/rxjs/manual/overview.html#subject) about the BehaviorSubject: *"One of the variants of Subjects is the BehaviorSubject, which has a notion of "the current value". It stores the latest value emitted to its consumers, and whenever a new Observer subscribes, it will immediately receive the "current value" from the BehaviorSubject. BehaviorSubjects are useful for representing "values over time"."*

* **Triggers on Observable(s):** The `onChangeQuery()` function that is passed via the HOC to the App component is only a function that pushes the next value into the observable. It's an object, because we may want to pass more of these functions that are doing something with the observables to the higher-order component.

By creating the observable and subscribing to it, the stream for the query value should work. However, so far the higher-order component is a black box for us. Let's implement it:

```javascript{1,4,5,6,10,15}
const withObservableStream = (observable, triggers) => Component => {
  return class extends React.Component {
    componentDidMount() {
      this.subscription = observable.subscribe(newState =>
        this.setState({ ...newState }),
      );
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    render() {
      return (
        <Component {...this.props} {...this.state} {...triggers} />
      );
    }
  };
};
```

The higher-order component receives the observable and the object of triggers (perhaps there is a better term in RxJS lingua for it) in its function signature.

The triggers are only passed through the HOC to the input component. That's why the App component receives straight forward the `onChangeQuery()` function which operates directly on the observable to push a new value to it.

The observable is used in the `componentDidMount()` lifecycle method to subscribe to it and in the `componentWillUnmount()` lifecycle method to unsubscribe from it. The [unsubscription needs to happen to prevent memory leaks](/react-warning-cant-call-setstate-on-an-unmounted-component/). Within the observable subscription, the function only pushes all incoming values from the stream to React's local state with `this.setState()`.

One small change in the App component let's get you away with not setting an initial state for the query property in the higher-order component. If you wouldn't apply this change, the query property would be undefined in the beginning. Doing it with this workaround, it receives a default parameter.

```javascript{1}
const App = ({ query = '', onChangeQuery }) => (
  <div>
    <h1>React with RxJS</h1>

    <input
      type="text"
      value={query}
      onChange={event => onChangeQuery(event.target.value)}
    />

    <p>{`http://hn.algolia.com/api/v1/search?query=${query}`}</p>
  </div>
);
```

Another way of coping with this problem would have been to set an initial state for the query component in the higher-order component:

```javascript{4,7,8,9,10,11,12,13,42,43,44}
const withObservableStream = (
  observable,
  triggers,
  initialState,
) => Component => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        ...initialState,
      };
    }

    componentDidMount() {
      this.subscription = observable.subscribe(newState =>
        this.setState({ ...newState }),
      );
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    render() {
      return (
        <Component {...this.props} {...this.state} {...triggers} />
      );
    }
  };
};

const App = ({ query, onChangeQuery }) => (
  ...
);

export default withObservableStream(
  query$,
  {
    onChangeQuery: value => query$.next({ query: value }),
  },
  {
    query: '',
  }
)(App);
```

If you try your application, the input field should work. The App component only receives the query state and the onChangeQuery function to alter the state from the HOC as props. Receiving and altering state happens via RxJS observables even though the higher-order component uses React's local state internally. I couldn't find a quick solution on how to stream the values from the observables subscription directly to the props of the enhanced component (App). That's why I have used React's local state as intermediate layer which triggers comfortably a re-render for us as well. If you know another way of doing it, you canleave me a comment below.

# Combine Observables in React

Let's introduce a second value stream that can be manipulated in the App component similar to the query property. Later, we will use both values to operate on them with yet another observable:

```javascript{1,2,3,4,8,10,21,22,23,24,25,26,27,28,29,30,31,33}
const SUBJECT = {
  POPULARITY: 'search',
  DATE: 'search_by_date',
};

const App = ({
  query = '',
  subject,
  onChangeQuery,
  onSelectSubject,
}) => (
  <div>
    <h1>React with RxJS</h1>

    <input
      type="text"
      value={query}
      onChange={event => onChangeQuery(event.target.value)}
    />

    <div>
      {Object.values(SUBJECT).map(value => (
        <button
          key={value}
          onClick={() => onSelectSubject(value)}
          type="button"
        >
          {value}
        </button>
      ))}
    </div>

    <p>{`http://hn.algolia.com/api/v1/${subject}?query=${query}`}</p>
  </div>
);
```

As you can see, the subject can be used to adjust the API URL. Either you search for stories by popularity or by date. Next, introduce another observable that can be used to change the subject. The observable can be used to wire up the App component with the higher-order component. Otherwise, the props passed to the App component wouldn't work.

```javascript{2,7,10,11,12,13,16}
import React from 'react';
import { BehaviorSubject, combineLatest } from 'rxjs/index';

...

const query$ = new BehaviorSubject({ query: 'react' });
const subject$ = new BehaviorSubject(SUBJECT.POPULARITY);

export default withObservableStream(
  combineLatest(subject$, query$, (subject, query) => ({
    subject,
    query,
  })),
  {
    onChangeQuery: value => query$.next({ query: value }),
    onSelectSubject: subject => subject$.next(subject),
  },
)(App);
```

The `onSelectSubject()` trigger isn't anything new. By using the buttons, it can be used to switch between the two subjects. However, the observable passed to the higher-order component is something new. It uses the combineLatest function from RxJS to combine the latest emitted values of two (or more) observable streams. Once you subscribe to the observable, when either one of the values (query, subject) changes, the subscription will receive both values.

An addition to the combineLatest function is its last argument. Here you can specify how you want the emitted values from the observables to be returned. In our case, we want to have them as an object to destructure them as before in the higher-order component to React's local state. Because you have a structure now, you can omit the wrapping object of the query observable.

```javascript{3,12}
...

const query$ = new BehaviorSubject('react');
const subject$ = new BehaviorSubject(SUBJECT.POPULARITY);

export default withObservableStream(
  combineLatest(subject$, query$, (subject, query) => ({
    subject,
    query,
  })),
  {
    onChangeQuery: value => query$.next(value),
    onSelectSubject: subject => subject$.next(subject),
  },
)(App);
```

The initial `{ query: '', subject: 'search' }` object and all further objects being emitted from the combined observable stream are sufficient for the higher-order component to destructure these values into React's local state. Afterward, again a rerender runs as before. When you run your application again, you should be able to change both values via the input element and the button elements. The changed values are displayed with the API URL. Even though only one of the values changes, the other value has still the old value from before, because combineLatest always combines the latest emitted values from the observable streams.

# Axios + RxJS in React

Now you have constructed your API URL with two values from a combined observable which encapsulates two observables. In this last section, let's take this URL to fetch data from this API URL. You may be comfortable with [data fetching in React](/react-fetching-data/), but when using RxJS observables you have to add yet another observable stream to your composition.

Before we are implementing the next observable, install [axios](https://github.com/axios/axios), the library we are using to fetch data from within the stream, to your project.

```javascript
npm install axios --save
```

Next, pretend having the array of stories at your disposal in the App component to display them. Again, as fallback provide an empty array as default parameter.

```javascript{6,15,16,17,18,19,20,21,22,23}
...

const App = ({
  query = '',
  subject,
  stories = [],
  onChangeQuery,
  onSelectSubject,
}) => (
  <div>
    ...

    <p>{`http://hn.algolia.com/api/v1/${subject}?query=${query}`}</p>

    <ul>
      {stories.map(story => (
        <li key={story.objectID}>
          <a href={story.url || story.story_url}>
            {story.title || story.story_title}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
```

Each story in the list of stories has a fallback property due to inconsistencies in the API. Now, the crucial implementation of the new observable that fetches the data for React to display it.

```javascript{2,4,11,12,13,14,15,16}
import React from 'react';
import axios from 'axios';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

...

const query$ = new BehaviorSubject('react');
const subject$ = new BehaviorSubject(SUBJECT.POPULARITY);

const fetch$ = combineLatest(subject$, query$).pipe(
  flatMap(([subject, query]) =>
    axios(`http://hn.algolia.com/api/v1/${subject}?query=${query}`),
  ),
  map(result => result.data.hits),
);

...
```

The new observable is again a combination of the subject and query observables, because we need both values to create the API URL which we need for the actual data request. Within the `pipe()` method of the observable, we can apply so called RxJS operators to do something with the values. In this case we map from the two values to a request with axios to the result. We are using a `flatMap()` instead of a `map()` operator for accessing the result of the resolved promise and not the returned promise itself. In the end, when subscribing to this new observable, every time a new subject or query from the other observables is provided, a new request is made and the result end up in the function of the subscription eventually.

Now you can provide the new observable to your higher-order component again. By having the last argument of the `combineLatest()` function, you can map it directly to a property name called `stories`. That's how they are already used in the App component after all.

```javascript{5,6,9}
export default withObservableStream(
  combineLatest(
    subject$,
    query$,
    fetch$,
    (subject, query, stories) => ({
      subject,
      query,
      stories,
    }),
  ),
  {
    onChangeQuery: value => query$.next(value),
    onSelectSubject: subject => subject$.next(subject),
  },
)(App);
```

There is no trigger, because the observable is activated implicitly by the other two observable streams. Every time you change the value in the input element (query) or click a button (subject), the fetch observable is triggered again with the latest values from both streams.

However, we may not want to trigger the fetch observable every time the value in the input element is changed. Also we don't want to trigger it if the value is an empty string. That's why we can enhance the query observable to debounce (operator) the request (only the last emitted event is taken after a threshold of time) and to filter (operator) out every stream event where the query string is empty.

```javascript{3,4,8,9,10,11,13}
import React from 'react';
import axios from 'axios';
import { BehaviorSubject, combineLatest, timer } from 'rxjs';
import { flatMap, map, debounce, filter } from 'rxjs/operators';

...

const queryForFetch$ = query$.pipe(
  debounce(() => timer(1000)),
  filter(query => query !== ''),
);

const fetch$ = combineLatest(subject$, queryForFetch$).pipe(
  flatMap(([subject, query]) =>
    axios(`http://hn.algolia.com/api/v1/${subject}?query=${query}`),
  ),
  map(result => result.data.hits),
);

...
```

The debounce happens when entering something in the input element now. However, when clicking one of the buttons for the subject, the request should be executed immediately.

Now, the initial values for the query and subject that we are seeing when the App component renders for the first time are not the ones from the initial observable values:

```javascript
const query$ = new BehaviorSubject('react');
const subject$ = new BehaviorSubject(SUBJECT.POPULARITY);
```

The subject is undefined and the query is an empty string, because that's what we have provided as default parameter for the destructuring in the function signature of the App component. All this is because we have to wait for the initial request of the fetch observable. Since I am not sure how to retrieve the values from the query and subject observables immediately in the higher-order component to set them as local state, I would provide an initial state for the higher-order component again.

```javascript{4,7,8,9,10,11,12,13}
const withObservableStream = (
  observable,
  triggers,
  initialState,
) => Component => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        ...initialState,
      };
    }

    componentDidMount() {
      this.subscription = observable.subscribe(newState =>
        this.setState({ ...newState }),
      );
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    render() {
      return (
        <Component {...this.props} {...this.state} {...triggers} />
      );
    }
  };
};
```

Now you can provide the initial state as third argument to the higher-order component. Then we can leave out the default parameters for the App component too.

```javascript{4,6,28,29,30,31,32}
...

const App = ({
  query,
  subject,
  stories,
  onChangeQuery,
  onSelectSubject,
}) => (
  ...
);

export default withObservableStream(
  combineLatest(
    subject$,
    query$,
    fetch$,
    (subject, query, stories) => ({
      subject,
      query,
      stories,
    }),
  ),
  {
    onSelectSubject: subject => subject$.next(subject),
    onChangeQuery: value => query$.next(value),
  },
  {
    query: 'react',
    subject: SUBJECT.POPULARITY,
    stories: [],
  },
)(App);
```

What bothers me now is that the initial state is somehow defined in the declaration of the query$ and subject$ observables too. It's error prone, because the observable initialization and the initial state for the higher-order component share the same values. I would love to retrieve the initial values from the observables in the higher-order component to set the initial state instead. Maybe someone of you help me out here and teach me RxJS :)

<Divider />

The final Rx.js in React example with the higher-order component can be found in this [GitHub repository](https://github.com/the-road-to-learn-react/react-rxjs-state-management-hoc-example). If you have any idea on how to improve it, please let me know. The same applies for the written tutorial where I might have misused some RxJS lingua.

After all, I hope you enjoyed going through this tutorial with me. It should provide you a different perspective on working with React. Sometimes you don't need Redux or MobX, but maybe observables with RxJS might be the right fit for your application.

If you like how the higher-order component is used to store state in this tutorial, checkout this [tutorial where we will build a GraphQL client with render prop components](/react-graphql-client-library/) together.
