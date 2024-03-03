---
layout: post
type: post
title: "A lexical view of contrast pairs in preference datasets"
date: 2024-03-15
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [rlhf, preference data, llm, shp, openai, berkeley-nest]
description: |
    Can we spot differences between preference pairs just by looking at their word embeddings? 
    In this blog post, I want to share my findings from examining lexical distances between chosen and rejected responses in preference datasets.
---

<span class="firstcharacter">P</span>reference data is a staple in the final step of the LLM training pipeline.
During RLHF, we train a reward model by showing pairs of chosen and rejected model outputs so that it can teach a policy model how to generate more preferable responses.
The hope is: our reward model can capture the nuance in human preferences.

However, preference is subjective by nature, and few studies tried to articulate it.
For example, some looked into different aspects of a response's helpfulness / harmlessness ([Bai et al., 2022](https://arxiv.org/abs/2204.05862)) while others investigated surface-level characteristics like its length ([Singhal et al., 2023](https://arxiv.org/pdf/2310.03716.pdf)).

In this blog post, I want to offer a different approach: **what if instead of looking at qualitative aspects or token-level features, we use sentence embeddings?**
Sentence embeddings capture the lexical and semantic meaning of a text in a high-dimensional vector space.
Specifically, I'm curious if we can ascertain lexical differences between chosen and rejected responses *just* by looking at text embeddings.

## Getting preference data




## Computing embeddings

## Findings

### Lexical differences are apparent in some datasets

### Typical Elo ranking correlates with cosine distance

### Some tasks have more pronounced lexical differences


## Final thoughts