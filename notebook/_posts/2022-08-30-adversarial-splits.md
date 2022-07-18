---
layout: post
type: post
title: "Your train-test split may be doing you a disservice"
date: 2022-08-30
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [machine learning, adversarial splitting]
description: |
    Have you ever encountered a problem where your model works well in your test
    set but doesn't perform well in the wild? It's likely because your test set
    does not reflect the reality of your domain, overestimating our model's
    performance. In this blog post, I'll discuss alternative ways to split data
    and examine their effect on machine learning benchmarks. 
excerpt: |
    Have you ever encountered a problem where your model works well in your test
    set but doesn't perform well in the wild? It's likely because your test set
    does not reflect the reality of your domain, overestimating our model's
    performance. In this blog post, I'll discuss alternative ways to split data
    and examine their effect on machine learning benchmarks. 
---

<span class="firstcharacter">F</span>irst, let's recap a typical data science
workflow: every project starts by splitting our data into train, development
(dev), and test partitions. Then we fit our model using the train and dev sets
and compute the score using a held-out test set. 

Most of the time, we shuffle our data before splitting, creating **random
splits**. For some benchmark datasets like
[MNIST](http://yann.lecun.com/exdb/mnist/) or
[OntoNote 5.0](https://catalog.ldc.upenn.edu/LDC2013T19), these partitions are
already included in the task, providing us with **standard splits**. 

However, it turns out that random and standard splits can lead to **test sets
that are not wholly representative of the actual domain** ([Gorman and Bedrick,
2019](#gorman2019standard), and [Søgaard et. al., 2021](#sogaard2021random)).
It's also possible that the training and test sets look very similar,
encouraging the model to **memorize the training set without actually learning
anything**. This behavior results in overestimated performances that don't
translate well into production.

> It turns out that random and standard splits can lead to test sets that are
> not wholly representative of the actual domain...resulting into overestimated
> performance that don't translate well into production.

This blog post discusses **alternative ways to split our datasets to provide
more realistic performance.** I will call all methods under this umbrella as
**adversarial splits**.[^1] I'll also investigate **how adversarial splits
affect model performance on the named-entity recognition (NER) task** using
[spaCy's transition-based NER](https://spacy.io/api/entityrecognizer) and the
WikiNeural, WNUT17, and OntoNotes 5.0 datasets.

> I want to take this opportunity to introduce a Python package that
> I'm currently working on, ⚔[️ **`vs-split`**](https://github.com/ljvmiranda921/vs-split). It's still a work-in-progress, but it implements some techniques I'll mention throughout the post.

## Splitting by maximizing divergence

A central assumption in machine learning is that the **training and test sets
are from the same distribution**, i.e., they are [independent and identically
distributed
(i.i.d.)](https://en.wikipedia.org/wiki/Independent_and_identically_distributed_random_variables) ([Gilmer, 2020](#gilmer2020robustness)).
But let's drop that for a moment. We know that the i.i.d. assumption can lead to
grossly overestimated model performances, but **what if we evaluate the model
with the "worst" possible test set?**

We can obtain the "worst" test set by **ensuring that the train and test sets
have different distributions**, i.e., they're wholly divergent. We can measure
this value using a metric called the [Wasserstein
distance](https://en.wikipedia.org/wiki/Wasserstein_metric). However, finding
the right combination of train and test examples that maximizes this metric is
an NP-hard problem, so [Sogaaard et al.  (2021)](#sogaard2021random) used an
approximate approach involving k-nearest neighbors with a ball-tree algorithm.


<!---

If we run this method through MNIST, then we can see how different the training and test examples are:

It might not look obvious in text datasets, but here are some examples from the [English Wikineural dataset](https://paperswithcode.com/dataset/wikineural).

When testing

-->








## Splitting by heuristic

<!-- talk about domain expertise -->

## Splitting by perturbation

<!-- talk about data augmentation, this is an offshoot of that -->

## Final thoughts

<!-- recap -->
<!-- i find three possible avenues to solve this problem (from hardest to easiest)


IDEALISTIC <-> PRACTICAL


- rebuild the whole ML ecosystem
- create better benchmarks
- add systems for check and balances
-->


## References

- <a id="sogaard2021random">Anders Søgaard, Sebastian Ebert, Jasmijn Bastings, and Katja Filippova.</a> 2021. We Need To Talk About Random Splits. In *Proceedings of the 16th Conference of the European Chapter of the Association for Computational Linguistics: Main Volume*, pages 1823–1832, Online. Association for Computational Linguistics.
- <a id="gorman2019standard">Kyle Gorman and Steven Bedrick.</a> 2019. We Need to Talk about Standard Splits. In *Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics*, pages 2786–2791, Florence, Italy. Association for Computational Linguistics.
- <a id="gilmer2020robustness">Justin Gilmer.</a> The Robustness Problem. Presentation slides at [http://isl.stanford.edu/talks/talks/2020q1/justin-gilmer/slides.pdf](http://isl.stanford.edu/talks/talks/2020q1/justin-gilmer/slides.pdf)



## Footnotes

[^1]: 

    The taxonomy is a bit fuzzy here. For now, anything that is not random
    or standard is considered adversarial (this includes heuristic splits, or
    splitting by a given feature or attribute)