---
layout: page
title: Projects
description: Projects of Lester James V. Miranda
permalink: /projects/
---

I present to you side-projects that I've built and currently maintaining. If you're looking for my other data projects, I've moved them in the Notebook page to showcase here more of my long-term
works. Enjoy!

<div class="projects-home">
  <ul class="posts">
    {% for post in site.categories.projects %}
      <li>
        <span class="post-date">{{ post.date | date_to_string }}</span>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        {{post.summary}}
        <meta name="description" content="{{ post.summary | escape }}">
        <meta name="keywords" content="{{ post.tags | join: ', ' | escape }}"/>
      </li>
    {% endfor %}
  </ul>
</div>