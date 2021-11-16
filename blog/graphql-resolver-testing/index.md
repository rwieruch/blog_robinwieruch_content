---
title: "GraphQL resolver testing"
description: "Learn how to test GraphQL resolvers with Jest. More advanced resolvers will have authorization and permission checks which may return errors, so make sure to test these too ..."
date: "2020-03-08T13:56:46+02:00"
categories: ["Firebase"]
keywords: ["graphql resolver testing", "graphql testing"]
hashtags: ["#GraphQL"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

We will test the following GraphQL resolver which has authorization and permission checks in place. If the user isn't authenticated, the resolver returns an error. If the requirements for the database entity aren't met, the resolver returns an error. Otherwise, the resolver creates a new database entity.

```javascript
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

      const price = getPrice(courseId, bundleId);
      if (price !== 0) {
        return new Error('This course is not for free.')
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

If we would use a [GraphQL resolver middleware](/graphql-resolver-middleware/) -- which is optional --, it can be simplified to the following:

```javascript{3-5,17}
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

Either way, let's jump into testing this GraphQL resolver with Jest. We call the resolver function with all its arguments and expect to resolve its returned promise to true if all requirements are met:

```javascript
import resolvers from './';

describe('createFreeCourse', () => {
  it('creates a course', async () => {
    const result = resolvers.Mutation.createFreeCourse(
      null,
      {
        courseId: 'THE_ROAD_TO_GRAPHQL',
        bundleId: 'STUDENT',
      },
      { me: { uid: '1', email: 'example@example.com' } },
      null
    );

    await expect(result).resolves.toEqual(true);
  });
});
```

If you need to mock the database request with Jest, check out this tutorial about [Jest mocking](/firebase-test/). Once you mocked your database API, you *could* add more assertions to your test case:

```javascript{17,19-29}
import resolvers from './';

describe('createFreeCourse', () => {
  it('creates a course', async () => {
    const result = resolvers.Mutation.createFreeCourse(
      null,
      {
        courseId: 'THE_ROAD_TO_GRAPHQL',
        bundleId: 'STUDENT',
      },
      { me: { uid: '1', email: 'example@example.com' } },
      null
    );

    await expect(result).resolves.toEqual(true);

    expect(mockedSet).toHaveBeenCalledTimes(1);

    expect(mockedSet).toHaveBeenCalledWith({
      courseId: 'THE_ROAD_TO_GRAPHQL',
      packageId: 'STUDENT',
      invoice: {
        createdAt: 'TIMESTAMP',
        amount: 0,
        licensesCount: 1,
        currency: 'USD',
        paymentType: 'FREE',
      },
    });
  });
});
```

Anyway, let's keep the test case simple without the database assertions. So far, we have only tested the happy path of the resolver logic where we meet all the requirements. What about if the user isn't authenticated?

```javascript{6-21}
describe('createFreeCourse', () => {
  it('creates a course', async () => {
    ...
  });

  it('does not create a course if not authenticated', async () => {
    const result = resolvers.Mutation.createFreeCourse(
      null,
      {
        courseId: 'THE_ROAD_TO_GRAPHQL',
        bundleId: 'STUDENT',
      },
      { me: null },
      null
    );

    await expect(result).resolves.toEqual(
      new Error('Not authenticated as user.')
    );
  });
});
```

Normally, we would expect the promise to reject. However, in GraphQL we successfully return the error as resolved result. This way, we can also test the other conditional logic for the GraphQL resolver:

```javascript{10-24}
describe('createFreeCourse', () => {
  it('creates a course', async () => {
    ...
  });

  it('does not create a course if not authenticated', async () => {
    ...
  });

  it('does not create a course if not free', async () => {
    const result = resolvers.Mutation.createFreeCourse(
      null,
      {
        courseId: 'THE_ROAD_TO_GRAPHQL',
        bundleId: 'PROFESSIONAL',
      },
      { me: { uid: '1', email: 'example@example.com' } },
      null
    );

    await expect(result).resolves.toEqual(
      new Error('This course is not for free.')
    );
  });
});
```

This is it. GraphQL resolvers are only functions in the end. You can import them in your test file, call the resolver, and perform assertions. By having authorization and permission resolvers in place, you can also test the unhappy path when something goes wrong. In the end, the GraphQL server returns a promise, whether it is a successful result or an error.