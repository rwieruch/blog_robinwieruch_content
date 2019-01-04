# Building React Apps with Semantic UI

[Semantic UI](https://semantic-ui.com/) is a UI component framework for theming websites. Semantic UI enables developers to build websites with fast and concise HTML, along with a complete mobile responsive experience.

Semantic UI treats words and classes as exchangeable concepts. Classes use syntax from natural languages like noun/modifier relationships, word order, and plurality to link concepts intuitively.

## Getting Started with Semantic UI React

In order to use Semantic UI in a React app, we'd have to make use of [Semantic UI React](https://react.semantic-ui.com/), a React integration of the original Semantic UI library. 

Semantic UI React provides several prebuilt components that we can use to speed up our development process whilst building a React app.

The best way to get started with Semantic UI React is by running the command below.

```bash
npm install semantic-ui-react
```

Semantic UI React needs the Semantic UI stylesheet for it to work properly. That can be done by placing the CDN link below in the `head` of your app.

```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.0/dist/semantic.min.css"></link>
```

## **Overview on Semantic UI React Components**

In this article, we'll explore how to use Semantic UI in a React app by building a **Login Page**. The Login page will contain several elements from Semantic UI. It's going to contain a header navigation bar and the login form. 

It's also going to feature Semantic UI components so we get to see how the components can be utilized. A mockup of what the login form is going to look like can be seen below.

![](https://i.imgur.com/UaqoDSU.png)

We'll start by creating a React app using the [create-react-app](https://github.com/facebook/create-react-app) utility. Create React App enables developers to easily create React apps with zero build config.

```bash
npx create-react-app react-semanticapp
cd my-app
npm start
```

Once that's done, run the command below to install Semantic UI React into the React app.

```bash
npm install semantic-ui-react
```

Then, add this to the `index.html` located in the `public` folder.

```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.0/dist/semantic.min.css">
```

### Login Form

Next, we'll start creating the required components. Navigate into the `src` folder and create a `Login.js` file and edit with the following.

```javascript
import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

const LoginForm = () => (
  <div className="login-form">
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
         <Image src="logo.png" /> Login
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Email address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button color="blue" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          Not registered yet? <a href="#">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
);

export default LoginForm;

```

<iframe src="https://codesandbox.io/embed/911vwwnzm4?module=%2Fsrc%2FLogin.js&moduleview=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

In the code block above, we are building a simple login form. We start by importing some Semantic components that will be used to build the login form. We'll highlight the components imported and discuss them.

**Grid**

[Grids](https://react.semantic-ui.com/collections/grid/) are structures used to align negative space in a design. Grid allows grouping of content into rows and columns by using `Grid.Row` and `Grid.Column` respectively.

```javascript
import React from 'react'
import { Grid } from 'semantic-ui-react'

const ButtonExample = () => (
	<Grid>
      <Grid.Column>
        <p>Content lives here</p>
        <p>Content lives here</p>
        <p>Content lives here</p>
        <p>Content lives here</p>
      </Grid.Column>
    </Grid>
)
```

<iframe src="https://codesandbox.io/embed/rw5p24jk1p?moduleview=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

When using Grid, we don't necessarily need to specify the rows as Grid automatically knows to automatically wrap it's content into a new row if the column width is filled.

In the code block for the login form above, we simply created a `Grid `component and used just one `Grid.Column` component.

The Grid component also allows some props like the ones below.

<u>centered</u>

Once this prop is present, the columns under a Grid are automatically centered.

<u>className</u>

Used to add additional classes.

<u>columns</u>

Used to represent column count per row in a Grid

<u>divided</u>

The `divided` prop is used to create dividers between columns.

<u>textAlign</u>

Used to specify the text alignment in a grid. Can be `left`, `center`, `right` or `justify`.

<u>verticalAlign</u>

Used to specify a grid's vertical alignment. Value can be `bottom`, `middle` or `top`.

**Button**

[Buttons](https://react.semantic-ui.com/elements/button/) allow users to take actions, and make choices, with a single tap. They help communicate an action a user can take.

```javascript
import React from 'react'
import { Button } from 'semantic-ui-react'

const ButtonExample = () => <Button>Click Here</Button>
```

<iframe src="https://codesandbox.io/embed/x9jjqzr4nq?moduleview=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

The button component allows the following props.

<u>active</u>

The `active` prop is used to show the current state of the button.

<u>as</u>

This specifies the element type to render the content in.

<u>circular</u>

This prop when applied makes a button circular.

<u>className</u>

Enables additional classes for the button.

<u>color</u>

This is used to set the color of the button. It expects any of the following values - `red`, `orange`, `yellow`, `olive`, `green`, `teal`, `blue`, `violet`, `purple`, `pink`, `brown`, `grey`, `black`.

<u>disabled</u>

This prop, when set to true, can make a button unable to be interacted with.

<u>loading</u>

Adds a loading indicator to the button.

<u>primary</u>

The `primary` prop formats a button to show different levels of emphasis.

<u>size</u>

The `size` prop is used to specify the size of the button. It can accept any of the following values - `mini`, `tiny`, `small`, `medium`, `large`, `big`, `huge `or `massive`.

**Image**

The [Image](https://react.semantic-ui.com/elements/image/) component is how we represent and display images in Semantic UI. The syntax is very similar to the traditional HTML5 tag as it uses the `src` attribute to fetch the image to be displayed.

```javascript
import React from 'react'
import { Image } from 'semantic-ui-react'

const ImageExample = () => <Image src='https://www.robinwieruch.de/img/page/logo.svg' />

```

<iframe src="https://codesandbox.io/embed/q3o0n4v3xj?moduleview=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

It accepts the following props.

<u>bordered</u>

When this prop is present and set to true, a border is automatically added to the image.

<u>centered</u>

This prop sets the image centrally in a content block.

<u>circular</u>

Displays the image in a circular format.

<u>className</u>

Used to add additional classes.

<u>size</u>

This is used to determine the image size. It can accept any of the following values - `mini`, `tiny`, `small`, `medium`, `large`, `big`, `huge` or `massive`.

**Header**

The [Header](https://react.semantic-ui.com/elements/header/)  component is used to display the HTML heading tags, that is, `h1` down to `h6`.  We can specify which of the header tags to be used by using the `as` props.

```javascript
import React from 'react'
import { Header } from 'semantic-ui-react'

const HeaderExample = () => (
  <div>
    <Header as='h1'>Login</Header>
    <Header as='h2'>Login</Header>
    <Header as='h3'>Login</Header>
    <Header as='h4'>Login</Header>
    <Header as='h5'>Login</Header>
    <Header as='h6'>Login</Header>
  </div>
)
```

<iframe src="https://codesandbox.io/embed/wn2qmnxxp8?moduleview=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

It accepts the following props.

<u>as</u>

This specifies the element type to render the content in. It takes in values from `h1` down to `h6` and even the `p` tag.

<u>className</u>

Used to add additional classes.

<u>color</u>

This is used to set the color of the header. It expects any of the following values - `red`, `orange`, `yellow`, `olive`, `green`, `teal`, `blue`, `violet`, `purple`, `pink`, `brown`, `grey`, `black`.

<u>dividing</u>

This can be used to create a divider between the header and the content.

<u>textAlign</u>

Used to align the header content. Value can be any of the following - `left`, `center`, `right`, `justified`.

**Form**

The `Form` component is used to display a set of related user input fields in a very clean and organized way.

There are two ways in which you can create a form using Semantic UI. You can either write the `Form` components using the shorthand props API or without the shorthand props API.

```javascript
// shorthand method
import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const LoginForm = () => (
  <Form>
    <Form.Field>
      <label>Email Address</label>
      <input placeholder='Email Address' />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='Password' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
)

export default LoginForm
```

<iframe src="https://codesandbox.io/embed/p7446xvn0?moduleview=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

In the code block above, form fields in Semantic UI are created by using `Form.Field`. [Form.Field](https://react.semantic-ui.com/collections/form/#content-field) is a form element that contains a input and a label.

```javascript
// without shorthand method
import React from 'react'
import { Form } from 'semantic-ui-react'

const LoginForm = () => (
  <Form>
    <Form.Group>
      <Form.Input label='Email Address' placeholder='Email Address' />
      <Form.Input label='Password' placeholder='Password' />
    </Form.Group>
    <Form.Button>Submit</Form.Button>
  </Form>
)

export default LoginForm
```

<iframe src="https://codesandbox.io/embed/vmn1kxo9qy?moduleview=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Using the [shorthand method](https://react.semantic-ui.com/collections/form/#shorthand-subcomponent-control) as seen above, results in a concise and less written code.

The `Form` component also supports HTML controls for input fields.

```javascript
import React from 'react'
import { Form } from 'semantic-ui-react'

const LoginForm = () => (
  <Form>
    <Form.Group widths='equal'>
      <Form.Field label='An HTML <input>' control='input' />
      <Form.Field label='An HTML <select>' control='select'>
        <option value='male'>Male</option>
        <option value='female'>Female</option>
      </Form.Field>
    </Form.Group>
    <Form.Group grouped>
      <label>HTML radios</label>
      <Form.Field label='This one' control='input' type='radio' name='htmlRadios' />
      <Form.Field label='That one' control='input' type='radio' name='htmlRadios' />
    </Form.Group>
    <Form.Group grouped>
      <label>HTML checkboxes</label>
      <Form.Field label='This one' control='input' type='checkbox' />
      <Form.Field label='That one' control='input' type='checkbox' />
    </Form.Group>
    <Form.Field label='An HTML <textarea>' control='textarea' rows='3' />
    <Form.Field label='An HTML <button>' control='button'>
      HTML Button
    </Form.Field>
  </Form>
)

export default LoginForm
```

<iframe src="https://codesandbox.io/embed/jq54zy45w?moduleview=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Just like `Form.Field`, the `Form` component has other subcomponents that help to build usable and organized forms. They include, `Form.Button` `Form.Checkbox` `Form.Dropdown` `Form.Input` `Form.Radio` `Form.Select` `Form.TextArea`. These are all syntactic sugar for setting the controls on the `Form.Field` subcomponent.

The `Form` component accepts the following props.

<u>action</u>

This is the action for the HTML form.

<u>className</u>

Additional classnames that might be needed.

<u>loading</u>

If this prop is added, it automatically shows a loading indicator.

<u>onSubmit</u>

This prop is used to set a submit handler for the HTML form.

<u>size</u>

The `Form` component can vary in size and this prop is used to control that. It accepts any of the following: `mini`, `tiny`, `small`, `large`, `big`, `huge`, `massive`.

The full list of props can be seen on the documentation page [here](https://react.semantic-ui.com/collections/form/#shorthand-field-control-html).

**Message**

The `Message` component is used to display information that explains nearby content. 

```javascript
import React from 'react'
import { Message } from 'semantic-ui-react'

const MessageExampleMessage = () => (
    <Message>
		Not registered yet? <a href="#">Sign Up</a>
	</Message>
)
```

<iframe src="https://codesandbox.io/embed/5wwv5mx03l?moduleview=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

The `Message` component can be written in different ways. It can be written without a header as seen above or with a header just like the example below.

```javascript
import React from 'react'
import { Message } from 'semantic-ui-react'

const MessageExample = () => (
    <Message>
        <Message.Header>Sign Up</Message.Header>
		<p>Not registered yet? <a href="#">Sign Up</a></p>
	</Message>
)
```

<iframe src="https://codesandbox.io/embed/j1z91mlkqw?moduleview=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

We can also use the `Message ` component simply by passing both the header and content as `props`.

```javascript
import React from 'react'
import { Message } from 'semantic-ui-react'

const MessageExample = () => (
    <Message>
        <Message header='Sign Up'content='Not registered yet?. Sign Up' />
	</Message>
)
```

<iframe src="https://codesandbox.io/embed/535n0qxmop?moduleview=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

A full list of how the `Message` component can be customized and utilized can be seen [here](https://react.semantic-ui.com/collections/message/).

**Segment**

A segment is a Semantic UI element that's used to group related content. Segments can be used to display conditional items such as placeholders. It can be formatted to raise above the page, show it contains multiple pages or look like a pile of images.

```javascript
import React from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

const SegmentExamplePlaceholder = () => (
  <Segment placeholder>
    <Header icon>
      <Icon name='pdf file outline' />
      No documents are listed for this customer.
    </Header>
    <Button primary>Add Document</Button>
  </Segment>
)

export default SegmentExamplePlaceholder
```

<iframe src="https://codesandbox.io/embed/x9mj9z8yzo?moduleview=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

**Modals**

Modals are used to create dialogs, popovers or lightboxes that help convey some information. The use of a modal temporarily blocks interactions with the main view of a site whilst showing some content. 

A Semantic UI modal can be created using the `Modal` component as seen in the code block below.

```javascript
import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const ModalExample = () => (
  <Modal trigger={<Button>Show Modal</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>We've found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default ModalExample
```

<iframe src="https://codesandbox.io/embed/ojk0mw86vz?moduleview=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Let's explore some of the props that the `Modal` component accepts.

<u>basic</u>

This prop ensures that the modal has the barest setup

<u>centered</u>

This is used to make the modal vertically centered in the viewport.

<u>className</u>

This is used to set additional class names,

<u>content</u>

The actual content for the Modal.

<u>header</u>

The text displayed above the content in bold.

<u>size</u> 

The size prop allows us to determine the size of the modal. It accepts any of the following values: `mini`, `tiny`, `small`, `large` and `fullscreen`.

<u>trigger</u>

The trigger prop as the name suggests is what is used to trigger the opening of the modal. It's displayed in place of the modal. In the example above, it was set to a button.

The full list of configs with the Modal component can be seen on the documentation [here](https://react.semantic-ui.com/modules/modal/#types-modal).

### Navigation Menu

For the navigation menu, we simply have a brand logo and two menu links to the far right. To accomplish that we'll be using the `Menu` component. In the `src` folder, create a file named `Header.js` and edit it with the code block below.

```javascript
import React from "react";
import { Container, Image, Menu } from "semantic-ui-react";

const HeaderSection = () => (
  <div className="header">
    <Menu>
      <Container>
        <Menu.Item as="a" header>
          <Image
            size="small"
            src="https://www.robinwieruch.de/img/page/logo.svg"
          />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item as="a" name="login">
            Login
          </Menu.Item>

          <Menu.Item as="a" name="register">
            Register
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  </div>
);

export default HeaderSection;

```

<iframe src="https://codesandbox.io/embed/lrlz0wrzxm?moduleview=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Let's go over the [Menu](https://react.semantic-ui.com/collections/menu/) component and it's subcomponents.

The `Menu` component allows us to create navigation menus and grouped navigation actions. It has sub components like `Menu.Item`, `Menu.Header ` and `Menu.Menu`.

`Menu.Item` is an item in a Menu and can be used to include links or a brand image.

`Menu.Header` acts as a header. It can be written as `Menu.Header` or by adding the `header` prop to `Menu.Item`.

`Menu.Menu` is used to encapsulate a menu inside another menu.

Let's explore some of the props that the `Menu` component accepts.

<u>as</u>

Used to set the element type to render menu as.

<u>className</u>

USed to set additional classes.

<u>fixed</u>

A menu can be fixed to a particular side of the page. It accepts any of the following values: `left`, `right`, `bottom` and `top`.

<u>inverted</u>

If the `inverted` prop is present, the colors of the menu are inverted so as to show greater a contrast.

<u>size</u>

This is used to determine the size of the menu. It accepts any of the following values: `mini`, `tiny`, `small`, `large`, `huge` and `massive`.

The full list of configs with the Menu component can be seen on the documentation [here](https://react.semantic-ui.com/collections/menu/).



## Conclusion

In this article, we were introduced to Semantic UI and how it helps to style our apps and provide theming.

We learned that Semantic UI enables developers to build websites with fast and concise HTML, along with a complete mobile responsive experience.

We also got introduced to the React version of Semantic UI, [Semantic UI React](https://react.semantic-ui.com/), which allows us to use Semantic UI in our React apps.

Lastly, we went over some key components in Semantic UI React by building a page with a Login form and a navigation menu.

The complete page with the login form and navigation menu can be seen below.

<iframe src="https://codesandbox.io/embed/911vwwnzm4?moduleview=1&view=editor" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>