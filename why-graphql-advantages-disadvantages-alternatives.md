+++
title = "Why GraphQL: Advantages, Disadvantages & Alternatives"
description = "An overview about the advantages and disadvantages of using GraphQL instead of REST for JavaScript applications. It answers the question: 'What is GraphQL' and 'Why you should use GraphQL' for your next JavaScript application ..."
date = "2018-07-03T13:50:46+02:00"
tags = ["React", "GraphQL", "JavaScript"]
categories = ["React", "GraphQL", "JavaScript"]
keywords = ["graphql alternatives", "graphql advantages", "graphql disadvantages", "why graphql", "graphql benefits", "graphql rest"]
news_keywords = ["graphql alternatives", "graphql advantages", "graphql disadvantages", "why graphql", "graphql benefits", "graphql rest"]
hashtag = "#ReactJs #GraphQL"
card = "img/posts/why-graphql-advantages-disadvantages-alternatives/banner_640.jpg"
banner = "img/posts/why-graphql-advantages-disadvantages-alternatives/banner.jpg"
contribute = "why-graphql-advantages-disadvantages-alternatives.md"
headline = "Why GraphQL: Advantages, Disadvantages & Alternatives"

summary = "Overview about the advantages and disadvantages of using GraphQL instead of REST for JavaScript applications. Mainly it answers the question: 'What is GraphQL' and 'Why you should use GraphQL' for your next JavaScript application."
+++

{{% sponsorship %}}

{{% pin_it_image "graphql advantages disadvantages" "img/posts/why-graphql-advantages-disadvantages-alternatives/banner.jpg" "is-src-set" %}}

{{% react-graphql-book %}}

{{% read_before "This tutorial is part 1 of 2 in this series." "Part 2:" "Why Apollo: Advantages, Disadvantages & Alternatives" "https://www.robinwieruch.de/why-apollo-advantages-disadvantages-alternatives" %}}

When it comes to network requests between client and server applications, {{% a_blank "REST" "https://en.wikipedia.org/wiki/Representational_state_transfer" %}} is one of the most popular choices to connect both worlds. In REST everything evolves around the idea of having resources which are accessible by URLs. You can read a resource with a HTTP GET request, create a resource with a HTTP POST request, and update and delete it with HTTP PUT and DELETE requests. These are called CRUD (Create, Read, Update, Delete) operations. The resource can be anything from authors, articles or users. The format for transferring data is not opinionated when using REST, but most often people will use JSON for it. In the end, REST enables applications to communicate with each other by using plain HTTP with URLs and HTTP methods.

{{< highlight json >}}
// a RESTful request
GET https://api.domain.com/authors/7

// the response in JSON
{
  "id": "7",
  "name": "Robin Wieruch",
  "avatarUrl": "https://domain.com/authors/7",
  "firstName": "Robin",
  "lastName": "Wieruch"
}
{{< /highlight >}}

Even though REST was the status quo for a long time, another technology developed by Facebook emerged in the recent years: it's called GraphQL. The following sections give you an introduction to GraphQL, its advantages and disadvantages, and whether there are alternatives for it.

{{% chapter_header "What is GraphQL?" "what-is-graphql" %}}

Before we dive into the advantages and disadvantages of GraphQL, let's answer the following question first: What is GraphQL? GraphQL is a open source **query language** created by Facebook in 2012. Before it got open sourced, Facebook already used it internally for their mobile applications. Why mobile applications? GraphQL was developed as alternative to the common REST architecture. It enables a client to only request the desired data - not more or less. You are in charge as a client. When having a RESTful architecture, this becomes quite difficult, because the backend defines what is available with each resource on each URL. It is not the frontend which asks for a selection of data. So the frontend always has to request all the information in a resource even though it only needs a part of it. This problem is called overfetching. In a worst case scenario, a client application has to read not only one but multiple resources which are accessed with multiple network requests. This would not only lead to overfetching, but also to waterfall network requests. However, by having a query language such as GraphQL which is used on the server-side but also on the client-side, the client decides what data it needs by making only one request to the server. In the case of Facebook's development of mobile applications with GraphQL, it reduced the network usage dramatically, because with GraphQL one had to make only one request and the amount of data transferred decreased.

