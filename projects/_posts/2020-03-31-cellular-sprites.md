---
layout: post
title: "Postscript: Sprites-as-a-Service"
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
achieve a common goal. It may be particles finding the best solution in an
optimization problem, or strangers collaborating to build open-source projects.
Even if these elements act independently, the sum total of their actions
contribute to a recognizable whole.

<!-- TODO: ASSETS maybe GIF of particles from pyswarms, and open-source stuff -->

I'd like to explore this idea further with Conway's Game of Life. It's a type
of cellular automata: there are well-defined states, discrete units or *cells*,
and some form of self-propagation. In Game of Life, you have four rules:
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
the other, creating another system that self-propagates on its own. 

<!-- TODO: hierarchy and abstraction?? -->

In this post, I'll talk about how Sprites-as-a-service came to be. 

## Sprites-as-a-Service

Looking back, I believe that there are three major developments in the creation
of Sprites-as-a-Service. First, I laid the foundation by creating a framework
for cellular automata called Seagull. Then, I used the said framework to
explore the creation of sprites in Cellular Sprites. Finally, I refined my
ideas in Cellular Sprites and improved it in Sprites-as-a-Service.

<!-- TODO: show logos and maybe changes in UI -->


### Building foundations through Seagull

When I first started programming Game of Life, I noticed that there are none to
few generic implementations of it in Python&mdash; most are one-off solutions.
As someone with a penchant for creating tools, I built **Seagull**, a
framework for defining Game of Life simulations. 

I decided to create a framework because I want to have a language that makes it
easier to express how cellular automata is done. To achieve this, it's
important to think of "verbs" that map to the experimentation lifecycle:
*create* a board, *put* an automaton, *run* the simulation, etc. These action
words are then manifested through Seagull's API:

```python
import seagull as sg
from seagull.lifeforms import Pulsar

# "create" a board
board = sg.Board(size=(19,60))
# "add" an automaton
board.add(Pulsar(), loc=(1,1))
board.add(Pulsar(), loc=(1,22))
board.add(Pulsar(), loc=(1,42))
# "run" the simulation
sim = sg.Simulator(board)
sim.run(sg.rules.conway_classic, iters=1000)
```

<!-- TODO: show output of the code here -->

I'm satisfied with the API design for I can see how expressive and extensible
it can be for future use-cases. For example, even if I have a preset number of
[Lifeforms](https://pyseagull.readthedocs.io/en/latest/api/seagull.lifeforms.html)
available, there is still the generic "Custom" lifeform that allows some variability.

Building Seagull has taught me to think in terms of *objects* and
*actions*: there is a Board (obj) that you add (action) Lifeforms (obj) onto,
you feed (action) the Board (obj) into a Simulation, then you run (action) the
Simulation. As I worked through the next iterations of my project, Seagull has
been the fundamental unit of my creative process. Later on, these actions will
be aggregated into higher-level abstractions. 

<!-- TODO: illustration of adding something on the board, not pixelated! use inkscape
-->

### Thematic explorations with Cellular Sprites

<!-- 
I know that I want interactivity and variability.
-->

<!-- THEME: reusing these components to achieve a goal -->
<!-- i want to express variability, self-generation -->
<!-- inspiration from sprator -->
<!-- discuss the algorithm -->
<!-- use of gradient for coloring -->
<!-- using streamlit -->

### Further refinement in Sprites-as-a-Service

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

## References

