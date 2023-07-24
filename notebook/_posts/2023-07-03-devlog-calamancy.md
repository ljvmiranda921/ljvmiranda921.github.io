---
layout: post
type: post
title: "Some thoughts on the annotation process"
date: 2023-07-03
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, tagalog, low-resource languages, prodigy, natural language processing, machine learning]
header-img: /assets/png/calamancy-annotation/header.png
description: |
    A development log on the calamanCy project and the Tagalog NLP pipeline. The tl;dr: we just finished
    re-annotating the dataset. I also want to share my learnings during the annotation process.
    Access the corpus at https://huggingface.co/datasets/ljvmiranda921/tlunified-ner
excerpt: |
    A development log on the calamanCy project and the Tagalog NLP pipeline. The tl;dr: we just finished
    re-annotating the dataset. I also want to share my learnings during the annotation process.
    Access the corpus at https://huggingface.co/datasets/ljvmiranda921/tlunified-ner
---

<span class="firstcharacter">F</span>irst off, I'm happy to see such warm reception to my [first blog post](/notebook/2023/02/04/tagalog-pipeline/). Thank you!
There are a few more experiments that I wanted to do for the sake of completeness and rigor. 
I hope to release the alpha version of [calamanCy](https://github.com/ljvmiranda921/calamanCy) in August, 
so this blog post may as well be a lead-up to that release. 

This blog post can be summarized as: *"young and naive researcher just learned something very obvious!"* 
I am mostly referring to the **annotation process**.
Luckily, I was able to find two more folks to help with data annotation, and we've been updating the original dataset for the past three months.

> Tl;dr, we just finished re-annotating TLUnified with NER tags!
> You can access the updated corpus, TLUnified-NER, in [HuggingFace Datasets](https://huggingface.co/datasets/ljvmiranda921/tlunified-ner).

## Data annotation is iterative

It's harder to imagine this when you're annotating alone. 
In fact, the final diagram in my [February blog post](https://ljvmiranda921.github.io/notebook/2023/02/04/tagalog-pipeline/#conclusion) shows this misconception. 
We don't just annotate a thousand examples until we're tired and call it a day. 
Instead, **annotation is iterative**:

![](/assets/png/calamancy-annotation/iterative-process.png){:width="700px"}
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
Finally, we also tried to correct our *past* annotations based on our revisions to the annotation guidelines. 
However, there are no checks or QA for these corrections so I wasn't able to track their diffs.


### Evaluate the annotated batch 

The evaluation step is perhaps the most crucial part of the annotation process. 
Ultimately, the goal is to improve the annotators' understanding of the "phenomena."
This step usually involves the following activities:


- **Resolving disagreements / misconceptions**: I compiled the annotations and computed for a partial inter-annotator agreement score (IAA).
    This process allowed me to estimate if our annotations are improving in quality. 

    For named-entity recognition (NER), it is not straightforward to compute for this metric (I used [Cohen's Kappa](https://en.wikipedia.org/wiki/Cohen%27s_kappa)).
    It is possible to compute for this value at the token level, but this leads to an imbalanced dataset (e.g., there are many unlabeled tokens).
    So I followed what [Deleger et al., (2012)](#deleger2012gold) and [Brandsen et al., (2020)](#brandsen2020gold) did and computed for the pairwise F1-score as well.

- **Mini-retrospective meetings**: During the initial months of the annotation phase, I conducted sync meetings to discuss confusing examples and labels.
    Confusion usually came from edge-case examples or vagueness in the annotation guidelines.
    We try to resolve this by updating the guidelines or correcting our past annotations. 

    I try to make these meetings as short and async as possible (30 minutes to 1 hour). 
    I pattern these meetings to a typical software development sprint retrospective. 

    We use [Parabol](https://www.parabol.co/) (I co-opted the "Start, Stop, Continue" free template) as our collaboration software. 
    We frame the questions like so:

    - *Start*: What rules should we include in our annotation guidelines?
    - *Stop*: Which rules are vague and confusing? Should we remove or update them?
    - *Continue*: Which rules serve as good examples to retain?
    <br>


    Personally, I enjoy discussing rules as it compels me to establish a coherent pattern when labeling examples.
    We try to keep a "bank" of edge-cases and work together to address them.
    However, if we focus too much on individual examples, our meetings may become inundated with edge cases, hindering the improvement of the guidelines.

- **Assess if we need more annotations**: For this annotation project, I have two stop conditions: (1) if the train curve doesn't improve or (2) if we reached at least 5000 examples.
    Prodigy provides a [`train-curve`](https://prodi.gy/docs/recipes#train-curve) command to check if we still need more examples by learning a model at 25%, 50%, and 75% of the training set. 

    For the most part, the trend points to us annotating more data, but my budget is running low and I have other things to do, so I stopped after we reached 7000 examples.
    I'm definitely game to annotate a few more, but in the future I'd want to include other useful labels such as morphological features or parts-of-speech (something for Universal Dependencies) in my next annotation project.

Here's a chart on how our IAA metrics improved over time. 
These numbers don't factor in our corrections. 
I'm just computing the metrics per batch as I receive them.


![](/assets/png/calamancy-annotation/visualization.svg){:width="600px"}
{: style="text-align: center;"}


Finally, I found it helpful to have "north star questions" as I evaluate our annotations. 
It is easy to get bogged down by details that I might miss the bigger picture.
These north star questions include:
- "If I get these annotations, will they be helpful for doing [insert downstream application]?"
- "Will this revision enhance our understanding of the phenomena?"
- "Will it be helpful for the model or [any downstream application] to learn this edge-case?"

**In the future, I think it would be better to do a more fine-grained annotation project.**
I realized later in the project that my entity types are too general that we tend to lump several categories in a single label.
I think that's the next phase of improvement that I can do next.

### Update annotation guidelines

Updating the annotation guidelines allows us to codify our understanding of the task.
Personally, it is also a good way to preserve our learnings and onboard future annotators in the project.
Most of the updates involve adding new examples, clarifying definitions, and noting edge-cases.

I'll be updating the [calamanCy repository](https://github.com/ljvmiranda921/calamanCy) with the latest version of the annotation guidelines.
It has grown quite a bit (and we're using Google Docs for easier collaboration), but it might be good to transfer it in the open.

## Final thoughts

I'm happy to see the growth of the project from its inception a few months ago. 
I'm also excited to share these updates and release the trained pipelines soon.
Finally, I'd like to thank our annotators for helping out in the process.

## References

- <a id="deleger2012gold">Deleger, L., Li, Q., Lingren, T., Kaiser, M., Molnar, K., Stoutenborough, L., Kouril, M., Marsolo, K., and Solti, I.</a> (2012). Building gold standard corpora for medical natural language processing tasks. *AMIA Annual Symposium proceedings / AMIA Symposium. AMIA Symposium*, 2012:144–153.
- <a id="brandsen2020gold">Brandsen, A., Verberne S., Wansleeben, M., and Lambers, K.</a> (2020). Creating a Dataset for Named Entity Recognition in the Archaeology Domain. In *Proceedings of the Twelfth Language Resources and Evaluation Conference*, pages 4573–4577, Marseille, France. European Language Resources Association.