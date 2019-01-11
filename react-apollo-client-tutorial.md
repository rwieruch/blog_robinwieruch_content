+++
title = "React Performance with shouldComponentUpdate"
description = "A tutorial to learn about the React's shouldComponentUpdate and PureComponent. You will use React's ref API with createRef() to observe elements in your React application in context of the viewport ..."
date = "2018-09-05T13:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react shouldcomponentupdate", "react purecomponent", "react performance"]
news_keywords = ["react shouldcomponentupdate", "react purecomponent", "react performance"]
hashtag = "#ReactJs"
card = "img/posts/react-shouldcomponentupdate/banner_640.jpg"
banner = "img/posts/react-shouldcomponentupdate/banner.jpg"
contribute = "react-shouldcomponentupdate.md"
headline = "React Performance with shouldComponentUpdate"

summary = ",,,"
+++

{{% sponsorship %}}

{{% pin_it_image "react shouldcomponentupdate" "img/posts/react-shouldcomponentupdate/banner.jpg" "is-src-set" %}}

{{% read_before "This tutorial is part 2 of 2 in this series." "Part 1:" "How to setup React.js on Windows" "https://www.robinwieruch.de/graphql-apollo-server-tutorial/" %}}

-TODO maybe rename to apollo-client-react-tutorial.md to match the server tutorial naming
- introduction/motivation
- starter project and done project links

{{% chapter_header "Apollo Client in React: Setup" "" %}}

{{< highlight javascript "hl_lines=" >}}

{{< /highlight >}}

{{% chapter_header "Apollo Client in React: Query" "" %}}

- query messages

{{% chapter_header "Apollo Client in React: Mutation" "" %}}

- not much form implementation, because this topic is else where
- registration
- apollo client sign up in React

{{% chapter_header "Apollo Client in React: Authentication" "" %}}

The previous section introduced a larger topic: authentication in GraphQL with Apollo Client in React.

- sign in/login with Apollo Client in React.
- sign out
- refetch?

{{% chapter_header "Apollo Client in React: Authorization" "" %}}

- protected routes based on session (sign in/sign out, account)
- protected routes based on role (admin)

- protected action based on session: create message (not possible when not signed in)
- protected action based on permission (ownership): delete message

{{% chapter_header "Apollo Client in React: Forms" "" %}}

- validation
- error
- loading

{{% chapter_header "Apollo Client in React: Pagination" "" %}}

- query more messages

{{% chapter_header "Apollo Client in React: Supscription" "" %}}

- subscribe to messages
-- show before: commented update prop
-- show after: subscription prop
- @connection directive

<hr class="section-divider">

TODO