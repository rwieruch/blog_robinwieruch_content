+++
title = "End to End Testing React with Cypress"
description = "Learn how to run end to end tests for React with Cypress. E2E tests will give you more confidence in your overall React application ..."
date = "2019-07-18T13:56:46+02:00"
tags = ["React", "JavaScript", "Tooling", "Webpack", "Babel", "Cypress"]
categories = ["React", "JavaScript", "Tooling", "Webpack", "Babel", "Cypress"]
keywords = ["react testing cypress", "react end to end testing", "react cypress"]
news_keywords = ["react testing cypress", "react end to end testing", "react cypress"]
hashtag = "#ReactJs"
card = "img/posts/react-testing-cypress/banner_640.jpg"
banner = "img/posts/react-testing-cypress/banner.jpg"
contribute = "react-testing-cypress.md"
headline = "End to End Testing React with Cypress"

summary = "Learn how to run end to end tests for React with Cypress. E2E tests will give you more confidence in your overall React application."
+++

{{% sponsorship %}}

{{% pin_it_image "react testing cypress" "img/posts/react-testing-cypress/banner.jpg" "is-src-set" %}}

{{% read_before_2 "This tutorial is part 3 of 3 in the series." "Part 1:" "How to set up React with Webpack and Babel" "https://www.robinwieruch.de/minimal-react-webpack-babel-setup/" "Part 2:" "How to test React components with Jest" "https://www.robinwieruch.de/react-testing-jest" %}}

End-to-end testing (E2E) was always a tedious task with testing frameworks from the past. However, nowadays many people are using {{% a_blank "Cypress.io" "https://cypress.io" %}} for it. Their documentation has a high quality and their API is concise and clean. Let's use Cypress for this React testing tutorial series. First, you have to install it on the command line to your dev dependencies:

{{< highlight javascript >}}
npm install --save-dev cypress
{{< /highlight >}}

Second, create a dedicated folder for Cypress and its E2E tests in your project folder. It comes with its given {{% a_blank "folder structure" "https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html" %}}:

{{< highlight javascript >}}
mkdir cypress
cd cypress
mkdir integration
cd integration
{{< /highlight >}}

Third, add a script for npm to your *package.json* file. That way, you are able to run Cypress easily from the command line:

{{< highlight javascript "hl_lines=5" >}}
{
  ...
  "scripts": {
    "start": "webpack-dev-server --config ./webpack.config.js --mode development",
    "test:cypress": "cypress open"
  },
  ...
}
{{< /highlight >}}

Afterward, run Cypress for the first time:

{{< highlight javascript >}}
npm run test:cypress
{{< /highlight >}}

It opens up a window which indicates that you don't have any tests yet: "No files found in".

{{% pin_it_image "react cypress e2e testing" "img/posts/react-testing-cypress/react-cypress-no-tests-found.jpg" "is-src-set" %}}

