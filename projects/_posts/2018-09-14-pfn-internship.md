---
layout: post
title: "ChainerRL Parallelization (PFN Internship)"
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
about the field, met many brilliant researchers, and experienced industrial
machine learning research&mdash;a perfect way to cap-off my Masters degree. 

My intern project revolves around ChainerRL parallelization, where I need to
implement a way to maximize *compute*  so that an agent learns a task in less
time. This feature is important because experiment turnaround time has been a
major bottleneck in reinforcement learning (Stooke and Abbeel,
[2018](#stooke2018accelerated)). If we can speed up agent training, then we can
speed up experimentation. 

This post is a short write-up of my work: I will describe the whole engineering
process from defining the problem, my implementation, and some simulation
results. I will skip over some reinforcement learning basics
(agent-environment, value functions, etc.), so that I can focus more on
describing the implementation and engineering details. Below is a short
outline:

* [A short introduction to ChainerRL](#intro)
* [Continuous training in reinforcement learning](#continuous)
* Batch Proximal Policy Optimization (PPO) implementation
* Simulation results (Gym and MuJoCo environments)
* Conclusion

## <a id="intro"></a> A short introduction to ChainerRL

ChainerRL is a reinforcement learning framework built on-top of Chainer (think
Tensorflow or Pytorch). It contains an extensive API that allows you to define
your agent, its policy, the environment, and the overall training routine:

![overview](/assets/png/pfn2018intern/chainerrl-overview.png){:width="720px"}

It is convenient to use ChainerRL: simply create a model and an optimizer, pass
them into an instance of your agent, and have your agent interact with the training
environment. There's a variety of policies and agents included in the library,
you just need to import them and set their hyperparameters. Its basic usage can
be summarized in a diagram:

![usage](/assets/png/pfn2018intern/chainerrl-basic-usage.png){:width="720px"}

> If your interest was piqued with what I just mentioned, feel free to go over
> this short "Getting Started into ChainerRL" notebook to experience all of its
> basic features.  

In ChainerRL, the interaction between the agent and the environment is done in
an episodic manner. This means that once a `done` signal is sent, the
interaction simply ends. Here's a simple Markov diagram explaining this process
(At time $$t$$, $$S_t$$ is the state, $$A_t$$ is the action, and $$R_t$$ is the
reward): 


![episodic](/assets/png/pfn2018intern/chainerrl-episodic.png){:width="720px"}

Given a state $$S_t$$, we take an action $$A_{t}$$ to produce the next state
$$S_{t+1}$$. We do this for a number of timesteps until the environment signals
that the interaction is already done. The agent does not recognize the value
of being in the terminal state, $$V(S) = 0$$ if done, and so we repeat the
another episode (or terminate) into a clean slate. 

This is the usual way of doing reinforcement learning, nothing fishy about it.
However, **episodic training, which is only available in ChainerRL, cannot
support parallelism**.  Thus, we need to extend ChainerRL's API. In the next
section, I will explain what continuous training is, and why it's capable of
supporting parallel agent-environment interactions. 

## <a id="continuous"></a> Continuous training in reinforcement learning


## References

* <a id="stooke2018accelerated">Stooke, Adam and Abbeel, Peter</a> (2018).
    "Accelerated Methods for Deep Reinforcement Learning". In:
    *arXiv:1803.0281v1[cs.LG]*
