let gulp = require('gulp');
let babel = require('gulp-babel');
let jade = require('gulp-jade');
let del = require('del');
gulp.task('build', ['es6', 'jade']);
gulp.task('dev', ['watch', 'build']);
gulp.task('jade', ['clean'], () => {
    return gulp.src('src/index.jade')
        .pipe(jade())
        .pipe(gulp.dest('dist'));
});
gulp.task('clean', () => {
    return del(['dist']);
})
gulp.task('watch', () => {
    gulp.watch('src/*', ['build']);
})
gulp.task('es6', ['clean'], () => {
    return gulp.src('src/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});
