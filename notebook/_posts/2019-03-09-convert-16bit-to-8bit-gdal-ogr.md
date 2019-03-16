---
layout: post
title: "How to convert 16-bit satellite images into 8-bit using GDAL"
date: 2019-03-09
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [satellite images, gdal, remote sensing, GIS, 16-bit, 8-bit]
---

In some geospatial applications, especially in machine learning, using an 8-bit
image is required. Converting it from a 16-bit image should be straightforward
when using QGIS, but if we want to render large, multiple images at scale, then
we need to rely on a more programmatic solution. In this tutorial, we'll
convert 16-bit LANDSAT-7 images into 8-bit.

## Prerequisites
- You should have GDAL/OGR installed in your system. You should see the version
    by running `gdalinfo --version` in your console. This tutorial uses `GDAL
    2.3.3, released 2018/12/14`
- I will be using Linux commands as we go along. If you're in a UNIX (Linux or
    MacOS) system, then well and good. For Windows, this should work on Windows
    Subsystem for Linux (WSL) or Cygwin/MSYS.

## TL;DR

You just need to run the following commands in succession. From your 16-bit
image named `$IMAGE`, we will produce an 8-bit image named `$IMAGE-final`:

```shell
$ $IMAGE = <your 16-bit TIF image filename>
$ gdalwarp -srcnodata 0 -dstalpha $IMAGE $(basename $IMAGE .tif)-temp1.TIF
$ gdal_edit.py -unsetnodata $(basename $IMAGE .TIF)-temp1.TIF
$ gdal_translate -scale 0 65535 0 65535  \
                 -b 3 -b 2 -b 1 -b 5 -co \
                  PHOTOMETRIC=RGB        \
                  $(basename $IMAGE .TIF)-temp1.TIF $(basename $IMAGE .TIF)-temp2.TIF
$ gdal_contrast_stretch -ndv 0 -percentile-range 0.03 0.97 \
                $(basename $IMAGE .TIF)-temp2.TIF $(basename $IMAGE .TIF)-temp3.TIF
$ gdal_translate -b 1 -scale 0 255 0 255 \
                 -b 2 -scale 0 255 0 255 \
                 -b 3 -scale 0 255 0 255 \
                 -b 4 -scale 0 1 0 255 \
                 $(basename $IMAGE .TIF)-temp3.TIF $(basename $IMAGE .TIF)-temp4.TIF  
```

