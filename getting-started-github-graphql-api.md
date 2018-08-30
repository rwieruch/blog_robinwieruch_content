+++
title = "Getting Started with GitHub's GraphQL API"
description = "Everything you need to get started with GitHub's GraphQL API for learning GraphQL in JavaScript. This walkthrough demonstrates you how to set up your data on GitHub, how to create a personal access token, and how to consume their API without any source code with GraphiQL or GitHub's GraphQL Explorer ..."
date = "2018-06-09T13:50:46+02:00"
tags = ["React", "GraphQL", "Apollo", "JavaScript"]
categories = ["React", "GraphQL", "Apollo", "JavaScript"]
keywords = ["github graphql API", "github graphql apollo", "github graphql react"]
news_keywords = ["github graphql API", "github graphql apollo", "github graphql react"]
hashtag = "#ReactJs #GraphQL"
card = "img/posts/getting-started-github-graphql-api/banner_640.jpg"
banner = "img/posts/getting-started-github-graphql-api/banner.jpg"
contribute = "getting-started-github-graphql-api.md"
headline = "Getting Started with GitHub's GraphQL API"

summary = "Everything you need to get started with GitHub's GraphQL API for learning GraphQL in JavaScript. This walkthrough demonstrates you how to set up your data on GitHub, how to create a personal access token, and how to consume their API without any source code with GraphiQL or GitHub's GraphQL Explorer."
+++

{{% sponsorship %}}

{{% pin_it_image "github graphql API apollo react" "img/posts/getting-started-github-graphql-api/banner.jpg" "is-src-set" %}}

{{% react-graphql-book %}}

{{% read_before_2 "This tutorial is part 1 of 3 in this series." "Part 2:" "A complete React with GraphQL Tutorial" "https://www.robinwieruch.de/react-with-graphql-tutorial/" "Part 3:" "A complete React with Apollo and GraphQL Tutorial" "https://www.robinwieruch.de/react-graphql-apollo-tutorial/" %}}

Often it is easier to learn something new by learning it step by step. When you start learning about GraphQL in JavaScript, you can dive into the client-side and server-side of an application at the same time. However, this might not be the best approach of learning about GraphQL, because now you have to deal with two environments instead of one. So the step by step mentality would be difficult to apply. That's why I encourage GraphQL newcomers to start with the client-side usage of GraphQL by consuming a third-party GraphQL API before diving into the server-side of building your own GraphQL server. {{% a_blank "GitHub" "https://github.com" %}} is one of the major adopters of GraphQL who managed to {{% a_blank "release" "https://githubengineering.com/the-github-graphql-api" %}} a public GraphQL API {{% a_blank "(official documentation)" "https://developer.github.com/v4" %}}. Their API is quite popular among developers who learn about GraphQL, because most developers are already familiar with their platform to host their projects and source code.

In the following sections, I want to give you everything you need to get started with GitHub's GraphQL API for learning GraphQL in JavaScript from a client-side perspective first. After these sections, you should have a good clue about GitHub's terminology and you should have your GitHub account set up with data to be consumed later from the GraphQL API. Maybe not all of the following sections are applicable to you, because you may already have an active GitHub account and you might be prepared for these topics. There are a few more applications you are going to implement with GitHub's GraphQL API, so it makes lots of sense to invest the necessary time in this section to get everything up and running.

{{% chapter_header "Feeding the API with Data on GitHub" "github-api-data" %}}

If you don't have an account on GitHub yet, you can follow [this guide](https://www.robinwieruch.de/git-essential-commands/) to sign up on GitHub, to get to know what GitHub is all about, and optionally to learn about a few essential git commands for the command line. After all, you might want to share your projects with others on GitHub, too, which is a neat way to showcase your portfolio as a developer to hiring companies or clients of yours.

When interacting with GitHub's GraphQL API, it would be great to fill your own account with information on the platform in order to read/write from/to this data when using their GraphQL API. First, you can complete your GitHub profile by providing additional information about yourself. So when you read data about your GitHub account by using their GraphQL API later, you should be able to see information such as your username or your avatar's URL. The data you are going to provide or create here is available via GitHub's GraphQL API then.

