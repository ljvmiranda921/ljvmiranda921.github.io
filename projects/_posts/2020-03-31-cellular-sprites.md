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

Almost a year ago, I wrote a library for Conway's Game of
Life&mdash;[Seagull](https://github.com/ljvmiranda921/seagull). It's a fun
project that serves as an outlet for my interests in [cellular automata](https://en.wikipedia.org/wiki/Cellular_automaton).
This year, I used it for generating procedural art:

<!-- add examples -->
![](/assets/png/general/cellular-sprites.png){:width="640px"}  
{: style="text-align: center;"}

In [Cellular Sprites](https://bit.ly/CellularSprites), you generate 8-bit sprites using
Conway's Game of Life:
* Any live cell with two or three neighbors survives
* Any dead cell with one or less live neighbors becomes a live cell
* All other live cells die in the next generation. All dead cells stay dead

Note that these steps were based from
[yurkth/sprator](https://github.com/yurkth/sprator). So all credit goes to
him/her. In addition, the board size was first set to 4x8 before I ran the Game
of Life Simulator. Afterwards, I flipped the board to create a square 8x8
image. It's good that Seagull's API design allowed for these changes, and it's
very easy to implement! You can check [this
example](https://pyseagull.readthedocs.io/en/latest/notebooks/sprator.html#Sprator)
on how it's done.

Lastly, Cellular Sprites was a learning opportunity for me to build and deploy
a [Streamlit](https://streamlit.io) application. Streamlit is awesome. I talked about
it at length in [one of my blog posts on Jupyter
Notebooks](https://ljvmiranda921.github.io/notebook/2020/03/16/jupyter-notebooks-in-2020-part-2/#quick-turnaround-from-prototype-to-prod).
I'm not a web-developer (I suck at frontend), but I was able to create a decent
UI in just a day of hacking!

**I suggest trying-out Cellular Sprites on your own.** Play with the parameters on
the sidebar to create cute 8-bit sprites! If you found something cool, feel
free to save the image and share to your friends! [(If `iframe` is not working,
click this link to redirect you to the Heroku
app)](https://cellular-sprites.herokuapp.com)

## Update

* I made a small website, [Sprites-as-a-Service](/sprites-as-a-service), that allows you to further customize your Sprite based on your name or any given string. In addition, you can also create sprites by calling the Sprites-as-a-Service REST API!


<iframe src="https://cellular-sprites.herokuapp.com" width="700" height="600">
  <p>Your browser does not support iframes.</p>
</iframe>
