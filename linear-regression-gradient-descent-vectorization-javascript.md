+++
title = "Gradient Descent with Vectorization in JavaScript"
description = "An article guiding through the vectorized implementation of gradient descent in JavaScript by using matrix operations in a univariate regression problem ..."
date = "2017-11-21T09:50:46+02:00"
tags = ["Machine Learning", "JavaScript"]
categories = ["Machine Learning", "JavaScript"]
keywords = ["machine learning javascript", "linear regression javascript", "vectorized gradient descent javascript", "vectorization gradient descent javascript"]
news_keywords = ["vectorization gradient descent javascript"]
hashtag = "#JavaScript #MachineLearning"
card = "img/posts/linear-regression-gradient-descent-vectorization-javascript/banner_640.jpg"
banner = "img/posts/linear-regression-gradient-descent-vectorization-javascript/banner.jpg"
contribute = "linear-regression-gradient-descent-vectorization-javascript.md"
headline = "Gradient Descent with Vectorization in JavaScript"

summary = "The article guides you through implementing a vectorized implementation of gradient descent for a regression problem in JavaScript. You should be familiar with gradient itself by reading the introductory article before diving into this topic."
+++

{{% pin_it_image "vectorization gradient descent javascript" "img/posts/linear-regression-gradient-descent-vectorization-javascript/banner.jpg" "is-src-set" %}}

