---
title: Filipino NLP Collection
layout: page
description: A collection of all my writings in Filipino NLP 
permalink: /filipino-nlp/
tags: [filipino nlp, philippines, llm, natural language processing, filbench, large language models]
---

**HuggingFace**: [ljvmiranda921/filipino-nlp](https://huggingface.co/collections/ljvmiranda921/filipino-nlp)

This collection contains all my works on Filipino NLP.

My initial motivation to work on Filipino NLP was quite modest: I was the only Filipino on the [spaCy](https://spacy.io) team, and I thought it would be nice to represent and add Tagalog language support to the library. No one else was going to work on it, so why not me?
It's like being alone in a grocery aisle and spotting a cereal box on the floor—you're the only person there, you're capable, so why not just pick it up?

This sense of responsibility grew and shaped into what it is today. I'm also glad to know that I'm not alone: there are several researchers and practitioners who are also passionate about improving the state of Filipino NLP. We had our first success with [FilBench-Eval](https://aclanthology.org/2025.emnlp-main.127/) (EMNLP '25 Main), demonstrating that a scrappy grassroots team can do amazing research. There's so much more to come, and I'm excited to see what more we can achieve.

I'm **actively organizing researchers** interested in improving Filipino NLP through [FilBench](https://filbench.github.io).
It's a collective of researchers who work together through a few focused bets throughout the year. 
Sometimes I lead projects like in FilBench-Eval, sometimes others do. Join us or [reach out](https://calendar.app.google/5zov2iLcXX8NgDo8A)! 

## Writings

<ul>
  {% assign filipino_posts = site.posts | where: "filipino_nlp", true | sort: "date" | reverse %}
  {% for post in filipino_posts %}
    <li>
        <span>{{ post.date | date_to_string }}</span> » {% if post.highlight %}&starf; {% endif %}<a href="{{ post.url }}" title="{{ post.title }}">{{ post.title | truncate:72 }}</a>
    </li>
  {% endfor %}
</ul>

## Research

{% include publications.html data=site.data.filipino_publications %}
