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

<span class="firstcharacter">R</span>emember your high school's grammar lesson
on subject-verb agreement? Wait 'til you see him now! **Dependency parsing** is
one of the most crucial tasks in natural language processing. It allows us to
formally understand the structure and meaning of a sentence based on the
relationship of its words. 

In this blogpost, I'll talk about how we can train and evaluate a parser for a
low-resource language like Tagalog, my native language. 

Parsing a sentence requires us to identify its **head** and **dependents**. The
head is usually the most important word, while the dependents exist just to
modify it. Take this for example:

<!-- example sentence: displaCy -->
<!-- expound further -->


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









<!-- what is dependency parsing and why is it important? -->

<!-- the challenge with low-resource languages. segue: you need data to do it-->

<!-- a quick RRL -->

<!-- how to train one in spaCy -->

<!-- how to evaluate one in spaCy -->

<!-- demo stuff? -->

<!-- what can we do to improve the situation? -->




