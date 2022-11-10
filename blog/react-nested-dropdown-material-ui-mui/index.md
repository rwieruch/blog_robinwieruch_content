---
title: "React Nested Dropdown for Material UI (MUI)"
description: "A React Dropdown component for Material UI (MUI) with a nested menu ..."
date: "2022-11-01T07:56:46+02:00"
categories: ["React", "React Component"]
keywords: ["react nested dropdown material ui", "react nested dropdown mui"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Material UI for React, also called MUI, does not come with a native nested Dropdown menu. Here I want to share the nested dropdown component that I have used for several of my freelance projects when using Material UI. Before you can use it, you have to check out my implementation for a dropdown with Material UI (MUI) in React:

<ReadMore label="How to create a Material UI (MUI) Dropdown component in React" link="/react-dropdown-material-ui-mui/" />

In the Dropdown component that we already have from the previous tutorial, we include a new nested dropdown menu and style it the same way as the native dropdown menu:

```javascript{6,16-23}
import * as React from 'react';
import styled from '@emotion/styled';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import NestedMenuItem from './nested-menu-item';

export const Dropdown = React.forwardRef(...) => {
  ...
);

export const DropdownMenuItem = styled(MenuItem)`
  ...
`;

export const DropdownNestedMenuItem = styled(NestedMenuItem)`
  display: flex;
  justify-content: space-between !important;

  & > svg {
    margin-left: 32px;
  }
`;
```

Then in a new file, we create the new nested dropdown menu item which we imported in the previous step for the dropdown component:

```javascript
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowRight from '@mui/icons-material/ArrowRight';

const TRANSPARENT = 'rgba(0,0,0,0)';

const NestedMenuItem = React.forwardRef((props, ref) => {
  const {
    parentMenuOpen,
    label,
    rightIcon = <ArrowRight style={{ fontSize: 16 }} />,
    keepOpen,
    children,
    customTheme,
    className,
    tabIndex: tabIndexProp,
    ContainerProps: ContainerPropsProp = {},
    rightAnchored,
    ...MenuItemProps
  } = props;

  const { ref: containerRefProp, ...ContainerProps } =
    ContainerPropsProp;

  const menuItemRef = React.useRef(null);
  React.useImperativeHandle(ref, () => menuItemRef.current);

  const containerRef = React.useRef(null);
  React.useImperativeHandle(
    containerRefProp,
    () => containerRef.current
  );

  const menuContainerRef = React.useRef(null);

  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);

  const handleMouseEnter = (event) => {
    setIsSubMenuOpen(true);

    if (ContainerProps?.onMouseEnter) {
      ContainerProps.onMouseEnter(event);
    }
  };

  const handleMouseLeave = (event) => {
    setIsSubMenuOpen(false);

    if (ContainerProps?.onMouseLeave) {
      ContainerProps.onMouseLeave(event);
    }
  };

  const isSubmenuFocused = () => {
    const active = containerRef.current?.ownerDocument?.activeElement;

    for (const child of menuContainerRef.current?.children ?? []) {
      if (child === active) {
        return true;
      }
    }
    return false;
  };

  const handleFocus = (event) => {
    if (event.target === containerRef.current) {
      setIsSubMenuOpen(true);
    }

    if (ContainerProps?.onFocus) {
      ContainerProps.onFocus(event);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      return;
    }

    if (isSubmenuFocused()) {
      event.stopPropagation();
    }

    const active = containerRef.current?.ownerDocument?.activeElement;

    if (event.key === 'ArrowLeft' && isSubmenuFocused()) {
      containerRef.current?.focus();
    }

    if (
      event.key === 'ArrowRight' &&
      event.target === containerRef.current &&
      event.target === active
    ) {
      const firstChild = menuContainerRef.current?.children[0];
      firstChild?.focus();
    }
  };

  const open = isSubMenuOpen && parentMenuOpen;

  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  return (
    <div
      {...ContainerProps}
      ref={containerRef}
      onFocus={handleFocus}
      tabIndex={tabIndex}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <MenuItem
        {...MenuItemProps}
        data-open={!!open || undefined}
        className={className}
        ref={menuItemRef}
        keepOpen={keepOpen}
      >
        {label}
        <div style={{ flexGrow: 1 }} />
        {rightIcon}
      </MenuItem>
      <Menu
        hideBackdrop
        style={{ pointerEvents: 'none' }}
        anchorEl={menuItemRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: rightAnchored ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: rightAnchored ? 'right' : 'left',
        }}
        css={customTheme}
        open={!!open}
        autoFocus={false}
        disableAutoFocus
        disableEnforceFocus
        onClose={() => {
          setIsSubMenuOpen(false);
        }}
      >
        <div ref={menuContainerRef} style={{ pointerEvents: 'auto' }}>
          {children}
        </div>
      </Menu>
    </div>
  );
});

export default NestedMenuItem;
```

Last, use the new nested dropdown component which allows you to specify a nested menu:

```javascript{6-7,12,41-53}
import * as React from 'react';
import Button from '@mui/material/Button';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';

import {
  Dropdown,
  DropdownMenuItem,
  DropdownNestedMenuItem,
} from './dropdown';

const App = () => {
  const handleCreate = () => {
    console.log('create something');
  };

  const handleEdit = () => {
    console.log('edit something');
  };

  const handleDelete = () => {
    console.log('delete something');
  };

  return (
    <Dropdown
      trigger={<Button>Dropdown</Button>}
      menu={[
        <DropdownMenuItem onClick={handleCreate}>
          Create <AddCircleOutlinedIcon />
        </DropdownMenuItem>,
        <DropdownMenuItem onClick={handleEdit}>
          Edit <EditIcon />
        </DropdownMenuItem>,
        <DropdownMenuItem onClick={handleDelete}>
          Delete <DeleteForeverIcon />
        </DropdownMenuItem>,
        <Divider />,
        <DropdownNestedMenuItem
          label="More"
          rightIcon={<MoreVertIcon />}
          menu={[
            <DropdownMenuItem onClick={() => {}}>
              More 1
            </DropdownMenuItem>,
            <DropdownMenuItem onClick={() => {}}>
              More 2
            </DropdownMenuItem>,
          ]}
        />,
      ]}
    />
  );
};

export default App;
```

That's it. The dropdown component in Material UI (MUI) should have a nested menu.