+++
title = "A complete Apollo Server with GraphQL and Express Tutorial"
description = "Learn how to build a fully working GraphQL server with Apollo Server and Express with authentication, authorization, pagination, subscription, database access ..."
date = "2018-08-22T13:50:46+02:00"
tags = ["React", "GraphQL", "Apollo", "JavaScript"]
categories = ["React", "GraphQL", "Apollo", "JavaScript"]
keywords = ["graphql apollo server", "graphql express server", "graphql apollo server tutorial", "graphql apollo server book", "apollo server example", "apollo server query", "apollo server mutation", "apollo server", "apollo server demo"]
news_keywords = ["graphql apollo server", "graphql express server", "graphql apollo server tutorial", "graphql apollo server book", "apollo server example", "apollo server query", "apollo server mutation", "apollo server", "apollo server demo"]
hashtag = "#ReactJs #GraphQL"
card = "img/posts/graphql-apollo-server-tutorial/banner_640.jpg"
banner = "img/posts/graphql-apollo-server-tutorial/banner.jpg"
contribute = "graphql-apollo-server-tutorial.md"
headline = "A complete Apollo Server with GraphQL and Express Tutorial"

summary = "Learn how to build a fully working GraphQL server with Apollo Server and Express with authentication, authorization, pagination, subscription, database access."
+++

{{% sponsorship %}}

{{% pin_it_image "graphql apollo server tutorial" "img/posts/graphql-apollo-server-tutorial/banner.jpg" "is-src-set" %}}

{{% react-graphql-book %}}

{{% read_before_3 "This tutorial is part 4 of 4 in this series." "Part 1:" "Why GraphQL: Advantages, Disadvantages & Alternatives" "https://www.robinwieruch.de/why-graphql-advantages-disadvantages-alternatives/" "Part 2:" "Why Apollo: Advantages, Disadvantages & Alternatives" "https://www.robinwieruch.de/why-apollo-advantages-disadvantages-alternatives/" "Part 3:" "The minimal Node.js with Babel Setup" "https://www.robinwieruch.de/minimal-node-js-babel-setup" %}}

Since GraphQL is only a query language, no one defines the transport layer or data format. GraphQL itself isn't opionated about it. However, most often GraphQL is used as alternative to the popular REST architecture for client-server communication over HTTP with JSON.

In the following, you are going to implement the server-side of such architecture by using GraphQL and Apollo Server. Whereas GraphQL is only the query language which got implemented as reference implementation in JavaScript by Facebook, Apollo Server builds up on top of it to simplify building GraphQL servers in JavaScript.

In the end, you will have a fully working GraphQL server boilerplate project which implements authentication, authorization, a data access layer with a database, domain specific entities such as users and messages (it could be the beginning of a chat application), different pagination strategies, and real-time abilities due to subscriptions. You can find a working solution of it (plus a working client-side application in React) in this GitHub repository: {{% a_blank "Full-stack Apollo with React and Express Boilerplate Project" "https://github.com/rwieruch/fullstack-apollo-react-express-boilerplate-project" %}}. It can be your perfect starter project to realize your own idea.

While building this application with me in the following sections, I recommend to verify your implementations with the built-in GraphQL client application (e.g. GraphQL Playground). Once you have your database setup done, you can verify your stored data over there as well. In addition, if you feel comfortable with it, you can implement a client application (in React or something else) which consumes the GraphQL API of this server. So let's get started!

{{% chapter_header "Table of Contents" "toc" %}}

