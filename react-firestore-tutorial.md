+++
draft = true
title = "A Firestore in React Tutorial for Beginners [2018]"
description = "A beginners tutorial to learn Firestore in React for business application with authentication, authorization and a real-time database. The tutorial gives you the perfect React Firestore boilerplate project ..."
date = "2018-12-08T07:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react firestore", "react firestore tutorial", "react authentication", "react firestore authentication tutorial", "react session", "react authorization", "react protected routes"]
news_keywords = ["react firestore", "react firestore tutorial", "react authentication", "react firestore authentication tutorial", "react session", "react authorization", "react protected routes"]
hashtag = "#ReactJs"
card = "img/posts/react-firestore-tutorial/banner_640.jpg"
banner = "img/posts/react-firestore-tutorial/banner.jpg"
contribute = "react-firestore-tutorial.md"
headline = "A Firestore in React Tutorial for Beginners [2018]"

summary = "A beginners tutorial to learn Firestore in React for business application with authentication, authorization and a real-time database. The tutorial gives you the perfect React Firestore boilerplate project."
+++

{{% sponsorship %}}

{{% pin_it_image "react firestore" "img/posts/react-firestore-tutorial/banner.jpg" "is-src-set" %}}

{{% react-firebase-book %}}

Those who follow my content know that I always use the good old Firebase Realtime Database in React applications. I am saying good old here, because there is this new cool kid on the block: **Firebase's Cloud Firestore**. It can be used as **alternative to Firebase's Realtime Database**. According to Google's documentation, there are four major advantages of using Cloud Firestore over Firebase's Realtime Database:

* more intuitive data model
* more features
* faster queries
* scales better for larger applications

I experienced the first argument from a code perspective, but also when inspecting the database entries on my Firebase project's dashboard, because it shifts the focus from JSON to document-oriented database. You can read more about which database to choose in {{% a_blank "this comprehensive article that pivots Firebase's Cloud Firestore vs. Realtime Database" "https://firebase.google.com/docs/database/rtdb-vs-firestore" %}}.

Before I migrate my React tutorials and books from the older Realtime Database to Cloud Firestore, I'd like to show you a **straight forward migration path** regarding the source code. That's how you can still use all the educational content I have written about Firebase and Firebase's Realtime Database, but exchange the database with Firebase's Cloud Firestore. As a result, I am not building a React application with Cloud Firestore from scratch, but migrating a [feature-rich React with Firebase application](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/) that uses Firebase's Realtime Database over to Firebase's Cloud Firestore. Both versions are accessible as source code on GitHub:

* {{% a_blank "React with Firebase Realtime Database" "https://github.com/the-road-to-react-with-firebase/react-firebase-authentication" %}}.
* {{% a_blank "React with Firebase Cloud Firestore" "https://github.com/the-road-to-react-with-firebase/react-firestore-authentication" %}}.

Except for the database, everything else stays the same; thus, everything else you learned from my previous React Firebase tutorials is still up-to-date. Before we start with migration, consider reading through this [visual Firebase tutorial](https://www.robinwieruch.de/firebase-tutorial/) to set up your Firebase project with Cloud Firestore.

{{% chapter_header "Migration from Realtime Database to Cloud Firestore" "firebase-cloud-firestore-migration" %}}

First, our project has a Firebase class that connects our React application with the Firebase API (e.g. authentication API, database API). It currently 0uses Firebase's Realtime Database:

{{< highlight javascript "hl_lines=3 20 26 70 72 97 99 103 105" >}}
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

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
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');
}

export default Firebase;
{{< /highlight >}}

The previous code snippet has all the lines highlighted that need to be changed for the Firestore migration. It's not much, because all the other authentication related code stays the same. Only the database setup changes when using Cloud Firestore and the API to read and write on user and message entities. Let's exchange the setup first. The usual `npm install firebase` node package comes with the Cloud Firestore and Realtime Database, so we can exchange this one straight forward.

{{< highlight javascript "hl_lines=3 13 19 20" >}}
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = { ... };

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.fieldValue = app.firestore.FieldValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.firestore();
    this.db.settings({ timestampsInSnapshots: true });

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  ...
}

export default Firebase;
{{< /highlight >}}

The set up for using timestamps, in this case for the `createdData` property for our message entities, has also changed slightly. Now, only the other previously highlighted sections have to change, to interact with the new Firestore instead of the Realtime Database.

{{< highlight javascript "hl_lines=9 11 36 38 42 44" >}}
class Firebase {

  ...

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.doc(`users/${uid}`);

  users = () => this.db.collection('users');

  // *** Message API ***

  message = uid => this.db.doc(`messages/${uid}`);

  messages = () => this.db.collection('messages');
}
{{< /highlight >}}

Instead of working on references that are used to locate the JSON objects in Firebase's Realtime Database, Firestore introduces Collections (Lists, Arrays) and Documents (Item, Entity, Object). With these new concepts, we can use the usual {{% a_blank "CRUD (Create, Read, Update, Delete) Operations" "https://en.wikipedia.org/wiki/Create,_read,_update_and_delete" %}} on them with with set, get, update, delete methods.

{{% chapter_header "Write Data to Firestore: Set or Update? Merge!" "firebase-cloud-firestore-write-data" %}}

Cloud Firestore uses set and update methods to create and edit documents in the database. For instance, when you sign up to Firebase authentication, in our application, in the sign up form, we made sure to create a new user in the database.

It works the same as before with Cloud Firestore, because it offers the same method , where the`set()` method creates a new document in the Firestore database. If the document already exists, its content will be overwritten. If the document doesn't exist, it will be created.

