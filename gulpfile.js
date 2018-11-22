const gulp = require('gulp');
const alias = require('./src/index.js');
gulp.task('default', ['test']);

gulp.task('test', () => {
  return gulp.src('demo/**/*.js')
    .pipe(alias('./demo', {
      "@/*": ["app/*"]
    }))
    .pipe(gulp.dest('./dist'));
});