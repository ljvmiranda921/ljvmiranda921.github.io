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
    Some reflections on emergence, identity, in chaos as I generate cute
    sprites using cellular automata.
excerpt: |
    Some reflections on emergence, identity, in chaos as I generate cute
    sprites using cellular automata.
---

> *March 2021*&mdash;This blogpost underwent **major revisions**. Instead of just describing what
> Cellular Sprites is about, I want to talk about my creative process and
> motivation&mdash; from Seagull to Sprites-as-a-Service&mdash;and explore some
> underlying themes in between.

## Introduction

There is something magical about discrete things working together to achieve a
common goal. It may be particles in a swarm algorithm, or contributors in
open-source projects. Independent as they were, the sum total of their actions
give way to a recognizable whole. 


<!-- TODO: ASSETS maybe GIF of particles from pyswarms, and open-source stuff -->

What piqued my interest is this idea of **emergence**, where new properties
show up when discrete units interact with one another. I'd like to explore this
idea further with Conway's Game of Life. It's a type of cellular automata with
well-defined states and self-propagation. It is governed by four rules:
* Overpopulation: if a living cell is surrounded by more than three living cells, it dies.
* Stasis: if a living cell is surrounded by two or three living cells, it survives.
* Underpopulation: if a living cell is surrounded by fewer than two living cells, it dies.
* Reproduction: if a dead cell is surrounded by exactly three cells, it becomes alive.

<!-- TODO: CITE cite jakevdp blogpost -->

Units turn into groups, groups turn into systems, systems turn into complex
ecosystems and so on. Sprites-as-a-service is a product of this exploration.
The creative process closely follows the evolution I described: one system
built on top of the other, creating another system that self-propagates on its
own. 

In this post, I'll talk about how Sprites-as-a-service came to be. 

## Sprites-as-a-Service

Looking back, I believe that there are three major developments in the creation
of Sprites-as-a-Service. First, I laid the foundation by creating a framework
for cellular automata called Seagull. Then, I used the said framework to
explore the creation of sprites in Cellular Sprites. Finally, I refined my
ideas in Cellular Sprites and improved upon it in Sprites-as-a-Service.

<!-- TODO: show logos and maybe changes in UI -->


### Building the language through Seagull

When I first started programming Game of Life, I noticed that there are none to
few generic implementations of it in Python&mdash; most are one-off solutions.
As someone with a penchant for creating tools, I built **Seagull**, a
framework for defining Game of Life simulations[^1]. 

I decided to create a framework because I want to have a language that makes it
easier to express how cellular automata is done. To achieve this, it's
important to think of "verbs" that map to the experimentation lifecycle:
*create* a board, *put* an automaton, *run* the simulation, etc. These action
words are then manifested through Seagull's API.

