+++
title = "Mocking a GraphQL Server for Apollo Client"
description = "The tutorial shows you how to mock your GraphQL server for your GraphQL client for testing or other purposes. Either you can reconstruct a GraphQL client-side schema or introspect the GraphQL server schema. Both ways use client-side resolvers to mock the data..."
date = "2018-05-28T13:50:46+02:00"
tags = ["React", "GraphQL", "Apollo", "JavaScript"]
categories = ["React", "GraphQL", "Apollo", "JavaScript"]
keywords = ["apollo client mocking", "apollo server mocking", "apollo server mock", "apollo client mock", "apollo mock link", "apollo client mock testing", "apollo client mock data", "apollo client mock response", "apollo mock query"]
news_keywords = ["apollo client mocking", "apollo server mocking", "apollo server mock", "apollo client mock", "apollo mock link", "apollo client mock testing", "apollo client mock data", "apollo client mock response", "apollo mock query"]
hashtag = "#ReactJs #GraphQL"
card = "img/posts/graphql-server-mock-apollo-client/banner_640.jpg"
banner = "img/posts/graphql-server-mock-apollo-client/banner.jpg"
contribute = "graphql-server-mock-apollo-client.md"
headline = "Mocking a GraphQL Server for Apollo Client"

summary = "Often you run into the case where you have to mock your GraphQL server for your GraphQL client application. It can be for testing your GraphQL client or when your GraphQL server is not (always) available for development. Then it comes in handy to know how to mock your GraphQL server. The following tutorial will show you how to do it for Apollo Client which is used in a React application."
+++

{{% sponsorship %}}

{{% pin_it_image "apollo mocking data" "img/posts/graphql-server-mock-apollo-client/banner.jpg" "is-src-set" %}}

{{% react-graphql-book %}}

{{% read_before "This tutorial is part 2 of 2 in this series." "Part 1:" "A complete React with GraphQL Tutorial" "https://www.robinwieruch.de/react-with-graphql-tutorial/" %}}

Often you run into the case where you have to mock your GraphQL server for your GraphQL client application. It can be for testing your GraphQL client or when your GraphQL server is not (always) available for development. Then it comes in handy to know how to mock your GraphQL server. The following tutorial will show you how to do it for Apollo Client which is used in a React application.

The following sections are split up into two parts. The first part will show you how to mock a GraphQL server with a client-side implemented GraphQL schema. You may wonder: *When would you do it this way?* For instance, it happens when you are not able to get a *schema.json* file from your GraphQL server or when you are not able to run a GraphQL introspection against your GraphQL server. So this approach can be used when the schema from the GraphQL server, which you are trying to mock, is out of your hands. The second part shows you the alternative way, when you are able to access the schema from your GraphQL server, by using a {{% a_blank "GraphQL introspection" "http://graphql.org/learn/introspection/" %}}.

In order to get you started, clone this {{% a_blank "minimal React application from GitHub and follow its installation instructions" "https://github.com/rwieruch/react-apollo-client-example" %}}. Afterward, get to know the source code of the project and run it on the command line with `npm start`. It is a minimal React application which consumes the official GitHub GraphQL API by using Apollo Client.

{{% chapter_header "How to mock a GraphQL server from a client-side Schema" "graphql-server-mock-client-schema" %}}

In the following, the *src/index.js* file is the only part you are going to focus on. That's the place where the Apollo Client instance with its HTTP link and cache is instantiated and where you will hook-in the mocking of your GraphQL server. You will need a Apollo Link called {{% a_blank "Apollo Link Schema" "https://www.apollographql.com/docs/link/links/schema.html" %}} to provide a client-side GraphQL schema to your Apollo Client setup. In addition, you need GraphQL Tools helper functions to create the client-sided schema in the first place. Therefore, install the packages on the command line for your project:

{{< highlight javascript >}}
npm install apollo-link-schema graphql-tools --save
{{< /highlight >}}

Next, import the SchemaLink along with your other Apollo Client dependencies. Apollo Client's HttpLink is not needed for the first part, because it is replaced entirely by the SchemaLink. In the second part of the sections it is needed though.

{{< highlight javascript "hl_lines=7 13" >}}
import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';

import App from './App';

const cache = new InMemoryCache();

const link = ...

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
{{< /highlight >}}

Everything is in place except for the `link` property which is mandatory for the Apollo Client constructor. Since you have imported the SchemaLink class, you can use it to create a client-sided GraphQL schema by using the `makeExecutableSchema()` function.

{{< highlight javascript "hl_lines=8 14 16 18 19 20 21 23" >}}
import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema } from 'graphql-tools';

