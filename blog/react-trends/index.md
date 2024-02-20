---
title: "React Trends in 2024"
description: "React Trends in 2024 which should be on your watchlist. A walkthrough of the state of React ..."
date: "2024-02-20T08:50:46+02:00"
categories: ["React"]
keywords: ["react trends 2024"]
hashtags: ["#ReactJS"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

The year 2024 got me excited about React's ecosystem again. Despite the various challenges and dramas (the biggest one of them moving React to the server with React Server Components) we had last year, there are emerging React trends that everyone should have on their watchlist. Here is my list of exciting React trends for 2024.

# Astro (with React)

Last year [Astro](https://astro.build/) stepped in as the successor of [Gatsby](https://www.gatsbyjs.com/). While it became mainly known for static websites, its growing popularity pushed Astro to explore web applications and API endpoints too. So while it is perfectly positioned for highly performant websites, web developers start considering it for use cases beyond its original idea.

![](./images/astro.jpg)

Websites built with Astro are performant by default, because they start with zero JavaScript and move all the expensive rendering to the server. While static site generation (SSG) is the default, you can also opt-in into server-side rendering (SSR).

Astro is not strictly tied to React. You can use Astro without any UI framework, using their native way of creating UI components in a ".astro" file. However, Astro enables you to opt-in your favorite component framework (e.g. React) where you already have all the experience to create a landscape of well-designed and functional UI components.

When Astro is used with a component framework like React, it still comes with zero JavaScript and only ships HTML and CSS to the browser. Only in the case of components becoming interactive, the server provides the necessary JavaScript to the client. All of this is tied to Astro's "fast-by-default performance"-story which is driven by its rendering paradigm called [Island Architecture](https://docs.astro.build/en/concepts/islands/).

Personally I want to explore Astro more in 2024 for my projects. Last year it already helped me to bootstrap the [website](https://www.cloud-camping.com/) for a new startup which comes with perfect performance/SEO scores, a beautiful theme and a drop-in documentation powered by [Astro Starlight](https://starlight.astro.build/de/). I guess it's only a matter of time until all websites come with this as default. In a new project I would like to try its web application capabilities with authentication, API endpoints, and server-rendered content.

# Authentication (in React)

Auth in React became exciting again too, because multiple startups and open source projects started to stir up dust in this area. While Firebase Authentication, Auth0, Passport.js, and NextAuth were the defaults for a long time, we are finally able to explore new frontiers with inexpensive and UI driven alternatives for authentication.

[Supabase](https://supabase.com/) is the open source alternative to Google's Firebase. It does not only come with auth, but also a PostgreSQL database, realtime subscriptions, storage, serverless functions and more. A Supabase instance can either be self-hosted or be used as a hosted (yet paid) service. Many developers though use it for its authentication while choosing other services (e.g. [PlanetScale](https://planetscale.com/) as a serverless DB) for the remaining areas.

[Clerk](https://clerk.com/) is another contender in the space which solely focuses on authentication. With its drop-in components for React, you can easily sign up and later sign in users to your application. Beyond that, it is also possible to manage users and their roles within one or multiple organizations. Personally I found Clerk to be the perfect solution when it comes to bootstrapping a new MVP for a startup.

Last but not least [Lucia](https://github.com/lucia-auth/lucia), which became popular in combination with Astro, but can be used in other frameworks too. Here I am especially excited about its open source nature, the community effort, and the clear abstraction layer that they provide between your application and your database. The latter makes it possible to manage the users in your own database which is a huge win in contrast to other authentication services.

# tRPC for Full-Stack React Applications

[tRPC](https://trpc.io/) has become my favorite last year for [type safe full-stack](https://www.robinwieruch.de/react-trpc/) applications. In my last solo project (80k LoC), I used tRPC (and [Prisma](https://www.prisma.io/) as database ORM) to get type safety with TypeScript types across database, server application and client application.

How does it work in a  nutshell? While Prisma generates the types from the database models for the backend application, tRPC maintains type safety from the backend across the API layer for the frontend. That said, the types for the API must not be the same types that come from the database models in a growing full-stack application.

With all this setup and tRPC's underlying nature of remote procedure calls, the client application can call the backend's API by invoking plain functions. Under the hood, tRPC uses [JSON-RPC](https://www.jsonrpc.org/specification) as specification and HTTP as transport layer. What makes this even better: tRPC can be combined with [react-query](https://www.npmjs.com/package/@tanstack/react-query) for caching and batching requests efficiently besides all the other upgrades that come from using a query library.

I am excited where this year takes tRPC and how their official React Server Component integration will shape over time. Speaking of React Server Components ...

# React Server Components and Next.js

React Server Components (RSC) were released as specification (including the underlying implementations) by React and found their implementation and first adoption by the community last year with Next 13.4. All the drama and challenges aside, React Server Components push web development towards a big paradigm shift.

RSCs may be a greater shift than React Hooks, because they make us rethink how to use React components in a larger application. In Next.js and its new App Router, RSCs become the default for every React developer. While more frameworks (even beyond React) are looking into the adoption (and implementation) of Server Components, there are new emerging smaller frameworks like [Waku](https://github.com/dai-shi/waku) which already implemented them.

There are many benefits that come with this new architecture, and while it is difficult to highlight all of them here, I want to give an example: RSCs enable us to perform data fetching on a component level on the server before the component is sent (or streamed) to the browser. The benefit: The dreaded waterfall requests over the network from client to server become a thing of the past. Now the waterfall happens on the server much faster, if any, which will bring us towards improved performance.

Highlighting this aspect of RSCs is important, because it shows how React's ecosystem needs to adapt to them. tRPC and react-query are used for client-server communication, so the question becomes what role they will play in an API-less world where RSCs do most (?) the data fetching on the server. There are proof-of-concepts out there already, so we can be excited how all of it turns out in 2024.

# TanStack Router for SPA React

Single Page Applications (SPAs) are not dead (yet). That's how Tanner Linsley positions himself in all the React Server Components hype. Why does this matter though? He is one of the driving forces behind the most popular React libraries such as react-query and react-table. And just recently he published a new library: [TanStack Router](https://github.com/tanstack/router).

TanStack Router comes at the perfect time to fill an important gap in the React ecosystem. While many developers adopt meta frameworks like Next.js and Remix (which uses the most popular [React Router](https://reactrouter.com/) under the hood and has its focus on the [implementation of RCSs](https://twitter.com/ryanflorence/status/1729274387671760936) too) with their built-in router, no one yet created a type safe router for React in the first place.

Since TypeScript became the industry standard over the last years, I am excited for a new router in the React ecosystem which comes with first-class TypeScript support. For example, it will allow developers to read and write to URL state in a type safe manner. Perhaps this new router may also push other established routers raising to these TS first standards.

# Vercel pushing React on the Edge

Vercel is the company behind Next.js which is hugely involved in the whole React Server Components movement. Since several core developers were hired by Vercel, many developers think Vercel is also the driving force behind React. But all this conspiracy aside, it is great that someone took the reins to push React's boundaries.

Vercel is not only pushing React's boundaries with React Server Components, but also how React applications get efficiently deployed and delivered to users with Next.js. Having a Next application on Vercel comes with the benefit of opt-in streaming React components with their Edge Runtime.

The performance implications serving an application from the edge are huge, because the application is not hosted at a for your users remote place anymore (e.g. US East), but as a serverless function as close as possible to your application's users. Paired with a serverless DB like PlanetScale which has read replicas all over the world, this becomes an interesting trend on how (or better where) we host applications in the future.

# Bundlers for React: Turbopack vs Vite

[Turbopack](https://turbo.build/pack) (built by Vercel and the creator of Webpack) is the successor of Webpack. It is not production ready yet, but can be enabled for local development in Next.js applications. Turbopack takes all the lessons learned from the most popular JavaScript bundler (Webpack) and puts them in a new Rust powered bundler. For example, while tree shaking and caching were afterthoughts in Webpack, they got first-class support in Turbopack.

In the past, bundlers already had many responsibilities. However, with the emerging trend of interweaving client and server components (e.g. RCSs) in development and production environments, caching at various entry points of the application, and the need to know about data fetching at a component level, bundlers have to level up. Therefore the need for a new kind of bundler was born at Vercel.

Personally I would have liked to see [Vite](https://vitejs.dev/) and its server-side capabilities being used by Nextjs. However, while many other meta frameworks (also [Remix](https://remix.run/blog/remix-heart-vite)) and single page applications aligned on Vite as their bundler over the last year, Vercel/Next decided for the time being against it and started their work on Turbopack.

# React Compiler (known as React Forget)

Who isn't frustrated about `useCallback`, `useMemo` and `memo` as a React developer. Where React stuck to be explicit for quite a while now, other frameworks do not need these utilities to improve performance. They are fast by default.

But the React team is working (relatively quiet) on a compiler called [React Compiler](https://www.youtube.com/watch?v=lGEMwh32soc) which will automate all memoizations in a React application. What has been a manual process of memoizing functions (`useCallback`), values (`useMemo`) and components (`memo`) will hopefully go away in the future. React will take care about memoizing all these things for us, so that not everything needs to compute again on the next render.

Recently, there have been news and rumors circulating about React 19 and the potential release of its new compiler. It's quite probable that this release will coincide with [React Conf 2024](https://conf.react.dev/).

# Biome

ESLint and Prettier are not the most favorite utilities when it comes to their setup and especially interplay (if the setup wasn't correct). But they are necessary in every web developer's daily work. [Biome](https://biomejs.dev/) (formerly Rome) wants to be an alternative in this space by providing a fast and all-in-one toolchain solution. An alternative all-in-one toolchain which looks very promising is [oxc](https://oxc-project.github.io/).

Biome claimed the [$20.000 bounty from Prettier](https://prettier.io/blog/2023/11/27/20k-bounty-was-claimed) to create a more performant formatter in Rust. Now only time will tell if developers will adopt it. There are ongoing discussions at various places (e.g. Next.js GitHub discussion) to lose the strict dependency to ESLint and allow developers to use other linters.

Personally I am excited about this project, because it *could* be the one toolchain that powers all the necessities for a modern web application in a very fast way.

# Headless UI Libraries for React

React developers like to change their favorite UI library annually. What has been Material UI a couple of years ago transitioned over to Semantic UI/Ant Design, then Chakra UI, then Mantine UI and settled (?) last year on shadcn/UI. While all the previous choices were mainly driven by a desire for design and usability, several things have changed with shadcn/UI.

shadcn/UI is the first popular UI library which fully embraces Tailwind as first-class citizen (next to CSS Variables) for theming their components to achieve custom design. Following Tailwind in its footsteps, shadcn/UI is not installed as a node package, but rather copy and pasted into a project where one can freely adapt the components.

The trend for Headless UI libraries that only provide the bare bone component as a skeleton (functionality, accessibility, ...) without design was not started by shadcn/UI. It stemmed from a deeper desire where it has always been difficult to provide a unique design and therefore a unique user experience while relying on a popular UI library.

In addition, the trend towards rendering components on the server for an improved performance and user experience halted the usage of CSS-in-JS solutions like Styled Components and Emotion, because they put all the performance burden on the client/browser by executing JavaScript to output CSS. Emerging CSS-in-JS solutions like [StyleX](https://stylexjs.com/) mitigate this problem by compiling to utility-first CSS.

One can be curious what new UI libraries and CSS paradigms will come out of this trend. We have seen the rise of headless UI libraries (e.g. Radix with shadcn/UI) and utility-first CSS (e.g. Tailwind), but we wouldn't be web developers if there weren't already alternatives (e.g. [vanilla-extract](https://vanilla-extract.style/), [PandaCSS](https://panda-css.com/), [CVA](https://cva.style/)) on the horizon.

<Divider />

I trust you share my enthusiasm as we embark on the journey into 2024, embracing the exciting trends in web dev. With a prevailing focus on performance, it is evident that we are moving towards a future coined by remarkable user experiences in the browser.