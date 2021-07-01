---
layout: post
type: post
title: "Towards data-centric machine learning: a literature review"
date: 2021-07-30
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [machine learning, andrew ng, data centric, active learning, semi-supervised learning, weak supervision, prodigy, snorkel]
description: |
    Data-centric machine learning shifts the focus from fiddling model
    hyperparameters, to ensuring quality data across all. This post is a
    literature review on various methods, approaches, and techniques to achieve
    this paradigm.
excerpt: |
    Data-centric machine learning shifts the focus from fiddling model
    hyperparameters, to ensuring quality data across all. This post is a
    literature review on various methods, approaches, and techniques to achieve
    this paradigm.
---

> Data-centric machine learning shifts the focus from fiddling model
> hyperparameters, to ensuring quality data across all. This post is a
> literature review on various methods, approaches, and techniques to achieve
> this paradigm.


<div style="border:3px; border-style:solid; border-color:#828282; padding: 1em; margin: 2em;">
<b>Contents</b><br>
<ul>
    <li><a href="#introduction">Introduction</a></li>
    <li><a href="#methods-review">Methods Review</a></li>
        <details>
        <summary><a href="#q1">Large unlabeled data, absence of an expert</a></summary>
        <ul style="list-style-type: circle">
            <li><a href="#transfer-learning">Transfer learning</a></li>
            <li><a href="#multi-task-learning">Multi-task learning</a></li>
            <li><a href="#semi-supervised-learning">Semi-supervised learning</a></li>
            <li><a href="#crowdsourced-labelling">Crowdsourced labelling</a></li>
        </ul>
        </details>
        <details>
        <summary><a href="#q2">Large unlabeled data, presence of an expert</a></summary>
        <ul style="list-style-type: circle">
            <li>Data assimilation</li>
            <li>Active learning</li>
            <li>Weak supervision</li>
        </ul>
        </details>
        <details>
        <summary><a href="#q3">Large labeled data, presence of an expert</a></summary>
        <ul style="list-style-type: circle">
            <li>Brute-force labelling</li>
            <li>Data augmentation</li>
            <li>Expert systems</li>
        </ul>
        </details>
        <details>
        <summary><a href="#q4">Large labeled data, absence of an expert</a></summary>
        <ul style="list-style-type: circle">
            <li>Confidence learning</li>
            <li>Supervised learning</li>
            <li>Generative models</li>
        </ul>
        </details>
    <li>Synthesis</li>
    <li>Conclusion</li>
</ul>
</div>

