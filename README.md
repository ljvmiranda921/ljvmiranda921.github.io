# Github pages for ljvmiranda921.github.io

[![Build Status](https://travis-ci.org/ljvmiranda921/ljvmiranda921.github.io.svg?branch=master)](https://travis-ci.org/ljvmiranda921/ljvmiranda921.github.io) 


This is the source code for my [blog](ljvmiranda921.github.io). It's a static
website powered by [Jekyll](https://jekyllrb.com/). 

The build script can be found on `./script/cibuild`. It runs the `html-proofer`
gem which checks for inconsistencies in the generated page. Whenever you want
to create a new post, or develop the site, always make a Pull Request so that
the proofer can investigate the changes you've made.

## Dependencies

Here are the dependencies for this blog. You can also check the `Gemfile` for more
information: 

- Ruby==2.3.1
- gem==2.5.2.1
- jekyll=3.5.2
- minima==2.0
- html-proofer
- jekyll-sitemap
- jekyll-feed==0.6
- jekyll-seo-tag

## Set-up

Make sure that you have bundler in your system:

```
$ sudo gem install bundler
```

Then, build the dependencies and call `jekyll serve`

```
$ git clone https://github.com/ljvmiranda921/ljvmiranda921.github.io.git 
$ cd ljvmiranda921.github.io/
$ bundle install
$ bundle exec jekyll serve
```

The page, by default, should be running at localhost:4000
