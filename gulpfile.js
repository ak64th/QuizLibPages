var gulp = require('gulp');
var gutil = require('gulp-util');
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

var handleError = function (err) {
  gutil.log(err.toString());
  this.emit('end');
}

gulp.task('vendor', function(){
  return gulp.src([
    './bower_components/jquery/dist/jquery.js',
    './bower_components/ladda/js/ladda.js',
    './bower_components/ladda/js/ladda.jquery.js',
    './bower_components/spin.js/spin.js',
    './bower_components/bootstrap/dist/js/bootstrap.js',
    './bower_components/underscore/underscore.js',
    './bower_components/backbone/backbone.js',
    './bower_components/backgrid/lib/backgrid.js',
    './bower_components/backbone.wreqr/lib/backbone.wreqr.js',
    './bower_components/backbone.syphon/lib/backbone.syphon.js',
    './bower_components/backbone.bootstrap-modal/src/backbone.bootstrap-modal.js',
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
  stream = gulp.src('./app/scripts/index.coffee', { read: false })
    .pipe(maps.init())
    .pipe(browserify({
      paths: ['./node_modules', './app/scripts', './app'],
      debug: environment == 'development',
      transform: ['coffeeify', 'jadeify'],
      extensions: ['.coffee', '.jade']
    })).on('error', handleError)
    .pipe(concat('index.js'))

  if (environment == 'production') {
    stream.pipe(uglify())
  }

  stream.pipe(maps.write('./'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('stylus', function() {
  var stream = gulp.src('./app/styles/index.styl')
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
  return gulp.src('./app/index.jade')
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
  gulp.watch('./app/styles/**/*.styl', ['stylus']);
  gulp.watch('./app/scripts/**/*.coffee', ['browserify']);
  gulp.watch('./app/templates/**/*.jade', ['browserify']);
  gulp.watch('./app/index.jade', ['html']);
});

gulp.task('default', ['build']);
gulp.task('production', ['set-production', 'default']);
