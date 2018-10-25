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

But first, I will talk about some **best practices** that you should apply
whatever policy your team opts into (i.e, feature-branching and rebase
cleanups). Then, I will highlight some **pros, cons, and decision points** you
should consider whenever you adopt a merge or rebase workflow. Lastly, I will
share a Git workflow and set of policies that may be useful in a
fairly-experienced dev team.

- Non-negotiable best practices for any git workflow
- Rebase policy for a cleaner history
- Merge policy for a verbose history
- A workflow we're trying to develop


