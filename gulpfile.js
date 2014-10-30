var gulp    = require('gulp');

var concat  = require('gulp-concat');
var del     = require('del'); // funny story: gulp-clean was deprecated in favor of gulp-rimraf which was deprecated in favor of gulp-del
var less    = require('gulp-less');
var nodemon = require('gulp-nodemon');
var print   = require('gulp-print');

var lessFiles = 'client/main.less';
var clientSrcJSFiles = 'client/app/**/*.js';
var clientVendorJSFiles = [
  'client/bower_components/angular/angular.min.js',
  'client/bower_components/angular-animate/angular-animate.min.js',
  'client/bower_components/angular-aria/angular-aria.min.js',
  'client/bower_components/angular-material/angular-material.min.js',
  'client/bower_components/angular-ui-router/release/angular-ui-router.min.js',
  'client/bower_components/hammerjs/hammer.min.js'
];
var serverJSFiles = [
  'server/**/*.js',
  '!server/spec/*'
];
var htmlFiles = 'client/**/*.html';

gulp.task('clean:dist', function (cb) {
  del([
    'dist/**',
    '!dist/bower_components' // don't delete bower goodies
  ], cb);
});

// compile less to public/css
gulp.task('compile:less', function() {
  gulp.src(lessFiles)
    .pipe(less({compress: true}), less())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('compile:clientSrcJS', function() {
  gulp.src(clientSrcJSFiles)
    .pipe(print()) // TODO: these prints are showing up in wrong order (async?)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('compile:clientVendorJS', function() {
  gulp.src(clientVendorJSFiles)
    .pipe(print()) // TODO: these prints are showing up in wrong order (async?)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('compile:html', function() {
  gulp.src(htmlFiles)
    .pipe(print())
    .pipe(gulp.dest('dist'));
});

gulp.task('compile', ['compile:less', 'compile:clientSrcJS', 'compile:clientVendorJS', 'compile:html']);

gulp.task('server', function() {
  nodemon({ script: 'server/server.js' }).on('restart', function(){
    console.log('Server restarted.');
  });
});

gulp.task('watch', function() {
  console.log('Watching...');

  gulp.watch('client/**/*.less', ['compile:less']).on('change', watchHandler);
  gulp.watch(clientSrcJSFiles, ['compile:clientSrcJS']).on('change', watchHandler);
  gulp.watch(clientVendorJSFiles, ['compile:clientVendorJS']).on('change', watchHandler);
  gulp.watch(htmlFiles, ['compile:html']).on('change', watchHandler);
});

function watchHandler(event) {
  console.log('File', event.path, 'was', event.type);
}

gulp.task('default', ['compile', 'server', 'watch']);
