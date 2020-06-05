---
title: "React Firebase Auth Persistence with Local Storage"
description: "A tutorial on how to use local storage for auth state persistence for a Firebase in React application. When reloading the browser, the user should stay authenticated without a flicker ..."
date: "2018-11-27T07:50:46+02:00"
categories: ["React", "Firebase"]
keywords: ["react firebase auth persistence", "react firebase local storage", "react firebase permissions"]
hashtags: ["#100DaysOfCode", "#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<ReactFirebaseBook />

<LinkCollection label="This tutorial is part 3 of 3 in this series." links={[{ prefix: "Part 1:", label: "A Firebase in React Tutorial for Beginners", url: "/complete-firebase-authentication-react-tutorial" }, { prefix: "Part 2:", label: "React Firebase Authorization with Roles", url: "/react-firebase-authorization-roles-permissions" }]} />

Previously, we implemented authentication for this Firebase in React application. Along the way, we added authorization with roles. You may have experienced a flicker every time you reload/refresh your browser, because the application doesn't know from the start if a user is authenticated or not since the authenticated user is null. It will happen until Firebase figures out there is an authenticated user and calls the function in the listener of the authentication higher-order component:

```javascript
import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          this.setState({ authUser });
        },
        () => {
          this.setState({ authUser: null });
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
```

After the Firebase authentication listener is invoked for the first time, the authenticated user may be there, because Firebase has its internal state for auth persistence. Also, the routes are made visible in the Navigation component due to the authenticated user being there now. While it's good that Firebase keeps the state of the authenticated user, the UI glitch in the beginning hurts the user experience. Let's avoid this using the [browser's local storage](/local-storage-react/) for the authenticated user:

```javascript{16,20}
...

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.setState({ authUser });
        },
        () => {
          localStorage.removeItem('authUser');
          this.setState({ authUser: null });
        },
      );
    }

    ...
  }

  ...
};

...
```

Every time Firebase's listener is invoked, the authenticated user is not only stored in the local state, ready to be passed to React's Context API, but it's also stored in the browser's local storage. You can use the local storage's API with `setItem` and `removeItem` to store and delete something identified by a key. You also need to format the authenticated user to JSON before you can put it into the local storage of the browser.

The flicker is still there, because we're not really taking advantage of having the authenticated user earlier at our disposal. Let's change this by retrieving it from the local storage in the higher-order component's constructor earlier:

```javascript{9}
...

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
      };
    }

    ...
  }

  ...
};

...
```

If there is no auth user in the local storage, the local state will stay null and everything will remain as before. However, if the authenticated user is in the local storage because it was stored via our Firebase listener's function, we can use it in the component's constructor. Since the format of the authenticated user in the local storage is JSON, we need to transform it into a JavaScript object again. Ultimately, someone using our application can refresh the browser, but also close the browser/tab and open it after a while, and it will still see them as an authenticated user.

Try the application again and verify that the flicker is gone. Also all the conditional routes and pages that are protected with a conditional rendering (e.g. Navigation component) or authorization (e.g. HomePage component) should be there immediately. The authentication higher-order component can pass the authenticated user with its first render via React's Context API to all other components.

### Exercises:

* Read more about [Auth Persistence in Firebase](https://firebase.google.com/docs/auth/web/auth-state-persistence)
* Explore using the Browser's Session Storage instead of the Local Storage to give the authenticated user an expiration date.
* Confirm your [source code for the last section](http://bit.ly/2VoNhZj)
