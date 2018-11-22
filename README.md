# gulp-ts-path-alias
https://gist.github.com/azarus/f369ee2ab0283ba0793b0ccf0e9ec590

## Usage

```shell
npm install --save-dev gulp-ts-path-alias
```

Then, add it to your `gulpfile.js`:

### Simple
```javascript
var alias = require('gulp-ts-path-alias');

gulp.task('test', function(){
  gulp.src(['./src/**/*.js'])
    .pipe(alias('.', {
      "@/*": ["app/*"]
    }))
    .pipe(gulp.dest('dist'));
});
```
