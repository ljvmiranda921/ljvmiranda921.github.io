---
layout: post
type: post
title: "Not all NER datasets are created equal"
date: 2022-03-30
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
classification of word tokens into distinct categories. Usually, named-entities
are defined over clear and exact token boundaries, but over time, these
entities have enjoyed much more flexibility.

Nowadays, NER datasets come in all shapes and sizes: some involve long
contiguous spans of tokens, some have entities within entities, and some are
fragmented and vague. We don't work with clearly-bounded tokens anymore,
instead, we work with **spans**.

<div class="spans" style="line-height: 2.5; direction: ltr; text-align:
center">Welcome to the <span style="font-weight: bold; display: inline-block;
position: relative;"> Bank<span style="background: #7aecec; top: 40px; height:
4px; left: -1px; width: calc(100% + 2px); position: absolute;"> </span> <span
style="background: #7aecec; top: 40px; height: 4px; border-top-left-radius:
3px; border-bottom-left-radius: 3px; left: -1px; width: calc(100% + 2px);
position: absolute;"> <span style="background: #7aecec; color: #000; top:
-0.5em; padding: 2px 3px; position: absolute; font-size: 0.6em; font-weight:
bold; line-height: 1; border-radius: 3px"> ORG </span> </span> </span> <span
style="font-weight: bold; display: inline-block; position: relative;">of <span
style="background: #7aecec; top: 40px; height: 4px; left: -1px; width:
calc(100% + 2px); position: absolute;"></span></span> <span style="font-weight:
bold; display: inline-block; position:relative;"> China<span style="background:
#7aecec; top: 40px; height: 4px;left: -1px; width: calc(100% + 2px); position:
absolute;"> </span><span style="background: #feca74; top: 57px; height: 4px;
left: -1px; width: calc(100% + 2px); position: absolute;"> </span><span
style="background: #feca74; top: 57px; height: 4px; border-top-left-radius:
3px; border-bottom-left-radius: 3px; left: -1px; width: calc(100% + 2px);
position: absolute;"> <span style="background: #feca74; color: #000; top:
-0.5em; padding: 2px 3px; position: absolute; font-size: 0.6em; font-weight:
bold; line-height: 1; border-radius: 3px"> GPE </span> </span></span> . </div>

&nbsp;

