---
title: "How to use CSS Modules in create-react-app?"
description: "The article is a short how to use CSS Modules in your create-react-app application. It shows you how to setup CSS Modules, but also how to use it in your components ..."
date: "2018-10-03T13:50:46+02:00"
categories: ["React"]
keywords: ["create-react-app css modules", "create-react-app css modules without eject"]
hashtags: ["#100DaysOfCode", "#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

The article is a short **how to use CSS Modules in your create-react-app application**. It shows you how to setup CSS Modules, but also how to use them in your components.

After you have setup your application with [create-react-app](https://github.com/facebook/create-react-app) (e.g. `npx create-react-app my-app`), you don't need to install anything else to make CSS modules work. They come out of the box, but you have to give your CSS files the "module" prefix prior the extension: *.module.css*

Let's try out how CSS Modules in React work. Let's say our App component already uses a Navigation component to display links the following way:

```javascript
import React, { Component } from 'react';

import Navigation from './Navigation';

const LINKS = [
  { label: 'Website', to: 'https://www.robinwieruch.de/' },
  { label: 'Twitter', to: 'https://twitter.com/rwieruch' },
];

class App extends Component {
  render() {
    return (
      <div>
        <Navigation links={LINKS} />
      </div>
    );
  }
}

export default App;
```

Next, create the Navigation component in a *src/Navigation.js* file. As you can see, it takes a list of links [as props](/react-pass-props-to-component/) and renders its content in a list of anchor tags.

```javascript
import React from 'react';

const Navigation = ({ links }) => (
  <div>
    <ul>
      {links.map(link => (
        <li key={link.to}>
          <a href={link.to}>{link.label}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default Navigation;
```

Now, let's say the following *src/Navigation.module.css* file has all the styles for the Navigation component. Structuring styling in a CSS modules could look the following way:

```css
.navigation {
  background-color: #222;
}

.navigation-list {
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  justify-content: center;
}

.navigation-list-item {
  margin: 10px 20px;
}

.navigation-list-item-anchor {
  text-decoration: none;
  color: #ffffff;
}

.navigation-list-item-anchor:visited {
  color: #ffffff;
}

.navigation-list-item-anchor:hover {
  color: #525dce;
}
```

Now, import all styles as default by using an import statement in your *src/Navigation.js* file. The imported styles is an object where all the defined CSS styles can get extracted:

```javascript{3,6,7,9,11}
import React from 'react';

import styles from './Navigation.module.css';

const Navigation = ({ links }) => (
  <div className={styles['navigation']}>
    <ul className={styles['navigation-list']}>
      {links.map(link => (
        <li key={link.to} className={styles['navigation-list-item']}>
          <a
            className={styles['navigation-list-item-anchor']}
            href={link.to}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Navigation;
```

In case of the navigation style, you can retrieve it with `styles.navigation` too. However, for the other styles with dashes you need to retrieve them with strings from the object.

Once you start your application, everything should work as expected. You can find the final application in this [GitHub repository](https://github.com/the-road-to-learn-react/create-react-app-with-css-modules). CSS modules are only one way of styling your applications. There are plenty of other ways to do it. In React, two other common ways of styling applications are [styled-components](https://github.com/the-road-to-learn-react/react-styled-components-example) and [Sass](/create-react-app-with-sass-support).

