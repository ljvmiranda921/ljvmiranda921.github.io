---
layout: page
title: Life
description: Thoughts about the researcher and developer life
permalink: /life/
---

Inasmuch as I want to use this blog to showcase some of the works I've done, I
also want to use this platform to reflect upon various things on my
developer and researcher life. 

<ul>
  {% for post in site.categories.life %}
    <li>
        <span>{{ post.date | date_to_string }}</span> » <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
        <meta name="description" content="{{ post.summary | escape }}">
        <meta name="keywords" content="{{ post.tags | join: ', ' | escape }}"/>
    </li>
  {% endfor %}
</ul>