Facebook open sourced the GraphQL specification and its reference implementation in JavaScript. Since then multiple other major programming languages implemented the specification. In addition, the ecosystem around GraphQL is not only growing horizontally by offering multiple programming languages, but also vertically by having libraries on top of GraphQL (e.g. Apollo, Relay).

A GraphQL operation is either a query (read), mutation (write) or subscription (continuous read). Each of those operations is only a string which needs to be constructed accordingly to the GraphQL query language specification. Once such a GraphQL operation reaches the backend application coming from a frontend application, it can be interpreted against the entire GraphQL schema on the backend and resolved with data for the frontend application. GraphQL is not opinionated about the network layer (which often happens to be HTTP) and not opinionated about the payload format (which often happens to be JSON). It isn't opinionated about the application architecture at all (which often happens to be a frontend/backend architecture). It is only a query language.

{{< highlight javascript >}}
// a GraphQL query
author(id: "7") {
  id
  name
  avatarUrl
  articles(limit: 2) {
    name
    urlSlug
  }
}

// a GraphQL query result
{
  "data": {
    "author": {
      "id": "7",
      "name": "Robin Wieruch",
      "avatarUrl": "https://domain.com/authors/7",
      "articles": [
        {
          "name": "The Road to learn React",
          "urlSlug": "the-road-to-learn-react"
        },
        {
          "name": "React Testing Tutorial",
          "urlSlug": "react-testing-tutorial"
        }
      ]
    }
  }
}
{{< /highlight >}}

As you can see, one query already requests multiple resources (author, article), which are called fields in GraphQL, and only a particular set of nested fields for these fields (name, urlSlug for article) even though the entity itself may offer more data in its GraphQL schema (e.g. description, releaseData for article). Whereas a RESTful architecture would have needed at least two waterfall requests to retrieve the author entity and its articles, the GraphQL query made it happen in one query. In addition, the query only selected the necessary fields and not the whole entity.

That's GraphQL in a nutshell. Whereas the server application offers a GraphQL schema where it defines all available data with its hierarchy and types, a client application only queries the required data.

{{% chapter_header "GraphQL Advantages" "graphql-advantages" %}}

The following list shows you the major advantages of using GraphQL for your application.

{{% sub_chapter_header "Declarative Data Fetching" "graphql-declarative-data-fetching" %}}

As you have witnessed before, GraphQL embraces declarative data fetching with its queries. The client selects data, its entities with fields across relationships, in only one query request. The client decides which fields it needs for its UI. Often you can almost speak of a UI driven data fetching. For instance, that's how Airbnb is using GraphQL. A search page at Airbnb often has a search result for homes, experiences and other domain specific things. In order to retrieve all data in one request, a GraphQL query which selects only the parts of the data for the UI makes perfect sense. After all, GraphQL offers a great separation of concerns: a client knows about the data requirements, the server knows about the data structure and how to resolve the data from a data source (e.g. database, microservice, third-party API).

{{% sub_chapter_header "No Overfetching with GraphQL" "graphql-overfetching" %}}

There exists no overfetching when using GraphQL. Whereas a mobile client would most likely overfetch data when using the identical API as the web client with a RESTful API, the mobile client can choose a different set of fields in contrast to the web client when using the same GraphQL API. Thus a mobile client can fetch less information, because it may not be needed on a small screen compared to the larger screen for the web application. GraphQL minimizes the amount of data which is transferred across the wire by being selective about the data depending on the client application's needs in the first place.

{{% sub_chapter_header "GraphQL for React, Angular, Node and Co." "graphql-everywhere" %}}

GraphQL is not only exciting for React developers. Even though Facebook showcased GraphQL on a client-side application with React, it is decoupled from any frontend or backend solution. The reference implementation of GraphQL is written in JavaScript and thus the usage of GraphQL in Angular, Vue, Express, Hapi, Koa and other JavaScript libraries on the client-side and server-side is possible. And that's only the JavaScript ecosystem. GraphQL mimics one aspect that made REST popular: It is a programming language agnostic interface (query language) between two entities (e.g. a client and a server). Thus you can use an implementation of the specification in any programming language.

