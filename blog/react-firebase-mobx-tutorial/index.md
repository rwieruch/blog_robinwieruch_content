---
title: "How to use MobX in React Firebase"
description: "The tutorial shows you how to migrate a React with Firebase application, which uses only React's local state, to MobX for its state management. Also React's Context API is replaced with MobX ..."
date: "2019-02-10T07:52:46+02:00"
categories: ["React", "Firebase", "MobX"]
keywords: ["react firebase mobx tutorial"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<ReactFirebaseBook />

<LinkCollection
  label="This tutorial is part 10 of 10 in this series."
  links={[
    {
      prefix: "Part 1:",
      label: "A Firebase in React Tutorial for Beginners",
      url: "https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial"
    },
    {
      prefix: "Part 2:",
      label: "React Firebase Authorization with Roles",
      url: "https://www.robinwieruch.de/react-firebase-authorization-roles-permissions"
    },
    {
      prefix: "Part 3:",
      label: "React Firebase Auth Persistence with Local Storage",
      url: "https://www.robinwieruch.de/react-firebase-auth-persistence"
    },
    {
      prefix: "Part 4:",
      label: "React Firebase Social Login: Google, Facebook, Twitter",
      url: "https://www.robinwieruch.de/react-firebase-social-login"
    },
    {
      prefix: "Part 5:",
      label: "React Firebase: Link Social Logins",
      url: "https://www.robinwieruch.de/react-firebase-link-social-logins"
    },
    {
      prefix: "Part 6:",
      label: "React Firebase: Email Verification",
      url: "https://www.robinwieruch.de/react-firebase-email-verification"
    },
    {
      prefix: "Part 7:",
      label: "How to use React Router with Firebase",
      url: "https://www.robinwieruch.de/react-firebase-router"
    },
    {
      prefix: "Part 8:",
      label: "How to use Firebase Realtime Database in React",
      url: "https://www.robinwieruch.de/react-firebase-realtime-database"
    },
    {
      prefix: "Part 9:",
      label: "How to deploy a React application to Firebase",
      url: "https://www.robinwieruch.de/firebase-deploy-react-js"
    }
  ]}
/>

So far, it was fine to rely only on React's local state and React's Context API. This tutorial dives into using MobX on top of React and Firebase for the state management. We'll exchange React's local state (e.g. users on admin page, messages on home page) and React's context (e.g. session management for authenticated user) with MobX. It will how you how to accomplish the same thing with MobX, so you can integrate it in your tech stack.

The first section will setup MobX, where we'll add a state layer separately from the view layer and connect MobX with React by providing the MobX stores React's Context API to the React components. The second part exchanges the current React state layer with the MobX state layer:

* Users in React Local State -> Users in MobX User Store
* Messages in React Local State -> Messages in MobX Message Store
* Authenticated User in React Local State + React Context -> Authenticated User in MobX Session Store

If you are not familiar with MobX, I recommend [Taming the State in React](http://roadtoreact.com). Most of the MobX knowledge is required for the migration from only using React to MobX.

# MobX Setup in React Firebase Application

First, follow this [short guide to enable decorators in create-react-app](/create-react-app-mobx-decorators/). You can also take the alternative way of not using decorators, to avoid the eject process, but this tutorial only reflects the usage **with decorators**. After you went through the MobX setup tutorial, you should have installed [mobx](https://mobx.js.org/) and [mobx-react](https://github.com/mobxjs/mobx-react).

For this run through, we focus on the MobX setup without worrying about Firebase or React. First, you need the MobX stores, so we create a folder with files. From your *src/* folder type:

```javascript
mkdir stores
cd stores
touch index.js sessionStore.js userStore.js messageStore.js
```

There's a store for the session state (e.g. authenticated user), a store for the user state (e.g. list of users from the database), and a store for the message state (e.g. list of messages from the database). There is also an entry point file to the module to combine those stores as root store, the session store which manages the authenticated user. The authenticated user represents the session in the application.

```javascript
import { observable, action } from 'mobx';

class SessionStore {
  @observable authUser = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setAuthUser = authUser => {
    this.authUser = authUser;
  };
}

export default SessionStore;
```

Next is the user store that deals with the list of users from the Firebase realtime database. It sets either the object of users as a dictionary or a single user identified by a unique identifier. It also has a `userList` property to retrieve the user object as a transformed list of users:

```javascript
import { observable, action, computed } from 'mobx';

class UserStore {
  @observable users = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setUsers = users => {
    this.users = users;
  };

  @action setUser = (user, uid) => {
    if (!this.users) {
      this.users = {};
    }

    this.users[uid] = user;
  };

  @computed get userList() {
    return Object.keys(this.users || {}).map(key => ({
      ...this.users[key],
      uid: key,
    }));
  }
}

export default UserStore;
```

Third, the message store that is similar to the user store. It manages one more property for the pagination feature:

```javascript
import { observable, action, computed } from 'mobx';

class MessageStore {
  @observable messages = null;
  @observable limit = 5;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setMessages = messages => {
    this.messages = messages;
  };

  @action setLimit = limit => {
    this.limit = limit;
  };

  @computed get messageList() {
    return Object.keys(this.messages || {}).map(key => ({
      ...this.messages[key],
      uid: key,
    }));
  }
}

export default MessageStore;
```

Finally, combine all three stores in a root store. This can be used to make the stores communicate with each other, but also to provide a way to import only one store (root store) to have access to all of its combined stores later. In *src/stores/index.js* file:

```javascript
import SessionStore from './sessionStore';
import UserStore from './userStore';
import MessageStore from './messageStore';

class RootStore {
  constructor() {
    this.sessionStore = new SessionStore(this);
    this.userStore = new UserStore(this);
    this.messageStore = new MessageStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
```

The MobX setup is done. Now, you can connect your state layer with your view layer. The MobX stores can be provided to the component hierarchy using MobX's Provider component. This time, the Provider component from the MobX library passes down the all stores instead of only the authenticated user. In *src/index.js* file:

```javascript{3,5,10,14}
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import store from './stores';
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

ReactDOM.render(
  <Provider {...store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root'),
);
```

That's it for connecting both worlds. Next, we'll refactor almost everything from React's local state to MobX. We want to have everything in the MobX stores that should be persisted when we navigate from route to route. This includes users, messages, and the authenticated user, but maybe not the loading states.

### Exercises:

* Confirm your [source code for the last section](http://bit.ly/2VnDt1v)

# Manage Firebase's authenticated User in MobX's Session Store

So far, we have managed the authenticated user with React's Context API. We provided the authenticated user in a Provider component and consumed with a Consumer component. Let's change this by storing the authenticated user in MobX's session store instead, and injecting the store to all components who are interested in it.

In the authentication higher-order component, we make the session store in the props of the component:

```javascript{2,3,12,14,15}
import React from 'react';
import { inject } from 'mobx-react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    ...
  }

  return compose(
    withFirebase,
    inject('sessionStore'),
  )(WithAuthentication);
};

export default withAuthentication;
```

Then, we use the store to persist the authenticated user like before, by setting it to React's local state. We don't need to provide the authenticated user with React's Context Provider component, because it will be available for every component that connects to the store:

```javascript{6,7,8,15,19,29}
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.props.sessionStore.setAuthUser(
        JSON.parse(localStorage.getItem('authUser')),
      );
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.props.sessionStore.setAuthUser(authUser);
        },
        () => {
          localStorage.removeItem('authUser');
          this.props.sessionStore.setAuthUser(null);
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  ...
};

export default withAuthentication;
```

We've stored and provided the authenticated user to the MobX session store. Let's see how we can consume it in the Navigation component for the conditional rendering of the routes without React's Context:

```javascript{3,4,10,11,12,19,20,21,22}
import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = ({ sessionStore }) =>
  sessionStore.authUser ? (
    <NavigationAuth authUser={sessionStore.authUser} />
  ) : (
    <NavigationNonAuth />
  );

...

export default compose(
  inject('sessionStore'),
  observer,
)(Navigation);
```

MobX injects the store in the Navigation component with the inject higher-order component to make a decision for the conditional rendering, but also to pass the authenticated user to the child components. In addition, the observer higher-order component makes sure that the component updates when something in the session store has changed. We can do the same in our other components that are interested in the authenticated user. For instance, the authorization higher-order component can rely on the MobX session store as well:

```javascript{3,14,15,16,23,24}
import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    ...

    render() {
      return condition(this.props.sessionStore.authUser) ? (
        <Component {...this.props} />
      ) : null;
    }
  }

  return compose(
    withRouter,
    withFirebase,
    inject('sessionStore'),
    observer,
  )(WithAuthorization);
};

export default withAuthorization;
```

Also, our other authorization component for the email verification can make use of it:

```javascript{2,3,15,22,24,25,26}
import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

...

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    ...

    render() {
      return needsEmailVerification(
        this.props.sessionStore.authUser,
      ) ? ( ... ) : (
        <Component {...this.props} />
      );
    }
  }

  return compose(
    withFirebase,
    inject('sessionStore'),
    observer,
  )(WithEmailVerification);
};

export default withEmailVerification;
```

The AccountPage component displays the authenticated user, but also renders the component that manages sign in methods for the user:

```javascript{2,12,14,17,26,27}
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

...

const AccountPage = ({ sessionStore }) => (
  <div>
    <h1>Account: {sessionStore.authUser.email}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
    <LoginManagement authUser={sessionStore.authUser} />
  </div>
);

...

const condition = authUser => !!authUser;

export default compose(
  inject('sessionStore'),
  observer,
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);
```

You can remove the React Context we used for providing and consuming the authenticated user in the *src/components/Session/context.js* and *src/components/Session/index.js* files:

```javascript
import withAuthentication from './withAuthentication';
import withAuthorization from './withAuthorization';
import withEmailVerification from './withEmailVerification';

export {
  withAuthentication,
  withAuthorization,
  withEmailVerification,
};
```

That's it for storing the authenticated user in our MobX session store which takes place in the authentication higher-order component and for consuming the authenticated user in every component which is interested in it by injecting the session store to it.

### Exercises:

* Confirm your [source code for the last section](http://bit.ly/2VmStNa)

# Manage Firebase's Users in MobX's User Store

We have implemented the session management with the authenticated user with MobX instead of React's local state and context API. Next, we will migrate the user management over to MobX. The users are mainly used in the AdminPage component's UserList and UserItem components. Our goal here is to navigate from UserList to UserItem with React Router without loosing the state of the users. The UserList component fetches and shows a list of users, the UserItem component fetches and shows a single user entity. If the data is already available in the MobX user store, we only need to keep track of new data with the realtime feature of the Firebase database. We begin with the UserList component:

```javascript{3,4,13,15,16,17}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class UserList extends Component {
  ...
}

export default compose(
  withFirebase,
  inject('userStore'),
  observer,
)(UserList);
```

React MobX's inject higher-order component is used to marry React with MobX and the observer higher-order component makes sure to update the component if the store has changed. Next, make sure users are fetched from Firebase's real-time database and persisted in the MobX store:

```javascript{4}
class UserList extends Component {
  componentDidMount() {
    this.props.firebase.users().on('value', snapshot => {
      this.props.userStore.setUsers(snapshot.val());
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  ...
}
```

Now every time the Firebase listener is called or because a user was added, edited, or removed from the list, the most recent user object with users from Firebase is stored to the MobX user store.

Another user experience improvement is adding a loading indicator when there are no users in the store. Every other time, when there are users in the store but the Firebase listener is updating the MobX store with a new user object, we don't show any loading indicator:

```javascript{2,3,4,5,6,7,8,11,12,13,18}
class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    if (!this.props.users.length) {
      this.setState({ loading: true });
    }

    this.props.firebase.users().on('value', snapshot => {
      this.props.userStore.setUsers(snapshot.val());

      this.setState({ loading: false });
    });
  }

  ...
}
```

The users are not managed in the local state of the component anymore, but in MobX instead. The users and loading indicator are rendered like before, but only the loading state comes from the local state. The Link component only navigates to the UserItem component, but it doesn't send any user objects. We wanted the user at our disposal before via the Link component, we want to let MobX handle it this time.

```javascript{3,23}
class UserList extends Component {
  render() {
    const users = this.props.userStore.userList;
    const { loading } = this.state;

    return (
      <div>
        <h2>Users</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {users.map(user => (
            <li key={user.uid}>
              <span>
                <strong>ID:</strong> {user.uid}
              </span>
              <span>
                <strong>E-Mail:</strong> {user.email}
              </span>
              <span>
                <strong>Username:</strong> {user.username}
              </span>
              <span>
                <Link to={`${ROUTES.ADMIN}/${user.uid}`}>
                  Details
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
```

That's it for the UserList component. It renders a list of users as before, fetches the recent user object with all users from Firebase with a realtime connection, except it stores the result into the MobX user store instead of React's local state. Let's continue with the UserItem component that will also connect to the MobX user store:

```javascript{2,3,11,13,14,15}
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

class UserItem extends Component {
  ...
}

export default compose(
  withFirebase,
  inject('userStore'),
  observer,
)(UserItem);
```

Similar to the UserList component, the UserItem component receives the MobX user store. Check again your user store to see what's happening when setting users or a single user or when retrieving users with the computed methods. Next, let's make sure the user is fetched from Firebase's realtime database and persisted in the MobX store:

```javascript{6,7,8,9}
class UserItem extends Component {
  componentDidMount() {
    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.props.userStore.setUser(
          snapshot.val(),
          this.props.match.params.id,
        );
      });
  }

  ...
}
```

When the component mounts, we register Firebase's listener to the real-time database. When the user changes, we update it in the MobX user store. If there is already a user, we don't show a loading indicator. If there is no user, we show it:

```javascript{2,3,4,5,6,7,8,11,12,13,14,15,16,17,18,28}
class UserItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    if (
      !(
        this.props.userStore.users &&
        this.props.userStore.users[this.props.match.params.id]
      )
    ) {
      this.setState({ loading: true });
    }

    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.props.userStore.setUser(
          snapshot.val(),
          this.props.match.params.id,
        );

        this.setState({ loading: false });
      });
  }

  ...
}
```

We can render user and loading state as before, except the user comes from the user store which comes from the props:

```javascript{3,4,5,9,10,11}
class UserItem extends Component {
  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(
      this.props.userStore.users[this.props.match.params.id].email,
    );
  };

  render() {
    const user = (this.props.userStore.users || {})[
      this.props.match.params.id
    ];
    const { loading } = this.state;

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {user && ( ... )}
      </div>
    );
  }
}
```

That's it for the UserItem component. It renders a user, fetches the recent user from Firebase with a realtime connection, only it stores the result into the MobX store. The advantage in using MobX instead of React's local state is that user states persist between routes. This means you won't need to fetch them when you navigate from UserItem to UserList or a different route, since they remain in MobX's global state.

### Exercises:

* Confirm your [source code for the last section](http://bit.ly/2VpWTTs).

# Manage Message Entities in MobX's Message Store

We migrated the users and session management from React's local state and React's Context API over to MobX. Finally, we'll migrate the message entities from the Firebase database. It uses the authenticated user as well, which is why we have refactored the session management earlier. What's missing is a connected Messages component to the MobX message store to store and get messages:

```javascript{2,3,12,14,15,16}
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import MessageList from './MessageList';

class Messages extends Component {
  ...
}

export default compose(
  withFirebase,
  inject('messageStore', 'sessionStore'),
  observer,
)(Messages);
```

The Messages component has access to the session store, too, which is later used for associating the user to the written message. Because we are using the MobX stores, only a couple of properties are left in the local state of the component:

```javascript
class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
    };
  }

  ...
}
```

The Messages component only deals with the loading indicator and the text for the message written from within the component as local state. Everything else will be managed with MobX.

```javascript{5,6,7,16,18,20}
class Messages extends Component {
  ...

  componentDidMount() {
    if (!this.props.messageStore.messageList.length) {
      this.setState({ loading: true });
    }

    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(this.props.messageStore.limit)
      .on('value', snapshot => {
        this.props.messageStore.setMessages(snapshot.val());

        this.setState({ loading: false });
      });
  };

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  ...
}
```

The other logic for creating, updating, and removing a message stays the same, because it only uses the Firebase API. The listener of the Firebase database makes sure to update all messages in the MobX message store. Only the class method to update the limit uses the method provided by the MobX message store:

```javascript{5,6,7}
class Messages extends Component {
  ...

  onNextPage = () => {
    this.props.messageStore.setLimit(
      this.props.messageStore.limit + 5,
    );
  };

  ...
}
```

Every time this state in the MobX message store changes, we receive the new limit in the Messages component as props due to the connected higher-order component. If the limit changes, we register a new Firebase listener with the new limit:

```javascript{4,5,6,7,8}
class Messages extends Component {
  ...

  componentDidUpdate(props) {
    if (props.messageStore.limit !== this.props.messageStore.limit) {
      this.onListenForMessages();
    }
  }

  ...
}
```

Rendering the component didn't change much, except now it receives the messages from the message store from the props instead of the local state.

```javascript{5,6,7,27}
class Messages extends Component {
  ...

  render() {
    const { messageStore, sessionStore } = this.props;
    const { text, loading } = this.state;
    const messages = messageStore.messageList;

    return (
      <div>
        {!loading && messages && (
          <button type="button" onClick={this.onNextPage}>
            More
          </button>
        )}

        {loading && <div>Loading ...</div>}

        {messages && (
          <MessageList ... />
        )}

        {!messages && <div>There are no messages ...</div>}

        <form
          onSubmit={event =>
            this.onCreateMessage(event, sessionStore.authUser)
          }
        >
          <input
            type="text"
            value={text}
            onChange={this.onChangeText}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}
```

The MessageList and MessageItem components didn't change at all, only the HomePage and the Messages inject the MobX stores and observe their changes. Every time a Firebase listener that receives the latest entities from the Firebase database is called, it stores the result in on of the MobX stores. It happens as well when a user creates, edits or deletes a message. If the limit for the pagination feature changes, the listener is registered with this new limit again. Everything else, including the text of the new message or the loading indicator, is still managed in React's local state.

### Exercises:

* Confirm your [source code for the last section](http://bit.ly/2VkthqM)

<Divider />

You've introduced MobX as state management library to manage your session, user, and message state. Instead of relying on React's context API for the authenticated user object and React's local state for the list of users and messages from the Firebase database, these objects are kept in the MobX stores. The project is found in [GitHub repository](https://github.com/the-road-to-react-with-firebase/react-mobx-firebase-authentication).

