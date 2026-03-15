---
layout: archive
permalink: /projects/
title: "Games"
author_profile: true
---
{% include base_path %}

<section class="games-hero" data-reveal>
  <p class="games-intro">I focused on game development during my undergrad at USC, building games with my friends. I’m a big fan of roguelike games like The Binding of Isaac, Hades, and Slay the Spire.</p>
</section>

<section class="games-grid">
  {% for post in site.projects reversed %}
    <article class="game-card" data-reveal>
      <a class="game-cover" href="{{ post.url | relative_url }}">
        {% if post.header.teaser %}
          <img src="{{ post.header.teaser | prepend: "/images/" | prepend: base_path }}" alt="{{ post.title }}">
        {% endif %}
      </a>
      <div class="game-body">
        <h3 class="game-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <div class="game-meta">
          {% if post.type %}<span class="meta-chip">{{ post.type }}</span>{% endif %}
          {% if post.duration %}<span class="meta-chip">{{ post.duration }}</span>{% endif %}
          {% if post.venue %}<span class="meta-chip">{{ post.venue }}</span>{% endif %}
        </div>
        <p class="game-summary">{{ post.excerpt | strip_html }}</p>
        <div class="game-actions">
          <a class="btn btn--light-outline" href="{{ post.url | relative_url }}">Case Study</a>
          {% if post.play_url %}
            <a class="btn hero-btn" href="{{ post.play_url }}" target="_blank" rel="noopener">Play</a>
          {% endif %}
        </div>
      </div>
    </article>
  {% endfor %}
</section>
