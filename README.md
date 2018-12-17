# ljvmiranda921.github.io

[![Build Status](https://travis-ci.org/ljvmiranda921/ljvmiranda921.github.io.svg?branch=master)](https://travis-ci.org/ljvmiranda921/ljvmiranda921.github.io) 
[![License: CC BY 4.0](https://img.shields.io/badge/license-CC%20BY%204.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)



This is the source code for my [blog](ljvmiranda921.github.io). It's a static
website powered by [Jekyll](https://jekyllrb.com/). 

The build script can be found on `./deploy/cibuild`. It runs the `html-proofer`
gem which checks for inconsistencies in the generated page. Whenever you want
to create a new post, or develop the site, always make a Pull Request so that
the proofer can investigate the changes you've made.

## Dependencies

Here are the dependencies for this blog. You can also check the `Gemfile` for more
information: 

- Ruby==2.3.1
- gem==2.5.2.1
- jekyll=3.6.3
- minima==2.0
- html-proofer
- jekyll-sitemap
- jekyll-feed==0.6
- jekyll-seo-tag

## Set-up

Make sure that you have bundler in your system:

```shell
$ sudo gem install bundler
```

Then, build the dependencies and call `jekyll serve`

```shell
$ git clone https://github.com/ljvmiranda921/ljvmiranda921.github.io.git 
$ cd ljvmiranda921.github.io/
$ bundle install
$ bundle exec jekyll serve
```

The page, by default, should be running at [localhost:4000](localhost:4000)

## Contribute

If you found some errors in spelling/grammar, mistakes in content and the like, then feel
free to fork this repository and make a Pull Request!

[![licensebuttons by](https://licensebuttons.net/l/by/3.0/88x31.png)](https://creativecommons.org/licenses/by/4.0)
