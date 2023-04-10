---
title: "How to learn React as a Library or Framework [2023]"
description: "Learning React in 2023 as a library or framework is not an easy decision. Whether to learn React with Next.js as a framework ..."
date: "2023-04-04T07:52:46+02:00"
categories: ["React"]
keywords: ["learning react", "learn react"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Learning React in 2023 is not the easiest endeavour. While we had lots of stability since the release of React Hooks in 2019, the tide is turning again. And it may be a more volatile shift than it has been with React Hooks. In this article, I want to compare the two angles on how to learn React in 2023: the library way and the framework way.

To put things into context: The [new React documentation](https://react.dev/) has been released and does recommend React to be used in a fully integrated framework. The documentation advocates using a (meta) framework (e.g. Next.js) instead of using React as a library (or framework - however you like to call it) in a bundler like Vite or Parcel. My take on this was easing the shift a bit by still recommending [other React starters](/react-starter/) apart from a fully-integrated React framework before frameworks become the actual default eventually.

# "We have come full circle ..."

Who does not know this tech phrase coming from senior developers who are mocking the inevitable change on the horizon? Yes, we create, we learn, we adapt. That's how it has always been - it's the nature of the feedback loop.

Developers tell the same about the current state of web development: We have implemented web applications as server-side applications (SSR - server-side rendering/server-side routing) in PHP, Java, C#, and later Ruby on Rails from roughly 2000 - 2010. All of them sprinkled more and more JavaScript (e.g. jQuery, MooTools, Dojo) into the mix for the improved client-side UX.

In 2010, the tide shifted in favor of client-side applications (CSR - client-side rendering/client-side routing) under the umbrella term single-page applications (SPAs) which came as full blown JavaScript solutions.

- first generation: Backbone, Knockout, Ember, Angular
- second generation: React, Vue
- in-between generations: Svelte
- third generation: Solid, Qwik

These days many are calling SPAs as an error in the history of web development.

However, SPAs have their place and SPAs had to become a thing for JavaScript (and later TypeScript) taking off as web application frameworks and for coming to the conclusion of bringing JavaScript/TypeScript for SSR to the server, because the underlying tech (e.g. missing HTTP streaming) prevented us previously (thus far) from implementing it.

# React on the Server

Anyway, this state of web applications as SPAs reigned roughly for 10 years ...

<ReadMore label="History of Web Applications" link="/web-applications/" />

The circle closes now, because we are going back to SSR with React and many other frameworks; each of them (Vue, Svelte, Solid, Qwik, Angular) influencing another.

While many none native JavaScript developers are mocking this transition as "just going back to how it has always been" (see 2000 - 2010) or "JavaScript is inventing PHP", they miss all the improvements (e.g. performance with [partial/selective hydrations](https://www.gatsbyjs.com/docs/conceptual/partial-hydration/), [server-side components](https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components) as an architectural pattern, [resumability](concepts)) compared to the previous circle.

It's JavaScript (better: TypeScript) as first-class citizen for SSR web applications.

It will be the next decade of how we implement web applications ...

... before AI takes over (tongue in cheek).

<Divider />

But enough rambling about why this will be the inevitable next stage of web development. Let's speak React and how to learn it in these turbulent waters.

# Learning React as a Library

From its [release](https://www.youtube.com/watch?v=GW0rj4sNH2w) on, React has been used as a library for nearly a decade now. React developers have been using React with many other [complementary libraries](/react-libraries/) from a rich ecosystem. [React Router](/react-router/) was one of these popular synergies, because it enabled client-side routing for React in a world of SPAs.

Most of the learning material for React out there teaches it as a library. The new React documentation does it, the most read React book called [The Road to React](https://www.amazon.com/dp/B077HJFCQX) (still) does it, and many other online tutorials, videos, and courses.

When it comes to learning React as a library, you will not be distracted from a framework. You can fully focus on learning React's fundamentals: [Elements vs Components](/react-element-component/), [React Hooks](/react-hooks/), [Custom Hooks](/react-custom-hook/), [Function Components](/react-function-component/), [Event Handlers](/react-event-handler/), [Forms](/react-form/), [Refs](/react-ref/), [Conditional Rendering](/conditional-rendering-react/), [Props](/react-pass-props-to-component/) before integrating complementary third-party libraries like [React Testing Library](/react-testing-library/) or [Styled Components](/styled-components/) (or any other [React styling solution](/react-css-styling/)).

Usually you will learn React with a bundler like [Vite](https://vitejs.dev/). While the bundler disappears in the background, you will learn how to create a client-side routed/rendered SPA with React.

These days many React beginners are unsure about learning React as a library though, because the current narrative tells us about frameworks. While I agree that the way forward will be fully-integrated frameworks, you are not learning anything wrong when focusing on React's fundamentals first.

Beginners will also not miss out on SSR, because there will be plenty of jobs out there with applications running without a framework. There will come the time when SSR takes over, but it's not there yet and you will be blessed having the historical knowledge of how to create client-side applications which consume remote [REST](/node-express-server-rest-api/)/[GraphQL](/graphql-apollo-server-tutorial/)/[tRPC](/react-trpc/) APIs. It will be a fundamental skill (especially working with APIs) in your toolbelt.

# Learning React as a Framework

Going forward React will immerse as a library providing essential building blocks to frameworks. While developers have been able to always use React's features in the past themselves, it will not be this way moving towards a future of React as a framework.

For example, [React Server Components](https://nextjs.org/docs/advanced-features/react-18/server-components) heavily integrate into routing and data fetching. While frameworks will implement this architectural building block against a well-defined specification provided by React itself, the day to day React developer will only use them as a feature provided by the framework, because they are not expected to implement them against a specification themselves.

And for a good reason, because we want the framework to deal with the details while React developers can focus on implementing the actual domain of their business logic.

When learning React as a framework, the biggest bet would be learning [Next.js](https://nextjs.org/). It comes with file-based routing, many rendering techniques (CSR, SSG, ISR, SSR) with SSR as the first-class citizen, built-in image, SEO, and font support. It also comes as close as it gets to using React in a framework, because it collaborates heavily with React on features like React Server Components. In addition, many React core developers are now working for Vercel, the company behind Next.js.

<Divider />

Learning React as a library or framework does not have to be an exclusive decision. Here comes my recommendation for React beginners:

Learn React as a framework while not neglecting its fundamentals as a library. For example, you could get started with React as a framework. Most likely you will implement a route transition from page to page first with a framework like Next. This feature is fully provided by the framework and not React itself. However, once you touch React fundamentals like Hooks, it's always a good incentive to come back to React's fundamentals as a library.

One way of learning React in 2023: Take React's documentation next to Next's documentation for implementing an application about [a domain which interests you](/how-to-learn-framework/) (e.g. sports, anime, gaming, e-commerce, productivity, music).

You will start with Next's documentation. But whenever you hit a React fundamental, come back to React's documentation. Focus on where the both entities (framework and library) meet and which tools they provide you.

If you want to learn React's fundamentals with a complementary learning resource on the side, check out a course, video, or a book (e.g. [The Road to React](https://www.amazon.com/dp/B077HJFCQX)). These may offer a different perspective on React as a library and its fundamentals.
