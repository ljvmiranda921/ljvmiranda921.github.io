---
layout: post
type: post
title: "From DevOps to 'LLMOps': software trends in the face of LLMs"
date: 2023-04-10
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [langchain, nlp, llm, data annotation, prodigy, natural language processing, chatgpt, gpt-j, gpt-3]
header-img: /assets/png/llmops/header.png
description: |
excerpt: |
---

<span class="firstcharacter">A</span>s large language models (LLMs) dominate the
public zeitgeist, I started to wonder how they can impact our current software practices. In my five years in the industry, I've worked on good old-fashioned ETL
pipelines to dedicated machine learning applications. However, language models are a different
kind of software artifact, it's like *clay*, and I'm curious how they can change
how we build software today.

In this blog post, I will examine trends in software. I divided these into three
phases&mdash;DevOps,[^1] MLOps, and LLMOps. I will focus on the **logical
layer**, i.e., the layer responsible for transforming inputs into our desired output. 
Here are some examples to further delineate the three:

| Phase  | Description                                                                 | Logical Layer                         | Examples of Logical Layer          | Example Applications                                        |
|--------|-----------------------------------------------------------------------------|---------------------------------------|------------------------------------|-------------------------------------------------------------|
| DevOps | Operationalizing software without machine learning                          | Handcrafted data transformation rules | The T in ETL, business rules, etc. | ETL Pipeline, Web Application, any non-ML software          |
| MLOps  | Operationalizing ML-powered software applications                           | Machine learning models                | Finetuned BERT on a domain         | Semantic search engine, task-oriented dialogue system, etc. |
| LLMOps | Operationalizing apps that make full use of in-context learning / prompting | Large language models                 | GPT-3.5/4.0, PaLM, LLaMa, etc.     | Chat interfaces, text summarizers, any of the above         |


> Logical layer, the layer responsible for transforming inputs
> into our desired output.


[^1]:

    *DevOps* is a contentious term. In this blog post, think of this more as
    operationalizing software applications that don't have any machine learning
    components (e.g., your standard ETL pipeline, a web app, etc.).


### Footnotes