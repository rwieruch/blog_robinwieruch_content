+++
title = "A complete React with GraphQL Tutorial"
description = "This React with GraphQL tutorial shows you how to use GraphQL in your React application by consuming GitHub's GraphQL API. You will not use any clever framework such as Apollo or Relay for your query or mutation. Instead this tutorial focuses on plain GraphQL with only HTTP requests in JS ..."
date = "2018-04-09T13:50:46+02:00"
tags = ["React", "GraphQL", "JavaScript"]
categories = ["React", "GraphQL", "JavaScript"]
keywords = ["react graphql tutorial", "react with graphql tutorial", "react graphql book", "react graphql example", "react graphql query", "react graphql mutation", "react graphql client", "react graphql demo"]
news_keywords = ["react graphql tutorial", "react with graphql tutorial", "react graphql book", "react graphql example", "react graphql query", "react graphql mutation", "react graphql client", "react graphql demo"]
hashtag = "#ReactJs #GraphQL"
card = "img/posts/react-with-graphql-tutorial/banner_640.jpg"
banner = "img/posts/react-with-graphql-tutorial/banner.jpg"
contribute = "react-with-graphql-tutorial.md"
headline = "A complete React with GraphQL Tutorial"

summary = "This React with GraphQL Tutorial shows you how to use GraphQL in your React.js application by consuming the GitHub API. You will not use any clever framework such as Apollo for performing a query or mutation, but only plain HTTP requests to learn about GraphQL."
+++

{{% sponsorship %}}

{{% pin_it_image "react graphql tutorial" "img/posts/react-with-graphql-tutorial/banner.jpg" "is-src-set" %}}

{{% react-graphql-book %}}

{{% read_before_2 "This tutorial is part 2 of 3 in this series." "Part 1:" "Getting Started with GitHub's GraphQL API" "https://www.robinwieruch.de/getting-started-github-graphql-api" "Part 3:" "A complete React with Apollo and GraphQL Tutorial" "https://www.robinwieruch.de/react-graphql-apollo-tutorial" %}}

In the  client-sided GraphQL application we'll build together, you will learn how to combine React with GraphQL. There is no clever library like {{% a_blank "Apollo Client" "https://github.com/apollographql/apollo-client" %}} or {{% a_blank "Relay" "https://github.com/facebook/relay" %}} to help yoy get started yet, so instead, you will perform GraphQL queries and mutations with basic HTTP requests. Later I'll introduce Apollo as a GraphQL client for your React.js application. For now, the application we build should should only show how to use GraphQL in React with HTTP. 

Along the way, you will build a simplified {{% a_blank "GitHub client" "https://github.com/rwieruch" %}}, basically an issue tracker for GitHub, that consumes {{% a_blank "GitHub's GraphQL API" "https://developer.github.com/v4/" %}}. You will perform GraphQL queries and mutations to read and write data, and by the end, you should be able to showcase an example that can be used by other developers as a learning tool. The final application you are going to build can be found in this {{% a_blank "repository on GitHub" "https://github.com/rwieruch/react-graphql-github-vanilla" %}}.

{{% package_box "The Road to learn React" "Build a Hacker News App along the way. No setup configuration. No tooling. No Redux. Plain React in 190+ pages of learning material. Pay what you want like <strong>33.000+ readers</strong>." "Get the Book" "img/page/cover.png" "https://www.getrevue.co/profile/rwieruch" %}}

{{% chapter_header "Table of Contents" "toc" %}}

