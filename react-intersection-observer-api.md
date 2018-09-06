+++
title = "Intersection Observer API in React"
description = "A tutorial to learn about the Intersection Observer API in React. You will use React's ref API with createRef() to observe elements in your React application in context of the viewport ..."
date = "2018-09-05T13:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react intersection observer api", "react createRef", "react ref API"]
news_keywords = ["react intersection observer api", "react createRef", "react ref API"]
hashtag = "#ReactJs"
card = "img/posts/react-intersection-observer-api/banner_640.jpg"
banner = "img/posts/react-intersection-observer-api/banner.jpg"
contribute = "react-intersection-observer-api.md"
headline = "Intersection Observer API in React"

summary = "A tutorial to learn about the Intersection Observer API in React. You will use React's ref API with createRef() to observe elements in your React application in context of the viewport."
+++

{{% sponsorship %}}

{{% pin_it_image "react intersection observer api" "img/posts/react-intersection-observer-api/banner.jpg" "is-src-set" %}}

{{% read_before_2 "This tutorial is part 2 of 2 in this series." "Part 1a:" "A simple React.js on Windows Setup" "https://www.robinwieruch.de/react-js-windows-setup/" "Part 1b:" "A simple React.js on MacOS Setup" "https://www.robinwieruch.de/react-js-macos-setup/" %}}

The Intersection Observer API is a browser API which can be used to track the position of HTML elements in context to the actual viewport of the browser. The {{% a_blank "official documentation" "https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API" %}} says: *"The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport."*

