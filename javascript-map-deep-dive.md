## Introduction

## Getting started: What is the `.map` method?

The `map` method is one of the many methods existing on the JavaScript `Array` prototype. If you want to do a deep dive on protypical inheritance, here's a great read by Kyle Simpson on how prototypes work under the hood. For this article it'll be sufficient to know that the methods on the `Array` prototype are available to *every array* that we declare in our code!

Specifically, the `map` method operates on an array to run a transformation on every element of the array. It does so through use of a *callback function* which is called for each item of the array. After running the callback function on each item, the `map` method returns *the transformed array*, leaving the original array unchanged.

Let's take a quick look at how that looks in practice.

{{ < highlight javascript "hl_lines=7" >}}
function addOne(number) {
  return number + 1
}

const arr = [1, 2, 3, 4, 5]

const mapped = arr.map(addOne)

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

In addition, `map` helps us keep our data pure as we go through app through encouraging *immutable operations*. The `map` method never changes the original array, which helps us to predictably reason about what value each variable holds as we read through our code.

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

In the first couple examples, we used the `function` keyword to define our callback function.

<!--
Section: Changes between ES5 and ES6
javascript map with arrow function (Note: Maybe good to show first examples with ES5 function, but then after this example everything that follows with ES6 arrow functions)
javascript map function
javascript map with function
javascript map es5
javascript map es6
javascript map example es6
-->

## The callback function
<!--
Go through exactly what is passed in the callback function and how versatile it truly is!

using the first argument -- 90% of the time you'll only need this
using the second argument indexes / keys
using the third argument -- 
  you will rarely need this. 
  most of the time you can just use the actual array you're mapping over since they're the same.
  But it's good to know in case you have some complex chain of operations where you don't have the array bound to a variables _and_ you need to map items based off of another item in the array.
-->

<!-- KEYWORDS
javascript key value array
javascript map index
javascript map using index
javascript map with index
javascript map with key
javascript map iterate keys -->

## When to use `map` instead of other array methods

### Show combination and differences of JS map forEach
<!-- javascript map forEach
map vs forEach (Note: mention shortly the difference between both)
javascript map return nothing (Note: Best to use forEach here!)
javascript map with forEach
javascript map and forEach
javascript map foreach example
javascript map vs for loop
javascript map array to new array (Note: That’s why map and not forEach)
what does forEach return (Note: Maybe people look this up because forEach doesn’t return anything and they want to have the equivalent for it which returns something) -->

### Show combination and differences of JS map filter
<!-- 
javascript map filter
map vs filter (Note: mention shortly the difference between both)
javascript map delete  (Note: Best to use filter here!)
javascript map remove (Note: Best to use filter here!)
javascript map remove element (Note: Best to use filter here!)
 -->

### Show combination and differences of JS map reduce in combination

<!-- 
javascript map reduce
map vs reduce (Note: mention shortly the difference between both)
javascript map return object (Note: Best to use reduce here!)
javascript map to object (Note: Best to use reduce here!)
javascript map to new object  (Note: Best to use reduce here!)
 -->


## Mapping simple data
<!-- KEYWORDS
javascript map to list
javascript map to array
javascript map over array
javascript map iterate
javascript array map example
javascript map values to array
-->
## Using `map` to manipulate complex data
<!-- javascript map object
javascript map object example
javascript map for objects
javascript map through object
javascript map over object -->

## Chaining `map` together with other array operations
<!--
javascript map reverse (Note: Just do map and afterward .reverse())
map, then filter

FILTER
javascript map with filter
javascript map and filter
javascript map filter example

REDUCE
javascript map with reduce
javascript map and reduce
javascript map reduce example
-->


## Using map to conditionally change items in an array
<!-- javascript map with condition
javascript map conditional
javascript map if
javascript map if statement
javascript map update value (Note: Maybe a good example to show updating an item in the list with map and a condition.) -->

## Even more complex operations: mapping 2-dimensional arrays

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

### Javascript map empty array

 <!-- 

javascript map empty array (Note: Maybe something like (myList || []).map(…) to showcase how to deal with a list being null )
  -->
