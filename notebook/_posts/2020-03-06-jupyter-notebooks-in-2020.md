---
layout: post
title: "How to use Jupyter Notebooks in 2020"
date: 2020-03-06
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [jupyter notebooks, 2020, technical review, git, data science, software engineering, machine learning]
description: |
    Love it or hate it, they're here to stay. The field of data science has
    evolved, and the tools around us begin to change&mdash; same goes for
    Jupyter Notebooks. In this blog post I'll review the Notebook ecosystem and
    talk about my workflow.
excerpt: |
    Love it or hate it, they're here to stay. The field of data science has
    evolved, and the tools around us begin to change&mdash; same goes for
    Jupyter Notebooks. In this blog post I'll review the Notebook ecosystem and
    talk about my workflow.
---

*Ah, Jupyter Notebooks.* Love it or hate it, they're here to stay.[^1] The last
time I wrote about them was two years ago (it's about [running a notebook
from a remote
server](https://ljvmiranda921.github.io/notebook/2018/01/31/running-a-jupyter-notebook/)),
and the ecosystem has grown ever since&mdash;even how I interact with notebooks
totally changed! 

**In this post, I'd review my oft-used tool in the data science toolbox,
Jupyter Notebooks, and how I use them in modern times.** First, I'll talk about
the general data science landscape for the year 2020. Then, I'll zoom into the
three main forces that changed the way how I use Jupyter Notebooks today.
Lastly, I'll conclude by writing a short reflection and a lookahead of the
Notebook ecosystem in the future.

To give context, a little more [about
me](https://ljvmiranda921.github.io/about/): as a data scientist, I alternate
between doing analyses on notebooks and writing production code for data
products. My work environment is highly-collaborative so I don't just review
code, I also read (and attempt to reproduce) others' notebook analyses. With
that said, I have a strong bias to production code and software
best practices, yet I still use notebooks in my day-to-day.[^2]

## The data science landscape today

The field of data science is [rapidly changing
](https://veekaybee.github.io/2019/02/13/data-science-is-different/).  We've
now entered a time where phrases like ["sexiest job of the 21st
century"](https://hbr.org/2012/10/data-scientist-the-sexiest-job-of-the-21st-century)
and ["data is the new
oil"](https://www.economist.com/leaders/2017/05/06/the-worlds-most-valuable-resource-is-no-longer-oil-but-data)
have become old and replaced by more realistic business problems and grounded
technical challenges. I posit this change as two-fold: we now need to support
both the (1) demand for productionizing analyses and experiments, and the (2)
rapid adoption of the Cloud.

<!-- insert axis here -->
![](/assets/png/jupyter2020/axis.png){:width="480px"}  
"We now need to support all four facets of data science"
{: style="text-align: center;"}

First, **the need for production**, i.e., creation of data products or
deploying experiment artifacts within the software engineering lifecycle, has
grown through the years. This is evidenced by an uptake for more
engineering type of work with the rise of [machine learning engineers and data
science software
developers](https://d2wahc834rj2un.cloudfront.net/Workera%20Report.pdf).
Furthermore, analyses aren't confined anymore inside
publications or charts, for there is now a growing demand for experiments to be
reproduced and its artifacts to be deployed.

Next, the exponential increase of data necessitates the
**adoption of the Cloud**.  We cannot just load a 1TB dataset in pandas using
our own laptops! The popularity of tools like Docker and Kubernetes
allowed us to scale our data-processing workloads at unprecedented levels.
Cloud adoption means that we take care of scaling, resource provisioning, and
infrastructure when managing our workloads. However, the previous Jupyter
Notebook ecosystem, as much as it is a staple in the data scientist toolbox,
isn't meant for these changes.


<!-- insert axis here with Jupyter notebooks -->

![](/assets/png/jupyter2020/axis_with_jupyter.png){:width="480px"}  
"We now need to support all four facets of data science"
{: style="text-align: center;"}

As I've said, the Jupyter Notebook we've come to know isn't meant for these changes. 
They're meant for exploration, not production. They're meant to run in a single
machine, not a fleet of pods. However, for the past five years, the Jupyter
Notebook ecosystem has grown: we now have JupyterLab, several plugins, new kernels
for other languages, and third-party tooling available at our disposal. Sure,
we can still run notebooks by typing `jupyter notebook` in our terminals, but
it's now more than that! This then begs the question: **what are the forces
that prompted these changes?**, and **how can we leverage this larger notebook
ecosystem to respond to the changes in data science today?** In this blog post,
I would like to share my thoughts on the demands that prompted the ecosystem to
adapt, and how I take advantage of these changes in my side-projects and
day-to-day work.


## Forces of change 

![](/assets/png/jupyter2020/axis_with_jupyter_forces.png){:width="480px"}  
"We now need to support all four facets of data science"
{: style="text-align: center;"}

### Demand for quicker turnaround time from analysis to production


<! -- Include tools like papermill, restart and run kernel -->


### Higher collaboration across data science and engineering teams


<! -- version control and git integration, docker for repro -->


### Increased adoption of the Cloud

<! -- managed notebooks to accommodate hardware requirements for analyses -->


## Conclusion


<! -- wishlist -->



### Footnotes


[^1]: Not necessarily Jupyter or the tool itself, but rather the *idea* of [literate programming](https://en.wikipedia.org/wiki/Literate_programming) and how we use them in our day-to-day data science work
[^2]: Rereading that sentence felt like it's a punchline to a joke haha! Adhering to software best practices and using Jupyter Notebooks aren't mutually exclusive!
