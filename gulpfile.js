var gulp = require('gulp');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var prefix = require('gulp-autoprefixer');
var bootstrap = require('bootstrap-styl');
var minify = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var maps = require('gulp-sourcemaps');
var filter = require('gulp-filter');
var browserify = require('gulp-browserify');

var environment = 'development';

gulp.task('set-production', function() {
  environment = 'production';
});

gulp.task('vendor', function(){
  return gulp.src([
    './bower_components/jquery/dist/jquery.js',
    './bower_components/bootstrap/dist/js/bootstrap.js',
    './bower_components/underscore/underscore.js',
    './bower_components/backbone/backbone.js',
    './bower_components/backbone.stickit/backbone.stickit.js',
    './bower_components/backbone.bootstrap-modal/src/backbone.bootstrap-modal.js',
    './bower_components/backbone.marionette/lib/backbone.marionette.js',
    './bower_components/backgrid/lib/backgrid.js',
    './bower_components/backbone.bootstrap/lib/backbone.bootstrap.js'
  ])
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('./public/js'));
});

gulp.task('fonts', function(){
  return gulp.src('./bower_components/bootstrap/dist/fonts/**/*')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('browserify', function() {
  stream = gulp.src('./scripts/index.coffee', { read: false })
    .pipe(maps.init())
    .pipe(browserify({
      debug: environment == 'development',
      transform: ['coffeeify', 'jadeify'],
      extensions: ['.coffee', '.jade']
    }))
    .pipe(concat('index.js'))

  if (environment == 'production') {
    stream.pipe(uglify())
  }

  stream.pipe(maps.write('./'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('stylus', function() {
  var stream = gulp.src('./styles/index.styl')
    .pipe(maps.init())
    .pipe(stylus({
      use: [bootstrap()]
    }))
    .pipe(prefix({browsers: '> 1% in CN, iOS 7'}))

  if (environment == 'production')
    stream.pipe(minify());

  stream.pipe(maps.write('./'))
    .pipe(gulp.dest('./public/css'));
  return stream;
});

gulp.task('html', function() {
  return gulp.src('./index.jade')
    .pipe(jade({
      pretty: environment == 'development'
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('webserver', function() {
  connect.server({
    root: 'public'
  });
});

gulp.task('build', ['browserify', 'stylus', 'html', 'fonts', 'vendor']);

gulp.task('watch', ['webserver', 'build'], function() {
  gulp.watch('./styles/**/*.styl', ['stylus']);
  gulp.watch('./scripts/**/*.coffee', ['browserify']);
  gulp.watch('./templates/**/*.jade', ['browserify']);
  gulp.watch('./index.jade', ['html']);
});

gulp.task('default', ['build']);
gulp.task('production', ['set-production', 'default']);