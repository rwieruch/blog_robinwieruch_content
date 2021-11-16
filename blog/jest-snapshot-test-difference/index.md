---
title: "How to Jest Snapshot Test the Difference"
description: "Learn how to snapshot test the difference in changing snapshot tests with Jest after user interactions or other side-effects ..."
date: "2019-08-15T13:56:46+02:00"
categories: ["React", "Jest"]
keywords: ["jest snapshot test difference"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Snapshot tests are a common way to write lightweight component tests. When a snapshot test runs for the first time, it stores its output (e.g. rendered component's HTML structure) in a snapshot output file. Every time the snapshot test runs again, another snapshot output file gets created; which is used to diff the output against the old snapshot test's output file. If the snapshot's output has changed, the developer accepts or denies the changes. This way, developers keep an overview of their recent changes.

```javascript
import React from 'react';

const App = () => {
  const [counter, setCounter] = React.useState(0);

  return (
    <div>
      <h1>My Counter</h1>
      <Counter counter={counter} />

      <button type="button" onClick={() => setCounter(counter + 1)}>
        Increment
      </button>

      <button type="button" onClick={() => setCounter(counter - 1)}>
        Decrement
      </button>
    </div>
  );
};

export const Counter = ({ counter }) => (
  <div>
    <p>{counter}</p>
  </div>
);

export default App;
```

The code snippet shows a React application that implements a counter which can be increased/decreased with a [React Hook](/react-hooks/) by using one of two rendered buttons. A straightforward snapshot test for the React component could be implemented the following way:

```javascript
import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

describe('App', () => {
  it('renders', () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

If one would run the snapshot test, the following snapshot output file would be generated:

```javascript
exports[`App increments the counter 1`] = `
<div>
  <h1>
    My Counter
  </h1>
  <div>
    <p>
      0
    </p>
  </div>
  <button
    onClick={[Function]}
    type="button"
  >
    Increment
  </button>
  <button
    onClick={[Function]}
    type="button"
  >
    Decrement
  </button>
</div>
`;
```

That's the most basic approach for [snapshot testing in React](/react-testing-jest/). The question for this tutorial: **What happens if you want to snapshot test a provoked change of your re-rendered component?**

For instance, in the case of our React application, one could invoke one of the two buttons to cause a [state change](/react-usestate-hook/) which increases the counter which would lead to a re-render of the component. Afterward, a new snapshot test could be used to assert the differences of the rendered output:

```javascript{7,12,14,15}
import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

describe('App', () => {
  it('increments the counter', () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component.root.findAllByType('button')[0].props.onClick();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

After running the snapshot test, we would end up with two snapshot outputs in the same snapshot output file. The following code snippet shows only the second output for the changed/re-rendered component:

```javascript
exports[`App increments the counter 2`] = `
<div>
  <h1>
    My Counter
  </h1>
  <div>
    <p>
      1
    </p>
  </div>
  <button
    onClick={[Function]}
    type="button"
  >
    Increment
  </button>
  <button
    onClick={[Function]}
    type="button"
  >
    Decrement
  </button>
</div>
`;
```

Again, that's the most basic approach for testing a changed/re-rendered component. However, there are two drawbacks for this minimal approach which can be seen in the previous snapshot's output:

* 1) The entire component gets snapshotted again. (Redundancy)
* 2) It's not clear that the snapshot was performed to assert a change regarding a re-rendered component. Rather it's just a straightforward snapshot again. (Missing Context)

Let's implement a better version for snapshot tests to assert differences that can happen after re-renderings caused by user interaction or other side-effects. First, install this neat helper library for asserting a snapshot difference:

```javascript
npm install --save-dev snapshot-diff
```

Second, setup the helper library by extending your Jest expect method with a new functionality:

```javascript{3,5}
import React from 'react';
import renderer from 'react-test-renderer';
import { toMatchDiffSnapshot } from 'snapshot-diff';

expect.extend({ toMatchDiffSnapshot });

import App from './App';

describe('App', () => {
  it('increments the counter', () => {
    ...
  });
});
```

And third, make use of the new functionality to create a snapshot for the difference between two component renders:

```javascript{17,18}
import React from 'react';
import renderer from 'react-test-renderer';
import { toMatchDiffSnapshot } from 'snapshot-diff';

expect.extend({ toMatchDiffSnapshot });

import App from './App';

describe('App', () => {
  it('increments the counter', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component.root.findAllByType('button')[0].props.onClick();

    const treeUpdate = component.toJSON();
    expect(tree).toMatchDiffSnapshot(treeUpdate);
  });
});
```

Now, you get the second output for the re-rendered component in your snapshot output file:

```javascript
exports[`App increments the counter 2`] = `
"Snapshot Diff:
- First value
+ Second value

@@ -2,11 +2,11 @@
    <h1>
      My Counter
    </h1>
    <div>
      <p>
-       0
+       1
      </p>
    </div>
    <button
      onClick={[Function onClick]}
      type=\\"button\\""
`;
```

If you compare this snapshot's output to the previous one, you can see that we got rid of the two mentioned drawbacks. First, we don't render the whole component again, but only the part that has changes in addition to its surrounding environment. Second, the snapshot test's output doesn't look like a rendered component anymore, but like a diff between two outputs shown with the + and - prefixes. Only by looking at the snapshot's output file, a developer can tell that 1) the snapshot test was caused by a change of the component and 2) that the rendered output has changed from X to Y.

<ReadMore label="How to shallow render Jest Snapshot Tests" link="/jest-snapshot-shallow-render/" />
