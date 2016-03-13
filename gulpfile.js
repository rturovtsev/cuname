'use strict';

const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    server = require('gulp-express'),
    webpackStream = require('webpack-stream'),
    webpack = webpackStream.webpack,
    named = require('vinyl-named'),
    isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development',
    serveOptions = {
        cwd: undefined
    };

serveOptions.env = process.env;
serveOptions.env.NODE_ENV = 'development';
serveOptions.env.DEBUG = 'cuname:*';

gulp.task('server', function () {
    server.run(['./bin/www'], serveOptions);
});

gulp.task('webpack', function(){
    let webpackOptions = {
        watch: isDevelopment,
        watchOptions: {
            aggregateTimeout: 100
        },
        devtool: isDevelopment ? "source-map" : null,
        module: {
            loaders: [{
                test: /\.js$/,
                loader: 'babel?presets[]=es2015'
            }]
        },
        plugins: [
            new webpack.NoErrorsPlugin()
        ]
    };

    return gulp.src('./js_modules/main.js')
        .pipe(named())
        .pipe(webpackStream(webpackOptions))
        //.pipe(uglify())
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function() {
    gulp.watch(['app.js', './routes/**/*.js'], gulp.series('server'));
});

gulp.task('default', gulp.parallel('watch', 'webpack', 'server'));