{{% sub_chapter_header "Who is using GraphQL?" "graphql-who-is-using" %}}

Facebook has been using GraphQL since 2012, so even before it got open sourced. It is the driving company behind the GraphQL specification and reference implementation in JavaScript. So when using GraphQL, you are already staying on their shoulders. However, other well known companies are using it as well for their applications. They are invested in the GraphQL ecosystem, because there is a huge demand for modern applications. Thus, it is not only Facebook's shoulders you are staying on, but also on the shoulders of these companies:

* GitHub {{% a_blank "[1]" "https://githubengineering.com/the-github-graphql-api/" %}} {{% a_blank "[2]" "https://youtu.be/lj41qhtkggU" %}}
* Shopify {{% a_blank "[1]" "https://shopifyengineering.myshopify.com/blogs/engineering/solving-the-n-1-problem-for-graphql-through-batching" %}} {{% a_blank "[2]" "https://youtu.be/2It9NofBWYg" %}}
* {{% a_blank "Twitter" "https://www.youtube.com/watch?v=Baw05hrOUNM" %}}
* {{% a_blank "Coursera" "https://youtu.be/F329W0PR6ds" %}}
* {{% a_blank "Yelp" "https://youtu.be/bqcRQYTNCOA" %}}
* {{% a_blank "Wordpress" "https://youtu.be/v3xY-rCsUYM" %}}
* {{% a_blank "The New York Times" "https://youtu.be/W-u-vZUSnIk" %}}
* {{% a_blank "Samsara" "https://youtu.be/g-asVW9JFPw" %}}
* and {{% a_blank "more" "https://graphql.org/users/" %}} ...

When GraphQL was developed and open sourced by Facebook, other companies ran in similar issues for their mobile applications. That's how Netflix came up with {{% a_blank "Falcor" "https://github.com/Netflix/falcor" %}} which can be seen as alternative to GraphQL. It only shows again that modern applications demanded such solutions such as GraphQL and Falcor.

{{% sub_chapter_header "Single Source of Truth" "graphql-single-source-of-truth" %}}

In GraphQL applications there exists a single source of truth: the GraphQL schema. It provides a central place where all available data is described. Whereas the GraphQL schema is usually defined on a server-side, clients can read (query) and write (mutation) data based on the schema. So basically the server-side application offers all the information about what's available on its side and the client-side application asks for only a part of it by performing GraphQL queries or alters a part of it by using GraphQL mutations.

{{% sub_chapter_header "GraphQL embraces modern Trends" "graphql-trends" %}}

GraphQL embraces modern trends on how applications are built nowadays. You may only have one backend application, but often it happens that multiple clients (web, mobile, smartwatches, ...) depend on the data of the one backend application. Thus GraphQL can be used to connect both worlds but also to fulfil the requirements (e.g. network usage requirements, nested relationships of data, fetching only the required data) of each client application without having a dedicated API for each client.

On the other side, on the server side, there might not only be one backend but a group of microservices which offer their specific functionalities. That's the perfect usage for GraphQL schema stitching which enables you to aggregate all functionalities into one GraphQL schema.

{{% sub_chapter_header "GraphQL Schema Stitching" "graphql-schema-stitching" %}}

Schema stitching makes it possible to create one schema out of multiple schemas. When would you run into such a case? Think about a microservices architecture for your backend. Each microservice handles the business logic and data for a specific domain. Therefore, each microservice can define its own GraphQL schema. Afterward, you would use schema stitching for weaving all schemas into one schema which is accessed by a client-application. In the end, each microservice can have its own GraphQL endpoint whereas one GraphQL API gateway consolidates all schemas into one global schema to make it available to the client applications.

{{% sub_chapter_header "GraphQL Introspection" "graphql-introspection" %}}

