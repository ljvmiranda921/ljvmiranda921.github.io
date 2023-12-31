---
layout: post
type: post
title: "Am I smarter than a text generator?"
date: 2024-02-18
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [llm, humaneval, evaluation, annotation, prodigy, nlp, gpt, qa, hellaswag, winogrande, ranked classification]
header-img: /assets/png/am-i-smarter-than-a-text-generator/header.png
description: |
    In this blog post, join me as I subject myself to the same eval schemes large language models undergo.
    Will I rise triumphant against our future overlords? Or will I bow down to their supreme intelligence?
    This and more, in am I smarter than a text generator!
excerpt: |
    In this blog post, join me as I subject myself to the same eval schemes large language models undergo.
    Will I rise triumphant against our future overlords? Or will I bow down to their supreme intelligence?
    This and more, in am I smarter than a text generator!
---

<span class="firstcharacter">N</span>owadays, it's common to see researchers evaluate large language models on "very human" tasks such as reasoning, logic, and math.
They perform these evaluations using benchmark datasets such as HellaSwag, LogiQA, and Winogrande.
Unlike linguistic tasks such as NER and POS tagging, these *human-centric* tasks assess skills that we consciously use everyday. So as a human, I find myself asking: how well will I fare on these benchmarks?

The main purpose of this blog post is **to perform a proper human evaluation using myself as a test subject** 
so that I can assess how effective our benchmarks are in evaluating LLMs.
However, we can't just compare two accuracies and call it a day.
So, I plan to uncover three things from this small experiment: 

- First, I want to see how well I'll perform when subjected to the same evaluation (task instruction) most LLMs undergo. 
- Second, I want to assess individual examples and determine if they effectively test the skills for which they were designed to evaluate.
- Finally, I want to identify cases where the model's response disagrees with mine, and verify if this disparity is just an annotation error, a random fluke, or an erroneous attribute of the data sample.

## Annotating multi-choice QA datasets

Most LM evaluation tasks are written in a question-answering (QA) format.
The idea here is simple: we ask the model a question, and then we evaluate its answer (i.e., the generated text).
However, I will focus on multi-choice QA tasks.
The setup is still the same, but instead of answering in free-form, the model must choose its answer from a list of predefined options.

I annotated the following question-answering (QA) datasets.
<!-- insert table-->


One limitation of this experiment is that I only annotated 100-200 samples for each task.
So it's hard to say if performance on a small subset will scale on the whole dataset.
Finally, I followed the same QA format in EleutherAI's llm-harness tool to ensure that the language model and I receive the same question prompts.
You can find these prompts in the GitHub repo.

## Getting the results

<!--ranked classification -->

## Observations 

<!-- ### HellaSwag

### PIQA

### Winogrande


### LogiQA

### TruthfulQA -->

## Final thoughts
