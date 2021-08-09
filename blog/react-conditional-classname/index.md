---
title: "Conditional ClassName in React"
description: "How to use conditional classnames in React with JSX and the HTML class attribute ..."
date: "2021-08-08T07:52:46+02:00"
categories: ["React"]
keywords: ["react"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

If we would be only using JavaScript, it would be possible to create a **conditional React className attribute** this way:

```javascript
const Box = ({ status, children }) => {
  let classNames = ['box'];

  if (status === 'INFO') {
    classNames.push('box-info');
  }

  if (status === 'WARNING') {
    classNames.push('box-warning');
  }

  if (status === 'ERROR') {
    classNames.push('box-error');
  }

  return (
    <div className={classNames.join(' ')}>
      {children}
    </div>
  );
}
```

Fortunately, there is one neat helper library for **conditional classnames in React**: [classnames](https://github.com/JedWatson/classnames):

```javascript
import cs from 'classnames';

const Box = ({ status, children }) => {
  const classNames = cs('box', {
    'box-info': status === 'INFO',
    'box-warning': status === 'WARNING',
    'box-error': status === 'ERROR',
  });

  return (
    <div className={classNames}>
      {children}
    </div>
  );
}
```

It works perfectly with CSS modules too:

```javascript
import cs from 'classnames';
import styles from './style.css';

const Box = ({ status, children }) => {
  const classNames = cs('box', {
    [styles.boxInfo]: status === 'INFO',
    [styles.boxWarning]: status === 'WARNING',
    [styles.boxError]: status === 'ERROR',
  });

  return (
    <div className={classNames}>
      {children}
    </div>
  );
}
```

And could also be used for optional classNames in [Styled Components](/styled-components).