---
layout: page
title: Projects
description: Projects
permalink: /projects/
---

A list of projects that I have lead, including personal projects, open-source software created under dotimplement, and software written as part of larger grant-funded research projects.

<ul>
  {% for post in site.categories.projects %}
    <li>
        <span>{{ post.date | date_to_string }}</span> » <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
        <meta name="description" content="{{ post.summary | escape }}">
        <meta name="keywords" content="{{ post.tags | join: ', ' | escape }}"/>
    </li>
  {% endfor %}
</ul>