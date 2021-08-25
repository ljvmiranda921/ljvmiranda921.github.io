---
layout: post
title: "Distill: Why do we need Flask, Celery, and Redis? (with McDonalds in Between)"
date: 2019-11-08
category: notebook
comments: true
highlight: true
author: "LJ MIRANDA"
tags: [flask, celery, redis, python, backend, web development, mcdonalds]
description: |
    A few weeks ago, someone at work asked me how Flask,
    Celery, and Redis work together. I realized it's best
    to explain it through a fun comic on buying McNuggets
    in Mcdonalds!
header-img: /assets/png/flask-celery-redis/header.png
excerpt: "Understanding Flask, Celery, and Redis through Mcdonalds"
---

A few weeks ago, someone at work asked me: 

![](/assets/png/flask-celery-redis/scene_00.svg)

*Good question, And below is a longer version of my quick explanation back
then.* There's a wealth of resources and tutorials out there, but they mostly
suffer from the [curse of
knowledge](https://en.wikipedia.org/wiki/Curse_of_knowledge). This time, let's
step back and do an ELI5[^1] on how these technologies relate to one another.

<span class="firstcharacter">I</span>n this blogpost, I'll explain why we need Flask, Celery, and Redis by sharing
my adventures in buying McNuggets from Mcdonalds. Using these three (or
technologies similar to them) is integral to web backend development so that we
can scale our applications.

- [Part 1: A Tale of Two Mcdonalds](#a-tale-of-two-mcdonalds). First, I'll
  explain the concept and intuition of a task queue in order to motivate the
  technologies mentioned above.
- [Part 2: Diving into Mcdonalds Task Queue](#diving-into-mcdonalds-task-queue). Then, we'll look into the various components found in the Mcdonalds task queue and how they relate to one another.
- [Part 3: Stepping out of Mcdonalds](#stepping-out-of-mcdonalds). In this
    section, we'll abstract our knowledge of the task queue components so that
    we can apply them to systems outside Mcdo.
- [Part 4: Ye Old Switcheroo](#ye-old-switcheroo). We'll then substitute our
    previous knowledge of a task queue with Flask, Celery, and Redis. By this
    time, we should have an idea of how these technologies hold together.

Ready? Let's go!

## A Tale of Two McDonalds

<!-- explain the concept of queuing in mcdonalds -->

I love McNuggets, they're always consistently good whichever Mcdonald's store I
go to. No matter what level of a cook you are, it's impossible to mess up a
fried nugget. Fortunately, there's a McDonalds near my (A) apartment and my (B)
office building. 

Both serve delicious McNuggets, but *man*, <u>I hate buying from the one near
my apartment.</u> The reason? **The lines are too slow and long**. 

![](/assets/png/flask-celery-redis/scene_01.svg)

My usual order is a 6-pc.  Chicken McNuggets. They don't take a long time to
prepare, but because there's only one person who takes my order and processes
it, my ordering time is affected by anyone who has lined-up before me. So if
someone orders a ton (more food to prepare) during their turn, then I'm in for
a waiting game.

![](/assets/png/flask-celery-redis/scene_02.svg)

> In the Mcdo near my apartment: I need to wait for everyone who lined-up
> before me to finish and get their orders before I can start with mine.

**Now**, the Mcdo near our office has solved this problem with a nifty trick: 


![](/assets/png/flask-celery-redis/scene_03.svg)

First they take my order, but they don't process it in front of me right away.
Instead, they give me a *reference number* so that I can check the status of
my order on a large display.

The large display is placed near the counter and it shows all reference numbers
with their current status (i.e., Preparing, Ready). All I need to do is wait
comfortably at the side and check if my order's complete.

> In the Mcdo near my office: everyone receives a reference number after
> ordering. While my order is on queue, I can just relax on the side and check if
> it's done processing.

There are still some lines, but the waiting time is much shorter because I
don't need to wait for the person before me just to punch-in my request.
Customers can easily track their orders using their reference number, so they
just come back to the counter once they see that their order's ready.

As we've seen, the Mcdonalds near our office has implemented something called a
**task queue.** Having a task queue provided them with the following benefits:

* **Reduced waiting time for customers**. By separating the person who processes
    the order and the one who prepares the food, the time-to-respond for each
    customer has been greatly reduced. For myself, I don't need to wait for
    everyone in front of me to get their orders before I can start with mine.
* **Better task delegation**. The *Ate* or *Kuya*[^2] who takes my order is
    different from the one who prepares it. It's less stress for both parties
    and each can just focus on doing their respective tasks!
* **Customers can just sit back and relax**. I don't need to be anxious about the
    people behind me because once I received my reference number, I can just
    sit down and relax while waiting for my order to complete. I'll just refer
    periodically to the LED screen to check if my McNugget's ready. 

By this time, I hope you're having a sense of what Flask, Celery, and Redis are
trying to achieve&mdash; i.e., **creating a task queue.** In the next section,
we'll discuss the various components of Mcdonald's task queue and how they map
to the three technologies above.

## Diving into Mcdonald's Task Queue

In the Mcdonalds near our office, there are three major components that are in play:

* **The *Ate*/*Kuya* cashier**: they're the ones who talk to customers, take
    their orders, and give them their reference numbers *(remember that in the
    Mcdo near our apartment, they're also the ones who prepare the meal, which
    is inefficient)*. 
* **The *Ate*/*Kuya* worker crew**: they're the ones who receive the placed
    order and prepare or cook our meal.
* **The database behind the LED screen**: the LED screen displays information
    on the customers' reference numbers and order status, but we know that its
    job is to *only show* information. The actual workhorse is the database
    behind it. Think of it as a large, invisible table that stores whatever the
    LED screen displays.

![](/assets/png/flask-celery-redis/cashier.svg)

All in all, we see that these components relate to one another via the
illustration below:

<!-- Insert illustration of the system architecture here -->
![](/assets/png/flask-celery-redis/task_queue_01.svg){:width="520px"}
{: style="text-align: center;"}

1. The customer talks to the cashier to place their order.
2. The cashier takes their order, puts it in the database queue (with a `PENDING` status), so that free workers can
   take them on. The customer receives a reference number and sits on the side.
   The cashier is then free to take-on another order.
3. A free worker takes on the order and prepares the meal.
4. Once the worker is done preparing, he updates the status of the reference
   number from `PENDING` to `SUCCESS`.
5. The LED displays this change, and the customer sees that his order is now
   done being prepared. He takes his order and goes on his merry way!

So far we've familiarized ourselves with the concept of a task queue and how it
plays out within the context of our favorite fastfood restaurant. Now, let's
step-out of Mcdonalds and start seeing these components in a more abstract
manner.

## Stepping-out of Mcdonalds

![](/assets/png/flask-celery-redis/land_of_abstraction.svg){:width="360px"}
{: style="text-align: center;"}


Ok, so we're out of Mcdonalds. Let's stop thinking about cashiers and LED
screens and start thinking in more abstract components. Here's the same task
queue but from the Land of Abstraction:

![](/assets/png/flask-celery-redis/task_queue_02.svg){:width="520px"}
{: style="text-align: center;"}


We consider ourselves as the
[**Client**](https://en.wikipedia.org/wiki/Client%E2%80%93server_model), for
we're the ones asking for a service or making a **Request**.[^3] The cashier
crew and the LED screen that we interact with is the **Application**. 

Notice that I lumped the cashier crew and the LED screen together? It's because
these are the two interfaces that we interact with during our time in Mcdo. The
LED screen is just a view of the actual database that stores and manages
data behind it (the **Database Backend**). Lastly, the actual processes that
take our request and make something out of it are called our **Workers**.

So far, we've learned the following:
- What a task queue is and why it's important. 
- The components of the Mcdonald's task queue: cashier, worker, database behind
    LED screen
- How these components look in more general terms: application, worker,
    database backend.

The table below maps the Mcdonalds components that we currently know to the
abstract general component that we're going to use from this point forward.
Now, we're ready to use what we know so far and map these components to Flask,
Celery, and Redis!

<!-- Put a table on the left is Mcdo, Center is abstracted component, and right
is web backend dev (on this case, put question marks)-->

| Mcdonalds                  	| Abstract Component 	| Web Backend 	|
|----------------------------	|--------------------	|-------------	|
| Customer              	| **Client**      	| ?           	|
| Cashier crew               	| **Application**      	| ?           	|
| Worker crew                	| **Worker**           	| ?           	|
| Database behind LED screen 	| **Database backend** 	| ?           	|


## Ye Old Switcheroo

This should be simple now, so here's ye old switcheroo!

![](/assets/png/flask-celery-redis/switcheroo.svg){:width="360px"}
{: style="text-align: center;"}


| Mcdonalds                  	| Abstract Component 	| Web Backend       	|
|----------------------------	|--------------------	|-------------------	|
| Customer              	| Client            	| **Client**           	|
| Cashier crew               	| Application        	| **Flask Application** |
| Worker crew                	| Worker             	| **Celery Worker**   	|
| Database behind LED screen 	| Database backend   	| **Redis**           	|

*See what we did there?* We just switched-out the components of the Mcdonalds
task queue to their web backend counterpart. To see them in action, let's look at
the illustration below:

<!-- Insert illustration of the system architecture here -->
![](/assets/png/flask-celery-redis/task_queue_03.svg){:width="520px"}
{: style="text-align: center;"}

* **Flask Application**. This the web application that accepts requests
    and returns responses depending on that request. When you talk to the
    cashier, you make a request (likely a
    [`/POST`](https://en.wikipedia.org/wiki/POST_(HTTP))). When you look at the
    LED screen, you're also making a request (likely a
    [`/GET`](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)). 
* **Celery Worker**. Workers run the processes in your web application:
  classifying an image, processing an email, and much more!  Celery provides
  the framework to write workers for running your services. Remember, **celery
  is not just the worker**. It is a framework that allows your workers to
  communicate with the database backend, "talk" to one another, and the like. A
  celery worker is just one piece of the Celery "ecosystem".
* **Redis**. This one holds information on the reference numbers (also known
    as IDs) and status of each job. Redis is an in-memory data store, think of
    global variables on steroids.  Perhaps, the *actual* database backend in
    Mcdonalds is built on-top of Redis.  Truth is, you can swap-out Redis with
    any other database you can think of, like MySQL, PostgresSQL, and the
    like.

Together, these three form a task queuing system. What happens then is:

1. The Client talks to the Flask Application to place their request.
2. The App takes the request, puts it in the database queue (with a `PENDING` status), so that Celery workers can
   take them on. The Client receives a JobID and polls on the side.
   The App is then free to take-on the next request.
3. A Celery worker takes on the request and runs the service.
4. Once the worker is done, it updates the job's status from `PENDING` to
   `SUCCESS`.
5. The App signals this change (or returned when polled), and the Client sees
   that his request is now done processing. He takes his response and goes on
   his merry way!

### I forgot to tell you something 

As we now know, [Celery](http://www.celeryproject.org/) acts as the framework
that brings all the components above together. This includes your Flask
Application, the Database Backend, and the Workers. *I forgot to tell you
something*, there's another important component, the **Message queue**.

Simply put, you can think of this as the squiggly lines that connect these
services together. For Celery, technologies that can act as a messaging queue
are Redis, RabbitMQ, Memcache, and the like. You can see a [list of
technologies](http://docs.celeryproject.org/en/latest/getting-started/brokers/)
here.

### Is it really just Flask, Celery, and Redis?

From our land of abstraction, we knew that the task queue is a general approach
to solve a problem and we just substituted (*switcheroo'd*) various
technologies to fulfill such roles. We can definitely use a variety of tech for
each component. For example, we can use MySQL as our database backend and
RabbitMQ as our message queue. We still achieve the same thing, but with
different technologies.

## Conclusion 

In this blog post, I showed how Flask, Celery, and Redis work together to form
a task queue. We then learned the following:

- What a task queue is and why it's important to our systems.
- The general components of a task queue and how these components relate to one
    another.
- How Flask, Celery, and Redis fulfill these roles.

We also learned that systems like these require a messaging queue (squiggly
lines) and that it's possible to switch-out these technologies with other
frameworks while achieving the same goal. Hope this fun blog post sheds some
light on backend web development, please let me know of any concepts I've
missed in this Distill!


![](/assets/png/flask-celery-redis/something_new.svg){:width="420px"}
{: style="text-align: center;"}

#### Changelog

* 04-27-2020: Thank you to Jon Forrest for helping me out in fixing some grammar mistakes!
* 04-22-2020: This blogpost was featured on [Hacker News](https://news.ycombinator.com/item?id=22901857)! Thanks to [Feross](https://feross.org/) for posting it, and for everyone who found this post helpful.


### Footnotes

[^1]: ELI5: Explain like I'm five. There's a [subreddit](https://www.reddit.com/r/explainlikeimfive/) on it!
[^2]: *Ate* means older sister while *Kuya* means older brother in Filipino. For those who are not from the Philippines, we usually call everyone (even our fastfood service crews) as older brothers and sisters.
[^3]: This is definitely a hand-wavy definition of what a Client does. In client-server architectures, you have someone who provides a resource or service (Server) and the one who asks for it (Client). 