* [Apollo Server Setup with Express](#apollo-server-setup-express)
* [Type Definitions](#apollo-server-type-definitions)
* [Resolvers](#apollo-server-resolvers)
* [Type Relationships](#apollo-server-type-relationship)
* [Queries and Mutations](#apollo-server-queries-mutations)
* [GraphQL Schema Stitching with Apollo Server](#apollo-server-schema-stitching)
  * [Technical Separation](#schema-stitching-technical-separation)
  * [Domain Separation](#schema-stitching-technical-separation)
* [PostgreSQL with Sequelize for a GraphQL Server](#apollo-server-postgresql-sequelize-setup)
* [Connecting Resolvers and Database](#apollo-server-resolvers-database)
* [Validation and Errors](#apollo-server-validation-errors)
* [Authentication](#apollo-server-authentication)
  * [Registration (Sign Up) with GraphQL](#graphql-registration-sign-up-authentication)
  * [Securing Passwords with Bcrypt](#graphql-token-based-authentication)
  * [Token based Authentication in GraphQL](#graphql-token-based-authentication)
  * [Login (Sign In) with GraphQL](#graphql-registration-sign-up-authentication)
* [Authorization with GraphQL and Apollo Server](#apollo-server-authorization)
  * [GraphQL Authorization on a Resolver Level](#apollo-server-authorization-resolver)
  * [Permission-based GraphQL Authorization](#apollo-server-authorization-permission)
  * [Role-based GraphQL Authorization](#apollo-server-authorization-role)
  * [Setting Headers in GraphQL Playground](#graphql-playground-headers)
* [Pagination in GraphQL with Apollo Server](#apollo-server-pagination)
  * [Offset/Limit Pagination with Apollo Server and GraphQL](#apollo-server-offset-limit-pagination)
  * [Cursor-based Pagination with Apollo Server and GraphQL](#apollo-server-cursor-based-pagination)
  * [Cursor-based Pagination: Page Info, Connections and Hashes](#cursor-based-pagination-page-info-connections-hashes)
* [GraphQL Subscriptions](#graphql-subscriptions)
  * [Apollo Server Subscription Setup](#apollo-server-subscriptions)
  * [Subscribing and Publishing with PubSub](#apollo-server-pub-sub)

{{% chapter_header "Apollo Server Setup with Express" "apollo-server-setup-express" %}}

Apollo Server can be used with several popular libraries for Node.js: Express, Koa, Hapi. Apollo itself is kept library agnostic, so it is possible to connect it with a lot of third-party libraries in client but also server applications. In this application, you will use {{% a_blank "Express" "https://expressjs.com/" %}}, because it is the most popular and commonly used middleware library for Node.js. So let's install these two dependencies to the *package.json* file and *node_modules* folder:

{{< highlight javascript >}}
npm install apollo-server apollo-server-express --save
{{< /highlight >}}

As you can see by the library names, you can use any other middleware solution (e.g. Koa, Hapi) for complementing your standalone Apollo Server. Apart from these libraries for Apollo Server, you will need the core libraries for Express and GraphQL:

{{< highlight javascript >}}
npm install express graphql --save
{{< /highlight >}}

Now every library is in place to get started with the source code in the *src/index.js* file. First, you have to import the necessary parts for getting started with Apollo Server in Express:

{{< highlight javascript >}}
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
{{< /highlight >}}

And second, you can use both imports for initializing your Apollo Server with Express:

{{< highlight javascript "hl_lines=4 5 6 7 8 9 10 11 12 13 14 15 16 17 18" >}}
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

const app = express();

const schema = ...
const resolvers = ...

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
{{< /highlight >}}

By using Apollo Server's `applyMiddleware()` method, you can opt-in any middleware (here Express). Furthermore, you can specify the path for your GraphQL API endpoint. Apart from this, you can see how the Express application gets initialized. The only thing missing is the definition for the schema and resolvers for creating the Apollo Server instance. Let's implement them first and learn about them afterward:

{{< highlight javascript "hl_lines=2 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24" >}}
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

const schema = gql`
  type Query {
    me: User
  }

  type User {
    username: String!
  }
`;

const resolvers = {
  Query: {
    me: () => {
      return {
        username: 'Robin Wieruch',
      };
    },
  },
};

...
{{< /highlight >}}

The **GraphQL schema** provided to the Apollo Server is all the available data for reading (and writing) data via GraphQL. It can happen from any client who consumes the GraphQL API. The schema consists of **type definitions**, starting with a mandatory top level **Query type** for reading data, and then followed by **fields** and **nested fields**. In the schema from the Apollo Server setup, you have defined a `me` field which is of the **object type** `User`. In this case, a User type has only a `username` field, which is a **scalar type**. There are various scalar types in the GraphQL specification for defining strings (String), booleans (Boolean), integers (Int) and more. At some point, basically the whole schema has to end at its leaf nodes with scalar types in order to resolve everything properly. Being equipped with your JavaScript knowledge, think about it as analogy to a JavaScript object, which has JavaScript objects or arrays inside, but at some point it has to have primitives such as strings, booleans or integers.

{{< highlight javascript >}}
const data = {
  me: {
    username: 'Robin Wieruch',
  },
};
{{< /highlight >}}

The counterpart of the GraphQL schema for setting up a Apollo Server are the **resolvers** which are used to return data for your fields from the schema. The data source doesn't matter, because the data can be hardcoded (as it is at this point), can come from a database, or from another (RESTful) API endpoint. You will learn about potential data sources later. For now, it only matters that the resolvers are agnostic from where the data comes from. That's why GraphQL shouldn't be mistaken for a database query language. Resolvers are only functions which resolve data for your GraphQL fields in the schema. In the previous example, only a user object with the username "Robin Wieruch" gets resolved from the `me` field.

Your GraphQL API with Apollo Server and Express should be working now. On the command line, you can always start your application with the `npm start` script for verifying that it is working for you after you have changed something. But how do you verify it without having a client application yet? Apollo Server comes with a so called GraphQL Playground as built-in client for consuming your GraphQL API. After you have started your application on the command line, you should find GraphQL Playground by using your GraphQL API endpoint in the browser. Try to open `http://localhost:8000/graphql` and see if GraphQL Playground opens for you. In the application, you can define your first GraphQL query and see the result for it:

{{< highlight javascript >}}
{
  me {
    username
  }
}
{{< /highlight >}}

The result for the query should this or your defined sample data:

{{< highlight javascript >}}
{
  "data": {
    "me": {
      "username": "Robin Wieruch"
    }
  }
}
{{< /highlight >}}

In the following sections, I might not mention all the time the GraphQL Playground, but it is up to you to verify your GraphQL API with it after you have changed something or implemented a new feature. You should always experiment it for to explore your own API.

Optionally you can also add {{% a_blank "CORS" "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" %}} to your Express middleware. First, install CORS on the command line:

{{< highlight javascript >}}
npm install cors --save
{{< /highlight >}}

And second, use it in your Express middleware:

{{< highlight javascript "hl_lines=1 7" >}}
import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

app.use(cors());

...
{{< /highlight >}}

CORS is needed when performing HTTP request from another domain than your server domain to your server. Otherwise you may run into cross-origin resource sharing errors for your GraphQL server.

### Exercises:

* read more about {{% a_blank "GraphQL" "https://graphql.org/learn" %}}
* play around with the schema and the resolver
  * add more fields to the user type
  * fulfil the requirements in the resolver
  * query your fields in the GraphQL Playground
* read more about {{% a_blank "Apollo Server Standalone" "https://www.apollographql.com/docs/apollo-server/v2/getting-started.html" %}}
* read more about {{% a_blank "Apollo Server in Express Setup" "https://www.apollographql.com/docs/apollo-server/v2/essentials/server.html" %}}

{{% chapter_header "Apollo Server: Type Definitions" "apollo-server-type-definitions" %}}

This section is all about GraphQL type definitions and how they are used to define the overall GraphQL schema. A GraphQL schema is defined by its types, the relationships between the types, and their structure. Therefore GraphQL uses a **Schema Definition Language (SDL)**. However, the schema doesn't define where the data comes from. This responsibility is outside of the SDL and as you have witnessed is performed by resolvers. When you have used Apollo Server previously, you have used a User object type within the schema and defined a resolver which returned a user for the corresponding `me` field.

In the previous implementation, perhaps you have noticed the exclamation point for the `username` field in the User object type. It means that the `username` is a **non-nullable** field. So whenever a field of type User with a `username` is returned from the GraphQL schema, the user has to have a `username`. It cannot be undefined or null. However, there isn't an exclamation point for the User type on the `me` field. Does it mean that the result of the `me` field can be null? And indeed, that's the case for this particular scenario. There shouldn't be always a user returned for the `me` field, because after all, a server has to know *who is me* before it can give any response. Later you will implement an authentication mechanism (sign up, sign in, sign out) with your GraphQL server. Only when a user (most likely you) is authenticated with the server, the `me` field is populated with a user object (maybe your account details). Otherwise it stays null.

As you can see, while you define your GraphQL type definitions, you have to make conscious decisions about the types, their relationships, their structure and their (non-null) fields. Now let's extend the schema by extending or adding more type definitions to it. What about querying any user with a GraphQL client?

{{< highlight javascript "hl_lines=4" >}}
const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
  }

  type User {
    username: String!
  }
`;
{{< /highlight >}}

That's when **GraphQL arguments** come into play. They can be used to make more fine-grained queries, because you can provide them to the GraphQL query. See how the arguments can be used on a per field level by using parentheses. And also for the arguments you have to define the type. In this case, it is a non-nullable identifier to retrieve the correct user from a data source eventually. Furthermore, the query returns the User type, but it can be null, because sometimes a user entity might not be found in the data source when providing a non identifiable `id` for it. Now you can see how two queries already share the same GraphQL type and thus when adding fields to the User type, a client can use these fields for both queries when querying an implicit User object type.

There is already one more field which could be added to the User type. It is the `id` field, because after all a user should have an `id` when it is already possible to query a user by its `id`.

{{< highlight javascript "hl_lines=8" >}}
const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
  }

  type User {
    id: ID!
    username: String!
  }
`;
{{< /highlight >}}

You may be wondering about the ID scalar type at this point. The ID denotes an identifier which can be used internally for advanced features such as caching or refetching later on. It is a superior string scalar type.

So what's missing for the new GraphQL query is the resolver. In the first step, you can add it to your map of resolvers with sample data again:

{{< highlight javascript "hl_lines=8 9 10 11 12" >}}
const resolvers = {
  Query: {
    me: () => {
      return {
        username: 'Robin Wieruch',
      };
    },
    user: () => {
      return {
        username: 'Dave Davids',
      };
    },
  },
};
{{< /highlight >}}

Second, you may want to make use of the incoming `id` argument from the GraphQL query to make your decision of which user you are going to return. All the arguments can be found in the second argument in the resolver function's signature:

{{< highlight javascript "hl_lines=8" >}}
const resolvers = {
  Query: {
    me: () => {
      return {
        username: 'Robin Wieruch',
      };
    },
    user: (parent, args) => {
      return {
        username: 'Dave Davids',
      };
    },
  },
};
{{< /highlight >}}

You may have noticed the first argument called `parent` as well. For now, you don't need to worry about it. Later, it will be showcased where it could be used potentially in your resolvers. Now, to make the example more realistic, you can extract a map of sample users and return a user based on the `id` which is used as a key in the extracted map:

{{< highlight javascript "hl_lines=1 2 3 4 5 6 7 8 9 10 12 16 17 20" >}}
let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

const me = users[1];

const resolvers = {
  Query: {
    user: (parent, { id }) => {
      return users[id];
    },
    me: () => {
      return me;
    },
  },
};
{{< /highlight >}}

Now try out your queries, even when using only this combined GraphQL query, in GraphQL Playground:

{{< highlight javascript >}}
{
  user(id: "2") {
    username
  }
  me {
    username
  }
}
{{< /highlight >}}

It should return this result:

{{< highlight javascript >}}
{
  "data": {
    "user": {
      "username": "Dave Davids"
    },
    "me": {
      "username": "Robin Wieruch"
    }
  }
}
{{< /highlight >}}

Last but not least, what about querying a list of users? It would be your third query. First, you would only need to add the query again to the schema:

{{< highlight javascript "hl_lines=3" >}}
const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  type User {
    id: ID!
    username: String!
  }
`;
{{< /highlight >}}

In this case, the `users` field would return a list of users of type User which is denoted with the square brackets. Within the list no user is allowed to be null, but the list itself can be null in case there are no users in the first place (otherwise it could be also `[User!]!`). Once you add a new query to your schema, you are obligated to define it in your resolvers within the Query object:

{{< highlight javascript "hl_lines=3 4 5" >}}
const resolvers = {
  Query: {
    users: () => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    },
    me: () => {
      return me;
    },
  },
};
{{< /highlight >}}

Now you have already three queries which can be used in your GraphQL client (e.g. GraphQL Playground) applications. All of them operate on the same User type to fulfil the data requirements in the resolvers. Thus each query has to have a matching resolver. Did you notice that all queries are grouped under your one unique yet mandatory Query type? Basically the Query type lists all your available GraphQL queries which are exposed to your clients as your GraphQL API for reading data. In a later section, you will read about the Mutation type for grouping your GraphQL API for writing data.

### Exercises:

* read more about {{% a_blank "the GraphQL schema with Apollo Server" "https://www.apollographql.com/docs/apollo-server/v2/essentials/schema.html" %}}
* read more about {{% a_blank "the GraphQL mindset: Thinking in Graphs" "https://graphql.github.io/learn/thinking-in-graphs/" %}}

{{% chapter_header "Apollo Server: Resolvers" "apollo-server-resolvers" %}}

This section continuous with the GraphQL schema in Apollo Server, but transitions more to the resolver side of the subject. In your GraphQL type definitions you have defined types, their relations and their structure. But there is nothing about how to get the data. That's where the GraphQL resolvers come into play.

In JavaScript, the resolvers are grouped in a JavaScript object which is often called **resolver map**. As you have noticed, each top level query in your Query type has to have a resolver. But that's not everything to it. Let's see how you can resolve things on a per field level.

{{< highlight javascript "hl_lines=14 15 16" >}}
const resolvers = {
  Query: {
    users: () => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    },
    me: () => {
      return me;
    },
  },

  User: {
    username: () => 'Hans',
  },
};
{{< /highlight >}}

Once you start your application again and query for a list of users, every user should have the identical username.

{{< highlight javascript >}}
// query
{
  users {
    username
    id
  }
}

// query result
{
  "data": {
    "users": [
      {
        "username": "Hans",
        "id": "1"
      },
      {
        "username": "Hans",
        "id": "2"
      }
    ]
  }
}
{{< /highlight >}}

The GraphQL resolvers can operate fine-granular on a per field level. As you have noticed, you can override the username of every User type by resolving a `username` field. Otherwise the default `username` property of the user entity is taken for it. Generally this applies to every field. Either you decide specifically what the field should return in a resolver function or GraphQL tries to fallback for the field by retrieving the property automatically from the JavaScript entity.

Let's evolve this a bit more by diving into the function signature of resolver functions. Previously you have seen that the second argument of the resolver function is the incoming arguments of a query. That's how you were able to retrieve the `id` argument for the user from the Query. What about the first argument though? It's called the parent or root argument and always returns the previously resolved field. Let's check this for the new username resolver function.

{{< highlight javascript "hl_lines=15 16 17" >}}
const resolvers = {
  Query: {
    users: () => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    },
    me: () => {
      return me;
    },
  },

  User: {
    username: parent => {
      return parent.username;
    }
  },
};
{{< /highlight >}}

When you query again your list of users in a running application, all usernames should be alright again. That's because GraphQL firstly resolves all users in the `users` resolver and then goes through the User's `username` resolver for each user. Each user is accessible as the first argument in the resolver function and thus can be used to access further properties on the entity. You can rename your parent argument to make it more explicit:

{{< highlight javascript "hl_lines=7 8" >}}
const resolvers = {
  Query: {
    ...
  },

  User: {
    username: user => {
      return user.username;
    }
  },
};
{{< /highlight >}}

In this case, the `username` resolver function is redundant, because it only mimics the default behavior of a GraphQL resolver. If you would leave it out, the user's username would still be resolved with its correct property. However, this fine-grained control over the resolved fields opens up powerful possibilities. It gives you the flexibility to add your own data mapping without worrying about your data sources behind the GraphQL layer. For instance, what about exposing the full username of a user which is only a combination of its first and last name by using template literals?

{{< highlight javascript "hl_lines=5" >}}
const resolvers = {
  ...

  User: {
    username: user => `${user.firstname} ${user.lastname}`,
  },
};
{{< /highlight >}}

For now, we are going to leave out the `username` resolver, because it mimics only the default behavior when using Apollo Server. These are called **default resolvers**, because they work for you under the hood without you having to define them explicitly.

Next, what about the other arguments in the function signature of a GraphQL resolver?

{{< highlight javascript >}}
(parent, args, context, info) => { ... }
{{< /highlight >}}

The context argument is the third argument in the resolver function which is used to inject dependencies from the outside to the resolver function. For instance, let's say the signed in user is known to the outside world of your GraphQL layer (because a request to your GraphQL server is made and the authenticated user is retrieved from somewhere else). You may would want to inject this signed in user to your resolvers to do something with it. Let's do it with the `me` user for the `me` field. Remove the declaration of the `me` user (`let me = ...`) and pass it instead in the context object when Apollo Server gets initialized:

{{< highlight javascript "hl_lines=4 5 6" >}}
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
  },
});
{{< /highlight >}}

Next you can access it in the resolver's function signature as third argument which gets destructured into the `me` property from the context object.

{{< highlight javascript "hl_lines=9 10 11" >}}
const resolvers = {
  Query: {
    users: () => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    },
    me: (parent, args, { me }) => {
      return me;
    },
  },
};
{{< /highlight >}}

The context should be the same for all resolvers now. Every resolver who needs to access the context, or in this case the `me` user, can do so by using the third argument of the resolver function.

The fourth argument in a resolver function, the info argument, isn't used very often, because it only gives you internal information about the GraphQL request. It can be used for debugging, error handling, and advanced monitoring and tracking. You don't need to worry about it for now.

On the side, a couple of words about the a resolver's return values: As you have witnessed, a resolver can return arrays, objects and scalar types, but it has to be defined in the matching type definitions too. For instance, the type definition has to define an array or non-nullable field in order to have the resolvers working appropriately. What about JavaScript promises? Often you will make a request to a data source (database, RESTful API) in a resolver and thus return a JavaScript promise in the resolver. GraphQL can deal with it and waits for the promise being resolved. Only then the result is mapped to the type definitions. That's why you don't need to worry about asynchronous requests to your data source later on.

### Exercises:

* read more about {{% a_blank "GraphQL resolvers in Apollo" "https://www.apollographql.com/docs/apollo-server/v2/essentials/data.html" %}}

{{% chapter_header "Apollo Server: Type Relationships" "apollo-server-type-relationship" %}}

In the previous sections, you have started to evolve your GraphQL schema by defining queries, mutations, and type definitions. In this section, let's add a second GraphQL type called Message and see how it behaves in addition to your User type. In this application, a user can have messages. Basically you would be able to write a simple chat application with both types. First, add two new top level queries and the new Message type to your GraphQL schema:

{{< highlight javascript "hl_lines=7 8 16 17 18 19" >}}
const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type User {
    id: ID!
    username: String!
  }

  type Message {
    id: ID!
    text: String!
  }
`;
{{< /highlight >}}

And second, you have to add two resolvers for Apollo Server to match the two new top level queries:

{{< highlight javascript "hl_lines=1 2 3 4 5 6 7 8 9 10 23 24 25 26 27 28" >}}
let messages = {
  1: {
    id: '1',
    text: 'Hello World',
  },
  2: {
    id: '2',
    text: 'By World',
  },
};

const resolvers = {
  Query: {
    users: () => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    },
    me: (parent, args, { me }) => {
      return me;
    },
    messages: () => {
      return Object.values(messages);
    },
    message: (parent, { id }) => {
      return messages[id];
    },
  },
};
{{< /highlight >}}

Once you run your application again, your new GraphQL queries should work in GraphQL playground. They are pretty similar to your previous user queries and thus it doesn't add any excitement to your code. But what about adding relationships to both GraphQL types now? Historically, coming from the REST world, it was common to add an identifier to each entity in order to resolve its relationship later on.

{{< highlight javascript "hl_lines=19" >}}
const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type User {
    id: ID!
    username: String!
  }

  type Message {
    id: ID!
    text: String!
    userId: ID!
  }
`;
{{< /highlight >}}

However, now you are using GraphQL and you can make use of it. Instead of using an identifier and resolving the entities later with multiple waterfall requests, what about using the user entity within the message entity directly? Let's try it:

{{< highlight javascript "hl_lines=7" >}}
const schema = gql`
  ...

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;
{{< /highlight >}}

Since a message doesn't have a user entity in your model (here sample data), the default resolver doesn't work. You need to set up an explicit resolver for it.

{{< highlight javascript "hl_lines=20 21 22 23 24" >}}
const resolvers = {
  Query: {
    users: () => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    },
    me: (parent, args, { me }) => {
      return me;
    },
    messages: () => {
      return Object.values(messages);
    },
    message: (parent, { id }) => {
      return messages[id];
    },
  },

  Message: {
    user: () => {
      return me;
    },
  },
};
{{< /highlight >}}

In this case, every message is simply written by the authenticated user (here the `me` user). If you query the following about messages, you will get this result:

{{< highlight javascript >}}
// query
{
  message(id: "1") {
    id
    text
    user {
      id
      username
    }
  }
}

// query result
{
  "data": {
    "message": {
      "id": "1",
      "text": "Hello World",
      "user": {
        "id": "1",
        "username": "Robin Wieruch"
      }
    }
  }
}
{{< /highlight >}}

Let's mimic the behavior more like in a real world application. Your sample data has to have some kind of keys to reference entities to each other. Thus a message, in your database for instance, could have a `userId` property.

{{< highlight javascript "hl_lines=5 10" >}}
let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};
{{< /highlight >}}

Now, the parent argument in your resolver function can be used to get a message's `userId` which then can be used to retrieve the appropriate user.

{{< highlight javascript "hl_lines=5 6" >}}
const resolvers = {
  ...

  Message: {
    user: message => {
      return users[message.userId];
    },
  },
};
{{< /highlight >}}

Now every message has its own dedicated user. The last steps were crucial for understanding GraphQL. Even though you have default resolver functions or this fine-grained control over the fields by defining your own resolver functions, it is up to you to retrieve the data from a data source (here sample data, but later maybe a database). The developer has to make sure that every field can be resolved. GraphQL enables you in the end to group those fields into one GraphQL query regardless of the data source.

Let's recap this implementation detail again with another relationship: a user has messages. In this case, the relationships goes in the other direction.

{{< highlight javascript "hl_lines=5 10" >}}
let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
    messageIds: [1],
  },
  2: {
    id: '2',
    username: 'Dave Davids',
    messageIds: [2],
  },
};
{{< /highlight >}}

This sample data could come from any of your data sources. The important part is that it has a key(s) which defines a relationship to another entity. All of this is independent from GraphQL, so let's define this relationship from users to their messages in GraphQL.

{{< highlight javascript "hl_lines=14" >}}
const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;
{{< /highlight >}}

Since a user entity hasn't messages but message identifiers instead, you can write again a custom resolver for it. In this case, the resolver retrieves all messages from the user from the list of sample messages.

{{< highlight javascript "hl_lines=4 5 6 7 8 9 10" >}}
const resolvers = {
  ...

  User: {
    messages: user => {
      return Object.values(messages).filter(
        message => message.userId === user.id,
      );
    },
  },

  Message: {
    user: message => {
      return users[message.userId];
    },
  },
};
{{< /highlight >}}

This section has shown you how to expose relationships in your GraphQL schema. But GraphQL doesn't apply any magic for you. If the default resolvers don't work for you, you have to define your own custom resolvers on a per field level for resolving the data from different data sources.

### Exercises:

* query a list of users with their messages
* query a list of messages their user
* read more about {{% a_blank "the GraphQL schema" "https://graphql.github.io/learn/schema/" %}}

{{% chapter_header "Apollo Server: Queries and Mutations" "apollo-server-queries-mutations" %}}

So far, you have only defined queries in your GraphQL schema by using two related GraphQL types for reading data. These should work for you in GraphQL Playground, because you have given them equivalent resolvers. So what about GraphQL mutations for writing data? In the following, you will create two mutations: create and delete a message. Let's start with creating a message as the currently signed in user (the `me` user).

{{< highlight javascript "hl_lines=11 12 13" >}}
const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type Mutation {
    createMessage(text: String!): Message!
  }

  ...
`;
{{< /highlight >}}

As you can see, apart from the Query type there exists also a Mutation (and Subscription) type. There you can group all your GraphQL operations for writing data instead of reading data. In this case, the `createMessage` mutation accepts a non-nullable `text` input as argument and returns the created message. Again, you have to implement the resolver as counterpart for the mutation the same as you have done it with the queries before. It happens in the mutation part of the resolver map:

{{< highlight javascript "hl_lines=6 7 8 9 10 11 12 13 14 15" >}}
const resolvers = {
  Query: {
    ...
  },

  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const message = {
        text,
        userId: me.id,
      };

      return message;
    },
  },

  ...
};
{{< /highlight >}}

The mutation's resolver has access to the text in its arguments (second argument). Furthermore, it has access to the currently signed in user in the context argument (third argument) which can be used to associate the created message with the user. The parent argument isn't used. The one thing missing for making the message complete is an identifier. For making sure that a unique identifier is used, you can install this neat library on the command line:

{{< highlight javascript >}}
npm install uuid --save
{{< /highlight >}}

And import it to your file:

{{< highlight javascript >}}
import uuidv4 from 'uuid/v4';
{{< /highlight >}}

Now you can give your message a unique identifier:

{{< highlight javascript "hl_lines=8 10" >}}
const resolvers = {
  Query: {
    ...
  },

  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };

      return message;
    },
  },

  ...
};
{{< /highlight >}}

So far, the mutation is only creating a message object and returns it to the API. However, most mutations have side-effects, because they are writing data to your data source or they do something else. Most often it will be a write operation to your database, but in this case, you only need to update your `users` and `messages` variables: The list of available messages needs to be updated and the user's reference list of `messageIds` needs to have the new message `id` as well.

{{< highlight javascript "hl_lines=15 16" >}}
const resolvers = {
  Query: {
    ...
  },

  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };

      messages[id] = message;
      users[me.id].messageIds.push(id);

      return message;
    },
  },

  ...
};
{{< /highlight >}}

The last part you have added would be essentially your writing operation to a data source (e.g. database). In this case, you have only updated the sample data.

That's it for the first mutation. You can try it right now in GraphQL Playground. Next, you are going to implement the mutation for deleting a message.

{{< highlight javascript "hl_lines=13" >}}
const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  ...
`;
{{< /highlight >}}

The mutation returns you only a boolean which denotes whether the deletion was successful or not. Apart from this, the mutation takes an identifier as input for identifying the message. The counterpart of the GraphQL schema implementation is a resolver:

{{< highlight javascript "hl_lines=9 10 11 12 13 14 15 16 17 18 19" >}}
const resolvers = {
  Query: {
    ...
  },

  Mutation: {
    ...

    deleteMessage: (parent, { id }) => {
      const { [id]: message, ...otherMessages } = messages;

      if (!message) {
        return false;
      }

      messages = otherMessages;

      return true;
    },
  },

  ...
};
{{< /highlight >}}

The resolver finds the message by id from the object of messages by using a destructuring. If there is no message, the resolver returns false. If there is a message, the remaining messages without the deleted message are the updated version of the messages object. Then the resolver returns true. Otherwise, if no message is found, the resolver returns false. Basically that's it for implementing mutations in GraphQL and Apollo Server. It isn't much different from GraphQL queries except for the side-effect of writing data.

There is only one GraphQL operation missing for making the messages features complete. Whereas it is possible to read message(s), create a message and delete a message, the only piece missing is updating a message. This GraphQL mutation isn't important for the next sections, but you can try to implement it yourself as exercise.

### Exercises:

* create a message in GraphQL Playground with a mutation
  * afterward, query all messages
  * afterward, query the `me` user with messages
* delete a message in GraphQL Playground with a mutation
  * afterward, query all messages
  * afterward, query the me user with messages
* implement a `updateMessage` mutation for completing all CRUD operations for a message in GraphQL
* read more about {{% a_blank "GraphQL queries and mutations" "https://graphql.github.io/learn/queries/" %}}

{{% chapter_header "GraphQL Schema Stitching with Apollo Server" "apollo-server-schema-stitching" %}}

Schema stitching is a powerful feature in GraphQL. Basically it's all about merging multiple GraphQL schemas into one schema which may be consumed in your GraphQL client application. As for now, you only have one schema in your application. So what's the motivation behind multiple schemas and schema stitching? For instance, take a GraphQL schema in one project which you may want to modularize based on domains (e.g. user, message). There you may end up with two schemas whereas each schema matches one type (e.g. User type, Message type). Now you would want to merge both GraphQL schemas for making the entire GraphQL schema accessible with your GraphQL server's API. That's one of the basic motivations behind schema stitching.

But you can take this one step further: You may end up with microservices or third-party platforms which expose their dedicated GraphQL APIs which then can be used for merging them into one GraphQL schema with schema stitching as single source of truth. Then again a client can consume the entire schema which is composed out of multiple domain-driven microservices.

In our case, let's start with a separation by technical concerns for the GraphQL schema and resolvers. Afterward, you will apply the separation by domains which are in this case users and messages.

{{% sub_chapter_header "Technical Separation" "schema-stitching-technical-separation" %}}

Let's take the GraphQL schema from the application where you have a User type and Message type. In the same step, you want to split out the resolvers to their dedicated place as well. In the end, the *src/index.js* file, where the schema and resolvers are needed for the Apollo Server instantiation, should only import both things. It becomes three things when outsourcing the data, in this case the sample data (now called models), too.

{{< highlight javascript "hl_lines=3 5 6 7 17 18" >}}
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models from './models';

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
{{< /highlight >}}

As improvement, the models are passed to the resolver function's as context. The models are your data access layer. It can be sample data (which is the case), a database, or a third-party API. It's always good to pass those things in from the outside for keeping the resolver functions pure. Then you don't need to import the models in each resolver file. So now in this case, the models are the sample data and moved to the *src/models/index.js* file:

{{< highlight javascript >}}
let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
    messageIds: [1],
  },
  2: {
    id: '2',
    username: 'Dave Davids',
    messageIds: [2],
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

export default {
  users,
  messages,
};
{{< /highlight >}}

Since you have passed the models to your Apollo Server context, they are accessible in each resolver. In the next step, let's move the resolvers to the *src/resolvers/index.js* file. In the same step, adjust the resolver's function signature by adding the models when they are needed to read/write users or messages.

{{< highlight javascript "hl_lines=5 6 8 9 14 15 17 18 23 31 32 37 38 44 51 52 59 60" >}}
import uuidv4 from 'uuid/v4';

export default {
  Query: {
    users: (parent, args, { models }) => {
      return Object.values(models.users);
    },
    user: (parent, { id }, { models }) => {
      return models.users[id];
    },
    me: (parent, args, { me }) => {
      return me;
    },
    messages: (parent, args, { models }) => {
      return Object.values(models.messages);
    },
    message: (parent, { id }, { models }) => {
      return models.messages[id];
    },
  },

  Mutation: {
    createMessage: (parent, { text }, { me, models }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };

      models.messages[id] = message;
      models.users[me.id].messageIds.push(id);

      return message;
    },

    deleteMessage: (parent, { id }, { models }) => {
      const { [id]: message, ...otherMessages } = models.messages;

      if (!message) {
        return false;
      }

      models.messages = otherMessages;

      return true;
    },
  },

  User: {
    messages: (user, args, { models }) => {
      return Object.values(models.messages).filter(
        message => message.userId === user.id,
      );
    },
  },

  Message: {
    user: (message, args, { models }) => {
      return models.users[message.userId];
    },
  },
};
{{< /highlight >}}

The resolvers receive all sample data as models in the context argument rather than operating directly on the sample data as before. As mentioned, it keeps the resolver functions pure. Later on, you will have an easier time to test your resolver functions in isolation too. Last but not least, move your schema's type definitions in the *src/schema/index.js* file:

{{< highlight javascript >}}
import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;
{{< /highlight >}}

Even though your application should work again and the technical separation is complete, the separation by domains, where schema stitching is needed, isn't done yet. So far, you have only outsourced the schema, resolvers and data (models) from your Apollo Server instantiation file. Everything is separated by technical concerns now. Furthermore, you made the small improvement for passing the models through the context rather than importing them in resolver file(s).

{{% sub_chapter_header "Domain Separation" "schema-stitching-technical-separation" %}}

In the next step, you are going to modularize the GraphQL schema by domains (user and message). First, split out the user related entity in its own schema definition file called *src/schema/user.js*:

{{< highlight javascript "hl_lines=4" >}}
import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }
`;
{{< /highlight >}}

The same applies for the message schema definition in *src/schema/message.js*:

{{< highlight javascript "hl_lines=4 9" >}}
import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    messages: [Message!]!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;
{{< /highlight >}}

Notice how each file only describes its own entity with a type and its relations. A relation can be a type from a different file (e.g. a Message type still has the relation to a User type even though the User type is defined somewhere else). Furthermore, note the `extend` statement on the Query and Mutation types. Since you have more than one of those types now, you need to extend the types. Finally you have to define shared base types for them in the *src/schema/index.js*:

{{< highlight javascript >}}
import { gql } from 'apollo-server-express';

import userSchema from './user';
import messageSchema from './message';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, messageSchema];
{{< /highlight >}}

In this file, both schemas are merged together with the help of a utility `linkSchema`. The `linkSchema` defines all types which are shared within the schemas. It already defines a Subscription type for GraphQL subscriptions which may be implemented later on. As a workaround, there is an empty underscore field with a Boolean type in the merging utility schema, because there is no official way of doing this merging of schemas yet. Basically the utility schema only defines the shared base types which are extended with the `extend` statement in the other domain specific schemas.

Once you run the application again, it should work again, but this time with a stitched schema instead of one global schema. What's missing are the domain separated resolver maps. Let's start with the user domain again in the *src/resolvers/user.js*:

{{< highlight javascript >}}
export default {
  Query: {
    users: (parent, args, { models }) => {
      ...
    },
    user: (parent, { id }, { models }) => {
      ...
    },
    me: (parent, args, { me }) => {
      ...
    },
  },

  User: {
    messages: (user, args, { models }) => {
      ...
    },
  },
};
{{< /highlight >}}

Followed by the message resolvers in the *src/resolvers/message.js* file:

{{< highlight javascript >}}
import uuidv4 from 'uuid/v4';

export default {
  Query: {
    messages: (parent, args, { models }) => {
      ...
    },
    message: (parent, { id }, { models }) => {
      ...
    },
  },

  Mutation: {
    createMessage: (parent, { text }, { me, models }) => {
      ...
    },

    deleteMessage: (parent, { id }, { models }) => {
      ...
    },
  },

  Message: {
    user: (message, args, { models }) => {
      ...
    },
  },
};
{{< /highlight >}}

Since the Apollo Server accepts a list of resolver maps too, you can import all of your resolver maps in your *src/resolver/index.js* file and export them as a list of resolver maps again:

{{< highlight javascript >}}
import userResolvers from '../resolvers/user';
import messageResolvers from '../resolvers/message';

export default [userResolvers, messageResolvers];
{{< /highlight >}}

Then the Apollo Server can take the resolver list to be instantiated. Start your application again and verify that everything is working for you.

In the last section, you have extracted schema and resolvers from your main file and separated both by domains. Moreover the sample data is placed in a *src/models* folder where it can be easily migrated to a database driven approach in the future. Your folder structure should look similar to this one now:

{{< highlight javascript >}}
* src/
  * models/
    * index.js
  * resolvers/
    * index.js
    * user.js
    * message.js
  * schema/
    * index.js
    * user.js
    * message.js
  * index.js
{{< /highlight >}}

It's a great starting point for a GraphQL server application with Node.js. Basically from here on you could develop your own application on top of it, because the last implementations gave you a universally usable GraphQL boilerplate project. However, if you are curious connecting your GraphQL server to a database, doing authentication and authorization, and implementing powerful features such as pagination in GraphQL, stay with me on this journey.

### Exercises:

* read more about {{% a_blank "schema stitching with Apollo Server" "https://www.apollographql.com/docs/graphql-tools/schema-stitching.html" %}}
* schema stitching is only a part of **schema delegation**
  * read more about {{% a_blank "schema delegation" "https://www.apollographql.com/docs/graphql-tools/schema-delegation.html" %}}
  * get familiar with the motivation behind **remote schemas** and **schema transforms**

{{% chapter_header "PostgreSQL with Sequelize for a GraphQL Server" "apollo-server-postgresql-sequelize-setup" %}}

In order to end up with a full-stack GraphQL application eventually, you need to introduce a sophisticated data source at some point. Whereas the sample data from before is only fluctuant data, a database can give you persistent data. In this section, you are going to set up PostgreSQL with Sequelize ({{% a_blank "ORM" "https://en.wikipedia.org/wiki/Object-relational_mapping" %}}) for Apollo Server. {{% a_blank "PostgreSQL" "https://www.postgresql.org/" %}} is a SQL database whereas an alternative would be the popular NoSQL database called {{% a_blank "MongoDB" "https://www.mongodb.com/" %}} (with Mongoose as ORM). The choice of tech is always opinionated. You could choose MongoDB or any other SQL/NoSQL solution over PostgreSQL, but for the sake of this application, let's stick to PostgreSQL.

Before you can use PostgreSQL in your application, you need to install it for your machine first. If you haven't installed it, head over to this [setup guide](https://www.robinwieruch.de/postgres-express-setup-tutorial/) for installing it, setting up your first database, creating an administrative database user, and learning about the essential commands. These are the things you should have accomplished after going through the instructions:

* having running installation of PostgreSQL
* having a database super user with username and password
* having a database for this application which you have created with `createdb` or `CREATE DATABASE`

Furthermore, you should be able to run and stop your database with the following commands:

* pg_ctl -D /usr/local/var/postgres start
* pg_ctl -D /usr/local/var/postgres stop

Last but not least, when using the `psql` command on the command line, you should be able to connect to your database on a command line level. There you can list all your databases or execute SQL statements against your database. You should find a couple of these operations in the PostgreSQL setup guide, but also this section will show some of them. However, in the following sections, you should perform these on your own the same way as you are doing GraphQL operations with GraphQL Playground. The `psql` command line interface and GraphQL Playground are your perfect tools for trying your application manually.

What's needed for your GraphQL server once you have installed PostgreSQL on your local machine? First, you need to install {{% a_blank "PostgreSQL for Node.js" "https://github.com/brianc/node-postgres" %}} and {{% a_blank "Sequelize (ORM)" "https://github.com/sequelize/sequelize" %}} for your project. Whereas you don't necessarily need to look into the PostgreSQL for Node.js documentation, I highly recommend to have the Sequelize documentation open on the side for your project. You might find yourself always looking up certain things when connecting your GraphQL layer (resolvers) with your data access layer (Sequelize) in the following implementations for this applications.

{{< highlight javascript >}}
npm install pg sequelize --save
{{< /highlight >}}

Now you can create your models for your the user and message domains. Models are usually your data access layer in applications. In this case, you are going to setup your models with Sequelize in order to make read and write operations to your PostgreSQL database. Afterward, the models can be used in your GraphQL resolvers by passing them through the context object to each resolver. Now, the essential steps we are doing together are:

* creating a model for the user domain
* creating a model for the message domain
* connecting the application to a database
  * providing super user's username and password
  * combining models for database usage
* synchronizing the database once application starts

First, implement the *src/models/user.js* model:

{{< highlight javascript >}}
const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
    },
  });

  User.associate = models => {
    User.hasMany(models.Message);
  };

  return User;
};

export default user;
{{< /highlight >}}

Second, implement the *src/models/message.js* model:

{{< highlight javascript >}}
const message = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    text: {
      type: DataTypes.STRING,
    },
  });

  Message.associate = models => {
    Message.belongsTo(models.User);
  };

  return Message;
};

export default message;
{{< /highlight >}}

Basically both models define the shapes of their entities. For instance, the message model has a database column with the name text of type string. You can add multiple database columns horizontally to your model. In the end, all columns of a model make up a table row in the database and each row reflect a database entry (e.g. message, user). The database table name is defined a first argument in the Sequelize model definition. The message domain has the table "message". Furthermore, you can define relationships between entities with Sequelize by using associations. In this case, a message entity belongs to one user and a user has many messages. That's everything you need for setting up a minimal database with two domains. However, since this is mostly about GraphQL on the server-side and not too much about databases, you should read up more database subjects on your own to fully grasp the topic.

Next, you need to connect to your database from within your application in the *src/models/index.js* file. Essentially everything that is needed are the database name, a database super user and the user's password. You may also want to define a database dialect, because Sequelize supports other databases too.

{{< highlight javascript >}}
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

export { sequelize };
{{< /highlight >}}

In the same file, you can physically associate all your models with each other for exposing them afterward to your application as data access layer (models) to your database.

{{< highlight javascript "hl_lines=12 13 14 15 17 18 19 20 21 25" >}}
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
{{< /highlight >}}

As you can see, the database credentials (database name, database super user name, database super user password) can be stored as environment variables. In your *.env* file, simply add those credentials as key value pairs. For instance, my defaults for local development are the following:

{{< highlight javascript >}}
DATABASE=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
{{< /highlight >}}

You should have set up everything for the environment variables in the very beginning of implementing this application. Otherwise, you can also leave the credentials in the source code for now.

Last but not least, the database needs to be migrated/synchronized once your Node.js application starts. You can do it the following way in your *src/index.js* file:

{{< highlight javascript "hl_lines=6 10 14" >}}
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';

...

sequelize.sync().then(async () => {
  app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
});
{{< /highlight >}}

That's it for the database setup for your GraphQL server. In the next steps, you are going to replace the business logic in your resolvers, because there Sequelize is used to access the database instead of using sample data from before. As for now, the application should not work, because the resolvers don't use the new data access layer.

### Exercises:

* get comfortable with databases
  * try the `psql` command line interface for accessing your database
  * check the Sequelize API by reading through their documentation
  * read up database jargon which is unknown to you but mentioned here

{{% chapter_header "Connecting Resolvers and Database" "apollo-server-resolvers-database" %}}

In the previous section, you have done everything getting your PostgreSQL database up and running and connecting it to your GraphQL server on startup. Now, instead of using the old sample data, you are going to use your new data access layer (models) in your GraphQL resolvers for reading and writing data from/to your database. You are going to implement the following things in this section:

* use the new models in your GraphQL resolvers
* seed your database with data when your application starts
* add a user model method for retrieving a user by username
* learn the essentials about `psql` for the command line

Let's start by refactoring your GraphQL resolvers. You already have passed the models via Apollo Server's context object to each GraphQL resolver. Whereas you have used sample data before, you have to use the Sequelize API now. In the *src/resolvers/user.js* file, change the following lines of code for using the Sequelize API:

{{< highlight javascript "hl_lines=3 4 6 7 9 10 15 16 17 18 19 20" >}}
export default {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findById(id);
    },
    me: async (parent, args, { models, me }) => {
      return await models.User.findById(me.id);
    },
  },

  User: {
    messages: async (user, args, { models }) => {
      return await models.Message.findAll({
        where: {
          userId: user.id,
        },
      });
    },
  },
};
{{< /highlight >}}

As you can see, the `findAll()` and `findById()` are commonly used Sequelize methods. They are a common case for database operations after all. However, finding all messages for a specific user is a more specific use case. Here you have used the `where` clause for narrowing down messages by the `userId` entry in the database. At this point, it makes totally sense reading up the Sequelize API documentation if anything is unclear, because you are accessing a database instead of using sample data which adds another layer of complexity to your application's architecture.

In the next step, head over to the *src/resolvers/message.js* file and perform adjustments for using the Sequelize API as well:

{{< highlight javascript "hl_lines=3 4 6 7 12 13 14 15 19 20 25 26" >}}
export default {
  Query: {
    messages: async (parent, args, { models }) => {
      return await models.Message.findAll();
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findById(id);
    },
  },

  Mutation: {
    createMessage: async (parent, { text }, { me, models }) => {
      return await models.Message.create({
        text,
        userId: me.id,
      });
    },

    deleteMessage: async (parent, { id }, { models }) => {
      return await models.Message.destroy({ where: { id } });
    },
  },

  Message: {
    user: async (message, args, { models }) => {
      return await models.User.findById(message.userId);
    },
  },
};
{{< /highlight >}}

Apart from the previously used `findById()` and `findAll()` methods, you are creating and destroying (deleting) a message in the mutations too. Before you had to generate your own identifier for the message, but now Sequelize takes care of adding a unique identifier to your message once it got created in the database.

There was one crucial change in the two files: {{% a_blank "async/await" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function" %}}. Sequelize is a JavaScript promise based ORM and thus when operating on a database it always returns a JavaScript promise which gets resolved eventually. That's where async/await can be used as much more readable version for asynchronous requests in JavaScript. Furthermore, you have learned about the returned results of GraphQL resolvers in Apollo Server in a previous section. A result can be a JavaScript promise as well, because the resolvers would be waiting for its actual result. So in this case, you could also get rid of the async/await statements and your resolvers would still work. However, sometimes it is better to be more explicit, especially when adding more business logic within the resolver's function body later on, so we will keep the statements for now.

So what about seeding the database with sample data when your applications starts with `npm start`? Once your database synchronizes before your server listens, you can create manually two user records with messages in your database. The following code for the *src/index.js* file shows you how to perform these operations with async/await again. Your users will have a `username` and an association of `messages`.

{{< highlight javascript "hl_lines=3 5 6 7 8 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46" >}}
...

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      messages: [
        {
          text: 'Published the Road to learn React',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: 'ddavids',
      messages: [
        {
          text: 'Happy to release ...',
        },
        {
          text: 'Published a complete ...',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};
{{< /highlight >}}

Furthermore, the `force` flag in your Sequelize `sync()` method can be used to seed the database on every application startup again. So every time you will start with a sample data seeded database. You can either remove the flag or set it to `false` if you want to keep your accumulated database changes over time. After all, the flag should be removed for your production database at some point.

Last but not least, we have to take care about the `me` user. Before you have simply used one of the users from your sample data. Now, you can use one of the users from your database. That's a great opportunity for writing a custom method for your user model in the *src/models/user.js* file:

{{< highlight javascript "hl_lines=12 13 14 15 16 17 18 19 20 21 22 23 24" >}}
const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
    },
  });

  User.associate = models => {
    User.hasMany(models.Message);
  };

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login },
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }

    return user;
  };

  return User;
};

export default user;
{{< /highlight >}}

The `findByLogin()` method on your user model retrieves a user either by `username` or `email` entry. You don't have a `email` entry on your user yet, but will add it eventually when this application implements an authentication mechanism. However, the `login` argument is used for both `username` and `email` for retrieving the user from the database. Maybe you can already imagine how it can be used to sign in to an application either with username or email.

Now you have introduced your first custom method on a database model. It is always worth considering where to put this business logic. When giving your model these access methods, you may end up with a concept called *fat models* in programming. An alternative would be writing separate services (e.g. functions, classes) for these data access layer functionalities.

The new model method can be used for retrieving the `me` user from the database. Then you can put it into the context object when the Apollo Server is instantiated in the *src/index.js* file:

{{< highlight javascript "hl_lines=6" >}}
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.User.findByLogin('rwieruch'),
  },
});
{{< /highlight >}}

However, this cannot work yet, because 1) the user is read asynchronously from the database and thus `me` would be a JavaScript promise rather than the actual user and 2) you may want to retrieve the `me` user on a per request basis from the database. Otherwise, the `me` user would always stay the same after the Apollo Server got created. Therefore, you can use a function which returns the context object rather than an object for the context in Apollo Server. This function can make use of the async/await statements then. Furthermore, the function is invoked every time a request is hitting your GraphQL API and thus the `me` user is retrieved from the database with every request.

{{< highlight javascript "hl_lines=4 6 7" >}}
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async () => ({
    models,
    me: await models.User.findByLogin('rwieruch'),
  }),
});
{{< /highlight >}}

You should be able to start your application again. Try out your different GraphQL queries and mutations in GraphQL Playground and verify that everything is working for you. If there are any errors regarding the database, make sure that it is properly connected to your application and that the database is running on the command line too.

Since you have introduced a database now, GraphQL Playground is not the only manual testing tool anymore. Whereas GraphQL Playground can be used to test your GraphQL API, you may want to use the `psql` command line interface to query your database manually. For instance, you may want to check how your user or message records look like in the database or whether a message is located in the database after it has been created with a GraphQL mutation. So let's see briefly how you can do it yourself. First, connect to your database on the command line:

{{< highlight javascript >}}
psql mydatabasename
{{< /highlight >}}

And second, try the following SQL statements. It's the perfect opportunity to learn more about SQL itself:

{{< highlight javascript >}}
SELECT * from users;
SELECT text from messages;
{{< /highlight >}}

Which should lead to:

{{< highlight javascript >}}
mydatabase=# SELECT * from users;
 id | username |         createdAt          |         updatedAt
----+----------+----------------------------+----------------------------
  1 | rwieruch | 2018-08-21 21:15:38.758+08 | 2018-08-21 21:15:38.758+08
  2 | ddavids  | 2018-08-21 21:15:38.786+08 | 2018-08-21 21:15:38.786+08
(2 rows)

mydatabase=# SELECT text from messages;
               text
-----------------------------------
 Published the Road to learn React
 Happy to release ...
 Published a complete ...
(3 rows)
{{< /highlight >}}

So every time you are doing GraphQL mutations, it is valuable to check your database records with the `psql` command line interface too. As mentioned, it is a great way to learn about {{% a_blank "SQL" "https://en.wikipedia.org/wiki/SQL" %}} itself which is normally abstracted away by using a ORM such as Sequelize.

In this section, you have used a PostgreSQL database as data source for your GraphQL server whereas Sequelize is the glue between your database and your GraphQL resolvers. However, this was only one possible solution here. Since GraphQL is data source agnostic, it is up to you to opt-in any data source to your resolvers. It can be another database (e.g. MongoDB, Neo4j, Redis), multiple databases or a (third-party) REST/GraphQL API endpoint. GraphQL only makes sure that all fields are validated, executed and resolved when there is an incoming query or mutation regardless of the data source.

### Exercises:

* play around with psql and the seeding of your database
* play around with GraphQL playground and query data which comes from a database now
* remove (and add) the async/await statements in your resolvers and see how they still work
  * read more about {{% a_blank "GraphQL execution" "https://graphql.github.io/learn/execution/" %}}

{{% chapter_header "Apollo Server: Validation and Errors" "apollo-server-validation-errors" %}}

Validation, error and edge case handling are not often verbalized in programming. Often only the happy path is showcased to everyone. This section should give you some insights into these topics when using Apollo Server and GraphQL. The great thing about GraphQL: You are in charge what you want to return from your GraphQL resolvers. Therefore, it isn't too difficult inserting business logic into your resolvers, for instance, before they are reading from your database.

{{< highlight javascript "hl_lines=10 11 12" >}}
export default {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findById(id);
    },
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }

      return await models.User.findById(me.id);
    },
  },

  ...
};
{{< /highlight >}}

In general, it may be a good idea keeping the resolvers surface slim but adding business logic services on the side. Then it is always simple to reason about the resolvers. However, in this application we will keep the business logic in the resolvers for having everything at one place without scattering all the logic across the entire application.

Let's start with the validation which will lead to error handling eventually. GraphQL itself isn't directly concerned about validation. But it acts in between your tech stacks which are concerned about validation: your client application (e.g. showing some validation messages) and your database (e.g. validation of entities before writing to the database). Let's add some basic validation rules to your database models. It is up to you to extend these rules in the future. This section should only give you an introduction to the topic, because otherwise it becomes too verbose to cover all the edge cases in this application. First, add validation to your user model in the *src/models/user.js* file:

{{< highlight javascript "hl_lines=5 6 7 8 9" >}}
const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  ...

  return User;
};

export default user;
{{< /highlight >}}

And second, add the following validation rules to your message model  in the *src/models/message.js* file:

{{< highlight javascript "hl_lines=5" >}}
const message = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    text: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
    },
  });

  Message.associate = models => {
    Message.belongsTo(models.User);
  };

  return Message;
};

export default message;
{{< /highlight >}}

Now, try to create a message with an empty text in GraphQL Playground. It shouldn't work because you require a non-empty text for your message in the database. The same applies to your user entities which need a unique username now. But can GraphQL and Apollo Server handle these cases already for you? Let's try to create a message with an empty text. You should see a similar input and output:

{{< highlight javascript >}}
// mutation
mutation {
  createMessage(text: "") {
    id
  }
}

// mutation error result
{
  "data": null,
  "errors": [
    {
      "message": "Validation error: Validation notEmpty on text failed",
      "locations": [],
      "path": [
        "createMessage"
      ],
      "extensions": { ... }
    }
  ]
}
{{< /highlight >}}

It seems like Apollo Server's resolvers make sure to transform {{% a_blank "JavaScript errors" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error" %}} to valid GraphQL output. It would be already possible to use this common error format in your client application. You wouldn't have to add any additional error handling to your resolvers.

In case you want to add custom error handling to your resolver, you always can add the commonly try/catch block statements for async/await:

{{< highlight javascript "hl_lines=8 13 14 15" >}}
export default {
  Query: {
    ...
  },

  Mutation: {
    createMessage: async (parent, { text }, { me, models }) => {
      try {
        return await models.Message.create({
          text,
          userId: me.id,
        });
      } catch (error) {
        throw new Error(error);
      }
    },

    ...
  },

  ...
};
{{< /highlight >}}

The error output for GraphQL should stay the same in the GraphQL Playground, because you have used the same error object to generate the Error instance. However, you could use your custom message here with `throw new Error('My error message.');`.

Another way of adjusting your error message would be in the database model definition. For instance, each validation rule can have a custom validation message. You can define these messages in the Sequelize model:

{{< highlight javascript "hl_lines=6 7 8 9" >}}
const message = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    text: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'A message has to have a text.',
        },
      },
    },
  });

  Message.associate = models => {
    Message.belongsTo(models.User);
  };

  return Message;
};

export default message;
{{< /highlight >}}

This would automatically lead to the following error(s) when attempting to create a message with an empty text. Again, it could be used straight forward in your client application, because the error format itself stays the same:

{{< highlight javascript "hl_lines=5" >}}
{
  "data": null,
  "errors": [
    {
      "message": "SequelizeValidationError: Validation error: A message has to have a text.",
      "locations": [],
      "path": [
        "createMessage"
      ],
      "extensions": { ... }
    }
  ]
}
{{< /highlight >}}

That's the one great benefit when using Apollo Server for GraphQL: The error handling comes often for free, because an error - be it from the database, a custom JavaScript error or another third-party - gets transformed into a valid GraphQL error result. On the client side, you don't need to worry about the error result's shape, because it comes in a common GraphQL error format whereas the data object is null but the errors are captured in an array. If you want to change your custom error, you have seen how you can do it on a resolver per resolver basis. But what about the global error formatting? Apollo Server comes with a solution for it:

{{< highlight javascript "hl_lines=4 5 6 7 8 9 10 11 12 13 14 15" >}}
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async () => ({
    models,
    me: await models.User.findByLogin('rwieruch'),
  }),
});
{{< /highlight >}}

Basically these are the essentials about validation and error handling with GraphQL in Apollo Server. The validation can happen on a database (model) level or on a business logic level (resolvers). It can happen on a directive level too (see exercises). If there is an error, GraphQL and Apollo Server will format it into an appropriate format which is well known for GraphQL clients. If you want to format your errors, you can do it globally in Apollo Server as well. This section has shown you the basics about error handling and validation for GraphQL servers. You can read up the more material from the exercises to dive deeper into the topic.

### Exercises:

* add further validation rules to your database models
  * read more about validation in the Sequelize documentation
* read more about {{% a_blank "Error Handling with Apollo Server" "https://www.apollographql.com/docs/apollo-server/v2/features/errors.html" %}}
 * get to know the different custom errors in Apollo Server
* read more about {{% a_blank "GraphQL field level validation with custom directives" "https://blog.apollographql.com/graphql-validation-using-directives-4908fd5c1055" %}}
  * read more about {{% a_blank "custom schema directives" "https://www.apollographql.com/docs/apollo-server/v2/features/directives.html" %}}

{{% chapter_header "Apollo Server: Authentication" "apollo-server-authentication" %}}

Authentication in GraphQL is a popular topic, because there is no opionated way of doing it, but many people need it for their applications. GraphQL itself isn't opionated about authentication since it is only a query language. If you want to have authentication in GraphQL, the implementation with GraphQL mutations is up to you. In this section, we will go through a minimalistic approach on how to add authentication to your GraphQL server. Afterward, it should be possible to register (sign up) and login (sign in) a user to your application. The previously used `me` user will be the authenticated user then.

In preparation for the authentication mechanism with GraphQL, you have to extend the user model in the *src/models/user.js* file. The user has to have a email address (as unique identifier) and a password. Both, email address and username (another unique identifier) can be used to sign in a user to the application. That's why both properties were also used for the user's `findByLogin()` method.

{{< highlight javascript "hl_lines=13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29" >}}
...

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [7, 42],
      },
    },
  });

  ...

  return User;
};

export default user;
{{< /highlight >}}

As you can see, the two new entries for the user model have their own validation rules as you have done them in the previous section. For instance, the password of a user should be between 7 and 42 characters and the email should have a valid email format. If any of these validations fails during the user creation, it generates a JavaScript error, transforms and transfers the error with GraphQL, and thus can be used in the client application. The registration form in the client application could display the validation error then.

Next, don't forget to add the new properties to your seed data in the *src/index.js* file:

{{< highlight javascript "hl_lines=5 6 17 18" >}}
const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      email: 'hello@robin.com',
      password: 'rwieruch',
      messages: [ ... ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: 'ddavids',
      email: 'hello@david.com',
      password: 'ddavids',
      messages: [ ... ],
    },
    {
      include: [models.Message],
    },
  );
};
{{< /highlight >}}

That's it for the data migration of your database in order to get started with the GraphQL authentication.

{{% sub_chapter_header "Registration (Sign Up) with GraphQL" "graphql-registration-sign-up-authentication" %}}

Now, let's get into the implementation details for the GraphQL authentication. In the following, you are going to implement two GraphQL mutations: one to register a user and one to login a user to the application. Let's start with the sign up mutation in the GraphQL schema in the *src/schema/user.js* file:

{{< highlight javascript "hl_lines=10 11 12 13 14 15 16 18 19 20" >}}
import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
    ): Token!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }
`;
{{< /highlight >}}

The `signUp` mutation takes three non-nullable arguments: username, email and password. All of these things are used to create a user in the database eventually. When a user signs in to the application (after a successful sign up), the user should be able to take the username or email address combined with the password for the login. So what about the return type of the `signUp` mutation? Since we are going to use a token based authentication with GraphQL, it is sufficient to return a token which is nothing more than a string. However, in order to distinguish the token in the GraphQL schema, it has its own GraphQL type. You will learn more about the token in the following, because the token is all about the authentication mechanism for this application.

First, you can add the counterpart for your new mutation in the GraphQL schema as resolver function. In your *src/resolvers/user.js* file, add the following resolver function which creates a user in the database and returns an object with the token value as string.

{{< highlight javascript "hl_lines=1 2 3 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24" >}}
const createToken = async (user) => {
  ...
};

export default {
  Query: {
    ...
  },

  Mutation: {
    signUp: async (
      parent,
      { username, email, password },
      { models },
    ) => {
      const user = await models.User.create({
        username,
        email,
        password,
      });

      return { token: createToken(user) };
    },
  },

  ...
};
{{< /highlight >}}

Basically that's the necessary GraphQL framework around a token based registration. You have created the necessary GraphQL mutation and resolver for it, which creates a user in the database (based on certain validations) and its incoming resolver arguments, and finally creates a token for the registered user. The latter will be explained in the following sections. But for now, all you have set up is sufficient to create (register, sign up) a new user with a GraphQL mutation.

{{% sub_chapter_header "Securing Passwords with Bcrypt" "graphql-token-based-authentication" %}}

There is one major security flaw in this code: the password of a user is stored in plain text in the database. You should never do this, because when your database gets hacked or some other third-party gets access to it, you made it very easy for the attacker to get all the passwords in plain text. That's why you can use something like {{% a_blank "bcrypt" "https://github.com/kelektiv/node.bcrypt.js" %}} for hashing your passwords. First, install it on the command line:

{{< highlight javascript >}}
npm install bcrypt --save
{{< /highlight >}}

Now, it is possible to hash the password with bcrypt in the user's resolver function when it gets created on a `signUp` mutation. However, there is an alternative way of doing it with Sequelize. In your user model, you can define a so called hook function which is executed every time before a user entity is created:

{{< highlight javascript "hl_lines=8 9 10" >}}
const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    ...
  });

  ...

  User.beforeCreate(user => {
    ...
  });

  return User;
};

export default user;
{{< /highlight >}}

In this hook function, you can add the functionalities to alter your user entity's properties before they reach the database. So let's do it for the hashed password by using bcrypt.

{{< highlight javascript "hl_lines=1 10 11 12 14 15 16 17" >}}
import bcrypt from 'bcrypt';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    ...
  });

  ...

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  return User;
};

export default user;
{{< /highlight >}}

The bcrypt `hash()` method takes a string (here the user's password) and an integer called salt rounds. What are salt rounds? Basically each salt round makes it more costly to hash the password. In return, it makes it more costly for attackers to decrypt the hash value. A common value for salt rounds nowadays ranged from 10 to 12, because if you would increase the number of salt rounds, you may run into performance issue yourself (and not only the attacker).

In this implementation, the `generatePasswordHash()` function is added to the user's prototype chain. That's why it is possible to execute the function as method on each user instance and thus you have the user itself available within the method as `this`. You could have used another approach of doing it, for instance as function which takes the user instance with its password as argument (which would be my personal preference), but using JavaScript's prototypal inheritance is sometimes a good task to keep this knowledge in your tool chain as a developer. As for now, every time a user is created in the database, the password is hashed with bcrypt before it gets stored.

{{% sub_chapter_header "Token based Authentication in GraphQL" "graphql-token-based-authentication" %}}

Now what about the token based authentication? So far, there is only a placeholder in your application for creating the token which should be returned on a sign up (and sign in) mutation.

Essentially the token is only important for a user who signs in to your application. A signed in user can be identified with this token and thus is able to read and write data from the database. Since a registration (sign up) will automatically lead to a login (sign in), the token is generated already in the registration phase and not only in the login phase. You will see later how the token is generated for a login as well.

Let's get into the implementation details for the token based authentication in GraphQL. Regardless of GraphQL, you are going to use a {{% a_blank "JSON web token (JWT)" "https://jwt.io/" %}} to identify your user. This approach is not only used in GraphQL applications. The definition for a JWT from the official website says: *JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.* In other words, a JWT is a secure way to handle the communication between two parties (e.g. a client and a server application). If you haven't done anything security related before, don't worry too much about it. The following section will guide you through the process and in the end, the token is nothing else than a secured JavaScript object with user information.

In order to create JWT in this application, you are going to use the popular {{% a_blank "jsonwebtoken" "https://github.com/auth0/node-jsonwebtoken" %}} node package, so you can simply install it on the command line:

{{< highlight javascript >}}
npm install jsonwebtoken --save
{{< /highlight >}}

Now, you can import it in your *src/resolvers/user.js* file and use it for creating the token:

{{< highlight javascript "hl_lines=1 4 5" >}}
import jwt from 'jsonwebtoken';

const createToken = async user => {
  const { id, email, username } = user;
  return await jwt.sign({ id, email, username });
};

...
{{< /highlight >}}

The first argument to "sign" a token can be any user information except for sensible data such as passwords, because the token ends up on the client side of your application stack too. Signing a token means putting data into it (as you did) and securing it (which you haven't done yet). In order to secure your token, you need to pass in a secret (**any** long string) which is **only available to you and your server**. No third-party should have access to it, because it is used to encode (sign) and decode your token. For instance, you can add the secret to your environment variables in the *.env* file:

{{< highlight javascript "hl_lines=5" >}}
DATABASE=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres

SECRET=wr3r23fwfwefwekwself.2456342.dawqdq
{{< /highlight >}}

Then, in the *src/index.js* file, you can pass the secret via Apollo Server's context to all resolver functions:

{{< highlight javascript "hl_lines=8" >}}
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  ...
  context: async () => ({
    models,
    me: await models.User.findByLogin('rwieruch'),
    secret: process.env.SECRET,
  }),
});
{{< /highlight >}}

Next, you can use it in your `signUp` resolver function by passing it to the token creation. The `sign` method of JWT takes care of the rest. In addition, you can pass in a third argument for setting an expiration date for a token. In this case, the token is only valid for 30 minutes. Afterward, a user would need to sign in again.

{{< highlight javascript "hl_lines=1 3 5 6 7 19 27" >}}
import jwt from 'jsonwebtoken';

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user;
  return await jwt.sign({ id, email, username }, secret, {
    expiresIn,
  });
};

export default {
  Query: {
    ...
  },

  Mutation: {
    signUp: async (
      parent,
      { username, email, password },
      { models, secret },
    ) => {
      const user = await models.User.create({
        username,
        email,
        password,
      });

      return { token: createToken(user, secret, '30m') };
    },
  },

  ...
};
{{< /highlight >}}

Now you have secured your information in the token as well. If you would want to decode it, in order to access the secured data (the first argument of the `sign` method), you would need the secret again. Furthermore, the token is only valid for 30 minutes.

That's it for the registration: you are creating a user and return a valid token which can be used from the client application to authenticate the user again. The server can decode the token, which comes with every request, and allows the user to access the more sensible data of the application. You can try out the registration with GraphQL Playground yourself, which should create a user in the database and return a token for it. Furthermore, you can check your database with `psql` whether the user got created and whether the user has a hashed password instead of a plain text password.

{{% sub_chapter_header "Login (Sign In) with GraphQL" "graphql-registration-sign-up-authentication" %}}

Before you will dive into the authorization with the token on a per request basis, let's implement the second mutation for completing the authentication mechanism: the `signIn` mutation (or login mutation). Again, first add the GraphQL mutation to your user's schema in the *src/schema/user.js* file:

{{< highlight javascript "hl_lines=13" >}}
import { gql } from 'apollo-server-express';

export default gql`
  ...

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
    ): Token!

    signIn(login: String!, password: String!): Token!
  }

  type Token {
    token: String!
  }

  ...
`;
{{< /highlight >}}

Second, add the resolver counterpart to your *src/resolvers/user.js* file:

{{< highlight javascript "hl_lines=2 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36" >}}
import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';

...

export default {
  Query: {
    ...
  },

  Mutation: {
    signUp: async (...) => {
      ...
    },

    signIn: async (
      parent,
      { login, password },
      { models, secret },
    ) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.',
        );
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }

      return { token: createToken(user, secret, '30m') };
    },
  },

  ...
};
{{< /highlight >}}

Let's go through the new resolver function for the login step by step. As arguments the resolver has access to the input arguments from the GraphQL mutation (login, password) and the context (models, secret). When a user tries to sign in to your application, the login, which can be either the unique username or unique email, is taken to retrieve a user from the database. If there is no user, the application should throw a error which can be used in the client application to show an error for the login form. If there is an user, the user's password is validated. You will see this method on the user model in a moment. If the password is not valid, the application throws an error again for the client application. If the password is valid, the `signIn` mutation returns a token again (identical to the `signUp` mutation). So after all, the client application either performs a successful login or shows an error message for either the invalid credentials, because no user by username or email is found in the database, or the invalid password. In addition, you can see specific Apollo Server Errors which can be used over generic JavaScript Error classes.

Last but not least, what about the `validatePassword()` method on the user instance? Let's implement it in the *src/models/user.js* file, because that's where all the model methods for the user can be implemented (same as the `findByLogin()` method):

{{< highlight javascript "hl_lines=29 30 31" >}}
import bcrypt from 'bcrypt';

const user = (sequelize, DataTypes) => {
  ...

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login },
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }

    return user;
  };

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};

export default user;
{{< /highlight >}}

Again, it's a JavaScript prototypal inheritance for making a method available on the user instance. In this method, the user (this) and its password can be compared with the incoming password (coming from the GraphQL mutation) by using bcrypt, because the password on the user is the hashed password and the incoming password is the plain text password. After all, bcrypt will tell you whether the password is correct or not when a user signs in.

Now you have set up everything for the registration (sign up) and login (sign in) for your GraphQL server application. You have used bcrypt to hash (and compare) the plain text password before it reaches the database with a Sequelize hook function and you have used JWT to encrypt user data with a secret to a token. Then the token is returned on every sign up and sign in. Then the client application can save the token (e.g. local storage of the browser) and send it along with every GraphQL query and mutation as authorization.

So what should you do with the token once a user is authenticated with your application after a successful registration or login? That's what the next section will teach you about authorization in GraphQL on the server-side.

### Exercises:

* register (sign up) a new user with GraphQL Playground
* check your users and their hashed passwords in the database with `psql`
* read more about {{% a_blank "JSON web tokens (JWT)" "https://jwt.io/" %}}
* login (sign in) a user with GraphQL Playground
  * copy and paste the token to the interactive token decoding on the JWT website (conclusion: the information itself isn't secure, that's why you shouldn't put a password in the token)

{{% chapter_header "Authorization with GraphQL and Apollo Server" "apollo-server-authorization" %}}

In the last section, you have set up all GraphQL mutations to enable the authentication with the server. You can register a new user with bcrypt hashed passwords and you are able to login with your user's credentials. Both authentication related GraphQL mutations return a token (JWT) for you which secures non-sensible user information with a secret. So what can be done once you have obtained the token in your client application?

The token, whether obtained on registration or login, is returned to the client application after a successful GraphQL `signIn` or `signUp` mutation. The client application has to make sure to store the token somewhere (e.g. [the browser's session storage](https://www.robinwieruch.de/local-storage-react)). Then, every time a request is made to the GraphQL server, the token has to be attached to the HTTP header of the HTTP request. Then the GraphQL server can validate the HTTP header, verify its authenticity, and perform the actual request (e.g. GraphQL operation). If the token is not valid (anymore), the GraphQL server has to return an error for the GraphQL client. If the client still has a token locally stored, it should remove the token from the storage and redirect the user to the login page.

So how to perform the server part of the equation? Let's do it in the *src/index.js* file by adding a global authorization which verifies the incoming token before the request hits the GraphQL resolvers.

{{< highlight javascript "hl_lines=1 4 8 9 10 11 12 13 14 15 16 17 18 19 20 26 27 28 29 30 31 32 33 34" >}}
import jwt from 'jsonwebtoken';
import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';
...

const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  ...
  context: async ({ req }) => {
    const me = await getMe(req);

    return {
      models,
      me,
      secret: process.env.SECRET,
    };
  },
});

...
{{< /highlight >}}

So what's happening in this general authorization on the server-side? Basically you are injecting the `me` user, which is the authenticated user from the token, with every request to your Apollo Server's context. The `me` user is the user which you encode in the token in your `createToken()` function. It's not a user from the database anymore which is good, because you can spare the request to the database.

In the `getMe()` function, you extract the HTTP header for the authorization, which is called "x-token" in this case (common way of naming it), from the incoming HTTP request. That's because the GraphQL client application will send the token obtained from the registration or login with every other request in a HTTP header along with the actual payload of the HTTP request (e.g. GraphQL operation). Then, in the function, it can be checked whether there is such a HTTP header or not. If not, the function simply continues with the request, but the `me` user will be undefined then. If there is a token, the function verifies the token with its secret and retrieves the user information (which was stored when you created the token) from the token. If the verification fails, because there was a header but the token was invalid or expired, the GraphQL server throws a specific Apollo Server Error. If the verification succeeds, the function continues as well, but this time with the `me` user defined.

So the only case when the function returns an error is when the client application sends a HTTP header with a token which is invalid or expired. Otherwise, the function waves the request through, because then on a resolver level it must be checked whether a user is allowed to perform certain operations or not. For instance, a non authenticated user (`me` user is undefined) may be able to retrieve a list of messages, but not to create a new message. So the application is protected at least against invalid and expired tokens now.

Basically that's it for the most high level authentication and authorization for your GraphQL server application. You are able to authenticate with your GraphQL server from a GraphQL client application with the `signUp` and `signIn` GraphQL mutations and your GraphQL server only allows valid and non expired tokens which are coming with every other GraphQL operation from a GraphQL client application. But what about a more fine-grained authorization for specific GraphQL queries and mutations?

{{% sub_chapter_header "GraphQL Authorization on a Resolver Level" "apollo-server-authorization-resolver" %}}

As you have noticed, a GraphQL HTTP request comes through the `getMe()` function even though if it has no HTTP header for a token. It's a good default behavior, because you want to be able to register a new user or login as a user to the application without having a token yet. Moreover, you may want to query messages or users without being authenticated with the application. That's why it's okay to wave through the request even though there is no authorization token. Only when the token is invalid or expired, there will be an error.

However, certain GraphQL operations should have more fine-grained authorization too. For instance, creating a message should only be possible when you are authenticated as a user. Otherwise, who should be the creator of the message in the first place? So let's see how the `createMessage` GraphQL mutation can be protected (also called: guarded) on a GraphQL resolver level.

The naive approach of protecting the GraphQL operation would be to guard it with an if-else statement in the *src/resolvers/message.js* file:

{{< highlight javascript "hl_lines=1 10 11 12" >}}
import { ForbiddenError } from 'apollo-server';

export default {
  Query: {
    ...
  },

  Mutation: {
    createMessage: async (parent, { text }, { me, models }) => {
      if (!me) {
        throw new ForbiddenError('Not authenticated as user.');
      }

      return await models.Message.create({
        text,
        userId: me.id,
      });
    },

    ...
  },

  ...
};
{{< /highlight >}}

You can imagine how this becomes repetitive and error prone when using this approach for all the GraphQL operations which are only accessible as authenticated user. You would mix lots of authorization logic into your resolver functions. So how to introduce an authorization abstraction layer for protecting those GraphQL operations? The solutions to it are so called **combined resolvers** or a **resolver middleware**. Without having to implement these things ourselves, let's install a node package for the former solution:

{{< highlight javascript >}}
npm install graphql-resolvers --save
{{< /highlight >}}

Let's implement a protecting resolver function with this package in a new *src/resolvers/authorization.js* file. It should only check whether there is a `me` user or not.

{{< highlight javascript >}}
import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');
{{< /highlight >}}

Basically the `isAuthenticated()` resolver function acts as some kind of middleware. It either continues with the next resolver (skip) or does something else (return an error). In this case, an error is returned when the `me` user is not available. Since it is a resolver function itself, it has the same arguments as a normal resolver.

Now, this guarding resolver can be used when creating a message in the *src/resolvers/message.js* file. You need to import it along with the `combineResolvers()` from the newly installed node package. Then the new resolver can be used to protect the actual resolver by combining them.

{{< highlight javascript "hl_lines=1 3 11 12 13 14 15 16 17 18 19" >}}
import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authorization';

export default {
  Query: {
    ...
  },

  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { models, me }) => {
        return await models.Message.create({
          text,
          userId: me.id,
        });
      },
    ),

    ...
  },

  ...
};
{{< /highlight >}}

Now the `isAuthenticated()` resolver function always runs before the actual resolver that creates the message associated with the authenticated user in the database. The resolvers get chained after each other. The great thing about it: You can reuse the protecting resolver function wherever you need it. It only adds a small footprint to your actual resolvers and you can change it at one place in your *src/resolvers/authorization.js* file.

{{% sub_chapter_header "Permission-based GraphQL Authorization" "apollo-server-authorization-permission" %}}

The previous resolver only checks whether a user is authenticated or not. It is only applicable on a higher level. What about more specific use cases such as permissions? Let's add another protecting resolver which is more specific than the previous one in the *src/resolvers/authorization.js* file:

{{< highlight javascript "hl_lines=3 4 5 6 7 8 9 10 11 12 13 14 15" >}}
...

export const isMessageOwner = async (
  parent,
  { id },
  { models, me },
) => {
  const message = await models.Message.findById(id, { raw: true });

  if (message.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};
{{< /highlight >}}

This resolver checks whether the authenticated user is a message owner. It's the perfect check before deleting a message if only the message creator should be able to delete it. So the guarding resolver retrieves the message by id, checks the message's associated user with the authenticated user, and either throws an error or continues with the next resolver. Let's protect an actual resolver with this fine-grained authorization permission resolver in the *src/resolvers/message.js* file:

{{< highlight javascript "hl_lines=3 13 14 15 16 17 18" >}}
import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated, isMessageOwner } from './authorization';

export default {
  Query: {
    ...
  },

  Mutation: {
    ...

    deleteMessage: combineResolvers(
      isMessageOwner,
      async (parent, { id }, { models }) => {
        return await models.Message.destroy({ where: { id } });
      },
    ),
  },

  ...
};
{{< /highlight >}}

The `deleteMessage` resolver is protected with an authorization resolver now. Only a message owner, thus a message creator, is allowed to delete a message. But what about if the user isn't authenticated in the first place? Therefore you can stack your protecting resolvers onto each other:

{{< highlight javascript "hl_lines=14" >}}
import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated, isMessageOwner } from './authorization';

export default {
  Query: {
    ...
  },

  Mutation: {
    ...

    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models }) => {
        return await models.Message.destroy({ where: { id } });
      },
    ),
  },

  ...
};
{{< /highlight >}}

In this case, first it is checked whether the user is authenticated and second whether the user is the owner of the message before deleting it.

Another spin on this would have been using the `isAuthenticated` resolver directly in the `isMessageOwner` resolver, then you would never have to deal with this in the actual resolver for deleting a message. But personally I find it more explicit doing it the other way than hiding this knowledge within the authorization resolver. You will find it the other way around in the role-based authorization section.

The second combined resolver is one way of doing permission checks, because it checks whether the user has the permission to delete the message. There are different approaches to achieve those kind of permission checks and this is only one way of doing it. In other cases, the message itself may have a boolean flag (with respect to the context which is the authenticated user) whether it is possible to delete it.

{{% sub_chapter_header "Role-based GraphQL Authorization" "apollo-server-authorization-role" %}}

Previously you went from a high-level authorization to a more fine-grained authorization with permission based resolver protection. Another way of doing authorization are roles. In the following, you will implement a new GraphQL mutation which needs to have role-based authorization, because it has the ability to delete a user. So who should be able to delete a user? Maybe only a user with an admin role. So let's implement the new GraphQL mutation first, followed by the role-based authorization. You can start in your *src/resolvers/user.js* file with a resolver function which deletes a user in the database by identifier:

{{< highlight javascript "hl_lines=11 12 13 14 15" >}}
...

export default {
  Query: {
    ...
  },

  Mutation: {
    ...

    deleteUser: async (parent, { id }, { models }) => {
      return await models.User.destroy({
        where: { id },
      });
    },
  },

  ...
};
{{< /highlight >}}

Every time you implement a new GraphQL operation, you have to do it in your resolvers and schema. So let's add the new mutation in your GraphQL schema in the *src/schema/user.js* file as well. It should only return a boolean which tells you whether the deletion was successful or not:

{{< highlight javascript "hl_lines=16" >}}
import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    ...
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
    ): Token!

    signIn(login: String!, password: String!): Token!
    deleteUser(id: ID!): Boolean!
  }

  ...
