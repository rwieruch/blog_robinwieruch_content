---
title: "React Cross Fade for Material UI (MUI)"
description: "A React Cross Fade component for Material UI (MUI) ..."
date: "2022-12-14T07:56:46+02:00"
categories: ["React", "React Component"]
keywords: ["react cross fade material ui", "react cross fade mui"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Material UI for React, also called MUI, does not come with a native CrossFade component for transitioning with a cross fade animation between two or more components. Here I want to share the cross fade component that I have used for several of my freelance projects when using Material UI:

```tsx
import * as React from 'react';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

type CrossFadeProps = {
  components: {
    in: boolean;
    component: React.ReactNode;
  }[];
};

const CrossFade: React.FC<CrossFadeProps> = ({ components }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {components.map((component, index) => (
        <Fade key={index} in={component.in}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
          >
            {component.component}
          </Box>
        </Fade>
      ))}
    </Box>
  );
};

export { CrossFade };
```

And the usage of this CrossFade component appears as follows:

```tsx
<CrossFade
  components={[
    {
      in: true,
      component: <div>A</div>,
    },
    {
      in: false,
      component: <div>B</div>,
    },
  ]}
/>
```

You can pass as many components as you want to the CrossFade component and depending on the `in` condition, which may be stateful in your implementation, it fades between these components.
