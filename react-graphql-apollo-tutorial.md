+++
title = "A complete React with Apollo and GraphQL Tutorial"
description = "This React with Apollo and GraphQL tutorial shows you how to use GraphQL in your React application by consuming GitHub's GraphQL API. You will use Apollo for your query and mutation implementations on the client-side of your React application. This Apollo in React tutorial attempts to teach you using Apollo in React from zero to one ..."
date = "2018-05-01T02:50:46+02:00"
tags = ["React", "GraphQL", "Apollo", "JavaScript"]
categories = ["React", "GraphQL", "Apollo", "JavaScript"]
keywords = ["react graphql apollo tutorial", "react with graphql apollo tutorial", "react graphql apollo book", "react apollo book", "react apollo example", "react apollo query", "react apollo mutation", "react apollo client", "react apollo demo"]
news_keywords = ["react graphql apollo tutorial", "react with graphql apollo tutorial", "react graphql apollo book", "react apollo book", "react apollo example", "react apollo query", "react apollo mutation", "react apollo client", "react apollo demo"]
hashtag = "#ReactJs #GraphQL"
card = "img/posts/react-graphql-apollo-tutorial/banner_640.jpg"
banner = "img/posts/react-graphql-apollo-tutorial/banner.jpg"
contribute = "react-graphql-apollo-tutorial.md"
headline = "A complete React with Apollo and GraphQL Tutorial"

summary = "This React with Apollo and GraphQL tutorial shows you how to use GraphQL in your React application by consuming GitHub's GraphQL API. You will use Apollo for your query and mutation implementation on the client-side in your React application. This Apollo in React tutorial attempts to teach you using Apollo in React from zero to one."
+++

{{% sponsorship %}}

{{% pin_it_image "react graphql apollo tutorial" "img/posts/react-graphql-apollo-tutorial/banner.jpg" "is-src-set" %}}

{{% react-graphql-book %}}

{{% read_before "This tutorial is part 2 of 2 in this series." "Part 1:" "A complete React with GraphQL Tutorial" "https://www.robinwieruch.de/react-with-graphql-tutorial/" %}}

In this tutorial, you will learn how to combine React with GraphQL in your application by using Apollo. Whereas the whole Apollo toolset can be used to create a GraphQL client, GraphQL server and other complementary applications, you will use Apollo Client only for your React client-side application in the following application. Along the way, you will build a simplified GitHub client that consumes {{% a_blank "GitHub's GraphQL API" "https://developer.github.com/v4/" %}} by using Apollo and not plain HTTP requests as in a previous application. Apollo Client can be used to perform queries and mutations to read and write data. At the end, you should be able to showcase a React application using GraphQL and Apollo that can be used by other developers to learn from it.

{{% package_box "The Road to learn React" "Build a Hacker News App along the way. No setup configuration. No tooling. No Redux. Plain React in 190+ pages of learning material. Pay what you want like <strong>28.000+ readers</strong>." "Get the Book" "img/page/cover.png" "https://www.getrevue.co/profile/rwieruch" %}}

{{% chapter_header "Table of Contents" "toc" %}}

