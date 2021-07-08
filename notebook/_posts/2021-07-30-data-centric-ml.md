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
            <li><a href="#1-transfer-learning">Transfer learning</a></li>
            <li><a href="#2-multi-task-learning">Multi-task learning</a></li>
            <li><a href="#3-semi-supervised-learning">Semi-supervised learning</a></li>
            <li><a href="#4-crowdsourced-labelling">Crowdsourced labelling</a></li>
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
<i>Note: This is a long article unintended to be read in one
sitting. I highly recommend using the table of contents above to aid you in
navigating the page. Enjoy!</i>
</div>

<a id="introduction"></a><span class="firstcharacter">A</span> few months ago, Andrew Ng [launched his
campaign](https://www.youtube.com/watch?v=06-AZXmwHjo) for a more data-centric
approach to machine learning. This meant having to move away from fiddling models
into ensuring quality data across all. In line with this, he also started
the [Data-Centric AI
competition](https://https-deeplearning-ai.github.io/data-centric-comp/), with
the main challenge of "increasing accuracy by improving the dataset while
keeping the model fixed."

Going into this direction is promising, as **recent trends in the space
encourage a data-centric approach:**

* **We're discovering pitfalls for being too fixated on models**: achieving
    state-of-the-art (SOTA) via model-centric approaches often incentivize
    inane practices such as fixing random seeds and selective reporting
    ([Henderson et al, 2019](#henderson2019deeprl) and [Lipton et al,
    2019](#lipton2019trends)). Model results don't often lead to understanding,
    as researchers treat accuracy as a score to be won, and even admit to
    practice HARK-ing ([Bell et al, 2021](#bell2021psych) and [Sculley et al,
    2018](#sculley2019winner)).[^1] Inasmuch as researchers should correct
    these, perhaps a different problem-solving paradigm can also help.

* **Deep learning models are being democratized**: hyperoptimizing models
    become less necessary due to the SOTA being more accessible. In NLP, the
    open-source community led by [Huggingface](https://huggingface.co/) and
    [spaCy](https://spacy.io/) democratized transformer ([Vaswani,
    2017](#vaswani2017attention)) models to the public. In the private space,
    OpenAI has [started offering access](https://openai.com/blog/openai-api/)
    to their GPT-3 ([Brown et al, 2020](#brown2020gpt3)) APIs, while cloud
    platforms like Google has made [AutoML
    available](https://cloud.google.com/automl).  Model-wise, it has become
    easier to be successful by just switching models or using a paid API.

* **ML is catching-up on software engineering practices**: for the past year,
    we've seen the [rapid growth of software
    tooling](/notebook/2021/05/10/navigating-the-mlops-landscape/) in the
    machine learning space. Dubbed as MLOps, software engineering and DevOps
    practices are being set up to support the ML lifecycle&mdash; we're slowly
    paying off our technical debt ([Sculley, et al, 2015](#sculley2015debt)).
    Albeit a nascent field, we've already seen tools geared towards
    data-versioning, "smart" labelling, and tracking.[^2] Data-centric machine
    learning is poised to take advantage of these developments.

In the industry, a data-centric approach is appealing. **Data tend to have a
longer lifespan and a larger impact surface area.** Aside from using them as
raw materials for training models, one can create other artifacts like dashboards or
visualizations to drive important decisions. With the advent of [open
data](https://en.wikipedia.org/wiki/Open_data), even just the act of storing
and curating it is valuable enough. On the other hand, models are often
susceptible to concept drift, and is only good on what it was built for
([Tsymbal, 2004](#tsymbal2004drift), [Žliobaitė, 2010](#zliobaite2010drift), and
[Sambasivan, 2021](#sambasivan2021data)).

*So what is the general strategy for data-centric machine learning?*

### <a id="optimizing"></a> Optimizing on what you have

Almost all data work, prior to modelling, revolves around two elements: (1) the
domain-expert and (2) their data[set]. It is possible that one exists without the
other, that's why it's important to **optimize on what you have.** If both exist,
then we can think of their relationship as *symbiotic*:

![](/assets/png/data-centric/domain_expert_data.png){:width="460px"}
{: style="text-align: center;"}

Domain experts collect data, and in turn, data inform the expert ([Gennatas,
2020](#gennatas2020expert)). Both are enriched in the process: more data is
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

We can plot the presence or absence of the two in a 2x2 matrix, where each
quadrant represents strategies for a data-centric approach. Fortunately, the
field has matured quite enough that we can describe tactical procedures for
each strategy as illustrated below: 

![](/assets/png/data-centric/magic_quadrant.png){:width="520px"}
{: style="text-align: center;"}

In the next section, I will survey approaches that fall under each quadrant.
They may range from methods that you might see in a typical ML research
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

![](/assets/png/data-centric/q1.png){:width="520px"}
{: style="text-align: center;"}

#### 1. Transfer learning

**Transfer learning involves the transfer of knowledge across domains or
tasks.** It challenges the common assumption that both training and test data
should always be drawn from the same feature space and distribution. According
to [Pan and Yang (2009)](#pan2009survey), it is possible to transfer:
* *Instances*: reuse labeled data from a source domain into the target domain. 
* *Features as representations*: obtain a feature representation that minimizes
    the difference between source and target domains and the model error.
* *Model parameters*: get shared parameters or priors between source and target
    models. 
* *Relational knowledge*: create a mapping of relational knowledge between
    source and target. 

Transfer learning is often an umbrella term, encompassing different techniques
based on the availability of labels in the source and target domains. They may
either be transductive or inductive, and may also involve an unsupervised
approach ([Zhuang et al, ](#zhuang2020survey)). Nevertheless, we can define 
transfer learning as:

> Given a source domain $$\mathcal{D}_{S}$$ and learning task
> $$\mathcal{T}_{S}$$, a target domain $$\mathcal{D}_{T}$$ and a learning task
> $$T_{T}$$, *transfer learning* aims to help improve the learning of the
> target predictive function $$f_{T}(\cdot)$$ in $$\mathcal{D}_{T}$$ using the
> knowledge in $$\mathcal{D}_S$$ and $$\mathcal{T}_{S}$$, where
> $$\mathcal{D}_{S} \neq \mathcal{D}_{T}$$ or $$\mathcal{T}_{S} \neq
> \mathcal{T}_{T}$$ ([Pan and Yang, 2009](#pan2009survey)).

![](/assets/png/data-centric/transfer_learning_setup.png){:width="460px"}  
<br />
**Figure:** A typical transfer learning setup. *Knowledge* can be in the form
of learned weights or feature representations among others.
{: style="text-align: center;"}
 
One of the most common applications of transfer learning is to take a
pretrained model from a source domain, and finetune it on the instances of a
target domain. In computer vision, it is not unusual to use an architecture
like AlexNet ([Krizhevsky et al, 2012](#krizhevsky2012alexnet)), pretrain it on
ImageNet ([Deng et al, 2009](#deng2009imagenet)), and replace the last fully
connected layers with new ones from the target domain. The modified
architecture is then finetuned on target domain labels, and is reported to
perform better in classification tasks ([Masqood et al,
2019](#masqood2019alzheimer), [Shin et al, 2016](#shin2016computer) and [Byra
et al, 2019](#byra2019knee)). 

On the other hand, it is also possible to just use latent features from SOTA
architectures (usually pretrained on ImageNet) and train a new model based on
them. According to [Ruder (2017a)](#ruder2017survey), the ImageNet task has been
a good proxy for most computer vision problems, as we've witnessed it excel in
related tasks by just transferring the same knowledge.

We've also seen similar approaches in natural language processing (NLP)
([Ruder, 2019a](#ruder2019survey)).  For example, domain adaptation and
sequential transfer learning techniques have been widespread in the transformer
family of models, allowing us to reuse them in different kinds of task.
Furthermore, this approach is being democratized more and more by Huggingface,
allowing finetuning through a Python API. 

Lastly, it is possible to use the pretrained model *as-is* for the task at
hand. It then becomes a good baseline model for comparison before finetuning to
the target domain task. 

#### 2. Multi-task learning

**Multi-task learning involves the learning of two or more related tasks
simultaneously** ([Ruder, 2017b](#ruder2017mtl) and [Zhuang et al,
2020](#zhuang2020survey)). Its goal is to "improve generalization by leveraging
domain-specific information found in the training signals of related tasks
([Caruana, 1997](#caruana1997mtl))." 

According to [Ruder (2017b)](#ruder2017mtl), multi-task learning comes in many
forms. This include joint learning ([Yamada, et al, 2016](#yamada2016joint)),
learning to learn ([Thrun and Pratt, 2012](#thrun2012learning)), and learning
with auxiliary tasks. Even so, as long as one is already optimizing more than one loss
function (or using an auxiliary task), then it is already considered multi-task
learning. 

In addition, the taxonomy differs across literature: some consider multi-task
learning as a branch of transfer learning ([Ruder, 2019b](#ruder2019thesis)),
while others consider it a different but related approach altogether ([Zhuang
et al, 2020](#zhuang2020survey) and [Zhang and Yang,
2017](#zhang2017mtlsurvey)).

Given these differences, there are two major multi-task learning setups for
deep neural networks: *hard* and *soft* parameter sharing. Both of which are
based on how the parameters are shared across hidden layers:
* *Hard parameter sharing:* the hidden layers are shared across tasks, with
 task-specific layers near the output. This approach reduces overfitting in
 the order of the number of tasks ([Baxter, 1997](#baxter1997mtl)).

    ![](/assets/png/data-centric/hard_parameter_sharing.png){:width="340px"}  
    <br />
    **Figure:** Hard parameter setup with shared hidden layers and separate
    task-specific layers (redrawn from [Ruder (2017b)](#ruder2017mtl)).
    {: style="text-align: center;"}

* *Soft parameter sharing:* here, each task has its own distinct model. The parameters are constrained by a cost function, sometimes the $$l_2$$ distance ([Duong et al](#duong2015soft)) or the trace norm ([Yang and Hosepdales, 2017](#yang2016soft)).

    ![](/assets/png/data-centric/soft_parameter_sharing.png){:width="510px"}  
    <br />
    **Figure:** Soft parameter setup where parameters are constrained using a
    cost function (redrawn from [Ruder (2017b)](#ruder2017mtl)).
    {: style="text-align: center;"}

Multi-task learning works because it forces models to regularize and generalize
better. According to [Ruder (2017b)](#ruder2017mtl) this is achieved by[^5]:
* *Implicit data augmentation:* multi-task learning increases the sample size
    during training. Because we're training on more than two tasks, the model
    is forced to find a more general representation as compared to just
    learning a single task.
* *Attention focusing:* other tasks can provide additional evidence for a
    feature's relevance especially if the task is noisy or the dataset is limited.
* *Eavesdropping:* in some cases, a subset of features can be easier to learn
    by some task more than others. Through multi-task learning, it is possible
    to allow the sharing of information across tasks to ease difficulty.
    [Abu-Mostafa (1990)](#abu1990hints) has done this by using *hints*.
* *Representation bias:* multi-task learning encourages representations that
    other tasks prefer. If 4 out of 5 tasks prefer a feature $$\mathcal{F}$$,
    then it will be expressed more in the model. This feedback loop encourages
    generalization, allowing it to perform well in newer tasks.

Lastly, [Zhang and Yang (2017)](#zhang2017mtlsurvey) compiled a list of
multi-task learning applications across various domains, including
bioinformatics, natural-language processing, and computer vision among many
others.  It's a comprehensive list, where each application is organized not
only by domain but also by specific approach (e.g., task-related learning,
feature representation, etc.).

#### 3. Semi-supervised learning

**Semi-supervised learning is a combination of both supervised and unsupervised
learning techniques.** It takes advantage of the information found in the
labels or cluster to improve performance ([Zhu, 2005](#zhu2005semisupervised)).
For a supervised classification task, we use the implicit cluster information
found from unlabeled data. For unsupervised classification, we harness the
existing label-information found in the dataset ([Van Engelen and Hoos,
2020](#vanengelen2020survey)).

Semi-supervised learning works under the condition that the distribution of the
input, $$p(x)$$, contains some information about its output, $$p(y|x)$$ ([Van
Engelen and Hoos, 2020](#vanengelen2020survey)). Although this is often true in
real-world datasets, we can't explicitly define the interactions between input
and output data distributions. Hence, the following assumptions are made
([Chapelle, et al, 2006](#chapelle2006semisupervised)):

* *Smoothness assumption:* points that are closer to one another are more
    likely to belong to the same class. Its advantage in semi-supervised
    learning is that it can be applied transitively to unlabelled data.
* *Low-density assumption:* a classifier's decision boundary should preferably
    pass through low-density regions of the input space. This works
    hand-in-hand with the smoothness assumption.
* *Manifold assumption:* this assumes that the input space is composed of
    low-dimensional substructures called *manifolds*, and that points lying on
    the same manifold should have the same label.


<!-- inductive vs transductive methods 
* talk about differences
* talk about representative approaches (self-training, graph-based)
-->

[Van Engelen and Hoos (2020)](#vanengelen2020survey) classified semi-supervised
learning techniques into two distict approaches: inductive or transductive.[^7]
These two categories aren't unique to semi-supervised learning, for they have
been used in other ML fields like transfer learning ([Pan and Yang,
2009](#pan2009survey)).

<!-- deep learning based semisupervised learning -->



<!-- applications -->



#### 4. Crowdsourced labelling



### <a id="q2"></a> Large unlabeled data, presence of an expert


### <a id="q3"></a> Small unlabeled data, presence of an expert


### <a id="q4"></a> Small unlabeled data, absence of an expert

## Synthesis

## Conclusion







## References

* <a id="abu1990hints">Abu-Mostafa, Y.S.</a>, 1990. Learning from hints in neural networks. Journal of complexity, 6(2), pp.192-198.
* <a id="baxter1997mtl">Baxter, J.</a>, 1997. A Bayesian/information theoretic model of learning to learn via multiple task sampling. *Machine learning*, 28(1), pp.7-39.
* <a id="bell2021pysch">Bell, S.J. and Kampman, O.P.,</a> 2021. Perspectives on Machine Learning from Psychology's Reproducibility Crisis. *arXiv preprint arXiv:2104.08878*.
* <a id="byra2019knee">Byra, M., Wu, M., Zhang, X., Jang, H., Ma, Y.J., Chang, E.Y., Shah, S. and Du, J.</a>, 2020. Knee menisci segmentation and relaxometry of 3D ultrashort echo time cones MR imaging using attention U‐Net with transfer learning. *Magnetic resonance in medicine*, 83(3), pp.1109-1122.
* <a id="brown2020gpt3">Brown, T.B., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal, P., Neelakantan, A., Shyam, P., Sastry, G., Askell, A. and Agarwal, S.,</a> 2020. Language models are few-shot learners. *arXiv preprint arXiv:2005.14165*.
* <a id="caruana1997mtl">Caruana, R.</a>, 1997. Multitask learning. *Machine learning*, 28(1), pp.41-75.
* <a id="chapelle2006semisupervised">Chapelle, O., Scholkopf, B. and Zien, A.</a>, 2006. *Semi-supervised learning*. 2006. Cambridge, Massachusettes: The MIT Press View Article.
* <a id="deng2009imagenet">Deng, J., Dong, W., Socher, R., Li, L.J., Li, K. and Fei-Fei, L.</a>, 2009, June. Imagenet: A large-scale hierarchical image database. In 2009 IEEE conference on computer vision and pattern recognition (pp. 248-255). Ieee.
* <a id="duong2015soft">Duong, L., Cohn, T., Bird, S. and Cook, P.</a>, 2015, July. Low resource dependency parsing: Cross-lingual parameter sharing in a neural network parser. In *Proceedings of the 53rd annual meeting of the Association for Computational Linguistics and the 7th international joint conference on natural language processing* (volume 2: short papers) (pp. 845-850).
* <a id="gennatas2020expert">Gennatas, E.D., Friedman, J.H., Ungar, L.H., Pirracchio, R., Eaton, E., Reichmann, L.G., Interian, Y., Luna, J.M., Simone, C.B., Auerbach, A. and Delgado, E.,</a> 2020. Expert-augmented machine learning. Proceedings of the National Academy of Sciences, 117(9), pp.4571-4577.
* <a id="henderson2019deeprl">Henderson, P., Islam, R., Bachman, P., Pineau, J., Precup, D. and Meger, D.,</a> 2018, April. Deep reinforcement learning that matters. In *Proceedings of the AAAI Conference on Artificial Intelligence* (Vol. 32, No. 1).
* <a id="krizhevsky2012alexnet">Krizhevsky, A., Sutskever, I. and Hinton, G.E.</a>, 2012. Imagenet classification with deep convolutional neural networks. *Advances in neural information processing systems*, 25, pp.1097-1105.
* <a id="lipton2019trends">Lipton, Z.C. and Steinhardt, J.,</a> 2019. Research for practice: troubling trends in machine-learning scholarship. *Communications of the ACM*, 62(6), pp.45-53.
* <a id="masqood2019alzheimer">Maqsood, M., Nazir, F., Khan, U., Aadil, F., Jamal, H., Mehmood, I. and Song, O.Y.</a>, 2019. Transfer learning assisted classification and detection of Alzheimer’s disease stages using 3D MRI scans. *Sensors*, 19(11), p.2645.
* <a id="pan2009survey">Pan, S.J. and Yang, Q.</a>, 2009. A survey on transfer learning. *IEEE Transactions on knowledge and data engineering*, 22(10), pp.1345-1359.
* <a id="ruder2019thesis">Ruder, S.</a>, 2019. *Neural transfer learning for natural language processing* (Doctoral dissertation, NUI Galway).
* <a id="ruder2019survey">Ruder, S., Aylien</a>. The State of Transfer Learning in NLP [online]. 2019 [cit. 2019-08-19]. Available: [https://ruder.io/state-of-transfer-learning-in-nlp/](https://ruder.io/state-of-transfer-learning-in-nlp/)
* <a id="ruder2017mtl">Ruder, S.</a>, 2017. An overview of multi-task learning in deep neural networks. *arXiv preprint arXiv:1706.05098*.
* <a id="ruder2017survey">Ruder, S., Aylien</a>. Transfer Learning: Machine Learning’s Next Frontier [online]. 2017 [cit. 2017-07-04]. Available: [https://ruder.io/transfer-learning/index.html](https://ruder.io/transfer-learning/index.html)
* <a id="sambasivan2021data">Sambasivan, N., Kapania, S., Highfill, H., Akrong, D., Paritosh, P. and Aroyo, L.M.,</a> 2021, May. “Everyone wants to do the model work, not the data work”: Data Cascades in High-Stakes AI. In *proceedings of the 2021 CHI Conference on Human Factors in Computing Systems* (pp. 1-15).
* <a id="sculley2015debt">Sculley, D., Holt, G., Golovin, D., Davydov, E., Phillips, T., Ebner, D., Chaudhary, V., Young, M., Crespo, J.F. and Dennison, D.,</a> 2015. Hidden technical debt in machine learning systems. *Advances in neural information processing systems*, 28, pp.2503-2511.
* <a id="sculley2019winner">Sculley, D., Snoek, J., Wiltschko, A. and Rahimi, A.,</a> 2018. Winner's curse? On pace, progress, and empirical rigor.
* <a id="shin2016computer">Shin, H.C., Roth, H.R., Gao, M., Lu, L., Xu, Z., Nogues, I., Yao, J., Mollura, D. and Summers, R.M.</a>, 2016. Deep convolutional neural networks for computer-aided detection: CNN architectures, dataset characteristics and transfer learning. *IEEE transactions on medical imaging*, 35(5), pp.1285-1298.
* <a id="tan2018survey">Tan, C., Sun, F., Kong, T., Zhang, W., Yang, C. and Liu, C.</a>, 2018, October. A survey on deep transfer learning. In *International conference on artificial neural networks* (pp. 270-279). Springer, Cham.
* <a id="thrun2012learning">Thrun, S. and Pratt, L</a>. eds., 2012. *Learning to learn*. Springer Science & Business Media.
* <a id="tsymbal2004drift">Tsymbal, A.,</a> 2004. The problem of concept drift: definitions and related work. *Computer Science Department, Trinity College Dublin*, 106(2), p.58.
* <a id="vanengelen2020survey">Van Engelen, J.E. and Hoos, H.H.</a>, 2020. A survey on semi-supervised learning. *Machine Learning*, 109(2), pp.373-440.
* <a id="vaswani2017attention">Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., Kaiser, L. and Polosukhin, I.,</a> 2017. Attention is all you need. *arXiv preprint arXiv:1706.03762*.
* <a id="weiss2016survey">Weiss, K., Khoshgoftaar, T.M. and Wang, D.</a>, 2016. A survey of transfer learning. *Journal of Big data*, 3(1), pp.1-40.
* <a id="yamada2016joint">Yamada, I., Shindo, H., Takeda, H. and Takefuji, Y.</a>, 2016. Joint learning of the embedding of words and entities for named entity disambiguation. *arXiv preprint arXiv:1601.01343*.
* <a id="yang2016soft">Yang, Y. and Hospedales, T.</a>, 2016. Deep multi-task representation learning: A tensor factorisation approach. *arXiv preprint arXiv:1605.06391*.
* <a id="zhang2017mtlsurvey">Zhang, Y. and Yang, Q.</a>, 2017. A survey on multi-task learning. *arXiv preprint arXiv:1707.08114*.
* <a id="zhu2005semisupervised">Zhu, X.J.</a>, 2005. *Semi-supervised learning literature survey*.
* <a id="zhuang2020survey">Zhuang, F., Qi, Z., Duan, K., Xi, D., Zhu, Y., Zhu, H., Xiong, H. and He, Q.</a>, 2020. A comprehensive survey on transfer learning. *Proceedings of the IEEE*, 109(1), pp.43-76.
* <a id="zliobaite2010drift">Žliobaitė, I.,</a> 2010. Learning under concept drift: an overview. *arXiv preprint arXiv:1010.4784*.

<!--

## Postscript

*Phew!* This is probably the longest blogpost I've written (if you can even
call it that). At first, I was inspired by the blogs of [Lilian
Weng](https://lilianweng.github.io/lil-log/) and [Sebastian
Ruder](https://ruder.io/), that I wanted to write a literature review of my
own. I may have overdone it, as it spans a huge breadth of techniques under a
large umbrella. Nevertheless, I'm happy with what I've written, and what you
see here is a big compilation of my study notes in this space.

As for the topic, data-centric machine learning and the techniques involved in
it piqued my curiosity. Insufficient samples, clerical errors, and unreliable
sources are just a few among many challenges seen in industrial machine learning.
Inasmuch as I wanted to approach it with tools and platforms that exist today, I
am also excited to endow an academic approach to it, hence the tone.

Researching this took me two full months, mostly working on evenings and
weekends. However, I had some practice writing *very* long-form content, as you
may have seen in "Navigating the MLOps Landscape" and "How to use Jupyter
Notebooks." I'd probably do this again in the future, but I'll definitely lower
my scope.

-->


## Footnotes

[^1]: HARK-ing, refers to the research practice of hypothesizing after the results are known. Norbert Kerr defined it as "presenting a post hoc hypothesis in the introduction of a research report as if it were an a priori hypothesis"
[^2]: Examples of labelling tools: [Prodigy](https://prodi.gy/), [Snorkel](https://snorkel.ai/), [Label Studio](https://labelstud.io/). Examples of data-versioning and tracking (lineage) tools: [MLFlow](https://mlflow.org/), [DVC](https://dvc.org/), [Pachyderm](https://www.pachyderm.com/). 
[^3]: That's why I still think that ML practitioners who came from a non-ML field (psychologists, sociologists, economists, etc.) are at an advantage: they have an intimate knowledge of the field, and see ML as a tool.
[^4]: At first, I was tempted to put an overarching label or tagline on each group. However, I realized that it may be more confusing because some approaches don't have an explicit relationship to one another.
[^5]: Different authors suggest different scopes for transfer learning. Some even argue that unsupervised learning can be a form of transfer learning. It is confusing across literature. For a more timely categorization, I refer you to [Zhuang et al., 2020](#zhuang2020survey).
[^6]: I decided to drop the fifth reason, *regularization*, because I believe that it is the core of how multi-task learning works. All four reasons lead to regularization, and consequently, better model generalization.
[^7]: These two distinctions aren't unique to semi-supervised learning. Inductive and tranductive machine learning are often used to separate ML methods based on whether  they produce a generalized model or not. 
