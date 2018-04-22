---
layout: post
title: "A short postmortem on moving to Docker for LaTeX continuous integration"
date: 2018-04-23
category: notebook
comments: true
author: "LJ MIRANDA"
---

I practice continuous integration (CI) and deployment even in my LaTeX
projects. Everytime I perform a `git commit`, Travis-CI uploads the
compiled document into Dropbox so that I can access them in all my devices
(Related: [Continuous integration and deployment for LaTeX
files](https://ljvmiranda921.github.io/notebook/2018/02/04/continuous-integration-for-latex/)).

I do the same thing for my curriculum vitae: git commit, Travis build,
deploy! You can even see the compiled document fresh from the server in this
website's header (look up!). Just for fun, I set-up a cron job to build my CV
every week. However, for the past few weeks, I've been receiving some weird build
failures:

![Diagram](/assets/png/tuts/build_failures.png){:width="560px"}  
__Figure:__ _Yup, I've been ignoring this problem for the past two months_
{: style="text-align: center;"}

As it turns out, my set-up script, `tlsetup.sh` is the one causing the
problem. Now, `tlsetup.sh` does a lot of things to create a LaTeX environment
before compilation:

- It installs a frozen version of TexLive 2015 base (Travis-CI uses Ubuntu 14.04)
- Installs `biber` for compiling bibliography files.
- Sets-up a directory tree for installing LaTeX packages; and
- Installs LaTeX packages specific to the project.

You can check what it looks like
[here](https://gist.github.com/ljvmiranda921/6055d03dc264bfca0ea8c421ec6a2b41#file-tlsetup-sh).
It looks convenient, but I want you to imagine how much boilerplate must be
done in order to set-up a working LaTeX environment. Going through the job
log, there seems to be a connection error, causing a failure whenever TexLive
or some package was downloaded by Travis-CI directly from the TUG file server
(ftp://tug.org).

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
codes](https://en.wikipedia.org/wiki/List_of_FTP_server_return_codes) reveal
that a return code of 400 means that 

> the command was not accepted and the
requested action did not take place, but the error condition is temporary and
the action may be requested again

Okay, that was not deterministic. Sure, we can have some gotchas in Travis
where we keep on retrying the download until it succeeds, but this makes our
system all the more unreliable. Remember, we are not installing the full
TexLive version (about 3 GB). We only install the minimal LaTeX version, and
incrementally add the package dependencies according to the needs of our
project. If we have, say, 20 dependencies and atleast one of them fails, then
the whole compilation will fail. In addition, there seems to be some timeout
problems with `wget` and `tlmgr` concerning Travis-CI:

- [Issue # 6139: tlmgr update fails with exit code 22](https://github.com/travis-ci/travis-ci/issues/6139)
- [Issue # 7812: Builds hanging when using wget/curl](https://github.com/travis-ci/travis-ci/issues/7812)

Either way, it causes me anxiety whenever a previous build that works
yesterday will suddenly stop working today. Thus, one workaround is to
find another "environment" where LaTeX is already installed and working, then issue our
compile commands (`pdflatex`, `biber`, etc.) inside it.

## Enter Docker