**It can be used for various scenarios:** For instance, what about coloring the background color of your application or animating SVGs when a user scrolls through your application? What about [fetching more data](https://www.robinwieruch.de/react-fetching-data/) when [reaching the end of a list of items](https://www.robinwieruch.de/react-paginated-list/)? In order to implement such behaviors, you need to know when an HTML element enters (or leaves) the viewport (the user's visible area of a web page) in your browser. Historically there was no dedicated API for this and one had to use other APIs (e.g. {{% a_blank "Element.getBoundingClientRect()" "https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect" %}}) for workarounds. Now it is possible with the intersection observer API.

In this tutorial, I want to show you how to use the intersection observer API in React. We will implement a specific use case with it, but as mentioned, there are various scenarios where the intersection observer API can be applied (in React). In order to get started, it's good to know about [React's ref API](https://www.robinwieruch.de/react-ref-attribute-dom-node/), because it is applied to enable the connection between DOM nodes and the intersection observer in React. Otherwise React is a declarative view layer library where it is not planned to access DOM nodes.

{{% chapter_header "Anchor-based Navigation in React" "anchor-based-navigation-react" %}}

In this section, let's build a application which can be used in the following sections as use case for the intersection observer API. We want to show a written article with multiple sections. Obviously it is already possible to scroll through the article. But what about very long read articles? It would be great to have some kind of navigation to jump between sections of the article. That's when anchor based navigation comes into play. You can see the application that we are going to build and an example of how it looks like in this {{% a_blank "GitHub repository" "https://github.com/the-road-to-learn-react/react-intersection-observer-api-example" %}}.

First, let's have a application which renders a list of items. Each items represents a section of an article. Later, it should be possible to jump between these sections.

{{< highlight javascript >}}
import React, { Component } from 'react';
import li from 'lorem-ipsum';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      things: [
        {
          id: 'a',
          headline: 'React',
          text: li({ count: 50, units: 'sentences' }),
        },
        {
          id: 'b',
          headline: 'Redux',
          text: li({ count: 50, units: 'sentences' }),
        },
        {
          id: 'c',
          headline: 'GraphQL',
          text: li({ count: 50, units: 'sentences' }),
        },
      ],
    };
  }

  render() {
    return (
      <div>
        {this.state.things.map(thing => (
          <div key={thing.id}>
            <h1>{thing.headline}</h1>
            <p>{thing.text}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

The application uses the neat {{% a_blank "lorem-ipsum" "https://github.com/knicklabs/lorem-ipsum.js" %}} node package to generate sample text. It comes with a couple of configurations that can be used, for instance, to adjust the length of text. You can install it via npm with `npm install lorem-ipsum`. Furthermore, the application uses {{% a_blank "JavaScript arrow functions" "https://www.robinwieruch.de/javascript-fundamentals-react-requirements/" %}} for keeping the rendered list of items in React's JSX concise.

Second, let's implement the anchor-based navigation. It's not really related to React and only requires you to use anchor tags which navigate to an identifier with a `#` prefix and each element of the list of items to have a matching identifier. We will use JavaScript template literals to interpolate the prefix with the identifier.

{{< highlight javascript "hl_lines=11 12 13 14 15 16 17 18 22 28" >}}
import React, { Component } from 'react';
import li from 'lorem-ipsum';

class App extends Component {
  constructor(props) {
    ...
  }

  render() {
    return (
      <div>
        <nav>
          {this.state.things.map(thing => (
            <div key={thing.id}>
              <a href={`#${thing.id}`}>{thing.headline}</a>
            </div>
          ))}
        </nav>

        <div>
          {this.state.things.map(thing => (
            <div key={thing.id} id={thing.id}>
              <h1>{thing.headline}</h1>
              <p>{thing.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

That's it for the anchor-based navigation. Clicking an anchor tag should navigate you to the matching section in the article. Next, before introducing the use case for the intersection observer API, you are going to style the application a bit. It would make sense to have the navigation next to the list of items, wouldn't it? Then only the article scrolls but the navigation is fixed to the side.

{{% chapter_header "Styling a React application with Styled Components" "react-styled-components" %}}

{{% a_blank "Styled components" "https://github.com/styled-components/styled-components" %}} is a popular solution for styling React applications. It follows the philosophy of "everything is a component". So why shouldn't be a styled HTML element just a React component? You can install it for your application via npm with `npm install styled-components` on the command line. Now, let's give the application the necessary style. First, align the navigation and the article horizontally:

{{< highlight javascript "hl_lines=2 5 6 7 16 33" >}}
import React, { Component } from 'react';
import styled from 'styled-components';
import li from 'lorem-ipsum';

const Horizontal = styled.div`
  display: flex;
`;

class App extends Component {
  constructor(props) {
    ...
  }

  render() {
    return (
      <Horizontal>
        <nav>
          {this.state.things.map(thing => (
            <div key={thing.id}>
              <a href={`#${thing.id}`}>{thing.headline}</a>
            </div>
          ))}
        </nav>

        <div>
          {this.state.things.map(thing => (
            <div key={thing.id} id={thing.id}>
              <h1>{thing.headline}</h1>
              <p>{thing.text}</p>
            </div>
          ))}
        </div>
      </Horizontal>
    );
  }
}

export default App;
{{< /highlight >}}

Second, give the navigation some margin and let only the article scroll while the navigation stays fixed:

{{< highlight javascript "hl_lines=7 8 9 11 12 13 14 24 30 32 39" >}}
...

const Horizontal = styled.div`
  display: flex;
`;

const Navigation = styled.nav`
  margin: 30px;
`;

const Article = styled.div`
  overflow-y: scroll;
  height: 100vh;
`;

class App extends Component {
  constructor(props) {
    ...
  }

  render() {
    return (
      <Horizontal>
        <Navigation>
          {this.state.things.map(thing => (
            <div key={thing.id}>
              <a href={`#${thing.id}`}>{thing.headline}</a>
            </div>
          ))}
        </Navigation>

        <Article>
          {this.state.things.map(thing => (
            <div key={thing.id} id={thing.id}>
              <h1>{thing.headline}</h1>
              <p>{thing.text}</p>
            </div>
          ))}
        </Article>
      </Horizontal>
    );
  }
}

export default App;
{{< /highlight >}}

And third, give your anchor some style too whereas a selected boolean is used to accentuate the anchor with optional style. You can read more about this implementation detail in the {{% a_blank "official documentation" "https://www.styled-components.com/docs/basics#adapting-based-on-props" %}} for styled components.

{{< highlight javascript "hl_lines=2 18 19 20 21 22 23 24 25 26 27 28 29 30 43 44 45 46 48" >}}
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import li from 'lorem-ipsum';

const Horizontal = styled.div`
  display: flex;
`;

const Navigation = styled.nav`
  margin: 30px;
`;

const Article = styled.div`
  overflow-y: scroll;
  height: 100vh;
`;

const Anchor = styled.a`
  display: block;
  margin-bottom: 10px;
  text-decoration: none;

  ${props =>
    props.selected
      ? css`
          border-bottom: 1px solid #000;
          font-weight: bold;
        `
      : null};
`;

class App extends Component {
  constructor(props) {
    ...
  }

  render() {
    return (
      <Horizontal>
        <Navigation>
          {this.state.things.map(thing => (
            <div key={thing.id}>
              <Anchor
                href={`#${thing.id}`}
                selected={thing.id === 'a'}
              >
                {thing.headline}
              </Anchor>
            </div>
          ))}
        </Navigation>

        <Article>
          {this.state.things.map(thing => (
            <div key={thing.id} id={thing.id}>
              <h1>{thing.headline}</h1>
              <p>{thing.text}</p>
            </div>
          ))}
        </Article>
      </Horizontal>
    );
  }
}

export default App;
{{< /highlight >}}

The selected styling comes into play in the next section of this tutorial where the intersection observer API is applied to check whether a section is currently viewed by a user or not. For now, every section gets a `false` selection boolean flag [passed as prop](https://www.robinwieruch.de/react-pass-props-to-component/) except for the matching section with the id "a".

{{% pin_it_image "react anchor-based navigation" "img/posts/react-intersection-observer-api/article-navigation-side-by-side.png" "is-src-set" %}}

{{% chapter_header "Intersection Observer API in React" "react-intersection-observer-api" %}}

Finally, we are going to introduce the intersection observer API in React. The use case: It should be possible to tell only by looking at the navigation which section is currently read by the user. So when a user scrolls through the article, the navigation should always highlight the current section. That's why we have introduced the selected boolean flag for the Anchor component before. But at the moment, we are not able to tell if the anchor should be selected or not. That's where the intersection observer API can help us, because it should know which section is in the specified viewport of the user.

First, we are going to create references for our elements that need to be accessible for the intersection observer. These elements are the single sections (things) but also the wrapping parent element which is used as anchor for the intersection observer later.

{{< highlight javascript "hl_lines=27 29 30 31 32 42 47" >}}
...

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      things: [
        {
          id: 'a',
          headline: 'React',
          text: li({ count: 50, units: 'sentences' }),
        },
        {
          id: 'b',
          headline: 'Redux',
          text: li({ count: 50, units: 'sentences' }),
        },
        {
          id: 'c',
          headline: 'GraphQL',
          text: li({ count: 50, units: 'sentences' }),
        },
      ],
    };

    this.rootRef = React.createRef();

    this.singleRefs = this.state.things.reduce((acc, value) => {
      acc[value.id] = React.createRef();
      return acc;
    }, {});
  }

  render() {
    return (
      <Horizontal>
        <Navigation>
          ...
        </Navigation>

        <Article ref={this.rootRef}>
          {this.state.things.map(thing => (
            <div
              key={thing.id}
              id={thing.id}
              ref={this.singleRefs[thing.id]}
            >
              <h1>{thing.headline}</h1>
              <p>{thing.text}</p>
            </div>
          ))}
        </Article>
      </Horizontal>
    );
  }
}

export default App;
{{< /highlight >}}

By having these, it should be possible to track every mapped element within the Article component in relation to the Article as root reference. In order to get to this point, you have used React's createRef() API and a {{% a_blank "JavaScript reduce function" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce" %}} to create an object (dictionary) of references which can be accessed by ids in the render method again.

Second, let's introduce the intersection observer API which consists of an initialization and observe part:

{{< highlight javascript "hl_lines=16 17 18 20 21 22 23 26 27 28 29 30" >}}
...

class App extends Component {
  constructor(props) {
    super(props);

    ...

    this.rootRef = React.createRef();

    this.singleRefs = this.state.things.reduce((acc, value) => {
      acc[value.id] = React.createRef();
      return acc;
    }, {});

    const callback = entries => {
      console.log(entries);
    };

    this.observer = new IntersectionObserver(callback, {
      root: this.rootRef.current,
      threshold: new Array(101).fill(0).map((v, i) => i * 0.01),
    });
  }

  componentDidMount() {
    Object.values(this.singleRefs).forEach(value =>
      this.observer.observe(value.current),
    );
  }

  render() {
    return (
      <Horizontal>
        <Navigation>
          ...
        </Navigation>

        <Article ref={this.rootRef}>
          {this.state.things.map(thing => (
            <div
              key={thing.id}
              id={thing.id}
              ref={this.singleRefs[thing.id]}
            >
              <h1>{thing.headline}</h1>
              <p>{thing.text}</p>
            </div>
          ))}
        </Article>
      </Horizontal>
    );
  }
}

export default App;
{{< /highlight >}}

The IntersectionObserver constructor takes two arguments: a callback function which is called every time an observed element (single ref) changes its position relatively to the viewport (root ref) and a configuration object. In the configuration object, you can pass the root reference. If it is not passed, it defaults to the browser's viewport. The threshold is another configuration where you can make a fine-grained choice when to trigger the callback function of the observer.

**Root:** *"The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null."*

**Threshold:** *"Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible."*

In addition, you have to initiate the observation explicitly by passing all elements (single refs) to the observer's observe method. This happens in React in the `componentDidMount()` lifecycle method, because only then the all refs are applied for the elements in the `render()` method.

Trying it this way, you should already be able to see the console logs from the callback function in your browser's dev tools. The callback has all entries accessible which have changed their position in relation to the root reference regarding to the defined thresholds. Each entry has a intersectionRatio property which tells us how much of the single referenced element is visible in the viewport (root reference). That's it for the intersection observer setup in React.

However, let's accomplish to our use case: We want to know about the selected element in the navigation by selecting element for the entry (single ref) with the highest intersection ratio. It could be as straight forward as filtering all entries from the callback function and choosing the one with the highest intersection ratio. But that doesn't work, because only the changed entries are accessible in the callback function. It can still happen that an entry which is not in the callback function has the highest intersection ratio, because it didn't pass a threshold. That's why we need to keep track of the ratios of **each** single reference. That can be done at one go in the object (dictionary) where we have set up the single references previously.

{{< highlight javascript "hl_lines=12 13 14 15 16 17 18 33 49" >}}
...

class App extends Component {
  constructor(props) {
    super(props);

    ...

    this.rootRef = React.createRef();

    this.singleRefs = this.state.things.reduce((acc, value) => {
      acc[value.id] = {
        ref: React.createRef(),
        id: value.id,
        ratio: 0,
      };

      return acc;
    }, {});

    const callback = entries => {
      console.log(entries);
    };

    this.observer = new IntersectionObserver(callback, {
      root: this.rootRef.current,
      threshold: new Array(101).fill(0).map((v, i) => i * 0.01),
    });
  }

  componentDidMount() {
    Object.values(this.singleRefs).forEach(value =>
      this.observer.observe(value.ref.current),
    );
  }

  render() {
    return (
      <Horizontal>
        <Navigation>
          ...
        </Navigation>

        <Article ref={this.rootRef}>
          {this.state.things.map(thing => (
            <div
              key={thing.id}
              id={thing.id}
              ref={this.singleRefs[thing.id].ref}
            >
              <h1>{thing.headline}</h1>
              <p>{thing.text}</p>
            </div>
          ))}
        </Article>
      </Horizontal>
    );
  }
}

export default App;
{{< /highlight >}}

Every single reference is initiated with a ratio of 0. Now, once the callback function is called, it should updated these ratios in the object. The target and its id of an entry can be used to find the corresponding single reference in the object (hence the dictionary) and to update the intersection ratio.

{{< highlight javascript "hl_lines=22 23 24 25 26" >}}
...

class App extends Component {
  constructor(props) {
    super(props);

    ...

    this.rootRef = React.createRef();

    this.singleRefs = this.state.things.reduce((acc, value) => {
      acc[value.id] = {
        ref: React.createRef(),
        id: value.id,
        ratio: 0,
      };

      return acc;
    }, {});

    const callback = entries => {
      entries.forEach(
        entry =>
          (this.singleRefs[entry.target.id].ratio =
            entry.intersectionRatio),
      );
    };

    this.observer = new IntersectionObserver(callback, {
      root: this.rootRef.current,
      threshold: new Array(101).fill(0).map((v, i) => i * 0.01),
    });
  }

  componentDidMount() {
    Object.values(this.singleRefs).forEach(value =>
      this.observer.observe(value.ref.current),
    );
  }

  render() {
    ...
  }
}

export default App;
{{< /highlight >}}

You may wonder why we haven't used React's local state for keeping track of the changing ratios. It's because we don't want to trigger a re-render with every observer callback call. It would lead to a bad performance for the application while scrolling through the list. Instead, you can use the component's instance (this) to keep track of the single references with their intersection ratios without triggering a re-render on every scroll event.

Now, you need to find the highest ratio of **every** single reference (not only the entries, that's why we keep track of all the ratios). Once you have the reference with the highest ratio, you can compare it to the current reference with the highest ratio. If the new highest ratio is higher than the current highest ratio, you can set the current single reference as state.

{{< highlight javascript "hl_lines=9 31 32 33 34 36 37 38" >}}
...

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      things: [ ... ],
      activeThing: { id: null, ratio: 0 },
    };

    this.rootRef = React.createRef();

    this.singleRefs = this.state.things.reduce((acc, value) => {
      acc[value.id] = {
        ref: React.createRef(),
        id: value.id,
        ratio: 0,
      };

      return acc;
    }, {});

    const callback = entries => {
      entries.forEach(
        entry =>
          (this.singleRefs[entry.target.id].ratio =
            entry.intersectionRatio),
      );

      const activeThing = Object.values(this.singleRefs).reduce(
        (acc, value) => (value.ratio > acc.ratio ? value : acc),
        this.state.activeThing,
      );

      if (activeThing.ratio > this.state.activeThing.ratio) {
        this.setState({ activeThing });
      }
    };

    this.observer = new IntersectionObserver(callback, {
      root: this.rootRef.current,
      threshold: new Array(101).fill(0).map((v, i) => i * 0.01),
    });
  }

  componentDidMount() {
    Object.values(this.singleRefs).forEach(value =>
      this.observer.observe(value.ref.current),
    );
  }

  render() {
    ...
  }
}

export default App;
{{< /highlight >}}

Also you start out with an initial local state for the active single reference (`activeThing`). Then it can be used when the observer is called the first time when it needs it to compare to against the new active thing. Last but not least, the `activeThing` tells you which single reference has the highest intersection ratio in the viewport (here the root ref). In the end, it can be used to selected the matching element in the navigation.

{{< highlight javascript "hl_lines=16" >}}
...

class App extends Component {
  constructor(props) {
    ...
  }

  render() {
    return (
      <Horizontal>
        <Navigation>
          {this.state.things.map(thing => (
            <div key={thing.id}>
              <Anchor
                href={`#${thing.id}`}
                selected={thing.id === this.state.activeThing.id}
              >
                {thing.headline}
              </Anchor>
            </div>
          ))}
        </Navigation>

        <Article ref={this.rootRef}>
          {this.state.things.map(thing => (
            <div
              key={thing.id}
              id={thing.id}
              ref={this.singleRefs[thing.id].ref}
            >
              <h1>{thing.headline}</h1>
              <p>{thing.text}</p>
            </div>
          ))}
        </Article>
      </Horizontal>
    );
  }
}

export default App;
{{< /highlight >}}

Once you scroll through your application, the navigation element with the highest intersection ratio should be selected. In case you run into issues with the intersection observer (e.g. ReferenceError: IntersectionObserver is not defined), you can install a {{% a_blank "polyfill" "https://github.com/w3c/IntersectionObserver" %}} for it. It can be done on the command line via npm with `npm install intersection-observer`. Then you can import it in your application with `import 'intersection-observer';`. This should also help to get your tests working with the intersection observer API.

<hr class="section-divider">

After all, React's ref API is the necessary connection between React and the intersection observer API. The finished application can be found in this {{% a_blank "GitHub repository" "https://github.com/the-road-to-learn-react/react-intersection-observer-api-example" %}}. The previous use case was only one applicable scenario where the intersection observer can be used. You should try to apply it for your own use case. I would be happy to see what you have come up with.
