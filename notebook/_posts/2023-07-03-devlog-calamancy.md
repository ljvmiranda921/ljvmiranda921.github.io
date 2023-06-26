---
layout: post
type: post
title: "calamanCy devlog: some thoughts on the annotation process"
date: 2023-07-03
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, tagalog, low-resource languages, prodigy, natural language processing, machine learning]
header-img: /assets/png/calamancy-devlog-01/header.png
description: |
    A development log on the calamanCy project and the Tagalog NLP pipeline. The tl;dr: we just finished
    re-annotating the dataset. I also want to share some thoughts on my learnings during the annotation process.
excerpt: |
    A development log on the calamanCy project and the Tagalog NLP pipeline. The tl;dr: we just finished
    re-annotating the dataset. I also want to share some thoughts on my learnings during the annotation process.
---

<span class="firstcharacter">F</span>irst off, I'm happy to see such warm reception to my [first blog post](/2023/02/04/tagalog-pipeline/). Thank you!
There are a few more experiments that I wanted to do for the sake of completeness and rigor. 
I hope to release the alpha version of [calamanCy](https://github.com/ljvmiranda921/calamanCy) in August, 
so this blog post may as well be a lead-up to that release. 

This blog post can be summarized as: *"young and naive researcher just learned something very obvious!"* 
I am mostly referring to the **annotation process**.
Luckily, I was able to find two more folks to help with data annotation, and we've been updating the original dataset for the past three months.

## Data annotation is iterative

It's harder to imagine this when you're annotating alone. 
In fact, the final diagram in my [February blog post](https://ljvmiranda921.github.io/notebook/2023/02/04/tagalog-pipeline/#conclusion) shows this misconception. 
We don't just annotate a thousand examples until we're tired and call it a day. 
Instead, **annotation is iterative**:

![](/assets/png/calamancy-devlog-01/iterative-process.png){:width="700px"}
{: style="text-align: center;"}

Nils Reiter's [blog post](https://sharedtasksinthedh.github.io/2017/10/01/howto-annotation/) has been my annotation bible for the past few months.
The figure above is a simplified version of his annotation workflow. 
We start by creating a set of pilot annotations and then continually iterate until we reach a stop condition.
For each round, we add new annotations while correcting our past annotations. 
This process makes everything a bit more involved, but at least we get higher quality annotations in the end.

### Annotate a batch of examples

We tried to annotate 800-1000 examples for each round and ensured that each annotator gets the same batch of texts. 
Labeling that amount of data takes one-and-a-half to two weeks at most.
During the pilot phase, we used the annotation guidelines I initially developed for myself.
As for our software, we used [Prodigy](https://prodi.gy) with the `ner.manual` recipe.

Note that for each round, we are adding more examples to the corpus. 
After six to seven syncs at the course of four months, we arrived at our target dataset size.
Finally, we also try to correct our *past* annotations based on our revisions to the annotation guidelines. 
However, there are no checks or QA for these corrections so I wasn't able to track their diffs.


### Evaluate the annotated batch 

The evaluation step is perhaps the most crucial part of the annotation process. 
Ultimately, the goal is to improve the annotators' understanding of the "phenomena."
This step usually involves the following activities:


- **Resolving disagreements / misconceptions**: I compiled the annotations and computed for a partial inter-annotator agreement score (IAA).
    This process allowed me to estimate if our annotations are improving in quality. 

    For named-entity recognition (NER), it is not straightforward to compute for this metric (I use [Cohen's Kappa](https://en.wikipedia.org/wiki/Cohen%27s_kappa)).
    It is possible to compute for this value at the token level, but this leads to an imbalanced dataset (e.g., there are many unlabeled tokens).
    So I followed what Deleger et al., (2012) and Brandsen et al., (2020) did and computed for the pairwise F1-score as well.

- **Mini-retrospective meetings**: During the initial months of the annotation phase, we conduct sync meetings to talk about confusing examples and labels.
    Confusion may involve edge-case examples or vagueness in the annotation guidelines.




## Extra: hyperparameter optimization
