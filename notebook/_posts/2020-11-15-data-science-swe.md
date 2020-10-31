---
layout: post
type: post
title: "For researchers who ask me how to improve their software skills"
date: 2020-11-15
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [software development, debugging, python, software engineering, life]
description: |
    This blogpost is for researchers or data scientists who ask me how to
    improve their software engineering knowledge. I'll talk about a particular
    exercise that you can do to improve your skillset.
excerpt: |
    This blogpost is for researchers or data scientists who ask me how to
    improve their software engineering knowledge. I'll talk about a particular
    exercise that you can do to improve your skillset.
---


Hello, you're probably here because I linked this after I rambled upon how
someone can improve their software skills as a researcher. Maybe our conversation
went this way:

<!-- illustrate this instead?? -->

> "Learn git! Modularize your code! Then uhm, try to reproduce your
> experiments along the way, also deploy your stuff to some cloud platforms
> along the way? Try using notebookes less often, Also, check PEP8! And learn git!"

You get it already...the field is quite huge and you can get started in so many
ways&mdash; I got overwhelmed before. *However*, as an opinionated
advice, I think that there's one activity/exercise that introduces you to all 
relevant skills and focus them into a tangible output:

> Create a machine learning application that can receive HTTP requests
> and can optionally be deployed as a containerized app.

That's quite a mouthful, so let's break it down a bit:

1. **"Create a machine learning application..."**: this should be a model that
    receives an input, applies the necessary transformations, and gives an
    output. This can be anything, and it depends on what you're comfortable
    with. It could be a language model that measures sentiment, an OCR model
    that gives bounding boxes or a standard classifier given an arbitrary set of
    inputs. You decide! 
2. **"...that can receive HTTP requests..."**: if this is the first time you've
    encountered this, then don't fret! In Python, this may be as simple as
    learning a new library. HTTP is a standard that allows computers to talk to
    one another. Allowing your ML application to receive HTTP requests means
    that you're setting-up a "the language" between your app and other
    users, so that they know how to talk (give/receive data) to your model.
3. **"...can optionally be deployed..."**: this means that you allow your
    application to be accessible outside your own computer! If the previous
    step defines how others can communicate to your app, this step allows
    others to communicate to it! There are many platforms that does this, and
    I'll list them down later.
4. **"...as a containerized app."**: this packages your application, all of its
   dependencies, and necessary setup in a single container&mdash;currently the
   most ubiquitous way of putting things into production. Containerization
   makes your app idempotent, avoiding the "it works on my machine" problem.

<!-- show the final product in illustration form: a fully-fledged machine -->

## Wait, but why?

<!-- industry application: ML is a component of a system -->
<!-- pedagogical application: will teach you the relevant parts -->
<!-- personal application: you can reuse images not just to coord with other's
code, but also to make deployable stuff for demos, fun things, etc. -->

## Ok, so what should I do?

<!-- this is the how, when illustrating these things, build-up the "final
machine" -->
<!-- for each point, write down what should they learn or the activities that
they should do + relevant resources: in learn git {learn
proper commit messages, learn git flow, etc.} -->

<!-- learn git => learn the tools -->
<!-- learn how to modularize your code => show that the components now look
better -->
<!-- learn flask => an interface for the machine -->
<!-- learn docker => the "frame" or the common interface into which these
things will fit in -->



## What's next?

<!-- if they enjoyed this, they can now do a lot of things: deployment,
devops,e tc. --> 
<!-- maybe there's an illustrative component for each? -->
<!-- more ways to improve the app -->

### Notes to the engineers

<!-- they're definitely making a containerized web server -->
