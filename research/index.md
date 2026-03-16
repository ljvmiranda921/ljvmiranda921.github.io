---
layout: page
title: Research
description: Research work of Lester James V. Miranda
permalink: /research/
---

My field is in natural language processing and machine learning.
I'm broadly interested in **building cheap, fast, and useful language models that can be deployed at the edge**.
I believe that one of the key unlocks for this to happen is getting access to high-quality training signals,
and so I explore creative (or as we say in Tagalog, ma-[diskarte](https://pap.ph/assets/files/journals/defining-diskarte-exploring-cognitive-processes-personality-traits-and-social-constraints-in-crea.pdf)) ways to obtain these signals under extreme constraints.

Below is a selection of work that reflects my current interests.
My work has been published in top NLP conferences such as ACL, NAACL, and EMNLP.
You can also check my [Google Scholar](https://scholar.google.co.jp/citations?user=2RtnNKEAAAAJ&hl=en) or [Semantic Scholar](https://www.semanticscholar.org/author/Lester-James-Validad-Miranda/13614871) for a complete list.
I'm [open for collaborations](mailto:ljvm2@cam.ac.uk) and always excited about potential internships or research visits.

<!-- The following are the research themes I am interested in, along with some representative publications. -->

_Keywords: data-centric NLP, multilinguality, resources & evaluation_

- [Polyglot Teachers: Evaluating Models for Multilingual Synthetic Data Generation]()
  <br>_Preprint '26_
  <br><b>Lester James V. Miranda</b>, Ivan Vuli&#263;, Anna Korhonen
  <br>[Code](https://github.com/cambridgeltl/polyglot-teachers) / [Collection](https://huggingface.co/datasets/edgeml-ltl/polyglot-teachers) 

- [Hybrid Preferences: Learning to Route Instances for Human vs. AI Feedback](https://aclanthology.org/2025.acl-long.355/)
  <br>_ACL '25_
  <br><b>Lester James V. Miranda\*</b>, Yizhong Wang\*, Yanai Elazar, Sachin Kumar, Valentina Pyatkin, Faeze Brahman, Noah A. Smith, Hannaneh Hajishirzi, and Pradeep Dasigi
  <br>[Code](https://github.com/allenai/hybrid-preferences) / [Dataset](https://huggingface.co/datasets/allenai/multipref) / [Slides](https://drive.google.com/file/d/1jyp_8TH2rAWofkoTEAEpT97hGwEvj5gS/view?usp=sharing) / [Poster](https://drive.google.com/file/d/1QWadXHVxHT9F09CqXnjWO1Zu1dLr4oek/view?usp=drive_link) / [Video](https://youtu.be/6i8Pa5qqxAI?si=4i9-5tWcEbLpDwz9)

- [M-RewardBench: Evaluating Reward Models in Multilingual Settings](https://aclanthology.org/2025.acl-long.3/)
  <br>_ACL '25_
  <br>Srishti Gureja\*, <b>Lester James V. Miranda\*</b>, Shayekh bin Islam\*, Rishabh Maheshwary\*, Drishti Sharma, Gusti Winata, Nathan Lambert, Sebastian Ruder, Sara Hooker, and Marzieh Fadaee
  <br>[Code](https://github.com/for-ai/aya_rm_multilingual) / [Dataset](https://huggingface.co/collections/C4AI-Community/multilingual-rewardbench-66dcbf2bfc68bfbb93feebd7) / [Slides](https://drive.google.com/file/d/15bjZ7sVVPjtR02L0x1eIH5sfQfR_Y0P-/view?usp=drive_link) / [Poster](https://drive.google.com/file/d/1GTLRaH3w9-EEePPMbryiUQteEnFyx71V/view?usp=drive_link) / [Video](https://youtu.be/pgXm9etIpH4?si=H71Kr-1z5fphow11)

I also care a lot about advancing Filipino NLP and representing my native language.
This involves:
- developing benchmarks such as [FilBench-Eval](https://aclanthology.org/2025.emnlp-main.127/) (EMNLP '25),
- building resources such as [UD-NewsCrawl](https://aclanthology.org/2025.acl-long.357/) (ACL '25) and [TLUnified-NER](https://aclanthology.org/2023.sealp-1.2) (SEALP '23), and
- creating open-source tools like [calamanCy](https://aclanthology.org/2023.nlposs-1.1/) (NLP-OSS '23).

I [write a lot about Filipino NLP](/filipino-nlp) in this blog and organize researchers on collaborative projects through the [FilBench collective](https://filbench.github.io).

<!-- ## Data-centric NLP

One of the key unlocks for equitable NLP is access to high quality training signals. 
My research aims to find resourceful, creative&mdash;or as we say in Tagalog, ma-*diskarte*&mdash;ways to obtain these signals despite extreme constraints.
This involves synthetic data generation [PG-Score, T&uuml;lu3] or cost-efficient annotation [HyPER].

- [Polyglot Teachers: Evaluating Models for Multilingual Synthetic Data Generation]()
  <br>_Preprint '26_
  <br><b>Lester James V. Miranda</b>, Ivan Vuli&#263;, Anna Korhonen
  <br>[Code](https://github.com/cambridgeltl/polyglot-teachers) / [Collection](https://huggingface.co/datasets/edgeml-ltl/polyglot-teachers) / [Slides]() / [Poster]() / [Video]()

- [**Hy**brid **P**ref**er**ences: Learning to Route Instances for Human vs. AI Feedback](https://aclanthology.org/2025.acl-long.355/)
  <br>_ACL '25 Main_
  <br><b>Lester James V. Miranda\*</b>, Yizhong Wang\*, Yanai Elazar, Sachin Kumar, Valentina Pyatkin, Faeze Brahman, Noah A. Smith, Hannaneh Hajishirzi, and Pradeep Dasigi
  <br>[Code](https://github.com/allenai/hybrid-preferences) / [Dataset](https://huggingface.co/datasets/allenai/multipref) / [Slides](https://drive.google.com/file/d/1jyp_8TH2rAWofkoTEAEpT97hGwEvj5gS/view?usp=sharing) / [Poster](https://drive.google.com/file/d/1QWadXHVxHT9F09CqXnjWO1Zu1dLr4oek/view?usp=drive_link) / [Video](https://youtu.be/6i8Pa5qqxAI?si=4i9-5tWcEbLpDwz9)

- [T&uuml;lu 3: Exploring Frontiers in Open Language Model Post-Training](https://arxiv.org/abs/2411.15124)
  <br>_COLM '25_
  <br>Nathan Lambert\*, Jacob Morrison\*, Valentina Pyatkin\*, Shenyi Huang\*, Hamish Ivison\*, Faeze Brahman\*, <b>Lester James V. Miranda\*</b>, Alisa Liu, Nouha Dziri, Xinxi Lyu, Yuling Gu, Saumya Malik, Victoria Graf, Jena D. Hwang, Jiangjiang Yang, Ronan Le Bras, Oyvind Tajford, Chris Wilhelm, Luca Soldiani, Noah A. Smith, Yizhong Wang, Pradeep Dasigi, Hannaneh Hajishirzi _(&lowast;: core contributor)_.
  <br>[Models](https://huggingface.co/collections/allenai/tulu-3-models-673b8e0dc3512e30e7dc54f5) / [Datasets](https://huggingface.co/collections/allenai/tulu-3-datasets-673b8df14442393f7213f372) / [Website](https://allenai.org/tulu) -->

<!-- ## Advancing the Global Access Frontier -->

<!-- Equitable language model development requires improving capabilities while expanding access. -->
<!-- My research aims to ensure that next-generation large language models serve the needs of communities in the Global South.
I created a conceptual framework [GA Frontier] that frames deployment as a problem of access along several constraints: data, infrastructure, and readiness.
I do research that attempts to relax these constraints. -->

<!-- - [Advancing the Global Access Frontier: Language Model Deployment as a Problem of Access]()
  <br>_Preprint '26_
  <br><b>Lester James V. Miranda</b>, Roi Reichart, Anna Korhonen
  <br>[Slides]() / [Video]() -->


<!-- - [FilBench: Can LLMs Generate and Understand Filipino?](https://aclanthology.org/2025.emnlp-main.127/)
  <br>_EMNLP '25 Main_
  <br><b>Lester James V. Miranda\*</b>, Elyanah Aco\*, Conner Manuel\*, Jan Christian Blaise Cruz, Joseph Marvin Imperial
  <br>[Code](https://github.com/filbench/filbench-eval) / [Website](https://huggingface.co/spaces/UD-Filipino/filbench-leaderboard) -->

<!-- 
- [SEACrowd: A Multilingual Multimodal Data Hub and Benchmark Suite for Southeast Asian Languages](https://aclanthology.org/2024.emnlp-main.296/)
  <br>_EMNLP '24 Main_
  <br>Holy Lovenia\*, Rahmad Mahendra\*, Salsabil Maulana Akbar\*, <b>Lester James Miranda\*</b>, and 50+ other authors _(&lowast;: major contributor)_.
  <br>[Code](https://github.com/SEACrowd/seacrowd-datahub) / [Website](https://seacrowd.github.io/seacrowd-catalogue)



- [FilBench: Can LLMs Generate and Understand Filipino?](https://aclanthology.org/2025.emnlp-main.127/)
  <br>_EMNLP '25 Main_
  <br><b>Lester James V. Miranda\*</b>, Elyanah Aco\*, Conner Manuel\*, Jan Christian Blaise Cruz, Joseph Marvin Imperial
  <br>[Code](https://github.com/filbench/filbench-eval) / [Website](https://huggingface.co/spaces/UD-Filipino/filbench-leaderboard)

- [The UD-NewsCrawl Treebank: Reflections and Challenges from a Large-scale Tagalog Syntactic Annotation Project](https://aclanthology.org/2025.acl-long.357/)
  <br>_ACL '25 Main_
  <br>Angelina A. Aquino\*, <b>Lester James V. Miranda\*</b>, Elsie Marie T. Or\*
  <br>[Dataset](https://huggingface.co/collections/UD-Filipino/universal-dependencies-for-tagalog-67573d625baa5036fd59b317) / [Slides](https://drive.google.com/file/d/1LGm4v9ZsSftDHI9vkl9mj1BYBSZZX_uA/view?usp=drive_link) / [Poster](https://drive.google.com/file/d/16ONq_xmRrUgvALirWEwX0BpZnn1OtqwH/view?usp=drive_link) / [Video](https://youtu.be/W4cONaL_otI?si=DgfmF0_7zkOmI_ma)

<!-- - [Universal NER: A Gold-Standard Multilingual Named Entity Recognition Benchmark](https://aclanthology.org/2024.naacl-long.243/)
  <br>_NAACL '24 Main_
  <br>Stephen Mayhew, Terra Blevins, Shuheng Liu, Marek &Scaron;uppa, Hila Gonen, Joseph Marvin Imperial, B&ouml;rje F. Karlsson, Peiqin Lin, Nikola Ljube&scaron;ic&#769;, <b>LJ Miranda</b>, Barbara Plank, Arij Riabi, Yuval Pinter
  <br> [[Dataset](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/GQ8HDL)] [[Website](https://www.universalner.org/)] -->

<!-- - [calamanCy: a Tagalog Natural Language Processing Toolkit](https://aclanthology.org/2023.nlposs-1.1/)
  <br>_NLP Open-Source Software (NLP-OSS) Workshop @ EMNLP '23_
  <br> <b>Lester James V. Miranda</b>
  <br> [Code](https://github.com/ljvmiranda921/calamanCy) / [Poster](https://drive.google.com/file/d/1Q_-4Lf9ZL9ZCYS5aWPhRnCfHPhGwlBp6/view?usp=drive_link) / [Video](https://youtu.be/2fbzs1KbFTQ?si=_vKEY11Z1Jzuaxeu)

- [Developing a Named Entity Recognition Dataset for Tagalog](https://aclanthology.org/2023.sealp-1.2/)
  <br>_Southeast Asian Language Processing (SEALP) Workshop @ IJCNLP-AACL '23_
  <br> <b>Lester James V. Miranda</b>
  <br> [Code](https://github.com/ljvmiranda921/calamanCy/tree/master/reports/aacl2023/benchmark) / [Dataset](https://huggingface.co/datasets/ljvmiranda921/tlunified-ner) / [Slides](https://drive.google.com/file/d/1QVbW7Myou6U6cSqrlz5p_35Sl__008kG/view?usp=drive_link) / [Video](https://www.youtube.com/watch?v=WAJ8IEIHuiM) --> 
