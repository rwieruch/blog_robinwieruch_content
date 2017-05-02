# Nobody introduced me to the API

It might be a common issue in teaching computer sciene at universities. While you learn about bubble sorts, lambda calculus and permutations, nobody mentors you about common developer subjects. In the early days at university I often wondered: *What is an API?*

Not everyone is fully aware of it, but APIs follow us through a multitude of programming contexts. When I take you on the journey, how I got to know the API, you may get the idea what I mean by using APIs unconsciously most of the time. They give you an interface ranging from remote services, components in a web application to sensors in embedded systems. Interfaces are all around us.

However, there is a knowledge gap when it comes to APIs. It starts when teaching programming. Teachers assume that APIs are common knowledge. The abrevation pops up in teaching articles, courses and books without an introduction. But it isn't common ground teachers try to build on. Everyone is refering to this mysterious API, but nobody explains it. My articles are not excluded from this flaw. That's why I want to take you on this journey.

Taking you on my journey is an attempt to give you an introduction to the API. Rather than giving you a technical Wikipedia reference, which I already did ;), this journey attempts to wrap the subject of APIs into a story that I experienced myself when I studied computer science.

Apart from the introduction to APIs, the journey might give you as well insights into studying programming, the general struggle when learning programming and the naivity when learning it. The journey shows how a multidude of concrete fragments, like APIs in different programming contexts, can become something abstract, like interoperability between entities, in the end.

Hopefully the journey makes a good story that introduces you along the way to APIs and the empowering feeling that comes with them.

## Baby Steps towards APIs and Documentations

When I started to study computer science, everyone was euphoric about the first hands-on coding course. Personally, I had no background in programming at all. I felt that everyone else in the room was way more experienced. What I didn't know: They were clueless as I was. At least most of them.

The course was about creating and controlling a Lego Mindstorms roboter. After coming up with teams that had to be maintained during the course, as you can imagine, people rushed with their ideas and implementations. It was intimidating for people without any background in programming. Even more when you are an introverted person. After all, you had to come along with your peers during the next 4 months in the course. You don't wanted to be the one who hadn't something to contribute.

A handful of older students taught the class in successive sessions to program the roboter. It happened often that they reffered to an API when people asked questions. It was one of the default answers. However, I wasn't aware of what they meant with an API. Even when I finally asked for an explanation, the answer didn't help me at all. It was too abstract at this time. It didn't help to read the Wikipedia article. I wanted to have something concrete.

Initially I thought the API is sort of a manual, or documentation one would say, to read about the functionalities of the roboter.

I was taught to be wrong with my assumption. The documentation only describes the API: how to use it and what to expect in return when using it. The API itself is the programming interface of the roboter. The kind of things you need to execute in your code that something happens: functions. The API was the interface of the roboter: how I could make it move, read the light sensor and play audio like the theme of Star Wars.

In a future course, I learned that a documentation an API is not mandatory. Often you can only read the source code that is behind an API to understand its functionalities. In one course, we had to translate a documentation from Spanish to English before using it. Even the source code was in Spanish. It was due to an cooperation with another university that happened to be in Spain.

## Packages, Libraries, Modules - Woot?

Eventually I found out that these functionalities, that I used to control the roboter, are somewhere hidden inside packages. The word package was used in a range of synonyms. Sometimes they would have been refered as modules or libraries. It was difficult to untangle this abstract mess.

After all, these functionalities were grouped somewhere yet hidden. I couldn't see how these were implemented, but I had to call a function, which I didn't know that it was a function at this time, to make something happen.

I am not sure when there was this "aha" moment, maybe not even during the Lego Mindstorm course, but at some point I grasped that these packages, that I imported to access functionalities, were libraries.

At a later point in my studies we were introduced properly to Java. Suddenly a lot of things from the Lego Mindstorm course made sense. Even though no one mentioned anymore APIs...

In this course were introduced to the paradigm of object-oriented programming, syntax and patterns in Java. Suddenly there were these packages again. They could be public, protected or private. Yes, they can also be package-private. But teaching those in detail is not the point of the article. The point is that these are {{% a_blank "access level modifiers" "http://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html" %}} to your classes in object-oriented programming in Java. They give you different permission to use these functionalities from a remote place. Functionalities from classes, but even from whole packages that bundle mutliple classes.

Basically it was the API to a package. However, nobody told us. It was the bigger picture about APIs that (TODO abzeichnete sich) eventually. Okay, there can be a public API to functionalities. I got it.

## Meeting the $

No, it was not about cash. It was about jQuery. The first time I used jQuery was in a web development course teaching JavaScript. I must admit that the `$` object confused me and I still wonder if others feel the same when they meet the object the first time. Wouldn't it have been easier to name it simply `jQuery` instead of `$`? I often have mistaken the $ for a langugae specific syntax rather than an object coming from the jQuery library. That's why I didn't perceive jQuery as a library in the first place, but as well integrated thing in the JavaScript language.

