---
layout: post
type: post
title: "How to add tables to Contentful"
date: 2021-04-12
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [contentful, tables, content management system, cms, software dev]
description: |
    A short blogpost on what worked, what didn't work, and what are your other
    options&mdash;so that you won't be bothered scouring the net.
excerpt: |
    A short blogpost on what worked, what didn't work, and what are your other
    options&mdash;so that you won't be bothered scouring the net.
---

<span class="firstcharacter">I</span> want to represent tabular data in [Contentful](https://www.contentful.com/).
However, they don't have an appropriate [content
type](https://www.contentful.com/developers/docs/concepts/data-model/) that
handles that. For example, I want to express CO<sub>2</sub> emissions (in
gigaton) per year:

| Year | Emissions (in gigatons) |
|:------:|:-----------:|
| 2010 | 33.1      |
| 2011 | 34.4      |
| 2012 | 35        |
| 2013 | 35.3      |

* My initial approach is to create a generic Content Model with Year (`Integer`)
    and Value (`Number`) as fields, then establish a
    [link](https://www.contentful.com/developers/docs/concepts/links/) between
    my main model and the generic one. However, if you have ten years, then you
    generate 10 + 1 entries&mdash; very inefficient if you have limited entries.

* My second approach is to use a JSON Object for representing tables. It fits
    my use-case properly and it seems to be the appropriate data structure.
    However, I don't want my users to edit JSON objects directly! It's bad (and
    weird) UX!

## What worked

> **Solution:** Use a JSON object as the underlying data structure, but represent
> it as a Table using a Contentful UI Extension. You get both the efficiency of
> JSON, with the ease-of-use of a table.

The repo
[contentful-labs/ui-editable-table](https://github.com/contentful-labs/ui-editable-table)
is a nice UI extension from Contentful Labs that **enables JSON Objects to be
represented as a Table.** If your use-case is simple (using only the `master`
environment, static number of rows and columns, etc.), then the README
instructions should work as-is. However, I did some *modifications of my own*:

* *I updated the command-line utility it uses under the hood*. The current
    repo uses an [older and deprecated
    version](https://github.com/contentful/contentful-extension-cli) of the
    Contentful CLI. This version only uploads to the `master` environment,
    and there's no parameter to change that. In my repo, I used the [modern
    Contentful
    CLI](https://github.com/contentful/contentful-cli/tree/master/docs/extension/create)
    with more options and parameters.

* *I merged [@dmcb](https://github.com/dmcb)'s [Pull Request](https://github.com/contentful-labs/ui-editable-table/pull/2) that adds controls for altering table dimensions.* The original repo has a static number of rows and columns, depending on how you set it up. The said PR fixes this and adds more user-control in the UI.

* *I cleaned-up the extension name and title.* It seems that the extension was
    an artifact from another project. I removed some unnecessary words and
    ensured that naming is consistent.

You can check [my fork](https://github.com/ljvmiranda921/ui-editable-table) and
use it for your own. There are already [plans of archiving the original
repo](https://github.com/contentful-labs/ui-editable-table/pull/2#issuecomment-815068867)
so better to try out the forks.

### Other options

* You can also try [AnalogMemory's
fork](https://github.com/AnalogMemory/contentful-tables/). It does something
similar but uses the older Contentful CLI version. If you're just going to
create UI extensions in the default `master` environment, then I recommend
using this repo.

* There is also this [cool Table extension](https://pdq.github.io/contentful-table/) from PDQ. You can host it yourself or just add `https://pdq.github.io/contentful-table/` in your extension's `src` field. The UI looks clean with options to add or remove columns and rows. I recommend checking this out.

## Conclusion

It works! At first I thought it would be alot of trouble installing an
extension, but Contentful has made it easy to do so. Hopefully we can add it to
[this list](https://github.com/contentful/extensions/tree/master/samples) of
official extensions so that everything becomes way easier.
