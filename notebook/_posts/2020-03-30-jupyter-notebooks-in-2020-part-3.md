---
layout: post
title: "How to use Jupyter Notebooks in 2020 (Part 3: Final thoughts)"
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

To recap what we know so far, in [Part
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

**As a technology/product, the space will get diluted**&mdash; and that's a
good thing! As we've seen in Part Two, 
<!-- there are many new technologies that doesn't involve jupyter notebooks -->
<!-- i imagine that more of these will come up for more specific use-cases, for
example, observable hq, maybe REPL.it?-->
<!-- That's better because Jupyter Notebooks can be an "open standard" on how
to structure Notebook-based products -->


### My wishlist 

<!-- 1. Make Restart Kernel and Run All a first-class citizen -->

<!-- 2. Notebook IDEs -->

<!-- 3. Integrate with virtual environments for easier kernel switching -->


<!-- 4. A cell-lock mode? -->

<!-- 5. A user-friendly way for cell testing -->


### Final thoughts


<!-- I wrote this essay because... my blogpost back in 2018 is outdated -->
<!-- personally, i love notebooks and they don't deserve the animosity they get -->
<!-- there's a right tool for the job. -->

<!-- acknowledgments for accompanying me through these series! -->


[^1]: I am using the term "product" loosely here. It doesn't have to be a paid service, it can be a *libre* open-source project.
