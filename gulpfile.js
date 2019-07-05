'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var injectPartials = require('gulp-inject-partials');
var inject = require('gulp-inject');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');

gulp.paths = {
  dist: 'dist',
};

var paths = gulp.paths;




gulp.task('sass', function() {
  return gulp.src('./scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});


// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

  browserSync.init({
    port: 3000,
    server: "./",
    ghostMode: false,
    notify: false
  });

  gulp.watch('scss/**/*.scss', gulp.series('sass'));
  gulp.watch('**/*.html').on('change', browserSync.reload);
  gulp.watch('js/**/*.js').on('change', browserSync.reload);

}));



// Static Server without watching scss files
gulp.task('serve:lite', function() {

  browserSync.init({
    server: "./",
    ghostMode: false,
    notify: false
  });

  gulp.watch('**/*.css').on('change', browserSync.reload);
  gulp.watch('**/*.html').on('change', browserSync.reload);
  gulp.watch('js/**/*.js').on('change', browserSync.reload);

});



gulp.task('sass:watch', function() {
  gulp.watch('./scss/**/*.scss');
});



/* inject partials like sidebar and navbar */
gulp.task('injectPartial', function() {
  return gulp.src("./**/*.html", {
      base: "./"
    })
    .pipe(injectPartials())
    .pipe(gulp.dest("."));
});



/* inject Js and CCS assets into HTML */
gulp.task('injectAssets', function() {
  return gulp.src('./**/*.html')
    .pipe(inject(gulp.src(['./node_modules/mdi/css/materialdesignicons.min.css', './node_modules/simple-line-icons/css/simple-line-icons.css', './node_modules/flag-icon-css/css/flag-icon.min.css', './node_modules/jquery/dist/jquery.min.js', './node_modules/popper.js/dist/umd/popper.min.js', './node_modules/bootstrap/dist/js/bootstrap.min.js'], {
      read: false
    }), {
      name: 'plugins',
      relative: true
    }))
    .pipe(inject(gulp.src(['./css/*.css', './js/off-canvas.js', './js/misc.js'], {
      read: false
    }), {
      relative: true
    }))
    .pipe(gulp.dest('.'));
});



/*replace image path and linking after injection*/
gulp.task('replacePath', function() {
  var replacePath1 = gulp.src('pages/*/*.html', {
      base: "./"
    })
    .pipe(replace('src="images/', 'src="../../images/'))
    .pipe(replace('href="pages/', 'href="../../pages/'))
    .pipe(replace('href="index.html"', 'href="../../index.html"'))
    .pipe(gulp.dest('.'));
  var replacePath2 = gulp.src('pages/*.html', {
      base: "./"
    })
    .pipe(replace('src="images/', 'src="../images/'))
    .pipe(replace('"pages/', '"../pages/'))
    .pipe(replace('href="index.html"', 'href="../index.html"'))
    .pipe(gulp.dest('.'));
  return merge(replacePath1, replacePath2);
});

/*sequence for injecting partials and replacing paths*/
gulp.task('inject', gulp.series('injectPartial', 'injectAssets', 'replacePath'));

gulp.task('default', gulp.series('serve'));