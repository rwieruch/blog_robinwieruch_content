---
title: "React Internationalization with i18n"
description: "A React tutorial about internationalization in React with i18n for translating texts to many languages for your React application ..."
date: "2020-02-12T13:50:46+02:00"
categories: ["React"]
keywords: ["react internationalization", "react i18n"]
hashtags: ["#ReactJs"]
contribute: ""
banner: "./images/banner.jpg"
author: ""
---

<Sponsorship />

When my last client asked me about internationalization in React, I went through all the hoops to prepare a presentation for them. In this React tutorial, I want to show you the gist of what I have learned about translating a React application.

# Table of Contents

<TableOfContents {...props} />

# React Internationalization: Which library should I use?

There are two popular libraries for internationalization in React out there: [react-intl](https://github.com/formatjs/react-intl) and [react-i18next](https://github.com/i18next/react-i18next). Whereas react-intl is the most popular one when taking the statistics into account, most React developers [seem to like](https://twitter.com/rwieruch/status/1222521566791176194) react-i18next more.

These are three advantages of react-i18next over react-intl that I heard from my followers:

* fast adoption rate when it comes to new React features (e.g. React Hooks)
* highly effective and efficient API
* [i18n ecosystem](https://www.i18next.com/) that's not bound to React

After narrowing a few advantages, disadvantages, and differences down, I decided to go with react-i18next for my further research. Not only because I have used this library as my go-to library for i18n before, but also because the common opinion seems to point towards this library.

It's worth to tell that there are two more up and coming React internationalization libraries out there: [LinguiJS](https://lingui.js.org/index.html) and [FBT](https://github.com/facebookincubator/fbt). I didn't try them, but they seem interesting.

# React with react-i18next: i18n Setup

Before we can start translating a React application, we need to install its libraries:

```text
npm install i18next react-i18next i18next-xhr-backend
```

We will use the i18next core library for the setup and the react-i18next library for connecting its internationalization capabilities to React. An example i18n setup file in *src/i18n.js* may look like the following:

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-xhr-backend';

i18n
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // connect with React
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,

    lng: 'en',
    fallbackLng: 'en',
    whitelist: ['en', 'de'],

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
```

The default i18n backend expects all translation files to be served from a web server. If you are using create-react-app, your *public/* folder will be sufficient. If you are using a custom [Webpack with React](/minimal-react-webpack-babel-setup) setup, you need to set up this *public/* folder yourself.

The default folder structure for the translation files looks like the following:

```text
- public/
--- locales/
----- de
------- translation.json
----- en
------- translation.json
```

Both translation files could have the following JSON content for getting started with i18n in React:

```javascript
// de/translation.json

{
  "welcome": "Hallo React"
}

// en/translation.json

{
  "welcome": "Hello React"
}
```

Back in your *src/i18n.js* file, you *could* define the path to your translation files for your backend configuration. But it isn't necessary, because it's the default anyway:

```javascript{23-25}
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-xhr-backend';

i18n
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // connect with React
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,

    lng: 'en',
    fallbackLng: 'en',
    whitelist: ['en', 'de'],

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
```

After going through the i18n setup file and the translation files, let's connect the internationalization to React. In your *src/index.js* file, or wherever you set up React, connect i18n to your React application with React's Suspense component:

```javascript{1,7,10,12}
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import './i18n';

ReactDOM.render(
  <Suspense fallback={null}>
    <App />
  </Suspense>,
  document.getElementById('root')
);
```

All translation files are loaded asynchronously to your React application. In this example, while we wait for the translation files, we render just nothing. If you want to provide a fallback component, for example a loading indicator, use the fallback property of the Suspense component.

Finally you can use your translations in your React components. For instance, in your *src/App.js* a translation for a text may look like the following:

```javascript{2,5,9}
import React from 'react';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p>{t('welcome', 'Hello there')}</p>
    </div>
  );
};

export default App;
```

The [React Hook](/react-hooks) gives us a function called `t` for translation the texts in our React components. Whereas its first mandatory parameter is the translation key (see *public/locales/en/translation.json*), the second optional parameter is the so called *working text*. Whenever there is no translation, it defaults to the working text or to the translation key, if there is no working text in the first place.

# React with react-i18next: Multiple Files (Namespaces)

If you want to separate your translations onto multiple files within one language, it can be achieved with namespaces. In this example, we will add one more translation file to each language:

```text{5,8}
- public/
--- locales/
----- de
------- translation.json
------- welcome.json
----- en
------- translation.json
------- welcome.json
```

All translation files could have the following content:

```javascript
// de/translation.json

