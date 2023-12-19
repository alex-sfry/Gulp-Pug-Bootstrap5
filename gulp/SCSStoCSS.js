import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import browserSync from './browserSync.js';
import paths from './paths.js';


const sass = gulpSass(dartSass);


export const SCSStoCSS = () => {
    return gulp.src([paths.bootstrapSCSS.src], { base: 'src/styles/bootstrapSCSS' })
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.styles.destTemp))
        .pipe(browserSync.stream());
};