A GraphQL introspection makes it possible to retrieve the GraphQL schema from a GraphQL API. Since the schema has all the information of what's available as data via the GraphQL API, it can be perfectly used for autogenerating a API documentation. But it is not only for documenting the API, it can also be used for mocking the GraphQL schema on a client-side application for testing purposes or for retrieving the schemas from multiple microservices for schema stitching.

{{% sub_chapter_header "Strongly Typed GraphQL" "graphql-strongly-typed" %}}

GraphQL is a strongly typed query language, because it is written in the expressive GraphQL Schema Definition Language (SDL). By having it strongly typed, it comes with the same benefits as a strongly typed programming language: It is less error prone, can be validated during compile-time and can be used for supportive IDE/editor integrations such as auto-completion and validation.

{{% sub_chapter_header "GraphQL Versioning" "graphql-versioning" %}}

In GraphQL there are no API versions as there used to be in REST. In REST it is normal to offer multiple versions of an API (e.g. api.domain.com/v1/, api.domain.com/v2/), because the resources or the structure of the resources may change over time. In GraphQL it is possible to deprecate the API on a field level. Thus a client receives a deprecation warning when querying a deprecated field. After a while, the deprecated field may be removed from the schema when not many clients are using it anymore. This makes it possible to evolve a GraphQL API over time without the need for a versioning.

{{% sub_chapter_header "A growing GraphQL Ecosystem" "graphql-ecosystem" %}}

The GraphQL ecosystem is growing. There are not only integrations for the strongly typed nature of GraphQL for editors and IDEs, but also standalone applications for GraphQL itself. What you may remember as {{% a_blank "Postman" "https://www.getpostman.com" %}} when dealing with REST APIs, is now {{% a_blank "GraphiQL" "https://github.com/graphql/graphiql" %}} or {{% a_blank "GraphQL Playground" "https://github.com/prismagraphql/graphql-playground" %}} for your GraphQL APIs. You can also find various libraries such as {{% a_blank "Gatsby.js" "https://www.gatsbyjs.org/" %}}, a static website generator for React, using GraphQL. For instance, with Gatsby.js you can build a blog engine by providing your blog content on build time with a GraphQL API. Hence you also have headless content management systems (CMS) (e.g. {{% a_blank "GraphCMS" "https://graphcms.com" %}}) for providing (blog) content with a GraphQL API. But not only the technical parts are evolving in this space. There are conferences, meetups and communities popping up for GraphQL and you can find newsletters and podcasts about it as well.

{{% sub_chapter_header "Should I go all in GraphQL?" "graphql-adoption" %}}

Adopting GraphQL for your existing tech stack is not an "all-in" process. If you migrate from a monolithic backend application to a microservice architecture, it is the perfect time to offer a GraphQL API for the newly introduced microservices. Thus when having multiple microservices, you and your team can introduce a GraphQL gateway with schema stitching to consolidate one global schema. But the API gateway cannot only be used for the microservices, but also for the monolithic REST application. That's how you can bundle all your APIs in one gateway and migrate to GraphQL step by step.

{{% chapter_header "GraphQL Disadvantages" "graphql-disadvantages" %}}

The following topics show you some of the disadvantages of using GraphQL.

{{% sub_chapter_header "GraphQL Query Complexity" "graphql-query-complexity" %}}

People often mistake GraphQL for replacing a database on the server-side. That's not the case. GraphQL is only a query language. On the server side, once a query needs to be resolved with data, there usually is a GraphQL agnostic implementation to perform the database access. GraphQL isn't opinionated about that. Furthermore, GraphQL doesn't take away any performance bottlenecks when you have to access multiple fields (authors, articles, comments) in one query. Whether the request was made in a RESTful architecture or GraphQL, the various resources/fields still have to be retrieved from a data source.

Hence you run into a problem when a client requests too many nested fields at once. Often frontend developer are not well aware of the different database accesses a server-side application has to perform when accessing too much data. That's when there needs to be a mechanism (e.g. maximum query depths, query complexity weighting, avoiding recursion, persistent queries) for stopping too expensive queries from the client-side.

{{% sub_chapter_header "GraphQL Rate Limiting" "graphql-rate-limiting" %}}

