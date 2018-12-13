+++
draft = false
title = "How to use Firebase Realtime Database in React"
description = "A React with Firebase tutorial on how to work with Firebase's realtime database in React. Learn about the get, create, update and remove operations, how to enable pagination and how to order your list of data, and how fo associate items with each other ..."
date = "2018-11-02T07:52:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react firebase realtime database", "react firebase associate", "react firebase data fetching"]
news_keywords = ["react firebase realtime database", "react firebase associate", "react firebase data fetching"]
hashtag = "#ReactJs"
card = "img/posts/react-firebase-realtime-database/banner_640.jpg"
banner = "img/posts/react-firebase-realtime-database/banner.jpg"
contribute = "react-firebase-realtime-database.md"
headline = "How to use Firebase Realtime Database in React"

summary = "A React with Firebase tutorial on how to work with Firebase's realtime database in React. Learn about the get, create, update and remove operations, how to enable pagination and how to order your list of data, and how fo associate items with each other."
+++

{{% sponsorship %}}

{{% pin_it_image "react firebase realtime database" "img/posts/react-firebase-realtime-database/banner.jpg" "is-src-set" %}}

{{% react-firebase-book %}}

{{% read_before_7 "This tutorial is part 8 of 8 in this series." "Part 1:" "A Firebase in React Tutorial for Beginners" "https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial" "Part 2:" "React Firebase Authorization with Roles" "https://www.robinwieruch.de/react-firebase-authorization-roles-permissions" "Part 3:" "React Firebase Auth Persistence with Local Storage" "https://www.robinwieruch.de/react-firebase-auth-persistence" "Part 4:" "React Firebase Social Login: Google, Facebook, Twitter" "https://www.robinwieruch.de/react-firebase-social-login" "Part 5:" "React Firebase: Link Social Logins" "https://www.robinwieruch.de/react-firebase-link-social-logins" "Part 6:" "React Firebase: Email Verification" "https://www.robinwieruch.de/react-firebase-email-verification" "Part 7:" "How to use React Router with Firebase" "https://www.robinwieruch.de/react-firebase-router" %}}

You have worked with a list of data and single entities with the Firebase's realtime database to make up your admin dashboard in the previous sections. If you want to dig deeper there, checkout the Firebase admin SDK to manage the authenticated users too.

In this section, I want to introduce a new entity to demonstrate at least one business related feature for this Firebase in React application. It will be a message entity that enables you to implement a chat application. It's up to you to take this a step further by introducing a channel entity that defines different chat rooms in the end. For now, I only want to focus on the message entity.

Generally speaking you will learn on how to interact with Firebase's realtime database: how to structure data, how to work with lists of data, and how to create, update and remove data. Moreover you will see how ordering and pagination works with Firebase.

{{% chapter_header "Defining a Firebase Realtime Database API" "firebase-realtime-database-api" %}}

Our Firebase class is the glue between our React application and the Firebase API. We instantiate it once and pass it to our React application via React's Context API. Then we can define all APIs ourselves to connect both worlds in the Firebase class. We have done it earlier for the authentication API and the user management. Now let's introduce the API for the new message entity.

{{< highlight javascript "hl_lines=10 11 12 13 14" >}}
class Firebase {
  ...

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');
}
{{< /highlight >}}

Messages are readable and writeable on two API endpoints: messages and messages/:messageId. Whereas you will retrieve a list of message and create a message with the `messages` reference, you will edit and remove messages with the `messages/:messageId` reference.

If you want to be more fine-grained here, you could put more specific class methods for the message API in your Firebase class. For instance, there could be one class method for creating, updating and removing a message. However, in our case we will keep it general and do the specifics in the React components.

{{% chapter_header "Get a List from Firebase Realtime Database" "firebase-realtime-database-get-list" %}}

The HomePage component may be the best place to add the chat feature with messages. It is only accessible by authenticated users due to authorization. Let's add a Message component that has access to the Firebase instance:

{{< highlight javascript "hl_lines=1 5 12 16 17 18 20" >}}
import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>

    <Messages />
  </div>
);