`;
{{< /highlight >}}

Your new GraphQL mutation should work already. But every one is able to execute it. Now, before implementing the role-based protection for it, you have to introduce the actual roles for the user entities. Therefore, add a `role` entry to your user's entity in the *src/models/user.js* file:

{{< highlight javascript "hl_lines=14 15 16" >}}
...

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    ...
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [7, 42],
      },
    },
    role: {
      type: DataTypes.STRING,
    },
  });

  ...

  return User;
};

export default user;
{{< /highlight >}}

Since you already have seed data in your *src/index.js* file for two users, you can give one of the two users a role, in this case an admin role, which can be checked later when deleting a user.

{{< highlight javascript "hl_lines=9" >}}
...

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      email: 'hello@robin.com',
      password: 'rwieruch',
      role: 'ADMIN',
      messages: [
        {
          text: 'Published the Road to learn React',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  ...
};
{{< /highlight >}}

Because you are never retrieving the actual `me` user from the database in the *src/index.js* file, but only used the user from the token, you have to add the role information of the user to the token when it gets created in the *src/resolvers/user.js* file:

{{< highlight javascript "hl_lines=2 3" >}}
const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn,
  });
};
{{< /highlight >}}

Now you have introduced a new GraphQL mutation for deleting a user and roles for users. One of your users should be an admin user too. In the next steps, you are going to protect the new GraphQL mutation with a role-based authorization. Therefore, create a new guarding resolver in your *src/resolvers/authorization.js* file:

{{< highlight javascript "hl_lines=2 7 8 9 10 11 12 13" >}}
import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === 'ADMIN'
      ? skip
      : new ForbiddenError('Not authorized as admin.'),
);

export const isMessageOwner = async (
  parent,
  { id },
  { models, me },
) => {
  const message = await models.Message.findById(id, { raw: true });

  if (message.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};
{{< /highlight >}}

The new resolver checks whether the authenticated user has the `ADMIN` role or not. If it hasn't the role, the resolver returns an error. If it has the role, the next resolver will be called. In addition, in contrast to the `isMessageOwner` resolver, the `isAdmin` resolver already is a combined resolver which makes use of the `isAuthenticated` resolver. Then you don't need to worry about this check in your actual resolver, which you are going to protect in the next step:

{{< highlight javascript "hl_lines=2 5 17 18 19 20 21 22 23 24" >}}
import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';

import { isAdmin } from './authorization';

...

export default {
  Query: {
    ...
  },

  Mutation: {
    ...

    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        return await models.User.destroy({
          where: { id },
        });
      },
    ),
  },

  ...
};
{{< /highlight >}}

That's it for the role-based authorization in GraphQL with Apollo Server. In this case, the role is only a string which needs to be checked. In a more elaborated role-based architecture, you may want to change the role from a string to an array of multiple roles. Then you don't have to make an equal check anymore but instead check whether the array includes the desired role. That's one way of doing a more sophisticated role-based authorization setup.

{{% sub_chapter_header "Setting Headers in GraphQL Playground" "graphql-playground-headers" %}}

In the previous sections, you have learned how to setup authorization for your GraphQL application. But how to verify that it is working? You only need to head over to your GraphQL Playground and run through the different scenarios. Let's do it together for the user deletion scenario, but all the remaining scenarios should be verified on your own (exercise).

Before you can delete a user, you need to sign in to the application first. Let's execute a `signIn` mutation in GraphQL Playground but with a non admin user. You can repeat the walkthrough another time with an admin user afterward.

{{< highlight javascript >}}
mutation {
  signIn(login: "ddavids", password: "ddavids") {
    token
  }
}
{{< /highlight >}}

In your GraphQL Playground result, you should get the token after the login. For the next GraphQL operations, the token needs to be set in the HTTP header. GraphQL Playground has a panel to add HTTP headers. Since your application is checking for a x-token, you need to set the token as one:

{{< highlight javascript >}}
{
  "x-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoZWxsb0BkYXZpZC5jb20iLCJ1c2VybmFtZSI6ImRkYXZpZHMiLCJpYXQiOjE1MzQ5MjM4NDcsImV4cCI6MTUzNDkyNTY0N30.ViGU6UUY-XWpWDJGfXqES2J1lEr-Uye8XDQ79lAvByE"
}
{{< /highlight >}}

In your case, the token should be different. Since the token is set as HTTP header now, you should be able to delete a user. Let's try it with the following GraphQL mutation in GraphQL Playground. The HTTP header with the token will be send along with the GraphQL operation:

{{< highlight javascript >}}
mutation {
  deleteUser(id: "2")
}
{{< /highlight >}}

Instead of seeing a successful request, you should see the following GraphQL error after executing the GraphQL mutation for deleting a user. That's because you haven't logged in as a user with an admin role.

{{< highlight javascript >}}
{
  "data": null,
  "errors": [
    {
      "message": "Not authorized as admin.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "deleteUser"
      ],
      "extensions": { ... }
    }
  ]
}
{{< /highlight >}}

If you would follow the same sequence with an admin user, which you should do as exercise, you should be able to delete a user entity successfully.

{{% pin_it_image "graphql authorization" "img/posts/graphql-apollo-server-tutorial/authorization.jpg" "is-src-set" %}}

That's it for the basic authorization for this application. It has the global authorization for every request before the request hits the GraphQL resolvers and the authorization on a resolver level with protecting resolvers. They check whether a user is authenticated, whether the user is able to delete a message (permission-based authorization) or whether a user is able to delete a user (role-based authorization).

The shown way for doing authorization in GraphQL was only one approach of doing it. If you want to be even more fine-grained than resolver level authorization, checkout **directive-based authorization** or **field level authorization** in GraphQL. Another way would be to apply authorization on a data access level with the help of your ORM (here Sequelize). In the end, it comes down to your requirements and your application on which level of your application you want to introduce authorization.

### Exercises:

* read more about {{% a_blank "GraphQL authorization" "https://graphql.github.io/learn/authorization/" %}}
* play through the different authorization scenarios with GraphQL Playground
* find out more about field level authorization with Apollo Server and GraphQL
* find out more about data access level authorization with Apollo Server and GraphQL

{{% chapter_header "Pagination in GraphQL with Apollo Server" "apollo-server-pagination" %}}

Sooner or later you will run into a feature called pagination when developing applications with lists of items. For instance, the messages in your application for a user, when thinking about a chat application, can become a very long list with lots of messages. When a client application requests the messages of a user in order to display them, you don't want to retrieve all messages at once from the server application (and database), because it will become a performance bottleneck.

So what can be done to solve this problem? The feature to solve this is called pagination and allows you to split up a list of items into multiple lists (pages). Such page is usually (depends on the pagination strategy) defined with a limit (how many items) and an offset (index in the list, starting point for the limit). That way, you can request one page of items (100 list items) and later, when a user scrolls through the items in the client application and wants to see more items, request another page of items (next 100 list items with an offset of the first 100 list items). Doesn't sound too complicated, does it?

Let's implement pagination in GraphQL with two approaches in the following sections. The first approach will be the most naive approach (**offset/limit-based pagination**) to implement it. Afterward, you will see an advanced approach (**cursor-based pagination**) which is only one way of doing a more sophisticated pagination implementation.

{{% sub_chapter_header "Offset/Limit Pagination with Apollo Server and GraphQL" "apollo-server-offset-limit-pagination" %}}

The offset/limit-based pagination isn't too difficult to implement. As mentioned previously, the limit states how many items you want to retrieve from the entire list and the offset states where to begin in the entire list. By using different offsets, you can shift through the entire list of items and retrieve only a sublist (page) of it with the limit. Therefore, the message schema in the *src/schema/message.js* file has to consider these two new arguments:

{{< highlight javascript "hl_lines=5" >}}
import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    messages(offset: Int, limit: Int): [Message!]!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;
{{< /highlight >}}

Then you can adjust the resolver in the *src/resolvers/message.js* file to deal with these two new arguments:

{{< highlight javascript "hl_lines=5 6 7 8 9 10 11 12 13" >}}
...

export default {
  Query: {
    messages: async (
      parent,
      { offset = 0, limit = 100 },
      { models },
    ) => {
      return await models.Message.findAll({
        offset,
        limit,
      });
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findById(id);
    },
  },

  Mutation: {
    ...
  },

  ...
};
{{< /highlight >}}

Fortunately your ORM (Sequelize) gives you everything you need to make it happen with the in-house offset and limit functionality. That's it for the offset- and limit-based pagination feature itself. You can try it in GraphQL Playground yourself by adjusting the limit and offset.

{{< highlight javascript >}}
query {
  messages(offset: 1, limit: 2){
    text
  }
}
{{< /highlight >}}

Even though this approach is simpler to implement and understand, it comes with a few disadvantages. For instance, when your offset becomes very long, the database query takes longer. This can lead to a bad performance on the client-side while waiting for the next page of data. In addition, the offset/limit pagination cannot handle the edge case of deleted items in between. For instance, imagine you query the first page of data. Then someone deletes one item in the first page. When requesting the next page of data, the offset would be wrong, because it would miss one item due to the shifted list. You cannot easily overcome this problem with offset- and limit-based pagination. That's why there exists another more sophisticated approach for pagination: cursor-based pagination.

{{% sub_chapter_header "Cursor-based Pagination with Apollo Server and GraphQL" "apollo-server-cursor-based-pagination" %}}

In cursor-based pagination, you give your offset an identifier (called cursor) rather than just counting the items as in the previous approach. This cursor can be used to say: "give me a limit of X items from cursor Y". So what should be the cursor to identify an item in the list? A common approach is using dates (e.g. creation date of an entity in the database). In our case, each message already has a `createdAt` date which is assigned to the entity when it written to the database. So let's extend the *src/schema/message.js* which this field for a message. Afterward, you should be able to query this field in GraphQL Playground too:

{{< highlight javascript "hl_lines=17" >}}
import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    messages(cursor: String, limit: Int): [Message!]!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type Message {
    id: ID!
    text: String!
    createdAt: String!
    user: User!
  }
`;
{{< /highlight >}}

