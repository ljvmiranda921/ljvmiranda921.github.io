---
layout: post
title: "Automate Python workflow using Pre-commits: Black and Flake8"
date: 2018-06-21
category: notebook
comments: true
author: "LJ MIRANDA"
---

> Before I commit my staged Python files, `black` formats my code and `flake8`
> checks my compliance to PEP8. If everything passes, the commit is made. If
> not, then I the perform necessary edits and `commit` again. Less time is
> spent on code formatting so I can focus more on code logic.

I enjoy doing code reviews. They enable me to learn from other's code while
providing an opportunity to teach what I know. However, there are still some
things I wish to improve when facilitating reviews in my open-source
projects:

- Less time commenting on code format, and more time discussing code logic
- Less hassle spotting format errors ("can you really see that trailing
  whitespace on Line 76?")
- Stop sounding nitpicky ("Please put two blank lines between function
  definitions")

If I could automate the processes above and remove the human-in-the-loop, we
can focus more on code logic and implementation. Good thing, I learned about
[Git hooks](https://git-scm.com/book/gr/v2/Customizing-Git-Git-Hooks),
specifically pre-commit hooks. It enables you to automatically run a short script
before `commit`ting. This script can be a checking tool or a formatter. If the
script passes, then the commit is made, else, the commit is denied.

In this post, I'll describe how I created a pre-commit pipeline in
[PySwarms](https://github.com/ljvmiranda921/pyswarms) using the
[black](https://github.com/ambv/black) code formatter,
[flake8](https://pypi.org/project/flake8/) checker, and the
[pre-commit](https://github.com/pre-commit/pre-commit) Python framework. The
entire pipeline looks like this:


I'll first discuss the `pre-commit` framework, then add components one-by-one:
first is `black`, and then `flake8`. I will show the dotfiles present
in my project, so feel free to adopt them into your own!


## The pre-commit Python framework


## Black code formatter

## Flake8 checker

## Results
