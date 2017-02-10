'use strict';

module.exports = function() {
  $.gulp.task('assets', function() {
    return $.gulp.src(['./app/assets/**/*.*', '!./app/assets/img/sprite/*.*'], { since: $.gulp.lastRun('assets') })
      .pipe($.gulp.dest($.config.root + '/assets/'));
  });
};
