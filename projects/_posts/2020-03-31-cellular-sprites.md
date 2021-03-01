---
layout: post
title: "Postscript: Cellular Sprites"
date: 2020-03-31
category: projects
comments: true
author: "LJ MIRANDA"
header-img: /assets/png/general/cellular-sprites.png
tags: [jupyter notebooks, streamlit, procedural generation, streamlit, seagull, cellular automata, pixel art, 8-bit, sprites]
description: |
    Come and generate your own 8-bit sprites using cellular automata! This
    project was built using Seagull, my Python library for Conway's Game of
    Life, and Streamlit.
excerpt: |
    Come and generate your own 8-bit sprites using cellular automata! This
    project was built using Seagull, my Python library for Conway's Game of
    Life, and Streamlit.
---

> *March 2021*&mdash;This blogpost underwent **major revisions**. Instead of just describing what
> Cellular Sprites is about, I want to talk about my creative process and
> motivation&mdash; from Seagull to Sprites-as-a-Service&mdash;and explore some
> underlying themes in between.

## Introduction

There seems to be something magical about discrete units working together to
achieve a common goal. It may be particles finding the most optimal solution in
*Pyswarms*, or strangers collaborating to build open-source projects. Even if
these elements act independently, the sum total of their actions contribute to
a recognizable whole.

<!-- TODO: ASSETS maybe GIF of particles from pyswarms, and open-source stuff -->

I'd like to explore this idea further with Conway's Game of Life. It's
considered as a  cellular automaton: there are well-defined states, discrete
units or *cells*, and some form of self-propagation. In Game of Life, you have
four rules:
* Overpopulation: if a living cell is surrounded by more than three living cells, it dies.
* Stasis: if a living cell is surrounded by two or three living cells, it survives.
* Underpopulation: if a living cell is surrounded by fewer than two living cells, it dies.
* Reproduction: if a dead cell is surrounded by exactly three cells, it becomes alive.

<!-- TODO: CITE cite jakevdp blogpost -->


What piqued my interest the most is that given limited resources, the cells act
independently and compete with one another. This opens up my question: *if
these cells are independent, can they still build something greater than the
sum of their parts?*

Units turn into groups, groups turn into systems, systems turn into complex
ecosystems. Sprites-as-a-service is a product of this exploration. The creative
process closely follows the evolution I described: one system built on top of
the other, creating another system that self-propagates on its own. In this
blogpost, I'll talk about how Sprites-as-a-service came to be. 


## Sprites-as-a-Service

### Seed(): building foundations through Seagull

<!-- talk about seagull -->

### Explore(): thematic explorations with Cellular Sprites

<!-- 
I know that I want interactivity and variability.
-->

### Optimize(): further refinement in Sprites-as-a-Service

<!--
Sprites as a service as a refinement of cellular sprites
- Not just using streamlit, i'm using a dedicated frontend
- More attuned to its brand and packaging
-->


## Conclusion

<!--
I admit that surfacing these themes were done in retrospect. I'm not fully
conscious of this eventual goal when building sprites-as-a-service. Connecting
dots in a line, etc.


maybe talk a bit about procgen art.
-->





<!--
<iframe src="https://cellular-sprites.herokuapp.com" width="700" height="600">
  <p>Your browser does not support iframes.</p>
</iframe>
-->
