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

<span class="firstcharacter">A</span>ll this time we've been hearing a lot about LLMs or large language models.
These LLMs often contain billions of parameters which helps them perform complicated computations for performing all sorts of tasks.
The size of "small" models being released right now is in the range of 7B--27B parameters, which might be 10GB to 50GB in storage size (still big!).
If we also account for the memory required to run them, then it's apparent that even "small" LMs will still require high-end consumer hardware to be accessible.

In a [survey I wrote](https://arxiv.org/abs/2604.21637) months ago, I looked into some scenarios where hardware constraints are more apparent, making it harder to access language models.
Unfortunately, we find these scenarios in the Global South.
For example, 

So how can we make existing models fit into these hardware-constrained environments?
In this blog post, I want to present three major *strategies*: **Tinyfication**, **Specialization**, and **Modularization**.

<!-- insert image -->

If you're an NLP researcher, you probably know about *methods* like compression, quantization, and the like.
My hope for naming these three strategies is to help practitioners take a step back on what they really wanted to do and then choose the right method for their chosen strategy.

## Tinyfication

<!-- for each strategy, talk about the underlying principle, pros and cons -->
The goal of tinyfication is to create a smaller version of a bigger model in order to fit some hardware constraint.


## Specialization



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