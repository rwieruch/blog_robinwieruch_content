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

{{% read_before_2 "This tutorial is part 3 of 3 in this series." "Part 1:" "Getting Started with GitHub's GraphQL API" "https://www.robinwieruch.de/getting-started-github-graphql-api" "Part 2:" "A complete React with GraphQL Tutorial" "https://www.robinwieruch.de/react-with-graphql-tutorial/" %}}

In this tutorial, you will learn how to combine React with GraphQL in your application using Apollo. The Apollo toolset can be used to create a GraphQL client, GraphQL server, and other complementary applications, but you will use the Apollo Client for your React client-side application. Along the way, you will build a simplified GitHub client that consumes {{% a_blank "GitHub's GraphQL API" "https://developer.github.com/v4/" %}} using Apollo instead of plain HTTP requests like the previous application. Apollo Client can be used to perform queries and mutations, and to read and write data. By the end, you should be able to showcase a React application using GraphQL and Apollo that can be used by other developers as a learning tool. You can find the final project as {{% a_blank "repository on GitHub" "https://github.com/rwieruch/react-graphql-github-apollo" %}}.

{{% package_box "The Road to learn React" "Build a Hacker News App along the way. No setup configuration. No tooling. No Redux. Plain React in 190+ pages of learning material. Pay what you want like <strong>33.000+ readers</strong>." "Get the Book" "img/page/cover.png" "https://www.getrevue.co/profile/rwieruch" %}}

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

Apollo is an entire ecosystem built by developers as an infrastructure for GraphQL applications. You can use it on the client-side for a GraphQL client application, server-side for a GraphQL server application, somewhere between as a gateway, or for other GraphQL related tools like monitoring). At the time of writing this tutorial, Apollo offers the richest and most popular ecosystem around GraphQL in JavaScript. There are other libraries for React applications like {{% a_blank "Relay" "http://facebook.github.io/relay" %}} and {{% a_blank "Urql" "https://github.com/FormidableLabs/urql" %}}, but they are just for React applications, and they are not as popular as the Apollo Client. Apollo is framework agnostic, meaning you can use it with other applications than react.  It can be coupled with other view-layers like Vue and Angular as well, so everything you learn in this tutorial is likely transferable to the others.

This starts by introducing Apollo Client with Apollo Boost. The latter allows you to create a zero-configuration Apollo Client to get started the fastest and most convenient way. This section focuses on the Apollo Client instead of React for the sake of learning. To get started, find the {{% a_blank "Node.js boilerplate project and its installation instructions" "https://github.com/rwieruch/node-babel-server" %}}. You will use Apollo Client on the command line in a Node.js environment for now. On top of the minimal Node.js project, you will introduce the Apollo Client with Apollo Boost to experience the GraphQL client without a view-layer library.

In the following, you will consume GitHub's GraphQL API, and then output the queries and mutation results in the command line. To do this, you need a personal access token on GitHub's website, which we covered in a previous chapter. If you haven't done it yet, head to {{% a_blank "GitHub's instructions" "https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/" %}} to generate a personal access token with sufficient permissions.

After you've cloned and installed the Node.js boilerplate project and created your personal access token, install these two packages in the command line from the root folder of the new project:

{{< highlight javascript >}}
npm install apollo-boost graphql --save
{{< /highlight >}}

The {{% a_blank "apollo-boost" "https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost" %}} package gives access to a zero-configuration Apollo Client, and the {{% a_blank "graphql" "https://github.com/graphql/graphql-js" %}} package allows GraphQL queries, mutations, and subscriptions on both the client and server. It is JavaScript's reference implementation of {{% a_blank "Facebook's GraphQL specification" "https://github.com/facebook/graphql" %}}.

In the next steps, you will configure and use the Apollo Client that comes with Apollo Boost in the *index.js* file of the project. The project stays small, and you will only implement it in this section, so for now we can have everything in one file for the sake of learning.

In your *index.js* file, you can import the Apollo Client from Apollo Boost. After that, you can create a client instance by calling its constructor with a URI. The client needs to know where the data comes from, and where it should be written, so you can pass GitHub's API endpoint to it.

{{< highlight javascript >}}
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
});
{{< /highlight >}}

The Apollo Client already works this way. Remember, however, that GitHub's GraphQL API requires a personal access token. That's why you have to define it once when creating the Apollo Client instance. Therefore, you can use the `request` property to define a function which has access to the context of each request made through the Apollo Client. There, you pass the authorization header using Apollo Boost as one of its default headers.

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

You did the same for the previous application, using only axios for plain HTTP requests. You configured Axios once with the GraphQL API endpoint to default all requests to this URI, and set up the authorization header. The same happened here, because it's enough to configure your client once for all the following GraphQL requests.

Remember, replace the `YOUR_GITHUB_PERSONAL_ACCESS_TOKEN` string with your personal access token you created on GitHub's website before. However, you may not want to put your access token directly into the source code, so you can create a *.env* file which holds all of your environment variables in your project folder. If you don't want to share the personal token in a public GitHub repository, you can also add the file to your *.gitignore* file. In the command line, you can create this file:

{{< highlight javascript >}}
touch .env
{{< /highlight >}}

Simply define your environment variables in this *.env* file. In your *.env* file, paste the following key value pair whereas the naming for the key is up to you and the value has to be your personal access token from GitHub.

{{< highlight javascript >}}
GITHUB_PERSONAL_ACCESS_TOKEN=xxxXXX
{{< /highlight >}}

In any Node.js application, use the key in your source code with the following package: {{% a_blank "dotenv" "https://github.com/motdotla/dotenv" %}}. Follow their instructions to install it for your project. Usually, the process is only a `npm install dotenv`, followed by including `require('dotenv').config()` in your *index.js* file. Afterward use the personal access token from the *.env* file in your *index.js* file. If you run into an error, just continue reading this section to learn how to fix it.

{{< highlight javascript "hl_lines=3 10" >}}
import ApolloClient from 'apollo-boost';

require('dotenv').config();

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

Note: There may be additional configuration steps for the previously installed dotenv package. Since the installation instructions may vary with different dotenv versions, check their GitHub website after you have installed it to find th ebest configurations.

When you start your application with `npm start` without query or mutation and just Apollo Client, you might see the following error: *"Error: fetch is not found globally and no fetcher passed, to fix pass a fetch for your environment ..."*. The error occurs because the {{% a_blank "native fetch API" "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" %}}, which is used to make requests to remote APIs on a promise basis, is only available in the browser. You can't access to it in a Node.js application that runs only in the command line. However, the Apollo Client uses the fetch API to perform queries and mutations, usually from a browser environment and not Node.js environment. As you may remember, a query or mutation can be performed with a simple HTTP request, so the Apollo Client uses the native fetch API from a browser to perform these requests. The solution is to use a node package to make fetch available in a Node.js environment. Fortunately, there are packages to address this issue, which can be installed via the command line:

{{< highlight javascript >}}
npm install cross-fetch --save
{{< /highlight >}}

Second, import it anonymously in your project:

{{< highlight javascript "hl_lines=1" >}}
import 'cross-fetch/polyfill';
import ApolloClient from 'apollo-boost';
{{< /highlight >}}

The error should disappear when you start the application from the command line, but nothing happens just yet. An instance of the Apollo Client is created with a configuration. In the following, you will perform your first query with Apollo Client.

### Exercises:

* Read more about {{% a_blank "other view integrations such as Angular and Vue" "https://www.apollographql.com/docs/react/integrations.html" %}}
* Invest a few minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5T3W9BB" %}}

{{% chapter_header "Apollo Client and a GraphQL Query" "graphql-apollo-client-query" %}}

Now you are going to send your first query to GitHub's GraphQL API using Apollo Client. Import the following utility from Apollo Boost to define the query:

{{< highlight javascript "hl_lines=2" >}}
import 'cross-fetch/polyfill';
import ApolloClient, { gql } from 'apollo-boost';
{{< /highlight >}}

Define your query with JavaScript template literals:

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

Use the Apollo Client imperatively to send the query to GitHub's GraphQL API. Since the Apollo Client is promise-based, the `query()` method returns a promise that you can eventually resolve. Since the application runs in the command line, it's sufficient to console log the result there.

{{< highlight javascript "hl_lines=3 4 5 6 7" >}}
...

client
  .query({
    query: GET_ORGANIZATION,
  })
  .then(console.log);
{{< /highlight >}}

That's all there is to sending a query with the Apollo Client.  As noted, Apollo Client uses HTTP under the hood to send the defined query as payload in a POST method. The result on the command line after starting the application with `npm start` should look similar to the following:

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