* GrapQL Basics
  * [GraphQL Query](#graphql-query-github-api)
  * [GraphQL Mutation](#graphql-mutation-github-api)
  * [GraphQL Pagination](#graphql-pagination)
* Graph with React and HTTP
  * [Writing your first React GraphQL Client](#react-graphql-client)
  * [GraphQL Query in React](#react-graphql-query)
      * [GraphQL Nested Objects in React](#react-graphql-nested-objects)
      * [GraphQL Variables and Arguments in React](#react-graphql-variables-arguments)
  * [GraphQL Pagination in React](#react-graphql-pagination)
  * [GraphQL Mutation in React](#react-graphql-mutation)
  * [Shortcomings of GraphQL in React without a GraphQL Client library](#react-graphql-library)

{{% chapter_header "GraphQL Query with GitHub's GraphQL API" "graphql-query-github-api" %}}

In this section, you will interact with the GitHub API using queries and mutations without React, so it can use a GraphiQL application or GitHub's GraphQL Explorer to make GraphQL query requests to GitHub's API. Both tools should be authorized to make request using a personal access token. On the left-hand side of your GraphiQL application, you can fill in GraphQL queries and mutations. Add the following query to request data about yourself.

{{< highlight javascript >}}
{
  viewer {
    name
    url
  }
}
{{< /highlight >}}

The `viewer` object can be used to request data about the currently authorized user. Since you are authorized by your personal access token, it should show data about your account. The `viewer` is an **object** in GraphQL terms. Objects hold data about an entity. This data is accessed using a so-called **field** in GraphQL. Fields are used to ask for specific properties in objects. For instance, the `viewer` object exposes a wide range of fields. Two fields for the object--`name` and `url`--were used in the query. In its most basic form, a query is just 9,objects and fields, and objects can also be called fields.

Once you run the query in GraphiQL, you should see output similar to the one below, where your name and url are in the place of mine:

{{< highlight javascript >}}
{
  "data": {
    "viewer": {
      "name": "Robin Wieruch",
      "url": "https://github.com/rwieruch"
    }
  }
}
{{< /highlight >}}

Congratulations, you have performed your first query to access fields from your own user data. Now, let's see how to request data from another source other than yourself, like a public GitHub organization. To specify a GitHub organization, you can pass an **argument** to fields:

{{< highlight javascript >}}
{
  organization(login: "the-road-to-learn-react") {
    name
    url
  }
}
{{< /highlight >}}

When using GitHub's API, an organization is identified with a `login`. If you have used GitHub before, you might know this is a part of the organization URL: `https://github.com/the-road-to-learn-react`. By providing a `login` to identify the organization, you can request data about it. In this example, you have specified two fields to access data about the organization's `name` and `url`. The request should return something similar to the following output:

{{< highlight javascript >}}
{
  "data": {
    "organization": {
      "name": "The Road to learn React",
      "url": "https://github.com/the-road-to-learn-react"
    }
  }
}
{{< /highlight >}}

In the previous query you passed an argument to a field. As you can imagine, you can add arguments to various fields using GraphQL. It grants a great deal of flexibility for structuring queries, because you can make specifications to requests on a field level. Also, arguments can be of different types. With the organization above, you provided an argument with the type `String`, though you can also pass types like enumerations with a fixed set of options, integers, or booleans.

If you ever wanted to request data about two identical objects, you would have to use **aliases** in GraphQL. The following query wouldn't be possible, because GraphQL wouldn't know how to resolve the two organization objects in a result:

{{< highlight javascript >}}
{
  organization(login: "the-road-to-learn-react") {
    name
    url
  }
  organization(login: "facebook") {
    name
    url
  }
}
{{< /highlight >}}

You'd see an error such as `Field 'organization' has an argument conflict`. Using aliases, you can resolve the result into two blocks:

{{< highlight javascript "hl_lines=2 6" >}}
{
  book: organization(login: "the-road-to-learn-react") {
    name
    url
  }
  company: organization(login: "facebook") {
    name
    url
  }
}
{{< /highlight >}}

The result should be similar to the following:

{{< highlight javascript >}}
{
  "data": {
    "book": {
      "name": "The Road to learn React",
      "url": "https://github.com/the-road-to-learn-react"
    },
    "company": {
      "name": "Facebook",
      "url": "https://github.com/facebook"
    }
  }
}
{{< /highlight >}}

Next, imagine you want to request multiple fields for both organizations. Re-typing all the fields for each organization would make the query repetitive and verbose, so we'll use **fragments** to extract the query's reusable parts.  Fragments are especially useful when your query becomes deeply nested and uses lots of shared fields.

{{< highlight javascript "hl_lines=3 6 10 11 12 13" >}}
{
  book: organization(login: "the-road-to-learn-react") {
    ...sharedOrganizationFields
  }
  company: organization(login: "facebook") {
    ...sharedOrganizationFields
  }
}

fragment sharedOrganizationFields on Organization {
  name
  url
}
{{< /highlight >}}

As you can see, you have to specify on which **type** of object the fragment should be used. In this case, it is the type `Organization`, which is a custom type we defined using  GitHub's GraphQL API. This is how you use fragments to extract and reuse parts of your queries. At this point, you might want to open "Docs" on the right side of your GraphiQL application. The documentation gives you access to the GraphQL **schema**. A schema is exposes the GraphQL API  used by your GraphiQL application, which is Github's GraphQL API in this case. It defines the GraphQL **graph** that is accessible via the GraphQL API using queries and mutations. Since it is a graph, objects and fields can be deeply nested in it, which we'll certainly encounter as we move along.

Since we're exploring queries and not mutations at the moment, select "Query" in the "Docs" sidebar. Afterward, traverse the objects and fields of the graph, explore their optional arguments. By clicking them, you can see the accessible fields within those objects in the graph. Some fields are common GraphQL types such as `String`, `Int` and `Boolean`, while some other types are **custom types** like the `Organization` type we used. In addition, you can see whether arguments are required when requesting fields on an object. It can be identified by the exclamation point. For instance, a field with a `String!` argument requires that you pass in a `String` argument whereas a field with a `String` argument doesn't require you to pass it.

In the previous queries, you provided arguments that identified an organization to your fields; but you **inlined these arguments** in your query. Think about a query like a function, where it's important to provide dynamic arguments to it. That's where the **variable** in GraphQL comes in, as it allows arguments to be extracted as variables from queries. Here's how an organization's `login` argument can be extracted to 
a dynamic variable:

{{< highlight javascript "hl_lines=1 2" >}}
query ($organization: String!) {
  organization(login: $organization) {
    name
    url
  }
}
{{< /highlight >}}

It defines the `organization` argument as a variable using the `$` sign. Also, the argument's type is definined as a `String`. Since the argument is required to fulfil the query, the `String` type has an exclamation point. 

In the "Query Variables" panel, the variables would have the following content for providing the `organization` variable as argument for the query:

{{< highlight javascript >}}
{
  "organization": "the-road-to-learn-react"
}
{{< /highlight >}}

Essentially, ariables can be used to create dynamic queries. Following the best practices in GraphQL, we don't need manual string interpolation to structure a dynamic query later on. Instead, we provide a query that uses variables as arguments, which are available when the query is sent as a request to the GraphQL API. You will see both implementations later in your React application. 

Sidenote: You can also define a **default variable** in GraphQL. It has to be a non-required argument, or an error will occur about a **nullable variable** or **non-null variable**. For learning about default variables, we'll make the `organization` argument non-required by omitting the exclamation point. Afterwards, it can be passed as a default variable.

{{< highlight javascript "hl_lines=1 2" >}}
query ($organization: String = "the-road-to-learn-react") {
  organization(login: $organization) {
    name
    url
  }
}
{{< /highlight >}}

Try to execute the previous query with two sets of variables: once with the `organization` variable that's different from the default variable,  and once without defining the `organization` variable.

Now, let's take a step back to examine the structure of the GraphQL query. After you introduced variables, you encountered the `query` statement in your query structure for the first time. Before, you used the **shorthand version of a query** by omitting the `query` statement, but the `query` statement has to be there now that it's using variables. Try the following query without variables, but with the `query` statement, to verify that the long version of a query works.

{{< highlight javascript "hl_lines=1" >}}
query {
  organization(login: "the-road-to-learn-react") {
    name
    url
  }
}
{{< /highlight >}}

While it's not the shorthand version of the query, it still returns the same data as before, which is the desired outcome. The query statement is also called **operation type** in GraphQL lingua. For instance, it can also be a `mutation` statement. In addition to the operation type, you can also define an **operation name**.

{{< highlight javascript "hl_lines=1" >}}
query OrganizationForLearningReact {
  organization(login: "the-road-to-learn-react") {
    name
    url
  }
}
{{< /highlight >}}

Compare it to anonymous and named functions in your code. A **named query** provides a certain level of clarity about what you want to achieve with the query in a declarative way, and it helps with debugging multiple queries, so it should be used when you want to implement an application. Your final query, without showing the variables panel again, could look like the following:

{{< highlight javascript >}}
query OrganizationForLearningReact($organization: String!) {
  organization(login: $organization) {
    name
    url
  }
}
{{< /highlight >}}

So far you've only accessed one object, an organization that teaches React, with a couple of its fields. The GraphQL schema implements a whole graph, so Let's see how to access a **nested object** from within the graph with a query. It's not much different from before:

{{< highlight javascript "hl_lines=3 8 9 10" >}}
query OrganizationForLearningReact(
  $organization: String!,
  $repository: String!
) {
  organization(login: $organization) {
    name
    url
    repository(name: $repository) {
      name
    }
  }
}
{{< /highlight >}}

Provide a second variable to request a specific repository of the organization:

{{< highlight javascript "hl_lines=3" >}}
{
  "organization": "the-road-to-learn-react",
  "repository": "the-road-to-learn-react-chinese"
}
{{< /highlight >}}

The organization that teaches about React has translated versions of its content, and one of its repositories teaches students about React in simplified Chinese. Fields in GraphQL can be nested objects again, and you have queried two associated objects from the graph. The requests are made on a graph that can have a deeply nested structure. While exploring the "Docs" sidebar in GraphiQL before, you might have seen that you can jump from object to object in the graph.

A **directive** can be used to query conditional data from your GraphQL API, so you can apply conditional structures to your shape of query. Directives can also be applied to fields and objects.  Below, we use two types: an **include directive**, which includes the field when the `Boolean` type is set to true; and the skip directive, which excludes it instead. The following query showcases the include directive, but you can substitute it with the skip directive to achieve the opposite effect:

{{< highlight javascript "hl_lines=4 11" >}}
query OrganizationForLearningReact(
  $organization: String!,
  $repository: String!,
  $withFork: Boolean!
) {
  organization(login: $organization) {
    name
    url
    repository(name: $repository) {
      name
      forkCount @include(if: $withFork)
    }
  }
}
{{< /highlight >}}

Now you can decide whether to include the information for the `forCount` field based on provided variables.

{{< highlight javascript "hl_lines=4" >}}
{
  "organization": "the-road-to-learn-react",
  "repository": "the-road-to-learn-react-chinese",
  "withFork": true
}
{{< /highlight >}}

The query in GraphQL gives you all you need to read data from a GraphQL API. The last section may have felt like a whirlwind of information, so these excercises provide additional practice until you feel comfortable.

### Exercises:

* read more about {{% a_blank "the Query in GraphQL" "http://graphql.org/learn/queries" %}}
* explore GitHub's query schema by using the "Docs" sidebar in GraphiQL
* create several queries to request data from GitHub's GraphQL API using the following features:
  * objects and fields
  * nested objects
  * fragments
  * arguments and variables
  * operation names
  * directives

{{% chapter_header "GraphQL Mutation with GitHub's GraphQL API" "graphql-mutation-github-api" %}}

This section introduces the GraphQL mutation. It complements the GraphQL query because it is used for writing data instead of reading it. The mutation shares the same principles as the query: it has fields and objects, arguments and variables, fragments and operation names, as well as directives and nested objects for the returned result. With mutations you can specify data as fields and objects that should be returned after it 'mutates' into something acceptable. Before you start making your first mutation, be aware that you are using live GitHub data, so if you follow a person on GitHub using your experimental mutation, you will follow this person for real. Fortunately this sort of behavior is encouraged on Github.

In this section, you will star a repository on GitHub, the same one you used a query to request before, using a mutation {{% a_blank "from GitHub's API" "https://developer.github.com/v4/mutation/addstar" %}}. You can find the `addStar` mutation in the "Docs" sidebar. The repository is a project for teaching developers about the fundamentals of React.

You can visit {{% a_blank "the repository" "https://github.com/the-road-to-learn-react/the-road-to-learn-react" %}} to see if you've given a star to the repository already. We want an unstarred repository so we can star it using a mutation. Before you can star a repository, you need to know its identifier, which can be retrieved by a query:

{{< highlight javascript "hl_lines=5" >}}
query {
  organization(login: "the-road-to-learn-react") {
    name
    url
    repository(name: "the-road-to-learn-react") {
      id
      name
    }
  }
}
{{< /highlight >}}

In the results for the query in GraphiQL, you should see the identifier for the repository: `"MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw=="`. Before using the identifier as a variable, you can structure your mutation in GraphiQL the following way:

{{< highlight javascript >}}
mutation AddStar($repositoryId: ID!) {
  addStar(input: { starrableId: $repositoryId }) {
    starrable {
      id
      viewerHasStarred
    }
  }
}
{{< /highlight >}}

The mutation's name is given by GitHub's API: `addStar`. You are required to pass it the `starrableId` as `input` to identify the repository; otherwise, the GitHub server won't know which repository to star with the mutation. In addition, the mutation is a named mutation: `AddStar`. It's up to you to give it any name. Last but not least, you can define the return values of the mutation by using objects and fields again. It's identical to a query. Finally, the variables tab provides the variable for the mutation you retrieved with the last query:

{{< highlight javascript >}}
{
  "repositoryId": "MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw=="
}
{{< /highlight >}}

Once you execute the mutation, the result should look like the following. Since you specified the return values of your mutation using the `id` and `viewerHasStarred` fields, you should see them in the result.

{{< highlight javascript >}}
{
  "data": {
    "addStar": {
      "starrable": {
        "id": "MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw==",
        "viewerHasStarred": true
      }
    }
  }
}
{{< /highlight >}}

The repository is starred now. It's visible in the result, but you can verify it in the {{% a_blank "repository on GitHub" "https://github.com/the-road-to-learn-react/the-road-to-learn-react" %}}. Congratulations, you made your first mutation.  

### Exercises:

* Read more about {{% a_blank "the Mutation in GraphQL" "http://graphql.org/learn/queries/#mutations" %}}
* Explore GitHub's mutations by using the "Docs" sidebar in GraphiQL
* Find GitHub's `addStar` mutation in the "Docs" sidebar in GraphiQL
  * Check its possible fields for returning a response
* Create a few other mutations for this or another repository such as:
  * Unstar repository
  * Watch repository
* Create two named mutations side by side in the GraphiQL panel and execute them
* Read more about {{% a_blank "the schema and types" "http://graphql.org/learn/schema" %}}
  * Make yourself a picture of it, but don't worry if you don't understand everything yet

{{% chapter_header "GraphQL Pagination " "graphql-pagination" %}}

This is where we return to the concept of **pagination** mentioned in the first chapter. Imagine you have a list of repositories in your GitHub organization, but you only want to retreive a few of them to display in your UI. It could take ages to fetch a list of repositories from a large organization. In GraphQL, you can request paginated data by providing arguments to a **list field**, such as an argument that says how many items you are expecting from the list.

{{< highlight javascript "hl_lines=5 6 7 8 9 10 11" >}}
query OrganizationForLearningReact {
  organization(login: "the-road-to-learn-react") {
    name
    url
    repositories(first: 2) {
      edges {
        node {
          name
        }
      }
    }
  }
}
{{< /highlight >}}

A`first` argument is passed to the `repositories` list field that specifies how many items from the list are expected in the result. The query shape doesn't need to follow the `edges` and `node` structure, but it's one of a few solutions to define paginated data structures and lists with GraphQL. Actually, it follows the interface description of Facebook's GraphQL client called Relay. GitHub followed this approach and adopted it for their own GraphQL pagination API. Later, you will learn in the exercises about other strategies to implement pagination with GraphQL.

After executing the query, you should see two items from the list in the repositories field. We still need to figure out how to fetch the next two repositories in the list, however. The first result of the query is the first **page** of the paginated list, the second query result should be the second page. In the following, you will see how the query structure for paginated data allows us to retrieve meta information to execute successive queries. For instance, each edge comes with its own cursor field to identify its position in the list.

{{< highlight javascript "hl_lines=10" >}}
query OrganizationForLearningReact {
  organization(login: "the-road-to-learn-react") {
    name
    url
    repositories(first: 2) {
      edges {
        node {
          name
        }
        cursor
      }
    }
  }
}
{{< /highlight >}}

The result should be similar to the following:

{{< highlight javascript >}}
{
  "data": {
    "organization": {
      "name": "The Road to learn React",
      "url": "https://github.com/the-road-to-learn-react",
      "repositories": {
        "edges": [
          {
            "node": {
              "name": "the-road-to-learn-react"
            },
            "cursor": "Y3Vyc29yOnYyOpHOA8awSw=="
          },
          {
            "node": {
              "name": "hackernews-client"
            },
            "cursor": "Y3Vyc29yOnYyOpHOBGhimw=="
          }
        ]
      }
    }
  }
}
{{< /highlight >}}

Now, you can use the cursor of the first repository in the list to execute a second query. By using the `after` argument for the `repositories` list field, you can specify an entry point to retrieve your next page of paginated data. What would the result look like when executing the following query?

{{< highlight javascript "hl_lines=5" >}}
query OrganizationForLearningReact {
  organization(login: "the-road-to-learn-react") {
    name
    url
    repositories(first: 2, after: "Y3Vyc29yOnYyOpHOA8awSw==") {
      edges {
        node {
          name
        }
        cursor
      }
    }
  }
}
{{< /highlight >}}

In the previous result, only the second item is retrieved, as well as a new third item. The first item isn't retrieved because you have used its cursor as `after` argument to retrieve all items after it. Now you can imagine how to make successive queries for paginated lists:

* execute the initial query without a cursor argument
* execute every following query with the cursor of the **last** item's cursor from the previous query result

To keep the query dynamic, we extract its arguments as variables. Afterward, you can use the query with a dynamic `cursor` argument by providing a variable for it. The `after` argument can be `undefined` to retrieve the first page. In conclusion, that would be everything you need to fetch pages of lists from one large list by using a feature called pagination. You need a mandatory argument specifying how many items should be retrieved and an optional argument, in this case the `after` argument, specifying the starting point for the list.

There are also a couple helpful ways to use meta information for your paginated list. Retrieving the `cursor` field for every repository may be verbose when using only the `cursor` of the last repository, so you can remove the `cursor` field for an individual edge, but add the `pageInfo` object with its `endCursor` and `hasNextPage` fields. You can also request the `totalCount` of the list.

{{< highlight javascript "hl_lines=6 12 13 14 15" >}}
query OrganizationForLearningReact {
  organization(login: "the-road-to-learn-react") {
    name
    url
    repositories(first: 2, after: "Y3Vyc29yOnYyOpHOA8awSw==") {
      totalCount
      edges {
        node {
          name
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
{{< /highlight >}}

The `totalCount` field discloses the total number of items in the list, while the `pageInfo` field gives you information about two things:

* **`endCursor`** can be used to retrieve the successive list, which we did with the `cursor` field, exce[t this time we only need one meta field to perform it. The cursor of the last list item is sufficient to request the next page of list.

* **`hasNextPage`** gives you information about whether or not there is a next page to retrieve from the GraphQL API. Sometimes you've already fetched the last page from your server. For applications that use infinite scrolling to load more pages when scrolling lists, you can stop fetching pages when there are no more available.

This meta information completes the pagination implementation. Information is made accessible using the GraphQL API to implement [paginated lists](https://www.robinwieruch.de/react-paginated-list/) and [infinite scroll](https://www.robinwieruch.de/react-infinite-scroll/). Note, this covers GitHub's GraphQL API; a different GraphQL API for pagination might use different naming conventions for the fields, exclude meta information, or employ different mechanisms altogether. 

### Exercises:

* Extract the `login` and the `cursor` from your pagination query as variables.
* Exchange the `first` argument with a `last` argument.
* Search for the `repositories` field in the GraphiQL "Docs" sidebar which says: "A list of repositories that the ... owns."
  * Explore the other arguments that can be passed to this list field.
  * Use the `orderBy` argument to retrieve an ascending or descending list.
* Read more about {{% a_blank "pagination in GraphQL" "http://graphql.org/learn/pagination" %}}.
 * The cursor approach is only one solution which is used by GitHub.
 * Make sure to understand the other solutions, too.

{{% chapter_header "Writing your first React GraphQL Client" "react-graphql-client" %}}

After the last sections, you should be ready to use queries and mutations in your React application. In this section, you will create a React application that consumes the GitHub GraphQL API. The application should show open issues in a GitHub repository, making it a simple issue tracker. Again, if you lack experience with React, see [the Road to learn React](https://www.robinwieruch.de/the-road-to-learn-react) to learn more about it. After that you should be well set up for the following section.

For this application, no elaborate React setup is needed. You will simply use [create-react-app](https://github.com/facebook/create-react-app) to create your React application with zero-configuration. Install it with npm by typing the following instructions on the command line: `npm install -g create-react-app`. If you want to have an elaborated React setup instead, read up this [setup guide for using Webpack with React](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/).

Now, let's create the application with create-react-app. In your general projects folder, type the following instructions:

{{< highlight javascript >}}
create-react-app react-graphql-github-vanilla
cd react-graphql-github-vanilla
{{< /highlight >}}

After your application has been created, you can test it with `npm start` and `npm test`. Again, after you have learned about plain React in *the Road to learn React*, you should be familiar with npm, create-react-app, and React itself.

The following application will focus on the *src/App.js* file. It's up to you to split out components, configuration, or functions to their own folders and files. Let's get started with the App component in the mentioned file. In order to simplify it, you can change it to the following content:

{{< highlight javascript >}}
import React, { Component } from 'react';

const TITLE = 'React GraphQL GitHub Client';

class App extends Component {
  render() {
    return (
      <div>
        <h1>{TITLE}</h1>
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

The component only renders a `title` as a headline. Before implementing any more React components, let's install a library to handle GraphQL requests, executing queries and mutations, using a HTTP POST method. For this, you will use {{% a_blank "axios" "https://github.com/axios/axios" %}}. On the command line, type the following command to install axios in the project folder:

{{< highlight javascript >}}
npm install axios --save
{{< /highlight >}}

Afterward, you can import axios next to your App component and configure it. It's perfect for the following application, because somehow you want to configure it only once with your personal access token and GitHub's GraphQL API.

First, define a base URL for axios when creating a configured instance from it. As mentioned before, you don't need to define GitHub's URL endpoint every time you make request because all queries and mutations point to the same URL endpoint in GraphQL. You get the flexibility from your query and mutation structures using objects and fields instead.

{{< highlight javascript "hl_lines=2 4 5 6" >}}
import React, { Component } from 'react';
import axios from 'axios';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
});

...

export default App;
{{< /highlight >}}

Second, pass the personal access token as header to the configuration. The header is used by each request made with this axios instance.

{{< highlight javascript "hl_lines=5 6 7" >}}
...

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: 'bearer YOUR_GITHUB_PERSONAL_ACCESS_TOKEN',
  },
});

...
{{< /highlight >}}

Replace the `YOUR_GITHUB_PERSONAL_ACCESS_TOKEN` string with your personal access token. To avoid cutting and pasting your access token directly into the source code, you can create a *.env* file to hold all your environment variables on the command line in your project folder. If you don't want to share the personal token in a public GitHub repository, you can add the file to your *.gitignore*.

{{< highlight javascript >}}
touch .env
{{< /highlight >}}

Environment variables are defined in this *.env* file. Be sure to follow the correct naming constraints when using create-react-app, which uses `REACT_APP` as prefix for each key.  In your *.env* file, paste the following key value pair. The key has to have the`REACT_APP` prefix, and the value  has to be your personal access token from GitHub.

{{< highlight javascript >}}
REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN=xxxXXX
{{< /highlight >}}

Now, you can pass the personal access token as environment variable to your axios configuration with string interpolation ({{% a_blank "template literals" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" %}}) to create a configured axios instance.

{{< highlight javascript "hl_lines=6 7 8" >}}
...

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});

...
{{< /highlight >}}

The initial axios setup is essentially the same as we completed using GraphiQL application before to access GitHub's GraphQL API, when you had to set a header with a personal access token and endpoint URL as well.

Next, set up a form for capturing details about a GitHub organization and repository from a user. It should be possible to fill out an input field to request a paginated list of issues for a specific GitHub repository. First, there needs to be a form with an input field to enter the organization and repository. The input field has to update React's local state. Second, the form needs a submit button to request data about the organization and repository that the user provided in the input field, which located in the component's local state. Third, it would be convenient to have an initial local state for the organization and repository to request initial data when the component mounts for the first time.

Let's tackle implementing this scenario in two steps. The render method has to render a form with an input field. The form has to have an `onSubmit` handler, and the input field needs an `onChange` handler. The input field uses the `path` from the local state as a value to be a controlled component. The`path` value in the local state from the `onChange` handler updates in the second step.

{{< highlight javascript >}}
class App extends Component {
  render() {
    return (
      <div>
        <h1>{TITLE}</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">
            Show open issues for https://github.com/
          </label>
          <input
            id="url"
            type="text"
            onChange={this.onChange}
            style={{ width: '300px' }}
          />
          <button type="submit">Search</button>
        </form>

        <hr />

        {/* Here comes the result! */}
      </div>
    );
  }
}
{{< /highlight >}}

Declare the class methods to be used in the render method. The `componentDidMount()` lifecycle method can be used to make an initial request when the App component mounts. There needs to be an initial state for the input field to make an initial request in this lifecycle method.

{{< highlight javascript >}}
class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react',
  };

  componentDidMount() {
    // fetch data
  }

  onChange = event => {
    this.setState({ path: event.target.value });
  };

  onSubmit = event => {
    // fetch data

    event.preventDefault();
  };

  render() {
    ...
  }
}
{{< /highlight >}}

The previous implementation uses a React class component syntax you might have not used before. If you are not familiar with it, check this {{% a_blank "GitHub repository" "https://github.com/the-road-to-learn-react/react-alternative-class-component-syntax" %}} to gain more understanding. Using **class field declarations** lets you omit the constructor statement for initializing the local state, and eliminates the need to bind class methods. Instead, arrow functions will handle all the binding.

Following a best practice in React, make the input field a controlled component. The input element shouldn't be used to handle its internal stateusing native HTML behavior; it should be React.

{{< highlight javascript "hl_lines=5 18" >}}
class App extends Component {
  ...

  render() {
    const { path } = this.state;

    return (
      <div>
        <h1>{TITLE}</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">
            Show open issues for https://github.com/
          </label>
          <input
            id="url"
            type="text"
            value={path}
            onChange={this.onChange}
            style={{ width: '300px' }}
          />
          <button type="submit">Search</button>
        </form>

        <hr />

        {/* Here comes the result! */}
      </div>
    );
  }
}
{{< /highlight >}}

The previous setup for the form--using input field(s), a submit button, `onChange()` and `onSubmit()` class methods--is a common way to implement forms in React. The only addition is the initial data fetching in the `componentDidMount()` lifecycle method to improve user experience by providing an initial state from the backend. It is a useful foundation for [fetching data from a third-party API in React](https://www.robinwieruch.de/react-fetching-data/).

When you start the application on the command line, you should see the initial state for the `path` in the input field. You should be able to change the state by entering something else in the input field. Nothing should happen on `componentDidMount()` and submitting the form.

You might wonder why there is only one input field to grab the information about the organization and repository. When opening up a repository on GitHub, you can see that the organization and repository are encoded in the URL, so it becomes a convenient way to show the same URL pattern for the input field. You can also split the `organization/repository` later at the `/` to get these values and perform the GraphQL query request.

### Exercises:

* If you are not familiar with React, read up *The Road to learn React*

{{% chapter_header "React GraphQL Query" "react-graphql-query" %}}

In this section, you are going to implement your first GraphQL query in React, fetching issues from an organization's repository, though not all at once. Start by fetching only an organization. Let's define the query as a variable above of the App component.

{{< highlight javascript >}}
const GET_ORGANIZATION = `
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
    }
  }
`;
{{< /highlight >}}

Use template literals in JavaScript to define the query as string with multiple lines. It should be identical to the query you used before. Now, you can use axios to make a POST request to GitHub's GraphiQL API. The configuration for axios already points to the correct API endpoint and uses your personal access token. The only thing left is passing the query to it as payload during a POST request. The argument for the endpoint can be an empty string, because you defined the endpoint in the configuration. It will execute the request when the App component mounts in `componentDidMount()`. After the promise from axios has been resolved, only a console log of the result remains.

{{< highlight javascript "hl_lines=25 34 35 36 37 38" >}}
...

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});

const GET_ORGANIZATION = `
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
    }
  }
`;

class App extends Component {
  ...

  componentDidMount() {
    this.onFetchFromGitHub();
  }

  onSubmit = event => {
    // fetch data

    event.preventDefault();
  };

  onFetchFromGitHub = () => {
    axiosGitHubGraphQL
      .post('', { query: GET_ORGANIZATION })
      .then(result => console.log(result));
  };

  ...
}
{{< /highlight >}}

used only axios to perform a HTTP POST request with a GraphQL query as payload. Since axios uses promises, the promise resolves eventually and you should have the result from the GraphQL API in your hands. There is nothing magical about it. It's an implementation in plain JavaScript using axios as HTTP client to perform the GraphQL request with plain HTTP.

Start your application again and verify that you have got the result in your developer console log. If you get a {{% a_blank "401 HTTP status code" "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes" %}}, you didn't set up your personal access token properly. Otherwise, if everything went fine, you should see a similar result in your developer console log.

{{< highlight javascript >}}
{
  "config": ...,
  "data":{
    "data":{
      "organization":{
        "name":"The Road to learn React",
        "url":"https://github.com/the-road-to-learn-react"
      }
    }
  },
  "headers": ...,
  "request": ...,
  "status": ...,
  "statusText": ...
}
{{< /highlight >}}

The top level information is everything axios returns you as meta information for the request. It's all axios, and nothing related to GraphQL yet, which is why most of it is substituted with a placeholder. Axios has a `data` property where that shows the result of your axios request. Then again comes a `data` property which reflects the GraphQL result. At first, the `data` property seems redundant in the first result, but once you examine it you will know that one `data` property comes from axios, while the other comes from the GraphQL data structure. Finally, you find the result of the GraphQL query in the second `data` property. There, you should find the organization with its resolved name and url fields as string properties.

In the next step, you're going to store the result holding the information about the organization in React's local state. You will also store potential errors in the state if any occur.

{{< highlight javascript "hl_lines=4 5 14 15 16 17" >}}
class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react',
    organization: null,
    errors: null,
  };

  ...

  onFetchFromGitHub = () => {
    axiosGitHubGraphQL
      .post('', { query: GET_ORGANIZATION })
      .then(result =>
        this.setState(() => ({
          organization: result.data.data.organization,
          errors: result.data.errors,
        })),
      );
  }

  ...

}
{{< /highlight >}}

In the second step, you can display the information about the organization in your App component's `render()` method:

{{< highlight javascript "hl_lines=5 17" >}}
class App extends Component {
  ...

  render() {
    const { path, organization } = this.state;

    return (
      <div>
        <h1>{TITLE}</h1>

        <form onSubmit={this.onSubmit}>
          ...
        </form>

        <hr />

        <Organization organization={organization} />
      </div>
    );
  }
}
{{< /highlight >}}

Introduce the Organization component as a new functional stateless component to keep the render method of the App component concise. Because this application is going to be a simple GitHub issue tracker, you can already mention it in a short paragraph.

{{< highlight javascript "hl_lines=5 6 7 8 9 10 11 12" >}}
class App extends Component {
  ...
}

const Organization = ({ organization }) => (
  <div>
    <p>
      <strong>Issues from Organization:</strong>
      <a href={organization.url}>{organization.name}</a>
    </p>
  </div>
);
{{< /highlight >}}

In final step, you have to decide what should be rendered when nothing is fetched yet,and what should be rendered when errors occur. To solve these edge cases, you can use {{% a_blank "conditional rendering" "https://www.robinwieruch.de/conditional-rendering-react/" %}} in React. For the first edge case, simply check whether an `organization` is present or not.

{{< highlight javascript "hl_lines=5 13 14 15 16 17" >}}
class App extends Component {
  ...

  render() {
    const { path, organization, errors } = this.state;

    return (
      <div>
        ...

        <hr />

        {organization ? (
          <Organization organization={organization} errors={errors} />
        ) : (
          <p>No information yet ...</p>
        )}
      </div>
    );
  }
}
{{< /highlight >}}

For the second edge case, you have passed the errors to the Organization componentomponent the errors. In case there are errors, it should simply render the error message of each error. Otherwise, it should render the organization. There can be multiple errors regarding different fields and circumstances in GraphQL.

{{< highlight javascript "hl_lines=1 2 3 4 5 6 7 8 9 11 18 19" >}}
const Organization = ({ organization, errors }) => {
  if (errors) {
    return (
      <p>
        <strong>Something went wrong:</strong>
        {errors.map(error => error.message).join(' ')}
      </p>
    );
  }

  return (
    <div>
      <p>
        <strong>Issues from Organization:</strong>
        <a href={organization.url}>{organization.name}</a>
      </p>
    </div>
  );
};
{{< /highlight >}}

You performed your first GraphQL query in a React application, a plain HTTP POST request with a query as payload. You have used a configured axios client to perform request with a HTTP POST method. Afterward, you were able to store the result in React's local state to display it later.

{{% sub_chapter_header "GraphQL Nested Objects in React" "react-graphql-nested-objects" %}}

Next, we'll request a nested object for the organization. Since the application is going to show issues of a repository eventually, you should fetch a repository of an organization as next step. Remember, a query reaches into the GraphQL graph, so we can nest the `repository` field in the `organization` when the schema defined the relationship between these two entities.

{{< highlight javascript "hl_lines=1 6 7 8 9 19" >}}
const GET_REPOSITORY_OF_ORGANIZATION = `
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
      repository(name: "the-road-to-learn-react") {
        name
        url
      }
    }
  }
`;

class App extends Component {
  ...

  onFetchFromGitHub = () => {
    axiosGitHubGraphQL
      .post('', { query: GET_REPOSITORY_OF_ORGANIZATION })
      .then(result =>
          ...
      );
  };

  ...
}
{{< /highlight >}}

In this case, the repository name is identical to the organization. That's okay for now. Later on, you can define dynamically an organization and repository on your own. In the second step, you can extend the Organization component with another Repository component as child component. After all, the result for the query should have a nested repository object in the organization object now.

{{< highlight javascript "hl_lines=12 17 18 19 20 21 22 23 24" >}}
const Organization = ({ organization, errors }) => {
  if (errors) {
    ...
  }

  return (
    <div>
      <p>
        <strong>Issues from Organization:</strong>
        <a href={organization.url}>{organization.name}</a>
      </p>
      <Repository repository={organization.repository} />
    </div>
  );
};

const Repository = ({ repository }) => (
  <div>
    <p>
      <strong>In Repository:</strong>
      <a href={repository.url}>{repository.name}</a>
    </p>
  </div>
);
{{< /highlight >}}

Can you see how the GraphQL query structure aligns perfectly with your component tree? It feels almost natural to continue extending the query structure this way, by nesting other objects into the query, and extending the component tree along the structure of the GraphQL query. Since the application should end up as a issue tracker eventually, let's add a list field of issues, which is associated to the repository, to the query. Don't worry too much about the list field yet. You will learn more about using those in React later in this tutorial.

As a side note: If you want to follow the query structure you are implementing more thoughtfully, you can open up the "Docs" sidebar in GraphiQL again to find out about the types `Organization`, `Repository`, `Issue`. The paginated issues list field can be found there as well. It's always good to have an overview of the graph structure.

Now let's extend the query with the list field for the issues. These issues are a paginated list in the end. As mentioned, you will learn later more about them. For now, you can nest it in the `repository` field with a `last` argument to fetch the last items of the list.

{{< highlight javascript "hl_lines=1 9 10 11 12 13 14 15 16 17" >}}
const GET_ISSUES_OF_REPOSITORY = `
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
      repository(name: "the-road-to-learn-react") {
        name
        url
        issues(last: 5) {
          edges {
            node {
              id
              title
              url
            }
          }
        }
      }
    }
  }
`;
{{< /highlight >}}

You can also request an id of each issue by using the `id` field on the issue's `node` field. That way, you can ensure in React to use a `key` attribute for your list of rendered items in the component. That's a {{% a_blank "best practice in React" "https://reactjs.org/docs/lists-and-keys.html" %}} after all. Last but not least, don't forget to adjust the naming of the query variable when its used to perform the request.

{{< highlight javascript "hl_lines=6" >}}
class App extends Component {
  ...

  onFetchFromGitHub = () => {
    axiosGitHubGraphQL
      .post('', { query: GET_ISSUES_OF_REPOSITORY })
      .then(result =>
          ...
      );
  };

  ...
}
{{< /highlight >}}

The component structure follows the query structure quite naturally again. You can add a list of rendered issues to the Repository component. It is up to you to extract it to its own component as a refactoring to keep your components concise and thus readable and maintainable.

{{< highlight javascript "hl_lines=8 9 10 11 12 13 14" >}}
const Repository = ({ repository }) => (
  <div>
    <p>
      <strong>In Repository:</strong>
      <a href={repository.url}>{repository.name}</a>
    </p>

    <ul>
      {repository.issues.edges.map(issue => (
        <li key={issue.node.id}>
          <a href={issue.node.url}>{issue.node.title}</a>
        </li>
      ))}
    </ul>
  </div>
);
{{< /highlight >}}

That's it for the nested objects, fields and list fields, in a query. Once you run your application again, you should see the last issues of the specified repository rendered in your browser.

{{% sub_chapter_header "GraphQL Variables and Arguments in React" "react-graphql-variables-arguments" %}}

For the next steps, it's time to make use of the form and input elements. They should be used to request the data from GitHub's GraphQL API when a user fills in the content and submits it. Furthermore, the content is also used for the initial request in `componentDidMount()` of the App component. So far, the organization `login` and repository `name` were inlined arguments in the query. Now, you should be able to pass in the `path` from the local state to the query to define dynamically an organization and repository. That's where variables in a GraphQL query came into play, do you remember?

First, let's use a naive approach by performing string interpolation with JavaScript rather than using GraphQL variables. Therefore, you have to refactor the query from a template literal variable to a function that returns a template literal variable. By using the function, you should be able to pass in an organization and repository.

{{< highlight javascript "hl_lines=1 3 6" >}}
const getIssuesOfRepositoryQuery = (organization, repository) => `
  {
    organization(login: "${organization}") {
      name
      url
      repository(name: "${repository}") {
        name
        url
        issues(last: 5) {
          edges {
            node {
              id
              title
              url
            }
          }
        }
      }
    }
  }
`;
{{< /highlight >}}

Next, you can call the `onFetchFromGitHub()` class method in the submit handler but also when the component has been mounted in `componentDidMount()` with the initial local state of the `path` property. These are the two essential places to fetch the data from the GraphQL API: on initial render and on every other manual submission when clicking the button.

{{< highlight javascript "hl_lines=9 17" >}}
class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react',
    organization: null,
    errors: null,
  };

  componentDidMount() {
    this.onFetchFromGitHub(this.state.path);
  }

  onChange = event => {
    this.setState({ path: event.target.value });
  };

  onSubmit = event => {
    this.onFetchFromGitHub(this.state.path);

    event.preventDefault();
  };
}
{{< /highlight >}}

Last but not least, you have to call the function that returns the query instead of passing the query string directly as payload. You can use the {{% a_blank "JavaScript's split method on a string" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split" %}} to retrieve the prefix and suffix of the `/` character from the path variable whereas the prefix is the organization and the suffix is the repository.

{{< highlight javascript "hl_lines=4 5 9" >}}
class App extends Component {
  ...

  onFetchFromGitHub = path => {
    const [organization, repository] = path.split('/');

    axiosGitHubGraphQL
      .post('', {
        query: getIssuesOfRepositoryQuery(organization, repository),
      })
      .then(result =>
        this.setState(() => ({
          organization: result.data.data.organization,
          errors: result.data.errors,
        })),
      );
  };

  ...
}
{{< /highlight >}}

Since the split returns an array of values (and it is assumed that there is only one slash in the path), the array should consist of two values whereas the first value in the array is the organization and the second value the repository. That's why it is convenient to use a JavaScript array destructuring to pull out both values from the array in the same line.

Note at this point that the application is not built for robustness. It's only a learning experience. For instance, no one hinders a user to input the organization and repository with a different pattern than *organization/repository*. There is no validation included at this point. On the other side, it's a great exercise for you on the side to handle those edge cases yourself.

If you want to go one step further, you can extract the first part of the class method to its own function which uses axios to perform the request with the query and returns a promise. The promise can be used to resolve the result into the local state by using `this.setState()` in the `then()` resolver block of the promise.

{{< highlight javascript "hl_lines=1 2 3 4 5 6 7 13" >}}
const getIssuesOfRepository = path => {
  const [organization, repository] = path.split('/');

  return axiosGitHubGraphQL.post('', {
    query: getIssuesOfRepositoryQuery(organization, repository),
  });
};

class App extends Component {
  ...

  onFetchFromGitHub = path => {
    getIssuesOfRepository(path).then(result =>
      this.setState(() => ({
        organization: result.data.data.organization,
        errors: result.data.errors,
      })),
    );
  };

  ...
}
{{< /highlight >}}

You can always split out smaller parts of your applications, be it functions or components, to make them concise, readable, reusable and [testable](https://www.robinwieruch.de/react-testing-tutorial/). For instance, the function which is passed to `this.setState()` can be extracted as higher-order function. It has to be a higher-order function, because somehow you need to pass in the result of the promise but also provide a function for the `this.setState()` method.

{{< highlight javascript "hl_lines=1 2 3 4 10 11" >}}
const resolveIssuesQuery = queryResult => () => ({
  organization: queryResult.data.data.organization,
  errors: queryResult.data.errors,
});

class App extends Component {
  ...

  onFetchFromGitHub = path => {
    getIssuesOfRepository(path).then(queryResult =>
      this.setState(resolveIssuesQuery(queryResult)),
    );
  };

  ...
}
{{< /highlight >}}

Congratulations again, you have made your query flexible by providing dynamic arguments to your query. Try it by starting your application on the command line again and by filling in a different organization with a specific repository (e.g. *facebook/create-react-app*).

It would be totally fine to keep your query this way. However, there was nothing to see about variables yet. You simply passed the arguments to the query by using a function and string interpolation with template literals. Can you use GraphQL variables instead? Let's refactor the query variable again to a template literal which defines inline variables.

{{< highlight javascript "hl_lines=1 2 3 6" >}}
const GET_ISSUES_OF_REPOSITORY = `
  query ($organization: String!, $repository: String!) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        name
        url
        issues(last: 5) {
          edges {
            node {
              id
              title
              url
            }
          }
        }
      }
    }
  }
`;
{{< /highlight >}}

Now you can pass those variables as argument next to the query for the HTTP POST request:

{{< highlight javascript "hl_lines=5 6" >}}
const getIssuesOfRepository = path => {
  const [organization, repository] = path.split('/');

  return axiosGitHubGraphQL.post('', {
    query: GET_ISSUES_OF_REPOSITORY,
    variables: { organization, repository },
  });
};
{{< /highlight >}}

That's it. Finally the query takes variables into account without taking a detour by using a function with string interpolation. Before continuing with the next section, make sure to conduct the exercises. On another note, you haven't used features such as fragments or operation names yet. The application hasn't given any use case for these techniques. But you will use them in another application using Apollo instead of using plain HTTP with axios in the future.

### Exercises:

* explore and add fields to your organization, repository and issues
  * extend your components to display the additional information
* read more about {{% a_blank "serving a GraphQL API over HTTP" "http://graphql.org/learn/serving-over-http/" %}}

{{% chapter_header "React GraphQL Pagination " "react-graphql-pagination" %}}

In the last section, you have already implemented a list field in your GraphQL query. It fitted well into the flow of structuring the query with nested objects and a list along the way with implementing the React components structure where different components were responsible for showing partial results of the query.

In this section, you will explore pagination with list fields with GraphQL in React in more detail. Initially, you will learn more about the arguments of list fields in general. Furthermore, you are going to add one more nested list field to your query. Last but not least, you are going to fetch another page of the paginated `issues` list with your query. Let' start by extending the `issues` list field in your query with one more argument:

{{< highlight javascript "hl_lines=9" >}}
const GET_ISSUES_OF_REPOSITORY = `
  query ($organization: String!, $repository: String!) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        name
        url
        issues(last: 5, states: [OPEN]) {
          edges {
            node {
              id
              title
              url
            }
          }
        }
      }
    }
  }
`;
{{< /highlight >}}

If you read up the arguments for the `issues` list field by using the "Docs" sidebar in GraphiQL, you can explore all the different arguments that you can pass (optionally) to the field. One of those arguments is the `states` arguments where you can define whether you want to fetch open or closed issues. Perhaps, when implementing an issue tracker, you may only want to show open issues in the first place. The previous implementation of the query has shown you how to refine the list field for it. You can explore further arguments for the `issues` list field, but also for other list fields, by using the documentation from Github's API.

Now, let's implement another nested list field which could be used for pagination eventually. Each issue in a repository can have reactions, which are basically emoticons, such as a smiley or a thumbs up. Reactions are again a list of paginated items. First, extend the query with the nested list field for reactions:

{{< highlight javascript "hl_lines=15 16 17 18 19 20 21 22" >}}
const GET_ISSUES_OF_REPOSITORY = `
  query ($organization: String!, $repository: String!) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        name
        url
        issues(last: 5, states: [OPEN]) {
          edges {
            node {
              id
              title
              url
              reactions(last: 3) {
                edges {
                  node {
                    id
                    content
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
{{< /highlight >}}

Second, render those list of reactions again in one of your React components. Again, you can implement dedicated List and Item components, such as ReactionsList and ReactionItem, for it. That's up to you as another exercise to keep the code for this application readable and maintainable for yourself.

{{< highlight javascript "hl_lines=10 11 12 13 14" >}}
const Repository = ({ repository }) => (
  <div>
    ...

    <ul>
      {repository.issues.edges.map(issue => (
        <li key={issue.node.id}>
          <a href={issue.node.url}>{issue.node.title}</a>

          <ul>
            {issue.node.reactions.edges.map(reaction => (
              <li key={reaction.node.id}>{reaction.node.content}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
);
{{< /highlight >}}

That's it. You only had to extend the query and React's component structure in order to render the result. It's a straight forward implementation when you are using a GraphQL API as your data source which has a well defined underlying schema for these field relationships.

Last but not least, you are going to implement real pagination with the `issues` list field. At least, there has to be a button to fetch more issues from the GraphQL API. After all, you want to make the pagination functionality kind of feature complete for your application by fetching more pages of the list eventually. Otherwise, you would always end up with only a couple of issues, or one page of issues, without ever having the ability to show all issues. So what's the best place for fetching more issues? It could be a button in the Repository component below of the rendered list of issues. Clicking the button would result into fetching one more page of issues from the GraphQL API. And clicking it another time should fetch the next page.

{{< highlight javascript "hl_lines=3 12 14" >}}
const Repository = ({
  repository,
  onFetchMoreIssues,
}) => (
  <div>
    ...

    <ul>
      ...
    </ul>

    <hr />

    <button onClick={onFetchMoreIssues}>More</button>
  </div>
);
{{< /highlight >}}

The handler for the button needs to be passed through all the components to reach the Repository component.

{{< highlight javascript "hl_lines=4 16" >}}
const Organization = ({
  organization,
  errors,
  onFetchMoreIssues,
}) => {
  ...

  return (
    <div>
      <p>
        <strong>Issues from Organization:</strong>
        <a href={organization.url}>{organization.name}</a>
      </p>
      <Repository
        repository={organization.repository}
        onFetchMoreIssues={onFetchMoreIssues}
      />
    </div>
  );
};
{{< /highlight >}}

The logic for the function is implemented in the App component as class method. It has to be passed to the Organization component as well.

{{< highlight javascript "hl_lines=4 5 6 19" >}}
class App extends Component {
  ...

  onFetchMoreIssues = () => {
    ...
  };

  render() {
    const { path, organization, errors } = this.state;

    return (
      <div>
        ...

        {organization ? (
          <Organization
            organization={organization}
            errors={errors}
            onFetchMoreIssues={this.onFetchMoreIssues}
          />
        ) : (
          <p>No information yet ...</p>
        )}
      </div>
    );
  }
}
{{< /highlight >}}

Before implementing the logic for it, there needs to be a way to identify the next page for the paginated list. Do you remember when you have used GraphiQL for it? Yes, there was a way to extend the the inner fields of a list field with fields for meta information such as the `pageInfo` or the `totalCount` information. Whereas you don't need to make use of the `totalCount` in the following scenario, you will have to use the `pageInfo` to define the next page when clicking the button. The `totalCount` is only a nice way to see how many items are overall in the list available.

{{< highlight javascript "hl_lines=12 13 14 15 16" >}}
const GET_ISSUES_OF_REPOSITORY = `
  query ($organization: String!, $repository: String!) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        ...
        issues(last: 5, states: [OPEN]) {
          edges {
            ...
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;
{{< /highlight >}}

Now, you can use the information to fetch the next page of issues by providing the cursor as variable to your query. The cursor, or as you will see in the following adjustments for the query, the `after` argument is used to define the starting point to fetch further items from the paginated list.

{{< highlight javascript "hl_lines=5 6 7 9" >}}
class App extends Component {
  ...

  onFetchMoreIssues = () => {
    const {
      endCursor,
    } = this.state.organization.repository.issues.pageInfo;

    this.onFetchFromGitHub(this.state.path, endCursor);
  };

  ...
}
{{< /highlight >}}

As you may have noticed, the second argument wasn't introduced yet to the `onFetchFromGitHub()` class method. Let's see how this turns out.

{{< highlight javascript "hl_lines=1 6 13 14 15" >}}
const getIssuesOfRepository = (path, cursor) => {
  const [organization, repository] = path.split('/');

  return axiosGitHubGraphQL.post('', {
    query: GET_ISSUES_OF_REPOSITORY,
    variables: { organization, repository, cursor },
  });
};

class App extends Component {
  ...

  onFetchFromGitHub = (path, cursor) => {
    getIssuesOfRepository(path, cursor).then(queryResult =>
      this.setState(resolveIssuesQuery(queryResult, cursor)),
    );
  };

  ...
}
{{< /highlight >}}

The argument is simply passed to the `getIssuesOfRepository()` function which makes the GraphQL API request and returns the promise with the query result. Now check the other functions that call the `onFetchFromGitHub()` class method. They don't make use of the second argument and thus the cursor parameter will be `undefined` when it's passed to the GraphQL API call. That's fine, because as you will see next, either the query uses the cursor as argument to fetch the next page of a list or it fetches the initial page of a list by having the cursor not defined at all.

{{< highlight javascript "hl_lines=5 12" >}}
const GET_ISSUES_OF_REPOSITORY = `
  query (
    $organization: String!,
    $repository: String!,
    $cursor: String
  ) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        ...
        issues(first: 5, after: $cursor, states: [OPEN]) {
          edges {
            ...
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;
{{< /highlight >}}

In the previous template string, the `cursor` is passed as variable to the query and used as `after` argument for the list field. The variable is not enforced though, because there is no exclamation mark next to it. Thus, it can be `undefined` which happens for the initial page requests for a paginated list where you only want to fetch the first page.

Furthermore, the argument `last` has been changed to `first` for the `issues` list field. That's because there wouldn't be another page of items when you would already fetch the last items in the initial request. Thus, you have to start with the first items of the list in order to fetch more and more items until you reach the end of the list eventually.

That's it for fetching the next page of a paginated list with GraphQL in React. One important step is missing though. Nobody updates the local state of the App component yet regarding the new page of issues. Thus, there are still only the issues from the initial request. In order to have this functionality, you need to implement it on your own. Somehow you have to merge the old page(s) of issues with the new page of issues in the local state of the App component. Furthermore, you have to keep the organization and repository information in the deeply nested state object intact. So where would you do this maneuver in the first place? The perfect time for doing it is when the promise for the query resolves. You already extracted it as a function outside of the App component. Thus you can use this place to handle the incoming result and return a result with your own structure and information. Keep in mind, that the incoming result can be an initial request when the App component mounts for the first time or a request to fetch more issues when the "More" button for the pagination feature is clicked.

{{< highlight javascript "hl_lines=1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28" >}}
const resolveIssuesQuery = (queryResult, cursor) => state => {
  const { data, errors } = queryResult.data;

  if (!cursor) {
    return {
      organization: data.organization,
      errors,
    };
  }

  const { edges: oldIssues } = state.organization.repository.issues;
  const { edges: newIssues } = data.organization.repository.issues;
  const updatedIssues = [...oldIssues, ...newIssues];

  return {
    organization: {
      ...data.organization,
      repository: {
        ...data.organization.repository,
        issues: {
          ...data.organization.repository.issues,
          edges: updatedIssues,
        },
      },
    },
    errors,
  };
};
{{< /highlight >}}

Basically, the whole function is a complete rewrite because the update mechanism is more complex now. Let's break it down. First, you have passed the `cursor` as argument to the function which will in the next parts of the function help you to determine whether it was an initial query or a query to fetch another page of issues. Second, if the `cursor` happens to be `undefined`, the function can return early and return the state object that encapsulates the plain query result. It's basically the same as before. There is nothing to keep intact in the state object from before, because it is an initial request which happens when the App component mounts or when a user submits another request which should overwrite the old state anyway. Third, if it is a fetch more query and the cursor is there, the old and new issues from the state and the query result get merged in an updated list of issues. In this case, a JavaScript destructuring alias is used to make the naming of both issue lists more obvious. Last but not least, the function returns the updated state object. Since it is a deeply nested object where you have to update multiple levels of the object, you can make use of the JavaScript spread operator syntax to update each level with the new query result. Only the `edges` property deep down in the object should be updated with the merged list of issues in the end.

Last but not least, you can use the `hasNextPage` property from the `pageInfo` that you have requested in your query to either show a "More" button or not showing it. In case there are no more issues in the list the button should disappear.

{{< highlight javascript "hl_lines=7 9" >}}
const Repository = ({ repository, onFetchMoreIssues }) => (
  <div>
    ...

    <hr />

    {repository.issues.pageInfo.hasNextPage && (
      <button onClick={onFetchMoreIssues}>More</button>
    )}
  </div>
);
{{< /highlight >}}

That's it for implementing pagination with GraphQL in React. In the following, you can try out further arguments for your list fields (issues and reactions) on your own. Therefore, check the "Docs" sidebar in GraphiQL to find out about the arguments that you can pass to these list fields. There are arguments that are generic and used for every list (e.g. first, last) but also arguments that are specific for a list (e.g. states). After all, these arguments should again show you how fine-grained you can be on every level of your GraphQL query.

### Exercises:

* explore further arguments, generic or specific for the type, on the `issues` and `reactions` list fields
  * think about ways to beautify the updating mechanism of deeply nested state objects and {{% a_blank "contribute your thoughts to it" "https://github.com/rwieruch/react-graphql-github-apollo/pull/14" %}}

{{% chapter_header "React GraphQL Mutation" "react-graphql-mutation" %}}

You have fetched a whole lot of data using GraphQL in React by now. That's the larger part of using GraphQL. However, there are always two sides to such an interface: read and write. That's were GraphQL mutations complement the interface. In a previous section, you have already learned about GraphQL mutations by using GraphiQL without React. In this section, you are going to implement such a mutation in your React GraphQL application.

You have executed GitHub's `addStar` mutation before in GraphiQL. Let's implement together this mutation in React. Before implementing the mutation, you should query additional information about the repository which is partially required to star the repository in a mutation.

{{< highlight javascript "hl_lines=11 14" >}}
const GET_ISSUES_OF_REPOSITORY = `
  query (
    $organization: String!,
    $repository: String!,
    $cursor: String
  ) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        id
        name
        url
        viewerHasStarred
        issues(first: 5, after: $cursor, states: [OPEN]) {
          ...
        }
      }
    }
  }
`;
{{< /highlight >}}

The `viewerHasStarred` field returns a boolean which indicates whether you as a viewer have starred or not starred the repository. This boolean helps you in the next parts determining whether you want to execute a `addStar` or `removeStar` mutation. For now, you will only implement the `addStar` mutation though. The `removeStar` mutation will be left out as exercise for you. In addition, the `id` field in the query returns the identifier for the repository which you will need to clarify the target repository for your mutation.

So what's the best place to trigger the mutation? It can be a button which either stars or unstars a repository. That's where the `viewerHasStarred` boolean can be used for a conditional rendering to show either a "Star" or "Unstar" button. Since you are going to star a repository, the Repository component might be the best place to trigger the mutation.

{{< highlight javascript "hl_lines=4 9 10 11 12 13 14" >}}
const Repository = ({
  repository,
  onFetchMoreIssues,
  onStarRepository,
}) => (
  <div>
    ...

    <button
      type="button"
      onClick={() => onStarRepository()}
    >
      {repository.viewerHasStarred ? 'Unstar' : 'Star'}
    </button>

    <ul>
      ...
    </ul>
  </div>
);
{{< /highlight >}}

In order to be able to identify the repository to be starred, the mutation needs to know about the `id` of the repository. Furthermore, you can pass the `viewerHasStarred` property as parameter to the handler. That's because you may want to use the parameter to determine whether you want execute the star or unstar mutation later on.

{{< highlight javascript "hl_lines=8" >}}
const Repository = ({ repository, onStarRepository }) => (
  <div>
    ...

    <button
      type="button"
      onClick={() =>
        onStarRepository(repository.id, repository.viewerHasStarred)
      }
    >
      {repository.viewerHasStarred ? 'Unstar' : 'Star'}
    </button>

    ...
  </div>
);
{{< /highlight >}}

The handler should be defined up in the App component. Thus it has to be passed down through each component until it reaches the Repository component. That's why it reaches through the Organization component too.

{{< highlight javascript "hl_lines=5 15" >}}
const Organization = ({
  organization,
  errors,
  onFetchMoreIssues,
  onStarRepository,
}) => {
  ...

  return (
    <div>
      ...
      <Repository
        repository={organization.repository}
        onFetchMoreIssues={onFetchMoreIssues}
        onStarRepository={onStarRepository}
      />
    </div>
  );
};
{{< /highlight >}}

Now, it can be defined in the App component. At this point, note that the `id` and the `viewerHasStarred` information could have been destructured from the App's local state too. That's how you wouldn't need to pass this information in the handler but use it from the local state instead. However, since the Repository component knew about the information already, it is fine to pass the information in the handler. You can argue that it makes the handler more explicit. Furthermore, in case you end up with multiple repositories and thus Repository components eventually, the handler would have to be specific to determine the correct repository anyway.

{{< highlight javascript "hl_lines=4 5 6 20" >}}
class App extends Component {
  ...

  onStarRepository = (repositoryId, viewerHasStarred) => {
    ...
  };

  render() {
    const { path, organization, errors } = this.state;

    return (
      <div>
        ...

        {organization ? (
          <Organization
            organization={organization}
            errors={errors}
            onFetchMoreIssues={this.onFetchMoreIssues}
            onStarRepository={this.onStarRepository}
          />
        ) : (
          <p>No information yet ...</p>
        )}
      </div>
    );
  }
}
{{< /highlight >}}

Now, you can implement the handler. The part for performing the mutation can be already outsourced from the component. Later on, you can use the `viewerHasStarred` boolean in the handler to either perform a `addStar` or `removeStar` mutation. The execution of the mutation looks similar to performing a GraphQL query from before. The API endpoint is not needed, because it was set once in the beginning when you have configured axios. Furthermore, the mutation can be send in the `query` payload (which might be a bit confusing at this point, but shouldn't bother you). The `variables` property is optional as you know, but in this case, you need to pass the identifier for the repository in order to identify it.

{{< highlight javascript "hl_lines=1 2 3 4 5 6 12" >}}
const addStarToRepository = repositoryId => {
  return axiosGitHubGraphQL.post('', {
    query: ADD_STAR,
    variables: { repositoryId },
  });
};

class App extends Component {
  ...

  onStarRepository = (repositoryId, viewerHasStarred) => {
    addStarToRepository(repositoryId);
  };

  ...
}
{{< /highlight >}}

Before you define the `addStar` mutation, check again GitHub's GraphQL API for it. There you will find all information about it: the structure of the mutation, the required arguments and the available fields for the result. For instance, you can include the `viewerHasStarred` field in the returned result to get the updated boolean of the starred or not starred repository.

{{< highlight javascript >}}
const ADD_STAR = `
  mutation ($repositoryId: ID!) {
    addStar(input:{starrableId:$repositoryId}) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;
{{< /highlight >}}

You could already execute the mutation in the browser by clicking the button. If you haven't starred the repository before, it should be starred after clicking the button. You can visit the repository on GitHub to get a visual feedback for it. Otherwise, in your application, you wouldn't see any result reflected yet. The button would still show the "Star" label when the repository wasn't starred before. That's because the `viewerHasStarred` boolean wasn't updated in the local state of the App component after the mutation. That's the next thing you are going to implement. Since axios returns a promise, you can use the `then()` method on the promise to resolve it with your own implementation details.

{{< highlight javascript "hl_lines=1 2 3 9 10 11" >}}
const resolveAddStarMutation = mutationResult => state => {
  ...
};

class App extends Component {
  ...

  onStarRepository = (repositoryId, viewerHasStarred) => {
    addStarToRepository(repositoryId).then(mutationResult =>
      this.setState(resolveAddStarMutation(mutationResult)),
    );
  };

  ...
}
{{< /highlight >}}

When resolving the promise from the mutation, you can find out about the `viewerHasStarred` property in the result. That's because you have defined this property as field in your mutation in the first place. Afterward, you can return a new state object for React's local state, because you have used the function in `this.setState()`. You are using the spread operator syntax here to update the deeply nested data structure. Only the `viewerHasStarred` property changes in the state object because that's the one property which was returned by the resolved promise from the successful request. All other parts of the local state stay intact.

{{< highlight javascript "hl_lines=2 3 4 5 6 7 8 9 10 11 12 13 14 15" >}}
const resolveAddStarMutation = mutationResult => state => {
  const {
    viewerHasStarred,
  } = mutationResult.data.data.addStar.starrable;

  return {
    ...state,
    organization: {
      ...state.organization,
      repository: {
        ...state.organization.repository,
        viewerHasStarred,
      },
    },
  };
};
{{< /highlight >}}

Now try to star the repository again. You may have to go on the Github page for the repository first to unstar it. Nevertheless, the button label should adapt to the updated `viewerHasStarred` property from the local state. Thus the button should show either a "Star" or "Unstar" label.

There is one little extra mile that you can take to improve the star mutation from a user experience perspective. The obvious part would be implementing the `removeStar` mutation. But that's your exercise at the end of this section. Another improvement could be showing the current count of people who have starred the repository and updating this count in the `addStar` (and `removeStar`) mutation. First, you can retrieve the total count of stargazers by adding the following fields to your query:

{{< highlight javascript "hl_lines=14 15 16" >}}
const GET_ISSUES_OF_REPOSITORY = `
  query (
    $organization: String!,
    $repository: String!,
    $cursor: String
  ) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        id
        name
        url
        stargazers {
          totalCount
        }
        viewerHasStarred
        issues(first: 5, after: $cursor, states: [OPEN]) {
          ...
        }
      }
    }
  }
`;
{{< /highlight >}}

Second, you can show the count as a part of your button label:

{{< highlight javascript "hl_lines=15 16" >}}
const Repository = ({
  repository,
  onFetchMoreIssues,
  onStarRepository,
}) => (
  <div>
    ...

    <button
      type="button"
      onClick={() =>
        onStarRepository(repository.id, repository.viewerHasStarred)
      }
    >
      {repository.stargazers.totalCount}
      {repository.viewerHasStarred ? ' Unstar' : ' Star'}
    </button>

    <ul>
      ...
    </ul>
  </div>
);
{{< /highlight >}}

Last but not least, there is one last implementation missing: the count doesn't update when you star (or unstar) a repository. It is the same issue as the missing update for the `viewerHasStarred` property in the local state of the component after the `addStar` mutation succeeded. That's why you can head over to your mutation resolver again to update the total count of stargazers there as well. Even though the stargazer object isn't returned as a result from the mutation, you can simply increment and decrement the total count on your own after a successful mutation. In the case of the `addStar` mutation, you have to increment the counter.

{{< highlight javascript "hl_lines=6 15 16 17" >}}
const resolveAddStarMutation = mutationResult => state => {
  const {
    viewerHasStarred,
  } = mutationResult.data.data.addStar.starrable;

  const { totalCount } = state.organization.repository.stargazers;

  return {
    ...state,
    organization: {
      ...state.organization,
      repository: {
        ...state.organization.repository,
        viewerHasStarred,
        stargazers: {
          totalCount: totalCount + 1,
        },
      },
    },
  };
};
{{< /highlight  >}}

That's it for the mutation. If you check it out in your browser, it should work for you. Congratulations again. You have implemented your first mutation in React with GraphQL.

So far, as mentioned before, you have only implemented the `addStar` mutation. Even though the button already reflects the `viewerHasStarred` boolean by showing a "Star" or "Unstar" label, the button showing "Unstar" should still execute the `addStar` mutation. It's up to you to add the `removeStar` mutation to unstar the repository in the exercises of this section where you will find further instructions.

### Exercises:

* implement the `removeStar` mutation, which is used analog to the `addStar` mutation
  * the `onStarRepository` class method has already access to the `viewerHasStarred` property
  * you can conditionally execute a `addStar` or `removeStar` mutation in the class handler
  * you need to resolve again the new state after removing a star from a repository
  * align your final thoughts with {{% a_blank "this implementation" "https://github.com/rwieruch/react-graphql-github-vanilla" %}}
* optional: implement the `addReaction` mutation for an issue
* optional: implement more fine-grained components (e.g. IssueList, IssueItem, ReactionList, ReactionItem)
  * extract components to their own files and use import and export statements to use them again in the App or other extracted components

{{% chapter_header "Shortcomings of GraphQL in React without a GraphQL Client library" "react-graphql-library" %}}

In the last sections, you have implemented a working yet simply GitHub issue tracker which uses React and GraphQL without a dedicated library for the GraphQL part. You have used axios to communicate with the GraphQL API with HTTP POST methods. Personally I believe it is important to work with raw technologies, in this case GraphQL by using plain HTTP methods, before introducing another abstraction on top of it. Especially when learning about those raw technologies in the first place. The Apollo library offers this abstraction that makes using GraphQL in React much easier. That's why you will use Apollo in a following section of this tutorial. For now, using GraphQL with only HTTP has shown you two important things before introducing Apollo for it:

* how does GraphQL work when using its puristic interface which which is nothing else than HTTP
* what are the shortcomings of using no sophisticated GraphQL Client library in React

I want to address briefly the last fact in the list of important things you should have learned by now. What are the shortcomings of using puristic HTTP methods to read and write data to your GraphQL API in a React application? Before reading the following list, make up your mind on your own. Maybe you can contribute to the list your own thoughts later on. The following list states a couple of these shortcomings:

* **Complementary:** In order to call a GraphQL API from your client application, you have to use HTTP methods. There are several quality libraries out there for HTTP requests whereas one of them is axios. That's why you have used axios for the previous application. However, using axios (or any other HTTP client library) doesn't feel like the best fit to complement a GraphQL centred interface. For instance, GraphQL doesn't use the full potential of HTTP. It's just fine to default to HTTP POST and only one API endpoint. It doesn't use resources and methods on those resources like a RESTful interface would do it. That's why it makes no sense to specify a HTTP method and an API endpoint with every request but rather set it up only once in the beginning. After all, GraphQL comes with its own constraints and you could see it as a layer on top of HTTP whereas it isn't important in the end for a developer to know about the underlying HTTP. Although a good developer should know about it.

* **Declarative:** Every time you make a query or mutation when using plain HTTP requests, you have to make a dedicated call to the API endpoint using a library such as axios. It's an imperative way of reading and writing data to your backend. However, what if there would be a declarative approach making queries and mutations? What if there would be a way to co-locate queries and mutations to your view-layer components? In the previous application, you have experienced how the query shape aligns perfectly with your component hierarchy shape. What if the queries and mutations would align in the same way? That's the power of co-locating your data-layer with your view-layer and you will find more about it when using a dedicated GraphQL client library for it.

* **Feature Support:** When using plain HTTP requests to interact with your GraphQL API, you are not leveraging the full potential of GraphQL. Imagine you would want to split up your query form the previous application into multiple queries that are co-located with their respective components where the data is used. That's when GraphQL would be used in a declarative way in your view-layer. But when you have no library support, you would have to deal with multiple queries on your own, keeping track of all of them, and trying to merge the results in your state-layer eventually. If you consider the previous application, splitting up the query into multiple queries would add a whole layer of complexity to the application. So what if there would be an entity which deals with aggregating the queries for you? That's where a GraphQL client library comes into play.

* **Data Handling:** The naive way for data handling when using puristic HTTP requests is a subcategory of the missing feature support for GraphQL when not using a dedicated library for it. There is no one helping you out with normalizing your data and caching it for identical requests. Updating your state-layer when resolving fetched data from the data-layer becomes a nightmare when not normalizing the data in the first place. You have to deal with deeply nested state objects which lead to the verbose usage of the JavaScript spread operator. When you check the implementation of the application in the GitHub repository again, you will see that the updates of React's local state after a mutation and query are not nice to look at. A normalizing library such as {{% a_blank "normalizr" "https://github.com/paularmstrong/normalizr" %}} could help you to improve the structure of your local state. You learn more about normalizing your state in the book {{% a_blank "Taming the State in React" "https://roadtoreact.com" %}}. In addition to the missing caching and normalizing support, you are missing out on functionalities for pagination and optimistic updates when not using a library for it. These are all the features for data handling that a dedicated GraphQL library would give you.

* **GraphQL Subscriptions:** While there is the concept of a query and mutation to read and write data with GraphQL, there is a third concept of a GraphQL **subscription** for receiving real-time data in a client-sided application. When you would have to rely on a plain HTTP requests as before, you would have to introduce {{% a_blank "WebSockets" "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" %}} next to it. It enables you to introduce a long-lived connection for receiving results over time. In conclusion, introducing GraphQL subscriptions would add another tool to your application. However, if you would introduce a GraphQL library for it on the client-side, the library would probably implement GraphQL subscriptions for you.

As I mentioned, the list may be not complete, but I am keen to hear your thoughts about it. In the following, I am looking forward to introduce Apollo as a GraphQL client library to your React application. It will help you out with all the mentioned shortcomings. Although, as mentioned before, I strongly believe that it was good for the learning process to learn about GraphQL in React without a GraphQL library in the beginning.

<hr class="section-divider">

You can find the final {{% a_blank "repository on GitHub" "https://github.com/rwieruch/react-graphql-github-vanilla" %}}. The repository showcases most of the exercise tasks too. The application is not feature complete, doesn't cover all edge cases and isn't styled. However, I hope the walkthrough of implementing the application with plain GraphQL in React has helped you to understand using GraphQL only on the client-side in React by using only HTTP request. I believe it's important to make this step before using a sophisticated GraphQL client library such as Apollo or Relay.

The previous sections should have shown you how to implement a React application with GraphQL and HTTP requests without using a library such as Apollo for it. In the following, you will continue learning about using GraphQL in React by using Apollo instead of basic HTTP requests. The Apollo GraphQL Client makes caching your data, normalizing it, performing optimistic updates and pagination an effortless endeavor. That's by far not all to it. So stay tuned for the next applications you are are going to build with GraphQL.

{{% read_before_2 "This tutorial is part 2 of 3 in this series." "Part 1:" "Getting Started with GitHub's GraphQL API" "https://www.robinwieruch.de/getting-started-github-graphql-api" "Part 3:" "A complete React with Apollo and GraphQL Tutorial" "https://www.robinwieruch.de/react-graphql-apollo-tutorial" %}}
