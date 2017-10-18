---
layout: page
title: Projects
description: Projects of Lester James V. Miranda
permalink: /projects/
---

I present to you some of the works I've done for my side-projects. Check them out!

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