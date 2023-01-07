---
layout: post
type: post
title: "Towards building a gold-standard NER corpus for Tagalog"
date: 2023-02-14
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, tagalog, low-resource languages, prodigy, natural language processing, machine learning]
description: |
    The lack of Tagalog gold-standard named-entity recognition (NER) data
    inhibits us from training decent structured prediction pipelines for the
    language. In this blog post, I'll talk about the state of Tagalog-based
    corpora, my progress on building a gold-standard dataset (and its
    limitations), and my hopes for the future of Tagalog NLP.
excerpt: |
    The lack of Tagalog gold-standard NER data inhibits us from training decent
    structured prediction pipelines for the language. In this blog post, I'll talk
    about the state of Tagalog-based corpora, my progress on building a
    gold-standard dataset (and its limitations), and my hopes for the future of Tagalog NLP.
---


<span class="firstcharacter">T</span>agalog (tl) is my native language. It's spoken
by 76 million Filipinos and has been our official language since the 30s. 
Stories and songs have been written in Tagalog, and it has a long cultural and
historical significance. It's a **text-rich** language, but unfortunately, a
**low-resource** one. In this blog post, I'll talk about the state of
Tagalog-based corpora, my experience in creating a gold-standard dataset
for named-entity recognition, and my hopes for
the future of Tagalog NLP.

I am focusing on structured prediction tasks like named-entity recognition (NER)
because it has a lot of practical applications and little work has been done on
Tagalog NER yet.


## <a id="corpora"></a>Tagalog NER corpora is scarce

