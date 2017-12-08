+++
title = "A Web Developer's Guide to Machine Learning in JavaScript"
description = "A comprehensive walkthrough for machine learning in JavaScript. As I started to learn about AI, deep learning (DL) and machine learning (ML) ..."
date = "2018-12-01T04:50:46+02:00"
tags = ["Machine Learning", "JavaScript"]
categories = ["Machine Learning", "JavaScript"]
keywords = ["machine learning javascript", "ai javascript", "deep learning javascript"]
news_keywords = ["machine learning javascript"]
hashtag = "#JavaScript #MachineLearning"
card = "img/posts/machine-learning-javascript-web-developers/banner_640.jpg"
banner = "img/posts/machine-learning-javascript-web-developers/banner.jpg"
contribute = "machine-learning-javascript.md"
headline = "A Web Developer's Guide to Machine Learning in JavaScript"

summary = "The article guides you through implementing Machine Learning in JavaScript. The article can be used as introduction to machine learning in JavaScript and as entry point to a whole blog post series."
+++

{{% pin_it_image "learn machine learning" "img/posts/machine-learning-javascript-web-developers/banner.jpg" "is-src-set" %}}

Recently, I was wondering how I could escape the web development bubble for a while. 2017 was full of React, Redux and MobX in JavaScript where I have written actively about those topics on my blog, developed small ([1](https://github.com/rwieruch/favesound-redux), [2](https://www.robinwieruch.de/how-to-build-your-own-course-platform/), [3](https://github.com/rwieruch/open-crowd-fund), ...) and {{% a_blank "large scale applications" "https://www.small-improvements.com/features/?ref=robinwieruch.de" %}} based on them, {{% a_blank "self-published two educational ebooks" "https://leanpub.com/u/rwieruch" %}}, and implemented a {{% a_blank "course platform" "https://roadtoreact.com/" %}} with those technologies to teach others about them. The last year was all about those subjects, so I needed a side project to escape it for a while and to get into a zen mode of learning again.

**How did I get to machine learning?** A couple of months ago, I started to listen to the {{% a_blank "Machine Learning Guide podcast" "http://ocdevel.com/podcasts/machine-learning" %}}. I found out about it by chance and highly recommend it to get you an introduction for machine learning. Even though I didn't actively plan about learning ML, it was interesting to hear about all those foreign concepts. There it was again; this excitment when everything is unexplored. I felt like a whole new world in tech opened up for me. It was the same feeling when [I finally got the foot into web development](https://www.robinwieruch.de/what-is-an-api-javascript/).

As I read about a couple of machine learning articles, the course on {{% a_blank_no_follow "Machine Learning by Andrew Ng" "https://click.linksynergy.com/link?id=yL1MQRWYyXQ&offerid=467035.1560515719&type=2&murl=https%3A%2F%2Fwww.coursera.org%2Flearn%2Fmachine-learning" %}} was the by far most recommended to get started in machine learning. I have never taken an online course from start to end before, even though I actively give these online courses myself, but I decided to give it a shot this time. Fortunately, the course had started one week ago. So I enrolled in it a couple of weeks ago and by now finished it. It's a blast and I recommend everyone who wants to get into ML to take it. But more about it later.

After university, I immediatly took a job to work on a large scale application in JavaScript. So I never had the chance to apply most of my technical and mathematical learnings that I learned at university. Yet it was great to grow in web development and JavaScript over the last years and I don't want to miss that time. But when I started to learn about machine learning, it was a pleasure to cram out all the learnings in math from university. Suddenly I had a use case where it would make sense to take the derivative of a function: gradient descent. Why aren't schools and universities showing these real world use cases in a simplified version to motivate their students? Learning all the theoretical things is fine, but when you finally apply the derivative for an optimization problem, it becomes exciting.

**So why is this article about machine learning in JavaScript?** If you are coming from web development as I do, you might know how difficult it can be to make the step over to another domain such as machine learning. It comes with its own constraints. Not only the whole domain with its algorithms is different, but also its programming languages suited for machine learning paired with mathmatical concepts from linear algebra, calculus and statistics. Personally, I found it an interesting strategy to boil down the different learning parts in machine learning: algorithms, programming languages (e.g. Python) and mathematical concepts. When I looked at those, I knew that I would definetly have to learn about the machine learning algorithms themselves and the underlying mathmatical concepts. But I could strip out the best suited machine learning programming language and replace it with a language where I feel most efficient: JavaScript.

The following article should give you a **gentle introduction to machine learning from a web developer's perspective**. It should show you the opportunies in the field of machine learning and why it could be an advantage to learn about those things with JavaScript as a web developer. Furthermore, it should give you guidance on how to approach the topic without learning everything from scratch. You can leverage the implementation details in JavaScript and focus on the theoretical parts: algorithms and mathematics.

{{% chapter_header "Machine Learning in JavaScript?" "machine-learning-javascript" %}}

By now I can hear the crowd yelling: JavaScript is not suited for machine learning. You may be right. But there are a couple of things why JavaScript could actually make sense to learn about machine learning as a web developer. And maybe not only as a web developer.

As mentioned before, you might be already proficient in JavaScript. You don't have to learn another programming lanagauge from scratch. You can apply the theoretical parts of machien learning in any language. So why not JavaScript? Then you only have to learn about the theoretical parts in ML by applying the implementatio details in JavaScript in the early stages. Afterward, you can always switch to another language for machine learning. Nobody takes that away from you. But you decide how to break down the learning paths for deploying your own learning curve and experience. You keep the overwhelming amount of thigns to learn to a minimum and thus might be better off to stay in a [state of flow](https://www.robinwieruch.de/lessons-learned-deep-work-flow/) by keeping challenges ahead and your level of skill in balance.

JavaScript is evolving with a rapid speed. It is applied in several domains by now where nobody would have seen it a couple of years ago. You can see it on {{% a_blank "mobile devices" "https://facebook.github.io/react-native/" %}}, {{% a_blank "desktop applications" "https://electronjs.org/" %}}, {{% a_blank "embedded systems" "https://tessel.io/" %}} and of course {{% a_blank "backend applications" "https://nodejs.org/en/" %}}. It's not all about web development anymore. So why not machine learning? Maybe it is only used as **a bridge for web developer entering the field of machine learning** but using a better suited programming language afterward. Maybe it becomes computaitonal and implementation-wise efficient to write machine learning algorithms in JavaScript eventually. Or maybe it is just a great way of applying machine learning directly in the browser. Nobody knows, but I want you to think about these possibilities.

{{% pin_it_image "javascript domains" "img/posts/machine-learning-javascript-web-developers/javascript-domains.jpg" "" %}}

**But what about the performance?** Machine learnign algorithms are highly dependent on performance. Often they are using so called vectorized implementations to stay computational efficient. Graphical computations performed by the GPU are similary used (image taken from webgltutorials.org). That's what makes C++ as a programming language so interesting for machine learning. Therefore, one would assume that JavaScript itself is not the best suited programming language. However, with {{% a_blank "WebGL" "https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API" %}} becoming popular for GPU accelarates executions in the browser, it is utilizied for recent machine learnign libraries in JavaScript too.

<div class="row">
  <div class="col-xs-8 col-centered">
    {{% pin_it_image "vectorization implementation" "img/posts/machine-learning-javascript-web-developers/webgl-pipeline.png" "" %}}
  </div>
</div>

Another concern exists regarding the training phase. Why should it happen in the browser at all even though it is supported by the GPU? In highly efficient machine learning architectures the computation is offloaded to distributed systems. But there again, recent machine learning libraries for JavaScript are used for the inferenced phase and not the training phase in the browser. The model comes from a TensorFlow server and is only used for further predictions and visualizations in the browser (client). So why shouldn't it be possible to offer a framework around this interplay of training phase backend and inference phase frontend?

One big argument against machine learning in JavaScript is its lack of libraries. But that's not true anymore. There are a bunch of libraries helping you out. For instance, consider a couple of programming languages in machine learning and the areas where they are primarily used:

* **Math**: Matlab, Octave, Julia, R
* **Data Analysis**: R
* **Data Mining**: Scala, Java (e.g. Hadoop, Spark, Deeplearning4j)
* **Server**: [*]
* **Performance**: C/C++ (e.g. GPU accelarated)

Next, you can see why Python makes so much sense in machine learning. It has a suitable set of libraries for the different tasks assigned to the programming languages from above:

* **Math**: numpy
* **Data Analysis**: Pandas
* **Data Mining**: PySpark
* **Server**: Flask, Django
* **Performance**:
  * TensorFlow (because it is written with a Python API over a C/C++ engine)
  * Keras (sits on top of TensorFlow)

So yeah, it seems like that it just makes sense to use Python for machine learning. But the JavaScript ecosystem offers a rich set of libraries suited for those tasks too. Because most of them are not only used in machine learning, the JS ecosystem developed a couple of sophisticated solutions beforehand:

* **Math**: math.js
* **Data Analysis**: d3.js
* **Data Mining**: ?
* **Server**: node.js (express, koa, hapi)
* **Performance**:
  * deeplearn.js (e.g. GPU accelerated via WebGL API in the browser)
  * Keras.js

Except for the last libraries, deeplearn.js and keras.js, none of the others are strictly related to machine learning. They were developed independelty. So JavaScript isn't anywhere behind the sophisticated programming languages when it comes to the toolset. Furthermore, in the recent time there were a couple of interesting libraries released or announced for machine learning (algorithms) in JavaScript.

* [deeplearn.js](https://deeplearnjs.org): The library released by Google is GPU accelerated via WebGL API and used for predicitions by using trained models in inference mode in the browser but also the training mode itself. It mirrors the API of the popular {{% a_blank "TensorFlow" "https://www.tensorflow.org/" %}} library which is developed by Google as well.

* [TensorFire](https://tenso.rs/) and [Keras.js](https://github.com/transcranial/keras-js): Yet another pair of two GPU accelerated libraries which are used for pre-trained models in inference mode. They allow you to write your models in {{% a_blank "Keras" "https://keras.io/" %}} / TensorFlow with Python and to deploy them to the web.

Only 2017 brought up those exciting and promising libraries. So I am curious what 2018 will offer us. Of course, there are a lot of older liobraries in JavaScript implementing machine learnign algorithms. But most of them lack the performance given by WebGL in the browser and are not maintained anymore.

* {{% a_blank "ConvNetJS" "https://github.com/karpathy/convnetjs" %}} (Convolutional Neural Networks)
* {{% a_blank "Brain.js" "https://github.com/harthur/brain" %}} (Neural Networks)

As you can see, there are plenty of concerns arguing against JavaScipt as your programming language to get started in machien learning. However, most of these reasons are not as much valid anymore as they were a couple of years ago. JavaScript is evolving and thus its capabilities of applying machien learning with it. In can be only the bridge for you to learn about machine learning in the first place. Afterward, learn a more suited programming language for it. But then you have onyl to learn the programming language without worrying too much about the machien learning part anymore.

{{% chapter_header "Machine Learning as an Opportunity for Web Developer" "machine-learning-javascript" %}}

I made my own motivation clear in the beginning of this article. However, that's not all to the story. THere are plenty of reasons and opportunities to dive into machien learning as web developer.

First of all, it is always an opportunity to broaden ones horizon. It doesn't only apply to machine learning. But whenever you feel you are getting too comfortable, take it as opportunity to learn something new. You don't need to take the practical way of implementing machine learning algorithms in JavaScript, maybe only learnign about the math and the alogithms on a theorical level suffices for you. After all, you keep your mind sharp by learning.

Second, there are plenty of job opportunities out there in the domain of machine learning. Sure, it is a overly hyped topic in the moment, but not without any reason. Students and researcher in the field are hired straight away from university. There seems to be a huge demand in the general fields of AI, data analysis and machine learning. {{% a_blank "Bootcamps are popping up or shift their focus to data science" "https://www.switchup.org/research/best-data-science-bootcamps" %}}. See it as opportunity to take one step beyond web development and maybe to a wider range of job opportunities. Perhaps the market in web development paired with machine learning grows in the next years. But even if it doesn't, you can learn a programming language suited for machine learnign to apply all your theoretical learnings in it. After all, {{% a_blank "maybe there comes the time when web developers have to make an important decision" "https://medium.com/@TebbaVonMathenstien/are-programmers-headed-toward-another-bursting-bubble-528e30c59a0e" %}} to get into a different domain than web development. So why shouldn't it be machine learning?

{{% pin_it_image "javascript domains" "img/posts/machine-learning-javascript-web-developers/machine-learning-trend.jpg" "" %}}

Third, even though JavaScript faciliates a lot of utility libraries for machine learning, there is plenty of space for innovations in the domain. In general, there is a lot of fuzz about JavaScript fatigue. Basically it happens because there is every day another published library on {{% a_blank "npm" "http://www.modulecounts.com/" %}} which is featured on tech related forums. But most of them are not taking any serious innovative step. Which isn't bad at all, but there are several node packages just mimicking other ones. They don't add too much value. On the other hand, there is enough room for open source combining machine learning and JavaScript. You could contribute to widen the bridge for web developers to enter the field of machine learning. Furthermore, beyond open source, there are many business related opportunities in the combination of JS and ML.

Last but not least, there is great effort involved on the side of the machine learners (e.g. deeplearn.js, TensorFire, Keras.js) to enable machine learning in the browser. However, most often the documentation is suited for machine learners entering the web developer domain. It comes with a lot of fundametnal machine learning knowledge which isn't taught along the way. In return, it makes it difficult for web developers to enter the machine learning domain. Thus there is a great opportunity to pave the way for web developers into the domain of machine learning by making those fundamental topics and ported libraries accessible in an educational way. That's the point where I try to tie in my knowledge in teaching. I want to give you the guidance if you are keen to enter the field of machine learning as web developer.

{{% chapter_header "Introduction to Machine Learning" "machine-learning-introduction" %}}

If you are familiar with the machine learning topic, feel free to skip this section! Entering the field of machine learning as a newcomer can be a buzzword heavy experience. Where should you start? There is so much terminolgy to clarify in the beginning. Is it **AI or machine learning**? What's all the recent buzz about **deep learning**? And from not far apart, **data analysis** is participating in the topic.

<div class="row">
  <div class="col-xs-8 col-centered">
    {{% pin_it_image "machine learning buzzwords" "img/posts/machine-learning-javascript-web-developers/machine-learning-buzz.jpg" "" %}}
  </div>
</div>

Let's start our journey with {{% a_blank "AI (artificial intelligence)" "https://en.wikipedia.org/wiki/Artificial_general_intelligence" %}}. *"It is the intelligence of a machine that could successfully perform any intellectual task that a human being can."* There is a great analogy in the *Machine Learning Guide* podcast to convey the entropy of AI: Whereas the goal of the industrial revolution was it to simulate the physical body through robotics, it is the goal of AI to simulate the brain for mental tasks through algorithms. So how does machine learning relate to AI? Let's have a look at the subfields of AI:

* searching and planning (e.g. playing a game with possible actions)
* reasoning and knowledge representation (structuring knowledge to come to conclusions)
* perception (vision, touch, hearing)
* ability to move and manipulate objects (goes into robotics)
* natural language processing (NLP)
* learning

The last one represents machine learning. As you can see, it is only a subfield of AI. However, it might be the only essential core fragment of AI because it reaches into the other subfields of AI. It reaches into them even more over time. For instance, vision subfield becomes more of an field for {{% a_blank "applied machine learnign" "http://www.themtank.org/a-year-in-computer-vision" %}} where other techniques, e.g. domain specific algotithms, dominated the domain in the the past. Now often deep neural networks are used for the domain. So what are applicable domains of AI and therefore most often machine learning? A bunch of domains and examples:

* Image Recognition (see referenced linke above)
* Web (e.g. Search Engines, Spam Filters)
* Art (e.g. {{% a_blank "Painting" "https://github.com/jcjohnson/neural-style" %}})
* Autonomous Vehicles (e.g. {{% a_blank "Tesla Autopilot" "https://www.tesla.com/autopilot" %}}, awareness comes up for {{% a_blank "Robots in Warfare" "https://www.theguardian.com/technology/2017/aug/20/elon-musk-killer-robots-experts-outright-ban-lethal-autonomous-weapons-war" %}})
* Medical Diagnosis
* Playing Games (e.g. {{% a_blank "Go" "https://www.youtube.com/watch?v=9xlSy9F5WtE" %}}, {{% a_blank "StarCraft" "https://deepmind.com/blog/deepmind-and-blizzard-open-starcraft-ii-ai-research-environment/" %}})

So machine learning is a subfield of AI. Let's dive into the subject itself. There are a couple of great defintions for machine learning, yet when I started out with the subject, I found the one by Arthur Samuel (1959) most memorable: *"The field of study that gives computers the ability to learn without being explicitly programmed."* How does it work in layman's terms? Basically machine learning can be grouped into three categories: **supervised learning, unsupervised learning and reinforcemant learning**. It's quite an evolution from the former to the latter. Whereas the former is more concrete, the latter becomes more abstract (yet exciting and unexplored). The former, supervised learning, gives the best entry point to machine learning and is used therefore in several educational machine learning courses to get into the field. In supervised learning, an algorithm is trained to recognize a pattern in a given data set. The data set is split up into input and outpout data points. The algorithm is trained to map input to output by learning with the given data set (**training phase**). Afterward, when the algorithm is trained eventually, it can be used to make predictions for future input data points to come up with output data points (**inference phase**). During the training phase, a **cost function** estimates the performance of the current algorithm and adjusts its parameters based on those reflections (penalization). The algorithm itself can be simplified into a simple function to map an input x to an ouput y and is also called **hypothesis**.

Prediciting housing prices in Portland is one popular machine learning problem for supervised learning. Given a data set of houses whereas each house has a size in square meter (x), the price (y) of the house should be predicted. Thus the data set consists a list of sizes and prices for houses. It is called a training set. Each row in the training set represents a house. The input x, in this case the size of the house, is called a feature of the house. Since there is only one feature for the houses in the trainign set, it is called a **univariate** training set. If there are more features for a house, such as number of bedrooms and size, it becomes a **multivariate** training set. Increasing the size of the trainign size (m) and the size of features (n) can lead to an improved prediction of y whereas y is called a **label**. In a nutshell, a hypothesis is trained with a penalizing cost function to predict labels from features.

Tom Mitchell (1998): *"A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E."*

The previous use case of prediciting housing prices in Portland is called a **regression problem**. A **linear regression**, as explained before, can be used to train the hyptohesis to output **continuous values** (e.g. housing prices). Another problem in the area of supervised learning to be solved is called **classification problem** where a **logistic regression** is used to output **categorical values**. For instance, imagine you have a trainign set with information about T-shirts. The features, such as width and height, can be used to make predicticions for the categorical sizes X, M and L.

{{% pin_it_image "machine learning classification problem vs regression problem" "img/posts/machine-learning-javascript-web-developers/regression-vs-classification-problem.jpg" "" %}}

The previous paragraphs were a first glimpse on supervised learning in machine learning. How does unsupervised learning work? Basically there is a given training set with features but no labels y. The algorithm is trained without any given output data in the training set. And last but not least, what about reinforcemtn learning? In reifnrocement learning the algorithm is trained without any given data. It learns from experience by reapting a process. For instance, take this {{% a_blank "flappy bird" "https://github.com/xviniette/FlappyLearning" %}} which learns to win the game by using neural networks in reifnrcement learning.

{{% pin_it_image "machine learning hierarchy" "img/posts/machine-learning-javascript-web-developers/machine-learning-hierarchy.jpg" "" %}}

Last but not least, there might be another question popping up in your head: **What's the relationship of data science to machine learning?** Data science is often associated with machine learning. So one could argue that machine learning bleeds into both domains: data science and artifical intelligence. However, data science has its own subfields such as data mining and data analysis. It can often be used coupled to machine learning, because data mining enables an algorithm to learn from mined data and data analysis enables researchers to study the outcome of the trained algorithm.

{{% pin_it_image "machine learning venn diagram" "img/posts/machine-learning-javascript-web-developers/machine-learning-venn.jpg" "" %}}

That was a broad introduction to the field of machine learning. If you are interested in those topics related to JavaScript, keep an eye on my website, courses and newsletter the next months. I hope to cover a few topics to give people guidance entering the field as web developers.

{{% chapter_header "How to learn Machine Learning as Web Developer" "machine-learning-resources" %}}

There are a bunch of resources that I want to recommend for web developers entering the field of machine learning. As for myself, I wanted to stimulate my senses for at least 12 weeks. That's how long it is said to complete Andrew Ng's machine learning course. Keep in mind that it's my personal roadmap and it might not be suited for everyone. But it helped me a lot following a strict routine and having enough learning material along the way. So it might help other web developers too.

If you just want to get a feeling for the topic, start to listen to the {{% a_blank "Machine Learning Guide" "http://ocdevel.com/podcasts/machine-learning" %}} up to episode 11. Tyler Renelle has done an amazing job giving an introduction to the topic. Since it is a podcast, just give it a shot while you exercise in a gym. That's in general a great way to approach the topic to keep your mind sharp in between the learning sessions.

If you start to get excited, the next step would be to enroll in the {{% a_blank_no_follow "machine learning course" "https://click.linksynergy.com/link?id=yL1MQRWYyXQ&offerid=467035.1560515719&type=2&murl=https%3A%2F%2Fwww.coursera.org%2Flearn%2Fmachine-learning" %}} which goes for 12 weeks. It takes you on a long journey from shallow machine learning algorithms to neural networks, from regression problems to clustering problems and from theoretical knowledge in the field to applied implementations in Octave or Matlab. It is intense and challenging, but you can do it by dedicating a couple of hours each week to the course and the exercises.

The machine learning course goes from linear regression to neural networks in 5 weeks. In the end of week 5, I was left with an overwhelming feeling. It was a combination of "Can week 6 become even more complex?" and "Wow, this course taught me all the building blocks to implement a neural network from scratch". Andrew gives a perfect walkthrough to learn about all these concepts which build up on one another. After all, machine learning has a lot in common with the composition of functions from functional programming. But you will learn about this yourself.

Along the way, I did all the weekly assignments and solved them in Octave. I am not allowed yet to publish them because of the code of conduct of Coursera. However, I implemented all the algorithms in JavaScript as well, as exercise for myself and as estimation how feasible it is to implement them in a different language not supposingly not suited for machine learning but suited for web developers. It worked and I published all of them in a open {{% a_blank "GitHub organization" "https://github.com/javascript-machine-learning" %}}. But that's not everthing to the story. I wrote about each topic as well to internalize my own learnings, to get guidance from others, but also to help web developers entering the field. So if you are doing the course, check out the JavaScript implementations and walkthroughs along the way.

* [Linear Regression with Gradient Descent in JavaScript](https://www.robinwieruch.de/linear-regression-gradient-descent-javascript/)
* [Improving Gradient Descent in JavaScript](https://www.robinwieruch.de/improving-gradient-descent-javascript/)
* [Gradient Descent with Vectorization in JavaScript](https://www.robinwieruch.de/linear-regression-gradient-descent-vectorization-javascript/)
* [Multivariate Linear Regression, Gradient Descent in JavaScript](https://www.robinwieruch.de/multivariate-linear-regression-gradient-descent-javascript/)
* [Linear Regression with Normal Equation in JavaScript](https://www.robinwieruch.de/multivariate-linear-regression-normal-equation-javascript/)
* [Logistic Regression with Gradient Descent in JavaScript](https://www.robinwieruch.de/logistic-regression-gradient-descent-classification-javascript/)
* [Neural Networks in JavaScript with deeplearn.js](https://www.robinwieruch.de/neural-networks-deeplearnjs-javascript)

It's not comprehensive yet, for instance the neural network implementation from scratch in JavaScript is missing, but I hope to complete all the bare bones algorithms from the course in JavaScript. The neural network implementation is done with a recently released library deeplearn.js by Google. I was pretty excited to use it for the first time, and it was my personal reward, after doing the course for 5 weeks, to use a library instead of implemetning neural networks in JavaScript from scratch. Have a look at the {{% a_blank "neural network in action to improve web accesibility" "https://github.com/javascript-machine-learning/color-accessibility-neural-network-deeplearnjs" %}}. Maybe you see it as opportunity as well to contribute to the GitHub organization. Next on the agenda are K-Means and Support Vector Machines (SVM) in JavaScript!

After you have completed week 5 of the machine learning course, you should have a good feeling about what's machine learning and how to solve problems with it. Afterward, the course continues with shallow algorithms for supervised learning and unsupervised learning. It gives elabroeated guidance of how to improve your implemented machine learning algoriothms and how to scale them for large data sets. When you have completed week 5, you should continue as well wioth the Machine Learning Guide podcast to learn more abotu shallow algorithms and neural networks.

In addition, over the course of those weeks, I read {{% a_blank_no_follow "The Master Algorithm" "http://amzn.to/2AthAGm" %}} by Brilliance Audio to get an overview about the topic, its different perspectives and stakeholders, and its history. After that, I started to read the open source ebook {{% a_blank "Deep Learning" "http://www.deeplearningbook.org/" %}} (by Ian Goodfellow and Yoshua Bengio and Aaron Courville). It happened after week 5 of the course and fitted perfectly to all the foundational knowledge I learned so far. So highly recommended books to give you even more guidance along the way. Once I finish the second book, I want to read the free ebooks {{% a_blank "Neural Networks and Deep Learning by Michael Nielsen" "http://neuralnetworksanddeeplearning.com/" %}} and {{% a_blank "Deep Learning by Adam Gibson, Josh Patterson" "https://www.safaribooksonline.com/library/view/deep-learning/9781491924570/" %}}. Do you have any other book or podcast recommendations? Please leave a comment below.

What else is out there to lean machine learning? After completing the course by Andrew Ng and getting my certificate, I give me a couple of days rest to internalize all those learnings. Perhaps I write more about them too. However, there a bunch of other courses out there which I want to check out.

* {{% a_blank_no_follow "Machine Learning Engineer Nanodegree" "https://www.udacity.com/course/machine-learning-engineer-nanodegree--nd009" %}} on Udacity
* {{% a_blank_no_follow "Deep Learning Specialization" "https://www.coursera.org/specializations/deep-learning" %}} on Coursera
* {{% a_blank_no_follow "Practical Deep Learning for Coders" "http://course.fast.ai/" %}} on Fast.ai

Fast.ai has a course on {{% a_blank_no_follow "computational linear algebra" "http://www.fast.ai/2017/07/17/num-lin-alg/" %}} as well. In general, machine learning involves lots of math. If you need a refresher on certain topics, I can highly recommend Khan Academy.

* {{% a_blank_no_follow "Linear Algebra" "https://www.khanacademy.org/math/linear-algebra" %}}
* {{% a_blank_no_follow "Statistics" "https://www.khanacademy.org/math/statistics-probability" %}}
* {{% a_blank_no_follow "Calculus" "https://www.khanacademy.org/math/calculus-home" %}}

Getting back to topic: Machine Learning in JavaScript. What kind of libraries are out there to support you for machine learning in JavaScript? If you attempt to go the puristic way of implementing math operations from scratch, there is no way around {{% a_blank "math.js" "http://mathjs.org/" %}} (e.g. [matrix operations](https://www.robinwieruch.de/linear-algebra-matrix-javascript/)). However, if you are using high level libraries such as Keras.js or deeplearn.js, you will have the most important mathematical methods integrated by using their NDArrays, Tensors and mathmatical operations. Otherwise, there are a couple of other lirbaries out there, not mentioning the mentioned again, which I didn't try yet. But they seem to be still maintained and used:

* {{% a_blank "natural" "https://github.com/NaturalNode/natural" %}} (Natural Language Processing)
* {{% a_blank "Synaptic" "https://github.com/cazala/synaptic" %}} (Neural Networks)
* {{% a_blank "Neataptic" "https://github.com/wagenaartje/neataptic" %}} (Neural Networks)
* {{% a_blank "WebDNN" "https://github.com/mil-tokyo/webdnn" %}} (Neural Networks; inference mode for Keras, Caffe, Chainer, TensorFlow)
* {{% a_blank "smv.js" "https://github.com/karpathy/svmjs" %}} (Support Vector Machines) - {{% a_blank "Demo" "http://cs.stanford.edu/people/karpathy/svmjs/demo/" %}}
* {{% a_blank "ml.js" "https://github.com/mljs/ml" %}} (shallow machine learning algorithms, math operations)

If you have any other recommendations, please leave a comment below. If you know whether certain libraries are active or not maintained anymore, please reach out as well. I would love to keep this article updated for the future.

{{% chapter_header "More Programming Languages for Machine Learning" "machine-learning-programming-languages" %}}

After learning and applying all the theoretical concepts in a programming languages of your choice (e.g. JavaScript), you can always come back to learn a programming languages best suited for machine learning. It can be a great learning exerpeicen in itself to experience how much more efficient something can be implemented in a different language. I had the same feeling when solving mathmatical equations in Octave when performing them in JavaScript before.

A previous paragraph has shown a couple of machine learing languages (Python, C/C++, R, Scala, Java, Matlab, Octave, Julia) and their fields of expertise. The one outlier faciliating everything with its libraries seems to be Python. I cannot give any profound recommendation here, because I didn't use any of those languages in relation to machine learning, but personally I would choose Python if I would continue to learn about the topic after applying it in JavaScript. Andrew Ng mentions in his machine learning course that often machine learning algorithms are developed as prototype in Octave or Matlab but implemented in Python afterward. Therefore I am still figuring out a pragmatic learning resource as a combination of video, text and audio material again. If you have any recommendations, you can leave a comment below.

<hr class="section-divider">

In the end, I am curious about your feedback regarding machine learning in JavaScript for web developers. Perhaps I want to invest more time in this field in 2018, but I would love to hear your thoguhts about it. Furthermore, I am curious if you have any opportunities for me to get more into the topic in a professional way. Please share your thoughts in the comments below.