import App from './App';

const cache = new InMemoryCache();

const typeDefs = ...

const resolvers = ...

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const link = new SchemaLink({ schema: executableSchema });

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
{{< /highlight >}}

Perhaps you are familiar with the function to generate a GraphQL schema, because it is used for Apollo Server on the Node.js server-side to generate your GraphQL schema from GraphQL types and resolvers. You will implement a small GraphQL schema with those types and resolvers in the next part to mimic the small part you are using from the GitHub GraphQL API in your application.

Let's start with the {{% a_blank "GraphQL type definitions" "https://graphql.org/learn/schema/" %}}. The one GraphQL query you are using in your *src/App.js* is retrieving an organization with its repositories based on a `login` string type which identifies the organization.

{{< highlight javascript >}}
const typeDefs = `
  type Query {
    organization(login: String!): Organization!
  }
`;
{{< /highlight >}}

The query returns an object of the type `Organization` which has GraphQL scalar types (name and url) but also an object type (RepositoryConnection) for the repositories. Since the repositories are not a plain list of repositories, but follow {{% a_blank "one of the opinionated structures for paginated lists in GraphQL" "http://graphql.org/learn/pagination/" %}}, the type structure is a bit more complex by using a list of RepositoryEdge types. However, in the end there is a `Repository` type represented as node which has only scalar types and thus is the leaf of query. You can double check the query structure by looking at the query from the *src/App.js* file to make more sense of it.

{{< highlight javascript "hl_lines=6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25" >}}
const typeDefs = `
  type Query {
    organization(login: String!): Organization!
  }

  type Organization {
    name: String!
    url: String!
    repositories: RepositoryConnection!
  }

  type RepositoryConnection {
    edges: [RepositoryEdge!]!
  }

  type RepositoryEdge {
    node: Repository!
  }

  type Repository {
    id: ID!
    name: String!
    url: String!
    viewerHasStarred: Boolean!
  }
`;
{{< /highlight >}}

At this point you may wonder: How to come up with the type names? In this case, it is only important to reconstruct the correct **type structure** from the query you are performing in your application, but not the **type names**. The latter are not relevant and you could come up with your own. However, in this case the correct type names from the GitHub GraphQL API are reflected. In addition, you don't need to reconstruct the whole GitHub GraphQL schema, but only the part you are using in your application.

In the next step, you have to implement the type definitions for the Mutation which is used in the *src/App.js* file. The `addStar` mutation takes an **input type** with the type `AddStarInput` and returns an object type of `AddStarPayload`.

{{< highlight javascript "hl_lines=27 28 29 30 31 32 33 34 35 36 37" >}}
const typeDefs = `
  type Query {
    organization(login: String!): Organization!
  }

  type Organization {
    name: String!
    url: String!
    repositories: RepositoryConnection!
  }

  type RepositoryConnection {
    edges: [RepositoryEdge!]!
  }

  type RepositoryEdge {
    node: Repository!
  }

  type Repository {
    id: ID!
    name: String!
    url: String!
    viewerHasStarred: Boolean!
  }

  type Mutation {
    addStar(input: AddStarInput!): AddStarPayload!
  }

  input AddStarInput {
    starrableId: ID!
  }

  type AddStarPayload {
    starrable: Starrable!
  }
`;
{{< /highlight >}}

Last but not least, the `Starrable` type needs to be defined, because it is already used in the `AddStarPayload` type to return the `starrable` object. It could be a GraphQL type identical to all the types from before. However, in the following you are going to define it as a **GraphQL interface** instead which is used on the Repository type too. Doing it this way, it is possible to associate the entity, which is mutated by the `addStar` mutation, with an entity from the result of the query with the list of repositories. After all, that's how Apollo Client is able to update the cache by resolving the relations between those types by using an `id` and `__typename` from the returned entities from GraphQL queries and mutations.

{{< highlight javascript "hl_lines=6 7 8 9 25 41" >}}
const typeDefs = `
  type Query {
    organization(login: String!): Organization!
  }

  interface Starrable {
    id: ID!
    viewerHasStarred: Boolean!
  }

  type Organization {
    name: String!
    url: String!
    repositories: RepositoryConnection!
  }

  type RepositoryConnection {
    edges: [RepositoryEdge!]!
  }

  type RepositoryEdge {
    node: Repository!
  }

  type Repository implements Starrable {
    id: ID!
    name: String!
    url: String!
    viewerHasStarred: Boolean!
  }

  type Mutation {
    addStar(input: AddStarInput!): AddStarPayload!
  }

  input AddStarInput {
    starrableId: ID!
  }

  type AddStarPayload {
    starrable: Starrable!
  }
`;
{{< /highlight >}}

