# Content & Contribution

A place where you can actively contribute to [robinwieruch.de](https://robinwieruch.de). Feel free to improve the content or to write a guest blog post yourself. Get in touch with me before you start writing an entire article :)

## Guidelines for Guest Bloggers

* option A: provide the blog post on GoogleDrive with a shareable link
* option B: provide the blog post here on GitHub by adding a file for the article next to the other files

### Meta Information

You can leave out all the meta information (frontmatter) that I use for my blog posts. I can add these later myself.

### Code

Don't use images for code. Instead use a code snippet the following way:

```
```javascript
const helloWorld = "Hello World!";
```
```

If you want to highlight changes in the code, that's what I usually do in my tutorials, then you can do it by providing the numbers of lines you want to highlight:

```
```javascript{3}
const helloWorld = "Hello World!";

console.log(helloWorld);
```
```

If you move around from file to file in your tutorial, don't forget to mention the place where you edit/create the next code snippet. Something like:

Now we are going to implement user model in the *src/models/user.js* file:

```
```javascript
const user = createModel('user');
```
```

### Images

Don't use images for code. Instead use code snippets. If you want to have images in the blog post, add them in at least 1024 (x 768)resolution preferable in .jpg to a shared GoogleDrive (or any other cloud storage) folder. In the article, reference the filename of the image with a placeholder like `[image the-dashboard.jpg]`.

### Command Line vs. GUI

There are many tutorials out there that are using lots of images to show a GUI where they do their configuration. I'd like to use as few images as possibles and encourage people to use more often their command line instead. If the a GUI needs to be shown, then an image can be used though.

### Code Formatting

I use [Prettier](https://prettier.io/) in my projects which helps me to keep all my code snippets equally formatted. That's my default configuration:

```
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 70
}
```

### Headlines

* h1 headline translates to # My Headline
* h2 headline translates to ## My Sub Headline

The second parameter can be used for a table of contents:

```
# Table of Contents

* [My Headline](#my-headline)
  * [My Sub Headline](#my-sub-headline)
```

My articles usually follow the same structure with optional sub_chapter_headers in between:

```
Motivation

# My Headline

# My Headline

<Divider />

Outro
```

### Links

Links referencing articles that are on my domain can be used as `[my article name](url)`. However, if a link points to an article outside of this domain, use `[my article name](url)`

### Italics

I usually use italics with `*` for folders and files like `src/models/user.index/js` or `src/`.

### Bold

I usually use bold with `**` to point out the importance of something or to highlight a specific topic in a paragraph.
