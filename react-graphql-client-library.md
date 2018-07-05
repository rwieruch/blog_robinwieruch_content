+++
title = "How to build a GraphQL client library for React"
description = "A tutorial on how to build a GraphQL client library for React applications. It has three parts: the GraphQL client, connecting the GraphQL client to React, and offering Query and Mutation components for GraphQL operations ..."
date = "2018-06-13T13:50:46+02:00"
tags = ["React", "GraphQL", "Tooling", "JavaScript"]
categories = ["React", "GraphQL", "Tooling", "JavaScript"]
keywords = ["react graphql client", "react graphql client library", "graphql react book", "graphql apollo book"]
news_keywords = ["react graphql client", "react graphql client library", "graphql react book", "graphql apollo book"]
hashtag = "#ReactJs #GraphQL"
card = "img/posts/react-graphql-client-library/banner_640.jpg"
banner = "img/posts/react-graphql-client-library/banner.jpg"
contribute = "react-graphql-client-library.md"
headline = "How to build a GraphQL client library for React"

summary = "A tutorial on how to build your own GraphQL client for React applications. It has three parts: the GraphQL client, connecting GraphQL client to React, and offering Query and Mutation components for GraphQL operations."
+++

{{% sponsorship %}}

{{% pin_it_image "react graphql client library" "img/posts/react-graphql-client-library/banner.jpg" "is-src-set" %}}

{{% react-graphql-book %}}

{{% read_before_2 "This tutorial is part 3 of 3 in this series." "Part 1:" "A complete React with GraphQL Tutorial" "https://www.robinwieruch.de/react-with-graphql-tutorial/" "Part 2:" "A complete React with Apollo and GraphQL Tutorial" "https://www.robinwieruch.de/react-graphql-apollo-tutorial/" %}}

In your previous applications, you may have used a GraphQL client library, which is potentially partly view layer agnostic, but can be used with React or other view layer solutions. There are a couple of those GraphQL client libraries out there: Apollo Client, Urql and Relay. In the following, I want to show you that it isn't too difficult to implement your own GraphQL client library that works with React. However, the takeaway shouldn't be "build your own GraphQL client for your production ready applications" but rather:

* see how a GraphQL client library works under the hood
* see how it isn't too difficult to implement it your way
* see how you would be able to contribute to the GraphQL ecosystem

I believe there is great potential to contribute to the GraphQL ecosystem, because it is fairly new. It would be great to have a diverse set of tools out there and not only one ecosystem pushing the whole thing forward. So see it as your opportunity to contribute to it.

Before diving into the single parts of implementing your own GraphQL client for React, let's think about the essential parts to be able to consume a GraphQL API in your React application?

* First, there must be **the GraphQL client itself**. It can be any HTTP library or even the {{% a_blank "native fetch API" "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" %}}, but it must be able to send HTTP methods with a payload across the wire. Note: Even though the GraphQL specification isn't opinionated about the transportation layer, the GitHub GraphQL API (which you are going to consume with your own GraphQL client) is using HTTP. Thus our GraphQL client has to be able to execute GraphQL operations by using HTTP methods.

