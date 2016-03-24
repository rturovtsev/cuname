'use strict';

const path = require('path'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    server = require('gulp-express'),
    webpackStream = require('webpack-stream'),
    webpack = webpackStream.webpack,
    named = require('vinyl-named'),
    isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development',
    NODE_ENV = process.env.NODE_ENV || 'development',
    serveOptions = {
        cwd: undefined
    };

serveOptions.env = process.env;
serveOptions.env.NODE_ENV = NODE_ENV ;
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
                loader: 'babel?presets[]=es2015,plugins[]=transform-es2015-modules-commonjs',
                plugins: ['transform-runtime']
            }]
        },
        plugins: [
            new webpack.NoErrorsPlugin(),
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(NODE_ENV),
                LANG: JSON.stringify('ru')
            })
        ]
    };

    return gulp.src('./js_modules/main.js')
        .pipe(named())
        .pipe(webpackStream(webpackOptions))
        .pipe(gulpif(!isDevelopment, uglify()))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function() {
    gulp.watch(['app.js', './routes/**/*.js'], gulp.series('server'));
});

gulp.task('default', gulp.parallel('watch', 'webpack', 'server'));