---
layout: post
type: post
title: "'Are you sure?' Challenging LLMs with follow-up questions"
date: 2024-02-12
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
header-img: /assets/png/llm-follow-up/header.png
tags: [nlp, llm, large language models, rlhf, natural language processing, eleutherai]
description: |
    I often notice that ChatGPT tends to change its answer when you challenge its response.
    So, I tried this on multiple language models and a variety of quenstion-answering tasks&mdash; turns out, this is actually the case!
    Let me share my findings in this blog post.
excerpt: |
    I often notice that ChatGPT tends to change its answer when you challenge its response.
    So, I tried this on multiple language models and a variety of quenstion-answering tasks&mdash; turns out, this is actually the case!
    Let me share my findings in this blog post.
---

<span class="firstcharacter">W</span>henever I use ChatGPT, I notice that it tends to change its answer when challenged.
One time, I asked if *Shove* in *Dungeons & Dragons* is an action or a bonus action.
Initially, it answered that shove is an action. 
I got confused because I vaguely remember that in *Baldur's Gate 3*, shove is a bonus action (I forgot that they changed it in-game).
So I replied: "are you sure?"&mdash; and ChatGPT gladly changed its answer to the incorrect one. 

There were many moments like this, so I decided to investigate this more systematically.

## Evaluating LMs on knowledge-based QA tasks

I'll look into *knowledge-based* tasks for my experiments, i.e., they contain questions that require factual knowledge.



