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
go to. I mean, no matter what level of a cook you are, it's impossible to mess
up a fried nugget. Fortunately, there's a McDonalds near my (A) apartment and my (B) office
building. Let's call them Mcdo A and Mcdo B respectively.

Both serve delicious McNuggets, but man, I hate buying from the one near my
apartment.

<!-- Insert illustration of two mcdonalds near office and apartment -->

The reason? **The lines are too slow and long**. My usual order is a 6-pc.
Chicken McNuggets. They don't take a long time to prepare, but because the
there's only one person who processes my order and prepares it, my ordering
time is affected by anyone who's lined before me. 

So if someone orders a ton, then I'm in for a waiting game.



## Why Mcdo B rules 



## How Computers Talk 













### Footnotes

[^1]: ELI5: Explain like I'm five. There's a [subreddit](https://www.reddit.com/r/explainlikeimfive/) on it!



<!-- why do we need queing? what's the problem if we don't have that? -->
<!-- parallels in mcdonalds and flask, celery, redis -->
<!-- a deep dive into architecture -->
<!-- common production patterns -->
