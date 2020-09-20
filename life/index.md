---
layout: page
title: Life
description: Thoughts about the researcher and developer life
permalink: /life/
---

Some reflections on the developer and researcher life, plus stories of my
journey. Trying to add a personal touch to code. Opinions are solely my own and do not
reflect those of my institution or affiliation.

<ul>
  {% for post in site.categories.life %}
  {% if post.type == "post" %}
    <li>
        <span>{{ post.date | date_to_string }}</span> » <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
        <meta name="description" content="{{ post.summary | escape }}">
        <meta name="keywords" content="{{ post.tags | join: ', ' | escape }}"/>
    </li>
  {% endif %}
  {% endfor %}
</ul>
