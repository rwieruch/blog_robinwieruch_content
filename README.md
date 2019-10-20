# Content & Contribution

A place where you can actively contribute to [robinwieruch.de](https://robinwieruch.de). 

* Improve any blog post by editing the file directly in this GitHub repository.
* Write a new guest blog post by creating a new file in this GitHub repository and follow the "Guidelines for Guest Bloggers" below. Get in touch with me before you start writing an entire article :)

## Guidelines for Guest Bloggers

### Folder/Files

Just create a new folder for your blog post. The folder's name will be the URI for the blog post. In this folder, you can create your markdown file with the text and use images from a folder next to it:

```
my-blog-post/
-- index.md
-- images
---- my-image.jpg
```

### Frontmatter

You can leave out all the frontmatter (e.g. title, description) that I use for my blog posts. I can add these later myself.

### Code

Don't use images for code. Instead use a code snippet the following way:

````
```javascript
const helloWorld = "Hello World!";
```
````

If you want to highlight changes in the code, that's what I usually do in my tutorials, then you can do it by providing the numbers of lines you want to highlight:

````
```javascript{3}
const helloWorld = "Hello World!";

console.log(helloWorld);
```
````

If you move around from file to file in your tutorial, don't forget to mention the place where you edit/create the next code snippet. Something like:

Now we are going to implement user model in the *src/models/user.js* file:

````
```javascript
const user = createModel('user');
```
````

### Images

Don't use images for code. Instead use code snippets. If you want to have images in the blog post, add them in at least 1024x768 resolution preferable in .jpg. In the article, reference the image with a proper alt text:

```
![my image alt text](./images/my-image.jpg)
```

Image files are placed next to the blog post's markdown file.

### Command Line vs. GUI

There are many tutorials out there that are using lots of images to show a GUI where they do their configuration. I'd like to use as few images as possibles and encourage people to use more often their command line instead. If the a GUI needs to be shown, then an image can be used though.

### Code Formatting

I use [Prettier](https://www.robinwieruch.de/how-to-use-prettier-vscode/) in my projects which helps me to keep all my code snippets equally formatted for my tutorials. That's my default configuration:

```
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 70
}
```

### Headlines

* h1 headline translates to `# My Headline` in markdown
* h2 headline translates to `## My Secondary Headline` in markdown

My articles usually follow the same structure with optional `## Secondary Headlines` in between:

```
Be clear about the motivation of this article ...

# My Headline

# My other Headline

## My Secondary Headline

<Divider />

Outro
```

### Links

Links can be used the following way:

```
[my article name](url)
```

### Italics

I usually use italics with `*` for folders and files like `src/models/user.index/js` or `src/`.

### Bold

I usually use bold with `**` to point out the importance of something or to highlight a specific topic in a paragraph.
