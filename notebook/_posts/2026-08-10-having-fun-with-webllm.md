---
layout: post
type: post
title: "Play 20 Questions with an LLM!"
date: 2026-08-10
category: notebook
comments: true
author: "LJ V. MIRANDA"
published: true
filipino_nlp: true
tags: [webllm, llm, large language model, edge models, local inference]
description: |
    As the title says, play 20 questions with an LLM: the model secretly picks a word, then you ask up to 20 yes/no questions to figure out what it is. Fewer questions means better score. 
excerpt: |
---

A small language model, running entirely in your browser via [WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)&mdash;no
server, no API key, nothing leaves your device.
Pick a mode, choose which model to play against, and go.
In **I Guess**, the model secretly picks a word and you interrogate it;
in **LLM Guesses**, you think of something and the model tries to read your mind.
The first load downloads the model (it's cached afterwards), so give it a moment.

<div style="text-align: center; margin: 1.5em 0;">
<iframe src="/assets/images/having-fun-with-webllm/twenty-questions.html" title="20 Questions with an LLM" width="100%" height="720" style="border: 1px solid #e2e2d6; border-radius: 6px; max-width: 720px;"></iframe>
</div>

The whole thing is a single standalone HTML file&mdash;you can
[grab it here](/assets/images/having-fun-with-webllm/twenty-questions.html)
and drop it anywhere.
It uses [`@mlc-ai/web-llm`](https://github.com/mlc-org/web-llm) to run the model,
keeps the full conversation in a `messages` array so the model stays consistent,
and at the end spits out a Wordle-style share card
(🟢 yes / 🔴 no / 🟡 sort of, ending with ✅ or ❌) you can copy and brag with.