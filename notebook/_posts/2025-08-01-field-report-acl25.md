---
layout: post
type: post
title: "Field Report: ACL 2025"
date: 2025-08-01
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
header-img: /assets/png/field-report-acl25/header.png
tags:
  [
    nlp,
    acl,
    conference,
    research,
    natural language processing,
    ai,
    llm,
    reasoning,
  ]
description: |
  Here is my field report from the ACL 2025 Conference in Vienna, Austria.
  Overall, it was a great experience: the vibes are good and I'm happy to have met the larger NLP community!
excerpt: |
---

<span class="firstcharacter">I</span> had an incredible time at the [ACL 2025 Conference](https://2025.aclweb.org/) in Vienna.
ACL is one of the top conferences in NLP, with researchers presenting a wide range of work from computational linguistics to frontier large language models.
This was also the very first NLP conference I attended.
Although I had published in \*CL venues before, I never had the chance to attend in person.
Attending ACL was also a great way to immerse myself in the broader NLP community before starting my Ph.D.

## Works I presented during the conference

![](/assets/png/field-report-acl25/presentations.png){:width="720px"}
{: style="text-align: center;"}

Self-promotion: I had four papers accepted in the ACL Main Proceedings, three of which I was the first or co-first author on (all in the Resources & Evaluation track):

- [Hybrid Preferences: Learning to Route Instances for Human vs. AI Feedback](https://arxiv.org/abs/2410.19133)<br>TLDR: We find that some preference instances are better annotated by humans than by language models (LMs). We use that information to train a hybrid preference router (HyPER) that allocates instances to either humans or LMs.
- [M-RewardBench: Evaluating Reward Models in Multilingual Settings.](https://arxiv.org/abs/2410.15522)<br>TLDR: We introduce a new benchmark for evaluating reward models (RMs) in 23 diverse languages. By evaluating several RMs on M-RewardBench, we uncovered signficant gaps in RM performance between English and non-English languages.
- [The UD-NewsCrawl Treebank: Reflections and Challenges from a Large-scale Tagalog Syntactic Annotation Project](https://arxiv.org/abs/2505.20428)<br>TLDR: We introduce the largest Tagalog treebank to date, 100x larger than previous treebanks.
  By building this treebank, we stretch the limits of the Universal Dependencies framework and challenge its "universality."

And a big collab project from SEACrowd:

- [Crowdsource, Crawl, or Generate? Creating SEA-VL, a Multicultural Vision-Language Dataset for Southeast Asia](https://arxiv.org/abs/2503.07920)<br>TLDR: We present SEA-VL, one of the largest open-source initiatives to develop high-quality and culturally-relevant data for SEA languages. We also highlight representation gaps in SEA, especially for vision-language models.

_Really, four papers?!_ This seems like a big feat, but these works were completed at different times&mdash;it's just that the timing led them to be published simultaneously.
In fact, HyPER was a reject from ICLR that we further refined, and my involvement in UD-NewsCrawl started way back in 2023.
Good research takes time, and I'm lucky to have great collaborators during these long periods of work.

## Papers that piqued my attention

I enjoyed going through the poster presentations during the conference.
Since I was presenting, I wasn't able to attend most of the Main posters.
However, I had a great time talking to other researchers in the other sessions!

- [Language Models Resist Alignment: Evidence from Data Compression](https://aclanthology.org/2025.acl-long.1141/): It's one of the best papers of ACL and presents a physics-inspired view of post-training behaviour.
  According to the paper, post-trained LMs exhibit some kind of _elasticity_, where it reverts back to its behaviour distribution during pretraining when finetuned further.
  The rest of the work is an analysis of this elasticity, where they found that it positively correlates with increased model size and expansion of pre-training data.

- [Building Better: Avoiding Pitfalls in Developing Language Resources when Data is Scarce](https://aclanthology.org/2025.acl-long.435/): A good paper that examines the patterns in language resource development form a survey of several NLP practitioners.
  It also highlights some potential systemic issues with large-scale community efforts such as credit attribution.
  I find this paper thought-provoking as it looks into the _meta_ of language resource development and reveals issues that we tend to take for granted.

- [Can External Validation Tools Improve Annotation Quality for LLM-as-a-Judge?](https://aclanthology.org/2025.acl-long.779/): This is an interesting paper that examines how tools can improve annotation quality in LLM-as-a-judge scenarios.
  I've been working in finetuning LMs for tool-use at Ai2, and I'm very curious of its applications in some of the domains I care about.
  There is good empirical evidence for using tools during annotation, and I'm excited to see where else we can apply this framework.

Honorable mentions:

- [A Perspective on LLM Data Generation with Few-shot Examples: from Intent to Kubernetes Manifest](https://aclanthology.org/2025.acl-industry.27/): fun industry-track paper that solves the problem of writing annoying Kubernetes configs! Tickled the software engineer in me.
- [PLAY2PROMPT: Zero-shot Tool Instruction Optimization for LLM Agents via Tool Play](https://aclanthology.org/2025.findings-acl.1347/): an interesting framework for refining tool instructions. Might be useful for improving the quality of synthetic tool-use data.
- [Automatic Transmission for LLM Tiers: Optimizing Cost and Accuracy in Large Language Models](https://aclanthology.org/2025.findings-acl.873/): a good addition to the literature of LLM routing. Can even be useful for some LLM-as-a-judge applications.

## Miscellaneous

![](/assets/png/field-report-acl25/socials.png){:width="720px"}
{: style="text-align: center;"}

- **I attended the SEACrowd Birds-of-a-Feather (BoF) session!** Finally, I've met my long-time collaborators.
  I've been involved with the SEACrowd group during their initial project, so it's nice to meet Holy, Samuel, and Aji in person.
  During the BoF, we talked about what is "enough" for Southeast Asian NLP, what's missing (it's always money), and what are our current successes.
  I honestly look forward to SEACrowd events.
  I traveled to ACL alone, so being with some familiar faces gave me a feeling of having a _home base_ in a sea of strangers.

- **Met with some Pinoy NLP researchers.** I'm also glad to see Filipinos publishing in these top NLP conferences.
  I met with some folks from the Asian Institute of Management (Sir Chris, Japer, K-Ann), SEACrowd (Blaise and Anton), AI Singapore (Railey), and Radboud University (Jane).
  Data science in the Philippines is a small world: each of us were connected in one way or another (either we're from the same high school, college, job, etc.).
  I was very happy to see Pinoys and almost shouted _Uy pilipins!_ upon meeting them.

- **Thank you for the water, kind stranger!** During the second day of the conference, I was presenting two posters at the same time! It was quite intense as I jump from one work to another.
  Add Vienna's summer heat and I was definitely sweaty and haggard.
  Suddenly, a kind stranger offered me some water and I felt refreshed and energized.
  It was a nice gesture and now a core memory of my conference experience.
  I wasn't able to catch their name, but if you're reading this: thank you for the water, kind stranger!

## Final thoughts

Attending ACL 2025 is a great way to close my pre-PhD years and start my new journey as a PhD student.
As my first NLP conference, ACL gave me a favorable first impression of the community at large.
Perhaps I've been lucky with the people I've talked to, but everyone was warm, friendly, and welcoming.
Good vibes all throughout, no notes.

Also, I enjoyed writing this field report: it's a good exercise for me to synthesize things I've learned during the conference, and hopefully it's informative for non-attendees to get an inside look into these academic research events.
I admit I haven't been writing in this blog recently (although in general, I've written way more during the past two years), so this might be another way to fill-in those spaces during the year.
Hoping to write more field reports in the future!
_And finally, some photos of my post-conference trip:_

![](/assets/png/field-report-acl25/places.png){:width="800px"}
{: style="text-align: center;"}
