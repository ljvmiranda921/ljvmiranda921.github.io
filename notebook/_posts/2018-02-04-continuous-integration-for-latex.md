---
layout: post
title: "Continuous integration and automatic deployment of LaTeX files"
date: 2018-02-04
category: notebook
comments: true
author: "LJ MIRANDA"
description: "A tutorial on how to set-up continuous integration via Travis-CI, and automatic deployment in DropBox for LaTeX files"
math: true
---

> For every successful build, the output document from your LaTeX file will
> automatically be uploaded to your Dropbox---syncing across all your devices
> everywhere.

**Note:** I shifted to a Docker-based solution. Know more
[here](https://ljvmiranda921.github.io/notebook/2018/04/23/postmortem-shift-to-docker/).

<span class="firstcharacter">W</span>hen working with collaborators in large projects, an efficient continuous 
integration and deployment pipeline will keep your sanity. The same goes 
with LaTeX documents, even if you're working alone, a good pipeline can 
increase your document's portability and use.

In this tutorial, we'll go through the process of setting-up a continuous 
integration pipeline via Travis-CI and an automatic deployment scheme
through Dropbox. This means that everytime you perform a `git commit`,
Travis-CI will attempt to build your document. If the build is successful,
the output (mostly the `.pdf` file) will be automatically uploaded to your
Drobox. Our pipeline will look like this:

![Diagram](/assets/png/tuts/latex-ci.png){:width="480px"}  
__Figure 1:__ _LaTeX with Continuous Integration and Deployment Workflow_
{: style="text-align: center;"}

In order to make this tutorial straightforward, I'll assume that these 
preliminary steps were already done:

- Create a Github account, and a repository for your LaTeX document.
- [Create a Travis-CI account and activate that specific repository](https://docs.travis-ci.com/user/getting-started/). Here, we'll focus more on setting up the `.travis.yml` file.
- [Create a Dropbox account](https://www.dropbox.com/help/account/create-account)
- [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/) and make sure you have the [`gem` package manager](https://rubygems.org/pages/download) too 

First, we'll start by configuring our Dropbox account to obtain 
authorization keys, then move forward with writing our `.travis.yml` file.

## Configuring our Dropbox account

This step probably is the easiest part of this tutorial. Make sure that you 
have access to `curl` or `wget` to accomplish these tasks. Most Linux 
distributions (I'm using Ubuntu 16.04 LTS) already have these. If you are a 
Windows user, you can try running these via [Cygwin](https://www.cygwin.com/)
(warning: I haven't  tested this tutorial against cygwin!).

### Download Dropbox Uploader

[Dropbox uploader](https://github.com/andreafabrizi/Dropbox-Uploader) is a 
portable shell script that is designed to interact with the Dropbox API via 
the command-line. It's lightweight, so you can easily  include this in your 
repository. To install, simply type the following:

```shell
curl "https://raw.githubusercontent.com/andreafabrizi/Dropbox-Uploader/master/dropbox_uploader.sh" -o dropbox_uploader.sh
```

And then give execution permission to the script and execute it:

```shell
$ chmod +x dropbox_uploader.sh
$ ./dropbox_uploader.sh
```

This will then guide you to configure your access via Dropbox. This typically involves going to [Dropbox's Developer's Page](https://www.dropbox.com/developers), creating your Application, and generating your OAuth2 key.
Afterwards, you'll obtain a file `~./dropbox_uploader` that contains your 
access key. Remember that you have this for now, we'll be using this file 
later on.

Make sure that `dropbox_uploader.sh` (the shell file) is inside the your 
project repository. This means that it will be tracked by Git 
via `git add`. We'll also put the file `~./dropbox_uploader` inside our
directory, but since it contains security information regarding our Dropbox 
accounts, we will first encrypt it via `travis encrypt`. Head on to the next 
step for more information.

## Setting-up Travis-CI

If you've been using a continuous integration service before, you may 
already know the purpose of a `.travis.yml` file. For starters, this file
contains the build script that will be followed everytime you perform a
`git push`. I'll first show you the "final product," then we'll build each
component one-by-one:

```yaml
sudo: required
dist: trusty
before_install:
- openssl aes-256-cbc -K $encrypted_XXXXXXXXXXXX_key -iv $encrypted_XXXXXXXXXXXX_iv -in .dropbox_uploader.enc -out ~/.dropbox_uploader -d
- ./tlsetup.sh

script:
- make latex COMPILER=xelatex
- ./dropbox_uploader.sh upload _build/main.pdf ${TRAVIS_BRANCH}/main-latest.pdf
- ./dropbox_uploader.sh upload _build/main.pdf ${TRAVIS_BRANCH}/main-${TRAVIS_JOB_NUMBER}.pdf
```

- `sudo: required` : we'll be needing some `sudo` privileges here to install Texlive and other additional packages
- `dist: trusty` : as of now, the most stable Linux distribution in Travis is Ubuntu 14.04 LTS (trusty). There's a 16.04 version, but requires some Docker utilities to achieve.
- `openssl...` : this takes your encrypted `.dropbox_uploader` keys to gain access to Dropbox. You will need to replace the `X`'s here with the values given to you by `travis encrypt`. I'll walk you through this later on.
- `./tlsetup.sh` : a build script to install Texlive and other required packages. I'll leave a Github gist for you to modify and use in your project.
- `make latex...` : a minimal Makefile that I created for easy compilation of LaTeX files. You don't need to use this, nevertheless, I'll leave a Github gist for you to use.
- `./dropbox_uploader.sh upload...` : executes the Dropbox Uploader and performs the `upload` command to take your build artifacts into Dropbox.

Again, I'll walk you through each component so you can customize your own 
Makefiles and set-up scripts or build on-top of mine. In case you feel 
overwhelmed, don't be! Once you see "upload notifications" popping up in 
your Dropbox, I assure you that it will feel worth it!

### Encrypting your Dropbox access keys

We'll be needing our access keys inside our repository in order to make the 
upload successful. However, we should **never** upload the actual 
`~/.dropbox_uploader` inside the repo. Instead, we need it to encrypt it 
using a Travis tool:

```shell
$ gem install travis
```

Log-in to Travis and encrypt our files. You can perform these commands inside
your working directory:

```shell
$ travis login --auto
$ travis encrypt-file ~/.dropbox_uploader 
```

You will then have the encrypted file `.dropbox_uploader.enc`. Add this
to your repository instead of the actual `~/.dropbox_uploader` file. In
addition, you should see in the wizard that you need to add an `openssl...` 
key similar to the one above. Copy, and put that in your `.travis.yml` file.

### Set-up TexLive Installation

Next, we need to install TexLive in our Travis build. In the `.travis.yml` 
above, all of the installation details can be found in `./tlsetup.sh`. This 
installs a minimal TexLive 2015 distribution, the XeLaTeX compiler, and the 
`biber` package to handle all your bibliographic needs. At the bottom of the 
script, you can  add all required packages your document needs like 
`algpseudocode`, `hyperref`, etc.

*Why not use texlive-full?*  Although `texlive-full` installs almost all of 
the packages we will use, this slows down our build time. Here, we just need
to perform a minimal installation, then add only the required packages we'll 
need.

Feel free to use this script to come up with your own. In case you have 
suggestions in improving the build script and lessen build times, just 
comment on the gist and I will update it!

<script src="https://gist.github.com/ljvmiranda921/6055d03dc264bfca0ea8c421ec6a2b41.js"></script>

Remember that `tlsetup.sh` should be inside your repository. In addition,
let's grant some execute permission to this file:

```shell
$ chmod +x tlsetup.sh 
```

### Create your Makefile

The Makefile contains the workhorse for compiling your LaTeX documents. 
Below is my Makefile containing a minimal workflow consisting of the 
commands `pdflatex`, `pdflatex`, `biber`, `pdflatex` done in succession.

<script src="https://gist.github.com/ljvmiranda921/a9368c636cbf6dafbbf0a1979047aaca.js"></script>

Locally, you can run this file by typing the following command:

```shell
$ make latex
```
This assumes that the root `.tex` file to be compiled is named `main`. You
can easily change this by supplying a value to the `PROJECT` argument:

```shell
$ make latex PROJECT=MyNewFileName
```

The output file is stored in the `_build` directory, though you can edit this
by passing a value to the `BUILDDIR` argument:

```shell
$ make latex PROJECT=MyNewFileName BUILDDIR=output_dir
```

You can also change the LaTeX compiler from `pdflatex` to `xelatex` through 
the `COMPILER` argument. In my sample `.travis.yml` file, we're actually
using the `xelatex` compiler.

```shell
$ make latex PROJECT=MyNewFileName BUILDDIR=output_dir COMPILER=xelatex
```

### Upload Travis artifacts into Dropbox

So once the Texlive distribution is installed properly (via `tlsetup.sh`) 
and once the compilation has been done successfully (via `Makefile`), we can 
then upload the Travis artifacts (i.e, the files created during a Travis 
"run") into Dropbox. For our purposes, we'll be uploading the `.pdf` file
from the `_build` directory into Dropbox. This is easily done by the 
following script as seen in `.travis.yml`:

```shell
$ ./dropbox_uploader.sh upload _build/main.pdf ${TRAVIS_BRANCH}/main-latest.pdf
$ ./dropbox_uploader.sh upload _build/main.pdf ${TRAVIS_BRANCH}/main-${TRAVIS_JOB_NUMBER}.pdf
```

In this set-up, we're invoking the `./dropbox_uploader.sh` script and
executing the `upload` command. We'll be uploading from our "local directory"
the artifact `_build/main.pdf` into the "remote directory" 
`${TRAVIS_BRANCH}`. This means that for every branch, we'll create a specific
folder. For each folder, we'll upload a `-latest` file and another file
corresponding to a Travis job.

Of course, this is purely opinionated and you can modify this depending on
your needs. You can check the list of Travis variables in this [link](https://docs.travis-ci.com/user/environment-variables/#Default-Environment-Variables). Also, be sure to update your "local directory" 
`_build/main.pdf` in case you're using a different output directory and
project name.

### Perform a git push and see the magic happen!

If you've followed these steps properly, you should see that the output
`.pdf` is uploaded on the branch where you've performed a `git push`. You'll
probably see a `master` directory pertaining to the `master` branch, and two
files, `main-latest.pdf` and `main-{TRAVIS_BUILD_NUMBER}.pdf`, inside.

In case there are errors, be sure to check the Job Log in Travis-CI. In my
experience, most of the errors come from missing packages in my TeX document
that I wasn't able to install beforehand. Be sure to check those gotchas and
include them in the install script below.

Lastly, there are other ways to speed-up the build script and one of them
is via a Docker image. It may be easier to have an image with the full
TexLive installation inside so that we only need to bother with the 
`Makefile`.

Hope this short tutorial helps! Leave a comment if you have any questions
or suggestions to make this thing easier!

## References

- This [tutorial](https://hv.pizza/blog/document-building-versioning-with-tex-document-git-continuous-integration-dropbox/) by H. Vakharia is good. Here, he uses Sephamore CI and Docker in his workflow. I adapted this work for a regular Travis-CI build. 
- This [short tutorial](https://labs.consol.de/travis/dropbox/2015/11/04/upload-travis-artifacts-to-dropbox.html) for uploading Travis artifacts to Dropbox is also nice.

#### Changelog
* 09-28-2018: Update figure using Tikz for consistency
