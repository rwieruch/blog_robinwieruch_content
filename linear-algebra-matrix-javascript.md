+++
title = "Linear Algebra in JavaScript with Matrix Operations"
description = "How to use matrix operations from linear algebra in JavaScript. What are inverse, transpose and identity matrices and how can they help in machine learning ..."
date = "2017-10-23T13:50:46+02:00"
tags = ["Machine Learning", "JavaScript", "Node"]
categories = ["Machine Learning", "JavaScript", "Node"]
keywords = ["matrix javascript", "matrix math.js"]
news_keywords = ["matrix javascript"]
hashtag = "#JavaScript"
card = "img/posts/linear-algebra-matrix-javascript/banner_640.jpg"
banner = "img/posts/linear-algebra-matrix-javascript/banner.jpg"
contribute = "linear-algebra-matrix-javascript.md"
headline = "Linear Algebra in JavaScript with Matrix Operations"

summary = "A little refresher about matrix operations (addition, subtraction, multiplication and division) in linear algebra and  about the different types of matrices: inverse and transpose matrices, and the identity matrix. The article applies those learnings in JavaScript. Furthermore, in the end of the article, there will be an example to demonstrate why matrices are beneficial for computations in machine learning."
+++

{{% pin_it_image "matrix javascript" "img/posts/linear-algebra-matrix-javascript/banner.jpg" "is-src-set" %}}

When I recently started to dive into the topic of machine learning, I had to relearn all the things I have studied about linear algebra, stochastic and calculus at school and university. I took a little refresher on matrix operations (addition, subtraction, multiplication and division) in linear algebra and learned about the different types of matrices again: inverse and transpose matrices, and the identity matrix. The article applies those learnings in JavaScript. Furthermore, in the end of the article, there will be a little example to demonstrate why matrices are beneficial for computations in machine learning.

{{% chapter_header "Matrix Operations in JavaScript" "matrix-javascript" %}}

A matrix is just an array in an array when programming with them. In JavaScript they can be simply expressed as:

{{< highlight javascript >}}
const matrix = [
  [0, 1],
  [2, 3],
  [4, 5],
];
{{< /highlight >}}

whereas m equals the row and n equals the column of a matrix[m][n]. You would be able to apply matrix operations in JavaScript on your own, but it can become ugly when using plain JavaScript. Fortunately, there is one library in JavaScript for mathematics: {{% a_blank "math.js" "https://github.com/josdejong/mathjs" %}}. Defining a matrix becomes as simple as:

{{< highlight javascript >}}
const matrix = math.matrix([[0, 1], [2, 3], [4, 5]]);
{{< /highlight >}}

You can get its dimension by using the `size()` method and its value as array with the `valueOf()` method. Furthermore, you can apply matrix operations such as addition, subtraction, multiplication and division:

{{< highlight javascript >}}
const matrixA = math.matrix([[0, 1], [2, 3], [4, -5]]);
const matrixB = math.matrix([[1, -1], [-2, 4], [-7, 4]]);

// addition
const matrixAdditionAB = math.add(matrixA, matrixB);
// [ [ 1, 0 ], [ 0, 7 ], [ -3, -1 ] ]

// subtraction
const matrixAdditionAB = math.subtract(matrixA, matrixB);
// [ [ -1, 2 ], [ 4, -1 ], [ 11, -9 ] ]

// multiplication
const matrixK = math.matrix([[0, 1], [2, 3], [4, 5]]);
const matrixL = math.matrix([[2, 4], [6, 2]]);

const matrixKL = math.multiply(matrixK, matrixL);
// [ [ 6, 2 ], [ 22, 14 ], [ 38, 26 ] ]

// division
const matrixY = math.matrix([[0, 2], [2, 4], [4, 6]]);
const matrixZ = math.matrix([[2, 1], [2, 2]]);

const matrixYZ = math.divide(matrixY, matrixZ);
// [ [ -2, 2 ], [ -2, 3 ], [ -2, 4 ] ]
{{< /highlight >}}

In addition, you can perform matrix scalar multiplication and division.

{{< highlight javascript >}}
// matrix scalar multiplication
const matrixG = math.matrix([[0, 1], [2, 3], [4, -5]]);

const matrixG3 = math.multiply(3, matrixG);
// [ [ 0, 3 ], [ 6, 9 ], [ 12, -15 ] ]

// matrix scalar division
const matrixH = math.matrix([[2, 4], [6, 2], [4, -4]]);

const matrixH2 = math.divide(matrixH, 2);
// [ [ 1, 2 ], [ 3, 1 ], [ 2, -2 ] ]
{{< /highlight >}}

Since a vector is only a specific form of a matrix, you can perform matrix-vector multiplication as well.

{{< highlight javascript >}}
const matrixI = math.matrix([[0, 1], [2, 3], [4, 5]]);
const vectorJ = math.matrix([[2], [1]]);

const vectorIJ = math.multiply(matrixI, vectorJ);
// [ [ 1 ], [ 7 ], [ 13 ] ]
{{< /highlight >}}

There is another operation which you would use to have an element-wise multiplication or division in JavaScript by using `math.dotMultiply(matrixI, vectorJ);` or `math.dotDivide(matrixY, matrixZ)`. Otherwise, when using the default operators on matrices with math.js, you will apply matrix operations.

After all, dealing with matrices in math.js isn't that difficult anymore. But you have to know the dimensions of each matrix in your operation, because not every matrix operates on another matrix. Another good thing to know are the associative and commutative matrix operations.

{{% chapter_header "Is matrix multiplication associative and commutative?" "matrix-associative-commutative-javascript" %}}

