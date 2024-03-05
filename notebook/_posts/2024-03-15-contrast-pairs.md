---
layout: post
type: post
title: "A lexical view of contrast pairs in preference datasets"
date: 2024-03-15
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [rlhf, preference data, llm, shp, openai, berkeley-nest]
header-img: /assets/png/contrast-pairs/header.png
description: |
  Can we spot differences between preference pairs just by looking at their word embeddings? 
  In this blog post, I want to share my findings from examining lexical distances between chosen and rejected responses in preference datasets.
---

<span class="firstcharacter">P</span>reference data is a staple in the final step of the LLM training pipeline.
During RLHF, we train a reward model by showing pairs of chosen and rejected model outputs so that it can teach a policy model how to generate more preferable responses.
The hope is, our reward model can capture the nuance in human preferences.

However, preference is subjective by nature, and few studies tried to articulate it.
For example, some looked into different aspects of a response's helpfulness / harmlessness ([Bai et al., 2022](https://arxiv.org/abs/2204.05862)) while others investigated surface-level characteristics like its length ([Singhal et al., 2023](https://arxiv.org/pdf/2310.03716.pdf)).

In this blog post, I want to offer a different approach: **what if instead of looking at qualitative aspects or token-level features, we use sentence embeddings?**
Sentence embeddings capture the lexical and semantic meaning of a text in a high-dimensional vector space.
If that's the case, can we ascertain lexical differences between chosen and rejected responses _just_ by looking at text embeddings?

## Getting preference data

First, I sampled preference data across different sources.
For bigger datasets such as SHP, I only took a particular subset I am interested in.
The table below shows the sources I used:

| Dataset                                                                                                                                                      | Description                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OpenAI's Summarize from Human Feedback ([Stiennon et al., 2022](https://arxiv.org/abs/2009.01325))                                                           | Dataset used to train a summarization reward model. I used the `comparisons` subset where each instance represents a matchup between two summaries.                                                                                             |
| Stanford Human Preferences Dataset ([Ethayarajh et al., 2022](https://proceedings.mlr.press/v162/ethayarajh22a.html))                                        | Contains a collection of human preferences over responses to questions or instructions. I used the `explainlikeimfive_train` subset to represent OpenQA questions.                                                                              |
| [Argilla's Ultrafeedback Multi-Binarized Cleaned Dataset](https://huggingface.co/datasets/argilla/ultrafeedback-multi-binarized-quality-preferences-cleaned) | A clean version of the original Ultrafeedback dataset ([Cui et al., 2023](https://arxiv.org/abs/2310.01377)). The cleanup process can be found [in their writeup](https://huggingface.co/datasets/argilla/ultrafeedback-binarized-preferences). |
| Tatsumoto Lab's Alpaca Farm ([Dubois et al., 2023](https://arxiv.org/abs/2305.14387))                                                                        | The human preference subset of the Alpaca Farm dataset. The researchers used this subset to compare their LLM judge's preferences.                                                                                                              |
| [Berkeley Nest Lab's Nectar Dataset](https://huggingface.co/datasets/berkeley-nest/Nectar)                                                                   | Preference ranking dataset for training the Starling 7B reward model ([Zhu et al., 2023](https://starling.cs.berkeley.edu/)), and consequently, the Starling 7B language model.                                                                 |

<!-- talk about elo ranking for matchup-type datasets -->

For OpenAI's Summarize and SHP, the preferences are in the form of individual matchups.
To get the canonical chosen and rejected responses, I used the [Elo rating system](https://en.wikipedia.org/wiki/Elo_rating_system) to obtain the top and bottom completions.

## Computing sentence embeddings

Given a set of preference data, I split the completions based on whether they were chosen ($$\mathbf{y}_w$$) or rejected ($$\mathbf{y}_l$$) by an evaluator&mdash;human or GPT, depending on the dataset.
Then, I embedded them using [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) to produce 384-dimensional sentence embeddings.
Finally, for each row, I computed the cosine distance ($$\mathbf{d}$$) between the chosen and rejected vectors.
The figure below illustrates this process. 

![](/assets/png/contrast-pairs/process.png){:width="700px"}
{: style="text-align: center;"}


## Findings

### Lexical differences are apparent in some datasets

### Elo ranking correlates with cosine distance

### Some tasks have more pronounced lexical differences

## Final thoughts
