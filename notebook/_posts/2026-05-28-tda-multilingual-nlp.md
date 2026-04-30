---
layout: post
type: post
title: "The shape of multilingual synthetic data via topological data analysis"
date: 2026-05-28
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags:
  [
    nlp,
    topology,
    synthetic data,
    research,
    natural language processing,
    llm,
    multilingual nlp,
  ]
description: |
    In this blog post, I jot down my notes and early explorations on topology to better understand
    multilingual synthetic data.
excerpt: |
---

<span class="firstcharacter">F</span>or the past few months, I've been exploring how we can obtain high-quality multilingual data at scale.
A common approach is to collect this data from native human speakers, giving us **natural data**, but this process is quite costly and time-consuming.
Another option is to generate from language models (LMs), giving us what we call **synthetic data**.
In my recent work, [Polyglot Teachers](https://arxiv.org/abs/2604.11290), I evaluated which models are good at generating multilingual data&mdash;the analysis there is quite empirical and rigorous.
However, I want to take this a bit further: is there a fundamental *shape* to natural data? And how close are current synthetic datasets to it?
I find this interesting because it has a lot of potential applications such as guided data generation or measuring the quality of synthetic data.

Luckily, we can glean some insights from the field of [topological data analysis (TDA)](https://en.wikipedia.org/wiki/Topological_data_analysis).
TDA is largely influenced by topology and geometric learning, with the goal of understanding the structure of data.
One of my favorite introductory readings on the field (and also my main reference for this blog post) is [Chazal and Michel (2021)](https://arxiv.org/pdf/1710.04019)'s work.
More importantly, this field gives us several tools and ways-of-thinking to understand the *shape* of data---I'll talk more about these as we go along.
In this blog post, I will apply these tools to analyze multilingual data, both synthetic and natural.

## Background

### Topological Data Analysis 

A typical approach to understanding the *shape* of a dataset is to embed text into a set of vectors, and then perform dimensionality reduction / clustering to visualize and intuit how each instance is organized.
For the purposes of this blog post, we call this class of methods *geometric*.
A geometric approach is nice and I've been using it since I started working on NLP, but I noticed a lot of limitations of this pipeline:

1. **Clustering tends to obscure dataset organization** by forcing the embedding space into separate groups. Some documents, especially those with long token counts, can have overlapping topics and meaning---clustering doesn't reveal these properties. 

2. **Dimensionality reduction is lossy.** A common setup is to reduce a, say, 768-dim vector to two dimensions using t-SNE or UMAP. The intuition for these approaches is that if two points are neighbors in 768-dims, they'll likely be neighbors in 2-dims. Ideally, we want to get richer signal from a dataset's global structure.

3. **Geometric methods are sensitive to data and hyperparameter settings.** One of my biggest sources of headache when using t-SNE or clustering is how sensitive they are to their settings such as the embedding model or number of clusters. Sometimes, I find myself adjusting these hyperparameters until the map "looks pretty" and it doesn't feel scientific.

**Topological data analysis (TDA)** is an application of topology, which is a branch of mathematics concerned with properties of spaces that are preserved under deformations (see the [classic mug and doughnut example](https://www.youtube.com/watch?v=9NlqYr6-TpA)).
I find it appealing because it promises a better understanding of a dataset's global structures.
It has been applied to several high-complexity domains such as biological or time-series data.
More importantly, TDA addresses the limitations of the geometric methods mentioned above:

![](/assets/png/tda-multilingual-nlp/cup_to_donut.png){:width="720px"}  
_The classic example to demonstrate the intuition in topology is that a mug and a doughnut are of the same shape: both have exactly one hole, and one can be bent into the other without tearing or gluing._
{: style="text-align: center;"}

| Limitation of geometric methods | How TDA addresses it |
|---|---|
| Clustering forces the embedding space into discrete groups, obscuring overlapping topics and continuous structure. | TDA captures continuous global structure without committing to a fixed partition of the data. |
| Dimensionality reduction (t-SNE, UMAP) is lossy and emphasizes local neighborhoods at the expense of global structure. | TDA computes topological invariants directly in the original high-dimensional space, preserving global signal. |
| Results are highly sensitive to hyperparameters (embedding model, perplexity, number of clusters), making analyses feel ad hoc. | Persistent homology tracks features across all scales and is provably stable under small perturbations of the input, so findings are less hyperparameter-dependent. |

In this blog post, I want to focus on two major analysis tools in TDA: Persistent Homology and the Mapper algorithm. 
Let me describe them in brief.


#### Persistent Homology

**Persistent Homology** is a tool for finding structural patterns in the data that are robust, i.e., they don't disappear when the data is slightly perturbed by noise or by resampling. 
It does so using a *filtration* (see Figure below): a sequence of connected shapes obtained by gradually linking nearby data points. 
By sweeping through this sequence, some structural patterns will appear, stick around, and disappear. 
Those that persist across a wide range of the sequence are the robust features we care about.

![](/assets/png/tda-multilingual-nlp/filtration.gif){:width="720px"}  
{: style="text-align: center;"}

The GIF above shows three filtrations side by side. 
Each panel starts with a set of points (imagine these as text embeddings, where each dot is a document) arranged in a different configuration. 
The parameter $$\epsilon$$ is a distance threshold: any two points closer than $$\epsilon$$ get linked by an edge, and any three mutually linked points get filled in as a triangle. 
As $$\epsilon$$ grows, each example reveals its own structure.
From the left, we see
one loop in the circle, 
two groups that merge in the clusters, 
and two loops joined at a shared region in the Figure 8. 
The features that persist across a wide range of $$\epsilon$$ are the structural patterns we care about. 

The output of this tool is a persistence diagram:

#### Mapper Algorithm


#### Typical TDA Pipeline

A typical TDA pipeline still involves converting text into vector embeddings, but instead of using t-SNE or UMAP, we obtain topological features using the tools mentioned above.


### Dataset

In this blog post, we're going to use the [PolyglotTeachers-SFT-Synth](https://huggingface.co/datasets/ljvmiranda921/PolyglotTeachers-SFT-Synth) **synthetic dataset** from my recent paper.
It contains instruction-tuning pairs for seven languages: Arabic, Czech, German, Spanish, Indonesian, Japanese, and Tagalog, using different data generation methods (generate from exemplars, translate from English to target language, respond in target language).
In the current version of this dataset, the texts were generated by Gemma 3 27B Instruct.
For the **natural dataset** comparison, I'm going to sample from [WildChat](https://huggingface.co/datasets/allenai/WildChat). 
This dataset contains human-LM interactions "in-the-wild" across several languages.

<iframe
  src="https://huggingface.co/datasets/ljvmiranda921/PolyglotTeachers-SFT-Synth/embed/viewer/default/train"
  frameborder="0"
  width="100%"
  height="560px"
></iframe>

<br />
<p style="border:3px; border-style:solid; border-color:#a00000; padding: 1em;">
In the next section, the format will look like this: I'll present a research question, apply a TDA tool, and then interpret the results.
Also, note that this blog post contains my initial explorations on TDA&mdash;I'm in no way an expert.
I tried my best to verify what I write here but there's a possibility that some of my interpretations (or methodologies) are wrong.
Please correct me in the comments below if that is the case.
You can find the source code for my experiments in [ljvmiranda921/scratch (2026-04-15-topological-data-analysis)]().
</p>

## Analyses

### RQ1: Is there a difference in shape between synthetic and natural data? 

One of the key findings in Polyglot Teachers is that **there are intrinsic qualities in a synthetic dataset that dictate whether a strong model can be trained from it.**
Some key characteristics include the diversity in prompts and the length of the response.
In this section, I want to examine how TDA reveals these differences in qualities in terms of the "shape" of synthetic and natural data.

**Background**

**Setup**

**Finding**


### RQ2: Which synthesis strategy produces data topologically closest to natural data?


<!-- what's the motivation? -->

**Background**

**Setup**

**Finding**


### RQ3: What local regions of natural data are missed by synthetic data?

<!-- what's the motivation? -->

**Background**

**Setup**

**Finding**