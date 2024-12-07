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

