+++
title = "A apollo-link-state Tutorial for Local State Management"
description = "A tutorial about how to use Apollo Link State as local state management solution in a React application when having a GraphQL powered server in the first place. The example shows you how to use Apollo Link State instead of React's Local State, but also instead of Redux or MobX to manage global state ..."
date = "2018-05-04T06:50:46+02:00"
tags = ["React", "GraphQL", "Apollo", "JavaScript"]
categories = ["React", "GraphQL", "Apollo", "JavaScript"]
keywords = ["apollo link state tutorial", "apollo link state example", "apollo link state local state", "apollo link state local state management", "apollo link state react", "react graphql book", "react graphql apollo book"]
news_keywords = ["apollo link state tutorial", "apollo link state example", "apollo link state local state", "apollo link state local state management", "apollo link state react", "react graphql book", "react graphql apollo book"]
hashtag = "#ReactJs #GraphQL"
card = "img/posts/react-apollo-link-state-tutorial/banner_640.jpg"
banner = "img/posts/react-apollo-link-state-tutorial/banner.jpg"
contribute = "react-apollo-link-state-tutorial.md"
headline = "A apollo-link-state Tutorial for Local State Management"

summary = "A tutorial about how to use Apollo Link State as local state management solution in a React application when having already a GraphQL powered server in the first place. The example shows you how to use Apollo Link State instead of React's Local State, but also instead of Redux or MobX to manage global state."
+++

{{% pin_it_image "apollo link state tutorial" "img/posts/react-apollo-link-state-tutorial/banner.jpg" "is-src-set" %}}

{{% react-graphql-book %}}

{{% read_before_2 "This tutorial is part 3 of 3 in this series." "Part 1:" "A complete React with GraphQL Tutorial" "https://www.robinwieruch.de/react-with-graphql-tutorial/" "Part 2:" "A complete React with Apollo and GraphQL Tutorial" "https://www.robinwieruch.de/react-graphql-apollo-tutorial/" %}}

There are many people out there questioning how to deal with local data in a React application when using Apollo Client for remote data with its queries and mutations. As shown in previous applications, it can be done with React's local state management. When the state management for the local data [reaches a point where it becomes too complex](https://www.robinwieruch.de/learn-react-before-using-redux/), it may be beneficial to introduce a state management library such as [Redux or MobX](https://www.robinwieruch.de/redux-mobx-confusion/). However, this leaves the issue of not having a single source of truth as state. There are two state layer then. This issue is revisited in a later section of this book, where I will point out how to use Redux side by side with Apollo Client. There you will find out more about using Redux or Apollo Link State.

In this section though, I want to show how to use {{% a_blank "apollo-link-state" "https://www.apollographql.com/docs/link/links/state.html" %}} instead of introducing Redux or MobX in an React example application. When using Apollo Link State, the Apollo Client Cache becomes your single source of truth for state. It manages remote data and local data then.

However, it is still important to remember that React's local state is often sufficient when dealing with co-located state, which is not reaching outside to the general application but is close to its components, even though there is a sophisticated state management layer in place. You apply the same rules as for introducing Redux or MobX: React's local state stays important even with sophisticated state management solutions such as Redux, MobX or Apollo Link State. Not everything belongs in the global state which is established by these libraries.

{{% chapter_header "Table of Contents" "toc" %}}

