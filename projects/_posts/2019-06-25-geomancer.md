---
layout: post
title: "Geomancer: automate extraction of geospatial features"
date: 2019-06-25
category: projects
comments: true
author: "LJ MIRANDA"
tags: [geospatial data, geomancer, gis, data science, bigquery, gcp, google cloud]
header-img: /assets/png/geomancer/header.jpg
description: |
    Talking about an open-source project I did at work!
excerpt: |
    Talking about an open-source project I did at work!
---

> November 2021: As of now, the Geomancer repository is archived. I've recently
> changed jobs too as I am now working in open-source full time with
> [Explosion](https://explosion.ai) and [spaCy](https://spacy.io)!
> You can check out my [retrospective](#postscript) at the end.

<span class="firstcharacter">L</span>ast Tuesday, I gave a talk at Databeers
Manila at the [Asian Institute of Management](https://www.aim.edu/) about
[Geomancer](https://github.com/thinkingmachines/geomancer), an open-source
library that I helped build. So I figured it best to talk about the project
through my slides and give a deeper context to some of the library's design.

![](/assets/png/geomancer/title.jpg){:width="560px"}  
{: style="text-align: center;"}


## Why build Geomancer?

Through some of our geospatial client work, we saw how informative a single
coordinate could be. When taken together, we can extract patterns that can help
us with tasks like wealth estimation, building detection, and hub estimation.
However, a significant prerequisite involves getting useful machine learning
features to train statistical models.[^1]

![](/assets/png/geomancer/single_coord.png){:width="560px"}  
{: style="text-align: center;"}


**Feature engineering** is a common task in machine learning. It involves
transforming raw data into features that can be used for statistical learning
techniques. There is no easy way to do these for data scientists as of late.
Most require extensive knowledge of geospatial tools like
[QGIS](https://www.qgis.org/en/site/) or
[ArcGIS](https://www.arcgis.com/home/index.html). These techniques also don't
work well at scale: workflows can be complicated, and costly in compute and
storage.

![](/assets/png/geomancer/scale.png){:width="560px"}  
{: style="text-align: center;"}

[Geomancer](https://github.com/thinkingmachines/geomancer/) aims to bridge that gap by providing a Python library and a framework
to setup a geospatial feature engineering system.

![](/assets/png/geomancer/geomancer.png){:width="560px"}  
{: style="text-align: center;"}

## What can Geomancer do?

[Geomancer](https://github.com/thinkingmachines/geomancer/) allows users to easily define features, connect to multiple data
warehouses, and share or reproduce features. Data scientists need only to
interact with the `geomancer` Python library, while data engineers setup the
backend connection to the data warehouse.

Given a set of lat-long coordinates, users define a
[`Spell`](https://geomancer.readthedocs.io/en/latest/api/geomancer.spells.html#module-geomancer.spells)
to **declaratively create features**. These are the building blocks of the
library. A spell can be a distance to nearest point-of-interest (POI), number of
POIs within a set distance, and more!

![](/assets/png/geomancer/features.png){:width="560px"}  
{: style="text-align: center;"}

For example, we want to get the distance to the nearest embassy for a number of points. We first transform our list of coordinates into a Pandas DataFrame, then define a spell from the `DistanceToNearest` primitive. We pass the name of the POI, the data warehouse source (more on that later), and the name of the resulting feature:

```python
from geomancer.spells import DistanceToNearest
import pandas as pd

# Dataframe of coordinates with columns 'latitude' and `longitude'
my_coords = pd.read_csv("coordinates.csv")

spell = DistanceToNearest("embassy",
    source_table="bigquery_osm_table",
    feature_name="dist_embassy",
)
```

We can then
[`cast`](https://geomancer.readthedocs.io/en/latest/api/geomancer.spells.html#geomancer.spells.base.Spell.cast)
this
[`Spell`](https://geomancer.readthedocs.io/en/latest/api/geomancer.spells.html#module-geomancer.spells)
on the DataFrame to obtain a new one with the feature, `dist_embassy`, in another column.

```python
output_df = spell.cast(my_coords)
```

Getting single features might be a hassle, so the library also has a way to
group features (`Spells`) into a collection via a
[`SpellBook`](https://geomancer.readthedocs.io/en/latest/api/geomancer.spellbook.html).
You can also serialize features into a JSON file for **sharing and
reproducibility**.


![](/assets/png/geomancer/repro.png){:width="560px"}  
{: style="text-align: center;"}

Suppose after our analysis, we realized that the distance to primary
roads and number of nearby supermarkets are good indicators for estimating
wealth. We can collect these features into a `SpellBook`, and then
export it as a JSON file:

```python
from geomancer.spells import DistanceToNearest, NumberOf
from geomancer.spellbook import SpellBook

spellbook = SpellBook(
             spells=[
                DistanceToNearest(
                    "primary",
                    source_table="bigquery_osm_table",
                    feature_name="dist_primary"
                ),
                NumberOf(
                    "supermarket"
                    source_table="bigquery_osm_table",
                    feature_name="num_supermarkets"
                ),
             ])

spellbook.author = "Juan dela Cruz"
spellbook.description = "Good features for economic indicators"
spellbook.to_json("features.json")
```

We can then send these features to another data scientist so that they can try it out in their own set of coordinates (maybe to verify it in another location or country):

```python
from geomancer.spellbook import SpellBook
import pandas as pd

coords = pd.read_csv("country_coords.csv")

spellbook = SpellBook.read_json("features.json")
df_with_features = spellbook.cast(coords)
```


[Geomancer](https://github.com/thinkingmachines/geomancer) obtains these
features because it's **connected to a data warehouse** (in the above case, it's
[BigQuery](https://cloud.google.com/bigquery)). Most geospatial datasets are
stored in these large [OLAP databases](https://www.ibm.com/topics/olap) and
[Geomancer](https://github.com/thinkingmachines/geomancer) takes advantage of
their storage and compute capabilities. As of now, the library has drivers for
BigQuery, [PostGIS](https://postgis.net/), and
[SpatiaLite](https://www.gaia-gis.it/fossil/libspatialite/index).

![](/assets/png/geomancer/dwh.png){:width="560px"}  
{: style="text-align: center;"}

And that's it for the library portion of [Geomancer!](https://github.com/thinkingmachines/geomancer) You can install `geomancer` via `pip`, and start casting spells your way! In the next section, I'll discuss the framework's architecture and layout. 
It's an interesting read if you want to know more how we set up [Geomancer](https://github.com/thinkingmachines/geomancer) in [Thinking Machines](https://thinkingmachin.es).

## Architecture

There are two main components for
[Geomancer](https://github.com/thinkingmachines/geomancer): the Python library
and the geospatial data warehouse. You can think of
[Geomancer](https://github.com/thinkingmachines/geomancer) as a glorified
database query writer. The Python library allows us to abstract away the need to
write complicated SQL queries and spend time setting up and configuring
databases.

![](/assets/png/geomancer/architecture.png){:width="720px"}  
{: style="text-align: center;"}

Starting from left to right:
- The **interface** is a standard Python library. Its **backend** is ran via the [SQLAlchemy engine](https://www.sqlalchemy.org/), which allows us to combine and group queries together without the hassle of a templating engine. We extended the [SQLAlchemy Core](https://docs.sqlalchemy.org/en/20/core/) with the databases we support. This process allows us to write dialects (i.e., different variations of the SQL language) to our liking.
- The **geospatial data warehouse** stores the datasets we have. In the example above, you can see this referenced as `bigquery_osm_table`. We setup pipelines to obtain data from **external sources** such as [Geofabrik](https://www.geofabrik.de/) and [OpenStreetMap](https://www.openstreetmap.org/), plus some of our proprietary data sources.

Personally, I like this setup because there's a clear delination between a data
scientist and data engineer's role. They both do what they do best: the former
on engineering features and the latter on setting up pipelines.

## Postscript

*(Retrospective December 2021)* Unfortunately, development on Geomancer was
discontinued because of several factors: I got busy on client work, I managed my
own team, and the use-cases might not be as big as I imagined it to be.
Development staled and went to a halt.
I also handled bigger consulting clients back then so I wasn't able to focus much on internal open-source work.

Nevertheless, two years after Geomancer, I learned a lot about the
non-engineering side of software engineering. Sure, I think my technical
knowledge has grown but the invisible parts of developing software revealed
themselves to me:
- Time is money. We spent a lot of time developing it that there should always
be a relevant business-case to "break even." This can be in the form of a client
project that demonstrates the tool or a SaaS. We don't practice the latter and we
can't find the former so it was a cost deficit in the end.
- Don't be attached to your code. Younger version of me still has an unhealthy relationship with my passion that seeing things not work out bums me out. I have reflected on this recently, see ["my personal framework for flourishing."](life/2021/09/21/build-earn-play/) Sometimes the business strategy changes, and your work may not be part of it.
- Learn to market. Before, the development of Geomancer was done by a small
group of volunteers. As we all got busy, we deprioritized open-source work for
more money-generating activities (business development, client work, etc.). I
still believe in the importance of this tool, but I think I failed to market it
properly.

Lastly, I learned that I love working in open-source! Open source software was
my gateway to programming since 2017 and five years down the line, it's still
something I enjoy. I decided to devote myself on open-source when the
opportunity presented itself, and so I accepted an offer to work at
[spaCy](https://spacy.io) (originally I was planning to go back to Ateneo to
prep for Ph.D., but winds of change)!

I'm also grateful for [Thinking Machines](https://thinkingmachin.es) for giving
me the space to develop this library, and also for various volunteers that
helped me build it. Thank you!
I wrote this postscript because I want to bookend this experience on a good
note.[^2] I don't think Geomancer was successful. But at least I can close that 
chapter with finality. It sucks, but such is life. The Github repository for
[Geomancer](https://github.com/thinkingmachines/geomancer) is now archived.
[Thinking Machines](https://thinkingmachin.es) is now working on another geospatial tool,
[Geowrangler](https://github.com/thinkingmachines/geowrangler). I wish this new
project success!


## Footnotes

[^1]: 

    We want to differentiate between geospatial and machine learning features. They're the same term but refer to different things. *Geospatial features* include coordinates, attributes, and temporal information. We can consider the features extracted by Geomancer as a derivation of geospatial features. 

[^2]:

    I was also inspired by Seiya Tokui's [reflections on
    Chainer](https://www.beam2d.net/blog/2019/12/10/chainer-look-back-en/). A
    few years ago, [Preferred Networks](https://www.preferred.jp/en/) shifted
    from using [Chainer](https://chainer.org/) (their in-house neural net
    framework) to [Pytorch](https://pytorch.org/). I know Geomancer is not as 
    big as Chainer, but I definitely feel for Tokui-san's post.
