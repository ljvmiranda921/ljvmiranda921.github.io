---
layout: post
type: post
title: "Edge LM Devlog: Deploying LLMs on a Raspberry Pi 5"
date: 2026-09-27
category: notebook
comments: true
author: "LJ V. MIRANDA"
published: true
filipino_nlp: true
tags: [edge lm, local lm, llm, small language models, global south, equitable ai]
description: |
    In this development log series, I documented how I ran a quantized version of Qwen 3.8-27B on a Raspberry Pi 5.
    Join me in the first of (hopefully) many dev logs in the world of edge models!
excerpt: |
---

<span class="firstcharacter">W</span>orking on a Raspberry Pi (RPi) feels like a trip back to memory lane.
My undergraduate training was in electronics engineering, and I still remember my final year project to involve an RPi.[^1]
Now that I'm in the field of NLP, I'm quite curious how we can fit *large* language models into these small devices.
In this blog post, I document my journey in running a quantized Qwen 3.8-27B model in a Raspberry Pi 5!

[^1]: Look at this [old blog post of mine](/notebook/2017/02/21/send-data-from-rpi-to-server/) from 2017! It's also very fitting to know that Raspberry Pi started here in Cambridge!

First, I want to lay down the price list:

* **Raspberry Pi 5 16 GB RAM** (230 GBP):
* **32 GB SSD Card** (27.50 GBP):
* **Active Cooler** (4.80 GBP): 

I actually bought the Essentials Kit from the Grand Arcade store at Cambridge, which is around 315 GBP.
As someone who is getting back into RPi again, I think it's worth it especially because the kit has added goodies like a dedicated case and a beginner's handbook.

## Running an inference server from RPi


## Connecting to the inference server