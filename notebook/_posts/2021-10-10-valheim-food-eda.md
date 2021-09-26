---
layout: post
type: post
title: "Valheim"
date: 2021-10-10
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [valheim, game, data science]
description: test
excerpt: test
---

# Valheim Food EDA

In this notebook, I will visualize the food choices in the game, Valheim. From this analysis, I'd like to answer the following questions:
- Which food trio will give you the most HP / Stamina?
- Which food trio is best if you want a well-balanced stat?
- Which food trio is best for combat? For exploration?

## Import libraries

We will be using BeautifulSoup, Pandas, and Altair to scrape, clean, and visualize the data respectively.


```python
import pandas as pd
from bs4 import BeautifulSoup
import fandom
import re
import requests
```


```python
# Set the wiki root to search for
fandom.set_wiki("Valheim")
# Set the URL
url = "https://valheim.fandom.com/wiki/Food"
```

## Data cleaning and preparation

It seems that the Valheim Wiki has compiled a list of food choices in the game. Good thing, pandas has a `read_html` function that allows me to get the table directly without having to write my own scraper. This function gives a list of DataFrame tables found in the given webpage.


```python
df_list = pd.read_html(url, flavor="bs4")
df = df_list[0]  # We only have 1 table in that page, so let's just get that one
```


```python
df.head(5)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>

<table border="1" class="dataframe" style="font-size:14px; overflow-x: auto; display: block">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Name</th>
      <th>Icon</th>
      <th>Health</th>
      <th>Stamina</th>
      <th>Total</th>
      <th>Healing (hp/tick)</th>
      <th>Duration (sec)</th>
      <th>Stack Size</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Raspberries</td>
      <td>NaN</td>
      <td>7</td>
      <td>20</td>
      <td>27.0</td>
      <td>1</td>
      <td>600</td>
      <td>50</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Mushroom</td>
      <td>NaN</td>
      <td>15</td>
      <td>15</td>
      <td>30.0</td>
      <td>1</td>
      <td>900</td>
      <td>50</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Blueberries</td>
      <td>NaN</td>
      <td>8</td>
      <td>25</td>
      <td>33.0</td>
      <td>1</td>
      <td>600</td>
      <td>50</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Carrot</td>
      <td>NaN</td>
      <td>10</td>
      <td>32</td>
      <td>42.0</td>
      <td>1</td>
      <td>900</td>
      <td>50</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Cloudberries</td>
      <td>NaN</td>
      <td>13</td>
      <td>40</td>
      <td>53.0</td>
      <td>1</td>
      <td>900</td>
      <td>50</td>
    </tr>
  </tbody>
</table>
</div>



It looks good, it seems that I have most of the information I need (Health, Stamina, Duration). The remaining column that I need is the "Stage" of the game. I guess I'll need to find it by other means. In addition, the `Icon` column are all NaNs. I can get them by scraping it manually:


```python
content = requests.get(url)
soup = BeautifulSoup(content.text)
image_links = [
    img["href"] for img in soup.find("table").find_all("a", class_="image", href=True)
]
```


```python
# Replace Icon with the links
df["Icon"] = image_links
```


```python
df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe" style="font-size:14px; overflow-x: auto; display: block">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Name</th>
      <th>Icon</th>
      <th>Health</th>
      <th>Stamina</th>
      <th>Total</th>
      <th>Healing (hp/tick)</th>
      <th>Duration (sec)</th>
      <th>Stack Size</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Raspberries</td>
      <td>https://static.wikia.nocookie.net/valheim/imag...</td>
      <td>7</td>
      <td>20</td>
      <td>27.0</td>
      <td>1</td>
      <td>600</td>
      <td>50</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Mushroom</td>
      <td>https://static.wikia.nocookie.net/valheim/imag...</td>
      <td>15</td>
      <td>15</td>
      <td>30.0</td>
      <td>1</td>
      <td>900</td>
      <td>50</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Blueberries</td>
      <td>https://static.wikia.nocookie.net/valheim/imag...</td>
      <td>8</td>
      <td>25</td>
      <td>33.0</td>
      <td>1</td>
      <td>600</td>
      <td>50</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Carrot</td>
      <td>https://static.wikia.nocookie.net/valheim/imag...</td>
      <td>10</td>
      <td>32</td>
      <td>42.0</td>
      <td>1</td>
      <td>900</td>
      <td>50</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Cloudberries</td>
      <td>https://static.wikia.nocookie.net/valheim/imag...</td>
      <td>13</td>
      <td>40</td>
      <td>53.0</td>
      <td>1</td>
      <td>900</td>
      <td>50</td>
    </tr>
  </tbody>
</table>
</div>



I might also need to get some other information from the infobox of individual pages. If that's the case then I can use this neat library called [fandom-py](https://github.com/NikolajDanger/fandom-py) that easily allows me to obtain the information that I need. There's some bit of data wrangling involved, so let's start rolling up our sleeves!


```python
from typing import Dict


def get_infobox(row) -> Dict:
    """Get relevant information from the infobox"""
    name = row["Name"]
    url = ""
    drop_by_data = ""
    craft_data = ""

    try:
        # Get page and its URL
        page = fandom.page(name)
        url = page.url

        # Get infobox since we need a lot of info there
        infobox = page.content["infobox"]

        # Split the infobox for easier parsing
        # We just need to get 'Dropped by' and 'Crafting Materials'
        l = infobox.split("\n")
        if "Dropped by" in l:
            drop_idx = l.index("Dropped by")
            drop_by_data = l[drop_idx + 1]
        if "Crafting Materials" in l:
            craft_idx = l.index("Crafting Materials")
            craft_data_ = l[craft_idx + 1]
            craft_data = re.sub(
                r"(?<=\d)(?=[^\d\s])|(?<=[^\d\s])(?=\d)", " ", craft_data_
            )
    except fandom.error.PageError:
        print(f"Cannot find page for {name}, will return empty strings")

    return {"URL": url, "DroppedBy": drop_by_data, "Crafting": craft_data}
```

What I did is that I obtained the Fandom page for each food item, then filtered it with just the infobox. However, the return value is just one long string delimited by `\n`, so my workaround is to split it with that value. To get the key value pairs, I just took the *next* item of a specific element, assuming that's how it works. For example, to get the value for the key "Dropped by," I looked at the element after it. It seems to work!

Let's now put the URL, Drop information, and Craft information in one Dataframe and concatenate it with the rest of the crew!


