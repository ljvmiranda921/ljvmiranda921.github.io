---
layout: post
type: post
title: "Am I smarter than a text generator?"
date: 2024-03-10
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [llm, humaneval, evaluation, annotation, prodigy, nlp, gpt, qa, hellaswag, winogrande]
---

<span class="firstcharacter">N</span>owadays, it's common to see researchers evaluate large language models on "very human" tasks such as reasoning, logic, or math.
Unlike linguistic tasks such as NER and POS tagging, these *humanlike* tasks assess skills that we use everyday.
Several benchmark datasets (e.g., HellaSwag, TydiQA, Winogrande, etc.) were even built to examine these skills.

Most of these datasets were written in the question-answering (QA) format.
I like QA because it is an affordance that is one step closer to how we function as interlocutors&mdash; we don't answer in terms of parse trees or span offsets, but we answer in terms of phrases and utterances.
Because of this parity, I am inclined to see how well I'll fare if exposed to the same questions a language model had.
And this brings us back to the title of this blog post: am I smarter than a text generator?