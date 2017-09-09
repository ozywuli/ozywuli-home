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
page "/blog/*", :layout => :single_column
page "/contact.html", :layout => :single_column
page "/portfolio.html", :layout => :single_column
page "/resources.html", :layout => :single_column
page "/images.html", :layout => :full_page




# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

# External Pipeline
activate :external_pipeline,
  name: :gulp,
  command: build? ? './node_modules/gulp/bin/gulp.js build' : './node_modules/gulp/bin/gulp.js default',
  source: "tmp/dist",
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
        file_path = "#{root}/tmp/src/assets/svg/#{name}.svg" 
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
  blog.paginate = true
  blog.per_page = 12
  blog.page_link = "page/{num}"
end

# PRETTY URL FOR DEV
activate :directory_indexes

activate :minify_html

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
end
