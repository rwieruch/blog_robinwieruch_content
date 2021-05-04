---
title: "API Design for a React Tree Table"
description: "On how to create an asynchronous tree table in React with lots of data and its API decisions I had to make along the way ..."
date: "2021-04-29T03:55:46+02:00"
categories: ["React"]
keywords: ["react tree table", "react tree list"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A recent React freelance project of mine offered me a challenging task: The client wanted to have a tree table component in React. The role model for this was MacOS's Finder and its tree view; and as a cherry on top: it should be able to fetch asynchronously up to 100.000 items in chunks as paginated and nested lists.

Over the next months, I built this component for my freelance client. Before I started the implementation, I wrote down all the challenges I'd face along the way and how I'd solve them. Here I want to give you a walkthrough of my thought process, how I designed the API requirements, and how I implemented this tree table component in React eventually.

The focus for this article is on the API design decisions. In hindsight, starting with the remote data API specification first was the best decision I made for this project. Only when you have a well-designed API for your table requirements, you can build the frontend and backend properly.

For what it's worth: None of the existing React table libraries were sufficient to fulfill all the requirements. Thus I had to built a custom solution which is now **[available as open source library for React](https://react-table-library.com)**.

# React Tree Table: List Structure

First, we have to define what kind of data we need to visualize a tree table in React. Since it's a table and not only a list, we would need more than one property to show up for each row. So a straightforward list of items would be:

```javascript
const data = [
  {
    id: '1',
    name: 'profile image1.png',
    size: 234561,
    dateModified: '01-01-2021'
  },
  {
    id: '2',
    name: 'profile image2.png',
    size: 346221,
    dateModified: '02-01-2021'
  },
  {
    id: '3',
    name: 'profile image3.png',
    size: 124112,
    dateModified: '01-02-2021'
  },
];
```

In a [list component](/react-list-component), we would display each item as a row with its properties `name`, `size`, and `dateModified` as cells. If we would transform the list to a table component, it would have a column for each property.

In order to keep the following examples more lightweight, I will omit the `size` and `dateModified` properties, because they don't directly impact the implementation details of the tree table.

```javascript
const data = [
  {
    id: '1',
    name: 'profile image1.png',
  },
  {
    id: '2',
    name: 'profile image2.png',
  },
  {
    id: '3',
    name: 'profile image3.png',
  },
];
```

However, in a tree component the data should follow a **tree structure** instead of a list structure. Therefore, we adapt the previous list with items to a **tree with nodes**:

```javascript
const data = [
  { id: '0', name: 'profile image.png' },
  { id: '51', name: 'Thumbnails', nodes: [] },
  {
    id: '52',
    name: 'High Resolution',
    nodes: [
      { id: '1', name: 'profile image1.png' },
      { id: '2', name: 'profile image2.png' },
      { id: '3', name: 'profile image3.png' },
      { id: '4', name: 'image4.png' },
      { id: '5', name: 'image5.png' },
    ]
  },
];
```

We can see how this tree structure would unfold as a hierarchy with folders and files in a MacOS Finder component. While *files* do not have a `nodes` property, folders have either empty or filled `nodes`. The former would be an empty folder.

By having the `nodes` property at our hands, we can distinguish each node in the tree as one of three options:

* `nodes: undefined | null` -> file
* `nodes: []` -> empty folder
* `nodes: [{ ... }]` -> filled folder

As alternative, one could declare a `isFolder` boolean as property for each node, however, this wouldn't keep it [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) -- instead it would introduce redundancy right away, inconsistency eventually, and would bloat our data considering that we want to transfer thousands of nodes over the wire.

Last, this tree structure allows us to introduce nested trees too:

```javascript{8-15}
const data = [
  { id: '0', name: 'profile image.png' },
  { id: '51', name: 'Thumbnails', nodes: [] },
  {
    id: '52',
    name: 'High Resolution',
    nodes: [
      {
        id: '53',
        name: 'Favorites',
        nodes: [
          { id: '4', name: 'image4.png' },
          { id: '5', name: 'image5.png' },
        ]
      },
      { id: '1', name: 'profile image1.png' },
      { id: '2', name: 'profile image2.png' },
      { id: '3', name: 'profile image3.png' },
    ]
  },
];
```

Whether we have a folder or a file first in the data structure does not matter. If we would want to render this tree structure client-side, we could sort all nodes as lists based on the condition of their entry's available `nodes` property to show either folders or files first. Same goes when we send the data from the server, we would let the server decide in which order the data arrives at the client if no server-side sort feature is present.

# React Tree Table: Paginated List

After we have finalized the data structure for our tree table, we need to conceptualize how we want to chunk the data into smaller pieces and how to request these pieces from a remote API. At the moment, our request would look like the following to fetch all the data:

```javascript
const request = {
  path: '/nodes',
  body: {},
};
```

The response would be a tree data structure which we have defined before. However, as mentioned earlier, for this task we will be dealing with thousands of items in a list (and its nested lists), so it's necessary to split up the data. This is commonly achieved with pagination and paginated lists. Thus, the request needs to accept an offset and a limit argument:

```javascript
const request = {
  path: '/nodes',
  body: {
    offset: number,
    limit: number,
  },
};
```

While the offset dictates at which index we want to start the paginated list, the limit dictates how many items should be included. The following example will illustrate it:

```javascript
const list = [
  { id: '34151', name: 'a' },
  { id: '23114', name: 'b' },
  { id: '23171', name: 'c' },
  { id: '46733', name: 'd' },
];

const paginatedList = extractPaginatedList(
  list,
  {
    offset: 1,
    limit: 2,
  }
);

console.log(paginatedList);
// [
//   { id: '23114', name: 'b' },
//   { id: '23171', name: 'c' },
// ]
```

A response to our offset-based pagination request could have the following data structure:

```javascript
const result = {
  nodes: [node],
  pageInfo: {
    total: number,
    nextOffset: number | null,
  },
};
```

An alternative to an offset-based pagination -- which simply takes the index of a list and therefore could be fragile when CRUD operations are applied between requests -- would be using a cursor-based pagination. The following example will illustrate it:

```javascript{11}
const list = [
  { id: '34151', name: 'a' },
  { id: '23114', name: 'b' },
  { id: '23171', name: 'c' },
  { id: '46733', name: 'd' },
];

const paginatedList = extractPaginatedList(
  list,
  {
    cursor: 23114,
    limit: 2,
  }
);

console.log(paginatedList);
// [
//   { id: '23114', name: 'b' },
//   { id: '23171', name: 'c' },
// ]
```

In order to keep things simple, we will stick to the offset-based pagination though.

Let's walk through a scenario based on our previously defined data structure where a request could be the following:

```javascript
const request = {
  path: '/nodes',
  body: {
    offset: 0,
    limit: 2,
  },
};
```

If we extrapolate this onto our data from before, the response -- now a paginated list -- could look like the following:

```javascript
const result = {
  nodes: [
    { id: '0', name: 'profile image.png' },
    { id: '51', name: 'Thumbnails', nodes: [] },
  ],
  pageInfo: {
    total: 3,
    nextOffset: 2,
  }
};
```

Because the `nextOffset` is given and not `null`, we could fetch another paginated list. From a UI/UX perspective, this could be done with a "Load More" button at the end of our list (manual execution) or with infinite scrolling (automatic execution). The next request then would look like the following:

```javascript
const request = {
  path: '/nodes',
  body: {
    offset: 2,
    limit: 2,
  },
};
```

The returned result would be a paginated list with only one item, because our source data has only three items in the list. Since we already fetched two items before, what's left is only one item. Therefore, the next offset is null and we cannot fetch more pages afterward:

```javascript
const result = {
  nodes: [
    { id: '52', name: 'High Resolution', nodes: [] },
  ],
  pageInfo: {
    total: 3,
    nextOffset: null,
  }
};
```

Notice how we are able to fetch pages (paginated lists) of our source list with only using offset and limit. By using this technique, we can request all the top-level nodes. With every additional request, the frontend can merge the results by concatenating the `nodes` and replacing the `pageInfo` with the latest one:

```javascript
// client-side state

const result = {
  nodes: [
    { id: '0', name: 'profile image.png' },
    { id: '51', name: 'Thumbnails', nodes: [] },
    { id: '52', name: 'High Resolution', nodes: [] },
  ],
  pageInfo: {
    total: 3,
    nextOffset: null,
  }
};
```

Now what about the tree structure? You may have noticed that the last node which we have fetched has an empty `nodes` property even though it isn't empty in our source data. That's by choice, because when dealing with lots of data the nodes property could be filled with thousands of entries. Then, even though we have our pagination feature in place now, we wouldn't get any advantages from it and would get a performance hit.

# React Tree Table: Nested List

The previous section was about splitting up lists into paginated lists (pages) while keeping the list itself shallow by not populating the nodes property. This section is about populating the nodes property asynchronously.

So far, we have performed requests for paginated data, not for nested data. If a user wants to navigate into a tree by expanding a node in the UI, we can fetch its content (here `nodes`). Therefore, by extending the previous request with an `id` argument, we can specify what node's content we want to request:

```javascript
const request = {
  path: '/nodes',
  body: {
    id: string | null | undefined,
    offset: number,
    limit: number,
  },
};
```

Since `id` can be null or undefined, our previous requests for the top-level list are still valid. After fetching the top-level pages, the user sees that the displayed node with the id `52` is a folder which *could* have content. Now the request for this folder's content could look like the following:

```javascript
const request = {
  path: '/nodes',
  body: {
    id: '52',
    offset: 0,
    limit: 2,
  },
};
```

While we can use the `id` to request a node's content, we can still apply our offset and limit arguments to fetch only a fraction of it as we can see in the following result:

```javascript
const result = {
  nodes: [
    { id: '53', name: 'Favorites', nodes: [] },
    { id: '1', name: 'profile image1.png' },
  ]
  pageInfo: {
    total: 4,
    nextOffset: 2,
  }
};
```

The frontend merges the results by inserting `nodes` and `pageInfo` into the previous result:

```javascript{11-12,14-17}
// client-side state

const result = {
  nodes: [
    { id: '0', name: 'profile image.png' },
    { id: '51', name: 'Thumbnails', nodes: [] },
    {
      id: '52',
      name: 'High Resolution',
      nodes: [
        { id: '53', name: 'Favorites', nodes: [] },
        { id: '1', name: 'profile image1.png' },
      ],
      pageInfo: {
        total: 4,
        nextOffset: 2,
      }
    },
  ],
  pageInfo: {
    total: 3,
    nextOffset: null,
  }
};
```

From there, a user can further expand the tree by clicking the folder with the id `53` (request for nested data) or load more data below the entry with the id `1` (request for paginated data).

There are a few more things to note here:

First, all nodes with an empty `nodes` property could have potential content. At the moment, every time a user expands a tree node there would be a request which returns an empty list of nodes. We experimented with a `hasNodes` boolean flag per node which would prevent the data fetching on the client-side if there is no content. Eventually we removed it though, because it made keeping server-side data and client-side state in sync more complex when multiple users interacted (e.g. user A creates a file in an empty folder, user B does not load content because their property still says no content) with the application.

Second, even though we created an API which makes it possible to request structured tree data in smaller chunks, we need to handle lots of this data as [state](/react-state) on the client-side. We need to handle the merging of multiple results into one state object, but also need to take care of keeping this state in sync with the remote data for multi-user collaboration.

# React Tree Table: Sync

If all data would be fetched at once, a simple refetch of all this data would be sufficient to keep the data in sync between frontend and backend. However, since we are requesting paginated and nested lists, one of these states (paginated/nested pages) could go stale in a multi-user application, and thus refetching this one state gets more complex.

In our scenario, we had no resources to implement web sockets for real-time notifications of table changes, so we had to go with HTTP long polling and optimistic updates.

What's needed is a new request which fetches specific paginated and nested pages on demand to update the merged results from the previous requests:

```javascript
const request = {
  path: '/nodes-sync',
  body: {
    pages: [{
      id: string | null | undefined,
      offset: number,
      limit: number,
    }],
  },
};
```

So if we go back and check what data we fetched so far, we can iterate over all `pageInfo` properties from the client-side state and therefore would need the following request to get an updated version of all pages:

```javascript
const request = {
  path: '/nodes-sync',
  body: {
    pages: [
      {
        id: null,
        offset: 0,
        limit: 3,
      },
      {
        id: '52',
        offset: 0,
        limit: 2,
      },
    ],
  },
};
```

You see, even though we made three requests before, we only have two `pageInfo` properties in our client-side state, because one of them has been overridden earlier by a subsequent `pageInfo` property. Thus we can request the update for only two pages.

With this new API, we gain full control of how we want to refetch this data: We can use the `pageInfo` from the client-side state (as seen in the last example) or do something completely different.

The result from the previous request would look like the following:

```javascript
const result = {
  pages: [
    {
      nodes: [
        { id: '0', name: 'profile image.png' },
        { id: '51', name: 'Thumbnails', nodes: [] },
        { id: '52', name: 'High Resolution', nodes: [] },
      ],
      pageInfo: {
        total: 3,
        nextOffset: null,
      }
    },
    {
      nodes: [
        { id: '53', name: 'Favorites', nodes: [] },
        { id: '1', name: 'profile image1.png' },
      ],
      pageInfo: {
        total: 4,
        nextOffset: 2,
      }
    }
  ],
};
```

Why is the result a list of pages? Instead of returning a list of pages, we could return a hierarchy. However, we learned, in our case, that by returning a list, the client gets full control over what pages to refetch (e.g. pages that don't need to share the same hierarchy). In addition, the client can just go through its state and perform for every page in the result a replace operation on its state.

Now we have this new API for keeping remote server data and client state in sync. So when do we execute it? There are two options how to execute it: manually or automatically.

* Manually: If you choose to execute it manually, you would need to give your users a button next to each folder which gives them the option to refresh the folder's content. That's a good way to give the user more control, however, feels in our modern web world a bit outdated.

* Automatically: Since we do not have web sockets, we can use the API for long polling. Regarding the interval it's up to you how many times you want to trigger the refetch behind the scenes for your users.

After all, if this table with thousands of items should be used in collaboration by multiple users, a web socket connection would be the best case scenario. If you cannot establish this, your best bet would be using long polling like it's proposed with this API.

# React Tree Table: CRUD

So far, we have only fetched chunks of paginated and nested data for our tree table. These were only read operations and without any write operations you wouldn't need the sync API from the previous section in the first place. However, most data tables come with write operations too.

Keeping it short, every write CRUD operation (Create, Update, Delete) needs a standalone API endpoint. All of these operations would affect the users data table (and other users -- if they are working with the data table).

There are two ways of handling it for the user performing the write operation: perform a **forced refetch** of all (or specific) pages from the server-side which are affected by the write operation or perform an **optimistic UI** client-side modification of the state (e.g. delete operation leads to removing a node from `nodes`).

Both ways have their drawbacks, so let me explain them in the case of creating a new node.

## Optimistic UI

If we update the UI optimistically, we need to consider that we have a long polling update running in the background which overrides the data table periodically. There are several issues which are partly caused by this race condition:

* *Placement Issue:* The optimistic UI operation inserts the new node at the start or end of our `nodes` list. But that's not in sync with the implementation details of the backend (e.g. which inserts the node sorted by its name into the other nodes). When the long polling refetch executes eventually, the optimistically inserted node will jump to a different place.

* *Fragmentation Issue:* The optimistic UI operation inserts the new node, but the long polling refetch -- which refetches only a subset (page) of the entire list -- does not include this new node, because it isn't part of this particular subset. Thus the optimistically inserted node might just disappear again for the user after the long polling refetch executes.

* *Timing Issue:* Sometimes it can happen that the long polling request is executed right after the write operation. Now, if the long polling request is resolved first, it will replace the client-side state with its data which includes the new node. However, once the write operation resolves, the optimistic UI will insert the node a second time.

All these consistency problems could be mitigated somehow, but in our case we learned that this approach -- even though it should improve the UX -- comes with lots of costs. Which leads us to the forced refetch.

## Forced Refetch

A forced refetch would happen for every write operation and the nodes which are affected by it. So if I create a node in the `nodes` property of a node with a specific `id`, I'd use the new synchronization API to refetch this node's content. This comes with fewer (and more unlikely) issues:

* *Fragmentation Issue:* Similar to the optimistic UI, the refetch does not need to include the new node, because the list is fragmented into paginated lists (pages) and there is no guarantee that the new node is part of the already fetched pages. Thus the user creates a new node but does not see it.

* *Timing Issue:* More unlikely to happen is the timing issue from the optimistic UI attempt, but there is a chance that it could happen. If there is a race condition between long polling (lots of data) and forced refetch (little data), it can happen that the long polling resolves after the forced fetch and therefore does not include yet the new node.

As you can see, with only using a forced refetch we end up with similar issues, even though they are not as impactful as if we would use only an optimistic UI. However, the optimistic UI offers still better UX. So which one to use?

## Hybrid

What we ended up with is a hybrid approach of using optimistic UI and forced refetch on a case by case basis. For example, when we create a node, we are using an optimistic UI and then a forced refetch. The former gives the user a great UX while the latter makes sure that there are no inconsistency issues. In contrast, when we update (e.g. a node's name) or delete a node, we are only performing the optimistic UI strategy. When we move nodes with our move operation, we perform just a forced refetch.

We also learned that we have to consider two things:

* *Queue*: All API operations for the table are pushed into a queue and are performed sequentially. This mitigates the risk of the earlier mentioned race conditions (Timing Issue). For example, if there is a period synchronization refetch, then a CRUD operation, and then another synchronization refetch, they are all performed one after another.

* *Order*: Without taking a sorting feature into consideration for the sake of keeping it simple, newly created nodes will always be placed at the top of the list by the database (order by `dateCreated`). This way, we mitigate the risk of Placement Issues and Fragmentation Issues, because if we insert a node and place if with an optimistic UI at the top of the list, the forced refetch will place it there as well.

<Divider />

Lots of work goes into a table with thousands of tree structured nodes. The initial fetching can be split up into smaller chunks by using paginated and nested lists. This only covers the read operations though. If a user writes to the table, the implementation needs to take care of the user (and other users). In a best case scenario, we would use web sockets for this kind of real-time updates. However, if that's not available, you can achieve your goals with long polling too.

A table comes with more than read and write operations though. In the following bonus section, I want to go through our implementation of a Search and Filter feature and how we designed the API for it. This should show how much work goes into detail when creating such an API and component by just going through one advanced feature.

# React Tree Table: Search and Filter

A server-side search feature could be pretty straight forward. In the request which fetches the list, one could include a `search` argument which is used on the server-side to return the searched list. However, with our version of paginated and nested fetches, it gets more complicated. But let's explore this problem step by step.

We figured it would be best to extend our previous API for fetching pages:

```javascript{7}
const request = {
  path: '/nodes',
  body: {
    id: string | null | undefined,
    offset: number,
    limit: number,
    search: string | null | undefined
  },
};
```

Now, with this optional extension of the request in place, we can perform the same requests as before but with a condition. Without looking at the request's body at a full extent (no `limit`, `offset`, `id`), an example request could be the following:

```javascript
const request = {
  path: '/nodes',
  body: {
    search: 'image',
  },
};
```

The result for this search would be not a flat list this time, but a hierarchical tree structure:

```javascript{2,11-12,15-17}
const result = [
  { id: '0', name: 'profile image.png' },
  {
    id: '52',
    name: 'High Resolution',
    nodes: [
      {
        id: '53',
        name: 'Favorites',
        nodes: [
          { id: '4', name: 'image4.png' },
          { id: '5', name: 'image5.png' },
        ]
      },
      { id: '1', name: 'profile image1.png' },
      { id: '2', name: 'profile image2.png' },
      { id: '3', name: 'profile image3.png' },
    ]
  },
];
```

In the case of search, the parent nodes of the matching nodes are returned too. That's because we don't want to show the search result as a flat list, but still in their hierarchical context. What would be returned if we would search for "Favorites" instead?

```javascript{6}
const result = [
  {
    id: '52',
    name: 'High Resolution',
    nodes: [
      { id: '53', name: 'Favorites', nodes: [] },
    ]
  },
];
```

The matched node is retrieved within its context again, but only with its upper (parent nodes, e.g. "High Resolution") and not with its lower (child nodes) context. That's how we decided it for our implementation, however, it could also be valid to return child nodes too; in order to give the user the full upper and lower context boundaries.

UI wise it helps to highlight the matching nodes in the Table ([example](https://react-table-library.com/?path=/story/server-recipes-hybrid--default)), because when they are shown in a hierarchy, it's not always easy for the user to spot the matching nodes.

## Paginated and Nested Search

The previous examples have shown how we can return searched nodes in their hierarchy from the backend. However, we didn't integrate this into our paginated/nested lists yet. In the scenario of having thousands of matching search results, we still want to keep the chunking feature from before.

Let's see how this looks if we keep the original arguments (`limit`, `offset`, `id`) for the request and change the search term to something different:

```javascript
const request = {
  path: '/nodes',
  body: {
    id: null,
    offset: 0,
    limit: 1,
    search: 'profile',
  },
};
```

The result would be a nested paginated list:

```javascript
const result = {
  nodes: [
    { id: '0', name: 'profile image.png' },
  ],
  pageInfo: {
    total: 2,
    nextOffset: 1
  },
};
```

If there would be no search, the top-level list would have a total of 3. Now notice how the total amount of items for this search result is 2 though. Since the backend can iterate over all top-level nodes, it knows that only two of the nodes are either themselves matching nodes or have matching child nodes.

*Note: I will not go into the performance hits that the backend has to endure due to this new search feature. Essentially the backend needs to iterate through the whole tree to determine the matching nodes. This puts stress on the database and on the backend itself.*

Now we know that there is more matching data for the search query, because we have a `nextOffset` as result. Let's fetch it with another request:

```javascript
const request = {
  path: '/nodes',
  body: {
    id: null,
    offset: 1,
    limit: 1,
    search: 'profile',
  },
};
```

This time the result is a hierarchical match, because not the top-level node matches, but its child nodes:

```javascript
const result = [
  nodes: [
    {
      id: '52',
      name: 'High Resolution',
      nodes: [
        { id: '1', name: 'profile image1.png' },
        { id: '2', name: 'profile image2.png' },
      ],
      pageInfo: {
        total: 3,
        nextOffset: 2
      },
    },
  ],
  pageInfo: {
    total: 2,
    nextOffset: null
  },
];
```

It's important to note that the node with the `id` of `1` is returned too, even though it's not in the offset-limit-threshold. For nested nodes this is a necessary behavior, because otherwise we would never retrieve this node either with an offset of 0 or offset of 1.

In the end, the frontend adds both results into one again, by using the most recent `pageInfo` objects and concatenating lists:

```javascript
const result = [
  nodes: [
    // nodes from 1. result
    { id: '0', name: 'profile image.png' },
    // nodes from 2. result
    {
      id: '52',
      name: 'High Resolution',
      nodes: [
        { id: '1', name: 'profile image1.png' },
        { id: '2', name: 'profile image2.png' },
      ],
      pageInfo: {
        total: 3,
        nextOffset: 2
      },
    },
  ],
  // pageInfo from 2. result
  pageInfo: {
    total: 2,
    nextOffset: null
  },
];
```

When performing a paginated/nested search, the user gets presented a hierarchical result. That's different from what we had before when using only paginated and nested requests. However, the UI stays the same: Within the displayed hierarchical tree view, the user can trigger more paginated and nested fetches.

<Divider />

I must say that this project was challenging, but I learned lots of things along the way. It's not as straight forward as one might think to create an API for an asynchronous tree table which needs to handle thousands of entries. If it would be only read operations, it would be okay by just using paginated and nested requests, however, the write operations make this endeavour more challenging, because one has to keep the data in sync between frontend and backend.

In addition, a table doesn't come only with read and write operations, but also with features like searching, filtering, focusing into a folder, sorting etc. Putting all of these things together, in hindsight it was a great decision to first work on the API requirements and then on the backend/frontend implementation.

In the end, with the API design requirements in place to connect frontend and backend, a new **[React Table Library](https://react-table-library.com/)** was born to implement all of it on the client-side. One of the main motivations behind it was using server-side operations as first-class citizens; which enable one to implement features like sort, search, pagination not only client-side, but with a server which offers these features as API.
