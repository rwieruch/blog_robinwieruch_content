---
title: "React Folder Structure in 5 Steps [2022]"
description: "React Folder Structure in 2022 for large React projects. The guide walks you through a file structure from small to large project  ..."
date: "2022-04-11T07:52:46+02:00"
categories: ["React"]
keywords: ["react project structure", "react folder structure", "react file structure"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

How to structure large React applications into folders and files is a highly opinionated topic. I struggled for a while writing about this topic, because there is no right way to do it. However, every other week people ask me about how I structure my React projects -- with folder structures from small to large React projects.

After implementing React applications for a few years now, I want to give you a breakdown on how I approach this matter for my personal projects, for my [freelance projects](/freelance-react-developer/), and for my React workshops. It only takes 5 steps, and you decide what makes sense to you and how far you want to push it. So let's get started.

*For anyone who says "I move files around until it feels right": This may be alright as a solo developer, but is that really something you would do in a cross-functional team of 4 developers with a total of 5 cross-functional teams in a company? At a higher scale of teams, it becomes tricky to "just move files around without a clear vision". In addition, this is nothing I could tell my consulting clients when they ask me about this matter. Hence, thake this walkthrough as reference guide for anyone who is looking for clarity about this subject.*

# Single React file

The first step follows the rule: One file to rule them all. Most React projects start with a *src/* folder and one *src/App.js* file with an App component. At least that's what you get when you are using [create-react-app](/react-js-macos-setup/). It's a [function component](/react-function-component/) which just renders JSX:

```javascript
import * as React from 'react';

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

Eventually this component adds more features, it naturally grows in size, and needs to extract parts of it as standalone React components. Here we are extracting a [React list component](/react-list-component/) with another child component from the App component:

```javascript
import * as React from 'react';

const list = [
  {
    id: 'a',
    firstname: 'Robin',
    lastname: 'Wieruch',
    year: 1988,
  },
  {
    id: 'b',
    firstname: 'Dave',
    lastname: 'Davidds',
    year: 1990,
  },
];

const App = () => <List list={list} />;

const List = ({ list }) => (
  <ul>
    {list.map(item => (
      <ListItem key={item.id} item={item} />
    ))}
  </ul>
);

const ListItem = ({ item }) => (
  <li>
    <div>{item.id}</div>
    <div>{item.firstname}</div>
    <div>{item.lastname}</div>
    <div>{item.year}</div>
  </li>
);
```

Whenever you start with a new React project, I tell people it's fine to have multiple components in one file. It's even tolerable in a larger React application, whenever one component is strictly tight to another one. However, in this scenario, eventually this one file will not be sufficient anymore for your React project. That's when we transition to step two.

# Multiple React files

The second step follows the rule: Multiple files to rule them all. Take for instance our previous App component with its List and ListItem components: Rather than having everything in one *src/App.js* file, we can split these components up into multiple files. You decide how far you want to take it here. For example, I would go with the following folder structure:

```text
- src/
--- App.js
--- List.js
```

While the *src/List.js* file would have the implementation details of the List and ListItem components, it would only [export](/javascript-import-export/) the List component from the file as public API of this file:

```javascript{18}
const List = ({ list }) => (
  <ul>
    {list.map(item => (
      <ListItem key={item.id} item={item} />
    ))}
  </ul>
);

const ListItem = ({ item }) => (
  <li>
    <div>{item.id}</div>
    <div>{item.firstname}</div>
    <div>{item.lastname}</div>
    <div>{item.year}</div>
  </li>
);

export { List };
```

Next the *src/App.js* file can [import](/javascript-import-export/) the List component and use it:

```javascript{3,7}
import * as React from 'react';

import { List } from './List';

const list = [ ... ];

const App = () => <List list={list} />;
```

If you would take this one step further, you could also extract the ListItem component into its own file and let the List component import the ListItem component:

```text{4}
- src/
--- App.js
--- List.js
--- ListItem.js
```

However, as said before, this may take it too far, because at this point in time the ListItem component is tightly coupled to the List component and therefore it would be okay to leave it in the *src/List.js* file. I follow the rule of thumb that whenever a React component becomes a [reusable React component](/react-reusable-components/), I split it out as a standalone file, like we did with the List component, to make it accessible for other React components.

# From React files to React folders

From here, it becomes more interesting yet also more opinionated. Every React component grows in complexity eventually. Not only because more logic is added (e.g. more JSX with [conditional rendering](/conditional-rendering-react/) or logic with [React Hooks](/react-hooks/) and [event handlers](/react-event-handler/)), but also because there are more technical concerns like styles and tests. A naive approach would be to add more files next to each React component. For example, let's say every React component has a test and a style file:

```text{3-4,6-7}
- src/
--- App.js
--- App.test.js
--- App.css
--- List.js
--- List.test.js
--- List.css
```

One can already see that this doesn't scale well, because with every additional component in the *src/* folder we will lose more sight of every individual component. That's why I like to have one folder for each React component:

```text{2-11}
- src/
--- App/
----- index.js
----- component.js
----- test.js
----- style.css
--- List/
----- index.js
----- component.js
----- test.js
----- style.css
```

While the new style and test files implement styling and testing for each local component respectively, the new *component.js* file holds the actual implementation logic of the component. What's missing is the new *index.js* file which represents the public interface of the folder where everything gets exported that's relevant to the outside world. For example, for the List component it most often looks like this:

```javascript
export * from './List';
```

The App component in its *component.js* file can still import the List component the following way:

```javascript
import { List } from '../List/index.js';
```

In JavaScript, we can omit the */index.js* for the imports, because it's the default:

```javascript{1}
import { List } from '../List';
```

The naming of these files is already opinionated: For example, *test.js* can become *spec.js* or *style.css* can become *styles.css* if a pluralization of files is desired. Moreover, if you are not using CSS but something like [Styled Components](/styled-components/), your file extension may change from *style.css* to *style.js* too.

Once you get used to this naming convention of folders and files, you can just search for "List component" or "App test" in your IDE for opening each file. Here I admit, in contrast to my personal taste of concise file names, that people often prefer to be more verbose with their file names:

```text{4-6,9-11}
- src/
--- App/
----- index.js
----- App.js
----- App.test.js
----- App.style.css
--- List/
----- index.js
----- List.js
----- List.test.js
----- List.style.css
```

Anway, if you collapse all component folders, regardless of the file names, you have a very concise and clear folder structure:

```text
- src/
--- App/
--- List/
```

If there are more technical concerns for a component, for example you may want to extract [custom hooks](/react-custom-hook/), types (e.g. TypeScript defined types), stories (e.g. Storybook), utilities (e.g. helper functions), or constants (e.g. JavaScript constants) into dedicated files, you can scale this approach horizontally within the component folder:

```text{7,12-16}
- src/
--- App/
----- index.js
----- component.js
----- test.js
----- style.css
----- types.js
--- List/
----- index.js
----- component.js
----- test.js
----- style.css
----- hooks.js
----- story.js
----- types.js
----- utils.js
----- constants.js
```

If you decide to keep your *List/component.js* more lightweight by extracting the ListItem component in its own file, then you may want to try the following folder structure:

```text{12}
- src/
--- App/
----- index.js
----- component.js
----- test.js
----- style.css
--- List/
----- index.js
----- component.js
----- test.js
----- style.css
----- ListItem.js
```

Here again, you can go one step further by giving the component its own nested folder with all other technical concerns like tests and styles:

```text{12-16}
- src/
--- App/
----- index.js
----- component.js
----- test.js
----- style.css
--- List/
----- index.js
----- component.js
----- test.js
----- style.css
----- ListItem/
------- index.js
------- component.js
------- test.js
------- style.css
```

Important: From here on you need to be careful not to nest too deeply your components into each other. My rule of thumb is that I am never nesting components more than two levels, so the List and ListItem folders as they are right now would be alright, but the ListItem's folder shouldn't have another nested folder. Exceptions prove the rule though.

After all, if you are not going beyond midsize React projects, this is in my opinion the way to go to structure your React components. In my experience as a React freelancer many React projects follow this organization of a React application.

# Technical Folders

The next step will help you to structure midsize to large React applications. It separates React components from reusable React utilities such as hooks and context, but also none React related utilities like helper functions (here *services/*). Take the following baseline of a folder structure as example:

```text{2}
- src/
--- components/
----- App/
------- index.js
------- component.js
------- test.js
------- style.css
----- List/
------- index.js
------- component.js
------- test.js
------- style.css
```

All previous React components got grouped into a new *components/* folder. This gives us another vertical layer for creating folders for other technical categories. For example, at some point you may have reusable React Hooks that can be used by more than one component. So instead of coupling a custom hook tightly to a component, you can put the implementation of it in a dedicated folder which can be used by all React components:

```text{13-15}
- src/
--- components/
----- App/
------- index.js
------- component.js
------- test.js
------- style.css
----- List/
------- index.js
------- component.js
------- test.js
------- style.css
--- hooks/
----- useClickOutside.js
----- useScrollDetect.js
```

This doesn't mean that all hooks should end up in this folder though. React Hooks which are still only used by one component should remain in the component's file or a *hooks.js* file next to the component in the component's folder. Only reusable hooks end up in the new *hooks/* folder. If there are more files needed for one hook, you can change it into a folder again:

```text{14-21}
- src/
--- components/
----- App/
------- index.js
------- component.js
------- test.js
------- style.css
----- List/
------- index.js
------- component.js
------- test.js
------- style.css
--- hooks/
----- useClickOutside/
------- index.js
------- hook.js
------- test.js
----- useScrollDetect/
------- index.js
------- hook.js
------- test.js
```

The same strategy may apply if you are using [React Context](/react-usecontext-hook/) in your React project. Because context needs to get instantiated somewhere, a dedicated folder/file for it is a best practice, because it needs to be accessible by many React components eventually:

```text{16-17}
- src/
--- components/
----- App/
------- index.js
------- component.js
------- test.js
------- style.css
----- List/
------- index.js
------- component.js
------- test.js
------- style.css
--- hooks/
----- useClickOutside.js
----- useScrollDetect.js
--- context/
----- Session.js
```

From here, there may be other utilities which need to be accessible from your *components/* folder, but also from the other new folders such as *hooks/* and *context/*. For miscellaneous utilities, I usually create a *services/* folder. The name is up to you (e.g. *utils/* is another folder name I see quite often, but services makes more sense for the following import strategy). But again, it's the principal of making logic available to other code in our project which drives this technical separation:

```text{18-31}
- src/
--- components/
----- App/
------- index.js
------- component.js
------- test.js
------- style.css
----- List/
------- index.js
------- component.js
------- test.js
------- style.css
--- hooks/
----- useClickOutside.js
----- useScrollDetect.js
--- context/
----- Session.js
--- services/
----- ErrorTracking/
------- index.js
------- service.js
------- test.js
----- Format/
------- Date/
--------- index.js
--------- service.js
--------- test.js
------- Currency/
--------- index.js
--------- service.js
--------- test.js
```

Take for instance the *Date/index.js* file. The implementation details may look like the following:

```javascript
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

Fortunately [JavaScript's Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) gives us excellent tools for date conversions. However, instead of using the API directly in my React components, I like to have a service for it, because only this way I can guarantee that my components have only a little set of actively used date formatting options available for my application.

Now it's possible to not only import each date formatting function individually:

```javascript
import { formatMonth } from '../../services/format/date';

const month = formatMonth(new Date());
```

But also as a service, as an encapsulated module in other words, what I usually like to do:

```javascript{1,3}
import * as dateService from '../../services/format/date';

const month = dateService.formatMonth(new Date());
```

It may become difficult to import things with relative paths now. Therefore I always would opt-in [Babel's Module Resolver](/babel-module-resolver/) for aliases. Afterward, your import may look like the following:

```javascript{1}
import * as dateService from 'format/date';

const month = dateService.formatMonth(new Date());
```

After all, I like this technical separation of concerns, because it gives every folder a dedicated purpose and it encourages sharing functionality across the React application.

# Feature Folders

The last step will help you to structure large React applications, because it separates specific feature related components from generic UI components. While the former are often only used once in a React project, the latter are UI components which are used by more than one component.

I'll focus on components here, for the sake of keeping the example small, however, the same learnings can be applied to other technical folders from the previous section. Take the following folder structure as example, which may not show the full extent of the problem, but I hope you get the point:

```text
- src/
--- components/
----- App/
----- List/
----- Input/
----- Button/
----- Checkbox/
----- Radio/
----- Dropdown/
----- Profile/
----- Avatar/
----- MessageItem/
----- MessageList/
----- PaymentForm/
----- PaymentWizard/
----- ErrorMessage/
----- ErrorBoundary/
```

The point: There will be too many components in your *components/* eventually. While some of them are reusable (e.g. Button), others are more feature related (e.g. Message).

From here, I would use the *components/* folder only for reusable components (e.g. UI components). Every other component should move to a respective feature folder. The names of the folders are again up to you:

```text{2-14}
- src/
--- feature/
----- User/
------- Profile/
------- Avatar/
----- Message/
------- MessageItem/
------- MessageList/
----- Payment/
------- PaymentForm/
------- PaymentWizard/
----- Error/
------- ErrorMessage/
------- ErrorBoundary/
--- components/
----- App/
----- List/
----- Input/
----- Button/
----- Checkbox/
----- Radio/
----- Dropdown/
```

If one of the feature components (e.g. MessageItem, PaymentForm) need access to shared [Checkbox](/react-checkbox/), [Radio](/react-radio-button/) or [Dropdown](/react-dropdown/) component, it imports it from the reusable UI components folder. If a domain specific MessageList component needs an abstract List component, it imports it as well.

Furthermore, if a service from the previous section is tightly coupled to a feature, then move the service to the specific feature folder. The same may apply to other folders which were previously separated by technical concern:

```text{12-16,20-24,26-33}
- src/
--- feature/
----- User/
------- Profile/
------- Avatar/
----- Message/
------- MessageItem/
------- MessageList/
----- Payment/
------- PaymentForm/
------- PaymentWizard/
------- services/
--------- Currency/
----------- index.js
----------- service.js
----------- test.js
----- Error/
------- ErrorMessage/
------- ErrorBoundary/
------- services/
--------- ErrorTracking/
----------- index.js
----------- service.js
----------- test.js
--- components/
--- hooks/
--- context/
--- services/
----- Format/
------- Date/
--------- index.js
--------- service.js
--------- test.js
```

Whether there should be an intermediate *services/* folder in each feature folder is up to you. You could also leave out the folder and put the *ErrorTracking/* folder directly into *Error/*. However, this may be confusing, because ErrorTracking should be marked somehow as a service and not as a React component.

There is lots of room for your personal touch here. After all, this step is just about bringing the features together which allows teams in your company to work on specific features without having to touch files across the project.

# Bonus: Folder/File Naming Conventions

Before we had [component-based UI libraries](/why-frameworks-matter/) like React.js, we were used to name all of our folders and files with a kebab-case naming convention. In a Node.js world, this is still the status quo naming conventions. However, on the frontend with component-based UI libraries, this naming convention changed to PascalCase for folders/files containing components, because when declaring a component it follows a PascalCase naming convention as well.

```text{2-14}
- src/
--- feature/
----- user/
------- profile/
------- avatar/
----- message/
------- message-item/
------- message-list/
----- payment/
------- payment-form/
------- payment-wizard/
----- error/
------- error-message/
------- error-boundary/
--- components/
----- app/
----- list/
----- input/
----- button/
----- checkbox/
----- radio/
----- dropdown/
```

Like in the example above, in a perfect world, we would be using a [kebab-case naming convention](/javascript-naming-conventions/) for all folders and files, because PascalCase named folders/files are handled differently in the diversity of operating systems which may lead to bugs when working with teams using different OSs.

# Bonus: Next.js Project Structure

A Next.js project starts with a *pages/* folder. A common question here: Where to put the *src/* folder?

```text{3-5}
- api/
- pages/
- src/
--- feature/
--- components/
```

Usually the source folder gets created next to the pages folder. From there, you can follow the previously discussed folder/file structure within the *src/* folder.

<Divider />

Having all this written, I hope it helps one or the other person or team structuring their React project. Keep in mind that none of the shown approaches is set in stone. In contrast, I encourage you to apply your personal touch to it. Since every React project grows in size over time, most of the folder structures evolve very naturally as well. Hence the 5 step process to give you some guidance if things get out of hand.