Next, in order to test the cursor-based pagination based on the creation date of an entity in a more robust way, you need to adjust your seed data in the *src/index.js* file. At the moment, all seed data is created at once which applies to the messages as well. However, it would be beneficial to have each message created in one second intervals because the creation date should differ for each message to see the effect of the pagination based on this date:

{{< highlight javascript "hl_lines=5 23 40 44" >}}
...

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages(new Date());
  }

  app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
});

const createUsersWithMessages = async date => {
  await models.User.create(
    {
      username: 'rwieruch',
      email: 'hello@robin.com',
      password: 'rwieruch',
      role: 'ADMIN',
      messages: [
        {
          text: 'Published the Road to learn React',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: 'ddavids',
      email: 'hello@david.com',
      password: 'ddavids',
      messages: [
        {
          text: 'Happy to release ...',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
        {
          text: 'Published a complete ...',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};
{{< /highlight >}}

That's it for the cursor which will be the creation date of each message. Now, let's advance the previous pagination to cursor-based pagination in the *src/schema/message.js* file. You only need to exchange the offset with the cursor. So instead of having an offset which can only be matched implicitly to an item in a list (and changes once an item is deleted from the list), the cursor has a stable position within the list, because the creation dates of the messages will not change.

{{< highlight javascript "hl_lines=5" >}}
import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    messages(cursor: String, limit: Int): [Message!]!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type Message {
    id: ID!
    text: String!
    createdAt: String!
    user: User!
  }
`;
{{< /highlight >}}

As you have adjusted the schema for the messages, you need to reflect the change in your *src/resolvers/message.js* file too:

{{< highlight javascript "hl_lines=1 7 10 11 12 13 14" >}}
import Sequelize from 'sequelize';

...

export default {
  Query: {
    messages: async (parent, { cursor, limit = 100 }, { models }) => {
      return await models.Message.findAll({
        limit,
        where: {
          createdAt: {
            [Sequelize.Op.lt]: cursor,
          },
        },
      });
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findById(id);
    },
  },

  Mutation: {
    ...
  },

  ...
};
{{< /highlight >}}

Instead of using the offset, you are using the cursor which is the `createdAt` property of a message. When using Sequelize (but also any other ORM), it is possible to add a clause to find all items in a list by a starting property (here `createdAt`) with less than (`lt`) or greater than (`gt`, which is not used here) values for this property. In this case, when providing a date as a cursor, the where clause finds all messages **before** this date, because there is the `lt` Sequelize operator.

There are two more improvements for making it more robust:

{{< highlight javascript "hl_lines=7 9 10 15" >}}
...

export default {
  Query: {
    messages: async (parent, { cursor, limit = 100 }, { models }) => {
      return await models.Message.findAll({
        order: [['createdAt', 'DESC']],
        limit,
        where: cursor
          ? {
              createdAt: {
                [Sequelize.Op.lt]: cursor,
              },
            }
          : null,
      });
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findById(id);
    },
  },

  Mutation: {
    ...
  },

  ...
};
{{< /highlight >}}

First, the list should be ordered by `createdAt` date, because otherwise the cursor wouldn't help you any way. However, when the list is ordered, you can be sure that requesting the first page of messages without a cursor will lead into the most recent messages. When requesting the next page with the cursor of the last message's creation date from the previous page, you should get the next page of messages ordered by creation date. That's how you can move page by page through the list of messages.

Second, the ternary operator for the cursor makes sure that the cursor isn't needed for the first page request. As mentioned, the first page only retrieves the most recent messages in the list. Then you can use the creation date of the last message as cursor for the next page of messages.

Moreover, you could extract the where clause from the database query too:

{{< highlight javascript "hl_lines=6 7 8 9 10 11 12 13 14 19" >}}
...

export default {
  Query: {
    messages: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: cursor,
              },
            },
          }
        : {};

      return await models.Message.findAll({
        order: [['createdAt', 'DESC']],
        limit,
        ...cursorOptions,
      });
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findById(id);
    },
  },

  Mutation: {
    ...
  },

  ...
};
{{< /highlight >}}

Now, you should give it a shot yourself in GraphQL Playground. For instance, make the first request to request the most recent messages:

{{< highlight javascript >}}
query {
  messages(limit: 2) {
    text
    createdAt
  }
}
{{< /highlight >}}

Which may lead to something like this (be careful, dates should be different from your dates):

{{< highlight javascript >}}
{
  "data": {
    "messages": [
      {
        "text": "Published a complete ...",
        "createdAt": "Wed Aug 22 2018 11:43:44 GMT+0200 (CEST)"
      },
      {
        "text": "Happy to release ...",
        "createdAt": "Wed Aug 22 2018 11:43:43 GMT+0200 (CEST)"
      }
    ]
  }
}
{{< /highlight >}}

Now you can use the `createdAt` date from the last page to request the next page of messages with a cursor:

{{< highlight javascript >}}
query {
  messages(limit: 2, cursor: "Wed Aug 22 2018 11:43:43 GMT+0200 (CEST)") {
    text
    createdAt
  }
}
{{< /highlight >}}

It should give you the last message from the seed data, but not more even though the limit is set to 2, because there are only 3 messages in the database and you already have retrieved 2 of them in the previous page:

{{< highlight javascript >}}
{
  "data": {
    "messages": [
      {
        "text": "Published the Road to learn React",
        "createdAt": "Wed Aug 22 2018 11:43:42 GMT+0200 (CEST)"
      }
    ]
  }
}
{{< /highlight >}}

That's the basic implementation of a cursor-based pagination when using the creation date of an item as a stable identifier. Using the creation date is a common approach for this, but there may be alternatives to explore for you as well.

{{% sub_chapter_header "Cursor-based Pagination: Page Info, Connections and Hashes" "cursor-based-pagination-page-info-connections-hashes" %}}

In this last section about pagination in GraphQL, you will advance the cursor-based pagination with a few improvements. As for now, you always have to query all creation dates of the messages in order to use the creation date of the last message for the next page as cursor. So what if you could have the creation date of the last message as meta information? That's where GraphQL connections come into play which add only a structural change to your list fields in GraphQL. Let's use such a GraphQL connection in the *src/schema/message.js* file:

{{< highlight javascript "hl_lines=5 14 15 16 17 19 20 21" >}}
import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    messages(cursor: String, limit: Int): MessageConnection!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type MessageConnection {
    edges: [Message!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    endCursor: String!
  }

  type Message {
    id: ID!
    text: String!
    createdAt: String!
    user: User!
  }
`;
{{< /highlight >}}

Basically you introduce an intermediate layer which holds meta information, which is done with the PageInfo type here, and has the list of items in an edges field. In the intermediate layer, you can introduce the new information such as an `endCursor` (`createdAt` of the last message in the list). Then you don't need to query every `createdAt` date of every message anymore but only the `endCursor`. Let's see how this looks like in the *src/resolvers/message.js* file:

{{< highlight javascript "hl_lines=16 22 23 24 25 26 27" >}}
...

export default {
  Query: {
    messages: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: cursor,
              },
            },
          }
        : {};

      const messages = await models.Message.findAll({
        order: [['createdAt', 'DESC']],
        limit,
        ...cursorOptions,
      });

      return {
        edges: messages,
        pageInfo: {
          endCursor: messages[messages.length - 1].createdAt,
        },
      };
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findById(id);
    },
  },

  Mutation: {
    ...
  },

  ...
};
{{< /highlight >}}

You only give your returned result a new structure with the intermediate `edges` and `pageInfo` fields. The `pageInfo` then has the cursor of the last message in the list. Now you should be able to query the first page the following way:

{{< highlight javascript >}}
query {
  messages(limit: 2) {
    edges {
      text
    }
    pageInfo {
      endCursor
    }
  }
}
{{< /highlight >}}

Whereas the result may look like the following:

{{< highlight javascript >}}
{
  "data": {
    "messages": {
      "edges": [
        {
          "text": "Published a complete ..."
        },
        {
          "text": "Happy to release ..."
        }
      ],
      "pageInfo": {
        "endCursor": "Wed Aug 22 2018 12:27:24 GMT+0200 (CEST)"
      }
    }
  }
}
{{< /highlight >}}

And you can use the last cursor to query the next page:

{{< highlight javascript >}}
query {
  messages(limit: 2, cursor: "Wed Aug 22 2018 12:27:24 GMT+0200 (CEST)") {
    edges {
      text
    }
    pageInfo {
      endCursor
    }
  }
}
{{< /highlight >}}

Which will again only return you the remaining last message in the list. Now you are not required anymore to query the creation date of every message but instead only query the one necessary cursor the last message. In the end, the client application doesn't have to know the implementation details of having to use the cursor of the last message. It only needs to use the `endCursor` now.

Since you already have introduced the intermediate GraphQL connection layer, you can add another beneficial information there. Sometimes a GraphQL client needs to know whether there are more pages of a list to query, because every list is finite. So let's add this information to the schema for the message's connection in the *src/schema/message.js* file:

{{< highlight javascript "hl_lines=20" >}}
import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    messages(cursor: String, limit: Int): MessageConnection!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type MessageConnection {
    edges: [Message!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  ...
`;
{{< /highlight >}}

In the resolver in the *src/resolvers/message.js* file, you can find out about this information with the following implementation:

{{< highlight javascript "hl_lines=10 14 15 18 20 21" >}}
...

export default {
  Query: {
    messages: async (parent, { cursor, limit = 100 }, { models }) => {
      ...

      const messages = await models.Message.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      });

      const hasNextPage = messages.length > limit;
      const edges = hasNextPage ? messages.slice(0, -1) : messages;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: edges[edges.length - 1].createdAt,
        },
      };
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findById(id);
    },
  },

  Mutation: {
    ...
  },

  ...
};
{{< /highlight >}}

You only retrieve one more message than defined in the limit. If the list of messages is longer than the limit, then there is a next page. Otherwise there is no next page. Furthermore, you return only the limited messages or all messages in case there is no next page anymore. Now you should be able to include the `hasNextPage` field in the `pageInfo` field. If you query messages with a limit of 2 and no cursor, you should get true for the `hasNextPage` field (in case you are using the seed data). Otherwise, if query messages with a limit of more than 2 and no cursor, you should get false for the `hasNextPage` field. Then your GraphQL client application knows that the list has reached its end.

The last improvements have given your GraphQL client application a more straight forward GraphQL API. The client doesn't need to know about the cursor being the last creation date of a message in a list. It only uses the `endCursor` as `cursor` argument for the next page. However, the cursor is still a creation date property which may lead to confusion on the GraphQL client side. The client shouldn't care about the format or the actual value of the cursor. So let's mask the cursor with a hash function. In this case, it uses a base64 encoding:

{{< highlight javascript "hl_lines=3 5 6 15 27 28 29" >}}
...

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    messages: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor),
              },
            },
          }
        : {};

      ...

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.toString(),
          ),
        },
      };
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findById(id);
    },
  },

  Mutation: {
    ...
  },

  ...
};
{{< /highlight >}}

The returned cursor as meta information is hashed by the new utility function. Don't forget to stringify the date before hashing it. Then the GraphQL client (try it yourself with your GraphQL Playground) receives a hashed `endCursor` field. The hashed value can be used as cursor the query the next page. In the resolver then, the incoming cursor is reverse hashed to convert it to the actual date which is used for the database query.

The hashing of the cursor is a common approach for cursor-based pagination, because it hides the implementation details from the client. The (GraphQL) client application only needs to use the hash value as cursor to query the next paginated page.

### Exercises:

* read more about {{% a_blank "GraphQL pagination" "https://graphql.github.io/learn/pagination/" %}}

{{% chapter_header "GraphQL Subscriptions" "graphql-subscriptions" %}}

So far, you have used GraphQL to read and write data with queries and mutations. These are the two essential GraphQL operations to get a GraphQL server up and running for CRUD operations. Next you will learn about GraphQL Subscriptions for real-time communication between GraphQL client and server.

In the following you are going to implement a real-time communication for created messages. If one user creates a message, another user should get this message in a GraphQL client application as real-time update. To start, we need to add the Subscription root level type to the *src/schema/message.js* schema:

{{< highlight javascript "hl_lines=21 22 23 25 26 27" >}}
import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    ...
  }

  extend type Mutation {
    ...
  }

  ...

  type Message {
    id: ID!
    text: String!
    createdAt: String!
    user: User!
  }

  extend type Subscription {
    messageCreated: MessageCreated!
  }

  type MessageCreated {
    message: Message!
  }
`;
{{< /highlight >}}

As a naive GraphQL consumer, a subscription works similar to a GraphQL query. The only difference is that the subscription emits changes (events) over time. In this case, every time a message is created the GraphQL client who subscribed to this Subscription receives the created message as payload. A subscription from a GraphQL client could look like the following for the previously implemented schema:

{{< highlight javascript >}}
subscription {
  messageCreated {
    message {
      id
      text
      createdAt
      user {
        id
        username
      }
    }
  }
}
{{< /highlight >}}

Now the implementation of this particular subscription. In the first part, you will setup the subscription architecture for your application. Afterward, you will add the implementation details for the created message subscription. While you have to do the former only once, the latter will be a repetitive doing when adding more GraphQL subscriptions to your application.

{{% sub_chapter_header "Apollo Server Subscription Setup" "apollo-server-subscriptions" %}}

Because we are using Express as middleware, you need to expose the subscriptions with an advanced HTTP server setup in the *src/index.js* file:

{{< highlight javascript "hl_lines=1 7 8 17" >}}
import http from 'http';

...

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages(new Date());
  }

  httpServer.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
});

...
{{< /highlight >}}

Regarding the context which is passed to the resolvers, you can distinguish, in the same file, between HTTP requests (GraphQL mutations and queries) and subscriptions. Whereas the HTTP requests come with a req (and res) object, the subscription comes with a connection object. Thus, you can pass at least the models as data access layer for the subscription's context. You will not need more for now.

{{< highlight javascript "hl_lines=7 8 9 10 11 12 14 22" >}}
...

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  ...
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
      };
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        secret: process.env.SECRET,
      };
    }
  },
});

