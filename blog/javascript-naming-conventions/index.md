---
title: "JavaScript Naming Conventions"
description: "Introduction to JavaScript Naming Conventions for differen data types and data structures in JS. Learn more about how to name private methods, global vairbales, or a constant variable ..."
date: "2019-10-06T07:52:46+02:00"
categories: ["JavaScript"]
keywords: ["javascript naming conventions", "js naming conventions", "javascript naming conventions variable", "javascript naming conventions constant", "javascript naming conventions global", "javascript naming conventions private"]
hashtags: ["#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A JavaScript naming conventions introduction by example -- which gives you the common sense when it comes to naming variables, functions, classes or components in JavaScript. No one is enforcing these naming convention rules, however, they are widely accepted as a standard in the JS community.

# JavaScript Naming Conventions: Variables

**JavaScript variables are case sensitive**. Therefore, JavaScript variables with lowercase and uppercase characters are  different:

```javascript
var name = 'Robin Wieruch';

var Name = 'Dennis Wieruch';

var NAME = 'Thomas Wieruch';

console.log(name);
// "Robin Wieruch"

console.log(Name);
// "Dennis Wieruch"

console.log(NAME);
// "Thomas Wieruch"
```

A **JavaScript variable should be self-descriptive**. It shouldn't be necessary to add a comment for additional documentation to the variable:

```javascript
// bad
var value = 'Robin';

// bad
var val = 'Robin';

// good
var firstName = 'Robin';
```

Most often you will find JavaScript variables declared with a camelCase variable name with a leading lowercase character:

```javascript
// bad
var firstname = 'Robin';

// bad
var first_name = 'Robin';

// bad
var FIRSTNAME = 'Robin';

// bad
var FIRST_NAME = 'Robin';

// good
var firstName = 'Robin';
```

There are exceptions for JavaScript constants, privates, and classes/components -- which we will explore later. However, in general a JavaScript variable -- a string, boolean or number, but also an object, array or function -- is declared with a camelCase variable name.

A brief overview about the different case styles:

* camelCase (used in JS)
* PascalCase (used in JS)
* snake_case
* kebab-case

# JavaScript Naming Conventions: Boolean

A prefix like *is*, *are*, or *has* helps every JavaScript developer to distinguish a boolean from another variable by just looking at it:

```javascript
// bad
var visible = true;

// good
var isVisible = true;

// bad
var equal = false;

// good
var areEqual = false;

// bad
var encryption = true;

// good
var hasEncryption = true;
```

In contrast to strings and integers, you can see it as another *soft rule* for a JavaScript boolean naming convention besides being written in camel case.

# JavaScript Naming Conventions: Function

JavaScript functions are written in camel case too. In addition, it's a best practice to actually tell *what the function is doing* by giving the function name a verb as prefix.

```javascript{7}
// bad
function name(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

// good
function getName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
```

This verb as prefix can be anything (e.g. *get*, *fetch*, *push*, *apply*, *calculate*, *compute*, *post*). It's yet another *soft rule* to consider for having more self-descriptive JavaScript variables.

# JavaScript Naming Conventions: Class

A JavaScript class is declared with a PascalCase in contrast to other JavaScript data structures:

```javascript
class SoftwareDeveloper {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

var me = new SoftwareDeveloper('Robin', 'Wieruch');
```

Every time a JavaScript constructor is called to instantiate a new instance of a class, the name of the class should appear in Pascal Case, because the class has been declared with Pascal Case in the first place.

# JavaScript Naming Conventions: Component

Components are not everywhere in JavaScript, but commonly found in frontend frameworks like [React](/javascript-fundamentals-react-requirements/). Since a component is kinda instantiated -- but appended to the DOM instead -- like a JavaScript class, they are widely declared with Pascal Case too.

```javascript{12}
// bad
function userProfile(user) {
  return (
    <div>
      <span>First Name: {user.firstName}</span>
      <span>Last Name: {user.lastName}</span>
    </div>
  );
}

// good
function UserProfile(user) {
  return (
    <div>
      <span>First Name: {user.firstName}</span>
      <span>Last Name: {user.lastName}</span>
    </div>
  );
}
```

When a component gets used, it distinguishes itself from native HTML and [web components](/web-components-tutorial/), because its first letter is always written in uppercase.

```javascript
<div>
  <UserProfile
    user={{ firstName: 'Robin', lastName: 'Wieruch' }}
  />
</div>
```

# JavaScript Naming Conventions: Methods

Identical to JavaScript functions, a method on a JavaScript class is declared with camelCase:

```javascript{7-9,14}
class SoftwareDeveloper {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

var me = new SoftwareDeveloper('Robin', 'Wieruch');

console.log(me.getName());
// "Robin Wieruch"
```

Here the same rules as for JavaScript functions apply  -- e.g. adding a verb as a prefix --, for making the method name more self-descriptive.

# JavaScript Naming Conventions: Private

Rarely you will find an underscore (_) in front of a variable/function/method in JavaScript. If you see one, it is *intended* to be *private*. Even though it cannot be really enforced by JavaScript, declaring something as private tells us about how it should be used or how it should not be used.

For instance, a private method in a class should only be used internally by the class, but should be avoided to be used on the instance of the class:

```javascript{5,8,21}
class SoftwareDeveloper {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.name = _getName(firstName, lastName);
  }

  _getName(firstName, lastName) {
    return `${firstName} ${lastName}`;
  }
}

var me = new SoftwareDeveloper('Robin', 'Wieruch');

// good
var name = me.name;
console.log(name);
// "Robin Wieruch"

// bad
name = me._getName(me.firstName, me.lastName);
console.log(name);
// "Robin Wieruch"
```

A private variable/function can occur in a JavaScript file as well. This could mean that the variable/function shouldn't be used outside of this file but only internally to compute further business logic for other functions within the same file..

# JavaScript Naming Conventions: Constant

Last but not least, there are constants -- intended to be non-changing variables -- in JavaScript which are written in capital letters (UPPERCASE):

```javascript
var SECONDS = 60;
var MINUTES = 60;
var HOURS = 24;

var DAY = SECONDS * MINUTES * HOURS;
```

If a variable has more than one word in its variable declaration name, it makes use of an underscore (_):

```javascript
var DAYS_UNTIL_TOMORROW = 1;
```

Usually JavaScript constants are defined at the top of a JavaScript file. As hinted before, no one enforces one to not change the variable here, except a [const declaration of the variable for primitive data structures](/const-let-var/), but it's capitalized naming suggests avoiding it.

# JavaScript Naming Conventions: Global Variable

A JavaScript variable is globally defined, if all its context has access to it. Often the context is defined by the JavaScript file where the variable is declared/defined in, but in smaller JavaScript projects it may be the entire project. There are no special naming conventions for global JavaScript variables.

* A global JavaScript variable is declared at the top of a project/file.
* A global JavaScript variable is written in camelCase if it is mutable.
* A global JavaScript variable is written in UPPERCASE if it is immutable.

# JavaScript Naming Conventions: Underscore

So what about the underscore and dash in JavaScript variable namings? Since camelCase and PascalCase are primarily considered in JS, you have seen that the underscore is only rarely used for private variables or constants. Occasionally you will find underscores when getting information from third-parties like databases or [APIs](/what-is-an-api-javascript/). Another scenario where you might see an underscore are unused function parameters, but don't worry about these yet if you haven't seen them out there ;-)

