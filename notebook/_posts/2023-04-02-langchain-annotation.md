---
layout: post
type: post
title: "Labeling with GPT-3 using annotation guidelines"
date: 2023-04-02
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [langchain, nlp, llm, data annotation, prodigy, natural language processing, chatgpt, gpt-j, gpt-3]
header-img: /assets/png/argument-mining/header.png
description: |
    As an extension of my previous post on using LLMs to annotate argument
    mining datasets, I want to explore how we can incorporate annotation
    guidelines into a prompt so that LLMs can use them as additional context for
    annotation.
excerpt: |
    As an extension of my previous post on using LLMs to annotate argument
    mining datasets, I want to explore how we can incorporate annotation
    guidelines into a prompt so that LLMs can use them as additional context for
    annotation.
---

<span class="firstcharacter">P</span>reviously, I investigated how we can
incorporate large language models (LLMs) into our annotation workflows. It was a
fun [blog post](/notebook/2023/03/28/llm-annotation/), and I encourage you to
read it! This time, I want to extend this idea by **including annotation
guidelines.** Because these guidelines were written to define the parameters of a task, 
we hope that including them in the prompt can lead to better few-shot predictions.

<!-- insert figure -->

<!-- review the process, the dataset you're using, etc. -->

I can imagine two potential applications from this workflow:
- Get few-shot annotations by feeding the annotation guidelines into the prompt.
- Highlight passages from the annotation guideline that are relevant to the labeling task.

> I'll be using the [Prodigy](https://prodi.gy) annotation tool and
> [LangChain](https://github.com/hwchase17/langchain) library in this work. 
> You can find the Prodigy recipe in this [Github repository]() (see [caveats](#caveats)).


## Feeding annotation guidelines into the prompt

<!-- talk about four chain types -->


## Highlighting relevant passages via embeddings


## Evaluation

<!-- talk about normalizing the labels across guidelines -->


### Few-shot annotation accuracy


### Cross-topic evaluation