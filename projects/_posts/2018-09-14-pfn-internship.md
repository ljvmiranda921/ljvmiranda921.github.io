---
layout: post
title: "PFN Internship: ChainerRL Parallelization"
date: 2018-09-14
category: projects
comments: true
author: "LJ MIRANDA"
summary: "Discussion of my open-source internship project in Preferred Networks"
tags: [reinforcement learning, chainer, chainerrl, parallelization, internship, preferred networks]
---

> This work was done as part of my internship in Preferred Networks.

This summer, I joined [Preferred
Networks](https://www.preferred-networks.jp/ja/) as an intern and worked on
[ChainerRL](https://github.com/chainer/chainerrl), their open-source library
for reinforcement learning. The last six weeks were great! I learned a lot
about the field, met many brilliant researchers, and had a taste of working in
the industry&mdash;a perfect way to cap-off my Masters degree. 

My intern project revolves around ChainerRL parallelization, that is, I need to
implement a way to maximize "compute"  so that an agent can learn a task at
less time. This feature is important because experiment turnaround time has
been a major bottleneck in reinforcement learning (Stooke and Abbeel,
[2018](#stooke2018accelerated)). In this post, I would like to share a short
write-up of my work: a description of the task, my implementation, challenges,
and some project outcomes.  Here's an outline:

* What is ChainerRL?
* 

## References

* <a id="stooke2018accelerated">Stooke, Adam and Abbeel, Peter</a> (2018).
    "Accelerated Methods for Deep Reinforcement Learning". In:
    *arXiv:1803.0281v1[cs.LG]*
