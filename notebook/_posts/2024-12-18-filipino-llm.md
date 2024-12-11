---
layout: post
type: post
title: "The missing pieces in Filipino NLP in the age of LLMs"
date: 2024-12-18
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
header-img: /assets/png/filipino-llm/header.png
tags:
  [
    tagalog,
    filipino,
    nlp,
    llm,
  ]
description: |
    The rise of LLMs is forcing us to rethink Filipino NLP. But there's still a ton of work to do&mdash;just not the stuff you might think. Here's my take on what's worth doing, what's a waste of time, and where Filipino NLP research should be heading.
excerpt: |
---

<span class="firstcharacter">W</span>hen I started working in Filipino NLP, I've focused a lot of my attention on building custom-made pipelines using prior linguistics knowledge.
Take [calamanCy](https://ljvmiranda921/calamanCy) for example: we spent countless hours annotating [named-entity recognition (NER)](https://aclanthology.org/2023.sealp-1.2/) and [dependency parsing data](https://huggingface.co/datasets/UD-Filipino/UD_Tagalog-NewsCrawl) to encode linguistic info and train specific components for NLP tasks.
Outside of pure linguistics research, these components are usually part of larger systems aimed at tasks like information extraction and question answering.
However, lately we've witnessed how LLMs can perform these downstream tasks end-to-end, without needing these components at all.

This year, we've also seen the release of capable multilingual LLMs such as Meta's [Llama 3.1+](https://ai.meta.com/blog/meta-llama-3-1/), Cohere for AI's [Aya Expanse](https://cohere.com/blog/aya-expanse-connecting-our-world), CMU's [Pangea](https://neulab.github.io/Pangea/), and even Southeast Asian models such as AI Singapore's [SEA-LION](https://sea-lion.ai/) and Sea AI's [Sailor](https://huggingface.co/collections/sail/sailor2-language-models-674d7c9e6b4dbbd9a869906b).
Sure, one can argue that they don't always work well on Filipino (and I've argued these before [[1](/notebook/2023/08/04/llm-tagalog/)] [[2](/notebook/2024/07/02/talk-dlsu/)]), but perhaps I'm getting [*scale-pilled*](https://arxiv.org/abs/2001.08361) now and it's only a matter of time before LLMs reach decent capabilities in Filipino.
This isn't a retraction of my previous arguments; we should still build artisanal Filipino NLP resources, but **we should also build resources that support the training and evaluation of multilingual LLMs in order to advocate the representation of Philippine languages.**

> We should also build resources that support the training and evaluation
> of multilingual LLMs to advocate the representation of Philippine languages.

Tagalog is still low-resource even in the age of LLMs.
Sometimes I feel a tinge of sadness when a research group releases a new multilingual LLM and Tagalog is not supported.
You can't blame them&mdash; there's not a lot of readily-available Tagalog data for LM training.
There are still missing pieces ripe for research.

This brings us to three actionable directions for Filipino NLP: (1) create resources that support LLM post-training, (2) build reliable benchmarks for Filipino, and (3) participate in grassroots research and annotation efforts.
**Also, if you are interested to collaborate in these types of efforts, feel free to [reach out](mailto:ljvmiranda@gmail.com)!**


### Create resources that enable LLM post-training

<p style="border:3px; border-style:solid; border-color:#a00000; padding: 1em;">
<b>Key Insight:</b> 
Better to focus on post-training since it requires relatively lower investment than pretraining.
Prioritize collecting instruction finetuning datasets since it's in this step where we usually observe significant performance gains. 
Better if they contain general chat, but domain-specific data should also work.
</p>

Post-training is the stage in the large language modelling pipeline where we adapt a pretrained model to a specific style of input for chat interactions, such as following natural language instructions and responding in accordance with human preferences among many others.
This stage usually involves two main steps: instruction finetuning (IFT) and preference finetuning (PreFT).
I want to focus on the former.
Most IFT data comes in question-answer pairs containing a *user instruction*, an optional *context*, and a given *response*.
<!-- PreFT data, on the other hand, consists of human preferences on model outputs, which can be collected either [manually](https://arxiv.org/abs/2204.05862) or using [another language model](https://arxiv.org/abs/2310.01377) (or a [combination of both](https://arxiv.org/abs/2410.19133)). -->
For the next year or so, I believe there's a **more urgent need for Filipino IFT datasets.**

![](/assets/png/filipino-llm/llm_training.png){:width="700px"}  
*A simple language modelling pipeline (as seen in models like InstructGPT, Tulu 2, etc.).  
Currently, we lack quality Filipino data for post-training.*
{: style="text-align: center;"}

I want to focus on collecting IFT data because it can be **tailored to specific domains** and is **more economical to run experiments with**.
This means that NLP researchers interested in Filipino can still continue focusing on their own domains of interest while still contributing to this larger goal of improving our Filipino data pool.
Take [SciRIFF](https://arxiv.org/abs/2406.07835) for example: it contains question answering pairs for scientific literature that serves the authors' own purpose, yet we were able to use it in [T&uuml;lu 3](https://arxiv.org/abs/2411.15124) to build *generalist language models* that are capable of chat, reasoning, coding, and other skills.
In addition, **IFT is computationally cheaper than pretraining**; laboratories with a decent grant and cloud capacity can [easily finetune a 7B-parameter model](https://github.com/hiyouga/LLaMA-Factory?tab=readme-ov-file#hardware-requirement).
Preference data is also important, but collecting it requires more annotation effort and stronger multilingual models that *actually work* in Filipino (more on that in the following sections).

> Philippine languages lack quality instruction finetuning data

**As of now, Philippine languages lack quality IFT data.**
The best we have so far is the Aya dataset, with around 1.46k samples for Tagalog and 4.12M for Cebuano.
At first glance, Cebuano looks promising with more than a million examples, but upon inspection, majority of these examples were translated from another language (possibly English) or was derived from the Cebuano Wikipedia which is [mostly synthetic and unnatural](https://en.wikipedia.org/wiki/Cebuano_Wikipedia).[^1]
There are several ways to collect IFT data. We can (1) annotate our own datasets, (2) translate existing English IFT datasets into Filipino, or (3) repurpose existing Filipino datasets into a question-answering format. 
It's important to note that these datasets don't need to focus on general chat. 
Researchers can continue working in their domains of interest while reframing their problems as question-answering tasks. 

Ideally, collecting Filipino IFT instances **in the order of hundreds of thousands (100K-400K) is crucial for this work.**
It would be even better if these instances were evenly distributed across our major languages (e.g., Tagalog, Cebuano, Ilocano, Hiligaynon).
Once we have this dataset, it will then be easier for us, the Filipino language community, to train our own generalist LLMs.
In addition, it also makes it easier for other organizations to incorporate our dataset into their own data mixing pipelines thereby increasing the representation of Filipino to these larger-scale LM projects.
Collecting 100k instances seems daunting, but I already have some ideas in mind.
If you're interested in collaborating on this, [then reach out](mailto:ljvmiranda@gmail.com)!

### Build reliable benchmarks for Filipino

Even before we start training language models, it is important to measure how current state-of-the-art LLMs perform on Filipino.
Most of the evidences I see are anecdotal: someone will post a single ChatGPT screenshot in Filipino and claim that the model already *understands* the language.
However, it is easy to see how this performance can degrade as you keep chatting (e.g., misunderstanding of idioms and expressions, unrecognized words, etc.).
We need a **systematic approach to evaluating these models.**

We have a few promising benchmarks at hand.
For example, [KALAHI](https://huggingface.co/datasets/aisingapore/kalahi) tests for an LLM's ability to discern the correct response on culturally-specific situations that Filipinos face in their day-to-day lives.
[NewsPH NLI](https://huggingface.co/datasets/jcblaise/newsph_nli) and [EMoTES-3k](https://huggingface.co/datasets/NLPinas/EMoTES-3K) are also relevant as they reflect some of the potential questions that one asks an LLM.
I believe that through the years, we have developed several datasets that tests different facets of the Filipino language, we need to **scour and curate** them in order to filter those that are relevant for Filipino use-cases.
There are several frameworks that allow us to do this such as [Eleuther AI's harness](https://github.com/EleutherAI/lm-evaluation-harness) and [HuggingFace's lighteval](https://github.com/huggingface/lighteval) that enable us to seamlessly evaluate several LMs at scale.

Creating a language-specific benchmark is useful because it serves not just the academic community for that language but also the industry at large.
It allows us to say *"this LLM works on these specific Filipino tasks but fails at some"* in academia, and help advise industry practitioners on which LLMs work on their particular use case.
This also opens up several potential avenues to advocate particular research directions for Filipino&mdash; focusing on language X, building a language-specific LLM, etc.&mdash; because there are metrics we hold ourselves onto (while acknowledging [Goodhart's Law](https://en.wikipedia.org/wiki/Goodhart%27s_law)).
Basically, we just need something instead of nothing, and that something is a huge step forward.

### Participate in grassroots research efforts


[^1]: 

    The Cebuano Wikipedia is the second-largest Wikipedia in terms of number of articles. Although this appears impressive, its size is due to an article-generating bot called [Lsjbot](https://en.wikipedia.org/wiki/Lsjbot) rather than a dedicated group of Wikipedia volunteers. Unfortunately, the articles in Cebuano Wikipedia are unnatural and do not reflect how the language is actually used by native speakers.