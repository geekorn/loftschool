'use strict';

module.exports = function() {
    $.gulp.task('copy:data', function() {
        return $.gulp.src('./app/data/**/*.*')
            .pipe($.gulp.dest($.config.root + '/data/'));
    });
};