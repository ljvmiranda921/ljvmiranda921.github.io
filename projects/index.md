---
layout: page
title: Projects
description: Projects of Lester James V. Miranda
permalink: /projects/
---

I present to you some of the data projects that I have done. I also enjoy
applying data science and machine learning techniques in the
Philippine context, for it gives me a unique take in understanding
our culture, society, and systems. Check them out!

<ul>
  {% for post in site.categories.projects %}
    <li>
        <span>{{ post.date | date_to_string }}</span> » <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
        <meta name="description" content="{{ post.summary | escape }}">
        <meta name="keywords" content="{{ post.tags | join: ', ' | escape }}"/>
    </li>
  {% endfor %}
</ul>