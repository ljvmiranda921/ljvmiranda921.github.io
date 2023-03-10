---
layout: post
type: post
title: "Labeling with GPT-3 using annotation guidelines"
date: 2023-04-02
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [langchain, nlp, llm, data annotation, prodigy, natural language processing, chatgpt, gpt-j, gpt-3]
header-img: /assets/png/argument-mining/header.png
description: |
    As an extension of my previous post on using LLMs to annotate argument
    mining datasets, I want to explore how we can incorporate annotation
    guidelines into a prompt so that LLMs can use them as additional context for
    annotation.
excerpt: |
    As an extension of my previous post on using LLMs to annotate argument
    mining datasets, I want to explore how we can incorporate annotation
    guidelines into a prompt so that LLMs can use them as additional context for
    annotation.
---

<span class="firstcharacter">P</span>reviously, I investigated how we can
incorporate large language models (LLMs) into our annotation workflows. It was a
fun [blog post](/notebook/2023/03/28/llm-annotation/), and I encourage you to
read it. This time, I want to extend this idea by **including [annotation
guidelines](https://sharedtasksinthedh.github.io/2017/10/01/howto-annotation/)
in the prompt.** Because these guidelines were written to define the parameters
of a task, I hope that they can be viable affordances to augment the labeling
process. 

> Because annotation guidelines were written to define the parameters of a task,
> I hope that they can be viable affordances to augment the labeling process.

In this blog post, I want to focus on <u>argumentative sentence detection</u>:
we want to know if a given text is an argument. I'll be using the "minimum wage"
dataset from the [UKP Sentential Argument Mining
Corpus](https://tudatalib.ulb.tu-darmstadt.de/handle/tudatalib/2345) ([Stab, et
al., 2018](#stab2018ukp)). In addition, I'll use three other annotation
guidelines from different NLP papers. **Each guideline defines an argument
differently.** The choices were based on the work of [Jakobsen et al.
(2022)](#jakobsen2022sensitivity). To save API costs, I'll only be using the
samples from the test set.


Because each guideline asks for different labels, I normalized them into `1:
Argument` and `0: No argument` similar to [Jakobsen et al.'s
(2022)](#jakobsen2022sensitivity) work. The table below summarizes these
guidelines (the numbers beside each label is its normalized version):



| Authors                                          | Labels                                               | How they defined an argument                                                                                                                  |
|--------------------------------------------------|-----------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| [Morante et al., 2020](#morante2020vaccination)  | Claim `(1)`, No Claim `(0)`                                     | Arguments are claim-like sentences. This might refer to actual claims or premises that resemble a claim.                                      |
| [Levy et al., 2018](#levy2018towards)            | Accept (Pro/Con) `(1)`, Reject `(0)`                            | Here they defined a claim as the conclusion, that is, the assertion the argument aims to prove. They didn't mention anything about premises.  |
| [Stab et al., 2018](#stab2018ukp)                | Attacking `(1)`, opposing `(1)`, non argument `(0)` | They have an explicit requirement where each claim should be backed-up by another claim or premise. Claims alone don't equate to an argument. |
| [Shnarch et al., 2018](#shnarch2018unsupervised) | Accept `(1)`, Reject `(0)`                                      | They defined an argument as containing a claim (conclusion) and premise (evidence). Claims alone don't equate to an argument.                 |

By incorporating both the annotation guideline and large language model, I
envision the following workflows:
- **Get few-shot predictions by feeding annotation guidelines into the prompt.**
This is similar to my [previous blog post](/notebook/2023/03/28/llm-annotation/)
with the addition of more context from the annotation guideline. The engineering
challenge here is on feeding a long string of text into a [prompt constrained to
a set amount of tokens](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them).
- **Highlight passages from the annotation guideline that are relevant to the
labeling task.** Here, we want to use both OpenAI embeddings and some clever
prompts to highlight, in verbatim, relevant parts of the annotation guideline
that support the LLM's prediction.

I plan to accomplish this task using [Prodigy](https://prodi.gy), an annotation
tool, and [LangChain](https://github.com/hwchase17/langchain), a library for
working with large language models. You can find the source code from this
Github repository.


## Fitting annotation guidelines into the prompt

Fitting a long document into OpenAI's prompt is one of the primary engineering
challenges in this project. The GPT-3.5 `text-davinci-003` model allows a
maximum request length of 4097 tokens, which are shared between the prompt and
its completion. So, an eight-page annotation guideline found in [Morante et al.
(2020)](#morante2020vaccination) won't fit.

[LangChain](https://github.com/hwchase17/langchain) offers a simple solution:
split the document into chunks and think of prompts as functions.  By doing so,
we can leverage a wide range of data engineering concepts such as map-reduce,
reranking, and sequential processing. The [LangChain
API](https://langchain.readthedocs.io/en/latest/modules/indexes/combine_docs.html)
dub these as `MapReduce`, `MapRerank`, and `Refine` respectively.

> LangChain offers a simple solution: split the document into chunks and think of prompts as functions.
> We can then leverage a wide range of data engineering concepts.

During my experiments, I found that using the sequential prompting technique,
`Refine`, works best for annotation guidelines. The output is more consistent
and the model does not fail at performing the task. The figure below provides an
overview of this process:


![](/assets/png/langchain/refine.png){:width="700px"}  
{:style="text-align: center;"}

1. **Split the document into smaller chunks**
2. **Write a "seed" prompt**
3. **Write a "refine" prompt**



<!-- talk about how you split them -->

<!-- talk about testing all three, but refine gives the most consistent results -->
<!-- talk about refine -->

<!-- show a sample of the prompts -->


<!--

## Highlighting relevant passages via embeddings


## Evaluation



### Few-shot annotation accuracy


### Cross-topic evaluation


-->


## References

- <a id="shnarch2018unsupervised">Eyal Shnarch, Leshem Choshen, Guy Moshkowich,
Ranit Aharonov, and Noam Slonim.</a> 2020. Unsupervised Expressive Rules Provide
Explainability and Assist Human Experts Grasping New Domains. In *Findings of the
Association for Computational Linguistics: EMNLP 2020*, pages 2678–2697, Online.
Association for Computational Linguistics.
- <a id="levy2018towards">Ran Levy, Ben Bogin, Shai Gretz, Ranit Aharonov, and
Noam Slonim.</a> 2018. Towards an argumentative content search engine using weak
supervision. In *Proceedings of the 27th International Conference on
Computational Linguistics*, pages 2066–2081, Santa Fe, New Mexico, USA.
Association for Computational Linguistics.
- <a id="morante2020vaccination">Roser Morante, Chantal van Son, Isa Maks, and
Piek Vossen.</a> 2020. Annotating Perspectives on Vaccination. In *Proceedings of
the Twelfth Language Resources and Evaluation Conference*, pages 4964–4973,
Marseille, France. European Language
Resources Association.
- <a id="stab2018ukp">Stab, C., Miller, T., Schiller, B., Rai, P., and Gurevych,
I.</a> (2018). Cross-topic argument mining from heterogeneous sources. In
*Proceedings of the 2018 Conference on Empirical Methods in Natural Language
Processing*, pages 3664–3674, Brussels, Belgium, October-November. Association
for Computational Linguistics.
- <a id="jakobsen2022sensitivity">Thorn Jakobsen, T.S., Barrett, M., Søgaard,
A., & Lassen, D.S.</a> (2022). The Sensitivity of Annotator Bias to Task
Definitions in Argument Mining. In *Proceedings of the 16th Linguistic
Annotation Workshop (LAW-XVI) within LREC2022*, pp. 44-61, Marseille, France.
European Language Resources Association.