...
{{< /highlight >}}

Last but not least, for the sake of completing the overarching subscription setup, you have to use one of the available {{% a_blank "PubSub engines" "https://www.apollographql.com/docs/apollo-server/v2/features/subscriptions.html#PubSub-Implementations" %}} for publishing and subscribing to events. Apollo Server comes with its own default, but you can check the referenced link for other options. In a new *src/subscription/index.js* file, add the following implementation:

{{< highlight javascript >}}
import { PubSub } from 'apollo-server';

export default new PubSub();
{{< /highlight >}}

This PubSub instance is your API which enables subscriptions in your application. The overarching setup for subscriptions is done now.

{{% sub_chapter_header "Subscribing and Publishing with PubSub" "apollo-server-pub-sub" %}}

Let's implement the specific subscription for the message creation. It should be possible for another GraphQL client to listen to message creations. For instance, in a chat application it should be possible to see a message of someone else in real-time. Therefore, extend the previous *src/subscription/index.js* file with the following implementation:

{{< highlight javascript "hl_lines=3 5 6 7" >}}
import { PubSub } from 'apollo-server';

import * as MESSAGE_EVENTS from './message';

export const EVENTS = {
  MESSAGE: MESSAGE_EVENTS,
};

export default new PubSub();
{{< /highlight >}}

