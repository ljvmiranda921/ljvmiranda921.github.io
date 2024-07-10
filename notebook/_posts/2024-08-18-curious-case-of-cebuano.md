---
layout: post
type: post
title: "The curious case of Cebuano datasets"
date: 2024-08-18
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [cebuano, nlp, datasets]
description: |
  Did you know that Cebuano is the second most dominant language in Wikipedia?
  But it's not because of an active volunteer community, but rather due to bots!
  As a common data source of most language models today, how does this affect the quality of generated Cebuano texts?
---

<span class="firstcharacter">D</span>id you know that Cebuano is the [second most dominant language in Wikipedia](https://simple.wikipedia.org/wiki/Cebuano_Wikipedia)?
It has around 6,117,000 articles, almost 13,000% more than Tagalog!
However, this statistic is not because of an active volunteer community in the Philippines.
The reason why Cebuano Wikipedia is inundated with articles is because of [lsjbot](https://en.wikipedia.org/wiki/Lsjbot), an automated bot that creates wikis of living organisms and geographical entities.

Because Cebuano is a low to middle-resource language, most of the texts that we can use to train Cebuano-based LMs aren't naturally written by humans&mdash; instead, they were translated from English by another model.
I'm curious if this affects generation quality, so join me as we unravel the curious case of Cebuano!

## A thing or two about Cebuano

Cebuano is a language spoken in the Visayan region of the Philippines.
It is part of the Visayan group of languages, including Hiligaynon, Karay-a, Boholano, and more.
It is also the [second most widely spoken native language](https://en.wikipedia.org/wiki/Languages_of_the_Philippines) in the Philippines with over 28.9M speakers.

The major difference between Cebuano and Tagalog is their lexicon: each language have different vocabularies, making them mutually unintelligible.
These differences often make for some funny interactions, such as _langgam_ which means "an ant" in Tagalog but "a bird" in Cebuano, or _libog_ which means "to be aroused" in Tagalog but "to be confused" in Cebuano.
Despite that, there are syntactical similarities betwen the two: both follow a verb-subject-object order and has an actor- or object-focus.

## The extent of bot-like texts in training

My goal is to train an instruction-finetuned (IFT) model using the Cebuano subset of [the Aya Collection](https://huggingface.co/datasets/CohereForAI/aya_collection_language_split/viewer/cebuano).
This subset is composed of texts from well-known question-answering (QA) datasets.
**However, a significant portion of this subset also contains translated texts.**
Even so, I'm still curious if these translations are of human- or bot-like quality.

In order to discriminate between human and bot-like text, I used a [translationese classifier](https://huggingface.co/SEACrowd/mdeberta-v3_sea_translationese) trained on 9 Southeast Asian languages (including Cebuano) from the [SEACrowd project](https://arxiv.org/pdf/2406.10118).
I ran it on a sample of the Aya Collection and arrived at the chart below:

![](/assets/png/curious-case-of-cebuano/dataset_distrib.png){:width="600px"}  
{: style="text-align: center;"}

<!-- add a table of what each dataset is about -->

So even if all of these datasets were translated, a good portion of them still has natural, human-like quality texts.
Unfortunately we don't have a full-natural Cebuano dataset to compare upon, but it's nice to see that the classifier still detected some instances as such.
For now, let's use what we have and try training a Cebuano LM!

## Instruction finetuning (IFT) on Cebuano

<!-- make a diagram -->

### Comparing with other models

## How about you try it yourself?
