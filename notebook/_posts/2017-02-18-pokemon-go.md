---
layout: post
title: "Gotta Catch em All!"
date: 2017-02-18
category: notebook
comments: true
author: "LJ MIRANDA"
summary: "A data visualization exploring spawn rate and catch-flee ratios of Gen 1 Pokemon in Pokemon GO."
tags: [data visualization, pokemon go]
---

I can describe myself as someone who "just joined the hype" of the recent
Pok&eacute;mon GO mobile game. It was a fun summer, but when school kicked in
and winter started taking over, I felt less inclined to go out and fill-up my
Pok&eacute;dex. I still remember the days when our neighborhood is just
_filled_ with Pidgeys and Rattatas, and _very few_ Abras that were almost
"un-catchable." This inspired me to look into how other Pok&eacute;mon fare
with respect to their spawn frequency and the ease on how they can be caught.

So here's a _magic quadrant_ exploring these features. Good thing that data
for Pok&eacute;mon GO is already available online. However, please be mindful
that several assumptions were made in the methods of data collection, so
subtle biases, intended or not, may be present. You can check them
[below](#notes). Moreover, if you're planning to use my dataset, you can
first refer to my exploratory data analysis
[here](https://github.com/ljvmiranda921/pkmn/blob/master/Exploratory%20Data%20Analysis%20of%20Pokemon%20GO%20Dataset.ipynb).

You can play with this chart by hovering on different points so you can see
the Pok&eacute;mon it represents. __Which Pok&eacute;mon is the most common
and easiest to catch? Which one's the hardest? In which quadrant does more
powerful Pok&eacute;mon lie?__ You can also click the legends on the right to
hide some types so you can focus or compare between different types. Enjoy!

<iframe width="1200" height="1000" frameborder="0" scrolling="no" src="//plot.ly/~ljvmiranda/51.embed"></iframe>

### Notes

- The data for catch and flee rates was pulled by Reddit user [/u/The_Desert_Rain](https://www.reddit.com/user/The_Desert_Rain). In my visualization, I am using the base rates, this means that catching these Pok&eacute;mon gets harder as your level goes up. What [/u/The_Desert_Rain](https://www.reddit.com/user/The_Desert_Rain) and other Redditors are doing is that they are trying to reverse engineer the formulas and game mechanics in PokemonGO. Because the actual data is hidden, they look for patterns and compute for expected outcomes. It's so geeky and exciting! You can read more of their analyses [here](https://www.reddit.com/r/TheSilphRoad/comments/4vs70r/analysis_on_catch_rates_and_encounters/) and [here](https://www.reddit.com/r/TheSilphRoad/comments/4v52le/base_capture_rate/).
- The spawn rate was taken from the Pok&eacute;mon GO Hub's [website](https://pokemongohub.net/pokemon-go-spawn-rate/). Their methodology involves scraping the data from [Pok&eacute; Radar](http://www.pokeradar.io/) and computed the percentages on a one-week period across approximately 100 million historical data points. This then _normalizes_ the spawn rate irrespective of your geographical location (like Mr. Mime showing only in France or Water-type Pok&eacute;mon spawning near bodies of water).
- The CP was taken as a basis of "strength." The data for this came from [Kaggle](https://www.kaggle.com/abcsds/pokemongo).
- In my case, I engineered two features for my x and y axes. First, I took the log (base 10) of the swarm rate and plotted it along the x-axis. For the y-axis, I simply plotted the ratio between the catch rate and the flee rate. Thus, we have `x_arg = np.log10(swarm_rate)` for the x-axis and `y_arg = catch_rate/flee_rate` for the y-axis. If `y_arg` is high, then the denominator is low so that catch rate is higher than the flee rate and so on.
- To make the "magic quadrant" more pleasing to look at, I applied zero-mean centering in my data. This means that I took the mean of the two features, and subtracted it to all my samples. You can access the [GitHub repo](https://github.com/ljvmiranda921/pkmn) for the source code.
- As you can see, I am only plotting the Primary types of each Pok&eacute;mon. I still haven't figured an elegant way of showing those that are double-typed. That's why you'll see Pidgey and Spearow classified as Normal-types, and Seel and Dewgong as Water-types. If you have nice ideas, just comment below!

### Sources
- `The_Desert_Rain` (2016). [Analysis on Catch Rates and Encounters](https://www.reddit.com/r/TheSilphRoad/comments/4vs70r/analysis_on_catch_rates_and_encounters/), Reddit, [r/TheSilphRoad](https://www.reddit.com/r/TheSilphRoad/)
- `homu` (2016). [Base Capture Rate](https://www.reddit.com/r/TheSilphRoad/comments/4v52le/base_capture_rate/i), Reddit, [r/TheSilphRoad](https://www.reddit.com/r/TheSilphRoad/)
- `Zeroghan` (2016). [Pokemon GO Spawn Rate](https://pokemongohub.net/pokemon-go-spawn-rate/), PokemonGO Hub.
- Barradas, Alberto (2016). [PokemonGO Dataset](https://www.kaggle.com/abcsds/pokemongo), Kaggle.
