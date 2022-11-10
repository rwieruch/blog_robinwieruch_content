---
title: "Vite with TypeScript"
description: "How to upgrade Vite to TypeScript from JavaScript ..."
date: "2022-10-14T09:52:46+02:00"
categories: ["React"]
keywords: ["vite typescript"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A brief walkthrough on how to upgrade Vite from JavaScript to TypeScript. The tutorial assumes that you have already created a React project with [Vite](https://vitejs.dev/) in JavaScript. To use TypeScript in React (with Vite), install TypeScript and its dependencies into your application using the command line:

```text
npm install typescript @types/react @types/react-dom --save-dev
```

Add two TypeScript configuration files; one for the browser environment and one for the Node environment:

```text
touch tsconfig.json tsconfig.node.json
```

In the TypeScript file for the browser environment include the following configuration:

```javascript
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Then In the TypeScript file for the Node environment include some more configuration:

```javascript
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

Next, rename all JavaScript files (*.jsx*) to TypeScript files (*.tsx*).

```text
mv src/main.jsx src/main.tsx
mv src/App.jsx src/App.tsx
```

And in your *index.html* file, reference the new TypeScript file instead of a JavaScript file:

```html{11}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Restart your development server on the command line. You may encounter compile errors in the browser and editor/IDE. If you don't see any errors in your editor/IDE when opening the renamed TypeScript files (e.g. *src/App.tsx*), try installing a TypeScript plugin for your editor or a TypeScript extension for your IDE. Usually you should see red lines under all the values where TypeScript definitions are missing. That's it. You should have a running TypeScript in Vite project now.