Even if Tagalog is text-rich (i.e., a million speakers, thousands of written
content, etc.), the amount of annotated texts are scarce. We usually label these
types of languages as **low-resource**. This problem isn't unique to Tagalog.
Out of the approximately 7000 languages in the world, only 10 have adequate NLP
resources ([Mortensen](#mortensen), [Tsvetkov,
2017](#tsvetkov2017opportunities)). We can circumvent the data scarcity problem
by bootstrapping with the data we have.

> We can circumvent the data scarcity problem by bootstrapping with the data
> we have.

### We can circumvent the data scarcity problem...

There are many clever ways to build technologies on low-resource languages that
allow researchers to circumvent the data scarcity problem. They usually involve
taking advantage of a high-resource language, and transferring its capacity to a
low-resource one. The table below outlines different approaches for low-resource
NLP:


| Approach                        | Data*  | Prerequisites                                                                                                | Description                                                                               |
|---------------------------------|----------------------|--------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| Supervised learning             | High                 | Large amount of labeled data.                                                                                 | Train a model as usual using feature-label pairs.                                                   |
| Cross-lingual transfer learning | None to a few        | Understanding of the similarities between source and target languages.                                       | Transfer resources and models from resource-rich source to resource-poor target language. |
| Zero-shot learning              | None                 | High similarity between source and target domains. It often helps if the latter is a "subset" of the former. | Train a model in a domain and assume it generalizes out-of-the-box in another domain.     |
| Few-shot learning               | A few to high        | Similarity between source and target domains and a task-specific finetuning dataset.                         | Use a pretrained model from a large corpus, and then finetune on a specific task.         |
| Polyglot learning               | A few to high        | A mixed corpus or a dataset with languages converted to a shared representation.                             | Combine resource-rich and resource-poor languages and train them together.                |

<p>* Data: amount of gold-labeled annotations required.</p>
{:style="text-align: left; font-size: 14px;"}

**Table:** List of techniques for low-resource NLP ([Mortensen](#mortensen), [Tsvetkov, 2017](#tsvetkov2017opportunities)).
{:style="text-align: center;"}


Some of these methods produce what we usually call  **silver-standard data**.
Their annotations are automatically generated, either by a statistical model
trained from a similar language or a knowledge base. Silver-standard data may
not be accurate or trustworthy, but they are faster and cheaper to create.

### ...by bootstrapping with the data we have 

The best way to work with silver-standard data is to use them for bootstrapping
the annotations of a much larger and diverse dataset. By bootstrapping the
annotations, we reduce the cognitive load of labeling and focus more on
correcting the model's outputs rather than labeling from scratch. The figure below
illustrates the workflow I'm following:

![](/assets/png/tagalog-gold-standard/silver_standard_framework.png){:width="650px"}  
{:style="text-align: center;"}

> By bootstrapping the annotations, we reduce the cognitive load of labeling
> and focus more on correcting the model's outputs rather than labeling from scratch.

The only major NER dataset for Tagalog is **WikiANN** ([Pan, Zhang, et al.,
2017](#pan2017wikiann)). It is a silver-standard dataset based on an English
Knowledge Base (KB). The researchers were able to create a framework for tagging
entities based on Wikipedia and extended it to 282 other languages,
including Tagalog. It is not perfect. For example, the [first few entries of the validation
set](https://huggingface.co/datasets/wikiann/viewer/tl/validation) have glaring errors:

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
2019](#cruz2019wikitext)). For my experiments, I will be using the TLUnified
dataset as it's more recent, and one of its subdomains (news) resemble that of
standard NER benchmarks like CoNLL.

> I will be using the TLUnified dataset as it's more recent, and one of its
> subdomains resemble that of standard NER benchmarks like CoNLL.

My process then goes like this: I will train a model from WikiANN and have it 
predict entities for TLUnified. Then, I will correct the predictions using 
[Prodigy](https://prodi.gy), an annotation software, to produce gold-standard
annotations. Piece of cake, right?

![](/assets/png/tagalog-gold-standard/framework_applied.png){:width="650px"}  
{:style="text-align: center;"}

However, *labeling thousands of samples is not the hardest part.* As the sole
annotator, it's easy for me to influence a dataset of my biases and errors. In
practice, you'd want three or more annotators (preferably linguists), then
normalize their annotations based on some inter-annotator agreement.
Unfortunately, this is the **limitation** of this work. In the next section,
I'll outline some of my attempts to be more objective when annotating. The ideal
case is to have multiple annotators though, so [**let me know if you want to help out!**](#helping-out)

> As the sole annotator, [I] can influence a dataset of my biases and errors.
> This is the limitation of this work.

## <a id="gold"></a>We still want gold-annotated data

In this section, I'll talk about how I annotated TLUnified to produce
gold-standard data. I'll also introduce the experiments I did to see how
baseline models perform on this dataset. For clarity, I'll be calling the
annotated TLUnified as `tl_tlunified_gold` (`tl` - language code, `tlunified` -
data source, `gold` - dataset type).


### I corrected annotations from a silver model...


<!-- bootstrapping wikiann -->
<!-- advantage over labeling from scratch: reduced cognitive load -->
<!-- experimented over ner.teach -->




<!-- annotation guidelines -->



| Tagalog Data    | Sentences | Tokens | PER | ORG | LOC |
|-----------------|-----------|--------|-----|-----|-----|
| Training Set    |           |        |     |     |     |
| Development Set |           |        |     |     |     |
| Test Set        |           |        |     |     |     |


### ...then tested it with baseline NER approaches

I want to see how standard NER approaches fare with `tl_tlunified_gold`. I made
two sets of experiments, one involving static vectors and the other using language
models or transformers. In addition, I also want to see the effects of
[pretraining](https://spacy.io/usage/embeddings-transformers#pretraining) for
some of these vectors:

| Approach| Static Vectors                 | Description                                                                          |
|---------|------------------------------|--------------------------------------------------------------------------------------|
| Supervised learning | None                         | Train a NER model from scratch. No tricks, just the annotated data.                  |
| Supervised learning | None + pretraining     | [Pretrain characters](https://spacy.io/api/architectures#pretrain_chars) using a subset of TLUnified to a finetuned "token to vector" layer. |
| Supervised learning | fastText                     | Train a set of [fastText](https://fasttext.cc/) vectors from TLUnified and use them as [static vectors](https://spacy.io/usage/embeddings-transformers#static-vectors) for the downstream NER task. |
| Supervised learning | fastText + pretraining | [Pretrain](https://spacy.io/api/architectures#pretrain_vectors) using the fastText vectors as pretraining objective.                          |

**Table:** Experimental setup for word vectors
{:style="text-align: center;"}

Then, I will also measure the performance of a monolingual and multilingual
language model. I'm using transformer models as a [drop-in replacement](https://spacy.io/usage/embeddings-transformers#transformers) for
the representation layer to achieve higher accuracy:

| Approach| Language Models       | Description                                                              |
|---------|-----------------------|--------------------------------------------------------------------------|
| Few-shot learning | [roberta-tagalog](https://huggingface.co/jcblaise/roberta-tagalog-large) | Monolingual experiment with a large RoBERTa model trained from TLUnified. I will be testing both `base` and `large` variants. |
| Few-shot learning | [xlm-roberta](https://huggingface.co/xlm-roberta-large)      | Multilingual experiment with a large XLM-RoBERTa. Trained on 100 different languages. I will be testing both `base` and `large` variants. |

**Table:** Experimental setup for language models
{:style="text-align: center;"}

For all the experiments above, I will be using a [spaCy's transition-based
parser](https://spacy.io/api/entityrecognizer) for sequence labeling.

## Experimental Results

| Static Vectors                             | Precision | Recall | F1-score |
|------------------------------|-----------|--------|----------|
| None            |           |        |          |
| None + pretraining     |           |        |          |
| fastText (XXX vectors)       |           |        |          |
| fastText + pretraining |           |        |          |


| Language Models                      | Precision | Recall | F1-score |
|-----------------------|-----------|--------|----------|
| roberta-tagalog-base  |           |        |          |
| xlm-roberta-base      |           |        |          |
| roberta-tagalog-large |           |        |          |
| roberta-tagalog-base  |           |        |          |

<!--

|                      |           | TBP |          |           | CRF |          |
|----------------------|-----------|-------------------------|----------|-----------|--------------------------------|----------|
|                      | Precision | Recall                  | F1-score | Precision | Recall                         | F1-score |
| fastText             |           |                         |          |           |                                |          |
| roberta-tagalog-base |           |                         |          |           |                                |          |

-->


## Conclusion


### Helping out


### Postscript: reflections while annotating



## FAQs

- **Is this supposed to be a new Tagalog benchmark?**


- **Can I use this dataset to train models in production?**

- **Do you know of any other Tagalog datasets?**








## References

-  <a id="mortensen">Mortensen, David.</a>, *Undated*. Low-Resource NLP. Algorithms for Natural Language Processing [[Slides]](http://demo.clab.cs.cmu.edu/algo4nlp20/slides/low-resource-nlp.pdf)
- <a id="tsvetkov2017opportunities">Tsvetkov, Yulia</a>, 2017. Opportunities and Challenges in Working with Low-Resource Languages. Language Technologies Institute, Carnegie Mellon University. [[Slides]](https://www.cs.cmu.edu/~ytsvetko/jsalt-part1.pdf). 
- <a id="pan2017wikiann">Xiaoman Pan, Boliang Zhang, Jonathan May, Joel Nothman, Kevin Knight, and Heng Ji.</a> 2017. [Cross-lingual Name Tagging and Linking for 282 Languages](https://aclanthology.org/P17-1178). In *Proceedings of the 55th Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers)*, pages 1946–1958, Vancouver, Canada. Association for Computational Linguistics.
- <a id="cruz2022tlunified">Jan Christian Blaise Cruz and Charibeth Cheng</a>. 2022. [Improving Large-scale Language Models and Resources for Filipino](https://aclanthology.org/2022.lrec-1.703/). In *Proceedings of the Thirteenth Language Resources and Evaluation Conference*, pages 6548–6555, Marseille, France. European Language Resources Association.
- <a id="cruz2019wikitext">Jan Christian Blaise Cruz and Charibeth Cheng</a>. 2019. [Evaluating Language Model Finetuning Techniques for Low-resource Languages](https://arxiv.org/abs/1907.00409) *arXiv:1907.00409*.