A recent article gave an introduction to the field of machine learning in JavaScript by [predicting housing prices with gradient descent](https://www.robinwieruch.de/linear-regression-gradient-descent-javascript/) in a univariate regression problem. It used plain mathematical expressions and thus made use of the **unvectorized implementation** of gradient descent and the cost function. This article takes it one step further by **implementing a vectorized gradient descent** in JavaScript. It will guide you through the process step by step. In the end, you will find the whole source code.

{{% machine-learning-intro %}}

{{% chapter_header "Why and what is vectorization?" "vectorization-explained" %}}

Gradient descent by nature is an iterative process. You take a number of iterations and let gradient descent do its thing by adjusting the theta parameters according to the partial derivative of the cost function. Thus there are a bunch of for loops in the algorithm when using the unvectorized implementation.

{{< highlight javascript >}}
for (let i = 0; i < ITERATIONS; i++) {
  for (let j = 0; j < m; j++) {
    thetaZeroSum += hypothesis(x[j]) - y[j];
    thetaOneSum += (hypothesis(x[j]) - y[j]) * x[j];
  }

  thetaZero = thetaZero - (ALPHA / m) * thetaZeroSum;
  thetaOne = thetaOne - (ALPHA / m) * thetaOneSum;
}
{{< /highlight >}}

There are a couple of shortcomings for the unvectorized implementation. First, extending the training set from a univariate to a multivariate training set. It wouldn't be too easy anymore to consider all the features n in matrix x. In the example x is only an array, but in a multivariate training set it would be a matrix. Second, in any event there needs to be a loop over the size m of the training set. It is computational inefficient, because it needs an iterative process to compute each theta parameter for each data point in the training set.

Isn't there a way to compute all theta parameters in one mathematical expression using the training set with all its data points m and all its features n and on the other hand the labels y? That's the point where [matrix operations](https://www.robinwieruch.de/linear-algebra-matrix-javascript/) come into play. They solve all the shortcomings from before: the implementation becomes simpler for multivariate training sets and it becomes computational efficient by omitting the loops.

{{% chapter_header "Vectorization in JavaScript" "vectorization-explanation-javascript" %}}

Imagine a training set about houses with the size of m (m = 50, each row a house) with features n (n = 1, size of a house). It can be expressed in a matrix. Furthermore, the label y (price of a house) can be expressed in a matrix too. If you would have a function in JavaScript, which arguments would have the whole training set in a matrix, you could split up the training set in the partial training set (matrix X) and the labels (matrix y).

{{< highlight javascript >}}
function init(matrix) {

  // Part 0: Preparation

  let X = math.eval('matrix[:, 1]', {
    matrix,
  });
  let y = math.eval('matrix[:, 2]', {
    matrix,
  });

  ...
}
{{< /highlight >}}

That way, you have already vectorized your data. Everything is represented in a matrix now. Next you can apply matrix operations rather than looping over the data. The concept will be used for the cost function and gradient descent in the next parts. Don't worry too much about the code yet, because you will get access to it in the end of the article to play around with it. Keep in mind to take the machine learning course on Coursera to learn about the algorithms yourself and revisit those articles of mine to implement them in JavaScript. Now, let's start by implementing the vectorized cost function.

{{% chapter_header "Vectorized Cost Function in JavaScript" "vectorized-cost-function-javascript" %}}

Before implementing the cost function in JavaScript, the matrix X needs to add an intercept term. Only this way the matrix operations work for theta and matrix X.

{{< highlight javascript "hl_lines=17 19 21 22" >}}
import {
  getDimensionSize,
  pushVector,
} from 'mathjs-util';

function init(matrix) {

  // Part 0: Preparation

  let X = math.eval('matrix[:, 1]', {
    matrix,
  });
  let y = math.eval('matrix[:, 2]', {
    matrix,
  });

  let m = getDimensionSize(y, 1);

  // Part 1: Cost

  // Add Intercept Term
  X = pushVector(X, 0, math.ones([m, 1]).valueOf());
}
{{< /highlight >}}

Now, let's implement the cost function. It should output the cost depending on input matrix X, output matrix y and the eventually trained parameters theta. The cost depends on theta, because X and y stay fixed as you have prepared those matrices before already. In addition, theta will be represented in a matrix to enable it for matrix operations. In the beginning, the theta parameters will have a random initial value such as -1 and 2 and thus the hypothesis being `h(x) => -1 + 2 * x`. No worries, they will be trained later on. Now they are only used to demonstrate the cost function.

{{< highlight javascript "hl_lines=5 7 8 10 11 14 15 16 17 18" >}}
function init(matrix) {

  ...

  // Part 1: Cost

  // Add Intercept Term
  X = pushVector(X, 0, math.ones([m, 1]).valueOf());

  let theta = [[-1], [2]];
  let J = computeCost(X, y, theta);
}

function computeCost(X, y, theta) {
  ...

  return J;
}
{{< /highlight >}}

The cost function returns the cost J. Now it needs only to compute the cost by using matrix operations. First, you can express the hypothesis with matrix multiplication by multiplying the matrix X of the training set with the parameters matrix theta.

{{< highlight javascript "hl_lines=2 4 5 6 7" >}}
function computeCost(X, y, theta) {
  let m = getDimensionSize(y, 1);

  let predictions = math.eval('X * theta', {
    X,
    theta,
  });

  ...

  return J;
}
{{< /highlight >}}

Second, the squared errors need to be computed too. It can be done in a element wise matrix operation to the power of 2.

{{< highlight javascript "hl_lines=9 10 11 12" >}}
function computeCost(X, y, theta) {
  let m = getDimensionSize(y, 1);

  let predictions = math.eval('X * theta', {
    X,
    theta,
  });

  let sqrErrors = math.eval('(predictions - y).^2', {
    predictions,
    y,
  });

  ...

  return J;
}
{{< /highlight >}}

And last but not least, computing the cost with the squared errors and the training set size m.

{{< highlight javascript "hl_lines=14 15 16 17" >}}
function computeCost(X, y, theta) {
  let m = getDimensionSize(y, 1);

  let predictions = math.eval('X * theta', {
    X,
    theta,
  });

  let sqrErrors = math.eval('(predictions - y).^2', {
    predictions,
    y,
  });

  let J = math.eval(`1 / (2 * m) * sum(sqrErrors)`, {
    m,
    sqrErrors,
  });

  return J;
}
{{< /highlight >}}

That's it. Now you are able to compute the cost depending on your parameters theta. When using gradient descent, the cost have to decrease with each iteration. You can compute a couple of costs by using random theta parameters before you have trained them.

{{< highlight javascript "hl_lines=13 14 15 17 18 20 21 22" >}}
function init(matrix) {

  ...

  // Part 1: Cost

  // Add Intercept Term
  X = pushVector(X, 0, math.ones([m, 1]).valueOf());

  let theta = [[-1], [2]];
  let J = computeCost(X, y, theta);

  console.log('Cost: ', J);
  console.log('with: ', theta);
  console.log('\n');

  theta = [[0], [0]];
  J = computeCost(X, y, theta);

  console.log('Cost: ', J);
  console.log('with: ', theta);
  console.log('\n');
}
{{< /highlight >}}

In the next part, you will implement the vectorized gradient descent algorithm in JavaScript.

{{% chapter_header "Vectorized Gradient Descent in JavaScript" "vectorized-gradient-descent-javascript" %}}

As you know, the gradient descent algorithm, takes a [learning rate and an optional number of iterations to make gradient descent converge](https://www.robinwieruch.de/improving-gradient-descent-javascript/). Even though the following part will show the vectorized implementation of gradient descent, you will still use a loop to iterate over the number of learning iterations.

{{< highlight javascript "hl_lines=9 10 11 13 16 17 18 19 20 21 22 23 24 25 26 27" >}}
function init(matrix) {

  ...

  // Part 1: Cost

  ...

  // Part 2: Gradient Descent
  const ITERATIONS = 1500;
  const ALPHA = 0.01;

  theta = gradientDescent(X, y, theta, ALPHA, ITERATIONS);
}

function gradientDescent(X, y, theta, ALPHA, ITERATIONS) {
  let m = getDimensionSize(y, 1);

  let thetaZero = theta[0];
  let thetaOne = theta[1];

  for (let i = 0; i < ITERATIONS; i++) {
    ...
  }

  return [thetaZero, thetaOne];
}
{{< /highlight >}}

The same as in the cost function, you have to define your hypothesis first. It is a vectorized implementation and thus you can use matrix operations.

{{< highlight javascript "hl_lines=8 9 10 11" >}}
function gradientDescent(X, y, theta, ALPHA, ITERATIONS) {
  let m = getDimensionSize(y, 1);

  let thetaZero = theta[0];
  let thetaOne = theta[1];

  for (let i = 0; i < ITERATIONS; i++) {
    let predictions = math.eval('X * theta', {
      X,
      theta: [thetaZero, thetaOne],
    });

    ...
  }

  return [thetaZero, thetaOne];
}
{{< /highlight >}}

Second, you can compute the parameters theta by using matrix operations as well. Here again I recommend you to take the machine learning course by Andrew Ng to find out how to come up with the equations. Basically the each theta is adjusted by subtracting the learning rate times the derivative of the cost function.

{{< highlight javascript "hl_lines=13 14 15 16 17 18 19 20 22 23 24 25 26 27 28 29" >}}
function gradientDescent(X, y, theta, ALPHA, ITERATIONS) {
  let m = getDimensionSize(y, 1);

  let thetaZero = theta[0];
  let thetaOne = theta[1];

  for (let i = 0; i < ITERATIONS; i++) {
    let predictions = math.eval('X * theta', {
      X,
      theta: [thetaZero, thetaOne],
    });

    thetaZero = math.eval(`thetaZero - ALPHA * (1 / m) * sum((predictions - y) .* X[:, 1])`, {
      thetaZero,
      ALPHA,
      m,
      predictions,
      y,
      X,
    });

    thetaOne = math.eval(`thetaOne - ALPHA * (1 / m) * sum((predictions - y) .* X[:, 2])`, {
      thetaOne,
      ALPHA,
      m,
      predictions,
      y,
      X,
    });
  }

  return [thetaZero, thetaOne];
}
{{< /highlight >}}

In addition, by looking at the mathematical expression, you can see why the intercept term in matrix X was added before. It is used for the thetaZero computation, but since it is only a element wise multiplication by one, you could leave it out.

{{< highlight javascript "hl_lines=13 14 15 16 17 18 19" >}}
function gradientDescent(X, y, theta, ALPHA, ITERATIONS) {
  let m = getDimensionSize(y, 1);

  let thetaZero = theta[0];
  let thetaOne = theta[1];

  for (let i = 0; i < ITERATIONS; i++) {
    let predictions = math.eval('X * theta', {
      X,
      theta: [thetaZero, thetaOne],
    });

    thetaZero = math.eval(`thetaZero - ALPHA * (1 / m) * sum(predictions - y)`, {
      thetaZero,
      ALPHA,
      m,
      predictions,
      y,
    });

    thetaOne = math.eval(`thetaOne - ALPHA * (1 / m) * sum((predictions - y) .* X[:, 2])`, {
      thetaOne,
      ALPHA,
      m,
      predictions,
      y,
      X,
    });
  }

  return [thetaZero, thetaOne];
}
{{< /highlight >}}

Alternatively, you can also exchange the element wise multiplication by using a transposed matrix for thetaOne.

{{< highlight javascript "hl_lines=21" >}}
function gradientDescent(X, y, theta, ALPHA, ITERATIONS) {
  let m = getDimensionSize(y, 1);

  let thetaZero = theta[0];
  let thetaOne = theta[1];

  for (let i = 0; i < ITERATIONS; i++) {
    let predictions = math.eval('X * theta', {
      X,
      theta: [thetaZero, thetaOne],
    });

    thetaZero = math.eval(`thetaZero - ALPHA * (1 / m) * sum(predictions - y)`, {
      thetaZero,
      ALPHA,
      m,
      predictions,
      y,
    });

    thetaOne = math.eval(`thetaOne - ALPHA * (1 / m) * sum((predictions - y)' * X[:, 2])`, {
      thetaOne,
      ALPHA,
      m,
      predictions,
      y,
      X,
    });
  }

  return [thetaZero, thetaOne];
}
{{< /highlight >}}

Either way, by iterating over your defined number of iterations for letting gradient descent converge, you will train your parameters theta and thus your hypothesis function to make future predictions of housing prices. Checkout the [GitHub repository](https://github.com/javascript-machine-learning/univariate-linear-regression-gradient-descent-javascript) with all the source code. Don't forget to star it, if you liked it.

<hr class="section-divider">

Hopefully the article was helpful for you to make the leap from a unvectorized to a vectorized implementation of gradient descent in JavaScript for a regression problem. I am grateful for any give feedback, so please comment below. If you want to take it one step further, you can try out to make the leap [from a univariate to a multivariate training set](https://www.robinwieruch.de/multivariate-linear-regression-gradient-descent-javascript) in the next article.