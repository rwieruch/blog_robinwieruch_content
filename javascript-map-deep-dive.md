{{% chapter_header "What is the `.map` method?" "what-is-the-map-method" %}}

The `map` method is one of the many methods existing on the JavaScript `Array` prototype. If you want to do a deep dive on prototypical inheritance, here's a great read by Kyle Simpson on how prototypes work under the hood. For this article it'll be sufficient to know that the methods on the `Array` prototype are available to _every array_ that we declare in our code!

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

{{% chapter_header "But first, a word about arrow functions" "about-arrow-functions" %}}

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

{{% chapter_header "All about that callback function" "all-about-that-callback-function" %}}

Understanding how the callback function in `map` works is crucial to using the `map` method effectively. In this section we'll take a look at the what arguments are passed to the callback function and some ways that we can use those arguments. The `map` method's callback takes _three_ arguments, although you can write a callback only using one or two arguments as well. Here are the three arguments that it takes.

{{% sub_chapter_header "`value`" "callback-function-value-argument" %}}

This is the current value being processed in the array iterations. If we ran `[1, 2, 3].map(value => value + 1)`, our callback function would be run with a `value` of `1` the first time, and then it would be called again with `2` and `3` as we iterate through the array.

{{% sub_chapter_header "`index`" "callback-function-index-argument" %}}

The second argument to the callback function is the _index_ of the item that we are currently processing. Taking our example array of `[1, 2, 3]`, if we run `[1, 2, 3].map((value, index) => index)` we'll see our callback get run with `0` the first time, `1` the second time, and `2` on the final time. This second argument is extremely useful if we're trying to use `map` to generate data or if we need to use the index to access a corresponding item in a _different_ array. We'll look at some more practical ways we can use the `index` argument to do some cool things with `Array.map` later on!

{{% sub_chapter_header "`array`" "callback-function-array-argument" %}}

The final argument to `map`'s callback function is the `array` that `map` was originally called upon. Chances are you will not often need to use this argument. The reason is that if you've already got the array tied to a variable, you've already got a reference to the original array that `map` was called upon! For example:

{{ < highlight javascript >}}
const myArray = [1, 2, 3]

// Using the third argument to map
myArray.map((value, index, arr) => arr[index - 1] ? value + arr[index - 1] : value)

// Just using the variable that holds the original array.
myArray.map((value, index) => myArray[index - 1] ? value + myArray[index - 1] : value)
{{ < /highlight >}}

Even though you might not often need the third argument to `map`, it's still god to know that it exists! Every once in a while you'll come across a situation where it comes in handy—for example, when chaining array methods or when you don't have the array bound to a variable.

{{% chapter_header "How to use `map` along with other array methods" "how-to-use-map-along-with-other-array-methods" %}}

JavaScript's `Array.map` method is just one of many methods for operating on arrays. In order to use it effectively we need to not only understand *how `map` works*, but how it can work in combination with other common array methods. After all, `map` is only one of the tools in our array methods toolbelt, and it's important that we use the right tool for each use case.

In this section we're going to examine how `map` compares to some other commonly used array methods, and some use cases where another array method might be a better option.

{{% sub_chapter_header "Using `map` vs using `forEach`" "using-map-vs-using-foreach" %}}

Although `map` does iterate through the entire array and it does execute the callback function one time for each item in the array, there's also another method that does a very similar thing: `forEach`. 

While `forEach` does iterate through the entire array and it does execute its callback function once for every item in the array, there's one major distinction: `forEach` doesn't return anything. In the case of `map`, the return value of the callback function is used as the transformed value in our new array. However, `forEach` doesn't return anything, and if the callback function returns a value, nothing is done with that value.

We can use this characteristic of `map` and `forEach`'s return values to inform us as to when we should use `map` and when we should use `forEach`. Since `forEach` doesn't do anything with the return values of its callback function, we can safely assume that whenever we're not using the return value of our callback function, this would be a better use case for `forEach` over map. For example, this usage of `map` would be better written with a `forEach`

{{ < highlight javascript >}}
const arr = [1, 2, 3, 4]

arr.map(number => {
  console.log(number)
})

// Nothing changes except the method we used
arr.forEach(number => {
  console.log(number)
})
{{ < /highlight >}}

However, whenever we plan on *using the return value* from our callback function, this is likely the time that we're gonna reach for `map` instead of `forEach`. If we want to take our array and transform it to a new array, this is a better usage for `map`. For example, this usage of `forEach` would be better written as a `map`

