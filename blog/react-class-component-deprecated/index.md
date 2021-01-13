---
title: "Are React class components going away?"
description: "Are React class components going away in favor of React Hooks? Modern React with Hooks kinda deprecated React class components ..."
date: "2021-01-09T03:55:46+02:00"
categories: ["React"]
keywords: ["react class component deprecated", "are react class components going away"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

After I rewrote my book The Road to React with React Hooks using [function components](/react-function-component) instead of class components, aspiring React beginners always ask me whether **React class components are going away**. I always give them the same short answer, however, I thought it would be good to have this brief explanation here as well.

Yes, React class components will fade away in the future. If you want to embrace modern React, then you should use function components with [hooks](/react-hooks). That's why you will find most tutorials out there teaching modern React and no class components anymore.

However, if your "legacy" React project still uses [class components (or other components)](/react-component-types), there is no need to panic. Class components are not going really away -- as team members from the React team stated -- because they are still widely used in many React projects. The project with the largest usage of React class components may be Facebook itself. So until there is some kind of codemod to [migrate all class components to function components with hooks](/react-hooks-migration) automatically, there will be support for class components. What may be happening though is that React class components will get extracted into their own library eventually.

In conclusion, if you are favoring class components over function components with hooks, you are still good to use them. However, keep in mind that using [React Hooks comes with many advantages](/react-hooks-classes).