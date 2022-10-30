---
layout: post
type: post
title: "Towards building a gold-standard NER corpus for Tagalog"
date: 2022-12-22
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, tagalog, low-resource languages, prodigy, natural language processing, machine learning]
description: |
    The lack of Tagalog gold-standard named-entity recognition (NER) data
    inhibits us from training decent structured prediction pipelines for our
    language. In this blog post, I'll talk about the state of Tagalog-based
    corpora, my progress on building a gold-standard dataset (and its
    limitations), and my hopes for the future of Tagalog NLP.
excerpt: |
    The lack of Tagalog gold-standard NER data inhibits us from training decent
    structured prediction pipelines for our language. In this blog post, I'll talk
    about the state of Tagalog-based corpora, my progress on building a
    gold-standard dataset (and its limitations), and my hopes for the future of Tagalog NLP.
---


<span class="firstcharacter">T</span>agalog is my native language. It's spoken
by 76 million Filipinos and has been our official language since the 30s. 
Stories and songs have been written in Tagalog, and it has a long cultural and
historical significance. It's a **text-rich** language, but unfortunately, a
**low-resource** one. In this blog post, I'll talk about the state of
Tagalog-based corpora, my experience in creating a gold-standard dataset
(including its limitations) for named-entity recognition (NER), and my hopes for
the future of Tagalog NLP.

#### Contents

