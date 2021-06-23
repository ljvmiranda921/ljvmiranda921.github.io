---
layout: post
type: post
title: "Towards data-centric machine learning"
date: 2021-07-30
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [machine learning, andrew ng, data centric, active learning, semi-supervised learning, weak supervision, prodigy, snorkel]
description: |
    Data-centric machine learning shifts the focus from fiddling model
    hyperparameters, to ensuring quality data across all. Here, I discuss
    the trends, challenges, and opportunities to achieve this paradigm.
excerpt: |
    Data-centric machine learning shifts the focus from fiddling model
    hyperparameters, to ensuring quality data across all. Here, I discuss
    the trends, challenges, and opportunities to achieve this paradigm.
---

> Data-centric machine learning shifts the focus from fiddling model
> hyperparameters, to ensuring quality data across all. In this post, I discuss
> the trends, challenges, and opportunities to achieve this paradigm.

<span class="firstcharacter">A</span> few months ago, Andrew Ng [launched his
campaign](https://www.youtube.com/watch?v=06-AZXmwHjo) for a more data-centric
approach to machine learning. This meant having to move away from fiddling models
into ensuring quality data across all. In line with this, he also started
the [Data-Centric AI
competition](https://https-deeplearning-ai.github.io/data-centric-comp/), where
the main challenge is to "increase accuracy by improving the dataset while
keeping the model fixed."

Going into this direction is promising, as **recent trends in the space point to
a data-centric approach:**

* **We're discovering pitfalls for being too fixated on models**: achieving
    state-of-the-art (SOTA) via model-centric approaches often incentivize inane
    practices such as fixing random seeds and selective reporting ([Henderson et
    al, 2019](#henderson2019deeprl) and [Lipton et al,
    2019](#lipton2019trends)). Model results don't often lead to
    understanding, as researchers treat accuracy as a score to be won, and even
    admit to practice HARK-ing ([Bell et al, 2021](#bell2021psych) and [Sculley
    et al, 2018](#sculley2019winner)).[^1] Inasmuch as we want to correct these,
    perhaps a different problem-solving paradigm can also help.

* **Deep learning models are being democratized**: hyper-optimizing models
    become less necessary due to SOTA being more accessible. In NLP, the open
    source community led by [Huggingface](https://huggingface.co/) and
    [spaCy](https://spacy.io/) democratized transformer models to the public
    ([Vaswani, 2017](#vaswani2017attention)). In the private space, OpenAI has
    [started offering access](https://openai.com/blog/openai-api/) to their
    GPT-3 APIs ([Brown et al, 2020](brown2020gpt3)), while cloud platforms like
    Google has made [AutoML available](https://cloud.google.com/automl).
    Model-wise, it has become easier to be successful by just switching models
    or using a paid API.

* **ML is catching-up on software engineering practices**: for the past year,
    we've seen the [boom of software
    tooling](/notebook/2021/05/10/navigating-the-mlops-landscape/) in the
    machine learning space. Dubbed as MLOps, software engineering and DevOps
    practices are being set up to support the ML lifecycle&mdash; we're slowly
    paying off our technical debt ([Sculley, et al, 2015](#sculley2015debt)).
    Albeit a nascent field, we've already seen tools geared towards
    data-versioning, "smart" labelling, and tracking. Data-centric machine
    learning can definitely take advantage of these developments.

As an industry practitioner, I find the data-centric approach appealing. **Data
tend to have a longer lifespan and a larger impact surface area.** Aside from
using it as raw material for training models, you can create visualizations or
dashboards to drive important decisions. With the advent of [open
data](https://en.wikipedia.org/wiki/Open_data), even just the act of storing
and curating it is valuable enough. Models are often susceptible to concept
drift, and is only good on what it was built for ([Tsymbal,
2004](tsymbal2004drift), [Žliobaitė, 2010](zliobaite2010drift), and
[Sambasivan, 2021](sambasivan2021data)).

*So what can be done to improve the quality of our datasets?*

## <a id="optimizing"></a> Optimizing on what you have



## References

* <a id="bell2021pysch">Bell, S.J. and Kampman, O.P.,</a> 2021. Perspectives on Machine Learning from Psychology's Reproducibility Crisis. *arXiv preprint arXiv:2104.08878*.
* <a id="sculley2019winner">Sculley, D., Snoek, J., Wiltschko, A. and Rahimi, A.,</a> 2018. Winner's curse? On pace, progress, and empirical rigor.
* <a id="brown2020gpt3">Brown, T.B., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal, P., Neelakantan, A., Shyam, P., Sastry, G., Askell, A. and Agarwal, S.,</a> 2020. Language models are few-shot learners. *arXiv preprint arXiv:2005.14165*.
* <a id="henderson2019deeprl">Henderson, P., Islam, R., Bachman, P., Pineau, J., Precup, D. and Meger, D.,</a> 2018, April. Deep reinforcement learning that matters. In *Proceedings of the AAAI Conference on Artificial Intelligence* (Vol. 32, No. 1).
* <a id="lipton2019trends">Lipton, Z.C. and Steinhardt, J.,</a> 2019. Research for practice: troubling trends in machine-learning scholarship. *Communications of the ACM*, 62(6), pp.45-53.
* <a id="sambasivan2021data">Sambasivan, N., Kapania, S., Highfill, H., Akrong, D., Paritosh, P. and Aroyo, L.M.,</a> 2021, May. “Everyone wants to do the model work, not the data work”: Data Cascades in High-Stakes AI. In *proceedings of the 2021 CHI Conference on Human Factors in Computing Systems* (pp. 1-15).
* <a id="sculley2015debt">Sculley, D., Holt, G., Golovin, D., Davydov, E., Phillips, T., Ebner, D., Chaudhary, V., Young, M., Crespo, J.F. and Dennison, D.,</a> 2015. Hidden technical debt in machine learning systems. *Advances in neural information processing systems*, 28, pp.2503-2511.
* <a id="tsymbal2004drift">Tsymbal, A.,</a> 2004. The problem of concept drift: definitions and related work. *Computer Science Department, Trinity College Dublin*, 106(2), p.58.
* <a id="vaswani2017attention">Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., Kaiser, L. and Polosukhin, I.,</a> 2017. Attention is all you need. *arXiv preprint arXiv:1706.03762*.
* <a id="zliobaite2010drift">Žliobaitė, I.,</a> 2010. Learning under concept drift: an overview. *arXiv preprint arXiv:1010.4784*.

## Footnotes

[^1]: HARK-ing, refers to the research practice of hypothesizing after the results are known. Norbert Kerr defined it as "presenting a post hoc hypothesis in the introduction of a research report as if it were an a priori hypothesis"
