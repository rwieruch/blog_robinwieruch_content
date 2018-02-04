+++
title = "How to accept Paypal payments with React"
description = "Ever wondered how to integrate Paypal in your React application? This tutorial guides you through the setup process from using a Paypal checkout form in your React application. Afterward you are ready to receive Paypal payments in your React.js application ..."
date = "2018-02-04T13:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react paypal", "react paypal integration"]
news_keywords = ["react paypal"]
hashtag = "#ReactJs"
card = "img/posts/react-paypal-payment/banner_640.jpg"
banner = "img/posts/react-paypal-payment/banner.jpg"
contribute = "react-paypal-payment.md"
headline = "How to accept Paypal payments with React"

summary = "Accepting payments on your own website can be a recurring problem. Often you'll find yourself avoiding it. There are platforms such as Gumroad which deal with this problem by outsourcing it. However, at some point you want to avoid these third-party platforms and introduce your own payment system."
+++

{{% pin_it_image "react paypal integration" "img/posts/react-paypal-payment/banner.jpg" "is-src-set" %}}

This React tutorial should give you guidance on how to integrate PayPal in your React application. I came across this topic when I had to introduce a payment process for my [own course platform](https://www.robinwieruch.de/how-to-build-your-own-course-platform/). As I went through the same decision process, I decided in favor of PayPal and Stripe.

This tutorial shows you how to integrate PayPal in your React application. There are a couple of open source React + PayPal components out there. But I found out that it isn't too difficult to set it up on your own. Afterward, you have full control over the PayPal payments in your React applications.

If you are interested in a full blown payment solution with PayPal and Stripe in React, you can also read [about the Stripe in React setup](https://www.robinwieruch.de/react-express-stripe-payment/) in my other article.

{{% chapter_header "Create a Paypal REST API app" "paypal-rest-api-app" %}}

Fortunately you don't need to setup an own payment server for PayPal. You can implement a React component with the PayPal business logic and reuse it everywhere in your application(s).

Before you can implement the component, you need to {{% a_blank "create a PayPal REST API application" "https://developer.paypal.com" %}}. Your "App Name" can be any name. It's only for yourself to identify your application in case you have more than one PayPal REST API app.

After you have created the app on the PayPal dashboard, you should find your Client IDs for your sandbox and live application. You will need both in order to test your PayPal payment in development mode but also to use it in production mode in your React application.

{{% chapter_header "PayPal React Component" "paypal-react-component" %}}

Now let's build the PayPal React component from scratch. It will be a class component, because we have to manage state in React's local state and use a couple of lifecycle methods.

{{< highlight javascript >}}
import React from 'react';
import ReactDOM from 'react-dom';

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButton: false,
    };
  }

  componentDidMount() {
    // Todo
  }

  componentWillReceiveProps(nextProps) {
    // Todo
  }

  render() {
    // Todo
  }
}

export default PaypalButton;
{{< /highlight >}}

Why is it necessary to manage a local state? PayPal has its own library for its REST API and a abstracted React helper component, but it's not available via npm. Thus we need to load it asynchronously in our component. After we have loaded everything, the `showButton` state can be used to render the button.

Let's load the PayPal script asynchronously in our React component. Additionally, make sure to bind React and ReactDOM to the window object, because its needed for the PayPal React Component which comes with the library.

{{< highlight javascript "hl_lines=3 13 14 30" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButton: false,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    // Todo
  }

  componentWillReceiveProps(nextProps) {
    // Todo
  }

  render() {
    // Todo
  }
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);
{{< /highlight >}}

If you haven't installed by now, you need to install the {{% a_blank "react-async-script-loader" "https://github.com/leozdgao/react-async-script-loader" %}} via npm. The `scriptLoader` is a [higher order component](https://www.robinwieruch.de/gentle-introduction-higher-order-components/) which can be used in React to lazy load scripts.

{{< highlight javascript >}}
npm install react-async-script-loader
{{< /highlight >}}

Now, in the `componentDidMount()` lifecycle method, you can decide if the button should be rendered already. The `scriptLoader` gives you access to two properties in the props of the component, `isScriptLoaded` and `isScriptLoadSucceed`, to check if the script was loaded successfully. If that is the case, you could already render the PayPal button.

{{< highlight javascript "hl_lines=17 18 19 20 21 22 23 24 25 26" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButton: false,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const {
      isScriptLoaded,
      isScriptLoadSucceed
    } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    // Todo
  }

  render() {
    // Todo
  }
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);
{{< /highlight >}}

In most cases the script isn't loaded in the `componentDidMount()` lifecycle method. This lifecycle method runs only once when the component is instantiated and it's not 100% certain to have the script loaded at this point in time. Therefore you still have the `componentWillReceiveProps()` lifecycle method to check for the loaded script.

