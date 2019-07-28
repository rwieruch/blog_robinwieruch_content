+++
title = "Visual Regression Testing and React Storybook"
description = "The article gives advice on how to implement visual regression testing in React and UI components with React Storybook. You will get to know React Storybook and all its testing capabilities ..."
date = "2018-10-30T13:50:46+02:00"
tags = ["React", "Tooling", "Web Development", "JavaScript"]
categories = ["React", "Tooling", "Web Development", "JavaScript"]
keywords = ["visual regression testing react", "react storybook testing"]
news_keywords = ["visual regression testing react", "react storybook testing"]
hashtag = "#ReactJs"
card = "img/posts/visual-regression-testing-react-storybook/banner_640.jpg"
banner = "img/posts/visual-regression-testing-react-storybook/banner.jpg"
contribute = "visual-regression-testing-react-storybook.md"
headline = "Visual Regression Testing and React Storybook"

summary = "The article gives advice on how to implement visual regression testing in React applications with React Storybook. You will get to know React Storybook and all its testing capabilities."
+++

{{% sponsorship %}}

{{% pin_it_image "visual regression testing react" "img/posts/visual-regression-testing-react-storybook/banner.jpg" "is-src-set" %}}

As I worked with my recent client to develop their lay out the groundwork for their React application, I found out that testing was an important topic for them. They are shipping their React application into embedded systems only once or twice a year. As conclusion there must be a guarantee that everything is working as expected, because there are no deployments possible afterward to fix a bug. That's how I came to write an [extensive article about testing in React](https://www.robinwieruch.de/react-testing-tutorial/) that covers unit tests, integration tests and E2E tests. However, one part is missing in the article: **visual regression tests in React**. These kind of tests were super important for my client, because the embedded application should work on various device sizes and a small bug in the layout or styling could cost much money. Thus all the styling should work as expected for different consumer of their application.

This article is all about visual regression testing in React. As I worked for my recent client, I had to look for tools which would enable this kind of testing in React applications. It didn't take long for me to stumbled upon {{% a_blank "React Storybook" "https://github.com/storybooks/storybook" %}}, which itself isn't used for testing but for having a living component style guide, but comes with a couple of add-ons which enable snapshot testing and visual regression testing by only writing stories for React components. At the end, there is one add-on called Storyshots which enables visual regression testing for the components rendered in React Storybook.

The article will first go into React Storybook and how it can be used for a living component/UI style guide. Along the way, you will learn about a couple of add-ons which are useful for React Storybook. Finally, you will learn about testing in React Storybook by turning your stories first into snapshot tests and second into visual regression tests. Let's dive into the material.

{{% chapter_header "React Storybook and the React UI component guide" "react-storybook" %}}

Storybook can be used for different view layer libraries. One of them is React and thus most people are using React Storybook to document their UI components to give non developers a way to try out different components and to ensure a unified style guide for their UI components. It is a great tool for these kind of things and you can get around implementing your own living style guide by using Storybook instead.

If you have no React application yet to try it, you can clone this {{% a_blank "GitHub" "repository" "https://github.com/the-road-to-learn-react/react-testing-mocha-chai-enzyme" %}} and follow its installation instructions on GitHub. It comes with all the React testing setup from the previously mentioned testing article where I wrote about unit tests, integration tests and E2E tests in React. Otherwise, you can start out with {{% a_blank "create-react-app" "https://github.com/facebook/create-react-app" %}} or [this minimal React with Webpack setup](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/) too. But then the following instructions may vary for you, because you haven't installed all the peer dependencies (e.g. Jest for the visual regression testing and snapshot testing part of this article) yet.

First, you can install React Storybook on the command line:

{{< highlight javascript >}}
npm install @storybook/react --save-dev
{{< /highlight >}}

