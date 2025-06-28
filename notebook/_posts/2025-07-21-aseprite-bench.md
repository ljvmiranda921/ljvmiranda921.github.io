---
layout: post
type: post
title: "SpriteBench: Can tool-calling LLMs draw pixel art?"
date: 2025-07-21
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [pixel art, aseprite, llm, nlp, tool-calling, mcp]
description: |
    Just a fun experiment inspired by Simon Willison's SVG benchmark: I created an MCP server based on a pixel art tool called Aseprite, and
    let several LLMs draw (1) a pelican riding a bicycle and (2) a spritesheet of a running warrior.
    The results were interesting!
excerpt: |
---

<span class="firstcharacter">R</span>ecently, we've witnessed how language models have become more adept in using real-world tools due to their function-calling cabilities. 
Whenever I [develop games](https://ljvmiranda921.itch.io), I use this tool called [**Aseprite**](https://www.aseprite.org/) to create pixel art characters and environments.
Asprite is powerful: I can use it to prepare spritesheets, test color palettes, and sample animations&mdash;it cannot just be replaced by any AI image generator. 
I wonder if I can incorporate LLMs into my workflow?

<!--Aseprite screenshot-->

In this blog post, I tested several LLMs with function-calling capabilities on two tasks:

1. Draw a pixel art of a pelican riding a bicycle; and
2. Create a spritesheet of a running warrior.

The first task of this experiment was actually inspired by Simon Willison's [talk](https://www.youtube.com/live/z4zXicOAF28?si=qcQ4qz8PeNEID5uF&t=5086) (and [blog post](https://simonwillison.net/tags/svg/)) in the AI Engineer World's fair.
The second task, on the other hand, is a common use-case for Aseprite.
Personally, I did this experiment to improve my understanding of the model context protocol (MCP) and function-calling LLMs!

## Building aseprite-mcp

First, I made an MCP server for Aseprite.


## Results