The requested information from the GraphQL query can be found in the `data` object. There, you will find the `organization` object with its `name` and `url` fields.The Apollo Client automatically requests the GraphQL {{% a_blank "meta field" "http://graphql.org/learn/queries/#meta-fields" %}} `__typename`. The meta field can be used by the Apollo Client as an identifier, to allow caching and optimistic UI updates.

More meta information about the request can be found next to the `data` object. It shows whether the data is still loading, as well as specific details about the {{% a_blank "network status" "https://github.com/apollographql/apollo-client/blob/master/packages/apollo-client/src/core/networkStatus.ts" %}}, and see whether the requested data is stale on the server-side.

### Exercises:

* Explore GitHub's GraphQL API
  * Get comfortable navigating through their documentation
  * Add other fields for the `organization` field
* Read more about {{% a_blank "why you should use Apollo Client" "https://www.apollographql.com/docs/react/why-apollo.html" %}}
* Read more about the {{% a_blank "networkStatus property and its possible values" "https://github.com/apollographql/apollo-client/blob/master/packages/apollo-client/src/core/networkStatus.ts" %}}
* Invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5MF35H5" %}}

{{% chapter_header "Apollo Client with Pagination, Variables, Nested Objects and List Fields" "graphql-apollo-client-pagination" %}}

You learned about GraphQL pagination and other GraphQL features in previous sections when you built the React with GraphQL application without Apollo. This section will introduce a couple of these features. This section wil introduce GraphQL variables. The `login` argument for the organization field in the previous query can be substituted with such a variable. First, you have to introduce the variable in your GraphQL query:

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

That's how you  pass variables to the query using an instance of the Apollo Client in your application. Next, add the nested `repositories` list field to your organization. There, you can request all GitHub repositories in an organization. You may want to rename the query variable as well, but rememenber to change it when you use the Apollo Client.

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

You have seen a similar query structure in the application we created earlier, so this section has a couple of exercises for you to test the GraphQL skills you've learned. Solving the exercises will fortify your GraphQL skills you can focus on connecting the Apollo Client to your React application. You will find all the solutions to the exercises in a GitHub repository for this application at the end of the exercises, but you should consider working it out on your own first.

### Exercises:

* Explore GitHub's GraphQL API
  * Extend the `repositories` list field by querying an ordered list of repositories which is ordered by the number of stargazers
* Extract the content of a repository `node` to a GraphQL a reusable fragment
* Read more about {{% a_blank "pagination in GraphQL" "https://graphql.org/learn/pagination" %}}
* Add the pagination feature for list of repositories
  * Add the `pageInfo` field with its `endCursor` and `hasNextPage` fields in the query
  * Add the `after` argument and introduce a new `$cursor` variable for it
  * Perform the first query without a `cursor` argument
  * Perform a second query with the `endCursor` of the previous query result as `cursor` argument
* Checkout the {{% a_blank "source code" "https://github.com/rwieruch/node-appollo-boost-github-graphql-api" %}} of the previously implemented application and align your thoughts/implementation with it
* Take the three-minute {{% a_blank "quiz" "https://www.surveymonkey.com/r/SWL9NJ7" %}}

{{% chapter_header "Apollo Client and a GraphQL Mutation" "graphql-apollo-client-mutation" %}}

Previously, you learned how to query data from GitHub's GraphQL API using the Apollo Client. Once the client is set up with a configuration, you can use its `query()` method to send a GraphQL `query` with optional `variables`. As you have learned, reading data with GraphQL is not everything, because there are mutations for writing data as well. In this section, you are going to define a mutation to star a repository on GitHub. The Apollo Client instance sends the mutation, but first you have to define it. You may be familiar with it from the other applications built in this tutorial.

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

The identifier for the repository is required, or GitHub's GraphQL server wouldn't know which repository you want to star. In the next code snippet, the Apollo Client is used to star a specific GitHub repository with a given identifier. The identifier can be retrieved by adding the `id` field to your repository `node` field in the query. Use the `mutate()` method on the Apollo Client to send the mutation in a `mutation` and `variables` payload. Andthing can be done with the result to fit your application, but In this case, the result it is simply logged in the command line.

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

The result should be encapsulated in a `addStar` object (the name of the mutation), which should reflect exactly the objects and fields that you have defined in the mutation: `starrable`, `id` and `viewerHasStarred`.

You've completed another learning step by using only Apollo Client without any view-layer library. This is to avoid confusing the features of Apollo Client and React Apollo.

Remember, Apollo Client can be used as a standalone GraphQL client without connecting it to a view-layer like React, though it may seem a bit dull to see the data only on the command line. HTML and CSS can make the operation read for a user interface, so let's see how Apollo connects th data-layer to a React view-layer in the next section.

### Exercises:

* Implement the `removeStar` mutation next to the `addStar` mutation
* Checkout the {{% a_blank "source code" "https://github.com/rwieruch/node-appollo-boost-github-graphql-api" %}} of the previously implemented application and align your thoughts/implementation with it
* Invest three minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5XMNFSY" %}}

{{% chapter_header "Writing your first React with GraphQL and Apollo Client" "react-graphql-apollo-client" %}}

Now we'll focus on using Apollo Client in React by building another client application. Basically, you will learn how to connect the data-layer to the view-layer. We'll covrer how to send queries and mutations from the view-layer, and how to update the view-layer to reflect the result. Further, you will learn to use GraphQL features like pagination, optimistic UI, caching, local state management, and prefetching with Apollo Client in React.

