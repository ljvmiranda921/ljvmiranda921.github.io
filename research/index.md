---
layout: page
title: Research work
description: Research work of Lester James V. Miranda
permalink: /research/
---

This page shows my research activities, both finished and ongoing. I've
attached preprints for works that have already been completed. Unfortunately,
for works with a copyright claim (e.g. IEEE), I can only provide the link
to the publisher's website. For ongoing research, I will only attach
a preliminary abstract of my work.

---

<div class="research">
{% for post in site.categories.research %}
<div class="container">
    <div class="title">{{ post.title }}</div>
    <div>
    <span>
        <span id="date">[{{ post.date | date_to_string }}]</span>
        {{post.authors}}
    </span>
    </div>
    <a class="publication" href="{{ post.url }}">{{ post.publication }}</a>
    <img class="thumbnail" src="{{ post.thumbnail }}" alt="Publication thumbnail">
    <div class="abstract">{{ post.abstract }}</div>
</div>
{% endfor %}
</div>
