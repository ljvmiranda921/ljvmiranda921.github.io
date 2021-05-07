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
    In Part Two of "Navigating the MLOps landscape," I'll deep-dive into the
    ecosystem in order to understand how each tool relate to one another.
excerpt: |
    In Part Two of "Navigating the MLOps landscape," I'll deep-dive into the
    ecosystem in order to understand how each tool relate to one another.
---

> This is the second of a three-part blog post on the MLOps landscape. Here,
> I'll discuss the ecosystem itself, and the frameworks and tools I
> encountered. You'll find Part One [in this link](/notebook/2021/05/10/navigating-the-mlops-landscape) and Part Three [here](/notebook/2021/05/30/navigating-the-mlops-landscape-part-3).


<span class="firstcharacter">P</span>reviously, we tried to answer the
question: "who will benefit from MLOps?" This brought us to our two personas,
the ML researcher and the software engineer. Despite working closely together,
there are often gaps in their dynamic as seen in their wants, needs, and
frustrations.

Upon closer inspection, their interaction can be modeled similarly to the machine
learning lifecycle, which consists of two loops interlocked together:

<!-- two cycles coming together -->
![](/assets/png/mlops-shop/ml-lifecycle.png){:width="680px"}  
{: style="text-align: center;"}

**The ML lifecycle will serve as our lens in navigating the MLOps landscape.** As
we've mentioned in the [previous
post](/notebook/2021/05/10/navigating-the-mlops-landscape), a good MLOps tool
should provide the needs, address the wants, and quell the frustrations of our
researchers and engineers.

> A good MLOps tool should provide [our researchers' and engineers'] needs,
> answer their wants, and quell their frustrations.

We will continue our analysis, this time diving deep  into the MLOps landscape,
while examining the tools and frameworks present in each area.


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
* [**What do I recommend?**](/notebook/2021/05/30/navigating-the-mlops-landscape-part-3): I'll list down some
    decision frameworks I recommend based from experience and research.

![](/assets/png/mlops-shop/banner_00.png){:width="640px"}  
{: style="text-align: center;"}

<p style="border:3px; border-style:solid; border-color:#FF0000; padding: 1em;">
<b>A word of note</b><br>
I'm still finishing my draft for Part 3. It will be published at the end of the month. The link above for "What do I recommend" will not work. Thanks for your patience!</p>

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

