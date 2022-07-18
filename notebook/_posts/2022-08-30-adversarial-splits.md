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
[ConLL-2003](https://huggingface.co/datasets/conll2003), these partitions are
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

In this blog post, I want to discuss **alternative ways to split our datasets to
provide more realistic performance.** I will call all methods under this
umbrella as **adversarial splits**.[^1] Lastly, note that some examples are
geared towards NLP, as I'm more familiar with this domain.

## Splitting by maximizing divergence

One of the major assumptions in machine learning is that the **training and test
sets are from the same distribution**, i.e., they are [independent and
identically distributed
(i.i.d.)](https://en.wikipedia.org/wiki/Independent_and_identically_distributed_random_variables).
But let's drop that for a moment. We know that the i.i.d. assumption can lead to
grossly overestimated model performances, but **what if we evaluate the model
with the "worst" possible test set?**



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



## Footnotes

[^1]: 

    The taxonomy is a bit fuzzy here. For now, anything that is not random
    or standard is considered adversarial (this includes heuristic splits, or
    splitting by a given feature or attribute)