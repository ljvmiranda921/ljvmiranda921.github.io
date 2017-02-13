---
layout: viz
title: "Gapminder PH"
date: 2017-02-12
category: projects
comments: true
author: "LJ MIRANDA"
---

<br> In honor of Hans Rosling, who passed away last week, I decided to create a Gapminder plot for the Philippines. So here
are the provinces of our country, plus Metro Manila, mapped in terms of health and wealth. _(Note: Loading with Plotly may take some time)_

<iframe width="850" height="750" frameborder="0" scrolling="no" src="//plot.ly/~ljvmiranda/49.embed"></iframe>

### How to use
Drag the slider to switch years from 2001 to 2015. You can also access the panel above
in order to zoom-in/out, pan, or select a subset of data. If you get lost, simply click
the "Autoscale" button and the "Reset Axis" button. Furthermore, you can check the data and the Python
scripts I used in my [Github](https://github.com/ljvmiranda921/gapminder-ph)!

### Notes
- The expenses were plotted in a logarithmic scale.
- Dinagat Islands officially became a province by the end of 2006, although the rulings flipped (and flopped) by 2010 and 2011. One can then see how it changed financially from 2006 to 2007. Prior to that year, data for Dinagat Islands was taken from Surigao del Norte.
- Population data is only available for the years 2000, 2010, and 2015. Linear regression was implemented to fill the missing years.
- Similarly, life expectancy data is only available for the years 1997 to 2012 in three-year intervals. Linear regression was also implemented to fill the missing years.
- Kudos to Department of Finance for having their LGU-level data available and organized.
- Expenses were treated as an "indicator" of wealth [4]
- _Update:_ Expenses were adjusted using the price index (CPI) in order to take inflation into account.

### Sources
1. [_Bureau of Local Government Finance_, Department of Finance, Republic of the Philippines (accessed: 10 Feb 2017)](http://blgf.gov.ph/lgu-fiscal-data/)
2. "2012-2013 Philippine Human Development Report," Human Development Network (HDN), 2013.
3. ["2015 Census of Population," Philippine Statistics Authority, Republic of the Philippines (accessed: 10 Feb 2017)](https://psa.gov.ph/statistics/census/2015-census-of-population)
4. ["Measuring Living Standards, Household Consumption and Wealth Indices," _Quantitative Techniques for Health Equity Analysis: Technical Note 14_, World Bank (accessed: 11 Feb 2017)](http://siteresources.worldbank.org/INTPAH/Resources/Publications/Quantitative-Techniques/health_eq_tn04.pdf)
5. ["Consumer Price Index: Philippines," World Bank](http://data.worldbank.org/indicator/FP.CPI.TOTL?locations=PH)
6. [G. Thompson "Statistical Literacy Guide: How to adjust for inflation," Library House of Commons, 2009.](http://www.parliament.uk/briefing-papers/sn04962.pdf)

Also, I found another implementation of Gapminder PH (by Dr. Reina Reyes) which I saw last night, check it out [here.](https://pinayobserver.wordpress.com/2012/09/01/gapminder/)
