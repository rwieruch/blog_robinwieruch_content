+++
title = "A Apollo Client Tutorial for Beginners"
description = "This tutorial shows you how to use Apollo Client for GraphQL without any other third-party library. Then you'll learn how to use Apollo Client in React ..."
date = "2018-11-01T02:50:46+02:00"
tags = ["GraphQL", "Apollo", "JavaScript"]
categories = ["GraphQL", "Apollo", "JavaScript"]
keywords = ["apollo client tutorial", "graphql apollo tutorial"]
news_keywords = ["apollo client tutorial", "graphql apollo tutorial"]
hashtag = "#GraphQL"
card = "img/posts/graphql-apollo-client-tutorial/banner_640.jpg"
banner = "img/posts/graphql-apollo-client-tutorial/banner.jpg"
contribute = "graphql-apollo-client-tutorial.md"
headline = "A Apollo Client Tutorial for Beginners"

summary = "This tutorial shows you how to use Apollo Client without any other third-party library. Afterward you will learn how to use Apollo Client in React."
+++

{{% sponsorship %}}

{{% pin_it_image "apollo client tutorial" "img/posts/graphql-apollo-client-tutorial/banner.jpg" "is-src-set" %}}

{{% react-graphql-book %}}

{{% read_before_4 "This tutorial is part 4 of 5 in this series." "Part 1:" "Getting Started with GitHub's GraphQL API" "https://www.robinwieruch.de/getting-started-github-graphql-api" "Part 2:" "A GraphQL Tutorial for Beginners" "https://www.robinwieruch.de/graphql-tutorial/" "Part 3:" "A complete React with GraphQL Tutorial" "https://www.robinwieruch.de/react-with-graphql-tutorial/" "Part 5:" "A complete React with Apollo and GraphQL Tutorial" "https://www.robinwieruch.de/react-graphql-apollo-tutorial" %}}

Apollo is an entire ecosystem built by developers as an infrastructure for GraphQL applications. You can use it on the client-side for a GraphQL client application, or server-side for a GraphQL server application. At the time of writing this tutorial, Apollo offers the richest and most popular ecosystem around GraphQL in JavaScript. There are other libraries for React applications like {{% a_blank "Relay" "http://facebook.github.io/relay" %}} and {{% a_blank "Urql" "https://github.com/FormidableLabs/urql" %}}, but they are just for React applications, and they are not as popular as the Apollo Client. Apollo is framework agnostic, meaning you can use it with libraries other than React. It can be coupled with other libraries/frameworks like Vue and Angular as well, so everything you learn in this tutorial is likely transferable to the others.

{{% package_box "The Road to learn React" "Build a Hacker News App along the way. No setup configuration. No tooling. No Redux. Plain React in 200+ pages of learning material. Pay what you want like <strong>50.000+ readers</strong>." "Get the Book" "img/page/cover.png" "https://roadtoreact.com/" %}}

{{% chapter_header "Table of Contents" "toc" %}}

