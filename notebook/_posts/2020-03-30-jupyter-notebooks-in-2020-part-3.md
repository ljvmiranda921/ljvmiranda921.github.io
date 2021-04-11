---
layout: post
title: "How to use Jupyter Notebooks in 2020 (Part 3: Final thoughts)"
type: post
date: 2020-03-30
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [jupyter notebooks, 2020, technical review, git, data science, software engineering, machine learning, streamlit, gcp, aws, voila, dagster, papermill]
description: |
    In the final part of this series, I'd like to share my reflections and
    wishlist on the Jupyter Notebook ecosystem. Before I end, I'd like to thank
    you all for reading through and accompanying me in this journey!
header-img: /assets/png/jupyter2020/everything.png
excerpt: |
    In the final part of this series, I'd like to share my reflections and
    wishlist on the Jupyter Notebook ecosystem. Before I end, I'd like to thank
    you all for reading through and accompanying me in this journey!
---

> This is the last of a three-part blog post on the Jupyter Notebook ecosystem.
> Here, I'll share some of my reflections and wishlist to better improve the
> Notebook experience. You'll find Part One [in this link](/notebook/2020/03/06/jupyter-notebooks-in-2020/) and Part Two
> [here](/notebook/2020/03/16/jupyter-notebooks-in-2020-part-2).

Hi friends! Thanks for accompanying me in the final part of this series. Let's
jump right into it!

<span class="firstcharacter">T</span>o recap what we know so far, in [Part
One](/notebook/2020/03/06/jupyter-notebooks-in-2020/), we created a framework
that identifies two directions of growth&mdash; cloud adoption and production
systems&mdash; and three forces of change that push the Jupyter ecosystem
forward (as represented by the purple arrows):


![](/assets/png/jupyter2020/axis_with_jupyter_forces.png){:width="480px"}  
{: style="text-align: center;"}


We saw that Jupyter Notebooks, by themselves, occupy the bottom-left portion of
the quadrant: they work best as an exploration or prototyping tool, and we
typically use them in our own laptops. However, **the data science landscape in
2020 is different**: (i) most of our work happens in the Cloud and (ii) there is
more emphasis on writing production data systems. Given that, in [Part
Two](/notebook/2020/03/16/jupyter-notebooks-in-2020-part-2), we explored
various tools and extensions that helped bridge the gap:

![](/assets/png/jupyter2020/everything.png){:width="480px"}  
{: style="text-align: center;"}

