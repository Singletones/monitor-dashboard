const gulp = require('gulp'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    angularOrder = require('gulp-angular-order'),
    // ngTemplate = require('gulp-ng-template'),
    embedTemplates = require('gulp-angular-embed-templates'),
    // es = require('event-stream'),
    browserSync = require('browser-sync').create();

gulp.task('html', function () {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./bin'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('css', function () {
    // TODO: implement this task !important
    return gulp.src('./src/app.css')
        .pipe(gulp.dest('./bin'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function () {
    return gulp.src('./src/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(embedTemplates())
        .pipe(angularOrder({
            types: ['module', 'routes', 'config', 'component', 'model', 'service', 'controller', 'directive', 'filter']
        }))
        .pipe(concat('bin.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./bin'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('img', function () {
    return gulp.src('./src/images/**')
        .pipe(gulp.dest('./bin/images'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('sounds', function () {
    return gulp.src('./src/sounds/**')
        .pipe(gulp.dest('./bin/sounds'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'bin'
        },
        port: 8000
    });
});

gulp.task('build', function () {
    gulp.start(['html', 'css', 'js', 'img', 'sounds']);
});

gulp.task('start', function() {
    gulp.start(['build', 'browser-sync']);
    gulp.watch(['./src/app.css'], ['css']);
    gulp.watch(['./src/**/*.html', '!./src/index.html', '.src/**/*.js'], ['js']);
    gulp.watch(['./src/index.html'], ['html']);
    gulp.watch(['./src/images/**'], ['img']);
    gulp.watch(['./src/sounds/**'], ['mp3', 'wav']);
});