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
follow the classic IOB format for tagging, but as time passes, their labels have
enjoyed much more freedom.

Nowadays, we see NER datasets in all shapes and sizes: some involve long
contiguous spans of tokens, some have entities within entities, and some are
fragmented and vague. We don't work with clearly-bounded tokens anymore,
instead, we work with **spans**.

<!-- show example, maybe use displacy? -->

<!--

Back then it's IOB, quite simple. 
Now, there's a lot of freedom on how these token groups (or Spans) are defined.
Some involve contiguous sets of tokens, some have entities within entities, and
some are implicit and vague.
-->


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

