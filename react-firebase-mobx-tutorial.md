+++
draft = true
title = "How to use MobX in React Firebase"
description = "The tutorial shows you how to migrate a React with Firebase application, which uses only React's local state, to MobX for its state management. Also React's Context API is replaced with MobX ..."
date = "2018-12-04T07:52:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react firebase mobx tutorial"]
news_keywords = ["react firebase mobx tutorial"]
hashtag = "#ReactJs"
card = "img/posts/react-firebase-mobx-tutorial/banner_640.jpg"
banner = "img/posts/react-firebase-mobx-tutorial/banner.jpg"
contribute = "react-firebase-mobx-tutorial.md"
headline = "How to use MobX in React Firebase"

summary = "The tutorial shows you how to migrate a React with Firebase application, which uses only React's local state, to MobX for its state management. Also React's Context API is replaced with MobX."
+++

{{% sponsorship %}}

{{% pin_it_image "react firebase mobx tutorial" "img/posts/react-firebase-mobx-tutorial/banner.jpg" "is-src-set" %}}

{{% react-firebase-book %}}

{{% read_before_9 "This tutorial is part 10 of 10 in this series." "Part 1:" "A Firebase in React Tutorial for Beginners" "https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial" "Part 2:" "React Firebase Authorization with Roles" "https://www.robinwieruch.de/react-firebase-authorization-roles-permissions" "Part 3:" "React Firebase Auth Persistence with Local Storage" "https://www.robinwieruch.de/react-firebase-auth-persistence" "Part 4:" "React Firebase Social Login: Google, Facebook, Twitter" "https://www.robinwieruch.de/react-firebase-social-login" "Part 5:" "React Firebase: Link Social Logins" "https://www.robinwieruch.de/react-firebase-link-social-logins" "Part 6:" "React Firebase: Email Verification" "https://www.robinwieruch.de/react-firebase-email-verification" "Part 7:" "How to use React Router with Firebase" "https://www.robinwieruch.de/react-firebase-router" "Part 8:" "How to use Firebase Realtime Database in React" "https://www.robinwieruch.de/react-firebase-realtime-database" "Part 9:" "How to deploy a React application to Firebase" "https://www.robinwieruch.de/firebase-deploy-react-js" %}}

The previous tutorial series has covered a lot of ground for Firebase in React. So far, it was totally fine to rely only on React's local state and React's Context API. And maybe it's just okay to keep it this way. However, this tutorial dives into using MobX on top of React and Firebase for the state management. Basically, you will exchange React's local state (e.g. users on admin page, messages on home page) and React's context (e.g. session management for authenticated user) with MobX. It should show you how to accomplish the same thing with MobX in case you want to integrate it in your tech stack.

This section is divided into two parts: The first part will setup MobX. You will implement the state layer separately from the view layer. Afterward, you will connect MobX with React by providing the MobX stores with React's Context API to your React components. The second part exchanges the current React state layer with the MobX state layer:

* Users in React Local State -> Users in MobX User Store
* Messages in React Local State -> Messages in MobX Message Store
* Authenticated User in React Local State + React Context -> Authenticated User in MobX Session Store

If you are not familiar with MobX, I highly recommend to checkout {{% a_blank "Taming the State in React" "http://roadtoreact.com" %}}. Most of the MobX knowledge is required for the following migration from only using React to MobX.

{{% chapter_header "MobX Setup in React Firebase Application" "react-firebase-mobx-setup" %}}

