---
layout: post
type: post
title: "Do large language models work on Tagalog?"
date: 2023-08-16
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

<span class="firstcharacter">A</span> few weeks ago, I saw an [interesting blog post](https://stories.thinkingmachin.es/llm-customer-sentiment-analysis/) from Thinking Machines (TM) where they ran Filipino tweets on GPT-4 for a sentiment analysis task.
They claim a weighted F1-score of 76%&mdash; pretty decent for a straightforward zero-shot approach.[^1]
However, I want to see the full-picture performance of these LLMs, hence this blog post. 

In this work, I will conduct a **systematic check** on how these decoder-only autoregressive models fare (using zero-shot generalization) against finetuning an encoder-only model for a low-resource language.
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

I will run a **zero-shot prompt** only on the test set. 
I didn't include the Universal Dependencies (UD) treebanks in this experiment because querying the APIs are getting too expensive. 
Maybe next time I'll post an update here!

Also, few-shot prompting is out of scope for this blog post: it's too laborious to optimize prompts and it might be difficult to do a comparison.
I'll also run the experiments for three trials and report the mean and standard deviation to account for variance in the LLM's output. 
The prompt text will still be in English, just to be consistent with TM's blog post. 
Their prompt was simple: *"What's the sentiment of this tweet?"*

Finally, I am using [**spacy-llm**](https://github.com/explosion/spacy-llm) throughout the experiments. 
I highly recommend trying spacy-llm if you're building production-grade LLM pipelines.
You can find and reproduce my work on Github!

## Preliminary: where are my prompts?

The [spacy-llm](https://github.com/explosion/spacy-llm) library provides a set of built-in prompt templates for zero-shot learning.
These prompts are categorized and versioned per task.
You can view them by checking the configuration file [in the Github repo]() and looking at the `components.llm.task` section.
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
At runtime, `spacy-llm` maps our config to the Jinja2 template, thereby producing the final prompt sent to the LLM.

Some `spacy-llm` tasks provide additional arguments such as `label_definitions` to explicitly describe a label to an LLM, and `examples` for few-shot prompting.
The library covers most of the core NLP tasks such as NER, text categorization, and lemmatization and seems to be adding more in the NLU space (e.g., summarization).

*[Full disclosure: I used to help out in the earlier versions of spacy-llm during my time at Explosion]*

## Benchmarking results

I tested on a variety of decoder-only large language models, from commercial ones like GPT-4 to open-source models like Dolly.
The table below reports the results (Metrics: macro F1-score for Dengue and Hatespeech and F1-score for TLUnified-NER):


| LLM                               | Dengue           | Hatespeech       | TLUnified-NER    | 
|-----------------------------------|------------------|------------------|------------------|
| OpenAI (`gpt-4`)                    | $$62.04 (0.20)$$ | $$45.74 (9.16)$$ | $$65.89 (0.44)$$ | 
| OpenAI (`gpt-3.5-turbo`)            | $$51.21 (0.38)$$ | $$73.90 (0.27)$$ | $$53.05 (0.42)$$ | 
| Anthropic (`claude-1`)              |                  |                  |                  | 
| Cohere (`command`)                  | $$39.27 (0.64)$$ |                  | $$25.48 (0.11)$$ | 
| Databricks (`dolly-v2-7b`)          |                  |                  |                  | 
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


## Discussion

It is apparent that our **supervised approach outperformed zero-shot prompting** in our datasets.
These results are consistent to the findings of the BigScience group ([Wang et al., 2022](#wang2022WhatLM)). 
Their experiments showed that although decoder-only models trained on an autoregressive LM objective (basically the majority of our LLMs) exhibited the strongest zero-shot generalization, they're still outperformed by models trained via masked language modeling followed by multitask finetuning (BERT and friends).

I want to expound on these results with three discussion points.

### Generation != prediction

### Tagalog is still underrepresented in the training corpora



### Zero-shot economics don't scale

## Final thoughts

<!-- I'd love to stop building corpora, but I don't think we're there yet -->


## References

- <a id="cabasag2019hatespeech">Neil Vicente P. Cabasag, Vicente Raphael C. Chan, Sean Christian Y. Lim, Mark Edward M. Gonzales, and Charibeth K. Cheng.</a> 2019. Hate Speech in Philippine Election-Related Tweets: Automatic Detection and Classification Using Natural Language Processing. *Philippine Computing Journal Dedicated Issue on Natural Language Processing*, pages 1–14.
- <a id="livelo2018dengue">Evan Dennison S. Livelo and Charibeth Ko Cheng.</a> 2018. Intelligent Dengue Infoveillance Using Gated Recurrent Neural Learning and Cross-Label Fre- quencies. *2018 IEEE International Conference on Agents (ICA)*, pages 2–7.
- <a id="cruz2021tlunified">Jan Christian Blaise Cruz and Charibeth Ko Cheng.</a> 2021. Improving Large-scale Language Models and Resources for Filipino. In *International Conference on Language Resources and Evaluation*
- <a id="conneau2019xlmr">Alexis Conneau, Kartikay Khandelwal, Naman Goyal, Vishrav Chaudhary, Guillaume Wenzek, Francisco Guzmán, Edouard Grave, Myle Ott, Luke Zettlemoyer, and Veselin Stoyanov.</a> 2019. Unsupervised Cross-lingual Representation Learning at Scale. In *Annual Meeting of the Association for Computational Linguistics*.
- <a id="devlin2019bert">Jacob Devlin, Ming-Wei Chang, Kenton Lee, and Kristina Toutanova.</a> 2019. BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding. ArXiv, abs/1810.04805
- <a id="wang2022WhatLM">Thomas Wang, Adam Roberts, Daniel Hesslow, Teven Le Scao, Hyung Won Chung, Iz Beltagy, Julien Lauanay, and Colin Raffel.</a> 2022. What Language Model Architecture and Pretraining Objective Work Best for Zero-Shot Generalization? *Proceedings of the 39th International Conference on Machine Learning*.



### Footnotes
