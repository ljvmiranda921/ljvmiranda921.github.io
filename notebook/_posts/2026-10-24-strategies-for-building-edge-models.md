---
layout: post
type: post
title: "Strategies for Building Edge Language Models"
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

In the past few months, I've been working on developing edge language models (LMs) and studying how they are built.
I [wrote a survey](https://arxiv.org/abs/2604.21637) out of it, and I learned through this process that there are so many methods available for training small LMs.
In this blog post, I want to synthesize what I've learned and present three major strategies for training edge LMs.

*But first, what are edge models?*
All this time we've been hearing a lot about LLMs or **large** language models.
These LLMs often contain billions of parameters which helps them perform complicated computations for performing all sorts of tasks.
The size of "small" models being released right now is in the range of 7B--27B parameters, which might be 10GB to 50GB in storage size (still big!).
If we also account for the memory required to run them, then it's apparent that even "small" LMs will still require high-end consumer hardware to be accessible.

Edge LMs are built by

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