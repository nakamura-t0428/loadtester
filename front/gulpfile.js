var gulp = require('gulp');

var tsConfig = require('./tsconfig.json');

var tsd = require('gulp-tsd');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var copy = require('gulp-copy');
var autoprefixer = require('gulp-autoprefixer');
require('es6-promise').polyfill(); // for autoprefixer
var cssmin = require('gulp-cssmin');
var del = require('del');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');

gulp.task('tsd', function (callback) {
  tsd({
      command: 'reinstall',
      latest: true,
      config: './tsd.json'
  }, callback);
});

// TypeScript Task
gulp.task('landing_ts', ['tsd'], function () {
  // TypeScriptのコンパイル
  var tsResult = gulp.src(['./src/commonts/*.ts','./src/ts/*.ts'])
  .pipe(sourcemaps.init())
  // tscpnfig.jsonに書いたコンパイルオプションの取得
  .pipe(ts(tsConfig.compilerOptions))
  .pipe(concat('js/loadtest.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write('maps', {
    includeContent: true
  }))
  .pipe(gulp.dest('./dist'));

  // JSファイルをdistに移動
  return tsResult;
});

// TypeScript Task
gulp.task('my_ts', ['tsd'], function () {
  // TypeScriptのコンパイル
  var tsResult = gulp.src(['./src/commonts/*.ts', './src/my/ts/*.ts'])
  .pipe(sourcemaps.init())
  // tscpnfig.jsonに書いたコンパイルオプションの取得
  .pipe(ts(tsConfig.compilerOptions))
  .pipe(concat('my/js/loadtest-my.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write('maps', {
    includeContent: true
  }))
  .pipe(gulp.dest('./dist'));

  // JSファイルをdistに移動
  return tsResult;
});

gulp.task('ts', ['landing_ts', 'my_ts']);

gulp.task('html', function(){
  var result = gulp.src(['./src/**/*.html'])
  .pipe(htmlmin({
    removeComments: true,
    removeCommentsFromCDATA: true,
    removeCDATASectionsFromCDATA: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    removeOptionalTags: true
  }))
  .pipe(gulp.dest('./dist'));
  return result;
});

gulp.task('image', function(){
  var result = gulp.src(['./src/**/*.{png,jpg,gif}', '!./src/commonjs/**/demo/**'])
  .pipe(imagemin())
  .pipe(gulp.dest('./dist'));
  return result;
});

gulp.task('commons', function(){
  var result = gulp.src(['./src/commonjs/**/*.{js,css}', './src/fonts/**', '!**/demo/**'], { base: 'src' })
  .pipe(gulp.dest('./dist'));
  return result;
});

gulp.task('css', function(){
  var result = gulp.src(['./src/**/*.css', '!**/commonjs/**'])
  .pipe(autoprefixer({
    browsers: ['last 2 version', 'ie 8', 'ie 9']
  }))
  .pipe(cssmin())
  .pipe(gulp.dest('./dist'));
  return result;
});

gulp.task('clean', function(cb){
  del(['./dist'], cb);
});

gulp.task('connect', function(){
  connect.server({
    root: './dist',
    livereload: true
  });
});

// Watch
gulp.task('watch', function () {
    gulp.watch(['./src/commonts/*.ts', './src/ts/*.ts'], ['landing_ts']);
    gulp.watch(['./src/commonts/*.ts', './src/my/ts/*.ts'], ['my_ts']);
    gulp.watch(['./src/**/*.html'], ['html']);
    gulp.watch(['./src/**/*.{png,jpg,gif}', '!./src/commonjs/**/demo/**'], ['image']);
    gulp.watch(['./src/**/*.css', '!**/commonjs/**'], ['css']);
});

gulp.task('dist', ['ts', 'html', 'image', 'commons', 'css']);
gulp.task('clean-for-release', function(cb){
  del(['./dist/maps'], cb);
});
gulp.task('release', function(cb) {
  runSequence('dist', 'clean-for-release', cb);
});

// Default Task
gulp.task('default', function(cb){
  runSequence('dist', ['connect', 'watch'], cb);
});
