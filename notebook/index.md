---
layout: page
title: Notebook
description: Notes of Lester James V. Miranda
permalink: /notebook/
---

Here I document my experiments, thoughts, and analyses on a variety of topics.
This page also includes my study notes on books I read or courses I follow. I
hope my notebook helps you as much as it has helped me.

{% assign posts_by_year = site.categories.notebook | group_by_exp:"post", "post.date | date: '%Y'" %}

{% for year in posts_by_year %}
<h2>{{ year.name }}</h2>
<ul>
  {% for post in year.items %}
    <li>
      {{ post.date | date_to_string  | split: " " | slice: 0, 2 | join: " " }} » 
      {% if post.highlight %}&starf; {% endif %}
      <a href="{{ post.url }}" title="{{ post.title }}">
        {{ post.title | truncate: 72 }}
      </a>
    </li>
  {% endfor %}
</ul>
{% endfor %}
