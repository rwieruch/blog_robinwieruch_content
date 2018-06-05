+++
title = "Linear Regression with Normal Equation in JavaScript"
description = "Explaining and implementing normal equation in JavaScript and discussing it as alternative for gradient descent ..."
date = "2017-12-02T13:50:46+02:00"
tags = ["Machine Learning", "JavaScript"]
categories = ["Machine Learning", "JavaScript"]
keywords = ["machine learning javascript", "normal equation javascript"]
news_keywords = ["normal equation javascript"]
hashtag = "#JavaScript #MachineLearning"
card = "img/posts/multivariate-linear-regression-normal-equation-javascript/banner_640.jpg"
banner = "img/posts/multivariate-linear-regression-normal-equation-javascript/banner.jpg"
contribute = "multivariate-linear-regression-normal-equation-javascript.md"
headline = "Linear Regression with Normal Equation in JavaScript"

summary = "The article guides you through implementing normal equation as alternative to gradient descent to solve a regression problem in JavaScript. You should learn about gradient descent before diving into this topic."
+++

{{% sponsorship %}}

{{% pin_it_image "normal equation javascript" "img/posts/multivariate-linear-regression-normal-equation-javascript/banner.jpg" "is-src-set" %}}

A recent article gave an introduction to the field of machine learning in JavaScript by [predicting housing prices with gradient descent](https://www.robinwieruch.de/linear-regression-gradient-descent-javascript/) in a univariate regression problem. It used plain mathematical expressions and thus made use of the unvectorized implementation of gradient descent and the cost function. However, the unvectorized approach doesn't scale when applying it for multiple parameters (e.g. [polynomial regression](https://www.robinwieruch.de/polynomial-regression-model-selection-javascript/)) or having a multivariate training set with multiple features n. That's the perfect point in time to use [matrix operations for computational efficiency](https://www.robinwieruch.de/linear-algebra-matrix-javascript/) and thus to use the vectorized implementation of linear regression with gradient descent in [univariate](https://www.robinwieruch.de/linear-regression-gradient-descent-vectorized-javascript) or [multivariate](https://www.robinwieruch.de/multivariate-linear-regression-gradient-descent-javascript) training sets.

However, gradient descent is just one approach for a regression problem. There exists an alternative to gradient descent which is called **normal equation** when dealing with multivariate training sets. The following article will explain the normal equation in JavaScript and its advantages and disadvantages compared to gradient descent.

{{% machine-learning-intro %}}

{{% chapter_header "When to use Normal Equation over Gradient Descent" "normal-equation-vs-gradient-descent-javascript" %}}

Normal equation for a regression problem is not a silver bullet. Compared to gradient descent it doesn’t need an iterative process to reduce the cost function over time. By explicitly taking the derivates, the function finds the optimum parameters for theta in only one mathematical expression. But why isn't it superior?

In a normal equation there isn't a learning rate alpha, there isn't a number of iterations and there aren't any improvements such as feature scaling. You can skip most of [these improvements which you had to apply in gradient descent](https://www.robinwieruch.de/improving-gradient-descent-javascript/). The normal equation is still a vectorized matrix operation: `inv(X' * X) * X' * y`. That's everything speaking in favor for the normal equation over the iterative gradient descent. But, it turns out that the normal equation is slower compared to gradient descent when the number of features n goes up. In practice, when n exceeds 10,000 features, you can improve the computational efficiency by choosing an iterative algorithm such as gradient descent over the normal equation.

{{% chapter_header "Normal Equation in JavaScript" "normal-equation-javascript" %}}

The following part will implement normal equation in JavaScript. The article will demonstrate it from scratch, but you will find later on the whole source code on GitHub for it. Before you can implement the algorithm, the training set needs to be prepared. Our starting point is the following function in JavaScript whereas the other parts will be implemented while reading the article:

{{< highlight javascript >}}
import math from 'mathjs';

function init(matrix) {
  let X = math.eval('matrix[:, 1:2]', {
    matrix,
  });
  let y = math.eval('matrix[:, 3]', {
    matrix,
  });

  let m = y.length;

  // Part 1: Normal Equation
}
{{< /highlight >}}

The function signature has access to the matrix as argument which includes all the information of the training set. Each row represents one house in the training set and each column represents one feature of the house. Thus each vector in the matrix represents a feature vector. By extracting X and y from the matrix as sub matrix and vector, there is on one side the matrix X with all the features that are used for the prediction (size, number of bedrooms) and on the other side y with the outcome (price) of it. Apart from that, m represents the size of the training set (number of houses).

Before implementing the normal equation in JavaScript, the matrix X needs to add an intercept term. Only this way the matrix operations work for theta and X. Again, I recommend to take the machine learning course by Andrew Ng to understand the intercept term in matrix X to perform the normal equation.

{{< highlight javascript "hl_lines=15 17 20 21 22 23 24" >}}
import math from 'mathjs';

function init(matrix) {
  let X = math.eval('matrix[:, 1:2]', {
    matrix,
  });
  let y = math.eval('matrix[:, 3]', {
    matrix,
  });

  let m = y.length;

  // Part 1: Normal Equation

  X = math.concat(math.ones([m, 1]).valueOf(), X);

  let theta = normalEquation(X, y);
}

function normalEquation(X, y) {
  ...

  return theta;
}
{{< /highlight >}}

Now there comes the part of implementing the normal equation in JavaScript. You will be surprised that it isn't too much code, because it is only one mathematical expression that was already mentioned before.

{{< highlight javascript "hl_lines=2 3 4 5" >}}
function normalEquation(X, y) {
  let theta = math.eval(`inv(X' * X) * X' * y`, {
    X,
    y,
  });

  return theta;
}
{{< /highlight >}}

That's already it to compute theta with a normal equation. Now you can predict further housing prices based on your trained hypothesis.

{{< highlight javascript "hl_lines=7 8 9 10 11 13" >}}
function init(matrix) {

  ...

  // Part 2: Predict Price of 1650 square meter and 3 bedroom house

  let houseVector = [1, 1650, 3];
  let price = math.eval('houseVector * theta', {
    houseVector,
    theta,
  });

  console.log('Predicted price for a 1650 square meter and 3 bedroom house: ', price);
}
{{< /highlight >}}

Finally you can find the whole source code in this [GitHub repository](https://github.com/javascript-machine-learning/multivariate-linear-regression-normal-equation-javascript). If you liked it, make sure to star it.

<hr class="section-divider">

Hopefully the article was helpful to understand the differences between gradient descent and normal equation for a regression problem and to implement normal equation in JavaScript for a practical use case. If you have any suggestions for improvements, please comment below.