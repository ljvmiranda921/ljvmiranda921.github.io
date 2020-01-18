---
layout: post
title: "Kubernetes clicked when I learned about Deployments and Services"
date: 2020-01-18
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [kubernetes, deployments, services, k8s, cloud-native, cloud computing]
description: |
    I've been using Kubernetes for a few months, but this tech only *clicked*
    when I learned about Deployments and Services. I argue that all
    "Introduction to Kubernetes" tutorials should start with that.
excerpt: "I should've first learnt Kubernetes through Deployments and Services"
---


It took me a long time to wrap my head around the idea of
[Kubernetes](https://kubernetes.io/). Even if I've done some projects using k8s
before, there's still this voice at the back of my head saying: *"Ok, I really
don't how this whole thing works."* However, a few months ago, I've learned
about
[Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
and
[Services](https://kubernetes.io/docs/concepts/services-networking/service/),
and the whole thing suddenly clicked!

In this blogpost, I'll talk about my journey in understanding Kubernetes&mdash;where
learning Pods and Nodes proved to be a false start&mdash;and why I think that
Deployments and Services is a good place to begin. Lastly, I'd argue that k8s
*may* be better taught first with the concept of Deployments and Services
(D&S)![^1] 


This post is divided into three parts:
- Why starting with Pods and Nodes didn't help me
- Why starting with Deployments and Services clicked right away
- How we should start thinking about Deployments and Services

Before we begin, a little something about myself: before learning Kubernetes,
I'm already familiar with container tools such as Docker or docker-compose.
I've built simple web applications before and deployed them to platforms like
[Heroku](https://www.heroku.com/) or [App Engine](https://cloud.google.com/appengine/) so I kinda get the idea of "putting something in the
internet." Perhaps this has affected my learning trajectory for k8s, and might
be different for you or your team.

Lastly, this is not a tutorial about Deployments and Services. I may be
explaining these concepts at the latter part of my post, but I might pull-in
some basic Kubernetes concepts here and there.

## Why starting with Pods or Nodes didn't help me

### Pods are simple at first, but overloads you in a while

Most tutorials I've seen in the Internet starts with a
[Pod](https://kubernetes.io/docs/concepts/workloads/pods/pod/), and for good
reason: because you can think of Pods as a basic unit in Kubernetes. In many
cases, a Pod is often mapped to a container. 

*Ok, that's cool! I can now map what I know to this new Kubernetes concept!* So
where did the confusion began? It began when I saw notes like these:

> "Pods that (can) run multiple containers that need to work together." [("Understanding Pods", Kubernetes Documentation)](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/#understanding-pods)

*Ok sure, that's new, I guess I can deal with that.*

> "Kubernetes uses a higher-level abstraction, called a Controller, that
> handles the work of managing the relatively disposable Pod instances. Thus,
> while it is possible to use Pod directly, it’s far more common in Kubernetes
> to manage your pods using a Controller." [("Working with Pods", Kubernetes
Documentation)](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/#working-with-pods)

*So now I need to learn another concept just to apply this new concept I've
learned?* (With the gift of hindsight, this statement has already hinted the
idea of Deployments.) 

I think that the main reason why a Pod is a poor starting point in learning
Kubernetes is because **it does not provide an "actionable" mapping of what I
already know and what I'm trying to learn.** Even if I now know that a Pod is a
basic unit and it maps to a container, it is not actionable enough that I can
apply this knowledge when using Kubernetes. On another note, starting from Pods
will inadvertently add another hoop to jump onto&mdash; I need to now know what
Controllers are, and there's [three of
them](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/#pods-and-controllers)
for my novice mind to learn.  


## Why starting from D&S clicked right away


We should start with D&S because: 
1. Gives a good framework to think about Kubernetes 
2. Easily onboards someone on your Kubernetes project; and
3. Serves as a starting point for learning about Kubernetse objects

## How we should start thinking about D&S 

### Footnotes

[^1]: Kudos to the Kubernetes Documentation team for following a similar pattern in one of their [tutorials!](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
