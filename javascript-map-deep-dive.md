## Introduction

## Getting started: What is the `.map` method?

The `map` method is one of the many methods existing on the JavaScript `Array` prototype. If you want to do a deep dive on protypical inheritance, here's a great read by Kyle Simpson on how prototypes work under the hood. For this article it'll be sufficient to know that the methods on the `Array` prototype are available to _every array_ that we declare in our code!

Specifically, the `map` method operates on an array to run a transformation on every element of the array. It does so through use of a _callback function_ which is called for each item of the array. After running the callback function on each item, the `map` method returns _the transformed array_, leaving the original array unchanged.

Let's take a quick look at how that looks in practice.

{{ < highlight javascript "hl_lines=7" >}}
const arr = [1, 2, 3, 4, 5]

const mapped = arr.map(function addOne(number) {
  return number + 1
})

// Notice how the original array remains unchanged
console.log(arr) // [1, 2, 3, 4, 5]
console.log(mapped) // [2, 3, 4, 5, 6]
{{ < /highlight >}}

In line 7, the `map` method is called, receiving our array of `[1, 2, 3, 4, 5]` as the original array. It then passes through every single item in the array, calling the `addOne` function with the item. Once it completes passing through the array it returns the transformed array of `[2, 3, 4, 5, 6]` back to us so that we can use it.

Now you might be asking, why don't we just use a `for` loop instead? After all, we're looping through the array and executing code on each item, we may as well, right? We could even push the transformed items to a new array in order to make sure we don't modify the original array. Why don't we just do this?

{{ < highlight javascript >}}
const arr = [1, 2, 3, 4, 5]

const mapped = []

for (let i = 0; i < arr.length; i++) {
  mapped[i] = arr[i] + 1
}

console.log(arr) // [1, 2, 3, 4, 5]
console.log(mapped) // [2, 3, 4, 5, 6]

{{ < /highlight >}}

JavaScript includes these `Array` methods&mdash;including `map`&mdash;for a reason. It's not a secret that when you're programming in JavaScript you'll probably be dealing with arrays a lot, and chances are you'll find yourself transforming those arrays quite often. Having utility methods like `map` not only help us to drastically cut down on the amount of typing that we need to do, they help our code become more readable (in many cases) by having us only describe the part of the loop that will actually change each time we're transforming array data: the transformation.

In addition, `map` helps us keep our data pure as we go through app through encouraging _immutable operations_. The `map` method never changes the original array, which helps us to predictably reason about what value each variable holds as we read through our code.

However, this isn't an article about `map` versus `for` loops! There's plenty of stuff on the internet about that, and frankly, sometimes a `for` loop will be a better choice than a `map` function. And if you're new to the map function but you're familiar with `for` loops, it might be helpful to think of the `map` method as a `for` loop internally.

As we go on further in this tutorial, we'll dive into some more examples on how map works and look at some practical ways that we can leverage this method in our day-to-day use cases.

<!--
javascript map
javascript map method
javascript map tutorial
javascript map example
javascript map usage
javascript map use cases
-->

## But first, a word about arrow functions

In the first couple examples, we used the `function` keyword to define our callback function. However, you might also be familiar with the ES2015 (or ES6) _arrow function_ (also commonly known as _lambda_) syntax for anonymous functions. Using the arrow function syntax for the `map` callback function is very common, mainly because it allows us to define all of the logic related to the `map` operation inline without becoming too syntactically burdensome.

Here's an example of that same `map` from earlier, but using an arrow function.

{{ < highlight javascript "hl_lines=3" >}}
const arr = [1, 2, 3, 4, 5]

const mapped = arr.map(number => number + 1)

console.log(arr) // [1, 2, 3, 4, 5]
console.log(mapped) // [2, 3, 4, 5, 6]
{{ < /highlight >}}

Granted, there are a few nuances that you want to be aware of in using an arrow function instead of the `function` keyword. For example, arrow functions will show up as `(anonymous function)` in a stack trace. Using the full function syntax allows us to give our callback function a name that will show in the stacktrace. However, the arrow function syntax is also a lot lighter, which makes stuff like the callbacks in `map` super easy to read!

