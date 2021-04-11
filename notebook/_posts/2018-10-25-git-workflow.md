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

<span class="firstcharacter">S</span>oftware engineering is a land full of age-old debates: spaces or tabs? vim or
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

Rebase is a powerful tool that enables you to effectively rewrite your history.
As we all know, each commit is associated with an SHA-1 checksum (a hash) that
differentiates one commit from the other. Even if two commits have the same
changes when `git diff` is run, they are still considered different given
non-identical hashes. Rebasing a commit (or set of commits) reapplies the
changes you've made with a different hash, so again, even if the commit message
(or `git diff`) is the same, Git still treats them as two different commits.

This mechanic makes `git rebase` a popular merge policy. What it does is that
it applies the changes from your feature branch to `master` but with a
different commit hash. Because these commits are totally different (even if
they propose the same change), you get a *nice-looking, linear commit history*:

![Diagram](/assets/png/gitflow/rebase.png){:width="480px"}  
__Figure:__ _A rebase policy effectively changes your commits and rewrites your
project history. In effect, you create a linear history in your `master`
branch._
{: style="text-align: center;"}

Assuming we are in `master`, we can merge using the rebase policy by following
these steps:

```shell
$ git checkout feature # go to feature branch first
$ git rebase master # reapplies commits onto master
$ git checkout master # go to master branch
```

In the diagram above, commits **d**, **e** and **<u>d</u>**, **<u>e</u>** are
different from one another yet have the some set of changes. If you delete the
feature branch (`git branch -D feature`), you'll be left with a linear history
(sweet!).

Another nifty trick when rebasing is to add the interactive `-i` option, as in
`git rebase -i master`. This will open up an editor where you can control how
the history will turn out. Say we just want to combine **<u>d</u>** and
**<u>e</u>** together, when we run `git rebase -i master`, we'll get:

```shell
pick d* Commit message for d*
pick e* Commit message for e*
```

We can change `pick` into `fixup` (or `squash`), so that the resulting commit
to be merged is just one: `master: a -> b -> c -> f (squashed d, e)`

One advantage of having a linear history is that it's easier to surgically
manipulate whenever error arises (say, you just committed your company's secret API
keys on your public repo). Of course, you tradeoff verbosity offered in merge
policies.

In summary, here's what the rebase policy can offer you and your team:
- **PRO**: A linear history that is easy to follow and change (if needed!)
- **PRO**: High-level of control as to how the history will turn out
- **CON**: Lose context on your history, who made that feature branch? when did
    this branch out? Of course you can trace this by looking at the commits
    (and some `grep`-fu), but it's easier to see on a merge policy.
- **CON**: One wrong rebase can mess up the history, leading to multiple
    commits that just do the same changes.

Thus, here are some considerations when you choose to adopt a rebase policy:

- **Follow the [golden rule of
  rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing#the-golden-rule-of-rebasing)**.
  Never rebase on a public branch! Once you've introduced upstream changes to
  `master`, other contributors with the outdated branch will create a set of
  duplicate commits with the same diffs, making your history more confusing and
  unmeaningful.
- **Onboard new developers with `rebase` right away**. Most blog posts and
    developer forums tout rebase as a magical weapon that can destroy or help
    your git project. If you're a senior developer, help reduce this friction
    by introducing them the basics of rebasing. This can help them familiarize
    with how the workflow works and what happens in their commits whenever they
    execute this command.

In summary, a rebase policy gives you the flexibility to control how your
commit history would look like, with emphasis on linear and easy-to-follow set
of commits. Of course, this is useful if the team is familiar with rebase, and
are extra cautious whenever they try merging onto `master`. In my work, a
linear commit history is preferred, and I already start seeing the perks of
a rebase policy: high-flexibility, cleaner commmits, and a more presentable git
project.

## Summary

In this post, we've looked into two different policies for git workflows: merge
and rebase. We saw that a merge policy enables us to create a verbose history,
but we must be wary of being too verbose that invariably obfuscates our
project's history. On the other hand, we saw that the rebase policy offers us a
powerful tool to create linear and easy-to-read histories, but must be handled
with caution. Both policies are good, and choosing between them should be
attuned to what your dev team prioritizes and what would make you more
productive.

