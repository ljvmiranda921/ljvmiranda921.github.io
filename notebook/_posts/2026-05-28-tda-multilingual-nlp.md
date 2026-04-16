---
layout: post
type: post
title: "The shape of multilingual synthetic data using topological data analysis"
date: 2026-05-28
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags:
  [
    nlp,
    topology,
    synthetic data,
    research,
    natural language processing,
    llm,
    multilingual nlp,
  ]
description: |
    In this blog post, I jot down my notes and early explorations on topology to better understand
    multilingual synthetic data.
excerpt: |
---

<span class="firstcharacter">F</span>or the past few months, I've been exploring how we can obtain high-quality multilingual data at scale.
A common approach is to collect this data from native human speakers, giving us **natural data**, but this process is quite costly and time-consuming.
Another option is to generate from language models (LMs), giving us what we call **synthetic data**.
In my recent work, [Polyglot Teachers](https://arxiv.org/abs/2604.11290), I evaluated which models are good at generating multilingual data&mdash; it's quite empirical and rigorous.
However, I want to take this a bit further: is there a fundamental *shape* for natural data? And how close are current synthetic datasets to it?
I find this interesting because it has a lot of potential applications such as guided data generation or measuring the quality of synthetic data.

Luckily, we can glean some insights from the field of topological data analysis (TDA)

