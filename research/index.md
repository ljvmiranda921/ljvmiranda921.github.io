---
layout: page
title: Research work
description: Research work of Lester James V. Miranda
permalink: /research/
---

I'm interested in how **data-centric** approaches can systematically improve the construction of NLP datasets and their impact on downstream model performance.
The hope is, we can improve model performance through rigorous and efficient annotation, principled synthetic data generation, and comprehensive benchmarking.

- **Preference data for post-training LMs**: 
    We often use preference data to align LMs with human values, yet it is a highly-subjective task for humans and even LLM judges. 
    [Selectively choosing instances]() where humans or LLMs are good at is important, as well as [improving the benchmarks](https://arxiv.org/abs/2403.13787) used to evaluate the reward models trained on these datasets.

- **Synthetic data generation**:
    Human annotation is costly and high-effort. 

    
- **NLP resources and evaluation**: 
    No language should be left behind, especially with data. 
    I've worked on several datasets and benchmarks to improve the state of low-resource NLP.
    These involve [Filipino](https://aclanthology.org/2023.sealp-1.2/) [datasets](https://aclanthology.org/2024.naacl-long.243/) and [tooling](https://aclanthology.org/2023.nlposs-1.1/), [multilingual and multimodal benchmarks for Southeast Asian languages](https://arxiv.org/abs/2406.10118), and [more]().


You can also check my [Google
Scholar](https://scholar.google.co.jp/citations?user=2RtnNKEAAAAJ&hl=en) and
[Semantic
Scholar](https://www.semanticscholar.org/author/Lester-James-V.-Miranda/13614871)
profiles for more information.
Items marked with a star (&#9733;) are representative of my current interests.

&nbsp;

---

&nbsp;

### 2024

*At AI2, I worked on various aspects of LM adaptation such as preference data collection (MultiPref) and evaluation (RewardBench). I also expanded my work in the multilingual NLP front (SEACrowd, SIGTYP).*

- &#9733; [SEACrowd: A Multilingual Multimodal Data Hub and Benchmark Suite for Southeast Asian Languages](https://arxiv.org/abs/2406.10118). 
Holy Lovenia\*, Rahmad Mahendra\*, Salsabil Maulana Akbar\*, <u>Lester James Miranda</u>\*, and 55 other authors. *Proceedings of the 2024 Conference on Empirical Methods in Natural Language Processing*. Miami, Florida. November, 2024. *(&lowast;: major contributors)*<br>[[Catalogue](https://seacrowd.github.io/seacrowd-catalogue)] [[Code](https://github.com/SEACrowd/seacrowd-datahub)]

- [Through the Looking-Glass: Tracing Shifts in AI Data Consent across the Web](). 
Shayne Longpre, Robert Mahari, Ariel N. Lee, and 45 other authors (I'm somewhere there). *Proceedings of the 38th Conference on Neural Information Processing  (NeurIPS) Track on Datasets and Benchmarks*. Vancouver, Canada. December, 2024. I contributed in data annotation and adding Southeast Asian datasets to the analyses.

- &#9733; [RewardBench: Evaluating Reward Models for Language Modelling](https://arxiv.org/abs/2403.13787) <br> Nathan Lambert, Valentina Pyatkin, Jacob Morrison, <u>LJ Miranda</u>, Bill Yuchen Lin, Khyathi Chandu, Nouha Dziri, Sachin Kumar, Tom Zick, Yejin Choi, Noah A. Smith, and Hannaneh Hajishirzi. *Proceedings of the 38th Conference on Neural Information Processing  (NeurIPS) Track on Datasets and Benchmarks*. Vancouver, Canada. December, 2024. (Preprint March 2024). <br> [[Leaderboard](https://huggingface.co/spaces/allenai/reward-bench)] [[Code](https://github.com/allenai/reward-bench)] [[Blog](https://blog.allenai.org/rewardbench-the-first-benchmark-leaderboard-for-reward-models-used-in-rlhf-1d4d7d04a90b)]


- [Allen Institute for AI @ SIGTYP 2024 Shared Task on Word Embedding Evaluation for Ancient and Historical Languages](https://aclanthology.org/2024.sigtyp-1.18/).  <u>Lester James V. Miranda</u>, *Proceedings of the EACL 6th Workshop on Research in Computational Linguistic Typology and Multilingual NLP*. ACL. St. Julian's, Malta. March 2024. <br> [[Code](https://github.com/ljvmiranda921/LiBERTus)] [[Video](https://www.youtube.com/watch?v=rjOw_G-Rv9I)] 

### 2023

*I spent the early parts of 2023 working on low-resource languages and multilinguality, especially Tagalog, my native language. I mostly focused on core NLP tasks: POS tagging, NER, dependency parsing, etc.*

- &#9733; [calamanCy: a Tagalog Natural Language Processing Toolkit](https://aclanthology.org/2023.nlposs-1.1/) <br> <u>Lester James V. Miranda</u>, *Proceedings of the EMNLP 2023 Workshop on NLP Open Source Software (NLP-OSS)*. EMNLP. Singapore, Singapore. December 2023. 
<br> [[Code](https://github.com/ljvmiranda921/calamanCy)] [[Poster](/assets/png/calamancy/poster.png)] [[Video](https://youtu.be/2fbzs1KbFTQ?si=_vKEY11Z1Jzuaxeu)]

- &#9733; [Developing a Named Entity Recognition Dataset for Tagalog](https://aclanthology.org/2023.sealp-1.2/) <br> <u>Lester James V. Miranda</u>, *Proceedings of the IJCNLP-AACL 2023 Workshop on Southeast Asian Language Processing (SEALP)*. ACL. Nusa Dua, Bali, Indonesia. November 2023.
<br> [[Code](https://github.com/ljvmiranda921/calamanCy/tree/master/reports/aacl2023/benchmark)] [[Dataset](https://huggingface.co/datasets/ljvmiranda921/tlunified-ner)] [[Video](https://www.youtube.com/watch?v=WAJ8IEIHuiM)] 

- &#9733; [Universal NER: A Gold-Standard Multilingual Named Entity Recognition Benchmark](https://aclanthology.org/2024.naacl-long.243/) <br>Stephen Mayhew, Terra Blevins, Shuheng Liu, Marek &Scaron;uppa, Hila Gonen, Joseph Marvin Imperial, B&ouml;rje F. Karlsson, Peiqin Lin, Nikola Ljube&scaron;ic&#769;, <u>LJ Miranda</u>, Barbara Plank, Arij Riabi, Yuval Pinter. *Proceedings of the 2024 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies (NAACL-HLT)*. Mexico City, Mexico. June 2024. (Preprint November 2023). 
<br> [[Dataset](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/GQ8HDL)] [[Website](https://www.universalner.org/)] 

### 2022

*My first foray to NLP research is a technical report on spaCy's hash embedding method. I'm lucky to have worked with established researchers in the field.*

- [Multi hash embeddings in spaCy](https://arxiv.org/abs/2212.09255) <br> <u>Lester James V. Miranda</u>\*, &Aacute;kos K&aacute;d&aacute;r\*, Adriane Boyd, Sofie Van Landeghem, Anders S&oslash;gaard, and Matthew Honnibal. Preprint. *arXiv:2212.09255 [cs.CL]*. November 2022. <br> *(&lowast;: equal contributions)*
<br> [[Code](https://github.com/explosion/projects/tree/v3/benchmarks/ner_embeddings)]

<!--
- [Expulsion from Eden: the saga of the Calauit Safari Island Park](https://www.dropbox.com/s/j36m11rvhbl963e/apeiron2016expulsion.pdf?dl=0) <br> Lester James V. Miranda, “Expulsion from Eden: the saga of the Calauit Safari Island Park,” _APEIRON Student Journal of Philosophy_, no. 8, pp. 201–219, 2016. ISBN: 1533659788.
-->

&nbsp;

---

&nbsp;

### Previous research

I used to be a bioinformatics researcher at the [Furuzuki Neurocomputing Systems Laboratory](https://www.waseda.jp/sem-hflab/nclab/index.html), working on nature-inspired algorithms and proteomics. 

- [Feature Extraction using a Mutually-Competitive Autoencoder for Protein Function Prediction](https://ieeexplore.ieee.org/document/8616230). <u>Lester James V. Miranda</u> and Jinglu Hu, _IEEE International Conference on System, Man, and Cybernetics (SMC)_. IEEE. Miyazaki, Japan. October 2018. 

- [A Deep Learning Approach based on Stacked Denoising Autoencoders for Protein Function Prediction](https://ieeexplore.ieee.org/document/8377699). <u>Lester James V. Miranda</u> and Jinglu Hu, _42nd IEEE Computer Society Signature Conference on Computers, Software, and Applications (COMPSAC)_. IEEE. Tokyo, Japan. July 2018.

- [PySwarms, a research-toolkit for Particle Swarm Optimization in Python](https://joss.theoj.org/papers/10.21105/joss.00433) <br> <u>Lester James V. Miranda</u>, _Journal of Open Source Software_, vol. 3, no. 433, 2018.

I was also involved in research early on during my undergrad:

- [Appliance Recognition using Hall-Effect Sensors and k-Nearest Neighbors for Power Management Systems](https://ieeexplore.ieee.org/document/7847947). <u>Lester James V. Miranda</u>\*, Marian Joice Gutierrez\*, Samuel Matthew Dumlao, and Rosula Reyes, _Proceedings of the 2016 IEEE Region 10 Conference 2016 (TENCON)_. IEEE. Singapore. November 2016. *(&lowast;: equal contributions)*