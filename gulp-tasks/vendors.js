'use strict'
var gulp = require('gulp');
var concat = require('gulp-concat');
var merge = require('merge-stream');
const del = require('del');


gulp.task('clean:vendors', function () {
    return del([
      './vendors/**/*'
    ]);
});

/*Building vendor scripts needed for basic template rendering*/
gulp.task('buildBaseVendorScripts', function() {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js', 
        './node_modules/popper.js/dist/umd/popper.min.js', 
        './node_modules/bootstrap/dist/js/bootstrap.min.js', 
        './node_modules/perfect-scrollbar/dist/perfect-scrollbar.min.js'
    ])
      .pipe(concat('vendor.bundle.base.js'))
      .pipe(gulp.dest('./vendors/js'));
});

/*Building vendor styles needed for basic template rendering*/
gulp.task('buildBaseVendorStyles', function() {
    return gulp.src(['./node_modules/perfect-scrollbar/css/perfect-scrollbar.css'])
      .pipe(concat('vendor.bundle.base.css'))
      .pipe(gulp.dest('./vendors/css')); 
});

/*Scripts for addons*/
gulp.task('buildOptionalVendorScripts', function() {
    var aScript1 = gulp.src(['node_modules/chart.js/dist/Chart.min.js'])
        .pipe(gulp.dest('./vendors/chart.js'));
    var aScript2 = gulp.src(['node_modules/progressbar.js/dist/progressbar.min.js'])
        .pipe(gulp.dest('./vendors/progressbar.js'));
    var aScript3 = gulp.src(['node_modules/moment/moment.js'])
        .pipe(gulp.dest('./vendors/moment'));
    var aScript4 = gulp.src(['node_modules/chartist/dist/chartist.min.js'])
        .pipe(gulp.dest('./vendors/chartist'));
    var aScript5 = gulp.src(['node_modules/moment/min/moment.min.js'])
        .pipe(gulp.dest('./vendors/moment'));
    var aScript6 = gulp.src(['node_modules/select2/dist/js/select2.min.js'])
        .pipe(gulp.dest('./vendors/select2'));
    var aScript7 = gulp.src(['node_modules/twbs-pagination/jquery.twbsPagination.min.js'])
        .pipe(gulp.dest('./vendors/twbs-pagination'));
    var aScript8 = gulp.src(['node_modules/daterangepicker/daterangepicker.js'])
        .pipe(gulp.dest('./vendors/daterangepicker'));
    var aScript9 = gulp.src(['node_modules/typeahead.js/dist/typeahead.bundle.min.js'])
        .pipe(gulp.dest('./vendors/typeahead.js'));
    return merge(aScript1, aScript2, aScript3, aScript4, aScript5, aScript6, aScript7, aScript8), aScript9;
});


/*Styles for addons*/
gulp.task('buildOptionalVendorStyles', function() {

    var aStyle1 = gulp.src(['./node_modules/flag-icon-css/css/flag-icon.min.css'])
        .pipe(gulp.dest('./vendors/flag-icon-css/css'));
    var aStyle2 = gulp.src(['./node_modules/flag-icon-css/flags/**/*'])
        .pipe(gulp.dest('./vendors/flag-icon-css/flags'));
    var aStyle3 = gulp.src(['./node_modules/simple-line-icons/css/simple-line-icons.css'])
        .pipe(gulp.dest('./vendors/simple-line-icons/css'));
    var aStyle4 = gulp.src(['./node_modules/simple-line-icons/fonts/*'])
        .pipe(gulp.dest('./vendors/simple-line-icons/fonts'));
    var aStyle5= gulp.src(['node_modules/chartist/dist/chartist.min.css'])
        .pipe(gulp.dest('./vendors/chartist'));
    var aStyle6 = gulp.src(['node_modules/select2/dist/css/select2.min.css'])
        .pipe(gulp.dest('./vendors/select2')); 
    var aStyle7 = gulp.src(['node_modules/select2-bootstrap-theme/dist/select2-bootstrap.min.css'])
        .pipe(gulp.dest('./vendors/select2-bootstrap-theme'));
    var aStyle8 = gulp.src(['./node_modules/daterangepicker/daterangepicker.css'])
        .pipe(gulp.dest('./vendors/daterangepicker'));
    return merge(aStyle1, aStyle2, aStyle3, aStyle4, aStyle5, aStyle6, aStyle7, aStyle8);
});

//Copy essential map files
gulp.task('copyMapFiles', function() {
    var map1 = gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js.map')
        .pipe(gulp.dest('./vendors/js'));
    var map2 = gulp.src('node_modules/chartist/dist/chartist.min.js.map')
        .pipe(gulp.dest('./vendors/chartist'));
    return merge(map1, map2);
});

/*sequence for building vendor scripts and styles*/
gulp.task('bundleVendors', gulp.series('clean:vendors', 'buildBaseVendorStyles','buildBaseVendorScripts', 'buildOptionalVendorStyles', 'buildOptionalVendorScripts', 'copyMapFiles'));