- [Tagalog NER corpora is low-resource and full of silver-standard annotations](#corpora)

## <a id="corpora"></a>Tagalog NER corpora is low-resource and full of silver-standard annotations

We label a language as **low-resource** when there are no annotated corpora
available. Even if Tagalog is text-rich (i.e., a million speakers, thousands of
written content, etc.), the amount of annotated texts are scarce. This problem
isn't unique to Tagalog. Out of the approximately 7000 languages in the world,
only 10 have adequate NLP resources ([Mortensen](#mortensen), [Tsvetkov, 2017](#tsvetkov2017opportunities)). 


There are many clever ways to build technologies on low-resource languages that
allow researchers to circumvent the data scarcity problem. They usually involve
taking advantage of a high-resource language (or domain), and transferring its
capacity to a low-resource one. The table below outlines different approaches for
low-resource NLP:


| Approach                        | Data*  | Prerequisites                                                                                                | Description                                                                               |
|---------------------------------|----------------------|--------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| Supervised learning             | High                 | Large amount of labeled data.                                                                                 | Train a model as usual using feature-label pairs.                                                   |
| Cross-lingual transfer learning | None to a few        | Understanding of the similarities between source and target languages.                                       | Transfer resources and models from resource-rich source to resource-poor target language. |
| Zero-shot learning              | None                 | High similarity between source and target domains. It often helps if the latter is a "subset" of the former. | Train a model in a domain and assume it generalizes out-of-the-box in another domain.     |
| Few-shot learning               | A few to high        | Similarity between source and target domains and a task-specific finetuning dataset.                         | Use a pretrained model from a large corpus, and then finetune on a specific task.         |
| Polyglot learning               | A few to high        | A mixed corpus or a dataset with languages converted to a shared representation.                             | Combine resource-rich and resource-poor languages and train them together.                |

<p>* Data: amount of gold-labeled annotations required.</p>
{:style="text-align: left; font-size: 14px;"}

**Table:** List of techniques for low-resource NLP
{:style="text-align: center;"}

Some of these methods produce what we usually call  **silver-standard data**.
Their annotations are automatically generated, usually done by statistical
models trained from a different but closely-related language or a knowledge base
like Wikipedia. Silver-standard data may not be accurate or trustworthy, but
they are faster and cheaper to create.



<!-- RRL 

WikiANN

maybe a table?


-->


As you'll see later, I went with the traditional route: I labeled and produced
gold-standard data myself. However, labeling thousands of samples is not the
hardest part. As the sole annotator, it's easy for me to influence a dataset of
my biases and errors in judgment. You'd want to normalize a dataset from bias
and correct obvious annotation errors.  In practice, you'd usually want more
than three annotators (preferably linguists) and normalize their annotations
based on some inter-annotator agreement. Gold-standard data is not a cure-all. 

## Creating and evaluating gold-standard data


### Bootstrapping WikiANN for annotation




### Experimental Setup

I want to see how standard NER approaches fare with `tl_tlunified_gold`. I made
two sets of experiment, one involving word vectors and the other using language
models or transformers. In addition, I also want to see the effects of
[pretraining](https://spacy.io/usage/embeddings-transformers#pretraining) for
some of these vectors:

| Word Vectors                 | Description                                                                          |
|------------------------------|--------------------------------------------------------------------------------------|
| None                         | Train a NER model from scratch. No tricks, just the annotated data.                  |
| None + spaCy pretraining     | [Pretrain characters](https://spacy.io/api/architectures#pretrain_chars) using a subset of TLUnified to obtain word vectors. |
| fastText                     | Train a set of [fastText](https://fasttext.cc/) vectors from TLUnified and use them as [static vectors](https://spacy.io/usage/embeddings-transformers#static-vectors) for the downstream NER task. |
| fastText + spaCy pretraining | [Pretrain vectors](https://spacy.io/api/architectures#pretrain_vectors) using the fastText vectors.                          |
| floret*                       | Use [spaCy's extension of floret](https://github.com/explosion/floret) to create more compact vectors from TLUnified. Then, perform supervised learning as usual. | 

<p>* floret: I won't be doing the pretraining setup for floret because I just want to compare its size against fastText.</p>
{:style="text-align: left; font-size: 14px;"}

**Table:** Experimental setup for word vectors
{:style="text-align: center;"}

Then, I will also measure the performance of a monolingual and multilingual
language model. I'm using transormer models as a [drop-in replacement](https://spacy.io/usage/embeddings-transformers#transformers) for
the representation layer, to achieve higher accuracy:

| Language Models       | Description                                                              |
|-----------------------|--------------------------------------------------------------------------|
| [roberta-tagalog](https://huggingface.co/jcblaise/roberta-tagalog-large) | Monolingual experiment with a large RoBERTa model trained from TLUnified. I will be testing both `base` and `large` variants. |
| [xlm-roberta](https://huggingface.co/xlm-roberta-large)      | Multilingual experiment with a large XLM-RoBERTa. Trained on 100 different languages. I will be testing both `base` and `large` variants. |

**Table:** Experimental setup for language models
{:style="text-align: center;"}

For all the experiments above, I will be using a [transition-based
parser (TBP)](https://spacy.io/api/entityrecognizer) for sequence labeling.  However,
I'll also do a brief comparison against a [conditional random field
(CRF)](https://github.com/talmago/spacy_crfsuite) for the fastText and
roberta-tagalog-base settings.

### Results

|                              | Precision | Recall | F1-score |
|------------------------------|-----------|--------|----------|
| None                         |           |        |          |
| None + spaCy pretraining     |           |        |          |
| fastText (XXX vectors)       |           |        |          |
| fastText + spaCy pretraining |           |        |          |
| floret (XXX vectors)         |           |        |          |


|                       | Precision | Recall | F1-score |
|-----------------------|-----------|--------|----------|
| roberta-tagalog-base  |           |        |          |
| xlm-roberta-base      |           |        |          |
| roberta-tagalog-large |           |        |          |
| roberta-tagalog-base  |           |        |          |

|                      |           | TBP |          |           | CRF |          |
|----------------------|-----------|-------------------------|----------|-----------|--------------------------------|----------|
|                      | Precision | Recall                  | F1-score | Precision | Recall                         | F1-score |
| fastText             |           |                         |          |           |                                |          |
| roberta-tagalog-base |           |                         |          |           |                                |          |


### Error analysis


## FAQs

- **Is this supposed to be a new Tagalog benchmark?**


- **Can I use this dataset to train models in production?**

- **Do you know of any other Tagalog datasets?**








## References

-  <a id="mortensen">Mortensen, David.</a>, *Undated*. Low-Resource NLP. Algorithms for Natural Language Processing [[Slides]](http://demo.clab.cs.cmu.edu/algo4nlp20/slides/low-resource-nlp.pdf)
- <a id="tsvetkov2017opportunities">Tsvetkov, Yulia</a>, 2017. Opportunities and Challenges in Working with Low-Resource Languages. Language Technologies Institute, Carnegie Mellon University. [[Slides]](https://www.cs.cmu.edu/~ytsvetko/jsalt-part1.pdf). 