{{ < highlight javascript >}}
const arr = [1, 2, 3, 4]

const mapped = []
arr.forEach((number, i) => {
  mapped[i] = number * 2
})

console.log(mapped) // [2, 4, 6, 8]
{{ < /highlight >}}

Since we're pushing a value to a new array and transforming the value, we're essentially recreating all the things that `map` does automatically for us.

So, to sum `map` and `filter` up, if your callback returns a value, you're probably gonna be using `map`, and if it doesn't, `forEach` is probably the better choice.

{{% sub_chapter_header "Using `map` along with `filter`" "using-map-along-with-filter" %}}

The `filter` method differs from `map` in a few ways. While `filter` and `map` are both immutable operations, they have different purposes. True to its name, `filter` produces a shorter array that has filtered *out* any items that didn't meet a condition. In contrast `map` doesn't ever change the array length—just the values of the items within.

If you're looking to remove or delete an item from your array, `filter` is gonna be your friend. However, we can use `filter` in combination with `map` to do some cool things.

For example, we can use `filter` to sanitize our array's values before we use `map` to transform them.

{{ < highlight javascript >}}
const arr = [
  1,
  2,
  undefined,
  3,
]

const mapped = arr.filter(value => value).map(value => value * 2)
console.log(mapped) // [2, 4, 6]
{{ < /highlight >}}

If we didn't include the `filter` step before the `map`, we'd get `NaN` as the third element in the array, which could seriously trip us up later on in our usage of this `mapped` array. However, because we used `filter` to sanitize the array's values we can feel safer about using the transformed values.

Believe it or not, some languages have a dedicated function for running this combination of `filter` and `map`, called `filterMap`. However, since we don't have an `Array.filterMap` function in JavaScript, it's useful to know that we can do this combination to sanitize our mapped data.

{{% sub_chapter_header "Using `map` and `reduce`" "using-map-and-reduce" %}}

Another fairly similar method to `map` is the `reduce` method. However, `Array.reduce` is *far more flexible* than `map` is.

If you're unfamiliar with `reduce`, it mainly works like this: the `reduce` method also takes a callback as its first argument. This callback receives something called an `accumulator` as its first argument and a value in the array as its second argument (along with the index as its third and the original array as the fourth). What you do with the value is entirely up to you! However, *whatever you return from the callback function* will be used as the `accumulator` argument in the callback for the next iteration.

The second argument to `reduce` is the original `accumulator`—think of it kind of as the seed. This second argument will be used as the `accumulator` for the *first time the callback is fired*.

The `accumulator` can be anything—an array, an object, a string, or even a single number! This aspect of `reduce` makes it extremely versatile since we can iterate through the array once and transform it into *any data structure*.

In fact, `reduce` is versatile enough that we can even use it to do the exact same thing that `map` does.

{{ < highlight javascript >}}
const arr = [1, 2, 3, 4, 5]
const mapped = arr.reduce((accumulator, value, index) => {
  accumulator[index] = value * 2
  return accumulator
}, [])

console.log(mapped) // [2, 4, 6, 8, 10]
{{ < /highlight >}}

However, just because we can use `reduce` to do the same thing as `map` doesn't mean we should! In fact, because `map` only requires us to declare our transformation we'll find that it's much cleaner and more readable if we are only transforming values in an array. If we expect to get an array back of transformed values, `map` is likely a better choice than `reduce`. 

However, if we wanted to use `map` to transform our array into a new object, we couldn't do it. In this case `reduce` would be the best choice since we have much finer grained control over the shape of what it returns. For example, we can use `reduce` to turn an array of strings into object keys.

{{ < highlight javascript >}}
const arr = ['a', 'b', 'c', 'd']

const object = arr.reduce((accumulator, value) => {
  accumulator[value] = true
}, {})

console.log(object) // { a: true, b: true, c: true, d: true }
{{ < /highlight >}}

To sum it up, if you want to get an array of transformed values, use `map`. But if you need to return something other than an array, you'll likely want to reach for `reduce`.

{{% sub_chapter_header "Using `map` and `reverse`" "using-map-and-reverse" %}}

Occasionally, you might need to `map` an array and `reverse` it as well. It's good to know in this case that although `map` is immutable, `reverse` isn't! Using `reverse` on an array will actually reverse *the original array*. So, if you need to `map` and `reverse` the array, make sure that you do `map` first, and *then* `reverse`. This way you create a new array with `map` before you `reverse` it.