That's it for the type definitions. You should have implemented all the GraphQL types that are needed to create a small GraphQL schema which reflects all neccessary parts for the used query and mutation from the App component. The complementary part in order to create an executable schema for the Apollo Client are resolvers. You may have used them before for Apollo Link State or Apollo Server. Basically it is the place to define how every field in your GraphQL operations get resolved. Usually the information for the resolvers is taken from a database (Apollo Server) or local state (Apollo Link State), but in this case, it is the place where you simply return mocked data which reflects the schema structure from before.

First, define the resolver for the organization field in your query. It can return the whole object going all the way down to the repositories as nodes in a list. In order to give the mock data a dynamic touch, you can use the `login` argument from the second argument of the resolver function to use it for the mock data. These are all the arguments which are passed into your query (or mutation).

{{< highlight javascript >}}
const resolvers = {
  Query: {
    organization: (parent, { login }) => ({
      name: login,
      url: `https://github.com/${login}`,
      repositories: {
        edges: [
          {
            node: {
              id: '1',
              name: 'the-road-to-learn-react',
              url: `https://github.com/${login}/the-road-to-learn-react`,
              viewerHasStarred: false,
            },
          },
          {
            node: {
              id: '2',
              name: 'the-road-to-learn-react-chinese',
              url: `https://github.com/${login}/the-road-to-learn-react-chinese`,
              viewerHasStarred: false,
            },
          },
        ],
      },
    }),
  },
};
{{< /highlight >}}

Second, you can define the `addStar` mutation in the Mutation resolver the same way:

{{< highlight javascript "hl_lines=5 6 7 8 9 10 11 12" >}}
const resolvers = {
  Query: {
    ...
  },
  Mutation: {
    addStar: (parent, { input }) => ({
      starrable: {
        id: input.starrableId,
        viewerHasStarred: true,
      },
    }),
  },
};
{{< /highlight >}}

And third, you have to define the resolveType for the GraphQL interface that you have defined and implemented for the Repository type before. Since the GraphQL interface is only implemented by one GraphQL type, it can simply return this one GraphQL type. Otherwise, if the interface would be implemented by many types, the resolveType function would have to handle it.

{{< highlight javascript "hl_lines=8 9 10" >}}
const resolvers = {
  Query: {
    ...
  },
  Mutation: {
    ...
  },
  Starrable: {
    __resolveType: () => 'Repository',
  },
};
{{< /highlight >}}

If you would't implement the resolveType, you would get the following error when having the interface implemented as before and when executing the `addStar` mutation: *"Abstract type Starrable must resolve to an Object type at runtime for field AddStarPayload.starrable with value "[object Object]", received "undefined". Either the Starrable type should provide a "resolveType" function or each possible types should provide an "isTypeOf" function."*

That's it for defining your GraphQL type definitions and schema. Both are used in the `makeExecutableSchema()` function to produce a schema which is used in the SchemaLink constructor. It is the one part which replaced the HttpLink which would have been used to send the GraphQL operations across the network to a actual GraphQL server. Now it should work with the client-side GraphQL schema instead which resolves with the mocked data. Once you start your application again, you should see the mocked data from the GraphQL query and the mocking of the GraphQL mutation, because the mutation result updates the Apollo Client's Cache.

{{% chapter_header "How to mock a GraphQL server from a Introspection" "graphql-server-mock-introspection" %}}

The next part of the series shows you the alternative way of creating a mocked GraphQL server by using the GraphQL schema from the actual GraphQL server. Therefore, you don't need to reconstruct the exact schema as you did before. However, the GraphQL schema from the server must be accessible for you in order to pull this off. The common way to retrieve the schema is a GraphQL introspection. In case of GitHub's GraphQL API, you could perform a HTTP GET request against their GraphQL endpoint to retrieve their schema ({{% a_blank "see instructions" "https://developer.github.com/v4/guides/intro-to-graphql/#discovering-the-graphql-api" %}}). However, there exists a convenient helper function to retrieve the schema with one asynchronous function call: introspectSchema.

{{< highlight javascript "hl_lines=7 8 9 10 11 12 16 31 34 39" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import {
 makeExecutableSchema,
  introspectSchema,
} from 'graphql-tools';

import App from './App';

const resolvers = ...

const cache = new InMemoryCache();

const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});

const schema = introspectSchema(httpLink);

const executableSchema = makeExecutableSchema({
  typeDefs: printSchema(schema),
  resolvers,
});

