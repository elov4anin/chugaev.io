var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var cssnano = require("gulp-cssnano");
var rename = require('gulp-rename');
var watch = require('gulp-watch');

gulp.task("sass", function () {
  gulp.src("sass/style.scss")
      .pipe(sass())
      .pipe(gulp.dest("css"));
});


gulp.task("autoprefix", function () {
  return gulp.src("css/style.css")
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('css/'));
});

gulp.task("cssmin", function() {
  return gulp.src("css/style.css")
      .pipe(cssnano())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('css'));
});

gulp.task("watch_sass", function() {
       gulp.watch("sass/**/*.scss", ["sass"]);
});
