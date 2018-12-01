+++
title = "React Firebase Authorization with Roles"
description = "A tutorial on how to use authorization with roles and permissions when using Firebase in React. Learn how to protect routes with authorization rules and how to set properties to Firebase user ..."
date = "2018-11-26T07:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react firebase authorization", "react firebase protected routes", "react firebase permissions", "firebase set user properties"]
news_keywords = ["react firebase authorization", "react firebase protected routes", "react firebase permissions", "firebase set user properties"]
hashtag = "#ReactJs"
card = "img/posts/react-firebase-authorization-roles-permissions/banner_640.jpg"
banner = "img/posts/react-firebase-authorization-roles-permissions/banner.jpg"
contribute = "react-firebase-authorization-roles-permissions.md"
headline = "React Firebase Authorization with Roles"

summary = "A tutorial on how to use authorization with roles and permissions when using Firebase in React. Learn how to protect routes with authorization rules and how to set properties to Firebase users."
+++

{{% sponsorship %}}

{{% pin_it_image "react firebase authorization" "img/posts/react-firebase-authorization-roles-permissions/banner.jpg" "is-src-set" %}}

{{% react-firebase-book %}}

{{% read_before "This tutorial is part 2 of 2 in this series." "Part 1:" "A Firebase in React Tutorial for Beginners" "https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial" %}}

So far, you have used broad-grained authorization rules that check whether a user is in general authenticated or not. If the user is not authenticated, the a dedicated authorization higher-order component redirects the user to the login page.

In this section, you are going to apply a more fine-grained authorization mechanism. It will work with roles (e.g. Admin, Author) that are assigned to a user, but could also work with permissions (e.g. user is allowed to write an article). Again if the user doesn't fit a role for your authorization condition in your authorization higher-order component, the user will be redirected. Let's revisit the *src/components/Session/withAuthorization.js* higher-order component that we have implemented so far:

{{< highlight javascript >}}
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;
{{< /highlight >}}

The Firebase listener always gives us the recent authenticated user. We don't know whether the user is null though, that's why we have deployed the broader authorization rules for a few routes (e.g. */home*) of the application before. If a user is not authenticated in the first place, we redirect the user to the login page.

{{< highlight javascript >}}
const condition = authUser => !!authUser;
{{< /highlight >}}

Now it would be great to go one step further and check for a user's role (or permission):

{{< highlight javascript >}}
const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);
{{< /highlight >}}

It could be a straight forward task, if we were able to assign properties (e.g. an array of roles) to the authenticated user itself. But as we have learned in previous sections, the authenticated user is managed internally by Firebase where we are not able to alter its properties. That's why we started to manage users ourselves in Firebase's realtime database. If you go to your Firebase project's dashboard, you can see that users are managed in the Authentication and Database tabs. We introduced the latter to keep track of the users ourselves and to assign them additional properties too.

This section will be split up into three parts:

* Assign a user on sign up (registration) a roles (admin role) property.
* Merge authenticated user and database user so that they can be authorized with their roles in the authorization higher-order component.
* Showcase a role authorization for one of our routes (only allowed for admin users).

Note: Firebase has also an official way to introduce roles to your authenticated user. But I am not very comfortable with it, because it uses lots of Firebase internals and enhanced the effect of a vendor lock-in. Rather I want to show you how to store roles directly to your user entities in your Firebase database. Doing it this way, you will have an easier time migrating away from Firebase if you decide to roll out a backend application with a database yourself eventually.

{{% chapter_header "Firebase Database Users with Roles" "firebase-database-user-role" %}}

We will use multiple roles instead of a single role, because a user may have more than one role in our system. For instance, a user could be an admin but also an author with access to admin and author areas. Let's assign a `roles` property to our users when they get created in the realtime database on a sign up. First, we keep track of a checkbox state for such a role in our component:

{{< highlight javascript "hl_lines=6" >}}
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};
{{< /highlight >}}

Second, add a checkbox to toggle the user role in the UI:

{{< highlight javascript "hl_lines=5 6 7 15 24 25 26 27 28 29 30 31 32" >}}
class SignUpFormBase extends Component {

  ...

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    ...

    return (
      <form onSubmit={this.onSubmit}>
        ...
        <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label>
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

...
{{< /highlight >}}

Arguably it's not the best idea to give users the power to sign up as admin users themselves, but for the sake of learning about it, we keep it this way. At what place or under which circumstances you assign roles to users is up to you later.

Third, add the roles property to your user when they get gets created in the database. Since we want to have an array of roles, we can initialize it as empty array and push conditional roles to it:

{{< highlight javascript "hl_lines=7 15 16 18 19 20 31" >}}
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

...

class SignUpFormBase extends Component {
  ...

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles,
          })
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  ...
}

...
{{< /highlight >}}

Last, collect all your roles in a separate *src/constants/roles.js* file that we have imported in the step before. It can be used to assign roles, as you did before, but also to protect routes later on.

{{< highlight javascript "hl_lines=1" >}}
export const ADMIN = 'ADMIN';
{{< /highlight >}}

You should be able to create users with admin privileges now. Let's head over how we can merge this user from our database with the authenticated user from the Firebase authentication.

{{% chapter_header "How to merge authenticated user with database user?" "firebase-user-merge" %}}

Since we need to check the roles only in the authorization higher-order component, it's best to merge authentication user and database user in this component before checking for its privileges (roles, permissions).