{
  "de": "Deutsch",
  "en": "Englisch"
}

// en/translation.json

{
  "de": "German",
  "en": "English"
}

// de/welcome.json

{
  "title": "Hallo React",
  "content": {
    "text": "Willkommen bei uns."
  }
}

// en/welcome.json

{
  "title": "Hello React",
  "content": {
    "text": "Welcome at our place."
  }
}
```

In our React component, with the i18n useTranslation Hook, we can load both namespaces and use them independently with a **namespace separator** (:). We can also next translations in JSON and reference them with the **nesting separator** (.):

```javascript{5,9,11,13,15}
import React from 'react';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation(['translation', 'welcome']);

  return (
    <div>
      <button type="button">{t('translation:de')}</button>

      <button type="button">{t('translation:en')}</button>

      <h1>{t('welcome:title', 'Hello there.')}</h1>

      <p>{t('welcome:content.text', 'Welcome here.')}</p>
    </div>
  );
};

export default App;
```

Essentially that's how you can *split up your language into multiple files (namespaces)*. Whereas the *translation.json* file is the place for **common translations** that are used across your entire application, all other files may be **domain-specific translations**. This way, on certain pages you can load only certain namespaces.

# React with react-i18next: Trans Component

The Trans component can be used as alternative to the useTranslation hook:

```javascript{2,16-18}
import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

const App = () => {
  const { t } = useTranslation(['translation', 'welcome']);

  return (
    <div>
      <button type="button">{t('translation:de')}</button>

      <button type="button">{t('translation:en')}</button>

      <h1>{t('welcome:title', 'Hello there.')}</h1>

      <p>
        <Trans i18nKey="welcome:content.text">
          Welcome at <strong>our place</strong>.
        </Trans>
      </p>
    </div>
  );
};

export default App;
```

In your translation file (e.g. *public/locales/en/welcome.json*), you can reference inner HTML elements, such as the strong tag, with placeholders:

```javascript
{
  "title": "Hello React",
  "content": {
    "text": "Welcome at <1>our place</1>."
  }
}
```

In contrast to the useTranslation hook, the Trans component helps you with the interpolation of inner HTML elements. However, most of the time the translation hook should be sufficient for your needs.

# React with react-i18next: Change Language

If you want to give your users the option to switch the language, the internationalization hook can be used again:

```javascript{5,7-9,13,17}
import React from 'react';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t, i18n } = useTranslation(['translation', 'welcome']);

  const changeLanguage = code => {
    i18n.changeLanguage(code);
  };

  return (
    <div>
      <button type="button" onClick={() => changeLanguage('de')}>
        {t('translation:de')}
      </button>

      <button type="button" onClick={() => changeLanguage('en')}>
        {t('translation:en')}
      </button>

      <h1>{t('welcome:title', 'Hello there.')}</h1>

      <p>{t('welcome:content.text', 'Welcome here.')}</p>
    </div>
  );
};

export default App;
```

All the namespace files are loaded for the currently selected language.

# Extracting Translations from React

So far, every translation key in your code needs a respective translation in your translation files (namespaces) among all your languages. It can be a tedious task to add these translation keys manually as a developer. After all, these files should have a complete set of translation keys to hand them over to translators eventually. Fortunately, there are options for automatically extracting the translations from your React application.

## Custom Translation Backend

The previous setup used the public file system of our web application to serve all translations. The setup can be extended with a feature for reporting back missing translations:

```javascript{23-24,28}
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-xhr-backend';

i18n
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // connect with React
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,

    lng: 'en',
    fallbackLng: 'en',
    whitelist: ['en', 'de'],

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    saveMissing: true,
    saveMissingTo: 'all',

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      addPath: '/locales/add/{{lng}}/{{ns}}',
    },
  });

export default i18n;
```

However, this may result into authorization errors, because we may not be allowed to write to these files. An alternative would be to have a custom backend application that serves our translations, but also receives information about missing translation keys. In this example, I show how to send missing translation key information to a custom backend, but not how to serve the translation in the first place. First, define the API endpoint in your i18n setup file:

```javascript{28}
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-xhr-backend';

