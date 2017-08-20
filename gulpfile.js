var gulp = require('gulp');
var gutil = require("gulp-util");
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');
var webpack = require("webpack");
var webpackSetting = require("./webpack.config");

gulp.task('Watch', function() {
    gulp.watch(['./src/**'],['Build']);
});

gulp.task('Build', function(callback) {
    webpack(webpackSetting, 
        function(err, stats) {
            if(err) throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({
                // output options
            }));
            callback();
        }
    );
});

gulp.task('Webserver', function() {
    gulp.src('test')
        .pipe(webserver({
            host: '0.0.0.0',
            port: 8000
        }));
  });

gulp.task('default', ['Build', 'Webserver', 'Watch']);