{{< highlight javascript "hl_lines=8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33" >}}
...

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (authUser) {
            this.props.firebase
              .user(authUser.uid)
              .once('value')
              .then(snapshot => {
                const dbUser = snapshot.val();

                // default empty roles
                if (!dbUser.roles) {
                  dbUser.roles = [];
                }

                // merge auth and db user
                authUser = {
                  uid: authUser.uid,
                  email: authUser.email,
                  ...dbUser,
                };

                if (!condition(authUser)) {
                  this.props.history.push(ROUTES.SIGN_IN);
                }
              });
          } else {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
      );
    }

    ...
  }

  ...
};

...
{{< /highlight >}}

Let's get through it step by step. Every time the authenticated user changes, the function within the listener is called. If the user is null, we redirect immediately. If the user is not null, we will get the database user with the help of the authenticated user's unique identifier. Afterward, we merge both users whereas we merge everything from the database user and only the unique identifier and the email from the authenticated user. Maybe you will need more properties from the authenticated user later, and you will for sure in the next sections, but at this point, the unique identifier and the email are sufficient. Last but not least, we are running as before our conditional check whether the user is authorized or not. However, now we have all the properties from the database user (e.g. roles) at our disposal. If the conditions are not met, we redirect the user. If the conditions are met, the user stays on the page component that is enhanced with this authorization higher-order component.

That would be it for merging the user in the authorization higher-order component. But what about the authentication higher-order component that provides the authenticated for actual usage to all our components? Maybe we want to show or not show something based on the authenticated user (e.g. not showing the link to admin page in the navigation). Let's implement the merging in this higher-order component too:

{{< highlight javascript "hl_lines=8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33" >}}
...

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (authUser) {
            this.props.firebase
              .user(authUser.uid)
              .once('value')
              .then(snapshot => {
                const dbUser = snapshot.val();

                // default empty roles
                if (!dbUser.roles) {
                  dbUser.roles = [];
                }

                // merge auth and db user
                authUser = {
                  uid: authUser.uid,
                  email: authUser.email,
                  ...dbUser,
                };

                this.setState({ authUser });
              });
          } else {
            this.setState({ authUser: null });
          }
        },
      );
    }

    ...
  }

  ...
};

...
{{< /highlight >}}

Now the authenticated user extended with the database user is provided via React's Context API to all our components. As you may have noticed, the implementation was quite repetitive to the authorization higher-order component. The only thing changed was the local state usage instead of the redirects. Let's see how we can extract the common implementation to our Firebase class without touching the implementation details with the local state (authentication higher-order component) and the redirection (authorization higher-order component).

{{< highlight javascript "hl_lines=10 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37" >}}
...

class Firebase {
  ...

  // *** Auth API ***

  ...

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  ...
}

export default Firebase;
{{< /highlight >}}

Check yourself which common implementation details where taken from the two higher-order components. The only thing changed in this extracted function are the `next()` and `fallback()` callback functions. That's where we can implement the specific implementation details of every higher-order component (local state for authentication, redirect for authorization) that uses this new method now. Let's use this function first in the authentication higher-order component and provide both callback functions as "next" and "fallback":

{{< highlight javascript "hl_lines=8 9 10 11 12 13 14 15" >}}
...

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    ...

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

    ...
  }

  ...
};

...
{{< /highlight >}}

The higher-order component uses this new method from the Firebase instance and only provides two callback functions as parameters. The first callback function is used for the merged user. The second callback function is used when the authenticated user is null. Let's use the new method in the authorization higher-order component too:

{{< highlight javascript "hl_lines=8 9 10 11 12 13 14 15" >}}
...

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    ...

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
        () => this.props.history.push(ROUTES.SIGN_IN),
      );
    }

    ...
  }

  ...
};

...
{{< /highlight >}}

We extracted the business logic that merges authentication user and database user to the Firebase class, made it available as method on the class instance, and use it in both higher-order components. Since we can provide two callback functions to this new method, which are executed based on an authenticated user being there or not, each higher-order component gains fine-grained control over what should happen afterward. The authorization higher-order component cares about redirects, the authentication higher-order component cares about storing the merged user in the local state and distributing it to other components via React's Context Provider component.

{{% chapter_header "Authorize a Firebase User based on a Role" "firebase-user-privilege-authorization" %}}

Now we need to check whether our role-based authorization is working after all. The admin page is the best place to deploy a role-based authorization, because so far it is open for everyone and not secured.

{{< highlight javascript "hl_lines=2 5 6 17 18 19 31 32 34 35 36 37" >}}
import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

class AdminPage extends Component {
  ...

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        <p>
          The Admin Page is accessible by every signed in admin user.
        </p>

        {loading && <div>Loading ...</div>}

        <UserList users={users} />
      </div>
    );
  }
}

...

const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withAuthorization(condition),
  withFirebase,
)(AdminPage);
{{< /highlight >}}

If you try to access the admin page as non authenticated user or as non admin user without the necessary role, it should redirect you to the login page. If you access it as user with admin privileges, you should be able to see it. That's what the authorization higher-order component made possible now.

What about securing the route to the admin page in the Navigation component as well? That's where the (merged) authenticated user from the authentication higher-order component comes into play. By using React's Context that is used in this higher-order component, you can access the extended authenticated user:

{{< highlight javascript "hl_lines=6 12 20 31 32 33 34 35" >}}
...

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    {authUser.roles.includes(ROLES.ADMIN) && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
{{< /highlight >}}

You have successfully assigned roles to your users, merged authentication user with database user in your higher-order components, and applied authorization rules with redirects and conditional renderings in your applications. Another great thing about it: Everything you add to your database user will be available when you launch your application. Basically you are allowed to set user properties to your Firebase user now.

### Exercises:

* Walk through a scenario where the role-based authorization could be replaced with a permission-based authorization (e.g. `authUser.permissions.canEditUser`)
* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-react-with-firebase/react-firebase-authentication/tree/6188752284edadfcbe4c6f5235ed54593a9adc2d" %}}
