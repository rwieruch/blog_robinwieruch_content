---
title: "How to shallow render Jest Snapshot Tests"
description: "Learn how to shallow render components for Jest snapshot tests. This way, you will avoid too large snapshot test outputs and too much setup for child components ..."
date: "2019-08-10T13:56:46+02:00"
categories: ["React", "JavaScript", "Jest"]
keywords: ["jest shallow render snapshot"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

If you are using Snapshot Tests with Jest for your components, there are a few pitfalls you have to be aware of. Two of them are very likely to apply to your written tests as well:

* 1) The output of snapshot tests becomes most often too large, if the actual snapshot test renders a component with lots of child components. This holds two problems in itself: A) You cannot diff your snapshot outputs with confidence anymore by just looking at them and B) you end up with kinda duplicated snapshot outputs, if you snapshot test your child components as well.

* 2) If your actual snapshot tested component renders lots of child components, all props for the child components need to be set up in the snapshot test of your parent component. Thus, you are not really focusing on the parent component, but on setting up all the necessary information for the child component. This task becomes repetitive if you test your child components in separation again, because there you have to test them with the same props setup. Eventually you end up with duplicated test setups.

As you can see, these two problems only apply for parent components which render more than a few child components. So what if you could shallow render the parent component in your snapshot test to focus only on the parent component in your test; and on whether it renders instances of its child components without worrying about the whole output of the child component?

If you are using Jest for snapshot tests, you are most likely rendering your React components with [react-test-renderer](https://reactjs.org/docs/test-renderer.html):

```javascript
import React from 'react';
import renderer from 'react-test-renderer';

import Profile from '.';

describe('Profile', () => {
  it('renders', () => {
    const component = renderer.create(<Profile />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

If you are rendering lots of child components in your Profile components, you may end up with the problem 1) for your snapshot test output. The only thing you should care about though are the rendered component instances and not their content:

```javascript
const Profile = () => (
  <>
    <Preferences />
    <Documents />
    <WorkExperience />
    <Education />
    <Skills />
    <PersonalInfo />
  </>
);
```

If the Profile component passes lots of props to all of its child components, you end up with problem 2), because you have to set up all the dummy props in your snapshot tests for all the child components, even though the parent component may not care about them:

```javascript
const Profile = ({
  ...preferencesProps,
  ...documentsProps,
  ...workExperienceProps,
  ...educationProps,
  ...skillsProps,
  ...personalInfoProps,
}) => (
  <>
    <Preferences {...preferencesProps} />
    <Documents {...documentsProps} />
    <WorkExperience {...workExperienceProps} />
    <Education {...educationProps} />
    <Skills {...skillsProps} />
    <PersonalInfo {...personalInfoProps} />
  </>
);
```

You want to avoid 1) and 2) for snapshot testing your parent components, because these problems should be tested in the child components themselves. The parent component may be only concerned about rendering the child components.

*Note: Shallow rendering snapshot tests is no silver bullet to your overall testing strategy. If you apply shallow rendering for snapshot tests, you may loose the confidence that your components work in integration (e.g. interplay between parent and child component).*

Even though React's test renderer offers [shallow rendering](https://reactjs.org/docs/shallow-renderer.html), I found mocking the child component's render output as a more suitable approach for my test cases:

```javascript{6,7,8,9,10,11}
import React from 'react';
import renderer from 'react-test-renderer';

import Profile from '.';

jest.mock('./Preferences', () => () => 'Preferences');
jest.mock('./Documents', () => () => 'Documents');
jest.mock('./WorkExperience', () => () => 'WorkExperience');
jest.mock('./Education', () => () => 'Education');
jest.mock('./Skills', () => () => 'Skills');
jest.mock('./PersonalInfo', () => () => 'PersonalInfo');

describe('Profile', () => {
  it('renders', () => {
    const component = renderer.create(<Profile />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

Your shallow rendered snapshot test's output would look similar to the following:

```javascript
exports[`Profile renders 1`] = `
Array [
  "Preferences",
  "Documents",
  "WorkExperience",
  "Education",
  "Skills",
  "PersonalInfo",
]
`;
```

It's way simplified compared to the version which renders all your child components to their fullest degree. Also you don't need to care about the passed props anymore. However, if you would want to test whether your parent component passes all the necessary props to its child components, you could test it even with a mocked child component:

```javascript{5,20,21,22}
import React from 'react';
import renderer from 'react-test-renderer';

import Profile from '.';
import PersonalInfo from './PersonalInfo';

jest.mock('./Preferences', () => () => 'Preferences');
jest.mock('./Documents', () => () => 'Documents');
jest.mock('./WorkExperience', () => () => 'WorkExperience');
jest.mock('./Education', () => () => 'Education');
jest.mock('./Skills', () => () => 'Skills');
jest.mock('./PersonalInfo', () => () => 'PersonalInfo');

describe('Profile', () => {
  it('renders and passes props', () => {
    const component = renderer.create(<Profile />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    expect(component.root.findByType(PersonalInfo).props).toEqual({
      name: 'Robin Wieruch',
    });
  });
});
```

In conclusion, you end up with a very lightweight snapshot test for your parent component, whereas you would snapshot test your child components (e.g. Preferences, Documents, Education, Skills) with their props more thoroughly themselves.

<ReadMore label="How to Jest Snapshot Test the Difference" link="https://www.robinwieruch.de/jest-snapshot-test-difference/" />
