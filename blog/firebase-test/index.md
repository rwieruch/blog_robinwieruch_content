---
title: "How to test Firebase with Jest"
description: "Learn how to test Firebase functions from database and authentication with Jest. Jest allows you to mock Firebase and its functions for integration and unit testing ..."
date: "2020-02-06T13:56:46+02:00"
categories: ["Firebase"]
keywords: ["firebase test", "firebase testing", "firebase jest", "firebase mock"]
hashtags: ["#100DaysOfCode", "#Firebase"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Every time I used Firebase, I ran into the problem of how to test Firebase's database and authentication. Since I am using [Jest](https://jestjs.io/) as my default testing environment, I figured everything I needed already comes with Jest. In this tutorial, you will learn how to mock Firebase's features. We will use Firebase Admin SDK for the Firebase setup, however, the same works with the traditional client-side Firebase using Firebase Real-Time Database, Firebase Firestore, and Firebase Authentication.

```javascript
import * as firebaseAdmin from 'firebase-admin';

import firebaseServiceAccountKey from './firebaseServiceAccountKey.json';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      firebaseServiceAccountKey
    ),
    databaseURL: 'https://my-firebase-application.firebaseio.com',
  });
}

export default firebaseAdmin;
```

After setting up Firebase, we have our first database function which creates a record in Firebase's database:

```javascript
import firebaseAdmin from './firebase';

export const createCourse = async ({
  uid,
  courseId,
  bundleId,
  amount,
  paymentType,
}) => {
  await firebaseAdmin
    .database()
    .ref(`users/${uid}/courses`)
    .push()
    .set({
      courseId: courseId,
      packageId: bundleId,
      invoice: {
        createdAt: firebaseAdmin.database.ServerValue.TIMESTAMP,
        amount,
        licensesCount: 1,
        currency: 'USD',
        paymentType,
      },
    });

  return true;
}
```

In our test file, a test with Jest could be similar to this one for testing the Firebase function:

```javascript{6-9}
import { createCourse } from './';
import firebaseAdmin from './firebase';

describe('createFreeCourse', () => {
  it('creates a course', async () => {
    const set = firebaseAdmin
      .database()
      .ref()
      .push().set;

    const result = createCourse(
      '1',
      'THE_ROAD_TO_GRAPHQL',
      'STUDENT',
      0,
      'FREE'
    );

    await expect(result).resolves.toEqual(true);

    expect(set).toHaveBeenCalledTimes(1);

    expect(set).toHaveBeenCalledWith({
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

Before this test can run through, we need to mock Firebase in the test file to cover the problematic lines (highlighted). Instead of mocking Firebase as library, we mock the setup which happens in another file which I have shown before:

```javascript{4-16}
import { createCourse } from './';
import firebaseAdmin from './firebase';

jest.mock('./firebase', () => {
  const set = jest.fn();

  return {
    database: jest.fn(() => ({
      ref: jest.fn(() => ({
        push: jest.fn(() => ({
          set,
        })),
      })),
    })),
  };
});

describe('createFreeCourse', () => {
  ...
});
```

Now it's possible to call Jest's `toHaveBeenCalledTimes()` and `toHaveBeenCalledWith()` on the mocked function. However, we still didn't mock the Firebase timestamp properly. In our source code, let's use the explicit Firebase import rather than our Firebase setup for the timestamp:

```javascript{1,20}
import * as firebaseAdminVanilla from 'firebase-admin';

import firebaseAdmin from './firebase';

export const createCourse = async ({
  uid,
  courseId,
  bundleId,
  amount,
  paymentType,
}) =>
  await firebaseAdmin
    .database()
    .ref(`users/${uid}/courses`)
    .push()
    .set({
      courseId: courseId,
      packageId: bundleId,
      invoice: {
        createdAt: firebaseAdminVanilla.database.ServerValue.TIMESTAMP,
        amount,
        licensesCount: 1,
        currency: 'USD',
        paymentType,
      },
    });
```

Now, we can Jest mock the Firebase import for the Firebase constant in our test:

```javascript{4-12}
import { createCourse } from './';
import firebaseAdmin from './firebase';

jest.mock('firebase-admin', () => {
  return {
    database: {
      ServerValue: {
        TIMESTAMP: 'TIMESTAMP',
      },
    },
  };
});

jest.mock('./firebase', () => {
  ...
});

describe('createFreeCourse', () => {
  ...
});
```

The Firebase constant should be alright in our test assertion now. Also you could consider moving the last Firebase mock into your `jest.setup.js` file, because it may be needed for other unit and integration tests as well. After all, you should have everything at your hands to test Firebase applications now.