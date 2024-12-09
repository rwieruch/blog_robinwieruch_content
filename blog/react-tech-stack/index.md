---
title: "React Tech Stack [2025]"
description: "Popular React Tech Stack for Full-Stack Applications in 2025 to create your product (i.e. SaaS) ..."
date: "2024-12-09T07:50:46+02:00"
categories: ["React"]
keywords: ["react tech stack 2025"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

There are always new technologies coming out in the React ecosystem. In this article, we will explore one (!) popular React tech stack for full-stack applications in 2025 which will allow you to create your own product (i.e. SaaS) or at least the MVP of it.

*Why would I write this guide in the first place?* I have been working on many projects for several years as a freelance web developer and as a solo founder. Every year I re-evaluate the tech stack I use and try to keep up with the latest trends while still having an eye on the stability and maintainability of the project for the next years.

*To give some more context:* I have been working on a SaaS as a founder for almost an entire year and the SaaS became profitable. I like the tech stack that I have chosen back then, but I would choose a different tech stack if I would start a new project today.

This article is a result of my research, experience and my work on a full-stack web development course that I worked on for the entire year of 2024 which reflects my choice of the tech stack.

<ReadMore label="The Road to Next" link="https://www.road-to-next.com/" />

Let's dive into the short but comprehensive list.

# React Tech Stack

**Next.js** is a framework on top of React. It is one of the most popular choices when building full-stack applications with React, because it comes with lots of features out of the box (e.g. routing, caching), several rendering strategies within the same application to optimize for different goals and all the recent features from React (e.g. Server Components and Server Functions) to connect your React application to the backend.

**Astro** would be my *optional* choice to create a landing page for the product if you don't leverage the Next.js project as one monolithic application which would also be able to serve static and dynamic pages. While Astro would lead you to using a subdomain for your application (e.g. app.example.com), it would allow you to create a fast landing page with a great developer experience where you can choose from a wide range of landing pages which would free your time to work more on your SaaS.

<ReadMore label="How to start a React Project" link="/react-starter/" />

**Server Components** are not available in all React frameworks, but they are in Next. So I wanted to give them an extra mention, because they change how full-stack React applications are built. In there most basic form, they allow you to write components that execute on the server and therefore allow you to access the server (e.g. database).

**Server Functions** are another React feature enabled in Next.js that I would like to mention, because they give you the ability to execute server-side code from your React components by just calling a function. It behaves like a typed remote procedure call (RPC), but under the hood there is an API endpoint that is created for you.

**Server Actions** are a subset of Server Functions (mentioned earlier). There are a few libraries available that add a layer of abstraction to make them more user-friendly. Personally, I haven't felt the need to use them (yet), as you can easily implement your own abstraction with just a few lines of code. However, if you're looking for a ready-made solution, check out next-safe-actions or zsa.

<ReadMore label="React as a full-stack framework" link="/react-full-stack-framework/" />


**Tailwind CSS**: Although it continues to divide opinions within the developer community, I believe Tailwind is the best choice today for rapid product development and maintaining CSS in the long term. From my own experience, and that of many of my students, once you get the hang of Tailwind after a week, it's hard to imagine going back to traditional CSS approaches.

**Shadcn UI**: UI libraries come and go, but Shadcn UI has been trending for over a year now. It's a popular choice that works seamlessly with Tailwind CSS and offers a refreshing approach to UI management with its versionless system. I'd say it's a great choice for now, until the next big thing comes along or if everything starts to look too similar again.

**Lucide React**: Since this icon library already comes with Shadcn UI, I wouldn't see a need to replace it with something else. Once there is another popular kid on the block, I would consider switching for the next project. There is no big buy-in with Lucide React.

<ReadMore label="CSS Styling in React" link="/react-css-styling/" />

**TypeScript**: I think there is not much say about this choice. TypeScript became the industry standard for JavaScript projects and it is a great choice to have a better developer experience, less bugs and more maintainable code.

**Zod**: Is the industry standard for validation in React projects, because it aligns nicely with TypeScript. These days I am only using it for server-side validation (e.g. Server Actions) and keep the client-side forms lightweight with native HTML validation. This way there is no complexity in form components with any third-party form libraries.

<ReadMore label="State in React" link="/react-state/" />

**nuqs** is my go-to solution for typed URL state (e.g. search, sort, pagination) in Next.js. If you are using another framework, this feature may be built-in or you may have to use another library. In any case, I think it's important to have a solution for URL state.

**Zustand** is my *optional* choice for client-side state management. However, I *rarely* use client-side state these days because URL state, client-side data caching (e.g. React Query), and server-driven React applications (e.g. Server Components) have reduced the need for it in many cases.

**React Query** is my *optional* solution for client-side data fetching whenever it is needed for more complex cases (e.g. infinite scrolling). However, when the project complexity is low, I would stick exclusively to Server Components.

<ReadMore label="Data Fetching in React" link="/react-fetching-data/" />

**Prisma (ORM)** is always used as my ORM of choice. However, since there is always a hype for the latest trends, you could also replace it with Drizzle. I would stick with Prisma for now, because it is a stable choice and it is already used in many projects.

**Supabase (Database)** would be my choice for a database as a service. It gives you a Postgres database and many more features. Personally I only use their database, because I avoid the buy-in of their other features where I want to can keep my tech choice more flexible. For the database, I would only connect to it with Prisma and not use many of their features which would allow you to replace it any time with another database (e.g. Neon).

**Lucia (Authentication)**: These days I go with Lucia even though it is deprecated as a library. However, it is still used as a [learning resource](https://lucia-auth.com/) where it teaches the underlying concepts of authentication with libraries like Oslo, Argon2, and optionally Arctic. So you will end up with a hand rolled authentication system that is tailored to your needs instead of having a buy-in into third-party solutions like Clerk or Kinde.

**S3 (File Upload)**: Building your own file upload system with Amazon's AWS S3, presigned URLs, and AWS IAM isn't difficult, and it offers the flexibility to store files at the lowest cost. I wouldn't recommend using any other third-party solution, as it's a "implement once and forget" scenario. Most third-party services use the same API, so you can switch providers later if needed.

**Inngest (Queue)**: For my recent projects that required scaling the backend with more sophisticated task orchestration, I used [Inngest](https://www.inngest.com/). Personally, I rely on it for tasks that aren't time-critical and can run in the background. It's an excellent choice for a queue system that's easy to set up and maintain.

**React Email + Resend**: While the former allows you to create email templates with React components, the latter is a great solution for sending emails. Previously I have used [Postmark](https://postmarkapp.com/) where you can use React Email as well, but I am quite happy with my switch to Resend.

**Vercel (Hosting)**: I have been using Vercel for several years. Back then it was called Zeit and their service was called Now. They offer a great solution for hosting full-stack applications, however, I can also see why people are hesitant to use it. If you are looking for self-hosted alternative, I would recommend using [Hetzner](https://www.hetzner.com/)/[DigitalOcean](https://m.do.co/c/fb27c90322f3) with [Coolify](https://coolify.io/).

**CloudFlare (Domain)**: I used different providers over the years, but I am pretty happy with CloudFlare to manage all of my domains these days. They offer a great UI and you can attach extra information to your DNS records which makes it easier to track your services.

**Stripe (Payment Gateway)**: I don't have a hard recommendation for a payment gateway. I have used Stripe for several years and I am happy with it. However, I can see why people are hesitant to use it, because even though they have a great documentation and a great API, they also increase their API and feature surface which can be overwhelming.

**Testing & Tooling**: I don't have any hard recommendations for testing and tooling. I'd say these days a mix of React Testing Library and Cypress/Playwright is a good choice for testing. For tooling, I would recommend using ESLint (perhaps Biome in the future) and Prettier. Even though I'd hope for a good Storybook alternative, it is still my go-to solution for UI documentation. In addition I am using [tsx](https://www.npmjs.com/package/tsx) for executing TypeScript (e.g. database seeding) from the terminal.

<Divider />

Essentially this is the tech stack that I would choose today for a new project and which I teach for a comprehensive full-stack application in [The Road to Next](https://www.road-to-next.com/). I hope this article helps you to make a decision for your next project.