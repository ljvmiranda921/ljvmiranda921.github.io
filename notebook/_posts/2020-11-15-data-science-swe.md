---
layout: post
type: post
title: "How to improve software engineering skills as a researcher"
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

Let's break it down a bit:

1. **"Create a machine learning application..."**: this should be a model that
    receives an input, applies the necessary transformations, and returns an
    output. This can be anything, and it depends on what you're comfortable
    with. It could be a language model that measures sentiment, an OCR model
    that gives bounding boxes or a standard classifier given an arbitrary set of
    inputs. You decide! 
2. **"...that can receive HTTP requests..."**: if this is the first time you've
    encountered this, then don't fret! In Python, this may be as simple as
    learning a new library. HTTP is a standard that allows computers to talk to
    one another. Allowing your ML application to receive HTTP requests means
    that you're setting-up the "language" between your app and other
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

In short, we're creating a **Machine Learning (ML) Service.** You will hear
this term many times in the industry: software-as-a-service, microservice
architecture, API services, kubernetes service, and more. I assure you that
there is some relation among these terms. However, before we jump into the
*how*, I want to talk about *why creating an ML service is a perfect
introduction to learning software for researchers and data scientists*.

Lastly, note that **this blogpost is not a tutorial.** Instead, I'll touch upon
a skill roadmap that will enable you to build an ML service&mdash; i.e., "how
to get there." There are many resources available nowadays, and I'll talk about
my recommendations here!

## Wait, but why an ML Service?

There are three reasons why creating an  ML service is a researcher's perfect
introduction to software engineering:

* **Improves engineering sensibilities.** In most applications, ML services
    are treated as software components: each with an expected input and
    output. Learning how to build ML services gives us a unique perspective on
    how our ML models are used outside of the train-eval loop. 

    In addition, the competencies needed to create an ML service covers alot of the
    essential software skills to collaborate with engineers: (1)
    version-control, (2) proper software modularity, (3) knowledge of APIs, (4)
    dependency management, and so on. 

    <!-- Illustration here? -->
* **Increases familiarity with the ML workflow.** We're familiar with the ML
    experimentation workflow: label, train, evaluate, tuning, then so on. However,
    there is also a productization workflow where we deploy our models, perform
    A/B testing, take care of concept drift, and more. I even imagine it as two
    cycles syncing together (probably a new blogpost about this in the future).

    <!-- Illustration of a workflow here -->
    Building an ML Service gives us a glimpse on how ML models are productized. 
    We'll start to think about artifact versions, model dependencies, and
    so on. As a researcher, being able to see a model end-to-end, from
    conception to production, can give us an insight on how to improve the
    products we work on.

    As an aside, my fearless forecast is that the productization workflow will
    be democratized by up-and-coming ML Platforms and services. However,
    learning how they work, "to the metal," while they're still relevant can be
    a good experience.
* **Another tool under your belt to create more cool stuff.** Even if you won't
    be working as a full-fledged ML Engineer or Developer, the technologies
    you'll learn while building an ML Service enables you to do more things!

    As an academic, learning how to use Docker paves way for reproducibility.
    In addition, being more organized in writing code, in contrast to writing
    janky scripts here and there, can aid you in your research in the long-run.
    There's alot of things we can learn from software engineering to enhance
    our research workflows. For example, [I used containers, version-control,
    and LaTeX to write my Masters thesis before](http://localhost:4000/notebook/2018/02/04/continuous-integration-for-latex/)! The opportunities are endless!

    <!-- Illustration of a person with a toolbox here -->

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
