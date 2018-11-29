+++
title = "React Firebase Auth Persistence with Local Storage"
description = "A tutorial on how to use local storage for auth state persistence for a Firebase in React application. When reloading the browser, the user should stay authenticated without a flicker ..."
date = "2018-11-27T07:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react firebase auth persistence", "react firebase local storage", "react firebase permissions"]
news_keywords = ["react firebase auth persistence", "react firebase local storage", "react firebase permissions"]
hashtag = "#ReactJs"
card = "img/posts/react-firebase-auth-persistence/banner_640.jpg"
banner = "img/posts/react-firebase-auth-persistence/banner.jpg"
contribute = "react-firebase-auth-persistence.md"
headline = "React Firebase Auth Persistence with Local Storage"

summary = "A tutorial on how to use local storage for auth state persistence for a Firebase in React application. When reloading the browser, the user should stay authenticated without a flicker."
+++

{{% sponsorship %}}

{{% pin_it_image "react firebase auth persistence" "img/posts/react-firebase-auth-persistence/banner.jpg" "is-src-set" %}}

{{% react-firebase-book %}}

{{% read_before_2 "This tutorial is part 3 of 3 in this series." "Part 1:" "A Firebase in React Tutorial for Beginners" "https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial" "Part 2:" "React Firebase Authorization with Roles" "https://www.robinwieruch.de/react-firebase-authorization-roles-permissions" %}}

We implemented the authentication for this Firebase in React application a while ago. Along the way, we improved it and added authorization with roles too. Now you may have experienced a flicker every time you reload/refresh your browser, because the application doesn't know from the start if a user is authenticated or not. The authenticated user for the application is null in the beginning. Only after some time Firebase figures out that there is an actual authenticated user and calls the function in the listener of the authentication higher-order component:

{{< highlight javascript >}}
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
{{< /highlight >}}

Only when the Firebase authentication listener is invoked for the first time, the authenticated user may be there, because Firebase has its internal state for auth persistence. Then also the routes are made visible in the Navigation component due to the authenticated user being there now. So even though it's great that Firebase keeps the state of the authenticated user, the UI glitch (flicker) in the beginning is not the best user experience. Let's avoid this behavior by using the [browser's local storage](https://www.robinwieruch.de/local-storage-react/) for the authenticated user:

{{< highlight javascript "hl_lines=16 20" >}}
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
{{< /highlight >}}

Every time Firebase's listener is invoked, the authenticated user is not only stored in the local state, ready to be passed to React's Context API afterward, but also it's stored in the browser's local storage now. You can use the local storage's API with `setItem` and `removeItem` to store and delete something identified by a key. You also need to format the authenticated user to JSON before you can put it into the local storage of the browser.

The flicker is still there, because we are not really taking advantage of having the authenticated user earlier at our disposal now. Let's change this by retrieving early from the local storage in the higher-order component's constructor:

{{< highlight javascript "hl_lines=9" >}}
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
{{< /highlight >}}

If there is no auth user in the local storage, the local state will stay null and everything stays as before. But if the authenticated user is in the local storage, because it has been stored there via our Firebase listener's function before, we make early use of it in the component's constructor. Since the format of the authenticated user in the local storage is JSON, we need to transform it into a JavaScript object again. Ultimately, someone using our application can refresh the browser, but also close the browser/tab and open it after a while again, would still have an authenticated user.

Try the application again and verify that the flicker is gone. Also all the conditional routes and pages which are protected via a conditional rendering (e.g. Navigation component) or authorization (e.g. HomePage component) should be there immediately. The authentication higher-order component can pass the authenticated user with its first render via React's Context API to all other components.

### Exercises:

* Read more about {{% a_blank "Auth Persistence in Firebase" "https://firebase.google.com/docs/auth/web/auth-state-persistence" %}}
* Explore using the Browser's Session Storage instead of the Local Storage to give the authenticated user an expiration date
* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-react-with-firebase/react-firebase-authentication/tree/b47b884f87e804a3191c6aeee450d6236357c320" %}}