* [Introducing Apollo's Local State Management in React](#apollo-local-state-management-react)
* [Starting with React's Local State Management for Local Data](#react-local-data)
* [Setup of Apollo Link State: Resolvers and Defaults](#apollo-link-state-resolver-defaults)
* [Apollo Link State for Local State: Read Data](#apollo-link-state-query)
* [Apollo Link State for Local State: Write Data](#apollo-link-state-mutation)
* [Async Query Resolver and Device Data](#apollo-link-state-async-query-resolver)

{{% chapter_header "Introducing Apollo's Local State Management in React" "apollo-local-state-management-react" %}}

In the following case study application, you will consume GitHub's GraphQL API to query a bunch of repositories from an organization. You have learned those steps before. Basically it is how your remote data is managed in Apollo Client's Cache. However, this time you will introduce local data along the way. Imagine a use case where you would have to select the queried repositories in a list to make a batch operation (e.g. mutation) on them. For instance, you maybe want to star 3 of the 10 repositories. Therefore, you would have to introduce local data to track the selected repositories which are managed in a local state. In the following you will implement this use case, first by using React's local state but then transition to Apollo Link State as alternative.

It is up to you to create a React application with {{% a_blank "create-react-app" "https://github.com/facebook/create-react-app" %}}. Afterward, you will have to setup Apollo Client in your React application as you have done in previous applications in the *src/index.js* file.

{{< highlight javascript >}}
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

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

const client = new ApolloClient({
  link: httpLink,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
{{< /highlight >}}

Don't forget to install the necessary packages for GraphQL, Apollo Client and React Apollo on the command line:

{{< highlight javascript >}}
npm install --save apollo-client apollo-cache-inmemory apollo-link-http graphql graphql-tag react-apollo
{{< /highlight >}}

And furthermore, don't forget to add your {{% a_blank "personal access token" "https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/" %}} from GitHub as value to the `REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN` key to the *.env* file which you have to create in your project folder.

In the next step, implement the components to display the remote data which gets queried with React Apollo's Query component eventually.

{{< highlight javascript >}}
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import './App.css';

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  {
    organization(login: "the-road-to-learn-react") {
      repositories(first: 20) {
        edges {
          node {
            id
            name
            url
            viewerHasStarred
          }
        }
      }
    }
  }
`;

const App = () => (
  <Query query={GET_REPOSITORIES_OF_ORGANIZATION}>
    {({ data: { organization }, loading }) => {
      if (loading || !organization) {
        return <div>Loading ...</div>;
      }

      return (
        <RepositoryList repositories={organization.repositories} />
      );
    }}
  </Query>
);

const RepositoryList = ({ repositories }) => (
  <ul>
    {repositories.edges.map(({ node }) => {
      return (
        <li key={node.id}>
          <a href={node.url}>{node.name}</a>
        </li>
      );
    })}
  </ul>
);

export default App;
{{< /highlight >}}

Once you run this application, you should see initially a loading indicator and afterward the list of repositories fetched from the defined GitHub organization in your GraphQL query. In addition, it could be possible to star a repository by executing a GraphQL mutation with the Mutation component.

{{< highlight javascript "hl_lines=3 7 8 9 10 11 12 13 14 15 16 25 26 33 34 35 36 37 38 39 40 41" >}}
import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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

const RepositoryList = ({ repositories }) => (
  <ul>
    {repositories.edges.map(({ node }) => {
      return (
        <li key={node.id}>
          <a href={node.url}>{node.name}</a>{' '}
          {!node.viewerHasStarred && <Star id={node.id} />}
        </li>
      );
    })}
  </ul>
);

const Star = ({ id }) => (
  <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
    {starRepository => (
      <button type="button" onClick={starRepository}>
        Star
      </button>
    )}
  </Mutation>
);

export default App;
{{< /highlight >}}

Nevertheless, there are a couple of potential improvements that you can do as exercise already before continuing with the tutorial. For instance, there is only a star mutation but not a unstar mutation when the repository is already starred. Another thing could be a search field to pass in a dynamic login of an organization to be flexible in querying repositories from different organizations. All of these improvements are up to your implementation to internalize the learnings from previous applications which you have built while learning about GraphQL in React.

### Exercises:

* implement the unstar mutation
* implement a flexible way to query repositories from different organizations
  * implement a search field that is managed with React's local state
  * when submitting the value from the search field, pass this value as variable to the Query component to use it as dynamic value for the `login` argument

{{% chapter_header "Starting with React's Local State Management for Local Data" "react-local-data" %}}

Another requirement for this application was it to be able to select (and unselect) repositories in the list of repositories for performing batch operations. Such a batch operation could be to star (and unstar) selected repositories. Before being able to execute such an operation, it must be possible to select the repositories from the list in the first place. Therefore, React's local state management is the most straight forward choice for this problem to keep track of selected repositories. Each rendered repository row will have a button next to it. When clicking the button, the repository's identifier will be stored in React's local state. When clicking it again, the identifier will be removed again.

In order to keep the components lightweight and suited to their responsibilities (e.g. fetching data, rendering data), you can introduce a Repositories component which is used as container component in between of the App component and the RepositoryList component to manage local state.

{{< highlight javascript "hl_lines=9" >}}
const App = () => (
  <Query query={GET_REPOSITORIES_OF_ORGANIZATION}>
    {({ data: { organization }, loading }) => {
      if (loading || !organization) {
        return <div>Loading ...</div>;
      }

      return (
        <Repositories repositories={organization.repositories} />
      );
    }}
  </Query>
);
{{< /highlight >}}

The Repositories component in between manages the state of selected repositories by storing their identifiers in React's local state. in the end, it renders the RepositoryList component which was rendered previously in the App component. After all, you only introduced a component in between which has the responsibility to manage local state (container component) while the RepositoryList component only needs to render data (presentational component).

{{< highlight javascript >}}
class Repositories extends React.Component {
  state = {
    selectedRepositoryIds: [],
  };

  toggleSelectRepository = (id, isSelected) => {
    ...
  };

  render() {
    return (
      <RepositoryList
        repositories={this.props.repositories}
        selectedRepositoryIds={this.state.selectedRepositoryIds}
        toggleSelectRepository={this.toggleSelectRepository}
      />
    );
  }
}
{{< /highlight >}}

Now implement the business logic of the class method in Repositories component which adds and removes (toggles) the identifier of a repository depending on its incoming selection state.

{{< highlight javascript "hl_lines=7 8 9 10 11 12 13" >}}
class Repositories extends React.Component {
  state = {
    selectedRepositoryIds: [],
  };

  toggleSelectRepository = (id, isSelected) => {
    let { selectedRepositoryIds } = this.state;

    selectedRepositoryIds = isSelected
      ? selectedRepositoryIds.filter(itemId => itemId !== id)
      : selectedRepositoryIds.concat(id);

    this.setState({ selectedRepositoryIds });
  };

  render() {
    ...
  }
}
{{< /highlight >}}

Since the list of selected repository identifiers and the class method to actually toggle a repository are passed to the RepositoryList component, you can implement a new Select component there to make use of those props.

{{< highlight javascript "hl_lines=3 4 8 12 13 14 15 16" >}}
const RepositoryList = ({
  repositories,
  selectedRepositoryIds,
  toggleSelectRepository,
}) => (
  <ul>
    {repositories.edges.map(({ node }) => {
      const isSelected = selectedRepositoryIds.includes(node.id);

      return (
        <li key={node.id}>
          <Select
            id={node.id}
            isSelected={isSelected}
            toggleSelectRepository={toggleSelectRepository}
          />{' '}
          <a href={node.url}>{node.name}</a>{' '}
          {!node.viewerHasStarred && <Star id={node.id} />}
        </li>
      );
    })}
  </ul>
);
{{< /highlight >}}

The Select component is only a button which acts as toggle to select and unselect a repository.

{{< highlight javascript >}}
const Select = ({ id, isSelected, toggleSelectRepository }) => (
  <button
    type="button"
    onClick={() => toggleSelectRepository(id, isSelected)}
  >
    {isSelected ? 'Unselect' : 'Select'}
  </button>
);
{{< /highlight >}}

The select interaction should work after starting your application. It is indicated by a toggling "Select" and "Unselect" label after clicking the new button multiple times. But you can do better by adding some conditional styling to each row in the RepositoryList component.

{{< highlight javascript "hl_lines=6 8 9 10 13" >}}
const RepositoryList = ({ ... }) => (
  <ul>
    {repositories.edges.map(({ node }) => {
      const isSelected = selectedRepositoryIds.includes(node.id);

      const rowClassName = ['row'];

      if (isSelected) {
        rowClassName.push('row_selected');
      }

      return (
        <li className={rowClassName.join(' ')} key={node.id}>
          ...
        </li>
      );
    })}
  </ul>
);
{{< /highlight >}}

Last but not least, you have to define the CSS classed which were used for the repository row in the *src/App.css* file:

{{< highlight javascript >}}
.row {
  padding: 5px;
}

.row:hover {
  background-color: lightblue;
}

.row_selected {
  background-color: orange;
}

.row_selected:hover {
  background-color: orange;
}
{{< /highlight >}}

That's it for the selection feature implementation. You should be able to select and unselect repositories in your list when starting your application. Remember that this solution with React's local state would already be sufficient to deal with this problem. No one else than the one component is interested in the selected repositories. So the state is co-located to the component. The application can be found in this {{% a_blank "GitHub repository as boilerplate project" "https://github.com/rwieruch/react-apollo-client-example" %}}. However, for the sake of demonstrating a Apollo Link State in this application example, this implementation will be refactored from React's local state to Apollo Link State in the following steps.

{{% chapter_header "Setup of Apollo Link State: Resolvers and Defaults" "apollo-link-state-resolver-defaults" %}}

In order to manage the list of identifiers in Apollo Client's Cache instead of React's local state, you have to install Apollo Link State on the command line first. In addition, you have to install the Apollo Link package for combining multiple links for your Apollo Client creation.

{{< highlight javascript >}}
npm install --save apollo-link apollo-link-state
{{< /highlight >}}

Now comes to the Apollo Link State setup, but as you have learned before, Apollo Links can be composed in a straight forward way by using the Apollo Link package. You have already set up the Apollo HTTP Link. Now it is accompanied by the Apollo Link State in the composition. The composed link can then be used by the Apollo Client creation.

{{< highlight javascript "hl_lines=5 7 12 13 14 15 16 18 21" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';

...

const stateLink = withClientState({
  cache,
  defaults: {},
  resolvers: {},
});

const link = ApolloLink.from([stateLink, httpLink]);

const client = new ApolloClient({
  link,
  cache,
});

...
{{< /highlight >}}

It is important to have the `stateLink` not far away from the end of your link chain, but it shouldn't be the last terminating link (in this case the `httpLink`) which makes the network requests. If you would add the Apollo Link Error package, the `stateLink` should come after it, so that the `errorLink` can deal with the errors on behalf of it.

The `withClientState()` is a new function from Apollo Link State to create an instance of the link. It takes an object with a Apollo Client Cache instance, defaults and resolvers. You already have the cache, so what's left to explain are the defaults and resolvers.

The **Apollo Link State Defaults** are used to define an initial state for the Apollo Client's Cache. After all, the Apollo Link State is used to manage a state object. So it is mandatory to have an initial state for it. Otherwise your later introduced local queries and mutations may hit an undefined local state which would lead to an error.

The **Apollo Link State Resolvers** is a map of mutation and query functions for implementing the logic of these **local GraphQL operations**. If you have implemented a GraphQL server before, you may be aware of these resolver functions already. For instance, in case of a query, they may be used to retrieve the remote data from a database. On the other side, in case of a mutation, they are used to alter the remote data in the database. That's for the server-side though. On the client-side, you can define those resolver functions when using Apollo Link State too. But they are used to retrieve local data from the local state or to alter local data in the local state. The normal case is that there is no remote data involved at all.

In your setup, the `resolvers` and `defaults` are empty objects. You will use both of them in the next sections to read and write local data to your local state with Apollo Link State instead of using React's local state for it. This way, you will have a better understanding of what they are really used for.

{{% chapter_header "Apollo Link State for Local State: Read Data" "apollo-link-state-query" %}}

So how to read and write data to the local state? You will do it with GraphQL queries and mutations, but this time they will be used for local data instead of remote data. That's why you have set up Apollo Link State to manage this local data for you instead of React's local state.

First, let's give the `defaults` a filled initial state object when creating the Apollo Link State instance for the sake of querying it afterward. In your application, you have queried a list of repositories before. Since the local state in Apollo Link State should store a list of repository identifiers to keep track of selected repositories, you can insert one of the queried repository identifiers in it. This repository should be pre-selected then when starting the application. In the case of the `the-road-to-learn-react` organization which you may have queried before, one of the queried repositories has the id `MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw==`. So you can go with this one in your initial state object and use the object for the defaults configuration.

{{< highlight javascript "hl_lines=3 4 5 9" >}}
...

const initialState = {
  selectedRepositoryIds: ['MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw=='],
};

const stateLink = withClientState({
  cache,
  defaults: initialState,
  resolvers: {},
});

...
{{< /highlight >}}

Second, since this state is defined in the local state of Apollo Link State, you can remove React's local state for the list of repository identifiers from the Repository component. In addition, you can remove the handler which toggles the repository selection. After removing all this implementations, the Repositories component becomes a functional stateless component again.

{{< highlight javascript "hl_lines=1 2 3 4 5 6" >}}
const Repositories = ({ repositories }) => (
  <RepositoryList
    repositories={repositories}
    selectedRepositoryIds={selectedRepositoryIds}
  />
);
{{< /highlight >}}

So where does the list of selected repository identifiers come from? Since they are in Apollo Client's Cache due to Apollo Link State and not in React's local state anymore, you can query them with a normal GraphQL query and the Query component which you have used before for querying remote data. This time they are used for querying local data though.

{{< highlight javascript "hl_lines=1 2 3 4 5 10 11 16 17" >}}
const GET_SELECTED_REPOSITORIES = gql`
  query {
    selectedRepositoryIds @client
  }
`;

...

const Repositories = ({ repositories }) => (
  <Query query={GET_SELECTED_REPOSITORIES}>
    {({ data: { selectedRepositoryIds } }) => (
      <RepositoryList
        repositories={repositories}
        selectedRepositoryIds={selectedRepositoryIds}
      />
    )}
  </Query>
);
{{< /highlight >}}

The query for local data works almost identical to the query for remote data. There is only one difference: the @client directive. As you may have learned before, there exist directives such as the @skip or @include directive in the GraphQL specification. Apollo came up with an own directive to annotate objects and fields in a query (or mutation) as local data. Basically the @client directive tells Apollo Client Cache to look up the data in the local state instead of doing a network request.

Just for the sake of demonstration, the @client directive affects all underlying fields too. So when annotating a field which fields itself, all the underlying fields are derived from the local state too.

{{< highlight javascript >}}
const GET_SELECTED_REPOSITORIES = gql`
  query {
    repositoryInformation @client {
      selectedRepositoryIds
    }
  }
`;
{{< /highlight >}}

Since a GraphQL operation is fine-tuned of a field level, the @client directive can be used for only a part of the data. All the remaining fields are fetched by using a network request with the Apollo HTTP Link. The following query gives you an example of how one query can be used to fetch local data and remote data.

{{< highlight javascript >}}
const GET_SELECTED_REPOSITORIES = gql`
  query {
    repositoryInformation @client {
      selectedRepositoryIds
    }
    organization {
      name
      url
    }
  }
`;
{{< /highlight >}}

Nevertheless, let's stick to the initial implementation of the query for not adding too much noise and keeping the example simple.

{{< highlight javascript >}}
const GET_SELECTED_REPOSITORIES = gql`
  query {
    selectedRepositoryIds @client
  }
`;
{{< /highlight >}}

When you start your application again, you should see that one of the repositories is selected, because you have defined the identifier in the `defaults` of the Apollo Link State initialization. Basically it is pre-selected because of the initial state. It is similar to telling React's local state to have an initial state:

{{< highlight javascript >}}
class SomeComponent extends Component {
  state = {
    selectedRepositoryIds: ['MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw=='],
  }

  render() {
    ...
  }
}
{{< /highlight >}}

The only difference is that Apollo Link State manages a global state and React' local state only a component co-located state. After all, by using Apollo Link State, you have made your state globally accessible by using GraphQL queries.

The reading local data part of the equation works. What about the writing local data part then? The Select component is broken as it is now, because in the last implementation the `toggleSelectRepository()` callback function was removed since it cannot be used anymore to update the identifiers in React's local state. The state lives in Apollo Client Cache now.

{{% chapter_header "Apollo Link State for Local State: Write Data" "apollo-link-state-mutation" %}}

You have seen how a GraphQL query is used for reading local data from the local state in the previous section. That's half of what GraphQL operations are used for (for the savvy reader: this statement is wrong, because it is only true if you don't include GraphQL subscriptions). The second half is writing local data to the local state. Whereas you have used previously a GraphQL query to read local data, now you will use a GraphQL mutation to write local data to the local state. In the Select component, you can remove the `toggleSelectRepository()` callback function which was used before to update React's local state that was removed in a previous step. In addition, the function can be removed from the RepositoryList component too.

{{< highlight javascript "hl_lines=1 14 25 26" >}}
const RepositoryList = ({ repositories, selectedRepositoryIds }) => (
  <ul>
    {repositories.edges.map(({ node }) => {
      const isSelected = selectedRepositoryIds.includes(node.id);

      const rowClassName = ['row'];

      if (isSelected) {
        rowClassName.push('row_selected');
      }

      return (
        <li className={rowClassName.join(' ')} key={node.id}>
          <Select id={node.id} isSelected={isSelected} />{' '}
          <a href={node.url}>{node.name}</a>{' '}
          {!node.viewerHasStarred && <Star id={node.id} />}
        </li>
      );
    })}
  </ul>
);

...

const Select = ({ id, isSelected }) => (
  <button type="button" onClick={() => {}}>
    {isSelected ? 'Unselect' : 'Select'}
  </button>
);
{{< /highlight >}}

Since the state managed by Apollo Link State is global now, you don't need to pass any callback functions anymore. Instead, identical to the reading local state part with the GraphQL query and Query component, you can use the Mutation component from React Apollo and a GraphQL mutation to write data to the state.

{{< highlight javascript "hl_lines=1 2 3 4 5 10 11 12 13 14 15 18 19" >}}
const SELECT_REPOSITORY = gql`
  mutation($id: ID!, $isSelected: Boolean!) {
    toggleSelectRepository(id: $id, isSelected: $isSelected) @client
  }
`;

...

const Select = ({ id, isSelected }) => (
  <Mutation
    mutation={SELECT_REPOSITORY}
    variables={{ id, isSelected }}
  >
    {toggleSelectRepository => (
      <button type="button" onClick={toggleSelectRepository}>
        {isSelected ? 'Unselect' : 'Select'}
      </button>
    )}
  </Mutation>
);
{{< /highlight >}}

The GraphQL mutation for local data isn't any different from a mutation used for remote data except for the @client directive. The directive was used for the local query too in order to signalize Apollo Client that it is a local mutation, because there is no remote data involved here.

Almost identical to the `toggleSelectRepository()` callback function which was used before to update React's local state, the exposed mutation function `toggleSelectRepository()` gets implicit access to the `id` and `isSelected` values via the variables in the Mutation component.

The big question mark: How to define on the client-side what happens after executing this mutation? If you would send this mutation to your GraphQL server, a resolver would take care about it. So that's why you can define those resolvers for your local state on the client-side, only when using Apollo Link State, as well. You can define a resolver function for the actual `toggleSelectRepository` mutation which you have used in the previously defined GraphQL mutation.

{{< highlight javascript "hl_lines=5 6 7 12 13 14 15 16" >}}
const initialState = {
  selectedRepositoryIds: [],
};

const toggleSelectRepository = (_, { id, isSelected }, { cache }) => {
  ...
};

const stateLink = withClientState({
  cache,
  defaults: initialState,
  resolvers: {
    Mutation: {
      toggleSelectRepository,
    },
  },
});

...
{{< /highlight >}}

A client-side resolver function has the same signature as an usually on the server-side used resolver function. The arguments are `parent`, `args`, `context` and `info`.

In this example, the `info` argument isn't needed and thus doesn't appear in the function signature. The same applies for the `parent` argument, but it appears in the signature because it is the first argument of it. It can be named `_` to keep it out of your sight, because it isn't used for the mutation in this example. You may wonder when you would need the `parent` argument. You may only need it when your query or mutation becomes deeply nested and fields in the particular operation need to be resolved with their own resolver functions which would naturally lead to multiple resolver functions. Then the `parent` argument can be used to pass results from one to another resolver function. In our case, you can ignore the `parent` argument because it is not needed. However, if you are curious,{{% a_blank "you can read more about it" "https://blog.graph.cool/graphql-server-basics-the-schema-ac5e2950214e#9d03" %}}.

After all, you only need the `args` and `context` arguments. While the former has all the parameters which where provided as GraphQL arguments to the GraphQL mutation, the latter has access to the Apollo Client's Cache instance. Thus, both can be used to write the local data to the local state.

Before you can write data to the local state, you often need to read data from it in order to update it. In this case, you need to read the list of selected repositories from the local state in order to update it with the new selected or unselected identifier. Therefore, you can use the same query which you have used in your Repositories component. In order to use it in the *src/index.js* file for the resolver function, you have to export it from the *src/App.js* file first:

{{< highlight javascript "hl_lines=1" >}}
export const GET_SELECTED_REPOSITORIES = gql`
  query {
    selectedRepositoryIds @client
  }
`;
{{< /highlight >}}

Afterward, you can import it in the *src/index.js* file for your resolver function:

{{< highlight javascript "hl_lines=1" >}}
import App, { GET_SELECTED_REPOSITORIES } from './App';
{{< /highlight >}}

Finally, as first step, the query can be used in the resolver function to retrieved the list of selected repository identifiers. The cache instance offers methods such as `readQuery()` or `readFragment()` to read data from it. That's why you had to import the query.

{{< highlight javascript "hl_lines=2 3 4" >}}
const toggleSelectRepository = (_, { id, isSelected }, { cache }) => {
  let { selectedRepositoryIds } = cache.readQuery({
    query: GET_SELECTED_REPOSITORIES,
  });

  ...
};
{{< /highlight >}}

In the second step, the list of selected repository identifiers can be updated with the provided information in the `args` argument.

{{< highlight javascript "hl_lines=6 7 8" >}}
const toggleSelectRepository = (_, { id, isSelected }, { cache }) => {
  let { selectedRepositoryIds } = cache.readQuery({
    query: GET_SELECTED_REPOSITORIES,
  });

  selectedRepositoryIds = isSelected
    ? selectedRepositoryIds.filter(itemId => itemId !== id)
    : selectedRepositoryIds.concat(id);

  ...
};
{{< /highlight >}}

Third, the updated data can be written with one of the `writeData()`, `writeQuery()` or `writeFragment()` methods that are available for the cache instance in order to write data. In this case, since the data was read with the `readQuery()` method, it makes most sense to write it again with the analogous method `writeQuery()` because then it matches the identical data structure requirements.

{{< highlight javascript "hl_lines=10 11 12 13" >}}
const toggleSelectRepository = (_, { id, isSelected }, { cache }) => {
  let { selectedRepositoryIds } = cache.readQuery({
    query: GET_SELECTED_REPOSITORIES,
  });

  selectedRepositoryIds = isSelected
    ? selectedRepositoryIds.filter(itemId => itemId !== id)
    : selectedRepositoryIds.concat(id);

  cache.writeQuery({
    query: GET_SELECTED_REPOSITORIES,
    data: { selectedRepositoryIds },
  });

  ...
};
{{< /highlight >}}

Last but not least, a mutation result should be returned. In this case, no result is needed in the previously used Mutation component, so it can be null.

{{< highlight javascript "hl_lines=15" >}}
const toggleSelectRepository = (_, { id, isSelected }, { cache }) => {
  let { selectedRepositoryIds } = cache.readQuery({
    query: GET_SELECTED_REPOSITORIES,
  });

  selectedRepositoryIds = isSelected
    ? selectedRepositoryIds.filter(itemId => itemId !== id)
    : selectedRepositoryIds.concat(id);

  cache.writeQuery({
    query: GET_SELECTED_REPOSITORIES,
    data: { selectedRepositoryIds },
  });

  return null;
};
{{< /highlight >}}

That's it for writing local data in Apollo's local state by using a GraphQL mutation which is only used locally. Once you start your application again, the select interaction should work. But this time, the data is stored and retrieved in/from Apollo Link State by using GraphQL operations instead of React's local state.

Last but not least, for the sake of mentioning it, when you would want to add a result to your mutation, you could start out by adding the wanted fields in the mutation definition:

{{< highlight javascript "hl_lines=3 4 5 6" >}}
const SELECT_REPOSITORY = gql`
  mutation($id: ID!, $isSelected: Boolean!) {
    toggleSelectRepository(id: $id, isSelected: $isSelected) @client {
      id
      isSelected
    }
  }
`;
{{< /highlight >}}

Next, the resolver function can return the updated result:

{{< highlight javascript "hl_lines=15" >}}
const toggleSelectRepository = (_, { id, isSelected }, { cache }) => {
  let { selectedRepositoryIds } = cache.readQuery({
    query: GET_SELECTED_REPOSITORIES,
  });

  selectedRepositoryIds = isSelected
    ? selectedRepositoryIds.filter(itemId => itemId !== id)
    : selectedRepositoryIds.concat(id);

  cache.writeQuery({
    query: GET_SELECTED_REPOSITORIES,
    data: { selectedRepositoryIds },
  });

  return { id, isSelected: !isSelected };
};
{{< /highlight >}}

And finally you would be able to access it in the Mutation's render prop child function as second argument.

{{< highlight javascript "hl_lines=6" >}}
const Select = ({ id, isSelected }) => (
  <Mutation
    mutation={SELECT_REPOSITORY}
    variables={{ id, isSelected }}
  >
    {(toggleSelectRepository, result) => (
      <button type="button" onClick={toggleSelectRepository}>
        {isSelected ? 'Unselect' : 'Select'}
      </button>
    )}
  </Mutation>
);
{{< /highlight >}}

In the end, you should be able to access the result with the previous implementations. However, in the case of this mutation it is not really needed. In case you need it in the future, you have the necessary knowledge to do it. The application which you have implemented in the previous sections can be found {{% a_blank "here as GitHub repository" "https://github.com/rwieruch/react-apollo-link-state-example" %}}.

### Exercises:

* implement select and unselect all repositories in the list mutations
* implement a batch star and unstar mutation for all selected repositories

{{% chapter_header "Async Query Resolver and Device Data" "apollo-link-state-async-query-resolver" %}}

You will not go any deeper implementation wise for this application. Instead, this last paragraph should only give you an outline what's possible with Apollo Link State. Foremost, Apollo Link State is used for **local data** which is created in the client application by having user interactions while having Apollo Client itself for **remote data**. You have used both kinds of data in the previous application. But what about other data? For instance, there could be **device data** which can be queried from a mobile phone when using Apollo Client there. Then you can use Apollo Link State as well. You can define a **async query resolver** in your Apollo Link State resolvers when setting up Apollo Client with Apollo Link State. In this resolver you can define your query (as you have done with your mutation before) and its implementation: how it accessed the device API (with optionally given arguments) and how it returns the result. In case you are interested in this topics, you have to dig deeper into the {{% a_blank "Apollo Link State documentation" "https://www.apollographql.com/docs/link/links/state.html" %}}. One could argue that every other side-effect can be done in Apollo Link State too. For instance, you can perform requests to other API endpoints in a query resolver too. However, you should be cautious when mixing different use cases into Apollo Link State. It's main focus is local data after all.

<hr class="section-divider">

The last application has shown you how to use Apollo Link State instead of React's local state to establish state management in your application for local and remote data. As mentioned, the use case isn't the best choice to demonstrate Apollo Link State, because the local data which is manage as state is only needed in one component. It would be the best choice to keep this data in React's local state to have it co-located to your component. However, if you imagine a scenario where this local data is needed and thus shared across the whole application, it might be a valid step to manage it in Apollo Link State (instead of Redux or another state management solution). Then the Apollo Client's Cache becomes the single source of truth for remote data and local data.

