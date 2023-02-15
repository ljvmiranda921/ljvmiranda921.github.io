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
    Annotation is a reasoning task, and we can apply the same prompting
    techniques to improve their quality. In this blog post, I'll explore how we can use chain-of-thought
    prompting to get zero- or few-shot annotations in argument mining datasets.
excerpt: |
    Annotation is a reasoning task, and we can apply the same prompting
    techniques to improve their quality. In this blog post, I'll explore how we can use chain-of-thought
    prompting to get zero- or few-shot annotations in argument mining datasets.
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
- **We asked GPT-3 to provide a "reason" why it assigned that label for the
given text.** I don't want to delve into the nuance of *reasoning* in LLMs (I
have [unfinished thoughts](/notebook/2022/12/01/wika-at-kahulugan/) about it).
For now, treat this more as a UI layer for reducing a human annotator's
cognitive load.

In this blog post, I want to investigate how we can reinforce these properties
together. Here, I turn to <u>chain-of-thought prompting</u> ([Wei, et al.,
2023](#wei2023chain)) to provide insights into accomplishing this task. My
thesis is that **annotation is a reasoning task,** and we can improve the
quality of our annotations by applying chain-of-thought techniques in our
prompts. I will be using <u>argument mining</u> as an illustration for it
involves some level of explicit reasoning.  

> Annotation is a reasoning task, and we can use chain-of-thought
> prompting to improve the quality of our annotations 


## Annotation is a reasoning task...

I first thought data annotation is a boring task where you *just* assign labels
to examples. However, as I worked on different NLP projects, I learned that
there's more to it. Sure, labeling can be repetitive, but it's not mindless.
Consider this text:

```
The White House wants to end the public health emergency. 
```

What kind of entity is *The White House*? One can say that in the context of the
sentence, it is an organization. However, we can also argue that by virtue of
its lexical definition, it is a location. There's definitely some nuance to how
we assign labels to our texts. This is *just* NER, things get trickier when we
get to argument mining.

### On argument mining

Arguments consist of a <u>claim</u> and a <u>premise</u> ([Palau and Moens,
2009](#palau2009argument)). In an argument mining task, our goal is to determine
whether a given text contains a claim. We can also formulate this task as a span
labeling problem, but for the purposes of this blog post we'll limit the scope
to text categorization.

<!-- show example? -->

Unfortunately, NLP papers have varying definitions of a *claim* ([Jakobsen, et
al., 2022](jakobsen2022sensitivity)).
<!-- give examples from different papers -->


<!-- 

there are different definitions of a claim
that's why they have different annotation guidelines
can we leverage these guidelines to obtain few-shot annotations from an LLM?

-->



## ...and we can use chain-of-thought to ellicit reasoning in our few-shot suggestions

<!-- give quick background of the paper -->

### Applied to annotation


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
- <a id="wang2023chain">Wei, J., Wang, X., Schuurmans, D., Bosma, M., Chi, E.H.,
Le, Q., & Zhou, D.</a> (2022). Chain of Thought Prompting Elicits Reasoning in
Large Language Models. *ArXiv, abs/2201.11903.*