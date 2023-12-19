import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import rename from 'gulp-rename';
import browserSync from './browserSync.js';
import paths from './paths.js';


const sass = gulpSass(dartSass);

export const bsStyles = () => {
    return gulp.src(paths.bootstrapSCSS.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCss({
            level: 2
        }))
        .pipe(rename({
            basename: 'bootstrap',
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
};
