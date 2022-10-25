---
title: "React Dropdown for Material UI (MUI)"
description: "A React Dropdown component for Material UI (MUI) ..."
date: "2022-10-25T07:56:46+02:00"
categories: ["React", "React Component"]
keywords: ["react dropdown material ui", "react dropdown mui"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Material UI for React, also called MUI, does not come with a native Dropdown component. Here I want to share the dropdown component that I have used for several of my freelance projects when using Material UI. Before you can use it, you have to install its Material UI (MUI) dependencies:

```text
npm install @emotion/styled @mui/material @mui/icons-material
```

Next follows the implementation of a Material UI Dropdown Component:

```javascript
import * as React from 'react';
import styled from '@emotion/styled';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const Dropdown = React.forwardRef(
  (
    {
      trigger,
      menu,
      keepOpen: keepOpenGlobal,
      isOpen: controlledIsOpen,
      onOpen: onControlledOpen,
      minWidth,
    },
    ref
  ) => {
    const [isInternalOpen, setInternalOpen] = React.useState(null);

    const isOpen = controlledIsOpen || isInternalOpen;

    let anchorRef = React.useRef(null);
    if (ref) {
      anchorRef = ref;
    }

    const handleOpen = (event) => {
      event.stopPropagation();

      if (menu.length) {
        onControlledOpen
          ? onControlledOpen(event.currentTarget)
          : setInternalOpen(event.currentTarget);
      }
    };

    const handleClose = (event) => {
      event.stopPropagation();

      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target)
      ) {
        return;
      }

      handleForceClose();
    };

    const handleForceClose = () => {
      onControlledOpen
        ? onControlledOpen(null)
        : setInternalOpen(null);
    };

    const renderMenu = (menuItem, index) => {
      const { keepOpen: keepOpenLocal, ...props } = menuItem.props;

      let extraProps = {};
      if (props.menu) {
        extraProps = {
          parentMenuOpen: isOpen,
        };
      }

      return React.createElement(menuItem.type, {
        ...props,
        key: index,
        ...extraProps,
        onClick: (event) => {
          event.stopPropagation();

          if (!keepOpenGlobal && !keepOpenLocal) {
            handleClose(event);
          }

          if (menuItem.props.onClick) {
            menuItem.props.onClick(event);
          }
        },
        children: props.menu
          ? React.Children.map(props.menu, renderMenu)
          : props.children,
      });
    };

    return (
      <>
        {React.cloneElement(trigger, {
          onClick: isOpen ? handleForceClose : handleOpen,
          ref: anchorRef,
        })}

        <Menu
          PaperProps={{ sx: { minWidth: minWidth ?? 0 } }}
          anchorEl={isOpen}
          open={!!isOpen}
          onClose={handleClose}
        >
          {React.Children.map(menu, renderMenu)}
        </Menu>
      </>
    );
  }
);

export const DropdownMenuItem = styled(MenuItem)`
  display: flex;
  justify-content: space-between !important;

  & > svg {
    margin-left: 32px;
  }
`;
```

The usage of the MUI Dropdown compopnent looks as follows:

```javascript
import * as React from 'react';
import Button from '@mui/material/Button';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { Dropdown, DropdownMenuItem } from './dropdown';

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
      keepOpen
      open={open}
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
      ]}
    />
  );
};

export default App;
```

If you want to get to know a bit of the underlying implementation details:

<ReadMore label="How to create a Dropdown component in React" link="/react-dropdown/" />

Optionally you can use the `keepOpen` property to not close the dropdown if one of its menu item's is clicked and the `minWidth` property to define a width for the dropdown's menu. If you want to turn the dropdown component into a [controlled component](/react-controlled-components/), you can pass it `isOpen` and `onOpen` props too.