# JavaScript Naming Conventions: Dash

A dash in a JavaScript variable isn't common sense as well. It just makes things more difficult; like using them in an object:

```javascript
// bad
var person = {
  'first-name': 'Robin',
  'last-name': 'Wieruch',
};

var firstName = person['first-name'];

// good
var person = {
  firstName: 'Robin',
  lastName: 'Wieruch',
};

var firstName = person.firstName;
```

It's even not possible to use a dash directly for a variable declaration:

```javascript
var first-name = 'Robin';
// Uncaught SyntaxError: Unexpected token '-'
```

That's why it's better to avoid them.

# JavaScript Naming Conventions: Files

There are two strategies of naming files in JavaScript: PascalCase and kebab-case. In JavaScript frontend applications, you will often see PascalCase for naming components (e.g. React components).

```javascript
- components/
--- user/
----- UserProfile.js
----- UserList.js
----- UserItem.js
--- ui/
----- Dialog.js
----- Dropdown.js
----- Table.js
```

In contrast, in JavaScript backend application, kebab-case is the common sense:

```javascript
- routing/
--- user-route.js
--- messages-route.js
```

You will also see camelCase namings, but similar to PascalCase (sorry frontend applications), there is a risk that operating systems are handling them differently which may lead to bugs. That's why sticking to kebab-case should be the norm for file names in JavaScript.

<Divider />

If you want to learn more about JavaScript code style and formatting, which isn't discussed here for the sake of naming conventions, you should definitely check out [ESLint](/webpack-eslint/) and [Prettier](/how-to-use-prettier-vscode/) for JavaScript.