<a id="introduction"></a><span class="firstcharacter">A</span> few months ago, Andrew Ng [launched his
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

* **Deep learning models are being democratized**: hyperoptimizing models
    become less necessary due to the SOTA being more accessible. In NLP, the
    open-source community led by [Huggingface](https://huggingface.co/) and
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
    data-versioning, "smart" labelling, and tracking.[^2] Data-centric machine
    learning can definitely take advantage of these developments.

In the industry, a data-centric approach is appealing. **Data tend to have a
longer lifespan and a larger impact surface area.** Aside from using them as
raw materials for training models, one can create other artifacts like dashboards or
visualizations to drive important decisions. With the advent of [open
data](https://en.wikipedia.org/wiki/Open_data), even just the act of storing
and curating it is valuable enough. On the other hand, models are often
susceptible to concept drift, and is only good on what it was built for
([Tsymbal, 2004](tsymbal2004drift), [Žliobaitė, 2010](zliobaite2010drift), and
[Sambasivan, 2021](sambasivan2021data)).

*So what is the general strategy for data-centric machine learning?*

### <a id="optimizing"></a> Optimizing on what you have

Almost all data work, prior to modelling, revolves around two elements: (1) the
domain-expert and (2) their data[set]. It is possible that one exists without the
other, that's why it's important to **optimize on what you have.** If both exist,
then we can think of their relationship as *symbiotic*:

![](/assets/png/data-centric/domain_expert_data.png){:width="460px"}
{: style="text-align: center;"}

Domain experts collect data, and in turn, data inform the expert ([Gennatas,
2020](gennatas2020expert)). Both are enriched in the process: more data is
provided, while the domain expert expands their knowledge of the field[^3].
This virtuous cycle generates insights and decisions for the organization. 

From a modelling perspective, it is much better if the dataset is curated,
i.e., it's *labeled.* This means that meaningful information is attached to a
given set of attributes. It then becomes straightforward to feed it into a
machine learning model:

> For a set of $$N$$ examples $$\{(x_1, y_1), \dots (x_N,
> y_N)\}$$ where $$x_i$$ is a feature vector and $$y_i$$ is its label, we can
> learn a function $$g: X \rightarrow Y$$ such that $$g$$ returns the $$y$$ value
> giving the highest score $$g(x) = argmax_y f(x,y)$$ (where $$f$$ is a scoring
> function).

In an ideal state, you have plenty of domain experts and labeled data. But in
reality, there are some challenges that organizations face when they lack one or
the other:

* **Little to no domain experts**: it then becomes difficult to label
    everything with quality. In addition, one can fall into the trap of blindly
    applying ML techniques without the relevant insight and data quality
    assurance an expert can provide. 

* **Little to no labeled data**: this time, it's challenging to train supervised
    models if the use-case demands for it. Labelling datasets can also become
    tedious, with or without the presence of domain experts. However, ML has
    progressed enough to understand unsupervised data, so it's still possible
    to extract value on the given dataset.

We can plot the presence or absence of domain experts and labeled data
in a **quadrant representing four (4) general directions for a data-centric
approach.** Fortunately, the field has matured quite enough that we can
describe tactical procedures for each direction as illustrated below: 

![](/assets/png/data-centric/magic_quadrant.png){:width="520px"}
{: style="text-align: center;"}

In the next section, I will survey approaches that fall under each quadrant.
This may range from methods that you might see in a typical ML research
conference, to tools used in an organization. 

## Methods review

We'll go through each quadrant in the figure above. We'll first start with the
upper-left corner, then go clockwise. This section will go over representative
techniques that fall under each zone.[^4] For each technique, I will provide a
short description, a mathematical definition (if relevant), and sample
applications.

### <a id="q1"></a> Large unlabeled data, absence of an expert

This scenario may look daunting at first, but there already exist a number of
techniques to get past this barrier. First, we'll look into three model-based
approaches&mdash; transfer learning, multi-task learning, and semi-supervised
learning&mdash; that **relax the dependency on labeled data by taking advantage
of existing or solved tasks.** Then, we'll explore various tools on
crowd-sourced labelling to **increase our labeled dataset.**

<!--
Most approaches listed here take advantage of existing or solved tasks. Transfer
learning applies the latent knowledge gained from another data distribution to
another, multi-task learning makes use of signals from a related task, and
semi-supervised learning combines both supervised and unsupervised approaches to
solve the problem. 
-->


#### Transfer learning

<!-- main definition of transfer learning -->
Transfer learning involves the transfer of knowledge across domains or tasks.
It challenges the common assumption that both training and test data should
always be drawn from the same feature space and distribution. It is possible to
transfer ([Pan and Yang, 2010](#pan2009survey)):
* *Instances*: reuse labeled data from a source domain into the target domain. 
* *Features as representations*: obtain a feature representation that minimizes
    the difference between source and target domains and the model error.
* *Model parameters*: get shared parameters or priors between source and target
    models. 
* *Relational knowledge*: create a mapping of relational knowledge between
    source and target. 

<!-- maybe we can add some excalidraw figures ? -->

Transfer learning is often an umbrella term, encompassing different techniques
based on the availability of labels in the source and target domains. In this
review, we specifically mean "transductive transfer learning," where the source
domain labels are available but the target domain labels are not ([Pan and
Yang, 2010](#pan2009survey), [Weiss et al, 2016](#weiss2016survey), and [Zhuang
et al, 2020](#zhuang2020survey)).[^5] We can then define this approach as:

> Given a source domain $$\mathcal{D}_{S}$$ and learning task
> $$\mathcal{T}_{S}$$, a target domain $$\mathcal{D}_{T}$$ and a learning task
> $$T_{T}$$, *transfer learning* aims to help improve the learning of the
> target predictive function $$f_{T}(\cdot)$$ in $$\mathcal{D}_{T}$$ using the
> knowledge in $$\mathcal{D}_S$$ and $$\mathcal{T}_{S}$$, where
> $$\mathcal{D}_{S} \neq \mathcal{D}_{T}$$ or $$\mathcal{T}_{S} \neq
> \mathcal{T}_{T}$$ ([Pan and Yang, 2010](#pan2009survey))
 

<!-- mathematical definition -->


<!-- 
common applications
-->



#### Multi-task learning


#### Semi-supervised learning


#### Crowdsourced labelling



### <a id="q2"></a> Large unlabeled data, presence of an expert


### <a id="q3"></a> Small unlabeled data, presence of an expert


### <a id="q4"></a> Small unlabeled data, absence of an expert



## References

* <a id="bell2021pysch">Bell, S.J. and Kampman, O.P.,</a> 2021. Perspectives on Machine Learning from Psychology's Reproducibility Crisis. *arXiv preprint arXiv:2104.08878*.
* <a id="sculley2019winner">Sculley, D., Snoek, J., Wiltschko, A. and Rahimi, A.,</a> 2018. Winner's curse? On pace, progress, and empirical rigor.
* <a id="brown2020gpt3">Brown, T.B., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal, P., Neelakantan, A., Shyam, P., Sastry, G., Askell, A. and Agarwal, S.,</a> 2020. Language models are few-shot learners. *arXiv preprint arXiv:2005.14165*.
* <a id="gennatas2020expert">Gennatas, E.D., Friedman, J.H., Ungar, L.H., Pirracchio, R., Eaton, E., Reichmann, L.G., Interian, Y., Luna, J.M., Simone, C.B., Auerbach, A. and Delgado, E.,</a> 2020. Expert-augmented machine learning. Proceedings of the National Academy of Sciences, 117(9), pp.4571-4577.
* <a id="henderson2019deeprl">Henderson, P., Islam, R., Bachman, P., Pineau, J., Precup, D. and Meger, D.,</a> 2018, April. Deep reinforcement learning that matters. In *Proceedings of the AAAI Conference on Artificial Intelligence* (Vol. 32, No. 1).
* <a id="lipton2019trends">Lipton, Z.C. and Steinhardt, J.,</a> 2019. Research for practice: troubling trends in machine-learning scholarship. *Communications of the ACM*, 62(6), pp.45-53.
* <a id="pan2009survey">Pan, S.J. and Yang, Q.</a>, 2009. A survey on transfer learning. *IEEE Transactions on knowledge and data engineering*, 22(10), pp.1345-1359.
* <a id="sambasivan2021data">Sambasivan, N., Kapania, S., Highfill, H., Akrong, D., Paritosh, P. and Aroyo, L.M.,</a> 2021, May. “Everyone wants to do the model work, not the data work”: Data Cascades in High-Stakes AI. In *proceedings of the 2021 CHI Conference on Human Factors in Computing Systems* (pp. 1-15).
* <a id="sculley2015debt">Sculley, D., Holt, G., Golovin, D., Davydov, E., Phillips, T., Ebner, D., Chaudhary, V., Young, M., Crespo, J.F. and Dennison, D.,</a> 2015. Hidden technical debt in machine learning systems. *Advances in neural information processing systems*, 28, pp.2503-2511.
* <a id="tsymbal2004drift">Tsymbal, A.,</a> 2004. The problem of concept drift: definitions and related work. *Computer Science Department, Trinity College Dublin*, 106(2), p.58.
* <a id="vaswani2017attention">Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., Kaiser, L. and Polosukhin, I.,</a> 2017. Attention is all you need. *arXiv preprint arXiv:1706.03762*.
* <a id="weiss2016survey">Weiss, K., Khoshgoftaar, T.M. and Wang, D.</a>, 2016. A survey of transfer learning. *Journal of Big data*, 3(1), pp.1-40.
* <a id="zhuang2020survey">Zhuang, F., Qi, Z., Duan, K., Xi, D., Zhu, Y., Zhu, H., Xiong, H. and He, Q.</a>, 2020. A comprehensive survey on transfer learning. *Proceedings of the IEEE*, 109(1), pp.43-76.
* <a id="zliobaite2010drift">Žliobaitė, I.,</a> 2010. Learning under concept drift: an overview. *arXiv preprint arXiv:1010.4784*.

## Footnotes

[^1]: HARK-ing, refers to the research practice of hypothesizing after the results are known. Norbert Kerr defined it as "presenting a post hoc hypothesis in the introduction of a research report as if it were an a priori hypothesis"
[^2]: Examples of labelling tools: [Prodigy](https://prodi.gy/), [Snorkel](https://snorkel.ai/), [Label Studio](https://labelstud.io/). Examples of data-versioning and tracking (lineage) tools: [MLFlow](https://mlflow.org/), [DVC](https://dvc.org/), [Pachyderm](https://www.pachyderm.com/). 
[^3]: That's why I still think that ML practitioners who came from a non-ML field (psychologists, sociologists, economists, etc.) are at an advantage: they have an intimate knowledge of the field, and see ML as a tool.
[^4]: At first, I was tempted to put an overarching label or tagline on each group. However, I realized that it may be more confusing because some approaches don't have an explicit relationship to one another.
[^5]: Different authors suggest different scopes for transfer learning. Some even argue that unsupervised learning can be a form of transfer learning. It is confusing across literature. For a more timely categorization, I refer you to [Zhuang et al., 2020](#zhuang2020survey).