const client = new ApolloClient({
  link: new SchemaLink({ schema: executableSchema }),
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
{{< /highlight >}}

As you can see, you need to have the working network access to the GraphQL server to retrieve the schema from it. As alternative, the GraphQL schema could be also provided by a *schema.json* file instead of using the GraphQL introspection. A schema file should be used when you don't have network access to your GraphQL server, but you are able to retrieve the *schema.json* file in another way. You will see this approach at the end of this section. Furthermore, the `printSchema()` utility function is used to stringify the schema definitions from the GraphQL server, because the schema is returned as a JavaScript object from the GraphQL server when performing the introspection.

You may have noticed that only the `typeDefs` property has changed for the `makeExecutableSchema()` object argument, because it is the GraphQL schema which comes from your GraphQL server. Thus you don't have to reconstruct the type definitions anymore on your client-side as you did before. You can be assured to have the exact schema on the client-side for mocking your GraphQL server now. However, the second property in the configuration object, the resolvers, are still defined by you on the client-side. It is not possible to retrieve the resolvers from the GraphQL server and it wouldn't make any sense whatsoever, because they are most likely connected to your database on the GraphQL server. That's why you can use the resolver from the previous section to return your mocked data from them for the query and mutation you are using in your application.

Last but not least, since the introspection is an asynchronous request, you need to resolve a promise or use async/await for it:

{{< highlight javascript "hl_lines=5 12 24 26" >}}
...

const resolvers = ...

async function render() {
  const cache = new InMemoryCache();

  const GITHUB_BASE_URL = 'https://api.github.com/graphql';

  const httpLink = ...

  const schema = await introspectSchema(httpLink);

  const executableSchema = ...

  const client = ...

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root'),
  );
}

render();
{{< /highlight >}}

Notice how you may receive several similar warnings in your console logs in the browser once you start your application: *"Type "Starrable" is missing a "resolveType" resolver. Pass false into "resolverValidationOptions.requireResolversForResolveType" to disable this warning."*. You should receive similar warnings, but not the warning shown for the `Starrable` type. It is because you have already defined its resolveType function in your resolvers:

{{< highlight javascript >}}
const resolvers = {
  Query: {
    ...
  },
  Mutation: {
    ...
  },
  Starrable: {
    __resolveType: () => 'Repository',
  },
};
{{< /highlight >}}

All the other GraphQL interfaces from the GraphQL server schema (which is the entire schema and not only a part of it as before) are not resolved. But you don't need to resolve them, because they are not used in your actual GraphQL queries and mutations in your application. Thus, you can deactivate these warnings:

{{< highlight javascript "hl_lines=7 8 9" >}}
async function render() {
  ...

  const executableSchema = makeExecutableSchema({
    typeDefs: printSchema(schema),
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  });

  ...
}
{{< /highlight >}}

Now, start your application to verify that your GraphQL operations are still working. The mocking of your GraphQL server should work identical to the mocking from the previous section with the client-sided GraphQL schema. In the previous section, you have defined your client-side schema which mimics/reconstructs the necessary parts used in your application of the GraphQL server schema. It was only important to reconstruct the type definition structure but not necessarily the type names. In the last section though, you have used the actual GraphQL schema from the GraphQL server by using a GraphQL introspection. For boths approaches, the resolvers have been the same to mock your data. {{% a_blank "The final repository can be found on GitHub." "https://github.com/rwieruch/apollo-client-mocking-example" %}}

If you cannot use an introspection for your GraphQL server, but need to rely on a *schema.json* file which you have retrieved at another point in time, the following example shows you how to create a client-side schema with a *schema.json* file.

{{< highlight javascript >}}
import { addResolveFunctionsToSchema } from 'graphql-tools';
import { buildClientSchema } from 'graphql/utilities';

import schema from './schema.json';

const resolvers = ...

const executableSchema = buildClientSchema(schema.data);

addResolveFunctionsToSchema({
  schema: executableSchema,
  resolvers,
});
{{< /highlight >}}

The last function adds your resolver functions to the schema by mutating it directly. This way, you can use the *schema.json* file instead of an introspection for mocking your GraphQL server.

<hr class="section-divider">

The last sections have shown you two approaches to create a GraphQL schema which matches (partly) your GraphQL server schema. The reconstructed/fetched schema can be used with client-sided resolvers to mock your data for the Apollo Client. Once the executable schema is created, it is used for the Apollo Client instantiation. It may be also possible to consider one or the other approach for mocking the GraphQL data for testing your React components which depend on a query or mutation. After all, hopefully the last sections have helped you to mock your GraphQL server data for your GraphQL client-side application.