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
    def svg(name) 
        root = Middleman::Application.root 
        file_path = "#{root}/tmp/src/assets/svg/#{name}.svg" 
        return File.read(file_path) if File.exists?(file_path) 
        '(not found)' 
    end
end



# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
end
