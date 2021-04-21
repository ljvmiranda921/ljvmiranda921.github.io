---
layout: post
type: post
title: "Navigating the landscape of MLOps tools (Part 2: The Ecosystem)"
date: 2021-05-15
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [machine learning, ml, mlops, software engineering, ml engineering, mle, data science, data engineering, mlops tools]
description: |
    The MLOps ecosystem is confusing! New tools pop-up almost every
    week&mdash;it's hard to keep up!  Here, I'll try to navigate the
    ever-growing MLOps tools landscape. In Part Two, I'll deep-dive into the
    tooling ecosystem.
excerpt: |
    The MLOps ecosystem is confusing! New tools pop-up almost every
    week&mdash;it's hard to keep up!  Here, I'll try to navigate the
    ever-growing MLOps tools landscape. In Part Two, I'll deep-dive into the
    tooling ecosystem.
---

> This is the second of a three-part blog post on the MLOps landscape. Here,
> I'll discuss the ecosystem itself, and the frameworks and tools I
> encountered. You'll find Part One [in this link](/notebook/2021/05/10/navigating-the-mlops-landscape) and Part Three [here](/notebook/2021/05/20/navigating-the-mlops-landscape-part-3).


<span class="firstcharacter">P</span>reviously, we tried to answer the
question: "who will benefit from MLOps?" This brought us to our two personas,
the ML researcher and the software engineer. Despite working closely together,
their dynamic has a tendency to produce friction as seen in their wants, needs,
and frustrations.

Upon closer inspection, their interaction can be modeled similarly to the machine
learning lifecycle, which consists of two loops interlocked with one another:

<!-- two cycles coming together -->
![](/assets/png/mlops-shop/ml-lifecycle.png){:width="680px"}  
{: style="text-align: center;"}

**The ML lifecycle will serve as a lens as we navigate the MLOps landscape.** As
we've mentioned in the [previous
post](/notebook/2021/05/10/navigating-the-mlops-landscape), a good MLOps tool
should provide the needs, answer wants, and quell the frustrations of our
researchers and engineers.

> A good MLOps tool should provide [our researchers' and engineers'] needs,
> answer their wants, and quell their frustrations.

We will continue the analysis in this section, as we dive-deep into the MLOps
landscape, and examine the tools and frameworks present in each area.


## Contents

To recap, this is a **three-part blogpost where I attempt to navigate the MLOPs
landscape**. I'll be focusing on the commercial side, i.e., the tools,
startups, and frameworks that I've seen while I answer three key questions:

* [**Who/what will
    benefit?**](/notebook/2021/05/10/navigating-the-mlops-landscape): we'll set the stage
    by asking who will benefit from adopting these tools. Here, I'll introduce
    my version of the  ML lifecycle. 