### Exercises:

* create a GitHub account if you don't have one
* provide additional information for your GitHub profile

{{% sub_chapter_header "GitHub Repositories" "github-repository" %}}

Secondly, you can create repositories on GitHub. You may wonder what's a repository? *"A repository is the most basic element of GitHub. They're easiest to imagine as a project's folder. A repository contains all of the project files (including documentation), and stores each file's revision history. Repositories can have multiple collaborators and can be either public or private."* The quote is taken from {{% a_blank "GitHub's glossary" "https://help.github.com/articles/github-glossary/" %}} which helps you to get to know GitHub's terms (e.g. repository, issue, clone, fork, push) which you may need for the following sections. Basically a repository is the place for your application's source code to share it with others. If you don't have any repositories on GitHub yet, I encourage you to put a few of your project's (source code) into repositories by pushing them to GitHub. Later you can access these repositories with GitHub's GraphQL API.

If you don't have any projects for uploading (pushing) them as your repositories, you can also fork repositories from other GitHub users to continue working on them. After you have forked a repository, it is available in your list of repositories. It is basically a clone of the original repository where you can add your specific changes without chaning the original project. That's how open source works after all. There are many public repositories on GitHub which can be cloned to your local machine or forked to your list of repositories on GitHub in order to contribute to them. For instance, when you visit {{% a_blank "my GitHub profile" "https://github.com/rwieruch" %}}, you can see all my public repositories (not all of these are mine, because some of them are simply forked from others). You can navigate to a few of those repositories and fork them. Then you have those repositories accessible in your GitHub account which become available via GitHub's GraphQL API later on.

### Exercises:

* create or fork a couple of GitHub repositories for your GitHub account

{{% sub_chapter_header "Working with paginated Data" "github-paginated-data" %}}

Often you will request a list of repositories when using GitHub's GraphQL API. Thus it is valuable to have more than one repository listed in your GitHub account, because later you may work with a mechanism called pagination. Pagination was invented to work with large lists of items. Imagine you would have more than 100 repositories in your GitHub account, but your UI only shows 10 of these repositories. It would be a bad idea to transfer the whole list across the wire when performing a network request because only a subset of it is needed. That's where pagination comes into play. Different pagination mechanisms allow you to request only a subset (page) of your list. For instance, these can be the first 10 of your 100 repositories. Later, if you are using pagination with GitHub's GraphQL API, make sure that you adjust the numbers to your own needs. If you have 3 repositories in your GitHub account, it makes sense to request only 2 repositories as your first page, and then again 2 more repositories (which would lead only to 1 more repository, because you haven't any more repositories available) as your second page. Instead, if you would request all 3 repositories as your first page, you wouldn't have any repositories left to request another page of repositories. Then it becomes difficult to see the pagination feature in action. So make sure to adjust the numbers (e.g. limit, offset) to your personal requirements (e.g. available repositories of your GitHub account or available repositories of a GitHub organization).

{{% sub_chapter_header "Issues and Pull Requests" "github-issues-pull-requests" %}}

Once you dive deeper into GitHub's GraphQL API and you start to request nested relationships (e.g. issues of repositories, pull requests of repositories), make sure that the repositories of your GitHub account or the GitHub organization, where you are requesting the repositories from, have a few issues or pull requests. Otherwise you may implement such a feature to show all issues in a repository, but you don't see anything, because there are no issues in the first place. You may think it is a bug then but in reality there is just no data available. So in the end, it might be better to request repositories from a GitHub organization, where you normally find issues and pull requests, rather than requesting repositories listed in your own GitHub account, where you often don't have any issues or pull requests.

### Exercises:

* read more about the different terms in {{% a_blank "GitHub's glossary" "https://help.github.com/articles/github-glossary/" %}}
  * what is a GitHub organization and GitHub user?
  * what are repositories, issues and pull requests?
  * what are GitHub repository stars and GitHub repository watchers?
* create enough repositories in order to use the pagination feature later
* create pull requests and issues in a few of your GitHub repositories

