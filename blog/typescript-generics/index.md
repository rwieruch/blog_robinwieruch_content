---
title: "TypeScript: Generics"
description: "How to use generics in TypeScript. You will learn how to create a arrow function which uses a generic type to infer the type for the parameter from the passed argument ..."
date: "2022-08-30T06:52:46+02:00"
categories: ["TypeScript"]
keywords: ["typescript generics"]
hashtags: ["#TypeScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Generics in TypeScript are not easy to understand when just starting out with TS. Personally I had my struggles with them in the beginning, however, once you get how they are used, they make you a more complete TypeScript developer.

In this TypeScript tutorial, you will learn **how to use generics in TypeScript**. We will start with defining a JavaScript arrow expression (also called arrow function) which takes an object (here: `animal`) and returns its `age` property:

```javascript
const getAge = (animal) => {
  return animal.age;
};
```

Then we will call this function with an object which has this required property:

```javascript
const trixi = {
  name: 'Trixi',
  age: 7,
};

console.log(getAge(trixi));
// 7
```

Now if we'd want to define this code in TypeScript, it would change the following way:

```typescript{1-4,6,10}
type Animal = {
  name: string;
  age: number;
};

const getAge = (animal: Animal) => {
  return animal.age;
};

const trixi: Animal = {
  name: 'Trixi',
  age: 7,
};

console.log(getAge(trixi));
// 7
```

However, the function is *specific* to one TypeScript type (here: `Animal`) now. If we would be using a value of a different type as argument (e.g. `Person`), there would be a TypeScript error, because both types differ in their structure:

```typescript
type Person = {
  firstName: string;
  lastName: string;
  age: number;
};

const robin: Person = {
  firstName: 'Robin',
  lastName: 'Wieruch',
  age: 7,
};

console.log(getAge(robin));
// Argument of type 'Person' is not assignable to parameter of type 'Animal'.
//   Property 'name' is missing in type 'Person' but required in type 'Animal'.
```

The arrow function expects an argument of type Animal, as it's defined in the function signature, but in the previous example it received an argument of type Person which has different properties (even though both share the `age` property):

```typescript
const getAge = (animal: Animal) => {
  return animal.age;
};
```

In addition to giving the parameter a more abstract yet [descriptive name](/javascript-naming-conventions/), one solution would be using a **TypeScript union type**:

```typescript{1-2}
const getAge = (mammal: Animal | Person) => {
  return mammal.age;
};
```

And this solution would be alright for most TypeScript projects. However, once a project grows in size (vertically and horizontally), you will most certainly hit the need for TypeScript generics, because the function should accept any generic (you can also read: abstract) type which still fulfils certain requirements (here: having a `age` property).

Let's enter TypeScript generics ...

# Generics in TypeScript

Once a project grows horizontally in size (e.g. more domains in a project), an abstract function like `getAge` may receive more than two types (here: `Animal` and `Person`) as arguments. In conclusion one would have to scale the union type horizontally too, which is tiresome (but still working) and error prone.

```typescript
type Mammal = Dog | Cat | Horse | Person;
```

In the orthogonal direction, once a project grows vertically in size, functions that are getting more reusable and therefore abstract (like `getAge`) should rather deal with generic types instead of domain specific types (e.g. `Animal`, `Person`).

Popular Use Case: Most often you will see this in third-party libraries which do not know about the domain of your project (e.g. animal, person), but need to anticipate any type which fulfils certain requirements (e.g. required `age` property). Here third-party libraries cannot use union types anymore as an escape hatch, because they are not in the hands of the developer anymore who is working on the actual project.

In conclusion, if the `getAge` function should handle any entity with an `age` property, it must be generic (read: abstract). Therefore we need to use some kind of placeholder for using a **generic type** which is most often implemented as T:

```typescript
type Mammal = {
  age: number;
};

const getAge = <T extends Mammal>(animal: T) => {
  return animal.age;
};
```

Whereas the T extends Mammal stands for any type which has an `age` property. While using the following works:

```typescript
type Person = {
  firstName: string;
  lastName: string;
  age: number;
};

const robin: Person = {
  firstName: 'Robin',
  lastName: 'Wieruch',
  age: 7,
};

console.log(getAge(robin));
```

You have successfully used a TypeScript generic now. The abstract `getAge()` function takes as argument any object which has an `age` property. Neglecting the `age` property would give us a TypeScript error:

```typescript{12,18}
type Mammal = {
  age: number;
};

const getAge = <T extends Mammal>(animal: T) => {
  return animal.age;
};

type Person = {
  firstName: string;
  lastName: string;
  age?: number;
};

const robin: Person = {
  firstName: 'Robin',
  lastName: 'Wieruch',
  // age: 7,
};

console.log(getAge(robin));
// Argument of type 'Person' is not assignable to parameter of type 'Mammal'.
//   Types of property 'age' are incompatible.
//     Type 'number | undefined' is not assignable to type 'number'.
//       Type 'undefined' is not assignable to type 'number'
```

Generics are heavily used in third-party libraries. If a third-party library implements generics properly, you don't have to think much about them when using these abstract libraries in your domain specific TypeScript application.