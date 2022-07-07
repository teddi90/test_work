
const gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    browserSync = require('browser-sync').create(),
    webpack = require('webpack-stream'),
    del = require('del'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass')(require('sass')),
    gulpif = require('gulp-if'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin');
// imagemin = require('gulp-imagemin');

const path = require('./gulp/pathconfig.js');
const webpackConfig = require('./gulp/webpackConfig.js');
const isDev = process.argv.includes('--dev');


function html(cb) {
    gulp.src(path.src.html)
        .pipe(fileinclude())
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.stream());
    cb();
}
function style() {
    return gulp.src(path.src.css, { sourcemaps: isDev })
        .pipe(sass())
        .pipe(gulp.dest(path.build.css))
        .pipe(gulpif(!isDev, autoprefixer({
            cascade: false
        })))
        .pipe(gulpif(!isDev, cleanCSS()))
        .pipe(gulpif(!isDev, rename({
            suffix: ".min"
        })))
        .pipe(gulpif(!isDev, gulp.dest(path.build.css)))
        .pipe(browserSync.stream());
}
function images(cb) {
    gulp.src(path.src.images)
        // .pipe(imagemin())
        .pipe(gulp.dest(path.build.images))
        .pipe(browserSync.stream());
    cb();
}
function spriteSvg(cb) {
    gulp.src("src/images/*.svg")
        .pipe(svgmin())
        .pipe(rename({
            prefix: 'icon-'
        }))
        .pipe(svgstore())
        .pipe(rename({
            prefix: "sprite-"
        }))
        .pipe(gulp.dest(path.build.images))
    cb();
}

function fonts(cb) {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(browserSync.stream());
    cb();
}
function server(cb) {
    browserSync.init({
        host: 'localhost',
        port: 3000,
        tunnel: false,
        server: path.build.html
    });
    cb();
}

function clean(cb) {
    del(path.clean)
    cb();
}
function js() {
    return gulp.src(path.src.js)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream());
}

function watch() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], style);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.images], images);
}

exports.html = html;
exports.style = style;
exports.images = images;
exports.fonts = fonts;
exports.spriteSvg = spriteSvg;
exports.js = js;
exports.clean = clean;

if (isDev) {
    exports.default = gulp.series(
        html,
        style,
        images,
        fonts,
        js,
        gulp.parallel(watch, server));
} else {
    exports.default = gulp.series(clean, js, html, style, images, fonts);
}