{{% chapter_header "Read/Write Data with GitHub's Personal Access Token" "github-personal-access-token" %}}

In order to use GitHub's GraphQL API, you need to generate a personal access token on their website. The access token makes sure that you can be authorized as a user who interacts with their data. Basically, it allows you to read and write data in your name. You can {{% a_blank "follow their step by step instructions" "https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line" %}} to obtain the personal access token. While getting your token, make sure to check all the necessary scopes (permissions) for it. You will need sufficient read and write permissions in order to implement a well-rounded GitHub client later.

{{% pin_it_image "react graphql github" "img/posts/getting-started-github-graphql-api/github-personal-access-token.jpg" "is-src-set" %}}

Later, the personal access token can be used to interact with GitHub's GraphQL API. Basically it is your private key to access (read) and manipulate (write) GitHub's data, so you shouldn't share it with any third-parties.

{{% chapter_header "Interacting with GitHub's GraphQL API" "github-graphql-api" %}}

There are two common ways to interact with the GitHub GraphQL API without writing any source code for it. Firstly, you can use {{% a_blank "GitHub's GraphQL Explorer" "https://developer.github.com/v4/explorer/" %}}. You only need to sign up with your GitHub account in order to perform a query or mutation to their GraphQL API. That's how you can make your first experiences with GraphQL.

Secondly, you can use a more generic client in form of an application. GraphiQL is one of those clients to make GraphQL requests either as integration in your own application or as a standalone application. The former can be accomplished {{% a_blank "by setting up GraphiQL directly in your application" "https://github.com/skevy/graphiql-app" %}}. However, the latter may be more convenient for you by {{% a_blank "using GraphiQL as standalone application" "https://github.com/skevy/graphiql-app" %}}. It's a lightweight shell around GraphiQL that can be easily installed on the command line or manually by downloading it.

Whereas GitHub's GraphQL Explorer knows about your credentials, since you need to sign up using it, the GraphiQL application needs to know about your personal access token that you have created before. You can add the generated access token in your HTTP header for every request by opening up the headers configuration.

{{% pin_it_image "graphiql headers" "img/posts/getting-started-github-graphql-api/graphiql-headers.jpg" "is-src-set" %}}

In the next step, you need to add a new header with a name and value to your GraphiQL configuration. In order to communicate with GitHub's GraphQL API, you need to fill in the header name with "Authorization" and the header value with "bearer [your personal access token]". Afterward, save this new header for your GraphiQL application. Finally, you are ready to make requests to GitHub's GraphQL API with your GraphiQL application.

{{% pin_it_image "graphiql authorization" "img/posts/getting-started-github-graphql-api/graphiql-authorization.jpg" "is-src-set" %}}

Last but not least, in case you end up using your own GraphiQL application, you need to provide the GraphQL endpoint for GitHub's GraphQL API which is `https://api.github.com/graphql`. In case of GitHub's GraphQL API, you are going to use the {{% a_blank "POST HTTP method" "https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods" %}} for GraphQL queries and mutations. After all, you have to transfer the data as payload to your GraphQL endpoint.

In conclusion, the last paragraphs have provided you with two ways to interact with the GitHub GraphQL API. Whereas GitHub's GraphQL Explorer can only be used for GitHub's API, GraphiQL, integrated in your application or as standalone application, can be used for any GraphQL API. But it requires a bit more setup. As you might have noticed, the GitHub GraphQL Explorer is nothing else than a hosted standalone GraphiQL application, but it is tailored to only use GitHub's GraphQL API.

<hr class="section-divider">

After you went through these instructions that showed you how to set up GitHub in order to use their GraphQL API to learn about GraphQL itself, you should be ready to implement your first GraphQL client application with it. Follow me on this journey with your next GraphQL client-side application which we are going to build in React.

{{% read_before_2 "This tutorial is part 1 of 3 in this series." "Part 2:" "A complete React with GraphQL Tutorial" "https://www.robinwieruch.de/react-with-graphql-tutorial/" "Part 3:" "A complete React with Apollo and GraphQL Tutorial" "https://www.robinwieruch.de/react-graphql-apollo-tutorial/" %}}