class MessagesBase extends Component {
  ...
}

const Messages = withFirebase(MessagesBase);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
{{< /highlight >}}

The Messages component has a local state for a loading indicator and the list of messages. In the lifecycle methods of the component, you can initialize (and remove) the listeners to get messages from the Firebase database in realtime. Every time a messages changes (create, update, remove), the callback function in the listener will be triggered and you will get a snapshot of the data from Firebase.

{{< highlight javascript "hl_lines=2 3 4 5 6 7 8 9 11 12 13 14 15 16 17 18 19 21 22 23 25 26 27 28 29 30 31 32 33 34 35" >}}
class MessagesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      messages: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.messages().on('value', snapshot => {
      // convert messages list from snapshot

      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  render() {
    const { messages, loading } = this.state;

    return (
      <div>
        {loading && <div>Loading ...</div>}

        <MessageList messages={messages} />
      </div>
    );
  }
}
{{< /highlight >}}

The new MessageList and MessageItem components only render the message content:

{{< highlight javascript "hl_lines=1 2 3 4 5 6 7 9 10 11 12 13" >}}
const MessageList = ({ messages }) => (
  <ul>
    {messages.map(message => (
      <MessageItem key={message.uid} message={message} />
    ))}
  </ul>
);

const MessageItem = ({ message }) => (
  <li>
    <strong>{message.userId}</strong> {message.text}
  </li>
);
{{< /highlight >}}

If you run the application yourself, you will see the loading indicator which disappears after a few seconds when the Firebase realtime database listener was called for the first time. Every other time it would be called, the loading indicator wouldn't be shown, because it is only set to `true` when the component mounts and the first fetching of messages starts.

Now it can happen that there are no messages yet. It should be the case for you, because you didn't use the message API yet to create a message. We intend to only show messages first. In order to show conditional feedback to our users, we have to know whether the list of messages is empty (see constructor) or whether the message API didn't return any messages and the messages in the local state are changed from an empty array to null:

{{< highlight javascript "hl_lines=15 17 18 19 20 21 22 23 36 38 39 40" >}}
class MessagesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      messages: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.messages().on('value', snapshot => {
      const messageObject = snapshot.val();

      if (messageObject) {
        // convert messages list from snapshot

        this.setState({ loading: false });
      } else {
        this.setState({ messages: null, loading: false });
      }
    });
  }

  ...

  render() {
    const { messages, loading } = this.state;

    return (
      <div>
        {loading && <div>Loading ...</div>}

        {messages ? (
          <MessageList messages={messages} />
        ) : (
          <div>There are no messages ...</div>
        )}
      </div>
    );
  }
}
{{< /highlight >}}

Last, you need to convert the messages from the snapshot object to a list of items. Since Firebase comes with its own internal representation of the data, you need to transform the data as you did before for the list of users on the admin page:

{{< highlight javascript "hl_lines=11 12 13 14 17" >}}
class MessagesBase extends Component {
  ...

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.messages().on('value', snapshot => {
      const messageObject = snapshot.val();

      if (messageObject) {
        const messageList = Object.keys(messageObject).map(key => ({
          ...messageObject[key],
          uid: key,
        }));

        this.setState({
          messages: messageList,
          loading: false,
        });
      } else {
        this.setState({ messages: null, loading: false });
      }
    });
  }

  ...
}
{{< /highlight >}}

Since you have no messages yet, nothing shows up for you. Creating chat messages is our next task.

{{% chapter_header "Create an Item in a List in Firebase Realtime Database" "firebase-realtime-database-create-item-in-list" %}}

We were able to get all messages from the Firebase realtime database. It's even kept up date for us by using the Firebase listener on a reference with the `on` and not `once` method. Now let's implement a React form that enables us to create a message entity in the Firebase realtime database:

{{< highlight javascript "hl_lines=5 17 18 19 20 21 22 23 24" >}}
class MessagesBase extends Component {
  ...

