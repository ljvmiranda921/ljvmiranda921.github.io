---
layout: post
type: post
title: "Chain of thought prompting for argument mining annotation"
date: 2023-03-28
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, llm, data annotation, prodigy, natural language processing, chatgpt, gpt-j, gpt-3]
header-img: /assets/png/tagalog-gold-standard/header.png
description: |
    In this blog post, I want to demonstrate how we can leverage LLMs like GPT-3
    as a viable affordance to reduce a human annotator's cognitive load. I do
    this by exploring the application of chain-of-thought prompting in 
    annotating argument mining datasets.
excerpt: |
    In this blog post, I want to demonstrate how we can leverage LLMs like GPT-3
    as a viable affordance to reduce a human annotator's cognitive load. I do
    this by exploring the application of chain-of-thought prompting in 
    annotating argument mining datasets.
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
literature, we call this technique as few-shot prompting. Turns out, large
language models tend to learn well in this setting ([Brown, et al.,
2020](#brown2020fewshot)). 
- **We asked GPT-3 to provide a "reason" why it assigned that label for the
given text.** I don't want to go down the rabbit hole of whether LLMs can reason. Instead, think
of this as a UI layer that a human annotator can choose to ignore.

In this blog post, I want to leverage these properties for more complex
annotation tasks. My goal is to demonstrate how we can leverage large language
models like GPT-3 as a viable affordance to reduce a human annotator's cognitive load.
Specifically, I want to explore the application of <u>chain-of-thought
prompting</u> ([Wei, et al., 2023](#wei2023chain)) in the context of annotating
<u>argument mining</u> datasets.

### Annotating argument mining datasets is a complex task... 

In literature, an argument consists of a <u>claim</u> and a <u>premise</u>
([Palau and Moens, 2009](#palau2009argument)). There are many different
variations of this task ([Lawrence and Reed, 2019](#lawrence2019argument)), but
in our case, we formulate argument mining as a text categorization problem, i.e., determine
whether a given text contains a *claim.* Unfortunately, NLP papers have varying
definitions of a claim ([Jakobsen, et al., 2022](jakobsen2022sensitivity)),
making the annotation process all the more complex.

<!-- 
give examples from different papers 
...this makes annotating it so complex...
(maybe talk about inter-annotator agreement in some argument mining datasets)

the big idea is to help annotators reduce cognitive load by
adding a UI-suggestions layer to their annotations


RISKS: it's also possible that the LLM can influence the results.
-->


<!-- 

there are different definitions of a claim
that's why they have different annotation guidelines
can we leverage these guidelines to obtain few-shot annotations from an LLM?


why is it complex?
- varying definitions
- implicit and explicit claims?
- can introduce bias? not sure how to talk about this one

-->



### ...but we can use chain-of-thought prompting to reduce a human annotator's cognitive load 

<!-- give quick background of the paper -->

<!-- this is where you get creative -->





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

- <a id="brown2020fewshot">Brown, T.B., Mann, B., et al.</a> (2020). Language
Models are Few-Shot Learners.
*arXiv, abs/2005.14165.*
- <a id="palau2009argument">Palau, R.M., & Moens, M.</a> (2009). Argumentation
mining: the detection, classification and structure of arguments in text.
*International Conference on Artificial Intelligence and Law*.
- <a id="jakobsen2022sensitivity">Thorn Jakobsen, T.S., Barrett, M., Søgaard,
A., & Lassen, D.S.</a> (2022). The Sensitivity of Annotator Bias to Task
Definitions in Argument Mining. *Law*.
- <a id="lawrence2019argument">Lawrence, J., Reed, C.</a>(2019) Argument Mining:
A Survey. *Computational Linguistics* 45 (4): 765–818. doi:
https://doi.org/10.1162/coli_a_00364.
- <a id="wang2023chain">Wei, J., Wang, X., Schuurmans, D., Bosma, M., Chi, E.H.,
Le, Q., & Zhou, D.</a> (2022). Chain of Thought Prompting Elicits Reasoning in
Large Language Models. *ArXiv, abs/2201.11903.*