And add your first event in a new *src/subscription/message.js* file which is already used in the previous file:

{{< highlight javascript >}}
export const CREATED = 'CREATED';
{{< /highlight >}}

This folder structure already enables you to separate your events on a domain level. By exporting all events with their domains, you can simply import all events somewhere else and make use of the domain specific events there.

The only piece missing is using this event and the PubSub instance in your message resolver. In the beginning of this section, you have already added the new subscription to the message schema. Now you have to implement the counterpart in the *src/resolvers/message.js* file again:

{{< highlight javascript "hl_lines=3 20 21 22 23 24" >}}
...

import pubsub, { EVENTS } from '../subscription';

...

export default {
  Query: {
    ...
  },

  Mutation: {
    ...
  },

  Message: {
    ...
  },

  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED),
    },
  },
};
{{< /highlight >}}

The subscribe's function signature has access to the same arguments as the other resolver functions. So if you would need to access the models from the context, you could do it here. But it isn't necessary for this particular implementation.

Basically that's the subscription as resolver which fulfils the requirement of being the counterpart of the subscription in the message schema. However, since it uses a publisher-subscriber mechanism (PubSub) for events, you have only implemented the subscribing part but not the publishing part. It is possible for a GraphQL client to listen to changes, but there are no changes published yet. The best place for publishing a newly created message is in the same file when actually creating a message:

