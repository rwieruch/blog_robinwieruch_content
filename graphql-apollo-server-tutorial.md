+++
title = "GraphQL Server Tutorial with Apollo Server and Express"
description = "Learn how to build a GraphQL server with Apollo Server and Express with authentication, authorization, pagination, subscription, database access, tests ..."
date = "2018-08-22T13:50:46+02:00"
tags = ["React", "GraphQL", "Apollo", "JavaScript"]
categories = ["React", "GraphQL", "Apollo", "JavaScript"]
keywords = ["graphql apollo server", "graphql express server", "graphql apollo server tutorial", "graphql apollo server book", "apollo server example", "apollo server query", "apollo server mutation", "apollo server", "apollo server demo", "graphql dataloader", "graphql authorization", "graphql authentication", "graphql caching"]
news_keywords = ["graphql apollo server", "graphql express server", "graphql apollo server tutorial", "graphql apollo server book", "apollo server example", "apollo server query", "apollo server mutation", "apollo server", "apollo server demo", "graphql dataloader", "graphql authorization", "graphql authentication", "graphql caching"]
hashtag = "#ReactJs #GraphQL"
card = "img/posts/graphql-apollo-server-tutorial/banner_640.jpg"
banner = "img/posts/graphql-apollo-server-tutorial/banner.jpg"
contribute = "graphql-apollo-server-tutorial.md"
headline = "GraphQL Server Tutorial with Apollo Server and Express"

summary = "Learn how to build a fully working GraphQL server with Apollo Server and Express with authentication, authorization, pagination, subscription, database access."
+++

{{% sponsorship %}}

{{% pin_it_image "graphql server apollo tutorial" "img/posts/graphql-apollo-server-tutorial/banner.jpg" "is-src-set" %}}

{{% react-graphql-book %}}

{{% read_before_3 "This tutorial is part 4 of 4 in this series." "Part 1:" "Why GraphQL: Advantages, Disadvantages & Alternatives" "https://www.robinwieruch.de/why-graphql-advantages-disadvantages-alternatives/" "Part 2:" "Why Apollo: Advantages, Disadvantages & Alternatives" "https://www.robinwieruch.de/why-apollo-advantages-disadvantages-alternatives/" "Part 3:" "The minimal Node.js with Babel Setup" "https://www.robinwieruch.de/minimal-node-js-babel-setup" %}}

In this chapter, you will implement server-side architecture using GraphQL and Apollo Server. The GraphQL query language is implemented as a reference implementation in JavaScript by Facebook, while Apollo Server builds on it to simplify building GraphQL servers in JavaScript. Since GraphQL is a query language, its transport layer and data format is not set in stone. GraphQL isn't opinionated about it, but it is used as alternative to the popular REST architecture for client-server communication over HTTP with JSON.

