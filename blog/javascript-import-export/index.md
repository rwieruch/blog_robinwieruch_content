---
title: "JavaScript: Import & Export"
description: "JavaScript import and export are used to share code across folders and files. This walkthrough shows common use cases and how to apply import and export statements ..."
date: "2019-12-21T07:52:46+02:00"
categories: ["JavaScript"]
keywords: ["javascript import export"]
hashtags: ["#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

In JavaScript ES6, you can import and export functionalities from modules. These can be functions, classes, components, constants, essentially anything you can [assign to a JavaScript variable](/javascript-variable/). Modules can be single files or whole folders with one index file as entry point.

The import and export statements in JavaScript help you to share code across multiple files. Historically there were already several solutions for this in the JavaScript environment, but it was a mess because there wasn't standardized method of performing this task. JavaScript ES6 added it as a native behavior eventually.

These statements embrace code splitting, where we distribute code across multiple files to keep it reusable and maintainable. The former is true because we can import a piece of code into multiple files. The latter is true because there is only one source where you maintain the piece of code.

We also want to think about code encapsulation, since not every functionality needs to be exported from a file. Some of these functionalities should only be used in files where they have been defined. File exports are basically a public API to a file, where only the exported functionalities are available to be reused elsewhere. This follows the best practice of encapsulation.

The following examples showcase the statements by sharing one or multiple variables across two files. In the end, the approach can scale to multiple files and could share more than simple variables.

The act of exporting one or multiple variables is called a named export:

```javascript
const firstName = 'Robin';
const lastName = 'Wieruch';

export { firstName, lastName };
```

And import them in another file with a relative path to the first file.

```javascript
import { firstName, lastName } from './file1.js';

console.log(firstName);
// Robin
```

```javascript
import * as person from './file1.js';

console.log(person.firstName);
// Robin
```

Imports can have aliases, which are necessary when we import functionalities from multiple files that have the same named export.

```javascript
import { firstName as username } from './file1.js';

console.log(username);
// Robin
```

There is also the default statement, which can be used for a few cases:

* to export and import a single functionality
* to highlight the main functionality of the exported API of a module
* to have a fallback import functionality

```javascript
const robin = {
  firstName: 'Robin',
  lastName: 'Wieruch',
};

export default robin;
```

You have to leave out the curly braces to import the default export.

```javascript
import developer from './file1.js';

console.log(developer);
// { firstName: 'Robin', lastName: 'Wieruch' }
```

The import name can differ from the exported default name, and it can be used with the named export and import statements:

```javascript
const firstName = 'Robin';
const lastName = 'Wieruch';

const person = {
  firstName,
  lastName,
};

export {
  firstName,
  lastName,
};

export default person;
```

Import the default or the named exports in another file:

```javascript
import developer, { firstName, lastName } from './file1.js';

console.log(developer);
// { firstName: 'Robin', lastName: 'Wieruch' }

console.log(firstName, lastName);
// Robin Wieruch
```

You can spare the extra lines, and export the variables directly for named exports.

```javascript
export const firstName = 'Robin';
export const lastName = 'Wieruch';
```

These are the main functionalities for ES6 modules. They help you to organize your code, to maintain it, and to design reusable module APIs. You can also export and import functionalities to test them which you will do in a later chapter.

### Exercises:

* Read about [JavaScript ES6 import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).
* Read about [JavaScript ES6 export](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export).