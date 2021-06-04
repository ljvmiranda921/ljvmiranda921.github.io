---
layout: post
type: post
title: "What can the Avengers: Endgame teach us about Git?"
date: 2021-06-11
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [git, avengers, marvel, endgame, software engineering]
description: |
    Avengers and Git? The most ambitious crossover event in history.  In this
    blog post, I will explain crucial plot points in Avengers: Endgame in five
    Git concepts!
excerpt: |
    Avengers and Git? The most ambitious crossover event in history.  In this
    blog post, I will explain crucial plot points in Avengers: Endgame in five
    Git concepts!
---


<span class="firstcharacter">W</span>hen I first saw *Avengers: Endgame* in
theaters, I noticed that **their time travel rule is quite similar to the Git
branching model.** Referred to as the [*time
heist*](https://marvelcinematicuniverse.fandom.com/wiki/Time_Heist), our heroes
travelled through time to recover the stones and undo the effects of the
snap&mdash; thereby saving all. 

> The Ancient One: "The Infinity Stones create what you experience as the folow
> of time. Remove one of the stones, and the flow splits."

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/RNBKKGM1w88?start=57" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

Creating branches and alternate realities...*isn't that vaguely familiar with
Git?* As it turns out, software developers are doing their own version of
time-travel in their day jobs! Let me demonstrate that in this blogpost by
**explaining the plot of *Avengers: Endgame* in five git concepts!**

<p style="border:3px; border-style:solid; border-color:#FF0000; padding: 1em;">
<b>Spoilers alert!</b><br>
Really now, you haven't watched Avengers: Infinity War and Avengers: Endgame? </p>


<!-- Note to Lj: remember, these five are happening in sequence! -->


## Fast-forward merge

<!-- five years later -->
This one is straightforward so let's get it out of the way. After that
shocking decapitation of Thanos and with no hope in sight, we were then
transported five years into the future.

This is a classic example of a fast-forward merge. This occurs when 
there is *a linear path* from where we are now (i.e., death of Thanos) to our
target branch (i.e., five years later). No time-travel shenanigans, just
straightforward combination of histories. 

<!-- excalidraw example -->

You can do this by:

```sh
# Prepare a branch that contains all the events five years later
git checkout -b five-years-later master
git add <file>
git commit -m "Add new events in the history"

# Switch back to master and perform merge
git checkout master
git merge five-years-later
```


## Checkout a point in the past 

With the stones reduced to atoms, our heroes decided to conduct a time heist.
First, they need to identify when in their shared history the stones are within
reach. 

In Git, you can view an object's full history by typing:

```sh
# Get full history of a specific file
git log --all --full-history <path/to/file>
```

This also allowed them to pinpoint the exact location of the stones.  After
determining those crucial points, they used the remaining Pym particles to
traverse the quantum realm. 

Turns out, we can also do the same thing! The `log` command from above will then
give you a unique hash so that you can reference it as you time-travel:

```sh
# Supply your unique hash 
git checkout <SHA> -- <path/to/file>
```

## Headless and stray branches 

Whenever our heroes travel to the past and tamper with the stones, they get
into a state outside the context of time. It's a state of limbo where a
potential new reality may be born. In Git, it's like being in a state where
`HEAD` is detached&mdash; a *headless branch*:

<!-- put image -->

By procuring the stones from an earlier timeline, they then create an alternate
reality:

```sh
git checkout <SHA>
git checkout -b feat/get-stone  # or git switch -c feat/get-stone
```

...and procured the stones from earlier timelines. As with the video above, we
had Hulk successfully obtaining the Time Stone from The Ancient One:


<!-- put image -->

```sh
# Checkout a previous state in time, Avengers I
git checkout avengers-1
git checkout -b feat/get-time-stone

# Move time stone from the Ancient One to the Hulk
mv the_ancient_one/time_stone hulk

# Commit the change and go back to the present
git add .
git commit -m "Retrieve time stone from Ancient One"
git checkout master
git merge feat/get-time-stone
```

Iron Man and Captain America weren't so lucky. Their first attempt to get the
Space Stone failed, with the past Loki escaping with it. By doing so, they've
inadvertently created a *stray branch*:

```sh
# Checkout a previous state in time, Avengers I
git checkout avengers-1
git checkout -b feat/get-space-stone

# Loki escaped with the Space stone
mv shield/space_stone loki
git add .
git commit -m "Escape using the Space Stone"
# ... 
```

This branch didn't merge to `master` and it's currently living its own life.
We'll probably know of past Loki's fate in his standalone Disney+ series!

## Merge conflict

<!-- thanos wants to rebase to master -->
<!-- i am not sure what iron man did: not accept merge-ours and not accept thanos
pull request, or actually delete the thanos from another timeline? -->


## Rewriting history with rebase 

<!-- more speculative: captain america going back -->
<!-- are there two captain americas in the `master` timeline now? -->
<!-- did the original captain america (the one we followed through the years) just hid himself properly and let history take its natural course without making action? -->

