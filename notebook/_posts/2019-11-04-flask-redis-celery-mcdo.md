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

*Good question.* There's a wealth of resources and tutorials out there, but
they mostly suffer from the [curse of
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

Both serve delicious McNuggets, but *man*, I hate buying from the one near my
apartment.

<!-- Insert illustration of two mcdonalds near office and apartment -->

The reason? **The lines are too slow and long**. My usual order is a 6-pc.
Chicken McNuggets. They don't take a long time to prepare, but because there's
only one person who takes my order and processes it, my ordering time is
affected by anyone who has lined-up before me. So if someone orders a ton
(thus more food to prepare) during their turn, then I'm in for a waiting game.

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


## More on the Mcdonalds near our office



## How Computers Talk 













### Footnotes

[^1]: ELI5: Explain like I'm five. There's a [subreddit](https://www.reddit.com/r/explainlikeimfive/) on it!



<!-- why do we need queing? what's the problem if we don't have that? -->
<!-- parallels in mcdonalds and flask, celery, redis -->
<!-- a deep dive into architecture -->
<!-- common production patterns -->
