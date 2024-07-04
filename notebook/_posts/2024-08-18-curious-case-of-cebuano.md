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

Unfortunately, most datasets we use for training large language models contain texts from Wikipedia.
How will this affect generation quality if a portion of our training data was written by bots? Does it even matter?

## A thing or two about Cebuano

Cebuano is a language spoken in the Visayan region of the Philippines.
It is part of the Visayan group of languages, including Hiligaynon, Karay-a, Boholano, and more.
It is also the [second most widely spoken native language](https://en.wikipedia.org/wiki/Languages_of_the_Philippines) in the Philippines with over 28.9M speakers.

The major difference between Cebuano and Tagalog is the lexicon: they have largely different vocabularies making them mutually unintelligible.
These differences often make for some funny interactions, such as _langgam_ which means "an ant" in Tagalog but "a bird" in Cebuano, or _libog_ which means "to be aroused" in Tagalog but "to be confused" in Cebuano.
Despite that, there are syntactical similarities betwen the two: both follow a verb-subject-object order and has an actor- or object-focus.

## The extent of bot-like texts in training

First, I want to check how much of the Cebuano training data contains machine-generated text.
Luckily, the SEACrowd folks trained [a model that detects translationese](https://huggingface.co/SEACrowd/mdeberta-v3_sea_translationese) across 9 Southeast Asian languages.
I ran it on a sample of the [Aya Collection's Cebuano training split](https://huggingface.co/datasets/CohereForAI/aya_collection_language_split/viewer/cebuano) and arrived at the chart below:

![](/assets/png/curious-case-of-cebuano/dataset_distrib.png){:width="600px"}  
{: style="text-align: center;"}

There is definitely a considerable amount of machine-translated examples here.
Compared to the Filipino subset, Cebuano actually has way more training instances (4.12M vs. 1.46k) in Aya.
My hunch is that most of these are coming from Wikipedia, which we already know has a lot of bot-like or machine-generated text.
I spent some time tracing the data provenance of the Aya subsets and arrived at the following:

<!-- data provenance? -->

## Supervised finetuning (SFT) on Cebuano

### Comparing with other models

## How about you try it yourself?