Enough about jQuery. It confused me why the course went straight into jQuery without requiring the native browser API. Yes, the browser has an API as well. To be more specific, there are different APIs. For instance, one of it is the API for DOM. You can access the `document` object to traverse through your HTML, access it and manipulate it. Again, similiar like the Java packages, I didn't perceive these functionalities as APIs at this point in time. But it would end up to be one of the building blocks to the greater picture of APIs.

## One Course to rule them all: Distributed Systems

After two years of computer science, I was still not concinved that I wanted to continue studying it. I learned different theoretical and practical things but never got hooked. Instead, I devoted most of my time to video (todo video course) and audio (TODO schlenker) productions.

However, there was this one course that changed everything. It connected all the dots. Suddenly it made all these practical things I learned previosuly relavnt, because I could use them altogether. The course was about distributed systems. It was empowering to get to know all the benefits that you get from a distributed system. Before I was clueless about the possibilities.

The course introduced us to different theoretical and practical things to enable distributed systems that communicated to each other. Suddenly I could have a web service communicating to another web service, even though both were physically not at the same place. One web service accessing another one would be the client. The consumed web service would be the server. But the cool thing was that a client web service could be a server for another client web service again. It would be a web of functionalities accessed by APIs. Wow, let's build an army of web services! Knowing about these principles was empowering.

The main focus of the course was {{% a_blank "SOAP" "https://en.wikipedia.org/wiki/SOAP" %}}. SOAP is a protocol on top of HTTP that allows the communication between remote entities. I hope that the course changed the content by now, because SOAP seemed already to be dying back at the time. I am even not sure if that is true, but I never saw a SOAP powered service after my time at universitiy.

Another 10% of the course taught {{% a_blank "REST" "https://en.wikipedia.org/wiki/Representational_state_transfer" %}}. It is not a protocol like SOAP, but an architectural style using HTTP. It doesn't reinvent the wheel and uses standardized technologies to enable services communicating with each other over HTTP.

But REST wasn't supposed to be the silver bullet. Whereas SOAP would have been used to expose functionalities, REST was intended to expose resources. Resources that you might know as a list of todo items, authors or comments coming from a server. Nowadays RESTful services, services that follow the REST paradim, are often misused.

But let's leave this topic for someone else.

In my course, when the final decision had to be made in which paradim my team of two should implement a web service, we fortunately decided in favor of REST. Nowadays RESTful services are commonly used. It is a standardized way of letting a frontend communicate to a backend over HTTP in a modern web application.

## Implemting a Distributed System: The Aftermath

Did I mention that it was empowering? Did I mention that it connected all the dots of practical things I learned before?

Suddenly I was able to create remote services that expose functionaltiies and could be consumed from other servives that were physically somewhere else. In our team of two, we built a client-server-architecture that was powered by Java on both ends. We used {{% a_blank "Wicket" "https://en.wikipedia.org/wiki/Apache_Wicket" %}} for the client application and {{% a_blank "Jersey" "https://en.wikipedia.org/wiki/Project_Jersey" %}} to establish a REST interface, an API, for the backend application.

That's not even the full truth. In the beginning, we used plain Java to connect via HTTP. Eventually we figured out that there were librares in Java that solved this issue already. We ended up to use Jersey to avoid the boilerplate. It was one of the times were you had to implement something the hard way, experiencing the problem on your own, and had the possiblity to substitute it by a solution that was already out there. The solution, a library, would be accessed by an API again.

Because these web services were decoupled, they didn't had to be Java on both ends. That was another great thing to know about. Suddenly I would be able to connect a JavaScript frontend application with a Java backend.

### Third-Party APIs

I didn't know that other platforms offered public APIs. However, it seemed like everyone else knew about it. It led (past? TODO) the other teams to implement only a client-side application whereas my team of two build a full blown client-server-architecture. Now you have to see this in the context of our naivity. We spent a lot of time during these 4 months building the application. In the aftermath I am grateful for it, because I learned a lot during this process.

The principle of third-party APIs was another learning experience that had a lasting impact. Even though the client-server-architecture was distributed, I never thought about giving someone access to the server by making the API public. However, again it was just mindblown. It was that feeling of empowerment being able to build functioalities that others could access remotely.

### The Facade

I don't remember exactly how we found out about the pattern, but suddenly we had a Facade in our application. It is a programming pattern that groups functionalities in an interface (TODO check again). In plain English, the implementation was just an interface that hide (past? TODO) all the implemenation details behind functions. That was the point when we realized the web service had an API again. Similiar to a browser, a library like jQuery or packages in Java. But this time it was a remote API.

## A deep dive into REST with Joy T. Fielding

Due to this ipactful experience of distributed system, I devoted my Bachelor thesis to the REST paradigm. After all, it was the topic that kept me hooked to computer science in the bigger context of distributed systems.

