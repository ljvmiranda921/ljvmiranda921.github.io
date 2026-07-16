---
layout: post
title: "Gapminder PH"
date: 2017-02-12
category: notebook
comments: true
author: "LJ V. MIRANDA"
summary: "A tribute to Hans Rosling's Gapminder chart, applied in the Philippine context."
tags: [data visualization, gap minder, philippines, han rosling]
---

<br> In honor of Hans Rosling, who passed away last week, I decided to create
a Gapminder plot for the Philippines. So here are the provinces of our
country, plus Metro Manila, mapped in terms of health and wealth. _(Note:
Loading with Plotly may take some time)_

<iframe width="850" height="750" frameborder="0" scrolling="no" src="//plot.ly/~ljvmiranda/49.embed"></iframe>

### How to use

Drag the slider to switch years from 2001 to 2015. You can also access the
panel above in order to zoom-in/out, pan, or select a subset of data. If you
get lost, simply click the "Autoscale" button and the "Reset Axis" button.
Furthermore, you can check the data and the Python scripts I used in my
[Github](https://github.com/ljvmiranda921/gapminder-ph)!

### Notes
1. The expenses were plotted in a logarithmic scale.
2. Dinagat Islands officially became a province by the end of 2006, although the rulings flipped (and flopped) by 2010 and 2011. One can then see how it changed financially from 2006 to 2007. Prior to that year, data for Dinagat Islands was taken from Surigao del Norte.
3. Population data is only available for the years 2000, 2010, and 2015. Linear regression was implemented to fill the missing years.
4. Similarly, life expectancy data is only available for the years 1997 to 2012 in three-year intervals. Linear regression was also implemented to fill the missing years.
5. Kudos to Department of Finance for having their LGU-level data available and organized.
6. Expenses were treated as an "indicator" of wealth [4]
7. _Update:_ Expenses were adjusted using the price index (CPI) in order to take inflation into account.

## References

{% bibliography --file notebook/gapminder-ph.bib %}