{{< highlight javascript "hl_lines=16 21 22 23 25" >}}
...

import pubsub, { EVENTS } from '../subscription';

...

export default {
  Query: {
    ...
  },

  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { models, me }) => {
        const message = await models.Message.create({
          text,
          userId: me.id,
        });

        pubsub.publish(EVENTS.MESSAGE.CREATED, {
          messageCreated: { message },
        });

        return message;
      },
    ),

    ...
  },

  Message: {
    ...
  },

  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED),
    },
  },
};
{{< /highlight >}}

That's it. You have implemented your first subscription in GraphQL with Apollo Server and PubSub. In order to test it, you need to create a new message. Therefore you need to login a user too, because otherwise you are not authorized to create a message. My recommendation would be to step through the following GraphQL operations in two tabs in GraphQL Playground. In the first tab, execute the subscription:

{{< highlight javascript >}}
subscription {
  messageCreated {
    message {
      id
      text
      createdAt
      user {
        id
        username
      }
    }
  }
}
{{< /highlight >}}

You should see some indicator that the tab is listening to changes now. In the second tab, login a user:

{{< highlight javascript >}}
mutation {
  signIn(login: "rwieruch", password: "rwieruch") {
    token
  }
}
{{< /highlight >}}

Grab the token from the result and paste it to the HTTP headers panel in the same tab (your token should differ from mine):