In the end, you should have a fully working GraphQL server boilerplate project that implements authentication, authorization, a data access layer with a database, domain specific entities such as users and messages, different pagination strategies, and real-time abilities due to subscriptions. You can find a working solution of it, as well as a working client-side application in React, in this GitHub repository: {{% a_blank "Full-stack Apollo with React and Express Boilerplate Project" "https://github.com/rwieruch/fullstack-apollo-react-express-boilerplate-project" %}}. I consider it an ideal starter project to realize your own idea.

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
* [GraphQL Custom Scalars in Apollo Server](#apollo-server-graphql-custom-scalar)
* [Pagination in GraphQL with Apollo Server](#apollo-server-pagination)
  * [Offset/Limit Pagination with Apollo Server and GraphQL](#apollo-server-offset-limit-pagination)
  * [Cursor-based Pagination with Apollo Server and GraphQL](#apollo-server-cursor-based-pagination)
  * [Cursor-based Pagination: Page Info, Connections and Hashes](#cursor-based-pagination-page-info-connections-hashes)
* [GraphQL Subscriptions](#graphql-subscriptions)
  * [Apollo Server Subscription Setup](#apollo-server-subscriptions)
  * [Subscribing and Publishing with PubSub](#apollo-server-pub-sub)
* [Testing a GraphQL Server](#graphql-server-testing)
  * [GraphQL Server E2E Test Setup](#graphql-server-e2e-test-setup)
  * [Testing User Scenarios with E2E Tests](#graphql-server-test-api)
* [Batching and Caching in GraphQL with Data Loader](#graphql-server-data-loader-caching-batching)
* [GraphQL Server + PostgreSQL Deployment to Heroku](#graphql-server-postgresql-deployment-heroku)
  * [Heroku Troubleshoot](#heroku-troubleshoot)

{{% chapter_header "Apollo Server Setup with Express" "apollo-server-setup-express" %}}

There are two ways to start out with this application. You can follow my guidance in [this minimal Node.js setup guide step by step](https://www.robinwieruch.de/minimal-node-js-babel-setup) or you can find a starter project in this {{% a_blank "GitHub repository" "https://github.com/rwieruch/node-babel-server" %}} and follow its installation instructions.

Apollo Server can be used with several popular libraries for Node.js like Express, Koa, Hapi. It is kept library agnostic, so it's possible to connect it with many different third-party libraries in client and server applications. In this application, you will use {{% a_blank "Express" "https://expressjs.com/" %}}, because it is the most popular and common middleware library for Node.js.

Install these two dependencies to the *package.json* file and *node_modules* folder:

{{< highlight javascript >}}
npm install apollo-server apollo-server-express --save
{{< /highlight >}}

As you can see by the library names, you can use any other middleware solution (e.g. Koa, Hapi) to complement your standalone Apollo Server. Apart from these libraries for Apollo Server, you need the core libraries for Express and GraphQL:

{{< highlight javascript >}}
npm install express graphql --save
{{< /highlight >}}

Now every library is set to get started with the source code in the *src/index.js* file. First, you have to import the necessary parts for getting started with Apollo Server in Express:

{{< highlight javascript >}}
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
{{< /highlight >}}

Second, use both imports for initializing your Apollo Server with Express:

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

Using Apollo Server's `applyMiddleware()` method, you can opt-in any middleware, which in this case is Express. Also, you can specify the path for your GraphQL API endpoint. Beyond this, you can see how the Express application gets initialized. The only missing items are the definition for the schema and resolvers for creating the Apollo Server instance. We'll implement them first and learn about them after:

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

The **GraphQL schema** provided to the Apollo Server is all the available data for reading and writing data via GraphQL. It can happen from any client who consumes the GraphQL API. The schema consists of **type definitions**, starting with a mandatory top level **Query type** for reading data, followed by **fields** and **nested fields**. In the schema from the Apollo Server setup, you have defined a `me` field, which is of the **object type** `User`. In this case, a User type has only a `username` field, a **scalar type**. There are various scalar types in the GraphQL specification for defining strings (String), booleans (Boolean), integers (Int), and more. At some point, the schema has to end at its leaf nodes with scalar types to resolve everything properly. Think about it as similar to a JavaScript object with objects or arrays inside, except it requires primitives like strings, booleans, or integers at some point.

{{< highlight javascript >}}
const data = {
  me: {
    username: 'Robin Wieruch',
  },
};
{{< /highlight >}}

In the GraphQL schema for setting up an Apollo Server, **resolvers** are used to return data for fields from the schema. The data source doesn't matter, because the data can be hardcoded, can come from a database, or from another (RESTful) API endpoint. You will learn more about potential data sources later. For now, it only matters that the resolvers are agnostic according to where the data comes from, which separates GraphQL from your typical database query language. Resolvers are functions that resolve data for your GraphQL fields in the schema. In the previous example, only a user object with the username "Robin Wieruch" gets resolved from the `me` field.

Your GraphQL API with Apollo Server and Express should be working now. On the command line, you can always start your application with the `npm start` script to verify it works after you make changes. To verify it without a client application, Apollo Server comes with GraphQL Playground, a built-in client for consuming GraphQL APIs. It is found by using a GraphQL API endpoint in a browser at `http://localhost:8000/graphql`. In the application, define your first GraphQL query to see its result:

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

I might not mention GraphQL Playground as much moving forward, but I leave it to you to verify your GraphQL API with it after you make changes. It is useful tool to experiment and explore your own API. Optionally, you can also add {{% a_blank "CORS" "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" %}} to your Express middleware. First, install CORS on the command line:

{{< highlight javascript >}}
npm install cors --save
{{< /highlight >}}

Second, use it in your Express middleware:

{{< highlight javascript "hl_lines=1 7" >}}
import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

app.use(cors());

...
{{< /highlight >}}

CORS is needed to perform HTTP requests from another domain than your server domain to your server. Otherwise you may run into cross-origin resource sharing errors for your GraphQL server.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project/tree/b6468a84ad77018bf940d951016b7e2c1e07404f" %}}
* Read more about {{% a_blank "GraphQL" "https://graphql.org/learn" %}}
* Experiment with the schema and the resolver
  * Add more fields to the user type
  * Fulfill the requirements in the resolver
  * Query your fields in the GraphQL Playground
* Read more about {{% a_blank "Apollo Server Standalone" "https://www.apollographql.com/docs/apollo-server/v2/getting-started.html" %}}
* Read more about {{% a_blank "Apollo Server in Express Setup" "https://www.apollographql.com/docs/apollo-server/v2/essentials/server.html" %}}

{{% chapter_header "Apollo Server: Type Definitions" "apollo-server-type-definitions" %}}

This section is all about GraphQL type definitions and how they are used to define the overall GraphQL schema. A GraphQL schema is defined by its types, the relationships between the types, and their structure. Therefore GraphQL uses a **Schema Definition Language (SDL)**. However, the schema doesn't define where the data comes from. This responsibility is handled by resolvers outside of the SDL. When you used Apollo Server before, you used a User object type within the schema and defined a resolver which returned a user for the corresponding `me` field.

Note the exclamation point for the `username` field in the User object type. It means that the `username` is a **non-nullable** field. Whenever a field of type User with a `username` is returned from the GraphQL schema, the user has to have a `username`. It cannot be undefined or null. However, there isn't an exclamation point for the user type on the `me` field. Does it mean that the result of the `me` field can be null? That is the case for this particular scenario. There shouldn't be always a user returned for the `me` field, because a server has to know what the field contains before it can respond. Later, you will implement an authentication mechanism (sign up, sign in, sign out) with your GraphQL server. The `me` field is populated with a user object like account details only when a user is authenticated with the server. Otherwise, it remains null. When you define GraphQL type definitions, there must be conscious decisions about the types, relationships, structure and (non-null) fields.

We extend the schema by extending or adding more type definitions to it, and use **GraphQL arguments** to handle user fields:

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

**GraphQL arguments** can be used to make more fine-grained queries because you can provide them to the GraphQL query. Arguments can be used on a per-field level with parentheses. You must also define the type, which in this case is a non-nullable identifier to retrieve a user from a data source. The query returns the User type, which can be null because a user entity might not be found in the data source when providing a non identifiable `id` for it. Now you can see how two queries share the same GraphQL type, so when adding fields to the it, a client can use them implicitly for both queries `id` field:

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

You may be wondering about the ID scalar type. The ID denotes an identifier used internally for advanced features like caching or refetching. It is a superior string scalar type. All that's missing from the new GraphQL query is the resolver, so we'll add it to the map of resolvers with sample data:

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

Second, make use of the incoming `id` argument from the GraphQL query to decide which user to return. All the arguments can be found in the second argument in the resolver function's signature:

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

The first argument is called `parent` as well, but you shouldn't worry about it for now. Later, it will be showcased where it can be used in your resolvers. Now, to make the example more realistic, extract a map of sample users and return a user based on the `id` used as a key in the extracted map:

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

Now try out your queries in GraphQL Playground:

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

Querying a list of of users will be our third query. First, add the query to the schema again:

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

In this case, the `users` field returns a list of users of type User, which is denoted with the square brackets. Within the list, no user is allowed to be null, but the list itself can be null in case there are no users (otherwise, it could be also `[User!]!`). Once you add a new query to your schema, you are obligated to define it in your resolvers within the Query object:

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

You have three queries that can be used in your GraphQL client (e.g. GraphQL Playground) applications. All of them operate on the same User type to fulfil the data requirements in the resolvers, so each query has to have a matching resolver. All queries are grouped under one unique, mandatory Query type, which lists all available GraphQL queries exposed to your clients as your GraphQL API for reading data. Later, you will learn about the Mutation type, for grouping a GraphQL API for writing data.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project/tree/469080f810a0049442f02393fae746cebc391cc0" %}}
* Read more about {{% a_blank "the GraphQL schema with Apollo Server" "https://www.apollographql.com/docs/apollo-server/v2/essentials/schema.html" %}}
* Read more about {{% a_blank "the GraphQL mindset: Thinking in Graphs" "https://graphql.github.io/learn/thinking-in-graphs/" %}}
* Read more about {{% a_blank "nullability in GraphQL" "https://blog.apollographql.com/using-nullability-in-graphql-2254f84c4ed7" %}}

{{% chapter_header "Apollo Server: Resolvers" "apollo-server-resolvers" %}}

This section continuous with the GraphQL schema in Apollo Server, but transitions more to the resolver side of the subject. In your GraphQL type definitions you have defined types, their relations and their structure. But there is nothing about how to get the data. That's where the GraphQL resolvers come into play.

In JavaScript, the resolvers are grouped in a JavaScript object, often called a **resolver map**. Each top level query in your Query type has to have a resolver. Now, we'll resolve things on a per-field level.

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

Once you start your application again and query for a list of users, every user should have an identical username.

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

The GraphQL resolvers can operate more specifically on a per-field level. You can override the username of every User type by resolving a `username` field. Otherwise, the default `username` property of the user entity is taken for it. Generally this applies to every field. Either you decide specifically what the field should return in a resolver function or GraphQL tries to fallback for the field by retrieving the property automatically from the JavaScript entity.

Let's evolve this a bit by diving into the function signatures of resolver functions. Previously, you have seen that the second argument of the resolver function is the incoming arguments of a query. That's how you were able to retrieve the `id` argument for the user from the Query. The first argument is called the parent or root argument, and always returns the previously resolved field. Let's check this for the new username resolver function.

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

When you query your list of users again in a running application, all usernames should complete correctly. That's because GraphQL first resolves all users in the `users` resolver, and then goes through the User's `username` resolver for each user. Each user is accessible as the first argument in the resolver function, so they can be used to access more properties on the entity. You can rename your parent argument to make it more explicit:

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

In this case, the `username` resolver function is redundant, because it only mimics the default behavior of a GraphQL resolver. If you leave it out, the username would still resolves with its correct property. However, this fine control over the resolved fields opens up powerful possibilities. It gives you the flexibility to add data mapping without worrying about the data sources behind the GraphQL layer. Here, we expose the full username of a user, a combination of its first and last name by using template literals:

{{< highlight javascript "hl_lines=5" >}}
const resolvers = {
  ...

  User: {
    username: user => `${user.firstname} ${user.lastname}`,
  },
};
{{< /highlight >}}

For now, we are going to leave out the `username` resolver, because it only mimics the default behavior with Apollo Server. These are called **default resolvers**, because they work without explicit definitions. Next, look to the other arguments in the function signature of a GraphQL resolver:

{{< highlight javascript >}}
(parent, args, context, info) => { ... }
{{< /highlight >}}

The context argument is the third argument in the resolver function used to inject dependencies from the outside to the resolver function. Assume the signed-in user is known to the outside world of your GraphQL layer because a request to your GraphQL server is made and the authenticated user is retrieved from elsewhere. You might decide to inject this signed in user to your resolvers for application functionality, which is done with with the `me` user for the `me` field. Remove the declaration of the `me` user (`let me = ...`) and pass it in the context object when Apollo Server gets initialized instead:

{{< highlight javascript "hl_lines=4 5 6" >}}
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
  },
});
{{< /highlight >}}

Next, access it in the resolver's function signature as a third argument, which gets destructured into the `me` property from the context object.

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

The context should be the same for all resolvers now. Every resolver that needs to access the context, or in this case the `me` user, can do so using the third argument of the resolver function.

The fourth argument in a resolver function, the info argument, isn't used very often, because it only gives you internal information about the GraphQL request. It can be used for debugging, error handling, advanced monitoring, and tracking. You don't need to worry about it for now.

A couple of words about the a resolver's return values: a resolver can return arrays, objects and scalar types, but it has to be defined in the matching type definitions. The type definition has to define an array or non-nullable field to have the resolvers working appropriately. What about JavaScript promises? Often, you will make a request to a data source (database, RESTful API) in a resolver, returning a JavaScript promise in the resolver. GraphQL can deal with it, and waits for the promise to resolve. That's why you don't need to worry about asynchronous requests to your data source later.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project/tree/5d8ebc22260455ac6803af20838cbc1f2636be8f" %}}
* Read more about {{% a_blank "GraphQL resolvers in Apollo" "https://www.apollographql.com/docs/apollo-server/v2/essentials/data.html" %}}

{{% chapter_header "Apollo Server: Type Relationships" "apollo-server-type-relationship" %}}

You started to evolve your GraphQL schema by defining queries, mutations, and type definitions. In this section, let's add a second GraphQL type called Message and see how it behaves with your User type. In this application, a user can have messages. Basically, you could write a simple chat application with both types. First, add two new top level queries and the new Message type to your GraphQL schema:

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

Second, you have to add two resolvers for Apollo Server to match the two new top level queries:

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

Once you run your application again, your new GraphQL queries should work in GraphQL playground. Now we'll add relationships to both GraphQL types. Historically, it was common with REST to add an identifier to each entity to resolve its relationship.

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

With GraphQL, Instead of using an identifier and resolving the entities with multiple waterfall requests, you can use the User entity within the message entity directly:

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

Since a message doesn't have a user entity in your model, the default resolver doesn't work. You need to set up an explicit resolver for it.

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
    user: (parent, args, { me }) => {
      return me;
    },
  },
};
{{< /highlight >}}

In this case, every message is written by the authenticated `me` user. If you query the following about messages, you will get this result:

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

Let's make the behavior more like in a real world application. Your sample data needs keys to reference entities to each other, so the message passes a `userId` property:

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

The parent argument in your resolver function can be used to get a message's `userId`, which can then be used to retrieve the appropriate user.

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

Now every message has its own dedicated user. The last steps were crucial for understanding GraphQL. Even though you have default resolver functions or this fine-grained control over the fields by defining your own resolver functions, it is up to you to retrieve the data from a data source. The developer makes sure every field can be resolved. GraphQL lets you group those fields into one GraphQL query, regardless of the data source.

Let's recap this implementation detail again with another relationship that involves user messages. In this case, the relationships go in the other direction.

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

This sample data could come from any data source. The important part is that it has a key that defines a relationship to another entity. All of this is independent from GraphQL, so let's define the relationship from users to their messages in GraphQL.

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

Since a user entity doesn't have messages, but message identifiers, you can write a custom resolver for the messages of a user again. In this case, the resolver retrieves all messages from the user from the list of sample messages.

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

This section has shown you how to expose relationships in your GraphQL schema. If the default resolvers don't work, you have to define your own custom resolvers on a per field level for resolving the data from different data sources.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project/tree/491d93a90f4ee3413d9226e0a18c10b7407949ef" %}}
* Query a list of users with their messages
* Query a list of messages their user
* Read more about {{% a_blank "the GraphQL schema" "https://graphql.github.io/learn/schema/" %}}

{{% chapter_header "Apollo Server: Queries and Mutations" "apollo-server-queries-mutations" %}}

So far, you have only defined queries in your GraphQL schema using two related GraphQL types for reading data. These should work in GraphQL Playground, because you have given them equivalent resolvers. Now we'll cover GraphQL mutations for writing data. In the following, you create two mutations: one to create a message, and one to delete it. Let's start with creating a message as the currently signed in user (the `me` user).

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

Apart from the Query type, there are also Mutation and Subscription types. There, you can group all your GraphQL operations for writing data instead of reading it. In this case, the `createMessage` mutation accepts a non-nullable `text` input as an argument, and returns the created message. Again, you have to implement the resolver as counterpart for the mutation the same as with the previous queries, which happens in the mutation part of the resolver map:

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

The mutation's resolver has access to the text in its second argument. It also has access to the signed-in user in the third argument, used to associate the created message with the user. The parent argument isn't used. The one thing missing to make the message complete is an identifier. To make sure a unique identifier is used, install this neat library in the command line:

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

So far, the mutation creates a message object and returns it to the API. However, most mutations have side-effects, because they are writing data to your data source or performing another action. Most often, it will be a write operation to your database, but in this case, you only need to update your `users` and `messages` variables. The list of available messages needs to be updated, and the user's reference list of `messageIds` needs to have the new message `id`.

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

That's it for the first mutation. You can try it right now in GraphQL Playground:

{{< highlight javascript >}}
mutation {
  createMessage (text: "Hello GraphQL!") {
    id
    text
  }
}
{{< /highlight >}}

The last part is essentially your writing operation to a data source. In this case, you have only updated the sample data, but it would most likely be a database in practical use. Next, implement the mutation for deleting messages:

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

The mutation returns a boolean that tells if the deletion was successful or not, and it takes an identifier as input to identify the message. The counterpart of the GraphQL schema implementation is a resolver:

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

The resolver finds the message by id from the messages object using destructuring. If there is no message, the resolver returns false. If there is a message, the remaining messages without the deleted message are the updated versions of the messages object. Then, the resolver returns true. Otherwise, if no message is found, the resolver returns false. Mutations in GraphQL and Apollo Server aren't much different from GraphQL queries, except they write data.

There is only one GraphQL operation missing for making the messages features complete. It is possible to read, create, and delete messages, so the only operation left is updating them as an exercise.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project/tree/a10c54ec1b82043d98fcff2a6395fcd8e405bfda" %}}
* Create a message in GraphQL Playground with a mutation
  * Query all messages
  * Query the `me` user with messages
* Delete a message in GraphQL Playground with a mutation
  * Query all messages
  * Query the me user with messages
* Implement an `updateMessage` mutation for completing all CRUD operations for a message in GraphQL
* Read more about {{% a_blank "GraphQL queries and mutations" "https://graphql.github.io/learn/queries/" %}}

{{% chapter_header "GraphQL Schema Stitching with Apollo Server" "apollo-server-schema-stitching" %}}

Schema stitching is a powerful feature in GraphQL. It's about merging multiple GraphQL schemas into one schema, which may be consumed in a GraphQL client application. For now, you only have one schema in your application, but there may come a need for more complicated operations that use multiple schemas and schema stitching. For instance, assume you have a GraphQL schema you want to modularize based on domains (e.g. user, message). You may end up with two schemas, where each schema matches one type (e.g. User type, Message type). The operation requires merging both GraphQL schemas to make the entire GraphQL schema accessible with your GraphQL server's API. That's one of the basic motivations behind schema stitching.

But you can take this one step further: you may end up with microservices or third-party platforms that expose their dedicated GraphQL APIs, which then can be used to merge them into one GraphQL schema, where schema stitching becomes a single source of truth. Then again, a client can consume the entire schema, which is composed out of multiple domain-driven microservices.

In our case, let's start with a separation by technical concerns for the GraphQL schema and resolvers. Afterward, you will apply the separation by domains that are users and messages.

{{% sub_chapter_header "Technical Separation" "schema-stitching-technical-separation" %}}

Let's take the GraphQL schema from the application where you have a User type and Message type. In the same step, split out the resolvers to a dedicated place. The *src/index.js* file, where the schema and resolvers are needed for the Apollo Server instantiation, should only import both things. It becomes three things when outsourcing data, which in this case is the sample data, now called models.

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

As an improvement, models are passed to the resolver function's as context. The models are your data access layer, which can be sample data, a database, or a third-party API. It's always good to pass those things from the outside to keep the resolver functions pure. Then, you don't need to import the models in each resolver file. In this case, the models are the sample data moved to the *src/models/index.js* file:

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

Since you have passed the models to your Apollo Server context, they are accessible in each resolver. Next, move the resolvers to the *src/resolvers/index.js* file, and adjust the resolver's function signature by adding the models when they are needed to read/write users or messages.

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

The resolvers receive all sample data as models in the context argument rather than operating directly on the sample data as before. As mentioned, it keeps the resolver functions pure. Later, you will have an easier time testing resolver functions in isolation. Next, move your schema's type definitions in the *src/schema/index.js* file:

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

The technical separation is complete, but the separation by domains, where schema stitching is needed, isn't done yet. So far, you have only outsourced the schema, resolvers and data (models) from your Apollo Server instantiation file. Everything is separated by technical concerns now. You also made a small improvement for passing the models through the context, rather than importing them in resolver files.

{{% sub_chapter_header "Domain Separation" "schema-stitching-technical-separation" %}}

In the next step, modularize the GraphQL schema by domains (user and message). First, separate the user-related entity in its own schema definition file called *src/schema/user.js*:

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

Each file only describes its own entity, with a type and its relations. A relation can be a type from a different file, such as a Message type that still has the relation to a User type even though the User type is defined somewhere else. Note the `extend` statement on the Query and Mutation types. Since you have more than one of those types now, you need to extend the types. Next, define shared base types for them in the *src/schema/index.js*:

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

In this file, both schemas are merged with the help of a utility called `linkSchema`. The `linkSchema` defines all types shared within the schemas. It already defines a Subscription type for GraphQL subscriptions, which may be implemented later. As a workaround, there is an empty underscore field with a Boolean type in the merging utility schema, because there is no official way of completing this action yet. The utility schema defines the shared base types, extended with the `extend` statement in the other domain-specific schemas.

This time, the application runs with a stitched schema instead of one global schema. What's missing are the domain separated resolver maps. Let's start with the user domain again in file in the *src/resolvers/user.js* file, whereas I leave out the implementation details for saving space here:

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

Next, add the message resolvers in the *src/resolvers/message.js* file:

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

Since the Apollo Server accepts a list of resolver maps too, you can import all of your resolver maps in your *src/resolver/index.js* file, and export them as a list of resolver maps again:

{{< highlight javascript >}}
import userResolvers from './user';
import messageResolvers from './message';

export default [userResolvers, messageResolvers];
{{< /highlight >}}

Then, the Apollo Server can take the resolver list to be instantiated. Start your application again and verify that everything is working for you.

In the last section, you extracted schema and resolvers from your main file and separated both by domains. The sample data is placed in a *src/models* folder, where it can be migrated to a database-driven approach later. The folder structure should look similar to this:

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

You now have a good starting point for a GraphQL server application with Node.js. The last implementations gave you a universally usable GraphQL boilerplate project to serve as a foundation for your own software development projects. As we continue, the focus becomes connecting GraphQL server to databases, authentication and authorization, and using powerful features like pagination.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project/tree/953ef4b2ac8edc7c6338fb73ecdc1446e9cbdc4d" %}}
* Read more about {{% a_blank "schema stitching with Apollo Server" "https://www.apollographql.com/docs/graphql-tools/schema-stitching.html" %}}
* Schema stitching is only a part of **schema delegation**
  * Read more about {{% a_blank "schema delegation" "https://www.apollographql.com/docs/graphql-tools/schema-delegation.html" %}}
  * Familiarize yourself with the motivation behind **remote schemas** and **schema transforms**

{{% chapter_header "PostgreSQL with Sequelize for a GraphQL Server" "apollo-server-postgresql-sequelize-setup" %}}

To create a full-stack GraphQL application, you'll need to introduce a sophisticated data source. Sample data is fluctuant, while a database gives persistent data. In this section, you'll set up PostgreSQL with Sequelize ({{% a_blank "ORM" "https://en.wikipedia.org/wiki/Object-relational_mapping" %}}) for Apollo Server. {{% a_blank "PostgreSQL" "https://www.postgresql.org/" %}} is a SQL database whereas an alternative would be the popular NoSQL database called {{% a_blank "MongoDB" "https://www.mongodb.com/" %}} (with Mongoose as ORM). The choice of tech is always opinionated. You could choose MongoDB or any other SQL/NoSQL solution over PostgreSQL, but for the sake of this application, let's stick to PostgreSQL.

This [setup guide](https://www.robinwieruch.de/postgres-express-setup-tutorial/) will walk you through the basic PostgreSQL setup, including installation, your first database, administrative database user setup, and essential commands. These are the things you should have accomplished after going through the instructions:

* A running installation of PostgreSQL
* A database super user with username and password
* A database created with `createdb` or `CREATE DATABASE`

You should be able to run and stop your database with the following commands:

* pg_ctl -D /usr/local/var/postgres start
* pg_ctl -D /usr/local/var/postgres stop

Use the `psql` command to connect to your database in the command line, where you can list databases and execute SQL statements against them. You should find a couple of these operations in the PostgreSQL setup guide, but this section will also show some of them. Consider performing these in the same way you've been completing GraphQL operations with GraphQL Playground. The `psql` command line interface and GraphQL Playground are effective tools for testing applications manually.

Once you have installed PostgreSQL on your local machine, you'll also want to acquire {{% a_blank "PostgreSQL for Node.js" "https://github.com/brianc/node-postgres" %}} and {{% a_blank "Sequelize (ORM)" "https://github.com/sequelize/sequelize" %}} for your project. I highly recommend you keep the Sequelize documentation open, as it will be useful for reference when you connect your GraphQL layer (resolvers) with your data access layer (Sequelize).

{{< highlight javascript >}}
npm install pg sequelize --save
{{< /highlight >}}

Now you can create models for the user and message domains. Models are usually the data access layer in applications. Then, set up your models with Sequelize to make read and write operations to your PostgreSQL database. The models can then be used in GraphQL resolvers by passing them through the context object to each resolver. These are the essential steps:

* Creating a model for the user domain
* Creating a model for the message domain
* Connecting the application to a database
  * Providing super user's username and password
  * Combining models for database use
* Synchronizing the database once application starts

First, implement the *src/models/user.js* model:

{{< highlight javascript >}}
const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
    },
  });

  User.associate = models => {
    User.hasMany(models.Message, { onDelete: 'CASCADE' });
  };

  return User;
};

export default user;
{{< /highlight >}}

Next, implement the *src/models/message.js* model:

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

Both models define the shapes of their entities. The message model has a database column with the name text of type string. You can add multiple database columns horizontally to your model. All columns of a model make up a table row in the database, and each row reflects a database entry, such as a message or user. The database table name is defined by an argument in the Sequelize model definition. The message domain has the table "message". You can define relationships between entities with Sequelize using associations. In this case, a message entity belongs to one user, and that user has many messages. That's a minimal database setup with two domains, but since we're focusing on server-side GraphQL, you should consider reading more about databases subjects outside of these tutorials to fully grasp the concept.

Next, connect to your database from within your application in the *src/models/index.js* file. We'll need the database name, a database super user, and the user's password. You may also want to define a database dialect, because Sequelize supports other databases as well.

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

In the same file, you can physically associate all your models with each other to expose them to your application as data access layer (models) for the database.

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

The database credentials--database name, database super user name, database super user password--can be stored as environment variables. In your *.env* file, add those credentials as key value pairs. My defaults for local development are:

{{< highlight javascript >}}
DATABASE=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
{{< /highlight >}}

You set up environment variables when you started creating this application. If not, you can also leave credentials in the source code for now. Finally, the database needs to be migrated/synchronized once your Node.js application starts. To complete this operation in your *src/index.js* file:

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

We've completed the database setup for a GraphQL server. Next, you'll replace the business logic in your resolvers, because that is where Sequelize is used to access the database instead the sample data. The application isn't quite complete, because the resolvers don't use the new data access layer.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project/tree/a1927fc375a62a9d7d8c514f8bf7f576587cca93" %}}
* Familiarize yourself with databases
  * Try the `psql` command-line interface to access a database
  * Check the Sequelize API by reading through their documentation
  * Look up any unfamiliar database jargon mentioned here.

{{% chapter_header "Connecting Resolvers and Database" "apollo-server-resolvers-database" %}}

Your PostgreSQL database is ready to connect to a GraphQL server on startup. Now, instead of using the sample data, you will use data access layer (models) in GraphQL resolvers for reading and writing data to and from a database. In the next section, we will cover the following:

* Use the new models in your GraphQL resolvers
* Seed your database with data when your application starts
* Add a user model method for retrieving a user by username
* Learn the essentials about `psql` for the command line

Let's start by refactoring the GraphQL resolvers. You passed the models via Apollo Server's context object to each GraphQL resolver earlier. We used sample data before, but the Sequelize API is necessary for our real-word database operations. In the *src/resolvers/user.js* file, change the following lines of code to use the Sequelize API:

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

The `findAll()` and `findById()` are commonly used Sequelize methods for database operations. Finding all messages for a specific user is more specific, though. Here, you used the `where` clause to narrow down messages by the `userId` entry in the database. Accessing a database will add another layer of complexity to your application's architecture, so be sure to reference the Sequelize API documentation as much as needed going forward.

Next, return to the *src/resolvers/message.js* file and perform adjustments to use the Sequelize API:

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

Apart from the `findById()` and `findAll()` methods, you are creating and deleting a message in the mutations as well. Before, you had to generate your own identifier for the message, but now Sequelize takes care of adding a unique identifier to your message once it is created in the database.

There was one more crucial change in the two files: {{% a_blank "async/await" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function" %}}. Sequelize is a JavaScript promise-based ORM, so it always returns a JavaScript promise when operating on a database. That's where async/await can be used as a more readable version for asynchronous requests in JavaScript. You learned about the returned results of GraphQL resolvers in Apollo Server in a previous section. A result can be a JavaScript promise as well, because the resolvers are waiting for its actual result. In this case, you can also get rid of the async/await statements and your resolvers would still work. Sometimes it is better to be more explicit, however, especially when we add more business logic within the resolver's function body later, so we will keep the statements for now.

Now we'll shift to seeding the database with sample data when your applications starts with `npm start`. Once your database synchronizes before your server listens, you can create two user records manually with messages in your database. The following code for the *src/index.js* file shows how to perform these operations with async/await. Users will have a `username` with associated `messages`.

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

The `force` flag in your Sequelize `sync()` method can be used to seed the database on every application startup. You can either remove the flag or set it to `false` if you want to keep accumulated database changes over time. The flag should be removed for your production database at some point.

Next, we have to handle the `me` user. Before, you used one of the users from the sample data; now, the user will come from a database. It's a good opportunity to write a custom method for your user model in the *src/models/user.js* file:

{{< highlight javascript "hl_lines=12 13 14 15 16 17 18 19 20 21 22 23 24" >}}
const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
    },
  });

  User.associate = models => {
    User.hasMany(models.Message, { onDelete: 'CASCADE' });
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

The `findByLogin()` method on your user model retrieves a user by `username` or by `email` entry. You don't have an `email` entry on the user yet, but it will be added when the application has an authentication mechanism. The `login` argument is used for both `username` and `email`, for retrieving the user from the database, and you can see how it is used to sign in to an application with username or email.

You have introduced your first custom method on a database model. It is always worth considering where to put this business logic. When giving your model these access methods, you may end up with a concept called *fat models*. An alternative would be writing separate services like functions or classes for these data access layer functionalities.

The new model method can be used to retrieve the `me` user from the database. Then you can put it into the context object when the Apollo Server is instantiated in the *src/index.js* file:

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

However, this cannot work yet, because the user is read asynchronously from the database, so `me` would be a JavaScript promise rather than the actual user; and because you may want to retrieve the `me` user on a per-request basis from the database. Otherwise, the `me` user has to stay the same after the Apollo Server is created. Instead, use a function that returns the context object rather than an object for the context in Apollo Server. This function uses the async/await statements. The function is invoked every time a request hits your GraphQL API, so the `me` user is retrieved from the database with every request.

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

You should be able to start your application again. Try out different GraphQL queries and mutations in GraphQL Playground, and verify that everything is working for you. If there are any errors regarding the database, make sure that it is properly connected to your application and that the database is running on the command line too.

Since you have introduced a database now, GraphQL Playground is not the only manual testing tool anymore. Whereas GraphQL Playground can be used to test your GraphQL API, you may want to use the `psql` command line interface to query your database manually. For instance, you may want to check user message records in the database or whether a message exists there after it has been created with a GraphQL mutation. First, connect to your database on the command line:

{{< highlight javascript >}}
psql mydatabasename
{{< /highlight >}}

And second, try the following SQL statements. It's the perfect opportunity to learn more about SQL itself:

{{< highlight javascript >}}
SELECT * from users;
SELECT text from messages;
{{< /highlight >}}

Which leads to:

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

Every time you perform GraphQL mutations, it is wise to check your database records with the `psql` command-line interface. It is a great way to learn about {{% a_blank "SQL" "https://en.wikipedia.org/wiki/SQL" %}}, which is normally abstracted away by using an ORM such as Sequelize.

In this section, you have used a PostgreSQL database as data source for your GraphQL server, using Sequelize as the glue between your database and your GraphQL resolvers. However, this was only one possible solution. Since GraphQL is data source agnostic, you can opt-in any data source to your resolvers. It could be another database (e.g. MongoDB, Neo4j, Redis), multiple databases, or a (third-party) REST/GraphQL API endpoint. GraphQL only ensures all fields are validated, executed, and resolved when there is an incoming query or mutation, regardless of the data source.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project/tree/27a1372264760879e86be377e069da738270c4f3" %}}
* Experiment with psql and the seeding of your database
* Experiment with GraphQL playground and query data which comes from a database now
* Remove and add the async/await statements in your resolvers and see how they still work
  * Read more about {{% a_blank "GraphQL execution" "https://graphql.github.io/learn/execution/" %}}

{{% chapter_header "Apollo Server: Validation and Errors" "apollo-server-validation-errors" %}}

Validation, error, and edge case handling are not often verbalized in programming. This section should give you some insights into these topics for Apollo Server and GraphQL. With GraphQL, you are in charge of what returns from GraphQL resolvers. It isn't too difficult inserting business logic into your resolvers, for instance, before they read from your database.

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

It may be a good idea keeping the resolvers surface slim but adding business logic services on the side. Then it is always simple to reason about the resolvers. In this application, we keep the business logic in the resolvers to keep everything at one place and avoid scattering logic across the entire application.

Let's start with the validation, which will lead to error handling. GraphQL isn't directly concerned about validation, but it operates between tech stacks that are: the client application (e.g. showing validation messages) and the database (e.g. validation of entities before writing to the database).

Let's add some basic validation rules to your database models. This section gives an introduction to the topic, as it would become too verbose to cover all uses cases in this application. First, add validation to your user model in the *src/models/user.js* file:

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

Next, add validation rules to your message model  in the *src/models/message.js* file:

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

Now, try to create a message with an empty text in GraphQL Playground. It still requires a non-empty text for your message in the database. The same applies to your user entities, which now require a unique username. GraphQL and Apollo Server can handle these cases. Let's try to create a message with an empty text. You should see a similar input and output:

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

It seems like Apollo Server's resolvers make sure to transform {{% a_blank "JavaScript errors" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error" %}} into valid GraphQL output. It is already possible to use this common error format in your client application without any additional error handling.

If you want to add custom error handling to your resolver, you always can add the commonly try/catch block statements for async/await:

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

The error output for GraphQL should stay the same in GraphQL Playground, because you used the same error object to generate the Error instance. However, you could also use your custom message here with `throw new Error('My error message.');`.

Another way of adjusting your error message is in the database model definition. Each validation rule can have a custom validation message, which can be defined in the Sequelize model:

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

This would lead to the following error(s) when attempting to create a message with an empty text. Again, it is straightforward in your client application, because the error format stays the same:

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

That's one of the main benefits of using Apollo Server for GraphQL. Error handling is often free, because an error--be it from the database, a custom JavaScript error or another third-party--gets transformed into a valid GraphQL error result. On the client side, you don't need to worry about the error result's shape, because it comes in a common GraphQL error format where the data object is null but the errors are captured in an array. If you want to change your custom error, you can do it on a resolver per-resolver basis. Apollo Server comes with a solution for global error handling:

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

These are the essentials for validation and error handling with GraphQL in Apollo Server. Validation can happen on a database (model) level or on a business logic level (resolvers). It can happen on a directive level too (see exercises). If there is an error, GraphQL and Apollo Server will format it to work with GraphQL clients. You can also format errors globally in Apollo Server.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project/tree/83b2a288ccd65c574ac3f2083c4ceee3197700e7" %}}
* Add more validation rules to your database models
  * Read more about validation in the Sequelize documentation
* Read more about {{% a_blank "Error Handling with Apollo Server" "https://www.apollographql.com/docs/apollo-server/v2/features/errors.html" %}}
 * Get to know the different custom errors in Apollo Server
* Read more about {{% a_blank "GraphQL field level validation with custom directives" "https://blog.apollographql.com/graphql-validation-using-directives-4908fd5c1055" %}}
  * Read more about {{% a_blank "custom schema directives" "https://www.apollographql.com/docs/apollo-server/v2/features/directives.html" %}}

{{% chapter_header "Apollo Server: Authentication" "apollo-server-authentication" %}}

Authentication in GraphQL is a popular topic. There is no opinionated way of doing it, but many people need it for their applications. GraphQL itself isn't opinionated about authentication since it is only a query language. If you want authentication in GraphQL, consider using GraphQL mutations. In this section, we use a minimalistic approach to add authentication to your GraphQL server. Afterward, it should be possible to register (sign up) and login (sign in) a user to your application. The previously used `me` user will be the authenticated user.

In preparation for the authentication mechanism with GraphQL, extend the user model in the *src/models/user.js* file. The user needs an email address (as unique identifier) and a password. Both email address and username (another unique identifier) can be used to sign in to the application, which is why both properties were used for the user's `findByLogin()` method.

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

The two new entries for the user model have their own validation rules, same as before. The password of a user should be between 7 and 42 characters, and the email should have a valid email format. If any of these validations fails during user creation, it generates a JavaScript error, transforms and transfers the error with GraphQL. The registration form in the client application could display the validation error then.

You may want to add the email, but not the password, to your GraphQL user schema in the *src/schema/user.js* file too:

{{< highlight javascript "hl_lines=9" >}}
import { gql } from 'apollo-server-express';

export default gql`
  ...

  type User {
    id: ID!
    username: String!
    email: String!
    messages: [Message!]
  }
`;
{{< /highlight >}}

Next, add the new properties to your seed data in the *src/index.js* file:

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

That's the data migration of your database to get started with GraphQL authentication.

{{% sub_chapter_header "Registration (Sign Up) with GraphQL" "graphql-registration-sign-up-authentication" %}}

Now, let's examine the details for GraphQL authentication. You will implement two GraphQL mutations: one to register a user, and one to log in to the application. Let's start with the sign up mutation in the *src/schema/user.js* file:

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

The `signUp` mutation takes three non-nullable arguments: username, email, and password. These are used to create a user in the database. The user should be able to take the username or email address combined with the password to enable a successful login.

Now we'll consider the return type of the `signUp` mutation. Since we are going to use a token-based authentication with GraphQL, it is sufficient to return a token that is nothing more than a string. However, to distinguish the token in the GraphQL schema, it has its own GraphQL type. You will learn more about tokens in the following, because the token is all about the authentication mechanism for this application.

First, add the counterpart for your new mutation in the GraphQL schema as a resolver function. In your *src/resolvers/user.js* file, add the following resolver function that creates a user in the database and returns an object with the token value as string.

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

That's the GraphQL framework around a token-based registration. You created a GraphQL mutation and resolver for it, which creates a user in the database based on certain validations and its incoming resolver arguments. It creates a token for the registered user. For now, the set up is sufficient to create a new user with a GraphQL mutation.

{{% sub_chapter_header "Securing Passwords with Bcrypt" "graphql-token-based-authentication" %}}

There is one major security flaw in this code: the user password is stored in plain text in the database, which makes it much easier for third parties to access it. To remedy this, we use add-ons like {{% a_blank "bcrypt" "https://github.com/kelektiv/node.bcrypt.js" %}} to hash passwords. First, install it on the command line:

{{< highlight javascript >}}
npm install bcrypt --save
{{< /highlight >}}

Note: If you run into any problems with bcrypt on Windows while installing it, you can try out a substitute called {{% a_blank "bcrypt.js" "https://github.com/dcodeIO/bcrypt.js" %}}. It is slower, but people reported that it works on their machine.

Now it is possible to hash the password with bcrypt in the user's resolver function when it gets created on a `signUp` mutation. There is also an alternative way with Sequelize. In your user model, define a hook function that is executed every time a user entity is created:

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

In this hook function, add the functionalities to alter your user entity's properties before they reach the database. Let's do it for the hashed password by using bcrypt.

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

The bcrypt `hash()` method takes a string--the user's password--and an integer called salt rounds. Each salt round makes it more costly to hash the password, which makes it more costly for attackers to decrypt the hash value. A common value for salt rounds nowadays ranged from 10 to 12, as increasing the number of salt rounds might cause performance issues both ways.

In this implementation, the `generatePasswordHash()` function is added to the user's prototype chain. That's why it is possible to execute the function as method on each user instance, so you have the user itself available within the method as `this`. You can also take the user instance with its password as an argument, which I prefer, though using JavaScript's prototypal inheritance a good tool for any web developer. For now, the password is hashed with bcrypt before it gets stored every time a user is created in the database,.

{{% sub_chapter_header "Token based Authentication in GraphQL" "graphql-token-based-authentication" %}}

We still need to implement the token based authentication. So far, there is only a placeholder in your application for creating the token that is returned on a sign up and sign in mutation. A signed in user can be identified with this token, and is allowed to read and write data from the database. Since a registration will automatically lead to a login, the token is generated in both phases.

Next are the implementation details for the token-based authentication in GraphQL. Regardless of GraphQL, you are going to use a {{% a_blank "JSON web token (JWT)" "https://jwt.io/" %}} to identify your user. The definition for a JWT from the official website says: *JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.* In other words, a JWT is a secure way to handle the communication between two parties (e.g. a client and a server application). If you haven't worked on security related applications before, the following section will guide you through the process, and you'll see the token is just a secured JavaScript object with user information.

To create JWT in this application, we'll use the popular {{% a_blank "jsonwebtoken" "https://github.com/auth0/node-jsonwebtoken" %}} node package. Install it on the command line:

{{< highlight javascript >}}
npm install jsonwebtoken --save
{{< /highlight >}}

Now, import it in your *src/resolvers/user.js* file and use it to create the token:

{{< highlight javascript "hl_lines=1 4 5" >}}
import jwt from 'jsonwebtoken';

const createToken = async user => {
  const { id, email, username } = user;
  return await jwt.sign({ id, email, username });
};

...
{{< /highlight >}}

The first argument to "sign" a token can be any user information except sensitive data like passwords, because the token will land on the client side of your application stack. Signing a token means putting data into it, which you've done, and securing it, which you haven't done yet. To secure your token, pass in a secret (**any** long string) that is **only available to you and your server**. No third-party entities should have access, because it is used to encode (sign) and decode your token.

Add the secret to your environment variables in the *.env* file:

{{< highlight javascript "hl_lines=5" >}}
DATABASE=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres

SECRET=wr3r23fwfwefwekwself.2456342.dawqdq
{{< /highlight >}}

Then, in the *src/index.js* file, pass the secret via Apollo Server's context to all resolver functions:

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

Next, use it in your `signUp` resolver function by passing it to the token creation. The `sign` method of JWT handles the rest. You can also pass in a third argument for setting an expiration time or date for a token. In this case, the token is only valid for 30 minutes, after which a user has to sign in again.

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

That's it for the registration: you are creating a user and returning a valid token that can be used from the client application to authenticate the user. The server can decode the token that comes with every request and allows the user to access sensitive data. You can try out the registration with GraphQL Playground, which should create a user in the database and return a token for it. Also, you can check your database with `psql` to test if the use was created and with a hashed password.

{{% sub_chapter_header "Login (Sign In) with GraphQL" "graphql-registration-sign-up-authentication" %}}

Before you dive into the authorization with the token on a per-request basis, let's implement the second mutation for the authentication mechanism: the `signIn` mutation (or login mutation). Again, first we add the GraphQL mutation to your user's schema in the *src/schema/user.js* file:

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

Let's go through the new resolver function for the login step by step. As arguments, the resolver has access to the input arguments from the GraphQL mutation (login, password) and the context (models, secret). When a user tries to sign in to your application, the login, which can be either the unique username or unique email, is taken to retrieve a user from the database. If there is no user, the application throws an error that can be used in the client application to notify the user. If there is an user, the user's password is validated. You will see this method on the user model in the next example. If the password is not valid, the application throws an error to the client application. If the password is valid, the `signIn` mutation returns a token identical to the `signUp` mutation. The client application either performs a successful login or shows an error message for invalid credentials. You can also see specific Apollo Server Errors used over generic JavaScript Error classes.

Next, we want to implement the `validatePassword()` method on the user instance. Place it in the *src/models/user.js* file, because that's where all the model methods for the user are stored, same as the `findByLogin()` method.

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

Again, it's a prototypical JavaScript inheritance for making a method available in the user instance. In this method, the user (this) and its password can be compared with the incoming password from the GraphQL mutation using bcrypt, because the password on the user is hashed, and the incoming password is plain text. Fortunately, bcrypt will tell you whether the password is correct or not when a user signs in.

Now you have set up registration (sign up) and login (sign in) for your GraphQL server application. You used bcrypt to hash and compare a plain text password before it reaches the database with a Sequelize hook function, and you used JWT to encrypt user data with a secret to a token. Then the token is returned on every sign up and sign in. Then the client application can save the token (e.g. local storage of the browser) and send it along with every GraphQL query and mutation as authorization.

The next section will teach you about authorization in GraphQL on the server-side, and what should you do with the token once a user is authenticated with your application after a successful registration or login.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project/tree/831ab566f0b5c5530d9270a49936d102f7fdf73c" %}}
* Register (sign up) a new user with GraphQL Playground
* Check your users and their hashed passwords in the database with `psql`
* Read more about {{% a_blank "JSON web tokens (JWT)" "https://jwt.io/" %}}
* Login (sign in) a user with GraphQL Playground
  * copy and paste the token to the interactive token decoding on the JWT website (conclusion: the information itself isn't secure, that's why you shouldn't put a password in the token)

{{% chapter_header "Authorization with GraphQL and Apollo Server" "apollo-server-authorization" %}}

In the last section, you set up GraphQL mutations to enable authentication with the server. You can register a new user with bcrypt hashed passwords and you can login with your user's credentials. Both GraphQL mutations related to authentication return a token (JWT) that secures non-sensitive user information with a secret.

The token, whether its obtained on registration or login, is returned to the client application after a successful GraphQL `signIn` or `signUp` mutation. The client application must store the token somewhere like [the browser's session storage](https://www.robinwieruch.de/local-storage-react). Every time a request is made to the GraphQL server, the token has to be attached to the HTTP header of the HTTP request. The GraphQL server can then validate the HTTP header, verify its authenticity, and perform a request like a GraphQL operation. If the token is invalid, the GraphQL server must return an error for the GraphQL client. If the client still has a token locally stored, it should remove the token and redirect the user to the login page.

Now we just need to perform the server part of the equation. Let's do it in the *src/index.js* file by adding a global authorization that verifies the incoming token before the request hits the GraphQL resolvers.

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

In this general authorization on the server-side, you are injecting the `me` user, the authenticated user from the token, with every request to your Apollo Server's context. The `me` user is encoded in the token in the `createToken()` function. It's not a user from the database anymore, which spares the additional database request.

In the `getMe()` function, you extract the HTTP header for the authorization called "x-token" from the incoming HTTP request. The GraphQL client application sends the token obtained from the registration or login with every other request in an HTTP header, along with the payload of the HTTP request (e.g. GraphQL operation). It can then be checked to see if there is such an HTTP header in the function or not. If not, the function continues with the request, but the `me` user is undefined. If there is a token, the function verifies the token with its secret and retrieves the user information that was stored when you created the token. If the verification fails because the token was invalid or expired, the GraphQL server throws a specific Apollo Server Error. If the verification succeeds, the function continues with the `me` user defined.

The function returns an error when the client application sends an HTTP header with an invalid or expired token. Otherwise, the function waves the request through, because users must be checked at the resolver level to see if they're allowed to perform certain actions. A non-authenticated user--where the `me` user is undefined--might be able to retrieve messages but not create new ones. The application is now protected against invalid and expired tokens.

That's the most high-level authentication for your GraphQL server application. You are able to authenticate with your GraphQL server from a GraphQL client application with the `signUp` and `signIn` GraphQL mutations, and the GraphQL server only allows valid, non-expired tokens from the GraphQL client application.

{{% sub_chapter_header "GraphQL Authorization on a Resolver Level" "apollo-server-authorization-resolver" %}}

A GraphQL HTTP request comes through the `getMe()` function, even if it has no HTTP header for a token. This is good default behavior, because you want to register new users and login to the application without a token for now. You might want to query messages or users without being authenticated with the application. It is acceptable and sometimes necessary to wave through some requests without authorization token, to grant different levels of access to different user types. There will be an error only when the token becomes invalid or expires.

However, certain GraphQL operations should have more specific authorizations. Creating a message should only be possible for authorized users. Otherwise, or there would be no way to track the messages' authors. The `createMessage` GraphQL mutation can be protected, or "guarded", on a GraphQL resolver level. The naive approach of protecting the GraphQL operation is to guard it with an if-else statement in the *src/resolvers/message.js* file:

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

You can imagine how this becomes repetitive and error prone if it is used for all GraphQL operations that are accessible to an authenticated user, as it mixes lots of authorization logic into the resolver functions. To remedy this, we introduce an authorization abstraction layer for protecting GraphQL operations, with solutions called **combined resolvers** or **resolver middleware**. Let's install this node package:

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

The `isAuthenticated()` resolver function acts as middleware, either continuing with the next resolver (skip), or performing another action, like returning an error. In this case, an error is returned when the `me` user is not available. Since it is a resolver function itself, it has the same arguments as a normal resolver. A guarding resolver can be used when a message is created in the *src/resolvers/message.js* file. Import it with the `combineResolvers()` from the newly installed node package. The new resolver is used to protect the resolvers by combining them.

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

Now the `isAuthenticated()` resolver function always runs before the resolver that creates the message associated with the authenticated user in the database. The resolvers get chained to each other, and you can reuse the protecting resolver function wherever you need it. It only adds a small footprint to your actual resolvers, which can be changed in the *src/resolvers/authorization.js* file.

{{% sub_chapter_header "Permission-based GraphQL Authorization" "apollo-server-authorization-permission" %}}

The previous resolver only checks if a user is authenticated or not, so it is only applicable to the higher level. Cases like permissions require another protecting resolver that is more specific than the one in the *src/resolvers/authorization.js* file:

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

This resolver checks whether the authenticated user is the message owner. It's a useful check before deleting a message, since you only want the message creator to be able to delete it. The guarding resolver retrieves the message by id, checks the message's associated user with the authenticated user, and either throws an error or continues with the next resolver.

Let's protect a resolver with this fine-tuned authorization permission resolver in the *src/resolvers/message.js* file:

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

The `deleteMessage` resolver is protected by an authorization resolver now. Only the message owner, i.e. the message creator, is allowed to delete a message. If the user isn't authenticated, you can stack your protecting resolvers onto each other:

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

As an alternate tactic, you can also use the `isAuthenticated` resolver directly in the `isMessageOwner` resolver; then, you can avoid handling it in the actual resolver for deleting a message. I find being explicit to be more practical than hiding knowledge within the authorization resolver. The alternative route is still explained in the role-based authorization section, however.

The second combined resolver is for permission checks, because it decides whether or not the user has permission to delete the message. This is just one way of doing it, though. In other cases, the message could carry a boolean flag that decides if the active user has certain permissions.

{{% sub_chapter_header "Role-based GraphQL Authorization" "apollo-server-authorization-role" %}}

We went from a high-level authorization to a more specific authorization with permission-based resolver protection. Now we'll cover yet another way to enable authorization called **roles**. The next code block is a GraphQL mutation that requires role-based authorization, because it has the ability to delete a user. This allows you to create users with admin roles.

Let's implement the new GraphQL mutation first, followed by the role-based authorization. You can start in your *src/resolvers/user.js* file with a resolver function that deletes a user in the database by identifier:

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

New GraphQL operations must be implemented in the resolvers and schema. Next, we'll add the new mutation in the *src/schema/user.js* file. It returns a boolean that tells you whether the deletion was successful or not:

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

Before you can implement role-based protections for it, you must introduce the actual roles for the user entities. Add a `role` entry to your user's entity in the *src/models/user.js* file:

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

Add the role to your GraphQL user schema in the *src/schema/user.js* file too:

{{< highlight javascript "hl_lines=10" >}}
import { gql } from 'apollo-server-express';

export default gql`
  ...

  type User {
    id: ID!
    username: String!
    email: String!
    role: String
    messages: [Message!]
  }
`;
{{< /highlight >}}

Since you already have seed data in your *src/index.js* file for two users, you can give one of them a role. The admin role used in this case will be checked if the user attempts a delete operation:

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

Because you are not retrieving the actual `me` user from the database in the *src/index.js* file, but the user from the token instead, you must add the role information of the user for the token when it's created in the *src/resolvers/user.js* file:

{{< highlight javascript "hl_lines=2 3" >}}
const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn,
  });
};
{{< /highlight >}}

Next, protect the new GraphQL mutation with a role-based authorization. Create a new guarding resolver in your *src/resolvers/authorization.js* file:

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

The new resolver checks to see if the authenticated user has the `ADMIN` role. If it doesn't, the resolver returns an error; if it does, the next resolver is called. Unlike the `isMessageOwner` resolver, the `isAdmin` resolver is already combined, using the `isAuthenticated` resolver. Put this check in your actual resolver, which you are going to protect in the next step:

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

That's the basics of role-based authorization in GraphQL with Apollo Server. In this example, the role is only a string that needs to be checked. In a more elaborate role-based architecture, the role might change from a string to an array that contains many roles. It eliminates the need for an equal check, since you can check to see if the array includes a targeted role. Using arrays with a roles is the foundation for a sophisticated role-based authorization setup.

{{% sub_chapter_header "Setting Headers in GraphQL Playground" "graphql-playground-headers" %}}

You set up authorization for your GraphQL application, and now you just need to verify that it works. The simplest way to test this type of application is to use GraphQL Playground to run through different scenarios. The user deletion scenario will be used as an example, but you should test all the remaining scenarios for practice.

Before a user can perform a delete action, there must be a sign-in, so we execute a `signIn` mutation in GraphQL Playground with a non admin user. Consider trying this tutorial with an admin user later to see how it performs differently.

{{< highlight javascript >}}
mutation {
  signIn(login: "ddavids", password: "ddavids") {
    token
  }
}
{{< /highlight >}}

You should receive a token after logging into GraphQL Playground. The token needs to be set in the HTTP header for the next GraphQL operation. GraphQL Playground has a panel to add HTTP headers. Since your application is checking for an x-token, set the token as one:

{{< highlight javascript >}}
{
  "x-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoZWxsb0BkYXZpZC5jb20iLCJ1c2VybmFtZSI6ImRkYXZpZHMiLCJpYXQiOjE1MzQ5MjM4NDcsImV4cCI6MTUzNDkyNTY0N30.ViGU6UUY-XWpWDJGfXqES2J1lEr-Uye8XDQ79lAvByE"
}
{{< /highlight >}}

Your token will be different than the one above, but of a similar format. Since the token is set as an HTTP header now, you should be able to delete a user with the following GraphQL mutation in GraphQL Playground. The HTTP header with the token will be sent with the GraphQL operation:

{{< highlight javascript >}}
mutation {
  deleteUser(id: "2")
}
{{< /highlight >}}

Instead of a successful request, you will see the following GraphQL error after executing the GraphQL mutation for deleting a user. That's because you haven't logged in as a user with an admin role.

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

If you follow the same sequence as an admin user, you can delete a user entity successfully.

{{% pin_it_image "graphql authorization" "img/posts/graphql-apollo-server-tutorial/authorization.jpg" "is-src-set" %}}

We've added basic authorization for this application. It has the global authorization before every request hits the GraphQL resolvers; and authorization at the resolver level with protecting resolvers. They check whether a user is authenticated, whether the user is able to delete a message (permission-based authorization), and whether a user is able to delete a user (role-based authorization).

If you want to be even more exact than resolver level authorization, check out **directive-based authorization** or **field level authorization** in GraphQL. You can apply authorization at the data-access level with an ORM like Sequelize, too. Your application's requirements decide which level is most effective for authorization.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project/tree/4f6e8e6e7b899faca13e1c8354fe59637e7e23a6" %}}
* Read more about {{% a_blank "GraphQL authorization" "https://graphql.github.io/learn/authorization/" %}}
* Work through the different authorization scenarios with GraphQL Playground
* Find out more about field level authorization with Apollo Server and GraphQL
* Find out more about data access level authorization with Apollo Server and GraphQL

{{% chapter_header "GraphQL Custom Scalars in Apollo Server" "apollo-server-graphql-custom-scalar" %}}

So far, you have used a couple of scalars in your GraphQL application, because each field resolves eventually to a scalar type. Let's add a String scalar for the date when a message got created. First, we'll extend the *src/schema/message.js* which uses this field for a message:

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

Second, adjust the seed data in the *src/index.js* file. At the moment, all seed data is created at once, which applies to the messages as well. It would be better to have each message created in one second intervals. The creation date should differ for each message.

{{< highlight javascript "hl_lines=5 13 23 40 44" >}}
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

Now you should be able to query the `createdAt` of a message in your GraphQL Playground:

{{< highlight javascript >}}
query {
  message(id: "1") {
    id
    createdAt
    user {
      username
    }
  }
}

// query result
{
  "data": {
    "message": {
      "id": "1",
      "createdAt": "1540978531448",
      "user": {
        "username": "rwieruch"
      }
    }
  }
}
{{< /highlight >}}

You may have noticed something odd: While the date returned from a GraphQL Playground has a unix timestamp (e.g. 1540978531448), the date the database for a message (and other entities) has another format (e.g. 2018-10-31 17:35:31.448+08). Check it yourself with psql. That's the internal working of GraphQL which uses its internal formatting rules for dates. You can change this behavior by adding a custom scalar. First, install a popular GraphQL node package for custom date scalars.

{{< highlight javascript >}}
npm install graphql-iso-date --save
{{< /highlight >}}

Second, introduce a `Date` scalar in your schema in the *src/schema/index.js* file:

{{< highlight javascript "hl_lines=2" >}}
const linkSchema = gql`
  scalar Date

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
{{< /highlight >}}

Third, define the scalar with the help of the installed node package in your *src/resolvers/index.js* file:

{{< highlight javascript "hl_lines=1 6 7 8 11" >}}
import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';
import messageResolvers from './message';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  messageResolvers,
];
{{< /highlight >}}

And last but not least, change the scalar type from String to Date for your message schema in the *src/schema/message.js*:

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
    createdAt: Date!
    user: User!
  }
`;
{{< /highlight >}}

Now, query again your messages. The output for the `createdAt` date should be different.

{{< highlight javascript "hl_lines=5" >}}
{
  "data": {
    "message": {
      "id": "1",
      "createdAt": "2018-10-31T11:57:53.043Z",
      "user": {
        "username": "rwieruch"
      }
    }
  }
}
{{< /highlight >}}

It's in a readable format now. You can dive deeper into the date formatting that can be adjusted with this library by checking out their {{% a_blank "documentation" "https://github.com/excitement-engineer/graphql-iso-date" %}}.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-graphql/fullstack-apollo-express-postgresql-boilerplate/tree/709a406a8a94e15779d2e93cfb847d49de5aa6ca" %}}
* Read more about {{% a_blank "custom scalars in GraphQL" "https://www.apollographql.com/docs/apollo-server/features/scalars-enums.html" %}}

{{% chapter_header "Pagination in GraphQL with Apollo Server" "apollo-server-pagination" %}}

Using GraphQL, you will almost certainly encounter a feature called **pagination** for applications with lists of items. Stored user messages in a chat application become long lists, and when the client application request messages for the display, retrieving all messages from the database at once can lead to severe performance bottlenecks. Pagination allows you to split up a list of items into multiple lists, called pages. A page is usually defined with a limit and an offset. That way, you can request one page of items, and when a user wants to see more, request another page of items.

You will implement pagination in GraphQL with two different approaches in the following sections. The first approach will be the most naive approach, called **offset/limit-based pagination**. The advanced approach is **cursor-based pagination**. one of many sophisticated ways to allow pagination in an application.

{{% sub_chapter_header "Offset/Limit Pagination with Apollo Server and GraphQL" "apollo-server-offset-limit-pagination" %}}

Offset/limit-based pagination isn't too difficult to implement. The limit states how many items you want to retrieve from the entire list, and the offset states where to begin in the whole list. Using different offsets, you can shift through the entire list of items and retrieve a sublist (page) of it with the limit.

We set the message schema in the *src/schema/message.js* file to consider the two new arguments:

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
    createdAt: Date!
    user: User!
  }
`;
{{< /highlight >}}

Then you can adjust the resolver in the *src/resolvers/message.js* file to handle the new arguments:

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

Fortunately, your ORM (Sequelize) gives you everything you need for internal offset and limit functionality. Try it in GraphQL Playground yourself by adjusting the limit and offset.

{{< highlight javascript >}}
query {
  messages(offset: 1, limit: 2){
    text
  }
}
{{< /highlight >}}

Even though this approach is simpler, it comes with a few disadvantages. When your offset becomes very long, the database query takes longer, which  can lead to a poor client-side performance while the UI waits for the next page of data. Also, offset/limit pagination cannot handle deleted items in between queries. For instance, if you query the first page and someone deletes an item, the offset would be wrong on the next page because the item count is off by one. You cannot easily overcome this problem with offset/limit pagination, which is why cursor-based pagination might be necessary.

{{% sub_chapter_header "Cursor-based Pagination with Apollo Server and GraphQL" "apollo-server-cursor-based-pagination" %}}

In cursor-based pagination, the offset is given an identifier called a **cursor** rather counting items like offset/limit pagination. The cursor can be used to express "give me a limit of X items from cursor Y". A common approach to use dates (e.g. creation date of an entity in the database) to identify an item in the list. In our case, each message already has a `createdAt` date that is assigned to the entity when it is written to the database and we expose it already in the schema of the message entity. That's the creation date of each message that will be the cursor.

Now we have to change the original pagination to cursor-based in the *src/schema/message.js* file. You only need to exchange the offset with the cursor. Instead of an offset that can only be matched implicitly to an item in a list and changes once an item is deleted from the list, the cursor has a stable position within, because the message creation dates won't change.

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
    createdAt: Date!
    user: User!
  }
`;
{{< /highlight >}}

Since you adjusted the schema for the messages, reflect these changes in your *src/resolvers/message.js* file as well:

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

Instead of the offset, the cursor is the `createdAt` property of a message. With Sequelize and other ORMs it is possible to add a clause to find all items in a list by a starting property (`createdAt`) with less than (`lt`) or greater than (`gt`, which is not used here) values for this property. Using a date as a cursor, the where clause finds all messages **before** this date, because there is an `lt` Sequelize operator. There are two more things to make it work:

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

First, the list should be ordered by `createdAt` date, otherwise the cursor won't help. However, you can be sure that requesting the first page of messages without a cursor will lead to the most recent messages when the list is ordered. When you request the next page with a cursor based on the previous page's final creation date, you get the next page of messages ordered by creation date. That's how you can move page by page through the list of messages.

Second, the ternary operator for the cursor makes sure the cursor isn't needed for the first page request. As mentioned, the first page only retrieves the most recent messages in the list, so you can use the creation date of the last message as a cursor for the next page of messages.

You can also extract the where clause from the database query:

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

Now you can test what you've learned in GraphQL Playground to see it in action. Make the first request for the most recent messages:

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
        "createdAt": "2018-10-25T08:22:02.484Z"
      },
      {
        "text": "Happy to release ...",
        "createdAt": "2018-10-25T08:22:01.484Z"
      }
    ]
  }
}
{{< /highlight >}}

Now you can use the `createdAt` date from the last page to request the next page of messages with a cursor:

{{< highlight javascript >}}
query {
  messages(limit: 2, cursor: "2018-10-25T08:22:01.484Z") {
    text
    createdAt
  }
}
{{< /highlight >}}

The result gives the last message from the seed data, but the limit is set to 2 messages. This happens because there are only 3 messages in the database and you already have retrieved 2 in the last pagination action:

{{< highlight javascript >}}
{
  "data": {
    "messages": [
      {
        "text": "Published the Road to learn React",
        "createdAt": "2018-10-25T08:22:00.484Z"
      }
    ]
  }
}
{{< /highlight >}}

That's a basic implementation of a cursor-based pagination using the creation date of an item as a stable identifier. The creation date is a common approach, but there are alternatives you should explore as well.

{{% sub_chapter_header "Cursor-based Pagination: Page Info, Connections and Hashes" "cursor-based-pagination-page-info-connections-hashes" %}}

In this last section about pagination in GraphQL, we advance the cursor-based pagination with a few improvements. Currently, you have to query all creation dates of the messages to use the creation date of the last message for the next page as a cursor. GraphQL connections add only a structural change to your list fields in GraphQL that allow you to pass meta information. Let's add a GraphQL connection in the *src/schema/message.js* file:

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
    endCursor: Date!
  }

  type Message {
    id: ID!
    text: String!
    createdAt: Date!
    user: User!
  }
