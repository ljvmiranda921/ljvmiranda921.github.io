---
layout: post
type: post
title: "Do large language models work on Tagalog?"
date: 2023-08-04
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, tagalog, low-resource languages, prodigy, natural language processing, machine learning]
header-img: /assets/png/calamancy-llm/header.png
description: |
    Large language models showed promise on structured prediction tasks like named entity recognition and text categorization.
    But how well do they perform when presented with Tagalog text?
    In this blog post, I'll share some of my preliminary benchmarking results.
excerpt: |
    Large language models showed promise on structured prediction tasks like named entity recognition and text categorization.
    But how well do they perform when presented with Tagalog text?
    In this blog post, I'll share some of my preliminary benchmarking results.
---

<span class="firstcharacter">A</span> few weeks ago, I saw an [interesting blog post](https://stories.thinkingmachin.es/llm-customer-sentiment-analysis/) from Thinking Machines where they ran Filipino tweets on GPT-4 for a sentiment analysis task.
Their prompt was simple. They asked: *"what is the sentiment of this tweet?"*
They obtained a weighted F1-score of 76%&mdash; pretty decent for a straightforward zero-shot approach.
This inspired me to test LLM performance on other Tagalog NLP tasks, hence these experiments.

In this blog post, I will test how these large language models (LLMs) fare compared to standard finetuning techniques in Tagalog.
I will be benchmarking them on the named entity recognition (NER) and text categorization datasets from the [calamanCy project](/projects/2023/08/01/calamancy/). 

As a refresher, you can check the datasets I'm using in the table below. 
I didn't include the Universal Dependencies (UD) treebanks this time because querying third-party APIs is getting too costly.

| Dataset                                                     | Task / Labels                                                           | Description                                                                                                                       |
|-------------------------------------------------------------|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Hatespeech ([Cabasag et al., 2019](#cabasag2019hatespeech)) | Binary text classification (*hate speech, not hate speech*)               | Contains 10k tweets collected during the 2016 Philippine Presidential Elections labeled as hatespeech or non-hate speech.         |
| Dengue ([Livelo and Cheng, 2018](#livelo2018dengue))        | Multilabel text classification (*absent, dengue, health, sick, mosquito*) | Contains 4k dengue-related tweets collected for a health infoveillance application that classifies text into dengue subtopics.    |
| TLUnified-NER ([Cruz and Cheng, 2021](#cruz2021tlunified)) | NER (*Person, Organization, Location*)               | A held-out test split from the annotated TLUnified corpora containing news reports.  |

I wrote a zero-shot prompt and ran it on the test set.
Zero-shot prompting only requires a task description for inference. 
In addition, few-shot prompting is out of scope for this blog post&mdash;it's too laborious to engineer prompts and it might be difficult to compare them properly.
I'll also run the experiments for three trials and report the mean and standard deviation to account for variance. 
The prompt text will still be in English so as to be consistent with the Thinking Machines blog post.

Finally, I am using [**spacy-llm**](https://github.com/explosion/spacy-llm) throughout the experiments. 
I highly recommend trying spacy-llm if you're building production-grade LLM pipelines.
You can find and reproduce my work on [Github](https://github.com/ljvmiranda921/scratch/tree/master/2023-07-25-llm-tl)! 
*(Full disclosure: I used to contribute to earlier versions of spacy-llm as part of my work at Explosion)*

## Methodology: what are my prompts?

The [spacy-llm](https://github.com/explosion/spacy-llm) library provides a set of built-in prompt templates for zero- and few-shot prompting.
These prompts are categorized and versioned per task.
You can view them by checking the configuration file [in the Github repo](https://github.com/ljvmiranda921/scratch/tree/master/2023-07-25-llm-tl) and looking at the `components.llm.task` section.
For example, in NER, we have something like this:

```ini
[components.llm.task]
@llm_tasks = "spacy.NER.v2"
labels = ["PER","ORG","LOC"]
label_definitions = {"PER": "PERSON", "ORG": "ORGANIZATION", "LOC": "LOCATION OR GEOPOLITICAL ENTITY"}
```

Here, `spacy.NER.v2` points to a [`task`](https://spacy.io/api/large-language-models#tasks) with its own prompt.
From there, you can check [the documentation](https://spacy.io/api/large-language-models#ner-v2) and cross-reference the template (tip: check the `template` argument in the docs).
For NER, we have [this Jinja2 file](https://github.com/explosion/spacy-llm/blob/main/spacy_llm/tasks/templates/ner.v2.jinja). 
At runtime, `spacy-llm` renders our config to the Jinja2 template, thereby producing the final prompt sent to the LLM:

```
You are an expert Named Entity Recognition (NER) system. Your task is 
to accept Text as input and extract named entities for the set of 
predefined entity labels. From the Text input provided, extract named 
entities for each label in the following format:

PER: <comma delimited list of strings>
ORG: <comma delimited list of strings>
LOC: <comma delimited list of strings>

Below are definitions of each label to help aid you in what kinds of 
named entities to extract for each label.  Assume these definitions are 
written by an expert and follow them closely.

PER: PERSON
ORG: ORGANIZATION
LOC: LOCATION OR GEOPOLITICAL ENTITY

Text:
'''
Pumunta si Juan sa Japan.
'''
```

I won't be pasting the prompts for binary and multilabel text categorization here to save space.
Again, the best way to view them is to check my [configuration files](https://github.com/ljvmiranda921/scratch/tree/master/2023-07-25-llm-tl/configs) and cross-reference them with the [prompt templates in the spacy-llm repository](https://github.com/explosion/spacy-llm/tree/main/spacy_llm/tasks/templates).

Lastly, some `spacy-llm` tasks provide additional arguments such as `label_definitions` for explicitly describing a label to an LLM, and `examples` for incorporating exemplars in few-shot prompting.
The library covers most of the core NLP tasks (NER, text categorization, and lemmatization) and seems to be adding more in the natural language understanding (NLU) space (e.g., summarization).

## Results: LLMs vs good old-fashioned supervised learning

I tested on a variety of [decoder-only](https://huggingface.co/learn/nlp-course/chapter1/6) large language models, from commercial ones like GPT-4 to open-source models like Dolly.
The table below reports the results (**Metrics:** <u>macro F1-score</u> for Dengue and Hatespeech and <u>F1-score</u> for TLUnified-NER):


| LLM                                 | Dengue           | Hatespeech       | TLUnified-NER    | 
|-------------------------------------|------------------|------------------|------------------|
| OpenAI (`gpt-4`)                    | $$\mathbf{62.04 (0.20)}$$ | $$45.74 (1.16)$$ | $$\mathbf{65.89 (0.44)}$$ | 
| OpenAI (`gpt-3.5-turbo`)            | $$51.21 (0.38)$$ | $$\mathbf{73.90 (0.27)}$$ | $$53.05 (0.42)$$ | 
| Anthropic (`claude-1`)              | $$35.85 (0.02)$$ | $$58.70 (0.03)$$ | $$58.88 (0.03)$$ | 
| Cohere (`command`)                  | $$39.27 (0.64)$$ | $$16.38 (0.88)$$ | $$25.48 (0.11)$$ | 
| Databricks (`dolly-v2-7b`)          | $$27.26 (0.40)$$ | $$32.30 (0.18)$$ | $$13.07 (0.14)$$ | 
| TII (`falcon-7b`)                   | $$14.77 (0.35)$$ | $$33.00 (0.11)$$ | $$8.65  (0.04)$$ | 
| Stability (`stablelm-base-alpha-7b`)| $$15.56 (0.08)$$ | $$32.17 (0.24)$$ | $$00.25 (0.03)$$ | 
| OpenLM (`open_llama_7b`)            | $$15.24 (0.43)$$ | $$32.18 (0.73)$$ | $$15.09 (0.48)$$ | 

For comparison, the table below shows the results for the word vector and [encoder-only](https://huggingface.co/learn/nlp-course/chapter1/5?fw=pt) transformer-based pipelines from [calamanCy](https://github.com/ljvmiranda921/calamanCy). 
Both were trained using good old-fashioned supervised learning.
I also included the results from finetuning XLM-RoBERTa ([Conneau et al., 2019](#conneau2019xlmr)) and multilingual BERT ([Devlin et al., 2019](#devlin2019bert)). 
You can read more about these pipelines in [this blog post](/projects/2023/08/01/calamancy/).

| Pipeline                                                                                        | Dengue           | Hatespeech       | TLUnified-NER    |
|-------------------------------------------------------------------------------------------------|------------------|------------------|------------------|
| Large word-vector [(`tl_calamancy_lg`)](https://huggingface.co/ljvmiranda921/tl_calamancy_lg)   | $$68.42 (0.01)$$ | $$75.62 (0.02)$$ | $$88.90 (0.01)$$ | 
| Transormer-based [(`tl_calamancy_trf`)](https://huggingface.co/ljvmiranda921/tl_calamancy_trf)  | $$72.45 (0.02)$$ | $$78.25 (0.06)$$ | $$90.34 (0.02)$$ | 
| XLM-RoBERTa (`xlm-roberta-base`)                                                                | $$67.20 (0.01)$$ | $$77.57 (0.01)$$ | $$88.03 (0.03)$$  | 
| Multilingual BERT (`bert-base-multilingual`)                                                    | $$71.07(0.04)$$  | $$76.40 (0.02)$$ | $$87.40 (0.02)$$  | 

The graph below shows a better visual of our results.
The grey bars represent our large language models while the red bars represent the supervised ones.

![](/assets/png/calamancy-llm/results.svg){:width="700px"}
{: style="text-align: center;"}


## Discussion: why are LLMs underperforming?

It is apparent that our **supervised approach outperformed zero-shot prompting** in our datasets.
These results are consistent with the findings of the BigScience group ([Wang et al., 2022](#wang2022WhatLM)), 
where they showed that although decoder-only models trained on an autoregressive objective exhibited the strongest zero-shot generalization, they're still outperformed by models trained via masked language modeling followed by multitask finetuning.
I think there are two major reasons why LLMs underperform on Tagalog:


* <b style="font-variant:small-caps;">Conceptual gap: </b>**text generation != text understanding**. I argue that one common misconception with LLMs is that we equate the generation of coherent texts to language understanding.
Just because an LLM can "speak" [*co&ntilde;o*](https://en.wiktionary.org/wiki/konyo#Tagalog) or [*jejemon*](https://en.wikipedia.org/wiki/Jejemon) doesn't mean it understands linguistic grammar.
LLMs are, after all, stochastic parrots ([Bender et al., 2021](#bender2021parrots)).
They might be performant in leaderboards, but they can bring unnoticeable harm when used liberally. 
In addition, our decoder-only LLMs may not be suited to our structured prediction benchmarks.

    As an aside, this may also be a call for building NLU-benchmarks for low-resource corpora. 
    If you're working on something related, I'm interested to help so feel free to reach out!

- <b style="font-variant:small-caps;">Data gap: </b>**Tagalog is still underrepresented in most LLM training corpora**. 
    Training an LLM requires a large *data mixture*. 
Datasets in this mixture usually include [CommonCrawl](https://commoncrawl.org/), [The Pile](https://pile.eleuther.ai/), [C4](https://github.com/google-research/text-to-text-transfer-transformer#c4), and Wikipedia among many others. 
Most of these datasets are heavily Anglocentric.
For example, the [Pile](https://pile.eleuther.ai/) dataset is English-only while CommonCrawl is dominated by Western languages (Tagalog is at a mere $$0.0073\%$$).

    Unfortunately, Tagalog is underrepresented even in multilingual LMs. 
    For example, the XGLM language model ([Lin et al., 2022](#lin2022xglm)) was only trained on 2.3k tokens of Tagalog data whereas the <span style="font-variant:small-caps;">Bloom</span> language model ([Scao et al., 2022](#scao2022bloom)) doesn't contain any Tagalog text at all. 
    There's still a long way to go.
    Currently, there are efforts such as [Cohere's Aya project](https://txt.cohere.com/aya-multilingual/) that aim to close that multilingual gap.
    
### Thoughts on how we should use LLMs

Given these gaps, I think that the best way to use LLMs in the context of low-resource languages is to **maximize information-per-query (IPQ).**
*Yes, I made that one up.*
The idea is to extract higher quality information for every query from an LLM.
Here, I define **quality as reusability**, i.e.,  something that can still be refined further for other downstream tasks.
I'd even argue that NLU-based outputs such as summarization, common-sense reasoning, and question-answering have inherently high information bandwidth (and hence high IPQ) because it taps to the LLM's interconnections from its very large training corpora.

For example, using raw LLM outputs as the final predictions for a structured prediction task (NER, text categorization, sentiment analysis) has low IPQ.
This is because we already exhausted the lifetime of our query by serving it directly in our system.
Asking an LLM to tag a text as hatespeech or not may not be the most efficient use of its capabilities.

We can increase IPQ by [using these predictions to assist data annotation](/notebook/2023/03/24/llm-annotation/), thereby producing a supervised model with a more deterministic performance.
Other ways to maximize IPQ is to prompt an LLM in a chain-of-thought style to elicit "reasoning" ([Wei et al., 2022](#wei2022cot)) or building a knowledge graph from its "internal" model ([Cohen et al., 2023](#cohen2023kb))&mdash;anything that utilizes an LLM into its fullest potential in a single query.

I admit that this made-up measure is rough at best. 
For a more thoughtful reading, I highly recommend [Eugene Yan's blog post](https://eugeneyan.com/writing/llm-patterns/) on LLM patterns. 
Notice that most of these patterns aim to maximize IPQ.
I also recommend [Vicki Boykis's reflection](https://vickiboykis.com/2023/02/26/what-should-you-use-chatgpt-for/) as it echoes what I feel towards ChatGPT in this age of AI hype.

## Final thoughts: we're not there yet

I hope that this blog post is a more sober view of LLM capabilities for Tagalog.
It would be great to live in a world where we don't need to build corpora, but I don't think we're there yet.
I still believe that LLMs have a use for structured prediction tasks, such as in annotation or as a silver-standard knowledge-base.

Personally, I'm interested in building parallel corpora so that we can have a comprehensive view of an LLM's multilingual performance.
I'm also curious about various ways we can maximize the information obtained from LLMs and using that for downstream tasks.
Finally, there might also be a good argument for building an LLM geared towards low-resource languages, I do think that it is a worthwile endeavour.

## References

- <a id="bender2021parrots">Emily Bender, Timnit Gebru, Angelina McMillan-Major and Margaret Mitchell</a>. “On the Dangers of Stochastic Parrots: Can Language Models Be Too Big? 🦜.” Proceedings of the 2021 ACM Conference on Fairness, Accountability, and Transparency (2021): n. pag.
- <a id="cabasag2019hatespeech">Neil Vicente P. Cabasag, Vicente Raphael C. Chan, Sean Christian Y. Lim, Mark Edward M. Gonzales, and Charibeth K. Cheng.</a> 2019. Hate Speech in Philippine Election-Related Tweets: Automatic Detection and Classification Using Natural Language Processing. *Philippine Computing Journal Dedicated Issue on Natural Language Processing*, pages 1–14.
- <a id="livelo2018dengue">Evan Dennison S. Livelo and Charibeth Ko Cheng.</a> 2018. Intelligent Dengue Infoveillance Using Gated Recurrent Neural Learning and Cross-Label Frequencies. *2018 IEEE International Conference on Agents (ICA)*, pages 2–7.
- <a id="cruz2021tlunified">Jan Christian Blaise Cruz and Charibeth Ko Cheng.</a> 2021. Improving Large-scale Language Models and Resources for Filipino. In *International Conference on Language Resources and Evaluation*
- <a id="conneau2019xlmr">Alexis Conneau, Kartikay Khandelwal, Naman Goyal, Vishrav Chaudhary, Guillaume Wenzek, Francisco Guzmán, Edouard Grave, Myle Ott, Luke Zettlemoyer, and Veselin Stoyanov.</a> 2019. Unsupervised Cross-lingual Representation Learning at Scale. In *Annual Meeting of the Association for Computational Linguistics*.
- <a id="devlin2019bert">Jacob Devlin, Ming-Wei Chang, Kenton Lee, and Kristina Toutanova.</a> 2019. BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding. ArXiv, abs/1810.04805
- <a id="wang2022WhatLM">Thomas Wang, Adam Roberts, Daniel Hesslow, Teven Le Scao, Hyung Won Chung, Iz Beltagy, Julien Lauanay, and Colin Raffel.</a> 2022. What Language Model Architecture and Pretraining Objective Work Best for Zero-Shot Generalization? *Proceedings of the 39th International Conference on Machine Learning*.
- <a id="lin2022xglm">Xi Victoria Lin, , Todor Mihaylov, Mikel Artetxe, Tianlu Wang, Shuohui Chen, Daniel Simig, Myle Ott, Naman Goyal, Shruti Bhosale, Jingfei Du, Ramakanth Pasunuru, Sam Shleifer, Punit Singh Koura, Vishrav Chaudhary, Brian O'Horo, Jeff Wang, Luke Zettlemoyer, Zornitsa Kozareva, Mona T. Diab, Ves Stoyanov and Xian Li.</a> 2022. Few-shot Learning with Multilingual Generative Language Models. *Conference on Empirical Methods in Natural Language Processing.*
- <a id="scao2022bloom">Teven Le Scao, Angela Fan, Thomas Wolf and others</a> 2022. BLOOM: A 176B-Parameter Open-Access Multilingual Language Model. *ArXiV:abs/2211.05100*.
- <a id="wei2022cot">Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Ed Huai-hsin Chi, F. Xia, Quoc Le and Denny Zhou.</a> “Chain of Thought Prompting Elicits Reasoning in Large Language Models.” ArXiv abs/2201.11903 (2022): n. pag.
- <a id="cohen2023kb">Roi Cohen, Mor Geva, Jonathan Berant and Amir Globerson.</a> “Crawling The Internal Knowledge-Base of Language Models.” *Findings of the ACL* (2023).
