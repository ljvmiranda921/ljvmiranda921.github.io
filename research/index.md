---
layout: page
title: Research work
description: Research work of Lester James V. Miranda
permalink: /research/
---

<!-- 【[🎓 Google Scholar](https://scholar.google.co.jp/citations?user=2RtnNKEAAAAJ&hl=en)】
【[📚 Semantic Scholar](https://www.semanticscholar.org/author/Lester-James-Validad-Miranda/13614871)】 -->

I'm broadly interested in **data-centric approaches to building language technologies at scale.**
I believe that a careful and systematic understanding of data&mdash; from its collection to its downstream influence on training&mdash; is crucial to build general-purpose language models.

Below are the research themes I'm interested in and some representative publications.
You can check my [**Google Scholar**](https://scholar.google.co.jp/citations?user=2RtnNKEAAAAJ&hl=en) for more updated information.

If you are interested in these types of work, then do not hesitate to [reach out](mailto:ljvmiranda@gmail.com).
I'm happy to discuss research and collaborate!

## Efficient and scalable data collection

Human annotations are costly. How can we reduce this cost while preserving the nuance that human annotators provide? I've explored this in the context of LM post-training, by [routing preference instances to human/LMs](https://arxiv.org/abs/2410.19133) and in [generating synthetic preference data](https://arxiv.org/abs/2411.15124).

- [Hybrid Preferences: Learning to Route Instances for Human vs. AI Feedback](https://arxiv.org/abs/2410.19133)
  <br>_Preprint '24_
  <br><u>Lester James V. Miranda</u>\*, Yizhong Wang\*, Yanai Elazar, Sachin Kumar, Valentina Pyatkin, Faeze Brahman, Noah A. Smith, Hannaneh Hajishirzi, and Pradeep Dasigi.
  <br>[[Code](https://github.com/allenai/hybrid-preferences)] [[MultiPref Dataset](https://huggingface.co/datasets/allenai/multipref)]

- [T&uuml;lu 3: Exploring Frontiers in Open Language Model Post-Training](https://arxiv.org/abs/2411.15124)
  <br>_Preprint '24_
  <br>Nathan Lambert\*, Jacob Morrison\*, Valentina Pyatkin\*, Shenyi Huang\*, Hamish Ivison\*, Faeze Brahman\*, <u>Lester James V. Miranda </u>\*, Alisa Liu, Nouha Dziri, Xinxi Lyu, Yuling Gu, Saumya Malik, Victoria Graf, Jena D. Hwang, Jiangjiang Yang, Ronan Le Bras, Oyvind Tajford, Chris Wilhelm, Luca Soldiani, Noah A. Smith, Yizhong Wang, Pradeep Dasigi, Hannaneh Hajishirzi _(&lowast;: core contributor)_.
  <br>[[Models](https://huggingface.co/collections/allenai/tulu-3-models-673b8e0dc3512e30e7dc54f5)] [[Datasets](https://huggingface.co/collections/allenai/tulu-3-datasets-673b8df14442393f7213f372)] [[Website](https://allenai.org/tulu)]

## Multilingual and equitable NLP

No language should be left behind, especially in data.
I've worked on evaluating [reward models in multilingual settings](https://arxiv.org/abs/2410.15522), curating [datasets for Southeast Asia](https://arxiv.org/abs/2406.10118), and building [large-scale named-entity recognition datasets](https://arxiv.org/abs/2311.09122).

- [M-RewardBench: Evaluating Reward Models in Multilingual Settings](https://arxiv.org/abs/2410.15522)
  <br>_Preprint '24_
  <br>Srishti Gureja\*, <u>Lester James V. Miranda</u>\*, Shayekh bin Islam\*, Rishabh Maheshwary\*, Drishti Sharma, Gusti Winata, Nathan Lambert, Sebastian Ruder, Sara Hooker, and Marzieh Fadaee.
  <br>[[Code](https://github.com/for-ai/aya_rm_multilingual)] [[Dataset](https://huggingface.co/collections/C4AI-Community/multilingual-rewardbench-66dcbf2bfc68bfbb93feebd7)]

- [SEACrowd: A Multilingual Multimodal Data Hub and Benchmark Suite for Southeast Asian Languages](https://aclanthology.org/2024.emnlp-main.296/)
  <br>_EMNLP '24, Preprint '24_
  <br>Holy Lovenia\*, Rahmad Mahendra\*, Salsabil Maulana Akbar\*, <u>Lester James Miranda</u>\*, and 50+ other authors _(&lowast;: major contributor)_.
  <br>[[Catalogue](https://seacrowd.github.io/seacrowd-catalogue)] [[Code](https://github.com/SEACrowd/seacrowd-datahub)]

- [Universal NER: A Gold-Standard Multilingual Named Entity Recognition Benchmark](https://aclanthology.org/2024.naacl-long.243/)
  <br>_NAACL '24, Preprint '23_
  <br>Stephen Mayhew, Terra Blevins, Shuheng Liu, Marek &Scaron;uppa, Hila Gonen, Joseph Marvin Imperial, B&ouml;rje F. Karlsson, Peiqin Lin, Nikola Ljube&scaron;ic&#769;, <u>LJ Miranda</u>, Barbara Plank, Arij Riabi, Yuval Pinter
  <br> [[Dataset](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/GQ8HDL)] [[Website](https://www.universalner.org/)]

## Improving the state of Filipino NLP

I care a lot about representing my language, and I hope to continue doing so by building NLP resources.
I've built [datasets](https://aclanthology.org/2023.sealp-1.2/) and [tooling](https://aclanthology.org/2023.nlposs-1.1/), to name a few&mdash;and still more to come! I've also written a lot about Filipino NLP in this blog.

- [The UD-NewsCrawl Treebank: Reflections and Challenges from a Large-scale Tagalog Syntactic Annotation Project]()
  <br>Angelina A. Aquino\*, <u>Lester James V. Miranda</u>\*, Elsie Marie T. Or\*
  <br>[[Dataset](https://huggingface.co/collections/UD-Filipino/universal-dependencies-for-tagalog-67573d625baa5036fd59b317)]

- [calamanCy: a Tagalog Natural Language Processing Toolkit](https://aclanthology.org/2023.nlposs-1.1/)
  <br>_NLP Open-Source Software (NLP-OSS) Workshop @ EMNLP '23_
  <br> <u>Lester James V. Miranda</u>
  <br> [[Code](https://github.com/ljvmiranda921/calamanCy)] [[Poster](/assets/png/calamancy/poster.png)] [[Video](https://youtu.be/2fbzs1KbFTQ?si=_vKEY11Z1Jzuaxeu)]

- [Developing a Named Entity Recognition Dataset for Tagalog](https://aclanthology.org/2023.sealp-1.2/)
  <br>_Southeast Asian Language Processing (SEALP) Workshop @ IJCNLP-AACL '23_
  <br> <u>Lester James V. Miranda</u>
  <br> [[Code](https://github.com/ljvmiranda921/calamanCy/tree/master/reports/aacl2023/benchmark)] [[Dataset](https://huggingface.co/datasets/ljvmiranda921/tlunified-ner)] [[Video](https://www.youtube.com/watch?v=WAJ8IEIHuiM)]