If you want to look at a more in-depth explanation of the nuance between arrow functions and the traditional function syntax, I'd highly recommend [this article](https://medium.freecodecamp.org/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26) on FreeCodeCamp's blog. There's a lot of people on both sides of the "use vs not use arrow functions" debate, and both sides make a lot of great points.

However, we're not gonna dive too far into that debate for now. For the rest of this article I'm just gonna use the arrow syntax, as of right now it's my personal preference, especially for things like the `Array.map` method callbacks.

## All about that callback function

Understanding how the callback function in `map` works is crucial to using the `map` method effectively. In this section we'll take a look at the what arguments are passed to the callback function and some ways that we can use those arguments. The `map` method's callback takes _three_ arguments, although you can write a callback only using one or two arguments as well. Here are the three arguments that it takes.

### `value`

This is the current value being processed in the array iterations. If we ran `[1, 2, 3].map(value => value + 1)`, our callback function would be run with a `value` of `1` the first time, and then it would be called again with `2` and `3` as we iterate through the array.

### `index`

The second argument to the callback function is the _index_ of the item that we are currently processing. Taking our example array of `[1, 2, 3]`, if we run `[1, 2, 3].map((value, index) => index)` we'll see our callback get run with `0` the first time, `1` the second time, and `2` on the final time. This second argument is extremely useful if we're trying to use `map` to generate data or if we need to use the index to access a corresponding item in a _different_ array. We'll look at some more practical ways we can use the `index` argument to do some cool things with `Array.map` later on!

### `array`

The final argument to `map`'s callback function is the `array` that `map` was originally called upon. Chances are you will not often need to use this argument. The reason is that if you've already got the array tied to a variable, you've already got a reference to the original array that `map` was called upon! For example:

{{ < highlight javascript >}}
const myArray = [1, 2, 3]

// Using the third argument to map
myArray.map((value, index, arr) => arr[index - 1] ? value + arr[index - 1] : value)

// Just using the variable that holds the original array.
myArray.map((value, index) => myArray[index - 1] ? value + myArray[index - 1] : value)
{{ < /highlight >}}

Even though you might not often need the third argument to `map`, it's still god to know that it exists! Every once in a while you'll come across a situation where it comes in handy&mdash;for example, when chaining array operations or when you don't have the array bound to a variable.

<!-- KEYWORDS
javascript key value array
javascript map index
javascript map using index
javascript map with index
javascript map with key
javascript map iterate keys -->

## How to use `map` along with other array methods

### Using `map` vs using `forEach`
TK
<!-- javascript map forEach
map vs forEach (Note: mention shortly the difference between both)
javascript map return nothing (Note: Best to use forEach here!)
javascript map with forEach
javascript map and forEach
javascript map foreach example
javascript map vs for loop
javascript map array to new array (Note: That’s why map and not forEach)
what does forEach return (Note: Maybe people look this up because forEach doesn’t return anything and they want to have the equivalent for it which returns something) -->

### Using `map` along with `filter`
TK
<!--
javascript map filter
map vs filter (Note: mention shortly the difference between both)
javascript map delete  (Note: Best to use filter here!)
javascript map remove (Note: Best to use filter here!)
javascript map remove element (Note: Best to use filter here!)
 -->

### Using `map` and `reduce`
TK
<!--
javascript map reduce
map vs reduce (Note: mention shortly the difference between both)
javascript map return object (Note: Best to use reduce here!)
javascript map to object (Note: Best to use reduce here!)
javascript map to new object  (Note: Best to use reduce here!)
 -->

## Using `map` for complex data operations

While we can certainly use `map` for simple operations like adding 1 to every number in the array, it turns out that it's super flexible—we can do a ton of things armed with this simple method and our callback function.

### Extracting object keys with `map`

For example, if we wanted to use map to extract a *single key* from *every item in an array of objects*, we could do it like this:

{{ < highlight javascript "hl_lines=7" >}}
const arr = [
  { a: 1, b: "first" }, 
  { a: 2, b: "second" }, 
  { a: 3, b: "third" }
]

const mapped = arr.map(obj => obj.b)

console.log(mapped) // ["first", "second", "third"]
{{ < /highlight >}}

In this case, our callback function isn't doing much—it just takes each object and returns the value at the `b` key. As a result we end up transforming our array of objects into an array of strings.

### Using `map` to iterate through an object

