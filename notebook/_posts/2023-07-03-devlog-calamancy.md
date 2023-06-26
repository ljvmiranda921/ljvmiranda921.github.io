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

## Data annotation is not a waterfall process 

It's harder to imagine this when you're annotating alone. 
In fact, the final diagram in my [February blog post](https://ljvmiranda921.github.io/notebook/2023/02/04/tagalog-pipeline/#conclusion) shows this misconception. 
We don't just annotate a thousand examples until we're tired and call it a day. 
Instead, annotation is iterative:




## Extra: hyperparameter optimization
