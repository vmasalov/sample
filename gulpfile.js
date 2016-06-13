var gulp = require('gulp'),
    compass = require('gulp-compass'),
    imageMin = require('gulp-imagemin'),
    styleMin = require('gulp-minify-css'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    babelify = require('babelify'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

const OUTPUT_DIR = 'app/public';
const SOURCE_DIR = 'sources';

var paths = {
    scripts: ['./app/views/**/*.js'],
    images: [SOURCE_DIR + '/images/**/*.png', SOURCE_DIR + '/images/**/*.jpg'],
    favicon: SOURCE_DIR + '/images/**/favicon.ico',
    styles: SOURCE_DIR + '/scss/style.scss',
    icons: SOURCE_DIR + '/fonts/icons/*.svg',
    fonts: SOURCE_DIR + '/fonts/icons.*'
};

// Task to compile styles
gulp.task('compass', function () {
    "use strict";

    // clean directory first
    del([OUTPUT_DIR] + '/styles');

    return gulp.src(paths.styles)
        .pipe(compass({
            css: SOURCE_DIR + '/css',
            sass: SOURCE_DIR + '/scss',
            image: OUTPUT_DIR + '/images'
        }))
        .pipe(styleMin())
        .on('error', function (msg) {
            console.log(msg)
        })
        .pipe(gulp.dest(OUTPUT_DIR + '/css'));
});

// Copy all static images
gulp.task('images', function () {
    "use strict";

    // clean directory first
    del([OUTPUT_DIR] + '/images');

    return gulp.src(paths.images)
        .pipe(imageMin({optimizationLevel: 5}))
        .pipe(gulp.dest(OUTPUT_DIR + '/images'));
});

// Copy all static images
gulp.task('favicon', function () {
    "use strict";

    return gulp.src(paths.favicon)
        .pipe(gulp.dest(OUTPUT_DIR));
});

// Create a font from SVG sources into source folder
gulp.task('iconfont', function () {
    "use strict";

    gulp.src(paths.icons)
        .pipe(iconfontCss({
            fontName: 'icons',
            path: SOURCE_DIR + '/fonts/scss/templates/_icons.scss',
            targetPath: './scss/icons.scss',
            fontPath: '/fonts/'
        }))
        .pipe(iconfont({
            fontName: 'icons',
            prependUnicode: true,            // recommended option
            formats: ['ttf', 'eot', 'woff', 'svg'], // default, 'woff2' and 'svg' are available
            timestamp: Math.round(Date.now() / 1000)
        }))
        .pipe(gulp.dest(SOURCE_DIR + '/fonts'));
});

gulp.task('fonts', function () {
    "use strict";

    return gulp.src(paths.fonts)
        .pipe(gulp.dest(OUTPUT_DIR + '/fonts'));
});

gulp.task('js', function () {
    "use strict";

    return browserify('app/views/main.js', {standalone: "main"})
        .transform(babelify, {
            presets: ["es2015", "react"]
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest('app/public/js'));
});

gulp.task('js-ol', function() {
    "use strict";
    return gulp.src('sources/libs/ol.js')
        .pipe(gulp.dest('app/public/js'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    "use strict";

    gulp.watch(paths.scripts, ['js']);
    gulp.watch(paths.images, ['images']);
    gulp.watch([SOURCE_DIR + '/scss/*.scss', SOURCE_DIR + '/fonts/scss/icons.scss'], ['compass']);
});

// run unit tests
gulp.task('test', function () {
    "use strict";
});

// set version based on the git tag
gulp.task('version', function () {
    "use strict";
});

gulp.task('default', ['iconfont', 'fonts', 'compass', 'js', 'js-ol', 'images', 'favicon', 'watch']);
gulp.task('release', ['default', 'test', 'version']);