---
layout: post
type: post
title: "Strategies for Building Edge LMs"
date: 2026-10-24
category: notebook
comments: true
author: "LJ V. MIRANDA"
published: true
filipino_nlp: false
header-img: /assets/images/llm-raspberry-pi/header.png
tags: [edge lm, local lm, llm, small language models, global south, equitable ai, raspberry pi, on-device ai, quantization, llama.cpp, gguf, edge computing, hardware, pruning, compression, distillation]
description: |
    In this blog post, I want to distill my thoughts on how we can actually build smaller and more capable language models. I'll enumerate three major strategies, read the blog to find out what they are!
excerpt: |
---

<span class="firstcharacter">A</span>ll this time we've been hearing a lot about large language models (LLMs).
These models pack billions of parameters to help them perform complicated calculations for all sorts of tasks.
These models are "large" and rightfully so: the smallest models being released right now are in the range of 7B--27B parameters, requiring tons of storage and RAM.
Running these models in full-precision on a consumer hardware is nigh impossible.

In a [survey I wrote](https://arxiv.org/abs/2604.21637) a few months ago, I looked into some scenarios where hardware constraints are more apparent, thereby restricting access to language models.
Unfortunately, we find a lot of these scenarios in the Global South.
For example, the devices people own are mostly low-end (an entry-level phone can cost up to 48% of monthly income), and Internet access is limited in many of the most linguistically diverse countries (e.g., Nigeria and Chad), so neither on-device nor cloud inference is a given.

So how can we make existing models fit into these hardware-constrained environments?
In this blog post, I want to present three major *strategies*: **Tinyfication**, **Specialization**, and **Modularization**.
If you're an NLP researcher, you probably know about *methods* like distillation, quantization, and the like.
My hope for naming these three strategies is to help practitioners take a step back on what they really wanted to do and then choose the right method for their chosen strategy.

<!-- insert image -->


You might also notice that some of the works I'll mention below are post-training interventions, i.e., we start from an already large model, and attempt to make it smaller to fit a hardware requirement.
I decided to focus on this aspect of building edge LLMs because pretraining from scratch can be more expensive while involving more design decisions.
I believe post-training interventions are much simpler and much easier to wrap one's head upon.

## Tinyfication

<!-- for each strategy, talk about the underlying principle, pros and cons -->
The goal of tinyfication is to create a smaller version of a bigger model in order to fit a hardware constraint.
This strategy is quite common in the Local LM space with the popularity of quantized models (or quants) that you can run with tools like llama-cpp or ollama.

<!-- explain the technology -->
These quants are based on a technique called **quantization**
The idea is to...
There are many approaches but the most popular one is GGML.


## Specialization

<!--
models are large to store this vast parametric knowledge...
but for some cases, we really don't need quite a lot...
-->


## Modularization

## Final thoughts

I hope you enjoyed reading through this work! If you do, I highly encourage you to [check out our survey](/multilinguality-at-the-edge/) and cite us below:

```bibtex
@misc{miranda2026multilingualityedgedevelopinglanguage,
  title={Multilinguality at the Edge: Developing Language Models for the Global South},
  author={Lester James Validad Miranda and Songbo Hu and Roi Reichart and Anna Korhonen},
  year={2026},
  eprint={2604.21637},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  url={https://arxiv.org/abs/2604.21637},
}
```