Sometimes you want to iterate through all of the items _in an object itself_ as opposed to an array of objects. A common example might be if you have an object where each key represents a unique id, but all of the values might be a similar type (sort of like a [Dictionary](TK link) data structure) While `map` won't work directly on objects, we can use `map` to transform all of the values of an object through combining `map` with `Object.entries`.

`Object.entries` was added to JavaScript in [ES2017](), and has [decent browser support]() today (that is, if you're not supporting IE11). What `Object.entries` does is it takes an object for its argument and spits out a *two dimensional array* (that is, an array of arrays). Each item in the array is a array containing exactly two items: the first is the key, and the second is the value. `Object.entries`, similar to `map` creates a *new array* and does not mutate the original object.

If we leverage `Object.entries` to transform our object into an array, *then* we can use map to run whatever transformations we want on our data:

{{ < highlight javascript "hl_lines=7, 10" >}}
const obj = {
  a: 1,
  b: 2,
  c: 3,
}

const arr = Object.entries(obj)
console.log(arr) // [['a', 1], ['b', 2], ['c', 3]]

const mapped = arr.map(([key, value]) => [key, value * 2])
console.log(mapped) // [['a', 2], ['b', 4], ['c', 6]]

{{ < /highlight >}}

In line 10, we've used [array destructuring](TK link) to make our callback function a little bit easier to read. Since we know that each value in the array is a two-item array, we can assume that the first item will always be the `key` and the second item will always be the `value`. We proceed to multiply each value by 2, leaving all of the keys unaltered.

If you're cool with your transformed data being stored in an array of arrays, feel free to stop transforming it here. But perhaps you want your data to be back in its original object shape. In order to do this we'll need to combine our `map` with a `reduce` function to zip the array back up into an object.

{{ < highlight javascript >}}
const transformedObject = mapped.reduce((accumulator, [key, value]) => {
  accumulator[key] = value
  return accumulator
}, {})

console.log(transformedObject) // { a: 2, b: 4, c: 6 }
{{ < /highlight >}}

By using `reduce` to turn our `mapped` array back into an object, we get a new object that has all of the transformed values *without mutating the original object*. However, you'll probably notice that we kind of had to jump through a few hoops in order to use `map` over our object. While it's useful to know how we can use `map` to iterate over object keys, I personally think that this specific case is a prime example of the `map` vs `reduce` scenario (or `map` vs `forEach`) from earlier. If we want to transform our object by multiplying each value by two, we can simply do so by combining `Object.entries` and `reduce`/`forEach` .

{{ < highlight javascript >}}
const obj = {
  a: 1,
  b: 2,
  c: 3
}

const entries = Object.entries(obj)

const transformedObj = entries.reduce((accumulator, [key, value]) => {
  accumulator[key] = value * 2
  return accumulator
}, {})

// also works using forEach and mutating an object
const transformedObj = {}
entries.forEach(([key, value]) => {
  transformedObj[key] = value * 2
})

console.log(transformedObj) // { a: 2, b: 4, c: 6 }
{{ < /highlight >}}

In conclusion, `map` *can* be used to iterate over object keys and values as long as you transform the object keys and values into an array (via `Object.entries` or `Object.keys`). However, `map` isn't going to be capable of turning your transformed array back into an object—you will need to rely on something else if you need your transformed data in an object.

<!-- javascript map object
javascript map object example
javascript map for objects
javascript map through object
javascript map over object -->

## Conditional mapping: changing items in an array

<!-- javascript map with condition
javascript map conditional
javascript map if
javascript map if statement
javascript map update value (Note: Maybe a good example to show updating an item in the list with map and a condition.) -->

## Mapping 2-dimensional arrays: a map within a map

<!--
javascript map within map (Note: Maybe a good use case to show 2-Dimensional Arrays)
javascript map inside map
javascript map nested array
javascript map two arrays
javascript map multidimensional array
javascript map multiple arrays
 -->

## Debugging common issues with `map`

### When map is not defined

<!--
.map is not a function (Note: Maybe people are using map on an object and not array)
javascript map undefined
javascript map is not a function

 -->

### Mapping with empty arrays

 <!-- 

javascript map empty array (Note: Maybe something like (myList || []).map(…) to showcase how to deal with a list being null )
  -->
