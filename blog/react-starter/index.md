---
title: "How to start a React Project [2025]"
description: "React starter kits (Vite, Next, Astro, Remix, React Router) which help React developers to start a React project in 2025 ..."
date: "2025-02-11T07:52:46+02:00"
categories: ["React"]
keywords: ["react starter project", "react starter kit"]
hashtags: ["#ReactJS"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Every year, I want to give you a brief overview of how to start a new React project. I'll reflect on the advantages and disadvantages, the skill level needed as a developer, and the features each starter project offers to you as a React developer. By the end, you'll know about three solutions for different requirements.

# React with Vite

[Vite](https://vitejs.dev/) is often considered the unofficial successor to the most popular (now deprecated) React starter, create-react-app (CRA), as it doesn't deviate much from it. Compared to CRA (which used Webpack), Vite is much faster because it uses [esbuild](https://esbuild.github.io/) under the hood. It is also more lightweight and has a smaller configuration overhead.

![](./images/esbuild.jpg)

Vite favors creating single-page applications (SPAs) with client-side rendering (CSR) over server-side rendering (SSR). However, since SSR is becoming an increasingly important topic, it is available as an opt-in feature in Vite. Vite is also used in many other frameworks beyond React, such as Vue, Svelte, and Solid.

![](./images/vite-awards.jpg)

When transitioning from client-side rendered applications, using Vite with React is fairly straightforward. Opt-in features like [TypeScript](/vite-typescript/), SVG, and SSR are just a few configurations away in Vite's *vite.config.js* file, in addition to feature-specific files (e.g., *tsconfig*).

![](./images/vite-happiness.jpg)

Vite with React allows developers to use React without an opinionated framework. It's up to the developer to choose complementary React libraries for [routing](/react-router/), [data fetching](/react-fetching-data/), [state management](/react-state/) and [testing](/vitest-react-testing-library/). Compared to other React frameworks, it doesn't impose any specific React features, libraries, or configurations (at the project level) on you.

<ReadMore label="React Libraries for 2025" link="/react-libraries/" />

Last but not least, Vite encourages beginners to learn React and its fundamentals without the distraction of a framework. For example, my book [The Road to React](https://www.roadtoreact.com/) uses Vite to teach React. While Vite takes a backseat, beginners can focus entirely on React and its core features.

<ReadMore label="React Tech Stack in 2025" link="/react-tech-stack/" />

In contrast, when learning React within the environment of a framework, React often takes a backseat, and you have to follow the opinions (e.g., file-based routing) of the framework instead.

**React with Vite Advantages:**

* almost a [drop-in replacement](/vite-create-react-app/) for create-react-app (CRA)
* SPA/CSR friendly, but SSR is opt-in
* no framework lock-in
* lightweight configuration
* fast development server
* does not interfere with React on a feature level
  * focus on React itself, not a framework
* gentle learning curve for getting to know React's fundamentals
* Vite is used in many frameworks beyond React

**React with Vite Disadvantages:**

* prioritizes SPA/CSR
* no framework support
* you have to choose complementary libraries yourself
* no architectural features provided by React for integrated frameworks
  * React Server Components (RSC)
  * React Server Functions (RSF)

# React with Next

[Next.js](https://nextjs.org/) is the most mature framework and, therefore, the obvious choice when a React developer wants to use React in an opinionated framework environment. It comes with many features built-in. However, if Next.js isn't your cup of tea, check out [TanStack Start](https://tanstack.com/start) (Beta) [React Router (as a framework)](https://remix.run/) (in transition from Remix).

![](./images/next-happiness.jpg)

Next.js prioritizes server-side rendering (SSR) as its main rendering technique. However, it can also be used with static-site generation (SSG), incremental static regeneration (ISR), and client-side rendering (CSR, as seen with React and Vite). Additionally, it provides React Server Components (RSC) and React Server Functions (RSF) as architectural primitives.

<ReadMore label="The Road to Next" link="https://www.road-to-next.com/" />

What makes this even more mind-blowing is that you can mix and match rendering techniques within a Next.js application. For example, while a marketing page can use SSG, the actual application behind [authentication](/next-authentication/) can use SSR. There is a cost to this much power, though: Different rendering techniques create engineering overhead. The framework is constantly evolving with new rendering techniques, and not all day-to-day tech workers can keep up with the pace.

<ReadMore label="Guide to Web Applications (SSG, SSR, CSR, SPAs)" link="/web-applications/" />

While React itself only allows you to create client-side applications where you have to choose your backend, Next.js allows you to create full-stack applications. This is a big deal, as it allows you to focus on the frontend and backend in one framework. [React is becoming a full-stack framework](/react-full-stack-framework/) with React Server Components (RSC) and React Server Functions (RSF).

![](./images/next-experience.jpg)

In conclusion, while Next.js comes with many features built-in, it also carries the responsibilities of an opinionated React framework. While React itself (e.g., with Vite) remains relatively stable, you will definitely see changes in the Next.js ecosystem, as they are at the forefront of bringing React to the server.

Personally, I think there were many breaking changes in Next.js 14, but Next.js 15 has been a big step forward. The only breaking changes expected in the next major version (as of this writing) are related to caching (using the cache directive) and full React Server Function (RSF) support, since only React Server Actions (RSA) are supported at the moment.

**Next.js Advantages:**

* full-stack framework
  * frontend and backend in one framework
* supports all React features
  * React Server Components (RSC)
  * React Server Functions (RSF)
* opinionated framework with many batteries included
  * file-based routing
  * image, SEO, and font support
* SSR and many other rendering techniques
  * performance boost (caveat: if done right)
  * improved SEO compared to CSR (see React with Vite)
  * SSG, ISR, SSR, CSR, ...
* Vercel as big player with lots of funding
  * works closely with the React core team
  * has several React core team members hired in the past
* working on the bleeding edge

**Next.js Disadvantages:**

* working on the bleeding edge
* steeper learning curve compared to React with Vite
  * more focus on framework specifics, less on React itself

# React with Astro

[Astro](https://astro.build/) allows developers to create content-focused websites. Because of its island architecture and therefore selective hydration, it gives every website fast performance by default. Therefore SEO relevant websites profit from using Astro.

![](./images/astro.jpg)

From an implementation perspective, it favors the concept of multi-page applications (MPAs) over single-page applications (SPAs). Therefore it closes the historical cycle: from MPAs being the predominantly kind of a website (prior 2010) to SPAs taking over (2010 - 2020) to going back to MPAs (and thus making MPAs a term in the first place).

Astro is a framework (here: React) agnostic solution. Thus you can use Astro's built-in component syntax or a framework (e.g. React) of your choice. The framework is only there for server-side rendering though and is not exposed to the client. Only if one decides to hydrate an interactive island (see island architecture) to the client, it gets all the necessary JavaScript code shipped to the browser.

![](./images/astro-ranking.jpg)

In conclusion, even though Next (with either SSR/SSG/ISR) would be a fit for content-focused websites too, Astro seems to fit the more specific requirements (performance, SEO, content as first-class citizen (e.g. collections, MDX)) of having a content-focused website here.

**React with Astro Advantages:**

* content-focused websites
* performance
* SEO
* framework (e.g. React) agnostic

**React with Astro Disadvantages:**

* not advertised for dynamic web applications
  * but they are heavily exploring this space

## More options to start a React project ...

* [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) for mobile applications
* [Tauri](https://tauri.app/)/[Electron](https://www.electronjs.org/) for desktop applications
* [Monorepo Setup](/javascript-monorepos/) (e.g. Turborepo) with opt-in Vite, Next, and/or Astro

## TypeScript/JavaScript full-stack frameworks which do not use React ...

* Nuxt (Vue)
* SvelteKit (Svelte)
* SolidStart (Solid)
* QwikCity (Qwik)

# How to start a React Project?

* If you are starting out to learn React (from an educators perspective), stick to **Vite with React**, because it stays as close as possible to React's fundamentals. The same holds true if you are only looking for a lightweight SPA/CSR solution.
* If you are looking for an opinionated framework on top of React with several rendering techniques (and infrastructure) included, I'd recommend using **Next with React** as the most mature solution with all its advantages and disadvantages.
  * If Next.js does not fit your needs but you are still looking for an all batteries included SSR framework, check out **TanStack Start** or **React Router (Framework)**.
* If you want to have a content-focused website, check out **Astro with React**.

<ReadMore label="Learn React in 2025" link="/learning-react/" />