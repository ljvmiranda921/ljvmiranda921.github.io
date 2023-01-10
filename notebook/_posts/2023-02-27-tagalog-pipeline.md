---
layout: post
type: post
title: "Towards a Tagalog NLP pipeline"
date: 2023-02-27
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, tagalog, low-resource languages, prodigy, natural language processing, machine learning]
description: |
    Building NLP pipelines that work on Tagalog is hard. It's because 
    we lack annotated corpora and concentrated efforts to train models. 
    In this blog post, I'll report my progress on building a Tagalog NER pipeline and my hopes
    for the future of Tagalog NLP.
excerpt: |
    Building NLP pipelines that work on Tagalog is hard. It's because 
    we lack annotated corpora and concentrated efforts to train models. 
    In this blog post, I'll report my progress on building a Tagalog NER pipeline and my hopes
    for the future of Tagalog NLP.
---


<script type="text/javascript" src="https://cdn.jsdelivr.net/npm//vega@5"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm//vega-lite@4.17.0"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm//vega-embed@6"></script>

<span class="firstcharacter">T</span>agalog is my native language. It's
spoken by 76 million Filipinos and has been the country's official language
since the 30s.  It's a **text-rich** language, but unfortunately, a
**low-resource** one. Hence, building NLP pipelines for Tagalog is difficult.

In this blog post, I'll outline my process in building a named-entity
recognition (NER) pipeline for Tagalog. I'll discuss how I came up with a
gold-standard dataset, my benchmarking results, and my hopes for the future of
Tagalog NLP.

> I don't recommend using this pipeline for production purposes yet. See [caveats](#caveats). 

#### Contents

