---
layout: post
type: post
title: "Chain of thought prompting for corpus annotation"
date: 2023-03-28
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, llm, data annotation, prodigy, natural language processing, chatgpt, gpt-j, gpt-3]
header-img: /assets/png/tagalog-gold-standard/header.png
description: |
    We can prompt large language models like GPT-3 to obtain zero- and few-shot
    annotations for NER and text categorization tasks. But what happens if we
    apply chain-of-thought to our prompts? What's the benefit of using this
    technique?
excerpt: |
    We can prompt large language models like GPT-3 to obtain zero- and few-shot
    annotations for NER and text categorization tasks. But what happens if we
    apply chain-of-thought to our prompts? What's the benefit of using this
    technique?
---

<span class="firstcharacter">R</span>ecently, I've been working on a
[project](https://github.com/explosion/prodigy-openai-recipes/) that involves
prompting large language models (LLM) like GPT-3 to obtain zero- and few-shot
annotations for named entity recognition and text categorization. There, we
demonstrated how prompt-based interfaces found in the likes of
[ChatGPT](https://openai.com/blog/chatgpt/) can still be useful for structured
prediction tasks. Usually, a prompt goes like this (as in the case of text
categorization):

```
fsfw
```

Then GPT-3 will return something like:

```
Answer:
Reason: 
```

There are two properties in our prompt that I want to highlight:
- **We provided exemplars to guide the LLM on how to respond.** In prompt literature, we call this technique as few-shot prompting (Brown, et al., 2020). 
- **We asked GPT-3 to provide a "reason" why it assigned that label for the given text.** I don't want to delve into the nuance of *reasoning* in LLMs (I have [unfinished thoughts](/notebook/2022/12/01/wika-at-kahulugan/) about it). For now, treat this more as a UI layer for reducing a human annotator's cognitive load.

In this blog post, I want to investigate how we can reinforce these properties
together. Here, I turn to **chain-of-thought prompting** (Wei, et al., 2023) to
provide insights in accomplishing this task. My thesis is that **annotation is
also a reasoning task** just like arithmetic, common-sense, and symbolic
reasoning. We can improve annotation accuracy by applying the same
chain-of-thought techniques in our prompts.

> My thesis: annotation is also a reasoning task... we can improve annotation accuracy
> by applying the same chain-of-thought techniques in our prompts.

<!--
Annotation is also a reasoning task
-->



<!--
Chain-of-thought prompting, background info
-->


<!--
Chain-of-thought prompting applied to annotation
-->


<!--
Experiments?
-->


<!-- from few-shot to chain of thought -->

<!--
Few-shot vs. chain of thought (table)
- types of examples


HCI
- annotation disagreement? look for RRL here
- ...

-->