{{ < highlight javascript >}}
// 🚨 Don't do this! 🚨
const arr = [1, 2, 3, 4, 5]
const reverseMap = arr.reverse().map(number => number * 2)
console.log(arr) // [10, 8, 6, 4, 2]

// 🎉 Instead, do this! 🎉
const arr = [1, 2, 3, 4, 5]
const reverseMap = arr.map(number => number * 2).reverse()
console.log(arr) // [2, 4, 6, 8, 10]
{{ < /highlight > }}

If all you need to do is `reverse` an array (you don't need to transform the values), you don't need to use `map` to clone the array! While you *could* produce an unaltered array clone with `map(value => value)`, you can also produce a cloned array with `.slice()`. This creates a new array for us to reverse so that we don't mutate the original.

{{ < highlight javascript >}}
const arr = [1, 2, 3, 4, 5]
const reversed = arr.slice().reverse()
console.log(reversed) // [5, 4, 3, 2, 1]
{{ < /highlight >}}

{{% chapter_header "Using `map` for complex data operations" "using-map-for-complex-data-operations" %}}

While we can certainly use `map` for simple operations like adding 1 to every number in the array, it turns out that it's super flexible—we can do a ton of things armed with this simple method and our callback function.

{{% sub_chapter_header "Extracting object keys with `map`" "extracting-object-keys-with-map" %}}

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

{{% sub_chapter_header "Using `map` to iterate through an object" "using-map-to-iterate-through-an-object" %}}

Sometimes you want to iterate through all of the items _in an object itself_ as opposed to an array of objects. A common example might be if you have an object where each key represents a unique id, but all of the values might be a similar type (sort of like a JavaScript [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)). While `map` won't work directly on objects, we can use `map` to transform all of the values of an object through combining `map` with `Object.entries`.

`Object.entries` was added to JavaScript in [ES2017](http://2ality.com/2016/02/ecmascript-2017.html), and has [decent browser support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#Browser_compatibility) today (that is, if you're not supporting IE11). What `Object.entries` does is it takes an object for its argument and spits out a *two dimensional array* (that is, an array of arrays). Each item in the array is a array containing exactly two items: the first is the key, and the second is the value. `Object.entries`, similar to `map` creates a *new array* and does not mutate the original object.

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

In line 10, we've used [array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to make our callback function a little bit easier to read. Since we know that each value in the array is a two-item array, we can assume that the first item will always be the `key` and the second item will always be the `value`. We proceed to multiply each value by 2, leaving all of the keys unaltered.

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

{{% chapter_header "Conditional mapping: changing items in an array" "conditional-mapping" %}}

Another extremely useful way that we can use `map` is to only change a few items within the original array. For example, perhaps we only want to transform the numbers in an array that are 10 or above.

{{ < highlight javascript >}}
const arr = [5, 10, 15, 20]

const mapped = arr.map(number => {
  if (number >= 10) {
    return number * 2
  }

  return number
})

console.log(mapped) // [5, 20, 30, 40]
{{ < /highlight >}}

In this example we include a conditional statement *inside of our callback function* in order to return the modified value only when the number is 10 or higher. However, we also need to make sure we return something when we *don't* want to transform the number. We can just return `number` unchanged at the bottom of our callback function and we'll make sure that all numbers 10 and above are changed, while all numbers below 10 aren't.

However, we can make this callback function with the conditional a lot shorter if we use a ternary statement to declare our conditional logic.

{{ < highlight javascript >}}
const arr = [5, 10, 15, 20]

const mapped = arr.map(number => number >= 10 ? number * 2 : number)

console.log(mapped) // [5, 20, 30, 40]
{{ < /highlight >}}

The cool thing about using `map` to conditionally update items in an array is that you can make that condition as strict or as loose as you'd like: you can even use `map` to update a *single item*!

{{ < highlight javascript >}}
const arr = [5, 10, 15, 20]

const mapped = arr.map(number => number === 10 ? number * 2 : number)

console.log(mapped) // [5, 20, 15, 20]
{{ < /highlight >}}

Although this does iterate through the entire array to find and update a single item, I think it's very elegant and quite readable. I'd argue that unless you're operating on huge arrays with many, many items, you probably won't experience too much of a bottleneck using `map` and a conditional statement to update a single item.

{{% chapter_header "Mapping 2-dimensional arrays: a `map` within a `map`" "mapping-2-dimensional-arrays" %}}

Sometimes you'll come across a *multidimensional array*—that is, an array with nested arrays inside of it. You've probably seen these before, they looks like this:

{{ < highlight javascript >}}
const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
{{ < /highlight >}}

We can use `map` to operate on these arrays as well—although it will only operate on the *top-level array*. If we call `map` on our array, our callback will get called with the `[1, 2, 3]` array the first time, `[4, 5, 6]` the second, and finally `[7, 8, 9]`.

If you'd like to keep the array two-dimensional, then you can proceed as usual with your callback function. Just remember that the callback function receives an *array* as the first argument! If you wanted to transform the internal arrays, you'll have to do a `map` inside your `map`:

{{ < highlight javascript >}}
const mapped = arr.map(value => 
  value.map(number => number * 2)
)

console.log(mapped)
/**
 * [
 *   [2, 4, 6],
 *   [8, 10, 12],
 *   [14, 16, 18],
 * ]
 */
{{ < /highlight >}}

However, if you'd like to turn your two-dimensional array into a *one-dimensional array* of transformed values, `map` isn't gonna be nearly as useful. What you're looking for is a `flatMap` function—which was recently released in [ES2019](http://2ality.com/2017/04/flatmap.html)! What `flatMap` does is take a multidimensional array and turns it into single-dimensional array of transformed values.

If you're not able to use the latest and greatest JavaScript features in ES2019, you can recreate your own `flatMap` function [by using `reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap#Alternative)

{{% chapter_header "Debugging `map`" "debugging-map" %}}

{{% sub_chapter_header "When map is not defined" "when-map-is-not-defined" %}}

When working with `map` you might encounter a few common errors. Perhaps the most common one that you might encounter is the following:

{{ < highlight >}}
.map is not a function
{{ < /highlight >}}

The reason that you would come across this error is that `map` is only a method on JavaScript arrays. If you try to call `map` on an `object` or on `null` or anything else, you'll get this error.

This can be pretty common when you're dealing with data that you can't fully trust. For example, think of a key in an API response that could be either an array *or* `null`. Later on, you want to operate on the data, but if you just confidently use `map` on the data you could end up with this `.map is not a function` exception.

However, we can use a little bit of JavaScript logic to sanitize the data *before* we do our `map`:

{{ < highlight javascript >}}
// arr could either be [1, 2, 3, 4] or null
const mapped = (arr || []).map(number => number * 2)
{{ < /highlight >}}

By adding `(arr || [])` before our `map` function, we guarantee that by the time we use `map` we're dealing with an array instead of `null`. This protects our program from raising an exception when the list is `null`. And because we're mapping over an empty array, we'll just get an empty array back in return!

Although it's a good tool to have in your toolbelt, I wouldn't lean on this trick too heavily. First off, it won't work on an object or string or any non-falsy item, so it's not 100% safe. Furthermore, if you've got data coming into your app that isn't reliable, you'll probably get more mileage out of normalizing data as it enters your app. That way, you can safely assume that you're dealing with an array instead of having to resort to "[overly defensive programming](https://medium.com/@vcarl/overly-defensive-programming-e7a1b3d234c2)"

{{% sub_chapter_header "Logging values inside of `map`" "logging-values-inside-of-map" %}}

Sometimes, when you're doing a `map` function you need to debug some values in the callback function. And if you're using arrow functions for your callbacks, adding a console log inside the arrow function requires adding curly braces, an explicit `return`, and the logging statement!

{{ < highlight javascript >}}
// Before
const mapped = arr.map(value => value * 2)

// After
const mapped = arr.map(value => {
  console.log(value)
  return value * 2
})
{{ < /highlight >}}

Over time this can begin to feel a little cumbersome, especially if you're deep into debugging some issue. However, we can leverage a little JavaScript logic to make debugging map a whole lot easier:


{{ < highlight javascript >}}
// Before
const mapped = arr.map(value => value * 2)

// After
const mapped = arr.map(value => console.log(value) || value * 2)
{{ < /highlight >}}

All we have to do is add the `console.log(value)` with a `||` in front of our normal return value! Because `console.log` returns `undefined`, the `map` callback falls back to returning the `value * 2`. This nifty trick allows us to add logging statements to our `map` callbacks without having to convert the function syntax (and makes it a lot easier to clean up `console.log` statements when you're done). 

{{% chapter_header "Conclusion" "conclusion" %}}
TK
