/*
 * Plugins
 */
var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var size = require('gulp-size');
var notify = require("gulp-notify")

var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var nanocss = require('gulp-cssnano');
var mmq = require('gulp-merge-media-queries');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var gutil = require('gulp-util');

var imagemin = require('gulp-imagemin');

/*------------------------------------*\
  PATHS
\*------------------------------------*/
var paths = {
    publicAssets: 'src/public/',
    srcAssets: 'src/assets/',
    sourceAssets: 'source/assets/'
}

/*------------------------------------*\
  HANDLE ERRORS
\*------------------------------------*/
function handleError(error) {
    var message = error;
    if (typeof error === 'function' ) { return; }
    if (typeof error === 'object' && error.hasOwnProperty('message')) { message = error.message; }
    if (message !== undefined) { console.log('Error: ' + message); }
}

gulp.task('clean', function() {
    return del(['build']);
});


/*------------------------------------*\
  CSS
\*------------------------------------*/
gulp.task('css', function() {
    gulp.src(paths.srcAssets + 'scss/main.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))

        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.sourceAssets + 'css/'))
        .pipe(notify({message: 'CSS compiled', onLast: true}))
});


/*------------------------------------*\
  JS
\*------------------------------------*/
function compile(watch) {
  var bundler = watchify(browserify('./src/assets/js/main.js', {
    debug: true,
    extensions: ['js']
  }).transform(babelify.configure({
      presets: ["es2015"]
    }))
  );

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) {
        console.error(err);
        this.emit('end'); }
      )
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./source/assets/js'))
      .pipe(notify({message: 'JS compiled', onLast: true}))
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}


function watchJS() {
    return compile(true);
};


gulp.task('js', function() {
    return compile();
});



/*------------------------------------*\
  PUBLIC
\*------------------------------------*/
gulp.task('public', function() {
    gulp.src([paths.publicAssets+'*', paths.publicAssets+'.*'])
        .pipe(gulp.dest('source/'))
        .pipe(notify({message: 'Public files compiled', onLast: true}))
});


/*------------------------------------*\
  MISCELLANEOUS
\*------------------------------------*/
gulp.task('misc', function() {
    gulp.src(paths.srcAssets + 'misc/**/*')
        .pipe(gulp.dest('source/assets/misc'))
        .pipe(notify({message: 'Miscellaenous files compiled', onLast: true}))
});


/*------------------------------------*\
  IMAGES
\*------------------------------------*/
gulp.task('img', function() {
    gulp.src(paths.srcAssets + 'images/**/*.{jpg, png, gif}')
        .pipe(gulp.dest(paths.sourceAssets + 'images'))
        .pipe(notify({message: 'Images compiled!', onLast: true}))
});


/*------------------------------------*\
  WATCH
\*------------------------------------*/
gulp.task('watch', function(error) {
    gulp.watch(paths.srcAssets + 'scss/**/*', ['css']);
    gulp.watch(paths.srcAssets + 'js/**/*', ['js']);
    gulp.watch(paths.srcAssets + 'images/**/*', ['img']);
    gulp.watch(paths.srcAssets + 'misc/**/*', ['misc']);
    gulp.watch([paths.publicAssets + '*', paths.publicAssets + '.*'], ['public'])

    watchJS();
});


/*------------------------------------*\
  BUILD
\*------------------------------------*/
gulp.task('build', function() {
    console.log('Ready to go!');
});


/*------------------------------------*\
  DEFAULT TASK
\*------------------------------------*/
gulp.task('default', ['watch', 'css', 'js', 'img', 'public', 'misc']);

