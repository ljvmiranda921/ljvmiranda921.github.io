---
layout: page
title: Notebook
description: Notes of Lester James V. Miranda
permalink: /notebook/
---

Here I document my experiments, thoughts, and analyses on a variety of topics.
This page also includes my study notes on books I read or courses I follow. I
hope my notebook helps you as much as it has helped me.

<ul>
  {% for post in site.categories.notebook %}
    <li>
        <span>{{ post.date | date_to_string }}</span> » {% if post.highlight %}&starf; {% endif %}<a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