{{< highlight javascript "hl_lines=28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButton: false,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const {
      isScriptLoaded,
      isScriptLoadSucceed
    } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      isScriptLoaded,
      isScriptLoadSucceed,
    } = nextProps;

    const isLoadedButWasntLoadedBefore =
      !this.state.showButton &&
      !this.props.isScriptLoaded &&
      isScriptLoaded;

    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }
  }

  render() {
    // Todo
  }
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);
{{< /highlight >}}

Now the only lifecycle method missing is the `render()` method. Let's see what should be rendered in this method.

{{< highlight javascript "hl_lines=9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

class PaypalButton extends React.Component {

  ...

  render() {
    const {
      total,
      currency,
      env,
      commit,
      client,
      onSuccess,
      onError,
      onCancel,
    } = this.props;

    const {
      showButton,
    } = this.state;

    const payment = // Todo

    const onAuthorize = // Todo

    return (
      <div>
        {showButton && <paypal.Button.react
          env={env}
          client={client}
          commit={commit}
          payment={payment}
          onAuthorize={onAuthorize}
          onCancel={onCancel}
          onError={onError}
        />}
      </div>
    );
  }
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);
{{< /highlight >}}

There are many props which are passed to your PayPal component. Let's check what they stand for:

* currency: Your desired currency (e.g. USD) to charge a customer.
* total: The total amount of your desired currency (e.g. $1 would be a total amount of 100).
* commit: If set to true then the PayPal checkout flow will display a 'Pay Now' button.
* client: An object which has your Client IDs for Sandbox and Production.
* env: Environment mode (development, production) to choose a Client ID from the `client` object.
* onSuccess: A handler to do something in case the payment was successful.
* onError: A handler to do something in case the payment was erroneous.
* onCancel: A handler to do something in case the payment was cancelled.

You will see in a later step how these props are passed to the PayPal component from a parent component which uses the PayPal component. For now, let's focus on finishing the implementation. As you can see, the `showButton` boolean from React's local component state is used for a [conditional rendering](https://www.robinwieruch.de/conditional-rendering-react/) of the PayPal button.

The only thing left is to implement the payment business logic in the `payment()` and `onAuthorize()` functions which follows PayPals REST API definition. First, you have to create a payment with the amount and currency grouped with your Client ID based on the environment. Second, you can execute the transaction.

{{< highlight javascript "hl_lines=25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

class PaypalButton extends React.Component {

  ...

  render() {
    const {
      total,
      currency,
      env,
      commit,
      client,
      onSuccess,
      onError,
      onCancel,
    } = this.props;

    const {
      showButton,
    } = this.state;

    const payment = () =>
      paypal.rest.payment.create(env, client, {
        transactions: [
          {
            amount: {
              total,
              currency,
            }
          },
        ],
      });

    const onAuthorize = (data, actions) =>
      actions.payment.execute()
        .then(() => {
          const payment = {
            paid: true,
            cancelled: false,
            payerID: data.payerID,
            paymentID: data.paymentID,
            paymentToken: data.paymentToken,
            returnUrl: data.returnUrl,
          };

          onSuccess(payment);
        });

    return (
      <div>
        {showButton && <paypal.Button.react
          env={env}
          client={client}
          commit={commit}
          payment={payment}
          onAuthorize={onAuthorize}
          onCancel={onCancel}
          onError={onError}
        />}
      </div>
    );
  }
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);
{{< /highlight >}}

That's it for the PayPal button implementation. Now, how would you finally make use of it in another component?

{{< highlight javascript >}}
import React from 'react';
import PaypalButton from './PaypalButton';

const CLIENT = {
  sandbox: 'xxxXXX',
  production: 'xxxXXX',
};

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

class App extends React.Component {
  render() {
    const onSuccess = (payment) =>
      console.log('Successful payment!', payment);

    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);

    const onCancel = (data) =>
      console.log('Cancelled payment!', data);

    return (
      <div>
        <PaypalButton
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={'USD'}
          total={100}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

It's a security risk to keep the Client IDs in your source code. It's better to include them in a .env file. That way, you prevent to make them publicly available. Don't forget to add the .env file to your .gitignore file if you are using GitHub.

{{< highlight javascript "hl_lines=4 5 6 7" >}}
import React from 'react';
import PaypalButton from './PaypalButton';

const CLIENT = {
  sandbox: process.env.PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.PAYPAL_CLIENT_ID_PRODUCTION,
};

class App extends React.Component {
  ...
}

export default App;
{{< /highlight >}}

That's basically the whole implementation of the PayPal component in React with the official PayPal libraries. Now you can use it in various applications. Hopefully, the tutorial helped you to setup PayPal in React on your own.

