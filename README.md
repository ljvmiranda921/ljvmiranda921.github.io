# ljvmiranda921.github.io

[![Netlify Status](https://api.netlify.com/api/v1/badges/4b3d2934-2e6c-4bd3-876f-40f9a8655af7/deploy-status)](https://app.netlify.com/sites/ljvmiranda921/deploys)
[![License: CC BY 4.0](https://img.shields.io/badge/license-CC%20BY%204.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)

This is the source code for my [blog](https://ljvmiranda921.github.io). It's a
static website powered by [Jekyll](https://jekyllrb.com/) with site analytics
done via [plausible.io](https://plausible.io/ljvmiranda921.github.io) (private,
cookie-free and open source).

## Set-up

Make sure that you have [bundler](https://bundler.io/) and
[Ruby](https://www.ruby-lang.org/en/news/2019/12/25/ruby-2-7-0-released/) in
your system:

```shell
gem install bundler
```

Then, build the dependencies and call `jekyll serve`

```shell
git clone https://github.com/ljvmiranda921/ljvmiranda921.github.io.git 
cd ljvmiranda921.github.io/
bundle install
bundle exec jekyll serve --livereload
```

The page, by default, should be running at [localhost:4000](localhost:4000)

## Contribute

If you found some errors in spelling/grammar, mistakes in content and the like, then feel
free to fork this repository and [make a Pull Request!](https://help.github.com/articles/creating-a-pull-request/)

[![licensebuttons by](https://licensebuttons.net/l/by/3.0/88x31.png)](https://creativecommons.org/licenses/by/4.0)
