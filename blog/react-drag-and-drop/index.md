---
title: "How to Drag and Drop in React"
description: "A tutorial about using Drag and Drop in React by example for a vertical list (later horizontal list) with @hello-pangea/dnd as DnD library  ..."
date: "2024-10-10T06:56:46+02:00"
categories: ["React", "React Component"]
keywords: ["react drag and drop", "react dnd"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A React tutorial by example about how to use drag and drop in React. Here you will learn how to create a DnD component in React step by step. First, you will implement it as vertical list, later as horizontal list, and in between with lots of customizations as examples. We will be using @hello-pangea/dnd for this React tutorial.

We will start the React project with the App component and a stateful list of items (here: users). At the start, we only initialize the stateful list with [React's useState Hook](/react-usestate-hook/):

```javascript
import { useState } from 'react';

const INITIAL_LIST = [
  {
    id: '1',
    firstName: 'Robin',
    lastName: 'Wieruch',
  },
  {
    id: '2',
    firstName: 'Aiden',
    lastName: 'Kettel',
  },
  {
    id: '3',
    firstName: 'Jannet',
    lastName: 'Layn',
  },
];

const App = () => {
  const [list, setList] = useState(INITIAL_LIST);

  return <div>{/* render my drag and drop list */}</div>;
};

export default App;
```

Next we will render the [list of items in JSX](/react-list-component/) to display the `firstName` and `lastName`:

```javascript{6-10}
const App = () => {
  const [list, setList] = useState(INITIAL_LIST);

  return (
    <div>
      {list.map((item, index) => (
        <div key={item.id}>
          {item.firstName} {item.lastName}
        </div>
      ))}
    </div>
  );
};
```

In order to make this DnD list reusable later, we extract it as [reusable component](/react-reusable-components/):

```javascript{1-9,14}
const List = ({ list }) => (
  <div>
    {list.map((item, index) => (
      <div key={item.id}>
        {item.firstName} {item.lastName}
      </div>
    ))}
  </div>
);

const App = () => {
  const [list, setList] = useState(INITIAL_LIST);

  return <List list={list} />;
};
```

Next install [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) from the npm registry on the command line:

```sh
npm install @hello-pangea/dnd
```

We will be using the provided DragDropContext as container for the drag and drop list:

```javascript{2,7,15}
import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';

const INITIAL_LIST = [ ... ];

const List = ({ list }) => (
  <DragDropContext>
    <div>
      {list.map((item, index) => (
        <div key={item.id}>
          {item.firstName} {item.lastName}
        </div>
      ))}
    </div>
  </DragDropContext>
);
```

Next we will add the Droppable component from @hello-pangea/dnd which comes as a [render prop component](/react-render-props/) -- also known as children as function component -- which surfaces a few properties from @hello-pangea/dnd which can be used on the list:

```javascript{2,8-10,16-18}
import { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

const INITIAL_LIST = [ ... ];

const List = ({ list }) => (
  <DragDropContext>
    <Droppable droppableId="droppable">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {list.map((item, index) => (
            <div key={item.id}>
              {item.firstName} {item.lastName}
            </div>
          ))}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);
```

The Droppable component is essentially the drop zone for all drag and drop items. It's mandatory to use the properties coming from the Droppable component on the surrounding list element. We will customize the props applied on the list later to get a better understanding about them.

The DragDropContext comes with an `onDragEnd` event handler. Therefore, give the List component a [callback handler](/react-event-handler/) which gets called whenever a drag action ends:

```javascript{1-2}
const List = ({ list, onDragEnd }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {list.map((item, index) => (
            <div key={item.id}>
              {item.firstName} {item.lastName}
            </div>
          ))}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);
```

Then the App component implements the actual event handler and passes it to the List component (which uses it as callback handler as seen before):

```javascript{4-6,8}
const App = () => {
  const [list, setList] = useState(INITIAL_LIST);

  const handleDragEnd = ({ destination, source }) => {
    // reorder list
  };

  return <List list={list} onDragEnd={handleDragEnd} />;
};
```

The new event handler receives information about the drag and drop destination and source which allows us to set a reordered list as state eventually. If there is no destination, we will abort the drag and drop operation. Otherwise we will change the order of the stateful list by using the indexes provided by destination and source:

```javascript{1-7,13-15}
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const App = () => {
  const [list, setList] = useState(INITIAL_LIST);

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;

    setList(reorder(list, source.index, destination.index));
  };

  return <List list={list} onDragEnd={handleDragEnd} />;
};
```

Furthermore we will need the `index` of each list item, however, we will not use it as key. Instead, we will use the index as index prop required by the Draggable component. This way, it can keep track of the dragged items. In addition, the Draggable component needs the [required key for a list](/react-list-key/) as stable identifier next to the other `draggableId`:

```javascript{5,16-21,23-25,29-30}
import { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd';

const INITIAL_LIST = [ ... ];

const List = ({ list, onDragEnd }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {list.map((item, index) => (
            <Draggable
              key={item.id}
              index={index}
              draggableId={item.id}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {item.firstName} {item.lastName}
                </div>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);
```

The Draggable component, identical to the Droppable component, is a [render prop component](/react-render-props/) which surfaces internal information from the library to us. While the information coming from the Droppable component is used for the drag and drop list element, the information coming from the Droppable component component is used on every drag and drop item. Your vertical drag and drop list should work now.

<Divider />

From here we can continue improving the vertical drag and drop list. First, we may want to separate the components for the sake of readability. Feel free to rename both components yourself to something more self-descriptive like DndList and DndItem:

```javascript{1,13,21}
const Item = ({ index, item }) => (
  <Draggable index={index} draggableId={item.id}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {item.firstName} {item.lastName}
      </div>
    )}
  </Draggable>
);

const List = ({ list, onDragEnd }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {list.map((item, index) => (
            <Item key={item.id} index={index} item={item} />
          ))}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);
```

Second, let's see how we can mix the mandatory information coming from the Draggable component with some customized styling. For example, we may want to have a custom background (here: pink) for a dragged item:

```javascript{8-17}
const Item = ({ index, item }) => (
  <Draggable index={index} draggableId={item.id}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          // default item style
          padding: '8px 16px',
          // default drag style
          ...provided.draggableProps.style,
          // customized drag style
          background: snapshot.isDragging
            ? 'pink'
            : 'transparent',
        }}
      >
        {item.firstName} {item.lastName}
      </div>
    )}
  </Draggable>
);
```

Instead of defining the custom drag style in the component, we can make provide it from the outside as props from the App to the List component:

```javascript{14-17}
const App = () => {
  const [list, setList] = useState(INITIAL_LIST);

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;

    setList(reorder(list, source.index, destination.index));
  };

  return (
    <List
      list={list}
      onDragEnd={handleDragEnd}
      dragItemStyle={{
        background: 'pink',
        borderRadius: '16px',
      }}
    />
  );
};
```

The List component just passes all remaining props -- which are not needed in the List component -- to the Item component by spreading it as key value pairs:

```javascript{1,11}
const List = ({ list, onDragEnd, ...props }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {list.map((item, index) => (
            <Item
              key={item.id}
              index={index}
              item={item}
              {...props}
            />
          ))}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);
```

In the Item component, we apply the dragging style by spreading the object in the style attribute whenever the `isDragging` is true. Otherwise we spread an empty object:

```javascript{1,14}
const Item = ({ index, item, dragItemStyle = {} }) => (
  <Draggable index={index} draggableId={item.id}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          // default item style
          padding: '8px 16px',
          // default drag style
          ...provided.draggableProps.style,
          // customized drag style
          ...(snapshot.isDragging ? dragItemStyle : {}),
        }}
      >
        {item.firstName} {item.lastName}
      </div>
    )}
  </Draggable>
);
```

Whenever you drag an item now, you should see a custom background style. The style is not defined in the Item component, but provided from the outside in the App component. This makes the List/Item components more generic and therefore reusable.

We can take this one step further by providing a custom style for the list element whenever an item is dragged within the list:

```javascript{12-15}
const App = () => {
  ...

  return (
    <List
      list={list}
      onDragEnd={handleDragEnd}
      dragItemStyle={{
        background: 'pink',
        borderRadius: '16px',
      }}
      dragListStyle={{
        background: 'lightblue',
        borderRadius: '16px',
      }}
    />
  );
};
```

Similar to the Item component, we can apply the conditional style in the List component. What's important is setting the `provided.placeholder` as another item next to the list of Item components. It is needed to keep the list elements height even though an item is currently dragged. Try it yourself with/without the `provided.placeholder`:

```javascript{1,4,8-10,20}
const List = ({ list, onDragEnd, dragListStyle = {}, ...props }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            ...(snapshot.isDraggingOver ? dragListStyle : {}),
          }}
        >
          {list.map((item, index) => (
            <Item
              key={item.id}
              index={index}
              item={item}
              {...props}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);
```

We provided custom drag styles to the List and Item components. This way, you can continue on your own to provide props from the outside (here: App component) to the drag and drop components for the sake of keeping these components abstract.

<Divider />

We've used two render prop components coming from the @hello-pangea/dnd library. Let's implement a render prop component ourselves by using children as a function:

```javascript{1,17}
const Item = ({ index, item, dragItemStyle = {}, children }) => (
  <Draggable index={index} draggableId={item.id}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          // default item style
          padding: '8px 16px',
          // default drag style
          ...provided.draggableProps.style,
          // customized drag style
          ...(snapshot.isDragging ? dragItemStyle : {}),
        }}
      >
        {children(item)}
      </div>
    )}
  </Draggable>
);
```

Note that the `children` are already passed through the List component with the rest props. Now we are able to define how each item is rendered in the App component:

```javascript{17-21}
const App = () => {
  ...

  return (
    <List
      list={list}
      onDragEnd={handleDragEnd}
      dragItemStyle={{
        background: 'pink',
        borderRadius: '16px',
      }}
      dragListStyle={{
        background: 'lightblue',
        borderRadius: '16px',
      }}
    >
      {(item) => (
        <>
          {item.firstName} {item.lastName}
        </>
      )}
    </List>
  );
};
```

Essentially converting the List/Item component to a render prop component enables us to render anything in the Item component by defining it outside in the App component. Since we have each Item component's `item` at our disposal, we can decide how to render it.

Let's take this one step further by providing a custom drag handler. At the moment, it does not matter where you click and hold the item to drag it. However, sometimes you only want to have an icon for each item which offers the drag ability. So we will remove the drag ability from the entire item element and pass the information instead through the children as a function:

```javascript{7,17}
const Item = ({ index, item, dragItemStyle = {}, children }) => (
  <Draggable index={index} draggableId={item.id}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        // {...provided.dragHandleProps}
        style={{
          // default item style
          padding: '8px 16px',
          // default drag style
          ...provided.draggableProps.style,
          // customized drag style
          ...(snapshot.isDragging ? dragItemStyle : {}),
        }}
      >
        {children(item, provided.dragHandleProps)}
      </div>
    )}
  </Draggable>
);
```

Then we have these props for the drag handler available in the function as parameter. With these extra props, we can define a specific element as drag handler. Afterward, dragging is only possible by using this new drag handler:

```javascript{6,10}
const App = () => {
  ...

  return (
    <List ...>
      {(item, dragHandleProps) => (
        <>
          {item.firstName}&nbsp;
          {item.lastName}&nbsp;
          <span {...dragHandleProps}>#</span>
        </>
      )}
    </List>
  );
};
```

Essentially we applied inversion of control many times with the render prop pattern. Instead of defining everything in the Item component, we give the developer using the List/Item components the ability to define what's rendered and how the DnD works.

<Divider />

As optional step, you can change the vertical drag and drop list to a horizontal drag and drop list. The only things needed are a property on the Droppable component and a flexbox styling on the list element to render it horizontally:

```javascript{3,8}
const List = ({ list, onDragEnd, ...props }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable" direction="horizontal">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ display: 'flex' }}
        >
          ....
        </div>
      )}
    </Droppable>
  </DragDropContext>
);
```

That's it. You have learned how to create a vertical/horizontal drag and drop list in React by using @hello-pangea/dnd. In addition, you learned how to use the render prop pattern in React to give the developer of a component more control from the outside. Hopefully this React tutorial was a great experience for using different patterns in React.