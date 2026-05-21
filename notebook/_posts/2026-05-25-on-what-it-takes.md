---
layout: post
type: post
title: "The Filipino qualities we need to build world-class language technologies"
date: 2026-05-25
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
filipino_nlp: true
header-img: /assets/png/filipino-llm/header.png
tags: [tagalog, filipino, nlp, llm]
description: |
    I was invited to give a talk at Analytics & AI Association of the Philippines (AAP) on FilBench, and in general, building Filipino LLMs. This blog post covers some of my thoughts on this topic.
excerpt: |
---

<span class="firstcharacter">L</span>ast Saturday, I gave a talk at the Analytics & AI Association of the Philippines (AAP) on the topic of Philippine language model evaluation, specifically on [FilBench](/projects/2025/08/21/filbench/).[^1]
The purpose of the meetup was really to figure out (1) whether we can build a "Philippine LLM" and (2) what doing so would entail.
I had some experience building open language models back in my previous work, and my research on multilinguality is directly related, so I was able to share my thoughts and experiences.

To preface: the answer to the question of "can we actually build Filipino-centric LLMs?" is definitely **YES**.
The tools are open-source, some of the recipes are publicly available, and there's definitely a lot of talent.
However, the challenges are two-fold:

1. Building Filipino-centric LLMs **does not entail applying Silicon Valley approaches to our local contexts**. The capital difference is vast and the ecosystem is different. It's better to look into how our neighbors (geographically and economically) are doing it, such as Malaysia or Africa.

2. Figuring out real needs is paramount to **prevent the project from becoming a vanity training exercise.** If the use-case can be solved by the next ChatGPT or Claude release, then maybe it's not worth going deeper than the application layer. 

    Recently, there's been a lot of talk about retaining ownership over the whole LM development pipeline, hence the proliferation of sovereign LLMs. It's a common motivation, but I'm not yet well-versed in this topic. The point is: are we building this to fulfill a business need? To include more Philippine languages? To own the LM development stack?

So can we build Filipino-centric LLMs and contribute world-class technologies? My answer is **YES**, because we Filipinos have the unique qualities and values to do so.
The next step then is to provide an environment where these qualities will flourish. 
These qualities are: Diskarte, Sipag at Tiyaga, and Bayanihan.
Let me explain them in the following sections.

> We can build Filipino-centric LLMs and contribute world-class language technologies because we have the 
> unique qualities to do so: Diskarte, Sipag at Tiyaga, and Bayanihan. The challenge then is to create an environment that allows these qualities to flourish.

<!-- The slides below are taken from the closing remarks of my talk (about 75% of the talk is on FilBench), but the text doesn't map to them one-to-one.
Just think of this blog post as an extended version of those closing slides. -->



[^1]: I won't be talking a lot about FilBench in this blog post. But if you're curious, check out my [blog post](/projects/2025/08/21/filbench/), check the [leaderboard](https://huggingface.co/spaces/filbench/filbench-leaderboard), or read the [paper](https://aclanthology.org/2025.emnlp-main.127/)!


## Diskarte - how can we build with low compute and limited data resources?

After World War 2, several US Army Willys MB Trucks were left in the Philippines as American troops left the country.
There was a shortage of public transportation due to the destruction of infrastructure, and so, we began stripping down these trucks and altering them to add metal roofs, 
and various paintings and ornaments.
This later on became the jeepney or jeep, which is now our cultural icon and the current mode of transportation today.[^2]
Diskarte is difficult to translate into English because it can mean many things: resourcefulness, ingenuity, creative thinking, etc. 
There is this nice paper that talks about this at length, and I encourage anyone to read it.
Personally, I see diskarte as the ability to achieve a goal under extreme constraints.

[^2]: I really like the imagery of the jeepney to symbolize diskarte because my dad used to own and drive one, and I learned how to read by reading handpainted jeepney signs. 

Our NLP landscape is constrained in terms of both data and compute.
Although there is a significant presence of Filipino speakers and it's well-represented in the internet: so few have transformed this resource into useful and high-quality datasets.
This situation is even more pronounced in other Philippine languages.
In addition, our compute situation (for both development and deployment) leaves a lot to be desired.
We lack compute infrastructure to train LLMs and our internet and technology penetration is below our other ASEAN neighbors.

I argue that a good way to proceed is similar to how we approached the jeepney: taking these innovations and adapting them into our local contexts through ingenuity and resourcefulness.
Simply importing Silicon Valley approaches is not enough.
I wrote about this at length in a recent survey paper, but one approach I'm exploring is careful synthetic data generation to fill the lack of training data.
Synthetic data is now a common approach in training frontier language models, but I believe we can strip this down, add some ornaments and adjustments, in order for it to work on low-resource languages.







## Sipag at Tiyaga - how can we support open-ended and highly-experimental activities?



## Bayanihan - what type of partnerships should take place to enable innovation?
