---
layout: post
title: "How to install GDAL/OGR"
date: 2019-04-13
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [gdal, ogr, geospatial, how-to, how to install gdal, ubuntu, conda, python, anaconda, osgeo]
---

If you're working on geospatial data, then [GDAL/OGR](https://www.gdal.org/)
should definitely be part of your toolbox. It's a collection of command-line
utilities that allows you to manipulate vector and raster data. 

Personally, I find it a bit unwieldy to install, with multiple guides and
instructions scattered all over the internet.  In this post, I decided to
compile all installation instructions that worked for me. Hopefully you'll also
find them useful.

**First things first!** My machine runs on Ubuntu 16.04. My GDAL/OGR versions
are both `2.3.3 released 2018/12/14`. Also, I don't claim this to be the
ground-truth for GDAL/OGR installation. If some things didn't work, then feel
free to comment! 

- [Installation](#installation)
    + [Using conda](#using-conda)
    + [Using your package manager](#using-your-package-manager)
- [Bindings](#bindings)
    + [Python bindings](#python-bindings)

## Installation

It's good to have GDAL/OGR installed system-wide, then export the `PATH` where
it is located. In this section, we'll talk about *different ways* on how to
accomplish that. Just to verify if you have GDAL/OGR in your system, execute the
following commands:

```s
$ gdalinfo --version
$ ogrinfo --version
```

If it works, then why are you here? Else, read on!

### Using conda

Personally, the **easiest way** to install GDAL is through `conda`. If you have
the [Anaconda distribution](https://www.anaconda.com/) (or
[miniconda](https://docs.conda.io/en/latest/miniconda.html)), then simply
execute the following command:

```s
$ conda install gdal
```

And voila! GDAL/OGR is already installed. GDAL is installed via this way in my
machine. If I run `which gdalinfo`, it shows the following:

```s
$ which gdalinfo
/home/ljvm/anaconda3/bin/gdalinfo
```

- **PRO**: If you have `conda`, then this is just a one-step process. 
- **CON**: If you don't really use `conda`, or just want a lightweight
    environment for what you're doing, then installing a distribution may be an
    overkill. You can try `miniconda`, but again, there's overhead.

You definitely want to start managing your `conda` environments here. There was
a time when my GDAL version bumped down when installing another library.

### Using your package manager

For now, I'm going to put instructions for Ubuntu. If you would like to
contribute for Windows and MacOS, then feel free to comment below!

First, you need to add the `ubuntugis` repository:

```s
$ add-apt-repository ppa:ubuntugis/ppa && apt-get update
```

(Optional) You might also want more recent versions of GDAL in your system. I'd
definitely recommend this if you know what you're doing and you have clear
reasons why you want X version of GDAL:

```s
$ add-apt-repository ppa:nextgis/ppa && apt-get update 
```

In this [link](
https://launchpad.net/~ubuntugis/+archive/ubuntu/ppa?field.series_filter=), you
can see which GDAL version is available for which series. I'm currently on
Xenial (16.04), so I can install GDAL 2.1.3


```s
$ apt-get install gdal-bin
```

(Optional) I also recommend installing the header files just in case you'll use
a program or application that depends on it. In this case, 

```s
$ apt-get install libgdal-dev
```

Once you've installed the one above, you might want to include the header files
in your system so that `gcc` can see them:

```s
export CPLUS_INCLUDE_PATH=/usr/include/gdal
export C_INCLUDE_PATH=/usr/include/gdal
```

## Bindings

Bindings are necessary in case you want to write or use libraries that depend on
GDAL/OGR. This is still a growing list, so feel free to comment if you want to
add more!

### Python bindings

I think one of the most important GDAL-related python package is `osgeo`. This
is in fact a [Python binding for both GDAL and OGR](https://pypi.org/project/GDAL/).
Installing this also gives you access to the `gdal_merge.py` command-line
utility. To install, run:

```
pip3 install                                    \
    --global-option=build_ext                   \ 
    --global-option="-I/usr/include/gdal"       \
    GDAL==`gdal-config --version`
```

Note that you need to have gdal installed first in your system before executing
the command above. This automatically installs the proper binding given the
GDAL version in your system. 


## Updates

Thank you [Ardie Orden](https://github.com/ardieorden) for including additional
instructions for Debian Buster in the comments:

```sh
$ sudo apt-get install -y gdal-bin python3-gdal python-gdal libgdal-dev g++
$ CPLUS_INCLUDE_PATH=/usr/include/gdal
$ C_INCLUDE_PATH=/usr/include/gdal
$ pip3 install GDAL=2.4.0
```