`;
{{< /highlight >}}

You introduced an intermediate layer that holds meta information with the PageInfo type with the list of items in an edges field. In the intermediate layer, you can introduce the new information such as an `endCursor` (`createdAt` of the last message in the list). Then, you won't need to query every `createdAt` date of every message, only the `endCursor`. Place these changes in the *src/resolvers/message.js* file:

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

You gave the result a new structure with the intermediate `edges` and `pageInfo` fields. The `pageInfo` field now has the cursor of the last message in the list, and you should be able to query the first page the following way:

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

The result may look like the following:

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
        "endCursor": "2018-10-25T08:29:56.771Z"
      }
    }
  }
}
{{< /highlight >}}

Use the last cursor to query the next page:

{{< highlight javascript >}}
query {
  messages(limit: 2, cursor: "2018-10-25T08:29:56.771Z") {
    edges {
      text
    }
    pageInfo {
      endCursor
    }
  }
}
{{< /highlight >}}

Again, this will only return the remaining last message in the list. You are no longer required to query the creation date of every message, only to query the cursor for the last message. The client application doesn't need the details for the cursor of the last message, as it just needs `endCursor` now.

You can add relevant information in the intermediate GraphQL connection layer. Sometimes, a GraphQL client needs to know whether there are more pages of a list to query, because every list is finite. Let's add this information to the schema for the message's connection in the *src/schema/message.js* file:

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
    endCursor: Date!
  }

  ...
`;
{{< /highlight >}}

