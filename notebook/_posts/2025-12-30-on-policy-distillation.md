---
layout: post
type: post
title: "Playing around Tinker's API: long-context distillation for Tagalog MT just from a grammar book"
date: 2025-12-30
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags:
  [
    nlp,
    distillation,
    on-policy,
    natural language processing,
    tinker,
    thinking machines,
    llm,
  ]
description: |
  During the holidays, I played around Thinking Machines' Tinker API to check whether I can teach a model to do Tagalog machine translation just using a grammar book. 
  Read on to find out more!
excerpt: |
---

<!-- use olmocr to parse thsi: https://theswissbay.ch/pdf/Books/Linguistics/Mega%20linguistics%20pack/Austronesian/Tagalog%2C%20Basic%20%28Aspillera%29.pdf -->

<!-- or this one: https://fieldarchive.iias.tsinghua.edu.cn/_upload/article/files/05/21/06869c71412ca775f3dcab891c0d/4046c376-e537-4b19-91bc-d167f1468485.pdf -->

<!-- very loooong (678 pages): https://theswissbay.ch/pdf/Books/Linguistics/Mega%20linguistics%20pack/Austronesian/Tagalog%20Reference%20Grammar%20%28Schachter%20%26%20Otanes%29.pdf -->

<!-- use that as your very loooong context -->