const gulp = require('gulp'),
    server = require('gulp-express'),
    babel = require("gulp-babel"),
    sourcemaps = require("gulp-sourcemaps"),
    options = {
        cwd: undefined
    };

options.env = process.env;
options.env.NODE_ENV = 'development';
options.env.DEBUG = 'cuname:*';

gulp.task('server', function () {
    server.run(['./bin/www'], options);
});

gulp.task('babel', function () {
    return gulp.src('./js_modules/main.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function() {
    gulp.watch(['app.js', './routes/**/*.js'], gulp.series('server'));
    gulp.watch('./js_modules/**/*.js', gulp.series('babel'));
});

gulp.task('default', gulp.parallel('watch', 'babel', 'server'));

gulp.task('js', gulp.parallel('watch', 'babel'));