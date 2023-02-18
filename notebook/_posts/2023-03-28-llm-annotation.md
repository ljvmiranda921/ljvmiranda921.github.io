---
layout: post
type: post
title: "Prompting language models to annotate argument mining datasets"
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
    this by exploring the application of LLM prompting in 
    annotating argument mining datasets.
excerpt: |
    In this blog post, I want to demonstrate how we can leverage LLMs like GPT-3
    as a viable affordance to reduce a human annotator's cognitive load. I do
    this by exploring the application of LLM prompting in 
    annotating argument mining datasets.
---

<span class="firstcharacter">R</span>ecently, I've been working on a
[project](https://github.com/explosion/prodigy-openai-recipes/) that involves
prompting large language models (LLM) like GPT-3 to obtain zero- and few-shot
annotations for named entity recognition and text categorization. We
demonstrated how prompt-based interfaces found in the likes of
[ChatGPT](https://openai.com/blog/chatgpt/) can still be useful even for
structured prediction tasks. 

In this blog post, I want to explore how this approach translates to more
complex annotation tasks such as **argument mining**, where task definitions may
vary from paper to paper ([Jakobsen, et al., 2022](#jakobsen2022sensitivity)).
I'll be working on a portion of the [UKP Sentential Argument Mining
Corpus](https://tudatalib.ulb.tu-darmstadt.de/handle/tudatalib/2345) ([Stab, et
al., 2018](#stab2018ukp)), where sentences are categorized either as a
supporting argument, an attacking argument, or a non-argument with respect to a
given topic. I want to investigate three questions:

- **Can zero-shot annotations be reliable?** Here, I'd like to benchmark zero-shot
annotations from GPT-3 and compare it with some baseline approaches. I don't think we should
rely on GPT-3 alone to annotate our data, but it doesn't hurt to see if they work.

- **Can LLMs provide extra affordance?** I'd like to explore UI elements in
which LLMs can help human annotators reduce their cognitive load when labeling.

- **Can chain-of-thought prompting help?** Chain-of-thought prompting ([Wang, et
al., 2023](#wang2023chain)) is often seen in reasoning tasks like arithmetic. I
posit that annotation is also a reasoning task, and chain-of-thought might help.

For the purposes of this blog post, I will be focusing on the topic of
<u>minimum wage</u> in the UKP corpus. It's interesting, and the number of
samples is small enough that I don't have to worry about API costs. 

## Can zero-shot annotations be reliable?

|           | Zero-shot | Supervised |
|-----------|-----------|------------|
| Precision |           |            |
| Recall    |           |            |
| F-score   |           |            |

## Can LLMs provide extra affordance?

## Can chain-of-thought prompting help?


<!--

### Annotating argument mining datasets is a complex task... 

In literature, an argument consists of a <u>claim</u> and a <u>premise</u>
([Palau and Moens, 2009](#palau2009argument)). There are many different
variations of this task ([Lawrence and Reed, 2019](#lawrence2019argument)), but
in our case, we formulate argument mining as a text categorization problem, i.e., determine
whether a given text contains a *claim.* Unfortunately, NLP papers have varying
definitions of a claim ([Jakobsen, et al., 2022](jakobsen2022sensitivity)),
making the annotation process all the more complex.


-->

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

- <a id="palau2009argument">Palau, R.M., & Moens, M.</a> (2009). Argumentation
mining: the detection, classification and structure of arguments in text.
*International Conference on Artificial Intelligence and Law*.
- <a id="jakobsen2022sensitivity">Thorn Jakobsen, T.S., Barrett, M., Søgaard,
A., & Lassen, D.S.</a> (2022). The Sensitivity of Annotator Bias to Task
Definitions in Argument Mining. In *Proceedings of the 16th Linguistic Annotation Workshop (LAW-XVI) within LREC2022*, pp. 44-61, Marseille, France. European Language Resources Association.
- <a id="lawrence2019argument">Lawrence, J., Reed, C.</a>(2019) Argument Mining:
A Survey. *Computational Linguistics* 45 (4): 765–818. doi:
https://doi.org/10.1162/coli_a_00364.
- <a id="stab2018ukp">Stab, C., Miller, T., Schiller, B., Rai, P., and Gurevych,
I.</a> (2018). Cross-topic argument mining from heterogeneous sources. In
*Proceedings of the 2018 Conference on Empirical Methods in Natural Language
Processing*, pages 3664–3674, Brussels, Belgium, October-November. Association
for Computational Linguistics.
- <a id="wang2023chain">Wei, J., Wang, X., Schuurmans, D., Bosma, M., Chi, E.H.,
Le, Q., & Zhou, D.</a> (2022). Chain of Thought Prompting Elicits Reasoning in
Large Language Models. *ArXiv, abs/2201.11903.*