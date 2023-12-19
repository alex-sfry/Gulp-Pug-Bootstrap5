import gulp from 'gulp';
import purgecss from 'gulp-purgecss';
import paths from './paths.js';



export const purgeCSS = () => {
    return gulp.src(paths.css.src)
        .pipe(purgecss({
            content: [
                './src/**/*.html',
                './docs/**/*.js',
                './src/**/*.pug'
            ]
        }))
        .pipe(gulp.dest(paths.bootstrapSCSS.dest));
};