```python
infobox = pd.DataFrame([get_infobox(row) for _, row in df.iterrows()])
```

    Cannot find page for Bukeperries, will return empty strings



```python
# Some items aren't craftable as you can just pick them up from the environment
infobox.head(10)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe" style="font-size:14px; overflow-x: auto; display: block">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>URL</th>
      <th>DroppedBy</th>
      <th>Crafting</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>https://valheim.fandom.com/en/wiki/Raspberries</td>
      <td>Raspberry bushes in Meadows</td>
      <td></td>
    </tr>
    <tr>
      <th>1</th>
      <td>https://valheim.fandom.com/en/wiki/Mushroom</td>
      <td>Meadows, Black Forest, Swamp</td>
      <td></td>
    </tr>
    <tr>
      <th>2</th>
      <td>https://valheim.fandom.com/en/wiki/Blueberries</td>
      <td>Blueberry bushes in the Black Forest biome</td>
      <td></td>
    </tr>
    <tr>
      <th>3</th>
      <td>https://valheim.fandom.com/en/wiki/Carrot</td>
      <td>Farming Carrot seeds</td>
      <td></td>
    </tr>
    <tr>
      <th>4</th>
      <td>https://valheim.fandom.com/en/wiki/Cloudberries</td>
      <td>Plains biome</td>
      <td></td>
    </tr>
    <tr>
      <th>5</th>
      <td>https://valheim.fandom.com/en/wiki/Honey</td>
      <td>Beehive</td>
      <td></td>
    </tr>
    <tr>
      <th>6</th>
      <td>https://valheim.fandom.com/en/wiki/Yellow_mush...</td>
      <td>Burial Chambers, Troll Cave, Sunken Crypts</td>
      <td></td>
    </tr>
    <tr>
      <th>7</th>
      <td>https://valheim.fandom.com/en/wiki/Carrot_soup</td>
      <td>Cauldron</td>
      <td>Mushroom x 1 Carrot x 3</td>
    </tr>
    <tr>
      <th>8</th>
      <td>https://valheim.fandom.com/en/wiki/Queens_jam</td>
      <td>Cauldron</td>
      <td>Crafts 4 Raspberries x 8 Blueberries x 6</td>
    </tr>
    <tr>
      <th>9</th>
      <td>https://valheim.fandom.com/en/wiki/Grilled_nec...</td>
      <td>Cooking station</td>
      <td>Neck tail x 1</td>
    </tr>
  </tbody>
</table>
</div>




```python
master_df = pd.concat([df, infobox], axis=1)
master_df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe" style="font-size:14px; overflow-x: auto; display: block">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Name</th>
      <th>Icon</th>
      <th>Health</th>
      <th>Stamina</th>
      <th>Total</th>
      <th>Healing (hp/tick)</th>
      <th>Duration (sec)</th>
      <th>Stack Size</th>
      <th>URL</th>
      <th>DroppedBy</th>
      <th>Crafting</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Raspberries</td>
      <td>https://static.wikia.nocookie.net/valheim/imag...</td>
      <td>7</td>
      <td>20</td>
      <td>27.0</td>
      <td>1</td>
      <td>600</td>
      <td>50</td>
      <td>https://valheim.fandom.com/en/wiki/Raspberries</td>
      <td>Raspberry bushes in Meadows</td>
      <td></td>
    </tr>
    <tr>
      <th>1</th>
      <td>Mushroom</td>
      <td>https://static.wikia.nocookie.net/valheim/imag...</td>
      <td>15</td>
      <td>15</td>
      <td>30.0</td>
      <td>1</td>
      <td>900</td>
      <td>50</td>
      <td>https://valheim.fandom.com/en/wiki/Mushroom</td>
      <td>Meadows, Black Forest, Swamp</td>
      <td></td>
    </tr>
    <tr>
      <th>2</th>
      <td>Blueberries</td>
      <td>https://static.wikia.nocookie.net/valheim/imag...</td>
      <td>8</td>
      <td>25</td>
      <td>33.0</td>
      <td>1</td>
      <td>600</td>
      <td>50</td>
      <td>https://valheim.fandom.com/en/wiki/Blueberries</td>
      <td>Blueberry bushes in the Black Forest biome</td>
      <td></td>
    </tr>
    <tr>
      <th>3</th>
      <td>Carrot</td>
      <td>https://static.wikia.nocookie.net/valheim/imag...</td>
      <td>10</td>
      <td>32</td>
      <td>42.0</td>
      <td>1</td>
      <td>900</td>
      <td>50</td>
      <td>https://valheim.fandom.com/en/wiki/Carrot</td>
      <td>Farming Carrot seeds</td>
      <td></td>
    </tr>
    <tr>
      <th>4</th>
      <td>Cloudberries</td>
      <td>https://static.wikia.nocookie.net/valheim/imag...</td>
      <td>13</td>
      <td>40</td>
      <td>53.0</td>
      <td>1</td>
      <td>900</td>
      <td>50</td>
      <td>https://valheim.fandom.com/en/wiki/Cloudberries</td>
      <td>Plains biome</td>
      <td></td>
    </tr>
  </tbody>
</table>
</div>



## Quick visualization

First, let's **remote Bukeperries because it's a special item**. Instead of giving you HP and Stamina, Bukeperries removes all the food you've ingested at the moment. 


```python
master_df = master_df[df.Name != "Bukeperries"]
```

Just a few typecasting lines:


```python
master_df["Health"] = master_df["Health"].astype(float)
master_df["Stamina"] = master_df["Stamina"].astype(float)
```

Let's save the dataset into a CSV file for later use:


```python
master_df.to_csv("data/Valheim_Food_Dataset.csv", index=False)
```

Now, it's time to plot! We'll use a scatterplot to see the distribution of HP and Stamina across food items. I'll arrange the plot in the following manner:
- X-axis will be the Stamina
- Y-axis will be the HP
- The size of the circle will represent the duration.
- TODO: Marker color as the game stage (stone, bronze, iron, silver, black metal)


```python
import altair as alt
```


```python
alt.Chart(master_df).mark_circle().encode(
    alt.X("Stamina", scale=alt.Scale(zero=False)),
    alt.Y("Health", scale=alt.Scale(zero=False)),
    size="Duration (sec)",
    tooltip=[
        "Name",
        "DroppedBy",
        "Health",
        "Stamina",
        "Duration (sec)",
        "Healing (hp/tick)",
        "Crafting",
        "URL",
    ],
).interactive()
```





