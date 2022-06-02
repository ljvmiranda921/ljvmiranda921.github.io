---
layout: post
type: post
title: "A framework for document processing using Prodigy and Hugging Face"
date: 2022-07-02
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [spacy, machine learning, prodigy, huggingface, rpa, document processing]
description: |
excerpt: |
---

<span class="firstcharacter">E</span>xtracting information from PDFs and
scanned documents may not be the sexiest problem of the century. You don't
[generate paintings](/notebook/2021/08/08/clip-vqgan/) nor [control robots to
play games](/projects/2018/09/14/pfn-internship/). It's pure **busywork**,
something that "AI" has promised to automate but failed to achieve.[^1] That's
why I developed a keen interest in **document processing**, *the task of
converting analog data into digital format*, as it evokes a subtle
challege&mdash;a problem statement so simple yet tough to do.

> Converting analog data into digital format&mdash;a problem statement so
> simple yet tough to do.

As I have worked with different organizations throughout my career, I learned
that **document processing is ubiquitous**&mdash;from corporations to NGOs,
small organizations to large conglomerates&mdash; there's always a PDF that
needs to be digitized! Solving this problem even has significant ramifications:
for example, [archival climate
data](https://public.wmo.int/en/our-mandate/what-we-do/observations/data-rescue-and-archives)
that can help scientists understand the growing global crisis is locked in
paper documents. It turns out that document processing is not just hard but
also urgent. 

This blog post describes **a framework for designing document processing
solutions**. It also has a sample implementation using Prodigy and Hugging
Face. This framework has three principles:
- **Make multimodal models**: whenever we understand a document, we don't just
rely on the text itself. Instead, we take all information (position, text size,
etc.) as context. In a receipt, we know that a text is the "Total Price"
because it's a number, and it's located in the bottom-right portion of the page
(and perhaps because there's a word "Total:" beside it). Being able to use all
channels of information is vital for document processing.

- **Annotation is king**

- **Always be correcting**



### Footnotes

[^1]:

    I resonate with [Tom MacWright's
    tweet](https://twitter.com/tmcw/status/1511804741747154944) on how much of
    the progress in ML right now focuses on automating the creative facets of
    the human condition, such as writing and art.