{{< highlight javascript >}}
{
  "x-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJoZWxsb0Byb2Jpbi5jb20iLCJ1c2VybmFtZSI6InJ3aWVydWNoIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNTM0OTQ3NTYyLCJleHAiOjE1MzQ5NDkzNjJ9.mg4M6SfYPJkGf_Z2Zr7ztGNbDRDLksRWdhhDvTbmWbQ"
}
{{< /highlight >}}

Then create a message in the second tab:

{{< highlight javascript >}}
mutation {
  createMessage(text: "Does my subscription work?") {
    text
  }
}
{{< /highlight >}}

Afterward, check your first tab again. It should show the created message:

{{< highlight javascript >}}
{
  "data": {
    "messageCreated": {
      "message": {
        "id": "4",
        "text": "Does my subscription work?",
        "createdAt": "Wed Aug 22 2018 16:22:41 GMT+0200 (CEST)",
        "user": {
          "id": "1",
          "username": "rwieruch"
        }
      }
    }
  }
}
{{< /highlight >}}

Congratulations. You have implemented GraphQL subscriptions! It's not so easy to wrap your head around them, but once you get used to them and you know what you want to achieve, you can use them to create real-time GraphQL applications.

### Exercises:

* read more about {{% a_blank "Subscriptions with Apollo Server" "https://www.apollographql.com/docs/apollo-server/v2/features/subscriptions.html" %}}
* watch a talk about {{% a_blank "GraphQL Subscriptions" "http://youtu.be/bn8qsi8jVew" %}}

<hr class="section-divider">

Over the last sections, you have built a sophisticated GraphQL server boilerplate project with Express and Apollo Server. Even though GraphQL isn't opinionated about various things, you should have a learned about topics such as authentication, authorization, database access, and pagination now. Most of the things were more straight forward because of using Apollo Server over the GraphQL reference implementation in JavaScript. That's okay, because many people are using Apollo Server nowadays for building their GraphQL servers. You can see this application as starter project to realize your own ideas. You can find the whole starter project with a GraphQL client built in React in {{% a_blank "this GitHub repository" "https://github.com/rwieruch/fullstack-apollo-react-express-boilerplate-project" %}}. My recommendation would be to continue implementing more features for the project to make your own ideas happen or to implement a GraphQL client application with React for it.

{{% read_more "A complete React with Apollo and GraphQL Tutorial" "https://www.robinwieruch.de/react-graphql-apollo-tutorial/" %}}
