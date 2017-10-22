---
layout: page
title: Projects
description: Projects of Lester James V. Miranda
permalink: /projects/
---

I present to you side-projects that I've built and currently maintaining.
If you're looking for my [other data projects](/tag/data%20project/),
I've moved them in the [Notebook](/notebook/) page to showcase here the
long-term works I've done.

<div class="projects-home">
  <ul class="posts">
    {% for post in site.categories.projects %}
      <li>
        <span class="post-date">{{ post.date | date_to_string }}</span>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        {{ post.description }}
      </li>
    {% endfor %}
  </ul>
</div>