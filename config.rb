###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout
page "/index.html", :layout => :single_column
page "/404.html", :layout => :single_column
page "/about.html", :layout => :single_column
page "/blog.html", :layout => :single_column
page "/blog/*", :layout => :article
page "/contact.html", :layout => :single_column
page "/portfolio.html", :layout => :full_page
page "/resources.html", :layout => :single_column
page "/images.html", :layout => :full_page
page "/resume.html", :layout => :single_column
page "/experiments.html", :layout => :single_column
page "/patterns.html", :layout => :single_column
page "/foss.html", :layout => :single_column



# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

# External Pipeline
activate :external_pipeline,
  name: :gulp,
  command: build? ? './node_modules/gulp/bin/gulp.js build' : './node_modules/gulp/bin/gulp.js default',
  source: "src/dist",
  latency: 1

# Asset Paths
config[:css_dir] = 'assets/css'
config[:js_dir] = 'assets/js'
config[:images_dir] = 'assets/img'

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
#   def some_helper
#     "Helping"
#   end
    # http://cobwwweb.com/render-inline-svg-rails-middleman
    def svg(name)
        root = Middleman::Application.root
        file_path = "#{root}/src/assets/svg/#{name}.svg"
        return File.read(file_path) if File.exists?(file_path)
        '(not found)'
    end
end

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  # blog.prefix = "blog"

  blog.permalink = "blog/{slug}.html"
  # Matcher for blog source files
  blog.sources = "blog/{title}.html"
  blog.taglink = "categories/{tag}.html"
  # blog.layout = "layout"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"
  blog.default_extension = ".md"

  blog.tag_template = "categories.html"
  blog.calendar_template = "calendar.html"

  # Enable pagination
  blog.paginate = false
  blog.per_page = 12
  blog.page_link = "page/{num}"
end

# PRETTY URL FOR DEV
activate :directory_indexes

# Minify HTML
activate :minify_html


# Enable markdown syntax highlighting
activate :syntax
set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true, :smartypants => true


# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
end
