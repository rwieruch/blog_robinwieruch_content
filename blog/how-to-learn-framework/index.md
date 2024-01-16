---
title: "How to learn a JavaScript Framework"
description: "How to learn React, Vue, Angular or any other framework? For many developers this question pops up every day. The article should give actionable guidance on how to escape the analysis paralysis and how to get from consuming to producing by following a simple learning framework ..."
date: "2024-01-01T13:50:46+02:00"
categories: ["Starter", "React", "JavaScript"]
keywords: ["javascript framework"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

The JavaScript and web development community evolves quickly and new frameworks come and go. There are many people learning React, Angular, Vue or Svelte nowadays. They are not only computer science graduates, like it used to be in the past, but also self-taught programmers coming from bootcamps and other backgrounds.

I find it amazing that the barrier entering the field is made much more accessible in the recent years by all the opportunities organizations and companies are providing in the western world. I am saying western world here, because often it's not obvious that there is less education about those topics in other countries. It's a [huge privilege to work in this field](/giving-back-by-learning-react/) and therefore I hope people treasure it and do everything possible to [enable others for this privilege around the world](https://github.com/rwieruch/purchasing-power-parity).

The following article should give you guidance on how to approach learning a JavaScript framework. It should help you to escape the analysis paralysis and shift your internal mode from consuming to producing.

# React, Angular, Vue, Svelte?

I can only assume how the JavaScript ecosystem must feel for a beginner. It's the wild west where everyone jumps on the shiniest innovation. That's only because everyone consumes the [latest news](https://en.wikipedia.org/wiki/Availability_heuristic) on Hacker News, Twitter and Reddit. But no one is speaking about the real world where companies are not using the newest technology. It's the 80% of the companies which have to stick to their choices made years ago. It's because their main goal is to increase the business value and not to replace the underlying tech stack every year. It boils down to the value you can offer for a company, freelance client, or your own product and not the tech stack you carry around with you.

There isn't a day passing where someone isn't asking about which of these major frameworks to learn and use. Is it Angular, Vue or React? I tried to [answer a couple of those questions on platforms such as Quora too](https://www.quora.com/As-a-beginner-should-I-learn-about-AngularJs-or-jump-into-Angular-2-or-just-skip-them-and-learn-about-React-instead) but there is no way to keep up with it. They are popping up all day long. That's why I sat down to write this article.

In the past, I wrote about [my experiences moving from Angular to React](/reasons-why-i-moved-from-angular-to-react/), because I always felt it is more important to give people first-hand experiences instead of a technical comparison article. It's great to get to know about the motivations of people in the field using one of these frameworks and why they moved from one to another at some point. It gives people access to real world experiences and not only the comparison of technical aspects. But in the end the article ended up in a pile with all the other comparison articles and just added more heavy weight to it.

## Getting out of the Analysis Paralysis

Regardless of technical comparison or first-hand experience, many articles leave people with a [analysis paralyse](https://en.wikipedia.org/wiki/Analysis_paralysis). Many of those articles have no immediate impact because they don't provide a clear actionable advice in the end. They just provide more input for consumer friendly readers. Instead of nudging them towards the act of producing, their readers keep consuming and wander around from one to another article. They are never starting to learn the thing itself. They consume, but never end up producing.

After all, if you want to learn something new, you have to take the leap from consuming to producing. It doesn't matter if you choose Vue, Angular, Svelte or React, because they all solve the same problem. They enable you to build web applications. That's it. And believe it or not, if you mastered one of them, it's not difficult to use another one.

If you are staying in the analysis paralysis, there will be another framework to learn in the next year. So it's just about getting your hands dirty. Produce. Don't consume.

## JavaScript is the foundation, nothing else matters ...

After all, JavaScript is the foundation of any JS framework. If you have gathered enough JS knowledge, you shouldn't worry too much about the framework you are learning and using now. JavaScript should give you all the tools to use any of those frameworks. So your end goal should be to master JavaScript and not a framework which might be relevant for just another year for you.

Master the core principles of JavaScript. Whether you take the bottom-up (JavaScript -> Framework) or top-down (Framework -> JavaScript) approach is up to your personal learning approach. What matters is that you understand JavaScript to move effortless from one to another framework. It's not only applicable for React, Vue, Svelte or Angular, but also for libraries such as [Redux or MobX](/redux-mobx/). When you move from one technology to the next, you will need to understand the underlying mechanisms. So just take your time to learn about these core principles:

* Functions are first-class citizens in JavaScript
* bind(), apply(), and call()
* Scopes and [Closures](/javascript-closure/)
* this
* Objects (e.g. `Object.keys(myObj).map(key => myMap[key])`)
* Arrays (e.g. `[1, 2].reduce((sum, summand) => sum + summand, 0)`)
* Prototypical Inheritance -> ES6 Class
* Callbacks and Promises
* [Event Loop](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
* Event Bubbling
* Regular Expressions
* Error handling (`promise.then(...).catch(...)`, `try { } catch(e) { }`)
* JavaScript ES6 and beyond
* Hoisting, Memoization
* Declarative vs imperative programming
* Functional vs object-oriented programming

You don't need to be a wizard in these things. But at least grasp these principles to have a clue on how JavaScript works and how to use it without relying on heavyweight frameworks/libraries. For instance, people introduce far too early utility libraries such as [Lodash](https://lodash.com/). But most of the basic cases can be done with vanilla JavaScript.

Not everyone is in the financial position to learn just anything. It's time consuming. If you are financially restricted, the most important advice would be to keep an eye on the job market. Your freelance client might not care if you have built their shiny web application in Vue, React, Svelte, or Angular, but the job market shows clear trends where companies are heading. Keep an eye on it to learn something which will stay relevant. There are plenty of developer surveys out there, especially at the end of the year, and you will find more of these trends on Google Trends or StackOverflow.

# Just Start

I strongly believe that students should narrow their learning material to pave their way of learning something more effortless. Therefore it doesn't help to purchase 10 courses on Udemy. It's a never-ending consumer story and you will actually never get your hands dirty by programming yourself. Again, there are plenty of stories on platforms where people are speaking about the same problem: they have watched all the video courses, but none stuck and they don't know how to start coding.

Instead, if you have so much time to consume learning material, try to add diversity in it. Take one video courses and supplement it with a book, a podcast and a real hands-on course with a coding playground to stimulate all senses. That's how I approached [learning about machine learning](/machine-learning-javascript-web-developers/). If you are coding a personal project along the way, you should be able to keep the challenges ahead and your skills in balance. Eventually you will end up in a [state of flow](/lessons-learned-deep-work-flow/).

![state of flow](./images/state-of-flow.jpg)

If you feel like you belong to this group of people consuming too much, the most important step for you is to start producing. I believe you have already consumed plenty of learning material by now, so sit down and start to code something with your chosen framework. If you get stuck, use your favorite search engine, ask questions on StackOverflow or join a Discord community to get help from others.

Learning something new is never easy. Whereas someone is effortlessly building a thing in a video screencast in an hour without breaking out in a cold sweat, it takes you ages and lots of effort to implement the same thing. But that's normal. 99% of the video courses are prepared to show the optimal way and hide the effort. That's what makes it such a pleasure to watch. Humans by nature avoid stressful things. However, breaking out in a cold sweat and taking ages to implement the thing actually helps you to learn the subject. So just sit down and start to code.

# Pick a Project

So how do you start to code Vue, Angular, Svelte or React? Pick a project that motivates you. Take your favorite hobby and build an application for it. It doesn't need to be a full-fledged application. If you like mathematics, implement a calculator. Start small.

At this point, if you are still in analysis paralysis, implement the same calculator in all frameworks. Keep the project small so that it doesn't take you too much time for the sake of comparing the major frameworks. For instance, in the case of a calculator only implement the addition, subtraction, multiplication and division features. In the end, take the framework that feels most comfortable and go with it.

If you cannot come up with a project idea, have a look at what other developers are building to learn Svelte, React, Angular or Vue. Most of them share their efforts on social media. Let them inspire you, try to do something similar or just try to copy them.

If you don't have a hobby (what?) and nobody is inspiring you (no way!), a third way of getting inspiration is cloning your favorite web application out there. You shouldn't implement the next Facebook, but what about a simplified Trello clone? The most important pieces of advice are: keep the size of the project manageable and have a motivating topic to drive you through the troublesome parts of the project.

2016 I decided to move from Angular to React. At the time I used SoundCloud on a daily basis to listen to my favorite artists (and still do) and thus I wanted to implement a SoundCloud application in React. At this time, there was an SoundCloud clone called [sound-redux](https://github.com/andrewngu/sound-redux) where I would be able to explore the source code in case I ran into any trouble. It took me [three months](https://github.com/rwieruch/favesound-redux/graphs/contributors?from=2016-01-27&to=2016-05-16&type=c) to implement [favesound-redux](https://github.com/rwieruch/favesound-redux) from scratch. I made the [mistake to learn React with Redux](/learn-react-before-using-redux/) though which steepened the learning curve, but somehow I managed to do it. This isn't to mean that you should implement such a large project yourself. I was in a great position to transfer lots of the underlying JavaScript knowledge from Angular to React. It shows how a project can turn out if you pick something you enjoy and stick to it for a while.

![favesound react redux](./images/favesound-redux.jpg)

So what happens after you build your first project? Share it with the community on Reddit, Hacker News, Twitter or your Discord Community. Get feedback on it. Become a producer on those platforms - not only a consumer. Fully engaging with the community will help you get plenty of feedback, which helps you grow. Take this feedback with you, improve your project and start another project afterward to learn more about using your framework. Repeat the learning process with every project focusing on something new about general coding, JavaScript or your framework. Every project comes with its own challenges and opportunities for learning.

In the end, it boils down to this simple process to learn any framework:

* (1) narrow your learning material and supplement it with items for all your senses
* (2) consume the learning material and start to produce on the side
* (3) pick a project that keeps you motivated
* (4) break out in a cold sweat and take hours to tinker on your project
* (5) use a search engine, AI, Discord or StackOverflow for help
* (6) finish you project and gather feedback from others
* (7) if stuck in analysis paralysis, implement the same project in another framework
* repeat (3) to (6)

<Divider />

I hope that this article provided encouragement to start learning React, Svelte, Vue, Angular or any other framework. It doesn't matter which one you choose, but you have to take the leap from consuming to producing. Start coding now. Along the way, better understand the core principles of JavaScript. I believe if you start to learn one of those now, you can make it on the job market this year using one of these solutions.
