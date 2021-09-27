---
layout: post
type: post
title: "Valheim Food Graph"
date: 2021-09-27
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [valheim, game, data science]
header-img: /assets/png/valheim/header.png
description: "Yes, I'm officially addicted to Valheim. So here's a quick visualization of all the food choices in Valheim: Hearth and Home. "
excerpt: "Yes, I'm officially addicted to Valheim. So here's a quick visualization of all the food choices in Valheim: Hearth and Home."
---


<div id="altair-viz-2328716a9cae460f863ce82c87340e9c"></div>

<script type="text/javascript">
  (function(spec, embedOpt){
    let outputDiv = document.currentScript.previousElementSibling;
    if (outputDiv.id !== "altair-viz-2328716a9cae460f863ce82c87340e9c") {
      outputDiv = document.getElementById("altair-viz-2328716a9cae460f863ce82c87340e9c");
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
  })({"config": {"view": {"continuousWidth": 400, "continuousHeight": 300}, "axis": {"grid": false}, "axisX": {"titleFontSize": 15, "titleFontWeight": "normal"}, "axisY": {"titleFontSize": 15, "titleFontWeight": "normal"}, "title": {"fontSize": 18}}, "data": {"name": "data-fd95aaba08f8a10b8f1bdc15c0b2683b"}, "mark": "circle", "background": "#fffff8", "encoding": {"color": {"type": "nominal", "field": "Progression", "scale": {"domain": ["Silver", "Iron", "Bronze", "Stone"], "scheme": "magma"}}, "opacity": {"condition": {"value": 1, "selection": "selector109"}, "value": 0.2}, "size": {"type": "quantitative", "field": "Duration (min)"}, "tooltip": [{"type": "nominal", "field": "Name"}, {"type": "nominal", "field": "DroppedBy"}, {"type": "quantitative", "field": "Health"}, {"type": "quantitative", "field": "Stamina"}, {"type": "quantitative", "field": "Duration (min)"}, {"type": "quantitative", "field": "Healing (hp/tick)"}, {"type": "nominal", "field": "Crafting"}, {"type": "nominal", "field": "URL"}], "x": {"type": "quantitative", "field": "Stamina", "scale": {"domain": [0, 80], "zero": false}}, "y": {"type": "quantitative", "field": "Health", "scale": {"domain": [0, 90], "zero": false}}}, "height": 560, "selection": {"selector109": {"type": "multi", "fields": ["Progression"], "bind": "legend"}, "selector110": {"type": "interval", "bind": "scales", "encodings": ["x", "y"]}}, "title": {"text": ["Valheim Food Distribution"], "subtitle": ["Hearth & Home, Patch 0.202.19"]}, "width": 560, "$schema": "https://vega.github.io/schema/vega-lite/v4.8.1.json", "datasets": {"data-fd95aaba08f8a10b8f1bdc15c0b2683b": [{"Name": "Raspberries", "Icon": "https://static.wikia.nocookie.net/valheim/images/7/7e/Raspberries.png/revision/latest?cb=20210215131817", "Health": 7.0, "Stamina": 20.0, "Total": 27.0, "Healing (hp/tick)": 1, "Duration (sec)": 600, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Raspberries", "DroppedBy": "Raspberry bushes in Meadows", "Crafting": null, "Progression": "Stone", "Duration (min)": 10.0}, {"Name": "Mushroom", "Icon": "https://static.wikia.nocookie.net/valheim/images/8/8c/Mushroom.png/revision/latest?cb=20210215131734", "Health": 15.0, "Stamina": 15.0, "Total": 30.0, "Healing (hp/tick)": 1, "Duration (sec)": 900, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Mushroom", "DroppedBy": "Meadows, Black Forest, Swamp", "Crafting": null, "Progression": "Stone", "Duration (min)": 15.0}, {"Name": "Blueberries", "Icon": "https://static.wikia.nocookie.net/valheim/images/a/af/Blueberries.png/revision/latest?cb=20210215131400", "Health": 8.0, "Stamina": 25.0, "Total": 33.0, "Healing (hp/tick)": 1, "Duration (sec)": 600, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Blueberries", "DroppedBy": "Blueberry bushes in the Black Forest biome", "Crafting": null, "Progression": "Stone", "Duration (min)": 10.0}, {"Name": "Carrot", "Icon": "https://static.wikia.nocookie.net/valheim/images/c/c3/Carrot.png/revision/latest?cb=20210215131441", "Health": 10.0, "Stamina": 32.0, "Total": 42.0, "Healing (hp/tick)": 1, "Duration (sec)": 900, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Carrot", "DroppedBy": "Farming Carrot seeds", "Crafting": null, "Progression": "Bronze", "Duration (min)": 15.0}, {"Name": "Cloudberries", "Icon": "https://static.wikia.nocookie.net/valheim/images/e/e4/Cloudberries.png/revision/latest?cb=20210215131511", "Health": 13.0, "Stamina": 40.0, "Total": 53.0, "Healing (hp/tick)": 1, "Duration (sec)": 900, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Cloudberries", "DroppedBy": "Plains biome", "Crafting": null, "Progression": "Silver", "Duration (min)": 15.0}, {"Name": "Honey", "Icon": "https://static.wikia.nocookie.net/valheim/images/c/c6/Honey.png/revision/latest?cb=20210215131700", "Health": 8.0, "Stamina": 35.0, "Total": 43.0, "Healing (hp/tick)": 1, "Duration (sec)": 900, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Honey", "DroppedBy": "Beehive", "Crafting": null, "Progression": "Stone", "Duration (min)": 15.0}, {"Name": "Yellow mushroom", "Icon": "https://static.wikia.nocookie.net/valheim/images/5/57/Yellow_mushroom.png/revision/latest?cb=20210215131741", "Health": 10.0, "Stamina": 30.0, "Total": 40.0, "Healing (hp/tick)": 1, "Duration (sec)": 600, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Yellow_mushroom", "DroppedBy": "Burial Chambers, Troll Cave, Sunken Crypts", "Crafting": null, "Progression": "Stone", "Duration (min)": 10.0}, {"Name": "Carrot soup", "Icon": "https://static.wikia.nocookie.net/valheim/images/0/00/Carrot_soup.png/revision/latest?cb=20210215131443", "Health": 15.0, "Stamina": 45.0, "Total": 60.0, "Healing (hp/tick)": 2, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Carrot_soup", "DroppedBy": "Cauldron", "Crafting": "Mushroom x 1 Carrot x 3", "Progression": "Bronze", "Duration (min)": 25.0}, {"Name": "Queens jam", "Icon": "https://static.wikia.nocookie.net/valheim/images/a/ad/Queens_jam.png/revision/latest?cb=20210215131812", "Health": 14.0, "Stamina": 40.0, "Total": 54.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Queens_jam", "DroppedBy": "Cauldron", "Crafting": "Crafts 4 Raspberries x 8 Blueberries x 6", "Progression": "Bronze", "Duration (min)": 20.0}, {"Name": "Grilled neck tail", "Icon": "https://static.wikia.nocookie.net/valheim/images/0/06/Grilled_neck_tail.png/revision/latest?cb=20210215131743", "Health": 25.0, "Stamina": 8.0, "Total": 33.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Grilled_neck_tail", "DroppedBy": "Cooking station", "Crafting": "Neck tail x 1", "Progression": "Stone", "Duration (min)": 20.0}, {"Name": "Cooked boar meat", "Icon": "https://static.wikia.nocookie.net/valheim/images/8/89/Cooked_meat.png/revision/latest?cb=20180727051753", "Health": 30.0, "Stamina": 10.0, "Total": 40.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Cooked_boar_meat", "DroppedBy": "Cooking station", "Crafting": "boar meat x 1", "Progression": "Stone", "Duration (min)": 20.0}, {"Name": "Bread", "Icon": "https://static.wikia.nocookie.net/valheim/images/e/e1/Bread.png/revision/latest?cb=20210215131421", "Health": 25.0, "Stamina": 75.0, "Total": 100.0, "Healing (hp/tick)": 1, "Duration (sec)": 1800, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Bread", "DroppedBy": "Cauldron", "Crafting": "Barley flour x 10", "Progression": "Iron", "Duration (min)": 30.0}, {"Name": "Cooked fish", "Icon": "https://static.wikia.nocookie.net/valheim/images/1/16/Cooked_fish.png/revision/latest?cb=20210215131603", "Health": 45.0, "Stamina": 15.0, "Total": 60.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Cooked_fish", "DroppedBy": "Cooking station", "Crafting": "Raw fish x 1", "Progression": "Stone", "Duration (min)": 20.0}, {"Name": "Turnip stew", "Icon": "https://static.wikia.nocookie.net/valheim/images/f/fd/Turnip_stew.png/revision/latest?cb=20210212175937", "Health": 18.0, "Stamina": 55.0, "Total": 73.0, "Healing (hp/tick)": 2, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Turnip_stew", "DroppedBy": "Cauldron", "Crafting": "Boar meat x 1 Turnip x 1", "Progression": "Bronze", "Duration (min)": 25.0}, {"Name": "Sausages", "Icon": "https://static.wikia.nocookie.net/valheim/images/a/a0/Sausages.png/revision/latest?cb=20210215131836", "Health": 55.0, "Stamina": 18.0, "Total": 73.0, "Healing (hp/tick)": 3, "Duration (sec)": 1500, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Sausages", "DroppedBy": "Cauldron", "Crafting": "Crafts 4 Entrails x 4 Boar meat x 1 Thistle x 1", "Progression": "Bronze", "Duration (min)": 25.0}, {"Name": "Fish wraps", "Icon": "https://static.wikia.nocookie.net/valheim/images/b/b5/Fish_wraps.png/revision/latest?cb=20210215131607", "Health": 70.0, "Stamina": 23.0, "Total": 93.0, "Healing (hp/tick)": 4, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Fish_wraps", "DroppedBy": "Cauldron", "Crafting": "Cooked fish x 2 Barley flour x 4", "Progression": "Iron", "Duration (min)": 25.0}, {"Name": "Cooked serpent meat", "Icon": "https://static.wikia.nocookie.net/valheim/images/c/c1/Cooked_serpent_meat.png/revision/latest?cb=20210215131841", "Health": 70.0, "Stamina": 23.0, "Total": 93.0, "Healing (hp/tick)": 3, "Duration (sec)": 1500, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Cooked_serpent_meat", "DroppedBy": "Iron Cooking station", "Crafting": "Serpent meat x 1", "Progression": "Iron", "Duration (min)": 25.0}, {"Name": "Cooked lox meat", "Icon": "https://static.wikia.nocookie.net/valheim/images/4/40/Cooked_lox_meat.png/revision/latest?cb=20210215131722", "Health": 50.0, "Stamina": 16.0, "Total": 66.0, "Healing (hp/tick)": 4, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Cooked_lox_meat", "DroppedBy": "Cooking station", "Crafting": null, "Progression": "Silver", "Duration (min)": 20.0}, {"Name": "Serpent stew", "Icon": "https://static.wikia.nocookie.net/valheim/images/5/55/Serpent_stew.png/revision/latest?cb=20210215131844", "Health": 80.0, "Stamina": 26.0, "Total": 106.0, "Healing (hp/tick)": 4, "Duration (sec)": 1800, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Serpent_stew", "DroppedBy": "Cauldron", "Crafting": "Mushroom x 1 Cooked serpent meat x 1 Honey x 2", "Progression": "Iron", "Duration (min)": 30.0}, {"Name": "Lox meat pie", "Icon": "https://static.wikia.nocookie.net/valheim/images/5/5e/Lox_meat_pie.png/revision/latest?cb=20210215131724", "Health": 75.0, "Stamina": 24.0, "Total": 99.0, "Healing (hp/tick)": 4, "Duration (sec)": 1800, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Lox_meat_pie", "DroppedBy": "Cauldron", "Crafting": "Barley flour x 4 Cloudberries x 2 Lox meat x 2", "Progression": "Silver", "Duration (min)": 30.0}, {"Name": "Blood pudding", "Icon": "https://static.wikia.nocookie.net/valheim/images/2/28/Blood_pudding.png/revision/latest?cb=20210215131359", "Health": 23.0, "Stamina": 70.0, "Total": 93.0, "Healing (hp/tick)": 1, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Blood_pudding", "DroppedBy": "Cauldron", "Crafting": "Thistle x 2 Bloodbag x 2 Barley flour x 4", "Progression": "Iron", "Duration (min)": 25.0}, {"Name": "Boar jerky", "Icon": "https://static.wikia.nocookie.net/valheim/images/6/65/Boarjerky.png/revision/latest?cb=20210922034153", "Health": 20.0, "Stamina": 20.0, "Total": 40.0, "Healing (hp/tick)": 1, "Duration (sec)": 1800, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Boar_jerky", "DroppedBy": "Cauldron", "Crafting": "Crafts 2 Boar meat x 1 Honey x 1", "Progression": "Bronze", "Duration (min)": 30.0}, {"Name": "Deer stew", "Icon": "https://static.wikia.nocookie.net/valheim/images/b/bf/Deerstew.png/revision/latest?cb=20210922034153", "Health": 40.0, "Stamina": 13.0, "Total": 53.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Deer_stew", "DroppedBy": "Cauldron", "Crafting": "Blueberries x 1 Carrot x 1 Cooked deer meat x 1", "Progression": "Bronze", "Duration (min)": 20.0}, {"Name": "Muckshake", "Icon": "https://static.wikia.nocookie.net/valheim/images/1/1d/Shocklatesmoothie.png/revision/latest?cb=20210922034153", "Health": 16.0, "Stamina": 50.0, "Total": 66.0, "Healing (hp/tick)": 1, "Duration (sec)": 1200, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Muckshake", "DroppedBy": "Cauldron", "Crafting": "Ooze x 1 Raspberries x 2 Blueberries x 2", "Progression": "Bronze", "Duration (min)": 20.0}, {"Name": "Onion", "Icon": "https://static.wikia.nocookie.net/valheim/images/5/51/Onion.png/revision/latest?cb=20210922183720", "Health": 13.0, "Stamina": 40.0, "Total": 53.0, "Healing (hp/tick)": 1, "Duration (sec)": 900, "Stack Size": 50, "URL": "https://valheim.fandom.com/en/wiki/Onion", "DroppedBy": "Farming Onion seeds", "Crafting": null, "Progression": "Bronze", "Duration (min)": 15.0}, {"Name": "Minced Meat Sauce", "Icon": "https://static.wikia.nocookie.net/valheim/images/5/58/Mincemeatsauce.png/revision/latest?cb=20210922034153", "Health": 45.0, "Stamina": 15.0, "Total": 60.0, "Healing (hp/tick)": 3, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Minced_Meat_Sauce", "DroppedBy": "Cauldron", "Crafting": "Boar meat x 1 Neck tail x 1 Carrot x 1", "Progression": "Bronze", "Duration (min)": 25.0}, {"Name": "Wolf jerky", "Icon": "https://static.wikia.nocookie.net/valheim/images/8/8b/Wolfjerky.png/revision/latest?cb=20210922034153", "Health": 30.0, "Stamina": 30.0, "Total": 60.0, "Healing (hp/tick)": 1, "Duration (sec)": 1800, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Wolf_jerky", "DroppedBy": "Cauldron", "Crafting": "Wolf meat x 1 Honey x 1", "Progression": "Silver", "Duration (min)": 30.0}, {"Name": "Onion soup", "Icon": "https://static.wikia.nocookie.net/valheim/images/7/72/OnionSoup.png/revision/latest?cb=20210922034153", "Health": 12.0, "Stamina": 60.0, "Total": 72.0, "Healing (hp/tick)": 1, "Duration (sec)": 1200, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Onion_soup", "DroppedBy": "Cauldron", "Crafting": "Onion x 3", "Progression": "Silver", "Duration (min)": 20.0}, {"Name": "Wolf skewer", "Icon": "https://static.wikia.nocookie.net/valheim/images/d/d7/Wolf_skewer.png/revision/latest?cb=20210922034153", "Health": 65.0, "Stamina": 13.0, "Total": 78.0, "Healing (hp/tick)": 3, "Duration (sec)": 1500, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Wolf_skewer", "DroppedBy": "Cooking station", "Crafting": "Wolf meat x 1 Mushroom x 2 Onion x 1", "Progression": "Silver", "Duration (min)": 25.0}, {"Name": "Black soup", "Icon": "https://static.wikia.nocookie.net/valheim/images/e/e6/BlackSoup.png/revision/latest?cb=20210922034152", "Health": 50.0, "Stamina": 17.0, "Total": 67.0, "Healing (hp/tick)": 3, "Duration (sec)": 1200, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Black_soup", "DroppedBy": "Cauldron", "Crafting": "Bloodbag x 1 Honey x 1 Turnip x 1", "Progression": "Bronze", "Duration (min)": 20.0}, {"Name": "Cooked wolf meat", "Icon": "https://static.wikia.nocookie.net/valheim/images/6/68/Wolf_meat_cooked.png/revision/latest?cb=20210922034153", "Health": 45.0, "Stamina": 15.0, "Total": 60.0, "Healing (hp/tick)": 3, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Cooked_wolf_meat", "DroppedBy": "Cooking station", "Crafting": "Wolf meat x 1", "Progression": "Silver", "Duration (min)": 20.0}, {"Name": "Eyescream", "Icon": "https://static.wikia.nocookie.net/valheim/images/9/90/Eyescream.png/revision/latest?cb=20210922034153", "Health": 21.0, "Stamina": 65.0, "Total": 86.0, "Healing (hp/tick)": 1, "Duration (sec)": 1500, "Stack Size": 10, "URL": "https://valheim.fandom.com/en/wiki/Eyescream", "DroppedBy": "Cauldron", "Crafting": "Greydwarf eye x 3 Freeze gland x 1", "Progression": "Silver", "Duration (min)": 25.0}, {"Name": "Cooked deer meat", "Icon": "https://static.wikia.nocookie.net/valheim/images/e/e7/Deer_meat_cooked.png/revision/latest?cb=20210922034153", "Health": 35.0, "Stamina": 12.0, "Total": 47.0, "Healing (hp/tick)": 2, "Duration (sec)": 1200, "Stack Size": 20, "URL": "https://valheim.fandom.com/en/wiki/Cooked_deer_meat", "DroppedBy": "Cooking station", "Crafting": "Deer meat x 1", "Progression": "Stone", "Duration (min)": 20.0}]}}, {"mode": "vega-lite"});
</script>


**Instruction**: What you see above is a scatterplot of all food choices in-game, and where they
land based on the health and stamina they offer. The colors represent the stage
of the game where you can obtain them, while the size of the circle represents
their active duration. You can hover above them to see more info.


## Introduction

[Valheim](https://store.steampowered.com/app/892970/Valheim/) is an exploration and survival game that takes you to the heights of
Viking culture. It's like the love child of [Minecraft](https://www.minecraft.net/en-us), [Terraria](https://store.steampowered.com/app/105600/Terraria/), and [Dark
Souls](https://store.steampowered.com/app/570940/DARK_SOULS_REMASTERED/)&mdash;yes, you read that right. 

Food is an essential component in Valheim as it drastically affects one's
gameplay. Eat a high-meat diet and you get loads of health to tank hits, to the
detriment of your stamina. Fill yourself with fruits so you can do more, but be
careful being one-shotted by an enemy. 

Yes, I'm officially addicted to Valheim, and I also get frustrated when I run
out of stamina while drawing my bow. I never really cared about my food
intake&mdash;until now. 

## Methodology

* I scraped the food data from the [Valheim Fandom page](https://valheim.fandom.com/wiki/Food). To get the "DroppedBy" and "Crafting Material" columns, I traversed each food page and parsed the infobox. You can see more of my process in [this notebook](https://github.com/ljvmiranda921/valheim-viz/blob/master/Valheim_Food_EDA.ipynb).
* I manually annotated the "Progression" column. I checked the following variables to determine the age / progression a food item can be found in a normal playthrough: (1) ore dependencies, (2) food recipe and its dependencies,
(3) enemy and biome difficulty.

If you see any discrepancies in the collection process, feel free to create a
Pull Request in the [valheim-viz Github
repo](https://github.com/ljvmiranda921/valheim-viz). You can also find [the
dataset in Kaggle](https://www.kaggle.com/ljvmiranda/valheim-food-dataset). 

## Acknowledgments

Many thanks to the maintainers of the Valheim Wiki, and
[u/174nana](https://www.reddit.com/user/174nana/) for the banner photo from [their Reddit post](https://www.reddit.com/r/valheim/comments/mini5s/showing_my_love_to_the_devs_for_making_the_food/). Of course, huge thanks to [Iron Gate](https://irongatestudio.se/) for making this awesome game!

