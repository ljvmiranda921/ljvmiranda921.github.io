# ljvmiranda921.github.io

[![Deploy Jekyll site to Pages](https://github.com/ljvmiranda921/ljvmiranda921.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/ljvmiranda921/ljvmiranda921.github.io/actions/workflows/pages.yml)
[![License: CC BY 4.0](https://img.shields.io/badge/license-CC%20BY%204.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)

This is the source code for my [blog](https://ljvmiranda921.github.io). It's a
static website powered by [Jekyll](https://jekyllrb.com/) with site analytics
done via [plausible.io](https://plausible.io/ljvmiranda921.github.io) (private,
cookie-free and open source).

## Set-up

The site pins its Ruby version in [`.ruby-version`](.ruby-version), so on a new
machine it's easiest to match it with [rbenv](https://github.com/rbenv/rbenv)
instead of your system Ruby:

```shell
# macOS with Homebrew (on Linux, install rbenv via your package manager)
brew install rbenv ruby-build
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc && exec zsh
```

Then clone the repo and let rbenv grab the pinned Ruby, along with
[bundler](https://bundler.io/):

```shell
git clone https://github.com/ljvmiranda921/ljvmiranda921.github.io.git
cd ljvmiranda921.github.io/
rbenv install   # reads .ruby-version
gem install bundler
```

Finally, build the dependencies and call `jekyll serve`:

```shell
bundle install
bundle exec jekyll serve --livereload
```

The page, by default, should be running at [localhost:4000](localhost:4000)

## Citations and references

The site uses [`jekyll-scholar`](https://github.com/inukshuk/jekyll-scholar) with
the Association for Computational Linguistics citation style.
References are stored as BibTeX files under `_bibliography`, and rendered from
each post via:

```liquid
{% bibliography --file notebook/<post-slug>.bib %}
```

## Contribute

If you found some errors in spelling/grammar, mistakes in content and the like, then feel
free to fork this repository and [make a Pull Request!](https://help.github.com/articles/creating-a-pull-request/)

[![licensebuttons by](https://licensebuttons.net/l/by/3.0/88x31.png)](https://creativecommons.org/licenses/by/4.0)
