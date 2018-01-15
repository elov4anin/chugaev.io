var gulp = require("gulp"); /*подключаем gulp*/
var rename = require('gulp-rename'); /* плагин для переименования файлов */
var stylus = require("gulp-stylus"); /* Препроцессор stylus */
var cssnano = require("gulp-cssnano"); /* Минификация стилей */
var plumber = require("gulp-plumber"); /* Купирвоание ошибок */
var postcss = require("gulp-postcss"); /*Для работы плагинов postcss*/
var autoprefixer = require("autoprefixer"); /* Расстановка вендорных префиксов*/
var mqpacker = require("css-mqpacker"); /* сортировка медиа-выражений */
var svgstore = require("gulp-svgstore"); /* плагин сборки svg в один файло*/
var svgmin = require("gulp-svgmin"); /* минифкация svg */
var imagemin = require("gulp-imagemin"); /* минификация изображений */
var uglify =  require("gulp-uglify"); /* минификация скриптов */
var fileinclude = require("gulp-file-include"); /* плагин для вставки код из другого файла*/
var watch = require("gulp-watch"); /* плагин слежения за изменениями файлов*/
var server = require("browser-sync"); /* локальный сервер*/
var run = require("run-sequence"); /* запуск задач по очереди*/
var del = require("del"); /*плагин для удаления папки или файла*/
var debug = require('gulp-debug'); /* плагин для дебага*/
var argv = require('yargs').argv; /* Для передачи аргументов*/
var gulpif = require('gulp-if'); /* Для запуска плагинов в зависимости от ключа production*/
var js_obfuscator = require('gulp-js-obfuscator'); /* обфуская js скриптов*/
var gulpHtmlVersion = require('gulp-html-version'); /* добавление в вызов стилей версии сборки из package.json*/
var spritesmith = require('gulp.spritesmith'); /* плагинн для сборки PNG спрайта*/

connect = require('gulp-connect-php'); /*php*/

var buildFolder = './build';/*Папка сборки*/

/* Задача сброки  стилей из препроцессорных файлов, расстановки вендроных прификсов для последних 2 версии браузеров, минификации стилей с выводом результата в папку build/css */

gulp.task("style", function () {
    gulp.src("stylesheets/style.styl")
	    .pipe(plumber())
	    .pipe(stylus())
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

	    .pipe(gulpif(argv.production, cssnano())) /*минификация запускается для production*/
	    .pipe(rename({suffix: ".min"}))
	    .pipe(gulp.dest(buildFolder + "/css"))
	    .pipe(server.reload({stream: true}));
});

/* Задача оптимизации изображений с выводом результата в папку build/img */

gulp.task("images", function () {
    return gulp.src(buildFolder + "/images/**/*.{png,jpg,gif}")

	    .pipe(imagemin([
		imagemin.optipng({optimizationLevel: 3}),
		imagemin.jpegtran({progressive: true})
	    ]))
	    .pipe(gulp.dest(buildFolder + "/images"));
});

/* Задача сборки из отдельных блоков верстки страниц в папку build */

gulp.task("html", function () {
    gulp.src(["./template/*.html"])
	    .pipe(plumber())
	    .pipe(fileinclude({
			prefix: "@@",
			basepath: "./template"
		    }
	    ))
	    .pipe(gulpif(argv.production, gulpHtmlVersion(
		    {
			suffix: ['css'] /*версия сборки запускается для production*/
		    }
	    )))
	    .pipe(gulp.dest("./" + buildFolder))
	    .pipe(server.reload({stream: true}));
});

/* Задача оптимизации svg графики с выводом в папку build/img */

gulp.task("symbols", function () {
    return gulp.src(buildFolder +  "/img/icons-svg/*.svg")
	    .pipe(svgmin())
	    .pipe(svgstore({
			inlineSvg:true
		    }
	    ))
	    .pipe(rename("symbols.svg"))
	    .pipe(gulp.dest(buildFolder + "/img"));
});
/*PHP files*/
gulp.task('connect-sync', function() {
    connect.server({}, function (){
	browserSync({
	    proxy: '127.0.0.1:8333'
	});
    });

    gulp.watch('**/*.php').on('change', function () {
	browserSync.reload();
    });
});

/* PNG спрайты*/
gulp.task('sprite', function() {
    var spriteData =
	    gulp.src('img/png-sprite/*.png') // путь, откуда берем картинки для спрайта
		    .pipe(spritesmith({
			imgName: '../img/png-sprite.png',
			cssName: 'sprite.styl',
			cssFormat: 'stylus',
			algorithm: 'binary-tree',
			padding: 2,
			cssVarMap: function(sprite) {
			    sprite.name = 's-' + sprite.name
			}
		    }));

    spriteData.img.pipe(gulp.dest(buildFolder + "/img")); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('stylesheets')); // путь, куда сохраняем стили
});

/* Задача минификации скриптов js с выводом результата в папку build/js */

gulp.task("jsmin", function () {
    gulp.src("js/*.js")
	    .pipe(plumber())
	    .pipe(gulpif(argv.production, uglify())) /*минификация запускается для production*/
	    .pipe(gulpif(argv.production, js_obfuscator({}))) /*обсуфикация запускается для production*/
	  /*  .pipe(rename({suffix: ".min"}))*/
	    .pipe(gulp.dest(buildFolder + "/js"))
	    .pipe(server.reload({stream: true}));
});

/* Задача копирования ресурсов для сборки проекта в папку build: шрифты, изображения, скрипты */

gulp.task("copy", function () {
    return gulp.src([
	"fonts/**/*.{woff,woff2,ttf,eot,otf}",
	"images/**",
	"php/**",
	"phpmailer/**"
    ], {
	base: "."
    })
	    .pipe(debug({title: 'unicorn:'}))
	    .pipe(gulp.dest(buildFolder));
});

/* Удаление старой версии проекта перед сборкой проекта */

gulp.task("clean", function () {
    return del(buildFolder);
});

/* Задача запуска локального сервера с корнем в папке build и его перезапуска в случае изменения файлов стилизации, верстки, скриптов */

gulp.task("serve", function () {
    server.init({
	server: buildFolder,
	port: 3000,

    });
    gulp.watch("stylesheets/**/*.styl", ["style"]);
    gulp.watch("template/**/*.html", ["html"]);
    gulp.watch("js/*.js", ["jsmin"]);
    gulp.watch("php/*.php", ["connect-sync"]);
});

/* Задача сборки проекта в папку build. На выходе получаем оптимизированные и не оптимизированные файлы проекта: стили CSS, скрипты, изображения, верстка */

gulp.task("build", function (fn) {
    run(
	    "clean",
	    "copy",
	    "html",
	    "style",
	    "jsmin",
	    "images",
	  /*  "sprite",*/
	    "serve",
	    /*  "symbols",  */ /*сборка svg спрайтов не используется в проекте*/
	    fn
    );
});
/* Задача по умолчанию при вызове команды gulp*/
gulp.task('default', function() {
    gulp.run('build');
});