Second, create a *.storybook/* folder in your project folder. It is the default place for all the Storybook configuration. Later, it is up to you to choose another place for it. In the folder, create a *.storybook/config.js* file. There you can put the following configuration:

{{< highlight javascript >}}
import { configure } from '@storybook/react';

// pick all stories.js files within the src/ folder
const req = require.context('../src', true, /stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
{{< /highlight >}}

The fourth line of the configuration is the most important one. It specifies the location and name of the stories which should end up in React Storybook. In this particular configuration, it says "pick all stories that are located in the *src/* folder with the name *stories.js*". If you want to have a different name for your files, such as *MyComponent.stories.js*, use an appropriate regular expression for it such as:

{{< highlight javascript "hl_lines=3 4" >}}
import { configure } from '@storybook/react';

// pick all *.stories.js files within the src/ folder
const req = require.context('../src', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
{{< /highlight >}}

Third, define a story for one of your components. Let's say we have a Checkbox component which is stateless and only communicates its value to the outside world by using a function as a prop. It could be in a *src/Checkbox/index.js* file:

{{< highlight javascript >}}
import React, { Component } from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onCheckboxChange(event.target.checked);
  };

  render() {
    const { value, children } = this.props;

    return (
      <label>
        {children}:
        <input type="checkbox" checked={value} onChange={this.handleChange} />
      </label>
    );
  }
}

export default Checkbox;
{{< /highlight >}}

Next to it, you can create your stories for it in a *src/Checkbox/stories.js* file:

{{< highlight javascript >}}
import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from './';

storiesOf('Checkbox', module)
  .add('with checked', () => {
    const value = true;
    const children = 'My Checkbox Label';
    const onCheckboxChange = () => {};

    return (
      <Checkbox value={value} onCheckboxChange={onCheckboxChange}>
        {children}
      </Checkbox>
    );
  });
{{< /highlight >}}

It is important for a story to return the rendered component to make it appear in Storybook. The previous construct allows you to have multiple stories for one component by using the `add()` method. Each story for a component should be different when implementing multiple stories. Most often stories for a component differ because of the props that are passed to the component.

{{< highlight javascript "hl_lines=17 18 19 20 21 22 23 24 25 26 27" >}}
import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from './';

storiesOf('Checkbox', module)
  .add('with checked', () => {
    const value = true;
    const children = 'My Checkbox Label';
    const onCheckboxChange = () => {};

    return (
      <Checkbox value={value} onCheckboxChange={onCheckboxChange}>
        {children}
      </Checkbox>
    );
  })
  .add('with unchecked', () => {
    const value = false;
    const children = 'My Checkbox Label';
    const onCheckboxChange = () => {};

    return (
      <Checkbox value={value} onCheckboxChange={onCheckboxChange}>
        {children}
      </Checkbox>
    );
  });
{{< /highlight >}}

That's how you can add multiple stories to a component resembling different component states. Last but not least, add a npm script to your *package.json* file to run React Storybook on the command line:

{{< highlight javascript "hl_lines=3" >}}
"scripts": {
    ...
    "storybook": "start-storybook -p 9001 -c .storybook"
},
{{< /highlight >}}

Now you can run it on the command line with `npm run storybook` and visit your React Storybook with the specified port in the browser: http://localhost:9001. You should see both stories for your Checkbox component.

Surprisingly nothing happens when clicking the checkbox, because it is a stateless component. In this case, the component is implemented in a way where the state is managed outside of the component. In order to make your non developers and designers happy, you can add a wrapping stateful component around your Checkbox component. It can happen in your *stories.js* file which is then only used for your stories but not for the actual application. After all, stories are implemented in JavaScript (and React), so you can add any helpful implementation to it.

{{< highlight javascript "hl_lines=5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 41 43 52 54" >}}
import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from './';

class CheckboxStateful extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };

    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

  onCheckboxChange(value) {
    this.setState({ value });

    this.props.onCheckboxChange(value);
  };

  render() {
    return (
      <Checkbox
        value={this.state.value}
        onCheckboxChange={this.onCheckboxChange}
      >
        {this.props.children}
      </Checkbox>
    );
  }
}

storiesOf('Checkbox', module)
  .add('with checked', () => {
    const value = true;
    const children = 'My Checkbox Label';
    const onCheckboxChange = () => {};

    return (
      <CheckboxStateful value={value} onCheckboxChange={onCheckboxChange}>
        {children}
      </CheckboxStateful>
    );
  })
  .add('with unchecked', () => {
    const value = false;
    const children = 'My Checkbox Label';
    const onCheckboxChange = () => {};

    return (
      <CheckboxStateful value={value} onCheckboxChange={onCheckboxChange}>
        {children}
      </CheckboxStateful>
    );
  });

{{< /highlight >}}

After starting Storybook again, you should see again both stories for your Checkbox component. But this time it is possible to check and uncheck the Checkbox state.

{{% chapter_header "React Storybook Addons" "react-storybook-addons" %}}

Before diving into testing with React Storybook, this section shows you how to add and use a couple of useful **Storybook Addons**. You can find most of them on the {{% a_blank "official Storybook website" "https://storybook.js.org" %}}. Addons can be helpful for enabling testing in React Storybook, but also for providing useful features for non developers in your team.

{{% sub_chapter_header "React Storybook Addons: Knobs" "react-storybook-addons-knobs" %}}

First, we are going to introduce the **Storybook Knobs** addon. It is used for keeping variables which are used in the stories as props flexible so that non developers can adjust those variables in the rendered Storybook to see how the business logic or styling behaves.

{{< highlight javascript >}}
npm install @storybook/addon-knobs --save-dev
{{< /highlight >}}

For instance, imagine a button which has a fixed width but renders any number of chars as text. Soon it should be clear, by adjusting the variables in Storybook, that most often the text will not fit in the button with a fixed width. That's one of the various use cases why Storybook Knobs makes sense.

You have to create a *.storybook/addons.js* file in your Storybook configuring folder to register the addon in order to use it in your stories. In the file, you can import the newly installed addon.

{{< highlight javascript >}}
import '@storybook/addon-knobs/register';
{{< /highlight >}}

Next, you can add the Knobs to all your stories globally (you could do it for each story individually too) by using a **Storybook Decorator** in your *.storybook/config.js* file.

{{< highlight javascript "hl_lines=1 2 7" >}}
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

// pick all stories.js files within the src/ folder
const req = require.context('../src', true, /stories\.js$/);

addDecorator(withKnobs);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
{{< /highlight >}}

And last but not least, you can make use of the Knobs addon by specifying flexible variables with it in your Checkbox stories.

{{< highlight javascript "hl_lines=3 11 22" >}}
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Checkbox from './';

...

storiesOf('Checkbox', module)
  .add('with checked', () => {
    const value = true;
    const children = text('label', 'My Checkbox Label');
    const onCheckboxChange = () => {};

    return (
      <CheckboxStateful value={value} onCheckboxChange={onCheckboxChange}>
        {children}
      </CheckboxStateful>
    );
  })
  .add('with unchecked', () => {
    const value = false;
    const children = text('label', 'My Checkbox Label');
    const onCheckboxChange = () => {};

    return (
      <CheckboxStateful value={value} onCheckboxChange={onCheckboxChange}>
        {children}
      </CheckboxStateful>
    );
  });
{{< /highlight >}}

After starting your React Storybook on the command line again, you should see a Knobs panel in your React Storybook in the browser where you are able to change the value for the "label" key. Storybook Knobs doesn't only come with the text knob, but also other primitives such as boolean, number, date, array or object. You can find out more about it in their {{% a_blank "official documentation" "https://github.com/storybooks/storybook/tree/master/addons/knobs" %}}.

{{% sub_chapter_header "React Storybook Addons: Actions" "react-storybook-addons-actions" %}}

**Storybook Actions** is another useful addon to capture the values which are coming through your handlers. Rather than passing in an empty function as prop to your component which is doing nothing, you can use the an action from the addon to output the value in a dedicated panel in the React Storybook. First, install the addon on the command line:

{{< highlight javascript >}}
npm install @storybook/addon-actions --save-dev
{{< /highlight >}}

Next, register it to your list of addons:

{{< highlight javascript "hl_lines=2" >}}
import '@storybook/addon-knobs/register';
import '@storybook/addon-actions/register';
{{< /highlight >}}

And last but not least, import the `action()` function from the addon to your stories. Afterward, you can use it to generate a callback function, by passing in an identifier, and use it as prop for your Component rather than having an empty function for it.

{{< highlight javascript "hl_lines=4 13 24" >}}
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Checkbox from './';

...

storiesOf('Checkbox', module)
  .add('with checked', () => {
    const value = true;
    const children = text('label', 'My Checkbox Label');
    const onCheckboxChange = action('toggle');

    return (
      <CheckboxStateful value={value} onCheckboxChange={onCheckboxChange}>
        {children}
      </CheckboxStateful>
    );
  })
  .add('with unchecked', () => {
    const value = false;
    const children = text('label', 'My Checkbox Label');
    const onCheckboxChange = action('toggle');

    return (
      <CheckboxStateful value={value} onCheckboxChange={onCheckboxChange}>
        {children}
      </CheckboxStateful>
    );
  });
{{< /highlight >}}

In the end, once you start React Storybook again, you should see the Actions panel in the rendered Storybook in your browser. Once you toggle a checkbox, the action with its value and your defined name should show up. Since the action is used as `onCheckboxChange()` handler in the CheckboxStateful component, it captures the boolean value of the Checkbox component for you.

{{% chapter_header "Testing in React with Storybook" "react-testing-storybook" %}}

Visual regression tests can be used as automated tests to verify styles and layouts of your application. The latter can be useful to validate layouts on different screen sizes (e.g. responsive design). By having visual regression tests implemented, they should make sure that nothing breaks (styles, layouts). It replaces the tedious manual checking of your layout for different screen sizes or general styles in your application.

Before we enter visual regression tests with **Storybook Storyshots**, we will use the same addon to transform all of our previous stories automatically to snapshot tests first. Thus all of the components rendered in the stories will be snapshoted and diffed with their rendered DOM elements. Under the hood, the {{% a_blank "Jest" "https://facebook.github.io/jest" %}} library is used for the snapshot tests.

If you have used the previously mentioned React testing repository, you should be able to execute the already written tests with the following commands for unit/integration tests and snapshot tests:

{{< highlight javascript >}}
npm run test:unit
npm run test:snapshot
{{< /highlight >}}

Otherwise, you need to make at least sure to have Jest up and running, because it is used for the Storybook Storyshot addon. You can read up every detail about the installation in the {{% a_blank "official documenation of Storyshots" "https://github.com/storybooks/storybook/tree/master/addons/storyshots" %}}. In order to get Storyshots running with Jest, you need to install the following package:

{{< highlight javascript >}}
npm install babel-plugin-require-context-hook/register --save-dev
{{< /highlight >}}

Use it in your *.babelrc* file:

{{< highlight javascript "hl_lines=6 7 8 9 10" >}}
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "env": {
    "test": {
      "plugins": ["require-context-hook"]
    }
  }
}
{{< /highlight >}}

And include it in a new *test/jest.setup* file:

{{< highlight javascript "hl_lines=2 3" >}}
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

registerRequireContextHook();
{{< /highlight >}}

In order to run the setup file, which initializes and transforms the stories to snapshot tests before your actual snapshot tests are executed, you need to include the new file in the *test/jest.config.json* file.

{{< highlight javascript "hl_lines=4" >}}
{
  "testRegex": "((\\.|/*.)(snapshot))\\.js?$",
  "rootDir": "..",
  "setupTestFrameworkScriptFile": "<rootDir>/test/jest.setup.js"
}
{{< /highlight >}}

Finally you can install the Storybook Storyshots addon for your project on your command line:

{{< highlight javascript >}}
npm install @storybook/addon-storyshots --save-dev
{{< /highlight >}}

In the next step, there needs to be a configurational part where Storybook and Jest are connected to transform the stories into automatic snapshot tests. In the *test/jest.setup.js* file for Jest you can initialize the Storyshots addon.

{{< highlight javascript "hl_lines=2 5" >}}
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import initStoryshots from '@storybook/addon-storyshots';

registerRequireContextHook();
initStoryshots();
{{< /highlight >}}

Now, when running your Jest snapshot tests on the command line with `npm run test:snapshot` or your own command, all your stories should be executed as snapshot tests next to your actual snapshot tests. They are grouped under the Storyshots test suite. In conclusion, Storybook not only helps you to document your UI components but also to test them automatically as snapshot tests. It's powerful, isn't it?

{{% chapter_header "Visual Regression Testing in React with Storybook" "visual-regression-test-react" %}}

Now you will learn how to transform those snapshot tests automatically into visual regression tests. Rather than diffing the rendered DOM elements, a visual regression test will capture a screenshot of your rendered component from the story and diffs this screenshot against another captured screenshot once you run your test again. There are two things to enable the automatic visual regression tests. First, install another addon for it:

{{< highlight javascript >}}
npm install @storybook/addon-storyshots-puppeteer --save-dev
{{< /highlight >}}

And second, adjust the *test/jest.setup.js* file:

{{< highlight javascript "hl_lines=3 6 7 8 9 10 11" >}}
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

registerRequireContextHook();
initStoryshots({
  suite: 'Storyshots',
  test: imageSnapshot({
    storybookUrl: 'http://localhost:9001',
  }),
});
{{< /highlight >}}

The important part is defining where your Storybook can be found locally when running it. Before running again your snapshot tests on the command line in one tab, you need to make sure to run the Storybook script in another command line tab. Afterward, run the snapshot tests and verify the test output. The screenshot driven visual regression tests should work now.

Also you should be able to find the captured screenshots somewhere in your project folder. They should show the rendered Checkbox components. You can try to alter the appearance of your Checkbox components which are used in your stories and run your tests again. Afterward, you should see the failing visual regression tests, because the new screenshots differ from the previous captured screenshots. You can even see the diff of both screenshots as an image in your project folder again.

That's it already to transform snapshot tests to visual regression tests by using React Storybook. Let's take this one step further. What about visual regression testing the appearance of your component (or layout) regarding different device sizes? It would be great to have a way to automate this part as well.

First, you can install the {{% a_blank "Storybook Viewport" "https://github.com/storybooks/storybook/tree/master/addons/viewport" %}} addon on the command line to enable this feature:

{{< highlight javascript >}}
npm install @storybook/addon-viewport --save-dev
{{< /highlight >}}

Second, you need to register **Storybook Viewport** as addon again in your *.storybook/addons.js* file:

{{< highlight javascript "hl_lines=3" >}}
import '@storybook/addon-knobs/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-viewport/register';
{{< /highlight >}}

Third, you can optionally setup different viewport sizes in your *.storybook/config.js* file. But it isn't necessary, because by registering the addon you have already access to a handful of pre-defined viewports.

{{< highlight javascript "hl_lines=3 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 34 35 36" >}}
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { configureViewport } from '@storybook/addon-viewport';

// pick all stories.js files within the src/ folder
const req = require.context('../src', true, /stories\.js$/);

addDecorator(withKnobs);

const viewports = {
  small: {
    name: 'small',
    styles: {
      width: '320px',
      height: '240px',
    },
  },
  medium: {
    name: 'medium',
    styles: {
      width: '800px',
      height: '600px',
    },
  },
  large: {
    name: 'large',
    styles: {
      width: '1280px',
      height: '1024px',
    },
  },
};

configureViewport({
  viewports,
});

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
{{< /highlight >}}

Last but not least, you can use the Viewport component from the Storybook Viewport addon to render your component as child in a specified viewport. The viewport can be defined in your previous custom viewports, but it can be also a viewport which comes already with the Viewport addon.

{{< highlight javascript "hl_lines=5 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36" >}}
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Viewport } from '@storybook/addon-viewport';
import Checkbox from './';

...

storiesOf('Checkbox', module)
  .add('with medium', () => {
    const value = true;
    const children = text('label', 'My Checkbox Label');
    const onCheckboxChange = action('toggle');

    return (
      <Viewport name="medium">
        <CheckboxStateful value={value} onCheckboxChange={onCheckboxChange}>
          {children}
        </CheckboxStateful>
      </Viewport>
    );
  })
  .add('with iphone6 Plus', () => {
    const value = true;
    const children = text('label', 'My Checkbox Label');
    const onCheckboxChange = action('toggle');

    return (
      <Viewport name="iphone6p">
        <CheckboxStateful value={value} onCheckboxChange={onCheckboxChange}>
          {children}
        </CheckboxStateful>
      </Viewport>
    );
  })
  .add('with checked', () => {
    ...
  })
  .add('with unchecked', () => {
    ...
  });
{{< /highlight >}}

The Storybook Viewport addon makes lots of sense when you have complex layouts due to CSS media queries and want to have a manual (Storybook) but also an automatic way (visual regression test) to validate and test them. Because after all, the visual regression tests are executed for these stories as well.

<hr class="section-divider">

The final application which implements all the previously shown React Storybook addons can be found in {{% a_blank "this GitHub repository" "https://github.com/rwieruch/visual-regression-testing-react-storybook" %}}. In the end, I hope the article was helpful for you to deploy visual regression testing in your React applications. Keep in mind that Storybook should work with other view layer libraries too. In conclusion, visual regression testing can be a huge benefit ensuring that different layouts work for different device sizes and ensuring that stylings in your application are not breaking. Apart from the testing, React Storybook itself gives you a great tool to document your UI components of your application for non developers but also developers.