* [Starting with Apollo Boost on the Command Line](#graphql-apollo-boost-client)
* [Apollo Client and a GraphQL Query](#graphql-apollo-client-query)
* [Apollo Client with Pagination, Variables, Nested Objects and List Fields](#graphql-apollo-client-pagination)
* [Apollo Client and a GraphQL Mutation](#graphql-apollo-client-mutation)

{{% chapter_header "Starting with Apollo Boost on the Command Line" "graphql-apollo-boost-client" %}}

This application starts by introducing Apollo Client with Apollo Boost. The latter allows you to create a zero-configuration Apollo Client to get started the fastest and most convenient way. This section focuses on the Apollo Client instead of React for the sake of learning. To get started, find the {{% a_blank "Node.js boilerplate project and its installation instructions" "https://github.com/rwieruch/node-babel-server" %}}. You will use Apollo Client on the command line in a Node.js environment for now. On top of the minimal Node.js project, you will introduce the Apollo Client with Apollo Boost to experience the GraphQL client without a view-layer library.

In the following, you will consume GitHub's GraphQL API, and then output the queries and mutation results in the command line. To do this, you need a personal access token on GitHub's website, which we covered in a previous chapter. If you haven't done it yet, head to {{% a_blank "GitHub's instructions" "https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/" %}} to generate a personal access token with sufficient permissions.

After you've cloned and installed the Node.js boilerplate project and created your personal access token, install these two packages in the command line from the root folder of the new project:

{{< highlight javascript >}}
npm install apollo-boost graphql --save
{{< /highlight >}}

The {{% a_blank "apollo-boost" "https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost" %}} package gives access to a zero-configuration Apollo Client, and the {{% a_blank "graphql" "https://github.com/graphql/graphql-js" %}} package allows GraphQL queries, mutations, and subscriptions on both the client and server. It is JavaScript's reference implementation of {{% a_blank "Facebook's GraphQL specification" "https://github.com/facebook/graphql" %}}.

In the next steps, you will configure and use the Apollo Client that comes with Apollo Boost in the *src/index.js* file of the project. The project stays small, and you will only implement it in this section, so for now we can have everything in one file for the sake of learning.

In your *src/index.js* file, you can import the Apollo Client from Apollo Boost. After that, you can create a client instance by calling its constructor with a URI. The client needs to know where the data comes from, and where it should be written, so you can pass GitHub's API endpoint to it.

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

You did the same for the previous application, using only axios for plain HTTP requests. You configured axios once with the GraphQL API endpoint to default all requests to this URI, and set up the authorization header. The same happened here, because it's enough to configure your client once for all the following GraphQL requests.

Remember, replace the `YOUR_GITHUB_PERSONAL_ACCESS_TOKEN` string with your personal access token you created on GitHub's website before. However, you may not want to put your access token directly into the source code, so you can create a *.env* file which holds all of your environment variables in your project folder. If you don't want to share the personal token in a public GitHub repository, you can also add the file to your *.gitignore* file. In the command line, you can create this file:

{{< highlight javascript >}}
touch .env
{{< /highlight >}}

Simply define your environment variables in this *.env* file. In your *.env* file, paste the following key value pair whereas the naming for the key is up to you and the value has to be your personal access token from GitHub.

{{< highlight javascript >}}
GITHUB_PERSONAL_ACCESS_TOKEN=xxxXXX
{{< /highlight >}}

In any Node.js application, use the key as environment variable in your source code with the following package: {{% a_blank "dotenv" "https://github.com/motdotla/dotenv" %}}. Follow their instructions to install it for your project. Usually, the process is only a `npm install dotenv`, followed by including `import 'dotenv/config';` at the top of your *index.js* file. Afterward, you can use the personal access token from the *.env* file in your *index.js* file. If you run into an error, just continue reading this section to learn how to fix it.

{{< highlight javascript "hl_lines=3 10" >}}
import ApolloClient from 'apollo-boost';

import 'dotenv/config';

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

Note: There may be additional configuration steps for the previously installed dotenv package. Since the installation instructions may vary with different dotenv versions, check their GitHub website after you have installed it to find the best configurations.

When you start your application with `npm start` without query or mutation and just Apollo Client, you might see the following error: *"Error: fetch is not found globally and no fetcher passed, to fix pass a fetch for your environment ..."*. The error occurs because the {{% a_blank "native fetch API" "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" %}}, which is used to make requests to remote APIs on a promise basis, is only available in the browser. You can't access it in a Node.js application that runs only in the command line. However, the Apollo Client uses the fetch API to perform queries and mutations, usually from a browser environment and not Node.js environment. As you may remember, a query or mutation can be performed with a simple HTTP request, so the Apollo Client uses the native fetch API from a browser to perform these requests. The solution is to use a node package to make fetch available in a Node.js environment. Fortunately, there are packages to address this issue, which can be installed via the command line:

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

* Confirm your [source code for the last section](http://bit.ly/2D2pRSh)
  * Confirm the [changes from the last section](http://bit.ly/2VqyY6i)
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

The requested information from the GraphQL query can be found in the `data` object. There, you will find the `organization` object with its `name` and `url` fields. The Apollo Client automatically requests the GraphQL {{% a_blank "meta field" "http://graphql.org/learn/queries/#meta-fields" %}} `__typename`. The meta field can be used by the Apollo Client as an identifier, to allow caching and optimistic UI updates.

More meta information about the request can be found next to the `data` object. It shows whether the data is still loading, as well as specific details about the {{% a_blank "network status" "https://github.com/apollographql/apollo-client/blob/master/packages/apollo-client/src/core/networkStatus.ts" %}}, and whether the requested data is stale on the server-side.

### Exercises:

* Confirm your [source code for the last section](http://bit.ly/2Da7Em3)
  * Confirm the [changes from the last section](http://bit.ly/2VnYqcV)
* Explore GitHub's GraphQL API
  * Get comfortable navigating through their documentation
  * Add other fields for the `organization` field
* Read more about {{% a_blank "why you should use Apollo Client" "https://www.apollographql.com/docs/react/why-apollo.html" %}}
* Read more about the {{% a_blank "networkStatus property and its possible values" "https://github.com/apollographql/apollo-client/blob/master/packages/apollo-client/src/core/networkStatus.ts" %}}
* Invest 3 minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5MF35H5" %}}

{{% chapter_header "Apollo Client with Pagination, Variables, Nested Objects and List Fields" "graphql-apollo-client-pagination" %}}

You learned about GraphQL pagination and other GraphQL features in previous sections when you built the React with GraphQL application without Apollo. This section will introduce a couple of these features, like GraphQL variables. The `login` argument for the organization field in the previous query can be substituted with such a variable. First, you have to introduce the variable in your GraphQL query:

{{< highlight javascript "hl_lines=2 3" >}}
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

That's how you pass variables to the query using an instance of the Apollo Client in your application. Next, add the nested `repositories` list field to your organization. There, you can request all GitHub repositories in an organization. You may want to rename the query variable as well, but remember to change it when you use the Apollo Client.

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

You have seen a similar query structure in the application we created earlier, so this section has a couple of exercises for you to test the GraphQL skills you've learned. Solving the exercises will fortify your GraphQL skills, so that you can later focus on connecting the Apollo Client to your React application without any obstacles. You will find all the solutions to the exercises in a GitHub repository for this application at the end of the exercises, but you should consider working it out on your own first.

### Exercises:

* Confirm your [source code for the last section](http://bit.ly/2CYRr2V)
  * Confirm the [changes from the last section](http://bit.ly/2Vneiw4)
* Explore GitHub's GraphQL API
  * Extend the `repositories` list field by querying an ordered list of repositories which is ordered by the number of stargazers
* Extract the content of a repository `node` to a GraphQL a reusable fragment
* Read more about {{% a_blank "pagination in GraphQL" "https://graphql.org/learn/pagination" %}}
* Add the pagination feature for list of repositories
  * Add the `pageInfo` field with its `endCursor` and `hasNextPage` fields in the query
  * Add the `after` argument and introduce a new `$cursor` variable for it
  * Perform the first query without a `cursor` argument
  * Perform a second query with the `endCursor` of the previous query result as `cursor` argument
* Take the three-minute {{% a_blank "quiz" "https://www.surveymonkey.com/r/SWL9NJ7" %}}

{{% chapter_header "Apollo Client and a GraphQL Mutation" "graphql-apollo-client-mutation" %}}

Previously, you learned how to query data from GitHub's GraphQL API using the Apollo Client. Once the client is set up with a configuration, you can use its `query()` method to send a GraphQL `query` with optional `variables`. As you have learned, reading data with GraphQL is not everything, because there are mutations for writing data as well. In this section, you are going to define a mutation to star a repository on GitHub. The Apollo Client instance sends the mutation, but first you have to define it.

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

The identifier for the repository is required, or GitHub's GraphQL server wouldn't know which repository you want to star. In the next code snippet, the Apollo Client is used to star a specific GitHub repository with a given identifier. The identifier can be retrieved by adding the `id` field to your repository `node` field in the query. Use the `mutate()` method on the Apollo Client to send the mutation in a `mutation` and `variables` payload. Anything can be done with the result to fit your application, but in this case, the result it is simply logged in the command line.

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

Remember, Apollo Client can be used as a standalone GraphQL client without connecting it to a view-layer like React, though it may seem a bit dull to see the data only on the command line.  We'll see how Apollo connects the data-layer to a React view-layer in the next section.

### Exercises:

* Confirm your [source code for the last section](http://bit.ly/2CYSgZz)
  * Confirm the [changes from the last section](http://bit.ly/2VnNsUB)
* Implement the `removeStar` mutation next to the `addStar` mutation
* Invest three minutes of your time and take the {{% a_blank "quiz" "https://www.surveymonkey.com/r/5XMNFSY" %}}

<hr class="section-divider">

You have seen how Apollo Client can be used standalone in a Node.js project. Before this, you have used React with GraphQL standalone without Apollo. In the next chapter, you will combine both worlds. Be excited for your first full-fledged React client application with Apollo Client and GraphQL.

{{% read_before_4 "This tutorial is part 4 of 5 in this series." "Part 1:" "Getting Started with GitHub's GraphQL API" "https://www.robinwieruch.de/getting-started-github-graphql-api" "Part 2:" "A GraphQL Tutorial for Beginners" "https://www.robinwieruch.de/graphql-tutorial/" "Part 3:" "A complete React with GraphQL Tutorial" "https://www.robinwieruch.de/react-with-graphql-tutorial/" "Part 5:" "A complete React with Apollo and GraphQL Tutorial" "https://www.robinwieruch.de/react-graphql-apollo-tutorial" %}}