<div id="altair-viz-f4fadc5a7bf242f691715d6e3e0b981a"></div>
<script type="text/javascript">
  (function(spec, embedOpt){
    let outputDiv = document.currentScript.previousElementSibling;
    if (outputDiv.id !== "altair-viz-f4fadc5a7bf242f691715d6e3e0b981a") {
      outputDiv = document.getElementById("altair-viz-f4fadc5a7bf242f691715d6e3e0b981a");
    }
    const paths = {
      "vega": "https://cdn.jsdelivr.net/npm//vega@5?noext",
      "vega-lib": "https://cdn.jsdelivr.net/npm//vega-lib?noext",
      "vega-lite": "https://cdn.jsdelivr.net/npm//vega-lite@4.8.1?noext",
      "vega-embed": "https://cdn.jsdelivr.net/npm//vega-embed@6?noext",
    };

    function loadScript(lib) {
      return new Promise(function(resolve, reject) {
        var s = document.createElement('script');
        s.src = paths[lib];
        s.async = true;
        s.onload = () => resolve(paths[lib]);
        s.onerror = () => reject(`Error loading script: ${paths[lib]}`);
        document.getElementsByTagName("head")[0].appendChild(s);
      });
    }

    function showError(err) {
      outputDiv.innerHTML = `<div class="error" style="color:red;">${err}</div>`;
      throw err;
    }

    function displayChart(vegaEmbed) {
      vegaEmbed(outputDiv, spec, embedOpt)
        .catch(err => showError(`Javascript Error: ${err.message}<br>This usually means there's a typo in your chart specification. See the javascript console for the full traceback.`));
    }

    if(typeof define === "function" && define.amd) {
      requirejs.config({paths});
      require(["vega-embed"], displayChart, err => showError(`Error loading script: ${err.message}`));
    } else if (typeof vegaEmbed === "function") {
      displayChart(vegaEmbed);
    } else {
      loadScript("vega")
        .then(() => loadScript("vega-lite"))
        .then(() => loadScript("vega-embed"))
        .catch(showError)
        .then(() => displayChart(vegaEmbed));
    }
  })({"config": {"view": {"continuousWidth": 400, "continuousHeight": 300}}, "data": {"name": "data-3fa07be70878f4c728a2091274438f2d"}, "mark": "circle", "encoding": {"size": {"type": "quantitative", "field": "Duration (sec)"}, "tooltip": [{"type": "nominal", "field": "Name"}, {"type": "nominal", "field": "DroppedBy"}, {"type": "quantitative", "field": "Health"}, {"type": "quantitative", "field": "Stamina"}, {"type": "quantitative", "field": "Duration (sec)"}, {"type": "quantitative", "field": "Healing (hp/tick)"}, {"type": "nominal", "field": "Crafting"}, {"type": "nominal", "field": "URL"}], "x": {"type": "quantitative", "field": "Stamina", "scale": {"zero": false}}, "y": {"type": "quantitative", "field": "Health", "scale": {"zero": false}}}, "selection": {"selector001": {"type": "interval", "bind": "scales", "encodings": ["x", "y"]}}, "$schema": "https://vega.github.io/schema/vega-lite/v4.8.1.json", "datasets": {"data-3fa07be70878f4c728a2091274438f2d": [{"Name": "Raspberries", "Icon": "https://static.wikia.nocookie.net/valheim/images/7/7e/Raspberries.png/revision/latest?cb=20210215131817", "Health": 7.0, "Stamina": 20.0, "Total": 27.0, "Healing (hp/tick)": 1, "Duration (sec)": 600, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Raspberries", "DroppedBy": "Raspberry bushes in Meadows", "Crafting": ""}, {"Name": "Mushroom", "Icon": "https://static.wikia.nocookie.net/valheim/images/8/8c/Mushroom.png/revision/latest?cb=20210215131734", "Health": 15.0, "Stamina": 15.0, "Total": 30.0, "Healing (hp/tick)": 1, "Duration (sec)": 900, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Mushroom", "DroppedBy": "Meadows, Black Forest, Swamp", "Crafting": ""}, {"Name": "Blueberries", "Icon": "https://static.wikia.nocookie.net/valheim/images/a/af/Blueberries.png/revision/latest?cb=20210215131400", "Health": 8.0, "Stamina": 25.0, "Total": 33.0, "Healing (hp/tick)": 1, "Duration (sec)": 600, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Blueberries", "DroppedBy": "Blueberry bushes in the Black Forest biome", "Crafting": ""}, {"Name": "Carrot", "Icon": "https://static.wikia.nocookie.net/valheim/images/c/c3/Carrot.png/revision/latest?cb=20210215131441", "Health": 10.0, "Stamina": 32.0, "Total": 42.0, "Healing (hp/tick)": 1, "Duration (sec)": 900, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Carrot", "DroppedBy": "Farming Carrot seeds", "Crafting": ""}, {"Name": "Cloudberries", "Icon": "https://static.wikia.nocookie.net/valheim/images/e/e4/Cloudberries.png/revision/latest?cb=20210215131511", "Health": 13.0, "Stamina": 40.0, "Total": 53.0, "Healing (hp/tick)": 1, "Duration (sec)": 900, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Cloudberries", "DroppedBy": "Plains biome", "Crafting": ""}, {"Name": "Honey", "Icon": "https://static.wikia.nocookie.net/valheim/images/c/c6/Honey.png/revision/latest?cb=20210215131700", "Health": 8.0, "Stamina": 35.0, "Total": 43.0, "Healing (hp/tick)": 1, "Duration (sec)": 900, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Honey", "DroppedBy": "Beehive", "Crafting": ""}, {"Name": "Yellow mushroom", "Icon": "https://static.wikia.nocookie.net/valheim/images/5/57/Yellow_mushroom.png/revision/latest?cb=20210215131741", "Health": 10.0, "Stamina": 30.0, "Total": 40.0, "Healing (hp/tick)": 1, "Duration (sec)": 600, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Yellow_mushroom", "DroppedBy": "Burial Chambers, Troll Cave, Sunken Crypts", "Crafting": ""}, {"Name": "Carrot soup", "Icon": "https://static.wikia.nocookie.net/valheim/images/0/00/Carrot_soup.png/revision/latest?cb=20210215131443", "Health": 15.0, "Stamina": 45.0, "Total": 60.0, "Healing (hp/tick)": 2, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Carrot_soup", "DroppedBy": "Cauldron", "Crafting": "Mushroom x 1 Carrot x 3"}, {"Name": "Queens jam", "Icon": "https://static.wikia.nocookie.net/valheim/images/a/ad/Queens_jam.png/revision/latest?cb=20210215131812", "Health": 14.0, "Stamina": 40.0, "Total": 54.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Queens_jam", "DroppedBy": "Cauldron", "Crafting": "Crafts 4 Raspberries x 8 Blueberries x 6"}, {"Name": "Grilled neck tail", "Icon": "https://static.wikia.nocookie.net/valheim/images/0/06/Grilled_neck_tail.png/revision/latest?cb=20210215131743", "Health": 25.0, "Stamina": 8.0, "Total": 33.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Grilled_neck_tail", "DroppedBy": "Cooking station", "Crafting": "Neck tail x 1"}, {"Name": "Cooked boar meat", "Icon": "https://static.wikia.nocookie.net/valheim/images/8/89/Cooked_meat.png/revision/latest?cb=20180727051753", "Health": 30.0, "Stamina": 10.0, "Total": 40.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Cooked_boar_meat", "DroppedBy": "Cooking station", "Crafting": "boar meat x 1"}, {"Name": "Bread", "Icon": "https://static.wikia.nocookie.net/valheim/images/e/e1/Bread.png/revision/latest?cb=20210215131421", "Health": 25.0, "Stamina": 75.0, "Total": 100.0, "Healing (hp/tick)": 1, "Duration (sec)": 1800, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Bread", "DroppedBy": "Cauldron", "Crafting": "Barley flour x 10"}, {"Name": "Cooked fish", "Icon": "https://static.wikia.nocookie.net/valheim/images/1/16/Cooked_fish.png/revision/latest?cb=20210215131603", "Health": 45.0, "Stamina": 15.0, "Total": 60.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Cooked_fish", "DroppedBy": "Cooking station", "Crafting": "Raw fish x 1"}, {"Name": "Turnip stew", "Icon": "https://static.wikia.nocookie.net/valheim/images/f/fd/Turnip_stew.png/revision/latest?cb=20210212175937", "Health": 18.0, "Stamina": 55.0, "Total": 73.0, "Healing (hp/tick)": 2, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Turnip_stew", "DroppedBy": "Cauldron", "Crafting": "Boar meat x 1 Turnip x 1"}, {"Name": "Sausages", "Icon": "https://static.wikia.nocookie.net/valheim/images/a/a0/Sausages.png/revision/latest?cb=20210215131836", "Health": 55.0, "Stamina": 18.0, "Total": 73.0, "Healing (hp/tick)": 3, "Duration (sec)": 1500, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Sausages", "DroppedBy": "Cauldron", "Crafting": "Crafts 4 Entrails x 4 Boar meat x 1 Thistle x 1"}, {"Name": "Fish wraps", "Icon": "https://static.wikia.nocookie.net/valheim/images/b/b5/Fish_wraps.png/revision/latest?cb=20210215131607", "Health": 70.0, "Stamina": 23.0, "Total": 93.0, "Healing (hp/tick)": 4, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Fish_wraps", "DroppedBy": "Cauldron", "Crafting": "Cooked fish x 2 Barley flour x 4"}, {"Name": "Cooked serpent meat", "Icon": "https://static.wikia.nocookie.net/valheim/images/c/c1/Cooked_serpent_meat.png/revision/latest?cb=20210215131841", "Health": 70.0, "Stamina": 23.0, "Total": 93.0, "Healing (hp/tick)": 3, "Duration (sec)": 1500, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Cooked_serpent_meat", "DroppedBy": "Iron Cooking station", "Crafting": "Serpent meat x 1"}, {"Name": "Cooked lox meat", "Icon": "https://static.wikia.nocookie.net/valheim/images/4/40/Cooked_lox_meat.png/revision/latest?cb=20210215131722", "Health": 50.0, "Stamina": 16.0, "Total": 66.0, "Healing (hp/tick)": 4, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Cooked_lox_meat", "DroppedBy": "Cooking station", "Crafting": ""}, {"Name": "Serpent stew", "Icon": "https://static.wikia.nocookie.net/valheim/images/5/55/Serpent_stew.png/revision/latest?cb=20210215131844", "Health": 80.0, "Stamina": 26.0, "Total": 106.0, "Healing (hp/tick)": 4, "Duration (sec)": 1800, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Serpent_stew", "DroppedBy": "Cauldron", "Crafting": "Mushroom x 1 Cooked serpent meat x 1 Honey x 2"}, {"Name": "Lox meat pie", "Icon": "https://static.wikia.nocookie.net/valheim/images/5/5e/Lox_meat_pie.png/revision/latest?cb=20210215131724", "Health": 75.0, "Stamina": 24.0, "Total": 99.0, "Healing (hp/tick)": 4, "Duration (sec)": 1800, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Lox_meat_pie", "DroppedBy": "Cauldron", "Crafting": "Barley flour x 4 Cloudberries x 2 Lox meat x 2"}, {"Name": "Blood pudding", "Icon": "https://static.wikia.nocookie.net/valheim/images/2/28/Blood_pudding.png/revision/latest?cb=20210215131359", "Health": 23.0, "Stamina": 70.0, "Total": 93.0, "Healing (hp/tick)": 1, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Blood_pudding", "DroppedBy": "Cauldron", "Crafting": "Thistle x 2 Bloodbag x 2 Barley flour x 4"}, {"Name": "Boar jerky", "Icon": "https://static.wikia.nocookie.net/valheim/images/6/65/Boarjerky.png/revision/latest?cb=20210922034153", "Health": 20.0, "Stamina": 20.0, "Total": 40.0, "Healing (hp/tick)": 1, "Duration (sec)": 1800, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Boar_jerky", "DroppedBy": "Cauldron", "Crafting": "Crafts 2 Boar meat x 1 Honey x 1"}, {"Name": "Deer stew", "Icon": "https://static.wikia.nocookie.net/valheim/images/b/bf/Deerstew.png/revision/latest?cb=20210922034153", "Health": 40.0, "Stamina": 13.0, "Total": 53.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Deer_stew", "DroppedBy": "Cauldron", "Crafting": "Blueberries x 1 Carrot x 1 Cooked deer meat x 1"}, {"Name": "Muckshake", "Icon": "https://static.wikia.nocookie.net/valheim/images/1/1d/Shocklatesmoothie.png/revision/latest?cb=20210922034153", "Health": 16.0, "Stamina": 50.0, "Total": 66.0, "Healing (hp/tick)": 1, "Duration (sec)": 1200, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Muckshake", "DroppedBy": "Cauldron", "Crafting": "Ooze x 1 Raspberries x 2 Blueberries x 2"}, {"Name": "Onion", "Icon": "https://static.wikia.nocookie.net/valheim/images/5/51/Onion.png/revision/latest?cb=20210922183720", "Health": 13.0, "Stamina": 40.0, "Total": 53.0, "Healing (hp/tick)": 1, "Duration (sec)": 900, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Onion", "DroppedBy": "Farming Onion seeds", "Crafting": ""}, {"Name": "Minced Meat Sauce", "Icon": "https://static.wikia.nocookie.net/valheim/images/5/58/Mincemeatsauce.png/revision/latest?cb=20210922034153", "Health": 45.0, "Stamina": 15.0, "Total": 60.0, "Healing (hp/tick)": 3, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Minced_Meat_Sauce", "DroppedBy": "Cauldron", "Crafting": "Boar meat x 1 Neck tail x 1 Carrot x 1"}, {"Name": "Wolf jerky", "Icon": "https://static.wikia.nocookie.net/valheim/images/8/8b/Wolfjerky.png/revision/latest?cb=20210922034153", "Health": 30.0, "Stamina": 30.0, "Total": 60.0, "Healing (hp/tick)": 1, "Duration (sec)": 1800, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Wolf_jerky", "DroppedBy": "Cauldron", "Crafting": "Wolf meat x 1 Honey x 1"}, {"Name": "Onion soup", "Icon": "https://static.wikia.nocookie.net/valheim/images/7/72/OnionSoup.png/revision/latest?cb=20210922034153", "Health": 12.0, "Stamina": 60.0, "Total": 72.0, "Healing (hp/tick)": 1, "Duration (sec)": 1200, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Onion_soup", "DroppedBy": "Cauldron", "Crafting": "Onion x 3"}, {"Name": "Wolf skewer", "Icon": "https://static.wikia.nocookie.net/valheim/images/d/d7/Wolf_skewer.png/revision/latest?cb=20210922034153", "Health": 65.0, "Stamina": 13.0, "Total": 78.0, "Healing (hp/tick)": 3, "Duration (sec)": 1500, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Wolf_skewer", "DroppedBy": "Cooking station", "Crafting": "Wolf meat x 1 Mushroom x 2 Onion x 1"}, {"Name": "Black soup", "Icon": "https://static.wikia.nocookie.net/valheim/images/e/e6/BlackSoup.png/revision/latest?cb=20210922034152", "Health": 50.0, "Stamina": 17.0, "Total": 67.0, "Healing (hp/tick)": 3, "Duration (sec)": 1200, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Black_soup", "DroppedBy": "Cauldron", "Crafting": "Bloodbag x 1 Honey x 1 Turnip x 1"}, {"Name": "Cooked wolf meat", "Icon": "https://static.wikia.nocookie.net/valheim/images/6/68/Wolf_meat_cooked.png/revision/latest?cb=20210922034153", "Health": 45.0, "Stamina": 15.0, "Total": 60.0, "Healing (hp/tick)": 3, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Cooked_wolf_meat", "DroppedBy": "Cooking station", "Crafting": "Wolf meat x 1"}, {"Name": "Eyescream", "Icon": "https://static.wikia.nocookie.net/valheim/images/9/90/Eyescream.png/revision/latest?cb=20210922034153", "Health": 21.0, "Stamina": 65.0, "Total": 86.0, "Healing (hp/tick)": 1, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Eyescream", "DroppedBy": "Cauldron", "Crafting": "Greydwarf eye x 3 Freeze gland x 1"}, {"Name": "Cooked deer meat", "Icon": "https://static.wikia.nocookie.net/valheim/images/e/e7/Deer_meat_cooked.png/revision/latest?cb=20210922034153", "Health": 35.0, "Stamina": 12.0, "Total": 47.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Cooked_deer_meat", "DroppedBy": "Cooking station", "Crafting": "Deer meat x 1"}]}}, {"mode": "vega-lite"});
</script>



I'd really like to separate each food category into its own "age" (i.e., stone, bronze, iron, and silver). Because it would be nice if I can see what food items are available at a given stage of the game. However, it seems that I cannot find any table nor dataset that already has that. Note that I didn't include the Black Metal age being it's the highest.

Instead, what I'll do is to just **manually annotate the dataset.** It's just 33 rows so it shouldn't be that tedious. My process will be:
- I will check the Crafting requirement and the dependencies for each crafting requirement. That will help me decide which age a food group belongs to.
- I will also check the recipes for each food and decide wich age it belongs to.
- Lastly, I will also check the enemy types that you'll encounter to obtain a particular food. Draugrs and Serpents, even if you can find them early-game, might still be difficult to defeat in lower ages. 

I will keep separate files for the annotated and unannotated dataset. I am only 100+ hours in the game, so if you see any discrepancies in my annotation, please let me know!


```python
df = pd.read_csv("data/Valheim_Food_Dataset_Annotated.csv")
```

I'll update the Duration from seconds to minutes since that is the one displayed in the Valheim HUD


```python
df["Duration (min)"] = df["Duration (sec)"] / 60
```


```python
selection = alt.selection_multi(fields=["Progression"], bind="legend")


alt.Chart(df, title="Valheim Food Distribution").mark_circle().encode(
    alt.X("Stamina", scale=alt.Scale(domain=(0, 80), zero=False)),
    alt.Y("Health", scale=alt.Scale(domain=(0, 90), zero=False)),
    size="Duration (min)",
    color=alt.Color(
        "Progression",
        scale=alt.Scale(
            scheme="tableau10", domain=["Silver", "Iron", "Bronze", "Stone"]
        ),
    ),
    opacity=alt.condition(selection, alt.value(1), alt.value(0.2)),
    tooltip=[
        "Name",
        "DroppedBy",
        "Health",
        "Stamina",
        "Duration (min)",
        "Healing (hp/tick)",
        "Crafting",
        "URL",
    ],
).configure_axis(grid=False).add_selection(selection).interactive()
```





<div id="altair-viz-ded2cbee257b4576901d06de4e5aae80"></div>
<script type="text/javascript">
  (function(spec, embedOpt){
    let outputDiv = document.currentScript.previousElementSibling;
    if (outputDiv.id !== "altair-viz-ded2cbee257b4576901d06de4e5aae80") {
      outputDiv = document.getElementById("altair-viz-ded2cbee257b4576901d06de4e5aae80");
    }
    const paths = {
      "vega": "https://cdn.jsdelivr.net/npm//vega@5?noext",
      "vega-lib": "https://cdn.jsdelivr.net/npm//vega-lib?noext",
      "vega-lite": "https://cdn.jsdelivr.net/npm//vega-lite@4.8.1?noext",
      "vega-embed": "https://cdn.jsdelivr.net/npm//vega-embed@6?noext",
    };

    function loadScript(lib) {
      return new Promise(function(resolve, reject) {
        var s = document.createElement('script');
        s.src = paths[lib];
        s.async = true;
        s.onload = () => resolve(paths[lib]);
        s.onerror = () => reject(`Error loading script: ${paths[lib]}`);
        document.getElementsByTagName("head")[0].appendChild(s);
      });
    }

    function showError(err) {
      outputDiv.innerHTML = `<div class="error" style="color:red;">${err}</div>`;
      throw err;
    }

    function displayChart(vegaEmbed) {
      vegaEmbed(outputDiv, spec, embedOpt)
        .catch(err => showError(`Javascript Error: ${err.message}<br>This usually means there's a typo in your chart specification. See the javascript console for the full traceback.`));
    }

    if(typeof define === "function" && define.amd) {
      requirejs.config({paths});
      require(["vega-embed"], displayChart, err => showError(`Error loading script: ${err.message}`));
    } else if (typeof vegaEmbed === "function") {
      displayChart(vegaEmbed);
    } else {
      loadScript("vega")
        .then(() => loadScript("vega-lite"))
        .then(() => loadScript("vega-embed"))
        .catch(showError)
        .then(() => displayChart(vegaEmbed));
    }
  })({"config": {"view": {"continuousWidth": 400, "continuousHeight": 300}, "axis": {"grid": false}}, "data": {"name": "data-fd95aaba08f8a10b8f1bdc15c0b2683b"}, "mark": "circle", "encoding": {"color": {"type": "nominal", "field": "Progression", "scale": {"domain": ["Silver", "Iron", "Bronze", "Stone"], "scheme": "tableau10"}}, "opacity": {"condition": {"value": 1, "selection": "selector028"}, "value": 0.2}, "size": {"type": "quantitative", "field": "Duration (min)"}, "tooltip": [{"type": "nominal", "field": "Name"}, {"type": "nominal", "field": "DroppedBy"}, {"type": "quantitative", "field": "Health"}, {"type": "quantitative", "field": "Stamina"}, {"type": "quantitative", "field": "Duration (min)"}, {"type": "quantitative", "field": "Healing (hp/tick)"}, {"type": "nominal", "field": "Crafting"}, {"type": "nominal", "field": "URL"}], "x": {"type": "quantitative", "field": "Stamina", "scale": {"domain": [0, 80], "zero": false}}, "y": {"type": "quantitative", "field": "Health", "scale": {"domain": [0, 90], "zero": false}}}, "selection": {"selector028": {"type": "multi", "fields": ["Progression"], "bind": "legend"}, "selector029": {"type": "interval", "bind": "scales", "encodings": ["x", "y"]}}, "title": "Valheim Food Distribution", "$schema": "https://vega.github.io/schema/vega-lite/v4.8.1.json", "datasets": {"data-fd95aaba08f8a10b8f1bdc15c0b2683b": [{"Name": "Raspberries", "Icon": "https://static.wikia.nocookie.net/valheim/images/7/7e/Raspberries.png/revision/latest?cb=20210215131817", "Health": 7.0, "Stamina": 20.0, "Total": 27.0, "Healing (hp/tick)": 1, "Duration (sec)": 600, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Raspberries", "DroppedBy": "Raspberry bushes in Meadows", "Crafting": null, "Progression": "Stone", "Duration (min)": 10.0}, {"Name": "Mushroom", "Icon": "https://static.wikia.nocookie.net/valheim/images/8/8c/Mushroom.png/revision/latest?cb=20210215131734", "Health": 15.0, "Stamina": 15.0, "Total": 30.0, "Healing (hp/tick)": 1, "Duration (sec)": 900, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Mushroom", "DroppedBy": "Meadows, Black Forest, Swamp", "Crafting": null, "Progression": "Stone", "Duration (min)": 15.0}, {"Name": "Blueberries", "Icon": "https://static.wikia.nocookie.net/valheim/images/a/af/Blueberries.png/revision/latest?cb=20210215131400", "Health": 8.0, "Stamina": 25.0, "Total": 33.0, "Healing (hp/tick)": 1, "Duration (sec)": 600, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Blueberries", "DroppedBy": "Blueberry bushes in the Black Forest biome", "Crafting": null, "Progression": "Stone", "Duration (min)": 10.0}, {"Name": "Carrot", "Icon": "https://static.wikia.nocookie.net/valheim/images/c/c3/Carrot.png/revision/latest?cb=20210215131441", "Health": 10.0, "Stamina": 32.0, "Total": 42.0, "Healing (hp/tick)": 1, "Duration (sec)": 900, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Carrot", "DroppedBy": "Farming Carrot seeds", "Crafting": null, "Progression": "Bronze", "Duration (min)": 15.0}, {"Name": "Cloudberries", "Icon": "https://static.wikia.nocookie.net/valheim/images/e/e4/Cloudberries.png/revision/latest?cb=20210215131511", "Health": 13.0, "Stamina": 40.0, "Total": 53.0, "Healing (hp/tick)": 1, "Duration (sec)": 900, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Cloudberries", "DroppedBy": "Plains biome", "Crafting": null, "Progression": "Silver", "Duration (min)": 15.0}, {"Name": "Honey", "Icon": "https://static.wikia.nocookie.net/valheim/images/c/c6/Honey.png/revision/latest?cb=20210215131700", "Health": 8.0, "Stamina": 35.0, "Total": 43.0, "Healing (hp/tick)": 1, "Duration (sec)": 900, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Honey", "DroppedBy": "Beehive", "Crafting": null, "Progression": "Stone", "Duration (min)": 15.0}, {"Name": "Yellow mushroom", "Icon": "https://static.wikia.nocookie.net/valheim/images/5/57/Yellow_mushroom.png/revision/latest?cb=20210215131741", "Health": 10.0, "Stamina": 30.0, "Total": 40.0, "Healing (hp/tick)": 1, "Duration (sec)": 600, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Yellow_mushroom", "DroppedBy": "Burial Chambers, Troll Cave, Sunken Crypts", "Crafting": null, "Progression": "Stone", "Duration (min)": 10.0}, {"Name": "Carrot soup", "Icon": "https://static.wikia.nocookie.net/valheim/images/0/00/Carrot_soup.png/revision/latest?cb=20210215131443", "Health": 15.0, "Stamina": 45.0, "Total": 60.0, "Healing (hp/tick)": 2, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Carrot_soup", "DroppedBy": "Cauldron", "Crafting": "Mushroom x 1 Carrot x 3", "Progression": "Bronze", "Duration (min)": 25.0}, {"Name": "Queens jam", "Icon": "https://static.wikia.nocookie.net/valheim/images/a/ad/Queens_jam.png/revision/latest?cb=20210215131812", "Health": 14.0, "Stamina": 40.0, "Total": 54.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Queens_jam", "DroppedBy": "Cauldron", "Crafting": "Crafts 4 Raspberries x 8 Blueberries x 6", "Progression": "Bronze", "Duration (min)": 20.0}, {"Name": "Grilled neck tail", "Icon": "https://static.wikia.nocookie.net/valheim/images/0/06/Grilled_neck_tail.png/revision/latest?cb=20210215131743", "Health": 25.0, "Stamina": 8.0, "Total": 33.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Grilled_neck_tail", "DroppedBy": "Cooking station", "Crafting": "Neck tail x 1", "Progression": "Stone", "Duration (min)": 20.0}, {"Name": "Cooked boar meat", "Icon": "https://static.wikia.nocookie.net/valheim/images/8/89/Cooked_meat.png/revision/latest?cb=20180727051753", "Health": 30.0, "Stamina": 10.0, "Total": 40.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Cooked_boar_meat", "DroppedBy": "Cooking station", "Crafting": "boar meat x 1", "Progression": "Stone", "Duration (min)": 20.0}, {"Name": "Bread", "Icon": "https://static.wikia.nocookie.net/valheim/images/e/e1/Bread.png/revision/latest?cb=20210215131421", "Health": 25.0, "Stamina": 75.0, "Total": 100.0, "Healing (hp/tick)": 1, "Duration (sec)": 1800, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Bread", "DroppedBy": "Cauldron", "Crafting": "Barley flour x 10", "Progression": "Iron", "Duration (min)": 30.0}, {"Name": "Cooked fish", "Icon": "https://static.wikia.nocookie.net/valheim/images/1/16/Cooked_fish.png/revision/latest?cb=20210215131603", "Health": 45.0, "Stamina": 15.0, "Total": 60.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Cooked_fish", "DroppedBy": "Cooking station", "Crafting": "Raw fish x 1", "Progression": "Stone", "Duration (min)": 20.0}, {"Name": "Turnip stew", "Icon": "https://static.wikia.nocookie.net/valheim/images/f/fd/Turnip_stew.png/revision/latest?cb=20210212175937", "Health": 18.0, "Stamina": 55.0, "Total": 73.0, "Healing (hp/tick)": 2, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Turnip_stew", "DroppedBy": "Cauldron", "Crafting": "Boar meat x 1 Turnip x 1", "Progression": "Bronze", "Duration (min)": 25.0}, {"Name": "Sausages", "Icon": "https://static.wikia.nocookie.net/valheim/images/a/a0/Sausages.png/revision/latest?cb=20210215131836", "Health": 55.0, "Stamina": 18.0, "Total": 73.0, "Healing (hp/tick)": 3, "Duration (sec)": 1500, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Sausages", "DroppedBy": "Cauldron", "Crafting": "Crafts 4 Entrails x 4 Boar meat x 1 Thistle x 1", "Progression": "Bronze", "Duration (min)": 25.0}, {"Name": "Fish wraps", "Icon": "https://static.wikia.nocookie.net/valheim/images/b/b5/Fish_wraps.png/revision/latest?cb=20210215131607", "Health": 70.0, "Stamina": 23.0, "Total": 93.0, "Healing (hp/tick)": 4, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Fish_wraps", "DroppedBy": "Cauldron", "Crafting": "Cooked fish x 2 Barley flour x 4", "Progression": "Iron", "Duration (min)": 25.0}, {"Name": "Cooked serpent meat", "Icon": "https://static.wikia.nocookie.net/valheim/images/c/c1/Cooked_serpent_meat.png/revision/latest?cb=20210215131841", "Health": 70.0, "Stamina": 23.0, "Total": 93.0, "Healing (hp/tick)": 3, "Duration (sec)": 1500, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Cooked_serpent_meat", "DroppedBy": "Iron Cooking station", "Crafting": "Serpent meat x 1", "Progression": "Iron", "Duration (min)": 25.0}, {"Name": "Cooked lox meat", "Icon": "https://static.wikia.nocookie.net/valheim/images/4/40/Cooked_lox_meat.png/revision/latest?cb=20210215131722", "Health": 50.0, "Stamina": 16.0, "Total": 66.0, "Healing (hp/tick)": 4, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Cooked_lox_meat", "DroppedBy": "Cooking station", "Crafting": null, "Progression": "Silver", "Duration (min)": 20.0}, {"Name": "Serpent stew", "Icon": "https://static.wikia.nocookie.net/valheim/images/5/55/Serpent_stew.png/revision/latest?cb=20210215131844", "Health": 80.0, "Stamina": 26.0, "Total": 106.0, "Healing (hp/tick)": 4, "Duration (sec)": 1800, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Serpent_stew", "DroppedBy": "Cauldron", "Crafting": "Mushroom x 1 Cooked serpent meat x 1 Honey x 2", "Progression": "Iron", "Duration (min)": 30.0}, {"Name": "Lox meat pie", "Icon": "https://static.wikia.nocookie.net/valheim/images/5/5e/Lox_meat_pie.png/revision/latest?cb=20210215131724", "Health": 75.0, "Stamina": 24.0, "Total": 99.0, "Healing (hp/tick)": 4, "Duration (sec)": 1800, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Lox_meat_pie", "DroppedBy": "Cauldron", "Crafting": "Barley flour x 4 Cloudberries x 2 Lox meat x 2", "Progression": "Silver", "Duration (min)": 30.0}, {"Name": "Blood pudding", "Icon": "https://static.wikia.nocookie.net/valheim/images/2/28/Blood_pudding.png/revision/latest?cb=20210215131359", "Health": 23.0, "Stamina": 70.0, "Total": 93.0, "Healing (hp/tick)": 1, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Blood_pudding", "DroppedBy": "Cauldron", "Crafting": "Thistle x 2 Bloodbag x 2 Barley flour x 4", "Progression": "Iron", "Duration (min)": 25.0}, {"Name": "Boar jerky", "Icon": "https://static.wikia.nocookie.net/valheim/images/6/65/Boarjerky.png/revision/latest?cb=20210922034153", "Health": 20.0, "Stamina": 20.0, "Total": 40.0, "Healing (hp/tick)": 1, "Duration (sec)": 1800, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Boar_jerky", "DroppedBy": "Cauldron", "Crafting": "Crafts 2 Boar meat x 1 Honey x 1", "Progression": "Bronze", "Duration (min)": 30.0}, {"Name": "Deer stew", "Icon": "https://static.wikia.nocookie.net/valheim/images/b/bf/Deerstew.png/revision/latest?cb=20210922034153", "Health": 40.0, "Stamina": 13.0, "Total": 53.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Deer_stew", "DroppedBy": "Cauldron", "Crafting": "Blueberries x 1 Carrot x 1 Cooked deer meat x 1", "Progression": "Bronze", "Duration (min)": 20.0}, {"Name": "Muckshake", "Icon": "https://static.wikia.nocookie.net/valheim/images/1/1d/Shocklatesmoothie.png/revision/latest?cb=20210922034153", "Health": 16.0, "Stamina": 50.0, "Total": 66.0, "Healing (hp/tick)": 1, "Duration (sec)": 1200, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Muckshake", "DroppedBy": "Cauldron", "Crafting": "Ooze x 1 Raspberries x 2 Blueberries x 2", "Progression": "Bronze", "Duration (min)": 20.0}, {"Name": "Onion", "Icon": "https://static.wikia.nocookie.net/valheim/images/5/51/Onion.png/revision/latest?cb=20210922183720", "Health": 13.0, "Stamina": 40.0, "Total": 53.0, "Healing (hp/tick)": 1, "Duration (sec)": 900, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Onion", "DroppedBy": "Farming Onion seeds", "Crafting": null, "Progression": "Bronze", "Duration (min)": 15.0}, {"Name": "Minced Meat Sauce", "Icon": "https://static.wikia.nocookie.net/valheim/images/5/58/Mincemeatsauce.png/revision/latest?cb=20210922034153", "Health": 45.0, "Stamina": 15.0, "Total": 60.0, "Healing (hp/tick)": 3, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Minced_Meat_Sauce", "DroppedBy": "Cauldron", "Crafting": "Boar meat x 1 Neck tail x 1 Carrot x 1", "Progression": "Bronze", "Duration (min)": 25.0}, {"Name": "Wolf jerky", "Icon": "https://static.wikia.nocookie.net/valheim/images/8/8b/Wolfjerky.png/revision/latest?cb=20210922034153", "Health": 30.0, "Stamina": 30.0, "Total": 60.0, "Healing (hp/tick)": 1, "Duration (sec)": 1800, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Wolf_jerky", "DroppedBy": "Cauldron", "Crafting": "Wolf meat x 1 Honey x 1", "Progression": "Silver", "Duration (min)": 30.0}, {"Name": "Onion soup", "Icon": "https://static.wikia.nocookie.net/valheim/images/7/72/OnionSoup.png/revision/latest?cb=20210922034153", "Health": 12.0, "Stamina": 60.0, "Total": 72.0, "Healing (hp/tick)": 1, "Duration (sec)": 1200, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Onion_soup", "DroppedBy": "Cauldron", "Crafting": "Onion x 3", "Progression": "Silver", "Duration (min)": 20.0}, {"Name": "Wolf skewer", "Icon": "https://static.wikia.nocookie.net/valheim/images/d/d7/Wolf_skewer.png/revision/latest?cb=20210922034153", "Health": 65.0, "Stamina": 13.0, "Total": 78.0, "Healing (hp/tick)": 3, "Duration (sec)": 1500, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Wolf_skewer", "DroppedBy": "Cooking station", "Crafting": "Wolf meat x 1 Mushroom x 2 Onion x 1", "Progression": "Silver", "Duration (min)": 25.0}, {"Name": "Black soup", "Icon": "https://static.wikia.nocookie.net/valheim/images/e/e6/BlackSoup.png/revision/latest?cb=20210922034152", "Health": 50.0, "Stamina": 17.0, "Total": 67.0, "Healing (hp/tick)": 3, "Duration (sec)": 1200, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Black_soup", "DroppedBy": "Cauldron", "Crafting": "Bloodbag x 1 Honey x 1 Turnip x 1", "Progression": "Bronze", "Duration (min)": 20.0}, {"Name": "Cooked wolf meat", "Icon": "https://static.wikia.nocookie.net/valheim/images/6/68/Wolf_meat_cooked.png/revision/latest?cb=20210922034153", "Health": 45.0, "Stamina": 15.0, "Total": 60.0, "Healing (hp/tick)": 3, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Cooked_wolf_meat", "DroppedBy": "Cooking station", "Crafting": "Wolf meat x 1", "Progression": "Silver", "Duration (min)": 20.0}, {"Name": "Eyescream", "Icon": "https://static.wikia.nocookie.net/valheim/images/9/90/Eyescream.png/revision/latest?cb=20210922034153", "Health": 21.0, "Stamina": 65.0, "Total": 86.0, "Healing (hp/tick)": 1, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Eyescream", "DroppedBy": "Cauldron", "Crafting": "Greydwarf eye x 3 Freeze gland x 1", "Progression": "Silver", "Duration (min)": 25.0}, {"Name": "Cooked deer meat", "Icon": "https://static.wikia.nocookie.net/valheim/images/e/e7/Deer_meat_cooked.png/revision/latest?cb=20210922034153", "Health": 35.0, "Stamina": 12.0, "Total": 47.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Cooked_deer_meat", "DroppedBy": "Cooking station", "Crafting": "Deer meat x 1", "Progression": "Stone", "Duration (min)": 20.0}]}}, {"mode": "vega-lite"});
</script>




```python

```
