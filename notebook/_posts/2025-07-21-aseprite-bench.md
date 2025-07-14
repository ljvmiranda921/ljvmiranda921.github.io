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

In this blog post, I tested several LLMs with function-calling capabilities on the following task: I instructed them to create a sprite sheet of a swordsman performing a certain move. Here's the complete prompt:

> Draw a 4-frame spritesheet showing a swordsman performing a sword slash attack sequence, with each frame capturing a different stage of the slashing motion from windup to follow-through.

This experiment was actually inspired by Simon Willison's [talk](https://www.youtube.com/live/z4zXicOAF28?si=qcQ4qz8PeNEID5uF&t=5086) (and [blog post](https://simonwillison.net/tags/svg/)) in the AI Engineer World's fair.
Creating sprite sheets is a common use-case for pixel art tools as it serves as a foundation for movement and animation.
Personally, I did this experiment to improve my understanding of the model context protocol (MCP) and function-calling LLMs!

## Building aseprite-mcp

First, I made an MCP server for Aseprite.


## Results

