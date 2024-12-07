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

<span class="firstcharacter">W</span>hen I started working in Filipino NLP, I've focused a lot on building custom-made pipelines using prior linguistics knowledge.
Take [calamanCy](https://ljvmiranda921/calamanCy) for example: we spent countless hours annotating [named-entity recognition (NER)](https://aclanthology.org/2023.sealp-1.2/) and [dependency parsing data](https://huggingface.co/datasets/UD-Filipino/UD_Tagalog-NewsCrawl) to encode linguistic info and train specific components for NLP tasks.
However, outside of pure linguistics research, these components are usually part of larger systems aimed at tasks like information extraction and question answering.
In the past years, we've seen how LLMs can perform these downstream tasks end-to-end, without needing these components at all.

Recently, we've seen the release of capable multilingual LLMs such as Meta's [Llama 3.1+](https://ai.meta.com/blog/meta-llama-3-1/), Cohere for AI's [Aya Expanse](https://cohere.com/blog/aya-expanse-connecting-our-world), and even Southeast Asian models such as AI Singapore's [SEA-LION](https://sea-lion.ai/) and Sea AI's [Sailor](https://huggingface.co/collections/sail/sailor2-language-models-674d7c9e6b4dbbd9a869906b).
Sure, one can argue that they don't always work well on Filipino (and I've argued these before [[1](/notebook/2023/08/04/llm-tagalog/)] [[2](/notebook/2024/07/02/talk-dlsu/)]), but perhaps I'm getting [*scale-pilled*](https://arxiv.org/abs/2001.08361) now and it's only a matter of time before LLMs reach these decent Filipino language capabilities.
This isn't a retraction of my previous arguments; we should still build artisanal Filipino NLP resources, but **we should also build resources that support the training and evaluation of multilingual LLMs.**