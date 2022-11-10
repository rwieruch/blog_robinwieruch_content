---
title: "TypeScript: Type Guards"
description: "How to use type guards in TypeScript. You will learn how to check for types (and interfaces) by using user defined type guards ..."
date: "2022-10-11T06:52:46+02:00"
categories: ["TypeScript"]
keywords: ["typescript type guards"]
hashtags: ["#TypeScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Type Guards in TypeScript are needed whenever you want to allow only a certain type for a routine in TypeScript. In this TypeScript tutorial, you will learn how to check for user defined types by using so-called **user-defined type guards**.

We will start with two types and two objects annotated respectively with these types:

```typescript
type Dog = {
  name: string;
  age: number;
};

const trixi: Dog = {
  name: 'Trixi',
  age: 49, // dog years
};

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
```

In this TypeScript example, we will get to our use case for type guards by declaring a function which increases the age of each type equally:

```typescript
const celebrateBirthday = (mammal: Person | Dog) => {
  return {
    ...mammal,
    age: mammal.age + 1,
  };
};

console.log(celebrateBirthday(trixi).age);
// 50
console.log(celebrateBirthday(robin).age);
// 8
```

However, earlier when we defined the **TypeScript annotated** dog object, you already saw that the Dog type uses the `age` property differently compared to the Person type.

Problem: In the previous example, the dog is 49 years old in dog years and 7 years old in human years. So naturally when celebrating a dog's birthday, the age should not increase by 1 but by 7 when we sticking to expressing the age in dog years.

# User-Defined Type Guard

We will use a **user-define type guard** to conditionally implement logic. While the function should increase the age by one for a Person type, the should increase it by seven for a Dog type. In other words, based on the argument's type of function, it should conditionally apply logic.

```typescript
const isDog = (mammal: Person | Dog): mammal is Dog => {
  return (mammal as Dog).name !== undefined;
};
```

This new function checks for a user defined type now. While we allow passing in a Person or Dog type as object to this function, the function says that it must return an object of type Dog by using a forced **type assertion** (also called **type casting**).

Within this function, to avoid raising any TypeScript errors, we cast the function's parameter to a Dog type and check that the `name` property is not `undefined`. Because after all, only objects of type Dog have a `name` property whereas objects of type Person have a `firstName` and `lastName` property.

Next, use this user defined type guard as a function call for the actual domain logic:

```typescript{4,9}
const celebrateBirthday = (mammal: Person | Dog) => {
  return {
    ...mammal,
    age: isDog(mammal) ? mammal.age + 7 : mammal.age + 1,
  };
};

console.log(celebrateBirthday(trixi).age);
// 56
console.log(celebrateBirthday(robin).age);
// 8
```

And it works. If the argument to this function is of type Dog, its `age` property gets increased by seven. If it's not of type Dog, then it only increases by one.

<ReadMore label="Generics with TypeScript" link="/typescript-generics/" />

Last but not least, we want to avoid repetitive type declarations, so we can extract these as union type and reuse this new union type at multiple places:

```typescript{1,3,7}
type Mammal = Person | Dog;

const isDog = (mammal: Mammal): mammal is Dog => {
  return (mammal as Dog).name !== undefined;
};

const celebrateBirthday = (mammal: Mammal) => {
  return {
    ...mammal,
    age: isDog(mammal) ? mammal.age + 7 : mammal.age + 1,
  };
};
```

Essentially that's the gist to guard against a a user defined type.

Bonus: If you only want to guard against a JavaScript primitive (e.g. number), just checking for typeof (e.g. `typeof mammal.age === 'number'`) is sufficient though. If the subject you want to guard against is a JavaScript class (e.g. `class Dog { ... }`), you can use instanceof (e.g. `dog instanceof Dog`) instead.