Now, for your new Cypress **cypress/integration/** folder, create a end-to-end testing file for your App component.

{{< highlight javascript >}}
touch cypress/integration/App.e2e.js
{{< /highlight >}}

Next, add your first test to it. It's not really an end-to-end test, but only the simplest assertion you can make to verify that Cypress is working for you.

{{< highlight javascript >}}
describe('App E2E', () => {
  it('should assert that true is equal to true', () => {
    expect(true).to.equal(true);
  });
});
{{< /highlight >}}

You might already know the "describe"- and "it"-blocks which enable you to encapsulate your tests in blocks. These blocks are coming from Mocha, which is used by Cypress, under the hood. The assertions such as `expect()` are used from Chai. *"Cypress builds on these {{% a_blank "popular tools and frameworks" "https://docs.cypress.io/guides/references/bundled-tools.html" %}} that you hopefully already have some familiarity and knowledge of."*

Now you can run Cypress again on the command line:

{{< highlight javascript >}}
npm run test:cypress
{{< /highlight >}}

You should see the following output now. Cypress finds your test and you can either run the single test by clicking it or run all of your tests by using their dashboard.

{{% pin_it_image "react cypress end-to-end testing" "img/posts/react-testing-cypress/react-cypress-testing.jpg" "is-src-set" %}}

Run your test and verify that true is equal to true. Hopefully it turns out to be green for you. Otherwise there is something wrong. In contrast, you can checkout a failing end-to-end test too.

{{< highlight javascript >}}
describe('App E2E', () => {
  it('should assert that true is equal to true', () => {
    expect(true).to.equal(false);
  });
});
{{< /highlight >}}

If you want, you can change the script slightly for Cypress to run every test by default without opening the additional window.

{{< highlight javascript "hl_lines=5" >}}
{
  ...
  "scripts": {
    "start": "webpack-dev-server --config ./webpack.config.js --mode development",
    "test:cypress": "cypress run"
  },
  ...
}
{{< /highlight >}}

As you can see, when you run Cypress again on the command line, all your tests should run automatically. In addition, you can experience that there is some kind of video recording happening. The videos are stored in a folder for you to experience your tests first hand. You can also add screenshot testing to your Cypress end-to-end tests. Find out more about {{% a_blank "the video and screenshot capabilities of Cypress.io" "https://docs.cypress.io/guides/guides/screenshots-and-videos.html" %}}. You can suppress the video recording in your Cypress configuration file in your project folder. It might be already generated by Cypress for you, otherwise create it on the command line from your root folder:

{{< highlight javascript >}}
touch cypress.json
{{< /highlight >}}

Now, in the Cypress configuration file, add the `video` flag and set it to false.

{{< highlight javascript >}}
{
  "video": false
}
{{< /highlight >}}

In case you want to find out more about the configuration capabilities of Cypress, {{% a_blank "checkout their documentation" "https://docs.cypress.io/guides/references/configuration.html" %}}.

Eventually you want to start to test your implemented React application with Cypress. Since Cypress is offering end-to-end testing, you have to start your application first before visiting the website with Cypress. You can use your local development server for this case.

But how to run your development server, in this case webpack-dev-server, before your Cypress script? There exists a {{% a_blank "neat library" "https://github.com/bahmutov/start-server-and-test" %}} which you can use to start your development server before Cypress. First, install it on the command line for your dev dependencies:

{{< highlight javascript >}}
npm install --save-dev start-server-and-test
{{< /highlight >}}

Second, add it to your *package.json* file's npm scripts. The library expects the following script pattern: `<start script name> <url> <test script name>`.

{{< highlight javascript "hl_lines=5 6" >}}
{
  ...
  "scripts": {
    "start": "webpack-dev-server --config ./webpack.config.js --mode development",
    "test:cypress": "start-server-and-test start http://localhost:8080 cypress",
    "cypress": "cypress run"
  },
  ...
}
{{< /highlight >}}

Finally, you can visit your running application with Cypress in your end-to-end test. Therefore you will use the global `cy` cypress object. In addition, you can also add your first E2E test which verifies your header tag (h1) from your application.

{{< highlight javascript "hl_lines=2 3 4 5 6 7" >}}
describe('App E2E', () => {
  it('should have a header', () => {
    cy.visit('http://localhost:8080');

    cy.get('h1')
      .should('have.text', 'My Counter');
  });
});
{{< /highlight >}}

Basically, that's how a selector and assertion in Cypress work. Now you your test again on the command line. It should turn out to be successful.

A best practice in Cypress testing is adding the base URL to your **cypress.json** configuration file. It's not only to keep your code DRY, but has also performance impacts.

{{< highlight javascript >}}
{
  "video": false,
  "baseUrl": "http://localhost:8080"
}
{{< /highlight >}}

Afterward, you can remove the URL from your single E2E test. It always takes the given base URL now.

{{< highlight javascript "hl_lines=3" >}}
describe('App E2E', () => {
  it('should have a header', () => {
    cy.visit(‘/‘);

    cy.get('h1')
      .should('have.text', 'My Counter');
  });
});
{{< /highlight >}}

The second E2E test you are going to implement will test the two interactive buttons in your React application. After clicking each button, the counter integer which is shown in the paragraph tag should change. Let's begin by verifying that the counter is 0 when the application just started.

{{< highlight javascript "hl_lines=9 10 11 12 13 14" >}}
describe('App E2E', () => {
  it('should have a header', () => {
    cy.visit('/');

    cy.get('h1')
      .should('have.text', 'My Counter');
  });

  it('should increment and decrement the counter', () => {
    cy.visit('/');

    cy.get('p')
      .should('have.text', '0');
  });
});
{{< /highlight >}}

Now, by {{% a_blank "interacting with the buttons" "https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html" %}}, you can increment and decrement the counter.

{{< highlight javascript "hl_lines=15 16 17 18 19 20 21 22 23 24 25" >}}
describe('App E2E', () => {
  it('should have a header', () => {
    cy.visit('/');

    cy.get('h1')
      .should('have.text', 'My Counter');
  });

  it('should increment and decrement the counter', () => {
    cy.visit('/');

    cy.get('p')
      .should('have.text', '0');

    cy.contains('Increment').click();
    cy.get('p')
      .should('have.text', '1');

    cy.contains('Increment').click();
    cy.get('p')
      .should('have.text', '2');

    cy.contains('Decrement').click();
    cy.get('p')
      .should('have.text', '1');
  });
});
{{< /highlight >}}

That's it. You have written your first two E2E tests with Cypress. You can navigate from URL to URL, interact with HTML elements and verify rendered output. Two more things:

* If you need to provide sample data for your E2E tests, checkout the best practice of using fixtures in Cypress.
* If you need to spy, stub or mock functions in Cypress, you can use Sinon for it. Cypress comes with built-in Sinon to test your asynchronous code.

{{% read_more "Test Coverage in JavaScript" "https://www.robinwieruch.de/javascript-test-coverage/" %}}

{{% read_more "How to test React components with Jest & Enzyme" "https://www.robinwieruch.de/react-testing-jest-enzyme/" %}}