In the resolver in the *src/resolvers/message.js* file, you can find this information with the following:

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

You only retrieve one more message than defined in the limit. If the list of messages is longer than the limit, there is a next page; otherwise, there is no next page. You return the limited messages, or all messages if there is no next page. Now you can include the `hasNextPage` field in the `pageInfo` field. If you query messages with a limit of 2 and no cursor, you get true for the `hasNextPage` field. If query messages with a limit of more than 2 and no cursor, the `hasNextPage` field becomes false. Then, your GraphQL client application knows that the list has reached its end.

The last improvements gave your GraphQL client application a more straightforward GraphQL API. The client doesn't need to know about the cursor being the last creation date of a message in a list. It only uses the `endCursor` as a `cursor` argument for the next page. However, the cursor is still a creation date property, which may lead to confusion on the GraphQL client side. The client shouldn't care about the format or the actual value of the cursor, so we'll ask the cursor with a hash function that uses a base64 encoding:

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

The returned cursor as meta information is hashed by the new utility function. Remember to stringify the date before hashing it. In addition, the `endCursor` in the *src/schema/message.js* file isn't a Date anymore, but a String scalar again.

{{< highlight javascript "hl_lines=13" >}}
import { gql } from 'apollo-server-express';

export default gql`
  ...

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

The GraphQL client receives a hashed `endCursor` field. The hashed value can be used as a cursor to query the next page. In the resolver, the incoming cursor is reverse hashed to the actual date, which is used for the database query.

Hashing the cursor is a common approach for cursor-based pagination because it hides the details from the client. The (GraphQL) client application only needs to use the hash value as a cursor to query the next paginated page.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project/tree/810907cde43b460231b9ed3a2172e62528f81ba4" %}}
* Read more about {{% a_blank "GraphQL pagination" "https://graphql.github.io/learn/pagination/" %}}

{{% chapter_header "GraphQL Subscriptions" "graphql-subscriptions" %}}

So far, you used GraphQL to read and write data with queries and mutations. These are the two essential GraphQL operations to get a GraphQL server ready for CRUD operations. Next, you will learn about GraphQL Subscriptions for real-time communication between GraphQL client and server.

Next, you will implement real-time communication for created messages. If a user creates a message, another user should get this message in a GraphQL client application as a real-time update. To start, we add the Subscription root level type to the *src/schema/message.js* schema:

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
    createdAt: Date!
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

As a naive GraphQL consumer, a subscription works like a GraphQL query. The difference is that the subscription emits changes (events) over time. Every time a message is created, the subscribed GraphQL client receives the created message as payload. A subscription from a GraphQL client for the schema would look like this:

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

In the first part, you'll set up the subscription architecture for your application; then, you'll add the implementation details for the created message subscription. The first step need only be completed once, but the latter will be a recurring when more GraphQL subscriptions are added to your application.

{{% sub_chapter_header "Apollo Server Subscription Setup" "apollo-server-subscriptions" %}}

Because we are using Express as middleware, expose the subscriptions with an advanced HTTP server setup in the *src/index.js* file:

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

For the context passed to the resolvers, you can distinguish between HTTP requests (GraphQL mutations and queries) and subscriptions in the same file. HTTP requests come with a req and res object, but the subscription comes with a connection object, so you can pass the models as a data access layer for the subscription's context.

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

To complete the subscription setup, you'll need to use one of the available {{% a_blank "PubSub engines" "https://www.apollographql.com/docs/apollo-server/v2/features/subscriptions.html#PubSub-Implementations" %}} for publishing and subscribing to events. Apollo Server comes with its own by default, but there are links for other options should you find it lacking. In a new *src/subscription/index.js* file, add the following:

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

And add your first event in a new *src/subscription/message.js* file, which we used earlier:

{{< highlight javascript >}}
export const CREATED = 'CREATED';
{{< /highlight >}}

This folder structure allows you to separate your events at the domain level. By exporting all events with their domains, you can import all events elsewhere and make use of the domain-specific events.

The only piece missing is using the event and the PubSub instance in your message resolver. In the beginning of this section, you added the new subscription to the message schema. Now you have to implement its counterpart in the *src/resolvers/message.js* file:

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

The subscribe's function signature has access to the same arguments as the other resolver functions. Models from the context can be accessed here, but it isn't necessary for this application.

The subscription as resolver provides a counterpart for the subscription in the message schema. However, since it uses a publisher-subscriber mechanism (PubSub) for events, you have only implemented the subscribing, not the publishing. It is possible for a GraphQL client to listen for changes, but there are no changes published yet. The best place for publishing a newly created message is in the same file as the created message:

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

You implemented your first subscription in GraphQL with Apollo Server and PubSub. To test it, create a new message with a logged in user. You can try both these GraphQL operations in two separate tabs in GraphQL Playground to compare their output. In the first tab, execute the subscription:

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

Results will indicate the tab is listening for changes. In the second tab, log in a user:

{{< highlight javascript >}}
mutation {
  signIn(login: "rwieruch", password: "rwieruch") {
    token
  }
}
{{< /highlight >}}

Copy the token from the result, and then paste it to the HTTP headers panel in the same tab:

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
        "createdAt": "2018-10-25T08:56:04.786Z",
        "user": {
          "id": "1",
          "username": "rwieruch"
        }
      }
    }
  }
}
{{< /highlight >}}

You have implemented GraphQL subscriptions. It can be a challenge to wrap your head around them, but once you've worked through some basic operations, you can use these as a foundation to create real-time GraphQL applications.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project/tree/eeb50f34a2569fa85141bf8ec3f8e9baaf670170" %}}
* Read more about {{% a_blank "Subscriptions with Apollo Server" "https://www.apollographql.com/docs/apollo-server/v2/features/subscriptions.html" %}}
* Watch a talk about {{% a_blank "GraphQL Subscriptions" "http://youtu.be/bn8qsi8jVew" %}}

{{% chapter_header "Testing a GraphQL Server" "graphql-server-testing" %}}

Testing often get overlooked in programming instruction, so this section will focus on to end-to-end (E2E) testing of a GraphQL server. While unit and integration tests are the fundamental pillars of the popular testing pyramid, covering all standalone functionalities of your application, E2E tests cover user scenarios for the entire application. An E2E test will assess whether a user is able to sign up for your application, or whether an admin user can delete other users. You don't need to write as many E2E tests, because they cover larger and more complex user scenarios, not just basic functionality. Also, E2E tests cover all the technical corners of your application, such as the GraphQL API, business logic, and databases.

{{% sub_chapter_header "GraphQL Server E2E Test Setup" "graphql-server-e2e-test-setup" %}}

Programs called Mocha and Chai are really all you need to test the application we've created. Mocha is a test runner that lets you execute tests from an npm script, while providing an organized testing structure; Chai gives you all the functionalities to make assertions, e.g. "Expect X to be equal to Y" based on real-world scenarios and run through them.

{{< highlight javascript >}}
npm install mocha chai --save-dev
{{< /highlight >}}

To use these programs, you must first install a library called {{% a_blank "axios" "https://github.com/axios/axios" %}} for making requests to the GraphQL API. When testing user sign-up, you can send a GraphQL mutation to the GraphQL API that creates a user in the database and returns their information.

{{< highlight javascript >}}
npm install axios --save-dev
{{< /highlight >}}

Mocha is run using npm scripts in your *package.json* file. The pattern used here matches all test files with the suffix *.spec.js* within the *src/* folder.

{{< highlight javascript "hl_lines=5" >}}
{
  ...
  "scripts": {
    "start": "nodemon --exec babel-node src/index.js",
    "test": "mocha --require @babel/register 'src/**/*.spec.js'"
  },
  ...
}
{{< /highlight >}}

Don't forget to install the babel node package with `npm install @babel/register --save-dev`. That should be sufficient to run your first test. Add a *src/tests/user.spec.js* to your application. and write your first test there:

{{< highlight javascript "hl_lines=5" >}}
import { expect } from 'chai';

describe('users', () => {
  it('user is user', () => {
    expect('user').to.eql('user');
  });
});
{{< /highlight >}}

The test is executed by typing `npm test` into the command line. While it doesn't test any logic of your application, the test will verify that Mocha, Chai, and your new npm script are working.

Before you can write end-to-end tests for the GraphQL server, the database must be addressed. Since the tests run against the actual GraphQL server, so you only need to run against a test database rather than the production database. Add an npm script in the *package.json* to start the GraphQL server with a test database:

{{< highlight javascript "hl_lines=5" >}}
{
  ...
  "scripts": {
    "start": "nodemon --exec babel-node src/index.js",
    "test-server": "TEST_DATABASE=mytestdatabase npm start",
    "test": "mocha --require @babel/register 'src/**/*.spec.js'"
  },
  ...
}
{{< /highlight >}}

The script must be started before the E2E GraphQL server tests. If the `TEST_DATABASE` environment flag is set, you have to adjust the database setup in the *src/models/index.js* file to use the test database instead:

{{< highlight javascript "hl_lines=4" >}}
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.TEST_DATABASE || process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

...
{{< /highlight >}}

You also need to make sure to create such a database. Mine is called *mytestdatabase* in the npm script, which I added in the command line with `psql` and `createdb` or `CREATE DATABASE`.

Finally, you must start with a seeded and consistent database every time you run a test server. To do this, set the database re-seeding flag to depend on the set test database environment variable in the *src/index.js* file:

{{< highlight javascript "hl_lines=3 5 6" >}}
...

const isTest = !!process.env.TEST_DATABASE;

sequelize.sync({ force: isTest }).then(async () => {
  if (isTest) {
    createUsersWithMessages(new Date());
  }

  httpServer.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
});

...
{{< /highlight >}}

Now you are ready to write tests against an actual running test sever (`npm run test-server`) that uses a consistently seeded test database. If you want to use async/await in your test environment, adjust your *.babelrc* file:

{{< highlight javascript >}}
{
  "presets": [
    [
      "@babel/preset-env", {
        "targets": {
          "node": "current"
        }
      }
    ]
  ]
}
{{< /highlight >}}

Now you can write tests with asynchronous business logic with async/await.

{{% sub_chapter_header "Testing User Scenarios with E2E Tests" "graphql-server-test-api" %}}

Every E2E test sends an actual request with axios to the API of the running GraphQL test server. Testing your `user` GraphQL query would look like the following in the *src/tests/user.spec.js* file:

{{< highlight javascript "hl_lines=4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21" >}}
import { expect } from 'chai';

describe('users', () => {
  describe('user(id: String!): User', () => {
    it('returns a user when user can be found', async () => {
      const expectedResult = {
        data: {
          user: {
            id: '1',
            username: 'rwieruch',
            email: 'hello@robin.com',
            role: 'ADMIN',
          },
        },
      };

      const result = await userApi.user({ id: '1' });

      expect(result.data).to.eql(expectedResult);
    });
  });
});
{{< /highlight >}}

Each test should be as straightforward as this one. You make a GraphQL API request with axios, expecting a query/mutation result from the API. Behind the scenes, data is read or written from or to the database. The business logic such as authentication, authorization, and pagination works in between. A request goes through the whole GraphQL server stack from API to database. An end-to-end test and doesn't test an isolated unit (unit test) or a smaller composition of units (integration test), but the entire pipeline.

The `userApi` function is the final piece needed to set up effective testing for this application. It's not implemented in the test, but in another *src/tests/api.js* file for portability. In this file, you will find all your functions which can be used to run requests against your GraphQL test server.

{{< highlight javascript >}}
import axios from 'axios';

const API_URL = 'http://localhost:8000/graphql';

export const user = async variables =>
  axios.post(API_URL, {
    query: `
      query ($id: ID!) {
        user(id: $id) {
          id
          username
          email
          role
        }
      }
    `,
    variables,
  });
{{< /highlight >}}

You can use basic HTTP to perform GraphQL operations across the network layer. It only needs a payload, which is the query/mutation and the variables. Beyond that, the URL of the GraphQL server must be known. Now, import the user API in your actual test file:

{{< highlight javascript "hl_lines=3" >}}
import { expect } from 'chai';

import * as userApi from './api';

describe('users', () => {
  describe('user(id: String!): User', () => {
    it('returns a user when user can be found', async () => {
      const expectedResult = {
        ...
      };

      const result = await userApi.user({ id: '1' });

      expect(result.data).to.eql(expectedResult);
    });
  });
});
{{< /highlight >}}

To execute your tests now, run your GraphQL test server in the command line with `npm run test-server`, and execute your tests in another command line tab with `npm test`. The output should appear as such:

{{< highlight javascript >}}
users
  user(id: ID!): User
    ✓ returns a user when user can be found (69ms)

1 passing (123ms)
{{< /highlight >}}

If your output is erroneous, the console logs may help you figure out what went wrong. Another option is to take the query from the axios request and put it into GraphQL Playground. The error reporting in Playground might make it easier to find problems.

That's your first E2E test against a GraphQL server. The next one uses the same API, and you can see how useful it is to extract the API layer as reusable functions. In your *src/tests/user.spec.js* file add another test:

{{< highlight javascript "hl_lines=17 18 19 20 21 22 23 24 25 26 27" >}}
import { expect } from 'chai';

import * as userApi from './api';

describe('users', () => {
  describe('user(id: ID!): User', () => {
    it('returns a user when user can be found', async () => {
      const expectedResult = {
        ...
      };

      const result = await userApi.user({ id: '1' });

      expect(result.data).to.eql(expectedResult);
    });

    it('returns null when user cannot be found', async () => {
      const expectedResult = {
        data: {
          user: null,
        },
      };

      const result = await userApi.user({ id: '42' });

      expect(result.data).to.eql(expectedResult);
    });
  });
});
{{< /highlight >}}

It is valuable to test the common path, but also less common edge cases. In this case, the uncommon path didn't return an error, but null for the user.

Let's add another test that verifies non-admin user authorization related to deleting messages. Here you will implement a complete scenario from login to user deletion. First, implement the sign in and delete user API in the *src/tests/api.js* file:

{{< highlight javascript "hl_lines=3 4 5 6 7 8 9 10 11 12 13 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31" >}}
...

export const signIn = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation ($login: String!, $password: String!) {
        signIn(login: $login, password: $password) {
          token
        }
      }
    `,
    variables,
  });

