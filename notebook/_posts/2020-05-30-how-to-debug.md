---
layout: post
title: "How to debug"
date: 2020-05-30
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [software development, debugging, python, software engineering, life]
header-img: /assets/png/how-to-debug/TitleCard.png
description: |
    It seems that any software engineer is expected to know how to debug.
    However, there's not much material or structured framework on how to
    do it. In this blog, I share my own debugging "mental framework" through
    some pixel art!
---

<!-- Put the PNG header here -->

<!-- Start with a story -->

## Introduction

There was a time when I was tasked to maintain a system, and fix it iteratively
whenever users report bugs. I was **not** on building-mode: the priority
isn't the next killer feature or the next phase in the roadmap&mdash;it's
simply to ensure that the software is working as expected. During those weeks
of squashing bugs and triaging errors, I realized that debugging isn't as
straightforward as I thought it was!

**Debugging seems to be a skill expected from anyone entering into tech, but
the knowledge on how to effectively do so is siloed-out.** It makes sense
because as you learn how to code, you've certainly hit errors and you've
debugged your way out of it. Then, as we go through our own tech journeys, we
developed a tacit knowledge[^1] on how to debug.

> I realized that I don't have a "mental framework" on how to debug
> effectively. For the most part, I'm just relying on my tacit knowledge and
> practical experience.

I then realized that I don't have a "mental framework" on how to debug effectively.
For the most part, I'm just relying on my tacit knowledge and practical
experience. Hence, I devised a three-part framework for myself, and I'm sharing
it to you through Pixel Art[^2]!

**Note:** Debugging is universal for any language, but I may pull-in some
things specific to Python or Golang, two languages I often use!

## Code R.E.D.: my mental framework for debugging

![](/assets/png/how-to-debug/Blog-TitleCard.png)


**Why Code RED?** Red hints at urgency: can you imagine those movie scenes where
enemy aliens attack and all emergency alarms are set off? That's how I see
the process of debugging. Of course, in the middle of an emergency, I don't
want to lose my composure, so Code R.E.D. also stands for the mental framework
that I'm trying to practice. Lastly, "Code RED" sounds nice, it's on theme
with my Space Force pixel art!

### R is for Reproduce

![](/assets/png/how-to-debug/Blog-CodeRED-Reproduce.gif)

One of my first steps in debugging is to reproduce the bug in a controlled
environment. There are two reasons why I usually do this:

1. **To confirm that the bug exists**: sometimes "bugs" may be expected
   behaviours, or can be attributed to user misuse. This enables easier
   triaging of Issues later down the line.
2. **To isolate the bug given a minimum set of variables:** this allows
   me to inspect the problem without the presence of any extraneous variables.
   Personally, it's less cognitive load: if the bug is a computation error,
   then I only need the input, output and the code that causes it. 

#### Minimum working environment

In some of my open-source projects, I specifically ask users to provide a
minimum working environment (MWE). For example in
[Pyswarms](https://github.com/ljvmiranda921/pyswarms), it includes:
- **The version where the bug was discovered:** in most cases, a bug that was
    reported in version 1.0.0 was already patched in 1.0.1. It's just a matter
    of updating it to the latest version to resolve the issue.
- **Dependencies (operating system, etc.):** the goal here is that you want to
    approximate a similar environment to the user who reported the issue. This
    is tricky, because sometimes our business logic behaves differently based
    on its dependencies. I got bitten by this [several
    times](https://github.com/ljvmiranda921/pyswarms/issues/174) when I'm
    testing against multiple Python versions while expecting the same results.
- **[Minimal, complete and verifiable example](https://stackoverflow.com/help/minimal-reproducible-example) that causes the bug:** if you're reporting a bug, maintainers like me will highly-appreciate providing sample code that ideally we can just copy-paste in our terminals. I love reporters who do this because it requires some effort on their part to trim down their code into its relevant parts! This also lessens the back-and-forth between the maintainer and reporter since the problem was already communicated succintly.
- **The error message and the expected return:** in Python, this can come in
    the form of a [traceback](https://realpython.com/python-traceback/). At
    first I fear it (much like Golang's panic messages), but nowadays I see it
    as a convenience. Tracebacks allow me to *trace back* the specific
    function calls that led to the error, and pinpoint exactly what caused it.

#### Setup systems that enable easy reproduction

The work of reproduction starts even before a bug is reported. What I've been
constantly learning is that I should setup systems that allow
easily-reproducible environments: 

* **Pin dependency versions:** I find it easier if I can minimize the number of
    variables that I need to check. This definitely includes dependency
    versions in my software. In Python, I use a combination of [pip-tools](https://github.com/jazzband/pip-tools)
    and [virtualenv](https://github.com/pypa/virtualenv). The former automates
    the management of dependencies while the latter isolates my devlopment
    environment from the rest of my system. Saved me quite a few times in the
    past!
* **Write readable logs and error messages:** you don't need to write custom
    errors every time, but if you can catch an error early on, then there's no
    need to propagate towards the low-level functions of your program. Catching
    potential user-errors freed me from tracing numpy or pandas errors that are
    far removed from the context of the problem.
* **Keep an updated local dev environment setup instructions:** you probably just need to
    setup your local dev environment once, but there are cases when I updated
    my steps and forgot to document it&mdash; causing some headaches in the
    future. Make a point to have an updated local dev environment setup
    instructions.


### E is for Execute

![](/assets/png/how-to-debug/Blog-CodeRED-Execute.gif)

When I was still starting out, I immediately jump into this step and brute
force my way into the debugging process. As I squashed more bugs in my career,
I learned how to be tactical, thorough, and precise. There's a logical reason
why bugs happen, and it's important to narrow-down what causes this behaviour.

There are three tools that helped me in this process: debuggers, loggers, and
the test suite.

#### Debuggers

#### Loggers

#### Test Suite

<!-- Use the best tool for the job -->

<!-- Build confidence: run the tests first without changing anything -->
<!-- Use breakpoints and debugger -->
<!-- Setup guard rails such as regression tests -->


### D is for Document


![](/assets/png/how-to-debug/Blog-CodeRED-Document.gif)


## Conclusion


### Footnotes

[^1]: I think of tacit knowledge as know-how that is not explicitly defined or transferrable&mdash; just like riding a bike.
[^2]: Yes, I do Pixel Art! 
