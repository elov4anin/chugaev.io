var gulp = require("gulp");
var rename = require('gulp-rename');
var sass = require("gulp-sass");
var cssnano = require("gulp-cssnano");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var imagemin = require("gulp-imagemin");
var uglify =  require("gulp-uglify");
var fileinclude = require("gulp-file-include");
var watch = require("gulp-watch");
var server = require("browser-sync");
var run = require("run-sequence");
var del = require("del");

gulp.task("style", function () {
  gulp.src("sass/style.scss")
      .pipe(plumber())
      .pipe(sass())
      .pipe(postcss([
        autoprefixer({browsers: [
          'last 2 versions',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 2 Opera versions',
          'last 2 Edge versions',
          'last 2 UCAndroid versions'
        ]}),
          mqpacker({
            sort: false
          })
      ]))
      .pipe(gulp.dest("build/css"))
      .pipe(cssnano())
      .pipe(rename({suffix: ".min"}))
      .pipe(gulp.dest("build/css"))
      .pipe(server.reload({stream: true}));
});

gulp.task("images", function () {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true})
      ]))
      .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  gulp.src(["./template/*.html"])
      .pipe(plumber())
      .pipe(fileinclude({
        prefix: "@@",
        basepath: "./template"
      }
      ))
      .pipe(gulp.dest("./build"))
      .pipe(server.reload({stream: true}));
});

gulp.task("symbols", function () {
  return gulp.src("build/img/icons-svg/*.svg")
      .pipe(svgmin())
      .pipe(svgstore({
        inlineSvg:true
      }
      ))
      .pipe(rename("symbols.svg"))
      .pipe(gulp.dest("build/img"));
});

gulp.task("jsmin", function () {
  gulp.src("js/*.js")
      .pipe(plumber())
      .pipe(uglify())
      .pipe(rename({suffix: ".min"}))
      .pipe(gulp.dest("build/js"))
      .pipe(server.reload({stream: true}));
});

gulp.task("serve", function () {
  server.init({
    server: "build"
  });
  gulp.watch("sass/**/*.scss", ["style"]);
  gulp.watch("template/**/*.html", ["html"]);
  gulp.watch("js/*.js", ["jsmin"]);
});

gulp.task("build", function (fn) {
  run(
      "clean",
      "copy",
      "html",
      "style",
      "jsmin",
      "images",
      "symbols",
      fn
  );
});

gulp.task("copy", function () {
  return gulp.src([
      "fonts/**/*.{woff,woff2,ttf,eot}",
      "img/**",
      "js/**"    
  ], {
    base: "."
  })
      .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});