export const deleteUser = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
        mutation ($id: ID!) {
          deleteUser(id: $id)
        }
      `,
      variables,
    },
    {
      headers: {
        'x-token': token,
      },
    },
  );
{{< /highlight >}}

The `deleteUser` mutation needs the token from the `signIn` mutation's result. Next, you can test the whole scenario by executing both APIs in your new E2E test:

{{< highlight javascript "hl_lines=10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29" >}}
import { expect } from 'chai';

import * as userApi from './api';

describe('users', () => {
  describe('user(id: ID!): User', () => {
    ...
  });

  describe('deleteUser(id: String!): Boolean!', () => {
    it('returns an error because only admins can delete a user', async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await userApi.signIn({
        login: 'ddavids',
        password: 'ddavids',
      });

      const {
        data: { errors },
      } = await userApi.deleteUser({ id: '1' }, token);

      expect(errors[0].message).to.eql('Not authorized as admin.');
    });
  });
});
{{< /highlight >}}

First, you are using the `signIn` mutation to login a user to the application. The login is fulfilled once the token is returned. The token can then be used for every other GraphQL operation. In this case, it is used for the `deleteUser` mutation. The mutation still fails, however, because the current user is not admin. You can try the same scenario on your own with an admin to test the simple path for reusing APIs.

{{< highlight javascript >}}
users
  user(id: String!): User
    ✓ returns a user when user can be found (81ms)
    ✓ returns null when user cannot be found
  deleteUser(id: String!): Boolean!
    ✓ returns an error because only admins can delete a user (109ms)

3 passing (276ms)
{{< /highlight >}}

These E2E tests cover scenarios for user domains, going through the GraphQL API over business logic to the database access. However, there is still plenty of room for alternatives. Consider testing other user domain-specific scenarios such as a user sign up (registration), providing a wrong password on sign in (login), or requesting one and another page of paginated messages for the message domain.

This section only covered E2E tests. With Chai and Mocha at your disposal, you can also add smaller unit and integration tests for your different application layers (e.g. resolvers). If you need a library to spy, stub, or mock something, I recommend {{% a_blank "Sinon" "https://sinonjs.org" %}} as a complementary testing library.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project/tree/d11e0487085e014170146ec7479d0154c4a6fce4" %}}
* Implement tests for the message domain similar to the user domain
* Write more fine-granular unit/integration tests for both domains
* Read more about {{% a_blank "GraphQL and HTTP" "https://graphql.github.io/learn/serving-over-http/" %}}
* Read more about {{% a_blank "Mocking with Apollo Server" "https://www.apollographql.com/docs/apollo-server/v2/features/mocking.html" %}}

{{% chapter_header "Batching and Caching in GraphQL with Data Loader" "graphql-server-data-loader-caching-batching" %}}

The section is about improving the requests to your database. While only one request (e.g. a GraphQL query) hits your GraphQL API, you may end up with multiple database reads and writes to resolve all fields in the resolvers. Let's see this problem in action using the following query in GraphQL Playground:

{{< highlight javascript >}}
query {
  messages {
    edges {
      user {
        username
      }
    }
  }
}
{{< /highlight >}}

Keep the query open, because you use it as a case study to make improvements. Your query result should be similar to the following:

{{< highlight javascript >}}
{
  "data": {
    "messages": {
      "edges": [
        {
          "user": {
            "username": "ddavids"
          }
        },
        {
          "user": {
            "username": "ddavids"
          }
        },
        {
          "user": {
            "username": "rwieruch"
          }
        }
      ]
    }
  }
}
{{< /highlight >}}

In the command line for the running GraphQL server, four requests were made to the database:

{{< highlight javascript >}}
Executing (default): SELECT "id", "text", "createdAt", "updatedAt", "userId" FROM "messages" AS "message" ORDER BY "message"."createdAt" DESC LIMIT 101;

Executing (default): SELECT "id", "username", "email", "password", "role", "createdAt", "updatedAt" FROM "users" AS "user" WHERE "user"."id" = 2;

Executing (default): SELECT "id", "username", "email", "password", "role", "createdAt", "updatedAt" FROM "users" AS "user" WHERE "user"."id" = 2;

Executing (default): SELECT "id", "username", "email", "password", "role", "createdAt", "updatedAt" FROM "users" AS "user" WHERE "user"."id" = 1;
{{< /highlight >}}

There is one request made for the list of messages, and three requests for each individual user. That's the nature of GraphQL. Even though you can nest your GraphQL relationships and query structure, there will still be database requests. Check the resolvers for the message user in your *src/resolvers/message.js* file to see where this is happening. At some point, you may run into performance bottlenecks when nesting GraphQL queries or mutations too deeply, because a lot of items need to be retrieved from your database.

In the following, you will optimize these database accesses with batching. It's a strategy used for a GraphQL server and its database, but also for other programming environments. Compare the query result in GraphQL Playground and your database output in the command line.

There are two improvements that can be made with batching. First, one author of a message is retrieved twice from the database, which is redundant. Even though there are multiple messages, the author of some of these messages can be the same person. Imagine this problem on a larger scale for 100 messages between two authors in a chat application. There would be one request for the 100 messages and 100 requests for the 100 authors of each message, which would lead to 101 database accesses. If duplicated authors are retrieved only once, it would only need one request for the 100 messages and 2 requests for the authors, which reduces the 101 database hits to just 3. Since you know all the identifiers of the authors, these identifiers can be batched to a set where none are repeated. In this case, the two authors a list of [2, 2, 1] identifiers become a set of [2, 1] identifiers.

Second, every author is read from the database individually, even though the list is purged from its duplications. Reading all authors with only one database request should be possible, because at the time of the GraphQL API request with all messages at your disposal, you know all the identifiers of the authors. This decreases your database accesses from 3 to 2, because now you only request the list of 100 messages and its 2 authors in two requests.

The same two principals can be applied to the 4 database accesses which should be decreased to 2. On a smaller scale, it might not have much of a performance impact, but for 100 messages with the 2 authors, it reduces your database accesses significantly. That's where Facebook's open source {{% a_blank "dataloader" "https://github.com/facebook/dataloader" %}} becomes a vital tool. You can install it via npm on the command line:

{{< highlight javascript >}}
npm install dataloader --save
{{< /highlight >}}

Now, in your *src/index.js* file you can import and make use of it:

{{< highlight javascript "hl_lines=1 5 6 7 8 9 10 11 12 13 14 15 33 34 35" >}}
import DataLoader from 'dataloader';

...

const batchUsers = async (keys, models) => {
  const users = await models.User.findAll({
    where: {
      id: {
        $in: keys,
      },
    },
  });

  return keys.map(key => users.find(user => user.id === key));
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  ...
  context: async ({ req, connection }) => {
    if (connection) {
      ...
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader(keys => batchUsers(keys, models)),
        },
      };
    }
  },
});

...
{{< /highlight >}}

The loaders act as abstraction on top of the models, and can be passed as context to the resolvers. The user loader in the following example is used instead of the models directly.

Now we'll consider the function as argument for the DataLoader instantiation. The function gives you access to a list of keys in its arguments. These keys are your set of identifiers, purged of duplication, which can be used to retrieve items from a database. That's why keys (identifiers) and models (data access layer) are passed to the `batchUser()` function. The function then takes the keys to retrieve the entities via the model from the database. By the end of the function, the keys are mapped in the same order as the retrieved entities. Otherwise, it's possible to return users right after their retrieval from the database, though they have a different order than the incoming keys. As a result, users need to be returned in the same order as their incoming identifiers (keys).

That's the setup for the loader, an improved abstraction on top of the model. Now, since you are passing the loader for the batched user retrieval as context to the resolvers, you can make use of it in the *src/resolvers/message.js* file:

{{< highlight javascript "hl_lines=13 14" >}}
...

export default {
  Query: {
    ...
  },

  Mutation: {
    ...
  },

  Message: {
    user: async (message, args, { loaders }) => {
      return await loaders.user.load(message.userId);
    },
  },

  Subscription: {
    ...
  },
};
{{< /highlight >}}

While the `load()` function takes each identifier individually, it will batch all these identifiers into one set and request all users at the same time. Try it by executing the same GraphQL query in GraphQL Playground. The result should stay the same, but you should only see 2 instead of 4 requests to the database in your command-line output for the GraphQL server:

{{< highlight javascript >}}
Executing (default): SELECT "id", "text", "createdAt", "updatedAt", "userId" FROM "messages" AS "message" ORDER BY "message"."createdAt" DESC LIMIT 101;

Executing (default): SELECT "id", "username", "email", "password", "role", "createdAt", "updatedAt" FROM "users" AS "user" WHERE "user"."id" IN (2, 1);
{{< /highlight >}}

That's the benefit of the batching improvement: instead of fetching each (duplicated) user on its own, you fetch them all at once in one batched request with the dataloader package.

Now let's get into caching. The dataloader package we installed before also gives the option to cache requests. It doesn't work yet, though; try to execute the same GraphQL query twice and you should see the database accesses twice on your command line.

{{< highlight javascript >}}
Executing (default): SELECT "id", "text", "createdAt", "updatedAt", "userId" FROM "messages" AS "message" ORDER BY "message"."createdAt" DESC LIMIT 101;
Executing (default): SELECT "id", "username", "email", "password", "role", "createdAt", "updatedAt" FROM "users" AS "user" WHERE "user"."id" IN (2, 1);

Executing (default): SELECT "id", "text", "createdAt", "updatedAt", "userId" FROM "messages" AS "message" ORDER BY "message"."createdAt" DESC LIMIT 101;
Executing (default): SELECT "id", "username", "email", "password", "role", "createdAt", "updatedAt" FROM "users" AS "user" WHERE "user"."id" IN (2, 1);
{{< /highlight >}}

That's happening because a new instance of the dataloader is created within the GraphQL context for every request. If you move the dataloader instantiation outside, you get the caching benefit of dataloader for free:

{{< highlight javascript "hl_lines=3 22" >}}
...

const userLoader = new DataLoader(keys => batchUsers(keys, models));

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  ...
  context: async ({ req, connection }) => {
    if (connection) {
      ...
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        secret: process.env.SECRET,
        loaders: {
          user: userLoader,
        },
      };
    }
  },
});

...
{{< /highlight >}}

Try to execute the same GraphQL query twice again. This time you should see only a single database access, for the places where the loader is used; the second time, it should be cached.

{{< highlight javascript >}}
Executing (default): SELECT "id", "text", "createdAt", "updatedAt", "userId" FROM "messages" AS "message" ORDER BY "message"."createdAt" DESC LIMIT 101;
Executing (default): SELECT "id", "username", "email", "password", "role", "createdAt", "updatedAt" FROM "users" AS "user" WHERE "user"."id" IN (2, 1);

Executing (default): SELECT "id", "text", "createdAt", "updatedAt", "userId" FROM "messages" AS "message" ORDER BY "message"."createdAt" DESC LIMIT 101;
{{< /highlight >}}

In this case, the users are not read from the database twice, only the messages, because they are not using a dataloader yet. That's how you can achieve caching in GraphQL with dataloaders. Choosing a caching strategy isn't quite as simple. For example, if a cached user is updated in between actions, the GraphQL client application still queries the cached user.

It's difficult to find the right timing for invalidating the cache, so I recommended performing the dataloader instantiation with every incoming GraphQL request. You lose the benefit of caching over multiple GraphQL requests, but still use the cache for every database access with one incoming GraphQL request. The dataloader package expresses it like this: *"DataLoader caching does not replace Redis, Memcache, or any other shared application-level cache. DataLoader is first and foremost a data loading mechanism, and its cache only serves the purpose of not repeatedly loading the same data in the context of a single request to your Application."* If you want to get into real caching on the database level, give {{% a_blank "Redis" "https://redis.io/" %}} a shot.

Outsource the loaders into a different folder/file structure. Put the batching for the individual users into a new *src/loaders/user.js* file:

{{< highlight javascript >}}
export const batchUsers = async (keys, models) => {
  const users = await models.User.findAll({
    where: {
      id: {
        $in: keys,
      },
    },
  });

  return keys.map(key => users.find(user => user.id === key));
};
{{< /highlight >}}

And in a new *src/loaders/index.js* file export all the functions:

{{< highlight javascript >}}
import * as user from './user';

export default { user };
{{< /highlight >}}

Finally, import it in your *src/index.js* file and use it:

{{< highlight javascript "hl_lines=5 26 27 28" >}}
...
import DataLoader from 'dataloader';

...
import loaders from './loaders';

...

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  ...
  context: async ({ req, connection }) => {
    if (connection) {
      ...
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models),
          ),
        },
      };
    }
  },
});

...
{{< /highlight >}}

Remember to add the loader to your subscriptions, in case you use them there:

{{< highlight javascript "hl_lines=11 12 13 14 15" >}}
...

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  ...
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models),
          ),
        },
      };
    }

    if (req) {
      ...
    }
  },
});

...
{{< /highlight >}}

Feel free to add more loaders on your own, maybe for the message domain. The practice can provide useful abstraction on top of your models to allow batching and request-based caching.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project/tree/9ff0542f620a0d9939c1adcbd21951f8fc1693f4" %}}
* Read more about {{% a_blank "GraphQL and Dataloader" "https://www.apollographql.com/docs/graphql-tools/connectors.html#dataloader" %}}
* Read more about {{% a_blank "GraphQL Best Practices" "https://graphql.github.io/learn/best-practices/" %}}

{{% chapter_header "GraphQL Server + PostgreSQL Deployment to Heroku" "graphql-server-postgresql-deployment-heroku" %}}

Eventually you want to deploy the GraphQL server online, so it can be used in production. In this section, you learn how to deploy a GraphQL server to Heroku, a platform as a service for hosting applications. Heroku allows PostgreSQL as well.

This section guides you through the process in the command line. For the visual approach check this {{% a_blank "GraphQL server on Heroku deployment tutorial" "https://www.apollographql.com/docs/apollo-server/deployment/heroku.html" %}} which, however, doesn't include the PostgreSQL database deployment.

Initially you need to complete three requirements to use Heroku:

* [Install git for your command line and push your project to GitHub](https://www.robinwieruch.de/git-essential-commands/)
* Create an account for {{% a_blank "Heroku" "https://www.heroku.com/" %}}
* Install the {{% a_blank "Heroku CLI" "https://devcenter.heroku.com/articles/heroku-cli" %}} for accessing Heroku's features on the command line

In the command line, verify your Heroku installation with `heroku version`. If there is a valid installation, sign in to your Heroku account with `heroku login`. That's it for the general Heroku setup. In your project's folder, create a new Heroku application and give it a name:

{{< highlight javascript >}}
heroku create graphql-server-node-js
{{< /highlight >}}

Afterward, you can also install the PostgreSQL add-on for Heroku on the command line for your project:

{{< highlight javascript >}}
heroku addons:create heroku-postgresql:hobby-dev
{{< /highlight >}}

It uses the {{% a_blank "hobby tier" "https://devcenter.heroku.com/articles/heroku-postgres-plans#hobby-tier" %}}, a free application that can be upgraded as needed. Output for the PostgreSQL add-on installation should be similar to:

{{< highlight javascript >}}
Creating heroku-postgresql:hobby-dev on ⬢ graphql-server-node-js... free
Database has been created and is available
 ! This database is empty. If upgrading, you can transfer
 ! data from another database with pg:copy
Created postgresql-perpendicular-34121 as DATABASE_URL
Use heroku addons:docs heroku-postgresql to view documentation
{{< /highlight >}}

Check the {{% a_blank "Heroku PostgreSQL documentation" "https://devcenter.heroku.com/articles/heroku-postgresql" %}} for more in depth instructions for your database setup.

You are ready to take your application online. With the PostgreSQL add-on, you received a database URL as well. You can find it with `heroku config`. Now, let's step into your GraphQL server's code to make a couple of adjustments for production. In your *src/models/index.js*, you need to decide between development (coding, testing) and production (live) build. Because you have a new environment variable for your database URL, you can use this to make the decision:

{{< highlight javascript "hl_lines=3 4 5 6 7 8 17" >}}
import Sequelize from 'sequelize';

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
  });
} else {
  sequelize = new Sequelize(
    process.env.TEST_DATABASE || process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: 'postgres',
    },
  );
}

...
{{< /highlight >}}

If you check your *.env* file, you will see the `DATABASE_URL` environment variable isn't there. But you should see that it is set as Heroku environment variable with `heroku config:get DATABASE_URL`. Once your application is live on Heroku, your environment variables are merged with Heroku's environment variables, which is why the `DATABASE_URL` isn't applied for your local development environment.

Another environment variable used in the *src/index.js* file is called *SECRET* for your authentication strategy. If you haven't included an *.env* file in your project's version control (see .gitignore), you need to set the `SECRET` for your production code in Heroku using `heroku config:set SECRET=wr3r23fwfwefwekwself.2456342.dawqdq`. The secret is just made up and you can choose your own custom string for it.

Also, consider the application's port in the *src/index.js* file. Heroku adds its own `PORT` environment variable, and you should use the port from an environment variable as a fallback.

{{< highlight javascript "hl_lines=3 10 11" >}}
...

const port = process.env.PORT || 8000;

sequelize.sync({ force: isTest }).then(async () => {
  if (isTest) {
    createUsersWithMessages(new Date());
  }

  httpServer.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
  });
});

...
{{< /highlight >}}

Finally, decide whether you want to start with a seeded database or an empty database on Heroku PostgreSQL. If it is to be seeded, add an extra flag to the seeding:

{{< highlight javascript "hl_lines=4 7 8" >}}
...

const isTest = !!process.env.TEST_DATABASE;
const isProduction = !!process.env.DATABASE_URL;
const port = process.env.PORT || 8000;

sequelize.sync({ force: isTest || isProduction }).then(async () => {
  if (isTest || isProduction) {
    createUsersWithMessages(new Date());
  }

  httpServer.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
  });
});

...
{{< /highlight >}}

Remember to remove the flag after, or the database will be purged and seeded with every deployment. Depending on development or production, you are choosing a database, seeding it (or not), and selecting a port for your GraphQL server. Before pushing your application to Heroku, push all recent changes to your GitHub repository. After that, push all the changes to your Heroku remote repository as well, since you created a Heroku application before: `git push heroku master`. Open the application with `heroku open`, and add the `/graphql` suffix to your URL in the browser to open up GraphQL Playground. If it doesn't work, check the troubleshoot area below.

Depending on your seeding strategy, your database will either be empty or contain seeded data. If its empty, register a user and create messages via GraphQL mutations. If its seeded, request a list of messages with a GraphQL query.

Congratulations, your application should be live now. Not only is your GraphQL server running on Heroku, but your PostgreSQL database. Follow the exercises to learn more about Heroku.

{{% sub_chapter_header "Heroku Troubleshoot" "heroku-troubleshoot" %}}

It can happen that the GraphQL schema is not available in GraphQL Playground for application in production. It's because the `introspection` flag for Apollo Server is disabled for production. In order to fix it, you can set it to true:

{{< highlight javascript "hl_lines=2" >}}
const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  ...
});
{{< /highlight >}}

Another issue may be that Heroku doesn't install the dev dependencies for production. Although it does install the dev dependencies for building the application on Heroku, it purges the dev dependencies afterward. However, in our case, in order to start the application (npm start script), we rely on a few dev dependencies that need to be available in production. {{% a_blank "You can tell Heroku to keep the dev dependencies:" "https://devcenter.heroku.com/articles/nodejs-support#package-installation" %}}

{{< highlight javascript >}}
heroku config:set NPM_CONFIG_PRODUCTION=false YARN_PRODUCTION=false
{{< /highlight >}}

In a real world scenario, you would want to use something else to start your application and not rely on any dev dependencies.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/the-road-to-graphql/fullstack-apollo-react-express-boilerplate-project/tree/9dbfb30226cdc4843adbcc09d16871b2a902a4d3" %}}
* Feedback whether the troubleshooting area for Heroku was useful is very appreciated
* Create sample data in your production database with GraphQL Playground
* Get familiar with the {{% a_blank "Heroku Dashboard" "https://dashboard.heroku.com/apps" %}}
  * Find your application's logs
  * Find your application's environment variables
* access your PostgreSQL database on Heroku with `heroku pg:psql`

<hr class="section-divider">

You built a sophisticated GraphQL server boilerplate project with Express and Apollo Server. You should have learned that GraphQL isn't opinionated about various things, and about authentication, authorization, database access, and pagination. Most of the operations we learned were more straightforward because of Apollo Server over the GraphQL reference implementation in JavaScript. That's okay, because many people are using Apollo Server to build GraphQL servers. Use this application as a starter project to realize your own ideas, or find my starter project with a GraphQL client built in React in {{% a_blank "this GitHub repository" "https://github.com/rwieruch/fullstack-apollo-react-express-boilerplate-project" %}}.

{{% read_more "A complete React with Apollo and GraphQL Tutorial" "https://www.robinwieruch.de/react-graphql-apollo-tutorial/" %}}
