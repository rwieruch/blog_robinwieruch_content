+++
title = "Why do we need a React List Key?"
description = "React list components need a mandatory key attribute if the list items can be changed by order or size. Here you will see a use case why a key attribute is needed ..."
date = "2019-04-06T07:52:46+02:00"
tags = ["JavaScript"]
categories = ["JavaScript"]
keywords = ["react list key"]
news_keywords = ["react list key"]
hashtag = "#ReactJs"
card = "img/posts/react-list-key/banner_640.jpg"
banner = "img/posts/react-list-key/banner.jpg"
contribute = "react-list-key.md"
headline = "Why do we need a React List Key?"

summary = "React list components need a mandatory key attribute if the list items can be changed by order or size. Here you will see a use case why a key attribute is needed."
+++

{{% sponsorship %}}

{{% pin_it_image "react list key" "img/posts/react-list-key/banner.jpg" "is-src-set" %}}

Everyone dealing with React knows about this warning: **Warning: Each child in a list should have a unique "key" prop.** It shows up in your development tools of your browser and it's one of the warnings you encounter very early in your React career. The following [list component](https://www.robinwieruch.de/react-list-component) results in this warning:

{{< highlight javascript >}}
const list = ['Learn React', 'Learn GraphQL'];

const ListWithoutKey = () => (
  <div>
    <ul>
      {list.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  </div>
);
{{< /highlight >}}

The warning says we only need to add a key attribute to each of our list item elements. Since we are using the [built-in JavaScript array map method](https://www.robinwieruch.de/javascript-map-array/), we have access to the index of each rendered item in the list. That should do the trick, shouldn't it?

{{< highlight javascript "hl_lines=4 5" >}}
const ListWithoutKey = () => (
  <div>
    <ul>
      {list.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);
{{< /highlight >}}

Indeed, the warning disappears and we should be alright for now. **But careful:** Using the index of an array item isn't the best practice solution here. React asks for the key not without any reason. Behind the scenes, React uses the key attribute to associate the rendered element with its place in the rendered list. Basically it's the identifier for the item element in the list element.

For instance, the solution with the index would fail in the case of reordering the list, because the index would stay the same but the real item has changed its place. If we would reverse our array, the `'Learn React'` entry would have the index `2` and the `'Learn GraphQL'` entry would have the index `1`. That doesn't match anymore with the actual rendered items which causes problems.

When I searched online about this problem, it was difficult to find a real world scenario that illustrates it. Most tutorials only explain how to fix the issue, but not what could happen in the worst case. That's why I came up with the following example which is perfect for a brief walkthrough to show the issue:

{{< highlight javascript "hl_lines=1 4 6 7 8 22 23 24" >}}
const initialList = ['Learn React', 'Learn GraphQL'];

const ListWithUnstableIndex = () => {
  const [list, setList] = React.useState(initialList);

  const handleClick = event => {
    setList(list.slice().reverse());
  };

  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            <label>
              {item}
            </label>
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleClick}>
        Reverse List
      </button>
    </div>
  );
};
{{< /highlight >}}

The example showcases the same list, but this time managed with [React Hooks](https://www.robinwieruch.de/react-hooks/) as [state](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/). The new button element reverses our list and stores it as state. If you try the example, everything works and *seems* alright. The bug stays hidden because we don't render much here. However, if we add another uncontrolled element to our rendered list items, we can see the bug happening:

{{< highlight javascript "hl_lines=16" >}}
const initialList = ['Learn React', 'Learn GraphQL'];

const ListWithUnstableIndex = () => {
  const [list, setList] = React.useState(initialList);

  const handleClick = event => {
    setList(list.slice().reverse());
  };

  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            <label>
              <input type="checkbox" />
              {item}
            </label>
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleClick}>
        Reverse List
      </button>
    </div>
  );
};
{{< /highlight >}}

The checkbox -- since it's an [uncontrolled element](https://www.robinwieruch.de/react-controlled-components/) for the sake of demonstrating what's happening here -- manages its own internal state. If you check the first of the two items with the checkbox, and reverse them with the button, you will notice that the checked checkbox is rendered at the same place while the order of the list items have changed.

{{< highlight javascript >}}
// the initially rendered list of items

[x] Learn React
[ ] Learn GraphQL

// becomes this after the reverse button click

[x] Learn GraphQL
[ ] Learn React
{{< /highlight >}}

Now the flaw -- which wasn't obvious before -- got unveiled in our browser in front of our eyes. The problem is that we are using the index of each item in an array for the key attribute. But for each rendering the index stays the same even though we reverse our list:

{{< highlight javascript >}}
// the initially rendered list of items

[x] Learn React (index = 1)
[ ] Learn GraphQL (index = 2)

// becomes this after the reverse button click

[x] Learn GraphQL (index = 1)
[ ] Learn React (index = 2)
{{< /highlight >}}

That's why the reordered elements get still assigned to the same key attribute which acts as identifier for React. React doesn't change the checkbox elements, because it believes the rendered items still have the same order. You can fix this issue by using **stable identifiers** for your rendered list items:

{{< highlight javascript "hl_lines=2 3 16 17" >}}
const initialList = [
  { id: 'a', name: 'Learn React' },
  { id: 'b', name: 'Learn GraphQL' },
];

const ListWithStableIndex = () => {
  const [list, setList] = React.useState(initialList);

  const handleClick = event => {
    setList(list.slice().reverse());
  };

  return (
    <div>
      <ul>
        {list.map(item => (
          <li key={item.id}>
            <label>
              <input type="checkbox" />
              {item.name}
            </label>
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleClick}>
        Reverse List
      </button>
    </div>
  );
};
{{< /highlight >}}

Now with every reorder of the list, the key property stays intact because the id is attached to the actual item in the list:

{{< highlight javascript >}}
// the initially rendered list of items

[x] Learn React (id = a)
[ ] Learn GraphQL (id = b)

// becomes this after the reverse button click

[ ] Learn GraphQL (id = b)
[x] Learn React (id = a)
{{< /highlight >}}

That's all it needs to render lists without any bugs in React. In this case we used a made up identifier, but it would have worked with the `name` property of each item as key as well; as long as they are unique names which cannot be changed.

Anyway, it's still worth to note that using indexes is fine as long your list keeps isn't changed in order or size. Then the place of each item in the list doesn't change -- it's stable same as the index -- and thus using the index is okay. The demonstrated example can be found in this {{% a_blank "GitHub repository" "https://github.com/the-road-to-learn-react/react-list-component" %}} among other React List Component examples.