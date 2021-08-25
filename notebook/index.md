---
layout: page
title: Notebook
description: Notes of Lester James V. Miranda
permalink: /notebook/
---

Whenever I want to scratch an itch or solve a specific problem, I make sure
to document everything so that I can remember them in the future.
Hopefully, this notebook will interest you as others did.  

<ul>
  {% for post in site.categories.notebook %}
    <li>
        <span>{{ post.date | date_to_string }}</span> » {% if post.highlight %}&starf; {% endif %}<a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
