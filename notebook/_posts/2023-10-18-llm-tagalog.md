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

In this blog post, I will conduct a systematic check on how these decoder-only autoregressive models fare (using zero-shot generalization) against finetuning an encoder-only model.
I will be comparing them on the named entity recognition (NER) and text categorization benchmarks in my [calamanCy project](/projects/2023/08/07/calamancy/). As a refresher, here are the datasets:

[^1]:

    The experimental details were a bit sparse. 
    The weighted F1-score may not be too informative of a metric given the potential class imbalance between labels (I'm assuming there are *many* more negative tweets than positive).
    Reporting macro recall might be more relevant in this case.


| Dataset                                                     | Task / Labels                                                           | Description                                                                                                                       |
|-------------------------------------------------------------|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Hatespeech ([Cabasag et al., 2019](#cabasag2019hatespeech)) | Binary text classification (*hate speech, not hate speech*)               | Contains 10k tweets collected during the 2016 Philippine Presidential Elections labeled as hatespeech or non-hate speech.         |
| Dengue ([Livelo and Cheng, 2018](#livelo2018dengue))        | Multilabel text classification (*absent, dengue, health, sick, mosquito*) | Contains 4k dengue-related tweets collected for a health infoveillance application that classifies text into dengue subtopics.    |
| TLUnified-NER ([Cruz and Cheng, 2021](#cruz2021tlunified)) | NER (*Person, Organization, Location*)               | A held-out test split from the annotated TLUnified corpora containing news reports.  |

For Hatespeech, Dengue, and TLUnified-NER, I will run a **zero-shot prompt** only on the test set. 
I didn't include the Universal Dependencies (UD) treebanks in this experiment because querying the APIs are getting too expensive. 
Maybe next time I'll post an update here!

Also, few-shot prompting is out of scope for this blog post: it's too hard to optimize prompts and it might be difficult to do a comparison.
I'll also run the experiments for three trials and report the mean and standard deviation to account for variance in the LLM's output. 
The prompt text will still be in English, just to be consistent with TM's blog post. 
Their prompt was simple: *"What's the sentiment of this tweet?"*

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

Here, `spacy.NER.v2` points to a [`task`](https://spacy.io/api/large-language-models#tasks) with its own prompt.
From there, you can check [the documentation](https://spacy.io/api/large-language-models#ner-v2) and cross-reference the template (tip: check the `template` argument in the docs).
For NER, we have [this Jinja2 file](https://github.com/explosion/spacy-llm/blob/main/spacy_llm/tasks/templates/ner.v2.jinja). 
At runtime, our configuration maps to the Jinja2 template and pre-fill it with our settings.

Some `spacy-llm` tasks provide additional arguments such as `label_definitions` to explicitly describe a label to an LLM, and `examples` for few-shot prompting.
The library covers most of the core NLP tasks such as NER, text categorization, and lemmatization.
But, they recently added an NLU summarization task, so that's neat!


## Benchmarks

I tested on a variety of decoder-only large language models, from commercial ones like GPT-4 to open-source models like Dolly.
The table below reports the results (Metrics: macro F1-score for Dengue and Hatespeech and F1-score for TLUnified-NER):


| LLM                               | Dengue           | Hatespeech       | TLUnified-NER    | 
|-----------------------------------|------------------|------------------|------------------|
| OpenAI (`gpt-4`)                    | $$62.04 (0.20)$$ | $$45.74 (9.16)$$ | $$65.89 (0.44)$$ | 
| OpenAI (`gpt-3.5-turbo`)            | $$51.21 (0.38)$$ | $$73.90 (0.27)$$ | $$53.05 (0.42)$$ | 
| Anthropic (`claude-1`)              |                  |                  |                  | 
| Cohere (`command`)                  | $$39.27 (0.64)$$ |                  | $$25.48 (0.11)$$ | 
| Databricks (`dolly-v2-3b`)          |                  |                  |                  | 
| Meta (`Llama2-7b-hf`)               |                  |                  |                  | 
| TII (`falcon-7b`)                   |                  |                  |                  | 
| Stability (`stablelm-base-alpha-7b`)|                  |                  |                  | 
| OpenLM (`open_llama_7b`)            |                  |                  |                  | 

For comparison, the table below shows the results for the large and (encoder-only) transformer-based pipelines in [calamanCy](https://github.com/ljvmiranda921/calamanCy). 
Both were trained using good old-fashioned supervised learning.
I also included the results from finetuning XLM-RoBERTa ([Conneau et al., 2019](#conneau2019xlmr)) and multilingual BERT ([Devlin et al., 2019](#devlin2019bert)). 
You can read more about these pipelines in [this blog post](/projects/2023/08/07/calamancy/).

| Pipeline                                                                  | Dengue           | Hatespeech       | TLUnified-NER    |
|---------------------------------------------------------------------------|------------------|------------------|------------------|
| Large word-vector [(`tl_calamancy_lg`)](https://huggingface.co/ljvmiranda921/tl_calamancy_lg)   | $$68.42 (0.01)$$ | $$75.62 (0.02)$$ | $$88.90 (0.01)$$ | 
| Transormer-based [(`tl_calamancy_trf`)](https://huggingface.co/ljvmiranda921/tl_calamancy_trf) | $$72.45 (0.02)$$ | $$78.25 (0.06)$$ | $$90.34 (0.02)$$ | 
| XLM-RoBERTa (`xlm-roberta-base`)                                                          | $$67.20 (0.01)$$ | $$77.57 (0.01)$$ | $$88.03(0.03)$$  | 
| Multilingual BERT (`bert-base-multilingual`)                                                    | $$71.07(0.04)$$  | $$76.40 (0.02)$$ | $$87.40(0.02)$$  | 

<!--
big gap between performance
-->


## Takeaways

<!--

1. generation != prediction. doesn't mean you can generate coherent text you can understand it.
2. information per query (IPQ), efficient, in visual design, information per square inch of ink.

-->



### Footnotes