For this application, no elaborate React setup is needed. Simply use [create-react-app](https://github.com/facebook/create-react-app) to create your React application. If you want to have an elaborate React setup instead, see this [setup guide for using Webpack with React](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/). To get started, the following steps have to be performed:

* Create a new React application with create-react-app
* Create a folder/file structure for your project (recommendation below)

You can create your own folder and file structure for your components in the *src/* folder; the following top level structure is only a recommendation. If you adjust it to your own needs, keep in mind that the JavaScript import statements with their paths will need to be adjusted to match.  If you don't want to create everything, you can clone this {{% a_blank "GitHub repository" "https://github.com/rwieruch/react-graphql-apollo-tutorial-boilerplate" %}} instead and follow its installation instructions.

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

The folders primarily represent React components. Some components will be reusable UI components such as the Input and Link components, while other components like Repository and Profile components are domain specific for the GitHub client application. Only the top level folders are specified for now, though more can be introduced later if you choose. Moreover, the 'constants' folder has only one file to specify the application's routes, which will be introduced later. You may want to navigate from a page that shows repositories of an organization (Organization component) to a page which shows repositories of yourself (Profile component).

This application will use plain CSS classes and CSS files. By following the plain CSS classes, you can avoid difficulties that may occur with other tools.  You will find all the CSS files and their content in the appendix of this tutorial. The components will use their class names without explaining them. The next sections should be purely dedicated to JavaScript, React, and GraphQL.

### Exercises:

* If you are not familiar with React, read up *The Road to learn React*
* Set up the recommended folder/file structure (if you are not going with your own structure and didn't clone the repository)
  * Create the CSS *style.css* files in their specified folders from the [appendix](#appendix-styling) section of this tutorial
  * Create the *index.js* files for the components
  * Create further folders on your own for non top level components (e.g. Navigation) when conducting the following sections
* Run the application with `npm start`
 * Make sure there are no errors
 * Render only a basic App component with *src/App/index.js* in the *src/index.js* file
* Invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5N9W2WR" %}}

{{% chapter_header "Configure Apollo Client for React and GitHub's GraphQL API" "react-apollo-client-configuration" %}}

In this section, you will set up a Apollo Client instance in the Node.js environment, same as before. However, this time you will use Apollo Client directly without the zero-configuration package Apollo Boost, meaning you'll need to configure the Apollo Client yourself without sensible defaults. While it's best to use a tool with sensible defaults for learning, configuring Apollo yourself exposes the composable ecosystem of Apollo Client, how to use it for an initial setup, and how to advance this setup later. 

The Apollo Client setup can be completed in the top-level *src/index.js* file, where the React to HTML entry point exists as well. First, install the Apollo Client in your project folder using the command line:

{{< highlight javascript >}}
npm install apollo-client --save
{{< /highlight >}}

Two utility packages are requied for two mandatory configurations used to create the Apollo Client. The {{% a_blank "apollo-cache-inmemory" "https://github.com/apollographql/apollo-client/tree/master/packages/apollo-cache-inmemory" %}} is a recommended cache (read also as: store or state) for your Apollo Client to manage the data, while apollo-link-http is used to configure the URI and additional network information once for an Apollo Client instance.

{{< highlight javascript >}}
npm install apollo-cache-inmemory apollo-link-http --save
{{< /highlight >}}

As you can see, nothing has been mentioned about React, only the Apollo Client plus two packages for its configuration. There are two additional packages required for Apollo Client to work with GraphQL, to be used as internal dependencies by Apollo. The latter is also used to define queries and mutations. These utilities came directly from Apollo Boost.

{{< highlight javascript >}}
npm install graphql graphql-tag --save
{{< /highlight >}}

That's it for package installation, so now we enter the Apollo Client setup and configuration. In your top level *src/index.js* file, where all the Apollo Client setup will be done in this section, import the necessary classes for the Apollo Client setup from the previously installed packages.

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

The `ApolloClient` class is used to create the client instance, and the `HttpLink` and `InMemoryCache` are used for its mandatory configurations. First, you can create a configured `HttpLink` instance, which will be fed to the Apollo Client creation.

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

You may recall the mandatory configuration from previous applications. The `uri` is a mandatory value to define the only GraphQL API endpoint used by the Apollo Client. In this case, Github's GraphQL endpoint is passed as value. When consuming the GitHub GraphQL API, you have to authorize yourself with your personal access token. You should have already created the token in a previous section, which you can now define in a *.env* file in your project folder. Afterward, it should be accessible with `process.env`. Keep in mind that you have to use the `REACT_APP` prefix when using create-react-app, because that's how it is required by create-react-app. Otherwise, you would be free to choose your own naming for it.

Second, create the cache as the place where the data is managed in Apollo Client. The cache normalizes your data, caches requests to avoid duplicates, and makes it possible to read and write data to the cache. You will use it multiple times while developing this application. The cache instantiation is straight forward, as it doesn't require you to pass any arguments to it. Check the API to explore further configurations.

{{< highlight javascript >}}
const cache = new InMemoryCache();
{{< /highlight >}}

Finally, you can use both instantiated configurations, the link and the cache, to create the instance of the Apollo Client.

{{< highlight javascript >}}
const client = new ApolloClient({
  link: httpLink,
  cache,
});
{{< /highlight >}}

To initialize Apollo Client, you must specify link and cache properties on the config object. Once you start your application again, there should be no errors. It doesn't check whether you have implemented a basic App component in your *src/App/index.js* file because the `ReactDOM` API needs to hook this component into the HTML.

### Exercises:

* Read more about {{% a_blank "the network layer configuration in Apollo Client" "https://www.apollographql.com/docs/react/advanced/network-layer.html" %}}
* Invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5FYZT8T" %}}

{{% chapter_header "Connect Data-Layer to View-Layer: Introducing React Apollo" "react-apollo-connecting-layers" %}}

All we've donen thus far has been the framework agnostic part of Apollo Client. However, without connecting React to it, you'd have a hard time making effective use of GraphQL. That's why there is an official library to connect both worlds: {{% a_blank "react-apollo" "https://github.com/apollographql/react-apollo" %}}. The great thing about those connecting libraries is that there are solutions for other view-layer solutions like Angular and Vue, too, so you can use the Apollo Client in a framework agnostic way. In the following, it needs two steps to connect the Apollo Client with React. First, install the library in the command line in your project folder:

{{< highlight javascript >}}
npm install react-apollo --save
{{< /highlight >}}

Second, import its ApolloProvider component, and use it as a composing component around your App component. Under the hood, it uses React's Context API to pass the Apollo Client through your application. Remember to pass the client instance to it as prop:

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

 Now you have implicit access to the Apollo Client in your React view-layer. It says implicit because most often you will not use the client explicitly. You will see in the next section what this means.

### Exercises:

* Read more about {{% a_blank "configuring and connecting Apollo Client to React" "https://www.apollographql.com/docs/react/essentials/get-started.html" %}}
* Invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5FHMHW8" %}}

{{% chapter_header "GraphQL Query with Apollo Client in React" "react-apollo-client-query" %}}

In this section, you will implement your first GraphQL query using Apollo Client in React. You've seen how different entities, such as the current user (viewer) or repositories, can be queried from GitHub's GraphQL API. This time you will do it in React. A Profile component might be the best place to render current users and their associated repositories. Start by using the not-yet-implemented Profile component in your App component, which we'll take care of next.  It makes sense to extract the Profile component now, because the App component will be the static frame around the application later. Components like Navigation and Footer are static, and components such as Profile and Organization are dynamically rendered based on routing (URLs).

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

Now we'll learn to query data with GraphQL and Apollo Client.  The Apollo Client was provided in a previous section with React's Context API in a top level component. You have implicit access to it, but never use it directly for standard queries and mutations. It says "standard" here, because there will be situations where you use the Apollo Client instance directly while implementing this application. 

 The React Apollo package grants access to a Query component, which takes a query as prop and executes it when its rendered. That's the important part: it executes the query when props is rendered. It uses React's [render props](https://www.robinwieruch.de/react-render-props-pattern/) pattern, using a child as a function implementation where you can access the result of the query as an argument.

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

This is a function that returns only JSX, but you have access to additional information in the function arguments. First, define the GraphQL query to request your authorizations. You can use a previously installed utility package to define the query.

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

Use the children as a function pattern to retrieve the query result as a data object, and render the information in your JSX.

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

Make sure to give some type of visual feedback until you've installed a view layer:

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

That's how you define a GraphQL query in a declarative way in React. Once the Query component renders, the request is executed. The Apollo Client is used, provided in a top level component, to perform the query. The render props pattern makes it possible to access the result of the query in the child function. You can try it in your browser to verify that it actually works for you.

There is more information found in the render prop function. Check the official React Apollo API for addtional information beyond the examples in this tutorial. 

Next, let's show a loading indicator when a query is pending:

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

The application now shows  a loading indicator when there is no `viewer` object or the `loading` boolean is set to true. As you can assume that the request will be pending when there is no `viewer`, you can show the loading indicator from the beginning. At this point, it's best to extract the loading indicator as its own component because you will have to reuse it later for other queries. You created a Loading folder for it before, which will house the *src/Loading/index.js* file. Then, use it in your Profile component.

{{< highlight javascript >}}
import React from 'react';

const Loading = () =>
  <div>Loading ...</div>

export default Loading;
{{< /highlight >}}

Next, extend the query with a nested list field for querying your own GitHub repositories. You have done it a few times before, so the query structure shouldn't be any different now. The following query requests a lot of information you will use in this application:

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

Use this extended and renamed query in your Query component to request additional information about repositories. Pass these repositories from the query result to a new RepositoryList component which should do all the rendering for you. It's not the responsibility of the Profile component, and you may want to render a list of repositories somewhere else.

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

In your *src/Repository/index.js* file, create your first import/export statements for the RepositoryList component from a dedicated file in this folder. The *index.js* file is used as your entry point to this Repository module. Everything used from this module should be accessible by importing it from this *index.js* file.

{{< highlight javascript >}}
import RepositoryList from './RepositoryList';

export default RepositoryList;
{{< /highlight >}}

Next, define the RepositoryList component in your *src/Repository/RepositoryList/index.js* file. The component only takes the array of repositories as props, which will be retrieved by the GraphQL query to render a list of RepositoryItem components. The identifier of each repository can be passed as key attribute to the rendered list. Otherwise, all props from one repository node are passed to the RepositoryItem using the JavaScript spread operator.

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

Finally, define the RepositoryItem component in the *src/Repository/RepositoryItem/index.js* file to render all the queried information about each repository. The file already uses a couple of stylings which you may have defined in a CSS file as suggested before. Otherwise, the component renders only static information for now.

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

The anchor element to link to the repository is already extracted as a Link component. The Link component in the *src/Link/index.js* file could look like the following, to make it possible to open those URLs in an extra browser tab:

{{< highlight javascript >}}
import React from 'react';

const Link = ({ children, ...props }) => (
  <a {...props} target="_blank">
    {children}
  </a>
);

export default Link;
{{< /highlight >}}

Once you restart your application, you should see a styled list of repositories with a name, url, description, star count, owner, and the project's implementation language. If you can't see any repositories, check to see if your GitHub account has any public repositories. If it doesn't, then it's normal that nothing showed up. I reccomend you make yourself comfortable with GitHub by creating a couple of repositories, both for the sake of learning about GitHub and to use this data to practice with this tutorial. Another way to create repositories for your own account is forking repositories from other people.

What you have done in the last steps of this section were pure React implementation, but this is only one opinionated way on how to structure components. The most important part from this section though happens in the Profile component. There, you introduced a Query component that takes a query as prop. Once the Query component renders, it executes the GraphQL query. The result of the query is made accessible as an argument within React's render props pattern.

### Exercises:

* Read more about {{% a_blank "queries with Apollo Client in React" "https://www.apollographql.com/docs/react/essentials/queries.html" %}}
* Invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/53Q6K3V" %}}

{{% chapter_header "Apollo Client Error Handling in React" "react-apollo-client-error-handling" %}}

Before diving into GraphQL mutations in React with Apollo Client, this section should clarify error handling with Apollo in React. The error handling happens on two levels: the application level and the query/mutation level. Both can be implemented with the two cases that follow. On a query level, in your Profile component, you have access to the query `data` and `loading` properties. Apart from these, you can also access the `error` object, which can be used to show a conditional error message.

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

Try to change the name of a field in your query to something not offered by GitHub's GraphQL API, and observe what's rendered in the browser. You should see something like this: *Error: GraphQL error: Field 'viewers' doesn't exist on type 'Query'*. Or, if you simulate offline functionality, you'll see: *Error: Network error: Failed to fetch*. That's how errors can be separated into GraphQL errors and network errors. You can handle errors on a component or query level but it will also help with mutations latere. To implement this into an application, install another Apollo package:

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

You could differentiate the error handling at the application level into development and production mode. During development, it might be sufficient to console log the errors to a developer console in the browser. In production mode, you can setup a error tracking service like {{% a_blank "Sentry" "https://sentry.io" %}}. It will teach you to identify bugs in a web dashboard more efficient

Now you have two links in your application: `httpLink` and `errorLink`. To combing them for use with the Apollo Client instance, we'll download yet anothe ruseful package in the Apollo ecosystem that makes link compositions possible in the command line:

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

That's how two or multiple links can be composed for creating a Apollo Client instance. There are several links developed by the community and Apollo maintainers that extend the Apollo Client with advanced functionality. Remember, it's important to understand that links can be used to access and modify the GraphQL control flow. When doing so, be careful to chain the control flow in the correct order. The `apollo-link-http` is called a **terminating link** because it turns an operation into a result that usually occurs from a network request. On the other side, the `apollo-link-error` is a **non-terminating link**. It only enhances your terminating link with features, since a terminating link has to be last entity in the control flow chain.

### Exercises:

* Read more about {{% a_blank "different Apollo Error types and error policies" "https://www.apollographql.com/docs/react/features/error-handling.html" %}}
* Read more about {{% a_blank "Apollo Links" "https://www.apollographql.com/docs/link/" %}}
* Read more about {{% a_blank "composable Apollo Links" "https://www.apollographql.com/docs/link/composition.html" %}}
* Implement the {{% a_blank "apollo-link-retry" "https://www.apollographql.com/docs/link/links/retry.html" %}} in case a network request fails
* Invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/53HLLFX" %}}

{{% chapter_header "GraphQL Mutation with Apollo Client in React" "react-apollo-client-mutations" %}}

The previous sections have taught you how to query data with React Apollo and the Apollo Client. In this section, you will learn about mutations. As in other applications before, you will implement starring a repository with GitHub's exposed `addStar` mutation.

The mutation starts out with a variable to identify the repository to be starred. We haven't used a variable in Query component yet,  but the following mutation works the same way, which can be defined in the *src/Repository/RepositoryItem/index.js* file.

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

The mutation definition takes the `id` variable as input for the `addStar` mutation. As before, you can decide what should be returned in case of a successful mutation. Now, you can use a Mutation component the represents the previously used Query component. You have to pass the mutation prop, but also a variable prop for passing the identifier for the repository.

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

Note: The div element surrounding the Mutation component is there for other mutations you will implement in this section.

The `id` for each repository should be available due to previous query result. It has to be used as a variable for the mutation to identify the repository. The Mutation component is used in a way like theQuery component, because it implements the render prop pattern as well. The first argument is different, though, as it a mutation as a function instead of the mutation result. Use this function to trigger the mutation before expecting a result. Later, you will see how to retrieve the mutation result; for now, the mutating function can be used in a button element. In this case, it is already in a Button component:

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

The styled Button component could be implemented in the *src/Button/index.js* file. It's already extracted, because you will use its styling functionalities later in this application.

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

Let's get to the mutation result which was left out before. Access to it as second argument in your child function of the render prop.

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

A mutation works like a query when using React Apollo. It uses the render prop pattern to access the mutation and the result of the mutation. The mutation can be used as a function in the UI. It has access to the variables that are passed in the Mutation component, but it can also override the variables when you pass them in a configuration object to the function (e.g. `addStar({ variables: { id } })`). That's a general pattern in React Apollo: You can specify information like variables in the Mutation component, or when you call the mutating function to override it.

Note that if you use the `viewerHasStarred` boolean from the query result to show either a "Star" or "Unstar" button, you can do it with a conditional rendering:

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

When you star a repository as above, the "Star" button disappears. This is what we want, because it means the `viewerHasStarred` boolean has been updated in Apollo Client's cache for the identified repository.  Apollo Client was able to match the mutation result with the repository identifier to the repository entity in Apollo Client's cache, the props were updated, and the UI re-rendered. However, the count on the clients side hasn't updated, because it can't be retrieved from GitHub's API. It needs update the count  in Apollo Client's cache, which we will cover in the next sections.

### Exercises:

* Read more about {{% a_blank "mutations with Apollo Client in React" "https://www.apollographql.com/docs/react/essentials/mutations.html" %}}
* Implement other mutations in the RepositoryItem component
  * Implement the `removeStar` mutation when the `viewerHasStarred` boolean is true
  * Show a button with the watchers count which should be used to watch/unwatch a repository
    * Implement the `updateSubscription` mutation from GitHub's GraphQL API to watch/unwatch a repository based on the `viewerSubscription` status
* Invest three minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5GJQWXC" %}}

{{% chapter_header "GraphQL Query/Mutation with Higher-Order Components in React" "react-apollo-client-query-mutation-higher-order-component" %}}

We've done Query and Mutation components from React Apollo to connect a data-layer (Apollo Client) with a view-layer (React). The Query component executes the query when it is rendered, whereas the Mutation component gives access to a function that triggers the mutation. Both components use the render props pattern to make the results accessible in their child functions.

[Higher-Order Components (HOC)](https://www.robinwieruch.de/gentle-introduction-higher-order-components/) is a widely accepted alternative to React's render prop pattern. The React Apollo package implements a Higher-Order Component for queries and mutations as well, though the team behind Apollo doesn't advertise it, and even spoke in favor of render props as their first choice. Nonetheless, this section shows you the alternative, using a Higher-Order Component instead of a Render Prop, though the tutorial will continue to use the render prop pattern afterward. There is no Query component needed in the component itself:

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

There is no GraphQL involved here, because all you see is the pure view-layer. Instead, the data-layer logic is extracted into a Higher-Order Component.  We import the `graphql` HOC from the React Apollo package in order to apply it on the Profile component, which takes the query definition as argument.

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

I find the HOC approach cleaner than the render props, because it co-locates both the data-layer and view-layer instead of inserting the one into the other. However, the team behind Apollo made the decision to favor render props instead. While I find the HOC approach more concise, the render prop pattern comes with its own advantages for mutating and querying data. For instance, imagine a query depends on a prop used as variable. It would be cumbersome to access the incoming prop in a statically-defined Higher-Order Component, but it can be dynamically used in a render prop because it is used within the Profile component where the props are naturally accessible. Another advantage is the power of composition for render props, which is useful when one query depends on the result of another. It can be achieved with HOCs as well, but again, it is more cumbersome. It boils down to seemingly never ending "Higher-Order Components vs Render Props" discussions. 

### Exercises:

* Come up with your own opinion about the advantages and disadvantages of using a Higher-Order Component or Render Prop
* Try to implement one of your mutations with a Higher-Order Component
* Invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5G6QPLY" %}}

{{% chapter_header "Local State Management with Apollo Client in React" "react-apollo-client-local-state-management" %}}

Let's get back to the Repository component. You have experienced that the `viewerHasStarred` boolean updates in the Apollo Client's cache after a mutation was successful. That's great, because Apollo Client handles this for you, based on the mutation result. If you have followed the exercises of the mutation section, you should probably see something like a toggling "Star" and "Unstar" label for the button. All of this happens because you returned the `viewerHasStarred` boolean in your mutation result. Apollo Client is clever enough to update the repository entity, which is normalized accessible in the cache. That's powerful default behavior, isn't it? You don't need to handle the local state management yourself, since Apollo Client figures it out for you as long as you provide useful information in the mutation's result.

 Apollo Client doesn't update the count of stars after the mutation, though. Normally, it is assumed that the count of stars increments by one when it is starred, with the opposite for unstarring. Since we don't return a count of stargazers in the mutation result, you have to handle the update in Apollo Client's cache yourself.  Using Apollo Client's `refetchQueries` option is the naive approach for a mutation call, or a Mutation component to trigger a refetch for all queries, where the query result might be affected by the mutation. But that's not the best way to deal with this problem. It costs  another query request to keep the data consistent after a mutation. In a growing application, this approach will eventually become problematic. Fortunately, the Apollo Client offers other functionalities to read/write manually from/to the cache locally without more network requests. The Mutation component offers a prop where you can insert update functionality that has access to the Apollo Client instance for the update mechanism.

Before implementing the update functionality for the local state management, let's refactor another piece of code that will be useful for a local state update mechanism. The query definition next to your Profile component has grown to several fields with multiple object nestings. Previously, you learned about GraphQL fragments, nd how they can be used to split parts of a query to reuse later.  Next, we will split all the field information you used for the repository's node. You can define this fragment in the *src/Repository/fragments.js* file to keep it reusable for other components.

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

You split this partial query (fragment), because it is used more often in this application in the next sections for a local state update mechanism, hence the previous refactoring.

The fragment shouldn't be imported directly from the *src/Repository/fragments.js* path to your Profile component, because  the *src/Repository/index.js* file is the preferred entry point to this module.

{{< highlight javascript "hl_lines=2 4" >}}
import RepositoryList from './RepositoryList';
import REPOSITORY_FRAGMENT from './fragments';

export { REPOSITORY_FRAGMENT };

export default RepositoryList;
{{< /highlight >}}

Finally, import the fragment in the Profile component's file to use it again.

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

The refactoring is done. Your query is now more concise, and the fragment in its natural repository module can be reused for other places and functionalities.  Next, use Mutation component's `update` prop to pass a function which will update the local cache eventually.

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

The function is extracted as its own JavaScript variable,  otherwise ends up too verbose in the RepositoryItem component when keeping it inlined in the Mutation component. The function has access to the Apollo Client and the mutation result in its argument, and you need both to update data so you can destructure the mutation result in the function signature. If you don't know how the mutation result looks like, check the `STAR_REPOSITORY` mutation definition again, where you defined all fields that should appear in the mutation result. For now, the `id` of the to be updated repository is the important part.

{{< highlight javascript "hl_lines=2 3" >}}
const updateAddStar = (
  client,
  { data: { addStar: { starrable: { id } } } },
) => {
  ...
};
{{< /highlight >}}

You could have passed the `id` of the repository to the `updateAddStar()` function, which was a higher-order function in the Mutation component's render prop child function.  You already have access to the repository's identifier in the Repository component.

Now comes the most exciting part of this section. You can use the Apollo Client to read data from the cache,a but also to write data to it. The goal is to read the starred repository from the cache (the id), increment its stargazers count of by one, and write the updated repository back to the cache.  You got repository by its `id` from the cache by extracting the repository fragment. You can use it along with the repository identifier to retrieve the actual repository from Apollo Client's cache without querying all the data with a naive query implementation.

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

The Apollo Client's cache that youset up to initialize the Apollo Client normalizes and stores queried data. Otherwise, the repository would be a deeply nested entity in a list of repositories for the query structure used in the Profile component. Normalization of a data structure makes it possible to retrieve entities by their identifier and their GraphQL `__typename` meta field. The combination of both is the default key, which is called a {{% a_blank "composite key" "https://en.wikipedia.org/wiki/Compound_key" %}}, to read or write an entity from or to the cache. You may find out more about changing this default composite key in the exercises of this section.

Furthermore, the resulting entity has all properties specified in the fragment. If there is a field in the fragment not found on the entity in the cache, you may see the following error message: *Can't find field __typename on object ...*. That's why we use the identical fragment to read from the local cache to query the GraphQL API.

After you have retrieved the repository entity with a fragment and its composite key, you can update the count of stargazers and write back the data to your cache. In this case, increment the number of stargazers.

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

Let's recap all three steps here. First, you have retrieved (read) the repository entity from the Apollo Client using an identifier and the fragment; second, you updated the information of the entity; and third, you wrote back the data with updated information, but kept all remaining information intac using the JavaScript spread operator. This is a manual update mechanism that can be used when a mutation is missing data.

It is a good practice to use an identical fragment for all three parts: the initial query, the `readFragment()`, and `writeFragment()` cache method. Your data structure for the entity stays consistent in your cache. For instance, if you forget to include a property defined by the fragment's fields in data object of the `writeFragment()` method, you  get a warning: *Missing field __typename in ...*. 

On an implementation level, you learned about extracting fragments from a query (or mutation. Fragments allow you to define your shared entities by GraphQL types.  You can reuse those in your queries, mutations or local state management methods to update the cache. On a higher level, you learned that Apollo Client's cache normalizes your data, so you can retrieve entities that were fetched with a deeply nested query using their type and identifier as composite key. Without it, you'd have to perform normalizations for all the fetched data before putting it in your store/state.

### Exercises:

* Read more about {{% a_blank "Local State Management in Apollo Client" "https://www.apollographql.com/docs/react/essentials/local-state.html" %}}
* Read more about {{% a_blank "Fragments in Apollo Client" "https://www.apollographql.com/docs/react/advanced/fragments.html" %}}
* Implement local cache updates for all the other mutations from the previous exercises
  * Implement the identical local cache update, but with decreasing the count of stargazers, for your `removeStar` mutation
  * Implement the local cache update for the `updateSubscription` mutation
* Read more about {{% a_blank "Caching in Apollo Client and the composite key to identify entities" "https://www.apollographql.com/docs/react/advanced/caching.html" %}}
* Invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5BSDXF7" %}}

{{% chapter_header "Apollo Client Optimistic UI in React" "react-apollo-client-optimistic-ui" %}}

We've covered the basics, so now it's time for the advanced topics. One of those topics is the optimistic UI with React Apollo, which makes everything onscreen more synchronous. For instance, when liking a post on Twitter, the like appears immediately.  As developers, we know there is a request that sends the information for the like to the Twitter backend. This request is asynchronous and and doesn't resolve immediately with a result. The optimistic UI immediately assumes a successful request and mimics the result of such request for the frontend so it can update its UI immediately, before the real response arrives later. With a failed request, the optimistic UI performs a rollback and updates itself accordingly. Optimistic UI improves the user experience by omitting inconvenient feedback (e.g. loading indicators) for the user. The good thing is that React Apollo comes with this feature out of the box.

In this section, you will implement an optimistic UI for when a user clicks the watch/unwatch mutation you implemented in a previous exercise. If you haven't, it's time to implement it now, or you can substitute it with the star or unstar mutation. Either way, completing the optimistic UI behavior for all three mutations is the next exercise. For completeness, this is a possible implementation of the watch mutation as a button next to the "Star"/"Unstar" buttons:

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

Fortunately, the Mutation component offers a prop for the optimistic UI strategy called `optimisticResponse`. It returns the same result, which is accessed as argument in the function passed to the `update` prop of the Mutation component. With a watch mutation, only the `viewerSubscription` status changes to subscribed or unsubscribed.  This is an optimistic UI.

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

When you start your application and watch a repository, the "Watch" and "Unwatch" label of the button changes immediately after clicking it. This is because the optimistic response arrives synchronously, while the real response is pending and resolves later.  Since the `__typename ` meta field comes with every Apollo request, include those as well.

An addtional benefit of the optimistic response is that it makes the count of watchers updates optimistic, too. The function used in the `update` prop is called twice now, the first time with the optimistic response, and the second with a response from GitHub's GraphQL API. It makes sense to capture identical information in the optimistic response expected as a mutation result in the function passed to the `update` prop of the Mutation component. For instance, if you don't pass the `id` property in the `optimisticResponse` object, the function passed to the `update` prop throws an error, because it can't retrieve the repository from the cache without an identifier.

At this point, it becomes debatable whether or not the Mutation component becomes too verbose. Using the Render Props pattern co-locates the data layer even more to the view-layer than Higher-Order Components. One could argue it doesn't co-locate the data-layer, but inserts it into the view-layer. When optimizations like the `update` and `optimisticResponse` props are put into the Render Prop Component, it can become to verbose for a scaling application. I advise using techniqes you've learned as well as your own strategies to keep your source concise. I see four different ways to solve this issue:

* Keep the Mutation component inlined (e.g. `optimisticResponse`)
* Extracting everything as variables (e.g. `update`)
* Perform a combination of 1 and 2 whereas only the most verbose parts are extracted
* Use Higher-Order Components instead of Render Props to co-locate data-layer, instead of inserting it in the view-layer

The first three are about **inserting** a data-layer into the view-layer, while the last is about **co-locating** it. Each comes with drawbacks. Following the second way, you might yourself declaring functions instead of objects, or higher-order functions instead of functions because you need to pass arguments to them. With the fourth, you could encounter the same challenge in keeping HOCs concise. There, you could use the other three ways too, but this time in a HOC rather than a Render Prop.

### Exercises:

* Throttle your internet connection (often browsers offers such functionality) and experience how the `optimisticResponse` takes the `update` function into account even though the request is slow
* Try different ways of co-locating or inserting your data-layer with render props and higher-order components
* Implement the optimistic UIs for the star and unstar mutations
* Read more about {{% a_blank "Apollo Optimistic UI in React with GraphQL" "https://www.apollographql.com/docs/react/features/optimistic-ui.html" %}}
* Invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5B6D8BX" %}}

{{% chapter_header "GraphQL Pagination with Apollo Client in React" "react-apollo-client-pagination" %}}

Finally, you are going to implement another advanced feature when using a GraphQL API called **pagination**. In this section, you implement a button that allows successive pages of repositories to be queries, a simple `More` button rendered below the list of repositories in the RepositoryList component. When is clicked, another page of repositories is fetched and merged with the previous list as one state into Apollo Client's cache.

First, extend the query next to your Profile component with the necessary information to allow pagination for the list of repositories:

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

The `endCursor` can be used as `$cursor` variable when fetching the next page of repositories, but the `hasNextPage` can disable the functionality (e.g. not showing the "More" button) to fetch another page. The initial request to fetch the first page of repositories will have a `$cursor` variable of `undefined`, though. GitHub's GraphQL API will handle this case gracefully and return the first items from the list of repositories without considering the `after` argument. Every other request to fetch more items from the list will send a defined `after` argument with the cursor, which is the `endCursor` from the query.

Now we have all information to fetch more pages of repositories from GitHub's GraphQL API. The Query component expose  a function to retrieve them in its child function. Since the button to fetch more repositories fits best in the the RepositoryList component, you can pass this function as prop to it.

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

Next, use the function in the RepositoryList component, and add a button to fetch successive pages of repositories that appears when another page is available.

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

The `fetchMore()` function performs the query from the initial request, and takes a configuration object, which can be used to override variables. With pagination, this means you pass the `endCursor` of the previous query result to use it for the query as `after` argument. Otherwise,  you would perform the initial request again because no variables are specified.

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

If you attempt to click the button, you should get the following error message: *Error: updateQuery option is required.*. The `updateQuery` function is needed to tell Apollo Client how to merge  the previous result with a new one.  Define the function outside of the button, because it would become too verbose otherwise.

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

The function has access to the previous query result, and to the next result that resolves after the button click:

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

In this function, you can merge both results with the JavaScript spread operator. If there is no new result, return the previous result. The important part is merging the `edges` of both repositories objects to have a merge list of items. The `fetchMoreResult` takes precedence over the `previousResult` in the `repositories` object because it contains the new `pageInfo`, with its `endCursor` and `hasNextPage` properties from the last paginated result. You need to have those when clicking the button another time to have the correct cursor as an argument.

To add one more small improvement for user friendliness, add a loading indicator when more pages are fetched. So far, the `loading` boolean in the Query component of the Profile component is only true for the initial request, but not for the following requests. Change this behavior with a prop that is passed to the Query component, and the loading boolean will be updated accordingly.

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

When you run your application again and try the `More` button, you should see odd behavior. Every time you load another page of repositorie, the loading indicator is shown, but the list of repositories disappears entirely, and the merged list is rendered as assumed. Since the `loading` boolean becomes true with the initial and successive requests, the conditional rendering in the Profile component will always show the loading indicator. It returns from the Profile function early, never reaching the code to render the RepositoryList. A quick change from `||` to `&&` of the condition will allow it to show the loading indicator for the initial request only. Every request after that, where the `viewer` object is available, is beyond this condition, so it renders the RepositoryList component.

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

The boolean can be passed down to the RepositoryList component. There it can be used to show a loading indicator instead of the `More` button. Since the boolean never reaches the RepositoryList component for the initial request, you can be sure that the `More` only changes to the loading indicator when there is a successive request pending.

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

The pagination feature is complete now, and you are fetching successive pages of an initial page, then merging the results in Apollo Client's cache. In addition, you show your user feedback about pending requests for either the initial request or further page requests.

Now we'll take it a step further, making the button used to fetch more repositories reusable. Let me explain why this would be a neat abstraction. In an upcoming section, you have another list field that could potentially implement the pagination feature. There, you have to  introduce the `More` button, which could be nearly identical to the `More` button you have in the RepositoryList component. Having only one button in a UI would be a satisfying abstraction, but this abstraction wouldn't work in a real-world coding scenario. You would have to introduce a second list field first, implement the pagination feature for it, and then consifder an abstraction for the `More` button. For the sake of the tutorial, we  implement this abstraction for the pagination feature only in this section, though you should be aware this is a premature optimization put in place for you to learn it.

For another way, imagine you wanted to extract the functionality of the `More` button into a FetchMore component. The most important thing you would need is the `fetchMore()` function from the query result. The `fetchMore()` function takes an object to pass in the necessary `variables` and `updateQuery` information as a configuration. While the former is used to define the next page by its cursor, the latter is used to define how the results should be merged in the local state. These are the three essential parts: fetchMore, variables, and updateQuery. You may also want to shield away the conditional renderings in the FetchMore component, which happens because of the `loading` or `hasNextPage` booleans. Et voilà! That's how you get the interface to your FetchMore abstraction component.

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

Now this FetchMore component can be used by other paginated lists as well, because every part that can be dynamic is passed as props to it. Implementing a FetchMore component in the *src/FetchMore/index.js* is the next step. First, the main part of the component:

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

Here, you can see how the `variables` and `updateQuery` are taken as configuration object for the `fetchMore()` function when it's invoked. The button can be made cleaner using the Button component you defined in a previous section. To add a different style, let's define a specialized ButtonUnobtrusive component next to the Button component in the *src/Button/index.js* file:

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

Now the ButtonUnobtrusive component is used as button instead of the button element in the FetchMore component. In addition, the two booleans `loading` and `hasNextPage` can be used for the conditional rendering, to show the Loading component or nothing, because there is no next page which can be fetched.

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

That's it for the abstraction of the FetchMore button for paginated lists with Apollo Client. Basically, you pass in everything needed by the `fetchMore()` function, including the function itself. You can also pass all booleans used for conditional renderings.  You end up with a reusable FetchMore button that can be used for every paginated list.

### Exercises:

* Read more about {{% a_blank "pagination with Apollo Client in React" "https://www.apollographql.com/docs/react/features/pagination.html" %}}
* Invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5HYMGN7" %}}

{{% chapter_header "GraphQL Caching of Queries with Apollo Client in React" "react-apollo-client-caching" %}}

In this section, you introduce {{% a_blank "React Router" "https://github.com/ReactTraining/react-router" %}} to show two separate pages for your application. At the moment, you are only showing one page with a Profile component that displays all your repositories. We want to add another Organization component that shows repositories by an organization, and there could be a search field as well, to lookup individual organizations with their repositories on that page. Let's do this by introducing React Router to your application. If you haven't used React Router before, make sure to conduct the exercises of this section to learn more about it.

{{< highlight javascript >}}
npm install react-router-dom --save
{{< /highlight >}}

In your *src/constants/routes.js* file, you can specify both routes you want to make accessible by React Router. The `ORGANIZATION` route points to the base URL, while the `PROFILE` route points to a more specific URL.

{{< highlight javascript >}}
export const ORGANIZATION = '/';
export const PROFILE = '/profile';
{{< /highlight >}}

Next, map both routes to their components. The App component is the perfect place to do it because the two routes will exchange the Organization and Profile components based on the URL there.

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

The Organization component wasn't implemented yet, but you can start with a functional stateless component in the *src/Organization/index.js* file, that acts as a placeholder to keep the application working for now.

{{< highlight javascript >}}
import React from 'react';

const Organization = () => <div>Organization</div>;

export default Organization;
{{< /highlight >}}

Since you mapped both routes to their respective components, so you want to implement the the ability to navigate from one route to another. For this, introduce a **Navigation** component in the App component.

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

Next, we'll implement the Navigation component, which is responsible for displaying the two links to navigate between your routes using React Router's Link component.

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

The Profile page works as before, but the Organization page is empty. In the last step, you defined the two routes as constants, used them in the App component to map to their respective components, and introduced Link components to navigate to them in the Navigation component.

Another great feature of the Apollo Client is that it caches query requests. When navigating from the Profile page to the Organization page and back to the Profile page, the results appear immediately because the Apollo Client checks its cache before making the query to the remote GraphQL API.  It's a pretty powerful tool.  

The next part of this section is the Organization component. It is the same as the Profile component, except the query differs because it takes a variable for the organization name to identify the organization's repositories.

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

The Query component in the Organization component takes a query tailored to the organization being the top level field of the query.  It takes a variable to identify the organization, and it uses the newly introduced `skip` prop to skip executing the query if no organization identifier is provided. Later, you will pass an organization identifier from the App component.  It saves lines of code and ensures the returned list of repositories have identical structures to the list of repositories in the Profile component.

Next, extend the query to fit the requirements of the pagination feature. It requires the `cursor` argument to identify the next page of repositories. The `notifyOnNetworkStatusChange` prop is used to update the `loading` boolean for paginated requests as well.

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

Lastly, the render prop child function needs to be implemented. It doesn't differ much from the Query's content in the Profile component. Its purpose is to handle edge cases like loading and 'no data' errors, and eventually, to show a list of repositories. Because the RepositoryList component handles the pagination feature, this improvement is included in the newly implemented Organization component.

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

Provide a `organizationName` as prop when using the Organization in the App component, and leave it inlined for now. Later, you will make it dynamic with a search field.

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

The Organization component should almost work now, as the `More` button is the only incomplete part. The remaining issue is the resolving block for the pagination feature in the `updateQuery` function. It assumes that the nested data structure always starts with a `viewer` object. It does for the Profile page, but not for the Organization page. There the top level object is the `organization` followed by the list of `repositories`. Only the top level object changes from page to page, where the underlying structure stays identical.

 When the top level object changes from page to page, the ideal next step is to tell the RepositoryList component its top level object from the outside. With the Organization component, its the top-level object `organization`, which could be passed as a string and reused as a dynamic key later:

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

With the Profile component, the `viewer` would be the top level object:

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

Now you can handle the new case in the RepositoryList component by passing the entry as {{% a_blank "computed property name" "https://developer.mozilla.org/my/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names" %}} to the `updateQuery` function. Instead of passing the `updateQuery` function directly to the FetchMore component, it can be derived from a higher-order function needed to pass the new `entry` property.

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

The higher-order function next to the RepositoryList component is completed as such:

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

That's how a deeply-nested object is updated with the `fetchMoreResult`, even though the top level component from the query result is not static. The pagination feature should work on both pages now. Take a moment to recap the last implementations again and why these were necessary.

Next, we'll implement the search function I mentioned earlier. The best place to add the search field would be the Navigation component, but only when the Organization page is active. React Router comes with a useful higher-order component to access to the current URL, which can be used to show a search field.

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

The OrganizationSearch component is implemented next to the Navigation component in the next steps. Before that can work, there needs to be some kind of initial state for the OrganizationSearch, as well as a callback function to update the initial state in the Navigation component. To accommodate this, the Navigation component becomes a class component.

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

The OrganizationSearch component implemented in the same file would also work with the following implementation. It handles its own local state, the value that shows up in the input field, but uses it as an initial value from the parent component. It also receives a callback handler, which can be used in the `onSubmit()` class method to propagate the search fields value on a submit interaction up the component tree.

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

The Input component is a slightly styled input element that is defined in *src/Input/index.js* as its own component.

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

While the search field works in the Navigation component, it doesn't help the rest of the application. It only updates the state in the Navigation component when a search request is submitted. However, the value of the search request is needed in the Organization component as a GraphQL variable for the query, so the local state needs to be imported from the Navigation component to the App component. The Navigation component becomes a stateless functional component again.

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

The App component takes over the responsibility from the Navigation component, managing the local state, passing the initial state and a callback function to update the state to the Navigation component, and passing the state itself to the Organization component to perform the query:

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

You have implemented a dynamic GraphQL query with a search field. Once a new `organizationName` is passed to the Organization component from a local state change, the Query component triggers another request due to a re-render. The request is not always made to the remote GraphQL API, though. The Apollo Client cache is used when an organization is searched twice. Also, you have used the well-known technique called lifting state in React to share the state across components.

### Exercises:

* If you are not familiar with React Router, try it out in {{% a_blank "this pragmatic tutorial" "https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/" %}}
* Invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5HFQ3TD" %}}

{{% chapter_header "Implementing the Issues Feature: Setup" "react-apollo-client-feature-setup" %}}

In the previous sections you have implemented most of the common Apollo Client features in your React application. Now you can start implementing extensions for the application on your own. This section showcases how a full-fledged feature can be implemented with Apollo Client in React.

So far, you have dealt with GitHub repositories from organizations and your account. This will take that one step further, fetching GitHub issues that are made available using a list field associated to a repository in a GraphQL query. However, this section doesn't only show you how to render a nested list field in your React application. 

The foundation will be rendering the list of issues. You will implement client-side filtering with plain React to show opened, closed, or no issue. Finally, you will refactor the filtering to a server-side filtering using GraphQL queries. We will only fetch the issues by their state from the server rather than filtering the issue's state on the client-side. Implementing pagination for the issues will be your exercise. 

First, render a new component called 'Issues' in your RepositoryList component. This component takes two props that are used later in a GraphQL query to identify the repository from which you want to fetch the issues.

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

In the *src/Issue/index.js* file, import and export the Issues component. Since the issue feature can be kept in a module on its own, it has this *index.js* file again. That's how you can tell other developers to access only this feature module, using the *index.js* file as its interface. Everything else is kept private.

{{< highlight javascript >}}
import Issues from './IssueList';

export default Issues;
{{< /highlight >}}

Note how the component is named Issues, not IssueList. The naming convention is used to break down the rendering of a list of items: Issues, IssueList and IssueItem. Issues is the container component, where you query the data and filter the issues, and the IssueList and IssueItem are only there as presentational components for rendering. In contrast, the Repository feature module hasn't a Repositories component, because there was no need for it. The list of repositories already came from the Organization and Profile components and the Repository module's components are mainly only there for the rendering.

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

Second, define the query in the *src/Issue/IssueList/index.js* file to retrieve issues of a repository. The repository is identified by its owner and name. Also, add the `state` field as one of the fields for the query result. This is used for client-side filtering, for showing issues with an open or closed state.

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

Finally, implement a basic IssueItem component in the *src/Issue/IssueItem/index.js* file. The snippet belows shows a placeholder where you can implement the Commenting feature, which we'll cover later.

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

Once you start your application again, you should see the initial page of paginated issues rendered below each repository. That's the performance bottleneck mentioned earlier. Worse, the GraphQL requests  are not bundled in one request, as with the issues list field in the Organization and Profile components. In the next steps you are implementing client-side filtering. The default is to show no issues, but it can toggle between states of showing none, open issues, and closed issues using a button, so the issues will not be queried before toggling one of the issue states.

### Exercises:

* Read more about {{% a_blank "the rate limit when using a (or in this case GitHub's) GraphQL API" "https://developer.github.com/v4/guides/resource-limitations/" %}}

{{% chapter_header "Implementing the Issues Feature: Client-Side Filter" "react-apollo-client-feature-client-filter" %}}

In this section, we enhance the Issue feature with client-side filtering. It prevents the initial issue querying because it happens with a button, and it lets the userfilter between closed and open issues. 

First, let's introduce our three states as enumeration next to the Issues component. The `NONE` state is used to show no issues; otherwise, the other states are used to show open or closed issues.

{{< highlight javascript >}}
const ISSUE_STATES = {
  NONE: 'NONE',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
};
{{< /highlight >}}

Second, let's implement a short function that decides whether it is a state to show the issues or not. This function can be defined in the same file.

{{< highlight javascript >}}
const isShow = issueState => issueState !== ISSUE_STATES.NONE;
{{< /highlight >}}

Third, the function can be used for conditional rendering, to either query the issues and show the IssueList, or to do nothing. It's not clear yet where the `issueState` property comes from.

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

The `issueState` property must come from the local state to toggle it via a button in the component, so the Issues component must be refactored to a class component to manage this state.

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

The application should be error-free now, because the initial state is set to `NONE` and the conditional rendering prevents the query and the rendering of a result. However, the client-side filtering is not done yet, as you still need to toggle the `issueState` property with React's local state. The ButtonUnobtrusive component has the appropriate style, so we can reuse it to implement this toggling behavior to transition between the three available states.

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

In the last step, you introduced the button to toggl between the three states.  You used two enumerations, `TRANSITION_LABELS` and `TRANSITION_STATE`, to show an appropriate button label and to define the next state after a state transition. These enumerations can be defined next to the `ISSUE_STATES` enumeration.

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

You have implemented client-side filtering. The button is used to toggle between the three states managed in the local state of the component. Only in filtered and rendered states are the issues are queried. In the next step, the existing client-side filtering should be advanced to a server-side filtering, which means the filtered issues are already requested from the server and not filtered afterward on the client.

### Exercises:

* Install the {{% a_blank "recompose" "https://github.com/acdlite/recompose" %}} library which implements many higher-order components
* Refactor the Issues component from class component to functional stateless component
* Use the `withState` HOC for the Issues component to manage the `issueState`

{{% chapter_header "Implementing the Issues Feature: Server-Side Filter" "react-apollo-client-feature-server-filter" %}}

Before starting with the server-side filtering, let's recap the last exercise in case you had difficulties with it. Basically you can perform the refactoring in three steps. First, install recompose as package for your application on the command line:

{{< highlight javascript >}}
npm install recompose --save
{{< /highlight >}}

Second, import the `withState` higher-order component in the *src/Issue/IssueList/index.js* file and use it to wrap your exported Issues component, where the first argument is the property name in the local state, the second argument is the handler to change the property in the local state, and the third argument is the initial state for that property.

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

Finally, refactor the Issues component from a class component to a functional stateless component. It accesses the `issueState` and `onChangeIssueState()` function in its props now. Remember to change the usage of the `onChangeIssueState` prop to being a function and not a class method anymore.

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

The previous section makes writing stateful components, where the state is much more convenient. Next,  advance the filtering from client-side to server-side.  We use the defined GraphQL query and its arguments to make a more exact query by requesting only open or closed issues. In the *src/Issue/IssueList/index.js* file, extend the query with a variable to specify the issue state:

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

You are only querying open or closed issues. Your query became more exact, and the filtering is no longer handled by the client.

### Exercises:

* Implement the pagination feature for the Issue feature
  * Add the pageInfo information to the query
  * Add the additional cursor variable and argument to the query
  * Add the FetchMore component to the IssueList component

{{% chapter_header "Apollo Client Prefetching in React" "react-apollo-client-prefetching-data" %}}

This section is all about prefetching data, though the user doesn't need it immediately. It is another UX technique that can be deployed to the optimistic UI technique you used earlier. You will implement the prefetching data feature for the list of issues, but feel free to implement it for other data fetching later as your exercise.

When your application renders for the first time, there no issues fetched, so no issues are rendered. The user has to toggle the filter button to fetch open issues, and do it again to fetch closed issues. The third click will hide the list of issues again. The goal of this section is to prefetch the next bulk of issues when the user hovers the filter button. For instance, when the issues are still hidden and the user hovers the filter button, the issues with the open state are prefetched in the background. When the user clicks the button, there is no waiting time, because the issues with the open state are already there. The same scenario applies for the transition from open to closed issues. To prepare this behavior, split out the filter button as its own component in the *src/Issue/IssueList/index.js* file:

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

Now it is easier to focus on the IssueFilter component where most of the logic for data prefetching is implemented. Like before, the prefetching should happen when the user hovers over the button. There needs to be a prop for it, and a callback function which is executed when the user hovers over it. There is such a prop (attribute) for a button (element).  We are dealing with HTML elements here.

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

The `prefetchIssue()` function has to execute the identical GraphQL query executed by the Query component in the Issues component, but this time it is done in an imperative way instead of declarative. Rather than using the Query component for it, use the the Apollo Client instance directly to execute a query. Remember, the Apollo Client instance is  hidden in the component tree, because you used [React's Context API](https://www.robinwieruch.de/react-context-api) to provide the  Apollo Client instance the component tree's top level. The  Query and Mutation components have access to the Apollo Client, even though you have never used it yourself directly. However, this time you use it to query the prefetched data. Use the ApolloConsumer component from the React Apollo package to expose the Apollo Client instance in your component tree. You have used the ApolloProvider somewhere to provide the client instance, and you can use the ApolloConsumer to retrieve it now. In the *src/Issue/IssueList/index.js* file, import the ApolloConsumer component and use it in the IssueFilter component. It gives you access to the Apollo Client instance via its render props child function.

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

Now you have access to the Apollo Client instance to perform queries and mutations, which will enable you to query GitHub's GraphQL API imperatively. The variables needed to perform the prefetching of issues are the same ones used in the Query component. You need to pass those to the IssueFilter component, and then to the `prefetchIssues()` function.

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

Use this information to perform the prefetching data query. The Apollo Client instance exposes a `query()` method for this. Make sure to retrieve the next `issueState`, because when prefetching open issues, the current `issueState` should be `NONE`.

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

This last section is for hands-on experience with the application and implementing features yourself. I encourage you to continue implementing features for the application and improving it. There are a couple of guiding points to help you implementing the Commenting feature. In the end it should be possible to show a list of paginated comments per issue on demand. Finally, a user should be able to leave a comment.

* Introduce components for fetching a list of comments (e.g. Comments), rendering a list of comments (e.g. CommentList), and rendering a single comment (e.g. CommentItem). They can render sample data for now.

* Use the top level comments component (e.g. Comments), which will be your container component that is responsible to query the list of comments, in the *src/Issue/IssueItem/index.js* file. In addition, add a toggle to either show or hide comments. The IssueItem component has to become a class component or needs to make use of the `withState` HOC from the recompose library.

* Use the Query component from React Apollo in your container Comments component to fetch a list of comments. It should be similar to the query that fetches the list of issues. You only need to identify the issue for which the comments should be fetched.

* Handle all edge cases in the Comments to show loading indicator, no data, or error messages.  Render the list of comments in the CommentList component and a single comment in the CommentItem component.

* Implement the pagination feature for comments. Add the necessary fields in the query, the additional props and variables to the Query component, and the reusable FetchMore component. Handle the merging of the state in the `updateQuery` prop.

* Enable prefetching of the comments when hovering the "Show/Hide Comments" button.

* Implement an AddComment component that shows a `textarea` and a `submit` button to enable user comments. Use the `addComment` mutation from GitHub's GraphQL API and the Mutation component from React Apollo to execute the mutation with the submit button.

* Improve the AddComment component with the optimistic UI feature (perhaps read again the {{% a_blank "Apollo documentation about the optimistic UI with a list of items" "https://www.apollographql.com/docs/react/features/optimistic-ui.html" %}}). A comment should show up in the list of comments, even if the request is pending.

 I hope this section, building your own feature in the application with all the learned tools and techniques, matched your skills and challenged you to implement React applications with Apollo and GraphQL. I would recommend working to improve and extend the existing application. If you haven't implemented a GraphQL server yet, find other third-party APIs that offer a GraphQL API and build your own React with Apollo application by consuming it. Keep youtself challenged to grow your skills as a developer.

{{% chapter_header "Appendix: CSS Files and Styles" "appendix-styling" %}}

This section has all the CSS files as well as their content and locations, to give your React with GraphQL and Apollo Client application a nice touch. It even makes it responsive for mobile and tablet devices. These are only recommendations, though; you can experiment with them, or come up with your own styles.

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

You can find the final {{% a_blank "repository on GitHub" "https://github.com/rwieruch/react-graphql-github-apollo" %}} that showcases most of the exercise tasks. The application is not feature-complete and it doesn't cover all edge cases, but it should give insight into using GraphQL with Apollo in React applications. If you want to dive more deeply into different topics like testing and state management with GraphQL on the client-side, you can start here: [A minimal Apollo Client in React Example](https://www.robinwieruch.de/react-apollo-client-example). Try to apply what you've learned in this application (e.g. testing, state management). Otherwise, I encourage you to try to build your own GraphQL client library,which helps you understand more of the GraphQL internals: [How to build a GraphQL client library for React](https://www.robinwieruch.de/react-graphql-client-library). Whichever you decide,  keep tinkering on this application, or start with another GraphQL client application to fortify your skill set.

{{% read_more "GraphQL Server Tutorial with Apollo Server and Express" "https://www.robinwieruch.de/graphql-apollo-server-tutorial" %}}