---
title: "How to get started with Deno Tutorial"
description: "A comprehensive Deno tutorial for beginners. Learn what makes Deno unique in comparison to Node.js ..."
date: "2020-06-07T09:52:46+02:00"
categories: ["Deno"]
keywords: ["deno", "deno tutorial"]
hashtags: ["#Deno"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Deno is a new runtime for JavaScript and TypeScript. If this doesn't tell you much and you don't know what to expect, then take this statement as secondary introduction: Ryan Dahl, inventor of Node.js, released Deno in 2020 as answer to improve Node.js. However, Deno isn't Node.js, but a complete new runtime for JavaScript, but also TypeScript. Similar to Node.js, Deno can be used for server-side JavaScript, but aims to negate the mistakes that were made with Node.js. It's like Node.js 2.0 and only the future can tell whether people will adopt it as much as they did Node.js back in 2009.

<LinkCollection label="This tutorial is part 1 of 3 in this series." links={[{ prefix: "Part 1:", label: "How to get started with Deno", url: "/deno-tutorial" }, { prefix: "Part 2:", label: "Getting started with Oak in Deno", url: "/deno-oak" }, { prefix: "Part 3:", label: "How to create a REST API with Oak in Deno", url: "/deno-oak-rest-api" }]} />

# Why Deno

Ryan Dahl, the inventor of Node (2009) and Deno (2020), released Deno as addition to the JavaScript ecosystem. When Ryan announced Deno the first time at a conference, he talked about the mistakes made in Node.js. Watching this conference talk (see exercises) is a lesson on humility, because Node.js has become indispensable for the JavaScript ecosystem, used by millions of people, and yet Ryan Dahl feels bad about decisions which were made back at the time. Now, Ryan Dahl wants to make things right with Deno by addressing the design flaws from Node. Deno is a brand new runtime for secure server-side JavaScript and TypeScript implemented by the V8 JavaScript engine, Rust and TypeScript.

* Languages: JavaScript and TypeScript are first class languages at runtime in Deno. Whether you want to write your Deno application with one or the other is just one file extension away from you. While TypeScript gains continuous popularity, Deno with first class TypeScript support out of the box may be the appropriate answer to this trend.

* Compatibility: Deno tries to be web compatible -- which means that a Deno application should work in Deno and a browser alike. After all, it's just an executable JavaScript (or TypeScript) file which shouldn't care much about its environment. While taking all this compatibility into account, Deno wants to be future-proof by using modern JavaScript and TypeScript features.

* Security: Deno is secure by default. There is no file, network, or environment access happening, unless the developer allows it. This guards against the malicious usage of Deno scripts which will be most likely used as much as Node scripts out in the wild.

* Standard Library: Deno comes with a standard library, which means application's in Deno will be more opinionated than Node applications, because Deno comes with lots of in-house utility functions on top of JavaScript. In addition, Deno comes with several built-in tools that improve the development experience.

The following sections will show you all these bullet points in detail while implementing a small Deno application step by step from scratch. Afterward we will continue developing a real web application with Deno.

### Exercises:

* Watch [Ryan Dahl and his regrets about Node.js](https://www.youtube.com/watch?v=M3BM9TB-8yA).
* Watch [this introduction to Deno by Ryan Dahl](https://www.youtube.com/watch?v=z6JRlx5NC9E).
* Read more about [Deno](https://deno.land).
* Get your Deno stickers with these [image data](https://github.com/kt3k/deno_sticker) and [Stickermule](https://bit.ly/36xs3P6).

# Deno Setup on MacOS, Windows and Linux

There are various ways to set up a Deno application. For you it depends on your operating system and on your toolchain for installing programs on your machine. For example, I am using Homebrew on MacOS to manage programs on my machine. For you it may be something else, so please take the appropriate command for your machine from this list which is taken from Deno's website. This command should be executed in an integrated terminal or command line interface:

```text
Shell (Mac, Linux):
curl -fsSL https://deno.land/x/install/install.sh | sh

PowerShell (Windows):
iwr https://deno.land/x/install/install.ps1 -useb | iex

Homebrew (Mac):
brew install deno

Chocolatey (Windows):
choco install deno

Scoop (Windows):
scoop install deno

Build and install from source using Cargo
cargo install deno
```

After you have installed Deno, you can verify its installation on the command line. Your version may be newer than mine, because in my case I installed the first released Deno version 1.0.0. However, the following sections will assume that you have the newest Deno version installed:

```text
deno --version
-> deno 1.0.0
```

If you want to upgrade Deno's version, you can use `deno upgrade`. In addition, try to execute the following remote Deno application via the command line to verify that Deno runs correctly on your machine:

```text
deno run https://deno.land/std/examples/welcome.ts
-> Welcome to Deno
```

This Deno application just outputs a text on your command line. However, it also shows you how a Deno application can be executed from a remote source by downloading and compiling it on the fly. If you have trouble to set up Deno on your machine, follow installation instructions on [Deno's official website](https://deno.land).

### Exercises:

* Read more about [installing Deno](https://deno.land/manual/getting_started/installation).
* Read more about [IDE, editor, and command line integrations for Deno](https://deno.land/manual/getting_started/setup_your_environment).

# Hello Deno

Every time we learn something new as programmers, we start with the usual "Hello World" example. Let's do this together for our first Deno application. On your command line, create a folder for your Deno project, navigate into this folder, and create a new file for this. It's up to you how you name the folder and file:

```text
mkdir deno-project
cd deno-project
touch index.js
```

Now open the newly created *index.js* file, or whatever file name you have used, in your favorite editor or IDE. There, give it the following implementation for just outputting the following JavaScript string:

```javascript
console.log('Hello Deno');
```

Afterward, start your Deno application on command line with the following statement. Depending on your chosen file name, it may be different from mine:

```text
deno run index.js
-> Hello Deno
```

Your first Deno program outputs "Hello Deno". That's it. You have create a folder for your Deno project, created one JavaScript file for the implementation details, and ran this file via Deno on the command line. There is no other setup needed.

### Exercises:

* Read more about [other first projects in Deno](https://deno.land/manual/getting_started/first_steps).
* Follow the [Deno Twitter account](https://twitter.com/deno_land).

# Permissions in Deno

The following sections will evolve our first Deno application while we go through the different aspects of Deno. In this section, we will talk about permissions in Deno, because Deno is supposedly secure by default. We will see what this means in this example.

If you like to keep yourself informed about tech topics like I do, you may already know [Hacker News](https://news.ycombinator.com/). Usually you will find me every morning on this website to read about the latest news in tech. In addition, there exists an API for Hacker News that I like to use for my coding tutorials. We will use this API to fetch data for the sake of learning about data fetching in Deno and permissions. If you browse the [Hacker News API](https://hn.algolia.com/api), you may find the following URL to request stories about a certain topic:

```text
http://hn.algolia.com/api/v1/search?query=...
```

We will use this URL in our Deno project -- in our *index.js* file -- for fetching Hacker News stories about JavaScript:

```javascript
const url = 'http://hn.algolia.com/api/v1/search?query=javascript';
```

Next use the url in Deno's native fetch function, which performs a HTTP GET request on this URL and which returns a JavaScript promise. You can resolve this promise by transforming it to JSON and output its result with a logging statement:

```javascript{3-5}
const url = 'http://hn.algolia.com/api/v1/search?query=javascript';

fetch(url)
  .then((result) => result.json())
  .then((result) => console.log(result.hits));
```

If you have been using JavaScript in frontend applications, you may have noticed that we are using the same fetch API -- or at least the same interface which shares the same implementation details -- that the browser API offers us for client-side applications. As mentioned earlier, Deno tries to be web compatible and any Deno application should work the same in the browser when executing its code. So Deno makes sure that APIs that are available in client-side JavaScript applications are also available in server-side Deno applications.

Now start Deno again on the command line:

```text
deno run index.js
```

You should receive the following error from Deno: *"Uncaught PermissionDenied: network access to "http://hn.algolia.com/api/v1/search?query=javascript", run again with the --allow-net flag"*. This error appears because Deno is secure by default. If we operate in Deno's domain, we can do lots of things without giving Deno any permissions. However, if we want to reach out of Deno's area of ​​responsibility, we need to explicitly allow it. In this case, we need to allow network requests for the case of fetching data from a remote API:

```text
deno run --allow-net index.js
```

After running the Deno application again, you should see an array of Hacker News stories printed on your command line. Each item in this array has lots of information, so for the sake of readability, let's strip down the properties for each item (story). Afterward, the output should be more readable:

```javascript{5-13}
const url = 'http://hn.algolia.com/api/v1/search?query=javascript';

fetch(url)
  .then((result) => result.json())
  .then((result) => {
    const stories = result.hits.map((hit) => ({
      title: hit.title,
      url: hit.url,
      createdAt: hit.created_at_i,
    }));

    console.log(stories);
  });
```

In this section you have learned that Deno is secure by default. Everything we want to access outside of Deno's territory, which could be network access or file access, must be allowed by us. Otherwise Deno refuses to work.

### Exercises:

* Confirm your [changes from the last section](https://github.com/the-road-to-deno/deno-example/compare/init...permissions?expand=1).
* Read more about [permissions in Deno](https://deno.land/manual/getting_started/permissions).

# Deno's Compatibility

Before you have already seen how fetch works in Deno. The native fetch API is commonly known in browser applications which run on the client-side. So instead of having a new API for Deno, we can use exactly the same interface as in our client-side applications. Thus we don't need to rethink our approach when using Deno.

Deno tries to keep up with modern JavaScript features, whether used on the client or server, too. Let's take async/await for example, which has only been available in newer Node.js versions, which comes in Deno by default. And not only async/await, but also top level await without async, which hasn't been available in Node.js for a long time, is available to us:

```javascript{3,5-9,11}
const url = 'http://hn.algolia.com/api/v1/search?query=javascript';

const result = await fetch(url).then((result) => result.json());

const stories = result.hits.map((hit) => ({
  title: hit.title,
  url: hit.url,
  createdAt: hit.created_at_i,
}));

console.log(stories);
```

Instead of a promise's regular then and catch blocks, we can use await to run code synchronously. All code after the await statement only executes after the promise has been resolved. If this implementation would run in a function, it would have to declare the function as async though. Async/await and top level await are available in Deno out of the box.

### Exercises:

* Confirm your [changes from the last section](https://github.com/the-road-to-deno/deno-example/compare/permissions...compatibility?expand=1).
* Check whether you have access to a `window` object, which is normally only available in a browser, in Deno.

# Deno's Standard Library

Deno comes with a set of utility functions which are known as Deno's standard library (short: Deno std). Rather than having everything imported from external libraries, Deno tries to be more opinionated by offering several in-house solutions. We will try one of these standard library solutions for setting up a web server:

```javascript
import { serve } from 'https://deno.land/std/http/server.ts';

const server = serve({ port: 8000 });

for await (const req of server) {
  req.respond({ body: 'Hello Deno' });
}
```

There are a few things happening here. First, we do a [named import](https://www.robinwieruch.de/javascript-import-export) from the standard library with an absolute path. In Deno, all library imports, whether they are from the standard library or from a third-party library, are done with an absolute path which point to a dedicated file. You can convince yourself that this [http library with its server file](https://deno.land/std/http/server.ts) exports a named `served` function.

The `serve` function creates a web server for us which is accessible via a defined [port](https://developer.mozilla.org/en-US/docs/Glossary/Port). JavaScript [for await ... of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) is used to iterate through every incoming request for this server. And for every request, the server returns the same text in a body.

Run your Deno application again and navigate to http://localhost:8000 in your browser. Because we are using network traffic again, we need to give the permission to use it:

```text
deno run --allow-net index.js
```

Both URLs, http://localhost:8000 and http://localhost:8000/ with a trailing slash, work alike in the browser. Whenever we open one of the URLs in the browser, a HTTP GET request is made to the Deno application and this request returns a HTTP response with the "Hello Deno" body which then will be displayed in the browser.

Let's extend the example with our previous code. Instead of sending a hard coded text from the server (Deno) back to the client (browser), we will fetch top JavaScript stories from Hacker News and send them to the client:

```javascript{3,8,10-14,16}
import { serve } from 'https://deno.land/std/http/server.ts';

const url = 'http://hn.algolia.com/api/v1/search?query=javascript';

const server = serve({ port: 8000 });

for await (const req of server) {
  const result = await fetch(url).then((result) => result.json());

  const stories = result.hits.map((hit) => ({
    title: hit.title,
    url: hit.url,
    createdAt: hit.created_at_i,
  }));

  req.respond({ body: JSON.stringify(stories) });
}
```

After starting the Deno application again, we should see the result from the fetch request printed in the browser as JSON. Previously we have seen this result only on the command line, but now with a web server at our hands, we can send the result to a client (browser).

### Exercises

* Confirm your [changes from the last section](https://github.com/the-road-to-deno/deno-example/compare/compatibility...std?expand=1).
* Explore [Deno's Standard Library](https://deno.land/std/).

# Libraries in Deno

Eventually Deno's standard library will not be enough to create Deno applications. That's where third party libraries (also called external libraries or just libraries) come into play. If you check the result from the last section in the browser again, you may notice that the `createdAt` has a human unreadable format. We will use the [date-fns](https://deno.land/x/date_fns) library to make it readable for us:

Libraries in Deno are imported with an absolute path directly from the web. Again you could open the URL in the browser, read the source code there, and check whether it actually exports a default function which is the `format` function here:

```javascript{2,14-17}
import { serve } from 'https://deno.land/std/http/server.ts';
import format from 'https://deno.land/x/date_fns/format/index.js';

const url = 'http://hn.algolia.com/api/v1/search?query=javascript';

const server = serve({ port: 8000 });

for await (const req of server) {
  const result = await fetch(url).then((result) => result.json());

  const stories = result.hits.map((hit) => ({
    title: hit.title,
    url: hit.url,
    createdAt: format(
      new Date(hit.created_at_i * 1000),
      'yyyy-MM-dd'
    ),
  }));

  req.respond({ body: JSON.stringify(stories) });
}
```

The `format` function takes two mandatory arguments: a date and a pattern for the formatted date. The date we receive from the Hacker News API is a [unix timestamp](https://en.wikipedia.org/wiki/Unix_time) in seconds; which is why we need to convert it first to milliseconds before creating a JavaScript date from it. The pattern we provide as second argument to the function makes the date human readable.

After starting your Deno application again, you can see that it downloads the format function from the library plus all additional dependencies. Since we have used a direct URL to the function, only this part of the library gets downloaded. Try to include the whole library path where format is only one of many named exports (curly braces). You will see that the whole library will be downloaded:

```javascript{2}
import { serve } from 'https://deno.land/std/http/server.ts';
import { format } from 'https://deno.land/x/date_fns/index.js';

const url = 'http://hn.algolia.com/api/v1/search?query=javascript';

const server = serve({ port: 8000 });

for await (const req of server) {
  ...
}
```

Whenever you start Deno again, the library will be cached and thus doesn't need to be downloaded again. Every time Deno starts again it checks all its imports, downloads them, and bundles them to one executable file. Importing libraries in Deno is hugely inspired by [Go](https://golang.org/). It's not necessary to keep a list of dependencies in a file (e.g. *package.json* from Node.js) and it's not necessary to have all modules visible in your project (e.g. *node_modules* from Node.js).

### Exercises:

* Confirm your [changes from the last section](https://github.com/the-road-to-deno/deno-example/compare/std...libraries?expand=1).
* Read more about [linking to external code](https://deno.land/manual/linking_to_external_code).
* Explore more [libraries for Deno](https://deno.land/x).

# Imports in Deno

You have learned that imports for Deno's standard library or third party libraries are performed with an absolute path. This approach is inspired by the Go programming language, because it doesn't leave much room for confusion. In contrast to std or libraries, if you want to import files from within your project's source code, let's say because you have more than one file for your Deno application, you can import them with a relative path.

Let's see how this works: Start by creating a second file in your project with the name *stories.js* which should be placed next to your *index.js* file. In this *stories.js* file, put the following implementation which is essentially the mapping that we did previously in the other file:

```javascript{1-10}
import format from 'https://deno.land/x/date_fns/format/index.js';

export const mapStory = (story) => ({
  title: story.title,
  url: story.url,
  createdAt: format(
    new Date(story.created_at_i * 1000),
    'yyyy-MM-dd',
    {}
  ),
});
```

Since we are doing a named export in the *stories.js* file, we can do a named import in the *index.js* file and use the function later in our code:

```javascript{2,11}
import { serve } from 'https://deno.land/std/http/server.ts';

import { mapStory } from './stories.js';

const url = 'http://hn.algolia.com/api/v1/search?query=javascript';

const server = serve({ port: 8000 });

for await (const req of server) {
  const result = await fetch(url).then((result) => result.json());

  const stories = result.hits.map(mapStory);

  req.respond({ body: JSON.stringify(stories) });
}
```

That's it for exporting and importing files in Deno. Instead of using absolute paths like we have done before for Deno's standard library or external libraries, we are using a relative path to import what's necessary. It's also worth to note that regardless of absolute or relative path, we must always include the file extension, because we don't want to leave any room for ambiguity.

### Exercises:

* Confirm your [changes from the last section](https://github.com/the-road-to-deno/deno-example/compare/libraries...importing?expand=1).

# Testing in Deno

Testing shouldn't be an afterthought in programming and it isn't in Deno. Getting the confidence that your applications works makes testing indispensable. That's why testing is baked into Deno. We will see how it works by writing our first unit test together. First, create a new *stories.test.js* file next to your other files. Then give it the following implementation:

```javascript
import { mapStory } from './stories.js';

Deno.test('maps to a smaller story with formatted date', () => {

});
```

Deno offers us a `test` function to define our test with a name/description and the actual test function. It's up to us to implement the test in the function's body. We already import the function that we want to test (here `mapStory`) which essentially just takes an array of stories and returns a new array of stories with less properties and a formatted date. All we need to do is to define a list of stories which be used for `mapStory` and an expected list of stories which we assume as output of this function:

```javascript{1,6-23}
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { mapStory } from './stories.js';

Deno.test('maps to a smaller story with formatted date', () => {
  const stories = [
    {
      id: '1',
      title: 'title1',
      url: 'url1',
      created_at_i: 1476198038,
    },
  ];

  const expectedStories = [
    {
      title: 'title1',
      url: 'url1',
      createdAt: '2016-10-11',
    },
  ];

  assertEquals(stories.map(mapStory), expectedStories);
});
```

Deno's standard library gives us the `assertEquals` function for the assertion of two values. The first value is the output of our function that we want to test and the second value the expected output. If both match, the test should turn green. If they don't match, the test should fail and turn red. On the command line, run all your tests with the following command:

```text
deno test

-> running 1 tests
-> test maps to a smaller story with formatted date ... ok (9ms)

-> test result: ok. (10ms)
-> 1 passed;
-> 0 failed;
-> 0 ignored;
-> 0 measured;
-> 0 filtered out
```

The test turns green. With `deno test`, all files with the naming pattern *test.{js,ts,jsx,tsx}* are picked up. You can also test only specific files with `deno test <file_name>` which would be `deno test stories.test.js` in our case.

### Exercises:

* Confirm your [changes from the last section](https://github.com/the-road-to-deno/deno-example/compare/importing...test?expand=1).
* Read more about [testing in Deno](https://deno.land/manual/testing).
* Make the test fail by changing the expected output or the actual implementation in the *stories.js* file.

# Deno with TypeScript

Deno supports both JavaScript and TypeScript as first class languages. That's why it's important to always include the file extension for file imports -- regardless of whether these files are relative imports from your Deno project or absolute imports from Deno's standard library or third-party libraries.

Since Deno supports TypeScript as first class citizen, wen can just rename the `stories.js` file to `stories.ts`. You will notice that you need to adjust all the imports -- in *index.js* and *stories.test.js* -- pointing to this file, because the file extension changes from *.js* to *.ts*.

The *stories.ts* file with all the implementation details expects types now. We will provide interfaces for the input and output of the function with `Story` and `FormattedStory`:

```javascript{3-7,9-13,15}
import { format } from 'https://deno.land/x/date_fns/index.js';

interface Story {
  title: string;
  url: string;
  created_at_i: number;
}

interface FormattedStory {
  title: string;
  url: string;
  createdAt: string;
}

export const mapStory = (story: Story): FormattedStory => ({
  title: story.title,
  url: story.url,
  createdAt: format(
    new Date(story.created_at_i * 1000),
    'yyyy-MM-dd'
  ),
});
```

Now this function is fully typed. You can continue the transition from JavaScript to TypeScript on your own by renaming the *stories.test.js* file to *stories.test.ts* and the *index.js* file to *index.ts*. Not all of these new TypeScript files require to add types or interfaces, because most types are inferred automatically.

If you want to start your Deno application in TypeScript again, note that you have to adjust the file extension for the Deno script:

```text{1}
deno run --allow-net index.ts
```

Deno comes with a default TypeScript configuration. If you want to customize it, you can add a custom *tsconfig.json* file (see exercises). After all, since TypeScript is as much first class citizen as JavaScript, it's up to you which file extension you take for your future Deno project.

### Exercises:

* Confirm your [changes from the last section](https://github.com/the-road-to-deno/deno-example/compare/test...typescript?expand=1).
* Read more about [TypeScript in Deno](https://deno.land/manual/getting_started/typescript).

# Environment Variables in Deno

Environment variables are great for hiding sensitive information about your Deno application. This can be API keys, passwords, or other data which shouldn't be visible to others. That's why there exists the *.env* file, which you would have to create, to hide sensitive information. We will create this file and pass it the following information for the port of our server application:

```text
PORT=8000
```

In the *index.ts* file, we can use this environment variable with a third party library:

```javascript{2,9}
import { serve } from 'https://deno.land/std/http/server.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

import { mapStory } from './stories.ts';

const url = 'http://hn.algolia.com/api/v1/search?query=javascript';

const server = serve({
  port: parseInt(config()['PORT']),
});

for await (const req of server) {
  const result = await fetch(url).then((result) => result.json());

  const stories = result.hits.map(mapStory);

  req.respond({ body: JSON.stringify(stories) });
}
```

The utility function returns an object with all the key/value pairs from the *.env* file. We have to parse value for the `'PORT'` key to a number, because it is available as string in the object. Now the information isn't exposed in the source code anymore, but only available in the environment variables file.

Once you start your Deno application again, you should see another permission error showing up on the command line: *"Uncaught PermissionDenied: read access to "/Users/mydspr/Developer/Repos/deno-example", run again with the --allow-read flag"*. You can allow the access on environment variables with another permission flag:

```text
deno run --allow-net --allow-read index.ts
```

Important: The *.env* file shouldn't be shared in a public repository where everybody can see it. If you make your source code public, for example on GitHub, consider adding the *.env* file to a *.gitignore* file.

After all, the port of a server application may be not the best example for sensitive data. We used the port for the sake of learning about environment variables. However, once you deal with more features ion your Deno application, you may end up with information used in your source code that shouldn't be visible to others.

### Exercises:

* Confirm your [changes from the last section](https://github.com/the-road-to-deno/deno-example/compare/typescript...env?expand=1).
* Read more [about environment variables in Deno](/deno-environment-variables).
* Ask yourself: What would you like to use Deno for?
* Optional: Read more about [some of Deno's utilities](https://deno.land/manual/tools).

<Divider />

The last sections have introduced you to all the basics in Deno. Deno will be used in the same areas as Node.js, from small script to full-blown server application, yet with a much more improved set of defaults. It's secure by default with its permissions, compatible with lots of client-side APIs, fitted with modern features like top level await, and utilized with JavaScript or TypeScript.

<LinkCollection label="This tutorial is part 1 of 3 in this series." links={[{ prefix: "Part 1:", label: "How to get started with Deno", url: "/deno-tutorial" }, { prefix: "Part 2:", label: "Getting started with Oak in Deno", url: "/deno-oak" }, { prefix: "Part 3:", label: "How to create a REST API with Oak in Deno", url: "/deno-oak-rest-api" }]} />