- [**Background**](#corpora): Tagalog NER data is scarce 
    - [We can circumvent the data scarcity problem...](#we-can-circumvent-the-data-scarcity-problem)
    - [...by bootstrapping the data we have.](#by-bootstrapping-the-data-we-have)
- [**Methods**](#gold): We still want gold-annotated data 
    - [I corrected annotations from a silver model...](#i-corrected-annotations-from-a-silver-model)
    - [...then benchmarked it with baseline NER approaches.](#then-benchmarked-it-with-baseline-ner-approaches)
- [**Experimental results**](#experimental-results)
    - [Finding the best word vector training setup](#finding-the-best-word-vector-training-setup)
    - [Finding the best language model training setup](#finding-the-best-language-model-training-setup)
- [**Conclusion**](#conclusion)

## <a id="corpora"></a>Tagalog NER data is scarce

Even if Tagalog is text-rich, the amount of annotated data is scarce. We
usually label these types of languages as **low-resource**. This problem isn't
unique to Tagalog.  Out of the approximately 7000 languages worldwide, only
10 have adequate NLP resources ([Mortensen, 2017](#mortensen) and [Tsvetkov,
2017](#tsvetkov2017opportunities)). We can circumvent the data scarcity problem
by bootstrapping the data we have.

> We can circumvent the data scarcity problem by bootstrapping the data
> we have.

### We can circumvent the data scarcity problem...

Many clever ways in language tech allow researchers to circumvent the data
scarcity problem. They usually involve taking advantage of a high-resource
language and transferring its capacity to a low-resource one. The table below
outlines these approaches:


| Approach                        | Data*  | Prerequisites                                                                                                | Description                                                                               |
|---------------------------------|----------------------|--------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| Supervised learning             | High                 | Large amount of labeled data.                                                                                 | Train a model as usual using feature-label pairs.                                                   |
| Cross-lingual transfer learning | None to a few        | Understanding of the similarities between source and target languages.                                       | Transfer resources and models from resource-rich source to resource-poor target language. |
| Zero-shot learning              | None                 | High similarity between source and target domains. It often helps if the latter is a "subset" of the former. | Train a model in a domain and assume it generalizes out-of-the-box in another domain.     |
| Few-shot learning               | A few to high        | Similarity between source and target domains and a task-specific finetuning dataset.                         | Use a pretrained model from a large corpus, and then finetune on a specific task.         |
| Polyglot learning               | A few to high        | A mixed corpus or a dataset with languages converted to a shared representation.                             | Combine resource-rich and resource-poor languages and train them together.                |

<p>* Data: amount of gold-labeled annotations required.</p>
{:style="text-align: left; font-size: 14px;"}

**Table 1:** List of techniques for low-resource NLP ([Mortensen](#mortensen), [Tsvetkov, 2017](#tsvetkov2017opportunities)).
{:style="text-align: center;"}


I will focus on **supervised** and **few-shot learning** in this blog post.
Because most of these approaches require a substantial amount of data, we need
to take advantage of existing corpora. One way is to use *silver-standard data*.
Their annotations are automatically generated, either by a statistical model
trained from a similar language or a knowledge base. Silver-standard data may
not be accurate or trustworthy, but they are faster and cheaper to create.

### ...by bootstrapping the data we have 

The best way to work with silver-standard data is to use them for bootstrapping
the annotations of a much larger and diverse dataset, thereby producing
*gold-standard annotations*. By bootstrapping the annotations, we reduce the
cognitive load of labeling and focus more on correcting the model's outputs
rather than labeling from scratch. The figure below illustrates the workflow I'm
following:

![](/assets/png/tagalog-gold-standard/silver_standard_framework.png){:width="650px"}  
{:style="text-align: center;"}

> By bootstrapping the annotations, we reduce the cognitive load of labeling
> and focus more on correcting the model's outputs rather than labeling from scratch.

The only major NER dataset for Tagalog is **WikiANN** ([Pan, Zhang, et al.,
2017](#pan2017wikiann)). It is a silver-standard dataset based on an English
Knowledge Base (KB). The researchers created a framework for tagging entities
based on Wikipedia and extended it to 282 other languages, including Tagalog. It
could be better. For example, the [first few entries of the validation
set](https://huggingface.co/datasets/wikiann/viewer/tl/validation) have glaring
errors:

<div style="position:relative; overflow: hidden; width;100%; padding-top: 10.25%">
<iframe src="/assets/png/tagalog-gold-standard/wikiann_error.html" height="100" width="720" style="border:1px solid #ddd;border-radius:10px;position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%"></iframe>
</div>
<br/>


**Example:** *Hinlalato ng paa* is the middle toe finger, not an `ORG`.
{:style="text-align: center;"}


<div style="position:relative; overflow: hidden; width;100%; padding-top: 10.25%">
<iframe src="/assets/png/tagalog-gold-standard/wikiann_error2.html" height="100" width="720" style="border:1px solid #ddd;border-radius:10px;position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%"></iframe>
</div>
<br/>

**Example:** *Ninoy Aquino* should be tagged as `PER`, while *Sultan Kudarat* as `LOC`.
{:style="text-align: center;"}

Also, the texts themselves aren't complete sentences. A model trained on this
data might translate poorly to longer documents as the *context* of an entity is
lost. For example, articles (*ang*, *si*, *ang mga*) can point to a noun phrase
and give clues if it's a person or organization.  So we can't rely on a model
trained with WikiANN. However, WikiANN can still be useful. We can use it to
train a model for bootstrapping our annotations.

> ...the texts [in WikiANN] aren't complete sentences. A model trained on this
> data might translate poorly to longer documents...so we can't [just] rely [on it].

Fortunately, we have **a lot of unannotated datasets that represent the
diversity of the Filipino language**. For example, there is the
[CommonCrawl](https://commoncrawl.org/) repository that contains web-crawled
data for any language. We also have TLUnified ([Cruz and Cheng,
2022](#cruz2022tlunified)) and WikiText TL-39 ([Cruz and Cheng,
2019](#cruz2019wikitext)). For my experiments, I will use the TLUnified
dataset as it's more recent, and one of its subdomains (news) resembles that of
standard NER benchmarks like CoNLL.

> I will be using the TLUnified dataset as it's more recent, and one of its
> subdomains resemble that of standard NER benchmarks like CoNLL.

My process goes like this: I will train a model from WikiANN and have it 
predict entities for TLUnified. Then, I will correct the predictions using 
[Prodigy](https://prodi.gy), an annotation software, to produce gold-standard
annotations. Piece of cake, right?

![](/assets/png/tagalog-gold-standard/framework_applied.png){:width="650px"}  
{:style="text-align: center;"}

However, *labeling thousands of samples is not the hardest part.* As the sole
annotator, I can easily influence a dataset of my biases and errors. In
practice, you'd want three or more annotators (preferably linguists), then
normalize their annotations based on some inter-annotator agreement.
Unfortunately, this is the **limitation** of this work. In the next section,
I'll outline some of my attempts to be more objective when annotating. Of
course, the ideal case is to have multiple annotators, so [**let me know if you
want to help out!**](#helping-out)

> As the sole annotator, [I] can influence a dataset of my biases and errors.
> This is the limitation of this work.

## <a id="gold"></a>We still want gold-annotated data

This section will discuss how I annotated TLUnified to produce
gold-standard data. I'll also introduce the experiments I did to see how
baseline models perform on this dataset. For clarity, I'll call the
annotated TLUnified as `tl_tlunified_gold` (`tl` - language code, `tlunified` -
data source, `gold` - dataset type).


### I corrected annotations from a silver model...

For the past three months, I corrected annotations produced by the WikiANN model.
I learned that as an annotator, it's easier to fix annotations than label them
from scratch. To make the annotation process more objective, I devised
[annotation guidelines](https://github.com/ljvmiranda921/calamanCy/tree/master/datasets/tl_calamancy_gold_corpus/guidelines) ([Artstein, 2017](#artstein2017inter)). Professor Nils
Reiter has an [excellent guide](https://sharedtasksinthedh.github.io/2017/10/01/howto-annotation/) for
developing these. I also took inspiration from [*The Guardian*'s
work](https://github.com/JournalismAI-2021-Quotes/quote-extraction/blob/28f429b260fc30dd884cd4d0a8ff0cb9047f0fe4/annotation_rules/Quote%20annotation%20guide.pdf),
which uses [Prodigy for quotation
detection](https://explosion.ai/blog/guardian).

However, I'm the only annotator. Hence, the annotations produced in v1.0 of
`tl_tlunified_gold` are **not ready** for production. Therefore, using Reiter's
framework, my annotations are still in the pre-pilot phase. Getting
multiple annotations and developing an inter-annotator agreement for several
iterations is the ideal case.

> ...the annotations produced in v1.0 of `tl_tlunified_gold` are **not ready**
> for production...my annotations are still in the pre-pilot phase.


Nevertheless, I produced some annotations for around 7,000 documents. I split
them between training, development, and test partitions and uploaded the v1.0 of
raw annotations to the cloud. You can access the raw annotations and replicate
the preprocessing step by checking out the [GitHub repository of this
project](https://github.com/ljvmiranda921/calamanCy/tree/master/datasets/tl_calamancy_gold_corpus).
The table below shows some dataset statistics:


| Tagalog Data    | Documents | Tokens | PER  | ORG  | LOC  |
|-----------------|-----------|--------|------|------|------|
| Training Set    | 6252      | 198588 | 6418 | 3121 | 3296 |
| Development Set |  782      |  25007 |  793 |  392 |  409 |
| Test Set        |  782      |  25153 | 818  |  423 |  438 |

**Table 2:** Dataset statistics for v1.0 of `tl_tlunified_cold` 
{:style="text-align: center;"}

### ...then benchmarked it with baseline NER approaches

I want to see how standard NER approaches fare with `tl_tlunified_gold`. **My
eventual goal is to set up training pipelines to produce decent Tagalog
models from this dataset.** I made two sets of experiments, one involving word
vectors and the other using language models or transformers. I aim to identify
the best training setup for a low-resource corpus for Tagalog. I'm not pitting
one against the other; I want to set up training pipelines for both in the
future.

> My eventual goal is to identify the best training setup for a low-resource
> corpus for Tagalog. I'm not pitting one against the other; I want to setup
> training pipelines for both in the future.

First, I want to benchmark several word vector settings for NER. The baseline
approach simply trains a model from the training and dev data, nothing more.
Then, I will examine if adding word vectors (also called [*static
vectors*](https://spacy.io/usage/embeddings-transformers#static-vectors) in
spaCy) can improve performance. Finally, I will investigate if 
[*pretraining*](https://spacy.io/usage/embeddings-transformers#pretraining)
can help push pipeline performance:


| Approach| Setup                 | Description                                                                          |
|---------|------------------------------|--------------------------------------------------------------------------------------|
| Supervised learning | Baseline | Train a NER model from scratch. No tricks, just the annotated data.                  |
| Supervised learning | Baseline + fastText                     | Source fastText vectors for the downstream NER task. |
| Supervised learning | Basline + fastText + pretraining | Pretrain spaCy's token-to-vector layer while sourcing fastText vectors.      |

**Table 3:** Experimental setup for word vectors
{:style="text-align: center;"}


The figure below shows the default setup for our word vector pipeline. The
baseline approach won't have any word vectors nor pretraining (*Baseline*).
Then, we will use word vectors as additional features for training our
statistical model (*Baseline + fastText*). Lastly, we will use pretraining to
initialize the weights of our components (*Baseline + fastText + pretraining*). 

![](/assets/png/tagalog-gold-standard/word_vector_design.png){:width="550px"}  
{:style="text-align: center;"}

Next, I will measure the performance of a monolingual and multilingual language
model. I'm using transformer models as a [drop-in
replacement](https://spacy.io/usage/embeddings-transformers#transformers) for
the representation layer to achieve higher accuracy:

| Approach| Language Models       | Description                                                              |
|---------|-----------------------|--------------------------------------------------------------------------|
| Few-shot learning | [roberta-tagalog](https://huggingface.co/jcblaise/roberta-tagalog-large) | Monolingual experiment with a large RoBERTa model trained from TLUnified. I will be testing both `base` and `large` variants. |
| Few-shot learning | [xlm-roberta](https://huggingface.co/xlm-roberta-large)      | Multilingual experiment with a large XLM-RoBERTa. Trained on 100 different languages. I will be testing both `base` and `large` variants. |

**Table 4:** Experimental setup for language models
{:style="text-align: center;"}

Again, I want to use what I learned from these experiments to set up a training
scheme for a Tagalog pipeline down the road. For all the experiments above, I
will use [spaCy's transition-based
parser](https://spacy.io/api/entityrecognizer) for sequence labeling.

## Experimental Results

The results below aim to answer eventual design decisions for building NLP
pipelines for Tagalog. I plan to create a word vector-based and language
model-based training setup. If you're interested in replicating my results,
check out the [spaCy project in
Github!](https://github.com/ljvmiranda921/calamanCy/tree/master/datasets/tl_calamancy_gold_corpus)
Lastly, because we're doing a bit of hyperparameter tuning here (choosing the
proper config, etc.), I will report the results as evaluated on the dev set to
avoid overfitting.

> The results below aim to answer eventual design decisions for building
> NLP pipelines for Tagalog. I plan to create a word vector-based and language model-based 
> training setup.

I ran each experiment for three trials, and I will report their mean and
standard deviation.

### Finding the best word vector training setup

To find the best word vector training setup, I designed an experiment to test 
how static vectors and pretraining can improve performance. The baseline
approach has none of these; it simply trains a model from scratch. Then, I sourced
static vectors and, eventually, a set of pretrained weights. Within these two, there
are still design choices left to be made:

- **On static vectors:** by default, I'm using the vectors available from the
[fastText website](https://fasttext.cc/docs/en/crawl-vectors.html). These were trained
from CommonCrawl and Wikipedia. *Questions:* *will it matter if I train my own fastText vectors from
TLUnified? How much efficiency gain can I get if I use [floret vectors](https://github.com/explosion/floret)?*

- **On pretraining:** by default, my [pretraining
objective](https://spacy.io/api/architectures#pretrain) is based on
[characters](https://spacy.io/api/architectures#pretrain_chars), i.e., the model
is tasked to predict some number of leading and trailing UTF-8 bytes for the
words. However, spaCy also provides another [pretraining objective based on a
static embeddings table](https://spacy.io/api/architectures#pretrain_vectors).
*Question: which one is more performant between the two?*

The table below shows the performance, using default settings, for our three
training scenarios. The results suggest **that using a combination of static
vectors and pretraining can improve F1-score** by at least 2pp.


| Setup               | Precision    | Recall        | F1-score       |
|------------------------------|--------------|---------------|----------------|
| Baseline               |    0.87 (0.01)          |  0.87 (0.01)             |  0.87 (0.00)              |
| Baseline + fastText*   |     0.89 (0.01)            |   0.86 (0.01)           |         0.88 (0.00)                |
| Baseline + fastText* + pretraining      |     **0.89 (0.01)**         |  **0.89 (0.01)**            |   **0.89 (0.00)**             |

<p>* 700k vectors/keys. Vectors were sourced from the fastText website.</p>
{:style="text-align: left; font-size: 14px;"}

**Table 5:** Pipeline performance. Evaluated on the development set.
{:style="text-align: center;"}

#### On static vectors: training my own fastText vectors is worth it

In the previous experiment, I used the fastText vectors provided by the
[fastText website](https://fasttext.cc/docs/en/crawl-vectors.html). These
vectors were trained from CommonCrawl and Wikipedia.  I'm curious if there's
performance gain if I trained my own fastText vectors from TLUnified.





#### On static vectors: floret vectors has efficiency gains


#### On pretraining: pretrain characters than pretrain vectors


### Finding the best language model training setup


| Language Models                      | Precision | Recall | F1-score |
|-----------------------|-----------|--------|----------|
| roberta-tagalog-base  |           |        |          |
| xlm-roberta-base      |           |        |          |
| roberta-tagalog-large |           |        |          |
| roberta-tagalog-base  |           |        |          |


## Conclusion


### Helping out




## Caveats

- **Is this supposed to be a new Tagalog benchmark?**


- **Can I use this dataset to train models in production?**

- **Do you know of any other Tagalog datasets?**








## References

-  <a id="mortensen">Mortensen, David.</a>, *Undated*. Low-Resource NLP. Algorithms for Natural Language Processing [[Slides]](http://demo.clab.cs.cmu.edu/algo4nlp20/slides/low-resource-nlp.pdf)
- <a id="tsvetkov2017opportunities">Tsvetkov, Yulia</a>, 2017. Opportunities and Challenges in Working with Low-Resource Languages. Language Technologies Institute, Carnegie Mellon University. [[Slides]](https://www.cs.cmu.edu/~ytsvetko/jsalt-part1.pdf). 
- <a id="pan2017wikiann">Xiaoman Pan, Boliang Zhang, Jonathan May, Joel Nothman, Kevin Knight, and Heng Ji.</a> 2017. [Cross-lingual Name Tagging and Linking for 282 Languages](https://aclanthology.org/P17-1178). In *Proceedings of the 55th Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers)*, pages 1946–1958, Vancouver, Canada. Association for Computational Linguistics.
- <a id="cruz2022tlunified">Jan Christian Blaise Cruz and Charibeth Cheng</a>. 2022. [Improving Large-scale Language Models and Resources for Filipino](https://aclanthology.org/2022.lrec-1.703/). In *Proceedings of the Thirteenth Language Resources and Evaluation Conference*, pages 6548–6555, Marseille, France. European Language Resources Association.
- <a id="cruz2019wikitext">Jan Christian Blaise Cruz and Charibeth Cheng</a>. 2019. [Evaluating Language Model Finetuning Techniques for Low-resource Languages](https://arxiv.org/abs/1907.00409) *arXiv:1907.00409*.
- <a id="artstein2017inter">Ron Artstein</a>. Inter-annotator Agreement. In: Ide Nancy & Pustejovsky James (eds.) *Handbook of Linguistic Annotation.* Springer, Dordrecht, 2017. DOI 10.1007/978-94-024-0881-2.