---
layout: post
title: "Jupyter Notebooks in 2020"
date: 2020-03-06
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [jupyter notebooks, 2020, technical review, git, data science, software engineering, machine learning]
description: |
   A review of the Jupyter Notebook ecosystem for 2020 
excerpt: "A review of the Jupyter Notebook ecosystem for 2020"
---

*Ah, Jupyter Notebooks.* Love it or hate it, they're here to stay.[^1] The last
time I wrote about them was two years ago (it's about [running a notebook
from a remote
server](https://ljvmiranda921.github.io/notebook/2018/01/31/running-a-jupyter-notebook/)),
and the ecosystem has grown ever since&mdash;even how I interact with notebooks
totally changed! 

**In this blog post, I'd review my oft-used tool in the data science toolbox,
Jupyter Notebooks.** First, I'll talk about the general data science climate for
the year 2020. Then, I'll zoom into the three main forces that changed the way
how I use Jupyter Notebooks today. Lastly, I'll conclude by writing a short
reflection and a lookahead of the Notebook ecosystem in the future.

To give context, a little more [about
me](https://ljvmiranda921.github.io/about/): as a data scientist, I alternate
between doing analyses on notebooks and writing production code for data
products. My work environment is highly-collaborative so I don't just review
code, I also read (and attempt to reproduce) others' notebook analyses. With
that said, I have a strong bias to production code and software
best practices, yet I still use notebooks in my day-to-day.[^2]

## Data science today

The field of data science has [changed for the past two
years](https://veekaybee.github.io/2019/02/13/data-science-is-different/).
We've now entered a time where ["sexiest job of the 21st
century"](https://hbr.org/2012/10/data-scientist-the-sexiest-job-of-the-21st-century)
and ["data is the new
oil"](https://www.economist.com/leaders/2017/05/06/the-worlds-most-valuable-resource-is-no-longer-oil-but-data)
have become old catchphrases and replaced by more realistic business problems
with grounded technical challenges. There has also been a shift into more
engineering type of work with the rise of [machine learning engineers and data
science software
developers](https://d2wahc834rj2un.cloudfront.net/Workera%20Report.pdf).
Lastly, machine learning has been heavily-democratized with the continuous
adoption of popular frameworks like scikit-learn, Pytorch, & HuggingFace's
transformers, among many others. All these forces set the stage as the tools
around us begin to evolve&mdash; including Jupyter Notebooks. 

![](/assets/png/jupyter2020/data-is-new-oil.jpg){:width="420px"}
{: style="text-align: center;"}

Started in 2015, Notebooks have become a staple of the data science workflow.
Instead of a typical text editor, you are presented with cells containing
either text (richly-formatted through Markdown) or code. As a user, you can
rearrange cells or run them in any order you want. Sure, these features are
[hotly-debated](https://www.reddit.com/r/MachineLearning/comments/9a7usg/d_i_dont_like_notebooks/)
and the idea isn't novel&mdash;similar principles can be found in literate
programming tools such as RMarkdown or Wolfram Alpha&mdash;yet it's ease of use and
intuitive design [changed how science is
done](https://www.gw-openscience.org/GW150914data/GW150914_tutorial.html).

Five years past, and the Jupyter Notebook ecosystem has grown: we now have
JupyterLab, more plugins, new kernels for other languages, and third-party
tooling available at our disposal. Sure, we can still run notebooks by typing
`jupyter notebook` in our terminals, but it's now more than that! This then
begs the question: **what are the forces that prompted these changes?**, and
**how can we leverage this larger notebook ecosystem to respond to the changes
in data science today?** In this blog post, I would like to share my thoughts
on the demands that prompted the ecosystem to adapt, and how I take advantage
of these changes in my side-projects and day-to-day work.


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
