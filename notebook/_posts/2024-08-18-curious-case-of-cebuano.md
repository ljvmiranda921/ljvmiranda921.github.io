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
  But it's not because of an active Wikipedia volunteer community, but rather due to bots!
  Unfortunately, Wikipedia is a common data source of most language models today.
  How does this affect the quality of generated Cebuano texts? Join me in finding out!
---

<span class="firstcharacter">D</span>id you know that Cebuano is the [second most dominant language in Wikipedia](https://simple.wikipedia.org/wiki/Cebuano_Wikipedia)?
It has around 6,117,000 articles, almost 13,000% more than Tagalog!
However, this statistic is not because of an active volunteer community in the Philippines.
The reason why Cebuano Wikipedia is inundated with articles is because of [lsjbot](https://en.wikipedia.org/wiki/Lsjbot), an automated bot that creates wikis on living organisms and geographical entities.

Unfortunately, most datasets we use for training large language models contain texts from Wikipedia.
How will this affect generation quality if a portion of our training data was written by bots? Does it even matter?

## A thing or two about Cebuano

Cebuano is a language spoken in the Visayan region of the Philippines.
It is part of the Visayan group of languages, including Hiligaynon, Karay-a, Boholano, and more.
The major difference between Cebuano and Tagalog is the lexicon: they have largely different vocabularies making them mutually unintelligible.
These differences often make for some funny interactions, such as _langgam_ which means "an ant" in Tagalog but "a bird" in Cebuano, or _libog_ which means "to be aroused" in Tagalog but "to be confused" in Cebuano.
Despite that, there are syntactical similarities betwen the two: both follow a verb-subject-object order and has an actor- or object-focus,

## The extent of bot-like texts in pretraining

I was curious how big the

## Supervised finetuning (SFT) on Cebuano instructions

### Comparing with other models

## How about you try it yourself?
