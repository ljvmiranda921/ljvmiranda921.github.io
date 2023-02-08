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
annotations for named entity recognition and text categorization. We
demonstrated how prompt-based interfaces found in the likes of
[ChatGPT](https://openai.com/blog/chatgpt/) can still be useful even for
structured prediction tasks. Usually, a prompt goes like this (as in the case of
text categorization):

```
From the text below, determine whether or not it contains a recipe. 
If it is a recipe, answer ACCEPT. If not, answer REJECT.

Your answer should only be in the following format:

answer: <string>
reason: <string>

Below are a some examples (only use these as a guide):

Text:
"""
Cream cheese is a delicious food.
"""

answer: REJECT
reason: The text doesn't talk about a recipe, it only 
describes cream cheese as a delicious food.

Here is the text that needs classification

Text:
"""
Just add 1 clove of garlic, 2 cups of rice, then heat them in a pan
with butter to make fried rice.
"""
```

Then GPT-3 will return something like:

```
answer: ACCEPT
reason: The text is a recipe that talks about cooking fried rice.
```

I want to highlight two properties in our prompt:
- **We provided exemplars to guide the LLM on how to respond.** In prompt
literature, we call this technique as few-shot prompting. Large language models
tend to learn well in this setting ([Brown, et al., 2020](#brown2020fewshot)). 
- **We asked GPT-3 to provide a "reason" why it assigned that label for the given text.** I don't want to delve into the nuance of *reasoning* in LLMs (I have [unfinished thoughts](/notebook/2022/12/01/wika-at-kahulugan/) about it). For now, treat this more as a UI layer for reducing a human annotator's cognitive load.

In this blog post, I want to investigate how we can reinforce these properties
together. Here, I turn to **chain-of-thought prompting** ([Wei, et al., 2023](#wei2023chain)) to
provide insights in accomplishing this task. My thesis is that **annotation is
also a reasoning task** just like arithmetic, common-sense, and symbolic
reasoning. We can improve annotation accuracy by applying the same
chain-of-thought techniques in our prompts.

> My thesis is that annotation is also a reasoning task... we can improve
> annotation accuracy by applying the same chain-of-thought techniques in our
> prompts.

## Annotation is also a reasoning task
<!--
Annotation is also a reasoning task

- initial thoughts on annotation: drone work
- annotation guidelines
- cite papers
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

## References

- <a id="brown2020fewshot">Brown, T.B., Mann, B., Ryder, N., Subbiah, M.,
Kaplan, J., Dhariwal, P., Neelakantan, A., Shyam, P., Sastry, G., Askell, A.,
Agarwal, S., Herbert-Voss, A., Krueger, G., Henighan, T.J., Child, R., Ramesh,
A., Ziegler, D.M., Wu, J., Winter, C., Hesse, C., Chen, M., Sigler, E., Litwin,
M., Gray, S., Chess, B., Clark, J., Berner, C., McCandlish, S., Radford, A.,
Sutskever, I., & Amodei, D.</a> (2020). Language Models are Few-Shot Learners.
*arXiv, abs/2005.14165.*
- <a id="wang2023chain">Wei, J., Wang, X., Schuurmans, D., Bosma, M., Chi, E.H.,
Le, Q., & Zhou, D.</a> (2022). Chain of Thought Prompting Elicits Reasoning in
Large Language Models. *ArXiv, abs/2201.11903.*