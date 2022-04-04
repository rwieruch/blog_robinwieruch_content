---
title: "React Hook: Detect Scroll Direction"
description: "A React hook by example that checks the scroll direction -- in a vertical direction, but potentially also in a horizontal direction ..."
date: "2022-03-29T07:52:46+02:00"
categories: ["React", "React Hooks"]
keywords: ["react custom hook", "react hook example", "scroll direction"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A neat [custom](/react-custom-hook/) [React Hook](/react-hooks) that I used in some of my [React freelance projects](/freelance-react-developer) which detects the scroll direction of a user:

```javascript
import * as React from 'react';

const THRESHOLD = 0;

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = React.useState('up');

  const blocking = React.useRef(false);
  const prevScrollY = React.useRef(0);

  React.useEffect(() => {
    prevScrollY.current = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - prevScrollY.current) >= THRESHOLD) {
        const newScrollDirection =
          scrollY > prevScrollY.current ? 'down' : 'up';

        setScrollDirection(newScrollDirection);

        prevScrollY.current = scrollY > 0 ? scrollY : 0;
      }

      blocking.current = false;
    };

    const onScroll = () => {
      if (!blocking.current) {
        blocking.current = true;
        window.requestAnimationFrame(updateScrollDirection);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDirection]);

  return scrollDirection;
};

export { useScrollDirection };
```

In a [function component](/react-function-component), the custom React hook can be used this way:

```javascript{3,6}
import * as React from 'react';

import { useScrollDirection } from './useScrollDirection';

const App = () => {
  const scrollDirection = useScrollDirection(ref);
  console.log('up');

  return (...);
};
```

That's it. There may be many ways to improve this custom hook (e.g. check the horizontal instead of the vertical scroll direction), but for my cases it has been sufficient for now.
