---
layout: post
title: "Git team workflow: merge or rebase?"
date: 2018-10-25
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [git, automation, software development, workflow]
---

> TLDR: Either workflow is fine, each of them fulfills a certain value that
> your dev team should identify early on: do you prefer a clean history or a
> verbose one? Readability or traceability? If you wish to know which is which,
> then read on!

Software engineering is a land full of age-old debates: spaces or tabs? vim or
emacs (*or worse*, nano)? Today, I'll be talking about one of these: `merge` or
`rebase`? This is an important topic especially for dev teams who are still
starting out in their projects.

Assuming that your team already practices [feature
branching](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
and [rebase as
cleanup](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase),
how do you then integrate all your devs' commits onto your `master` branch?
Here, I will highlight some **pros, cons, and decision points** you should
consider whenever you adopt a merge or rebase workflow. Then, I will share a
Git workflow and set of policies that may be useful in a fairly-experienced dev
team.

- [Merge policy for a verbose history](#merge-policy-for-a-verbose-history)
- [Rebase policy for a cleaner history](#rebase-policy-for-a-cleaner-history)
- A workflow we're trying to develop

For this short post, let's look into this simple example of a feature branch
trying to merge into `master`. Each circle represents a commit, and the commit
history can be read from left to right:


![Diagram](/assets/png/gitflow/feature-branch.png){:width="480px"}  
__Figure:__ _A simple example of feature branching. We will discuss how each
merge policy (rebase or merge) affects our commit history. For now, assume that
the commit hash is represented as a single letter_
{: style="text-align: center;"}

## Merge policy for a verbose history


![Diagram](/assets/png/gitflow/merge.png){:width="480px"}  
__Figure:__ _A merge policy creates a merge commit, then preserves the
connections (or the history) of the created branches. This is a non-destructive
option_
{: style="text-align: center;"}

## Rebase policy for a cleaner history

![Diagram](/assets/png/gitflow/rebase.png){:width="480px"}  
__Figure:__ _A rebase policy effectively changes your commits and rewrites your
project history. In effect, you create a linear history in your `master` branch._
{: style="text-align: center;"}

Using the rebase policy, 
