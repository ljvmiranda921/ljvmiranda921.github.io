---
layout: post
type: post
title: "A framework for designing document processing solutions"
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
why I developed a keen interest in **document processing, the task of
converting analog data into digital format**, as it evokes a subtle
challege&mdash;a problem statement so simple yet tough to solve.

> Document processing, the task of converting analog data into a digital
> format&mdash;a problem statement so simple yet tough to solve.

As I have worked with different organizations throughout my career, I came to
realize that **document processing is ubiquitous**&mdash;from corporations to
NGOs, small organizations to large conglomerates&mdash; there's always a PDF
that needs to be digitized! Solving this problem even has significant
ramifications: for example, [archival climate
data](https://public.wmo.int/en/our-mandate/what-we-do/observations/data-rescue-and-archives)
that can help scientists understand the growing global crisis is locked in
paper documents. It turns out that document processing is not just hard but
also urgent. 

This blog post describes **a framework for designing document processing
solutions**. This framework has three principles:

- **Annotation is king**:

- **Make multimodal models**: whenever we understand a document, we don't just
rely on the text itself. Instead, we take all information (position, text size,
etc.) as context. In a receipt, we know that a text is the "Total Price"
because it's a number, and it's located in the bottom-right portion of the page
(and perhaps because there's a word "Total:" beside it). Being able to use all
channels of information is vital for document processing.

- **Always be correcting**:

In the next section, we'll see this framework in action as we go through my
sample implementation using [Prodigy](prodi.gy) and [Hugging
Face](huggingface.co).

## Framework in action


<!-- solution diagram using framework words -->
<!-- solution diagram using Prodigy recipes -->

### Annotation is king


### Make multimodal models


### Always be correcting



## Final thoughts

This blog post describes what I think are the most critical aspects of a
document processing solution: an annotation mechanism, a multimodal model, and
an evaluation/correction step. I also demonstrated them in action using Prodigy
and LayoutLM. 

Machine learning was promised to automate manual labor. But it seems that we
hit a wall and started automating creative endeavors instead. My take is that
we optimized research for silver-bullet solutions: feed one big model with
input, and you get the desired output. Manual labor, such as document
processing, isn't like that. Instead, they tend to be bespoke: you need to
label data, you need to consider all elements of your document, you need to
correct your model's output&mdash;and one big model won't cut it. 

I hope that this framework can help you in your automation challenges. Feel
free to drop a comment below to share your thoughts!

### Footnotes

[^1]:

    I resonate with [Tom MacWright's
    tweet](https://twitter.com/tmcw/status/1511804741747154944) on how much of
    the progress in ML right now focuses on automating the creative facets of
    the human condition, such as writing and art.