I describe the top quadrants as **platforms**[^1]. They usually provide an
integrated, all-in-one space that covers most of the developer experience.  On
the other hand, the bottom quadrants can be thought of as **specialized
tools**. They consist of software that is [modular
enough](https://en.wikipedia.org/wiki/Unix_philosophy) to be integrated into any
workflow.

For each quadrant, we have, in clockwise order:
1. [**Cloud Platforms**](#1-cloud-platforms): at its core, a group of services that provides storage
     and compute capabilities in an Internet-based data center.
2. [**Machine Learning Platforms**](#2-machine-learning-platforms): provides an end-to-end experience that
    affects the majority of a researcher's machine learning workflow.
3. [**Specialized ML Tools**](#3-specialized-ml-tools): includes a variety of custom tools that affect how
    a researcher performs a particular machine learning task.
4. [**Standard SWE Tools**](#4-standard-swe-tools): the standard software toolkit engineers use, even
    outside the context of machine learning. 

Let's closely examine and get representative samples for each quadrant. 
Note that the examples are highly-arbitrary&mdash; most of which I encountered
in my day-job, or something that just piqued my interest from the news.

### 1. Cloud platforms

The first quadrant involves tools that serve the whole ML lifecycle, especially
in the creation of data products such as web apps, dashboards, and more. 

![](/assets/png/mlops-shop/ml-landscape-cloud-platforms.png){:width="640px"}  
{: style="text-align: center;"}

As we go *left*, the tools generalize to any kind of software artifact, and as
we move *right*, they cater more to producing  machine learning models.


| Category                         | Examples                                       | My Field Notes                                                                                                              |
|----------------------------------|------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| General Cloud Providers          | AWS, GCP, Azure, etc.                          | A mainstay in any medium to large-sized company. Provides compute and storage for various applications. |
| Vendor AI Platform | Sagemaker, GCP AI, Azure ML       | A subset of services from a cloud vendor that caters to various components of the ML lifecycle.                          |
| Big Data IaaS           | Cloudera, Paperspace CORE, etc.                | Provides a range of services geared towards big data. Application may not necessarily be about ML.  |
| ML-focused IaaS | Paperspace Gradient, Floydhub, Domino | Provides infrastructure for ML experimentation and deployment                                                           |

Notice that most technologies found in this quadrant include IaaS
[(Infrastructure-as-a-Service)](https://en.wikipedia.org/wiki/Infrastructure_as_a_service)
providers. Since compute and storage is generic enough, it can generalize to
any type of application. An ML-focused IaaS may provision special requirements
for machine learning applications, such as access to powerful GPUs, TPUs, and the like.


### 2. Machine learning platforms

This set of tools is one of the hardest to cluster because their features
often overlap. Note that if the number of use-cases exceeds two
to three, I tend to consider them as all-in-one platforms. 

As you move *right*, the artifacts produced tend to specialize on ML models,
and as you move *up*, the number of supported ML processes increases.

![](/assets/png/mlops-shop/ml-landscape-ml-platforms.png){:width="640px"}  
{: style="text-align: center;"}

One common pattern is that these tools tend to think of the ML lifecycle as
[direct-acyclic graphs
(DAGs)](https://en.wikipedia.org/wiki/Directed_acyclic_graph). They take
advantage of this structure for various lifecycle operations such as tracking,
execution, and versioning to name a few.

| Category                | Examples                            | My Field Notes                                                                                                                                         |
|-------------------------|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| High-coverage SaaS | Valohai, DAGsHub, ClearML, Polyaxon | This includes platforms that supports multiple components of the ML lifecycle. They are almost a self-serve framework with minimal infrastructure requirements. |
| ML Project Frameworks   | Kedro, MLFlow, Metaflow, Flyte      | Provides a unifying API for data science teams to improve collaboration, and smoothen the experience from experimentation to production.               |
| ML Task Orchestrators   | Kubeflow, Metaflow, Flyte           | Provides a framework for treating each ML process as a node in a graph that can be run in an underlying infrastructure.                                |

Another common pattern I found, funnily-enough, is the use of the word *-flow*. To
clear it up, here's the difference between Kubeflow, MLFlow, and Metaflow:
* Kubeflow is a *collection of open-source tools* that aims to run ML
    processes on top of Kubernetes. It has a tool for hyperparameter
    optimization ([Katib](https://github.com/kubeflow/katib)), serving
    ([Fairing](https://github.com/kubeflow/fairing),
    [KFServing](https://github.com/kubeflow/kfserving)), and pipelining
    ([Pipelines](https://github.com/kubeflow/pipelines)).
* MLFlow is *a framework for doing ML experiments*. Notable use-cases
    include [logging and tracking
    ](https://mlflow.org/docs/latest/tracking.html). Lately it's adopting more
    use-cases such as [project](https://mlflow.org/docs/latest/projects.html) and
    [model](https://mlflow.org/docs/latest/model-registry.html) organization. [You can use
    MLFlow within
    Kubeflow](https://medium.com/geekculture/enhancing-kubeflow-with-mlflow-8983373d0cac)&mdash;I
    don't see them as competitors.
* Metaflow is a *task-orchestration* framework. You need to write Metaflow-specific code for it to run (think
    Airflow or Dagster). However, it's built with ML experiments in mind as reflected in its API. 


### 3. Specialized ML tools

This group caters to specific aspects of the ML lifecycle. I decided to just
group all single-component tools together. For example,
[Deepnote](https://deepnote.com/) impacts the notebook workflow, while
[Prodigy](https://prodi.gy/) and [Optuna](https://optuna.org/) affect
data-annotation and hyperparameter-optimization respectively.

![](/assets/png/mlops-shop/ml-landscape-specialized-ml.png){:width="640px"}  
{: style="text-align: center;"}

As we move *right*, the tools usually affect models, and as we move *left*,
they affect data. This is why data-labelling and versioning tools are
on the left, and notebook & hyperparameter-optimization tools are on the right.



| Category                  | Examples                        | My Field Notes                                                                                                                                                            |
|---------------------------|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Experimentation Platforms | Comet AI, Weights and Biases    | Provides a platform for experimentation and tracking model lineage. They often lack pipelining or orchestration, but make it up with a powerful experimentation platform. |
| Data version control   | DVC, Pachyderm                  | Includes tools for data versioning, management, and tracking. They're impact is data-heavy, and are often offered in tandem with a pipelining tool                        |
| Single-component ML tools | Optuna, Prodigy, Deepnote, etc. | These are highly-specialized ML tools that cover a variety of use-cases such as hyperparameter-optimization, data labelling, or notebook services.                        |

What I like about this category is that they can usually serve as drop-in
replacements for a specific workflow. Sure, its scope is smaller than
all-in-one platforms, but they *may* be easier to integrate.


### 4. Standard SWE tools

This suite of tools can be found in almost any software engineer's
toolbox. They're used even outside the context of ML, yet any ML pipeline that
involves productization includes them. As you go left, the tools will cater
more and more to producing software artifacts. As you go right, they become
more data-centric.

![](/assets/png/mlops-shop/ml-landscape-specialized-swe.png){:width="640px"}  
{: style="text-align: center;"}

Git, Docker, and Kubernetes (k8s) are no-brainers in this space. However, I still
included them because they've become an integral part of any ML workflow.[^2]

| Category           | Examples                         | My Field Notes                                                                                                                       |
|--------------------|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Data Orchestrators | Dagster, Airflow, Luigi, etc. | Contains a large category of tools for creating data pipelines, managing data lineages, and performing ETL processes                 |
| CI/CD Pipelines    | Tekton, Argo, Jenkins X          | Group of tools that use cloud-native continuous deployment pipelines. Each "task" often runs in a container and then managed by k8s. |
| Common SWE Stack   | Docker, Kubernetes, Git, etc.    | The common software engineering stack, special mention to the three since you often see them in an ML productization workflow.       |


## Observations

Lastly, I'd like to share **two interesting observations from our plot.** They
may be obvious due to our framework, but I see no reason not to point it out.

1. *From Any-task to ML-task orchestration*: most of the tools found in this
   diagonal can be thought of as orchestrators. They stitch multiple tasks
   together into a coherent workflow. **As we go right, the tasks evolve from
   being generic to ML-specific.**
    ![](/assets/png/mlops-shop/orchestrators.png){:width="640px"}  
    {: style="text-align: center;"}
2. *From building software to building models*: this is a bit obvious but as we
   move downwards from left to right, **the tools in the diagonal shift their
   focus into producing an ML model.** Most orgs stay at the left end, adopting
   tools at the right to cater to their researchers.
    ![](/assets/png/mlops-shop/builders.png){:width="640px"}  
    {: style="text-align: center;"}

## Conclusion

In this section, we examined the MLOps landscape by categorizing them on two
factors: (1) if their artifacts are software or model focused, and (2) if they
affect a part of or the entire ML lifecycle. Given this framework, we got
the graph as shown below:

![](/assets/png/mlops-shop/ml-landscape-all.png){:width="640px"}  
{: style="text-align: center;"}

We then categorized each quadrant as cloud platforms, ML platforms, standard
SWE tools, and specialized ML tools. For each group, we examined clusters of
tools that relate to one another.

Lastly, we surfaced two observations by looking at the main diagonals of the
plot. We established the progression from any-task to ML-task orchestration,
and from building software to building models.

In the next section, we will take this graph further, and look into some
adoption strategies that we can apply for each quadrant. I will adapt
[Thoughtworks' Technology Radar model](https://www.thoughtworks.com/radar) as
our main framework for analysis.


## What's Next

* [Navigating the MLOps Landscape (Part 3: The Strategies)](/notebook/2021/05/30/navigating-the-mlops-landscape-part-3)

If you like this, you'll enjoy:

* [How to use Jupyter Notebooks in 2020 (Part 2: Ecosystem growth)](/notebook/2020/03/16/jupyter-notebooks-in-2020-part-2/)
* [How to use Jupyter Notebooks in 2020 (Part 1: the data science
    landscape)](/notebook/2020/03/06/jupyter-notebooks-in-2020)
* [Navigating the MLOps Landscape (Part 1: The Lifecycle)](/notebook/2021/05/10/navigating-the-mlops-landscape)


## Postscript

Of course, this is an opinionated guide, and I'm pretty sure that I've missed
out on some tools and technologies in the MLOps space. I focused on some of the
tools that I encountered in my day-to-day to be the representative samples for
each group.

* If you'd like a tool or framework to be added in the graph, just let me know!
    You can also help me out by telling me where it falls under. 
* If you think that a particular tool should belong to a different group.
    Please let me know in the comments below!


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


### Footnotes

[^1]: Note that I'm using the term Platform loosely here. It's not *platform* as Platform-as-a-Service, rather *platform* as a [group of technologies](https://www.techopedia.com/definition/3411/platform-computing). To avoid confusion, I'll indicate PaaS when I meant PaaS.
[^2]: Of course, Kubernetes may be sexy, but more of than not, you don't need it. Sometimes, a managed solution works. I included this because I like the idea of orchestration, and it's good to have representative sample from the non-ML software side 
