---
layout: page
title: Research work
description: Research work of Lester James V. Miranda
permalink: /research/
---

【[🎓 Google Scholar](https://scholar.google.co.jp/citations?user=2RtnNKEAAAAJ&hl=en)】
【[📚 Semantic Scholar](https://www.semanticscholar.org/author/Lester-James-Validad-Miranda/13614871)】

I'm broadly interested in **data-centric approaches to building language technologies at scale.**
I believe that a careful and systematic understanding of data&mdash; from its collection to its downstream influence on training&mdash; is crucial to build general-purpose language models.
More specifically, I'm interested to work on the following topics:

- **Efficient approaches to annotation**:
    Human annotations are costly. How can we reduce this cost while preserving the nuance that human annotators provide? I'm currently exploring this question in the context of human preferences in LLM post-training (RLHF).

- **Resources for multilingual NLP**: 
    No language should be left behind, especially in data. 
    I've worked on several datasets to improve the state of low-resource and multilingual NLP.
    These projects involve Filipino [datasets](https://aclanthology.org/2023.sealp-1.2/) & [tooling](https://aclanthology.org/2023.nlposs-1.1/), and [large-scale multilingual datasets](https://aclanthology.org/2024.naacl-long.243/).

- **Evaluating overlooked aspects of LLMs**:
    I am interested in evaluating less-explored aspects of LLMs, such as their [multilingual capabilities](https://arxiv.org/abs/2406.10118) or [reward model performance](https://arxiv.org/abs/2403.13787), which are often overlooked in mainstream discussions or research.

If you are interested in these types of work, especially in improving the state of Filipino NLP, then do not hesitate to [reach out](mailto:ljvmiranda@gmail.com). 
I'm happy to discuss research and collaborate! 

&nbsp;

---

&nbsp;

## Selected Publications

Below is a list of my publications.
You can also check my [Google
Scholar](https://scholar.google.co.jp/citations?user=2RtnNKEAAAAJ&hl=en) and
[Semantic
Scholar](https://www.semanticscholar.org/author/Lester-James-V.-Miranda/13614871)
profiles for more updated information.

### 2024

*At AI2, I'm working on various aspects of LM adaptation such as preference data collection and evaluation. I also expanded my work in the multilingual NLP front (SEACrowd, M-RewardBench).*

- [Hybrid Preferences: Learning to Route between Human and AI Feedback]()
<br>*Preprint '24*
<br><u>Lester James V. Miranda</u>\*, Yizhong Wang\*, Yanai Elazar, Sachin Kumar, Valentina Pyatkin, Faeze Brahman, Noah A. Smith, Hannaneh  Hajishirzi, and Pradeep Dasigi.
<br>[[Code](https://github.com/allenai/hybrid-preferences)] [[MultiPref Dataset](https://huggingface.co/datasets/allenai/multipref)]

- [M-RewardBench: Evaluating Reward Models in Multilingual Settings](https://arxiv.org/abs/2410.15522)
<br>*Preprint '24*
<br>Srishti Gureja\*, <u>Lester James V. Miranda</u>\*, Shayekh bin Islam\*, Rishabh Maheshwary\*, Drishti Sharma, Gusti Winata, Nathan Lambert, Sebastian Ruder, Sara Hooker, and Marzieh Fadaee.
<br>[[Code](https://github.com/for-ai/aya_rm_multilingual)] [[Dataset](https://huggingface.co/collections/C4AI-Community/multilingual-rewardbench-66dcbf2bfc68bfbb93feebd7)] 

- [SEACrowd: A Multilingual Multimodal Data Hub and Benchmark Suite for Southeast Asian Languages](https://arxiv.org/abs/2406.10118) 
<br>*EMNLP '24, Preprint '24*
<br>Holy Lovenia\*, Rahmad Mahendra\*, Salsabil Maulana Akbar\*, <u>Lester James Miranda</u>\*, and 50+ other authors *(&lowast;: major contributor)*.
<br>[[Catalogue](https://seacrowd.github.io/seacrowd-catalogue)] [[Code](https://github.com/SEACrowd/seacrowd-datahub)]

- [Consent in Crisis: The Rapid Decline of the AI Data Commons](https://arxiv.org/abs/2407.14933) 
<br>*NeurIPS D&B '24, Preprint '24*
<br>Data Provenance Initiative Team (40+ authors). I contributed in the annotation process design for Web Domain services and annotation quality review.
<br>[[Website](https://www.dataprovenance.org/)] [[Collection](https://github.com/Data-Provenance-Initiative/Data-Provenance-Collection)] [[New York Times Feature](https://www.nytimes.com/2024/07/19/technology/ai-data-restrictions.html)]

- [RewardBench: Evaluating Reward Models for Language Modelling](https://arxiv.org/abs/2403.13787)
<br>*Preprint '24*
<br> Nathan Lambert, Valentina Pyatkin, Jacob Morrison, <u>LJ Miranda</u>, Bill Yuchen Lin, Khyathi Chandu, Nouha Dziri, Sachin Kumar, Tom Zick, Yejin Choi, Noah A. Smith, and Hannaneh Hajishirzi <br> [[Leaderboard](https://huggingface.co/spaces/allenai/reward-bench)] [[Code](https://github.com/allenai/reward-bench)] [[Blog](https://blog.allenai.org/rewardbench-the-first-benchmark-leaderboard-for-reward-models-used-in-rlhf-1d4d7d04a90b)]


- [Allen Institute for AI @ SIGTYP 2024 Shared Task on Word Embedding Evaluation for Ancient and Historical Languages](https://aclanthology.org/2024.sigtyp-1.18/)
<br>*Special Interest Group on Typology (SIGTYP) Workshop @ EACL '24*
<br><u>Lester James V. Miranda</u> <br> [[Code](https://github.com/ljvmiranda921/LiBERTus)] [[Video](https://www.youtube.com/watch?v=rjOw_G-Rv9I)] 

### 2023

*I spent the early parts of 2023 working on low-resource languages and multilinguality, especially Tagalog, my native language. I mostly focused on linguistic tasks such as POS tagging, NER, and dependency parsing.*

- [calamanCy: a Tagalog Natural Language Processing Toolkit](https://aclanthology.org/2023.nlposs-1.1/) 
<br>*NLP Open-Source Software (NLP-OSS) Workshop @ EMNLP '23*
<br> <u>Lester James V. Miranda</u> 
<br> [[Code](https://github.com/ljvmiranda921/calamanCy)] [[Poster](/assets/png/calamancy/poster.png)] [[Video](https://youtu.be/2fbzs1KbFTQ?si=_vKEY11Z1Jzuaxeu)]

- [Developing a Named Entity Recognition Dataset for Tagalog](https://aclanthology.org/2023.sealp-1.2/)
<br>*Southeast Asian Language Processing (SEALP) Workshop @ IJCNLP-AACL '23* 
<br> <u>Lester James V. Miranda</u>
<br> [[Code](https://github.com/ljvmiranda921/calamanCy/tree/master/reports/aacl2023/benchmark)] [[Dataset](https://huggingface.co/datasets/ljvmiranda921/tlunified-ner)] [[Video](https://www.youtube.com/watch?v=WAJ8IEIHuiM)] 

- [Universal NER: A Gold-Standard Multilingual Named Entity Recognition Benchmark](https://aclanthology.org/2024.naacl-long.243/)
<br>*NAACL '24, Preprint '23*
<br>Stephen Mayhew, Terra Blevins, Shuheng Liu, Marek &Scaron;uppa, Hila Gonen, Joseph Marvin Imperial, B&ouml;rje F. Karlsson, Peiqin Lin, Nikola Ljube&scaron;ic&#769;, <u>LJ Miranda</u>, Barbara Plank, Arij Riabi, Yuval Pinter 
<br> [[Dataset](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/GQ8HDL)] [[Website](https://www.universalner.org/)] 

### 2022

*My first foray to NLP research is a technical report on spaCy's hash embedding method. I'm lucky to have worked with established researchers in the field.*

- [Multi hash embeddings in spaCy](https://arxiv.org/abs/2212.09255)
<br>*Preprint '22*
<br> <u>Lester James V. Miranda</u>\*, &Aacute;kos K&aacute;d&aacute;r\*, Adriane Boyd, Sofie Van Landeghem, Anders S&oslash;gaard, and Matthew Honnibal *(&lowast;: equal contributions)*.
<br> [[Code](https://github.com/explosion/projects/tree/v3/benchmarks/ner_embeddings)]

<!--
- [Expulsion from Eden: the saga of the Calauit Safari Island Park](https://www.dropbox.com/s/j36m11rvhbl963e/apeiron2016expulsion.pdf?dl=0) <br> Lester James V. Miranda, “Expulsion from Eden: the saga of the Calauit Safari Island Park,” _APEIRON Student Journal of Philosophy_, no. 8, pp. 201–219, 2016. ISBN: 1533659788.
-->

&nbsp;

---

&nbsp;

### Previous research

I used to be a bioinformatics researcher at the [Furuzuki Neurocomputing Systems Laboratory](https://www.waseda.jp/sem-hflab/nclab/index.html), working on nature-inspired algorithms and proteomics. 

- [Feature Extraction using a Mutually-Competitive Autoencoder for Protein Function Prediction](https://ieeexplore.ieee.org/document/8616230). 
<br>*IEEE Systems, Man, and Cybernetics (SMC) '18*
<br><u>Lester James V. Miranda</u> and Jinglu Hu 

- [A Deep Learning Approach based on Stacked Denoising Autoencoder for Protein Function Prediction](https://ieeexplore.ieee.org/document/8377699). 
<br>*IEEE Computer, Software, and Applications (COMPSAC) '18*
<br><u>Lester James V. Miranda</u> and Jinglu Hu

- [PySwarms, a research-toolkit for Particle Swarm Optimization in Python](https://joss.theoj.org/papers/10.21105/joss.00433) 
<br>*Journal of Open Source Software (JOSS) '18, vol.3, no. 433*
<br> <u>Lester James V. Miranda</u>

I was also involved in research early on during my undergrad:

- [Appliance Recognition using Hall-Effect Sensors and k-Nearest Neighbors for Power Management Systems](https://ieeexplore.ieee.org/document/7847947) 
<br>*IEEE Region 10 Conference (TENCON) '16*
<br><u>Lester James V. Miranda</u>\*, Marian Joice Gutierrez\*, Samuel Matthew Dumlao, and Rosula Reyes *(&lowast;: equal contributions)*.
