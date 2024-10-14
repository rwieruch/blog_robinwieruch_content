---
title: "React Folder Structure in 5 Steps [2024]"
description: "React Folder Structure in 2024 for large React projects. The guide walks you through a file structure from small to large project  ..."
date: "2024-10-14T07:52:46+02:00"
categories: ["React"]
keywords: ["react project structure", "react folder structure", "react file structure"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Organizing large React applications into folders and files is a topic that often sparks strong opinions. I found it challenging to write about this, as there isn't a definitive "correct" approach. However, I frequently get asked how I structure my React projects, from small to large, and I'm happy to share my approach.

After implementing React applications for several years now, I want to give you a breakdown on how I approach this matter for my personal projects, for my [freelance projects](/freelance-react-developer/), and for my React workshops. It only takes 5 steps, and you decide what makes sense to you and how far you want to push it. So let's get started.

# Single React file

The first step follows the sentiment: One file to rule them all. Most React projects start with a *src/* folder and one *src/[name].(js|ts|jsx|tsx)* file where you will find something like an App component. At least that's what you get when you are using [Vite](/react-starter/) for creating a client-side React application. If you are using a framework like [Next.js](https://www.road-to-next.com/) for server-driven React, you will start with a *src/app/page.js* file.

<ReadMore label="How to start a React project" link="/react-starter/" />

Here we see an example of a [function component](/react-function-component/) which just renders JSX in a single file:

```tsx
const App = () => {
  const title = 'React';

  return (
    <div>
      <h1>Hello {title}</h1>
    </div>
  );
}

export default App;
```

As this component evolves with additional features, it naturally increases in size, making it necessary to break it down into smaller, independent React components. In this case, we are extracting a [React list component](/react-list-component/) along with another child component from the App component, where we need to [pass data down through props](/react-pass-props-to-component/):

```tsx
const list = [
  {
    id: '1',
    name: 'Robin Wieruch',
  },
  {
    id: '2',
    name: 'Dave Davidds',
  },
];

const ListItem = ({ item }) => (
  <li>
    <span>{item.id}</span>
    <span>{item.name}</span>
  </li>
);

const List = ({ list }) => (
  <ul>
    {list.map(item => (
      <ListItem key={item.id} item={item} />
    ))}
  </ul>
);

const App = () => <List list={list} />;
```

When starting a new React project, it's acceptable to have multiple components in one file. In larger applications, this can still be tolerable if the components are closely related. However, as your project grows, a single file will eventually become insufficient. At that point, you'll need to transition to using multiple files.

# Multiple React files

The second step follows the sentiment: Multiple files to rule them all. Take for example our previous `List` and `ListItem` components: Rather than having everything in one file, we can split these components up into multiple files. You decide how far you want to take it here. For example, I would go with the following folder structure:

```text
- src/
--- app.js
--- list.js
```

While the *list.js* file would have the implementation details of the `List` and `ListItem`  components, it would only export the List component from the file as API:

```tsx{16}
const ListItem = ({ item }) => (
  <li>
    <span>{item.id}</span>
    <span>{item.name}</span>
  </li>
);

const List = ({ list }) => (
  <ul>
    {list.map(item => (
      <ListItem key={item.id} item={item} />
    ))}
  </ul>
);

export { List };
```

Next the *app.js* file can import the List component and continue using it:

```tsx{1,5}
import { List } from './list';

const list = [ ... ];

const App = () => <List list={list} />;
```

If you would take this one step further, you could also extract the `ListItem` component into its own file and let the `List` component import the `ListItem` component:

```text{4}
- src/
--- app.js
--- list.js
--- list-item.js
```

However, as said before, this may take it too far, because at this point in time the `ListItem` component is tightly coupled to the `List` component and not reused anywhere else. Therefore it would be better to leave it in the *src/list.js* file.

<ReadMore label="Why kebab-case instead of PascalCase for files" link="https://x.com/rwieruch/status/1836434009041035635" />

I follow the rule of thumb that whenever a React component becomes a [reusable React component](/react-reusable-components/), I split it out as a standalone file, like we did with the `List` component, to make it accessible for other React components.

Also note that I used for the sake of simplicity a JavaScript file extension. If you are using explicit JSX file extensions and/or TypeScript, you would use the *.jsx*, *.ts* or *.tsx* file extensions instead.

# From files to folders in React

From here, it becomes more interesting yet also more opinionated. Every React component grows in complexity eventually. Not only because more logic is added (e.g. more JSX with [conditional rendering](/conditional-rendering-react/) or logic with [React Hooks](/react-hooks/) and [event handlers](/react-event-handler/)), but also because there are more technical concerns like styles, tests, constants, utilities, types. All of these things could potentially be extracted into their own files.

A naive approach would be to add more files next to each React component. For example, let's say every React component has a test and a style file:

```text{3-4,6-7}
- src/
--- app.js
--- app.test.js
--- app.css
--- list.js
--- list.test.js
--- list.css
```

One can already see that this doesn't scale well, because with every additional React component in the *src/* folder we will lose more sight of every individual component. That's why I like to have one folder for each React component:

```text{2-11}
- src/
--- app/
----- index.js
----- component.js
----- test.js
----- style.css
--- list/
----- index.js
----- component.js
----- test.js
----- style.css
```

While the new style and test files implement styling and testing for each local component respectively, the new *component.js* file holds the actual implementation logic of the component.

<Divider />

What's missing an explanation is the new (yet optional) *index.js* file which represents the public interface (i.e. public API) of the folder (i.e. module) where everything gets exported that's relevant to the outside world. Many know this file under the term barrel file, which is usually not recommended in JavaScript, because it makes tree shaking harder for bundlers.

However, if you don't just re-export everything from the folder, but only the public API, then it can be a good practice, because you don't leak implementation details (e.g. styles) to the outside world. In other words, you would only be allowed to import from the *index.js* file and not from the *component.js* or *style.css* file.

For example, for the `List` component, the *src/list/index.js* file would look like this:

```tsx
export * from './list';
```

If you want to be more specific to avoid leaking implementation details, you can also export the List component directly:

```tsx
import { List } from './list';

export { List };
```

The App component in its *component.js* file can still import the List component the following way:

```tsx
import { List } from '../list/index.js';
```

We can also omit the */index.js*, because it's the default for most bundlers in JavaScript:

```tsx{1}
import { List } from '../list';
```

Anyway, barrel files are getting out of fashion in JavaScript, because they make tree shaking harder for bundlers. So you can also just import the `List` component directly from the *src/list/list.js* file and omit the *src/list/index.js* file.

<Divider />

On another note, the naming convention of the presented files is opinionated as well: For example, *test.js* can become *spec.js* or *style.css* can become *styles.css* if a pluralization of files is desired. Moreover, if you are not using CSS but something like CSS modules, your file extension may change from *style.css* to *style.module.css* too.

<ReadMore label="Learn more about CSS Style in React" link="/react-css-styling/" />

Once you get used to this naming convention of folders and files, you can just fuzzy search for list component" or "app test" in your IDE for opening each file.

But here I admit, in contrast to my personal taste of concise file names, that people often prefer to be more redundant with their folder/file names:

```text{4-6,9-11}
- src/
--- app/
----- index.js
----- app.js
----- app.test.js
----- app.style.css
--- list/
----- index.js
----- list.js
----- list.test.js
----- list.style.css
```

Anyway, if you collapse all component folders, regardless of the file names, you have a concise folder structure with all the hidden implementation details of your components:

```text
- src/
--- app/
--- list/
```

If there are more technical concerns for a component, for example you may want to extract custom React hooks, types (e.g. TypeScript definitions), stories (e.g. Storybook), utilities (e.g. helper functions), or constants (e.g. JavaScript constants) into dedicated files, you can scale this approach horizontally within the component folder:

```text{7,13-17}
- src/
--- app/
----- index.ts
----- component.ts
----- test.ts
----- style.css
----- type.ts
--- list/
----- index.ts
----- component.ts
----- test.ts
----- style.css
----- hooks.ts
----- story.ts
----- type.ts
----- utils.ts
----- constants.ts
```

If you decide to keep your `List` component smaller by extracting the `ListItem` component into its own file, then you may want to try the following folder structure:

```text{12}
- src/
--- app/
----- index.js
----- component.js
----- test.js
----- style.css
--- list/
----- index.js
----- component.js
----- test.js
----- style.css
----- list-item.js
```

Once the `ListItem` component grows in size and complexity, you can go one step further by giving the component its own nested folder with all other technical concerns:

```text{12-16}
- src/
--- app/
----- index.js
----- component.js
----- test.js
----- style.css
--- list/
----- index.js
----- component.js
----- test.js
----- style.css
----- list-item/
------- index.js
------- component.js
------- test.js
------- style.css
```

From now on, it's important to be cautious about nesting your components too deeply. My rule of thumb is to avoid nesting more than two levels. For instance, the `list` and `list-item` folders are fine as they are, but there shouldn't be another nested folder inside the `list-item` folder. That said, there can always be exceptions to this rule.

<ReadMore label="Learn more about Libraries in React" link="/react-libraries/" />

After all, if you are not going beyond small React projects, this is in my opinion the way to go to structure your React components.

# Technical Folders in React

The next step will help you to structure midsize React applications, because it separates React components from reusable React features such as custom hooks and context, but also none React related features like helper functions (here *services/*, read: utilities).

Take the following folder structure with another separating folder as a baseline:

```text{2}
- src/
--- components/
----- app/
------- index.js
------- component.js
------- test.js
------- style.css
----- list/
------- index.js
------- component.js
------- test.js
------- style.css
```

All previous React components got grouped into a new *components/* folder. This gives us another vertical layer for creating folders for other technical categories.

<ReadMore label="Learn more about Custom React Hooks" link="/react-custom-hook/" />

For example, at some point you may have reusable React Hooks that can be used by more than one component. So instead of coupling a hook tightly to a component, you can put the implementation of it in a dedicated folder to share it with all components:

```text{13-15}
- src/
--- components/
----- app/
------- index.js
------- component.js
------- test.js
------- style.css
----- list/
------- index.js
------- component.js
------- test.js
------- style.css
--- hooks/
----- use-click-outside.js
----- use-scroll-detect.js
```

This doesn't mean that all hooks should end up in this folder though. React Hooks which are still only used by one component should remain in the component's file or a *hooks.js* file next to the component in the component's folder. Only reusable hooks end up in the new *hooks/* folder.

If there are more files needed for one hook, you can change it into a folder again. You can also mix and match folder/file structures (not only applicable for the hooks folder), because whereas one hook may only need a file, another hook may need a folder:

```text{14-18}
- src/
--- components/
----- app/
------- index.js
------- component.js
------- test.js
------- style.css
----- list/
------- index.js
------- component.js
------- test.js
------- style.css
--- hooks/
----- use-click-outside/
------- index.js
------- hook.js
------- test.js
----- use-scroll-detect.js
```

The same strategy may apply if you are using [React Context](/react-usecontext-hook/) in your React project. Because context needs to get instantiated somewhere, a dedicated folder/file for it is a best practice, because it needs to be accessible by many React components eventually:

```text{16-17}
- src/
--- components/
----- app/
------- index.js
------- component.js
------- test.js
------- style.css
----- list/
------- index.js
------- component.js
------- test.js
------- style.css
--- hooks/
----- use-click-outside.js
----- use-scroll-detect.js
--- context/
----- session.js
```

From here, there may be other utilities which need to be accessible from your *components/* folder, but also from the other new folders such as *hooks/* and *context/*.

For miscellaneous utilities, I usually create a *services/* folder. The name is up to you (e.g. *utils/*, *lib/*, *misc/* are other folder name I see quite often). Again it's the principal of making logic available to other code in the project which drives this technical divide:

```text{10-23}
- src/
--- components/
----- app/
----- list/
--- hooks/
----- use-click-outside.js
----- use-scroll-detect.js
--- context/
----- session.js
--- services/
----- error-tracking/
------- index.js
------- service.js
------- test.js
----- format/
------- date-time/
--------- index.js
--------- service.js
--------- test.js
------- currency/
--------- index.js
--------- service.js
--------- test.js
```

Take for instance the *date-time/index.js* file's  implementation details as an example:

```tsx
export const formatDateTime = (date) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).format(date);

export const formatMonth = (date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(date);
```

Fortunately [JavaScript's Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) gives us methods for date conversions. However, instead of using the API directly in my React components, I like to have a service for it, because only this way I can guarantee that my components have only a little set of actively used date formatting options available for my application.

Now it's possible to import each date formatting function individually:

```tsx
import { formatMonth } from '../../services/format/date-time';

const month = formatMonth(new Date());
```

But I prefer it as a "service", in other words as an encapsulated module with a public API, which follows the following import strategy:

```tsx{1,3}
import * as dateTimeService from '../../services/format/date-time';

const month = dateTimeService.formatMonth(new Date());
```

It may become difficult to import things with relative paths. Therefore I'd always opt-in  into aliases with absolute imports. Afterward, your import may look like the following:

```tsx{1}
import * as dateTimeService from '@/services/format/date-time';

const month = dateTimeService.formatMonth(new Date());
```

Opponents of barrel files may argue that this is a barrel file, because it re-exports everything from the folder. However, I see it as a public API for the folder, because it only exports the public API of the folder and not all the implementation details.

After all, I like this technical separation of concerns, because it gives every folder a dedicated purpose and it encourages sharing functionality across the React application. You can always adapt this structure to your needs, for example making the service structure more fine-grained compared to the one from above:

```text{8-19}
--- services/
----- error-tracking/
------- index.js
------- service.js
------- test.js
----- format/
------- date-time/
--------- date-time/
----------- index.js
----------- service.js
----------- test.js
--------- date/
----------- index.js
----------- service.js
----------- test.js
--------- time/
----------- index.js
----------- service.js
----------- test.js
------- currency/
--------- index.js
--------- service.js
--------- test.js
```

Please see the proposed folder structure as a structural guideline and not a naming convention. The naming of the folders and files is up to you.

# Feature Folders in React

The last step will help you to structure large React applications, because it separates specific feature related components from generic UI components. While the former are often only used once in a React project, the latter are UI components which are used by more than one component.

I'll focus on components to keep the example concise, but the same principles can be applied to all the technical folders mentioned earlier. Consider the following folder structure as an example. While it may not fully illustrate the scope of the issue, I trust the point will be clear:

```text
- src/
--- components/
----- list/
----- input/
----- button/
----- checkbox/
----- radio-button/
----- dropdown/
----- profile/
----- avatar/
----- post-item/
----- post-list/
----- payment-form/
----- payment-wizard/
----- error-message/
----- error-boundary/
```

The point: There will be too many components in your *components/* folder (or any other technical folder) eventually. While some of them are reusable (e.g. Button), others are more feature related (e.g. Message).

From here, I'd use the *components/* folder only for reusable components (e.g. UI components). Every other component should move to a respective feature folder. The names of the folders are up to you, but I like to use the feature name as the folder name:

```text{2-14}
- src/
--- feature/
----- user/
------- profile/
------- avatar/
----- post/
------- post-item/
------- post-list/
----- payment/
------- payment-form/
------- payment-wizard/
----- error/
------- error-message/
------- error-boundary/
--- components/
----- list/
----- input/
----- button/
----- checkbox/
----- radio-button/
----- dropdown/
```

If one of the feature components (e.g. `PostItem`, `PaymentForm`) need access to a shared [Checkbox](/react-checkbox/), [Radio](/react-radio-button/) or [Dropdown](/react-dropdown/) component, it imports it from the reusable UI components folder. If a domain specific `PostList` component needs an abstracted `List` component, it imports it as well.

Furthermore, if a service from the previous section is tightly coupled to a feature, then move the service to the specific feature folder. The same may apply to other folders (e.g. hooks, context) which were previously separated by technical concern:

```text{12-16,20-24,26-33}
- src/
--- feature/
----- user/
------- profile/
------- avatar/
----- post/
------- post-item/
------- post-list/
----- payment/
------- payment-form/
------- payment-wizard/
------- services/
--------- currency/
----------- index.js
----------- service.js
----------- test.js
----- error/
------- error-message/
------- error-boundary/
------- services/
--------- error-tracking/
----------- index.js
----------- service.js
----------- test.js
--- components/
--- hooks/
--- context/
--- services/
----- format/
------- date-time/
--------- index.js
--------- service.js
--------- test.js
```

Whether there should be an intermediate *services/* folder in each feature folder is up to you. You could also leave out the folder and put the *error-tracking/* folder directly into *error/*. However, this may be confusing, because error-tracking should be marked somehow as a service and not as a React component. So you could also go further with this structure for single feature folders by adding technical folders to them:

```text{2}
----- error/
------- components/
--------- error-message/
--------- error-boundary/
------- services/
--------- error-tracking/
----------- index.js
----------- service.js
```

There is lots of room for your or your team's personal touch here. After all, this step is just about bringing the features together which allows teams in your company to work on specific features without having to touch files across the project. How far you nest folders and where you separate technical concerns is up to you.

```text
- src/
--- feature/
----- feature-one/
------- technical-concern-one/
------- technical-concern-two/
------- ... // <--- maybe more technical concerns
----- feature-two/
------- technical-concern-one/
------- technical-concern-two/
------- ... // <--- maybe more technical concerns
--- components/
--- hooks/
--- context/
--- services/
... // <--- maybe more globally shared technical folders
```

The big picture from above is to separate feature related components from reusable components and to separate technical concerns from feature related components.

# Bonus: Page driven Project Structure

Eventually you will have multiple pages in your React application. If you are using a framework like Next.js, you will have a *app/* folder where you put your *page.tsx* files for file based routing. However, if you are using a client-driven React application (e.g. React + Vite), you may want to structure your project around a *pages/* folder as well, because pages are the entry points for users to interact with your application:

```text{2}
- src/
--- pages/
--- feature/
--- components/
--- hooks/
--- context/
--- services/
```

In a Next.js project, the app folder is the pages folder. The following structure shows an example of how you could structure it for a CRUD application around the a post feature:

```text{2-7}
- src/
--- app/
----- page.tsx
----- posts/
------- page.tsx
------- [postId]
--------- page.tsx
--- feature/
----- post/
------- post-list/
----- comment/
------- comment-list/
--- components/
----- list/
--- hooks/
--- context/
--- services/
```

In this example, the user would be able to go to a */posts* page to see a list of posts and to a */posts/[postId]* page to see a single post with comments. Whereas the `PostList` would be used on the */posts* page, the `CommentList` would be used on the */posts/[postId]* page. Both of these list components would reuse the `List` component from the *components/* folder.

One could make a whole discussion about the above folder structure, because there are various things to consider. Don't take the following things as granted, but as a starting point for a discussion:

* Should the comment feature folder be nested in the post feature folder?
  * Yes, it could be nested if the comment feature is only used by the post feature.
  * No, it shouldn't be nested if the comment feature is used by multiple features.
    * For example, if there are more features like a *goals/* or *achievements/* where users can leave comments, the comments feature would be a shared feature across multiple features.
* Should the list component be nested in the post feature folder?
  * Yes, it could if the post feature is the only feature using the list component.
  * No, it shouldn't if the list component is used by multiple features.
    * In our example above, the list component is used by the post feature and the comment feature. Therefore it should be a shared component across multiple features.
* There are React frameworks which allow private folders in the *pages/* (in Next.js *app/*) folders. If this is the case, should the *post/* feature be moved as private folder into the *pages/posts/* folder?
  * Yes, it could be moved if the post feature is only used by the */posts* page.
    * But I'd always advice against it, because it makes 1) the feature folder structure inconsistent. If you have a feature folder structure, then keep it consistent across the project. And 2) it makes the feature folder structure less flexible. If you want to reuse the post feature in another page later, you would have to move it out of the private folder again.

<Divider />

Having all this written, I hope it helps one or the other person or team structuring their React project. Keep in mind that none of the shown approaches is set in stone. In contrast, I encourage you to apply your personal touch to it. Since every React project grows in size over time, most of the folder structures evolve very naturally as well. Hence the 5 step process to give you some guidance if things get out of hand.
