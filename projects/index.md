---
layout: page
title: Projects
description: Projects of Lester James V. Miranda
permalink: /projects/
---


Here are some of the non-trivial projects I built for the past few years.  My
definition of a *project* is a bit fuzzy; for now, these are things that I have
worked on with a tangible outcome like a library, website, or a game.

<ul>
  {% for post in site.categories.projects %}
    <li>
        <span>{{ post.date | date_to_string }}</span> » <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
        <meta name="description" content="{{ post.summary | escape }}">
        <meta name="keywords" content="{{ post.tags | join: ', ' | escape }}"/>
    </li>
  {% endfor %}
</ul>