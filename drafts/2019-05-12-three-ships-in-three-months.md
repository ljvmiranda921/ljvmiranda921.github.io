---
layout: post
title: "Three ships in three months"
date: 2019-05-12
category: projects
comments: true
author: "LJ MIRANDA"
summary: "Some updates on new open-source projects I shipped for the past three months"
tags: [machine learning, geospatial, python, golang, geomancer, tiffany, pyseagull, conway's game of life, mathematics]
---

It has been a long time since I've updated this blog. My last post was back in
February, where I talked about some of the [podcasts I listen
to](https://ljvmiranda921.github.io/life/2019/02/05/podcasts-i-listen-to/).
After that, work got busy and I didn't have time to write another post.

Good thing is, for the past three months, I've shipped three (3) open-source
projects for work and for personal use. So, instead of dedicating one
post for each, I guess it would be better to dump all of them here. Maybe
you'll find something useful!

- [Geomancer: Automated Feature Engineering for Geospatial Data](#1-geomancer-automated-feature-engineering-for-geospatial-data)
- [Tiffany: Convert to TIFF any Google Static Maps Image](#2-tiffany-convert-to-tiff-any-google-static-maps-image)
- [Seagull: Python Library for Conway's Game of Life](#3-seagull-python-library-for-conways-game-of-life)


### 1. Geomancer: Automated Feature Engineering for Geospatial Data

![Geomancer Logo](https://storage.googleapis.com/tm-geomancer/assets/header.png)

<a class="github-button" href="https://github.com/thinkingmachines/geomancer" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star thinkingmachines/geomancer on GitHub">Star</a>
<a class="github-button" href="https://github.com/thinkingmachines/geomancer/fork" data-icon="octicon-repo-forked" data-size="large" data-show-count="true" aria-label="Fork thinkingmachines/geomancer on GitHub">Fork</a>
<a class="github-button" href="https://github.com/thinkingmachines/geomancer/subscription" data-icon="octicon-eye" data-size="large" data-show-count="true" aria-label="Watch thinkingmachines/geomancer on GitHub">Watch</a>

This is one of the first open-source projects I built for [Thinking
Machines](https://thinkingmachin.es/). Given a set of coordinates, Geomancer
allows us to extract features/attributes based on a specific set of
points-of-interest (PoIs). 

We use Geomancer to obtain features such as the "distance to the nearest mall"
or "number of embassies within a certain range".  Features are then fed to a
machine learning model to enable wealth estimation or poverty prediction, you
can see some related work
[here](https://stories.thinkingmachin.es/philippines-most-vulnerable-communities/).

It leverages OpenStreetMaps data and a data warehouse like
[BigQuery](https://cloud.google.com/bigquery/) (you can also use Spatialite,
and soon, PostGIS), giving you the best of both worlds in terms of compute and
data source.

However, my favorite part in Geomancer is how *declarative* its API is. I was
also given the liberty to play with the module names, hence I called Features
as *Spells*:

```python
from geomancer.spells import DistanceToNearest

# Load the dataset in a pandas dataframe
# df = load_dataset()

dist_spell = DistanceToNearest(
"embassy",
source_table="ph_osm.gis_osm_pois_free_1",
feature_name="dist_embassy",
dburl="bigquery://project-name",
).cast(df)
```
In addition, we also added a `SpellBook` feature, allowing us to export the
features our analysts found relevant into a JSON file and be shared to others.

```python
from geomancer.spells import DistanceToNearest
from geomancer.spellbook import SpellBook

spellbook = SpellBook([
DistanceToNearest(
"supermarket",
source_table="ph_osm.gis_osm_pois_free_1",
feature_name="dist_supermarket",
dburl="bigquery://project-name",
),
DistanceToNearest(
"embassy",
source_table="ph_osm.gis_osm_pois_free_1",
feature_name="dist_embassy",
dburl="bigquery://project-name",
),
])

spellbook.to_json("my_spellbook.json")
```

So if I want to reproduce someone's features on my own dataset, I don't need to
re-define the spells programmatically. I just need to get the JSON SpellBook,
load it, and `cast()` it on my own data:

```python
from geomancer.spellbook import SpellBook

# Load the dataset in a pandas dataframe
# df = load_dataset()

spellbook = SpellBook.read_json("my_spellbook.json")
df_output = spellbook.cast(df)
```

Awesome right? Read more about Geomancer
[here](https://stories.thinkingmachin.es/geomancer). Lastly, Geomancer is not a
solo effort. I want to thank my
[workmates](https://github.com/thinkingmachines/geomancer/graphs/contributors)
in delivering this awesome project!

### 2. Tiffany: Convert to TIFF any Google Static Maps Image 

<p align="center">
<img src="https://raw.githubusercontent.com/thinkingmachines/tiffany/master/assets/tiffany-logo.png" alt="tiffany logo">
</p>

<a class="github-button" href="https://github.com/thinkingmachines/tiffany" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star thinkingmachines/tiffany on GitHub">Star</a>
<a class="github-button" href="https://github.com/thinkingmachines/tiffany/fork" data-icon="octicon-repo-forked" data-size="large" data-show-count="true" aria-label="Fork thinkingmachines/tiffany on GitHub">Fork</a>
<a class="github-button" href="https://github.com/thinkingmachines/tiffany/subscription" data-icon="octicon-eye" data-size="large" data-show-count="true" aria-label="Watch thinkingmachines/tiffany on GitHub">Watch</a>

Got it? *tiff*...*any*...*Tiffany!* 

This is my first Golang project and I'm pretty happy with it. Tiffany is just a
simple command line tool that eases the way we download and reference Google
Static Maps images: 

| Original image | Georeferenced  | With labels |
|----------------------------------------|-------------------------|-------------------------------|
|![orig](https://raw.githubusercontent.com/thinkingmachines/tiffany/master/assets/no_reference.png) | ![ref](https://raw.githubusercontent.com/thinkingmachines/tiffany/master/assets/with_reference.png)  | ![lbl](https://raw.githubusercontent.com/thinkingmachines/tiffany/master/assets/with_labels.png)|
| `--without-reference` | default | `--with-labels` | 


When you use tiffany, an API Token is still required, so you need to sign-up and
pay for one.

So if you want to download a static map given a coordinate, you just run:

```shell
tiffany 14.546943935986324 121.01974525389744
```
<p align="center">
<img src="https://storage.googleapis.com/tm-tiffany/assets/tiffany_single_demo_no_window.svg" alt="tiffany demo single">
</p>

This then downloads a 400x400-sized image that is already georeferenced (you
can configure the settings too in the command-line app). Pretty
neat! The best thing about it is that you can also pass a shapefile to easily
obtain cut-out building footprints for training your computer vision model:

```shell
tiffany 14.546943935986324 121.01974525389744 --with-labels=path/to/shapefile.shp
```

Lastly, you can pass a CSV file with all the coordinates you want to download,
and `tiffany` will download them for you!

```shell
tiffany batch coordinates.csv
```

<p align="center">
<img src="https://storage.googleapis.com/tm-tiffany/assets/tiffany_batch_demo_no_window.svg" alt="tiffany demo batch">
</p>

### 3. Seagull: Python Library for Conway's Game of Life 

<p align="center">
    <img src="https://imgur.com/Vgt6a5y.png" width="200" alt="Seagull logo">
</p>

<a class="github-button" href="https://github.com/ljvmiranda921/seagull" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star ljvmiranda921/seagull on GitHub">Star</a>
<a class="github-button" href="https://github.com/ljvmiranda921/seagull/fork" data-icon="octicon-repo-forked" data-size="large" data-show-count="true" aria-label="Fork ljvmiranda921/seagull on GitHub">Fork</a>
<a class="github-button" href="https://github.com/ljvmiranda921/seagull/subscription" data-icon="octicon-eye" data-size="large" data-show-count="true" aria-label="Watch ljvmiranda921/seagull on GitHub">Watch</a>

One of my latest personal projects is a simple Python library for Conway's Game
of Life, Seagull. *Why Seagull* you ask? Well because when you take the first
letters of **C**onway's **G**ame **O**f **L**ife, you get C.G.O.L., say it
faster and it starts sounding like "seagull", genius! 

I've been fascinated with cellular automata and artificial life in general, and
I think that creating a fun toy that allows me to experiment and explore
patterns might be very helpful. 

I made sure that Seagull's API is intuitive: just set-up your board, add your
lifeforms, and put them in a simulator! 

```python
import seagull as sg
from seagull.lifeforms import Pulsar

# Initialize board
board = sg.Board(size=(19,60))  

# Add three Pulsar lifeforms in various locations
board.add(Pulsar(), loc=(1,1))
board.add(Pulsar(), loc=(1,22))
board.add(Pulsar(), loc=(1,42))

# Simulate board
sim = sg.Simulator(board)      
sim.run(sg.rules.conway_classic, iters=1000)
```

You then just call `sim.animate()` to view your animation like so:

<p align="center">
  <img src="https://imgur.com/sgCrP9f.gif" width="720" alt="animation sample">
</p>

I also made a [nice collection of
lifeforms](https://pyseagull.readthedocs.io/en/latest/api/seagull.lifeforms.html)
to choose from, so get crazy!
