---
layout: page
title: Research Work
description: Research work of Lester James V. Miranda
permalink: /research/
---

<!-- 【[🎓 Google Scholar](https://scholar.google.co.jp/citations?user=2RtnNKEAAAAJ&hl=en)】
【[📚 Semantic Scholar](https://www.semanticscholar.org/author/Lester-James-Validad-Miranda/13614871)】 -->

My field is in natural language processing and machine learning.
I'm broadly interested in **building language technologies that are equitable and useful, through data.**
I believe that a careful and systematic understanding of data&mdash; from its collection to its downstream influence on training&mdash; is crucial to build general-purpose language models.

The following are the research themes I am interested in, along with some representative publications.
<!-- I am eager to explore these themes individually or at their intersection. -->
My work has been published in top NLP conferences such as ACL, NAACL, and EMNLP.
Finally, you can also check my [**Google Scholar**](https://scholar.google.co.jp/citations?user=2RtnNKEAAAAJ&hl=en) for a complete and up-to-date list.

_Keywords: data-centric AI, multilinguality, resources & evaluation_

<!-- If you are interested in these types of work, then do not hesitate to [reach out](mailto:ljvmiranda@gmail.com).
I'm happy to discuss research and collaborate! -->

## Collecting high-quality data for LM training

What constitutes high-quality data? And how can we efficiently and scalably collect them?
I've explored these questions in the context of acquiring post-training data by examining human factors in preference annotation such as in HyPER, and devising new techniques in data synthesis and generation as seen in T&uuml;lu 3.

- [**Hy**brid **P**ref**er**ences: Learning to Route Instances for Human vs. AI Feedback](https://arxiv.org/abs/2410.19133)
  <br>_ACL '25 Main_
  <br><b>Lester James V. Miranda\*</b>, Yizhong Wang\*, Yanai Elazar, Sachin Kumar, Valentina Pyatkin, Faeze Brahman, Noah A. Smith, Hannaneh Hajishirzi, and Pradeep Dasigi.
  <br>[[Code](https://github.com/allenai/hybrid-preferences)] [[Dataset](https://huggingface.co/datasets/allenai/multipref)]

- [T&uuml;lu 3: Exploring Frontiers in Open Language Model Post-Training](https://arxiv.org/abs/2411.15124)
<<<<<<< HEAD
  <br>_COLM '25_
  <br>Nathan Lambert\*, Jacob Morrison\*, Valentina Pyatkin\*, Shenyi Huang\*, Hamish Ivison\*, Faeze Brahman\*, <u>Lester James V. Miranda </u>\*, Alisa Liu, Nouha Dziri, Xinxi Lyu, Yuling Gu, Saumya Malik, Victoria Graf, Jena D. Hwang, Jiangjiang Yang, Ronan Le Bras, Oyvind Tajford, Chris Wilhelm, Luca Soldiani, Noah A. Smith, Yizhong Wang, Pradeep Dasigi, Hannaneh Hajishirzi _(&lowast;: core contributor)_.
=======
  <br>_Preprint '24_
  <br>Nathan Lambert\*, Jacob Morrison\*, Valentina Pyatkin\*, Shenyi Huang\*, Hamish Ivison\*, Faeze Brahman\*, <b>Lester James V. Miranda\*</b>, Alisa Liu, Nouha Dziri, Xinxi Lyu, Yuling Gu, Saumya Malik, Victoria Graf, Jena D. Hwang, Jiangjiang Yang, Ronan Le Bras, Oyvind Tajford, Chris Wilhelm, Luca Soldiani, Noah A. Smith, Yizhong Wang, Pradeep Dasigi, Hannaneh Hajishirzi _(&lowast;: core contributor)_.
>>>>>>> emnlp-dreams
  <br>[[Models](https://huggingface.co/collections/allenai/tulu-3-models-673b8e0dc3512e30e7dc54f5)] [[Datasets](https://huggingface.co/collections/allenai/tulu-3-datasets-673b8df14442393f7213f372)] [[Website](https://allenai.org/tulu)]

## Resources for multilingual and equitable NLP

No language should be left behind, especially in data.
I'm motivated to pursue research that ensures that the next generation of state-of-the-art LLMs cater to languages beyond English; by improving training data quality and building faithful multilingual benchmarks.

- [M-RewardBench: Evaluating Reward Models in Multilingual Settings](https://arxiv.org/abs/2410.15522)
  <br>_ACL '25 Main_
  <br>Srishti Gureja\*, <b>Lester James V. Miranda\*</b>, Shayekh bin Islam\*, Rishabh Maheshwary\*, Drishti Sharma, Gusti Winata, Nathan Lambert, Sebastian Ruder, Sara Hooker, and Marzieh Fadaee.
  <br>[[Code](https://github.com/for-ai/aya_rm_multilingual)] [[Dataset](https://huggingface.co/collections/C4AI-Community/multilingual-rewardbench-66dcbf2bfc68bfbb93feebd7)]

- [SEACrowd: A Multilingual Multimodal Data Hub and Benchmark Suite for Southeast Asian Languages](https://aclanthology.org/2024.emnlp-main.296/)
  <br>_EMNLP '24 Main_
  <br>Holy Lovenia\*, Rahmad Mahendra\*, Salsabil Maulana Akbar\*, <b>Lester James Miranda\*</b>, and 50+ other authors _(&lowast;: major contributor)_.
  <br>[[Catalogue](https://seacrowd.github.io/seacrowd-catalogue)] [[Code](https://github.com/SEACrowd/seacrowd-datahub)]

Within this theme, I also care a lot about **improving the state of Filipino NLP** and representing my native language.
This involves building resources for training and evaluation.
I also write a lot about Filipino NLP in this blog.

- [The UD-NewsCrawl Treebank: Reflections and Challenges from a Large-scale Tagalog Syntactic Annotation Project]()
  <br>_ACL '25 Main_
  <br>Angelina A. Aquino\*, <b>Lester James V. Miranda\*</b>, Elsie Marie T. Or\*
  <br>[[Dataset](https://huggingface.co/collections/UD-Filipino/universal-dependencies-for-tagalog-67573d625baa5036fd59b317)]

<!-- - [Universal NER: A Gold-Standard Multilingual Named Entity Recognition Benchmark](https://aclanthology.org/2024.naacl-long.243/)
  <br>_NAACL '24 Main_
  <br>Stephen Mayhew, Terra Blevins, Shuheng Liu, Marek &Scaron;uppa, Hila Gonen, Joseph Marvin Imperial, B&ouml;rje F. Karlsson, Peiqin Lin, Nikola Ljube&scaron;ic&#769;, <b>LJ Miranda</b>, Barbara Plank, Arij Riabi, Yuval Pinter
  <br> [[Dataset](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/GQ8HDL)] [[Website](https://www.universalner.org/)] -->

- [calamanCy: a Tagalog Natural Language Processing Toolkit](https://aclanthology.org/2023.nlposs-1.1/)
  <br>_NLP Open-Source Software (NLP-OSS) Workshop @ EMNLP '23_
  <br> <b>Lester James V. Miranda</b>
  <br> [[Code](https://github.com/ljvmiranda921/calamanCy)] [[Poster](/assets/png/calamancy/poster.png)] [[Video](https://youtu.be/2fbzs1KbFTQ?si=_vKEY11Z1Jzuaxeu)]

- [Developing a Named Entity Recognition Dataset for Tagalog](https://aclanthology.org/2023.sealp-1.2/)
  <br>_Southeast Asian Language Processing (SEALP) Workshop @ IJCNLP-AACL '23_
  <br> <b>Lester James V. Miranda</b>
  <br> [[Code](https://github.com/ljvmiranda921/calamanCy/tree/master/reports/aacl2023/benchmark)] [[Dataset](https://huggingface.co/datasets/ljvmiranda921/tlunified-ner)] [[Video](https://www.youtube.com/watch?v=WAJ8IEIHuiM)]
