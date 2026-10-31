---
layout: post
type: post
title: "Field Report: EMNLP 2026"
date: 2026-11-02
category: notebook
comments: true
author: "LJ V. MIRANDA"
published: true
header-img: /assets/images/field-report-emnlp26/header.png
tags:
  [
    nlp,
    acl,
    emnlp,
    agents,
    language models,
    academic conference,
    conference,
    research,
    natural language processing,
    ai,
    llm,
    reasoning,
  ]
description: |
  Here is my field report from the EMNLP 2026 Conference in Budapest, Hungary.
  This was a conference of firsts as I presented my first PhD paper and my first time co-organizing a workshop!
excerpt: |
---

<span class="firstcharacter">T</span>he [EMNLP 2026 Conference](https://2026.emnlp.org/) in Budapest has been such a blast!
This is one of the top NLP conferences in the field and I feel honored to have presented my work there.
It's also a conference of firsts as I presented my first PhD paper and my first time co-organizing a workshop!
Finally, Budapest as a city is beautiful---it was a nice experience :) 

## My conference activities

### Presenting my research on multilingual synthetic data generation

I presented my first PhD paper, [Polyglot Teachers: Evaluating Language Models for Multilingual Synthetic Data Generation](https://aclanthology.org/2026.emnlp-main.440/), where we performed a comprehensive analysis of synthetic data generation techniques for producing high-quality multilingual data.
We also introduced a metric, called Polyglot Score, that takes into consideration both the intrinsic and extrinsic qualities of the generated data and the model it has been trained on.

![](/assets/images/field-report-emnlp26/polyglot_teachers_presentation.jpeg){: style="float: left; width: 40%; margin: 0.3em 1.5em 0.5em 0; border: 1px solid black; box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);"}

Synthetic data has been on my mind since my pre-doc days.
In some ways, I've been influenced by my prior work in T&uuml;lu 3 and by one of my mentors, Yizhong, who created [self-instruct](https://aclanthology.org/2023.acl-long.754/).
When applying for PhD programs, one thing that has been on my mind is how we can optimize the synthetic data pipeline to improve multilingual capabilities.
I am happy to have been given the opportunity to explore this problem during my PhD, and be provided with the compute to do so! Thank you Isambard and Cambridge CSD3!

*Future outlook:* I think synthetic data for post-training continues to be relevant, albeit in different forms.
Nowadays, much of the field has moved on from off-policy distillation (i.e., generate text from teacher and use that as learning signal) and focused on on-policy or RL-based approaches.
I've also seen several works taking synthetic data generation to the next level, such as Adaption's [Invent-A-Dataset](https://www.alphaxiv.org/abs/2609.invent-a-dataset-zero-seed) or Meta's [Autodata](https://www.alphaxiv.org/abs/2606.25996).
**I have some upcoming works that explore both directions**, one is [DataSmith](/datasmith/), which is a method for synthesizing multilingual instruction-tuning data with the help of external tools.
Stay tuned!

### Co-organizing the MRL 2026 workshop and Shared Task

This year, I also helped co-organize the [2026 Workshop on Multilingual Representation Learning and Shared Task](https://sigtyp.github.io/ws2026-mrl.html).
It was a nice experience as I was able to see how workshop organization happens at this scale.
My primary responsibility was to handle social media communications such as making posters, updating the website, and inviting keynote speakers.

![](/assets/images/field-report-emnlp26/mrl_team.jpeg){: style="float: left; width: 40%; margin: 0.3em 1.5em 0.5em 0; border: 1px solid black; box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);"}

During the workshop, I helped out in several of the last mile preparations and in live-tweeting the event.
This takes me back to my undergrad student org days of managing events and making sure the program flows well.
I didn't realize that I still have *it* in me, it's nice to rediscover that I still have that same energy ten years ago!
Although I admit that after the workshop I felt super exhausted that I didn't have the capacity to go out.
All in all, I enjoyed doing this and will definitely be back again next year.

Aside from the workshop proper, I also helped out in this year's [Shared Task](https://mrlbenchmarks.github.io/).
This time, the goal is to create a challenging benchmark in the style of [ECLeKTic](https://arxiv.org/abs/2502.21228).
I helped out in setting up and managing the Discord server and in evaluating the submissions.
We had a really nice turn out!
I am so thankful for all teams for the care and quality in their submissions.
The 2026 Shared Task is not yet over, and we're hoping to continue onward to the multimodal phase.

{% include figure.html
   src="/assets/images/field-report-emnlp26/poster_a.jpeg,/assets/images/field-report-emnlp26/poster_b.jpg,/assets/images/field-report-emnlp26/poster_c.jpeg"
   height="300"
   caption="Poster session during the MRL 2026 Conference. The poster area for MRL is very lively! In the middle you see me with Senyu Li looking at the very creative poster by the [Pag-refuse](https://aclanthology.org/2026.mrl-1.41/) authors."
   class="framed" %}

## Miscellaneous 

- **My supervisor, Anna Korhonen, gave a [keynote talk](https://2026.emnlp.org/program/keynotes/#keynote-3-anna-korhonen)**


- **I joined the SEACrowd Birds-of-a-Feather (BoF)**


## Reflections

I think one of the biggest discussions during the conference is the proliferation of AI in our daily workflows, and the trust or mistrust that comes with it.
For example, I overhear a lot of complaints about rampant Claude use in talks, posters, and oral presentations.
Not to mention the growing concern of the field itself to "claudeslop" in paper submissions and reviews.
I'd describe that the general sentiment of the field is that of disgust. 
In general it seems like most people don't like Claude interfering with the research process.

Despite that, it seems like LLM Agents is the most popular research topic.