---
layout: post
title: "Why do we need Flask, Celery, and Redis? (with McNuggets in Between)"
date: 2019-11-04
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [flask, celery, redis, python, backend, web development, mcdonalds]
description: "Understanding this web backend triumvirate while eating Mcdonald's Large Fries"
---

A few weeks ago, someone at work asked me: "why do we need Flask, Celery, and
Redis?" 

*Good question, And below is a longer version of my quick explanation back
then.* There's a wealth of resources and tutorials out there, but they mostly
suffer from the [curse of
knowledge](https://en.wikipedia.org/wiki/Curse_of_knowledge). This time, let's
step back and do an ELI5[^1] on how these technologies relate to one another.

In this blogpost, I'll explain why we need Flask, Celery, and Redis by sharing
my adventures in buying McNuggets from Mcdonalds. 


## A Tale of Two McDonalds

<!-- explain the concept of queuing in mcdonalds -->

I love McNuggets, they're always consistently good whichever Mcdonald's store I
go to. No matter what level of a cook you are, it's impossible to mess up a
fried nugget. Fortunately, there's a McDonalds near my (A) apartment and my (B)
office building. 

Both serve delicious McNuggets, but *man*, <u>I hate buying from the one near my
apartment.</u>

<!-- Insert illustration of two mcdonalds near office and apartment -->

The reason? **The lines are too slow and long**. My usual order is a 6-pc.
Chicken McNuggets. They don't take a long time to prepare, but because there's
only one person who takes my order and processes it, my ordering time is
affected by anyone who has lined-up before me. So if someone orders a ton
(more food to prepare) during their turn, then I'm in for a waiting game.

> In the Mcdo near my apartment: I need to wait for everyone who lined-up
> before me to finish and get their orders before I can start with mine.

Now, the Mcdo near our office has solved this problem with a nifty trick: first
they take my order, but they don't process it in front of me right away.
Instead, they give me a **reference number** so that I can check the status of
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
* **Customers can just sit back and relax**. I don't need to be anxious of the
    people behind me because once I received my reference number, I can just
    sit down and relax while waiting for my order to complete. I'll just refer
    periodically to the LED screen to check if my McNugget's ready. 

By this time, I hope you're having a sense of what Flask, Celery, and Redis are
trying to achieve (i.e., creating a task queue). In the next section, we'll
discuss the various components of Mcdonald's task queue and how they map to the
three technologies above.

## Diving into Mcdonald's Task Queue

Whenever I enter the Mcdonalds near our office, there are always three major
components that I observe in their system:

* **The *Ate*/*Kuya* cashier**: they're the ones who talk to customers, take
    their orders, and give them their reference numbers. Remember that in the
    Mcdo near our apartment, they're also the ones who prepares the food (which
    is inefficient). In our system, they reduce the time it takes a customer
    enters the store and places their order.
* **The *Ate*/*Kuya* worker crew**: they're the ones who receives the placed
    order and prepares our food. They're involved in reducing the time it takes
    upon receiving an order and preparing it. They might also enlist the help
    of other services (cooks, etc.) when a certain item still needs to be
    cooked.









### Footnotes

[^1]: ELI5: Explain like I'm five. There's a [subreddit](https://www.reddit.com/r/explainlikeimfive/) on it!
[^2]: *Ate* means older sister while *Kuya* means older brother in Filipino. For those who are not from the Philippines, we usually call everyone (even our fastfood service crews) as older brothers and sisters.



<!-- why do we need queing? what's the problem if we don't have that? -->
<!-- parallels in mcdonalds and flask, celery, redis -->
<!-- a deep dive into architecture -->
<!-- common production patterns -->
