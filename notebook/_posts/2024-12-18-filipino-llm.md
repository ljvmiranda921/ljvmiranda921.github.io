---
layout: post
type: post
title: "The missing pieces in Filipino NLP in the age of LLMs"
date: 2024-12-18
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
header-img: /assets/png/filipino-llm/header.png
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

Tagalog is still low-resource even in the age of LLMs.
Sometimes I feel a tinge of sadness when a research group releases a new multilingual LLM and Tagalog is not supported.
You can't blame them&mdash; there's not a lot of readily-available Tagalog data for LM training.
There are still missing pieces ripe for research.

This brings us to three actionable directions for Filipino NLP: (1) create resources that support LLM post-training, (2) build reliable benchmarks for Filipino, and (3) participate in grassroots research and annotation efforts.
**Also, if you are interested to collaborate in these types of efforts, feel free to [reach out](mailto:ljvmiranda@gmail.com)!**


### Create resources that support post-training

<p style="border:3px; border-style:solid; border-color:#a00000; padding: 1em;">
<b>Key Insight:</b> 
Better to focus on post-training since it requires relatively lower investment than pretraining.
Prioritize collecting instruction finetuning datasets since it's in this step where we usually observe significant performance gains. 
Better if they contain general chat, but domain-specific data should also work.
</p>

Post-training is the stage in the large language modelling pipeline where we adapt a pretrained model to a specific style of input for chat interactions, such as following natural language instructions and responding in accordance with human preferences among many others.
This stage usually involves two main steps: **instruction finetuning (IFT)** and **preference finetuning (PreFT)**.
Most IFT data comes in question-answer pairs containing a *user instruction*, an optional *context*, and a given *response*.
PreFT data, on the other hand, consists of human preferences on model outputs, which can be collected either [manually](https://arxiv.org/abs/2204.05862) or using [another language model](https://arxiv.org/abs/2310.01377) (or a [combination of both](https://arxiv.org/abs/2410.19133)).

![](/assets/png/filipino-llm/llm_training.png){:width="700px"}  
*A simple language modelling pipeline (as seen in models like InstructGPT, Tulu 2, etc.).  
Currently, we lack quality Filipino data for post-training.*
{: style="text-align: center;"}

I want to focus on collecting post-training data because it can be tailored to specific domains and is more economical to run experiments with.
This is unlike pretraining, which requires processing massive text corpora and very expensive to attempt.
**As of now, Philippine languages lack quality post-training data.**
The best we have so far in IFT is the Aya dataset, with around X.XXk samples for Tagalog and X.XXk for Cebuano.
In fact, the largest Philippine language in IFT is Cebuano, not because of a dedicated group of Cebuano researchers but rather due to the proliferation of [lsjbot](https://en.wikipedia.org/wiki/Lsjbot) in Cebuano Wikipedia.
One can even argue that the texts produced by lsjbot do not correspond to how Cebuano is used by actual speakers.

> Philippine languages lack quality post-training data

<!-- bar chart of Tagalog Cebuano in AYa -->

There are many ways to collect IFT data.





### Build reliable benchmarks for Filipino


### Participate in grassroots research & annotation efforts

