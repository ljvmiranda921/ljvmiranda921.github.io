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

- **Performance**: First, I want to see how well I'll perform when subjected to the same evaluation (task instruction) most LLMs undergo. 
- **Efficacy**: Second, I want to assess individual examples and determine if they effectively test the skills for which they were designed to evaluate.
- **Disagreement**: Finally, I want to identify cases where the model's response disagrees with mine, and verify if this disparity is just an annotation error, a random fluke, or an erroneous attribute of the data sample.

## Choosing multi-choice QA datasets to test

Most LM evaluation tasks are written in a question-answering (QA) format.
The idea here is simple: we ask the model a question, and then we evaluate its answer (i.e., the generated text).
However, I will focus on multi-choice QA tasks.
The setup is still the same, but instead of answering in free-form, the model must choose its answer from a list of predefined options.

The table below shows the question-answering (QA) datasets I annotated.
The choice of these datasets is arbitrary, but I made sure that these are the datasets most LLMs are evaluated on.
<!-- insert table-->

One limitation of this experiment is that I only annotated 100-200 samples for each task.
So it's hard to say if performance on a small subset will scale on the whole dataset.

## Constructing the prompt

### Prompt for the model

I followed the same QA format seen in EleutherAI's [llm-evaluation-harness tool](https://github.com/EleutherAI/lm-evaluation-harness).
This tool makes LM evaluation easy by providing prompt templates for each task and unifying the evaluation process in just a single command.
It's also been used in HuggingFace's [Open LLM leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard), so we're sure that it's official and vetted by researchers.

For example, below is a comparison between the "raw" HellaSwag dataset and its prompt-formatted version:

Notice how the options aren't included in the prompt.
It is because we evaluate LMs using the **ranked classification** method.
<!--explain-->


### Prompt for the human

I also used the same formatted version during annotation to ensure parity between myself and the language model.
Here, I employed [Prodigy](https://prodigy.ai) and created multiple-choice annotation tasks.


## Results

<!--ranked classification -->

## Observations 

<!-- ### HellaSwag

### PIQA

### Winogrande


### LogiQA

### TruthfulQA -->

## Final thoughts
