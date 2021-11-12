---
layout: post
type: post
title: "How to sync your fork with the original repository"
date: 2021-11-17
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [software development, git, github]
description: |
    Fetching upstream is fun, but it doesn't do what I wanted to do. So here's how I do it.
excerpt: |
    Fetching upstream is fun, but it doesn't do what I wanted to do. So here's how I do it.
---


Whenever I work on open-source projects, I usually maintain my own copy, a
[*fork*](https://docs.github.com/en/get-started/quickstart/fork-a-repo), of the
original codebase. Then, when I want to propose changes, I open up a [Pull
Request
(PR)](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).




When my PR receives a maintainer's approval, the commits from my fork will
happily live inside the original repository. All is good. However, there are
cases when a maintainer merges not via a merge commit, but by squashing or
rebasing my changes.[^1]



During a rebase, commits are "rewritten" even with the same changes. Git won't
be able to put two and two together, and it will treat my commits as another
set of changes.


Now, when I make a new Pull Request for a different issue, those commits
will still show up! In Github, this messes the Pull Request interface (i.e.,
"why do I have commits for fixing Issue 1 when this PR is about Issue 2?").



## What I do

I 





### Footnotes

[^1]: 

    I wrote in-depth about [git team
    workflows](/notebook/2018/10/25/git-workflow/). Read more if you're
    interested in the differences between merging and rebasing.

