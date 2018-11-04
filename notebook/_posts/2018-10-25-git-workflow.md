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
how will you then integrate all your devs' commits onto your `master` branch?
Here, I will highlight some **pros, cons, and decision points** you should
consider whenever you adopt a merge or rebase workflow.

- [Merge policy for a verbose history](#merge-policy-for-a-verbose-history)
- [Rebase policy for a cleaner history](#rebase-policy-for-a-cleaner-history)

For this short post, let's look into this simple example of a feature branch
trying to merge into `master`. Each circle represents a commit, and the commit
history can be read from left to right:


![Diagram](/assets/png/gitflow/feature-branch.png){:width="480px"}  
__Figure:__ _A simple example of feature branching. We will discuss how each
merge policy (rebase or merge) affects our commit history. For now, assume that
the commit hash is represented as a single letter_
{: style="text-align: center;"}

## Merge policy for a verbose history

The easiest way to merge two branches together is through the merge policy.
This simply consolidates two diverging histories in your `master` and
`feature` branches via a merge-commit. You can perform a merge adhering to 
this policy by executing the following commands (assuming that you're
coming from the `feature` branch):

```shell
$ git checkout master # go back to master
$ git merge feature # merge changes
```

This will create a commit history that looks like this:

![Diagram](/assets/png/gitflow/merge.png){:width="480px"}  
__Figure:__ _A merge policy creates a merge commit, then preserves the
history of the created branches. This is a non-destructive
option_
{: style="text-align: center;"}

Usually, what I do is merge upstream changes in `master` (while in the
`feature` branch), then merge the changes in `feature` back to `master`.
However, if `master` changes quite often, this might lead to a dirty commit
history. 

```shell
$ git merge master # while in feature branch
$ git checkout master # go back to master
$ git merge feature # merge changes
```

One advantage of this policy is that you can have a verbose git history
detailing how each feature branch interacted with `master` (or to one
another). However, if several team members work on different feature branches
(which is usually the case), then this can lead to spuriou s merge-commits
scattered around the git history. 

> In Github, you can check your commit history by going to your project's
> repository, then clicking the tab, "Insights" > "Network". In your terminal, you can find
> pretty git log settings in this [StackOverflow thread](https://stackoverflow.com/questions/1057564/pretty-git-branch-graphs)

In summary, here's what the merge policy can offer you and your team:
- **PRO**: Verbose git history where you can see all changes that has happened in your project.
- **PRO**: A merge-commit can be a sensible checkpoint when you're implementing
  a [`master`/`development` branch model](https://nvie.com/posts/a-successful-git-branching-model/#the-main-branches)
- **CON**: Too much context can obfuscate your git history. If you have *very
    active* branches, the back-and-forth merge commits can be difficult to
    maintain.
- **CON**: Difficult to surgically repair a git history whenever mistake
    happens. Because a feature branch has two parents, there is extra effort to
    clean and `rebase` them.

In case you decided to go with the merge policy, here are some considerations
to help with your team's workflow:
- **Have a whitelist of `master` committers**. In Github, you can set [branch
    protection rules](https://help.github.com/articles/configuring-protected-branches/)
    so that only a select number of people can commit/merge onto `master`.
    Usually this is the project lead or an experienced developer. 
- **Practice a `master`-`development` branching model**. We don't want a
    `master` that changes often since this will tend to pollute our histories.
    Instead, create a `development` branch where all of those changes are
    implemented.
- **Do [rebase cleanup](http://www.siliconfidential.com/articles/15-seconds-to-cleaner-git-history/) for feature branches**.
    If in your feature branch you proposed to `Add config.yml` then right away decided to
    `Revert config.yml`, then maybe it's better to remove the commit
    altogether? Too verbose a history (multiple WIPs, reverts, etc) can
    obfuscate your `git log` and defeat the purpose of a readable history. 

In summary, a merge policy avails you with verbosity, but having too much of it
can lead to obfuscation. It may be useful to adopt different branching models
and whitelists so that the history is well-maintained. In most of my
open-source projects, I usually adopt this policy. In order to avoid obfuscated
git histories, I often ask my contributors to rebase cleanup their branches,
and restrict `push` access to `master` from non-maintainers.

## Rebase policy for a cleaner history

![Diagram](/assets/png/gitflow/rebase.png){:width="480px"}  
__Figure:__ _A rebase policy effectively changes your commits and rewrites your
project history. In effect, you create a linear history in your `master`
branch._
{: style="text-align: center;"}

Using the rebase policy. 
