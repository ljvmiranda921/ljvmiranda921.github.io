---
layout: page
title: Notes
description: Short, informal notes
permalink: /notes/
---

Short, informal notes &mdash; things I'm building, reading, and thinking about. For longer pieces and my newsletter, see my [Substack](https://jenniferjiangkells.substack.com).

{% assign sorted_notes = site.notes | sort: 'date' | reverse %}
{% if sorted_notes.size == 0 %}

*Notes coming soon.*

{% else %}
<dl class="media-list" markdown="0">
{% for note in sorted_notes %}
  <dt>{{ note.date | date: "%Y" }}</dt>
  <dd><a href="{{ note.url | relative_url }}">{{ note.title | escape }}</a>{% if note.summary %} &mdash; {{ note.summary | escape }}{% endif %}</dd>
{% endfor %}
</dl>
{% endif %}
