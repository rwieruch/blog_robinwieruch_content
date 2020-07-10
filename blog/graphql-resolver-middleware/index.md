---
title: "GraphQL resolver middleware"
description: "Learn how to set up a GraphQL middleware with resolvers handling authorization and permissions ..."
date: "2020-03-08T13:56:46+02:00"
categories: ["Firebase"]
keywords: ["graphql middleware", "graphql authorization", "graphql permissions"]
hashtags: ["#GraphQL"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

GraphQL resolvers are used to resolve GraphQL queries to actual data. In this GraphQL tutorial, you will learn how to set up a GraphQL middleware for these resolvers for dealing with authorization and permissions. The following code snippet shows a GraphQL resolver with arguments that creates a new entity in a database.

```javascript
export default {
  Mutation: {
    createFreeCourse: async (
      parent,
      { courseId, bundleId },
      { me }
    ) => {
      await createCourse({
        uid: me.uid,
        courseId,
        bundleId,
        amount: 0,
        paymentType: 'FREE',
      });

      return true;
    },
  },
};
```

In this scenario, a user creates a course with a GraphQL mutation called `createFreeCourse`. It takes some arguments from the resolver's function arguments and also the user itself from the resolver's context. Now, if a user isn't authenticated, it shouldn't be possible to access the database:

```javascript{8-10}
export default {
  Mutation: {
    createFreeCourse: async (
      parent,
      { courseId, bundleId },
      { me }
    ) => {
      if (!me) {
        return new Error('Not authenticated as user.');
      }

      await createCourse({
        uid: me.uid,
        courseId,
        bundleId,
        amount: 0,
        paymentType: 'FREE',
      });

      return true;
    },
  },
};
```

This authorization check happens quite some time for a larger GraphQL server with lots of resolvers. In order to get rid of this manual work, we can write a middleware function with the `graphql-resolvers` package for this and all other resolvers in another file:

```javascript
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new Error('Not authenticated as user.');
```

After all, this middleware function is just another GraphQL resolver. We can import it in our previous resolver and combine it with the `graphql-resolvers` package to one protected resolver (also called guarded resolver):

```javascript{1,3,7-8,20}
import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './middleware/isAuthenticated';

export default {
  Mutation: {
    createFreeCourse: combine(
      isAuthenticated,
      async (parent, { courseId, bundleId }, { me }) => {
        await createCourse({
          uid: me.uid,
          courseId,
          bundleId,
          amount: 0,
          paymentType: 'FREE',
        });

        return true;
      }
    ),
  },
};
```

Every time this GraphQL resolver runs, it does the authentication check before running the actual resolver. Let's take this one step further with another permission check. First, define another resolver middleware function:

```javascript
import { skip } from 'graphql-resolvers';

export const isFreeCourse = (parent, { courseId, bundleId }) => {
  const price = getPrice(courseId, bundleId);

  return price === 0
    ? skip
    : new Error('This course is not for free.');
};
```

And second, use it for your actual resolver:

```javascript{4,10}
import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './middleware/isAuthenticated';
import { isFreeCourse } from './middleware/isFreeCourse';

export default {
  Mutation: {
    createFreeCourse: combine(
      isAuthenticated,
      isFreeCourse,
      async (parent, { courseId, bundleId }, { me }) => {
        await createCourse({
          uid: me.uid,
          courseId,
          bundleId,
          amount: 0,
          paymentType: 'FREE',
        });

        return true;
      }
    ),
  },
};
```

As you can see, it doesn't end with two combined resolvers. You can add more onto the stack for a more elaborate permission and authorization handling. In addition, you can test them as standalone or combined resolvers.