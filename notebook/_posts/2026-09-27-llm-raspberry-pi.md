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

* **Raspberry Pi 5 16 GB RAM** (230 GBP): it was my birthday so I had money to spare. Kidding aside, I chose to max out on specs because I want to measure the *ceiling* in which I can deploy language models. To the best of my knowledge, this is the largest you can buy unmodded.
* **32 GB microSD Card** (27.50 GBP): I chose 32 GB because I want to work on a size that is a bit constrained, but not too limiting that I can't store a mid-sized model.
* **Active Cooler** (4.80 GBP): I often see this recommended in all the tutorials I found and I'm glad I bought it. You actually notice your RPi heating up at max load, so it's good to have a cooler to mitigate any damage to the board.

I actually bought the Essentials Kit from the Grand Arcade store at Cambridge, which is around 315 GBP.
As someone who is getting back into RPi again, I think it's worth it especially because the kit has added goodies like a dedicated case and a beginner's handbook.

I wouldn't go over setting up the RPi here since there are already many tutorials for that.
As for my case, I attached the active cooler, flashed the [RPi Imager](https://www.raspberrypi.com/software/) to my microSD, and let the magic happen:

## Running an inference server from RPi

The main goal here is to have a quantized version (or quants) of Qwen 3.8 27B running on a local inference server.
Specifically, I plan to use quants in the [GGUF format](https://huggingface.co/docs/hub/en/gguf) served via [llama-cpp](https://github.com/ggml-org/llama.cpp).
Interestingly, most RPi tutorials I found recommend [ollama](https://ollama.com/) as an inference server.
However, I am quite keen to use llama-cpp as it affords me more control and familiarity.

## Connecting to the inference server