  render() {
    const { text, messages, loading } = this.state;

    return (
      <div>
        {loading && <div>Loading ...</div>}

        {messages ? (
          <MessageList messages={messages} />
        ) : (
          <div>There are no messages ...</div>
        )}

        <form onSubmit={this.onCreateMessage}>
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

Next add the new initial state  for the component to keep track of the text property for a new message and its two new class methods to update the text in an input field element and to create the actual message with Firebase:

{{< highlight javascript "hl_lines=6 14 15 16 18 19 20 21 22 23 24 25 26" >}}
class MessagesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      messages: [],
    };
  }

  ...

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = event => {
    this.props.firebase.messages().push({
      text: this.state.text,
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  ...
}
{{< /highlight >}}

We can use the push method on a Firebase reference to create a new entity in this list of entities. However, don't create message just yet. One piece is missing to associate messages to users later. We will implement this missing piece first, before we create messages without it.

{{% chapter_header "Associate Entities in Firebase Realtime Database" "firebase-realtime-database-associate-items" %}}

If you look closer at the MessageItem component, you can see that a message not only has a `text`, but also a `userId` that can be used to associate the message to a user. Let's use the authenticated user from our React Context to store the user identifier into a newly created message. First, add the Consumer component and squeeze the identifier of the authenticated user into the call of the class method that creates the message:

{{< highlight javascript "hl_lines=4 18 19 29 38 39" >}}
...

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';

...

class MessagesBase extends Component {
  ...

  render() {
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>Loading ...</div>}

            {messages ? (
              <MessageList messages={messages} />
            ) : (
              <div>There are no messages ...</div>
            )}

            <form onSubmit={event => this.onCreateMessage(event, authUser)}>
              <input
                type="text"
                value={text}
                onChange={this.onChangeText}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
{{< /highlight >}}

And second, make use of the authenticated user to associate the user identifier to the message. It only makes sense to use the authenticated user, because if you are using the application and write a message, you are the authenticated user:

{{< highlight javascript "hl_lines=4 7" >}}
class MessagesBase extends Component {
  ...

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid,
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  ...
}
{{< /highlight >}}

Now go ahead and create a message. Since we only can access this page as an authenticated user due to authorization, we know that each message that is written here will be associated to a user identifier. After you have created a message, the realtime feature of the Firebase database makes sure that the message will show up in our rendered list.

So far, we have chosen to keep the footprint of a user entity within a message as little as possible. There is only an user identifier which associates the message to a user. Generally speaking it's good to structure data in your database this way, because it avoids plenty of pitfalls. For instance, let's imagine you would associate the whole user entity to a message and not only the identifier. Then every time a user entity changes in the database, you would have to change the message entity with the user as well. That's a common problem when not following the principal of the single source of truth when designing your database models. In our case, we are associating entities with each other only by their identifiers instead, whereas each entity in the database is the single source of truth without any duplications.

Another thing we decided earlier is giving the messages their dedicated API reference with `messages`. In another scenario, it could have been `users/:userId/messages` to associate users directly with the message via the reference. But doing it this way, we would have to fetch messages from multiple API endpoints in the end to show a nice chatroom as we do it right now.

{{% chapter_header "Remove an Item in a List in Firebase Realtime Database" "firebase-realtime-database-remove-item-in-list" %}}

We are reading a list of messages and created our first message. What about the other two missing functionalities to remove and edit a message. Let's continue with removing a message. Pass through a new class method that will remove a message eventually:

{{< highlight javascript "hl_lines=4 5 6 20" >}}
class MessagesBase extends Component {
  ...

  onRemoveMessage = () => {
    ...
  };

  render() {
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            ...

            {messages ? (
              <MessageList
                messages={messages}
                onRemoveMessage={this.onRemoveMessage}
              />
            ) : (
              <div>There are no messages ...</div>
            )}

            ...
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
{{< /highlight >}}

The MessageList component in between just pass the function through to the MessageItem component:

{{< highlight javascript "hl_lines=1 7" >}}
const MessageList = ({ messages, onRemoveMessage }) => (
  <ul>
    {messages.map(message => (
      <MessageItem
        key={message.uid}
        message={message}
        onRemoveMessage={onRemoveMessage}
      />
    ))}
  </ul>
);
{{< /highlight >}}

Finally it can be used in the MessageItem component. When clicking the button, we will pass the message identifier to the function. Then in our parent component that has access to Firebase we can remove the message associated with the identifier.

{{< highlight javascript "hl_lines=1 4 5 6 7 8 9" >}}
const MessageItem = ({ message, onRemoveMessage }) => (
  <li>
    <strong>{message.userId}</strong> {message.text}
    <button
      type="button"
      onClick={() => onRemoveMessage(message.uid)}
    >
      Delete
    </button>
  </li>
);
{{< /highlight >}}

Last, implement the class method that deletes the item from the list. Since we have access to the identifier of the message, we can use the reference of a single message to remove it.

{{< highlight javascript "hl_lines=4 5 6" >}}
class MessagesBase extends Component {
  ...

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
  };

  ...
}
{{< /highlight >}}

Deleting a message should work now. Another approach could have been to make the Firebase instance available to the MessageItem component and delete the message there right away. The realtime connection to the Firebase database in the Messages component would still be called to remove the message for us which keeps the displayed messages in sync. However, aggregating all the business logic at one place, in this case the Messages component, makes sense for a better maintainability and predictability of the application. Only a few components have the more complex logic whereas the other components are just there to render the content.

{{% chapter_header "Edit an Item in a List in Firebase Realtime Database" "firebase-realtime-database-edit-item-in-list" %}}

It's not normal to update a message in a chat application. We will implement this feature anyway. In the end we will give other users some feedback that a message got edited. That way, all statements made in the chat keep there integrity. Again, implement the class method first, which we will fill with implementation details later, and pass it down to the MessageList component:

{{< highlight javascript "hl_lines=4 5 6 20" >}}
class MessagesBase extends Component {
  ...

  onEditMessage = () => {
    ...
  };

  render() {
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            ...

            {messages ? (
              <MessageList
                messages={messages}
                onEditMessage={this.onEditMessage}
                onRemoveMessage={this.onRemoveMessage}
              />
            ) : (
              <div>There are no messages ...</div>
            )}

            ...
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
{{< /highlight >}}

Again the MessageList component just passes it through to the MessageItem component:

{{< highlight javascript "hl_lines=3 11" >}}
const MessageList = ({
  messages,
  onEditMessage,
  onRemoveMessage,
}) => (
  <ul>
    {messages.map(message => (
      <MessageItem
        key={message.uid}
        message={message}
        onEditMessage={onEditMessage}
        onRemoveMessage={onRemoveMessage}
      />
    ))}
  </ul>
);
{{< /highlight >}}

Editing a message involves a few more rendered elements, business logic and state in the MessageItem component. That's why we refactor it to a class component:

{{< highlight javascript "hl_lines=1 3" >}}
class MessageItem extends Component {
  ...
}
{{< /highlight >}}

Next, we keep track of the mode of the component which tells us whether we are showing the actual text of a message or editing it. In addition, if we are editing a message, we need to keep track of the value of the input field element. As initial state it receives the text of the message entity which makes sense if we only want to edit a typo in the message:

{{< highlight javascript "hl_lines=2 3 4 5 6 7 8 9" >}}
class MessageItem extends Component {
   constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
    };
  }

  ...
}
{{< /highlight >}}

Then let's implement three class methods. First, a class method for toggling the mode from edit to preview and preview to edit. If the mode is toggled, we always fill in the text of the message as value for the input field element to improve the UX when toggling the mode around:

{{< highlight javascript "hl_lines=4 5 6 7 8 9" >}}
class MessageItem extends Component {
  ...

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  ...
}
{{< /highlight >}}

Second, a class method for updating the value in the input field:

{{< highlight javascript "hl_lines=4 5 6" >}}
class MessageItem extends Component {
  ...

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  ...
}
{{< /highlight >}}

And third, a class method to submit the final value to the parent component to edit the message for real:

{{< highlight javascript "hl_lines=4 5 6 7 8" >}}
class MessageItem extends Component {
  ...

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({ editMode: false });
  };

  ...
}
{{< /highlight >}}

Later we will see why we send the whole message along the way with the edited text for the message. Next, let's implement the render method of the MessageItem component. First, we make sure that the button to delete a message is not displayed when we are in edit mode:

{{< highlight javascript "hl_lines=4 5 6 8 14 21 23" >}}
class MessageItem extends Component {
  ...

  render() {
    const { message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        <span>
          <strong>{message.userId}</strong> {message.text}
        </span>

        {!editMode && (
          <button
            type="button"
            onClick={() => onRemoveMessage(message.uid)}
          >
            Delete
          </button>
        )}
      </li>
    );
  }
}
{{< /highlight >}}

Second, implement a "Edit" and "Reset" button that is used to toggle between preview and edit mode. Depending on the edit mode, the correct button is displayed. In addition, a "Save" button is shown when we are in edit mode to save the actual edited text:

{{< highlight javascript "hl_lines=14 15 16 17 18 19 20 21" >}}
class MessageItem extends Component {
  ...

  render() {
    const { message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        <span>
          <strong>{message.userId}</strong> {message.text}
        </span>

        {editMode ? (
          <span>
            <button onClick={this.onSaveEditText}>Save</button>
            <button onClick={this.onToggleEditMode}>Reset</button>
          </span>
        ) : (
          <button onClick={this.onToggleEditMode}>Edit</button>
        )}

        ...
      </li>
    );
  }
}
{{< /highlight >}}

Last, we need the input field element to edit the text. It is only displayed when we are in edit mode. If we are not in edit mode, the actual text of the message is shown:

{{< highlight javascript "hl_lines=10 11 12 13 14 15 16 20" >}}
class MessageItem extends Component {
  ...

  render() {
    const { message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <span>
            <strong>{message.userId}</strong> {message.text}
          </span>
        )}

        ...
      </li>
    );
  }
}
{{< /highlight >}}

Now we can edit the text if we are in edit mode. But we can also reset the whole thing by using a button for it. If we save the edited text, the text and the message will be send through the MessageList component to the Messages component where the message can be identified by id to be edited with the text property. By using the spread operator, all other properties of the message entity are kept as before:

{{< highlight javascript "hl_lines=4 5 6 7 8 9" >}}
class MessagesBase extends Component {
  ...

  onEditMessage = (message, text) => {
    this.props.firebase.message(message.uid).set({
      ...message,
      text,
    });
  };

  ...
}
{{< /highlight >}}

If we would only set the new text for the message, all other properties (userId, uid) would be lost. Another thing we can add is `createdAt` and `editedAt` dates. Especially the second date helps to give users the feedback that someone has changed a message in a chat:

{{< highlight javascript "hl_lines=8 20" >}}
class MessagesBase extends Component {
  ...

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  onEditMessage = (message, text) => {
    this.props.firebase.message(message.uid).set({
      ...message,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  ...
}
{{< /highlight >}}

When using Firebase, it's best not to choose the date yourself, but let Firebase decide it depending on there internals. The server value constants from Firebase can be made available in the Firebase class:

{{< highlight javascript "hl_lines=7" >}}
class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    ...
  }

  ...
}
{{< /highlight >}}

Then in the MessageItem component, you can give users feedback whether a message was edited or not:

{{< highlight javascript "hl_lines=13" >}}
class MessageItem extends Component {
  ...

  render() {
    const { message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        {editMode ? ( ... ) : (
          <span>
            <strong>{message.userId}</strong> {message.text}
            {message.editedAt && <span>(Edited)</span>}
          </span>
        )}

        ...
      </li>
    );
  }
}
{{< /highlight >}}

As before, we could have used Firebase directly in the MessageItem component too. On the other hand, it's great to keep the MessageItem component encapsulated with its own business logic. Only the message itself and the other functions to alter the message are passed from above to the component. In the end, only the Messages component speaks to the outside world (e.g. Firebase).

Congratulations. You have implement the popular CRUD operations: create, read, update, delete. That's everything you need to manage the new message entity in your Firebase database. In addition, you have seen how to assign dates to your Firebase entities and how to listen for realtime updates when a messages has been added, edited or removed.

{{% chapter_header "Ordering with Firebase Realtime Database" "firebase-realtime-database-ordering" %}}

At the moment, the messages are retrieved in no specific order from the Firebase realtime database. By accident they could be in the order of their creation, which would be appropriate for a chat application, but let's implement this behavior more explicit. What about ordering them by the `createdAt` date property since we have introduced this earlier:

{{< highlight javascript "hl_lines=9" >}}
class MessagesBase extends Component {
  ...

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .on('value', snapshot => {
        const messageObject = snapshot.val();

        ...
      });
  }

  ...
}
{{< /highlight >}}

You only have to pass the property that should be used to retrieved the list as ordered list from the Firebase realtime database. By default Firebase is ordering the items in ascending direction. If you would want to reverse the order, you can add a `reverse()` after you have transformed the the list of messages from an object to an array.

You may see a warning regarding indexing your data in Firebase's realtime database, because we are fetching data in a specific order and Firebase uses the property `createdAt` to fetch it in a more performant way. You can index messages by the `createdAt` property to give Firebase a performance boost when fetching the messages with this ordering. Head over to your project's Firebase dashboard, open the "Database" tab and click the "Rules" tab. Then you can add the indexing of the data over there:

{{< highlight javascript >}}
{
  "rules": {
    "messages": {
      ".indexOn": ["createdAt"]
    }
  }
}
{{< /highlight >}}

The warning shouldn't show up anymore and Firebase got faster in retrieving the message by creation date for you. Every time you see the warning popping up, you can head over to your rules and index your Firebase entities. It makes your Firebase database operations faster.

{{% chapter_header "Pagination with Firebase Realtime Database" "firebase-realtime-database-pagination" %}}

Next to the ordering feature, let's paginate the list from the Firebase realtime database too. You can pass the Firebase API a limit method with an integer to specify how many items you are interested in:

{{< highlight javascript "hl_lines=10" >}}
class MessagesBase extends Component {
  ...

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(5)
      .on('value', snapshot => {
        ...
      });
  }

  ...
}
{{< /highlight >}}

Limiting the items is only half way through enabling pagination for our chat application. Let's move the limit to the local state of the component to adjust it later on via user interactions to fetch more than 5 items:

{{< highlight javascript "hl_lines=9 19" >}}
class MessagesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      messages: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        ...
      });
  }

  ...

}
{{< /highlight >}}

