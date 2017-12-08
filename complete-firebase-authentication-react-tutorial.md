+++
title = "The Complete Firebase authentication in React Tutorial"
description = "The complete tutorial for authentication and authorization in Firebase and React.js ..."
date = "2017-12-06T07:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react firebase authentication tutorial"]
news_keywords = ["react firebase authentication tutorial"]
hashtag = "#ReactJs"
card = "img/posts/complete-firebase-authentication-react-tutorial/banner_640.jpg"
banner = "img/posts/complete-firebase-authentication-react-tutorial/banner.jpg"
contribute = "complete-firebase-authentication-react-tutorial.md"
headline = "The Complete Firebase authentication in React Tutorial"

summary = "TODO"
+++

{{% pin_it_image "react firebase authentication tutorial" "img/posts/complete-firebase-authentication-react-tutorial/banner.jpg" "is-src-set" %}}

The topic about authentication in React keeps popping up from time to time. When people approach me with this question, most often after they have learned React.js or any other SPA solution (Angular.js, Vue.js), I usually tell them to start out with Firebase. It is the simplest way to learn about the essential parts of authentication in React from a frontend perspective. You can learn about it without worrying about any backend implementations. Firebase handles it for you. By only learning about the authentication from one perspective in the beginning, you keep the level of complexity low and thus keep yourself motivated to learn about it. Once you understand authentication from a client-perspective, you can continue to build your own authentication server on the server-side.

Authentication can be a complex topic when learning about web development as a newcomer. The puristic frontend and backend implementation of a authentication flow can be quite overwhelming. How to handle the session on the client and the server-side? Isn't a RESTful server stateless? What about cookies or the session storage in the browser? Should Passport.js be used on the server-side? All these questions let you run in circles and you never start to implementing anything. Therefore my advice: Take it step by step and use only Firebase in your React application in the beginning. The following tutorial gives you a complete walkthrough of how to use Firebase for authentication in React. The outcome can be seen {{% a_blank "here" "https://react-firebase-authentication.wieruch.com/" %}}. It is not styled, but that's not what the tutorial is about. Instead it implements a whole authentication flow in Firebase and React with you.

In order to keep the guide updated, here is a list of the node packages and their versions which are used in this tutorial.

* React 16
* React Router 4
* Firebase 4

Please help me out if the tutorial needs any updates in order to keep it reliable for other people learning about the topic as well. In general, don't hesitate to point out improvements in the comments or visit the article directly on GitHub to make improvements.

You may wonder that there is no word about MobX or Redux. Indeed, it could be used to handle the state for the authenticated user. But it isn't neccessary to use one of these libraries. React's local state is absolutely sufficient to handle the state for the authenticated user. I just wanted to point it out again, because a lot of people associate authentication in React immediatly with Redux or MobX. Yet the article will showcase it without using any of these state management libraries. However, in the end the article shows how to achieve it with Redux or MobX as well.