* [**What do you want?**](#what-do-you-want): I'll describe a framework for 
   categorizing MLOps tools, and outline a specific adoption strategy for each group.
* [**What do I recommend?**](/notebook/2021/05/20/navigating-the-mlops-landscape-part-3): I'll list down some
    decision frameworks I recommend based from experience and research.

![](/assets/png/mlops-shop/banner_00.png){:width="640px"}  
{: style="text-align: center;"}



## What do you want?

![](/assets/png/mlops-shop/banner_02.png){:width="640px"}  
{: style="text-align: center;"}

In this section, we will survey the landscape of MLOps tools, and see how we
can best navigate through it. We can map the terrain by grouping our tools
into the following categories:

* **Software-focused or model-focused**: describes the type of artifact it
    helps produce. The former involves typical artifacts an engineer
    encounters outside ML, whereas the latter is centered around a trained model.
* **Piecemeal or all-in-one**: describes the scope of a tool. Piecemeal only
    affects one or two processes in the lifecycle, whereas all-in-one attempts to
    cover it end-to-end.

Together, we can combine them into a graph like this:

![](/assets/png/mlops-shop/ml-landscape-setup.png){:width="640px"}  
{: style="text-align: center;"}

Interestingly, each quadrant represents a particular category of tools:

![](/assets/png/mlops-shop/ml-landscape-quads.png){:width="640px"}  
{: style="text-align: center;"}

I describe the top quadrants as **platforms**. They usually provide an
integrated, all-in-one space that covers most of the developer experience.  On
the other hand, the bottom quadrants can be thought of as **specialized
tools**. They consist of software [modular
enough](https://en.wikipedia.org/wiki/Unix_philosophy) to be integrated into any
workflow.

For each quadrant, we have, in clockwise order:
* [**Cloud Platforms**](#cloud-platforms): at its core, a group of services that provides storage
     and compute capabilities in an Internet-based data center.
* [**Machine Learning Platforms**](#machine-learning-platforms): provides an end-to-end experience that
    affects the majority of a researcher's machine learning workflow.
* [**Specialized ML Tools**](#specialized-ml-tools): includes a variety of custom tools that affect how
    a researcher performs a particular machine learning task.
* [**Standard SWE Tools**](#standard-swe-tools): the standard software toolkit the engineers use, even
    outside the context of machine learning. 

Let's closely examine each quadrant, and get representative samples from it. 
Note that the examples are highly-arbitrary&mdash; most of which I encountered
in my day-job, or something that just piqued my interest from the news.

### Cloud platforms

The first quadrant involves tools that serve the whole ML lifecycle, especially
in the creation of data products such as web apps, dashboards, and more. 

![](/assets/png/mlops-shop/ml-landscape-cloud-platforms.png){:width="640px"}  
{: style="text-align: center;"}

As we
go *left*, the tools generalize to any kind of software, and as we move
*right*, they cater more to producing  machine learning models.


| Category                         | Examples                                       | My Field Notes                                                                                                              |
|----------------------------------|------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| General Cloud Providers          | AWS, GCP, Azure, etc.                          | A mainstay to any medium to large-sized company. Provides compute and storage for various applications. |
| Vendor AI Platform | Sagemaker, GCP AI, Azure ML       | A subset of services from your cloud vendor that caters to various components of the ML lifecycle.                          |
| Data-focused Providers           | Cloudera, Paperspace CORE, etc.                | Provides a range of services geared towards big data. Application may not necessarily be about ML.  |
| ML Infrastructure Providers      | Paperspace Gradient, Floydhub, Domino | Provides infrastructure catering to ML experiments and deployment                                                           |


### Machine learning platforms

This group of tools is one of the hardest to categorize because each almost
bleeds to one another. If the number of use-cases exceeds two to three, I tend
to consider them as all-in-one platforms. As you move *right*, the artifacts
produced tend to specialize on ML models, and as you move *up*, the number of
supported ML processes increases.

![](/assets/png/mlops-shop/ml-landscape-ml-platforms.png){:width="640px"}  
{: style="text-align: center;"}

One common pattern is that these tools tend to think of the ML lifecycle as
[direct-acyclic graphs (DAGs)](https://en.wikipedia.org/wiki/Directed_acyclic_graph). They mostly differ on the type of process they support: tracking, versioning, etc.

| Category                | Examples                            | My Field Notes                                                                                                                                         |
|-------------------------|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| High-coverage platforms | Valohai, DAGsHub, ClearML, Polyaxon | This includes platforms that supports multiple components of the ML lifecycle. They are almost a self-serve framework with minimal infra requirements. |
| ML Project Frameworks   | Kedro, MLFlow, Metaflow, Flyte      | Provides a unifying API for data science teams to improve collaboration, and smoothen the experience from experimentation to production.               |
| ML Task Orchestrators   | Kubeflow, Metaflow, Flyte           | Provides a framework for treating each ML process as a node in a graph that can be run in an underlying infrastructure.                                |

Another common pattern, funnily-enough, is the use of the word *-flow*. To
clear it up, here's the difference between Kubeflow, MLFlow, and Metaflow:
* Kubeflow is a *collection of open-source tools* that aims to run ML
    processes on top of Kubernetes. It has a tool for hyperparameter
    optimization ([Katib](https://github.com/kubeflow/katib)), serving
    ([Fairing](https://github.com/kubeflow/fairing),
    [KFServing](https://github.com/kubeflow/kfserving)), and pipelining
    ([Pipelines](https://github.com/kubeflow/pipelines)).
* MLFlow is *a framework for doing ML experiments*. It's most notable use-case
    is on [logging and tracking
    results](https://mlflow.org/docs/latest/tracking.html). Lately it's
    adopting more use-cases such as [organizing
    projects](https://mlflow.org/docs/latest/projects.html) and
    [models](https://mlflow.org/docs/latest/model-registry.html). [You can use
    MLFlow within
    Kubeflow](https://medium.com/geekculture/enhancing-kubeflow-with-mlflow-8983373d0cac)&mdash;I
    don't see them as competitors.
* Metaflow is a *task-orchestration* tool that works at the code-level,
    meaning, you need to write Metaflow-specific code for it to run (think Airflow
    or Dagster). However, it's built with ML experiments in mind as reflected
    in its API. 




### Specialized ML tools


### Standard SWE tools



## Conclusion


## What's Next

* [Navigating the MLOps Landscape (Part 3: The Strategies)](/notebook/2021/05/20/navigating-the-mlops-landscape-part-3)

If you like this, you'll enjoy:

* [How to use Jupyter Notebooks in 2020 (Part 2: Ecosystem growth)](/notebook/2020/03/16/jupyter-notebooks-in-2020-part-2/)
* [How to use Jupyter Notebooks in 2020 (Part 1: the data science
    landscape)](/notebook/2020/03/06/jupyter-notebooks-in-2020)
* [Navigating the MLOps Landscape (Part 1: The Lifecycle)](/notebook/2021/05/10/navigating-the-mlops-landscape)



## Resources

* <a id="huyen2020sysdesign">Huyen, Chip</a> (2020). "CS 329S: Machine Learning
    Systems Design". In: *stanford-css329s.github.io*
* <a id="ratner2019mlsys">Ratner, Alexander, Alistarh, Dan, Alonso, Gustavo et al</a> (2019). "MLSys: The New
    Frontier of Machine Learning Systems". In: *arXiv:1904.03257 [cs.LG]*
* <a id="sculley2015debt">Sculley, G. Holt, D. Golovin, E. Davydov, T.
     Phillips, D. Ebner, V. Chaudhary, M. Young, J. Crespo, and D. Dennison</a>,
     "Hidden technical debt in machine learning systems", in *Advances in Neural
     Information Processing Systems* 28: Annual Conference on Neural Information
     Processing Systems 2015, December 7-12, 2015, Montreal, Quebec, Canada, 2015,
     pp. 2503–2511. [Online]. Available:
     [http://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems](http://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems
)
* <a id="zinkevich2018rules">Zinkevich, Martin</a>. (2017). "Rules of machine learning:
    best practices for ML Engineering". Available: [https://developers.google.com/machine-learning/guides/rules-of-ml](https://developers.google.com/machine-learning/guides/rules-of-ml
)
