---
title: "How to test Axios in Jest by Example"
description: "How to mock Axios in Jest by example for mocking get and post requests, for mocking network errors like a 404, and for testing Axios in React and Enzyme ..."
date: "2019-11-18T07:52:46+02:00"
categories: ["JavaScript"]
keywords: ["axios jest"]
hashtags: ["#100DaysOfCode", "#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Every once in a while we need to test API requests. [Axios](https://github.com/axios/axios) is one of the most popular JavaScript libraries to fetch data from remote [APIs](/what-is-an-api-javascript/). Hence, we will use Axios for our data fetching example -- however, the following tutorial should make it possible to exchange axios with any other data fetching library.

```javascript
import axios from 'axios';

export const API = 'https://hn.algolia.com/api/v3';

export const fetchData = async query => {
  const url = `${API}/search?query=${query}`;

  return await axios.get(url);
};

fetchData('react');
```

In this data fetching example with axios, we provide a query parameter to the function to search on [Hacker News](https://news.ycombinator.com/) via its [API](https://hn.algolia.com/api). If the request is successful, we will return the response. If the request runs into a network error, the function will throw an error which we would have to capture outside of it.

Now we are going to use Jest to test the asynchronous data fetching function. Jest is used as a test runner (alternative: Mocha), but also as an assertion utility (alternative: Chai). In addition, it comes with utilities to spy, stub, and mock (asynchronous) functions. That's how we will use Jest to mock Axios.

```javascript
import { fetchData } from './';

describe('fetchData', () => {
  it('fetches successfully data from an API', async () => {

  });

  it('fetches erroneously data from an API', async () => {

  });
});
```

First, we will mock Axios with Jest. And second, we will give Axios' get method a mock implementation to resolve and reject a promise for both tests.

```javascript{1,5,9-22,24,28,30-32}
import axios from 'axios';

import { fetchData } from './';

jest.mock('axios');

describe('fetchData', () => {
  it('fetches successfully data from an API', async () => {
    const data = {
      data: {
        hits: [
          {
            objectID: '1',
            title: 'a',
          },
          {
            objectID: '2',
            title: 'b',
          },
        ],
      },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
  });
});
```

Last but not least, we will make our assertion with Jest in the cases of resolving the promise successfully or erroneously:

```javascript{13,23}
import axios from 'axios';

import { fetchData } from './';

jest.mock('axios');

describe('fetchData', () => {
  it('fetches successfully data from an API', async () => {
    const data = {...};

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(fetchData('react')).resolves.toEqual(data);
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(fetchData('react')).rejects.toThrow(errorMessage);
  });
});
```

As bonus, we can also assert that Axios' get has been called with the correct URL:

```javascript{3,15-17}
import axios from 'axios';

import { fetchData, API } from './';

jest.mock('axios');

describe('fetchData', () => {
  it('fetches successfully data from an API', async () => {
    const data = {...};

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(fetchData('react')).resolves.toEqual(data);

    expect(axios.get).toHaveBeenCalledWith(
      `${API}/search?query=react`,
    );
  });

  ...
});
```

That's it for creating a Jest mock for Axios by going through one example. You can find this Axios mocking with Jest example in this [GitHub repository](https://github.com/the-road-to-javascript/axios-jest-example). A few more thoughts:

* If you want to mock a post instead of a get request for Axios, just apply the `mockImplementationOnce()` for `axios.post` instead of `axios.get`.
* If you want to have a proper network error, for instance a status code 404, then you have to create a [custom JavaScript error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) for it.
* Last but not least, head over to this tutorial if you want to see [how data fetching with Axios can be tested in React with Jest and Enzyme](/react-testing-jest-enzyme).



