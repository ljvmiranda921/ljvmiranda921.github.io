# {% citet key %} — textual citation "Author et al. (Year)" (\citet),
# vs jekyll-scholar's parenthetical {% cite %} "(Author et al., Year)" (\citep).
require "jekyll/scholar"

module Jekyll
  class Scholar
    class CitetTag < CiteTag
      def render(context)
        set_context_to context
        cite(keys).gsub(/\(([^()]+?),\s*(\d{4}[a-z]?)\)/) do
          "#{Regexp.last_match(1)} (#{Regexp.last_match(2)})"
        end
      end
    end
  end
end

Liquid::Template.register_tag("citet", Jekyll::Scholar::CitetTag)
