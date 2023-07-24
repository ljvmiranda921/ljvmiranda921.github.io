---
layout: post
type: post
title: "Do large language models understand Tagalog?"
date: 2023-10-04
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, tagalog, low-resource languages, prodigy, natural language processing, machine learning]
description: |
    Large language models showed promise on structured prediction tasks like named entity recognition and text categorization.
    But how well do they perform when presented with Tagalog text?
    In this blog post, I'll share some of my preliminary benchmarking results.
excerpt: |
    Large language models showed promise on structured prediction tasks like named entity recognition and text categorization.
    But how well do they perform when presented with Tagalog text?
    In this blog post, I'll share some of my preliminary benchmarking results.
---

<span class="firstcharacter">A</span> few months ago, I saw an [interesting blog post](https://stories.thinkingmachin.es/llm-customer-sentiment-analysis/) from Thinking Machines where they ran Filipino tweets on GPT-4 for a sentiment analysis task.
They claim a weighted F1-score of 76%&mdash; pretty decent for a straightforward zero-shot approach.[^1]
I was inspired to run a proper benchmark given the corpora I had in [calamanCy](https://github.com/ljvmiranda921/calamancy), so this blog post was born!




### Footnotes

[^1]:

    The experimental details were a bit sparse. 
    The weighted F1-score may not be too informative of a metric given the potential class imbalance between labels (I'm assuming there are *many* more negative tweets than positive).
    Reporting macro recall might be more relevant in this case.

