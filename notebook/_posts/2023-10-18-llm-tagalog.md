---
layout: post
type: post
title: "Do large language models work on Tagalog?"
date: 2023-10-18
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

<span class="firstcharacter">A</span> few months ago, I saw an [interesting blog post](https://stories.thinkingmachin.es/llm-customer-sentiment-analysis/) from Thinking Machines (TM) where they ran Filipino tweets on GPT-4 for a sentiment analysis task.
They claim a weighted F1-score of 76%&mdash; pretty decent for a straightforward zero-shot approach.[^1]
This inspired me to conduct a proper benchmark given the corpora I had in [calamanCy](https://github.com/ljvmiranda921/calamancy), hence this blog post was born!

[^1]:

    The experimental details were a bit sparse. 
    The weighted F1-score may not be too informative of a metric given the potential class imbalance between labels (I'm assuming there are *many* more negative tweets than positive).
    Reporting macro recall might be more relevant in this case.


This time, I will test on the benchmark datasets I used in the [calamanCy blog post](/projects/2023/08/07/calamancy/).
As a refresher, here are the datasets:

| Dataset                                                     | Task / Labels                                                           | Description                                                                                                                       |
|-------------------------------------------------------------|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Hatespeech ([Cabasag et al., 2019](#cabasag2019hatespeech)) | Binary text classification (*hate speech, not hate speech*)               | Contains 10k tweets collected during the 2016 Philippine Presidential Elections labeled as hatespeech or non-hate speech.         |
| Dengue ([Livelo and Cheng, 2018](#livelo2018dengue))        | Multilabel text classification (*absent, dengue, health, sick, mosquito*) | Contains 4k dengue-related tweets collected for a health infoveillance application that classifies text into dengue subtopics.    |
| TLUnified-NER ([Cruz and Cheng, 2021](#cruz2021tlunified)) | NER (*Person, Organization, Location*)               | A held-out test split from the annotated TLUnified corpora containing news reports.  |
| [UD_Tagalog-TRG](https://universaldependencies.org/treebanks/tl_trg/index.html) ([Samson, 2018](#samson2018trg))        | Lemmatization                                 | Treebank whth 55 sentences from the Tagalog Reference Grammar and Essential Tagalog Grammar: A Reference for Learners of Tagalog.     |
| [UD_Tagalog-Ugnayan](https://universaldependencies.org/treebanks/tl_ugnayan/index.html) ([Aquino and de Leon, 2020](#aquino2020ugnayan)) | Lemmatization              | Treebank with 94 sentences from the DepEd Learning resource Portal.  |

For Hatespeech, Dengue, and TLUnified-NER, I will run a **zero-shot prompt** only on the test set.
For the two treebanks, I will run the prompt on the whole dataset. 

Few-shot prompting is out of scope for this blog post: it's too hard to optimize prompts and it might be difficult to do a comparison.
I'll also run the experiments for three trials and report the mean and standard deviation to account for variance in the LLM's output.

Finally, the prompt text will still be in English, just to be consistent with TM's blog post, i.e., they only prompted with *"What's the sentiment of this tweet?"*
I am using [spacy-llm](https://github.com/explosion/spacy-llm) throughout the experiments. 
You can find and reproduce my work on Github!

## Models
<!-- models to use -->
<!--
GPT-4
GPT-3.5
Cohere
Dolly
Llama
Falcon
StableLM
-->

## Benchmarks

### Named entity recognition

<!-- define the task -->
<!-- show the prompt -->


### Text categorization 


<!-- define the task -->
<!-- show the prompt -->

### Lemmatization 

<!-- define the task -->
<!-- show the prompt -->

## Tagalog representation on LLM corpora


## Takeaways

<!--

1. generation != prediction. doesn't mean you can generate coherent text you can understand it.
2. information per query (IPQ), efficient, in visual design, information per square inch of ink.

-->



### Footnotes
