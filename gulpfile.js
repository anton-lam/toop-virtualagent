'use strict';
const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const devTsProject = ts.createProject('tsconfig.json');
const prodTsProject = ts.createProject('tsconfig.json', { sourceMap: false });

const paths = {
    ts: ['src/**/*.ts'],
    js: ['builds/**/*.js']
  };
  

// Output destination folder
const dest = 'dist';

// Function the deletes all files in the destingation folder
gulp.task('clean', function() {
    return del([`${dest}`]);
  });
  

// Compiles the typescript based on the project tsconfig
gulp.task('dev-ts', function() {
    return devTsProject
      .src()
      .pipe(devTsProject())
      .js.pipe(gulp.dest(`${dest}/`));
  });
  
  // Compiles the typescript based on the project tsconfig
  gulp.task('prod-ts', function() {
    return prodTsProject
      .src()
      .pipe(prodTsProject())
      .js.pipe(gulp.dest(`${dest}/`));
  });

  
// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.ts, gulp.series('dev-ts'));
  });

// Build task
// Also watched files
gulp.task(
    'dev',
    gulp.series('clean', gulp.series('dev-ts'), gulp.series('watch'))
  );
  
  // Distribution task
  gulp.task(
    'prod',
    gulp.series('clean', gulp.series('prod-ts'))
  );
  
  // Default task is to run the build
  gulp.task('default', gulp.series('dev'));
  