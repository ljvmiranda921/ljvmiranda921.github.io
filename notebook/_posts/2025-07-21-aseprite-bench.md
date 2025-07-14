---
layout: post
type: post
title: "'Draw me a swordsman': Can tool-calling LLMs draw pixel art?"
date: 2025-07-21
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [pixel art, aseprite, llm, nlp, tool-calling, mcp]
description: |
    Just a fun weekend experiment on model-context protocol (MCP): I asked several tool-calling LLMs to draw a 4-frame spritesheet of a swordsman performing a slash attack using an Aseprite MCP I built. The results were interesting!
excerpt: |
---

<span class="firstcharacter">R</span>ecently, we've witnessed how language models have become more adept in using real-world tools due to their function-calling cabilities. 
Whenever I [develop games](https://ljvmiranda921.itch.io), I use this tool called [**Aseprite**](https://www.aseprite.org/) to create pixel art characters and environments.
Asprite is powerful: I can use it to prepare spritesheets, test color palettes, and sample animations&mdash;it cannot just be replaced by any AI image generator. 
I wonder if I can incorporate LLMs into my workflow?

<!--Aseprite screenshot-->

In this blog post, I tested LLMs with tool-calling capabilities on the following tasks: 

* **Task 1: Draw a swordsman**: an easy task that generates a static image.

> Draw me a pixel art of a swordsman.

* **Task 2: Draw a swordsman performing a slashing sequence**: a harder task.

> Draw a 4-frame spritesheet showing a swordsman performing a sword slash attack sequence, with each frame capturing a different stage of the slashing motion from windup to follow-through.

The characters in Task 1 and Task 2 don't have to be the same.
Task 2 is interesting because creating sprite sheets is a common use-case in game dev.
I also think it's challenging for LLMs because it requires understanding of sequence: each frame must logically follow the previous one to create a believable animation. 
Unlike generating a single image, sprite sheets demand consistency in character design, progression, and timing. 
So an LLM should not only call tools correctly, but also reason about animation.

Here's the human baseline (or my attempt) from the game [*Abyss*](https://ljvmiranda921.itch.io/abyss):


## Building aseprite-mcp

First, I made an MCP server for Aseprite.


## Results