There are two important properties for matrix multiplication. First, matrix multiplication is not commutative: A x B != B x A.

{{< highlight javascript >}}
const matrixN = math.matrix([[0, 1], [2, 3]]);
const matrixO = math.matrix([[2, 4], [6, 2]]);

const matrixNO = math.multiply(matrixN, matrixO);
const matrixON = math.multiply(matrixO, matrixN);

console.log('Is matrix multiplication commutative?');
console.log(math.equal(matrixNO.valueOf(), matrixON.valueOf()));
// false
{{< /highlight >}}

Second, matrix multiplication is associative: A x (B x C) == (A x B) x C.

{{< highlight javascript >}}
const matrixP = math.matrix([[0, 1], [2, 3], [4, 5]]);
const matrixQ = math.matrix([[2, 4], [6, 2]]);
const matrixR = math.matrix([[5, 2], [2, -2]]);

const matrixPQ_R = math.multiply(math.multiply(matrixP, matrixQ), matrixR);
const matrixP_QR = math.multiply(matrixP, math.multiply(matrixQ, matrixR));

console.log('Is matrix multiplication associative?');
console.log(math.equal(matrixPQ_R.valueOf(), matrixP_QR.valueOf()));
// true
{{< /highlight >}}

These matrix multiplication properties should be internalized before making any further more complex operations on matrices.

{{% chapter_header "Transpose and Inverse and the Identity Matrix in JavaScript" "matrix-transpose-inverse-identity-javascript" %}}

There are a couple of other matrix operations and matrix types in linear algebra. First, the Identity (I) Matrix with the dimension i * j is defined as i-dimensional matrix whereas i == j. The following matrix is an identity matrix.

{{< highlight javascript >}}
const matrix = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];
{{< /highlight >}}

In math.js you can use the `eye(i)` method to generate those with the dimension of i.

{{< highlight javascript >}}
const matrixI3 = math.eye(3);
// [ [ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ] ]
{{< /highlight >}}

Identity matrices are used later on for more sophisticated matrix operations. Used with another matrix in a matrix operation, identity matrices are a special case because they are commutative: A x I == I x A.

Another type of matrix is the transposed matrix. It is a matrix where the dimensions are flipped. Basically the rows become columns and the columns become rows. In the following example, the vector becomes a so called row vector.

{{< highlight javascript >}}
const matrixV = math.matrix([[0], [1], [2]]);

const matrixV_T = math.transpose(matrixV);
// [ [ 0, 1, 2 ] ]
{{< /highlight >}}

Last but not least, matrices can have an inverse A' but not all matrices (called singular or degenerate) have one. You can find the inverse of a matrix by using the identity matrix: A(A') = (A')A = I.

{{< highlight javascript >}}
const matrixT = math.matrix([[0, 1], [2, 3]]);
const matrixU = math.eye(2);

const matrixT_I = math.divide(matrixU, matrixT);
// [ [ -1.5, 0.5 ], [ 1, -0 ] ]
{{< /highlight >}}

Math.js gives you the inverse operation for free. You can use the same matrix from the previous example and call the `inv()` method on it.

{{< highlight javascript >}}
const matrixS = math.matrix([[0, 1], [2, 3]]);

const matrixS_I = math.inv(matrixS);
// [ [ -1.5, 0.5 ], [ 1, -0 ] ]
{{< /highlight >}}

In the end, regardless of the programming language you are using, you will find one powerful math library such as math.js to apply all of these operations.

{{% chapter_header "How to apply those learnings in Machine learning?" "matrix-machine-learning-javascript" %}}

The previous learnings gave a basic understanding of linear algebra with matrices used in JavaScript. How does it help us in machine learning? You can take the example of [linear regression](https://www.robinwieruch.de/linear-regression-gradient-descent-javascript). Matrix operations can be used to make linear regression simpler to execute and computational efficient. But also other machine learning algorithms in the future. For instance, when having three (trained) **competing hypotheses** functions for a linear regression, it becomes simple with matrices to calculate their results.

{{< highlight javascript >}}
// Predicting Housing Prices with 3 competing Hypotheses

// const HOUSE_SIZES = [2104, 1416, 1534, 852];

// const h1 = x => -40 + 0.25 * x;
// const h2 = x => 200 + 0.1 * x;
// const h3 = x => -150 + 0.4 * x;

const houseSizeMatrix = math.matrix([
  [1, 2104],
  [1, 1416],
  [1, 1534],
  [1, 852],
]);

const hypothesesMatrix = math.matrix([
  [-40, 200, -150],
  [0.25, 0.1, 0.4],
]);

const competingResults = math.multiply(houseSizeMatrix, hypothesesMatrix);

// Column: Result for each Hypothesis
// Row: Result for each House Size

// [
//  [ 486, 410.4, 691.6 ],
//  [ 314, 341.6, 416.4 ],
//  [ 343.5, 353.4, 463.6 ],
//  [ 173, 285.2, 190.8 ],
// ]
{{< /highlight >}}

You can put these things in matrices now, rather than executing every function on its own. A loop becomes one matrix operation. On a higher level you can say that a unvectorized implementation becomes a vectorized implementation. Thus is becomes computational efficient when performing machine learning algorithms and simpler as well. Furthermore, these matrix operations are used in a **normal equation** which is used as an alternative to gradient descent.

<hr class="section-divider">

In conclusion, I hope the walkthrough about matrices applied in JavaScript was helpful to get started in the linear algebra in JavaScript or as foundation for machine learning in JavaScript. You can checkout the {{% a_blank "GitHub repository" "https://github.com/rwieruch/linear-algebra-matrix" %}} with executable matrix operations on the command line.
