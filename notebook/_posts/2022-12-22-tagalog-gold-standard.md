---
layout: post
type: post
title: "Towards building a gold-standard corpus for Tagalog"
date: 2022-12-22
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, tagalog, low-resource languages, prodigy, natural language processing, machine learning]
description: |
    The lack of Tagalog gold-standard NER data inhibits us from training decent
    structured prediction pipelines for our language. In this blog post, I'll talk
    about the state of Tagalog-based corpora, my progress on building a
    gold-standard dataset (and its limitations), and my hopes for the future of Tagalog NLP.
excerpt: |
    The lack of Tagalog gold-standard NER data inhibits us from training decent
    structured prediction pipelines for our language. In this blog post, I'll talk
    about the state of Tagalog-based corpora, my progress on building a
    gold-standard dataset (and its limitations), and my hopes for the future of Tagalog NLP.
---


<span class="firstcharacter">T</span>agalog is my native language. It's spoken
by 76 million Filipinos and has been our official language since the 30s. 
Stories and songs have been written in Tagalog. It's a **text-rich** language,
but unfortunately, a **low-resource** one. In this blog post, I'll talk about
the state of Tagalog-based corpora, my experience in creating a gold-standard
dataset (including its limitations), and my hopes for the future of Tagalog NLP.

## Tagalog corpora is low-resource and full of silver-standard annotations

We label a language as **low-resource** when there are no annotated corpora
available. Even if Tagalog is text-rich (i.e., a million speakers, thousands of
written content, etc.), the amount of annotated texts are scarce. This problem
isn't unique to Tagalog. Out of the approximately 7000 languages in the world,
only 10 have adequate NLP resources. 

<!-- show long-tail graph -->

There are many clever ways to build NLP systems on low-resource data that allow
researchers to circumvent the data scarcity problem. These methods usually
produce what we call **silver-standard data**. Their annotations are automatically
generated, usually done by statistical models trained from a different but
closely-related language or a knowledge base like Wikipedia. Silver-standard
data may not be accurate or trustworthy, but they are faster and cheaper to
create.


<!-- RRL -->


As you'll see later, I went with the traditional route: *I labeled and produced
gold-standard data myself.* However, labeling thousands of samples is not the
hardest part. As the sole annotator, it's easy for me to influence a dataset of
my biases and errors in judgment. You'd want to normalize a dataset from bias
and correct obvious annotation errors.  In practice, you'd usually want more
than three annotators (preferably linguists) and normalize their annotations
based on some inter-annotator agreement. Gold-standard data is not a cure-all. 


<!--
Given that, I do **not** advise using my annotated dataset for production. It
is biased towards my annotations, and may have label errors sprinkled in
between. Even if I labeled the dataset to the best of my ability, it's not good
scientific practice to use it at its current state. However, I encourage you to
-->


## FAQs

- **Is this supposed to be a new Tagalog benchmark?**


- **Can I use this dataset to train models in production?**









## References

-  

