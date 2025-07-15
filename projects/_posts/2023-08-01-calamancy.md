---
layout: post
type: post
title: "calamanCy: NLP pipelines for Tagalog"
date: 2023-08-01
category: projects
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, language technology, natural language processing, tagalog, low resource, spacy, machine learning]
header-img: /assets/png/calamancy/header.png
description: |
    I am excited to introduce calamanCy, an open-source toolkit for constructing natural language processing pipelines for Tagalog.
    Read this blog post to learn more! You can also find calamanCy on Github: https://github.com/ljvmiranda921/calamanCy
excerpt: |
    I am excited to introduce calamanCy, an open-source toolkit for constructing natural language processing pipelines for Tagalog.
    Read this blog post to learn more! You can also find calamanCy on Github: https://github.com/ljvmiranda921/calamanCy
---

<a href="https://github.com/ljvmiranda921/calamanCy" class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; left: 0; transform: scale(-1, 1);" aria-hidden="true"><path d="m0,0 115,115 15,0 12,27 108,108 0,-250 z"/><path d="m128.3,109.0 c-14.5,-9.3 -9.3,-19.4 -9.3,-19.4 3,-6.9 1.5,-11 1.5,-11 -1.3,-6.6 2.9,-2.3 2.9,-2.3 3.9,4.6 2.1,11 2.1,11 -2.6,10.3 5.1,14.6 8.9,15.9" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"/><path d="m115.0,115.0 c-0.1,0.1 3.7,1.5 4.8,0.4 l13.9,-13.8 c3.2,-2.4 6.2,-3.2 8.5,-3.0 -8.4,-10.6 -14.7,-24.2 1.6,-40.6 4.7,-4.6 10.2,-6.8 15.9,-7.0 0.6,-1.6 3.5,-7.4 11.7,-10.9 0,0 4.7,2.4 7.4,16.1 4.3,2.4 8.4,5.6 12.1,9.2 3.6,3.6 6.8,7.8 9.2,12.2 13.7,2.7 16.1,7.4 16.1,7.4 -3.5,8.2 -9.3,11.1 -10.9,11.7 -0.2,5.7 -2.4,11.2 -7.0,15.9 -16.4,16.3 -30.0,10.0 -40.6,1.6 0.2,2.3 -0.6,5.3 -3.0,8.5 l-13.8,13.9 c-1.1,1.1 0.3,4.9 0.4,4.8" fill="currentColor"/></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>

<img src="https://raw.githubusercontent.com/ljvmiranda921/calamanCy/master/logo.png" width="120" height="120" align="right" />


