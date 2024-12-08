---
layout: post
type: post
title: "The missing pieces in Filipino NLP in the age of LLMs"
date: 2024-12-18
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
header-img:
tags:
  [
    tagalog,
    filipino,
    nlp,
    llm,
  ]
description: |
    The rise of LLMs is forcing us to rethink Filipino NLP. But there's still a ton of work to do&mdash;just not the stuff you might think. Here's my take on what's worth doing, what's a waste of time, and where Filipino NLP research should be heading.
excerpt: |
---

<span class="firstcharacter">W</span>hen I started working in Filipino NLP, I've focused a lot of my attention on building custom-made pipelines using prior linguistics knowledge.
Take [calamanCy](https://ljvmiranda921/calamanCy) for example: we spent countless hours annotating [named-entity recognition (NER)](https://aclanthology.org/2023.sealp-1.2/) and [dependency parsing data](https://huggingface.co/datasets/UD-Filipino/UD_Tagalog-NewsCrawl) to encode linguistic info and train specific components for NLP tasks.
Outside of pure linguistics research, these components are usually part of larger systems aimed at tasks like information extraction and question answering.
However, lately we've witnessed how LLMs can perform these downstream tasks end-to-end, without needing these components at all.

This year, we've also seen the release of capable multilingual LLMs such as Meta's [Llama 3.1+](https://ai.meta.com/blog/meta-llama-3-1/), Cohere for AI's [Aya Expanse](https://cohere.com/blog/aya-expanse-connecting-our-world), CMU's [Pangea](https://neulab.github.io/Pangea/), and even Southeast Asian models such as AI Singapore's [SEA-LION](https://sea-lion.ai/) and Sea AI's [Sailor](https://huggingface.co/collections/sail/sailor2-language-models-674d7c9e6b4dbbd9a869906b).
Sure, one can argue that they don't always work well on Filipino (and I've argued these before [[1](/notebook/2023/08/04/llm-tagalog/)] [[2](/notebook/2024/07/02/talk-dlsu/)]), but perhaps I'm getting [*scale-pilled*](https://arxiv.org/abs/2001.08361) now and it's only a matter of time before LLMs reach decent capabilities in Filipino.
This isn't a retraction of my previous arguments; we should still build artisanal Filipino NLP resources, but **we should also build resources that support the training and evaluation of multilingual LLMs in order to advocate the representation of Philippine languages.**

> We should also build resources that support the training and evaluation
> of multilingual LLMs to advocate the representation of Philippine languages.

Our majority language, Tagalog, is still low-resource even in the age of LLMs.
Sometimes I feel a tinge of sadness when a research group releases a new multilingual LLM and Tagalog is not supported.
You can't blame them&mdash; there's not a lot of readily-available Tagalog data.
In fact, the largest Philippine language in terms of volume is Cebuano, not because of a dedicated group of Cebuano researchers but rather due to the proliferation of [lsjbot](https://en.wikipedia.org/wiki/Lsjbot) in Cebuano Wikipedia.
One can even argue that the texts produced by lsjbot do not correspond to how Cebuano is used by actual speakers.
There are still missing pieces ripe for research.

<!-- bar chart of Filipino Cebuano in Aya, in CommonCrawl, etc. -->

This brings us to three actionable directions for Filipino NLP: (1) create resources that support LLM post-training, (2) build reliable benchmarks for Filipino, and (3) participate in grassroots research and annotation efforts.


### Create resources that support post-training

Post-training is the stage in the large language modelling pipeline where we adapt a pretrained model to specific tasks, like following instructions given a prompt.
This stage usually involves two main steps: instruction finetuning (IFT) and preference finetuning (PreFT).
Most IFT data come in question-answering pairs containing a *user instruction*, an optional *context*, and a given response.
On the other hand, PreFT data consists of human preferences on model outputs which can be collected manually or using another LLM.

First, I want to focus on collecting post-training data because it can be tailored to specific purposes or domains, and it's more economical to run experiments on top of it.
This is unlike pretraining, which requires processing massive text corpora and very expensive to attempt.





### Build reliable benchmarks for Filipino


### Participate in grassroots research & annotation efforts

