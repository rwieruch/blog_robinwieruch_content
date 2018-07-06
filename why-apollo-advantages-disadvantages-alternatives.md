+++
title = "Why Apollo: Advantages, Disadvantages & Alternatives"
description = "Overview about the advantages and disadvantages of using Apollo and its ecosystem for JavaScript applications. It mentions also Apollo alternatives such as Urql and Relay for React applications ..."
date = "2018-07-04T13:50:46+02:00"
tags = ["React", "GraphQL", "Apollo", "JavaScript"]
categories = ["React", "GraphQL", "Apollo", "JavaScript"]
keywords = ["apollo alternatives", "apollo advantages", "apollo disadvantages", "why apollo", "apollo benefits"]
news_keywords = ["apollo alternatives", "apollo advantages", "apollo disadvantages", "why apollo", "apollo benefits"]
hashtag = "#ReactJs #GraphQL"
card = "img/posts/why-apollo-advantages-disadvantages-alternatives/banner_640.jpg"
banner = "img/posts/why-apollo-advantages-disadvantages-alternatives/banner.jpg"
contribute = "why-apollo-advantages-disadvantages-alternatives.md"
headline = "Why Apollo: Advantages, Disadvantages & Alternatives"

summary = "It is not always simple to pick the right solution for a problem. In a GraphQL era where nothing is set in stone because it is an emerging technolgy, it's difficult to get the solutions for GraphQL powered JavaScript applications right. This article gives you insights why you should or should not use Apollo for using GraphQL in your JavaScript applications."
+++

{{% sponsorship %}}

{{% pin_it_image "apollo advantages disadvantages" "img/posts/why-apollo-advantages-disadvantages-alternatives/banner.jpg" "is-src-set" %}}

{{% react-graphql-book %}}

{{% read_before "This tutorial is part 2 of 2 in this series." "Part 1:" "Why GraphQL: Advantages, Disadvantages & Alternatives" "https://www.robinwieruch.de/why-graphql-advantages-disadvantages-alternatives" %}}

It is not always simple to pick the right solution for a problem. In a GraphQL era where nothing is set in stone because it is an emerging technolgy, it's difficult to get the solutions for GraphQL powered JavaScript applications right. In the following sections, I want to give you insights why you should or should not use Apollo for using GraphQL in your JavaScript applications. In addition, it will show you alternatives in case you decide against Apollo. Even though I recommend to use Apollo for JavaScript and GraphQL applications, I want to mention not only the positive things about it, but also the negative aspects.

Before we dive into the advantages and disadvantages of Apollo, let's answer the following question first: What is Apollo? It seems to be Apollo's mission making GraphQL effortless in JavaScript applications. Whereas GraphQL is only the query language which has its reference implementation in JavaScript, Apollo builds its ecosystem on top of it to make GraphQL available in a simpler way for a broader audience. This includes the client-side as well as the server-side, because they provide a large ecosystem of libraries for both sides. They even provide you with an intermediate layer with Apollo Engine as GraphQL gateway. So basically if you are interested in using GraphQL in your JavaScript applications, Apollo with its popular ecosystem is a great choice.

{{% chapter_header "Apollo Advantages" "apollo-advantages" %}}

The following topics show you the major advantages of using Apollo.

{{% sub_chapter_header "Apollo's Ecosystem" "apollo-ecosystem" %}}

The Apollo ecosystem offers plenty of solutions for many problems even though GraphQL is in its early stages. And the ecosystem is growing. At every other conference the company is announcing an update for Apollo or another library which can be used complementary to Apollo's tech stack. For instance, that's why Apollo is not only covering GraphQL but also REST interfaces for enabling backward compatibility to RESTful architectures. It goes beyond GraphQL being used only for the network layer and remote data by offering a state management solution for local data too. So if you make the leap to use Apollo for your application, you are welcomed with a great ecosystem.

{{% sub_chapter_header "The Company and Community behind Apollo" "apollo-company-community" %}}

The company behind Apollo (Meteor Development Group Inc.) is pouring lots of resources into its endeavour. They are active in open source, write lots of articles about their product, and are seen often at conferences. In general, the GraphQL ecosystem {{% a_blank "seems to be in good shape for the future" "https://techcrunch.com/2018/05/15/prisma" %}}. Many people are speaking about it and are keen to adopt it for their own applications. In addition, even though Apollo is powered by its company, the community behind it is growing. More people are adopting GraphQL and opt-in Apollo for their client-side and server-side JavaScript applications.

{{% sub_chapter_header "Who is using Apollo?" "apollo-who-is-using" %}}

