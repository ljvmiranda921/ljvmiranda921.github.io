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

TL;DR&mdash;here's [what I'll do](#what-i-do).


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

To add, Github's  "Fetch upstream" button  creates a merge commit, making
further Pull Requests dirty with stray commits&mdash;the worst case is to delete my
fork and copy it again.


## What I do

What I do is **maintain a link to the original repository and track the changes
from there.** Before making a PR, I make sure to rebase those new changes to my
fork. 

First, let's create a link to the original remote. You can call it
`upstream`, `orig` or whatever you want:

```sh
$ git remote add upstream https://github.com/com/original/original.git
```

You now have *two* remotes: one for your fork, and one for the original
repository. If you run `git remote -v`, you should see the following:

```sh
$ git remote -v
origin https://github.com/myusername/myfork.git (fetch)
origin https://github.com/myusername/myfork.git (push)
upstream https://github.com/original/original.git (fetch)
upstream https://github.com/original/original.git (push)
```


Then, I track the remote branches by fetching them from the upstream:

```sh
git fetch upstream
```

Lastly, I go back to my fork's default branch (usually it's `master` or
`main`) then rebase the upstream's changes to this branch.

```sh
$ git checkout main
$ git rebase upstream/main
```

To fully sync my fork, I push the changes from my local to my remote.  The `+`
sign means that it's a force push. It overwrites whatever you have in your
remote and rewrites the history to be similar as the original repo:

```sh
git push origin +main
```


 





### Footnotes

[^1]: 

    I wrote in-depth about [git team
    workflows](/notebook/2018/10/25/git-workflow/). Read more if you're
    interested in the differences between merging and rebasing.