<div class="spans" style="width: 60%; line-height: 2.5; direction: ltr;
text-align: center; margin: auto;"> <span style="font-weight: bold; display:
inline-block; position: relative;"> Multivariate <span style="background: #ddd;
top: 40px; height: 4px; left: -1px; width: calc(100% + 2px); position:
absolute;"> </span><span style="background: #7aecec; top: 40px; height: 4px;
border-top-left-radius: 3px; border-bottom-left-radius: 3px; left: -1px; width:
calc(100% + 2px); position: absolute;"> <span style="background: #7aecec; z-index:
10; color: #000; top: -0.5em; padding: 2px 3px; position: absolute; font-size:
0.6em; font-weight: bold; line-height: 1; border-radius: 3px">
METHOD</span></span> </span> <span style="font-weight: bold; display:
inline-block; position: relative;"> analysis <span style="background: #7aecec;
top: 40px; height: 4px; left: -1px; width: calc(100% + 2px); position:
absolute;"> </span> </span> revealed that <span style="font-weight: bold;
display: inline-block; position: relative;"> septic <span style="background:
#feca74; top: 40px; height: 4px; left: -1px; width: calc(100% + 2px); position:
absolute;"> </span> <span style="background: #feca74; top: 40px; height: 4px;
border-top-left-radius: 3px; border-bottom-left-radius: 3px; left: -1px; width:
calc(100% + 2px); position: absolute;"> <span style="background: #feca74; z-index:
10; color: #000; top: -0.5em; padding: 2px 3px; position: absolute; font-size:
0.6em; font-weight: bold; line-height: 1; border-radius: 3px"> FACTOR </span>
</span> </span> <span style="font-weight: bold; display: inline-block;
position: relative;"> shock <span style="background: #feca74; top: 40px; height:
4px; left: -1px; width: calc(100% + 2px); position: absolute;"> </span> </span>
is an independent <span style="font-weight: bold; display: inline-block;
position: relative;"> risk <span style="background: #feca74; top: 40px; height:
4px; left: -1px; width: calc(100% + 2px); position: absolute;"> </span> <span
style="background: #feca74; top: 40px; height: 4px; border-top-left-radius: 3px;
border-bottom-left-radius: 3px; left: -1px; width: calc(100% + 2px); position:
absolute;"> <span style="background: #feca74; z-index: 10; color: #000; top:
-0.5em; padding: 2px 3px; position: absolute; font-size: 0.6em; font-weight:
bold; line-height: 1; border-radius: 3px"> FACTOR </span> </span> </span> <span
style="font-weight: bold; display: inline-block; position: relative;"> factor
<span style="background: #feca74; top: 40px; height: 4px; left: -1px; width:
calc(100% + 2px); position: absolute;"> </span> </span> <span
style="font-weight: bold; display: inline-block; position: relative;"> for
<span style="background: #feca74; top: 40px; height: 4px; left: -1px; width:
calc(100% + 2px); position: absolute;"> </span> </span> <span
style="font-weight: bold; display: inline-block; position: relative;"> 30 <span
style="background: #feca74; top: 40px; height: 4px; left: -1px; width: calc(100% +
2px); position: absolute;"> </span> <span style="background: #feca74; top: 57px;
height: 4px; left: -1px; width: calc(100% + 2px); position: absolute;"> </span>
<span style="background: #ddd; top: 57px; height: 4px; border-top-left-radius:
3px; border-bottom-left-radius: 3px; left: -1px; width: calc(100% + 2px);
position: absolute;"> <span style="background: #ddd; z-index: 10; color: #000;
top: -0.5em; padding: 2px 3px; position: absolute; font-size: 0.6em;
font-weight: bold; line-height: 1; border-radius: 3px"> EFFECT </span>
</span></span> <span style="font-weight: bold; display: inline-block; position:
relative;"> day <span style="background: #feca74; top: 40px; height: 4px; left:
-1px; width: calc(100% + 2px); position: absolute;"> </span> <span
style="background: #ddd; top: 57px; height: 4px; left: -1px; width: calc(100% +
2px); position: absolute;"> </span> </span> <span style="font-weight: bold;
display: inline-block; position: relative;"> mortality <span style="background:
#feca74; top: 40px; height: 4px; left: -1px; width: calc(100% + 2px); position:
absolute;"> </span> <span style="background: #ddd; top: 57px; height: 4px;
left: -1px; width: calc(100% + 2px); position: absolute;"> </span> </span> .
</div>

&nbsp;

In the paper *Dissecting Span Identification Tasks with Performance
Prediction*, Papay et al., profiled various NER datasets using the following
characteristics: span length, span frequency, span distinctiveness, and
boundary distinctiveness.

- **Span Length**: describes how long on average a span is in tokens.
- **Span Frequency**: describes how often a particular span entity occurs in
    the dataset.
- **Span Distinctiveness**: describes how distinct the words are inside the
    spans compared to the corpus. Computed as the KL-divergence of their
    unigram distributions.
- **Boundary Distinctiveness**: describes how distinct the span boundaries are
    compared to the rest of the corpus. Computed as the KL-divergence of their
    unigram distributions.

Personally, I like this approach because it gives [a data-centric
view](/notebook/2021/07/30/data-centric-ml/) of your problem: investigate the
characteristics of your data first before jumping head-on to building models.
It's much more realistic and grounded.

In this blogpost, we'll characterize NER datasets using these metrics.  We will
also perform NER using standard techniques such as CRFs, LSTMs, and [spaCy's
span categorizer (SpanCat)](https://spacy.io/api/spancategorizer)[^1] and
observe how well their performance is affected by these characteristics. My
goal is similar (or in some way, a reproduction) to Papay et al's work:
**create a general decision framework to identify which technique works best
given a particular dataset.**

## Quick view of our datasets

First off, let's 


## Effect of span length on model performance


## Effect of span and boundary distintiveness on model performance






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
