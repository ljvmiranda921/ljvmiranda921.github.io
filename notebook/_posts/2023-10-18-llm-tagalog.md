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
| [UD_Tagalog-TRG](https://universaldependencies.org/treebanks/tl_trg/index.html) ([Samson, 2018](#samson2018trg))        | POS Tagging *(ADJ, ADP, ADV, NOUN, PROPN, etc.)*                                | Treebank whth 55 sentences from the Tagalog Reference Grammar and Essential Tagalog Grammar: A Reference for Learners of Tagalog.     |
| [UD_Tagalog-Ugnayan](https://universaldependencies.org/treebanks/tl_ugnayan/index.html) ([Aquino and de Leon, 2020](#aquino2020ugnayan)) | POS Tagging *(ADJ, ADP, ADV, NOUN, PROPN, etc.)* | Treebank with 94 sentences from the DepEd Learning resource Portal.  |

For Hatespeech, Dengue, and TLUnified-NER, I will run a **zero-shot prompt** only on the test set.
For the two treebanks, I will run the prompt on the whole dataset. 

Few-shot prompting is out of scope for this blog post: it's too hard to optimize prompts and it might be difficult to do a comparison.
I'll also run the experiments for three trials and report the mean and standard deviation to account for variance in the LLM's output. The prompt text will still be in English, just to be consistent with TM's blog post, i.e., they only prompted with *"What's the sentiment of this tweet?"*

Finally, I am using [spacy-llm](https://github.com/explosion/spacy-llm) throughout the experiments. 
I highly recommend trying spacy-llm if you're building production-grade LLM pipelines.
You can find and reproduce my work on Github!

## Preliminary: how do I view your prompts?

The [spacy-llm](https://github.com/explosion/spacy-llm) library provides a set of built-in prompt templates for zero-shot learning.
These prompts are categorized and versioned per task.
You can view them by checking the configuration file [in the Github repo](), and looking at the `components.llm.task` section.
For example, in NER, we have something like this:

```ini
[components.llm.task]
@llm_tasks = "spacy.NER.v2"
labels = ["PER","ORG","LOC"]
label_definitions = {"PER": "PERSON", "ORG": "ORGANIZATION", "LOC": "LOCATION OR GEOPOLITICAL ENTITY"}
```

Here, the `spacy.NER.v2` points to a [`task`](https://spacy.io/api/large-language-models#tasks) with its own prompt.
From there, you can check [the documentation](https://spacy.io/api/large-language-models#ner-v2) and cross-reference the prompt template (tip: check the `template` argument in the docs).
For NER, we have [this Jinja2 file](https://github.com/explosion/spacy-llm/blob/main/spacy_llm/tasks/templates/ner.v2.jinja).

## Benchmarks

I tested on a variety of large language models, from commercial ones like GPT-4 to open-source models like Dolly.
The table below reports the results (Metrics: macro F1-score for Dengue and Hatespeech, F1-score for TLUnified-NER, and tag accuracy for the two treebanks):


| LLM           | Dengue           | Hatespeech       | TLUnified-NER    | UD TRG  | UD Ugnayan |
|---------------|------------------|------------------|------------------|---------|------------|
| gpt-4         | $$62.04 (0.20)$$                 |                  | $$65.89 (0.44)$$ |         |            |
| gpt-3.5-turbo | $$51.21 (0.38)$$ | $$73.90 (0.27)$$ | $$53.05 (0.42)$$ |         |            |
| claude-2      |                  |                  |                  |         |            |
| command       |                  |                  |                  |         |            |
| dolly-v2-3b   |                  |                  |                  |         |            |
| Llama2-7b-hf  |                  |                  |                  |         |            |
| falcon-7b     |                  |                  |                  |         |            |

For comparison, the table below shows the results for the large and transformer-based pipelines in [calamanCy](https://github.com/ljvmiranda921/calamanCy). 
Both were trained using good old-fashioned supervised learning.
I also included the results from finetuning XLM-RoBERTa ([Conneau et al., 2019](#conneau2019xlmr)) and multilingual BERT ([Devlin et al., 2019](#devlin2019bert)). 
I omitted the results for POS tagging because I used 10-fold cross-validation to measure the non-LLM pipelines and it's too expensive to do the same for all LLMs.
You can read more about these pipelines in [this blog post](/projects/2023/08/07/calamancy/).


| Pipeline           | Dengue           | Hatespeech       | TLUnified-NER    | UD TRG  | UD Ugnayan |
|---------------|------------------|------------------|------------------|---------|------------|
| [tl_calamancy_lg](https://huggingface.co/ljvmiranda921/tl_calamancy_lg) | $$68.42 (0.01)$$ | $$75.62 (0.02)$$         | $$88.90 (0.01)$$            | - | - |
| [tl_calamancy_trf](https://huggingface.co/ljvmiranda921/tl_calamancy_trf) | $$72.45 (0.02)$$ | $$78.25 (0.06)$$ | $$90.34 (0.02)$$ | - | - |
| xlm-roberta-base | $$67.20 (0.01)$$ | $$77.57 (0.01)$$                  | $$88.03(0.03)$$                 | - | - |
| bert-base-multilingual | $$71.07(0.04)$$  | $$76.40 (0.02)$$                 | $$87.40(0.02)$$                 |  -       | -           |



## Takeaways

<!--

1. generation != prediction. doesn't mean you can generate coherent text you can understand it.
2. information per query (IPQ), efficient, in visual design, information per square inch of ink.

-->



### Footnotes
