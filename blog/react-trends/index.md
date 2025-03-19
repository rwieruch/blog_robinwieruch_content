---
title: "React Trends in 2025"
description: "React Trends in 2025 which should be on your watchlist. A walkthrough of the state of React ..."
date: "2025-03-18T08:50:46+02:00"
categories: ["React"]
keywords: ["react trends 2025"]
hashtags: ["#ReactJS"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Every year I discuss the most important trends in the world of React. In this article, we will explore the React trends in 2025 that you should be aware of. Whether you are a beginner or an experienced developer, these trends will help you stay up-to-date with the latest developments in the React ecosystem.

# React Server Components

We've come a long way with **React Server Components (RSC)**. The first announcement was made on December 21, 2020, in a [conference talk](https://www.youtube.com/watch?v=TQQPAU21ZUw) titled "Introducing Zero-Bundle-Size React Server Components". The announcement followed an [Request for Comments](https://github.com/reactjs/rfcs/pull/188), providing technical details and discussion.

The first implementation of the React Server Components specification was introduced in Next.js 13, which was announced at Next.js Conf on October 25, 2022. This release marked the beginning of the App Router (*app/* directory), which fully embraced RSC.

While Next.js 13 (2022) and 14 (2023) have been the main catalysts for RSC adoption (and have received the most negative feedback due to their bold spearheading of the technology), Next.js 15 (2024) brings a more stable vision of RSC to the masses.

Most likely 2025 will be the year when React Server Components become a standard primitive of the React ecosystem, because React Router (previously Remix) and TanStack Start are also expected to adopt RSC in their upcoming releases.

```tsx{4}
import { db } from '@/lib/db';

const PostsPage = async () => {
  const posts = await db.post.findMany();

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <h2>Posts Page</h2>

      <ul className="flex flex-col gap-y-2">
        {posts.map((post) => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

In a nutshell, React Server Components (RSC) are components that execute once on the server and send only the rendered output (not JavaScript) to the client. This reduces the client-side JavaScript bundle size while allowing direct access to databases, APIs, and backend logic without exposing it to the browser.

They work alongside Client Components, letting developers optimize performance by keeping heavy logic on the server while still enabling interactivity where needed.

<ReadMore label="React is (becoming) a Full-Stack Framework" link="/react-full-stack-framework/" />

# React Server Functions

**React Server Actions (RSA)** were introduced as an evolution of React Server Components to simplify mutations (e.g. form submissions, database updates) by allowing components to call server functions, providing a developer experience similar to a remote procedure call (RPC), without manually defining an API route.

```tsx{3-13,22-25}
import { db } from '@/lib/db';

const createPost = async (formData: FormData) => {
  'use server';

  const name = formData.get('name') as string;

  await db.post.create({
    data: {
      name,
    },
  });
};

const PostsPage = async () => {
  const posts = await db.post.findMany();

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <h2>Posts Page</h2>

      <form action={createPost} className="flex flex-col gap-y-2">
        <input type="text" name="name" placeholder="Name" />
        <button type="submit">Create</button>
      </form>

      <ul className="flex flex-col gap-y-2">
        ...
      </ul>
    </div>
  );
};
```

However, while RSC improved the developer experience (DX) for data fetching and RSA simplified mutations, fetching data in Client Components still felt cumbersome. For example, in Next.js, developers have to define custom API routes to fetch data for a Client Component, which didn’t align with the improved DX of RSC and RSA.

A temporary workaround has been using [React Server Actions for data fetching](/next-server-actions-fetch-data/) in Client Components, though this approach comes with some drawbacks.

Finally in September 2024 the React team announced **React Server Functions (RSF)** as umbrella term for both fetching and mutating data in Server Components and Client Components whereas RSA are only the subset of RSF that are used for mutating data.

None of the React (meta) frameworks did implement React Server Functions (without being in beta) yet, but it can be expected that they will get implemented in Next.js, TanStack Start, and React Router.

<ReadMore label="Web Applications 101" link="/web-applications/" />

# React Forms

React 19 has been released end of 2024 and brought a lot of improvements to the React ecosystem. While React Server Components and React Server Functions were the main focus of the release, React Forms have also been significantly improved.

The biggest change is the `action` attribute on the `<form>` element. This attribute allows developers to specify a (Server) Action that should be called when the form is submitted. In a previous example, you have seen how it is used to make a server request to create a new post. Here is another example for a client-side search:

```tsx
const Search = () => {
  const search = (formData: FormData) => {
    const query = formData.get("query");
    alert(`You searched for '${query}'`);
  };

  return (
    <form action={search}>
      <input name="query" />
      <button type="submit">Search</button>
    </form>
  );
}
```

React 19 also introduced new hooks such as `useFormStatus`, `useOptimistic` and `useActionState` (previously [useFormState](https://github.com/facebook/react/pull/28491)), which are primarily focused on managing forms and their client-side interactions.

While React has introduced many form related features, you can still rely on popular form libraries like React Hook Form. However, form handling in React has become more powerful and flexible with these new features.

<ReadMore label="Explore React Libraries" link="/react-libraries/" />

# Library vs Framework

Starting a React project has become more diverse and complex with the rise of (meta) frameworks and server-driven React features. This topic will gain even more significance in 2025 as the React ecosystem evolves and new solutions emerge. The choice of underlying framework will become increasingly important in the coming year.

<ReadMore label="How to start a React project" link="/react-starter/" />

While React started out as a library for client-side rendered/routed applications (SPAs), it has evolved into an ecosystem that supports multiple rendering modes (CSR, SSR, SSG, ISR) and routing strategies (client-side, server-side, hybrid).

<ReadMore label="Learn React as Library or Framework" link="/learning-react/" />

When using React as a library, you can focus solely on React without being tied to a specific framework. However, by doing so, you'll miss out on features like RSC and RSF, which are only supported in frameworks that offer bundling and routing solutions.

So making the right choice for your project depends on your requirements and preferences. While the good news is that you have plenty of options to choose from, the bad news is that it's getting harder to keep up with the latest solutions.

# React Frameworks

While **Next.js** is the most popular React framework, there are other frameworks that will certainly gain traction in 2025. The two main contenders that are expected to make a big impact in the React ecosystem: **TanStack Start** and **React Router**.

<ReadMore label="The Road to Next" link="https://www.road-to-next.com/" />

While TanStack Start, which heavily builds on top of TanStack Router, is new to the scene, React Router is a well-established library that is now evolving into a full-fledged framework after putting Remix into hibernation for a while.

Both frameworks are still in their early stages regarding React Server Component and Server Function support , but they have the potential to become (repeatedly) major players in the React ecosystem and offer an alternative to Next.js.

# Full-Stack React

The rise of server-driven React features like React Server Components and React Server Functions has paved the way for full-stack web applications with React. This trend is expected to continue as more developers adopt server-driven React solutions.

But accessing the database in RSC and RSF is only the beginning. Full-stack web applications require a complete backend infrastructure which includes authentication, authorization, and other server-side features such as architectural layers and caching. In addition, there will be third-parties like message queues, email services, and more.

<ReadMore label="Full-Stack React Tech Stack" link="/react-tech-stack/" />

While backend services are essential for full-stack applications, client-server communication remains crucial, even with remote procedure calls (RPC) like React Server Functions. With the evolving tools available, I believe that 2025 will see a more streamlined user experience for validation and HTTP status code handling.

<ReadMore label="Form Validation in React" link="/react-form-validation/" />

# React's "Shadcnification"

In recent years, Shadcn UI has become the default for React projects, much like Tailwind CSS. Its pre-styled yet customizable components offer a balance between convenience and flexibility, making it the go-to choice for developers who want well-designed UI elements without the constraints of traditional libraries.

This trend standardized modern React styling, but as every project starts to look alike, the search for the next big UI library may be inevitable. Sooner or later, a new approach will emerge to challenge the familiar aesthetic. Let's see if 2025 will bring a fresh take on React styling.

# React and AI

The intersection of AI and React is significant on two fronts. First, as the most popular frontend library, React code is extensively used in training AI models. Consequently, AI tools like v0 are generating React code, which can be simply integrated into projects.

Second, with React's evolution into a full-stack framework through Server Components and Server Actions, it is becoming an ideal choice for building AI-powered applications. Libraries such as Vercel's AI SDK and LangChain further enhance React's capabilities in developing sophisticated AI solutions.

# Biome

Setting up ESLint and Prettier can be challenging, especially when ensuring they work well together. However, they remain essential tools for web developers. [Biome](https://biomejs.dev/) (formerly Rome) aims to simplify this with a fast, all-in-one toolchain solution.

Another promising alternative is [oxc](https://oxc-project.github.io/).

Biome claimed the [$20,000 bounty from Prettier](https://prettier.io/blog/2023/11/27/20k-bounty-was-claimed) for creating a more performant formatter in Rust. It remains to be seen if developers will widely adopt it. Discussions are ongoing in various forums, such as [the Next.js GitHub discussion](https://github.com/vercel/next.js/discussions/59347), about reducing the strict dependency on ESLint and allowing other linters.

I am personally excited about Biome, as it has the potential to become the go-to toolchain for modern web applications, offering speed and comprehensive features.

# React Compiler

As React developers, many of us have experienced frustration with `useCallback`, `useMemo`, and `memo`. While React has required explicit performance optimizations, other frameworks achieve speed by default.

The React team is developing a [React Compiler](https://www.youtube.com/watch?v=lGEMwh32soc) to automate all memoizations in a React application. This compiler aims to eliminate the need for manually memoizing functions (`useCallback`), values (`useMemo`), and components (`memo`). React will handle these optimizations, reducing the need for recomputation on each render.

As of today, you can try out the [React Compiler](https://react.dev/learn/react-compiler) which is in beta.

<Divider />

Last but least, I have one more hopeful prediction for 2025: React developers will embrace [better naming conventions](https://x.com/rwieruch/status/1836434009041035635) for their component files.

I hope you enjoyed this article about the React trends in 2025. If you have any questions or feedback, feel free to reach out to me. I am always happy to help.