import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import paths from './paths.js';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';


const sass = gulpSass(dartSass);


export const bootstrapSCSS = () => {
    return gulp.src([paths.bootstrapSCSS.src], { base: 'src/styles/bootstrapSCSS' }, 
        { since: gulp.lastRun(bootstrapSCSS) })
            .pipe(sass().on('error', sass.logError))
            .pipe(rename({
                basename: 'bootstrap',
                suffix: '.custom'
            }))
            .pipe(gulp.dest(paths.bootstrapSCSS.dest));
};

export const bootstrapStyles = () => {
    return gulp.src([paths.bootstrapSCSS.src], { base: 'src/styles/bootstrapSCSS' }, 
        { since: gulp.lastRun(bootstrapStyles) })
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(cleanCss({
                level: 2
            }))
            .pipe(rename({
                basename: 'bootstrap',
                suffix: '.min'
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(paths.styles.dest));
};