There are plenty of popular and tech savvy companies out there who are using Apollo already. Not only the Apollo company itself, who was developing the popular Meteor framework before, but also companies such as Airbnb and Twitch are using it. The following list is an excerpt of companies and their stories using Apollo for their JavaScript applications:

* Airbnb {{% a_blank "[1]" "https://medium.com/airbnb-engineering/reconciling-graphql-and-thrift-at-airbnb-a97e8d290712" %}} {{% a_blank "[2]" "https://youtu.be/oBOSJFkrNqc" %}}
* {{% a_blank "Twitch" "https://about.sourcegraph.com/graphql/twitch-our-graphql-transformation" %}}
* {{% a_blank "The New York Times" "https://open.nytimes.com/the-new-york-times-now-on-apollo-b9a78a5038c" %}}
* {{% a_blank "KLM" "https://youtu.be/T2njjXHdKqw" %}}
* {{% a_blank "Medium" "https://www.infoq.com/news/2018/05/medium-reactjs-graphql-migration" %}}

{{% sub_chapter_header "Apollo's Documentation" "apollo-documentation" %}}

Even though Apollo is evolving all the time, the team and community behind it makes sure to keep the documentation up to date. Going through their documentation should give you plenty of insights into how you can build your first application with Apollo without reading up any third-party resources. They cover so many areas that it can be also overwhelming for a newcomer. So make sure you go through the content topic by topic and apply it in your own application.

{{% sub_chapter_header "Apollo Libraries" "apollo-libraries" %}}

Apollo offers plenty of libraries for implementing your almost perfect GraphQL tech stack for your JavaScript applications. They open source the libraries in a way so that they can be used in a composable and exchangeable way.

For instance, the former can be seen with {{% a_blank "Apollo Link" "https://www.apollographql.com/docs/link/" %}} which provides you a API for chaining different features into your GraphQL control flow. It makes it possible to enable automatic network retries or to use a RESTful API endpoint instead of a GraphQL endpoint (whereas both can be used together too).

The latter fact, saying Apollo is offering exchangeable libraries, can be seen for instance by looking at the Apollo Client Cache. Apollo Client itself is not opinionated about its cache where the data is stored. You can use any cache which is advertised by Apollo or its community. That's why there are already a few caches out there which can be used to setup a Apollo Client instance.

{{% sub_chapter_header "Apollo's Features" "apollo-features" %}}

Apollo comes with plenty of built-in features which are not simple to implement yourself. Therefore you are able to pull all the complexity out of your applications and leave the intersection between client and server application to Apollo. For instance, Apollo Client makes sure to cache your request (requests are not made twice when the result is already in the cache). That's a great performance boost for your application, because it saves valuable network traffic. In addition, Apollo Client normalizes your data. Hence when receiving nested data from a GraphQL query, the data is stored in a normalized data structure in your Apollo Client Cache. Hence you can read data from the Apollo Client Cache by an identifier and, for instance, don't need to look up a "article" entity in an "author" entity. The article is referenced by its identifier in the Apollo Client Cache. Apart from caching and normalization, Apollo Client comes with much more features such as error management, support for pagination and optimistic UI, prefetching of data, or connecting the data layer (Apollo Client) to the view layer (e.g. React).

{{% sub_chapter_header "Interoperability with other Frameworks" "apollo-interoperability" %}}

One of Apollo's libraries makes it possible to connect Apollo Client to React. In the same fashion as other libraries (Redux, MobX, ...) did it before, the react-apollo library offers higher-order components (and render prop components) to connect both worlds. However, there are other libraries out there bridging not only Apollo Client to React, but also Apollo to Angular or Apollo to Vue. That's what makes Apollo Client view layer agnostic which is great for the growing JavaScript ecosystem.

Apollo is not only on the client-side library agnostic. Also on the server-side for Node.js it offers several solutions to connect to different Node.js libraries. Whereas Apollo Server for Express.js is the most popular choice among developers and companies, there are other solutions for Koa and Hapi on Node.js for Apollo Server as well.

{{% sub_chapter_header "Modern Data Handling with Apollo" "apollo-data-handling" %}}

Do you remember the cases where you had to trigger data fetching in one of your component's lifecycle methods in an imperative way? These times are over with Apollo Client, because you query your data in a declarative way with Apollo Client. Most often you will use a higher-order component or render prop in React which triggers a query automatically when rendering the React component. Only the GraphQL mutations are triggered imperatively, but only because a higher-order component or render prop gives you access to the function which executes the mutation (e.g. on a button click). Apollo embraces declarative programming over imperative programming.

{{% sub_chapter_header "Modern State Management with GraphQL and Apollo" "apollo-state-management" %}}