The requirements for this tutorial are a working [editor or IDE, a running command line](https://www.robinwieruch.de/developer-setup/), and installed versions of {{% a_blank "node and npm" "https://nodejs.org/en/" %}}. In addition, you should have learned about React in the first place. [The Road to learn React](https://www.robinwieruch.de/the-road-to-learn-react/) is a free ebook which gives you all the fundamentals about React. You will build a larger application along the way in plain React and transition smoothly from JavaScript ES5 to JavaScript ES6 and beyond. This tutorial will not dive into all the details taught in the ebook. In addition, please follow the referenced articles in this tutorial to understand many of the underlying implementation details if things are not explain in depth.

{{% package_box "The Road to learn React" "Build a Hacker News App along the way. No setup configuration. No tooling. No Redux. Plain React in 190+ pages of learning material. Pay what you want like <strong>14.500+ readers</strong>." "Get the Book" "img/page/cover.png" "https://www.getrevue.co/profile/rwieruch" %}}

{{% chapter_header "Table of Contents" "toc" %}}

* [React Application Setup: create-react-app](react-application-setup)
* [React Router and Routes](react-router-setup)
* [Firebase in React Setup](react-firebase-setup)
* Firebase Authentication in React
  * [Firebase's Authentication API](firebase-authentication)
  * [Sign Up with React and Firebase](react-firebase-sign-up)
  * [Sign In with React and Firebase](react-firebase-sign-in)
  * [Sign Out with React and Firebase](react-firebase-sign-out)
  * [Session Handling in React Components](react-firebase-session-handling)
  * [Session Handling with Higher Order Components](react-firebase-session-handling-higher-order-components)
  * [Password Reset and Password Change](react-firebase-password)
* Authorization in React
  * [Protected Routes in React with Authorization](react-firebase-protected-routes)
* Firebase Database in React
  * [User Management with Firebase's Database in React](react-firebase-user-database)
* Bonus: [Authentication in React, Firebase and Redux](react-firebase-authentication-redux)
* Bonus: [Authentication in React, Firebase and MobX](react-firebase-authentication-mobx)

{{% chapter_header "React Application Setup: create-react-app" "react-application-setup" %}}

You are going to implement a whole authentication process in React with sign up, sign in and sign out. Furthermore, it should be possible to reset a password or change a password as a user. The latter option is only available as authenticated user. Last but not least, it should be possible to protect certain routes (URLs) to be only used by authenticated users.

The application will be bootstrapped with Facebook's official React boilerplate project {{% a_blank "create-react-app" "https://github.com/facebookincubator/create-react-app" %}}. You can install it once globally on the command line and make use of it whenever you want afterward.

{{< highlight javascript >}}
npm install -g create-react-app
{{< /highlight >}}

Now you can bootstrap your project with it on the command line.

{{< highlight javascript >}}
create-react-app react-firebase-authentication
cd react-firebase-authentication
{{< /highlight >}}

Now you have the following commands on your command line to start and test your application.

{{< highlight javascript >}}
npm start
npm test
{{< /highlight >}}

You can start your application and visit it in the browser. Afterward, let us install a couple of libraries on the command line which are needed for the authentication and the routing in the first place.

{{< highlight javascript >}}
npm install firebase prop-types react-router-dom
{{< /highlight >}}

In addition, create a *components/* folder in your application's *src/* folder.

{{< highlight javascript >}}
cd src
mkdir components
{{< /highlight >}}

Now, move the App component and all its files to the *components/* folder. That way, you will start off with a well structured folder/file hierarchy.

{{< highlight javascript >}}
mv App.js components/
mv App.test.js components/
mv App.css components/
mv logo.svg components/
{{< /highlight >}}

Last but not least, fix the relative path to the App component in the *src/index.js* file since you have moved the App component.

{{< highlight javascript "hl_lines=4" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
{{< /highlight >}}

Next, run your application on the command line again. It should work and be accessible in the browser.

Before implementing the authentication in React, a couple of pages (e.g. sign up page, sign in page) to split up our application on multiple URLs would be great. Therefore let's implement the routing with React Router first.

{{% chapter_header "React Router and Routes" "react-router-setup" %}}

The following application should have multiple routes for the authentication process but also for the application domain itself. Therefore, you can create a file to consolidate all the routes of your application.

From *src/* folder:

{{< highlight javascript >}}
mkdir constants
cd constants
touch routes.js
{{< /highlight >}}

In the newly created file, define all the necessary routes for this tutorial.

In *src/constants/routes.js* file:

{{< highlight javascript >}}
export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';
export const LANDING = '/';
export const HOME = '/home';
export const ACCOUNT = '/account';
export const PASSWORD_FORGET = '/pw-forget';
{{< /highlight >}}

Each route represents a page in your application. Let's walk through the routes step by step. First of all, you will have a **sign up page** and **sign in page**. You can take any web application out there as blueprint to structure these routes for authentication. For instance, take the following scenario: A user visits your web application. The user is conviced by your servive and finds the button in the navigation bar to sign in to your application. But the user has no account yet, so a sign up button is preseneted as alternative.

{{% pin_it_image "react firebase sign in" "img/posts/complete-firebase-authentication-react-tutorial/sign.jpg" "" %}}

Second, there will be a **landing page** and a **home page**. The landing page is your root route. That's the place where a user ends up when visiting your web application. The user doesn't need to be authenticated to visit this route. On the other hand, the home page is a protected route. The user can only access it when being authenticated. You will implement the protection of the route in this tutorial later on.

Third, there will be a protected **account page** as well. There a user can reset a password or change a password but only when being authenticated.

<div class="row">
  <div class="col-xs-8 col-centered">
    {{% pin_it_image "react firebase account" "img/posts/complete-firebase-authentication-react-tutorial/account.jpg" "" %}}
  </div>
</div>

Last but not least, the password forget component will be exposed on another non protected page, a **password forget page**, for users who are not authenticated and forgot about their password.

{{% pin_it_image "react firebase password" "img/posts/complete-firebase-authentication-react-tutorial/password-reset.jpg" "" %}}

Now these routes need to be accessible for the user. The best way to start with it is by implementing a Navigation component which is used in the App component. The App component is the perfect place to render the Navigation component, because it will always render the Navigation component but replace the other components (pages) in it based on the accessed route.

First, refactor your App component to the following implementation. It will use the Navigation component and wraps it already in the Router component provided by React Router. The Router makes it possible to navigate from URL to URL on the client-side application without makine requests to any webserver.

In *src/components/App.js* file:

{{< highlight javascript >}}
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from './Navigation';

const App = () =>
  <Router>
    <Navigation />
  </Router>

export default App;
{{< /highlight >}}

In addition, you can remove the *logo.svg* because it isn't used anymore. Moreover, it is up to you to keep the *App.css* file to style your application later on.

From *src/components/* folder:

{{< highlight javascript >}}
rm logo.svg
{{< /highlight >}}

Second, create the Navigation file.

From *src/components/* folder:

{{< highlight javascript >}}
touch Navigation.js
{{< /highlight >}}

And third, implement the Navigation component. It uses the Link component of React Router to link the application to different URLs. These URLs were defined previously as routes in your constants file.

In *src/components/Navigation.js* file:

{{< highlight javascript >}}
import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

const Navigation = () =>
  <div>
    <ul>
      <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
      <li><Link to={routes.LANDING}>Landing</Link></li>
      <li><Link to={routes.HOME}>Home</Link></li>
      <li><Link to={routes.ACCOUNT}>Account</Link></li>
    </ul>
  </div>

export default Navigation;
{{< /highlight >}}

Now, run your application again and verify two things: The routes need to show up in your browser and once you click a route the URL has to change. However, even though the URL changes, the displayed content doesn't change. Let's implement this behavior.

In your App component, you can specify which components should show up according to corresponding routes with the help of the Route component from React Router.

In *src/components/App.js* file:

{{< highlight javascript "hl_lines=4 8 9 10 11 12 13 15 19 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48" >}}
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';

import * as routes from '../constants/routes';

const App = () =>
  <Router>
    <div>
      <Navigation />

      <hr/>

      <Route
        exact path={routes.LANDING}
        component={() => <LandingPage />}
      />
      <Route
        exact path={routes.SIGN_UP}
        component={() => <SignUpPage />}
      />
      <Route
        exact path={routes.SIGN_IN}
        component={() => <SignInPage />}
      />
      <Route
        exact path={routes.PASSWORD_FORGET}
        component={() => <PasswordForgetPage />}
      />
      <Route
        exact path={routes.HOME}
        component={() => <HomePage />}
      />
      <Route
        exact path={routes.ACCOUNT}
        component={() => <AccountPage />}
      />
    </div>
  </Router>

export default App;
{{< /highlight >}}

So if a route matches a path, the respective component will be displayed. Thus all the page components in the App component stay exchange by using their routes, but the Navigation component stays fixed indepenedent of any route. Next, you have to create all the already used page components.

From *src/components/* folder:

{{< highlight javascript >}}
touch Landing.js Home.js Account.js SignUp.js SignIn.js SignOut.js PasswordForget.js PasswordChange.js
{{< /highlight >}}

In each component, define a simple boilerplate component as functional stateless component. That's sufficient for now. These components will be fileld with business logic later on. For instance, the component for the Landing page could be defined as follows.

In *src/components/Landing.js* file:

{{< highlight javascript >}}
import React from 'react';

const LandingPage = () =>
  <div>
    <h1>Landing Page</h1>
  </div>

export default LandingPage;
{{< /highlight >}}

After you have done so for the Landing, SignUp, SignIn, PasswordForget, Home and Account pages, you should be able to start the application again. Now, when you click through the navigation, the dispkayed component should change accordingly to the URL. Note that the routes for the PasswordForget page and SignUp page are not used yet but will be defined somewhere else later on.

{{% chapter_header "Firebase in React Setup" "react-firebase-setup" %}}

It's time to sign up for an account on the {{% a_blank "firebase website" "https://firebase.google.com/" %}}. After you have created an account, you should be able to create a new project on their platform. You can give your project any name. Furhtermore, you can run it on the free plan.

{{% read_more "Tips to learn React + Redux" "https://www.robinwieruch.de/tips-to-learn-react-redux/" %}}

Once your project is created on their website, you should have a dashboard for it. There you can find one menu item which says "Authentication". Select it and select "Sign-In Method" afterward. There you can enable the authentication with Email/Password. This tutorial will cover the puristic authentication with email and password, but feel free to add other authentication methods later on.

{{% pin_it_image "firebase authentication methods" "img/posts/complete-firebase-authentication-react-tutorial/firebase-authentication-methods.jpg" "" %}}

Next, you need to find your configuration in the project settings. There you will find all the necessary secrets, keys and properties. You will copy these in a next step to your React application.

<div class="row">
  <div class="col-xs-8 col-centered">
    {{% pin_it_image "firebase config" "img/posts/complete-firebase-authentication-react-tutorial/firebase-config.jpg" "" %}}
  </div>
</div>

That's it for the firebase website. Now you can return to your application. Let's add the firebase configuration. Therefore, create a couple of files in a new folder.

From *src/* folder:

{{< highlight javascript >}}
mkdir firebase
cd firebase
touch index.js firebase.js auth.js
{{< /highlight >}}

What's up with all these files? Here comes an overview from top to bottom:

* **index.js:** It's a simple entry point file to the firebase module (src/firebase) by grouping and exposing all the functionalities from the module to other modules in one file.

* **firebase.js:** The file where all the configuration goes that you have seen previosuly on your firebase dashboard. In addition, firebase will be instantiated in this file.

* **auth.js:** The file where all the firebase authentication logic will be defined to sign up, sign in, sign out etc. a user in your application.

Let's start with the configuartion. First, copy the configuration from your firebase dashboard on their website to your file in a configuration object.

In *src/firebase/firebase.js* file:

{{< highlight javascript >}}
const config = {
  apiKey: YOUR_API_KEY,
  authDomain: YOUR_AUTH_DOMAIN,
  databaseURL: YOUR_DATABASE_URL,
  projectId: YOUR_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: YOUR_MESSAGING_SENDER_ID,
};
{{< /highlight >}}

Second, import the firebase object from the firebase node package which you have already installed in the very beginning on the command line. Afterward, initialize it, if it isn't initialized already, with the config object.

{{< highlight javascript "hl_lines=1 12 13 14" >}}
import * as firebase from 'firebase';

const config = {
  apiKey: YOUR_API_KEY,
  authDomain: YOUR_AUTH_DOMAIN,
  databaseURL: YOUR_DATABASE_URL,
  projectId: YOUR_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: YOUR_MESSAGING_SENDER_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
{{< /highlight >}}

Third, initialize the auth object. That's the part of the firebase API which will be used in the *src/firebase/auth.js* file and thus needs to be exported from the file. In a later part of this tutorial, you will initialze the database object the same way too.

{{< highlight javascript "hl_lines=16 18 19 20" >}}
import * as firebase from 'firebase';

const config = {
  apiKey: YOUR_API_KEY,
  authDomain: YOUR_AUTH_DOMAIN,
  databaseURL: YOUR_DATABASE_URL,
  projectId: YOUR_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: YOUR_MESSAGING_SENDER_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};
{{< /highlight >}}

That's it already for the configurational part. There is one last optional step. On the firebase website, you can create a second project. Afterward, your first project could be used as your development database and your second project as your production database. That way, you never mix up your dummy data from development mode with your data from your deployed application.

{{< highlight javascript "hl_lines=3 4 5 6 7 8 9 10 12 21 22 23" >}}
import * as firebase from 'firebase';

const prodConfig = {
  apiKey: YOUR_API_KEY,
  authDomain: YOUR_AUTH_DOMAIN,
  databaseURL: YOUR_DATABASE_URL,
  projectId: YOUR_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: YOUR_MESSAGING_SENDER_ID,
};

const devConfig = {
  apiKey: YOUR_API_KEY,
  authDomain: YOUR_AUTH_DOMAIN,
  databaseURL: YOUR_DATABASE_URL,
  projectId: YOUR_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: YOUR_MESSAGING_SENDER_ID,
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};
{{< /highlight >}}

In the next part, you will define the authentication API.

{{% chapter_header "Firebase's Authentication API" "firebase-authentication" %}}

In the previous section, you have created a firebase project on the official firebase website and allowed the authentication with email and password. Now you will implement the authentication API. You can read up all functionlities that are exposed by the API in the firebase documentation. Let's start to implement the interface that is used later on in our React components. Initially, import the previously instantiated auth object form the configuration file.

In *src/firebase/auth.js* file:

{{< highlight javascript >}}
import { auth } from './firebase';
{{< /highlight >}}

Now, let's define all authentication functions step by step. First, the sign up function. It takes the email and password paramaters in its function signature and uses an official firebase endpoint to create a user.

{{< highlight javascript "hl_lines=3 4 5" >}}
import { auth } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);
{{< /highlight >}}

Second, the sign in function which takes an email and password as well and uses again an official firebase endpoint to sign in a user. Note at this point that these endpoints are called asynchronously. They need to be resolved later on. In addition, there needs to be error handlign for it. For instance, it is not possible to sign in a user which is not signed up yet. The firebase API would return an error. You will implement in a later part of this tutorial.

{{< highlight javascript "hl_lines=7 8 9" >}}
import { auth } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);
{{< /highlight >}}

Third, the sign out function. You don't need to pass any argument to it, because the auth object itself knows about the currently authenticated user (if a user is authenticated in the first place).

{{< highlight javascript "hl_lines=11 12 13" >}}
import { auth } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
  auth.signOut();
{{< /highlight >}}

Last but not least, the two optional functions to reset and change a password of an authenticated user.

{{< highlight javascript "hl_lines=5 6 7 9 10 11" >}}
import { auth } from './firebase';

...

// Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);
{{< /highlight >}}

That's it for the whole authentication API. It covers all the use cases for the purpose of this tutorial. Finally, you should expose the implemented authentication methods and the firebase functionalities itself form your firebase module.

In *src/firebase/index.js* file:

{{< highlight javascript >}}
import * as auth from './auth';
import * as firebase from './firebase';

export {
  auth,
  firebase,
};
{{< /highlight >}}

That way, consumers (React components in our case) should be only allowed to access the *index.js* file as interface to the whole firebase module.

{{% chapter_header "Sign Up with React and Firebase" "react-firebase-sign-up" %}}

In the previous sections, you have set up all the routes for your application, configured firebase and implemented the authentication API. Now it is about time to use the authentication functionalities in your React components. Let's build the components from scratch. I try to put most of the code in one block at this point, because the components are not too small and splitting it up step by step could be too verbose. Nevertheless, I will go through each code block step by step.

Let's start with the sign up page. It consists of the page, a form and a link. Whereas the form is used to sign up a new user to your application, the link will be used later on the sign in page as alternative when a user has no account yet. It is only a redirect to the sign up page, but not used on the sign up page itself.

In *src/components/SignUp.js* file:

{{< highlight javascript >}}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () =>
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>

class SignUpForm extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (event) => {

  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>

      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default SignUpPage;

export {
  SignUpForm,
  SignUpLink,
};
{{< /highlight >}}

In the next step, let's focus on the SignUpForm component. It is the only React ES6 class component, because it has to manage the form state. What's missing in the current SignUpForm component are two pieces: the form content in terms of input fields to capture the email address, password, etc. and the onSubmit class method of the component when a user signs up eventually.

First, let's initialize the state of the component. It will capture the user information such as username, email and password. There are two password fields for a password validation. In addition, there is an error state to capture an error object in case the sign up request to the firebase API fails.

{{< highlight javascript "hl_lines=3 4 5 6 7 8 9 15" >}}
...

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  ...

}

...
{{< /highlight >}}

Second, let's implement all the input fields to capture those information in the render method of the component.

{{< highlight javascript "hl_lines=3 4 5 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54" >}}
...

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {

  ...

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

...
{{< /highlight >}}

Let's take the last code block apart. All the input fields implement the unidirectional data flow of React. Thus each input field gets a value from the local component's state and updates the value in the local state with an `onChange` handler. The input fields are controlled by the local state of the component and don't control their own states (controlled components).

Let's take a look at the abstracted function which is used in the `setState()` method. It is a higher order function which takes a key value and the actual value that is typed into the input field. In the `byPropKey()` function itself, the key value is used as {{% a_blank "dynamic key" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer" %}} to allocate the actual value in the local state. That's it for the whole update mechanism in React.

In the last part of the form, there is an optional error message that is used from an error object (error objects from firebase have this message property by nature). However, the message is only shown when there is an error by using a [conditional rendering](https://www.robinwieruch.de/conditional-rendering-react/).

One piece in the form is missing: validation. Let's use a `isValid` boolean to enable or disable the submit button. When you think about a validation condition for the form, what would it be? It is shown in the next code snippet.

{{< highlight javascript "hl_lines=16 17 18 19 20 26" >}}
...

class SignUpForm extends Component {

  ...

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
        ...
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

...
{{< /highlight >}}

Of course, the user is only allowed to sign up if both passwords are the same (part of the password confirmation in a common sign up process) and if the username and email fields are filled with a string. You should be able to visit the /signup route in your browser now to confirm that the form with all its input fields shows up, that you can type into it, and that the validation works properly. What's missing in the component is the onSubmit class method which will pass all the form data to the firebase authentication API via your previously set up authentication functions.

{{< highlight javascript "hl_lines=2 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25" >}}
...
import { auth } from '../firebase';

...

class SignUpForm extends Component {

  ...

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  ...
}

...
{{< /highlight >}}

Let's break down what happens in the previous code block. All the necessary information that is passed to the authentication API can be destructured from the local state. You will only need one password property, because both password strings should be the same after the validation.

Next, you can call the sign up function which you have defined in a previous section. It takes the email and the password. The username is not used yet, but will be in a later section of this tutorial.

If the request resolves successfully, you can set the local state of the component to its initial state to clean up the input fields. If the request is rejected, you will run into the catch block and set the error object in the local state. Thus a error message should show up in the form.

In addition, the `preventDefault()` method on the event prevents a reload of the browser, which would be a natural behavior otherwise when using a submit in a form. Moreover, note that the signed up user object from the firebase API is availavle in the callback function of the then block in our request. You will use it later on in this tutorial.

If you want to read more about asynchronous requests in request, checkout [this article which explains the concept in more detail by fetching data from a third-party API](https://www.robinwieruch.de/react-fetching-data/).

So what's next? When a user signs up to your application, you want to redirect the user to another page. Perhaps it should be the Home page of the user which will be a protected route for only authenticated users eventually.

{{< highlight javascript "hl_lines=4 8 10 13 29 30 31 36 50" >}}
import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignUpPage = ({ history }) =>
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>

...

class SignUpForm extends Component {

  ...

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  ...
}

...

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
{{< /highlight >}}

Let's take it apart again. In order to redirect a user to another page programmtically, we need access to React Router. The React Router package offers a neat [higher order component](https://www.robinwieruch.de/gentle-introduction-higher-order-components/) to make the router properties accessible in the props of a component. That's why the SignUpPage component is passed to the `withRouter()` higher order component. The relevant property for us from the router props is the `history` object. It can be used to push routes to it for a redirect. That's why the history is passed down to the SignUpForm component.

There is no particular reason why I wrapped the SignUpPage and not the SignUpForm with the higher order component in case you are wondering.

Eventually, the history object of the router can be used in the `onSubmit()` class method. If a request resolves successfully, you can push any route to the history object. Since the pushed route is defined in our App component with a correspondeing component, the displayed component will change after the redirect.

You can run your application now and checkout if the sign up process works for you. If you signed up a user successfully, you should be redirected. If the sign up fails, you should see a error message. Try to sign up a user with the same email address twice and verify that the following or a similar error message shows up: "The email address is already in use by another account.".

{{% chapter_header "Sign In with React and Firebase" "react-firebase-sign-in" %}}

An sign up automatically results into a sign in of a user in firebase. Of course we cannot rely on it, because a user could already be signed up but not signed in to your application. Let's implement the sign in. It is similiar to the sign up, so I don't split up any code blocks. It's straigth forward if you have understand the previous sign up form.

In *src/components/SignIn.js* file:

{{< highlight javascript >}}
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} />
    <SignUpLink />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
{{< /highlight >}}

Basically it is almost the same as the sign up form. The form with its input fields captures all the necessary information such as username and password. A validation step makes sure that email and password are set before performing the request by enabling or disabling the submit button. The authentication API is used again, but this time with the function to sign in a user rather than the function to sign up a user. If the sign in succeeds, the local state is updated with the initial state and the user is redirected again. If the sign in fails, a error object is stored in the local state and a error messages should show up. There is one difference though: The SignUpLink which you have defined in the previous section is used on the sign up page now. It gives the user an alternative to the sign up form in case the person isn't signed up yet.

{{% chapter_header "Sign Out with React and Firebase" "react-firebase-sign-out" %}}

In order to complete the authentication cylce, let's implement as last part the sign out component. It doesn't need any form and is only a button which shows up in the nvavigation.

In *src/components/SignOut.js* file:

{{< highlight javascript >}}
import React from 'react';

import { auth } from '../firebase';

const SignOutButton = () =>
  <button
    type="button"
    onClick={auth.doSignOut}
  >
    Sign Out
  </button>

export default SignOutButton;
{{< /highlight >}}

Since we can use the already defined authentication API to sign out a user, it is fairly straight forward to pass the functionality to a button in a React component.

The button can be used in the Navigation component now.

In *src/components/Navigation.js* file:

{{< highlight javascript "hl_lines=4 14" >}}
import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = () =>
  <div>
    <ul>
      <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
      <li><Link to={routes.LANDING}>Landing</Link></li>
      <li><Link to={routes.HOME}>Home</Link></li>
      <li><Link to={routes.ACCOUNT}>Account</Link></li>
      <li><SignOutButton /></li>
    </ul>
  </div>

export default Navigation;
{{< /highlight >}}

From a component perspective everything is in place to fulfill a full authentication flow now. A user is able to sign up, sign in and sign out. However, when you open the application, something feels odd. For instance, the "Sign Out" button should only show up when a user is signed in. If the button is pressed, it should disappear. The simplest solution for this problem is to use a conditional rendering in the Navigation component. Based on an authenticated user object, the navigation changes its options. It has either all the options for an authenticated user or all the options for non authenticated users.

{{< highlight javascript "hl_lines=7 9 10 11 12 15 16 17 18 19 20 21 23 24 25 26 27" >}}
import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = ({ authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

const NavigationAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>

export default Navigation;
{{< /highlight >}}

The Navigation component has access to the authenticated user in its props. But where does this object come from? You will explore this in the next section.

{{% chapter_header "Session Handling in React Components" "react-firebase-session-handling" %}}

The following section is the most crucial part to the authentication process. You have all components in place to fulfill the authentication flow in React components, but no one knows about any session state. The question is: "Is there a currently signed in user?" There is no logic yet about an authenticated user. The information needs to be stored somewhere to make it accessible to other components (e.g. Navigation component).

Often that's the point where people start to use a state management library such as [Redux or MobX](https://www.robinwieruch.de/redux-mobx-confusion/). But since our whole application is grouped under the umbrella App component, it's sufficient to manage the session state in the App component by using React's local state. It only needs to keep track of an authenticated user. If a user is authenticated, store it in the local state and pass the authenticated user object down to all components that are interested in it. For instance, the Navigation component from the previous section is interested in it, because it has to show different options to authenticated and non authenticated users.

Let's start to implement the session handling in the App component. Because it handles local state now, you have to refactor it to a ES6 class component. It manages the local state of an `authUser` object (we don't know yet where it comes from) and passes it to the Navigation component. In the last section, you already made the Navigation component aware of the authenticated user to display different options depending on it.

In *src/components/App.js* file:

{{< highlight javascript "hl_lines=1 9 10 11 12 13 14 15 16 22" >}}
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

...

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} />

          <hr/>

          ...
        </div>
      </Router>
    );
  }
}

export default App;
{{< /highlight >}}

The crucial part comes now. Firebase offers a neat helper function which can be initialized in the `componentDidMount()` lifecycle method of the App component. It can be used as a listener.

{{< highlight javascript "hl_lines=4 15 16 17 18 19 20 21" >}}
...

import * as routes from '../constants/routes';
import { firebase } from '../firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  ...

}

export default App;
{{< /highlight >}}

The helper function `onAuthStateChanged()` gets a function as input and this function has access to the authenticated user object. In addition, this passed function is called **every time** something changed with the authenticated user. Therefore, it is called when a user signs up (because it results in a sign in), signs in and signs out. If a user signs out, the `authUser` object is null. Thus the `authUser` property in the local state is set to null as well and as reaction the Navigation component displays different options.

Start your application again and verify that your sign up, sign in and sign out works properly and the navigation displays the options depending on the state accordingly. That's it! You have successfully implemented the authentication flow with firebase in React. Everything that comes in the following sections is extra implementation sugar on top and a couple of neat features such as password forget and password update.

The recent sections were quite a lot of content. I didn't go into all the details, because I teach those in the referenced articles and "The Road to learn React". So make sure to check out the ebook!

{{% chapter_header "Session Handling with Higher Order Components" "react-firebase-session-handling-higher-order-components" %}}

In this section, we will abstract the session handling way with higher order components and the React's provider pattern. It has two advantages:

* The higher order component fulfills only one purpose and shields away the business logic from the App component. The App component stays lightwight.

* The [provider pattern](https://www.robinwieruch.de/react-provider-pattern-context/) helps us out with React's context. Rather than passing the authenticated user object explicitity down to all components who are interested in it through the App component, you can pass it impicitly through React's context.

First, you can revert the recent changes in the App component. It can become a functional stateless component again. It doesn't need to know about the authenticated user object anymore.

In *src/components/App.js* file:

{{< highlight javascript >}}
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';

import * as routes from '../constants/routes';

const App = () =>
  <Router>
    <div>
      <Navigation />

      <hr/>

      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
    </div>
  </Router>

export default App;
{{< /highlight >}}

Next, you can wrap the App component up in a session handling higher order component. That's where all the business logic goes which you have just removed in the last step from the App component.

{{< highlight javascript "hl_lines=3 10" >}}
...

import withAuthentication from './withAuthentication';

const App = () =>
  ...

...

export default withAuthentication(App);
{{< /highlight >}}

That's how the higher order component makes its session handling logic available to the App component. We didn't implement the higher order component yet. First, you have to create a file for it on the command line.

From *src/components/* folder:

{{< highlight javascript >}}
touch withAuthentication.js
{{< /highlight >}}

Second, move all the previous session logic into the higher order component.

In *src/components/withAuthentication.js* file:

{{< highlight javascript >}}
import React from 'react';

import { firebase } from '../firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }

    render() {
      return (
        <Component />
      );
    }
  }

  return WithAuthentication;
}

export default withAuthentication;
{{< /highlight >}}

If you are not familiar with higher order components, make sure to read this [gentle introduction](https://www.robinwieruch.de/gentle-introduction-higher-order-components/).

Third, there needs to be a mechanism to pass down the authenticated user object to the other components (e.g. Navigation component). As mentioned, we will use React's provider pattern with the context object. Adjust your session handling higher order component to the following.

{{< highlight javascript "hl_lines=2 16 17 18 19 20 37 38 39" >}}
import React from 'react';
import PropTypes from 'prop-types';

import { firebase } from '../firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    getChildContext() {
      return {
        authUser: this.state.authUser,
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }

    render() {
      return (
        <Component />
      );
    }
  }

  WithAuthentication.childContextTypes = {
    authUser: PropTypes.object,
  };

  return WithAuthentication;
}

export default withAuthentication;
{{< /highlight >}}

Last but not least, the only consumer of the authenticated user object, the Navigation component, needs to know about the change from passing the object via context rather than props. Even though the Navigation component is a functional stateless component, it can access React's context in its second argument in the function signature.

In *src/components/Navigation.js* file:

{{< highlight javascript "hl_lines=2 8 16 17 18" >}}
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = (props, { authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

Navigation.contextTypes = {
  authUser: PropTypes.object,
};

...

export default Navigation;
{{< /highlight >}}

Now, start your application again and verify that it still works the same as before. You didn't change any behavior of your application in this section, but only shielded away the more complex logic into a higher order component and added the convinience of passing the authenticcated user implictly via React's context rather than explicitly through the whole component tree by using props.

{{% chapter_header "Password Reset and Password Change" "react-firebase-password" %}}

There are two more neat features available in the firebase authentication API and you have already implemented the interface for it: password forget and password change.

Let's start by implementing the password forget feature. You already have implemented the interface in your firebase module. Now you can make use of it in a component. The following file implements the vast majority of the password reset logic in a form again. We already implemented a couple of those before, so it should be any different now.

In *src/components/PasswordForget.js* file:

{{< highlight javascript >}}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';

const PasswordForgetPage = () =>
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={this.state.email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to="/pw-forget">Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
{{< /highlight >}}

Again it's a lot of code. But it isn't any different from the sign up and sign in forms. The password forget uses a form to submit the information (email address) which is needed by the firebase API to reset the password. A class method (onSubmit) makes sure that the information is send to the API. Furhtermore, it resets the form's input field on a successful request or shows an error on a errornous request. In addition, the form is validated again before it can be submitted.

Moreover, the file implements a password forget link as component which isn't used directly in the form component. It is similar to the SignUpLink component which was used on the SignInPage. This link is not different. You can already make use of it. In case a user forgot about the password in the signin in process, the password forget page isn't far away by using the link.

Remember that the password forget page is already mapped in the App component. So you can simply drop the PasswordForgetLink component in the sign in page.

In *src/components/SignIn.js* file:

{{< highlight javascript "hl_lines=5 13" >}}
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>

...
{{< /highlight >}}

You can try it out yourself now. Start the application and reset your password. It doesn't matter if you are authenticated or not. Once you send the request, you should get an email from firebase to update your password.

Now let's get to the password change component. You have implemented this functionality already in your firebase interface as well. You only need a form component to make use of it. Again, the form component isn't any different from the sign in, sign up and password forget forms.

In *src/components/PasswordChange.js* file:

{{< highlight javascript >}}
import React, { Component } from 'react';

import { auth } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="New Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default PasswordChangeForm;
{{< /highlight >}}

It updates its local state by using `onChange` handlers in the input fields. Furthermore, it validates the state before submitting a request to change the password. Last but not least, it shows again a error message when a request failed.

Now there is another neat implementation for your application. The password change component isn't reachable yet. On the other hand, it's great that the password forget form is reachable from the sign in page. But what about a central place to make those account functionalities available for an authenticated user? You have already created a file for an account page on the command line and mapped the route in the App component. Now you only need to implement it.

In *src/components/Account.js* file:

{{< highlight javascript >}}
import React from 'react';
import PropTypes from 'prop-types';

import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';

const AccountPage = (props, { authUser }) =>
  <div>
    <h1>Account: {authUser.email}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>

AccountPage.contextTypes = {
  authUser: PropTypes.object,
};

export default AccountPage;
{{< /highlight >}}

The AccountPage component isn't complicated and doesn't have any business logic. It merely uses the password forget and password change forms in a central place. In addition, it gets access to the authenticated user object via React's context as well (same as the Navigation component) and thus can display the email address of the currently authenticated user.

That's it. Your user experience has improved significantly with the password forget and password change features. Users who have trouble with their password can use these features now.

{{% chapter_header "Protected Routes in React with Authorization" "react-firebase-protected-routes" %}}

When you sign out from the home or account page, you will not get any redirect even though these pages should be only accessible for authenticated users. However, it makes no sense to show a non authenticated user the account page. In this section, you will implement a protection for these routes in case a user signs out.

This protection is a form of a **general authorization** for your application. It checks whether there is an authenticated user. If there isn't an authenticated user, it will redirect to a public route. Otherwise it will do nothing. The condition could be defined as simple as: `authUser != null`. In contrast, a more **specific authorization** could be role or permission based authorization. For instance, `authUser.role === 'ADMIN'` would be a role based authorization and `authUser.permission === 'canEditAccount'` would be a permission based authorization. Fortunately, we will implement it in a way that you can define the authorization condition in a flexible way so that you have full control over it in the long run.

Similar to the higher order authentication component, there will be a higher order authorization component to shield away the logic. It can be reused then for the HomePage and AccountPage components. What's the task of the higher order component? First of all, it gets the condition passed as parameters. That way you can decide on your own if it should be a general or specific authorization rule. Second, it has to decide based on the condition whether it should redirect to a public page because the user isn't authorized to view the current page.

Let's start to implement the higher order component. First, create it on the command line.

From *src/components/* folder:

{{< highlight javascript >}}
touch withAuthorization.js
{{< /highlight >}}

Second, I will just paste the whole block for the higher order component and explain it afterward.

{{< highlight javascript >}}
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { firebase } from '../firebase';
import * as routes from '../constants/routes';

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return this.context.authUser ? <Component /> : null;
    }
  }

  WithAuthorization.contextTypes = {
    authUser: PropTypes.object,
  };

  return withRouter(WithAuthorization);
}

export default withAuthorization;
{{< /highlight >}}

Let's break it down. First, have a look at the render method. It renders either the passed component (e.g. AccountPage) or nothing. That's just a fallback in case there is no authenticated user in the context. It increases the protection of the component by rendering nothing. However, the real logic happens in the `componentDidMount()` lifecycle method. Same as the `withAuthentication()` higher order component, it uses the firebase listener to trigger a callback function in case the authenticated user object changes. Every time the `authUser` changes, it checks the passed `authCondition()` function with the `authUser`. If the authorization fails, the higher order component redirects to the sign in page. If it doesn't fail, the higher order component does nothing. In general, the higher order component has access to the history object of the router by using the `withRouter()` higher order component.

In the next step, you can use the higher order component to protect your routes (e.g. /home and /account) with authorization rules. For the sake of keeping it simple, the following two components are only protected with a general authotirzation rule that checks if the `authUser` object is not null. First, wrap the HomePage component in the higher order component and define the authorization condition.

In *src/components/Home.js* file:

{{< highlight javascript "hl_lines=3 8 11 13" >}}
import React from 'react';

import withAuthorization from './withAuthorization';

const HomePage = () =>
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
{{< /highlight >}}

First, wrap the AccountPage component in the higher order component and define the authorization condition as well.

In *src/components/Account.js* file:

{{< highlight javascript "hl_lines=6 19 21" >}}
import React from 'react';
import PropTypes from 'prop-types';

import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

const AccountPage = (props, { authUser }) =>
  <div>
    <h1>Account: {authUser.email}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>

AccountPage.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
{{< /highlight >}}

That's it, your routes are protected now. You can imagine how this technique gives you full control over your authorizations. For instance, an admin dashboard which is only available for users with the ADMIN role, could be protected as follows.

{{< highlight javascript "hl_lines=6 19 21" >}}
import React from 'react';
import PropTypes from 'prop-types';

import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

const AccountPage = (props, { authUser }) =>
  <div>
    <h1>Account: {authUser.email}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>

AccountPage.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
{{< /highlight >}}

Congratulations You successfully implemented a full authentication flow with Firebase in React, added neat features such as password reset and password change, and authorized a couple of routes with dynamic authorizatiuon conditions. In the next section, you will explore how you can manage the users who sign up in your application. So far, only firebase knows about them but you have no own database runnign to store them.

{{% chapter_header "User Management with Firebase's Database in React" "react-firebase-user-database" %}}

So far, only firebase knows about your users. There is no way to retrieve the a single user or a list of users for you. They are stored internally by firebase to keep the authentication secured. But you can introduce the firebase realtime database to keep track of the users yourself. And you should do it, because otherwise you never have a way to associate entities (e.g.a todo item) created by your users. Therefore, follow this section to store users in your firebase realtime database during the sign up process.

First of all, create a file for your firebase realtime database API. It goes into the firebase folder next to your file for your authentication API.

From *src/firebase/* folder:

{{< highlight javascript >}}
touch db.js
{{< /highlight >}}

In the file, you will implement the interface to your firebase realtime database for the user entity. The file defines two functions: one to create a user and one to retrieve all users.

In *src/firebase/db.js* file:

{{< highlight javascript >}}
import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...
{{< /highlight >}}

In the first asynchronous function, the user is created as object with the username and email properties. Furthermore, it is stored on the `users/${id}` ressource path. So whenver you would want to retrieve a specific user from the firebase database, you could get the one user via its unique identifier and the entity ressource path.

Second, the users are retrieved from the general users entity ressource path. The following asynchronous function will return all users from the firebase realtime database.

Note: In the future, you could consider to split up the file into multiple files (e.g. in a *db/* folder) for different domain entities (e.g. *db/user.js*, *db/todos.js*, ...).

You might have noticed that the file imports a database object from the *src/firebase/firebase.js* file which isn't defined yet. Let's create it now.

In *src/firebase/firebase.js* file:

{{< highlight javascript "hl_lines=5 9" >}}
import * as firebase from 'firebase';

...

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
{{< /highlight >}}

Here you can see again how firebase separates its authentication and database API. You did the same in both *db.js* and *auth.js* files. Last but not least, don't forget to make the new functionalities from your firebase database API available in your firebase module's entry point.

In *src/firebase/index.js* file:

{{< highlight javascript "hl_lines=2 7" >}}
import * as auth from './auth';
import * as db from './db';
import * as firebase from './firebase';

export {
  auth,
  db,
  firebase,
};
{{< /highlight >}}

Now you can use those functionalities in your React components to create and retrieve users. Let's start with the user creation. The best place to do it would be the SignUpForm component. You can simply add another API request to create a user when the user signed up successfully.

In *src/components/SignUp.js* file:

{{< highlight javascript "hl_lines=7 30 31 32 33 34 35 36 37 38" >}}
import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

...

class SignUpForm extends Component {

  ...

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });

      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  ...
}
{{< /highlight >}}

Notice how all the previous business logic from the first then block moves into the second then block. The logic is only called after the second asynchronous API call resolves succesfully. In addition, see how the `authUser` object's `uid` and the `username` property from the local state can be used to create the user object.

Note: It is fine to store user information in your own database. However, you should make sure not to store the password of the user on your own. Firebase already deals with the authentication and thus there is no need to store the password in your database (without encryption etc.) too . It would be a huge security risk, so don't do it if someone else already handles it for you.

That's it for the user creation process. Now you are creating a user once a user signs up in your application. By now it is a lot of business logic in your component's lifecycle method and you could consider to extract the logic on your own to a separate place to keep the component lightwight.

Next, only to verify that the user creation is working, you can retrieve all the users from the database in one of your other components. Since the HomePage component isn't of any use yet, you can do it there to display your users stored in the realtime database of firebase. The `componentDidMount()` lifecycle method is the perfect place to call your user database API.

In *src/components/Home.js* file:

{{< highlight javascript >}}
import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
{{< /highlight >}}

Afterward, you can display a couple of properties of your list of users.

{{< highlight javascript "hl_lines=7 14 20 21 22 23 24 25 26 27 28" >}}
...

class HomePage extends Component {
  ...

  render() {
    const { users } = this.state;

    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        { !!users && <UserList users={users} /> }
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
{{< /highlight >}}

That's it for the user entity management. You are in full control of your users now. It is possible to retrieve a user entity or a list of user entities. Furhtermore, you can create a user in the realtime database. It is up to you to implement the other {{% a_blank "CRUD operations" "https://en.wikipedia.org/wiki/Create,_read,_update_and_delete" %}} as well in order to update a user, to remove a user and to retrieve a single user entity.

By now, everything is in place in terms of authentication and user management for your application. You could continue to implement your domain logic. However, **the following sections will showcase you how to implement to state handling in MobX or Redux**. You can follow one of these sections to learn about it. But keep two things in mind:

* It works in plain React as well. So [if you don't have any good reason to introduce Redux or MobX](https://www.robinwieruch.de/learn-react-before-using-redux/), consider to keep it like it is right now.

* This tutorial used the learnings from [The Road to learn React](https://www.robinwieruch.de/the-road-to-learn-react/) as foundation. The same applies for the next chapters and the ebook: {{% a_blank "Taming the State in React" "https://roadtoreact.com/" %}}. It is full of useful information about Redux and MobX and teaches state management in React from scratch by building applications along the way.

{{% chapter_header "Authentication in React, Firebase and Redux" "react-firebase-authentication-redux" %}}

{{% chapter_header "Authentication in React, Firebase and MobX" "react-firebase-authentication-mobx" %}}

- follow eject tutorial to prepare your create-react-app for MobX and JavaScript decorators

<hr class="section-divider">

Hopefully the guide has helped you to implement your own authentication and authorization flow in React with Firebase. If you have any suggestions or improvements, please reach out in the comments below or open a issue/pull request on GitHub. Again, if the tutorial didn't explain everythin in detail, then it was because most those things are already covered in my {{% a_blank "(partly free) courses" "https://roadtoreact.com/" %}}. Thank you for reading. Keep an eye on the material and help me to keep it up to date for others.