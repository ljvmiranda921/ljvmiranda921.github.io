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
[ChatGPT](https://openai.com/blog/chatgpt/) can still be helpful even for
structured prediction tasks. 

In this blog post, I want to explore how this approach translates to more
complex annotation tasks, such as **argument mining**, where chain of reasoning
applies.  I'll be working on a portion of the [UKP Sentential Argument Mining
Corpus](https://tudatalib.ulb.tu-darmstadt.de/handle/tudatalib/2345) ([Stab, et
al., 2018](#stab2018ukp)), where sentences are categorized either as a
supporting argument, an attacking argument, or a non-argument for a given topic.
I want to investigate <u>two major questions</u>:

- [**Can zero-shot annotations be reliable?**](#zeroshot) Here, I'd like to benchmark zero-shot
annotations from GPT-3 and compare them with a baseline approach. I don't think we should
rely on GPT-3 alone to annotate our data, but it doesn't hurt to see if they work.

- [**Can LLMs provide extra affordance?**](#affordance) I'd like to explore UI elements in
which LLMs can help human annotators reduce their cognitive load when labeling. I want to 
explore an LLM's ability to highlight spans or provide reason for their labels. Each of these
affordances represent a different level of "reliance" on an LLM's capabilities.

For this blog post, I will focus on the topic of <u>minimum wage</u> in the UKP
corpus. It's interesting, and the number of samples is small enough that I don't
have to worry about OpenAI API costs. 

<!-- dataset statistics -->

|                 | Tokens     | No argument     | Supporting | Opposing |
|-----------------|-----------:|----------------:|-----------:|---------:|
| Training set    | $$42589$$  | $$968$$         | $$414$$    | $$396$$  |
| Development set | $$4899$$   | $$108$$         | $$46$$     | $$44$$   |
| Test set        | $$13257$$  | $$270$$         | $$116$$    | $$111$$  |
| **Total**       | $$60745$$  | $$1346$$        | $$576$$    | $$551$$  |

**Table:**  Dataset statistics for the `minimum wage` subset of the UKP Sentential Argument Mining corpus (Stab, et al., 2018).
{:style="text-align: center;"}

## <a id="zeroshot"></a> Can zero-shot annotations be reliable?

First, I want to check how *accurate* GPT-3's zero-shot annotations are. Then, I will
compare it against a standard approach of training a supervised model from the
corpus. To qualify, the word "reliability" here is shallow. I'm not making
claims on a language model's trustworthiness, only its test set accuracy.

> I will compare GPT-3's zero-shot annotations against a standard approach
> of training a supervised model from the corpus.

<!-- talk about the supervised setup -->
In the <u>supervised set-up</u>, I'm using [spaCy's
TextCategorizer](https://spacy.io/api/textcategorizer) to perform an exclusive 
text classification task. It uses a [stacked
ensemble](https://spacy.io/api/architectures#TextCatEnsemble) of a [linear
bag-of-words model](https://spacy.io/api/architectures#TextCatBOW) and a neural
network model. The neural network uses the embeddings of a [RoBERTa
(large)](https://huggingface.co/roberta-large) transformer ([Liu,
et al., 2019](#liu2019roberta)).[^1] To recap how supervised learning works, we
train a model from the training and development data, then evaluate the
predictions on a held-out test set as shown in the figure below:

[^1]: You can check the configuration file I used for this project in [this Github repository]().

![](/assets/png/argument-mining/supervised.png){:width="650px"}  
{:style="text-align: center;"}

<!-- talk about the prompt for zero-shot -->
In the <u>zero-shot set-up</u>, I completely ignore the training and development
sets and include test set examples in the prompt. Then, I send this prompt to
GPT-3 and parse the results. Finally, I treat whatever it returns as its
predictions and compare them with the gold-annotated test data. 

![](/assets/png/argument-mining/zeroshot.png){:width="500px"}  
{:style="text-align: center;"}

I formatted the prompt like the one below:

```
Determine whether the text is a supporting argument (Argument_for), 
opposing argument (Argument_against), or none (NoArgument) regarding 
the topic of "minimum_wage." Answer in the following format:

answer: <Argument_for,Argument_against, or NoArgument>

Text:
"""
Increasing minimum wage will increase our standard of living.
"""
```

With GPT-3 usually answering in the form of:[^2]

```
answer: Argument_for
```

[^2]: 

    I don't really expect that GPT-3 will always abide with the
    response format I set&mdash; it's a statistical model, after all.
    However, I didn't encounter any parser errors during my experiments.

I obtained two sets of predictions from both the supervised and zero-shot
pipelines, which I evaluated using the gold-annotated test set. As a result, I
arrived at the tables below, highlighting the higher score in boldface:


| Scores         | Zero-shot          | Supervised          |
|----------------|-------------------:|--------------------:|
| Micro F1-score | $$\mathbf{81.45}$$ |  $$79.88$$          |
| Macro F1-score | $$\mathbf{78.74}$$ |  $$77.52$$          |


| F1-score (per type)                      | Zero-shot           | Supervised |
|------------------------------------------|--------------------:|-----------:|
| Supporting argument (`Argument_for`)     |  $$\mathbf{75.21}$$ | $$73.60$$  |
| No argument (`NoArgument`)               |  $$\mathbf{86.74}$$ | $$85.66$$  |
| Opposing argument (`Argument_against`)   |  $$\mathbf{74.26}$$ | $$73.30$$  |

Interestingly, the zero-shot pipeline performs better than the supervised
pipeline. For example, the Macro F1-score, which reports how well the two
classifiers fare in light of an imbalanced dataset, shows the zero-shot
classifier leading by a hair against the supervised model. These results answer
the question we posed in this section&mdash; **we can rely on GPT-3's zero-shot
annotations when labeling an argument mining dataset.**

Perhaps the wrong conclusion to make here is that we can *just* replace our
supervised model with a zero-shot classifier in production. It's an appealing
thought because we see higher scores from our LLM predictions. However, that's a
trap because *we already know* the test set. In production, we either don't have
access to gold-standard annotations, or we're still making it ourselves.  So
instead, think of our zero-shot predictions as silver-standard annotations that
we can refine further to produce trustworthy, gold-standard labels.

> Think of our zero-shot predictions as silver-standard annotations that we
> can refine further to produce trustworthy, gold-standard labels.


## <a id="affordance"></a> Can LLMs provide extra affordance?

In this section, I want to explore what other capabilities a large language
model can offer as we annotate our dataset. I want to think of these as
**affordances**, something that an annotator can use as they produce
gold-standard data. 

In the context of argument mining, we can use LLMs to (1) highlight an
argument's claim and premise and (2) provide a reason as to why it labeled a
particular text as such. I'd like to think of these affordances as different levels
of reliance over GPT-3's capabilities:


![](/assets/png/argument-mining/reliance.png){:width="720px"}  
{:style="text-align: center;"}

> I noticed that my "attentiveness" decreases as I use affordances that
> rely heavily on LLMs.

From my annotation experience, I noticed that my "attentiveness" decreases as I
use affordances that rely heavily on LLMs. It's easier for me to just *accept*
whatever the language model suggests. This can be dangerous because an LLM can,
in all its biases, influence my annotations. More so if it demonstrates some
level of intelligible text to defend its decision. Perhaps it's just my personal
negligence and *laziness*, but I'd like to highlight this experience to provide
some context to the following sections.

### Directed: highlight an argument's claim and premise

According to [Palau and Moens (2009)](#palau2009argument), an <u>argument</u> is
a set of **premises** that support a **claim**.[^3] For our dataset, I would
like to introduce an annotation set-up where the premise and the claim, if
present, are highlighted to guide annotation. 

> Annotation set-up where the premise and claim, if present, 
> are highlighted to guide annotation. 

This set-up aims to give an annotator extra information to label a particular
text. For example, they can use the highlighted spans to easily check the 
premise of an argument with respect to its claim. The hope is that through this
practice, we can reduce the cognitive load of annotation as the relevant parts
of the document are emphasized. 

For this to work, we need to (1) treat the premise and the claim as spans and
prompt GPT-3 to identify them for each text as a span labeling task. Then, we
(2) pass this information into our annotation tool and label as usual, except
that the relevant spans are now highlighted:

![](/assets/png/argument-mining/highlights.png){:width="600px"}  
{:style="text-align: center;"}

For GPT-3, the prompt goes like this:

```
From the text below, identify the exact span of text that represents 
the premise, and the claim regarding the topic of minimum wage. 
Answer in the following format:

Premise: <comma delimited list of string or N/A>
Claim: <string or N/A>

Here's the text

Text:
"""
In 2009, an increase in minimum wage resulted to a 
higher standard of living .
"""
```

And we expect the answer in the form of:

```
Premise: "In 2009", "higher standard of living"
Claim: "increase in minimum wage"
```

I implemented this process using the [OpenAI
recipes](https://github.com/explosion/prodigy-openai-recipes) from
[Prodigy](https://prodi.gy). In particular, I used the `ner.openai.fetch` recipe
to prompt GPT-3 to extract spans based on the labels I provided&mdash;i.e.,
`Premise` and `Claim`. This recipe attaches the premise and claim as spans into
a new corpus that I can load using Prodigy's built-in
[`textcat.manual`](https://prodi.gy/docs/recipes#textcat-manual) recipe. Because
of this set-up, the spans are highlighted in the UI as shown below:


![](/assets/png/argument-mining/prodigy_highlight_examples.png){:width="800px"}  
{:style="text-align: center;"}

This set-up allows annotators to take advantage of relevant spans as they decide
the label for a particular example. We can also combine our `textcat`
annotations earlier to pre-select the category choice so that annotators can
confirm an LLM's prediction. For example, they can compare the highlighted
premise to the predicted category and decide whether to correct or accept the
suggested annotation. 

Finally, I want to mention that this set-up still relies on a human annotator's
reasoning in order to label the text. The UI presents the relevant components,
i.e. an argument's premise and claim, but it's still up to the annotator whether
to use or ignore these affordances.  In the next section, we will double-down on
GPT-3's capabilities and ask it to "reason" why it labeled a particular text as
such.


[^3]: 

    Several NLP papers may still have varying degrees of explicitness towards this
    definition ([Jakobsen, et al., 2022](#jakobsen2022sensitivity)), but for the
    purposes of this blog post, we'll stick with the one above.




### Dependent: provide reason on a labeling decision 


## Final thoughts




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
- <a id="liu2019roberta">Liu, Y., Ott, M., Goyal, N., Du, J., Joshi, M., Chen,
D., Levy, O., Lewis, M., Zettlemoyer, L., & Stoyanov, V.</a> (2019). RoBERTa: A
Robustly Optimized BERT Pretraining Approach. ArXiv, abs/1907.11692.
https://doi.org/10.1162/coli_a_00364.
- <a id="stab2018ukp">Stab, C., Miller, T., Schiller, B., Rai, P., and Gurevych,
I.</a> (2018). Cross-topic argument mining from heterogeneous sources. In
*Proceedings of the 2018 Conference on Empirical Methods in Natural Language
Processing*, pages 3664–3674, Brussels, Belgium, October-November. Association
for Computational Linguistics.
- <a id="wang2023chain">Wei, J., Wang, X., Schuurmans, D., Bosma, M., Chi, E.H.,
Le, Q., & Zhou, D.</a> (2022). Chain of Thought Prompting Elicits Reasoning in
Large Language Models. *ArXiv, abs/2201.11903.*

### Footnotes