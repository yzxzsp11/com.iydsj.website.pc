var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var webpack = require("gulp-webpack");
var webpackConfig = require("./webpack.config.js");
var rename = require('gulp-rename');


var paths = {
  scripts: 'src/js/page',
  watchScripts:'src/js/**/*.js',
  stylesheets: 'src/less/entry/*.less',
  watchStyleSheets:'src/less/**/*.less',
  htmlFiles:'./src/html/*.html',
  picFiles:'src/images/**/*.*',
  libFiles:'src/js/lib/**/*.js'
};


gulp.task('less', function () {
  return gulp.src(paths.stylesheets)
    .pipe(less())
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix:'.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'));
});


gulp.task("buildjs", function(callback) {
  return gulp.src('./src/js/page/*.js')
     .pipe(webpack(webpackConfig))
      .pipe(gulp.dest('./dist/js-dev'))
      .pipe(uglify())
      .pipe(rename({suffix:'.min'}))
      .pipe(gulp.dest('./dist/js'))
      .on("error", function(err){
        throw err
      })
});

/**
* watch less文件
*/
gulp.task('watch', function () {
  gulp.watch(paths.watchStyleSheets,['less']);
  gulp.watch(paths.htmlFiles,['buildHtml']);
  gulp.watch(paths.watchScripts, ['buildjs']);
});

gulp.task('movePic',function () {
  return gulp.src(paths.picFiles)
      .pipe(gulp.dest('dist/images'));
});
gulp.task('moveLib',function () {
  return gulp.src(paths.libFiles)
      .pipe(gulp.dest('dist/js/lib'));
});


gulp.task('buildHtml', function () {
  return gulp.src(paths.htmlFiles)
      .pipe(gulp.dest('dist/'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [ 'watch', 'less','buildHtml','movePic','moveLib','buildjs']);