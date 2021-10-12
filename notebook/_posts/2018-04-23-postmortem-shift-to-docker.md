---
layout: post
title: "A short postmortem on moving to Docker for LaTeX continuous integration"
date: 2018-04-23
category: notebook
comments: true
author: "LJ MIRANDA"
---

> Update (2021-10-11): I changed my CI/CD system from Travis CI to Github
> Actions, and storage from Dropbox to Google Cloud Storage. It's still the
> same process, and I'm still using the blang/latex image. You can find the old
> code in the [v2.0 tag](https://github.com/ljvmiranda921/cv/releases/tag/v2.0).


I practice continuous integration (CI) and deployment even in my LaTeX
projects. Everytime I perform a `git commit`, Travis-CI uploads the
compiled document into Dropbox to make it accessible across all my devices
(Related: [Continuous integration and deployment for LaTeX
files](https://ljvmiranda921.github.io/notebook/2018/02/04/continuous-integration-for-latex/)).

I do the same thing for my curriculum vitae: git commit, Travis build,
deploy! You can even check the compiled document fresh from the server in this
website's header (look up!). 

Just for fun, I set-up a cron job to build my CV every week. However, for the
past few weeks, I've been receiving some weird build failures:

![Diagram](/assets/png/tuts/build_failures.png){:width="560px"}  
__Figure:__ _Yup, I've been ignoring this problem for the past two months_
{: style="text-align: center;"}

As it turns out, my set-up script, `tlsetup.sh` is causing some problem. A
short intro on `tlsetup.sh`: it's a small script I made that does a little
bit of everything to configure a working LaTeX environment before
compilation:

- Installs a frozen version of TexLive 2015 base (Travis-CI uses Ubuntu 14.04)
- Installs `biber` for compiling bibliography files.
- Sets-up a directory tree for installing LaTeX packages; and
- Downloads LaTeX packages specific to the project.

You can check what it looks like
[here](https://gist.github.com/ljvmiranda921/6055d03dc264bfca0ea8c421ec6a2b41#file-tlsetup-sh).
It looks convenient, but I want you to imagine how much boilerplate must be
done in order to set-up a working LaTeX environment. I need to stamp down all
dependencies to prevent my compile commands from failing. Of course I can
install a full LaTeX environment (i.e., `texlive-full`), but a 3-5 GB install
for a 1-2 page CV skimmed briefly by a recruiter isn't worth the
effort (_As if I'm not making a lot of effort on this already_).

Going through the job log, I found a connection error that causes a
failure whenever TexLive or some package is downloaded by Travis-CI straight
from the TUG file server (ftp://tug.org).

![Diagram](/assets/png/tuts/joblogs.png){:width="720px"}  
__Figure:__ _Downloading avantgar succeeds but bookman fails. Very unreliable._
{: style="text-align: center;"}

The result: an incomplete LaTeX environment and a failed LaTeX compilation.
Looking closely at the image above, we can see that for a specific package,
TexLive follows a two-step process:

1. Try via the File Transfer Protocol (FTP) and LWP
2. If the above fails, retry with `wget`

The FTP command returns an error code in the `400 series` most of the time. A
quick search of [FTP error
codes](https://en.wikipedia.org/wiki/List_of_FTP_server_return_codes) reveals
that a return code of 400 indicates that: 

> the command was not accepted and the
requested action did not take place, but the error condition is temporary and
the action may be requested again

Okay, that is not deterministic. Sure, we can have some gotchas in Travis
where we keep on retrying the download until it succeeds, but this makes our
system all the more unreliable. Remember, we are not installing the full
TexLive version (about 3 GB). We only install a minimal version, and
incrementally add package dependencies according to our project needs. If
we have, say, 20 dependencies and atleast one of them fails, then the whole
compilation will fail. 

In addition, there seems to be some timeout problems with `wget` and `tlmgr`
concerning Travis-CI:

- [Issue # 6139: tlmgr update fails with exit code 22](https://github.com/travis-ci/travis-ci/issues/6139)
- [Issue # 7812: Builds hanging when using wget/curl](https://github.com/travis-ci/travis-ci/issues/7812) 

Either way, it causes me anxiety whenever a previous build that works
yesterday will suddenly stop working today. Thus, one workaround is to
find another "environment" where LaTeX is already installed and working, then issue our
compile commands (`pdflatex`, `biber`, etc.) inside it.

## A Docker-based solution

[Docker](https://www.docker.com/) is wonderful. It gives me a container-based
solution that jives beautifully with my continuous integration practice.
Thankfully, for LaTeX, we have
[`blang`'s](https://github.com/blang/latex-docker) LaTeX docker image.
The way it's even advertised seems to be a direct answer for my needs:

> This container helps compiling latex sources without the need to install
all latex packages on your system

Awesome! Now I just need to set-up Travis-CI to pull this image and
I can go on my merry way. But before that, a little bit more about this image:

- You don't have to write your own Dockerfile, that's what these pre-made
images are for.
- It provides three different images for all your needs: a full LaTeX version,
a full CTAN version, and a minimal version.
- Fortunately, command wrappers are also provided for portability (you just need to
download them via `wget`, then `chmod +x`. Docker pulls are handled inside it).
- `latexmk` is also provided inside the image! This abstracts a lot of
commands needed for compilation!

(_So a shoutout to
[`blang/latex-docker`](https://github.com/blang/latex-docker) for making my
job much easier!_)

### Setting-up Travis-CI for LaTeX-Docker

Before I talk about the things I've added to `.travis.yml` (or to my project
as a whole), I'm going to enumerate all the things I've removed:
- Removed `tlsetup.sh` (62 loc) because the Docker image does all the installation anyway.
- Removed my custom `Makefile` (30 loc) because I'm shifting to `latexmk`

This is how much boilerplate I had when using the Docker-less approach.
Because there is already a container with a working LaTeX environment, I
don't need to go at great lengths setting-up an environment to compile
from source. I just need to pull from the Docker image and issue some
`pdflatex` commands within that image.

In addition, I don't even have to worry about listing specific dependencies
because I can just change the image into `latex:ctanfull` for an updated package
independent from the system or Linux version I have spun-up (remember, this is
a containerized solution, I don't need to worry if I'm using Ubuntu 14.04 or
16.04).

Now, my `.travis.yml` simply contains the following script:

```yml
sudo: required
dist: trusty # Ubuntu 14.04
services: docker # Enables docker
script:
- wget https://raw.githubusercontent.com/blang/latex-docker/master/latexdockercmd.sh
- chmod +x latexdockercmd.sh
- ./latexdockercmd.sh latexmk -pdf -outdir=./_build
```

My actual YAML file contains more than that due to some additional
scripts for uploading to Dropbox every deployment and release. For
our purposes, we simply download the `latexdockercmd.sh` script file and
run `latexmk` within it.

### Some gotchas

I am also implementing a similar system for my thesis manuscript. This means
I have a bibliography file (`.bib`) to organize my references. I use `biber`
to compile my `.bib` file but as it turns out, **biber is not installed in
the blang/latex:ubuntu** image. Took me three long hours to finally figure
that out:

![Diagram](/assets/png/tuts/threehours.png){:width="560px"}  
__Figure:__ _This is the programmer's way of saying "Never give up"_
{: style="text-align: center;"}

Good thing I came around this
[issue](https://github.com/blang/latex-docker/issues/10) saying that **biber
is installed in blang/latex:ctanfull** image. So, if you are using `biber` in
your project, make sure to point your `IMAGE` (inside `latexdockercmd.sh`) to
`blang/latex:ctanfull`. In my case, I downloaded `latexdockercmd.sh` locally,
modified it, and committed it as part of the repo (removing the need to `wget` and
`chmod` during the travis build):

```sh
#!/bin/sh
IMAGE=blang/latex:ctanfull # Modified into ctanfull
exec docker run --rm -i --user="$(id -u):$(id -g)" --net=none -v "$PWD":/data "$IMAGE" "$@"
```

## Results

With a Docker-based solution, I was able to do away with the unreliability
of creating a LaTeX environment straight into Travis. It also gave me the
flexibility to use packages whenever I want to without worrying if it's
compatible with Ubuntu 14.04 and without updating my `tlsetup.sh` (which I
deleted) script. Furthermore, it gave me a sense of comfort and
accomplishment when I started seeing something like this:

![Diagram](/assets/png/tuts/results1.png){:width="560px"}  
__Figure:__ _Those green bars gave me a good sigh of relief_
{: style="text-align: center;"}

It's also interesting that I have reduced the duration of my builds. Below is
a build time history for my `thesis-manuscript`. Unlike my `cv` project, I
started this one with continuous integration in mind, so all builds use the
traditional Docker-less solution (then the Docker-solution afterwards).

![Diagram](/assets/png/tuts/build_times.png){:width="720px"}  
__Figure:__ _Good start. For the last three builds, I have consistently reduced the build time with a Docker-based solution_
{: style="text-align: center;"}

Of course, the scientist in me will say that we are only looking at three
samples, so it's not enough basis for a strong conclusion. _Further testing
is required._ Nevertheless, seeing a decrease in build time is already a good
start.

**In the end**, I shifted from manually installing a TexLive environment
during my travis build into a full, Docker-based solution. This removes the
unreliability in `wget` and `FTP` commands from Travis and harnesses the
containerized capabilities of Docker. I don't need to worry about Linux
versions anymore, and I don't have to painstakingly jot down all dependencies
for every new project. I just need to spin a new container (`ctanfull`),
set-up my `.travis.yml`, and focus on my writing.

#### Changelog

- 10-11-2021: I changed my CI/CD system from Travis CI to Github Actions, and storage from Dropbox to Google Cloud Storage. It's still the same process, and I'm still using the blang/latex image. You can find the old code in the [v2.0 tag](https://github.com/ljvmiranda921/cv/releases/tag/v2.0).
- 06-16-2019: Change the word "container" to "images" when appropriate