* Learning only about Apollo Client
  * [Starting with Apollo Boost on the Command Line](#graphql-apollo-boost-client)
  * [Apollo Client and a GraphQL Query](#graphql-apollo-client-query)
  * [Apollo Client with Pagination, Variables, Nested Objects and List Fields](#graphql-apollo-client-pagination)
  * [Apollo Client and a GraphQL Mutation](#graphql-apollo-client-mutation)
* Learning about Apollo Client in React
  * [Writing your first React with GraphQL and Apollo Client](#react-graphql-apollo-client)
  * [Configure Apollo Client for React and GitHub's GraphQL API](#react-apollo-client-configuration)
  * [Connect Data-Layer to View-Layer: Introducing React Apollo](#react-apollo-connecting-layers)
  * [GraphQL Query with Apollo Client in React](#react-apollo-client-query)
  * [Apollo Client Error Handling in React](#react-apollo-client-error-handling)
  * [GraphQL Mutation with Apollo Client in React](#react-apollo-client-mutations)
  * [GraphQL Query/Mutation with Higher-Order Components in React](#react-apollo-client-query-mutation-higher-order-component)
  * [Local State Management with Apollo Client in React](#react-apollo-client-local-state-management)
  * [Apollo Client Optimistic UI in React](#react-apollo-client-optimistic-ui)
  * [GraphQL Pagination with Apollo Client in React](#react-apollo-client-pagination)
  * [GraphQL Caching of Queries with Apollo Client in React](#react-apollo-client-caching)
  * [Implementing the Issues Feature: Setup](#react-apollo-client-feature-setup)
  * [Implementing the Issues Feature: Client-Side Filter](#react-apollo-client-feature-client-filter)
  * [Implementing the Issues Feature: Server-Side Filter](#react-apollo-client-feature-server-filter)
  * [Apollo Client Prefetching in React](#react-apollo-client-prefetching-data)
  * [Exercise: Commenting Feature](#react-apollo-client-exercise)
  * [Appendix: CSS Files and Styles](#appendix-styling)

{{% chapter_header "Starting with Apollo Boost on the Command Line" "graphql-apollo-boost-client" %}}

Apollo is a whole ecosystem built by developers as a infrastructure for GraphQL applications. You can use it on the client-side for a GraphQL client application, server-side for a GraphQL server application, somewhere in between as a gateway, and also for other GraphQL related tools (e.g. monitoring). At the time of writing this tutorial, Apollo offers the richest and most popular ecosystem around GraphQL in JavaScript. There are other libraries for React applications out there, such as {{% a_blank "Relay" "http://facebook.github.io/relay" %}} and {{% a_blank "Urql" "https://github.com/FormidableLabs/urql" %}}, but they are only for React applications and not as popular as the Apollo Client which has the advantage of being framework agnostic. You don't need to use Apollo necessarily with React. It can be coupled with other view-layer Vue and Angular as well. So everything you will learn in this tutorial about Apollo Client might be transferable to Angular and Vue.

This section will start by introducing Apollo Client with Apollo Boost. The latter enables you to create a zero-configuration Apollo Client to get you started the fastest and most convenient way. You will not introduce React in this section though. Instead, this section focuses only on using the Apollo Client for the sake of learning about it.

In order to get you started, you can find here the {{% a_blank "a fitting Node.js boilerplate project and its installation instructions" "https://github.com/rwieruch/node-babel-server" %}}. Yes, you are right: You will use Apollo Client only on the command line in a Node.js environment for now. On top of the minimal Node.js project, you will introduce the Apollo Client with Apollo Boost in order to use and experience the GraphQL client without any view-layer (e.g. React) library yet.

In the following, you are going to consume GitHub's GraphQL API and output the results of your queries and mutations on the command line. Therefore, you need to create a personal access token on GitHub's website. If you haven't done it yet for the previous application, head over to {{% a_blank "GitHub's instructions" "https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/" %}} for generating a personal access token with sufficient permissions.

After you have cloned and installed the packages of the Node.js boilerplate project and created your personal access token, in addition you have to install these two packages on the command line from the root folder of the new project:

{{< highlight javascript >}}
npm install apollo-boost graphql --save
{{< /highlight >}}

Whereas the {{% a_blank "apollo-boost" "https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost" %}} package gives you access to a zero-configuration Apollo Client, the {{% a_blank "graphql" "https://github.com/graphql/graphql-js" %}} package gives you the ability to create GraphQL queries, mutations and subscriptions on the client-side (and server-side). It is the JavaScript reference implementation of {{% a_blank "Facebook's GraphQL specification" "https://github.com/facebook/graphql" %}}.

In the next steps, you will only configure and use the Apollo Client that comes with Apollo Boost in the *index.js* file of the project. The project doesn't become large and you will only implement it in this section, so it is fine to have everything in one file for the sake of learning about the Apollo Client.

In your *index.js* file, you can import the Apollo Client from Apollo Boost. Afterward, you can create a client instance by calling its constructor with only a URI. After all, the client needs to know where the data comes from and where it should be written to. That's why you can pass GitHub's API endpoint to it.

{{< highlight javascript >}}
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
});
{{< /highlight >}}

The Apollo Client would already work this way. However, as you may remember, GitHub's GraphQL API requires you to pass your personal access token to it. That's why you have to define it once when creating the Apollo Client instance. Therefore, you can use the `request` property to define a function which has access to the context of each request made through the Apollo Client. There you can pass the authorization header when using Apollo Boost as one of its default headers.

{{< highlight javascript "hl_lines=5 6 7 8 9 10 11" >}}
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer YOUR_GITHUB_PERSONAL_ACCESS_TOKEN`,
      },
    });
  },
});
{{< /highlight >}}

You may recall how you did the same for the previous application that has only used axios for plain HTTP requests. You configured axios once with the GraphQL API endpoint to default all requests to this URI and set up the authorization header as well. The same happened here, because it is sufficient to configure your client once for all the following GraphQL requests.

Now you would have to replace the `YOUR_GITHUB_PERSONAL_ACCESS_TOKEN` string with your personal access token that you have created before on GitHub's website. That's one way to do it. However, you may not want to put your access token directly into the source code. Therefore, you can create a *.env* file which holds all of your environment variables in your project folder. If you don't want to share the personal token in a public GitHub repository, I encourage you to add the file to your *.gitignore* file too. On the command line, you can create this file:

{{< highlight javascript >}}
touch .env
{{< /highlight >}}

Simply define your environment variables in this *.env* file. In your *.env* file, paste the following key value pair whereas the naming for the key is up to you and the value has to be your personal access token from GitHub.

{{< highlight javascript >}}
GITHUB_PERSONAL_ACCESS_TOKEN=xxxXXX
{{< /highlight >}}

In any Node.js application, you can use the key in your source code with the following package: {{% a_blank "dotenv" "https://github.com/motdotla/dotenv" %}}. Follow their instructions to install it for your project. Afterward use the personal access token from the *.env* file in your *index.js* file:

{{< highlight javascript "hl_lines=8" >}}
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    });
  },
});
{{< /highlight >}}

Note: Maybe there are additional necessary configuration steps for the previously installed dotenv package. Since the installation instructions may vary with different dotenv versions, please check how to use it in your source code on their GitHub website after you have installed it.

When you try to start your application with `npm start` without doing any query or mutation but only setting up Apollo Client by creating an instance of it, you might see the following error: "Error: fetch is not found globally and no fetcher passed, to fix pass a fetch for your environment ...". The error occurs because the {{% a_blank "native fetch API" "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" %}}, which is used to make requests to remote APIs on a promise basis, is only available in the browser. Thus you don't have access to it in a Node.js application that runs only on the command line. However, the Apollo Client makes use of the fetch API to perform queries and mutations (usually from a browser environment and not Node.js environment). As you may remember, a query or mutation can be performed with a simple HTTP request after all. That's why the Apollo Client uses the native fetch API under the hood from the browser to perform those requests. So what's the solution to this issue? You can use a node package to make fetch available in a Node.js environment. There are various packages which address this issue. First, install one of those on the command line:

{{< highlight javascript >}}
npm install cross-fetch --save
{{< /highlight >}}

And second, import it anonymously in your project:

{{< highlight javascript "hl_lines=1" >}}
import 'cross-fetch/polyfill';
import ApolloClient from 'apollo-boost';
{{< /highlight >}}

That's it. The error shouldn't be there anymore when starting the application from the command line. But nothing happens yet. Only an instance of the Apollo Client is created with a configuration. In the following, you will perform your first query with Apollo Client.

### Exercises:

* read more about {{% a_blank "other view integrations such as Angular and Vue" "https://www.apollographql.com/docs/react/integrations.html" %}}
* invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5T3W9BB" %}}

{{% chapter_header "Apollo Client and a GraphQL Query" "graphql-apollo-client-query" %}}

Now you are going to send your first query to GitHub's GraphQL API by using Apollo Client. Therefore, import the following utility from Apollo Boost to define the query:

{{< highlight javascript "hl_lines=2" >}}
import 'cross-fetch/polyfill';
import ApolloClient, { gql } from 'apollo-boost';
{{< /highlight >}}

Then you can define your query with JavaScript template literals. As in the previous application which used only plain HTTP requests, you will query a GitHub organization which is known for teaching people about React.

{{< highlight javascript "hl_lines=3 4 5 6 7 8 9 10" >}}
...

const GET_ORGANIZATION = gql`
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
    }
  }
`;
{{< /highlight >}}

Last but not least, you can use the Apollo Client imperatively to send the query to GitHub's GraphQL API. Since the Apollo Client is promise based, the `query()` method returns a promise which you can resolve eventually. Since the application runs on the command line, it's sufficient to console log the result there.

{{< highlight javascript "hl_lines=3 4 5 6 7" >}}
...

client
  .query({
    query: GET_ORGANIZATION,
  })
  .then(console.log);
{{< /highlight >}}

Basically that's it for sending a query with Apollo Client. As noted before, Apollo Client uses HTTP under the hood to send the defined query as payload in a POST method. The result on the command line after starting the application with `npm start` should look similar to the following output:

{{< highlight javascript >}}
{
  data: {
    organization: {
      name: 'The Road to learn React',
      url: 'https://github.com/the-road-to-learn-react',
      __typename: 'Organization'
    }
  },
  loading: false,
  networkStatus: 7,
  stale: false
}
{{< /highlight >}}

The actual requested information from the GraphQL query can be found in the `data` object. There you find the `organization` object with its `name` and `url` fields. In addition, the Apollo Client automatically requests the GraphQL {{% a_blank "meta field" "http://graphql.org/learn/queries/#meta-fields" %}} `__typename`. The meta field can be used by the Apollo Client as identifier to enable caching and optimistic UI updates for you. You will learn later about these features, but only occasionally you will use the meta field yourself.

Further meta information about the request can be found next to the `data` object. There you see whether the data is still loading (perhaps then you can show a loading indicator), get specific details about the {{% a_blank "network status" "https://github.com/apollographql/apollo-client/blob/master/packages/apollo-client/src/core/networkStatus.ts" %}}, and see whether the requested data is stale on the server-side.

### Exercises:

* explore GitHub's GraphQL API
  * add other fields for the `organization` field
* read more about {{% a_blank "why you should use Apollo Client" "https://www.apollographql.com/docs/react/why-apollo.html" %}}
* read more about the {{% a_blank "networkStatus property and its possible values" "https://github.com/apollographql/apollo-client/blob/master/packages/apollo-client/src/core/networkStatus.ts" %}}
* invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5MF35H5" %}}

{{% chapter_header "Apollo Client with Pagination, Variables, Nested Objects and List Fields" "graphql-apollo-client-pagination" %}}

You have learned about GraphQL pagination and other GraphQL features in previous sections. This section will introduce a couple of these features, but keeps most of them for you as your exercise to internalize these things. Let's start this section with introducing GraphQL variables. The `login` argument for the organization field in the previous query can be substituted with such a variable. First, you have to introduce the variable in your GraphQL query:

{{< highlight javascript "hl_lines=2 3 13 14 15" >}}
const GET_ORGANIZATION = gql`
  query($organization: String!) {
    organization(login: $organization) {
      name
      url
    }
  }
`;
{{< /highlight >}}

And second, define it in a variables object in your query object:

{{< highlight javascript "hl_lines=4 5 6" >}}
client
  .query({
    query: GET_ORGANIZATION,
    variables: {
      organization: 'the-road-to-learn-react',
    },
  })
  .then(console.log);
{{< /highlight >}}

That's how you can pass variables to the query when using the instance of the Apollo Client in your application. Last but not least, add the nested `repositories` list field to your organization. That's the place where you can request all GitHub repositories in an organization. You may want to rename the query variable as well. Don't forget to change it when you actually make use of it with the Apollo Client.

{{< highlight javascript "hl_lines=1 6 7 8 9 10 11 12 13 20" >}}
const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query($organization: String!) {
    organization(login: $organization) {
      name
      url
      repositories(first: 5) {
        edges {
          node {
            name
            url
          }
        }
      }
    }
  }
`;

client
  .query({
    query: GET_REPOSITORIES_OF_ORGANIZATION,
    variables: {
      organization: 'the-road-to-learn-react',
    },
  })
  .then(console.log);
{{< /highlight >}}

You have seen a similar query structure in another application from a previous section. You should be familiar with it. That's why this section has a couple of exercises for you to test your learned GraphQL skills from the previous sections. Solving the exercises will fortify your GraphQL skills so that you can focus on connecting the Apollo Client yo your React application in the next sections. But no worries: You will find all the solutions to the exercises in a GitHub repository for this application at the end of the exercises. However, try it first on your own.

### Exercises:

* explore GitHub's GraphQL API
  * extend the `repositories` list field by querying an ordered list of repositories which is ordered by the number of stargazers
* extract the content of a repository `node` to a GraphQL a reusable fragment
* add the pagination feature for list of repositories
  * add the `pageInfo` field with its `endCursor` and `hasNextPage` fields in the query
  * add the `after` argument and introduce a new `$cursor` variable for it
  * perform the first query without a `cursor` argument
  * perform a second query with the `endCursor` of the previous query result as `cursor` argument
* checkout the {{% a_blank "source code" "https://github.com/rwieruch/node-appollo-boost-github-graphql-api" %}} of the previously implemented application and align your thoughts/implementation with it
* invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/SWL9NJ7" %}}

{{% chapter_header "Apollo Client and a GraphQL Mutation" "graphql-apollo-client-mutation" %}}

In the previous section, you have learned how to query data from GitHub's GraphQL API using the Apollo Client. Once the client is set up with a configuration, you can use its `query()` method to send a GraphQL `query` with optional `variables`. As you have learned, reading data with GraphQL is not everything, because there are mutations for writing data as well. In this section, you are going to define a mutation to star a repository on GitHub. The instance of the Apollo Client can send the mutation. First, you can define the mutation. You may be familiar with it from the other applications built in this tutorial.

{{< highlight javascript >}}
const ADD_STAR = gql`
  mutation AddStar($repositoryId: ID!) {
    addStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;
{{< /highlight >}}

As you can see, the only variable needed is an identifier for the repository. Otherwise, GitHub's GraphQL server wouldn't know which repository you want to star. In the following, the Apollo Client is used to star a specific GitHub repository with a given identifier. The identifier can be retrieved by adding the `id` field to your repository `node` field in the query. In the end, you can use the `mutate()` method on the Apollo Client to send the mutation in a `mutation` and `variables` payload. Afterward, you can do anything with the result. In this case, the result should only be logged on the command line.

{{< highlight javascript >}}
client
  .mutate({
    mutation: ADD_STAR,
    variables: {
      repositoryId: 'MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw==',
    },
  })
  .then(console.log);
{{< /highlight >}}

Once you start your application on the command line again, you should see the mutation result. The result should be encapsulated in a `addStar` object (the name of the mutation) which should reflect exactly the objects and fields that you have defined in the mutation: `starrable`, `id` and `viewerHasStarred`.

In the previous sections, you have done another learning step by using only Apollo Client without any view-layer library. That's hopefully the way how you won't confuse the features of Apollo Client and the connecting view-layer library React Apollo in the following sections. In conclusion, Apollo Client can be used as a standalone GraphQL client without connecting it to any view-layer such as React whatsoever. However, now it seems a bit dull to see the data only on the command line. That's why people invented HTML and CSS in the first place. So let's see how Apollo can be connected as your data-layer to your React view-layer in the following section.

### Exercises:

* implement the `removeStar` mutation next to the `addStar` mutation
* checkout the {{% a_blank "source code" "https://github.com/rwieruch/node-appollo-boost-github-graphql-api" %}} of the previously implemented application and align your thoughts/implementation with it
* invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5XMNFSY" %}}

{{% chapter_header "Writing your first React with GraphQL and Apollo Client" "react-graphql-apollo-client" %}}

The following sections are focusing on using Apollo Client in React by building another client application. Basically you will learn how to connect your data-layer with your view-layer. The most obvious question(s) to be answered will be: How to send queries and mutations from the view-layer and how to update the view-layer accordingly to reflect the result? Furthermore, you will get to know how to use GraphQL features such as pagination, optimistic UI, caching, local state management and prefetching with Apollo Client in React. Hopefully you are keen to explore all these possibilities together with me.

For this application, there is no elaborated React setup needed. You will simply use [create-react-app](https://github.com/facebook/create-react-app) to create your React application. If you want to have an elaborated React setup instead, read up this [setup guide for using Webpack with React](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/). In order to get you started, the following steps have to be performed:

* create a new React application with create-react-app
* create a folder/file structure for your project (recommendation below)

It's up to you to come up with an own folder/file structure for your components in the *src/* folder. The following top level structure is only a recommendation. If you adjust it to your own needs, keep in mind that the JavaScript import statements with their paths may vary for your own application structure. Along the way, you may introduce additional folders and files.

* App/
  * index.js
* Button/
* Error/
* FetchMore/
* Input/
* Issue/
  * IssueList/
  * IssueItem/
  * index.js
* Link/
* Loading/
* Organization/
* Profile/
* Repository/
  * RepositoryList/
  * RepositoryItem/
  * index.js
* TextArea/
* constants/
  * routes.js
* index.js
* registerServiceWorker.js
* style.css

As you can see, the folders mostly represent React components. Whereas some components will be reusable UI components such as the Input and Link components, other components such as Repository and Profile components are domain specific for the GitHub client application. In addition, only the top level folders are specified for now. You will introduce further folders and files later on your own. Moreover the constants folder has only one file to specify the routes of the application which will be introduced later as well. After all, you may want to navigate from a page which shows repositories of an organization (Organization component) to a page which shows repositories of yourself (Profile component).

This application will use plain CSS classes and CSS files. If you want to introduce anything else to style your React components, it's up to you to give it your own spin. However, by following the plain CSS classes for now, you should not run into any difficulties for this application. Maybe you want to introduce your own styling solution when its finished from a tutorial's point of view. Last but not least, you will find all the CSS files and their content in the appendix of this tutorial. The components will use their class names without explaining them furthermore. The following sections should be purely dedicated to JavaScript, React and GraphQL.

### Exercises:

* if you are not familiar with React, read up *The Road to learn React*
* setup the recommended folder/file structure (if you are not going with your own structure)
  * create the CSS *style.css* files in their specified folders from the [appendix](#appendix-styling) section of this tutorial
  * create the *index.js* files for the components
  * create further folders on your own for non top level components (e.g. Navigation) when conducting the following sections
* run the application with `npm start`
 * make sure there are no errors
 * render only a basic App component with *src/App/index.js* in the *src/index.js* file
* invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5N9W2WR" %}}

{{% chapter_header "Configure Apollo Client for React and GitHub's GraphQL API" "react-apollo-client-configuration" %}}

In this section, you will set up a Apollo Client instance as you have done before in the Node.js environment. However, this time you will use Apollo Client directly without the zero-configuration package Apollo Boost. Hence you have to configure the Apollo Client yourself and don't get sensible defaults. Whereas I often believe it's best to use a tool with sensible defaults for the purpose of learning about it, I feel like configuring Apollo yourself will lay out the power of the fine-grained composable ecosystem of Apollo Client to you, how to use them for an initial setup and how to advance your setup with them later on. If you don't understand everything in this section, don't worry too much about it. You can always revisit it later. The thing which matters the most in this section is that you are creating a Apollo Client instance with your own configuration.

All the Apollo Client setup can be done in the top level *src/index.js* file of your project where you have your React to HTML entry point as well. Before you touch this file, you have to install the Apollo Client on the command line in your project folder:

{{< highlight javascript >}}
npm install apollo-client --save
{{< /highlight >}}

Furthermore, you need two utility packages for two mandatory configurations that are used for the Apollo Client creation. Whereas the {{% a_blank "apollo-cache-inmemory" "https://github.com/apollographql/apollo-client/tree/master/packages/apollo-cache-inmemory" %}} is a recommended cache (read also as: store or state) for your Apollo Client to manage the data, apollo-link-http is used to configure the URI and additional network information once for your Apollo Client instance.

{{< highlight javascript >}}
npm install apollo-cache-inmemory apollo-link-http --save
{{< /highlight >}}

As you can see, their is nothing yet mentioned about React. It's only the Apollo Client plus two packages for the configuration of it. Moreover, there are two more packages that you have to install for Apollo Client to work with GraphQL. They are used as internal dependencies by Apollo. However, the latter one is also used to define your queries and mutations later on. Before these utilities came directly from Apollo Boost as you may recall.

{{< highlight javascript >}}
npm install graphql graphql-tag --save
{{< /highlight >}}

That's it for the package installation ceremony. Let's enter the Apollo Client setup and configuration ceremony now. In your top level *src/index.js* file, where all the Apollo Client setup will be done in this section, import the necessary classes for the Apollo Client setup from the previously installed packages.

{{< highlight javascript "hl_lines=3 4 5" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import './style.css';
import App from './App';

...
{{< /highlight >}}

Whereas the `ApolloClient` class is used to create the client instance, the `HttpLink` and `InMemoryCache` are used for the two mandatory configurations when creating the client instance. First, you can create a configured `HttpLink` instance. The instance will be fed later to the Apollo Client creation.

{{< highlight javascript >}}
const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});
{{< /highlight >}}

You may recall this mandatory configuration from previous applications. The `uri` is a mandatory value to define the one and only GraphQL API endpoint that should be used by the Apollo Client. In this case, Github's GraphQL endpoint is passed as value to it. Furthermore, when consuming the GitHub GraphQL API, you have to authorize yourself with your personal access token. You should have already created the token in a previous section. You can define it in a *.env* file in your project folder. Afterward, it should be accessible with `process.env`. Keep in mind that you have to use the `REACT_APP` prefix when using create-react-app.

Second, you create the cache as your place where the data is managed in Apollo Client. The cache normalizes your data, caches requests to avoid making a unnecessary request twice and makes it possible to read and write data to the cache as well. You will make use of it multiple times while developing this application. After all, the cache instantiation is straight forward. It doesn't require you to pass any arguments to it, but you can read up the API later to explore further configurations of it.

{{< highlight javascript >}}
const cache = new InMemoryCache();
{{< /highlight >}}

Finally you can use both instantiated configurations, the link and the cache, to create the instance of the Apollo Client.

{{< highlight javascript >}}
const client = new ApolloClient({
  link: httpLink,
  cache,
});
{{< /highlight >}}

In order to initialize Apollo Client, you must specify link and cache properties on the config object. Once you start your application again, everything should run without any errors. If it doesn't check whether you have implemented a basic App component in your *src/App/index.js* file. After all, the `ReactDOM` API needs to hook this component into the HTML.

### Exercises:

* read more about {{% a_blank "the network layer configuration in Apollo Client" "https://www.apollographql.com/docs/react/advanced/network-layer.html" %}}
* invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5FYZT8T" %}}

{{% chapter_header "Connect Data-Layer to View-Layer: Introducing React Apollo" "react-apollo-connecting-layers" %}}

Everything you have done before was the framework agnostic part of Apollo Client. However, without connecting React to the Apollo Client, you would have a hard time making use of GraphQL in React in a convenient way. That's why there exists an official library to connect both worlds: {{% a_blank "react-apollo" "https://github.com/apollographql/react-apollo" %}}. The great thing about those connecting libraries: there exist solutions for other view-layer solutions such as Angular and Vue too. Hence you can make use of the Apollo Client in a framework agnostic way. In the following, it needs two steps to connect the Apollo Client with React. First, install the mentioned library on the command line in your project folder:

{{< highlight javascript >}}
npm install react-apollo --save
{{< /highlight >}}

Second, import its ApolloProvider component and use it as a composing component around your App component. Under the hood, it uses React's Context API to pass the Apollo Client through your application. You shouldn't forget to pass the client instance to it as prop:

{{< highlight javascript "hl_lines=3 11 13" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

...

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
{{< /highlight >}}

That's it. Now you have implicit access to the Apollo Client in your React view-layer. It says implicit, because most often you will not use the client in an explicit way. You will see in the next section what this means.

### Exercises:

* read more about {{% a_blank "configuring and connecting Apollo Client to React" "https://www.apollographql.com/docs/react/essentials/get-started.html" %}}
* invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5FHMHW8" %}}

{{% chapter_header "GraphQL Query with Apollo Client in React" "react-apollo-client-query" %}}

In this section, you are going to implement your first GraphQL query using Apollo Client in React. In previous sections, you have already seen how different entities, such as the current user (viewer) or repositories, can be queried from GitHub's GraphQL API. This time you will do it in React. A Profile component might be the best place to render the current user and the associated repositories of this user. You can start out by using the not yet implemented Profile component in your App component. Implementing the Profile component will be the next step. It makes sense to extract the Profile component at this early point in time, because the App component will later be the static frame around the application whereas components such as Navigation and Footer are static and components such as Profile and Organization are dynamically rendered based on routing (URLs).

{{< highlight javascript "hl_lines=3 7" >}}
import React, { Component } from 'react';

import Profile from '../Profile';

class App extends Component {
  render() {
    return <Profile />;
  }
}

export default App;
{{< /highlight >}}

In your *src/Profile/index.js* file, add a simple functional stateless component. In the next step you will extend it with a GraphQL query.

{{< highlight javascript >}}
import React from 'react';

const Profile = () =>
  <div>Profile</div>

export default Profile;
{{< /highlight >}}

The question is how to query data with GraphQL and Apollo Client now? The Apollo Client was provided in a previous section with React's Context API in a top level component. You have implicit access to it but never use it directly for standard queries and mutations. It says "standard" here, because there will be situation where you will use the Apollo Client instance directly while implementing this application. So how to query the data then? That's where React Apollo comes into play. The package gives you access to a Query component, which takes a query as prop and executes this query when it is rendered. That's the important part: It executes the query when it is rendered. Furthermore, it uses React's {{% a_blank "render props" "https://reactjs.org/docs/render-props.html" %}} pattern. It uses a children as a function implementation where you can access the result of the query as argument eventually.

{{< highlight javascript "hl_lines=2 5 6 7" >}}
import React from 'react';
import { Query } from 'react-apollo';

const Profile = () => (
  <Query query={}>
    {() => <div>My Profile</div>}
  </Query>
);

export default Profile;
{{< /highlight >}}

Basically it is a function which returns only JSX again, but you have access to additional information in the function arguments. You will see how to access the query result after the next step. First, you have to define the GraphQL query to request information about you as currently authorized user. Therefore, you can use a previously installed utility package to define the query.

{{< highlight javascript "hl_lines=2 5 6 7 8 9 10 11 12 15" >}}
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
    }
  }
`;

const Profile = () => (
  <Query query={GET_CURRENT_USER}>
    {() => <div>My Profile</div>}
  </Query>
);

export default Profile;
{{< /highlight >}}

Afterward, use the children as a function pattern to retrieve the query result as data object and render the information in your JSX.

{{< highlight javascript "hl_lines=16 17 18 19 20 21 22 23 24" >}}
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
    }
  }
`;

const Profile = () => (
  <Query query={GET_CURRENT_USER}>
    {({ data }) => {
      const { viewer } = data;

      return (
        <div>
          {viewer.name} {viewer.login}
        </div>
      );
    }}
  </Query>
);

export default Profile;
{{< /highlight >}}

Last but not least, you need to make sure that when no data is there yet, that you show something else, because the viewer object is not there.

{{< highlight javascript "hl_lines=6 7 8" >}}
const Profile = () => (
  <Query query={GET_CURRENT_USER}>
    {({ data }) => {
      const { viewer } = data;

      if (!viewer) {
        return null;
      }

      return (
        <div>
          {viewer.name} {viewer.login}
        </div>
      );
    }}
  </Query>
);
{{< /highlight >}}

That's how you define a GraphQL query in a declarative way in React. Once the Query component renders, the request is executed. Under the hood the Apollo Client is used, which was provided in a top level component, to perform the query. The render props pattern makes it possible to access the result of the query in the child function. You can try it in your browser to verify that it actually works for you.

There is more information that you can access in the render prop function. You will only explore a few in this tutorial, but if you are interested, you can checkout the official documentation of React Apollo API. So what about showing a loading indicator when the query is pending? You can do it:

{{< highlight javascript "hl_lines=3 6 7 8" >}}
const Profile = () => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading }) => {
      const { viewer } = data;

      if (loading || !viewer) {
        return <div>Loading ...</div>;
      }

      return (
        <div>
          {viewer.name} {viewer.login}
        </div>
      );
    }}
  </Query>
);
{{< /highlight >}}

Now you are showing a loading indicator when there is no `viewer` object or the `loading` boolean is set to true. As you can assume that the request will be pending when there is no `viewer` yet, you can simply show the loading indicator from the beginning. At this point, it's best to extract the loading indicator as its own component because you will have to reuse it later for other queries as well. You should have created a Loading folder for it before where you can create a *src/Loading/index.js* file. Afterward, make sure to use it in your Profile component.

{{< highlight javascript >}}
import React from 'react';

const Loading = () =>
  <div>Loading ...</div>

export default Loading;
{{< /highlight >}}

Last but not least, you are going to extend the query with a nested list field for querying your own GitHub repositories. You have done it a few times before, so the query structure shouldn't be any different now. The following query requests a bunch of information that you will use in this application eventually. It's up to you to revisit GitHub's GraphQL API documentation to find out more about those fields that are available on a repository entity.

{{< highlight javascript "hl_lines=1 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31" >}}
const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
      ) {
        edges {
          node {
            id
            name
            url
            descriptionHTML
            primaryLanguage {
              name
            }
            owner {
              login
              url
            }
            stargazers {
              totalCount
            }
            viewerHasStarred
            watchers {
              totalCount
            }
            viewerSubscription
          }
        }
      }
    }
  }
`;
{{< /highlight >}}

Afterward, use this extended and renamed query in your Query component for requesting the additional information about repositories. Furthermore, pass these repositories from the query result to a new RepositoryList component which should do all the rendering for you. It's not the responsibility of the Profile component and furthermore you may want to render a list of repositories somewhere else at some point too.

{{< highlight javascript "hl_lines=3 9 17" >}}
...

import RepositoryList from '../Repository';
import Loading from '../Loading';

...

const Profile = () => (
  <Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
    {({ data, loading }) => {
      const { viewer } = data;

      if (loading || !viewer) {
        return <Loading />;
      }

      return <RepositoryList repositories={viewer.repositories} />;
    }}
  </Query>
);
{{< /highlight >}}

In your *src/Repository/index.js* file, create your first import/export statements for the RepositoryList component that comes from a dedicated file in this folder. Basically the *index.js* file is used as your entry point to this Repository module. Everything that is used from within this module should be accessible by importing it from this *index.js* file.

{{< highlight javascript >}}
import RepositoryList from './RepositoryList';

export default RepositoryList;
{{< /highlight >}}

Next define the RepositoryList component in your *src/Repository/RepositoryList/index.js* file. The component only takes the array of repositories as props, which will be retrieved by the GraphQL query, in order to render a list of RepositoryItem components. The identifier of each repository can be passed as key attribute to the rendered list. Otherwise all props from one repository node are passed to the RepositoryItem by using the JavaScript spread operator.

{{< highlight javascript >}}
import React from 'react';

import RepositoryItem from '../RepositoryItem';

import '../style.css';

const RepositoryList = ({ repositories }) =>
  repositories.edges.map(({ node }) => (
    <div key={node.id} className="RepositoryItem">
      <RepositoryItem {...node} />
    </div>
  ));

export default RepositoryList;
{{< /highlight >}}

Finally, define the RepositoryItem component in the *src/Repository/RepositoryItem/index.js* file to render all the queried information about each repository. The file already uses a couple of stylings which you may have defined in a CSS file as suggested before. Otherwise the component renders only static information for now.

{{< highlight javascript >}}
import React from 'react';

import Link from '../../Link';

import '../style.css';

const RepositoryItem = ({
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}) => (
  <div>
    <div className="RepositoryItem-title">
      <h2>
        <Link href={url}>{name}</Link>
      </h2>

      <div className="RepositoryItem-title-action">
        {stargazers.totalCount} Stars
      </div>
    </div>

    <div className="RepositoryItem-description">
      <div
        className="RepositoryItem-description-info"
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />
      <div className="RepositoryItem-description-details">
        <div>
          {primaryLanguage && (
            <span>Language: {primaryLanguage.name}</span>
          )}
        </div>
        <div>
          {owner && (
            <span>
              Owner: <a href={owner.url}>{owner.login}</a>
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default RepositoryItem;
{{< /highlight >}}

As you can see, the anchor element to link to the repository is already extracted as a Link component. The Link component in the *src/Link/index.js* file could look like the following just to make it possible to open up those URLs in an extra browser tab:

{{< highlight javascript >}}
import React from 'react';

const Link = ({ children, ...props }) => (
  <a {...props} target="_blank">
    {children}
  </a>
);

export default Link;
{{< /highlight >}}

Once you start your application again, you should see a styled list of repositories with a name, url, description, the count of stars, owner and used language for the implementation of the project. If you cannot see any repositories, check whether your GitHub account has any public repositories in the first place. If it doesn't, then it's normal that nothing shows up. You can make yourself comfortable with GitHub by creating a couple of repositories for the sake of learning about GitHub but also to have this data available for this tutorial. Another way to create repositories for your own account is forking repositories from other people.

What you have done in the last steps of this section were pure React implementations. This is only one opinionated way on how you can structure your components. The most important part from this section though happens in the Profile component. There you have introduced a Query component which takes a query as prop. Once the Query component renders, it executes the GraphQL query. The result of the query is made accessible as argument within React's render props pattern.

### Exercises:

* read more about {{% a_blank "queries with Apollo Client in React" "https://www.apollographql.com/docs/react/essentials/queries.html" %}}
* invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/53Q6K3V" %}}

{{% chapter_header "Apollo Client Error Handling in React" "react-apollo-client-error-handling" %}}

Before diving into using GraphQL mutations in React with Apollo Client, this section should give you clarity about the error handling when using Apollo in React. The error handling can happen on two levels: application level and query/mutation level. Let's see how both can be implemented with the following two cases. On a query level, in your Profile component, you have access to the query `data` and `loading` properties. Apart from these you can also access the `error` object that can be used to show a conditional error message.

{{< highlight javascript "hl_lines=5 11 12 13 14" >}}
...

import RepositoryList from '../Repository';
import Loading from '../Loading';
import ErrorMessage from '../Error';

...

const Profile = () => (
  <Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
    {({ data, loading, error }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      const { viewer } = data;

      if (loading || !viewer) {
        return <Loading />;
      }

      return <RepositoryList repositories={viewer.repositories} />;
    }}
  </Query>
);

export default Profile;
{{< /highlight >}}

Whereas the ErrorMessage component from the *src/Error/index.js* could look like the following:

{{< highlight javascript >}}
import React from 'react';

import './style.css';

const ErrorMessage = ({ error }) => (
  <div className="ErrorMessage">
    <small>{error.toString()}</small>
  </div>
);

export default ErrorMessage;
{{< /highlight >}}

Try to change the naming of a field in your query to something that is not offered by GitHub's GraphQL API and see what's rendered in the browser. You should see something like this: *Error: GraphQL error: Field 'viewers' doesn't exist on type 'Query'*. Or if you simulate being offline you should get something similar to this: *Error: Network error: Failed to fetch*. That's how errors can be differentiated into GraphQL errors and network errors. In conclusion, that's how you can handle errors on a component (or query) level when doing queries but also mutations later on. So how could this error handling be implemented on an application level? First, there is another Apollo package which can be installed for this use case:

{{< highlight javascript >}}
npm install apollo-link-error --save
{{< /highlight >}}

You can import it in your *src/index.js* file and create such an error link:

{{< highlight javascript "hl_lines=6" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

...

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // do something with graphql error
  }

  if (networkError) {
    // do something with network error
  }
});
{{< /highlight >}}

For instance, you could differentiate the error handling on application level into development and production mode. When developing your application, it might be sufficient to console log the errors to your developer console in the browser. When in production mode, you can setup a error tracking service such as {{% a_blank "Sentry" "https://sentry.io" %}}. That's how you would always see the errors in a web accessible dashboard which would perhaps helps you to address and solve them as bugs.

Now you have two links in your application: `httpLink` and `errorLink`. How can you combine both for creating the Apollo Client instance? There exists another useful package in the Apollo ecosystem that makes link compositions possible. First, install it on the command line:

{{< highlight javascript >}}
npm install apollo-link --save
{{< /highlight >}}

And second, use it to combine your two links:

{{< highlight javascript "hl_lines=3 14 19" >}}
...
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

...

const httpLink = ...

const errorLink = ...

const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});
{{< /highlight >}}

That's how two or multiple links can be composed for creating a Apollo Client instance. There exist several links, developed by the community and Apollo maintainers, to extend your Apollo Client with advanced functionalities. So it's up to you to explore them as an exercise of this section.

In conclusion of this section, it's important to see that links can be used to access and modify the GraphQL control flow. When doing so, you have to be careful to chain the control flow in the correct order. The `apollo-link-http` is called a **terminating link**, because it turns an operation into a result which happens usually by performing a network request. On the other side, the `apollo-link-error` is a **non-terminating link**. It only enhances your terminating link with features. After all, a terminating link has to be last entity in the control flow chain.

### Exercises:

* read more about {{% a_blank "different Apollo Error types and error policies" "https://www.apollographql.com/docs/react/features/error-handling.html" %}}
* read more about {{% a_blank "Apollo Links" "https://www.apollographql.com/docs/link/" %}}
* read more about {{% a_blank "composable Apollo Links" "https://www.apollographql.com/docs/link/composition.html" %}}
* implement the {{% a_blank "apollo-link-retry" "https://www.apollographql.com/docs/link/links/retry.html" %}} in case a network request fails
* invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/53HLLFX" %}}

{{% chapter_header "GraphQL Mutation with Apollo Client in React" "react-apollo-client-mutations" %}}

The previous sections have taught you how to query data with React Apollo and the Apollo Client. In this section, you will learn about mutations. As in other applications before, you will implement starring a repository with GitHub's exposed `addStar` mutation.

The mutation will already start out with a variable to identify the repository which is going to be starred. In your Query component before, you haven't used a variable so far. But if you would have to use a variable there, it would work the same way as with the following mutation which can be defined in the *src/Repository/RepositoryItem/index.js* file.

{{< highlight javascript "hl_lines=2 6 7 8 9 10 11 12 13 14 15" >}}
import React from 'react';
import gql from 'graphql-tag';

...

const STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

...
{{< /highlight >}}

The mutation definition takes the `id` variable as input for the actual `addStar` mutation. Furthermore, as you have done before, you can decide what should be returned in case of a successful mutation. Now, you can use a Mutation component analog to the previously used Query component. You have to pass the mutation prop, but this time also a variable prop for passing the identifier for the repository.

{{< highlight javascript "hl_lines=3 8 26 27 28" >}}
import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

...

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}) => (
  <div>
    <div className="RepositoryItem-title">
      <h2>
        ...
      </h2>

      <div>
        <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
          {addStar => <div>{stargazers.totalCount} Star</div>}
        </Mutation>
      </div>
    </div>

    <div className="RepositoryItem-description">
      ...
    </div>
  </div>
);
{{< /highlight >}}

Note: The surrounding div element of the Mutation component is already there for other mutations that you will implement in the exercises of this section.

The `id` for each repository should be available due to previous query result. It has to be used as a variable for the mutation to identify the repository. Furthermore, the Mutation component is used in a similar way as the Query component, because it implements the render prop pattern too. But the first argument is different here: It is the mutation as a function instead of the mutation result this time. Hence you can use this function to trigger the mutation before expecting a result. Later you will see how to retrieve the mutation result. For now, the mutating function can be used in a button element. Or in this case already in a Button component.

{{< highlight javascript "hl_lines=4 16 17 18 19 20 21" >}}
...

import Link from '../../Link';
import Button from '../../Button';

...

const RepositoryItem = ({ ... }) => (
  <div>
    <div className="RepositoryItem-title">
      ...

      <div>
        <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
          {(addStar) => (
            <Button
              className={'RepositoryItem-title-action'}
              onClick={addStar}
            >
              {stargazers.totalCount} Star
            </Button>
          )}
        </Mutation>
      </div>
    </div>

    ...
  </div>
);
{{< /highlight >}}

Whereas the styled Button component could be implemented like the following in the *src/Button/index.js* file. It's already extracted, because later you will make use of all its styling functionalities in other places of this application.

{{< highlight javascript >}}
import React from 'react';

import './style.css';

const Button = ({
  children,
  className,
  color = 'black',
  type = 'button',
  ...props
}) => (
  <button
    className={`${className} Button Button_${color}`}
    type={type}
    {...props}
  >
    {children}
  </button>
);

export default Button;
{{< /highlight >}}

Let's get to the mutation result which was left out before. Actually you have access to it as second argument in your child function of the render prop.

{{< highlight javascript "hl_lines=8" >}}
const RepositoryItem = ({ ... }) => (
  <div>
    <div className="RepositoryItem-title">
      ...

      <div>
        <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
          {(addStar, { data, loading, error }) => (
            <Button
              className={'RepositoryItem-title-action'}
              onClick={addStar}
            >
              {stargazers.totalCount} Star
            </Button>
          )}
        </Mutation>
      </div>
    </div>

    ...
  </div>
);
{{< /highlight >}}

After all, a mutation works similar to a query when using React Apollo. It uses the render prop pattern to access the mutation and the result of the mutation. The mutation can be used as a function in the UI. It has access to the variables that are passed in the Mutation component, but it can also override the variables when you pass them in a configuration object to the function (e.g. `addStar({ variables: { id } })`). That's a general pattern in React Apollo: You can specify the information (e.g. variables) in the Mutation component or when you actually call the mutating function to override it.

There is one last thing for the sake of preparing the exercise, but foremost for demonstrating Apollo Client's powerful local state management. If you use the `viewerHasStarred` boolean from the query result, which reflects whether a user has starred a repository or not, to show either a "Star" or "Unstar" button, you can do it with a conditional rendering.

{{< highlight javascript "hl_lines=7 18 19 20 22" >}}
const RepositoryItem = ({ ... }) => (
  <div>
    <div className="RepositoryItem-title">
      ...

      <div>
        {!viewerHasStarred ? (
          <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
            {(addStar, { data, loading, error }) => (
              <Button
                className={'RepositoryItem-title-action'}
                onClick={addStar}
              >
                {stargazers.totalCount} Star
              </Button>
            )}
          </Mutation>
        ) : (
          <span>{/* Here comes your removeStar mutation */}</span>
        )}

      {/* Here comes your updateSubscription mutation */}
      </div>
    </div>

    ...
  </div>
);
{{< /highlight >}}

When you star a repository with the previous implementation, the "Star" button disappears. That's great, because it means that the `viewerHasStarred` boolean has been updated in Apollo Client's cache for the identified repository. There was no extra implementation needed from your side. Apollo Client was able to match the mutation result with the repository identifier to the repository entity in Apollo Client's cache. The props were updated and the UI re-rendered.

Yet on the other side the count of stargazers who have starred the repository isn't updated. It's because it cannot be retrieved from GitHub's API. That's why it would be up to you to update the count yourself in Apollo Client's cache. No worries for now, you will find out more about this topic in one of the following sections.

### Exercises:

* read more about {{% a_blank "mutations with Apollo Client in React" "https://www.apollographql.com/docs/react/essentials/mutations.html" %}}
* implement other mutations in the RepositoryItem component
  * implement the `removeStar` mutation when the `viewerHasStarred` boolean is true
  * show a button with the watchers count which should be used to watch/unwatch a repository
    * implement the `updateSubscription` mutation from GitHub's GraphQL API to watch/unwatch a repository based on the `viewerSubscription` status
* invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5GJQWXC" %}}

{{% chapter_header "GraphQL Query/Mutation with Higher-Order Components in React" "react-apollo-client-query-mutation-higher-order-component" %}}

In the previous section, you have introduced the Query and Mutation components from React Apollo to connect your data-layer (Apollo Client) with your view-layer (React). Whereas the Query component executes the query when it is rendered, the Mutation component gives access to a function that can be used to trigger the mutation. Both components use the render props pattern to make the results accessible in their child functions.

There exists a widely accepted alternative to React's render prop pattern: [Higher-Order Components (HOC)](https://www.robinwieruch.de/gentle-introduction-higher-order-components/). The React Apollo package implements a Higher-Order Component for queries and mutations as well. However, the team behind Apollo doesn't advertise it and decided in favor of render props as their first class citizen. Nonetheless, this section shows you the alternative by using a Higher-Order Component instead of a Render Prop although the tutorial will continue to use the render prop pattern afterward. So you are free to try out the alternative, but you may want to stick to render props afterward for the sake of this tutorial.

First, simply imagine you would have already access to the query result in the Profile component's arguments. There is no Query component needed in the component itself.

{{< highlight javascript >}}
const Profile = ({ data, loading, error }) => {
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { viewer } = data;

  if (loading || !viewer) {
    return <Loading />;
  }

  return <RepositoryList repositories={viewer.repositories} />;
};
{{< /highlight >}}

There is no GraphQL involved here, because all you can see is the pure view-layer. Instead, the data-layer logic is extracted into a Higher-Order Component. You would have to import the `graphql` HOC from the React Apollo package in order to apply it on the Profile component. It takes the query definition as argument.

{{< highlight javascript "hl_lines=3 19" >}}
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

...

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      ...
    }
  }
`;

const Profile = ({ data, loading, error }) => {
  ...
};

export default graphql(GET_REPOSITORIES_OF_CURRENT_USER)(Profile);
{{< /highlight >}}

You can start your application and verify that it still works. Personally I find the HOC approach cleaner than the render props, because it co-locates both, data-layer and view-layer, instead of inserting the one into the other. However, the team behind Apollo made the decision to favor render props instead. Even though I find the HOC approach more concise, I must admit the render prop pattern comes with its own advantages in this scenario of mutating and querying data. For instance, imagine a query would depend on a prop which can be used as variable. Whereas it would be cumbersome to access the incoming prop in a statically defined Higher-Order Component (it is possible though), it can be dynamically used in a render prop because it is used within the Profile component where the props are naturally accessible. Another advantage is the power of composition when using render props. When one query depends on the result of another query, it can be achieved by composing render props. It can be achieved with HOCs as well, but again it is more cumbersome. In the end, it boils down to a seemingly never ending "Higher-Order Components vs Render Props"-discussions. You can read about those discussions in various articles which you can find with your favorite search engine.

### Exercises:

* come up with your own opinion about the advantages and disadvantages of using a Higher-Order Component or Render Prop
* try to implement one of your mutations with a Higher-Order Component
* invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5G6QPLY" %}}

{{% chapter_header "Local State Management with Apollo Client in React" "react-apollo-client-local-state-management" %}}

Let's get back to the Repository component. You have experienced that the `viewerHasStarred` boolean updates in the Apollo Client's cache after a mutation was successful. That's great, because Apollo Client handles this for you based on the knowledge it gets from the mutation result. If you have followed the exercises of the mutation section, you should probably see something like a toggling "Star" and "Unstar" label for the button when starring and unstarring a repository. All of this happens because you return the `viewerHasStarred` boolean in your mutation result. Apollo Client is clever enough to update the repository entity, which is normalized accessible in the cache, for you. That's a pretty powerful default behavior, isn't it? You don't need to take care about this local state management yourself. Apollo Client figures it out for you as long as you provide useful information in the mutation's result.

However, Apollo Client doesn't update the count of stargazers after the mutation. Normally when starring a repository, you would assume that the count of stars increments by one. When unstarring a repository, the count should decrease by one. Since we don't return any count of stargazers in the mutation result, you have to handle the update in Apollo Client's cache yourself. A naive approach would be to use Apollo Client's `refetchQueries` option for a mutation call or a Mutation component to trigger a refetch for all queries where the query result might be affected due to the actual mutation. But that's not the best way to deal with this problem, is it? It would cost you another query request to keep the data consistent after a mutation. In a growing application this approach shouldn't be the default. Fortunately, the Apollo Client offers other functionalities to read/write manually from/to the cache locally without any further network requests. Furthermore, the Mutation component offers a prop where you can insert this update functionality that has access to the actual Apollo Client instance for the update mechanism.

Before implementing the update functionality for the local state management, let's refactor another piece of code which is later on useful for the desired local state update mechanism. The query definition next to your Profile component has already grown to a large number of fields with multiple object nestings. Previously you have learned about GraphQL fragments and how they can be used to split out parts of a query in order to reuse them later on. Let's do it by splitting out all the field information that you have used for a repository's node. You can define this fragment in a *src/Repository/fragments.js* file to keep it reusable for other components.

{{< highlight javascript >}}
import gql from 'graphql-tag';

const REPOSITORY_FRAGMENT = gql`
  fragment repository on Repository {
    id
    name
    url
    descriptionHTML
    primaryLanguage {
      name
    }
    owner {
      login
      url
    }
    stargazers {
      totalCount
    }
    viewerHasStarred
    watchers {
      totalCount
    }
    viewerSubscription
  }
`;

export default REPOSITORY_FRAGMENT;
{{< /highlight >}}

You have split out this partial query (fragment), because you will use it more often in this application in the next sections. Indeed you will already use it for the local state update mechanism in this section, hence the refactoring in the first place.

Since the fragment shouldn't be imported directly from the *src/Repository/fragments.js* path to your Profile component, because the *src/Repository/index.js* file is the preferred entry point to this module, you want to import and export the fragment from there (*src/Repository/index.js*).

{{< highlight javascript "hl_lines=2 4" >}}
import RepositoryList from './RepositoryList';
import REPOSITORY_FRAGMENT from './fragments';

export { REPOSITORY_FRAGMENT };

export default RepositoryList;
{{< /highlight >}}

Finally, you can import the fragment in the Profile component's file to use it for your query again.

{{< highlight javascript "hl_lines=3 16 23" >}}
...

import RepositoryList, { REPOSITORY_FRAGMENT } from '../Repository';
import Loading from '../Loading';
import ErrorMessage from '../Error';

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
      ) {
        edges {
          node {
            ...repository
          }
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

...
{{< /highlight >}}

The refactoring is done. As result your query is more concise and the fragment which is located now in its natural repository module can be reused for other places and functionalities. That's what you are going to do in the next step which is the main part of this section.

Fortunately, the Apollo Client offers functionalities to read/write manually from/to the cache in order to update the count of stargazers of a repository. First, you can use Mutation component's `update` prop to pass a function which will update the local cache eventually.

{{< highlight javascript "hl_lines=3 4 5 19" >}}
...

const updateAddStar = (client, mutationResult) => {
  ...
};

const RepositoryItem = ({ ... }) => (
  <div>
    <div className="RepositoryItem-title">
      ...

      <div>
        {viewerHasStarred ? (
          ...
        ) : (
          <Mutation
            mutation={STAR_REPOSITORY}
            variables={{ id }}
            update={updateAddStar}
          >
            ...
          </Mutation>
        )}
      </div>
    </div>

    ...
  </div>
);

export default RepositoryItem;
{{< /highlight >}}

The function is extracted as its own JavaScript variable, because otherwise it would turn out too verbose in the RepositoryItem component when keeping it inlined in the Mutation component. The function has access to the Apollo Client and the mutation result in its argument. You need both in order to update data. Therefore, you can destructure the mutation result in the function signature already. If you don't know how the mutation result looks like, check the `STAR_REPOSITORY` mutation definition again where you have defined all fields that should appear in the mutation result. For now the only thing that's important for you is the `id` of the to be updated repository.

{{< highlight javascript "hl_lines=2 3" >}}
const updateAddStar = (
  client,
  { data: { addStar: { starrable: { id } } } },
) => {
  ...
};
{{< /highlight >}}

Note: An alternative way would have been to pass this `id` of the repository to the `updateAddStar()` function, which would be a higher-order function then, in the Mutation component's render prop child function. After all, you already have access to the identifier of the repository in the Repository component.

Now comes the most exciting part of this section. You can use the Apollo Client to read data from the cache but also to write data to the cache. The goal is to read the starred repository from the cache (hence the id), increment its count of stargazers by one, and write the updated repository back to the cache. But how to get the repository by its `id` from the cache in the first place? That's why you have extracted the repository fragment before. You can use it along with the repository identifier to retrieve the actual repository from Apollo Client's cache without querying all the data with a naive query implementation.

{{< highlight javascript "hl_lines=3 13 14 15 16" >}}
...

import REPOSITORY_FRAGMENT from '../fragments';
import Link from '../../Link';
import Button from '../../Button';

...

const updateAddStar = (
  client,
  { data: { addStar: { starrable: { id } } } },
) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });

  // update count of stargazers of repository

  // write repository back to cache
};
{{< /highlight >}}

The Apollo Client's cache, that you have set up before to initialize the Apollo Client in the first place, normalizes and stores your queried data. Otherwise the repository would be a deeply nested entity in a list of repositories when considering the query structure that you have used in the Profile component. The normalization of the data structure makes it possible to retrieve entities by their identifier and their GraphQL `__typename` meta field. The combination of both is the default key, which is called a {{% a_blank "composite key" "https://en.wikipedia.org/wiki/Compound_key" %}}, to read or write an entity from or to the cache. You may find out more about changing this default composite key in the exercises of this section.

Furthermore, the resulting entity has all properties that you have specified in the fragment. If there is a field in the fragment which cannot be found on the entity in the cache, you may see something like the following error message: *Can't find field __typename on object ...*. That's why it is a best practice to use the identical fragment to read from the local cache which is used to query the GraphQL API in the first place.

After you have retrieved the repository entity with a fragment and its composite key, you can update the count of stargazers and write back the data to your cache. In this case, you would have to increment the number of stargazers.

{{< highlight javascript "hl_lines=10 12 13 14 15 16 17 18 19 20 21 22" >}}
const updateAddStar = (
  client,
  { data: { addStar: { starrable: { id } } } },
) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });

  const totalCount = repository.stargazers.totalCount + 1;

  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      stargazers: {
        ...repository.stargazers,
        totalCount,
      },
    },
  });
};
{{< /highlight >}}

Let's recap all three steps here. First, you have retrieved (read) the repository entity from the Apollo Client by using an identifier and the fragment. Second, you updated the desired information of the entity. And third, you wrote back the data whereas you include the updated information but keep all the remaining information intact which can be achieved by using the JavaScript spread operator. That's it for the whole manual update mechanism which you can do yourself when Apollo Client doesn't take care of it, because the mutation result hasn't all necessary data.

After all, it is a best practice to have the identical fragment for all three parts: the initial query, the `readFragment()` and `writeFragment()` cache method. It is because your data structure for the particular entity stays consistent in your cache and there a not various definitions of this entity. For instance, if you forget to include a property which is defined by the fragment's fields in data object of the `writeFragment()` method, you will get a warning: *Missing field __typename in ...*. All of this helps you to embrace best practices when using Apollo Client.

On a implementation detail level, you have learned about extracting fragments from your query (or mutation). Basically fragments allow you to define your shared entities by GraphQL types. Afterward, you can reuse those in your queries, mutations or local state management methods to update the cache.

On a higher level, you have learned that Apollo Client's cache normalizes your data. Only this way you are able to retrieve entities that were fetched with a deeply nested query, by using their type and identifier as composite key. Otherwise, imagine you would have to perform all the normalization of the fetched data yourself before putting it in your store/state.

### Exercises:

* read more about {{% a_blank "Local State Management in Apollo Client" "https://www.apollographql.com/docs/react/essentials/local-state.html" %}}
* read more about {{% a_blank "Fragments in Apollo Client" "https://www.apollographql.com/docs/react/advanced/fragments.html" %}}
* implement local cache updates for all the other mutations from the previous exercises
  * implement the identical local cache update, but with decreasing the count of stargazers, for your `removeStar` mutation
  * implement the local cache update for the `updateSubscription` mutation
* read more about {{% a_blank "Caching in Apollo Client and the composite key to identify entities" "https://www.apollographql.com/docs/react/advanced/caching.html" %}}
* invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5BSDXF7" %}}

{{% chapter_header "Apollo Client Optimistic UI in React" "react-apollo-client-optimistic-ui" %}}

In all the previous sections, you have learned a lot about performing the basic tasks with Apollo in React. Now you are entering a couple of advanced topics that go beyond these basics. One of those topics is the optimistic UI that can be achieved with React Apollo. So what's optimistic UI? In an optimistic UI everything appears to be synchronous. For instance, when liking a post on Twitter, the like appears immediately and the count of likes increases without any delay. However, as a developer you know that there needs to be a request that sends the information for the like to the Twitter backend. This request is asynchronous and and doesn't resolve immediately with a result. That's where the optimistic UI comes into play. It immediately assumes a successful request and mimics the result of such request for the frontend. That's how the frontend can update its UI immediately (optimistic) before the real response arrives at a later point in time. In case of a failing request, the optimistic UI would perform a rollback and update itself accordingly. In conclusion, optimistic UI improves the user experience by omitting inconvenient feedback (e.g. loading indicators) for the user. The good thing: React Apollo comes with this feature out of the box.

In this section, you will implement an optimistic UI in case of clicking the watch/unwatch mutation which you should have implemented in a previous exercise. If you haven't, it's time to implement it now. Otherwise you can also substitute it with the star or unstar mutation as well. Nevertheless, completing the optimistic UI behavior for all three mutations will be the exercise of this section. For the sake of completeness, this could be a possible implementation of the watch mutation which shows up as a button next to the "Star"/"Unstar" buttons:

{{< highlight javascript >}}
...

const WATCH_REPOSITORY = gql`
  mutation ($id: ID!, $viewerSubscription: SubscriptionState!) {
    updateSubscription(
      input: { state: $viewerSubscription, subscribableId: $id }
    ) {
      subscribable {
        id
        viewerSubscription
      }
    }
  }
`;

const VIEWER_SUBSCRIPTIONS = {
  SUBSCRIBED: 'SUBSCRIBED',
  UNSUBSCRIBED: 'UNSUBSCRIBED',
};

const isWatch = viewerSubscription =>
  viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED;

const updateWatch = (
  client,
  {
    data: {
      updateSubscription: {
        subscribable: { id, viewerSubscription },
      },
    },
  },
) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });

  let { totalCount } = repository.watchers;
  totalCount =
    viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED
      ? totalCount + 1
      : totalCount - 1;

  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      watchers: {
        ...repository.watchers,
        totalCount,
      },
    },
  });
};

const RepositoryItem = ({ ... }) => (
  <div>
    <div className="RepositoryItem-title">
      ...

      <div>
        ...

        <Mutation
          mutation={WATCH_REPOSITORY}
          variables={{
            id,
            viewerSubscription: isWatch(viewerSubscription)
              ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
              : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
          }}
          update={updateWatch}
        >
          {(updateSubscription, { data, loading, error }) => (
            <Button
              className="RepositoryItem-title-action"
              onClick={updateSubscription}
            >
              {watchers.totalCount}{' '}
              {isWatch(viewerSubscription) ? 'Unwatch' : 'Watch'}
            </Button>
          )}
        </Mutation>

        ...
      </div>
    </div>

    ...
  </div>
);
{{< /highlight >}}

Fortunately, the Mutation component offers a prop for the optimistic UI strategy. It is called `optimisticResponse` and asks for an object that you would expect as a result from a successful mutation. Basically it should be the same result which you can access as argument in the function that is passed to the `update` prop of the Mutation component. In case of the watch mutation, you only want to change the `viewerSubscription` status to subscribed or unsubscribed for an optimistic UI.

{{< highlight javascript "hl_lines=17 18 19 20 21 22 23 24 25 26 27 28" >}}
const RepositoryItem = ({ ... }) => (
  <div>
    <div className="RepositoryItem-title">
      ...

      <div>
        ...

        <Mutation
          mutation={WATCH_REPOSITORY}
          variables={{
            id,
            viewerSubscription: isWatch(viewerSubscription)
              ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
              : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
          }}
          optimisticResponse={{
            updateSubscription: {
              __typename: 'Mutation',
              subscribable: {
                __typename: 'Repository',
                id,
                viewerSubscription: isWatch(viewerSubscription)
                  ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
                  : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
              },
            },
          }}
          update={updateWatch}
        >
          ...
        </Mutation>

        ...
      </div>
    </div>

    ...
  </div>
);
{{< /highlight >}}

When you start your application and watch a repository, the "Watch" and "Unwatch" label of the button should change immediately after clicking it. That's because the optimistic response arrives synchronously whereas the real response is pending and resolves at a later point in time. The request is asynchronous after all. Since the `__typename ` meta field comes with every Apollo request, you need to include those as well.

There is another great side benefit of the optimistic response. Have you noticed that the count of watchers updates optimistic too? That's because the function that is used in the `update` prop is called twice now. The first time with the optimistic response and the second time with the actual response from GitHub's GraphQL API. That's why it makes sense to capture the identical information in the optimistic response which you would expect as mutation result in the function that is passed to the `update` prop of the Mutation component. For instance, if you wouldn't pass the `id` property in the `optimisticResponse` object, the function passed to the `update` prop would throw an error, because it couldn't retrieve the repository from the cache without an identifier.

At this point in time, it becomes debatable whether the everything in the Mutation component becomes too verbose. Using the Render Props pattern co-locates the data-layer even more to the view-layer than Higher-Order Components. One could say it doesn't co-locate the data-layer but inserts it into the view-layer. When all these optimizations, such as the `update` and `optimisticResponse` props, are put into the Render Prop Component, it becomes often too verbose. You have to find your own strategy as individual or team to keep things concise for these circumstances. Personally I see four different ways to solve this issue:

* (1) keeping everything in the Mutation component inlined (e.g. `optimisticResponse`)
* (2) extracting everything as variables (e.g. `update`)
* (3) doing a combination of (2) and (3) whereas only the most verbose parts are extracted
* (4) using Higher-Order Components instead of Render Props to co-locate data-layer rather than inserting it in the view-layer

While the first three ways are about **inserting** your data-layer into the view-layer, the latter way is about **co-locating** it. Each way comes with it drawbacks. For instance, following the second way you will find yourself declaring functions rather than objects or higher-order functions rather than functions, because you may need to pass arguments to them. When following the fourth way, you may have to deal with the same question again to keep your HOCs concise. There you could use the former three ways too, but this time in a HOC rather than a Render Prop.

### Exercises:

* throttle your internet connection (often browsers offers such functionality) and experience how the `optimisticResponse` takes the `update` function into account even though the request is slow
* try different ways of co-locating or inserting your data-layer with render props and higher-order components
* implement the optimistic UIs for the star and unstar mutations
* read more about {{% a_blank "Apollo Optimistic UI in React with GraphQL" "https://www.apollographql.com/docs/react/features/optimistic-ui.html" %}}
* invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5B6D8BX" %}}

{{% chapter_header "GraphQL Pagination with Apollo Client in React" "react-apollo-client-pagination" %}}

Finally you are going to implement another advanced yet often used feature when using a GraphQL API: pagination. In this section you will implement a button which enables you to query successive pages of repositories. It is a simple "More" button which is rendered below the list of repositories in the RepositoryList component. When clicking the button, another page of repositories is fetched and merged with the previous list as one state into Apollo Client's cache.

Let's get started! First, extend the query next to your Profile component with the necessary information to allow pagination for the list of repositories.

{{< highlight javascript "hl_lines=2 7 14 15 16 17" >}}
const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query($cursor: String) {
    viewer {
      repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
        after: $cursor
      ) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;
{{< /highlight >}}

Whereas the `endCursor` can be used as `$cursor` variable when fetching the next page of repositories, the `hasNextPage` can disable the functionality (e.g. not showing the "More" button) to fetch another page. The initial request to fetch the first page of repositories will have a `$cursor` variable of `undefined` though. GitHub's GraphQL API will handle this case gracefully and return the first items from the list of repositories without considering the `after` argument. Every other request to fetch more items from the list will send a defined `after` argument with the cursor, which is the `endCursor` from the query, though.

Now we have alle the information to fetch more pages of repositories from GitHub's GraphQL API. So where to get the functionality to actually fetch them? Fortunately, the Query component exposes such a function in its child function. Since the button to fetch more repositories fits best in the the RepositoryList component, you can pass this function as prop to it.

{{< highlight javascript "hl_lines=3 9" >}}
const Profile = () => (
  <Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
    {({ data, loading, error, fetchMore }) => {
      ...

      return (
        <RepositoryList
          repositories={viewer.repositories}
          fetchMore={fetchMore}
        />
      );
    }}
  </Query>
);
{{< /highlight >}}

In the next step, you can make use of the function in the RepositoryList component. What about a button which is responsible for fetching successive pages of repositories? This button should only show up when there is another page available.

{{< highlight javascript "hl_lines=1 5 6 7 9 11 12 13 14 15 16 17 18 19 20 21 22 23" >}}
import React, { Fragment } from 'react';

...

const RepositoryList = ({ repositories, fetchMore }) => (
  <Fragment>
    {repositories.edges.map(({ node }) => (
      ...
    ))}

    {repositories.pageInfo.hasNextPage && (
      <button
        type="button"
        onClick={() =>
          fetchMore({
            /* configuration object */
          })
        }
      >
        More Repositories
      </button>
    )}
  </Fragment>
);

export default RepositoryList;
{{< /highlight >}}

The `fetchMore()` function performs the query from the initial request and takes a configuration object. One thing the configuration object can be used for is overriding the variables. In the case of pagination, it means you want to pass the `endCursor` of the previous query result to use it for the query as `after` argument. Otherwise, when not specifying any variables, you would perform the initial request again.

{{< highlight javascript "hl_lines=10 11 12" >}}
const RepositoryList = ({ repositories, fetchMore }) => (
  <Fragment>
    ...

    {repositories.pageInfo.hasNextPage && (
      <button
        type="button"
        onClick={() =>
          fetchMore({
            variables: {
              cursor: repositories.pageInfo.endCursor,
            },
          })
        }
      >
        More Repositories
      </button>
    )}
  </Fragment>
);
{{< /highlight >}}

If you attempt to click the button, you should get the following error message: *Error: updateQuery option is required.*. The `updateQuery` function is needed to tell Apollo Client how to merge the previous result with this new result. You can already define the function outside of the button, because it would turn out too verbose.

{{< highlight javascript "hl_lines=1 2 3 17" >}}
const updateQuery = (previousResult, { fetchMoreResult }) => {
  ...
};

const RepositoryList = ({ repositories, fetchMore }) => (
  <Fragment>
    ...

    {repositories.pageInfo.hasNextPage && (
      <button
        type="button"
        onClick={() =>
          fetchMore({
            variables: {
              cursor: repositories.pageInfo.endCursor,
            },
            updateQuery,
          })
        }
      >
        More Repositories
      </button>
    )}
  </Fragment>
);
{{< /highlight >}}

The function has access to the previous query result and to the next result which resolves after the button click eventually.

{{< highlight javascript "hl_lines= 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19" >}}
const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    viewer: {
      ...previousResult.viewer,
      repositories: {
        ...previousResult.viewer.repositories,
        ...fetchMoreResult.viewer.repositories,
        edges: [
          ...previousResult.viewer.repositories.edges,
          ...fetchMoreResult.viewer.repositories.edges,
        ],
      },
    },
  };
};
{{< /highlight >}}

In this function you can merge both results with the JavaScript spread operator. If there is no new result, just return the previous result. The important part is merging the `edges` of both repositories objects to have a merge list of items. In addition, the `fetchMoreResult` takes precedence over the `previousResult` in the `repositories` object, because there you have the new `pageInfo` with its `endCursor` and `hasNextPage` properties from the last paginated result. You need to have those when clicking the button another time to have the correct cursor as argument in place.

That's it. The pagination feature for the repositories should work. There is one little improvement which can be done. What about a loading indicator when more pages are fetched? So far, the `loading` boolean which is located in the Query component of the Profile component is only true for the initial request, but not for the following requests. You can change this behavior with a prop that can be passed to the Query component. Afterward, the loading boolean will be updated accordingly.

{{< highlight javascript "hl_lines=4" >}}
const Profile = () => (
  <Query
    query={GET_REPOSITORIES_OF_CURRENT_USER}
    notifyOnNetworkStatusChange={true}
  >
    {({ data, loading, error, fetchMore }) => {
      ...
    }}
  </Query>
);
{{< /highlight >}}

When you run your application again and try out the "More" button, you should have an odd behavior. Every time you load another page of repositories the loading indicator is shown but the list of repositories disappears entirely. Afterward, the merged list is rendered as assumed. But what happens in between? Take some time for yourself to think about the problem. If you can solve it yourself, go ahead! Otherwise, keep reading to get to know the fix for it.

Since the `loading` boolean becomes true with the initial and also every successive request, the conditional rendering in the Profile component shows always the loading indicator. It returns early from the Profile function and never reaches the code to render the RepositoryList. A quick change from `||` to `&&` of the condition allows you to show the loading indicator only for the initial request. Every further request where the `viewer` object is available, it can be beyond this condition and render the RepositoryList component.

{{< highlight javascript "hl_lines=11 17" >}}
const Profile = () => (
  <Query
    query={GET_REPOSITORIES_OF_CURRENT_USER}
    notifyOnNetworkStatusChange={true}
  >
    {({ data, loading, error, fetchMore }) => {
      ...

      const { viewer } = data;

      if (loading && !viewer) {
        return <Loading />;
      }

      return (
        <RepositoryList
          loading={loading}
          repositories={viewer.repositories}
          fetchMore={fetchMore}
        />
      );
    }}
  </Query>
);
{{< /highlight >}}

Furthermore, the boolean can be passed down to the RepositoryList component. There it can be used to show a loading indicator instead of the "More" button. Since the boolean never reaches the RepositoryList component for the initial request, you can be sure that the "More" only changes to the loading indicator when there is a successive request pending.

{{< highlight javascript "hl_lines=3 8 12 13 14 21" >}}
import React, { Fragment } from 'react';

import Loading from '../../Loading';
import RepositoryItem from '../RepositoryItem';

...

const RepositoryList = ({ repositories, loading, fetchMore }) => (
  <Fragment>
    ...

    {loading ? (
      <Loading />
    ) : (
      repositories.pageInfo.hasNextPage && (
        <button
          ...
        >
          More Repositories
        </button>
      )
    )}
  </Fragment>
);
{{< /highlight >}}

The pagination feature is complete now. You are fetching successive pages of an initial page and merge the result in Apollo Client's cache. In addition, you show your user feedback about pending requests for either the initial request or further page requests.

What about taking this one step further by making the button which is used to fetch more repositories reusable? Let me explain why this would be a neat abstraction. In a following section, you will have another list field which could potentially implement the pagination feature too. There you would have to introduce the "More" button which might be similar or almost identical to the "More" button that you have in the RepositoryList component. Having only one button to rule them all would be a satisfying abstraction to reuse it everywhere where you want to implement the pagination feature. However, keep in mind that this abstraction comes too early for a real world coding scenario. You would have to introduce the second list field first, implement the pagination feature for it, and then see the possibility of an abstraction for the "More" button. For the sake of the tutorial, it makes sense to implement this abstraction for the pagination feature in this section. So please excuse me this premature optimization here.

How would you approach such an abstraction? Let's say you wanted to extract the functionality of the "More" button in a FetchMore component. The most important thing you would need is the `fetchMore()` function which comes from the query result. Furthermore, as you can see from the previous implementation, the `fetchMore()` function takes an object to pass in the necessary `variables` and `updateQuery` information as a configuration. While the former is used to define the next page by its cursor, the latter is used to define how the results should be merged in the local state. Hence these are the three essential parts: fetchMore, variables, updateQuery. Last but not least, you may want to shield away the conditional renderings in the FetchMore component which happens due to the `loading` or `hasNextPage` booleans. Et voilà! That's how you get the interface to your FetchMore abstraction component.

{{< highlight javascript "hl_lines=3 16 17 18 19 20 21 22 23 24 25 26" >}}
import React, { Fragment } from 'react';

import FetchMore from '../../FetchMore';
import RepositoryItem from '../RepositoryItem';

...

const RepositoryList = ({ repositories, loading, fetchMore }) => (
  <Fragment>
    {repositories.edges.map(({ node }) => (
      <div key={node.id} className="RepositoryItem">
        <RepositoryItem {...node} />
      </div>
    ))}

    <FetchMore
      loading={loading}
      hasNextPage={repositories.pageInfo.hasNextPage}
      variables={{
        cursor: repositories.pageInfo.endCursor,
      }}
      updateQuery={updateQuery}
      fetchMore={fetchMore}
    >
      Repositories
    </FetchMore>
  </Fragment>
);

export default RepositoryList;
{{< /highlight >}}

Now this FetchMore component can be used by other paginated lists too, because every part which can be dynamic is passed as props to it. The implementation of the FetchMore component in the *src/FetchMore/index.js* is the next step. First, the main part of the component:

{{< highlight javascript >}}
import React from 'react';

import './style.css';

const FetchMore = ({
  variables,
  updateQuery,
  fetchMore,
  children,
}) => (
  <div className="FetchMore">
    <button
      type="button"
      className="FetchMore-button"
      onClick={() => fetchMore({ variables, updateQuery })}
    >
      More {children}
    </button>
  </div>
);

export default FetchMore;
{{< /highlight >}}

Here you can see how the `variables` and `updateQuery` are taken as configuration object for the `fetchMore()` function when it is invoked. Furthermore, the button could be made nicer by using the Button component that you have defined in a previous section. In order to add a different stylistic touch to it, let's define a more specialized ButtonUnobtrusive component next to the Button component in the *src/Button/index.js* file:

{{< highlight javascript "hl_lines=7 8 9 10 11 12 13 14 15 16 17 18 19 20 22" >}}
import React from 'react';

import './style.css';

const Button = ({ ... }) => ...

const ButtonUnobtrusive = ({
  children,
  className,
  type = 'button',
  ...props
}) => (
  <button
    className={`${className} Button_unobtrusive`}
    type={type}
    {...props}
  >
    {children}
  </button>
);

export { ButtonUnobtrusive };

export default Button;
{{< /highlight >}}

Now the ButtonUnobtrusive component can be used as button instead of the button element in the FetchMore component. In addition, the two booleans `loading` and `hasNextPage` can be used for the conditional rendering to either show the Loading component or nothing, because there is no next page which can be fetched in the first place.

{{< highlight javascript "hl_lines=3 4 9 10 17 18 19 20 21 26 27 28" >}}
import React from 'react';

import Loading from '../Loading';
import { ButtonUnobtrusive } from '../Button';

import './style.css';

const FetchMore = ({
  loading,
  hasNextPage,
  variables,
  updateQuery,
  fetchMore,
  children,
}) => (
  <div className="FetchMore">
    {loading ? (
      <Loading />
    ) : (
      hasNextPage && (
        <ButtonUnobtrusive
          className="FetchMore-button"
          onClick={() => fetchMore({ variables, updateQuery })}
        >
          More {children}
        </ButtonUnobtrusive>
      )
    )}
  </div>
);

export default FetchMore;
{{< /highlight >}}

That's it for the abstraction of the FetchMore button for paginated lists with Apollo Client. Basically you pass in everything that's needed by the `fetchMore()` function including the function itself. In addition, you can pass all the booleans which are used for the conditional renderings. Afterward, you end up with a reusable FetchMore button that you can use for every paginated list.

### Exercises:

* read more about {{% a_blank "pagination with Apollo Client in React" "https://www.apollographql.com/docs/react/features/pagination.html" %}}
* invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5HYMGN7" %}}

{{% chapter_header "GraphQL Caching of Queries with Apollo Client in React" "react-apollo-client-caching" %}}

In this section, you will introduce {{% a_blank "React Router" "https://github.com/ReactTraining/react-router" %}} to show two separate pages for your application. At the moment, you are only showing one page with a Profile component that displays all your repositories. What about another Organization component which shows repositories by an organization? In addition, there could be a search field to lookup individual organizations with their repositories on that page. Let's do this by introducing React Router to your application. If you haven't used React Router before, make sure to conduct the exercises of this section to learn more about it.

{{< highlight javascript >}}
npm install react-router-dom --save
{{< /highlight >}}

In your *src/constants/routes.js* file you can specify both routes that you want to make accessible by React Router. Whereas the `ORGANIZATION` route points to your base URL, the `PROFILE` route points to a more specific URL.

{{< highlight javascript >}}
export const ORGANIZATION = '/';
export const PROFILE = '/profile';
{{< /highlight >}}

Next you can map both routes to their components. The App component is the perfect place to do it, because the two routes will exchange the Organization and Profile components based on the URL there.

{{< highlight javascript >}}
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Profile from '../Profile';
import Organization from '../Organization';

import * as routes from '../constants/routes';

import './style.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-main">
            <Route
              exact
              path={routes.ORGANIZATION}
              component={() => (
                <div className="App-content_large-header">
                  <Organization />
                </div>
              )}
            />
            <Route
              exact
              path={routes.PROFILE}
              component={() => (
                <div className="App-content_small-header">
                  <Profile />
                </div>
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
{{< /highlight >}}

The Organization component wasn't implemented yet. In the beginning, you can start out with a functional stateless component in the *src/Organization/index.js* file which acts as a placeholder to keep the application working for now.

{{< highlight javascript >}}
import React from 'react';

const Organization = () => <div>Organization</div>;

export default Organization;
{{< /highlight >}}

Since you have mapped both routes to their respective components, someone needs to be responsible for giving your user the ability to navigate from one to another route. That's why you can introduce the Navigation component in the App component.

{{< highlight javascript "hl_lines=3 14" >}}
...

import Navigation from './Navigation';
import Profile from '../Profile';
import Organization from '../Organization';

...

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />

          <div className="App-main">
            ...
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
{{< /highlight >}}

Let's implement the Navigation component. Basically it should be only responsible to display two links which make it possible to navigate between your routes. That's why you can use React Router's Link component.

{{< highlight javascript >}}
import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';

import './style.css';

const Navigation = () => (
  <header className="Navigation">
    <div className="Navigation-link">
      <Link to={routes.PROFILE}>Profile</Link>
    </div>
    <div className="Navigation-link">
      <Link to={routes.ORGANIZATION}>Organization</Link>
    </div>
  </header>
);

export default Navigation;
{{< /highlight >}}

The navigation should work when you start your application again. Whereas the Profile page works as before, the Organization page is quite empty. In the last steps, you have defined the two routes as constants, used them in the App component to map to their respective components and introduced Link components to navigate to them in the Navigation component. If you haven't used React Router before, checkout the exercises for more information and tasks.

Did you notice another great Apollo Client feature while implementing this feature? Maybe when navigating from one to another page? Yes, the Apollo Client caches your query requests. When navigating from the Profile page to the Organization page and back to the Profile page, there shouldn't be another query made. The result should show up immediately, because Apollo Client first checks its cache before making the query to the remote GraphQL API. That's powerful, isn't it? Maybe you remember when you have implemented such a cache yourself with plain React and JavaScript in the "The Road to learn React"-book.

The next part of this section is implementing the Organization component. Basically it is identical to the Profile component, only the query differs, because this time it takes a variable for the organization name to identify the organization's repositories.

{{< highlight javascript >}}
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { REPOSITORY_FRAGMENT } from '../Repository';

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query($organizationName: String!) {
    organization(login: $organizationName) {
      repositories(first: 5) {
        edges {
          node {
            ...repository
          }
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

const Organization = ({ organizationName }) => (
  <Query
    query={GET_REPOSITORIES_OF_ORGANIZATION}
    variables={{
      organizationName,
    }}
    skip={organizationName === ''}
  >
    {({ data, loading, error }) => {
      ...
    }}
  </Query>
);

export default Organization;
{{< /highlight >}}

As you can see, the Query component in the Organization component differs in three things: it takes a query tailored to the organization being the top level field of the query, it takes a variable to identify the organization, and it uses the newly introduced `skip` prop to skip executing the query in case no organization identifier is provided. Later on, you will pass an organization identifier from the App component. You may have noticed as well that the repository fragment, which you have introduced earlier for updating the local state in the cache, can be reused here. It saves you lines of code and you can be assured that the returned list of repositories will have the identical structure as the list of repositories in the Profile component.

Next you can extend the query to fit the requirements of the pagination feature. Therefore it has to have the `cursor` argument to identify the next page of repositories. In addition, the `notifyOnNetworkStatusChange` prop can be used to update the `loading` boolean for paginated requests as well.

{{< highlight javascript "hl_lines=4 6 12 13 14 15 29 30 31" >}}
...

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query($organizationName: String!, $cursor: String) {
    organization(login: $organizationName) {
      repositories(first: 5, after: $cursor) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

const Organization = ({ organizationName }) => (
  <Query
    query={GET_REPOSITORIES_OF_ORGANIZATION}
    variables={{
      organizationName,
    }}
    skip={organizationName === ''}
    notifyOnNetworkStatusChange={true}
  >
    {({ data, loading, error, fetchMore }) => {
      ...
    }}
  </Query>
);

export default Organization;
{{< /highlight >}}

Last but not least, the content of the render prop child function needs to be implemented. It doesn't differ much from the Query's content in the Profile component. Basically you have to deal with all the edge cases (error, loading, no data) and show the list of repositories eventually. Because the RepositoryList component takes care about the pagination feature, this improvement comes for free in the newly implemented Organization component.

{{< highlight javascript "hl_lines=3 4 5 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29" >}}
...

import RepositoryList, { REPOSITORY_FRAGMENT } from '../Repository';
import Loading from '../Loading';
import ErrorMessage from '../Error';

...

const Organization = ({ organizationName }) => (
  <Query ... >
    {({ data, loading, error, fetchMore }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      const { organization } = data;

      if (loading && !organization) {
        return <Loading />;
      }

      return (
        <RepositoryList
          loading={loading}
          repositories={organization.repositories}
          fetchMore={fetchMore}
        />
      );
    }}
  </Query>
);

export default Organization;
{{< /highlight >}}

In the end, you have to provide a `organizationName` as prop when using the Organization in the App component. Let's leave the prop inlined for now. Later you will make it dynamic with a search field.

{{< highlight javascript "hl_lines=15" >}}
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />

          <div className="App-main">
            <Route
              exact
              path={routes.ORGANIZATION}
              component={() => (
                <div className="App-content_large-header">
                  <Organization
                    organizationName={'the-road-to-learn-react'}
                  />
                </div>
              )}
            />
            ...
          </div>
        </div>
      </Router>
    );
  }
}
{{< /highlight >}}

The Organization component should almost work now. What's broken is the "More" button. Maybe you take a moment for yourself and try to figure out what's not right about it. If you have figured the problem, try to fix it. Otherwise, you can continue to read.

The issue is the resolving block for the pagination feature in the `updateQuery` function. It assumes that the nested data structure always starts with a `viewer` object. It does for the Profile page, but not for the Organization page. There the top level object is the `organization` followed by the list of `repositories`. So only the top level object changes from page to page whereas the underlying structure stays identical. How would you fix this issue now? When the top level object changes from page to page, the best thing you can do is telling the RepositoryList component its top level object from the outside. In the case of the Organization component, it would be the top level object `organization` which could be passed as a string and later reused as a dynamic key:

{{< highlight javascript "hl_lines=11" >}}
const Organization = ({ organizationName }) => (
  <Query ... >
    {({ data, loading, error, fetchMore }) => {
      ...

      return (
        <RepositoryList
          loading={loading}
          repositories={organization.repositories}
          fetchMore={fetchMore}
          entry={'organization'}
        />
      );
    }}
  </Query>
);
{{< /highlight >}}

In the case of the Profile component, the `viewer` would be the top level object:

{{< highlight javascript "hl_lines=11" >}}
const Profile = () => (
  <Query ... >
    {({ data, loading, error, fetchMore }) => {
      ...

      return (
        <RepositoryList
          loading={loading}
          repositories={viewer.repositories}
          fetchMore={fetchMore}
          entry={'viewer'}
        />
      );
    }}
  </Query>
);
{{< /highlight >}}

Now you can handle this newly introduced case in the RepositoryList component by passing the entry as {{% a_blank "computed property name" "https://developer.mozilla.org/my/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names" %}} to the `updateQuery` function. Instead of passing the `updateQuery` function directly to the FetchMore component, it can be derived from a higher-order function which is needed to pass the new `entry` property.

{{< highlight javascript "hl_lines=5 16" >}}
const RepositoryList = ({
  repositories,
  loading,
  fetchMore,
  entry,
}) => (
  <Fragment>
    ...

    <FetchMore
      loading={loading}
      hasNextPage={repositories.pageInfo.hasNextPage}
      variables={{
        cursor: repositories.pageInfo.endCursor,
      }}
      updateQuery={getUpdateQuery(entry)}
      fetchMore={fetchMore}
    >
      Repositories
    </FetchMore>
  </Fragment>
);
{{< /highlight >}}

Whereas the higher-order function next to the RepositoryList component looks like the following:

{{< highlight javascript "hl_lines=1 11 12 14 15 17 18" >}}
const getUpdateQuery = entry => (
  previousResult,
  { fetchMoreResult },
) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    [entry]: {
      ...previousResult[entry],
      repositories: {
        ...previousResult[entry].repositories,
        ...fetchMoreResult[entry].repositories,
        edges: [
          ...previousResult[entry].repositories.edges,
          ...fetchMoreResult[entry].repositories.edges,
        ],
      },
    },
  };
};
{{< /highlight >}}

That's how the deeply nested object can still be updated with the `fetchMoreResult` even though the top level component from the query result is not static. The pagination feature should work on both pages now. Take a moment to recap the last implementations again and why these were necessary.

Last but not least, the search field needs to get implemented to search for other organizations too. Only having the repositories of one organization can be dull. I would argue the best place to add the search field would be the Navigation component, but only when the Organization page is active. Therefore, React Router comes with a neat higher-order component which gives you access to the current URL. This information can be used to either show a search field or not.

{{< highlight javascript "hl_lines=2 9 19 20 21 25" >}}
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../../constants/routes';

import './style.css';

const Navigation = ({
  location: { pathname },
}) => (
  <header className="Navigation">
    <div className="Navigation-link">
      <Link to={routes.PROFILE}>Profile</Link>
    </div>
    <div className="Navigation-link">
      <Link to={routes.ORGANIZATION}>Organization</Link>
    </div>

    {pathname === routes.ORGANIZATION && (
      <OrganizationSearch />
    )}
  </header>
);

export default withRouter(Navigation);
{{< /highlight >}}

The OrganizationSearch component will be implemented next to the Navigation component in the next steps. Before, there needs to be some kind of initial state for the OrganizationSearch and a callback function to update the initial state in the Navigation component. Thus the Navigation component becomes a class component.

{{< highlight javascript "hl_lines=3 4 5 6 7 8 9 10 11 12 13 14 15 26 27 31 32 33" >}}
...

class Navigation extends React.Component {
  state = {
    organizationName: 'the-road-to-learn-react',
  };

  onOrganizationSearch = value => {
    this.setState({ organizationName: value });
  };

  render() {
    const { location: { pathname } } = this.props;

    return (
      <header className="Navigation">
        <div className="Navigation-link">
          <Link to={routes.PROFILE}>Profile</Link>
        </div>
        <div className="Navigation-link">
          <Link to={routes.ORGANIZATION}>Organization</Link>
        </div>

        {pathname === routes.ORGANIZATION && (
          <OrganizationSearch
            organizationName={this.state.organizationName}
            onOrganizationSearch={this.onOrganizationSearch}
          />
        )}
      </header>
    );
  }
}

export default withRouter(Navigation);
{{< /highlight >}}

The OrganizationSearch component, which can be implemented in the same file, could work with the following implementation. It handles its own local state, which is the value that shows up in the input field, but uses as an initial value which comes from the parent component. Furthermore, it receives a callback handler which can be used in the `onSubmit()` class method to propagate the search fields value on a submit interaction up the component tree.

{{< highlight javascript "hl_lines=3 4 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44" >}}
...

import Button from '../../Button';
import Input from '../../Input';

import './style.css';

const Navigation = ({ ... }) => ...

class OrganizationSearch extends React.Component {
  state = {
    value: this.props.organizationName,
  };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  onSubmit = event => {
    this.props.onOrganizationSearch(this.state.value);

    event.preventDefault();
  };

  render() {
    const { value } = this.state;

    return (
      <div className="Navigation-search">
        <form onSubmit={this.onSubmit}>
          <Input
            color={'white'}
            type="text"
            value={value}
            onChange={this.onChange}
          />{' '}
          <Button color={'white'} type="submit">
            Search
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(Navigation);
{{< /highlight >}}

The Input component is a slightly styled input element which can be defined in *src/Input/index.js* as its own component.

{{< highlight javascript >}}
import React from 'react';

import './style.css';

const Input = ({ children, color = 'black', ...props }) => (
  <input className={`Input Input_${color}`} {...props}>
    {children}
  </input>
);

export default Input;
{{< /highlight >}}

Even though the search field works in the Navigation component, it doesn't help the rest of the application. It only updates the state in the Navigation component when a search request is submitted. However, the value of the search request is needed in the Organization component, one component above the Navigation component, as GraphQL variable for the query. That's why the local state needs to be lifted up from the Navigation component to the App component. The Navigation component becomes a stateless functional component again.

{{< highlight javascript "hl_lines=1 2 3 4 5 16 17 21" >}}
const Navigation = ({
  location: { pathname },
  organizationName,
  onOrganizationSearch,
}) => (
  <header className="Navigation">
    <div className="Navigation-link">
      <Link to={routes.PROFILE}>Profile</Link>
    </div>
    <div className="Navigation-link">
      <Link to={routes.ORGANIZATION}>Organization</Link>
    </div>

    {pathname === routes.ORGANIZATION && (
      <OrganizationSearch
        organizationName={organizationName}
        onOrganizationSearch={onOrganizationSearch}
      />
    )}
  </header>
);
{{< /highlight >}}

And last but not least, the App component takes over the responsibility from the Navigation component. It manages the local state, passes the initial state and a callback function to update the state to the Navigation component, and passes the state itself to the Organization component to perform the query eventually.

{{< highlight javascript "hl_lines=4 5 6 8 9 10 13 19 20 29" >}}
...

class App extends Component {
  state = {
    organizationName: 'the-road-to-learn-react',
  };

  onOrganizationSearch = value => {
    this.setState({ organizationName: value });
  };

  render() {
    const { organizationName } = this.state;

    return (
      <Router>
        <div className="App">
          <Navigation
            organizationName={organizationName}
            onOrganizationSearch={this.onOrganizationSearch}
          />

          <div className="App-main">
            <Route
              exact
              path={routes.ORGANIZATION}
              component={() => (
                <div className="App-content_large-header">
                  <Organization organizationName={organizationName} />
                </div>
              )}
            />
            ...
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
{{< /highlight >}}

Congratulations. You have implemented a dynamic GraphQL query with a search field. Once a new `organizationName` is passed to the Organization component due to a local state change, the Query component triggers another request due to a re-render. But the request is not always made to the remote GraphQL API. Instead, when searching for an organization twice, the Apollo Client cache is used. In addition, you have used the well known technique called lifting state in React in order to share the state across components.

### Exercises:

* if you are not familiar with React Router, try it out in {{% a_blank "this pragmatic tutorial" "https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/" %}}
* invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5HFQ3TD" %}}

{{% chapter_header "Implementing the Issues Feature: Setup" "react-apollo-client-feature-setup" %}}

In the previous sections, you have implemented most of the common Apollo Client features in your React application. In fact, you have reached a point where you should start to implement extensions for this application on your own. Before you are going to do so on your own in a following section, this section showcases a last time how a full-fledged feature can be implemented with Apollo Client in React.

So far, you have dealt with GitHub repositories from organizations and your account. Now it is going one step further by fetching GitHub issues. These are available by using a list field that is associated to a repository in a GraphQL query. However, this section doesn't only show you how to render yet another nested list field in your React application. You have done this before, haven't you? Of course, the foundation will be rendering the list of issues first. But then you will implement a client-side filtering with plain React to show only opened, closed or no issue at all. Finally, you will refactor the filtering to a server-side filtering by using GraphQL queries. So you will only fetch the issues by their state from the server rather than filtering the issue's state on the client-side. Implementing the pagination feature for the issues will be your exercise of this section. So let's get started. First, you can render a new component called Issues in your RepositoryList component. This component takes two props which are used later in a GraphQL query to identify the repository from which you want to fetch the issues.

{{< highlight javascript "hl_lines=5 20 21 22 23" >}}
...

import FetchMore from '../../FetchMore';
import RepositoryItem from '../RepositoryItem';
import Issues from '../../Issue';

...

const RepositoryList = ({
  repositories,
  loading,
  fetchMore,
  entry,
}) => (
  <Fragment>
    {repositories.edges.map(({ node }) => (
      <div key={node.id} className="RepositoryItem">
        <RepositoryItem {...node} />

        <Issues
          repositoryName={node.name}
          repositoryOwner={node.owner.login}
        />
      </div>
    ))}

    ...
  </Fragment>
);

export default RepositoryList;
{{< /highlight >}}

In the *src/Issue/index.js* file, you should import and export the Issues component. Since the issue feature can be kept in a module on its own, it has this *index.js* file again. That's how you can tell other developers to only access this feature module by using the *index.js* file as its interface. Everything else is kept private in the feature module.

{{< highlight javascript >}}
import Issues from './IssueList';

export default Issues;
{{< /highlight >}}

Moreover, note how the component is only named Issues and not IssueList. Personally I like to make this naming convention to break down the rendering of a list of items: Issues, IssueList and IssueItem. Whereas Issues is the container component where you query the data and filter the issues eventually, and the IssueList and IssueItem are only there as presentational components for rendering purposes. In contrast, the Repository feature module hasn't such a Repositories component, because there was no need for it in the first place. The list of repositories already came from the Organization and Profile components and the Repository module's components are mainly only there for the rendering.

Let's start implementing Issues and IssueList components in the *src/Issue/IssueList/index.js* file. You could argue to split both components up into their own files, but for the sake of this tutorial, they are kept together in one file.

First, there needs to be a new query for the issues. You might wonder: Why do we need a new query here? It would be simpler to include the issues list field in the query at the top next to the Organization and Profile components. That's true, but it comes with a cost. Adding more nested (list) fields to a query often results into performance issues on the server-side. There you may have to make multiple roundtrips to retrieve all the entities from the database.

* Roundtrip 1: get organization by name
* Roundtrip 2: get repositories of organization by organization identifier
* Roundtrip 3: get issues of repository by repository identifier

It is simple to conclude that nesting queries in a naive way solves all of our problems. Whereas it solves the problem of only requesting the data once and not with multiple network request (similar roundtrips as shown for the database), GraphQL doesn't solve the problem of retrieving all the data from the database for you. That's not the responsibility of GraphQL after all. So by having a dedicated query in the Issues component, you can decide **when** to trigger this query. In the next steps, you will just trigger it on render because the Query component is used. But when adding the client-side filter later on, it will only be triggered when the "Filter" button is toggled. Otherwise the issues should be hidden. Finally, that's how all the initial data loading can be delayed to a point when the user actually wants to see the data.

First, define the Issues component which has access to the props which were passed in the RepositoryList component. It doesn't render much yet.

{{< highlight javascript >}}
import React from 'react';

import './style.css';

const Issues = ({ repositoryOwner, repositoryName }) =>
  <div className="Issues">
  </div>

export default Issues;
{{< /highlight >}}

Second, define the query in the *src/Issue/IssueList/index.js* file to retrieve issues of a repository. The repository is identified by its owner and name. In addition, add the `state` field as one of the fields for the query result. This can be used later for the client-side filtering for showing only issues with an open or closed state.

{{< highlight javascript "hl_lines=2 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23" >}}
import React from 'react';
import gql from 'graphql-tag';

import './style.css';

const GET_ISSUES_OF_REPOSITORY = gql`
  query($repositoryOwner: String!, $repositoryName: String!) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 5) {
        edges {
          node {
            id
            number
            state
            title
            url
            bodyHTML
          }
        }
      }
    }
  }
`;

...
{{< /highlight >}}

Third, introduce the Query component and pass it the previously defined query and the necessary variables. Use its render prop child function to access the data, to cover all edge cases and to render a IssueList component eventually.

{{< highlight javascript "hl_lines=2 5 6 7 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 41 42 43 44 45 46 47" >}}
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import IssueItem from '../IssueItem';
import Loading from '../../Loading';
import ErrorMessage from '../../Error';

import './style.css';

const Issues = ({ repositoryOwner, repositoryName }) => (
  <div className="Issues">
    <Query
      query={GET_ISSUES_OF_REPOSITORY}
      variables={{
        repositoryOwner,
        repositoryName,
      }}
    >
      {({ data, loading, error }) => {
        if (error) {
          return <ErrorMessage error={error} />;
        }

        const { repository } = data;

        if (loading && !repository) {
          return <Loading />;
        }

        if (!repository.issues.edges.length) {
          return <div className="IssueList">No issues ...</div>;
        }

        return <IssueList issues={repository.issues} />;
      }}
    </Query>
  </div>
);

const IssueList = ({ issues }) => (
  <div className="IssueList">
    {issues.edges.map(({ node }) => (
      <IssueItem key={node.id} issue={node} />
    ))}
  </div>
);

export default Issues;
{{< /highlight >}}

Last but not least, implement a basic IssueItem component in the *src/Issue/IssueItem/index.js* file. The following shows you already a placeholder where you can implement the Commenting feature from a section which comes later in this tutorial.

{{< highlight javascript >}}
import React from 'react';

import Link from '../../Link';

import './style.css';

const IssueItem = ({ issue }) => (
  <div className="IssueItem">
    {/* placeholder to add a show/hide comment button later */}

    <div className="IssueItem-content">
      <h3>
        <Link href={issue.url}>{issue.title}</Link>
      </h3>
      <div dangerouslySetInnerHTML={{ __html: issue.bodyHTML }} />

      {/* placeholder to render a list of comments later */}
    </div>
  </div>
);

export default IssueItem;
{{< /highlight >}}

Once you start your application again, you should see the initial page of paginated issues rendered below of each repository. That's the performance bottleneck which was mentioned earlier. It is even worse, because all GraphQL requests are execute on their own. They are not bundled in one request as they would have been when nesting the issues list field in the query next to the Organization and Profile components. However, in the next steps you are implementing a client-side filtering. The default is to show no issues at all. But it can toggle between the states of showing none, showing open issues and showing closed issues by using a button. Thus the issues will not be queried before toggling to one of the issue states.

### Exercises:

* read more about {{% a_blank "the rate limit when using a (or in this case GitHub's) GraphQL API" "https://developer.github.com/v4/guides/resource-limitations/" %}}

{{% chapter_header "Implementing the Issues Feature: Client-Side Filter" "react-apollo-client-feature-client-filter" %}}

In this section, you are going to enhance the Issue feature with a client-side filtering. It prevents the initial querying of the issues, because it will happen on demand when clicking a button, and it will give the user the ability to filter the issues between closed and open issues. First, let's introduce our three states as enumeration next to the Issues component. The `NONE` state is used to show no issues at all. Otherwise, the other states are used to show either open or closed issues.

{{< highlight javascript >}}
const ISSUE_STATES = {
  NONE: 'NONE',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
};
{{< /highlight >}}

Second, let's implement a short function that figures out whether it is a state to show the issues or not. This function can be defined in the same file as well.

{{< highlight javascript >}}
const isShow = issueState => issueState !== ISSUE_STATES.NONE;
{{< /highlight >}}

Third, the function can be used for a conditional rendering to either query the issues and show the IssueList or not to query (and thus not show) it. It's not clear yet where the `issueState` property comes from.

{{< highlight javascript "hl_lines=3" >}}
const Issues = ({ repositoryOwner, repositoryName }) => (
  <div className="Issues">
    {isShow(issueState) && (
      <Query ... >
        ...
      </Query>
    )}
  </div>
);
{{< /highlight >}}

But as you may have noticed, the `issueState` property must come from the local state in order to toggle it via a button in the component eventually. That's why the Issues component must be refactored to a class component in order to manage this state.

{{< highlight javascript "hl_lines=1 2 3 4 6 7 8 10 18 19 20" >}}
class Issues extends React.Component {
  state = {
    issueState: ISSUE_STATES.NONE,
  };

  render() {
    const { issueState } = this.state;
    const { repositoryOwner, repositoryName } = this.props;

    return (
      <div className="Issues">
        {isShow(issueState) && (
          <Query ... >
            ...
          </Query>
        )}
      </div>
    );
  }
}
{{< /highlight >}}

Once you run your application again, no issues should be request nor should show up, because the initial state is set to `NONE` and the conditional rendering prevents the query and the rendering of a result. However, the client-side filtering is not done yet. Somehow you need to toggle the `issueState` property with React's local state. That's why you can reuse the ButtonUnobtrusive component, which has the appropriate style, for implementing this toggling behavior to transition between the three available states.

{{< highlight javascript "hl_lines=6 13 14 15 23 24 25 26 27 28 29" >}}
...

import IssueItem from '../IssueItem';
import Loading from '../../Loading';
import ErrorMessage from '../../Error';
import { ButtonUnobtrusive } from '../../Button';

class Issues extends React.Component {
  state = {
    issueState: ISSUE_STATES.NONE,
  };

  onChangeIssueState = nextIssueState => {
    this.setState({ issueState: nextIssueState });
  };

  render() {
    const { issueState } = this.state;
    const { repositoryOwner, repositoryName } = this.props;

    return (
      <div className="Issues">
        <ButtonUnobtrusive
          onClick={() =>
            this.onChangeIssueState(TRANSITION_STATE[issueState])
          }
        >
          {TRANSITION_LABELS[issueState]}
        </ButtonUnobtrusive>

        {isShow(issueState) && (
          <Query ... >
            ...
          </Query>
        )}
      </div>
    );
  }
}
{{< /highlight >}}

In the last step, you have introduced the button to toggle the state between the three states. Therefore you have used two enumerations, `TRANSITION_LABELS` and `TRANSITION_STATE`, to show an appropriate button label and to define the next state after a state transition. These enumerations can be define next to the `ISSUE_STATES` enumeration.

{{< highlight javascript >}}
const TRANSITION_LABELS = {
  [ISSUE_STATES.NONE]: 'Show Open Issues',
  [ISSUE_STATES.OPEN]: 'Show Closed Issues',
  [ISSUE_STATES.CLOSED]: 'Hide Issues',
};

const TRANSITION_STATE = {
  [ISSUE_STATES.NONE]: ISSUE_STATES.OPEN,
  [ISSUE_STATES.OPEN]: ISSUE_STATES.CLOSED,
  [ISSUE_STATES.CLOSED]: ISSUE_STATES.NONE,
};
{{< /highlight >}}

As you can see, whereas the former enumeration only matches a label to a given state, the latter enumeration matches the next state to a given state. That's how the toggling to a next state can be made simple. Last but not least, the `issueState` from the local state has to be used to filter the list of issues after they have been queried and should be rendered.

{{< highlight javascript "hl_lines=24 25 26 27 28 29 30 32 37" >}}
class Issues extends React.Component {
  ...

  render() {
    ...

    return (
      <div className="Issues">
        ...

        {isShow(issueState) && (
          <Query ... >
            {({ data, loading, error }) => {
              if (error) {
                return <ErrorMessage error={error} />;
              }

              const { repository } = data;

              if (loading && !repository) {
                return <Loading />;
              }

              const filteredRepository = {
                issues: {
                  edges: repository.issues.edges.filter(
                    issue => issue.node.state === issueState,
                  ),
                },
              };

              if (!filteredRepository.issues.edges.length) {
                return <div className="IssueList">No issues ...</div>;
              }

              return (
                <IssueList issues={filteredRepository.issues} />
              );
            }}
          </Query>
        )}
      </div>
    );
  }
}
{{< /highlight >}}

That's it. The client-side filtering should work for you. The button is used to toggle between the three states which is managed in the local state of the component. Only for two of these states the issues are queried, filtered and rendered. In the next step, the existing client-side filtering should be advanced to a server-side filtering which means that the filtered issues are already requested from the server and not filtered afterward on the client.

### Exercises:

* install the {{% a_blank "recompose" "https://github.com/acdlite/recompose" %}} library which implements many higher-order components
* refactor the Issues component from class component to functional stateless component
* use the `withState` HOC for the Issues component to manage the `issueState`

{{% chapter_header "Implementing the Issues Feature: Server-Side Filter" "react-apollo-client-feature-server-filter" %}}

Before starting with the server-side filtering, let's recap the last exercise in case you had difficulties with it. Basically you can perform the refactoring in three steps. First, install recompose as package for your application on the command line:

{{< highlight javascript >}}
npm install recompose --save
{{< /highlight >}}

Second, import the `withState` higher-order component in the *src/Issue/IssueList/index.js* file and use it to wrap your exported Issues component whereas the first argument is the property name in the local state, the second argument is the handler to change the property in the local state and the third argument is the initial state for that property.

{{< highlight javascript "hl_lines=4 8 9 10 11 12" >}}
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withState } from 'recompose';

...

export default withState(
  'issueState',
  'onChangeIssueState',
  ISSUE_STATES.NONE,
)(Issues);
{{< /highlight >}}

Finally, refactor the Issues component from a class component to a functional stateless component. It has access to the `issueState` and `onChangeIssueState()` function in its props now. Moreover, don't forget to change the usage of the `onChangeIssueState` prop to being a function and not a class method anymore.

{{< highlight javascript "hl_lines=3 4 5 6 7 8 11 18" >}}
...

const Issues = ({
  repositoryOwner,
  repositoryName,
  issueState,
  onChangeIssueState,
}) => (
  <div className="Issues">
    <ButtonUnobtrusive
      onClick={() => onChangeIssueState(TRANSITION_STATE[issueState])}
    >
      {TRANSITION_LABELS[issueState]}
    </ButtonUnobtrusive>

    ...
  </div>
);

...
{{< /highlight >}}

That's it for conducting the exercise from the previous section. It makes writing stateful components, where the state is not too complex, much more convenient. Now, in the following of this section, you will advance the filtering from client-side filtering to server-side filtering. After all, you want to learn more about GraphQL in this tutorial. So let's use the defined GraphQL query and its arguments to make a more fine-grained query by only requesting open or closed issues. In the *src/Issue/IssueList/index.js* file, extend the query with a variable to specify the issue state:

{{< highlight javascript "hl_lines=5 8" >}}
const GET_ISSUES_OF_REPOSITORY = gql`
  query(
    $repositoryOwner: String!
    $repositoryName: String!
    $issueState: IssueState!
  ) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 5, states: [$issueState]) {
        edges {
          node {
            id
            number
            state
            title
            url
            bodyHTML
          }
        }
      }
    }
  }
`;
{{< /highlight >}}

Next, you can use the `issueState` property as variable for your Query component. In addition, remove the client-side filter logic from the Query component's render prop function.

{{< highlight javascript "hl_lines=16" >}}
const Issues = ({
  repositoryOwner,
  repositoryName,
  issueState,
  onChangeIssueState,
}) => (
  <div className="Issues">
    ...

    {isShow(issueState) && (
      <Query
        query={GET_ISSUES_OF_REPOSITORY}
        variables={{
          repositoryOwner,
          repositoryName,
          issueState,
        }}
      >
        {({ data, loading, error }) => {
          if (error) {
            return <ErrorMessage error={error} />;
          }

          const { repository } = data;

          if (loading && !repository) {
            return <Loading />;
          }

          return <IssueList issues={repository.issues} />;
        }}
      </Query>
    )}
  </div>
);
{{< /highlight >}}

Et voilà - the server-side filter should work. You are only querying open or closed issues. Your query became more fine-grained and the filtering is not handled by the client anymore.

### Exercises:

* implement the pagination feature for the Issue feature
  * add the pageInfo information to the query
  * add the additional cursor variable and argument to the query
  * add the FetchMore component to the IssueList component

{{% chapter_header "Apollo Client Prefetching in React" "react-apollo-client-prefetching-data" %}}

This section is all about prefetching data even though the user doesn't need it immediately. It is yet another UX technique that can be deployed additionally to the optimistic UI technique that you have used in an earlier section. You will implement the prefetching data feature for the list of issues. However, feel free to implement it for other data fetching later as your exercise.

When your application renders for the first time, there no issues fetched and hence no issues are rendered. The user has to toggle the filter button to fetch open issues and another time to fetch closed issues. The third click will hide the list of issues again. The goal of this section is to prefetch the next bulk of issues when the user hovers the filter button. For instance, when the issues are still hidden in the beginning and the user hovers the filter button, the issues with the open state are prefetched in the background. When the user clicks the button, there is no waiting time, because the issues with the open state are already there. The same scenario applies for the transition from open to closed issues. In order to prepare this behavior, let's split out the filter button as its own component in the *src/Issue/IssueList/index.js* file:

{{< highlight javascript "hl_lines=8 9 10 11 19 20 21 22 23 24 25" >}}
const Issues = ({
  repositoryOwner,
  repositoryName,
  issueState,
  onChangeIssueState,
}) => (
  <div className="Issues">
    <IssueFilter
      issueState={issueState}
      onChangeIssueState={onChangeIssueState}
    />

    {isShow(issueState) && (
      ...
    )}
  </div>
);

const IssueFilter = ({ issueState, onChangeIssueState }) => (
  <ButtonUnobtrusive
    onClick={() => onChangeIssueState(TRANSITION_STATE[issueState])}
  >
    {TRANSITION_LABELS[issueState]}
  </ButtonUnobtrusive>
);
{{< /highlight >}}

Now it is easier to focus on the IssueFilter component where most of the logic for the prefetching of data is implemented. As mentioned before, the prefetching should happen when the user hovers the button. So there needs to be a prop for it and a callback function which is executed when someone hovers it. And indeed, there is such a prop (attribute) for a button (element). After all, we are dealing with HTML elements here.

{{< highlight javascript "hl_lines=1 8" >}}
const prefetchIssues = () => {};

...

const IssueFilter = ({ issueState, onChangeIssueState }) => (
  <ButtonUnobtrusive
    onClick={() => onChangeIssueState(TRANSITION_STATE[issueState])}
    onMouseOver={prefetchIssues}
  >
    {TRANSITION_LABELS[issueState]}
  </ButtonUnobtrusive>
);
{{< /highlight >}}

What happens in the `prefetchIssue()` function now? Basically it has to execute the identical GraphQL query which is executed by the Query component in the Issues component, but this time in an imperative and not declarative way. So rather than using the Query component for it, you have use the the Apollo Client instance directly to execute a query. As you may remember, the Apollo Client instance is somewhere hidden in the component tree, because you have used [React's Context API](https://www.robinwieruch.de/react-context-api) to provide the instance of the Apollo Client at a top level of your component tree. That's why the Query and Mutation components have access to the Apollo Client even though you have never used it yourself directly. However, this time you need to use it to query the prefetched data. You can use the ApolloConsumer component from the React Apollo package to expose the Apollo Client instance in your component tree. Whereas you have used the ApolloProvider somewhere to provide the client instance in the first place, you can use the ApolloConsumer to retrieve it now. In the *src/Issue/IssueList/index.js* file, import the ApolloConsumer component and use it in the IssueFilter component. It gives you access to the Apollo Client instance via its render props child function.

{{< highlight javascript "hl_lines=2 9 10 15 19 20" >}}
import React from 'react';
import { Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { withState } from 'recompose';

...

const IssueFilter = ({ issueState, onChangeIssueState }) => (
  <ApolloConsumer>
    {client => (
      <ButtonUnobtrusive
        onClick={() =>
          onChangeIssueState(TRANSITION_STATE[issueState])
        }
        onMouseOver={() => prefetchIssues(client)}
      >
        {TRANSITION_LABELS[issueState]}
      </ButtonUnobtrusive>
    )}
  </ApolloConsumer>
);
{{< /highlight >}}

Now you have access to the Apollo Client instance to perform queries (and mutations) which will enable you to query GitHub's GraphQL API imperatively. What variables are needed to perform the prefetching of issues? They are the same variables that are used in the Query component. So you need to pass those to the IssueFilter component and then to the `prefetchIssues()` function.

{{< highlight javascript "hl_lines=11 12 24 25 38 39 40" >}}
...

const Issues = ({
  repositoryOwner,
  repositoryName,
  issueState,
  onChangeIssueState,
}) => (
  <div className="Issues">
    <IssueFilter
      repositoryOwner={repositoryOwner}
      repositoryName={repositoryName}
      issueState={issueState}
      onChangeIssueState={onChangeIssueState}
    />

    {isShow(issueState) && (
      ...
    )}
  </div>
);

const IssueFilter = ({
  repositoryOwner,
  repositoryName,
  issueState,
  onChangeIssueState,
}) => (
  <ApolloConsumer>
    {client => (
      <ButtonUnobtrusive
        onClick={() =>
          onChangeIssueState(TRANSITION_STATE[issueState])
        }
        onMouseOver={() =>
          prefetchIssues(
            client,
            repositoryOwner,
            repositoryName,
            issueState,
          )
        }
      >
        {TRANSITION_LABELS[issueState]}
      </ButtonUnobtrusive>
    )}
  </ApolloConsumer>
);

...
{{< /highlight >}}

Last but not least, you can use this information to perform the prefetching data query. The Apollo Client instance exposes a `query()` method which can be used for this. Make sure to retrieve the next `issueState` before, because when prefetching open issues, the current `issueState` should be `NONE`.

{{< highlight javascript "hl_lines=2 3 4 5 7 8 9 10 11 12 13 14 15 16 17 18" >}}
const prefetchIssues = (
  client,
  repositoryOwner,
  repositoryName,
  issueState,
) => {
  const nextIssueState = TRANSITION_STATE[issueState];

  if (isShow(nextIssueState)) {
    client.query({
      query: GET_ISSUES_OF_REPOSITORY,
      variables: {
        repositoryOwner,
        repositoryName,
        issueState: nextIssueState,
      },
    });
  }
};
{{< /highlight >}}

That's it. Once the button is hovered, it should prefetch the issues for the next `issueState`. The Apollo Client makes sure that the new data is updated in the cache like it would do for the Query component. There shouldn't be any visible loading indicator in between except when the network request takes too long and you click the button right after hovering it. You can verify that the request is happening in your network tab in the developer development tools of your browser. In the end, you have learned about two UX improvements that can be achieved with ease when using Apollo Client: optimistic UI and prefetching data.

### Exercises:

* read more about {{% a_blank "Apollo Prefetching and Query Splitting in React" "https://www.apollographql.com/docs/react/features/performance.html" %}}
* invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5PLMBR3" %}}

{{% chapter_header "Exercise: Commenting Feature" "react-apollo-client-exercise" %}}

Yes, you are right. This last section is only for you to have some last hands on experiences with this application. It is all about implementing a feature yourself. Afterward, I encourage you to continue implementing features for the application or improving it. This section is similar to the previous section where you have built the Issue feature. But this time you will do it on your own with a couple of step by step guidances. It should encourage you by seeing that you can actually implement it yourself with the previously learned techniques and tools. After all, that's what this tutorial is about: You should be able to do it yourself now. And without practicing it, you will never get better with the acquired tools and techniques. So here are a couple of guiding points to help you implementing the Commenting feature. The end goal: It should be possible to show a list of (paginated) comments per issue on demand. Furthermore, a user should be able to leave a comment on an issue.

* Introduce components for fetching a list of comments (e.g. Comments), rendering a list of comments (e.g. CommentList), and rendering a single comment (e.g. CommentItem). They can render sample data for now.

* Use the top level comments component (e.g. Comments), which will be your container component that is responsible to query the list of comments, in the *src/Issue/IssueItem/index.js* file. In addition, add a toggle to either show or hide comments. The IssueItem component has to become a class component or needs to make use of the `withState` HOC from the recompose library.

* Use the Query component from React Apollo in your container Comments component to fetch a list of comments. It should be similar to the query which fetches the list of issues. You only need to identify the issue for which the comments should be fetched.

* Handle all edge cases in the Comments to show loading indicator, no data or error messages. Last but not least, render the list of comments in the CommentList component and a single comment in the CommentItem component.

* Implement the pagination feature for the comments. Therefore, add the necessary fields in the query, the additional props and variables to the Query component, and the reusable FetchMore component. Last but not least, handle the merging of the state in the `updateQuery` prop.

* Enable prefetching of the comments when hovering the "Show/Hide Comments" button.

* Implement and use a AddComment component which should show a textarea and a submit button to enable the user creating a comment. Use the `addComment` mutation from GitHub's GraphQL API and the Mutation component from React Apollo to execute the mutation with the submit button.

* Improve the AddComment component with the optimistic UI feature (perhaps read again the {{% a_blank "Apollo documentation about the optimistic UI with a list of items" "https://www.apollographql.com/docs/react/features/optimistic-ui.html" %}}). So basically when adding a comment, the comment should show up in the list of comments, even though the request is pending.

That's it. Congratulations to you when you have made it so far in this tutorial. I hope this section, building an own feature in the application with all the learned tools and techniques, matched your skills and challenged you. It should have shown you that you can go from here on your own to implement React applications with Apollo and GraphQL. Personally I would recommend to improve and extend this existing application. Otherwise, if you haven't implemented a GraphQL server yet, try to find other third-party APIs that offer a GraphQL API and try to build your own React with Apollo application by consuming it. Keep youtself challenged to grow your skills as a developer.

{{% chapter_header "Appendix: CSS Files and Styles" "appendix-styling" %}}

This section has all the CSS files, their content and locations, in order to give your React with GraphQL and Apollo Client application a nice touch. It even makes it responsive for mobile and tablet devices. These are only recommendations though. So you are free to experiment with them or to come up with your own styles.

*src/style.css*

{{< highlight css >}}
#root,
html,
body {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 200;
  text-rendering: optimizeLegibility;
}

h2 {
  font-size: 24px;
  font-weight: 600;
  line-height: 34px;
  margin: 5px 0;
}

h3 {
  font-size: 20px;
  font-weight: 400;
  line-height: 27px;
  margin: 5px 0;
}

ul,
li {
  list-style: none;
  padding-left: 0;
}

a {
  text-decoration: none;
  color: #000;
  opacity: 1;
  transition: opacity 0.25s ease-in-out;
}

a:hover {
  opacity: 0.35;
  text-decoration: none;
}

a:active {
  text-decoration: none;
}

pre {
  white-space: pre-wrap;
}
{{< /highlight >}}

*src/App/style.css*

{{< highlight css >}}
.App {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.App-main {
  flex: 1;
}

.App-content_large-header,
.App-content_small-header {
  margin-top: 54px;
}

@media only screen and (max-device-width: 480px) {
  .App-content_large-header {
    margin-top: 123px;
  }

  .App-content_small-header {
    margin-top: 68px;
  }
}
{{< /highlight >}}

*src/App/Footer/style.css*

{{< highlight css >}}
.Footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #24292e;
  padding: 20px;
  color: #ffffff;
}

@media only screen and (max-device-width: 480px) {
  .Footer {
    text-align: center;
  }
}

.Footer-text {
  opacity: 0.35;
}

.Footer-link {
  color: #ffffff;
  opacity: 1;
}
{{< /highlight >}}

*src/App/Navigation/style.css*

{{< highlight css >}}
.Navigation {
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  background-color: #24292e;
  display: flex;
  align-items: baseline;
}

@media only screen and (max-device-width: 480px) {
  .Navigation {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.Navigation-link {
  font-size: 12px;
  letter-spacing: 3.5px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 20px;
  text-decoration: none;
}

.Navigation-link a {
  color: #ffffff;
}

.Navigation-search {
  padding: 0 10px;
}

@media only screen and (max-device-width: 480px) {
  .Navigation-link {
    padding: 10px;
  }

  .Navigation-search {
    padding: 10px 10px;
  }
}
{{< /highlight >}}

*src/Button/style.css*

{{< highlight css >}}
.Button {
  padding: 10px;
  background: none;
  cursor: pointer;
  transition: color 0.25s ease-in-out;
  transition: background 0.25s ease-in-out;
}

.Button_white {
  border: 1px solid #fff;
  color: #fff;
}

.Button_white:hover {
  color: #000;
  background: #fff;
}

.Button_black {
  border: 1px solid #000;
  color: #000;
}

.Button_black:hover {
  color: #fff;
  background: #000;
}

.Button_unobtrusive {
  padding: 0;
  color: #000;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.25s ease-in-out;
  outline: none;
}

.Button_unobtrusive:hover {
  opacity: 0.35;
}

.Button_unobtrusive:focus {
  outline: none;
}
{{< /highlight >}}

*src/Error/style.css*

{{< highlight css >}}
.ErrorMessage {
  margin: 20px;
  display: flex;
  justify-content: center;
}
{{< /highlight >}}

*src/FetchMore/style.css*

{{< highlight css >}}
.FetchMore {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.FetchMore-button {
  margin: 20px 0;
}
{{< /highlight >}}

*src/Input/style.css*

{{< highlight css >}}
.Input {
  border: none;
  padding: 10px;
  background: none;
  outline: none;
}

.Input:focus {
  outline: none;
}

.Input_white {
  border-bottom: 1px solid #fff;
  color: #fff;
}

.Input_black {
  border-bottom: 1px solid #000;
  color: #000;
}
{{< /highlight >}}

*src/Issue/IssueItem/style.css*

{{< highlight css >}}
.IssueItem {
  margin-bottom: 10px;
  display: flex;
  align-items: baseline;
}

.IssueItem-content {
  margin-left: 10px;
  padding-left: 10px;
  border-left: 1px solid #000;
}
{{< /highlight >}}

*src/Issue/IssueList/style.css*

{{< highlight css >}}
.Issues {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
}

.Issues-content {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.IssueList {
  margin: 20px 0;
}

@media only screen and (max-device-width: 480px) {
  .Issues-content {
    align-items: center;
  }
}
{{< /highlight >}}

*src/Loading/style.css*

{{< highlight css >}}
.LoadingIndicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

.LoadingIndicator_center {
  margin-top: 30%;
}
{{< /highlight >}}

*src/Repository/style.css*

{{< highlight css >}}
.RepositoryItem {
  padding: 20px;
  border-bottom: 1px solid #000;
}

.RepositoryItem-title {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

@media only screen and (max-device-width: 480px) {
  .RepositoryItem-title {
    flex-direction: column;
    align-items: center;
  }
}

.RepositoryItem-title-action {
  margin-left: 10px;
}

.RepositoryItem-description {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}

@media only screen and (max-device-width: 480px) {
  .RepositoryItem-description {
    flex-direction: column;
    align-items: center;
  }
}

.RepositoryItem-description-info {
  margin-right: 20px;
}

@media only screen and (max-device-width: 480px) {
  .RepositoryItem-description-info {
    text-align: center;
    margin: 20px 0;
  }
}

.RepositoryItem-description-details {
  text-align: right;
  white-space: nowrap;
}

@media only screen and (max-device-width: 480px) {
  .RepositoryItem-description-details {
    text-align: center;
  }
}
{{< /highlight >}}

*src/TextArea/style.css*

{{< highlight css >}}
.TextArea {
  display: block;
  min-width: 200px;
  min-height: 75px;
  padding: 10px;
  margin-bottom: 10px;
}
{{< /highlight >}}

<hr class="section-divider">

You can find the final {{% a_blank "repository on GitHub" "https://github.com/rwieruch/react-graphql-github-apollo" %}}. The repository showcases most of the exercise tasks too. The application is not feature complete and doesn't cover all edge cases. However, I hope the walkthrough of implementing the application with GraphQL and Apollo in React has helped you. In the GraphQL with React book, you will continue learning about using GraphQL (and Apollo) in React. The previous sections are by far not all to it. So I hope you are curious about the GraphQL book and {{% a_blank "sign up for receiving updates" "https://www.getrevue.co/profile/rwieruch" %}}. Thank you so much for reading :-)