With the advent of GraphQL in JavaScript applications, state management entered a state (pun intended) of confusion again. Even though lots of pain points are eliminated by using a GraphQL library such as Apollo Client in your application, because it takes care of all the state management for your remote data, people are confused where to put state management libraries such as Redux or MobX now. However, it can be simple by using Redux or MobX only for local data and leave the remote data to Apollo. There is no need anymore to fetch data with asynchronous actions in Redux when Apollo Client is used for it. Thus Redux becomes the predictable state container for all your remaining application state (local data/view data/UI data, ...). Perhaps you even don't need Redux anymore, because your remaining application state hasn't enough complexity to be managed by Redux, but should be managed by React's local state instead.

In the meantime, Apollo already released their own solution to manage local state (which is supposed to be managed by React's local state, Redux or MobX) by embracing GraphQL for everything. The Apollo Link State library enables you to manage local data with GraphQL operations only on the client-side in Apollo Client. It's the way of Apollo saying: "You don't need any other state management library anymore, we take care of your data." These are again exciting times for developing JavaScript applications.

{{% sub_chapter_header "Convenient Development Experience" "apollo-development-experience" %}}

The development experience when using Apollo for your JavaScript applications is becoming better with every day. People are pushing out tools to support you with the implementation of those applications. There are development tools available as browser extension, third-party tools to perform GraphQL operations such as GraphiQL, and libraries to simplify developing Apollo applications. For instance, the Apollo Boost library gives you an almost zero-configuration Apollo Client setup to get you started with GraphQL for your client-side application. Overall, Apollo takes away all the boilerplate implementation which you would have to implement when using the GraphQL reference implementation in JavaScript.

{{% chapter_header "Apollo Disadvantages" "apollo-disadvantages" %}}

The following topics show you some of the disadvantages of using Apollo. It is not my intention to put Apollo in a bad light here, I love to use it myself, but I want to give you a well-rounded pro and contra list of using Apollo. If you think that anything should be improved in this section, or in the other sections, please reach out to me.

{{% sub_chapter_header "Bleeding Edge" "apollo-bleeding-edge" %}}

Since GraphQL is in its early stages, everyone, not only Apollo but also other early adopters, are working on a bleeding edge technology. The Apollo team is eager to develop a rich ecosystem around GraphQL, not only providing the basics, but also offering advanced features such as caching and monitoring.

However, this comes with the pitfall that not everything is set in stone yet. Here and there you will have changes, especially because Apollo is moving fast, and you have to deal with them when updating your GraphQL related libraries. But the Apollo team is doing everything to keep the breaking changes to a minimum. In contrast, other libraries in the GraphQL space may be more conservative here, but then again they don't put out so many powerful features as the Apollo team is doing it.

Another aspect is the learning experience which is affected when everything is evolving so fast. For instance, tutorials for GraphQL in general, but also Apollo, happen to be outdated and you have to look up other learning resources. However, most of it doesn't apply only to Apollo, but also to other open source projects in this space and perhaps to programming tutorials in general.

{{% sub_chapter_header "Under Construction" "apollo-under-construction" %}}

The Apollo team and community works eagerly on implementing many new features in a rapid pace. But going so fast comes always with a price. For instance, when searching for a solution when running into a problem, you often end up in a GitHub issue, because there is not much other information about the problem out there yet. After all, you can be happy to stumble upon something at all. However, even though there is a GitHub issue for your problem, it can happen that there is no solution for your it yet.

Going at a rapid pace always comes with the price of neglecting old things. As I have experienced it, {{% a_blank "people seemed confused when Apollo abandoned Redux" "https://github.com/apollographql/apollo-client/issues/2593" %}} as their internal state management solution. Apollo isn't opinionated about how Redux should be used side by side with it, but since it has been abandoned as internal state management solution, many people didn't know how to proceed with this new information when Apollo 2.0 got released. After all, I think the team behind Apollo has just too many things on their plate, they are struggling as well to keep up with the fast paced GraphQL ecosystem, and it's not always easy in open source to listen to all the voices out there. So maybe that's just your opportunity to help them out by contributing to their open source libraries.

{{% sub_chapter_header "It is Bold and Fashionable" "apollo-bold-fashionable" %}}

Apollo is bold, because it moves fast beyond GraphQL. They are going beyond being the network layer ecosystem between client and server for GraphQL in JavaScript, but position themselves as the data management solution of tomorrow. They are not only connecting your client and backend application with GraphQL, but also offering you the option to use GraphQL for everything else by having apollo-link-rest for RESTful APIs and apollo-link-state for local state management. Most people are welcoming these new solutions for their tech stack. Others are skeptical towards the "GraphQL everything" mentality. After all, it is up to everyone to decide whether they want to "GraphQL all the things".

Apollo is fashionable, because it keeps up with the latest trends. In React the latest trend were render prop components. Because of this trend, and arguable several benefits of having render prop components over higher-order components, the React Apollo library introduced {{% a_blank "render prop components" "https://reactjs.org/docs/render-props.html" %}} next to higher-order components. Overall it's a great move to offer multiple solutions, because both concepts, higher-order components and render prop components, come with their own advantages and disadvantages. However, Apollo advertises render props over higher-order components and it is not too clear whether this was hype-driven development and a marketing move or whether they truly believe that this is the preferred way to go in the future. Render props are fairly new in React and it will take its time (again) that people realise that they come with their own pitfalls (see higher-order components). Personally, I have seen React applications which ended up to be too verbose by having multiple render prop components in one React component, even though one render prop didn't depend on another render prop, rather than having those co-located to the React component by using higher-order components. After all, Apollo offers both solutions, render props and higher-order components, and again it is up to the developer to decide on a case by case basis for their applications, because there is no silver bullet to it. In the end, it is great that the Apollo team is keeping up with the recent trends from other libraries out there. They are not just hanging in their own bubble, but communicate to the folks developing other libraries concerning the Apollo ecosystem.

{{% sub_chapter_header "Missing Competition" "apollo-competition" %}}

Personally all the previous things are just concerns about being on the bleeding edge of GraphQL. They could be applied to any other open source solution in this space. However, a concern for me is the missing competition in the GraphQL in JavaScript domain. A couple of alternatives to Apollo can be found in the next section, but they are by far not so popular and powerful compared to the Apollo ecosystem. Even though it is doable to write your own library for GraphQL (e.g. {{% a_blank "a simple GraphQL in React client" "https://github.com/rwieruch/react-graphql-client" %}}), not many people are starting this endeavour in the first place. It may be the case that the problems solved by Apollo are not trivial at all, but I think competition in general would be great for the GraphQL in JavaScript ecosystem. I believe that there is a huge potential in the GraphQL space at the moment and any open source developer should take advantage of it.

{{% chapter_header "Apollo Alternatives for JavaScript, React and Node.js" "apollo-alternatives" %}}

Most of the listed disadvantages are due to the early stages of GraphQL as being an alternative to a RESTful driven architecture. There are a couple of alternatives for Apollo Client and Apollo Server out there which you could use as alternative to expose and consume GraphQL APIs in JavaScript. The following list should give you insights about other solutions in the JavaScript ecosystem used for React on the client-side and Node.js on the server-side.

{{% sub_chapter_header "Apollo Client Alternatives for React" "apollo-client-alternatives" %}}

When it comes to {{% a_blank "Apollo Client" "https://github.com/apollographql/apollo-client" %}} for React, Angular, Vue or something else, there are several alternatives you can checkout. Obviously these come with their own advantages and disadvantages whereas these things are not covered here.

* plain HTTP request: Even though sophisticated GraphQL libraries can be used to perform your GraphQL operations, GraphQL itself isn't opinionated about the network layer. So it is possible for you to use GraphQL with plain HTTP methods by having only one endpoint with an opinionated payload structure for GraphQL queries and mutations.

* {{% a_blank "Relay" "https://github.com/facebook/relay" %}}: Relay is Facebook's library for consuming GraphQL on the client-side in React applications. It was among the first GraphQL client libraries before Apollo emerged.

* {{% a_blank "urql" "https://github.com/FormidableLabs/urql" %}}: urql is a GraphQL client library from Formidable Labs for consuming GraphQL in React applications. It was open sourced as minimalistic alternative in contrast to the growing Apollo behemoth.

{{% sub_chapter_header "Apollo Server Alternatives for Node.js" "apollo-client-alternatives" %}}

When it comes to {{% a_blank "Apollo Server" "https://github.com/apollographql/apollo-server" %}} for Node.js with Express, Koa, Hapi or something else, there are several alternatives you can checkout. Obviously these come with their own advantages and disadvantages whereas these things are not covered here.

* {{% a_blank "express-graphql" "https://github.com/graphql/express-graphql" %}}: The library provides you with the lower level API to connect your GraphQL layer to your Express middleware. It takes the pure GraphQL.js reference implementation for defining your GraphQL schema whereas Apollo Server builds up on top of this to simplify it for you.

<hr class="section-divider">

After all, there are plenty of reasons to use Apollo and its striving ecosystem for your JavaScript applications for operating with a GraphQL interface over a RESTful interface. Their libraries are framework agnostic and thus can be used with a wide variation of frameworks on the client-side (React, Angular, Vue) and server-side (Express, Koa, Hapi).

{{% read_more "A complete React with Apollo and GraphQL Tutorial" "https://www.robinwieruch.de/react-graphql-apollo-tutorial/" %}}