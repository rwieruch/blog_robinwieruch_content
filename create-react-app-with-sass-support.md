+++
title = "create-react-app with Sass"
description = "A short guide on how to add Sass support to your create-react-app application which shows you how to setup Sass, but also how to use it in your React components ..."
date = "2018-10-03T13:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["create-react-app sass", "create-react-app sass support", "create-react-app sass without eject"]
news_keywords = ["create-react-app sass", "create-react-app sass support", "create-react-app sass without eject"]
hashtag = "#ReactJs"
card = "img/posts/create-react-app-sass-support/banner_640.jpg"
banner = "img/posts/create-react-app-sass-support/banner.jpg"
contribute = "create-react-app-sass-support.md"
headline = "create-react-app with Sass"

summary = "The article is a short how to add Sass support to your create-react-app application. It shows you how to setup Sass, but also how to use it in your components. You will learn how to style a specific component with it and how to define global style, such as variables for your color schema, that can be used throughout your application."
+++

{{% sponsorship %}}

{{% pin_it_image "create-react-app sass" "img/posts/create-react-app-sass-support/banner.jpg" "is-src-set" %}}

The article is a short **how to add Sass support to your create-react-app application**. It shows you how to setup Sass, but also how to use it in your components. You will learn how to style a specific component with it and how to define global style, such as variables for your color schema, that can be used throughout your application.

After you have setup your application with {{% a_blank "create-react-app" "https://github.com/facebook/create-react-app" %}} (e.g. `create-react-app my-app`), you can install the Sass support with `npm install node-sass --save` for create-react-app. You don't need to change any other configuration.

Now, let's try out how Sass in React works. Let's say our App component already uses a Navigation component to display links the following way:

{{< highlight javascript >}}
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
{{< /highlight >}}

Next, create the Navigation component in a *src/Navigation.js* file. As you can see, it takes a list of links [as props](https://www.robinwieruch.de/react-pass-props-to-component/) and renders its content in a list of anchor tags.

{{< highlight javascript >}}
import React from 'react';

import './Navigation.scss';

const Navigation = ({ links }) => (
  <div className="Navigation">
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
{{< /highlight >}}

The file also imports a *Navigation.scss* file that can be used for the Sass styling of the component. One such styling is already in place with the "Navigation" className. Let's see how the *.scss* file could look like to define this class:

{{< highlight css >}}
.Navigation {
  background-color: #222;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    display: flex;
    justify-content: center;
  }

  li {
    margin: 10px 20px;
  }

  a {
    text-decoration: none;
  }

  a,
  a:visited {
    color: #ffffff;
  }

  a:hover {
    color: #525dce;
  }
}
{{< /highlight >}}

Sass allows you to nest your tags. That's already one improvement by using this preprocessor over normal CSS. Another {{% a_blank "feature of Sass" "https://sass-lang.com" %}} may be variables. Change the following two lines in order to use variables instead:

{{< highlight css "hl_lines=1 4 29" >}}
@import './index.scss';

.Navigation {
  background-color: $primary-background;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    display: flex;
    justify-content: center;
  }

  li {
    margin: 10px 20px;
  }

  a {
    text-decoration: none;
  }

  a,
  a:visited {
    color: #ffffff;
  }

  a:hover {
    color: $primary-color;
  }
}
{{< /highlight >}}

The variables were imported from the *src/index.scss* file in which you have to define the variables after all. Make sure to rename your *src/index.css* file to *src/index.scss* before you make the following changes in it:

{{< highlight css "hl_lines=10 11" >}}
body {
  margin: 0;
  padding: 0;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
}

$primary-color: #525dce;
$primary-background: #222;
{{< /highlight >}}

Last but not least, change the import in the *src/index.js* file for this file to capture the correct file extension:

{{< highlight javascript "hl_lines=4" >}}
import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
{{< /highlight >}}

Finally, the variables are usable in the *src/Navigation.scss* file. Once you start your application, everything should work as expected. You can find the final application in this {{% a_blank "GitHub repository" "https://github.com/the-road-to-learn-react/create-react-app-with-sass" %}}.

<hr class="section-divider">

Sass comes with plenty of powerful features, such as nesting and variables, to give you more flexibility when building your web applications. However, it is only one way of styling your applications. There are plenty of other ways to do it. In React, two other common ways of styling applications are {{% a_blank "styled-components" "https://github.com/the-road-to-learn-react/react-styled-components-example" %}} and [CSS Modules](https://www.robinwieruch.de/create-react-app-css-modules).

