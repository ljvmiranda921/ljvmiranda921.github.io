---
layout: post
type: post
title: "calamanCy: NLP pipelines for Tagalog"
date: 2023-08-07
category: projects
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, language technology, natural language processing, tagalog, low resource, spacy, machine learning]
description: |
    I am excited to introduce calamanCy, an open-source toolkit for constructing natural language processing pipelines for Tagalog.
    Read this blog post to learn more! You can also find calamanCy on Github: https://github.com/ljvmiranda921/calamanCy
excerpt: |
    I am excited to introduce calamanCy, an open-source toolkit for constructing natural language processing pipelines for Tagalog.
    Read this blog post to learn more! You can also find calamanCy on Github: https://github.com/ljvmiranda921/calamanCy
---

<a href="https://github.com/ljvmiranda921/calamanCy"><img style="position: absolute; top: 0; left: 0; border: 0;" src="https://camo.githubusercontent.com/567c3a48d796e2fc06ea80409cc9dd82bf714434/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png"></a>

<img src="https://raw.githubusercontent.com/ljvmiranda921/calamanCy/master/logo.png" width="120" height="120" align="right" />


<span class="firstcharacter">I</span> am excited to introduce [**calamanCy**](https://github.com/ljvmiranda921/calamanCy), an open-source toolkit for constructing natural language processing (NLP) pipelines for Tagalog.
It is built on top of [spaCy](https://spacy.io) to ensure easy experimentation and integration with other frameworks.
It provides general-purpose multitask models with out-of-the-box support for dependency parsing, part-of-speech (POS) tagging, and named entity recognition (NER).
The repository is available [on Github](https://github.com/ljvmiranda921/calamanCy), and you can install the package via `pip`:

```
pip install calamancy
```

More importantly, calamanCy aims to accelerate the progress of Tagalog NLP by consolidating disjointed resources in a unified framework.
In this blog post, I want to talk about the problem it's trying to solve, my process on building the framework, some benchmarks, and future work.

## Tagalog NLP resources are disjointed

Despite Tagalog being a widely-spoken language here in the Philippines, model and data resources are still scarce.
For example, our Universal Dependencies (UD) treebanks are tiny (less than 20k words) ([Samson, 2018](#samson2018trg); [Aquino and de Leon, 2020](#aquino2020ugnayan)) 
and domain-specific corpora are few and far between ([Cabasag et al., 2019](#cabasag2019hatespeech); [Livelo and Cheng, 2018](#livelo2018dengue)).

In addition, we only have limited choices when it comes to Tagalog language models (LMs).
For monolingual LMs, the state-of-the-art is RoBERTa-Tagalog ([Cruz and Cheng, 2021](#cruz2021tlunified)).
For multilingual LMs, we have the usual XLM-RoBERTa ([Conneau et al., 2019](#conneau2019xlmr)) and multilingual BERT ([Devlin et al., 2019](#devlin2019bert)).
Tagalog is included in their training pool, but these models are still prone to the curse of multilinguality.


Therefore, consolidating these resources and providing more options to build Tagalog NLP pipelines is still an open problem.

## ...enter calamanCy, an effort to consolidate these resources

calamanCy provides three language pipelines that fit any performance or accuracy requirements. 
Each pipeline provides out-of-the-box support for core NLP tasks:




## References

- <a id="samson2018trg">Stephanie Dawn Samson.</a> 2018. A treebank prototype of Tagalog. Bachelor’s thesis, University of Tübingen, Germany.
- <a id="aquino2020ugnayan">Angelina A. Aquino and Franz A. de Leon.</a> 2020. Parsing in the absence of related languages: Evaluating low-resource dependency parsers on Tagalog. In *Universal Dependencies Workshop*.
- <a id="cabasag2019hatespeech">Neil Vicente P. Cabasag, Vicente Raphael C. Chan, Sean Christian Y. Lim, Mark Edward M. Gonzales, and Charibeth K. Cheng.</a> 2019. Hate Speech in Philippine Election-Related Tweets: Automatic Detection and Classification Using Natural Language Processing. *Philippine Computing Journal Dedicated Issue on Natural Language Processing*, pages 1–14.
- <a id="livelo2018dengue">Evan Dennison S. Livelo and Charibeth Ko Cheng.</a> 2018. Intelligent Dengue Infoveillance Using Gated Recurrent Neural Learning and Cross-Label Fre- quencies. *2018 IEEE International Conference on Agents (ICA)*, pages 2–7.
- <a id="cruz2021tlunified">Jan Christian Blaise Cruz and Charibeth Ko Cheng.</a> 2021. Improving Large-scale Language Models and Resources for Filipino. In *International Conference on Language Resources and Evaluation*
- <a id="conneau2019xlmr">Alexis Conneau, Kartikay Khandelwal, Naman Goyal, Vishrav Chaudhary, Guillaume Wenzek, Francisco Guzmán, Edouard Grave, Myle Ott, Luke Zettlemoyer, and Veselin Stoyanov.</a> 2019. Unsupervised Cross-lingual Representation Learning at Scale. In *Annual Meeting of the Association for Computational Linguistics*.
- <a id="devlin2019bert">Jacob Devlin, Ming-Wei Chang, Kenton Lee, and Kristina Toutanova.</a> 2019. BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding. ArXiv, abs/1810.04805








<!--
problem statement
-->


<!--
what calamanCy provides
-->


<!--
usage
-->


<!--
how to download
-->


<!--
next steps
-->