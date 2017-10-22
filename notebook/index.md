---
layout: page
title: Notebook
description: Notes of Lester James V. Miranda
permalink: /notebook/
pagination: 
  enabled: true
  category: notebook
---

Here I write about the things that interest me: thoughts on a certain
topic, solutions for an online course, or tutorials for a specific
problem. As of now, I would like to treat this page as a repository of
the things that I experiment on, so expect that
I'll be posting a lot from a wide range of topics!


<ul class="post-list">
  {% for post in paginator.posts %}
    <li>
        <span>{{ post.date | date_to_string }}</span> » <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
        <div class="my-excerpt"><span><p>&ldquo;{{ post.excerpt | remove: '<p>' | remove: '</p>' }}&hellip;&rdquo;</p></span></div>
    </li>
  {% endfor %}
</ul>

{% if paginator.total_pages > 1 %}
<div class="pagination pagination-centered">
  <ul>

      {% if paginator.previous_page %}
      <li class="previous">
          <a href="{{ paginator.previous_page_path | prepend: site.baseurl | replace: '//', '/' }}">&larr; Newer Posts</a>
      </li>
      {% endif %}

      {% if paginator.page_trail %}
        {% for trail in paginator.page_trail %}
          <li {% if page.url == trail.path %}class="active"{% endif %}>
              <a href="{{ trail.path | prepend: site.baseurl | replace: '//', '/' }}" title="{{trail.title}}">{{ trail.num }}</a>
          </li>
        {% endfor %}
      {% endif %}

      {% if paginator.next_page %}
      <li class="next">
          <a href="{{ paginator.next_page_path | prepend: site.baseurl | replace: '//', '/' }}">Older Posts &rarr;</a>
      </li>
      {% endif %}

  </ul>
</div>
{% endif %}