[Part Two](/notebook/2020/03/16/jupyter-notebooks-in-2020-part-2) is chock-full
of tactical information so I'd suggest that you read through it. It closes off
by offering a [strategic framework called the **threshold of
modularization**](/notebook/2020/03/16/jupyter-notebooks-in-2020-part-2/#putting-it-together),
where it allows one to decide when to highly-optimize a software artifact:


![](/assets/png/jupyter2020/notebook_principles_01.png){:width="480px"}  
{: style="text-align: center;"}

As we close this series off, I'd like to give a short reflection on Jupyter
Notebooks, a short meta-thesis on why I'm writing these blogposts, and my
wishlist for the Notebook ecosystem in the future.


## Conclusion 

### Are notebooks here to stay?

I opened up this series with the statement: 

> "Ah, Jupyter Notebooks. Love it or hate it, they're here to stay." 

Given what we know and what we've learned so far, let's revisit this assertion
and see if it holds ground. I'd approach this in a two-fold manner: first, with
Notebooks as a paradigm, and second, with Notebooks as a product (i.e., Jupyter
Notebooks by Project Jupyter).

**As a paradigm, it's here to stay**. The idea of interspersing text and code
is not a new concept. We can see this as an offshoot of Donald Knuth's
[literate programming
paradigm](https://en.wikipedia.org/wiki/Literate_programming)&mdash;where
instead of developing with respect to computer logic, we develop with respect
to human thoughts. There have been many "products"[^1] built around this, like
Wolfram's [Mathematica](https://www.wolfram.com/mathematica/) or Rlang's
[RMarkdown Notebooks](https://rmarkdown.rstudio.com/lesson-10.html).  I'd say
that given the boom in data science, especially the practice of [exploratory
data analysis](https://en.wikipedia.org/wiki/Exploratory_data_analysis) and
[open science](https://en.wikipedia.org/wiki/Open_science), Notebooks as a literate programming paradigm found its home.

**As a technology, Jupyter Notebooks will become an open standard**. My
fearless forecast is that we'll start seeing an emergence of Notebook-type
products based from Jupyter Notebooks, such as Google Colaboratory. These
companies aren't reinventing the wheel, rather, they're adopting the Jupyter
open standard to create platforms for their specific use-case&mdash; e.g.,
[ObservableHQ](https://observablehq.com/) for data visualization,
[CoCalc](https://cocalc.com/) for online courses, and [Kaggle
Kernels](https://www.kaggle.com/kernels) for data science competitions. As
Jupyter Notebook becomes an open standard, my only hope is that tools can still
provide interoperability between them.

I believe that the future of Jupyter Notebooks is bright if done right. It
combines the "perfect storm" of a well-established paradigm, and a possibility
to become an open standard. In the next section, I'll talk about some of my
wishes for the Jupyter Notebook ecosystem and things it can still improve upon.


### My wishlist 

Just three:

* **Make "Restart Kernel and Run All" (RKRA) a first-class citizen** I always
    think of RKRA, loosely, like a compiler: first it inspects if the logic flow
    of your notebook checks out, and transforms it into a readable material.
    Whenever I hit RKRA and it "passes," then I have a certain level of
    confidence that I don't have undeclared variables, unordered rows, or
    unimported libraries. I hope that RKRA can be displayed more prominently in
    the interface.
* **More Notebook IDEs** The tool `nbdev` seems to be a good leap forward, but
    I hope that there would be more players in this space. We have discussed
    various tools like `nbstripout` and `nbdime`, and I hope that there's an
    IDE (or an opinionated Jupyter "distribution") that ships this right off
    the bat. Perhaps Jupyter Notebooks can be treated as "editors" with
    easily-customizable configs, and us developers can just save and share our
    configs like in `tmux` or `vim`. It would be fun looking at other's configs
    that way!
* **A cell-lock mode?** The ability to order cells freely is both bane and
    boon. On one hand, it allows me to switch context and be more flexible in
    how I organize my cells. On the other, it facilitates misuse and discourage
    software best practices. I wish that there's a simple toggle to enable a
    cell-lock mode, where I'm not allowed to move cells back and forth and
    force me in a linear workflow.

### Final thoughts

I wrote this essay because I've seen a lot of people reading my **outdated**
tutorial on ["Running Jupyter Notebooks in a remote
server"](/notebook/2018/01/31/running-a-jupyter-notebook/) back in 2018. I'd
say it's outdated because there are now more ways of accomplishing the same
task with considerably less effort&mdash; i.e., if I were to do it again I'll
probably use Colab or SageMaker instead.

Jupyter Notebooks are great, and they don't deserve the *animosity* they get.
There's always a right tool for the job, we use editors when doing this and
notebooks for doing that. In addition, Notebooks eased me in when I was still
learning Python and data science. They're a useful tool, with a growing and
thriving ecosystem.

**I'd like to thank you, reader, for accompanying me in this journey.** I hope you
enjoyed your time here and learned something new. Feel free to drop a comment
below if you see any inaccuracies, or if you'd just like to share your
workflow! Until next time!

#### Other Resources

* Reddit Discussion for [Part One](https://www.reddit.com/r/Python/comments/fflyup/how_to_use_jupyter_notebooks_in_2020_part_1_the/?utm_source=share&utm_medium=web2x) and [Part Two](https://www.reddit.com/r/datascience/comments/fj9y80/how_to_use_jupyter_notebooks_in_2020_part_2/?utm_source=share&utm_medium=web2x)
* Joel Grus' JupyterCon presentation on ["I don't like notebooks."](https://www.youtube.com/watch?v=7jiPeIFXb6U)
* Yihui Xie's blog post on ["The First Notebook War."](https://yihui.org/en/2018/09/notebook-war/)


#### Footnotes

[^1]: I am using the term "product" loosely here. It doesn't have to be a paid service, it can be a *libre* open-source project.
