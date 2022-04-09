---
layout: post
type: post
title: "Dependency parsing for a low-resource language (Tagalog)"
date: 2022-04-30
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [natural language processing, dependency parsing, nlp, low-resource, machine learning]
description: |
    Let me tell you about the amazing world of dependency parsing, especially
    for a low-resource language like Tagalog. Unlike English, Tagalog has a
    limited amount of labeled data, and presents a unique challenge to NLP. 
    How do we solve this? Read on to find out more.
excerpt: |
    Let me tell you about the amazing world of dependency parsing, especially
    for a low-resource language like Tagalog. Unlike English, Tagalog has a
    limited amount of labeled data, and presents a unique challenge to NLP. 
    How do we solve this? Read on to find out more.
---

<span class="firstcharacter">D</span>**ependency parsing** is one of the most
crucial tasks in natural language processing. It allows us to formally
understand the structure and meaning of a sentence based on the relationship of
its words. In this blogpost, I'll talk about how we can train and evaluate a
parser for a low-resource language like Tagalog, my native language. 

Parsing a sentence requires us to identify its **head** and **dependents**. The
head is usually the most important word, while the dependents exist just to
modify it. Take this sentence, *"That girl is my sister,"* for example:

<!-- example sentence: displaCy -->
![](/assets/png/dep-parsing/dep_example.svg){:width="800px"}
{:style="text-align: center;"}

- Each arrow represents the dependencies between words and how they're related,
i.e., X is $RELATION of Y (e.g., `det` for determiner, `poss` for possessive,
`nsubj` for nominal topic).
- The most important word in this sentence is `girl`. All other words are
    optional; they only exist to modify this essential word. I can leave the
    other bits out and just say "That girl," and it will still refer to the
    same subject.

You can do a lot of things with this information. For example, you can use the
dependency tree to hint a named-entity recognition (NER) model where the noun
phrases are. In sentiment analysis, you can use the head and its modifiers to
get a good idea of a text's overall polarity. In search, you can use the parsed
tree to improve the ranking of results. You can always see a dependency parser
as part of an NLP pipeline or as a main component of an NLP application.

## On treebanks and low-resource languages

As cool as they may be, training a dependency parser requires a lot of
annotated data. They're usually in the form of treebanks, and one of their
largest inventories is the [Universal Dependencies
(UD)](https://universaldependencies.org/) project. However, **not all languages
have the same amount of labeled information.** Low-resource languages (LRL)
often get the shorter end of the stick in terms of data availability and
volume.

For Tagalog, you only have two choices for treebanks:
[TRG](https://universaldependencies.org/treebanks/tl_trg/index.html)[^1] and
[Ugnayan](https://universaldependencies.org/treebanks/tl_ugnayan/index.html).
The former contains 128 sentences and 734 tokens, while the latter has 94
sentences and 1011 tokens. It's not much especially when you compare them to
some English treebanks like
[Atis](https://github.com/UniversalDependencies/UD_English-Atis/blob/master/README.md)
or [ESL](https://universaldependencies.org/treebanks/en_esl/index.html), with
almost 50x the amount of tokens than us.[^2]

<!-- table for ugnayan and trg: tokens, label types?, source -->
<!-- chart for the number of tokens per language? some data viz stuff? -->


This then begs the question: *how can we reliably train and evaluate a model
from a low-resource language?*
- For **training**, it seems that it's possible to train a parser and get decent
accuracy with just about 100 sentences, so we'll stick with the treebanks that
we have. We will use spaCy's default training configuration which you can find
in [this
repository](https://github.com/ljvmiranda921/ud-tagalog-spacy/blob/master/configs/default.cfg).
- For **evaluation**, we'll perform both monolingual and cross-lingual checks for
our data. The first entails a simple 10-fold cross-validation
for our model (as recommended by the UD guide), while the latter involves a
pseudo-transfer learning approach where we train a parser from a larger
language model with the Tagalog treebank as our test set.

My overall goal is to demonstrate that it's possible to create a decent Tagalog
dependency parser with the amount of data that we had, and highlight the gaps
that keep us from achieving the same level of information density as other
languages.


### Training a dependency parser using spaCy


<!-- training is straightforward, and as it turns out, you can do a lot with
small data -->
<!-- show a few dependency parser results? where does it perform well?
does it do well on tweets? How about tagalog speeches? -->


### Performing mono-lingual and cross-lingual evaluation

<!-- evaluation, we do a (1) mono lingual and (2) cross lingual approach-->
<!-- a few examples: where it works well and where it doesn't work well -->


## What can be done next?















[^1]:

    This treebank got its name from *Tagalog Reference Grammar* (TRG) by
    Schachter and Otanes. Most of the texts in the TRG treebank were lifted
    from this source.

[^2]:


    And we're just talking about Universal Dependencies treebanks for English.
    In the Linguistic Data Consortium inventory, you have the [Penn
    treebank](https://catalog.ldc.upenn.edu/LDC99T42) and  OntoNotes with
    almost more than a million words each!
