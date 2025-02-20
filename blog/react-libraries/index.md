---
title: "React Libraries for 2025"
description: "Discover the essential React libraries for 2025! Navigate the vast ecosystem effortlessly with this curated list. Empower your React projects with these powerful tools for seamless development of large-scale applications ..."
date: "2025-02-17T08:50:46+02:00"
categories: ["React"]
keywords: ["react libraries 2025"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

React has been around for quite some time, and over the years, an extensive—yet sometimes overwhelming—ecosystem of libraries has grown around it. Developers transitioning from other languages or frameworks often struggle to navigate **all the libraries** needed to build web applications with React.

At its core, React allows developers to build component-driven user interfaces using [function components](/react-function-component/). While it includes built-in solutions like [React Hooks](/react-hooks/) for managing local state, handling side effects, and optimizing performance, everything ultimately boils down to working with functions—both components and hooks—to construct a UI.

In this walkthrough, we'll explore the essential React libraries for 2025. These libraries are the building blocks for developing large-scale applications with React. Whether you're a beginner or an experienced developer, this guide will help you navigate the vast React ecosystem effortlessly.

<ReadMore label="React Tech Stack for 2025" link="/react-tech-stack/" />

Let's dive into the libraries that you could use for your next React application.

# Table of Contents

<TableOfContents {...props} />

# Starting a new React Project

The first question a React beginner often asks is: how do you set up a React project? With so many tools available, choosing the right one can be overwhelming. The most popular option in the React community is [Vite](https://vitejs.dev/), which makes it easy to create projects with different libraries (such as React) and optional TypeScript support.

Vite also offers [exceptional performance](https://twitter.com/rwieruch/status/1491093471490412547).

<ReadMore label="Learn more about websites and web applications" link="/web-applications/" />

If you're already familiar with React, you might consider using one of its popular (meta) frameworks instead of Vite. [Next.js](https://nextjs.org/) is a widely used choice that builds on top of React, so understanding [React's fundamentals is essential](https://www.roadtoreact.com/). It comes with many features out of the box, such as different rendering techniques, file-based routing and API routes.

<ReadMore label="How to learn React as a Library or Framework" link="/learning-react/" />

While Next.js has been initially used for server-side rendering (web applications), it can be used for static site generation (websites) next to other rendering patterns (i.e. ISR) too. The most recent addition to Next.js are React Server Components (RSC) and React Server Functions (RSF) which contribute since 2023 to a big paradigm shift by moving React components from the client to the server.

Two alternatives to Next.js are TanStack Start (beta) and React Router (in transition from Remix) which do not support (yet) React Server Components.

<ReadMore label="The Road to Next" link="https://www.road-to-next.com/" />

If performance for static content is your priority, take a look at [Astro](https://astro.build/). As a framework-agnostic tool, it works seamlessly with React while shipping only HTML and CSS to the browser, even when using React for components. JavaScript is loaded only when components require interactivity, ensuring optimal performance.

<ReadMore label="How to start a React project" link="/react-starter/" />

If you just want to understand how tools like Vite work, try to [set up a React project](/minimal-react-webpack-babel-setup/) yourself. You will start with a bare bones HTML with JavaScript project and add React with its supportive tools (e.g. Webpack, Babel) yourself. It's not something you will have to deal with in your day to day work, especially since Vite became the successor of Webpack, but it's a great learning experience to get to know the underlying tooling.

If you are a React veteran and want to try something new, check out [Nitro](https://nitro.unjs.io/), [Redwood](https://redwoodjs.com/), or [Waku](https://github.com/dai-shi/waku). The latter, created by the developer behind Zustand, also includes support for React Server Components (RSC).

**Recommendations:**

* Vite for client-side rendered React applications
* Next server-side rendered React applications
* Astro for static-side generated React applications

# Package Manager for React

The most widely used package manager to install libraries (read: dependencies, node packages) in the JavaScript ecosystem (and therefore React) is [npm](https://www.npmjs.com/), because it comes with every Node.js installation. However, yarn [yarn](https://yarnpkg.com/) and [pnpm](https://pnpm.io/) are great alternatives. Especially the latter comes with a greater performance boost.

<ReadMore label="Mac Setup for Web Development" link="/mac-setup-web-development/" />

If you happen to create multiple React applications which depend on each other or which share a common set of custom UI components, you may want to check out the concept of a monorepo. All previously mentioned package managers allow you to create monorepos by using their in-house workspaces feature, however, I had the best developer experience using yarn or pnpm. In combination with monorepo pipeline tools such as [Turborepo](https://turborepo.org/), the monorepo experience becomes perfect.

<ReadMore label="How to Monorepo with TypeScript/JavaScript" link="/javascript-monorepos/" />

**Recommendations:**

* choose one package manager and stick to it
  * default and most widely used -> npm
  * increased performance but not as popular -> pnpm
* if a monorepo is needed, check out Turborepo (see tutorial)

# React State Management

React provides two built-in hooks for managing local state: [useState](/react-usestate-hook) and [useReducer](/react-usereducer-hook/). For global state management, the built-in [useContext](/react-usecontext-hook/) hook allows you to pass data from top-level components to deeper components without relying on [props](/react-pass-props-to-component/), effectively preventing prop drilling.

<ReadMore label="When to use useState vs useReducer" link="/react-usereducer-vs-usestate/" />

All three React hooks enable developers to implement powerful state management in React which is either co-located in components by using React's useState/useReducer Hooks or globally managed by combining them with React's useContext Hook.

<ReadMore label="How to combine useState/useReducer with useContext" link="/react-state-usereducer-usestate-usecontext/" />

If you find yourself using React's Context too often for shared/global state, you should definitely check out [Zustand](https://github.com/pmndrs/zustand). It allows you to manage global application state which can be read and modified by any React component that is connected to its store(s).

<ReadMore label="What's State in React" link="/react-state/" />

While Zustand is becoming the de facto standard in the React community, many projects still use Redux. Personally, I haven't used Redux in my recent freelance work over the past few years, as I prefer Zustand for its simplicity. However, you'll encounter plenty of older React applications built with Redux.

<ReadMore label="Redux Tutorial (without Redux Toolkit)" link="/react-redux-tutorial/" />

If you happen to use Redux, you should definitely check out [Redux Toolkit](https://redux-toolkit.js.org/) as well. If you are into state machines, check out [XState](https://github.com/statelyai/xstate) or [Zag](https://github.com/chakra-ui/zag). As alternatives, if you need a global store but do not like Zustand or Redux, check other popular local state management solutions like [Mobx](https://github.com/mobxjs/mobx), [Jotai](https://github.com/pmndrs/jotai), or [Nano Stores](https://github.com/nanostores/nanostores).

**Recommendations:**

* useState/useReducer for co-located or shared state (see tutorial)
* opt-in useContext for enabling *little* global state (see tutorial)
* Zustand (or an alternative) for *lots of* global state

# React Data Fetching

React's built-in hooks are great for UI state, but when it comes to state management (read: caching) for remote data (and therefore data fetching), I would recommend using a dedicated data fetching library such as [TanStack Query](https://tanstack.com/query) (formerly React Query).

While TanStack Query itself is not seen as a state management library, because it is primarily used to fetch your remote data from APIs, it takes care of all the state management (e.g. caching, optimistic updates) of this remote data for you.

<ReadMore label="Learn how TanStack Query works under the hood" link="/react-hooks-fetch-data/" />

TanStack Query was designed for consuming [REST APIs](/node-express-server-rest-api/). However, these days it supports [GraphQL](https://www.roadtographql.com/) too. However, if you are looking for a more dedicated GraphQL library for your React frontend, check out either [Apollo Client](https://www.apollographql.com/docs/react/) (popular), [urql](https://formidable.com/open-source/urql/) (lightweight), or [Relay](https://github.com/facebook/relay) (by Facebook).

<ReadMore label="Everything about State in React for Local and Remote Data" link="/react-state/" />

If you are already using Redux and want to add data fetching with integrated state management in Redux, instead of adding TanStack Query, you may want to check out [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) which integrates data fetching neatly into Redux.

If you control the frontend and the backend (both TypeScript), check out [tRPC](https://trpc.io/) for end-to-end type safe APIs. It is a tremendous productivity boost and DX. You can also combine it with TanStack Query for all the niceties regarding data fetching while still being able to call your backend from your frontend by using typed functions.

<ReadMore label="Create your first tRPC application with E2E type safety" link="/react-trpc/" />

Last but not least, if you have a (meta) framework which supports React Server Components/Server Functions (RSC/RSF) (i.e. Next.js), you may want to use them instead for data fetching. They allow you to fetch data on the server and pass it down to the client. This way you can avoid the need for a client-side data fetching library.

**Recommendations:**

* server-side data fetching
  * React Server Components/Functions (if supported by (meta) framework)
* client-side data fetching
  * TanStack Query (REST APIs or GraphQL APIs)
    * combined with axios or [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  * Apollo Client (GraphQL APIs)
    * for a more sophisticated GraphQL experience
* tRPC for tightly coupled client-server architectures

# Routing with React Router

If you are using a React framework like Next.js, routing is already taken care of for you. However, if you are using React without a framework and only for client-side rendering (e.g. Vite without SSR), the most popular routing library out there is [React Router](https://reactrouter.com/).

<ReadMore label="Learn to use React Router" link="/react-router/" />

However, this year may be the year of [TanStack Router](https://tanstack.com/router) which is a new routing library for React. It is a great alternative to React Router, especially if you are using TypeScript in your React project. Although it is still in beta, anyone familiar with TanStack knows it will be excellent.

Both React Router and TanStack Router (with TanStack Start) are working on React Server Components (RSC) support. This means that you can execute components on the server for different use cases (e.g. smaller bundle size, server-side data fetching).

Before you introduce a router in your React project, when you are just about to learn React, you can give [React's conditional rendering](/conditional-rendering-react/) a shot first. It is not a replacement for routing, but gives you a glimpse on how replacing components on a page level works.

**Recommendations:**

* server-side routing: Next.js
* client-side routing:
  * most used: React Router
  * trending: TanStack Router

# CSS Styling in React

There are many options and even more opinions about styling/CSS in React out there, so putting everything in one section here does not suffice. If you want to get deeper into this topic and get to know all the options, check out the following guide.

<ReadMore label="React CSS Styling (Comprehensive Tutorial)" link="/react-css-styling/" />

As a React beginner, it is okay to start with inline styles and bare bones CSS by using a style object in JSX. It should be rarely used for actual applications though:

```javascript
const Headline = ({ title }) =>
  <h1 style={{ color: 'blue' }}>
    {title}
  </h1>
```

Whereas inline style can be used to add style dynamically with JavaScript in React's JSX, an external CSS file could hold all the remaining style for your React application:

```javascript{1,4}
import './Headline.css';

const Headline = ({ title }) =>
  <h1 className="headline" style={{ color: 'blue' }}>
    {title}
  </h1>
```

Once your application grows in size, there are other styling approaches to check out. One last hint before we continue: If you want to apply a className conditionally in React, use a utility library like [clsx](https://github.com/lukeed/clsx).

<Divider />

First, I want to recommend [Tailwind CSS](https://tailwindcss.com/) as the most popular *Utility-First-CSS* solution. It comes with pre-defined CSS classes. This makes you more efficient as a developer and streamlines the design system of your React application, but comes with the tradeoff of getting to know all the classes and verbose inlining of many CSS classes:

```javascript
const Headline = ({ title }) =>
  <h1 className="text-blue-700">
    {title}
  </h1>
```

Second, I would recommend you to have a look into CSS Modules as one of many *CSS-in-CSS* solutions. CSS Modules give you a way to encapsulate your CSS into component co-located modules. This way, styles don't leak accidentally into other components:

```javascript{1,4}
import styles from './style.module.css';

const Headline = ({ title }) =>
  <h1 className={styles.headline}>
    {title}
  </h1>
```

And third, I want to show (not recommend anymore) you Styled Components as one of many *CSS-in-JS* solutions for React. This approach is brought to you by a library called [styled-components](/react-styled-components/) (or alternatives such as [emotion](https://emotion.sh/)) which co-locates styling created with JavaScript next to your React components in the same file or a co-located file:

```javascript
import styled from 'styled-components';

const BlueHeadline = styled.h1`
  color: blue;
`;

const Headline = ({ title }) =>
  <BlueHeadline>
    {title}
  </BlueHeadline>
```

<ReadMore label="Best Practices for Styled Components" link="/styled-components/" />

Whether you choose CSS-in-CSS or Utility-First-CSS is up to you. The trend goes towards Utility-First-CSS with Tailwind CSS as the industry standard. CSS-in-JS solutions are not as popular anymore because of their performance and hydration problems with server-side environments, even though newer solutions (but not as popular as Styled Components or Emotion) are solving these problems.

Other libraries to check out: [PandaCSS](https://panda-css.com/), [linaria](https://linaria.dev/), [vanilla-extract](https://vanilla-extract.style/), [nanocss](https://github.com/javascripter/nanocss), [UnoCSS](https://unocss.dev/), and [Styled JSX](https://github.com/vercel/styled-jsx).

**Recommendations:**

* Utility-First-CSS (most popular)
  * e.g. Tailwind CSS
* CSS-in-CSS
  * e.g. CSS Modules
* CSS-in-JS
  * e.g. [StyleX](https://stylexjs.com/) by Facebook (compiles to utility-first CSS)

# React UI Libraries

As a beginner, it is a great and recommended learning experience to build reusable components from scratch. Whether it is a [dropdown](/react-dropdown/), a [select](/react-select/), a [radio button](/react-radio-button/), or a [checkbox](/react-checkbox/), you should know how to create these UI components yourself eventually.

However, if you don't have the resources to come up with all the components yourself, you want to use a UI library which gives you access to lots of pre-built components which share the same design system, functionalities, and rules for accessibility:

* [Material UI (MUI)](https://material-ui.com/) (still most wanted in freelance projects)
* [Mantine UI](https://mantine.dev/) (most popular 2022)
* [Chakra UI](https://chakra-ui.com/) (most popular 2021)
* [Hero UI](https://www.heroui.com/) ([previously] Next UI)
* [Park UI](https://park-ui.com/) (based on Ark UI)
* [PrimeReact](https://primereact.org/)

The trend moves towards headless UI libraries though. They come without styling, but with all the functionalities and accessibilities that a modern component library needs. Most of the time they are combined with a Utility-First-CSS solution like Tailwind:

* [shadcn/ui](https://ui.shadcn.com/) (most popular 2023 - 2024)
* [Radix](https://www.radix-ui.com/) (foundation for shadcn/ui)
* [React Aria](https://react-spectrum.adobe.com/react-aria/)
* [Ark UI](https://ark-ui.com/) (from the makers of Chakra UI)
* [Ariakit](https://ariakit.org/)
* [Daisy UI](https://daisyui.com/)
* [Headless UI](https://headlessui.com/)
* [Tailwind UI](https://www.tailwindui.com/) (not free)

Perhaps more out of fashion compared to the other UI libraries:

* [Ant Design](https://ant.design/)
* [Semantic UI](https://react.semantic-ui.com/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [Reactstrap](https://reactstrap.github.io/?path=/story/home-installation--page)

# React Animation Libraries

Every animation in a web application begins with CSS. However, you'll soon realize that CSS animations may not fully meet your requirements. Some popular animation libraries for React include:

* [Motion](https://motion.dev/) (most recommended, previously Framer Motion)
* [react-spring](https://www.react-spring.dev/)

# Visualization and Chart Libraries in React

If you really want to build charts from the ground up yourself, there is no way around [D3](https://d3js.org/). It's a low level visualization library that gives you everything you need to create amazing charts. However, learning D3 is a whole other adventure, thus many developers just pick a React charting library which does everything in exchange for flexibility. Popular solutions are:

* [Recharts](http://recharts.org) (personal recommendation)
  * off the shelf charts
  * great composability
  * optional customization due to opt-in composability
* [visx](https://github.com/airbnb/visx)
  * leaning more towards low-level D3 than high-level abstraction
  * steeper learning curve
* more off the shelf charts, more difficult to customize
  * [Victory](https://formidable.com/open-source/victory/)
  * [nivo](https://nivo.rocks/)
  * [react-chartjs](https://github.com/reactchartjs/react-chartjs-2)

# Form Libraries in React

The by far most popular library for forms in React is [React Hook Form](https://react-hook-form.com/). It comes with everything needed: validation ([zod](https://github.com/colinhacks/zod) as the most popular), form submission, form state management, and more. It is a great library to get started with forms in React.

An upcoming alternative is [Conform](https://conform.guide/) which integrates more nicely with full-stack applications.

<ReadMore label="How to validate Forms in React" link="/react-form-validation/" />

Alternatively, you can use [Formik](https://github.com/jaredpalmer/formik) or [React Final Form](https://final-form.org/react). If you are using a React UI library, see how it integrates with these form libraries.

**Recommendations:**

* React Hook Form
  * with zod integration for validation

# Code Structure in React

If you want to embrace a unified and common sense code style, use [ESLint](https://eslint.org/) in your React project. A linter such as ESLint enforces a particular code style. For example, you can make it a requirement with ESLint to follow a popular style guides. You can also integrate [ESLint in your IDE/editor](/vscode-eslint/) and it will point you to every mistake.

<ReadMore label="React Folder Structure in 5 Steps" link="/react-folder-structure/" />

If you want to embrace a unified code format, use [Prettier](https://github.com/prettier/prettier) in your React project. It is an opinionated code formatter with only a handful of opt-in configurations. You can [integrate it in your editor or IDE](/how-to-use-prettier-vscode/) so that it formats your code every time you save a file. Prettier doesn't replace ESLint though, but it [integrates nicely](/prettier-eslint/) with it.

<ReadMore label="Feature-based React Architecture" link="/react-feature-architecture/" />

Maybe a rising star in 2025 will be [Biome](https://biomejs.dev/) (formerly Rome). ESLint and Prettier are not the most favorite utilities when it comes to their setup and especially interplay. But they are necessary in every web developer's daily work. Biome wants to be an alternative to Prettier and ESLint by providing a fast (Rust based) and all-in-one toolchain.

**Recommendations:**

* ESLint + Prettier
* optionally check out Biome

# React Authentication

In a React application, you may want to introduce authentication with functionalities such as sign up, sign in, and sign out. Other features like password reset and password change features are often needed as well. These features go far beyond React, because a backend application manages these things for you.

<ReadMore label="How to prepare for authentication with React Router" link="/react-router-authentication/" />

The best learning experience would be implementing a full-stack application with authentication (e.g. [The Road to Next](https://www.road-to-next.com/)) yourself. Since authentication comes with lots of security risks and nitty gritty details not everyone knows about, I'd recommend using a third-party service for authentication in production:

* [Lucia](https://lucia-auth.com/) (Resource)
  * Oslo: Auth and Cryptography
  * Arctic: OAuth 2.0 with support for 50+ providers
* [Better Auth](https://www.better-auth.com/)
* [Auth.js](https://authjs.dev/)
* [Clerk](https://clerk.com/) (paid) or [Kinde](https://kinde.com/) (paid)
* [Supabase (Auth)](https://supabase.com/docs/guides/auth/overview)
* [AuthKit](https://www.authkit.com/)
* [Auth0](https://auth0.com/)
* [AWS Cognito](https://aws.amazon.com/cognito/)

# React Backend

Since there is a strong trend moving React to the server, the most natural habitat for a React project would be a (meta) framework like Next.js (mostly dynamic web applications) or Astro (mostly static website). React Router (previously Remix) and TanStack Start are also great alternatives, but they are in earlier stages of development.

If you can't use a full-stack framework due to various reasons (while still being able to use a JS/TS), you have to check out [tRPC](https://trpc.io/) or [Hono](https://hono.dev/). Honorable mention goes to the old school but must popular Node backend [Express](https://expressjs.com/). Other alternatives are [Fasitfy](https://fastify.dev/), [Nest](https://nestjs.com/), or [Elysia](https://elysiajs.com/).

Honorable mention goes to [Koa](https://koajs.com/) and [Hapi](https://hapi.dev/).

# React Database

Not tied to React, but since full-stack React applications are getting popular these days, React is closer than ever to the database layer. While developing any Next.js application, you will most likely deal with a database ORM. The most popular ORM choice these days is [Prisma](https://www.prisma.io/). A trending alternative is [Drizzle ORM](https://orm.drizzle.team/).

More alternatives are [Kysely](https://kysely.dev/) and [database-js](https://github.com/planetscale/database-js) (only PlanetScale).

<ReadMore label="Web Development Trends" link="/web-development-trends/" />

When it comes to choosing a database, Supabase (or Firebase) are valid database providers. Supabase with its PostgreSQL can be self-hosted or used as a paid service.

Popular serverless database alternatives are [PlanetScale](https://planetscale.com/) (paid), [Neon](https://neon.tech/), [Xata](https://xata.io/), and [Turso](https://turso.tech/).

# React Hosting

Deploying and hosting a React application is similar to deploying any other web app. For complete control over your environment, consider using services like [Digital Ocean](https://m.do.co/c/fb27c90322f3) or [Hetzner](https://www.hetzner.com/). These options allow you to manage your infrastructure yourself.

If you prefer a hands-off approach where the hosting platform manages everything for you, [Vercel](https://vercel.com/) is a well-regarded option, particularly for projects built with Next.js.

For a middle ground, [Coolify](https://coolify.io/) provides an excellent solution, offering some autonomy while simplifying many hosting tasks.

If you are already using a third-party backend as a service like Firebase/Supabase, you can check whether they offer hosting as well. Other popular hosting providers are [Render](https://render.com/), [Fly.io](https://fly.io/), [Railway](https://railway.app/), or directly at CloudFlare/AWS/Azure/Google Cloud.

# Testing in React

The backbone of testing a React application is a test framework like [Vitest](https://vitest.dev/) (recommended) or [Jest](https://github.com/facebook/jest). It gives you test runner, assertion library and spying, mocking, stubbing functionalities. Everything that's needed in a comprehensive test framework.

Eventually you will find yourself using the popular [React Testing Library (RTL)](/react-testing-library/), which is used within your testing framework's environment, as a comprehensive testing library for React. RTL makes it possible to render your components and to simulate events on HTML elements. Afterward, your test framework is used for the assertions.

When it comes to selecting a testing tool for React end-to-end (E2E) testing, two of the most widely recommended and popular options are [Playwright](https://playwright.dev/) (recommended) and [Cypress](/react-testing-cypress/). Both tools allow you to automate and simulate user interactions within a browser, ensuring that your React application behaves as expected from a user's perspective.

**Recommendations:**

* Unit/Integration: Vitest + React Testing Library (most popular)
* E2E Tests: Playwright (or Cypress)
* optionally Snapshot Tests with Vitest

# React and Immutable Data Structures

Vanilla JavaScript gives you plenty of built-in tools to handle data structures as if they are immutable. However, if you and your team feel the need to enforce immutable data structures, the most popular choice is [Immer](https://github.com/immerjs/immer).

# React Internationalization

When it comes to [internationalization i18n for your React application](/react-internationalization/), you need to think not only about translations, but also about pluralizations, formattings for dates and currencies, and a handful of other things. These are the most popular libraries for dealing with it:

* [FormatJS](https://github.com/formatjs/formatjs)
* [react-i18next](https://github.com/i18next/react-i18next)
* [Lingui](https://lingui.dev/)
* [next-intl](https://next-intl.dev/) (Next.js)

# Rich Text Editor in React

When it comes to Rich Text Editors in React, I can only think of the following:

* [TipTap](https://tiptap.dev/)
* [Plate](https://platejs.org/)
* [Lexical](https://lexical.dev/)
* [Slate](https://www.slatejs.org/)

# Payments in React

When it comes to integrating payment solutions into your React application, Stripe and PayPal are the most commonly used providers. Both offer seamless integration options for React.

* [PayPal](https://developer.paypal.com/docs/checkout/)
* Stripe
  * [React Stripe Elements](https://github.com/stripe/react-stripe-js)
  * [Stripe Checkout](https://stripe.com/docs/payments/checkout)

Other payment providers are [Braintree](https://www.braintreepayments.com/) (PayPal) and [Lemon Squeezy](https://www.lemonsqueezy.com/) (Stripe) which have been acquired by their competitors.

# Time in React

If your React application frequently handles dates, times, and timezones, consider using a dedicated library to manage these aspects efficiently. Here are some options:

* [date-fns](https://github.com/date-fns/date-fns)
* [Day.js](https://github.com/iamkun/dayjs)

# React Desktop Applications

[Electron](https://www.electronjs.org/) and [Tauri](https://github.com/tauri-apps/tauri) are the go to frameworks for cross-platform desktop applications.

# File Upload in React

* input field with `type="file"`
* [react-dropzone](https://react-dropzone.js.org/)

# Mails in React

E-Mail rendering is a pain if you are just using HTML. Fortunately, there are libraries out there which help you to create responsive HTML emails with React components:

* [react-email](https://react.email/) (recommendation)
* [mjml](https://mjml.io/)
* [Mailing](https://www.mailing.run/)
* [jsx-email](https://jsx.email/)

If you are looking for a email service provider, check out [Resend](https://resend.com/), [Postmark](https://postmarkapp.com/), [SendGrid](https://sendgrid.com/), or [Mailgun](https://www.mailgun.com/).

# Drag and Drop

Personally I have used [the successor of react-beautiful-dnd](https://github.com/hello-pangea/dnd) and cannot say anything negative about it. A popular alternative which offers way more flexibility and options, but comes with the cost of a steeper learning curve, is [dnd kit](https://dndkit.com/).

# Mobile Development with React

The go-to solution for bringing React from the web to mobile is still [React Native](https://facebook.github.io/react-native/). The most popular framework for creating React Native applications is [Expo](/react-native-expo/). If you need unified components across web and mobile, you want to check out [Tamagui](https://tamagui.dev/).

<ReadMore label="Learn Navigation in React Native" link="/react-native-navigation/" />

# React VR/AR

It's possible to dive into virtual reality or augmented reality with React. To be honest, I haven't used any of these libraries and most are early stage (experimental), but they are the ones I know from the top of my head when it comes to AR/VR in React:

* [react-three-fiber](https://github.com/pmndrs/react-three-fiber) (popular 3d library, however, I have seen VR examples too)
* [react-360](https://facebook.github.io/react-360/) (archived)
* [aframe-react](https://github.com/supermedium/aframe-react) (not maintained anymore)

# Design Prototyping for React

If you are coming from a UI/UX background, you may want to use a tool for fast prototyping for new React components, layouts, or UI/UX concepts. Personally I use [Figma](https://www.figma.com/). For rough yet lightweight sketches, I like to use [Excalidraw](https://excalidraw.com/), others prefer [tldraw](https://www.tldraw.com/).

# React Component Documentation

If you are in charge of writing the documentation for your components, there are various neat React documentation tools out there. I've used [Storybook](https://storybook.js.org/) in many projects and have a neutral opinion about it. I've heard good things about these other solutions too:

* [Docusaurus](https://github.com/facebook/docusaurus)
* [Styleguidist](https://github.com/styleguidist/react-styleguidist)
* [React Cosmos](https://reactcosmos.org/)

<Divider />

Ultimately, the React ecosystem functions as a flexible framework centered around React. It allows you to make informed choices about which libraries to incorporate, enabling you to start small and add libraries as needed to address specific challenges. Conversely, if React alone meets your requirements, you can maintain a lightweight setup by using just the core library.

