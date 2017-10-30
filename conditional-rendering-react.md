+++
title = "All the Conditional Renderings in React"
description = "The article is an exhaustive list of conditional renderings in React. But what is conditional rendering in React? In a conditional render a component decides based on one or several conditions which elements it will return..."
date = "2017-02-21T13:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react conditional rendering"]
news_keywords = ["react", "react conditional rendering"]
hashtag = "#ReactJs"
card = "img/posts/conditional-rendering-react/banner_640.jpg"
banner = "img/posts/conditional-rendering-react/banner.jpg"
contribute = "conditional-rendering-react.md"
headline = "All the Conditional Renderings in React"

summary = "Conditional rendering in React is no witchcraft. In JSX you can use pure JavaScript. In JavaScript you should be familiar with if-else or switch case statements. You can use it in JSX as well, since JSX only mixes HTML and JavaScript. But what is conditional rendering in React? In a conditional render a component decides based on one or several conditions which elements it will return."
+++

{{% pin_it_image "conditional rendering react" "img/posts/conditional-rendering-react/banner.jpg" "is-src-set" %}}

Conditional rendering in React is no witchcraft. In JSX - the syntax extension used for React - you can use pure JavaScript. In JavaScript you should be familiar with if-else or switch case statements. You can use it in JSX as well, since JSX only mixes HTML and JavaScript.

But what is conditional rendering in React? In a conditional render a component decides based on one or several conditions which elements it will return. For instance, it can either return a list of items or a message that says "Sorry, the list is empty". When a component has conditional rendering, the instance of the rendered component can have different looks.

The article aims to be an exhaustive list of options for conditional renderings in React. If you know more alternatives, feel free to contribute.

{{% chapter_header "Table of Contents" "toc" %}}

