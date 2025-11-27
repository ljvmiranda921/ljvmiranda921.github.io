---
title: 🇵🇭 Filipino NLP Collection
layout: page
description: A collection of all my writings in Filipino NLP 
permalink: /filipino-nlp/
tags: [filipino nlp, philippines, llm, natural language processing, filbench, large language models]
---

This collection contains all my works on Filipino NLP.

My initial motivation to work on Filipino NLP was quite modest: I was the only Filipino on the [spaCy](https://spacy.io) team, and I thought it would be nice to represent and add Tagalog language support to the library. No one else was going to work on it, so why not me?
It's like being alone in a grocery aisle and spotting a cereal box on the floor—you're the only person there, you're capable, so why not just pick it up?

This sense of responsibility grew and shaped into what it is today. I'm also glad to know that I'm not alone: there are several researchers and practitioners who are also passionate about improving the state of Filipino NLP. We had our first success with [FilBench-Eval](https://aclanthology.org/2025.emnlp-main.127/) (EMNLP '25 Main), demonstrating that a scrappy grassroots team can do amazing research. There's so much more to come, and I'm excited to see what more we can achieve.

I'm actively organizing researchers interested in improving Filipino NLP through [FilBench](https://filbench.github.io).
It's a collective of researchers who work together through a few focused bets throughout the year. 
Sometimes I lead projects like in FilBench-Eval, sometimes others do. Join us or [reach out](https://calendar.app.google/5zov2iLcXX8NgDo8A)! 

<style>
.filipino-nlp-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .filipino-nlp-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.filipino-nlp-column h2 {
  margin-top: 0;
}

.filipino-nlp-column h3 {
  font-size: 1.3rem;
  margin-top: 1.2rem;
  margin-bottom: 0.3rem;
}
</style>

<div class="filipino-nlp-grid">
<div class="filipino-nlp-column" markdown="1">

## Writings

{% assign filipino_posts = site.posts | where: "filipino_nlp", true | sort: "date" | reverse %}
{% assign posts_by_year = filipino_posts | group_by_exp: "post", "post.date | date: '%Y'" %}

{% for year_group in posts_by_year %}
### {{ year_group.name }}

{% for post in year_group.items -%}
- [{{ post.title }}]({{ post.url }}) ({{ post.date | date: "%B %-d, %Y" }})
{% endfor -%}

{% endfor %}

</div>
<div class="filipino-nlp-column" markdown="1">

## Research

- [FilBench: Can LLMs Generate and Understand Filipino?](https://aclanthology.org/2025.emnlp-main.127/)
  <br>_EMNLP '25 Main_
  <br>**Lester James V. Miranda\***, Elyanah Aco\*, Conner Manuel\*, Jan Christian Blaise Cruz, Joseph Marvin Imperial
  <br>[Code](https://github.com/filbench/filbench-eval) / [Website](https://huggingface.co/spaces/UD-Filipino/filbench-leaderboard)

- [The UD-NewsCrawl Treebank: Reflections and Challenges from a Large-scale Tagalog Syntactic Annotation Project](https://aclanthology.org/2025.acl-long.357/)
  <br>_ACL '25 Main_
  <br>Angelina A. Aquino\*, **Lester James V. Miranda\***, Elsie Marie T. Or\*
  <br>[Dataset](https://huggingface.co/collections/UD-Filipino/universal-dependencies-for-tagalog-67573d625baa5036fd59b317) / [Slides](https://drive.google.com/file/d/1LGm4v9ZsSftDHI9vkl9mj1BYBSZZX_uA/view?usp=drive_link) / [Poster](https://drive.google.com/file/d/16ONq_xmRrUgvALirWEwX0BpZnn1OtqwH/view?usp=drive_link) / [Video](https://youtu.be/W4cONaL_otI?si=DgfmF0_7zkOmI_ma)

- [SEACrowd: A Multilingual Multimodal Data Hub and Benchmark Suite for Southeast Asian Languages](https://aclanthology.org/2024.emnlp-main.296/)
  <br>_EMNLP '24 Main_
  <br>Holy Lovenia\*, Rahmad Mahendra\*, Salsabil Maulana Akbar\*, **Lester James Miranda\***, and 50+ other authors _(&lowast;: major contributor)_.
  <br>[Code](https://github.com/SEACrowd/seacrowd-datahub) / [Website](https://seacrowd.github.io/seacrowd-catalogue)

- [Universal NER: A Gold-Standard Multilingual Named Entity Recognition Benchmark](https://aclanthology.org/2024.naacl-long.243/)
  <br>_NAACL '24 Main_
  <br>Stephen Mayhew, Terra Blevins, Shuheng Liu, Marek Šuppa, Hila Gonen, Joseph Marvin Imperial, Börje F. Karlsson, Peiqin Lin, Nikola Ljubešic&#769;, **LJ Miranda**, Barbara Plank, Arij Riabi, Yuval Pinter
  <br>[Dataset](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/GQ8HDL) / [Website](https://www.universalner.org/)

- [calamanCy: a Tagalog Natural Language Processing Toolkit](https://aclanthology.org/2023.nlposs-1.1/)
  <br>_NLP Open-Source Software (NLP-OSS) Workshop @ EMNLP '23_
  <br>**Lester James V. Miranda**
  <br>[Code](https://github.com/ljvmiranda921/calamanCy) / [Poster](https://drive.google.com/file/d/1Q_-4Lf9ZL9ZCYS5aWPhRnCfHPhGwlBp6/view?usp=drive_link) / [Video](https://youtu.be/2fbzs1KbFTQ?si=_vKEY11Z1Jzuaxeu)

- [Developing a Named Entity Recognition Dataset for Tagalog](https://aclanthology.org/2023.sealp-1.2/)
  <br>_Southeast Asian Language Processing (SEALP) Workshop @ IJCNLP-AACL '23_
  <br>**Lester James V. Miranda**
  <br>[Code](https://github.com/ljvmiranda921/calamanCy/tree/master/reports/aacl2023/benchmark) / [Dataset](https://huggingface.co/datasets/ljvmiranda921/tlunified-ner) / [Slides](https://drive.google.com/file/d/1QVbW7Myou6U6cSqrlz5p_35Sl__008kG/view?usp=drive_link) / [Video](https://www.youtube.com/watch?v=WAJ8IEIHuiM)

</div>
</div>