I consumed everything I could find about the topic. It was still mysterious though. REST was an abstract architecture while SOAP was a concrete protocol? Everything had to be laid down in front of me to process it. I decided to read Roy T. Fieldings foundational thesis about REST.

There it was again. This paralyzing feeling of empowerment yet being overwhelmed. Principles in REST like {{% a_blank "HATEOAS" "https://en.wikipedia.org/wiki/HATEOAS" %}} and {{% a_blank "idempotent" "https://en.wikipedia.org/wiki/Idempotent#Computer_science_meaning" %}} hooked me completly.

A RESTful service was stateless? Wow, I would be able to use multiple services and distribute the server load among multiple instances. Another missing building block for my knowledge gaps. The biggest mysterium was the authenficiation with a RESTful service. How should it be handled when the server is stateless?

In my Bachelor thesis I made the straight forward attempt to compare different solutions that enable RESTful architectures in Java. I ended up comparing Jersey, RESTEasy and ... (TODO) under the requirements of the standardization: JAX-RS and there well doing under the light of the next generation of JAX-RS (TODO how was it called). Reflecting back on this, I guess every programmer would say that is useless, but it taught me again more in the fields of APIs. When comparing and implementing a RESTful service with three different API libraries, you get to know the fine-grained differences. I was able to get to know the constraints of each library.

Leaving the topic of distributed systems, I wanted to thank Dr. (? TODO Prof) Braun who had this lasting impact by lecturing distributed systems and for giving me the chance to write my Bachelor thesis about this topic.

## Leaving the Sandbox

The last years of my time at university mobile development was a popular topic. It was all about accessing sensors by using their APIs, using third-party libraries on these devices with their APIs and gathering data from third-party platforms by using their APIs. Everything came together.

After my experience with distributed systems I devoted my free time to programming. Suddenly I was able to build things. They were not build in a boring sandbox. They communicate with third-party platforms, sensors and libraries. Bigger libraries turned out to be frameworks, but an API would be the same practical thing that had to be consumed in order to use the framework.

## The unconsciously Act of implementing an API

I can only guess, but I assume that most developers are unaware of using APIs all the time. Still, these things empower developers to do so much things. Otherwise one would never be able to leave the sandbox. Suddenly you can communicate with code from others, access their functionalities or data. It can be a service in JavaScript that calculates a mathematical output or alters a data structure, yet it can be a component in React or Angular that has an API, an public interface, to use it.

## Hello, API!

APIs are the programmign interfaces to programs. {{% a_blank "Simple" "RICH HICKEY TALK TODO" %}} APIs are thoughtfully and well designed. They follow constraints and don't monkey-patch functionalities.

- as you have noticed by now, APIs have different contexts:
- the functionalities of a library or framework can be accessed through its API, when importing it beforehand
- yet remote functionalities can be accessed with an architecture like REST
- even in an own application APIs are implemendted, most of the time uncouncsily, when impleneting services or components

When learning programming, at some point concrete fragments gathered over time create an abstraction. Suddenly Wikipedia makes sense what it is saying about APIs. The bigger picture unfolds in front of you, but it takes time and concreteness in the fragments over the course of learning. In the case of an API, suddenly you become aware of the interoperability of systems and the contexts of using APIs:

* the DOM API in the browser
* the sensors in your smartphone
* the remote web service
* the library or framework in your web application
* the packages in your Java application
* the component in your React, Angular or Vue application

Everyone should be aware of it. Everyone is uncounsiuly an API architect. Others have to use your functioanltiies someday. Design and implement it thoughtfully. Avoid (to überfrachten in Java) your interface. Keep it lightwight, simple to use and with clear constraints. That's what makes your API durable over time.

# APIs are Concrete: They help to learn yet to teach

Through my journey at university I learned programming with APIs. Distributed systems was the subject that kept me learning programming. By using APIs with concrete examples, be it the browser API, a third-party library or a remote REST service accessed by its API, you can use these concrete examples to grow. I found it highly empowering when learning to leave my sandbox of programming and access the code of others. You get the real world content to experiment with.

After reflecting on this topic of APIs, I try to use them to teach programming. Consider a third-party platform that has an API to access its data. Rather than leaving students bored by having them pushing around arbitary data, you can give them access to real world content. I use this concept of teaching programming with third-party platforms often. Yes, you run into problems with changing APIs, but still you empower your students. I use this principle in my book to teach the fundamentals of React.


In the end, I hope that the article didn't came along to blame the university or teachers. When learning programming everything seems to be so far away. When teaching learners you neeed concrete examples that are not buried under abstractions. Still, a newcomer can get easily overwhlemed by all the noise burying the important topics. You can feel paralyzed by it. But you can fight this effect by using concrete example to teach and learn programming. APIs are a great example to empower students.

- write prof. Braun about it