* [if statement](#ifStatement)
* [ternary operation](#ternaryOperation)
* [logical && operator](#logicalAndOperator)
* [switch case operator](#switchCaseOperator)
* [enums](#enums)
* [Multi-Level Conditional Rendering](#multiLevel)
* [With Higher Order Components](#conditionalRenderingHoc)
* [External Templating Components](#externalTemplatingComponents)

{{% chapter_header "if statement" "ifStatement" %}}

The easiest way to have a conditional rendering in React is to use an if statement in your render method. Imagine you don't want to render your component, because it doesn't have the necessary props. For instance, a List component shouldn't render the list when there is no list of items. You can use an if statement to return earlier from the render lifecycle.

{{< highlight javascript >}}
function List({ list }) {
    if (!list) {
        return null;
    }

    return (
        <div>
            {list.map(item => <ListItem item={item} />)}
        </div>
    );
}
{{< /highlight >}}

A component that returns null will render nothing. However, you might want to show a text when a list is empty to give your app user some feedback for a better user experience.

{{< highlight javascript >}}
function List({ list }) {
    if (!list) {
        return null;
    }

    if (!list.length) {
        return <p>Sorry, the list is empty.</p>;
    } else {
        return (
            <div>
                {list.map(item => <ListItem item={item} />)}
            </div>
        );
    }
}
{{< /highlight >}}

The List renders either nothing, a text or the list of items. The if-else statement is the most basic option to have a conditional rendering in React.

{{% chapter_header "ternary operation" "ternaryOperation" %}}

You can make your if-else statement more concise by using a {{% a_blank "ternary operation" "https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator" %}}.

{{< highlight javascript >}}
condition ? expr1 : expr2
{{< /highlight >}}

For instance, imagine you have a toggle to switch between two modes, edit and view, in your component. The derived condition is a simple boolean. You can use the boolean to decide which element you want to return.

{{< highlight javascript >}}
function Item({ item, mode }) {
    const isEditMode = mode === 'EDIT';

    return (
        <div>
            { isEditMode
                ? <ItemEdit item={item} />
                : <ItemView item={item} />
            }
        </div>
    );
}
{{< /highlight >}}

The ternary operation makes the conditional rendering in React more concise than the if-else statement. It is simple to inline it in your return statement.

{{% chapter_header "logical && operator" "logicalAndOperator" %}}

It happens often that you want to render either an element or nothing. For instance, you could have a LoadingIndicator component that returns a loading text or nothing. You can do it in JSX with an if statement or ternary operation.

{{< highlight javascript >}}
function LoadingIndicator({ isLoading }) {
    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    } else {
        return null;
    }
}

function LoadingIndicator({ isLoading }) {
    return (
        <div>
            { isLoading
                ? <p>Loading...</p>
                : null
            }
        </div>
    );
}
{{< /highlight >}}

But there is an alternative way that omits the necessity to return null. The logical `&&` operator helps you to make conditions that would return null more concise.

How does it work? In JavaScript a `true && 'Hello World'` always evaluates to 'Hello World'. A `false && 'Hello World'` always evaluates to false.

{{< highlight javascript >}}
const result = true && 'Hello World';
console.log(result);
// Hello World

const result = false && 'Hello World';
console.log(result);
// false
{{< /highlight >}}

In React you can make use of that behaviour. If the condition is true, the expression after the logical && operator will be the output. If the condition is false, React ignores and skips the expression.

{{< highlight javascript >}}
function LoadingIndicator({ isLoading }) {
    return (
        <div>
            { isLoading && <p>Loading...</p> }
        </div>
    );
}
{{< /highlight >}}

That's your way to go when you want to return an element or nothing. It makes it even more concise than a ternary operation when you would return null for a condition.

{{% chapter_header "switch case operator" "switchCaseOperator" %}}

Now there might be cases where you have multiple conditional renderings. For instance, the conditional rendering could apply based on different states. Let's imagine a notification component that can render an error, warning or info component based on the input state. You can use a switch case operator to handle the conditional rendering of these multiple states.

{{< highlight javascript >}}
function Notification({ text, state }) {
    switch(state) {
        case 'info':
            return <Info text={text} />;
        case 'warning':
            return <Warning text={text} />;
        case 'error':
            return <Error text={text} />;
        default:
            return null;
    }
}
{{< /highlight >}}

Please note that you always have to use the `default` for the switch case operator. In React a component has always to return an element or null.

As a little side information: When a component has a conditional rendering based on a state, it makes sense to describe the interface of the component with `React.PropTypes`.

{{< highlight javascript >}}
function Notification({ text, state }) {
    switch(state) {
        case 'info':
            return <Info text={text} />;
        case 'warning':
            return <Warning text={text} />;
        case 'error':
            return <Error text={text} />;
        default:
            return null;
    }
}

Notification.propTypes = {
     text: React.PropTypes.string,
     state: React.PropTypes.oneOf(['info', 'warning', 'error'])
}
{{< /highlight >}}

Now you have one generic component to show different kinds of notifications. For instance, based on the `state` prop the component could have different looks. An error could be red, a warning would be yellow and an info could be blue.

An alternative way would be to inline the switch case. Therefore you would need a self invoking JavaScript function.

{{< highlight javascript >}}
function Notification({ text, state }) {
    return (
        <div>
            {(function() {
                switch(state) {
                    case 'info':
                        return <Info text={text} />;
                    case 'warning':
                        return <Warning text={text} />;
                    case 'error':
                        return <Error text={text} />;
                    default:
                        return null;
                }
            })()}
        </div>
    );
}
{{< /highlight >}}

Again it can be more concise with an ES6 arrow function.

{{< highlight javascript "hl_lines=4" >}}
function Notification({ text, state }) {
    return (
        <div>
            {(() => {
                switch(state) {
                    case 'info':
                        return <Info text={text} />;
                    case 'warning':
                        return <Warning text={text} />;
                    case 'error':
                        return <Error text={text} />;
                    default:
                        return null;
                }
            })()}
        </div>
    );
}
{{< /highlight >}}

In conclusion, the switch case operator helps you to have multiple conditional renderings. But is it the best way to do that? Let's see how we can have multiple conditional renderings with enums.

{{% chapter_header "enums" "enums" %}}

In JavaScript an object can be used as an enum when the object is used as a map of key value pairs.

{{< highlight javascript >}}
const ENUM = {
    a: '1',
    b: '2',
    c: '3',
};
{{< /highlight >}}

An enum is a great way to have multiple conditional renderings. Let's consider the notification component again. This time we can use the enum as inlined object.

{{< highlight javascript >}}
function Notification({ text, state }) {
    return (
        <div>
            {{
                info: <Info text={text} />,
                warning: <Warning text={text} />,
                error: <Error text={text} />,
            }[state]}
        </div>
    );
}
{{< /highlight >}}

The state property key helps us to retrieve the value from the object. That's neat, isn't it? It is much more readable compared to the switch case operator.

In this case we had to use an inlined object, because the values of the object depend on the `text` property. That would be my recommended way anyway. However, if it wouldn't depend on the text property, you could use an external static enum too.

{{< highlight javascript >}}
const NOTIFICATION_STATES = {
    info: <Info />,
    warning: <Warning />,
    error: <Error />,
};

function Notification({ state }) {
    return (
        <div>
            {NOTIFICATION_STATES[state]}
        </div>
    );
}
{{< /highlight >}}

Although we could use a function to retrieve the value, if we would depend on the `text` property.

{{< highlight javascript >}}
const getSpecificNotification = (text) => ({
    info: <Info text={text} />,
    warning: <Warning text={text} />,
    error: <Error text={text} />,
});

function Notification({ state, text }) {
    return (
        <div>
            {getSpecificNotification(text)[state]}
        </div>
    );
}
{{< /highlight >}}

After all, the enum approach in comparison to the switch case statement is more readable. Objects as enums open up plenty of options to have multiple conditional renderings. Consider this last example to see what's possible:

{{< highlight javascript >}}
function FooBarOrFooOrBar({ isFoo, isBar }) {
    const key = `${isFoo}-${isBar}`;
    return (
        <div>
            {{
                ['true-true']: <FooBar />,
                ['true-false']: <Foo />,
                ['false-true']: <Bar />,
                ['false-false']: null,
            }[key]}
        </div>
    );
}

FooBarOrFooOrBar.propTypes = {
     isFoo: React.PropTypes.boolean.isRequired,
     isBar: React.PropTypes.boolean.isRequired,
}
{{< /highlight >}}

{{% chapter_header "Multi-Level Conditional Rendering" "multiLevel" %}}

What about nested conditional renderings? Yes, it is possible. For instance, let's have a look at the List component that can either show a list, an empty text or nothing.

{{< highlight javascript >}}
function List({ list }) {
    const isNull = !list;
    const isEmpty = !isNull && !list.length;

    return (
        <div>
            { isNull
                ? null
                : ( isEmpty
                    ? <p>Sorry, the list is empty.</p>
                    : <div>{list.map(item => <ListItem item={item} />)}</div>
                )
            }
        </div>
    );
}

// Usage

<List list={null} /> // <div></div>
<List list={[]} /> // <div><p>Sorry, the list is empty.</p></div>
<List list={['a', 'b', 'c']} /> // <div><div>a</div><div>b</div><div>c</div><div>
{{< /highlight >}}

It works. However I would recommend to keep the nested conditional renderings to a minimum. It makes it less readable. My recommendation would be to split it up into smaller components which themselves have conditional renderings.

{{< highlight javascript >}}
function List({ list }) {
    const isList = list && list.length;

    return (
        <div>
            { isList
                ? <div>{list.map(item => <ListItem item={item} />)}</div>
                : <NoList isNull={!list} isEmpty={list && !list.length} />
            }
        </div>
    );
}

function NoList({ isNull, isEmpty }) {
    return (!isNull && isEmpty) && <p>Sorry, the list is empty.</p>;
}
{{< /highlight >}}

Still, it doesn't look that appealing. Let's have a look at higher order components and how they would help to tidy it up.

{{% chapter_header "With Higher Order Components" "conditionalRenderingHoc" %}}

Higher order components (HOCs) are a perfect match for conditional rendering in React. HOCs can have multiple use cases. Yet one use case could be to alter the look of a component. To make the use case more specific: it could be to apply a conditional rendering for a component. Let's have a look at a HOC that either shows a loading indicator or a desired component.

{{< highlight javascript >}}
// HOC declaration
function withLoadingIndicator(Component) {
  return function EnhancedComponent({ isLoading, ...props }) {
    if (!isLoading) {
      return <Component { ...props } />;
    }

    return <div><p>Loading...</p></div>;
  };
}

// Usage
const ListWithLoadingIndicator = withLoadingIndicator(List);

<ListWithLoadingIndicator
  isLoading={props.isLoading}
  list={props.list}
/>
{{< /highlight >}}

In the example, the List component can focus on rendering the list. It doesn't have to bother with a loading state. Ultimately you could add more HOCs to shield away multiple conditional rendering edge cases.

A HOC can opt-in one or multiple conditional renderings. You could even use multiple HOCs to handle several conditional renderings. After all, a HOC shields away all the noise from your component. If you want to dig deeper into conditional renderings with higher order components, you should read the [conditional rendering with HOCs article](https://www.robinwieruch.de/gentle-introduction-higher-order-components/).

{{% chapter_header "External Templating Components" "externalTemplatingComponents" %}}

Last but not least there exist external solutions to deal with conditional renderings. They add control components to enable conditional renderings without JavaScript in JSX.

{{< highlight javascript >}}
<Choose>
    <When condition={isLoading}>
        <div><p>Loading...</p></div>
    </When>
    <Otherwise>
        <div>{list.map(item => <ListItem item={item} />)}</div>
    </Otherwise>
</Choose>
{{< /highlight >}}

Some people use it. Personally I wouldn't recommend it. JSX allows you to use the powerful set of JavaScript functionalities to handle conditional rendering. There is no need to add templating components to enable conditional rendering. A lot of people consider React including JSX as their library of choice, because they can handle the rendering with pure HTML and JS in JSX.

<hr class="section-divider">

In the end you might wonder: When to use which type of conditional render? My opinionated answer:

* if-else
    * is the most basic conditional rendering
    * beginner friendly
    * use if to opt-out early from a render method by returning null
* ternary operator
    * use it over an if-else statement
    * it is more concise than if-else
* logical && operator
    * use it when one side of the ternary operation would return null
    * but be careful that you don't run into bugs when using multiple conditions
* switch case
    * verbose
    * can only be inlined with self invoking function
    * avoid it, use enums instead
* enums
    * perfect to map different states
    * perfect to map more than one condition
* multi-level/nested conditional renderings
    * avoid them for the sake of readability
    * split up components into more lightweight components with their own simple conditional rendering
    * use HOCs
* HOCs
    * use them to shield away conditional rendering
    * components can focus on their main purpose
* external templating components
    * avoid them and be comfortable with JSX and JavaScript

In conclusion, I hope you can make use of the alternatives for conditional rendering. I am keen to hear your ways of doing it.

{{% read_more "The SoundCloud Client in React + Redux" "https://www.robinwieruch.de/the-soundcloud-client-in-react-redux/" %}}

{{% read_more "Tips to learn React + Redux" "https://www.robinwieruch.de/tips-to-learn-react-redux/" %}}
