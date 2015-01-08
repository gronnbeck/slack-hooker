var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');

var paths = {
  less: './app/less/**/*.less',
  script: './app/src/**/*.js'
}

gulp.task('less', function () {
  gulp.src(paths.less)
  .pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
  }))
  .pipe(gulp.dest('./public/css'));
});

gulp.task('scripts', function () {
  gulp.src(paths.script)
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function() {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.script, ['scripts']);
});

gulp.task('mithril', function() {
  gulp.src('./node_modules/mithril/mithril.js')
  .pipe(gulp.dest('./public/js'))
})

gulp.task('default', ['less', 'scripts', 'mithril']);
