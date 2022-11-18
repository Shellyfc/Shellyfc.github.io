---
layout: archive
permalink: /research/
title: "Research Experience"
author_profile: true
---
{% include base_path %}

{% for post in site.research reversed %}
  {% include archive-single.html %}
{% endfor %}