I'm satisfied with the API design for I can see how expressive and extensible
it can be for future use-cases. For example, even if I have a preset number of
[Lifeforms](https://pyseagull.readthedocs.io/en/latest/api/seagull.lifeforms.html)
available, there is still the generic "Custom" lifeform that allows some variability.

Building Seagull has taught me to think in terms of *objects* and
*actions*: there is a Board (obj) that you add (action) Lifeforms (obj) onto,
you feed (action) the Board (obj) into a Simulation, then you run (action) the
Simulation. As I worked through the next iterations of my project, Seagull has
been the fundamental unit of my creative process. Later on, these actions will
be aggregated into higher-level abstractions.[^2] 

<!-- TODO: illustration of adding something on the board, not pixelated! use inkscape
-->

### Implementing emergence in Cellular Sprites

Now that I've set up the cellular automata framework with Seagull, the next
step is to apply it by generating higher-level abstractions. During this time,
I am also exploring some ideas on procedural generation, so I went with
creating sprites.

My inspirations include Github's
[identicon](https://github.blog/2013-08-14-identicons/), Ebyan Alvarez-Buylla's
[procedural space
invaders](http://www.nolithius.com/articles/procedural-art/procedural-space-invaders),
and CryPixel's [procedural pixel art generator](https://crypixels.com/). They
have a distinct feel upon them, and the mirroring technique allows the
generated sprites to look more convincing.

Given that, the initial sprite algorithm is simple:
1. Generate a 4x8 sprite
2. Add some noise to create "live" cells
3. Run Conway's Game of Life for some number of iterations
4. Mirror the 4x8 canvas to create an 8x8 version

There were some parameters that need some tweaking. For example, I ensured that
the number of live cells should be around 40-60% of all cells in the 4x8 grid.
However, I realized that it doesn't really affect the look of the sprite. What
mattered the most are the extinction and survival parameters.

*Extinction* and *survival* affect how "easy" a cell lives with respect to its
neighbors. They're just made-up terms that I used to control overpopulation,
stasis, and reproduction. A high survival rate causes big, blocky sprites,
whereas a high extinction rate creates mosquito-like thinner sprites. I
exposed these parameters so as to introduce variability in the application.

<!-- show too high extinction, too high survival -->

I also played with colors for a few more iterations. At first, I settled on a
grayscale version (or one of matplotlib's colormaps), but the image looked
flat. I also tried to manually add colors, but it didn't stick that much:

<!-- show black and white image, show colormap image -->

Later on, I realized that adding a solid black outline makes the sprite stand
out&mdash;it looks more appealing and recognizable. Making a solid outline sounds
easy, but it took me some time figuring out how to make it. So, I just settled
on a brute-force approach: for each cell in the matrix, I look around its
neighbors, and paint them black if they are near the edge. The resulting
sprites look better visually: 

<!-- show sprites with outline -->

Taking a step further, I decided to incorporate shading in the sprite's fill
color. I computed the gradient of the resulting sprite, shift the resulting
matrix 1 pixel vertically, and map the resulting values in a custom colormap.
This then removes the flat-ness of the sprite's color and add a bit of
dimension to its look. The effect looks more apparent if the color scheme is
comprised of different colors:

<!-- show sprites with gradient (totally diff colors!) -->

Lastly, I used this opportunity to learn new tech. The initial version of my
explorations (known as Cellular Sprites) was made in Streamlit. I arranged the
generated sprites in a 3x3 matrix, and added a sidebar with some parameters to
play around. Although Streamlit made things alot easier, its default UI didn't
convey the look that I want to achieve. However, it was a good run as a
proof-of-concept, and I'm proud of my output.

<!-- show cellular sprites -->


### Emergence, determinism, and identity in Sprites-as-a-Service

After establishing the main ideas and execution in Cellular Sprites, I decided
to take it a step further and endow a form of identity in Sprites-as-a-Service.
The generated sprites were based on emergent behaviour from randomness[^3] shaped
by a rule&mdash; what if we can control this randomness with a seed? Better
yet, a seed we can personally identify with?

In Sprites-as-a-Service, the defining feature is the ability to create a unique
sprite based on a name (or any other string). It's like your own fingerprint,
borne out of emergence. This, in my opinion, creates a level of conflict: since
you defined the initial conditions, is the system truly random?

This tug-of-war between randomness and determinism enthralled me. I can specify
the seed, but at a certain point, I give everything to "chance." Is it truly
chance, or just a smorgasbord of systems that we haven't comprehended yet?  I
always remember coin-flipping, the definitive example in Statistics 101, to be
a highly-deterministic act if we know certain variables and conditions such as
the momentum of our arm, air resistance, weight of the coin, etc. It seems that
the same principles[^4] apply in Sprites-as-a-Service: we're aware of what the
initial conditions are (it's exposed in the UI), yet there is a certain
moment&mdash;perhaps in the click of the button&mdash;that we leave everything
to chance.

Perhaps, that experience of leaving everything to chance and getting a result
out of it led to **surprise**. Some people were delighted (or disappointed)
with the sprites that emerged from their names. *This is the experience I
want to capture.* The system, in some way, is deterministic: Conway's Game of
Life is rules-based, the initial seeds and conditions are provided by the user,
etc. Yet, this determinism didn't stop me from being surprised with the results
I got![^5]



<!-- show some results -->


## Conclusion


<!--
talk about the dream thing from google that takes weeks to percolate

maybe talk a bit about procgen art.
-->





<!--
<iframe src="https://cellular-sprites.herokuapp.com" width="700" height="600">
  <p>Your browser does not support iframes.</p>
</iframe>
-->


---

### Footnotes

[^1]: The name "seagull" came from the first letters of Conway's Game of Life: C, G, o, and L. Reading them together, "CGoL", sounds like said bird.
[^2]: I still have a lot to learn about API design, for I usually approach it with "gut feel" + techniques I liked from other libraries (e.g. scikit-learn's fit-predict loop). Sometimes I run the risk of overabstracting, but yeah, it's fun to build worlds upon worlds.
[^3]: I can be pedantic about it and say that it isn't [pure randomness](https://en.wikipedia.org/wiki/Randomness) for I used a [pseudorandom generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator).
[^4]: There is a field of study dedicated to this phenomena: [chaos theory](https://en.wikipedia.org/wiki/Chaos_theory). According to wikipedia, chaos is just a dynamic system whose "random states of disorder and irregularities are actually governed by underlying patterns and deterministic laws."
[^5]: At this point, I'd usually talk about my musings on my obssessive planning, openness, and luck. But I haven't really structured my thoughts upon it. I can only recreate the experience here in Sprites-as-a-Service.