We will also move this functionality outside of the lifecycle method to make it reusable for other user interaction and not only to use it when the component mounts:

{{< highlight javascript "hl_lines=5 8 18" >}}
class MessagesBase extends Component {
  ...

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages() {
    this.setState({ loading: true });

    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        ...
      });
  }

  ...
}
{{< /highlight >}}

Now let's add a button to indicate that we are interested in more than 5 items:

{{< highlight javascript "hl_lines=4 5 6 7 8 9 18 19 20 21 22" >}}
class MessagesBase extends Component {
  ...

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages,
    );
  };

  render() {
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && messages && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            ...
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
{{< /highlight >}}

The button uses a new class method that increases the limit by 5 again. Afterward, by using the second argument of React's setState method, we can renew the Firebase listener with the new limit from the local state. We know that the second function in this React specific method only runs when the asynchronous state update has taken place. That's we the listener can use the correct limit from the local state then.

{{% chapter_header "Fetch Data across Relationships with Firebase and React" "firebase-realtime-database-pagination-ordering" %}}

Previously we have associated a message with a user by providing a user's identifier as property to a message. Note that this works the other way around too by providing a user a list of identifiers for messages written by this user. Anyway, since we have the association, it would be great to not only show the identifier of a user associated to the message, but the real username of this user. That's why we need to fetch the users associated to the messages from the Firebase database. Give the HomePage component access to the Firebase instance by using our higher-order component:

{{< highlight javascript "hl_lines=1 2 3 10 11 12 17" >}}
class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        <Messages />
      </div>
    );
  }
}