{{< highlight javascript "hl_lines=22" >}}
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
        return this.props.firebase.user(authUser.user.uid).set(
          {
            username,
            email,
            roles,
          },
          { merge: true },
        );
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  ...

  render() {
    ...
  }
}
{{< /highlight >}}

However, as seen in the code snippet, Cloud Firestore comes with a merge option. If you are not sure whether your document already exists, pass the merge option to avoid overwriting the entire document. New content is merged into the entity if the entity is already there. We don't use the `update()` method because it fails if the document doesn't exist.

In our case, the merge operation makes sense because we can't be sure if a user is signing up for the first time  or if they've signed up with a social login such as Google or Facebook. To handle this, we migrate our user creations for the social logins in the sign in form to use the merge option too.

{{< highlight javascript "hl_lines=19" >}}
class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set(
          {
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: [],
          },
          { merge: true },
        );
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Google</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
{{< /highlight >}}

Conduct the same migration for the Facebook and Twitter sign-in methods. Then you can be assured that every time a user signs in with one of the available sign in methods, the latest properties from the authenticated user will be merged into the database user.

We have some more set and update methods that were used for the Realtime Database in our application, but they stay the same for the Firestore Database. Only the sign in and sign up methods have changed, because it is more convenient to always merge the latest authenticated user to our database user document.

{{% chapter_header "Read Data from Firestore" "firebase-cloud-firestore-read-data" %}}

After we have learned how to write data to Firestore with set, update, and merge, we need to know how to read data from Firestore as well. Let's migrate all our React components that are reading data from the Realtime Database to read data from Firebase's Firestore, starting with the UserList component that looks for Firebase's Realtime Database like the following:

{{< highlight javascript >}}
class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    ...
  }
}
{{< /highlight >}}

Firebase's Realtime Database always returns an object that represents your data. It doesn't matter whether you request a single entity or a list of entities. For instance, a list of entities would always be a dictionary of the entities accessible by their identifiers. Now, when using Cloud Firestore instead, transforming the data collection to a list of items is different:

{{< highlight javascript "hl_lines=14 16 17 19 20 21 24 31" >}}
class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .users()
      .onSnapshot(snapshot => {
        let users = [];

        snapshot.forEach(doc =>
          users.push({ ...doc.data(), uid: doc.id }),
        );

        this.setState({
          users,
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    ...
  }
}
{{< /highlight >}}

The snapshot offers a forEach method to iterate through the collection (documents/entities). Unfortunately there are no map, reduce or filter methods. Using the forEach method, you can create your list of items and keep track of the identifier of the document too.

Identical to the Realtime Database, the Cloud Firestore is realtime as well. But it uses more common sense of creating the listener, which is just the return value of the function call that can be used in React's other lifecycle method to remove the listener.

Now we have seen how this works for lists (collection) when using Firebase's Firestore, but not a single item (document)? Let's see how the UserItem component fetches data with the new Firestore:

{{< highlight javascript "hl_lines=19 21 23 30" >}}
class UserItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .user(this.props.match.params.id)
      .onSnapshot(snapshot => {
        this.setState({
          user: snapshot.data(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  ...
}
{{< /highlight >}}

If there is a user coming from React Router's state, the user is not fetched again. But also not kept up to date with a Firebase realtime listener. That's why unsubscribing the listener is a conditional operation. The data fetching doesn't look much different from the previous version, except the method names changed to `onSnapshot()` and `data()`.

Now we have seen how collections and single documents are read from Firestore, so we need to apply the same refactorings to our other React components from the application. First, the HomePage component that fetches users to associate them later with written messages:

{{< highlight javascript "hl_lines=11 13 14 15 18 24" >}}
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.firebase
      .users()
      .onSnapshot(snapshot => {
        let users = {};
        snapshot.forEach(doc => (users[doc.id] = doc.data()));

        this.setState({
          users,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        <Messages users={this.state.users} />
      </div>
    );
  }
}
{{< /highlight >}}

In this component, we don't want to transform the collection into a list of items but keep it as object that can be accessed using identifiers in the form of a dictionary later. The Messages component  fetches our other collection that we adjusted in the beginning in the Firebase class:

{{< highlight javascript "hl_lines=11 13 14 15 16 17 18 19 20 23 33" >}}
class Messages extends Component {
  ...

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .messages()
      .orderBy('createdAt', 'desc')
      .limit(this.state.limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let messages = [];
          snapshot.forEach(doc =>
            messages.push({ ...doc.data(), uid: doc.id }),
          );

          this.setState({
            messages: messages.reverse(),
            loading: false,
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  ...
}
{{< /highlight >}}

As for the other components using Firestore now, the transformation changes, subscribing to and unsubscribing from the listener, and a couple of property and method namings change, too. Everything else stays fairly the same as before.

<hr class="section-divider">

Migrating a larger application from Firebase's Realtime Database to Firebase Cloud Firestore isn't that complex. The database layer with its setup and operations changes, but all the other Firebase features such as authentication, authorization, and hosting stay identical. Reading and writing data with the Firestore isn't much different from the Realtime Database, but it adds more convenience using a more elegant API and data structure with collections and documents. As an exercise, I encourage you to go through my Firebase + React tutorial and migrate it to Firestore to learn more.

Check out the {{% a_blank "official Firestore documentation" "https://firebase.google.com/docs/firestore/" %}} to learn more about how it structures data, how to read and write data, and how to integrate it with more advanced features. You can also check out the Firebase Realtime Database project and the Firebase Cloud Firestore project on GitHub from the beginning of this tutorial.