First of all, you should follow this [short guide to enable decorators in create-react-app](https://www.robinwieruch.de/create-react-app-mobx-decorators/). You can also take the alternative way of not using decorators, to avoid the eject process, but this tutorial only reflects the usage **with decorators**. After you went through the MobX setup tutorial, you should have installed {{% a_blank "mobx" "https://mobx.js.org/" %}} and {{% a_blank "mobx-react" "https://github.com/mobxjs/mobx-react" %}}.

Then we put our focus on the MobX setup without worrying about Firebase or React. First of all, you need the MobX stores implementation. Therefore, create a folder and files for it. From your *src/* folder type:

{{< highlight javascript >}}
mkdir stores
cd stores
touch index.js sessionStore.js userStore.js messageStore.js
{{< /highlight >}}

You will have a store for the session state (e.g. authenticated user), a store for the user state (e.g. list of users from the database), and a store for the message state (e.g. list of messages from the database). In addition, you will have an entry point file to the module to combine those stores as root store. First, the session store which manages the authenticated user. The authenticated user represents the session in the application.

{{< highlight javascript >}}
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
{{< /highlight >}}

Second, the user store which deals with the list of users from the Firebase realtime database. It sets either the whole object of users as dictionary or a single user identified by a unique identifier. It also has a `userList` property to retrieve the user object as transformed list of users:

{{< highlight javascript >}}
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
{{< /highlight >}}

Third, the message store that is similar to the user store. It manages one more property for the pagination feature though:

{{< highlight javascript >}}
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
{{< /highlight >}}

Finally, combine all three stores in a root store. This can be used to make the stores communicate to each other, but also to provide a way to import only one store (root store) to have access to all of its combined stores later on. In *src/stores/index.js* file:

{{< highlight javascript >}}
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
{{< /highlight >}}

The MobX setup is done. Now, you can connect your state layer with your view layer. The MobX stores can be provided to the component hierarchy by using MobX's Provider component. This time the Provider component from the MobX library passes down the all stores instead of only the authenticated user. In *src/index.js* file:

{{< highlight javascript "hl_lines=3 5 10 14" >}}
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
{{< /highlight >}}

That's it for connecting both worlds. Next, let's refactor almost everything from React's local state to MobX. We want to have everything in the MobX stores that should be persisted when we navigate from route to route. This includes users, messages, and the authenticated user, but maybe not the loading states.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-react-with-firebase/react-mobx-firebase-authentication/tree/233c028c63b9d87292ed7d876567a05132f78982" %}}

{{% chapter_header "Manage Firebase's authenticated User in MobX's Session Store" "firebase-authenticated-user-mobx-store" %}}

So far, we are managing the authenticated user with React's Context API. We provide the authenticated user in a Provider component and consume it wherever we want with a Consumer component. Let's change this by storing the authenticated user in MobX's session store instead and injecting the store to all components who are interested in it. First, in the authentication higher-order component, we make the session store in the props of the component:

{{< highlight javascript "hl_lines=2 3 12 14 15" >}}
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
{{< /highlight >}}

Second, we use the store to persist the authenticated user as we did before by setting it to React's local state. In addition, we don't need to provide the authenticated user anymore with React's Context Provider component, because it will be available for every component that connects to the store:

{{< highlight javascript "hl_lines=6 7 8 15 19 29" >}}
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
{{< /highlight >}}

That's it for storing and providing the authenticated user in and with the MobX session store. Let's see how we can consume it in the Navigation component for the conditional rendering of the routes without React's Context and with the store instead:

{{< highlight javascript "hl_lines=3 4 10 11 12 19 20 21 22" >}}
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
{{< /highlight  >}}

MobX injects the store in the Navigation component with the inject higher-order component in order to make a decision for the conditional rendering but also to pass the authenticated user to the child components. In addition, the observer higher-order component makes sure that the component updates when something in the session store has changed. We can do the same in our other components that are interested in the authenticated user. For instance, the authorization higher-order component can rely on the MobX session store as well:

{{< highlight javascript "hl_lines=3 14 15 16 23 24" >}}
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
{{< /highlight >}}

Also our other authorization component for the email verification can make use of it:

{{< highlight javascript "hl_lines=2 3 15 22 24 25 26" >}}
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
{{< /highlight >}}

And last but not least, the AccountPage component which displays the authenticated user but also renders the component that manages all the sign in methods for the user:

{{< highlight javascript "hl_lines=2 12 14 17 26 27" >}}
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
{{< /highlight >}}

In the end, you can remove the React Context that we have used before for providing and consuming the authenticated user in the *src/components/Session/context.js* and *src/components/Session/index.js* files:

{{< highlight javascript >}}
import withAuthentication from './withAuthentication';
import withAuthorization from './withAuthorization';
import withEmailVerification from './withEmailVerification';

export {
  withAuthentication,
  withAuthorization,
  withEmailVerification,
};
{{< /highlight >}}

That's it for storing the authenticated user in our MobX session store which takes place in the authentication higher-order component and for consuming the authenticated user in every component which is interested in it by injecting the session store to it.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-react-with-firebase/react-mobx-firebase-authentication/tree/8338a1b1f9c42898f374fe99609495bd28accd3c" %}}

{{% chapter_header "Manage Firebase's Users in MobX's User Store" "firebase-users-mobx-store" %}}

We have implemented the session management with the authenticated user with MobX instead of React's local state and context API. Next we will migrate the user management over to MobX. The users are mainly used in the AdminPage component's UserList and UserItem components. They are also used in the HomePage component for associating them to messages, but we will deal with this later. Our goal here is to navigate from UserList to UserItem back and forth with React Router without loosing the state of the users. Whereas the UserList component (fetches and) shows a list of users, the UserItem component (fetches and) shows a single user entity. If the data is already available in the MobX user store, we only keep track of new data with the realtime feature of the Firebase database. We begin with the UserList component:

{{< highlight javascript "hl_lines=3 4 13 15 16 17" >}}
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
{{< /highlight >}}

React MobX's inject higher-order component is used to marry React with MobX and the observer higher-order component makes sure to update the component when something in the store has changed. Next make sure the users are fetched from Firebase's realtime database and persisted in the MobX store:

{{< highlight javascript "hl_lines=4" >}}
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
{{< /highlight >}}

Now every time the Firebase listener is called initially or because a user got added, edited or removed from the list, the most recent user object that has all users from Firebase is stored to the MobX user store. Another UX improvement is the loading indicator when there are no users in the store. Every other time, when there are users in the store but the Firebase listener is updating the MobX store with a new user object, we don't show any loading indicator though:

{{< highlight javascript "hl_lines=2 3 4 5 6 7 8 11 12 13 18" >}}
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
{{< /highlight >}}

As you can see here as well, the users are not managed in the local state of the component anymore. Instead, MobX takes care of them now.

The users and loading indicator are rendered as before, but only the loading state is coming from the local state. In addition, the Link component only navigates to the UserItem component but doesn't send any user object along the way. Whereas we wanted to have the user at our disposal before via the Link component, we want to let MobX handle it this time for us.

{{< highlight javascript "hl_lines=3 23" >}}
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
{{< /highlight >}}

That's it for the UserList component. It renders a list of users as before, fetches the recent user object, which has all users, from Firebase with a realtime connection, but stores the result into the MobX user store this time instead of React's local state. Let's continue with the UserItem component that shall be connected to the MobX user store too:

{{< highlight javascript "hl_lines=2 3 11 13 14 15" >}}
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
{{< /highlight >}}

Similar to the UserList component, it receives the MobX user store. Check again your user store to see what's happening when setting users or a single user or when retrieving users with the computed methods. Next, let's make sure the user is fetched from Firebase's realtime database and persisted in the MobX store:

{{< highlight javascript "hl_lines=6 7 8 9" >}}
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
{{< /highlight  >}}

When the component mounts, we register Firebase's listener to the realtime database. Every time the user changes, we update it in the MobX user store. If there is already a user, we don't show a loading indicator. If there is no user, we show it:

{{< highlight javascript "hl_lines=2 3 4 5 6 7 8 11 12 13 14 15 16 17 18 28" >}}
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
{{< /highlight  >}}

In the end, we can render user and loading state as before, but the user comes from the user store which comes from the props:

{{< highlight javascript "hl_lines=3 4 5 9 10 11" >}}
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
{{< /highlight >}}

That's it for the UserItem component. It renders a user as before, fetches the recent user from Firebase with a realtime connection, but stores the result into the MobX store.

<hr class="section-divider">

You can see that the whole advantage here of using MobX instead of React's local state is to persist the state of users between routes. You don't need to fetch the users every time you navigate from UserItem to UserList, vice versa, or to some other route. They are already in MobX's global state after you have fetched them for the first time.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-react-with-firebase/react-mobx-firebase-authentication/tree/3c97f29600de58a3199c981687c49ae45fa3193b" %}}

{{% chapter_header "Manage Message Entities in MobX's Message Store" "message-entities-mobx-store" %}}

We have migrated the users and session management from React's local state and React's Context API over to MobX. Last we have to migrate the message entities that are coming from the Firebase database too. It makes use of the authenticated user too; that's why we have refactored the session management earlier.

Let's migrate the HomePage component and all its content over to using MobX instead of React's local state. Let's start with the HomePage that needs to inject the MobX user store, because it fetches users in order to associated them to the messages.

{{< highlight javascript "hl_lines=2 17 18" >}}
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
import Messages from '../Messages';

class HomePage extends Component {
  ...
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  inject('userStore'),
  observer,
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
{{< /highlight >}}

Then fetch and store users to the MobX user store, because they are later used to associate them to the message entities:

{{< highlight javascript "hl_lines=4 18" >}}
class HomePage extends Component {
  componentDidMount() {
    this.props.firebase.users().on('value', snapshot => {
      this.props.userStore.setUsers(snapshot.val());
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        <Messages users={this.props.userStore.users} />
      </div>
    );
  }
}
{{< /highlight >}}

It's the same we have done before in the UserList component. Only this time we are not interested in transforming the users object to a user array, because we want to keep it as dictionary where it's possible to access user's by their identifiers. Let's continue with the Messages components. That's why we are using `users` and not `userList` from the MobX user store.

We have all users at our disposal in the Messages component now. What's missing is connecting the Messages component to the MobX message store in order to store and get messages in and from the store:

{{< highlight javascript "hl_lines=2 3 12 14 15 16" >}}
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
{{< /highlight >}}

The Messages component has access to the session store too; which is later used for associating the user to the written message. Because we are using lots of things from the MobX stores, only a couple of properties are left in the local state of the component:

{{< highlight javascript >}}
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
{{< /highlight >}}

The Messages component only deals with the loading indicator and the text for the message that can be written from within the component as local state. Everything else will be managed with MobX.

{{< highlight javascript "hl_lines=5 6 7 16 18 20" >}}
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
{{< /highlight >}}

The other logic for creating, updating and removing a message stays the same, because it only uses the Firebase API. The listener of the Firebase database makes sure to update all messages in the MobX message store again. Only the class method to update the limit uses the method provided by the MobX message store:

{{< highlight javascript "hl_lines=5 6 7" >}}
class Messages extends Component {
  ...

  onNextPage = () => {
    this.props.messageStore.setLimit(
      this.props.messageStore.limit + 5,
    );
  };

  ...
}
{{< /highlight >}}

Every time this state in the MobX message store changes, we receive the new limit in the Messages component as props due to the connect higher-order component. If the limit changes, we register a new Firebase listener with the new limit:

{{< highlight javascript "hl_lines=4 5 6 7 8" >}}
class Messages extends Component {
  ...

  componentDidUpdate(props) {
    if (props.messageStore.limit !== this.props.messageStore.limit) {
      this.onListenForMessages();
    }
  }

  ...
}
{{< /highlight >}}

The rendering of the component didn't change a lot. It only receives the messages from the message store from the props instead of from the local state now.

{{< highlight javascript "hl_lines=5 6 7 27" >}}
class Messages extends Component {
  ...

  render() {
    const { users, messageStore, sessionStore } = this.props;
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
{{< /highlight >}}

The other components, the MessageList and MessageItem components, didn't change at all. In the end, only the HomePage and the Messages inject the MobX stores and observe their changes. Every time a Firebase listener that receives the latest entities from the Firebase database is called, it stores the result in on of the MobX stores. It happens as well when a user creates, edits or deletes a message. If the limit for the pagination feature changes, the listener is registered with this new limit again. Everything else, such as the text of the new message or the loading indicator, is still managed in the local state of React.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-react-with-firebase/react-mobx-firebase-authentication/tree/0b8ce7fea347d067bd187d709fa3583034c8bfd8" %}}

<hr class="section-divider">

That's it for the React Firebase with MobX tutorial. You have introduced MobX as state management library to manage your session, user and message state. Instead of relying on React's context API for the authenticated user object and React's local state for the list of users and messages from the Firebase database, you are storing these objects in the MobX stores. You can find the project in this {{% a_blank "GitHub repository" "https://github.com/the-road-to-react-with-firebase/react-mobx-firebase-authentication" %}}.

