---
layout: post
type: post
title: "Not all NER datasets are created equal"
date: 2022-03-15
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, span categorization, spacy, spans, machine learning, natural language processing, linguistics]
description: |
    Named-entity recognition (NER) datasets come in different shapes and sizes.
    This structure also contributes to how well machine learning techniques
    perform on said task. In this blogpost, we'll characterize a few NER
    datasets, and examine how its form affects its difficulty.
excerpt: |
    Named-entity recognition (NER) datasets come in different shapes and sizes.
    This structure also contributes to how well machine learning techniques
    perform on said task. In this blogpost, we'll characterize a few NER
    datasets, and examine how its form affects its difficulty.
---


<span class="firstcharacter">N</span>amed-entity recognition (NER) is one of
the most common tasks in Natural Language Processing (NLP). It involves the
classification of word tokens into distinct categories. Usually, NER datasets
follow the classic [IOB
format](https://en.wikipedia.org/wiki/Inside%E2%80%93outside%E2%80%93beginning_(tagging))
for tagging, but as time passes, their labels have enjoyed much more freedom.

<!-- maybe an example / visual of the IOB format? -->

Nowadays, NER datasets come in all shapes and sizes: some involve long
contiguous spans of tokens, some have entities within entities, and some are
fragmented and vague. We don't work with clearly-bounded tokens anymore,
instead, we work with **spans**.

<!-- show example, maybe use displacy? -->

In the paper *Dissecting Span Identification Tasks with Performance Prediction*
(Papay et al., 2020), various NER datasets were profiled using the following
characteristics:

- **Span Length**
- **Span Frequency**
- **Span Distinctiveness**
- **Boundary Distinctiveness**

In this blogpost, we'll characterize NER datasets using these metrics.  We will
also perform NER using standard techniques such as CRFs, LSTMs, and [spaCy's
span categorizer (SpanCat)](https://spacy.io/api/spancategorizer)[^1] and
observe how well their performance is affected by these characteristics. My
goal is similar (or in some way, a reproduction) to Papay et al's work:
**create a general decision framework to identify which technique works best
given a particular dataset.**



<!--

- What is NER
    - NER datasets in the wild
- Introduce Papay et al's work: introduce 4 span characteristics
- Introduce the datasets we'll use
    - Standard NER: OntoNotes, ConLL
    - Quotation detection: RIQUA
    - Nested NER: ACE2004, ACE2005, GENIA
    - A few domain-specific datasets: EBM-NLP
-->


### Footnotes

[^1]:
    
    We will be using spaCy's SpanCat instead of its built-in NER because our
    datasets contain overlapping entities, which the latter isn't made for. For
    the sake of consistency, I'll be using SpanCat all throughout.