...

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
{{< /highlight >}}

We could also fetch the users in the Messages component that has already access to the Firebase instance, but maybe it's better to let the Messages component only care about messages. The overarching HomePage component instead can fetch the users and distribute it to all child components (Messages component) who are interested in them.

{{< highlight javascript "hl_lines=2 3 4 5 6 7 8 10 11 12 13 14 15 16 18 19 20" >}}
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.props.firebase.users().on('value', snapshot => {
      this.setState({
        users: snapshot.val(),
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  ...
}
{{< /highlight >}}

The data fetching isn't much different from the Message and AdminPage components. The only difference is that we don't care about converting the object to an array. For us it will be fine to have an object as dictionary of users accessible by user identifiers. That's how we can later retrieve users efficiently from the object by using the user identifier from the message.

{{< highlight javascript "hl_lines=10" >}}
class HomePage extends Component {
  ...

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

The association of messages and users happens before we pass the enhanced list of messages to the MessageList component. In a function within a map method we can spread all message properties to a new message object but also add the user as property. If there are users, we will use them to associate the actual user object with the message. If there are no users (yet, because they are still being fetched), we fake the user object with a user identifier as placeholder:

{{< highlight javascript "hl_lines=5 18 19 20 21 22 23" >}}
class MessagesBase extends Component {
  ...

  render() {
    const { users } = this.props;
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            ...

            {loading && <div>Loading ...</div>}

            {messages && (
              <MessageList
                messages={messages.map(message => ({
                  ...message,
                  user: users
                    ? users[message.userId]
                    : { userId: message.userId },
                }))}
                onEditMessage={this.onEditMessage}
                onRemoveMessage={this.onRemoveMessage}
              />
            )}

            {!messages && <div>There are no messages ...</div>}

            ...
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
{{< /highlight >}}

Finally display the user's username and as fallback the user identifier from the fake user object. When the users are loaded, the message has access to the whole associated user object:

{{< highlight javascript "hl_lines=13" >}}
class MessageItem extends Component {
  ...

  render() {
    const { message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        {editMode ? ( ... ) : (
          <span>
            <strong>
              {message.user.username || message.user.userId}
            </strong>
            {message.text} {message.editedAt && <span>(Edited)</span>}
          </span>
        )}

        ...
      </li>
    );
  }
}
{{< /highlight >}}

Everything you have learned in this section should make you proficient with structured and list data in Firebase's realtime database. You have learned how to get, create, update and remove entities in a Firebase realtime database. In addition, you have learned how to keep a synchronized connection to Firebase to always show the latest entities. Also we went through the scenario of associating entities with each other and how to fetch additional data across these associations. The final touch for all of this gave the pagination and ordering features which are offered by Firebase.

### Exercises:

* Read more about {{% a_blank "structuring data in Firebase" "https://firebase.google.com/docs/database/web/structure-data" %}}
* Read more about {{% a_blank "working with lists of data in Firebase" "https://firebase.google.com/docs/database/web/lists-of-data" %}}
* Read more about {{% a_blank "indexing your Firebase data" "https://firebase.google.com/docs/database/security/indexing-data" %}}
* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-react-with-firebase/react-firebase-authentication/tree/ee909897dd697e47a59cb7d38ed2b5fe9656d1bb" %}}
* Refactor
  * Move all user related components on the AdminPage to their own folder/file module
  * Move all message related components on the HomePage to their own folder/file module
  * Confirm your {{% a_blank "source code for this refactoring" "https://github.com/the-road-to-react-with-firebase/react-firebase-authentication/tree/6f66bb9f7dacc172e47018e2328a4353fbeb9dda" %}}
* Make deleting and editing a message only possible if you are the owner of the message
  * Don't render the needed elements to perform these actions
  * Don't allow it programmatically to perform these actions in the class methods
* Prevent fetching more items with the "More" button when there are no more items available