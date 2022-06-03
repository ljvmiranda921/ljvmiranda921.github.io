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
play games](/projects/2018/09/14/pfn-internship/). It's pure *busywork*,
something that "AI" has promised to automate but failed to achieve.[^1] That's
why I'm interested in document processing, the task of
**converting analog data into digital format**, as it evokes a subtle
challenge&mdash;a problem statement so simple yet tough to solve.

> Document processing, the task of converting analog data into a digital
> format&mdash;a problem statement so simple yet tough to solve.

After working with different organizations, I realized that document processing
is ubiquitous&mdash;from corporations to NGOs, small organizations to large
conglomerates&mdash; there's always a PDF that needs to be digitized!  **Solving
this problem even has significant ramifications**: [archival climate
data](https://public.wmo.int/en/our-mandate/what-we-do/observations/data-rescue-and-archives)
that can help scientists understand the growing global crisis is locked in paper
documents. So document processing is not just hard; it may also be urgent. 

<!-- add image of document processing stuff -->

This blog post describes **a framework for designing document processing
solutions**. It has three principles:

- **Annotation is king**: there is no silver bullet. Even in the presence of a
good model, you still need to finetune it with your data. Ideally, you'd want an
annotation tool with this feature built-in or flexible enough to incorporate
this mechanism.

- **Make multimodal models**: whenever we understand a document, we don't just
rely on the text itself. Instead, we take all information (position, text size,
etc.) as context. Being able to use all these features is vital.

- **Always be correcting**: OCR and document layout models aren't always
perfect, so it's essential to keep the human-in-the-loop to correct your
system's outputs. You can use correction to retrain your model or as the
penultimate step before saving the results in a database.

We'll see this framework in action as we go through my
sample implementation using [Prodigy](prodi.gy) and [Hugging
Face](huggingface.co) in the next section.

## Framework in action

If I were to put these three principles in a diagram, it would look like this:


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
    the human condition, such as writing and art. This [Tweet thread by Freya
    Holmér](https://twitter.com/FreyaHolmer/status/1532261886078631940?s=20&t=d0vBdUKklmHq-8G2mWYecw)
    also gives an interesting view of how AI generated art can affect the craft.