Another problem is rate limiting. Whereas in REST it is simpler to say "we allow only so many resource requests in one day", it becomes difficult to make such a statement for individual GraphQL operations, because it can be everything between a cheap or expensive operation. That's where companies with {{% a_blank "public GraphQL APIs come up with their specific rate limiting calculations" "https://developer.github.com/v4/guides/resource-limitations/" %}} which often boil down to the previously mentioned maximum query depths and query complexity weighting.

{{% sub_chapter_header "GraphQL Caching" "graphql-caching" %}}

Implementing a simplified cache when having GraphQL becomes far more complex then implementing it in REST. In REST you access resources with URLs and thus you would be able to cache on a resource level, because you have the resource URL as identifier. In GraphQL this becomes complex, because each query can be different even though it operates on the same entity. In one query you may only request the name of an author but in the next query you want to know the email address too. That's where you need to have a more fine-grained cache in place on a field level which isn't the simplest thing to implement. However, most of the libraries build on top of GraphQL are offering these caching mechanisms out of the box for you.

{{% chapter_header "Why not REST?" "why-not-rest" %}}

GraphQL is an alternative to the commonly used RESTful architecture that connects client and server applications. Many times in the previous sections you have heard about REST, so what are the clear benefits of using GraphQL over REST?

Since REST comes with an URL for each resource, you often end up with inefficient waterfall requests. For instance, first you fetch an author entity identified by an id, and then you fetch all the articles by this author identified by the author's id. In GraphQL this could be only one request which is way more efficient. Furthermore, if you only want to fetch the author's articles without the whole author entity itself, GraphQL enables you to select only the parts of the information that you need. In REST you would fetch the whole author entity even though you are only interested in the articles written by the author. The problem is called overfetching when using REST and not GraphQL.

Nowadays client applications are not made for RESTful server applications. For instance, take the search result on Airbnb's platform. It shows homes, experiences and other related things for you. Homes and experiences would already be their own RESTful resources and thus in REST you would have to execute multiple network requests. When having a GraphQL API in place instead, you can request all the entities in one GraphQL query which can request entities side by side (e.g. homes and experiences) or in nested relationships (e.g. articles of authors).

After all, GraphQL shifts the perspective to the client which decides which data it needs rather than the server saying which data it gives on a request. That's why GraphQL was invented in the first place, because a mobile client at Facebook required different data than their web client.

In conclusion, there are still use cases where REST is a valuable approach for connecting client and server applications. Often applications are resource driven and don't need all the capabilities of a flexible query language such as GraphQL. However, I recommend you to give GraphQL a shot when developing your next client server architecture.

{{% chapter_header "GraphQL Alternatives" "graphql-alternatives" %}}

Obviously REST is still the most popular alternative for GraphQL. In the recent years, the common theme was using a RESTful architectures for connecting client and server applications. It became more popular than other networking technologies such as {{% a_blank "RPC" "https://en.wikipedia.org/wiki/Remote_procedure_call" %}} and {{% a_blank "SOAP" "https://simple.wikipedia.org/wiki/SOAP_(protocol)" %}}, because it used the native features of HTTP, whereas other protocols (e.g. SOAP) tried to build their own solution on top of it.

Falcor by Netflix is another alternative which was mentioned before. It was developed at the same time as GraphQL created by Facebook. Netflix ran into similar issues and open sourced their own solution for it. There isn't too much traction around Falcor, maybe because GraphQL got so popular, but developers at Netflix have shown great engineering efforts in the past so it may be worth looking into it.

<hr class="section-divider">

After all, there are plenty of reasons to adopt GraphQL for your JavaScript applications instead of implementing yet another RESTful architecture. It has many advantages and plays nicely with modern software architectures. So try it yourself by learning and building a couple of applications with it.

{{% read_before "This tutorial is part 1 of 2 in this series." "Part 2:" "Why Apollo: Advantages, Disadvantages & Alternatives" "https://www.robinwieruch.de/why-apollo-advantages-disadvantages-alternatives" %}}
