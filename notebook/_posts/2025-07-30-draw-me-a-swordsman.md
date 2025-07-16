---
layout: post
type: post
title: "'Draw me a swordsman': Can tool-calling LLMs draw pixel art?"
date: 2025-07-30
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

- **Task 1: Draw a swordsman**: an easy task that generates a static image.

> Draw me a pixel art of a swordsman.

- **Task 2: Draw a swordsman performing a slashing sequence**: a harder task.

> Draw a 4-frame spritesheet showing a swordsman performing a sword slash attack sequence, with each frame capturing a different stage of the slashing motion from windup to follow-through.

The characters in Task 1 and Task 2 don't have to be the same.
Task 2 is interesting because creating sprite sheets is a common use-case in game dev.
I also think it's challenging for LLMs because it requires understanding of sequence: each frame must logically follow the previous one to create a believable animation.
Unlike generating a single image, sprite sheets demand consistency in character design, progression, and timing.
So an LLM should not only call tools correctly, but also reason about animation.
Here's the human baseline (or my attempt) from the game [_Abyss_](https://ljvmiranda921.itch.io/abyss):

| Task 1             | Task 2             |
| ------------------ | ------------------ |
| ![Task 1 Image](#) | ![Task 2 Image](#) |

I evaluated each LLM's output using two criteria, each scored from 1 to 3:

- **Correctness**: Did the LLM follow the instructions accurately?
- **Creativity**: How original or artistic was the LLM's approach?

## Building the LLM agent testbed

This project is also a way to wrap my head around the development workflow for MCPs and LLM agents.
I like framing this set-up similar to reinforcement learning: we instruct an **Agent** (in this case an LLM) to interact with the **Environment** (standardized via MCP) in order to accomplish a task, as shown in the diagram below:

<!-- insert diagram -->

![](/assets/png/draw-me-a-swordsman/testbed.svg){:width="800px"}  
_In the tool-calling paradigm, we instruct an Agent to interact with the Environment in order to accomplish a task. The Agent can be implemented via the [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/) or natively in [Claude Desktop](https://modelcontextprotocol.io/quickstart/user), while the Environment is an MCP server that calls Aseprite commands._
{: style="text-align: center;"}

## Results

## Other cool LLM with pixel art tools