* Second, there must be a way to **provide the GraphQL client instance to the React view layer**. It is the perfect use case for [React's Context API](https://www.robinwieruch.de/react-context-api/) to provide the GraphQL client instance somewhere at the top level of your React component tree and to consume it in every React component which is interested in it.

* Third, there must be a way to **execute GraphQL operations, such as a query or a mutation, in a declarative way in React**. Therefore, you will implement a Query component and a Mutation component which will expose an API to execute the GraphQL operations and to access the result of it. Because you are implementing these components, you will never touch the GraphQL client which is provided with React's Context API explicitly in your React components, but only in the Query and Mutation components which are implemented by you.

Whereas the first part of the previously described steps is React agnostic, the second and third parts glue the GraphQL client (data layer) to React (view layer). You can see it analog to the *redux* and *react-redux* or *apollo-client* and *react-apollo* libraries. Whereas the former part is view layer agnostic, the latter part is used to connect it to the view layer.

Along the way of implementing your own GraphQL client for React in the following sections, you will implement a simple GitHub client application with React which consumes GitHub's GraphQL API by using your own GraphQL client. So let's get started.

{{% chapter_header "Implementing your GraphQL Client" "graphql-client" %}}

In the following, you have to separate mentally the domain specific application (GitHub client) and the GraphQL client with its connecting parts to the React world. The latter part could be extracted later as a standalone library and published on npm. It could be even split up into two libraries, whereas the first part is the view layer agnostic GraphQL client and the second part is the connecting view layer part.

First, bootstrap your React application with {{% a_blank "create-react-app" "https://github.com/facebook/create-react-app" %}} in which you are going to implement your GraphQL client and the connecting parts to the view layer.

Second, create a file to implement your standalone GraphQL client. You are going to use {{% a_blank "axios" "https://github.com/axios/axios" %}} as HTTP client to send queries and mutations with HTTP POST methods.

{{< highlight javascript >}}
npm install axios --save
{{< /highlight >}}

The GraphQL client build with axios could be as lightweight as the following:

{{< highlight javascript >}}
import axios from 'axios';

const graphQLClient = axios.create();

export default graphQLClient;
{{< /highlight >}}

Since you may want to have greater control when creating the GraphQL client instance, for example by passing in the GraphQL API endpoint or HTTP headers, you can expose it also with a function which returns the configured GraphQL client instance.

{{< highlight javascript >}}
import axios from 'axios';

const createGraphQLClient = (baseURL, headers) =>
  axios.create({
    baseURL,
    headers,
  });

export default createGraphQLClient;
{{< /highlight >}}

However, you may don't want to use the GraphQL client with HTTP methods (e.g. `graphQLClient.post()`). In contrast, you may want to give another layer for the query and mutation methods you are going to call from the outside. By doing it this way, you never have to see the behind the scenes HTTP POST when interacting with the GraphQL client. When you want to implement it this way, a JavaScript class makes sense for it.

{{< highlight javascript >}}
import axios from 'axios';

class GraphQLClient {
  axios;

  constructor({ baseURL, headers }) {
    this.axios = axios.create({
      baseURL,
      headers,
    });
  }

  query({ query, variables }) {
    return this.axios.post('', {
      query,
      variables,
    });
  }

  mutate({ mutation, variables }) {
    return this.axios.post('', {
      query: mutation,
      variables,
    });
  }
}

export default GraphQLClient;
{{< /highlight >}}

That's already it for the GraphQL client. You are able to create an instance of the GraphQL client and you are able to execute GraphQL operations (query and mutation) with it. You may wonder: Where is the state, the caching of requests and the normalization of the data? You will not need it. This lightweight GraphQL client will operate without any of those extra features. But I invite you to extend the feature set of the GraphQL client after you have implemented it in the following sections. It is your opportunity to contribute your own GraphQL client library to the community.

Last but not least, you can use the instantiate the GraphQL Client in your top level React component.

{{< highlight javascript "hl_lines=5 8 9 10 11 12 13 14 15" >}}
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import GraphQLClient from './my-graphql-client';
import registerServiceWorker from './registerServiceWorker';

const client = new GraphQLClient({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
registerServiceWorker();
{{< /highlight >}}

As you can see, you provide the necessary information to the GraphQL client constructor to create a GitHub GraphQL client instance. In the implementation of previous applications, you should have seen how to obtain the {{% a_blank "personal access token from GitHub to access their data" "https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line" %}} and how to use it in a *.env* file for environment variables to make it securely accessible for the GraphQL client instantiation.

{{% chapter_header "Implementing your GraphQL to React Bridge" "graphql-client-react" %}}

In this section, you need to find a way to connect your GraphQL client instance to your React view layer. The best way of doing it is using React's Context API. In a separate file, you can create the necessary parts for creating the context which is used to tunnel the GraphQL client instance from a Provider component to all Consumer components.

{{< highlight javascript >}}
import { createContext } from 'react';

const GraphQLClientContext = createContext();

export default GraphQLClientContext;
{{< /highlight >}}

In order to provide the GraphQL client instance to your React component tree, you can use the previously created context and its Provider component to make it available to the underlying React component hierarchy.

{{< highlight javascript "hl_lines=6 19 21" >}}
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import GraphQLClient from './my-graphql-client';
import GraphQLClientContext from './my-graphql-client-react/context';
import registerServiceWorker from './registerServiceWorker';

const client = new GraphQLClient({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});

ReactDOM.render(
  <GraphQLClientContext.Provider value={client}>
    <App />
  </GraphQLClientContext.Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
{{< /highlight >}}

Since you have provided the GraphQL client instance yo your React component tree, you can use the Consumer component from the context object to retrieve the client as value. Therefore, you can implement a [Higher-Order Component (HOC)](https://www.robinwieruch.de/gentle-introduction-higher-order-components/) to make the GraphQL client instance accessible to React components which are using this HOC.

{{< highlight javascript >}}
import React from 'react';
import GraphQLClientContext from '../context';

const withClient = Component => props => (
  <GraphQLClientContext.Consumer>
    {client => <Component {...props} client={client} />}
  </GraphQLClientContext.Consumer>
);

export default withClient;
{{< /highlight >}}

So rather than using the Consumer component directly in your React components, you use it implicitly by using this Higher-Order Component to expose the GraphQL client instance to the props. In summary, you have implemented all the parts which are necessary to bridge the data layer to the view layer. You have a Provider component which provides the GraphQL client instance to the whole React component tree and you have a Higher-Order Component which uses the Consumer component to make the GraphQL client instance available to all React components that are interested in it.

{{% chapter_header "Implementing the Query component in React" "react-query-component" %}}

Now you are going to explore on how to execute GraphQL queries and mutations with your own GraphQL client instance. However, rather than using the client directly in your React components by using the `withClient()` HOC, which would be possible as well, you will implement two components, called Query and Mutation, which are performing the GraphQL operations in your component tree in a declarative way.

Both components, the Query and Mutation component, will implement the {{% a_blank "render props" "https://reactjs.org/docs/render-props.html" %}} pattern to pass information to the component which uses the Query or Mutation component. Let's start out with the Query component in React. The minimal implementation of the Query component could look like the following:

{{< highlight javascript >}}
import React from 'react';

import withClient from './withClient';

class Query extends React.Component {
  state = {
    data: null,
    loading: null,
    errors: null,
  };

  componentDidMount() {
    const { query, variables } = this.props;

    this.query({ query, variables });
  }

  query = ({ query, variables }) => {
    this.props.client
      .query({ query, variables })
      .then(result =>
        this.setState({
          data: result.data.data,
          errors: result.data.errors,
          loading: false,
        }),
      )
      .catch(error =>
        this.setState({
          errors: [error],
          loading: false,
        }),
      );
  };

  render() {
    return this.props.children({
      ...this.state,
    });
  }
}

export default withClient(Query);
{{< /highlight >}}

The Query component receives a GraphQL query and optional variables as props. Once it did mount, it executes the query by using the GraphQL client instance which is injected with the `withClient` Higher-Order Component to the props. If the request resolves successfully, all data but also GraphQL errors are stored in the local state of the Query component. Otherwise, if the request fails, the network error is stored in the local state in an array of errors. In addition, a `loading` boolean keeps track of the request state. In the end, the Query component uses the render prop as a children function to pass in the local state of the component. The user of the Query component decides what should be rendered in response to the obtained information (data, loading, errors) from the children function.

How would you use this component in your GitHub client application now? In your App component's file, you can import the component, pass in a query and optional variables, and let the Query component execute the GraphQL query once it did mount. In every render you will receive the information from the Query component in the children function. Thus you can render a result accordingly to it.

{{< highlight javascript >}}
import React, { Component } from 'react';

import { Query } from './my-graphql-client-react';

const GET_ORGANIZATION = `
  query (
    $organizationLogin: String!,
  ) {
    organization(login: $organizationLogin) {
      name
      url
    }
  }
`;

class App extends Component {
  state = {
    value: 'the-road-to-learn-react',
    organizationLogin: 'the-road-to-learn-react',
  };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  onSubmit = event => {
    this.setState({ organizationLogin: this.state.value });

    event.preventDefault();
  };

  render() {
    const { organizationLogin, value } = this.state;

    return (
      <div>
        <h1>React GraphQL GitHub Client</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">
            Show organization for https://github.com/
          </label>
          <input
            id="url"
            type="text"
            value={value}
            onChange={this.onChange}
            style={{ width: '300px' }}
          />
          <button type="submit">Search</button>
        </form>

        <hr />

        <Query
          query={GET_ORGANIZATION}
          variables={{
            organizationLogin,
          }}
        >
          {({ data, loading, errors, fetchMore }) => {
            if (!data) {
              return <p>No information yet ...</p>;
            }

            const { organization } = data;

            if (loading) {
              return <p>Loading ...</p>;
            }

            if (errors) {
              return (
                <p>
                  <strong>Something went wrong:</strong>
                  {errors.map(error => error.message).join(' ')}
                </p>
              );
            }

            return (
              <Organization organization={organization} />
            );
          }}
        </Query>
      </div>
    );
  }
}

const Organization = ({ organization }) => (
  <div>
    <h1>
      <a href={organization.url}>{organization.name}</a>
    </h1>
  </div>
);

export default App;
{{< /highlight >}}

For the sake of completion, the implementation could even add a list of repositories which belongs to a organization. This part of the application can be used later to implement pagination and a mutation with your GraphQL client, Query component and Mutation component.

{{< highlight javascript "hl_lines=10 11 12 13 14 15 16 17 18 19 20 21 22 27 28 37 38 39 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58" >}}
...

const GET_ORGANIZATION = `
  query (
    $organizationLogin: String!,
  ) {
    organization(login: $organizationLogin) {
      name
      url
      repositories(first: 5) {
        edges {
          node {
            id
            name
            url
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

const isWatch = viewerSubscription =>
  viewerSubscription === 'SUBSCRIBED';

...

const Organization = ({ organization }) => (
  <div>
    <h1>
      <a href={organization.url}>{organization.name}</a>
    </h1>
    <Repositories
      repositories={organization.repositories}
    />
  </div>
);

const Repositories = ({ repositories }) => (
  <div>
    <ul>
      {repositories.edges.map(repository => (
        <li key={repository.node.id}>
          <a href={repository.node.url}>{repository.node.name}</a>{' '}
          {repository.node.watchers.totalCount}
          {isWatch(repository.node.viewerSubscription)
            ? ' Watched by you'
            : ' Not watched by you'
          }
        </li>
      ))}
    </ul>
  </div>
);

export default App;
{{< /highlight >}}

The GraphQL query should work for you by using the Query component. But it only works for the initial request and not when searching for another GitHub organization with the input element. That's because the Query component executes the GraphQL query only once when it mounted, but not again when the variables, in this case the `organizationLogin`, changes. So let's add this little feature in the Query component.

{{< highlight javascript "hl_lines=2 17 18 19 20 21 22 23" >}}
import React from 'react';
import { isEqual } from 'lodash';

import withClient from './withClient';

class Query extends React.Component {
  state = {
    data: null,
    loading: null,
    errors: null,
  };

  componentDidMount() {
    ...
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.variables, prevProps.variables)) {
      const { query, variables } = this.props;

      this.query({ query, variables });
    }
  }

  query = ({ query, variables }) => {
    ...
  };

  render() {
    ...
  }
}

export default withClient(Query);
{{< /highlight >}}

In this case, {{% a_blank "lodash" "https://lodash.com/" %}} is used to make an equal check on the previous and next variables which are passed as props to the Query component. So don't forget to install lodash or any other utility library which can do the check for you.

{{< highlight javascript >}}
npm install lodash --save
{{< /highlight >}}

Thus, once the variables change, the GraphQL query is executed again. When you try your application, the search for another GitHub organization should work, because when your variable for the `organizationLogin` changes on a submit click, the GraphQL query in the Query component executes again.

{{% chapter_header "Implementing the Query component with Pagination in React" "react-query-pagination-component" %}}

There is one essential part missing in the Query component. It only fetches the first page of repositories, but there is no way of fetching the next page of it. You will have to implement a mechanism to execute a query which fetches more pages from the GraphQL backend. So let's extend the Query component.

{{< highlight javascript "hl_lines=7 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 43 44" >}}
...

class Query extends React.Component {
  state = {
    data: null,
    loading: null,
    fetchMoreLoading: null,
    errors: null,
  };

  componentDidMount() {
    ...
  }

  componentDidUpdate(prevProps) {
    ...
  }

  query = ({ query, variables }) => {
    ...
  };

  queryMore = ({ query, variables }) => {
    this.props.client
      .query({ query, variables })
      .then(result =>
        this.setState(state => ({
          data: this.props.resolveFetchMore(result.data.data, state),
          errors: result.data.errors,
          fetchMoreLoading: false,
        })),
      )
      .catch(error =>
        this.setState({
          errors: [error],
          fetchMoreLoading: false,
        }),
      );
  };

  render() {
    return this.props.children({
      ...this.state,
      fetchMore: this.queryMore,
    });
  }
}

export default withClient(Query);
{{< /highlight >}}

The `queryMore()` method, which is exposed to the outside world with the children function as `fetchMore()` function, is used in a similar way than the `query()` method. You only switch from a declarative query execution to a imperative query execution by using the `fetchMore()` function in the outside world now. There you have to pass in a query and variables, probably with some kind of pagination argument, to the function.

The one crucial difference to the `query()` method is the `resolveFetchMore()` function which is passed to the Query component as prop. It is used when a query resolves successfully in order to merge the result with the component state. You can define from the outside on how to merge both information.

So let's see how this would work. First, the query needs to provide a cursor argument in the case of the GitHub GraphQL API to fetch another page of repositories. Moreover you will need the additional `pageInfo` field to retrieve the cursor for the next page and to see whether there is a next page in the first place.

{{< highlight javascript "hl_lines=4 9 10 11 12 13" >}}
const GET_ORGANIZATION = `
  query (
    $organizationLogin: String!,
    $cursor: String
  ) {
    organization(login: $organizationLogin) {
      name
      url
      repositories(first: 5, after: $cursor) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            id
            name
            url
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

Second, the `fetchMore()` function can be accessed in the Query's children as a function. The function can be passed down as a wrapped higher-order function to the next component which would make actual use of it. By doing it this way, the next component hasn't to worry anymore about passing arguments to the function. It is already handled in the App component.

{{< highlight javascript "hl_lines=3 4 5 22 24 30 31 32 33 34 35 36 37 38 39" >}}
...

const resolveFetchMore = (data, state) => {
 ...
}

class App extends Component {
  ...

  render() {
    const { organizationLogin, value } = this.state;

    return (
      <div>
        ...

        <Query
          query={GET_ORGANIZATION}
          variables={{
            organizationLogin,
          }}
          resolveFetchMore={resolveFetchMore}
        >
          {({ data, loading, errors, fetchMore }) => {
            ...

            return (
              <Organization
                organization={organization}
                onFetchMoreRepositories={() =>
                  fetchMore({
                    query: GET_ORGANIZATION,
                    variables: {
                      organizationLogin,
                      cursor:
                        organization.repositories.pageInfo.endCursor,
                    },
                  })
                }
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

...

export default App;
{{< /highlight  >}}

Third, the Repositories component can use the function to fetch the next page of the paginated list of repositories by providing a button for it. The button is only available when there is a next page of the paginated list.

{{< highlight javascript "hl_lines=3 11 18 25 26 27" >}}
const Organization = ({
  organization,
  onFetchMoreRepositories,
}) => (
  <div>
    <h1>
      <a href={organization.url}>{organization.name}</a>
    </h1>
    <Repositories
      repositories={organization.repositories}
      onFetchMoreRepositories={onFetchMoreRepositories}
    />
  </div>
);

const Repositories = ({
  repositories,
  onFetchMoreRepositories,
}) => (
  <div>
    <ul>
      ...
    </ul>

    {repositories.pageInfo.hasNextPage && (
      <button onClick={onFetchMoreRepositories}>More</button>
    )}
  </div>
);
{{< /highlight >}}

Last but not least, you have to implement the `resolveFetchMore()` function which was already passed in a previous step to the Query component. In this function, you have access to the query result when fetching another page and the state of the Query component.

{{< highlight javascript "hl_lines=2 3 4 5 6 7 8 9 10 11 12 13 14 15" >}}
const resolveFetchMore = (data, state) => {
  const { edges: oldR } = state.data.organization.repositories;
  const { edges: newR } = data.organization.repositories;

  const updatedRepositories = [...oldR, ...newR];

  return {
    organization: {
      ...data.organization,
      repositories: {
        ...data.organization.repositories,
        edges: updatedRepositories,
      },
    },
  };
};
{{< /highlight >}}

Basically the function only merges the edges of the repositories from the state and from the new result into a new list of edges. This list is used in the returned object which is used in the Query function for the `data` property in the state (check again the Query component to verify it).

After all, by having this resolving function, you can decide on how to treat a paginated query by merging component state of the Query component and the query result into a new state for the Query component.

{{% chapter_header "Implementing the Mutation component in React" "implementing-react-mutation-component" %}}

So far, you have implemented the data reading part with your own GraphQL client by using a Query component. It even has an implementation for pagination. Now you are going to implement the counterpart: the Mutation component. A minimal implementation for this component could be the following:

{{< highlight javascript >}}
import React from 'react';

import withClient from './withClient';

class Mutation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loading: null,
      errors: null,
    };
  }

  mutate = ({
    mutation = this.props.mutation,
    variables = this.props.variables,
  }) => {
    const { client } = this.props;

    client
      .mutate({ mutation, variables })
      .then(result => {
        this.setState({
          data: result.data.data,
          errors: result.data.errors,
          loading: false,
        });
      })
      .catch(error =>
        this.setState({
          errors: [error],
          loading: false,
        }),
      );
  };

  render() {
    return this.props.children(this.mutate, this.state);
  }
}

export default withClient(Mutation);
{{< /highlight >}}

It is similar to the initial Query component except for three things: the render method, the arguments which are passed to mutate method, and the point in time when the mutate method is executed.

First, the render method gives not only access to the state of the component to the outside world, but also to the mutate method to use it imperatively from the outside. Second, the arguments passed to the mutate method are either the argument which are passed to the mutate method at the point of execution or the props passed to the Mutation component as fallback. And third, the mutate method which is exposed to the outside as function is used at any point in time. But not when the Mutation component did mount as it did in the Query component. So it is up to the user of the Mutation component to trigger it.

So how to use it in your App component's file? First, you can implement a mutation which works for GitHub's GraphQL API.

{{< highlight javascript >}}
const WATCH_REPOSITORY = `
  mutation($id: ID!, $viewerSubscription: SubscriptionState!) {
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
{{< /highlight >}}

And second, you can use the new Mutation component in your Repositories component for each repository to watch or unwatch it on GitHub with the mutation.

{{< highlight javascript "hl_lines=2 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41" >}}
...
import { Query, Mutation } from './my-graphql-client-react';

...

const Repositories = ({
  repositories,
  onFetchMoreRepositories,
}) => (
  <div>
    <ul>
      {repositories.edges.map(repository => (
        <li key={repository.node.id}>
          ...

          <Mutation
            mutation={WATCH_REPOSITORY}
          >
            {(toggleWatch, { data, loading, errors }) => (
              <button
                type="button"
                onClick={() =>
                  toggleWatch({
                    variables: {
                      id: repository.node.id,
                      viewerSubscription: isWatch(
                        repository.node.viewerSubscription,
                      )
                        ? 'UNSUBSCRIBED'
                        : 'SUBSCRIBED',
                    },
                  })
                }
              >
                {repository.node.watchers.totalCount}
                {isWatch(repository.node.viewerSubscription)
                  ? ' Unwatch'
                  : ' Watch'}
              </button>
            )}
          </Mutation>
        </li>
      ))}
    </ul>

    ...
  </div>
);
{{< /highlight >}}

The Mutation component gives you access to the actual mutation function and the mutation result in its child as a function. So afterward the button can use the function to watch or unwatch the repository. In this case, the variables are passed in the actual mutate function. But you could pass them in the Mutation component too.

You may notice that your mutation works only once now. Every other mutation keeps staying a watch or unwatch mutation with the same count of watchers. It doesn't toggle between watch and unwatch. This is due to the repository prop itself (with the `viewerSubscription` and the `totalCount` properties) which doesn't change after a mutation, because it is a prop which comes from the Query component from somewhere above. It is managed in the Query component and not in the Mutation component. So what you may want is to manage the data in the Mutation component instead to update it accordingly after a mutation.

{{< highlight javascript "hl_lines=10 20 26" >}}
import React from 'react';

import withClient from './withClient';

class Mutation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.initial,
      loading: null,
      errors: null,
    };
  }

  mutate = ({
    mutation = this.props.mutation,
    variables = this.props.variables,
  }) => {
    const { client, resolveMutation } = this.props;

    client
      .mutate({ mutation, variables })
      .then(result => {
        this.setState(state => ({
          data: resolveMutation(result.data.data, state),
          errors: result.data.errors,
          loading: false,
        }));
      })
      .catch(error =>
        this.setState({
          errors: [error],
          loading: false,
        }),
      );
  };

  render() {
    return this.props.children(this.mutate, this.state);
  }
}

export default withClient(Mutation);
{{< /highlight >}}

The previous additions to the Mutation component implemented the two previously mentioned requirements.

* The Mutation component has to take over the state of the data which is going to be mutated. In this case, the `initial` prop makes it possible to set an initial state with the data which it should take over.

* The Mutation component needs a way to update the state after a successful mutation to retrieve the recent data from it. In this case, the `resolveMutation()` function, which is passed as prop to the Mutation component, is used to merge the Mutation component state with the mutation result to a new Mutation component state. It is similar to the `resolveFetchMore()` function from the Query component which was used for the pagination.

After these improvements, you can update the usage of the Mutation component in your GitHub client application. First, you can give it the initial state by using the prop for it. The initial state should give you all the information you need within your Mutation component's render prop function.

{{< highlight javascript "hl_lines=1 2 3 16 17 18 19 20 21 22 23 32 33 34 41 42" >}}
const resolveWatchMutation = (data, state) => {
  ...
};

const Repositories = ({
  repositories,
  onFetchMoreRepositories,
}) => (
  <div>
    <ul>
      {repositories.edges.map(repository => (
        <li key={repository.node.id}>
          <a href={repository.node.url}>{repository.node.name}</a>{' '}
          <Mutation
            mutation={WATCH_REPOSITORY}
            initial={{
              repository: {
                viewerSubscription:
                  repository.node.viewerSubscription,
                totalCount: repository.node.watchers.totalCount,
              },
            }}
            resolveMutation={resolveWatchMutation}
          >
            {(toggleWatch, { data, loading, errors }) => (
              <button
                type="button"
                onClick={() =>
                  toggleWatch({
                    variables: {
                      id: repository.node.id,
                      viewerSubscription: isWatch(
                        data.repository.viewerSubscription,
                      )
                        ? 'UNSUBSCRIBED'
                        : 'SUBSCRIBED',
                    },
                  })
                }
              >
                {data.repository.totalCount}
                {isWatch(data.repository.viewerSubscription)
                  ? ' Unwatch'
                  : ' Watch'}
              </button>
            )}
          </Mutation>
        </li>
      ))}
    </ul>

    ...
  </div>
);
{{< /highlight >}}

So rather than letting someone from the outside boundaries of the Mutation component dictate the data, the Mutation component is taking over and you only use the data provided by its child function to render everything. Thus, once you execute the mutation, the data (the state of the Mutation component) should change and the new data (state) should be reflected in the return value of the child function. What's missing is the part to update the Mutation component's state by using the `resolveMutation` function. It could look like the following to merge the previous state with the mutation result to a new state object.

{{< highlight javascript "hl_lines=2 3 4 5 6 7 8 9 10 11 12 13" >}}
const resolveWatchMutation = (data, state) => {
  const { totalCount } = state.data.repository;
  const { viewerSubscription } = data.updateSubscription.subscribable;

  return {
    repository: {
      viewerSubscription,
      totalCount:
        viewerSubscription === 'SUBSCRIBED'
          ? totalCount + 1
          : totalCount - 1,
    },
  };
}
{{< /highlight >}}

This resolving function updates the Mutation component's internal state (see again the Mutation component's usage of the resolving function). It takes the `totalCount` of watchers of the repository and increments or decrements it based on the `viewerSubscription` property coming from the mutation result. Afterward, the new state is passed as data to the Mutation component's child function. What's important is that the resolving function has to return the identical structure of the data which was provided to the Mutation component with the `initial` prop. Otherwise, your rendering may break because suddenly the data from the render prop function hasn't the identical structure anymore.

One last improvement can be made to the Mutation component. What happens if the props which were used for the `initial` prop of the Mutation component change? For instance, the repository which comes from the Query component may change due to a user interaction. In the Mutation component, nothing would reflect this update. So you can add a lifecycle method to the Mutation component to update its local state when a new `initial` prop comes in.

{{< highlight javascript "hl_lines=2 17 18 19 20 21" >}}
import React from 'react';
import { isEqual } from 'lodash';

import withClient from './withClient';

class Mutation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.initial,
      loading: null,
      errors: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.initial, prevProps.initial)) {
      this.setState({ data: this.props.initial });
    }
  }

  ...
}

export default withClient(Mutation);
{{< /highlight >}}

Now, everything should be in place for the Mutation component. It manages its own state and the state is used as data in the Mutation component's render prop function. After all, that's it for implementing a Mutation component which handles the GraphQL mutation by using your GraphQL client in a React application.

<hr class="section-divider">

In the end, I want to mention the big difference between this lightweight GraphQL client compared to a sophisticated GraphQL client such as Apollo Client. Obviously the Apollo Client has more features, maybe has better performance, and gives you more options. But the key difference is where the data is stored. Whereas Apollo Client has a central cache to manage all (normalized) data, this lightweight GraphQL client manages the data not in the GraphQL client but in the intermediate Query and Mutation components. Thus they are only locally available to the React components which are using the Query and Mutation components and to the components below them by using React's props.

After all, I hope the implementation of your own GraphQL client in React has shown you that it is not too complicated to implement such things. It should be an inspiration for you to contribute to the GraphQL and React ecosystem with your own libraries. Maybe you want to implement your own more sophisticated GraphQL client library on top of the previously implemented ideas. It would be refreshing for the ecosystem around GraphQL in JavaScript. So don't hesitate to contribute to it. Last but not least, you can find the previously implemented GraphQL client as {{% a_blank "library and repository on GitHub" "https://github.com/rwieruch/react-graphql-client-library" %}}. Check it out to implement your own solution on top of it and open source it on npm as library. I am looking forward to it, so please reach out to me if you have implemented something for the ecosystem.

{{% read_more "A minimal Apollo Client in React Example" "https://www.robinwieruch.de/react-apollo-client-example" %}}