> Update (2023-12-06): This work was published in the EMNLP NLP-OSS workshop! Check out ["calamanCy: A Tagalog Natural Language Processing Toolkit"](https://aclanthology.org/2023.nlposs-1.1/)! 

<span class="firstcharacter">I</span> am excited to introduce [**calamanCy**](https://github.com/ljvmiranda921/calamanCy), an open-source toolkit for constructing natural language processing (NLP) pipelines for Tagalog.
It is built on top of [spaCy](https://spacy.io) to ensure easy experimentation and integration with other frameworks.
It provides general-purpose multitask models with out-of-the-box support for dependency parsing, part-of-speech (POS) tagging, and named entity recognition (NER).
The repository is available [on Github](https://github.com/ljvmiranda921/calamanCy), and you can install the package via `pip`:

```
pip install calamancy
```

```python
import calamancy
nlp = calamancy.load("tl_calamancy_md-0.1.0")
doc = nlp("Ako si Juan de la Cruz.")  # returns a spaCy Doc object
```

More importantly, calamanCy aims to accelerate the progress of Tagalog NLP by consolidating disjointed resources in a unified framework.
In this blog post, I want to talk about the problem it's trying to solve, my process on building the framework, some benchmarks, and future work.

## How it works

calamanCy offers two word vector-based pipelines and one transformer-based pipeline.
Suppose we want to detect named entities from a given text (NER):

```python
import calamancy
nlp = calamancy.load("tl_calamancy_md-0.1.0")
doc = nlp("Pumunta si Juan sa Japan kahapon.")

for ent in doc.ents:
    print(ent.text, ent.label_)  # (Juan, PER), (Japan, LOC)
```

Here, the variable `nlp` is an instance of spaCy's [`Language`](https://spacy.io/api/language) class while `doc` is a spaCy [`Doc`](https://spacy.io/api/doc) object.
Each pipeline contains a dependency parser, tagger, and entity recognizer. 
The built-in entity recognizer was trained with annotations resembling ConLL. It contains entities such as *Person*, *Organization*, and *Location*.

You can use these models as-is or finetune them to your dataset.
In a latter section, I'll demonstrate these capabilities by benchmarking our models on both seen and unseen tasks. 
For more information on model training, please check out the [spaCy documentation](https://spacy.io/usage/training).


## Tagalog NLP resources are disjointed

Despite Tagalog being a widely-spoken language here in the Philippines, model and data resources are still scarce.
For example, our Universal Dependencies (UD) treebanks are tiny (less than 20k words) ([Samson, 2018](#samson2018trg); [Aquino and de Leon, 2020](#aquino2020ugnayan)) 
and domain-specific corpora are few and far between ([Cabasag et al., 2019](#cabasag2019hatespeech); [Livelo and Cheng, 2018](#livelo2018dengue)).

In addition, we only have limited choices when it comes to Tagalog language models (LMs).
For monolingual LMs, the state-of-the-art is RoBERTa-Tagalog ([Cruz and Cheng, 2021](#cruz2021tlunified)).
For multilingual LMs, we have the usual XLM-RoBERTa ([Conneau et al., 2019](#conneau2019xlmr)) and multilingual BERT ([Devlin et al., 2019](#devlin2019bert)).
Tagalog is included in their training pool, but these models are still prone to the curse of multilinguality.


Therefore, consolidating these resources and providing more options to build Tagalog NLP pipelines is still an open problem.

## calamanCy aims to consolidate these resources

calamanCy provides three language pipelines that fit any performance or accuracy requirements. 
Each pipeline provides out-of-the-box support for core NLP tasks:

| Pipeline                                      | Pretraining objective                                                  | Word embeddings                                       | Dimensions                                         |
|-----------------------------------------------|------------------------------------------------------------------------|-------------------------------------------------------|----------------------------------------------------|
| Medium-sized pipeline ([tl_calamancy_md](https://huggingface.co/ljvmiranda921/tl_calamancy_md))       | Predict some number of leading and trailing UTF-8 bytes for the words. | Uses [floret](https://github.com/explosion/floret) static vectors trained on the TLUnified corpora. | 50k unique vectors (200 dimensions), Size: 77 MB   |
| Large-sized pipeline ([tl_calamancy_lg](https://huggingface.co/ljvmiranda921/tl_calamancy_lg))        | Same pretraining objective as the medium-sized pipeline.               | Uses [fastText](https://fasttext.cc) static vectors trained on CommonCrawl corpora. | 714k unique vectors (300 dimensions), Size: 455 MB |
| Transformer-based pipeline ([tl_calamancy_trf](https://huggingface.co/ljvmiranda921/tl_calamancy_trf)) | No separate pretraining because there's no token-to-vector component.  | Context-sensitive vectors from a transformer network. | Uses roberta-tagalog-base. Size: 813 MB            |

- **Pretraining objective**: involves learning vectors from raw text to better
inform our [token-to-vector](https://spacy.io/api/tok2vec) model. This process
only applies to our static word vector models.  The pretraining objective is a
variant of the *cloze task*, also known as [language modelling with approximate
outputs (LMAO)](https://spacy.io/usage/embeddings-transformers#pretraining).
- **Word embeddings**: may involve static vectors or a dense context-sensitive
vector from a transformer. Here, I also used spaCy's
[floret](https://github.com/explosion/floret), an efficient version of fastText.
Static word vectors are called as such because they are not parameters learned by a
statistical model. On the other hand, word embeddings from a transformer involve the learned parameters.

The training process involves pretraining a filtered version of TLUnified ([Cruz and Cheng, 2021](#cruz2021tlunified)), constructing static word embeddings if necessary, and training the downstream components. 
Each pipeline contains a [`Tagger`](https://spacy.io/api/tagger), [`DependencyParser`](https://spacy.io/api/dependencyparser), [`Morphologizer`](https://spacy.io/api/morphologizer), and [`EntityRecognizer`](https://spacy.io/api/entityregognizer) spaCy components.
These models are also available on [HuggingFace 🤗](https://huggingface.co/ljvmiranda921).

You can reproduce the whole training procedure by running the [corresponding spaCy project on Github](https://github.com/ljvmiranda921/calamanCy/tree/master/models/v0.1.0).
Finally, you can find a list of data sources in the table below:

| Source                                                                                 | Authors                                          | License         |
|----------------------------------------------------------------------------------------|--------------------------------------------------|-----------------|
| [TLUnified Dataset](https://aclanthology.org/2022.lrec-1.703/)                         | Jan Christian Blaise Cruz and Charibeth Cheng    | GNU GPL 3.0     |
| [UD_Tagalog-TRG](https://universaldependencies.org/treebanks/tl_trg/index.html)        | Stephanie Samson                                 | CC BY-SA 3.0    |
| [UD_Tagalog-Ugnayan](https://universaldependencies.org/treebanks/tl_ugnayan/index.html) | Angelina Aquino and Franz de Leon               | CC BY-NC_SA 4.0 |

Note that the Ugnayan treebank is not licensed for commercial use while TLUnified is under GNU GPL. 
Please consider these licenses when using the calamanCy pipelines in your application.

### Benchmarking experiments

Before calamanCy, you usually have two options if you want to build a pipeline for Tagalog: (1) piggyback on a model trained from a linguistically-similar language (**cross-lingual transfer**) or (2) finetune a multilingual LM like XLM-R or multilingual BERT on your data (**multilingual finetuning**). Here, I want to check if calamanCy is competitive enough against these alternatives. I tested on the following tasks and datasets:

| Dataset                                                     | Task / Labels                                                           | Description                                                                                                                       |
|-------------------------------------------------------------|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Hatespeech ([Cabasag et al., 2019](#cabasag2019hatespeech)) | Binary text classification (*hate speech, not hate speech*)               | Contains 10k tweets collected during the 2016 Philippine Presidential Elections labeled as hatespeech or non-hate speech.         |
| Dengue ([Livelo and Cheng, 2018](#livelo2018dengue))        | Multilabel text classification (*absent, dengue, health, sick, mosquito*) | Contains 4k dengue-related tweets collected for a health infoveillance application that classifies text into dengue subtopics.    |
| TLUnified-NER ([Cruz and Cheng, 2021](#cruz2021tlunified)) | NER (*Person, Organization, Location*)               | A held-out test split from the annotated TLUnified corpora containing news reports.  |
| Merged UD ([Aquino and de Leon, 2020](#aquino2020ugnayan); [Samson, 2018](#samson2018trg))   | Dependency parsing and POS tagging                                      | Merged version of the Ugnayan and TRG treebanks from the Universal Dependencies framework. |

For text categorization and NER, I ran the experiments for five trials and reported their average and standard deviation.
For dependency parsing and POS tagging, I used 10-fold cross-validation because the combined UD treebank is still too small.

The results show that our calamanCy pipelines are competitive (you can reproduce the results by following this [spaCy project](https://github.com/ljvmiranda921/calamanCy/tree/master/paper/benchmark)):

<!-- insert results here -->

| Language Pipeline      | Binary textcat (Hatespeech) | Multilabel textcat (Dengue)  | NER (TLUnified-NER)  | Dependency parsing, UAS (Merged UD) | Dependency parsing, LAS (Merged UD) |
|------------------------|---------------------------------------------------------|----------------------------------------------------------|-----------------------------------------------------|-------------------------------------|-------------------------------------|
| [tl_calamancy_md](https://huggingface.co/ljvmiranda921/tl_calamancy_md)        | $$74.40 (0.05)$$                                            | $$65.32 (0.04)$$                                             | $$87.67 (0.03)$$                                        | $$76.47$$                               | $$54.40$$                               |
| [tl_calamancy_lg](https://huggingface.co/ljvmiranda921/tl_calamancy_lg)        | $$75.62 (0.02)$$                                            | $$68.42 (0.01)$$                                             | $$88.90 (0.01)$$                                        | $$82.13$$                               | $$70.32$$                               |
| [tl_calamancy_trf](https://huggingface.co/ljvmiranda921/tl_calamancy_trf)       | $$78.25 (0.06)$$                                            | $$72.45 (0.02)$$                                             | $$90.34 (0.02)$$                                        | $$92.48$$                               | $$80.90$$                               |

We also evaluated cross-lingual and multilingual approaches in our benchmarks: 
- **Cross-lingual**: we chose the source languages using a WALS-reliant metric (Agic, 2017) to choose the linguistically-closest languages to Tagalog and looked for their corresponding spaCy pipelines. 
  We came up with Indonesian (id), Vietnamese (vi), Ukranian (uk), Romanian (ro), and Catalan (ca). However, only uk, ca, ro have spaCy pipelines. We finetuned each dataset for each task and evaluated them similarly to our Tagalog monolingual models.

| Language Pipeline      | Binary textcat (Hatespeech) | Multilabel textcat (Dengue)  | NER (TLUnified-NER)  | Dependency parsing, UAS (Merged UD) | Dependency parsing, LAS (Merged UD) |
|------------------------|---------------------------------------------------------|----------------------------------------------------------|-----------------------------------------------------|-------------------------------------|-------------------------------------|
| uk_core_news_trf       | $$75.24 (0.05)$$                                            | $$65.57 (0.01)$$                                             | $$51.11 (0.02)$$                                        | $$54.77$$                               | $$37.68$$                               |
| ro_core_news_lg        | $$69.01 (0.01)$$                                            | $$59.10 (0.01)$$                                             | $$02.01 (0.00)$$                                        | $$84.65$$                               | $$65.30$$                               |
| ca_core_news_trf       | $$70.01 (0.02)$$                                            | $$59.42 (0.03)$$                                             | $$14.58 (0.02)$$                                        | $$91.17$$                               | $$79.30$$                               |

- **Multilingual**: we used XLM RoBERTa and an uncased version of mBERT as our base transformer models. We also finetuned each model for each task and did similar evaluations.
  Note that finetuning on XLM RoBERTa (both base and large versions) may require at least a V100 GPU. I've seen more consistent and stable training with an A100 GPU. Same can be said for mBERT.

| Language Pipeline      | Binary textcat (Hatespeech) | Multilabel textcat (Dengue)  | NER (TLUnified-NER)  | Dependency parsing, UAS (Merged UD) | Dependency parsing, LAS (Merged UD) |
|------------------------|---------------------------------------------------------|----------------------------------------------------------|-----------------------------------------------------|-------------------------------------|-------------------------------------|
| xlm-roberta-base       | $$77.57 (0.01)$$                                            | $$67.20 (0.01)$$                                             | $$88.03 (0.03)$$                                        | $$88.34$$                               | $$76.07$$                               |
| bert-base-multilingual | $$76.40 (0.02)$$                                            | $$71.07 (0.04)$$                                             | $$87.40 (0.02)$$                                        | $$90.79$$                               | $$78.52$$                               |


## What's next


I highly recommend trying out calamanCy and giving your feedback so that I can improve the models over time. 
My priority for 0.2.0+ is to write domain-specific tokenizers to help with simple NLP tasks (e.g., for parsing tweets).
I also want to do a few more data annotation projects as a precursor to v1.0.0.
These projects include a more fine-grained label set for NER, and a better Universal Dependencies Treebank.

On the research side, I'm curious how large language models fare on Tagalog
data. We've already built up some nice benchmarks because of this effort so it might be
nice to do a side-by-side comparison for zero/few-shot prompting. I'm also interested in training
language-specific adapters for efficiency.


### FAQs

- **Can I use this in production?** Yes. Compared to my [previous blog post](notebook/2023/02/04/tagalog-pipeline/), the NER corpora has been [reannotated](/notebook/2023/07/03/devlog-calamancy/) with multiple annotators so I'm more confident with our corpus. However, note that some of the datasets used for training have non-commercial licenses, so the application of calamanCy is still restricted.
- **The licenses are too restrictive!** It's quite unfortunate that the UD treebanks and pretraining corpora available for Tagalog have stricter licenses. Aside from creating a new
corpora myself, I'm still thinking of ways to get around that. If you have any ideas, then let me know!
- **What's the design decision for only including X component?** I want to make calamanCy as general-purpose as possible yet flexible enough to be finetuned on specific tasks.
That's why we have to train a new component for text categorization. All of the official spaCy pipelines also follow this architecture.

If you have any questions, feel free to reach out on [Github](https://github.com/ljvmiranda921/calamanCy/) or my [email](mailto:ljvmiranda@gmail.com)!


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
