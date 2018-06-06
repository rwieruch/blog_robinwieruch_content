+++
title = "A minimal Apollo Client in React Example"
description = "The tutorial guides you through building a minimal Apollo Client in React example application where Apollo Client is used for remote data and React's local state for local data. After all, it's a minimal boilerplate project to get you started with GraphQL in React ..."
date = "2018-06-05T13:50:46+02:00"
tags = ["React", "GraphQL", "Apollo", "JavaScript"]
categories = ["React", "GraphQL", "Apollo", "JavaScript"]
keywords = ["react apollo client example", "react apollo example", "react graphql boilerplate", "react graphql example", "react apollo demo", "react apollo tutorial"]
news_keywords = ["react apollo client example", "react apollo example", "react graphql boilerplate", "react graphql example", "react apollo demo", "react apollo tutorial"]
hashtag = "#ReactJs #GraphQL"
card = "img/posts/react-apollo-client-example/banner_640.jpg"
banner = "img/posts/react-apollo-client-example/banner.jpg"
contribute = "react-apollo-client-example.md"
headline = "A minimal Apollo Client in React Example"

summary = "It's time to get you started with a minimal Apollo Client in React application that can be used as boilerplate project. The application can be used as starter project for other tutorials, but also for your own ideas. After all, it gives you all the necessary parts to consume GitHub's GraphQL API in your React application by using Apollo Client in a minimal starter project."
+++

{{% sponsorship %}}

{{% pin_it_image "react apollo client example" "img/posts/react-apollo-client-example/banner.jpg" "is-src-set" %}}

{{% react-graphql-book %}}

{{% read_before_2 "This tutorial is part 3 of 3 in this series." "Part 1:" "A complete React with GraphQL Tutorial" "https://www.robinwieruch.de/react-with-graphql-tutorial/" "Part 2:" "A complete React with Apollo and GraphQL Tutorial" "https://www.robinwieruch.de/react-graphql-apollo-tutorial/" %}}

It's time to get you started with a minimal Apollo Client in React application that can be used as boilerplate project. There will be sections later on where you can use this application as starter project, but also you may want to experiment with it on your own. After all, it gives you all the necessary parts to consume GitHub's GraphQL API in your React application by using Apollo Client in a minimal starter project. In addition though, there will be some local state management with React only to show you that local state management for local data is still used when having Apollo Client for your remote data.

{{% chapter_header "Apollo Client in React Starter Project" "apollo-client-react-starter-project" %}}

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

And furthermore, don't forget to add your {{% a_blank "personal access token" "https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/" %}} from GitHub as value to the key in the *.env* file which you have to create in your project folder.

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

That's it for the selection feature implementation. You should be able to select and unselect repositories in your list when starting your application now.

<hr class="section-divider">

Remember that this solution with React's local state would already be sufficient to deal with this problem. No one else than the one component is interested in the selected repositories. So the state is co-located to the component. But following applications will show you how to replace React's local state management with Apollo Link State or Redux which is used side by side with Apollo Client. The minimal boilerplate application can be found in this {{% a_blank "GitHub repository as boilerplate project" "https://github.com/rwieruch/react-apollo-client-example" %}}.