i18n
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // connect with React
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,

    lng: 'en',
    fallbackLng: 'en',
    whitelist: ['en', 'de'],

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    saveMissing: true,
    saveMissingTo: 'all',

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      addPath: 'http://localhost:8000/locales/add/{{lng}}/{{ns}}',
    },
  });

export default i18n;
```

And second, create a custom backend, which could be a [common Express server](/node-js-express-tutorial), which receives the missing translation keys:

```javascript
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/locales/add/:lng/:ns', (req, res) => {
  const { lng, ns } = req.params;

  console.log(req.body);
  console.log(lng, ns);

  res.sendStatus(200);
});

app.listen(8000, () =>
  console.log(`Listening!`),
);
```

This comes with the caveat though, that all missing translation keys are only reported to the backend once this translation key is used in code. So, for example, if a React component with a specific translation isn't rendered, it isn't reported to the backend.

## Language Extraction Script

An alternative to the custom internationalization backend would be a script to extract all translations from your code. Once you run this script, it extracts all the translation keys from your application and matches them with your translation files. Let's use one of these scripts. First, install it on the command line:

```text
npm install --save-dev i18next-parser
```

Second, introduce a new npm script in your *package.json* file to use this script:

```javascript
{
  ...
  "scripts": {
    ...
    "extract": "i18next --config i18next-parser.config.js"
  },
  ...
}
```

And third, create a *i18next-parser.config.js* configuration file for the extraction:

```javascript
module.exports = {
  createOldCatalogs: true,
  indentation: 2,
  lexers: {
    js: ['JsxLexer'],
    ts: ['JsxLexer'],
    jsx: ['JsxLexer'],
    tsx: ['JsxLexer'],

    default: ['JsxLexer'],
  },
  locales: ['en', 'de'],
  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  verbose: true,
};
```

Last, execute the script with `npm run extract` and verify that all keys are added to your translation files. In comparison to the custom backend solution, the script extraction gathers *all* missing translation keys without using the actual application.

## Extraction and WYSIWYG with Locize

Then there is the enterprise tool for react-i18next: [Locize](https://locize.com/). You can install it via npm on the command line:

```text
npm install i18next-locize-backend
```

Next sign up on their website and create a project for your application there. After the project has been created successfully, you should get a project ID and a API key which can be used in your *src/i18n.js* setup:

```javascript{4,7,22-31}
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LocizeBackend from 'i18next-locize-backend';

i18n
  .use(LocizeBackend)
  // connect with React
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,

    lng: 'en',
    fallbackLng: 'en',
    whitelist: ['en', 'de'],

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    // ** Enterprise https://locize.com **

    saveMissing: true,
    saveMissingTo: 'all',

    backend: {
      projectId: 'xxx',
      apiKey: 'yyy',
      referenceLng: 'en',
    },
  });

export default i18n;
```

Afterward, all missing translation keys are transferred to the Locize backend. The Locize dashboard for your project should show you all missing keys, where it's also possible to add more languages to your project. From there, start to insert all the translation for the translation keys or hand over the project to your translators. Every time you add a translation on the project's dashboard, you should see it in your actual application after a page refresh.

In addition, Locize comes with a WYSIWYG editor. Install it via the command first:

```text
npm install locize-editor
```

Then use it in your i18n setup:

```javascript{5,9}
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LocizeBackend from 'i18next-locize-backend';
import LocizeEditor from 'locize-editor';

i18n
  .use(LocizeBackend)
  .use(LocizeEditor)
  // connect with React
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,

    lng: 'en',
    fallbackLng: 'en',
    whitelist: ['en', 'de'],

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    // ** Enterprise https://locize.com **

    saveMissing: true,
    saveMissingTo: 'all',

    backend: {
      projectId: 'xxx',
      apiKey: 'yyy',
      referenceLng: 'en',
    },
  });

export default i18n;
```

And last, open your React application with the following query extension: `http://localhost:3000/?locize=true`. You should see a WYSIWYG opening up which enables you to adjust your translations. You can also click in your React application on text and the WYSIWYG editor will show you the correct translation for it.

<Divider />

In this tutorial, you have learned about the different internationalization libraries for React. It taught you also about setting up the react-i18next library, how to use it with multiple languages and namespaces, and how to extract translations automatically from your React application in various ways. Everything shown here can be experiences as code in this [GitHub repository](https://github.com/rwieruch/react-i18n-example).
