---
title: "React Libraries for 2024"
description: "Discover the essential React libraries for 2024! Navigate the vast ecosystem effortlessly with this curated list. Empower your React projects with these powerful tools for seamless development of large-scale applications ..."
date: "2024-01-15T08:50:46+02:00"
categories: ["React"]
keywords: ["react libraries 2024"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

React has been around for a while. Since then, a well-rounded yet overwhelming ecosystem of libraries evolved around the component driven library. Developers coming from other programming languages or libraries/frameworks often have a hard time figuring out **all the libraries** for creating web applications with React.

At its core, React enables one to create component-driven user interfaces with [function components](/react-function-component/). It comes with built-in solutions though, for instance, [React Hooks](/react-hooks/) for local state, side-effects, and performance optimizations. But after all, you are only dealing with functions (components and hooks) to create a UI here.

<ReadMore label="React Trends" link="/react-trends/" />

Let's dive into the libraries that you could use for your next React application.

# Table of Contents

<TableOfContents {...props} />

# Starting a new React Project

The first question that comes to mind for a React beginner: how to set up a React project. There are many tools to choose from. The most popular choice in the React community is [Vite](https://vitejs.dev/) which allows you to create projects with various library (e.g. React) + opt-in TypeScript combinations. It comes with [incredible performance](https://twitter.com/rwieruch/status/1491093471490412547).

<ReadMore label="Learn more about websites and web applications" link="/web-applications/" />

If you are already familiar with React, you can choose one of its most popular (meta) frameworks as alternative to Vite: [Next.js](https://nextjs.org/) which builds up on top of React, hence you should know about [React's fundamentals](https://www.roadtoreact.com/). A popular alternative in this arena is [Remix](https://remix.run/).

<ReadMore label="How to learn React as a Library or Framework" link="/learning-react/" />

While Next.js has been initially used for server-side rendering (web applications), it can be used for static site generation (websites) next to other rendering patterns too. The most recent addition to Next.js are React Server Components which contribute since 2023 to a big paradigm shift by moving React components from the client to the server.

If you are looking for a framework with the best performance in mind for static content, you need to check out [Astro](https://astro.build/) which is framework agnostic and therefore can be used with React. It ships only HTML and CSS to the browser even though a framework like React is used for creating the components. Only if these components become interactive, the necessary JavaScript is requested by the client.

<ReadMore label="How to start a React project" link="/react-starter/" />

If you just want to understand how tools like Vite work, try to [set up a React project](/minimal-react-webpack-babel-setup/) yourself. You will start with a bare bones HTML with JavaScript project and add React with its supportive tools (e.g. Webpack, Babel) yourself. It's not something you will have to deal with in your day to day work, especially since Vite became the successor of Webpack, but it's a great learning experience to get to know the underlying tooling.

If you are a React veteran and want to try something new, check out [Nitro](https://nitro.unjs.io/) or [Waku](https://github.com/dai-shi/waku). The latter is from creator of Zustand and comes with support for React Server Components.

**Recommendations:**

* Vite for client-side rendered React applications
* Next server-side rendered React applications
* Astro for static-side generated React applications
* optional learning experience: [create a React project from scratch](/minimal-react-webpack-babel-setup/)

# Package Manager for React

The most widely used package manager to install libraries (read: dependencies, node packages) in the JavaScript ecosystem (and therefore React) is [npm](https://www.npmjs.com/), because it comes with every Node.js installation. However, yarn [yarn](https://yarnpkg.com/) and [pnpm](https://pnpm.io/) are great alternatives. Especially the latter comes with a greater performance boost.

<ReadMore label="Mac Setup for Web Development" link="/mac-setup-web-development/" />

If you happen to create multiple React applications which depend on each other or which share a common set of custom UI components, you may want to check out the concept of a monorepo. All previously mentioned package managers allow you to create monorepos by using their in-house workspaces feature, however, I had the best developer experience using yarn or pnpm. In combination with monorepo pipeline tools such as [Turborepo](https://turborepo.org/), the monorepo experience becomes perfect.

<ReadMore label="Monorepo Setup" link="/javascript-monorepos/" />

**Recommendations:**

* choose one package manager and stick to it
  * default and most widely used -> npm
  * increased performance but fairly new and not as popular -> pnpm
* if a monorepo is needed, check out Turborepo (see tutorial)

# React State Management

React comes with two built-in hooks to manage local state: [useState](/react-usestate-hook) and [useReducer](/react-usereducer-hook/). If state needs to be managed globally, one can opt-in [React's built-in useContext Hook](/react-usecontext-hook/) to tunnel props from top-level components to components below them without using [props](/react-pass-props-to-component/) and therefore avoiding the problem of props drilling.

<ReadMore label="Learn when to use useState and useReducer" link="/react-usereducer-vs-usestate/" />

All three React hooks enable developers to implement powerful state management in React which is either co-located in components by using React's useState/useReducer Hooks or globally managed by combining them with React's useContext Hook.

<ReadMore label="Learn how to combine useState/useReducer with useContext" link="/react-state-usereducer-usestate-usecontext/" />

If you find yourself using React's Context too often for shared/global state, you should definitely check out [Zustand](https://github.com/pmndrs/zustand). It allows you to manage global application state which can be read and modified by any React component that is connected to its store(s).

<Divider />

Even though I'd say Zustand becomes the de facto standard in the community, once a state management library is needed, you may not get around Redux -- which is still the most popular state management library out there. I haven't used it personally in my last freelance projects over the last years, because I like Zustand for its simplicity, however, you will find plenty of older React applications which come with Redux.

<ReadMore label="Redux Tutorial (without Redux Toolkit)" link="/react-redux-tutorial/" />

If you happen to use Redux, you should definitely check out [Redux Toolkit](https://redux-toolkit.js.org/) as well. If you are into state machines, check out [XState](https://github.com/statelyai/xstate) or [Zag](https://github.com/chakra-ui/zag). As alternatives, if you need a global store but do not like Zustand or Redux, check other popular local state management solutions like [Jotai](https://github.com/pmndrs/jotai), [Recoil](https://github.com/facebookexperimental/Recoil), or [Nano Stores](https://github.com/nanostores/nanostores).

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

Last but not least, if you control the frontend and the backend (both TypeScript), check out [tRPC](https://trpc.io/) for end-to-end type safe APIs. I have been using it for the last year and it is a tremendous productivity boost and DX. It can be combined with TanStack Query for all the niceties regarding data fetching while still being able to call your backend from your frontend by using typed functions.

<ReadMore label="Create your first tRPC application with E2E type safety" link="/react-trpc/" />

**Recommendations:**

* TanStack Query (REST APIs or GraphQL APIs)
  * combined with axios or [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* Apollo Client (GraphQL APIs)
* tRPC for tightly coupled client-server architectures
* optional learning experience: [learn how TanStack Query works](/react-hooks-fetch-data/)

# Routing with React Router

If you are using a React framework like Next.js, routing is already taken care of for you. However, if you are using React without a framework and only for client-side rendering (e.g. Vite without SSR), the most powerful and popular routing library out there is [React Router](https://reactrouter.com/). A new alternative with full TypeScript support in mind is [TanStack Router](https://tanstack.com/router).

<ReadMore label="Learn to use React Router" link="/react-router/" />

If you are using client-side routing in React with React Router, it's not much work introducing code splitting on a route level. If you happen to introduce this kind of optimization, you could substitute `React.lazy()` with `@loadable/component`.

<ReadMore label="Learn Lazy Loading with React Router" link="/react-router-lazy-loading/" />

Before you introduce a router in your React project, when you are just about to learn React, you can give [React's conditional rendering](/conditional-rendering-react/) a shot first. It is not a replacement for routing, but gives you a glimpse on how replacing components on a page level works.

**Recommendations:**

* most used: React Router
* trending: TanStack Router
  * primarily for its first-class TS support

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

Once your application grows in size, there are other styling approaches to check out.

<Divider />

First, I would recommend you to have a look into CSS Modules as one of many *CSS-in-CSS* solutions. CSS Modules give you a way to encapsulate your CSS into component co-located modules. This way, styles don't leak accidentally into other components:

```javascript{1,4}
import styles from './style.module.css';

const Headline = ({ title }) =>
  <h1 className={styles.headline}>
    {title}
  </h1>
```

Second, I want to show (not recommend anymore) you Styled Components as one of many *CSS-in-JS* solutions for React. This approach is brought to you by a library called [styled-components](/react-styled-components/) (or alternatives such as [emotion](https://emotion.sh/)) which co-locates styling created with JavaScript next to your React components in the same file or a co-located file:

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

And third, I want to recommend [Tailwind CSS](https://tailwindcss.com/) as the most popular *Utility-First-CSS* solution. It comes with pre-defined CSS classes. This makes you more efficient as a developer and streamlines the design system of your React application, but comes with the tradeoff of getting to know all the classes and verbose inlining of many CSS classes:

```javascript
const Headline = ({ title }) =>
  <h1 className="text-blue-700">
    {title}
  </h1>
```

Whether you choose CSS-in-CSS or Utility-First-CSS is up to you. The trend goes towards Utility-First-CSS with Tailwind CSS. CSS-in-JS solutions are not as popular anymore because of their problems with server-side environments. One last hint: If you want to apply a className conditionally in React, use a utility library like [clsx](https://github.com/lukeed/clsx).

**Recommendations:**

* Utility-First-CSS (most popular)
  * e.g. Tailwind CSS
* CSS-in-CSS
  * e.g. CSS Modules
* CSS-in-JS
  * e.g. [StyleX](https://stylexjs.com/) by Facebook (compiles to utility-first CSS)
  * e.g. Styled Components (personally I'd not recommended runtime CSS-in-JS anymore due to performance and other problems in server-side environments)
* [CSS-in-TS](https://github.com/andreipfeiffer/css-in-js) (which support TypeScript and server-side-rendering)
  

# React UI Libraries

As a beginner, it is a great and recommended learning experience to build reusable components from scratch. Whether it is a [dropdown](/react-dropdown/), a [select](/react-select/), a [radio button](/react-radio-button/), or a [checkbox](/react-checkbox/), you should know how to create these UI components yourself eventually.

However, if you don't have the resources to come up with all the components yourself, you want to use a UI library which gives you access to lots of pre-built components which share the same design system, functionalities, and rules for accessibility:

* [Material UI (MUI)](https://material-ui.com/) (still most wanted in freelance projects)
* [Mantine UI](https://mantine.dev/) (most popular 2022)
* [Chakra UI](https://chakra-ui.com/) (most popular 2021)
* [NextUI](https://nextui.org/) (based on React Aria)
* [Park UI](https://park-ui.com/) (based on Ark UI)

The trend moves towards headless UI libraries though. They come without styling, but with all the functionalities and accessibilities that a modern component library needs. Most of the time they are combined with a Utility-First-CSS solution like Tailwind:

* [shadcn/ui](https://ui.shadcn.com/) (most popular 2023)
* [Radix](https://www.radix-ui.com/)
* [React Aria](https://react-spectrum.adobe.com/react-aria/)
* [Catalyst](https://tailwindcss.com/blog/introducing-catalyst)
* [Daisy UI](https://daisyui.com/)
* [Headless UI](https://headlessui.com/)
* [Tailwind UI](https://www.tailwindui.com/) (not free)
* [Ark UI](https://ark-ui.com/) (from the makers of Chakra UI)

Perhaps more out of fashion compared to the other UI libraries:

* [Ant Design](https://ant.design/)
* [Semantic UI](https://react.semantic-ui.com/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [Reactstrap](https://reactstrap.github.io/?path=/story/home-installation--page)

Even though all of these UI libraries come with in-house components, they cannot make each component as powerful as libraries which focus only on one UI component. For example, [react-table-library](https://react-table-library.com/) allows you to create powerful table components in React while also offering you themes (e.g. Material UI) for combining it with UI libraries.

# React Animation Libraries

Any animation in a web application starts with CSS. Eventually you will notice that CSS animations aren't enough for your needs. Usually developers check out [React Transition Group](https://reactcommunity.org/react-transition-group/) then, which gives them the possibility to perform animations with React components. Other well known animation libraries for React are:

* [Framer Motion](https://www.framer.com/motion/) (most recommended)
* [react-spring](https://github.com/react-spring/react-spring)
* [react-motion](https://github.com/chenglou/react-motion)
* [react-move](https://github.com/sghall/react-move)

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

The most popular library for forms in React is [React Hook Form](https://react-hook-form.com/). It comes with everything needed: validation (most popular integrations is [zod](https://github.com/colinhacks/zod)), form submission, form state management. As alternative there are [Formik](https://github.com/jaredpalmer/formik) and [React Final Form](https://final-form.org/react). If you are using a React UI library, check out how they integrate with one of these libraries.

<ReadMore label="How to use Forms in React" link="/react-form/" />

**Recommendations:**

* React Hook Form
  * with zod integration for validation

# React Type Checking

React comes with an in-house props validation called [PropTypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html). By using PropTypes, you are able to define the props for your React components. Whenever a prop with a wrong type is passed to the component, you will get an error message:

```javascript
import PropTypes from 'prop-types';

const List = ({ list }) => (
  <div>
    {list.map((item) => (
      <div key={item.id}>{item.title}</div>
    ))}
  </div>
);

List.propTypes = {
  list: PropTypes.array.isRequired,
};
```

However, PropTypes are not included in React anymore. I would not recommend using them, however, for the sake of historical reason I still keep them around here.

The industry standard is using TypeScript in React applications. These days, there are rarely new React projects started without TypeScript, so you should get into with it too:

```typescript
type Item = {
  id: string;
  title: string;
};

type ListProps = {
  list: Item[];
};

const List = ({ list }: ListProps) => (
  <div>
    {list.map((item) => (
      <div key={item.id}>{item.title}</div>
    ))}
  </div>
);
```

[TypeScript](https://www.typescriptlang.org/) is the way to go these days. If you want to go beyond TypeScript for typed form validation, API validations (e.g. when using tRPC) and more, check out [Zod](https://github.com/colinhacks/zod).

**Recommendations:**

* if typed JavaScript is wanted, use TypeScript

# Code Structure in React

If you want to embrace a unified and common sense code style, use [ESLint](https://eslint.org/) in your React project. A linter such as ESLint enforces a particular code style. For example, you can make it a requirement with ESLint to follow a popular style guide (e.g. [Airbnb Style Guide](https://www.npmjs.com/package/eslint-config-airbnb)). Also integrate [ESLint in your IDE/editor](/vscode-eslint/) and it will point you to every mistake.

<ReadMore label="React File/Folder Structure (Comprehensive Tutorial)" link="/react-folder-structure/" />

If you want to embrace a unified code format, use [Prettier](https://github.com/prettier/prettier) in your React project. It is an opinionated code formatter with only a handful of opt-in configurations. You can [integrate it in your editor or IDE](/how-to-use-prettier-vscode/) so that it formats your code every time you save a file. Prettier doesn't replace ESLint though, but it [integrates nicely](/prettier-eslint/) with it.

Maybe a rising star in 2024 will be [Biome](https://biomejs.dev/) (formerly Rome). ESLint and Prettier are not the most favorite utilities when it comes to their setup and especially interplay. But they are necessary in every web developer's daily work. Biome wants to be an alternative to Prettier and ESLint by providing a fast (Rust based) and all-in-one toolchain.

**Recommendations:**

* ESLint + Prettier
* give Biome a chance

# React Authentication

In a React application, you may want to introduce authentication with functionalities such as sign up, sign in, and sign out. Other features like password reset and password change features are often needed as well. These features go far beyond React, because a backend application manages these things for you.

<ReadMore label="How to prepare for authentication with React Router" link="/react-router-authentication/" />

The best learning experience would be implementing a backend application with authentication (e.g. [GraphQL backend](/graphql-apollo-server-tutorial/)) yourself. However, since authentication comes with lots of security risks and nitty gritty details not everyone knows about, I advice to use one of many authentication/backend-as-a-service solutions which are out there:

* [Lucia](https://github.com/lucia-auth/lucia)
  * very interesting open source project
  * makes you independent from any third-party service (lock-in)
* [Supabase Auth](https://supabase.com/docs/guides/auth/overview)
* [Clerk](https://clerk.com/)
* [AuthKit](https://www.authkit.com/)
* [NextAuth](https://next-auth.js.org/)
* [Firebase Auth](/complete-firebase-authentication-react-tutorial/)
* [Auth0](https://auth0.com/)
* [AWS Cognito](https://aws.amazon.com/cognito/)

# React Backend

Since there is a strong trend moving React to the server, the most natural habitat for a React project would be a meta framework like Next.js, Astro, or Remix.

If you can't use a full-stack framework due to various reasons (while still being able to use a JS/TS), you have to check out [tRPC](https://trpc.io/) or [Hono](https://hono.dev/). Honorable mention goes to the old school but must popular Node backend [Express](https://expressjs.com/). Other alternatives are [Fasitfy](https://fastify.dev/) or [Nest](https://nestjs.com/).

# React Database

Not tied to React, but since full-stack React applications are getting popular these days, React is closer than ever to the database layer. While developing any Next.js application, you will most likely deal with a database ORM. The most popular ORM choice these days is [Prisma](https://www.prisma.io/). A trending alternative is [Drizzle ORM](https://orm.drizzle.team/). More alternatives are [Kysely](https://kysely.dev/) and [database-js](https://github.com/planetscale/database-js) (only PlanetScale).

When it comes to choosing a database, Supabase (or Firebase) are valid database providers. Supabase with its PostgreSQL can be self-hosted or used as a paid service. Popular alternatives which offer serverless databases are [PlanetScale](https://planetscale.com/) (personal recommendation), [Neon](https://neon.tech/), and [Xata](https://xata.io/).

<ReadMore label="Web Development Trends" link="/web-development-trends/" />

# React Hosting

You can deploy and host a React application like any other web application. If you want to have full control, choose something like [Digital Ocean](https://m.do.co/c/fb27c90322f3). If you want to have someone taking care of everything, [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/) (especially for Next.js) are popular solutions.

If you are already using a third-party backend as a service like Firebase/Supabase, you can check whether they offer hosting as well. Other popular hosting providers are [Render](https://render.com/), [Fly.io](https://fly.io/), [Railway](https://railway.app/), or directly at AWS/Azure/Google Cloud/Hetzner.

# Testing in React

If you want to get a deep dive about testing in React, read this: [How to test components in React](/react-testing-tutorial/). The gist: The backbone of testing a React application is a test framework like [Jest](https://github.com/facebook/jest). It gives you test runner, assertion library and spying, mocking, stubbing functionalities. Everything that's needed from a comprehensive test framework. If you are a fan of Vite, you should check out [Vitest](https://vitest.dev/) as viable Jest alternative though.

At the minimum, you can render React components in your testing framework with [react-test-renderer](https://www.npmjs.com/package/react-test-renderer). This is already sufficient to perform so-called [Snapshot Tests with Jest](/react-testing-jest/) or Vitest. A snapshot test works the following way: Once you run your tests, a snapshot of your rendered DOM elements of the React component is created. When you run your tests again at some point in time, another snapshot is created which is used as diff for the previous snapshot. If the diff is not identical, the test framework will complain and you either have to accept the snapshot or adjust your component.

Eventually you will find yourself using the popular [React Testing Library (RTL)](/react-testing-library/), which is used within your testing framework's environment, as a comprehensive testing library for React. RTL makes it possible to render your components and to simulate events on HTML elements. Afterward, your test framework is used for the assertions.

If you are looking for a testing tool for React end-to-end (E2E) tests, [Playwright](https://playwright.dev/) and [Cypress](/react-testing-cypress/) are the most popular choices.

**Recommendations:**

* Unit/Integration: Vitest + React Testing Library (most popular)
* Snapshot Tests: Vitest
* E2E Tests: Playwright or Cypress

# React and Immutable Data Structures

Vanilla JavaScript gives you plenty of built-in tools to handle data structures as if they are immutable. However, if you and your team feel the need to enforce immutable data structures, the most popular choice is [Immer](https://github.com/immerjs/immer).

# React Internationalization

When it comes to [internationalization i18n for your React application](/react-internationalization/), you need to think not only about translations, but also about pluralizations, formattings for dates and currencies, and a handful of other things. These are the most popular libraries for dealing with it:

* [FormatJS](https://github.com/formatjs/formatjs)
* [react-i18next](https://github.com/i18next/react-i18next)
* [Lingui](https://lingui.dev/)

# Rich Text Editor in React

When it comes to Rich Text Editors in React, I can only think of the following:

* [Plate](https://platejs.org/)
* [Lexical](https://github.com/facebook/lexical)
* [Slate.js](https://www.slatejs.org/)

# Payments in React

The most common payment providers are Stripe and PayPal. Both can be neatly integrated into React. This is a [working Stripe Checkout with React integration](https://github.com/rwieruch/react-express-stripe).

* [PayPal](https://developer.paypal.com/docs/checkout/)
* Stripe
  * [React Stripe Elements](https://github.com/stripe/react-stripe-js)
  * [Stripe Checkout](https://stripe.com/docs/payments/checkout)

# Time in React

If your React application deals heavily with dates, times, and timezones, you could introduce a library which manages these things for you. These are your options:

* [date-fns](https://github.com/date-fns/date-fns)
* [Day.js](https://github.com/iamkun/dayjs)
* [Luxon](https://github.com/moment/luxon/)

# React Desktop Applications

[Electron](https://www.electronjs.org/) and [Tauri](https://github.com/tauri-apps/tauri) are the go to frameworks for cross-platform desktop applications.

# File Upload in React

* [react-dropzone](https://react-dropzone.js.org/)

# Mails in React

* [react-email](https://react.email/) (personal recommendation)
* [Mailing](https://www.mailing.run/)
* [mjml](https://mjml.io/)

# Drag and Drop

Personally I have used [the successor of react-beautiful-dnd](https://github.com/hello-pangea/dnd) and cannot say anything negative about it. A popular alternative which offers way more flexibility and options, but comes with the cost of a steeper learning curve, is [dnd kit](https://dndkit.com/). Another alternative in the space is [react-dnd](https://github.com/react-dnd/react-dnd).

# Mobile Development with React

The go-to solution for bringing React from the web to mobile is still [React Native](https://facebook.github.io/react-native/). The most popular framework for creating React Native applications is [Expo](/react-native-expo/). If you need unified components across web and mobile, you want to check out [Tamagui](https://tamagui.dev/).

<ReadMore label="Learn Navigation in React Native" link="/react-native-navigation/" />

# React VR/AR

It's possible to dive into virtual reality or augmented reality with React. To be honest, I haven't used any of these libraries and most are early stage (experimental), but they are the ones I know from the top of my head when it comes to AR/VR in React:

* [react-three-fiber](https://github.com/pmndrs/react-three-fiber) (popular 3d library, however, I have seen VR examples too)
* [react-360](https://facebook.github.io/react-360/)
* [aframe-react](https://github.com/supermedium/aframe-react)

# Design Prototyping for React

If you are coming from a UI/UX background, you may want to use a tool for fast prototyping for new React components, layouts, or UI/UX concepts. Personally I use [Figma](https://www.figma.com/). For rough yet lightweight sketches, I like to use [Excalidraw](https://excalidraw.com/), others prefer [tldraw](https://www.tldraw.com/).

# React Component Documentation

If you are in charge of writing the documentation for your components, there are various neat React documentation tools out there. I've used [Storybook](https://storybook.js.org/) in many projects and have a neutral opinion about it. I've heard good things about these other solutions too:

* [Docusaurus](https://github.com/facebook/docusaurus)
* [Docz](https://github.com/doczjs/docz)
* [Styleguidist](https://github.com/styleguidist/react-styleguidist)
* [React Cosmos](https://reactcosmos.org/)

<Divider />

After all, the React ecosystem can be seen as a framework for React, but it stays flexible with React at its core. It is a flexible framework where you can make your own well-informed decisions about which libraries you want to opt-in. You can start small and add only libraries to solve specific problems. In contrast, if React is all you need, you can stay lightweight by using only the library.

