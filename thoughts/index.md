---
layout: page
title: Thoughts
description: Short, informal thoughts
permalink: /thoughts/
---

Short, half-formed thoughts &mdash; things I'm building, reading, and chewing on. For longer pieces and my newsletter, see my [Substack](https://jenniferjiangkells.substack.com).

{% assign sorted_thoughts = site.thoughts | sort: 'date' | reverse %}
{% if sorted_thoughts.size == 0 %}

*Thoughts coming soon.*

{% else %}
<dl class="media-list" markdown="0">
{% for thought in sorted_thoughts %}
  <dt>{{ thought.date | date: "%Y" }}</dt>
  <dd><a href="{{ thought.url | relative_url }}">{{ thought.title | escape }}</a>{% if thought.summary %} &mdash; {{ thought.summary | escape }}{% endif %}</dd>
{% endfor %}
</dl>
{% endif %}
