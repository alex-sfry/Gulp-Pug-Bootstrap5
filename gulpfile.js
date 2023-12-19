import gulp from 'gulp';
import { glob } from 'glob';
import { deleteAsync } from 'del';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import rename from 'gulp-rename';
import * as rollup from 'rollup';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import getFolderSize from 'get-folder-size';
import replace from 'gulp-replace';
import gulpPug from 'gulp-pug';
import paths from './gulp/paths.js';
import { purgeCSS } from './gulp/purgeCSS.js';
import { bsStyles } from './gulp/gulpBS.js';
import { bootstrapSCSS } from './gulp/BsScss.js';
import { SCSStoCSS } from './gulp/SCSStoCSS.js';
import browserSync from './gulp/browserSync.js';
import { bootstrapStyles } from './gulp/BsScss.js';


// production build goes to docs folder

// if you use scss - styles from all files (except for 3rd party css) 
// must be imported into style.scss in src/styles/scss folder

// css styles must be also imported into style.scss

// js from all files (except for 3rd party js) must be imported into src/main.js in script folder


const sass = gulpSass(dartSass);

export const clean = () => {
    return deleteAsync(
        [
            paths.del.base,
            paths.del.base2,
            paths.del.exceptions
        ]
    );
};

export const fonts = () => {
    return gulp.src(paths.fonts.src)
        .pipe(newer(paths.fonts.dest))
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe(browserSync.stream());
};

export const HTML = () => {
    return gulp.src(paths.html.src)
        .pipe(replace('%NO_CACHE%', new Date().getTime()))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
};

export const pug = () => {
    return gulp.src(paths.pug.src)
        .pipe(gulpPug({ pretty: true }))
        .pipe(replace('%NO_CACHE%', new Date().getTime()))
        .pipe(gulp.dest(paths.pug.dest))
        .pipe(browserSync.stream());
};

export const vendorStyles = () => {
    return gulp.src(paths.vendorStyles.src)
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
};

export const vendorJS = () => {
    return gulp.src(paths.vendorJS.src)
        .pipe(gulp.dest(paths.vendorJS.dest))
        .pipe(browserSync.stream());
};

export const styles = () => {
    return gulp.src([paths.styles.src], { base: 'src/styles/scss' })
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCss({
            level: 2
        }))
        .pipe(rename({
            // basename: 'main',
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
};

export const css = () => {
    return gulp.src([paths.css.src], { base: 'src/styles/css' })
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCss({
            level: 2
        }))
        .pipe(rename({
            // basename: 'main',
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(browserSync.stream());
};

export const scripts = async () => {
    const scriptsPath = glob.sync(paths.scripts.src, { posix: true, dotRelative: true, ignore: 'src/script/Helpers/**' });
    console.log(scriptsPath)
    const bundle = await rollup.rollup({
        input: scriptsPath,
        plugins: [resolve(), babel({ babelHelpers: 'bundled' })]
    });

    await bundle.write({
        dir: paths.scripts.dest,
        format: 'es',
        entryFileNames: '[name].min.js',
        sourcemap: true,
        plugins: [terser()]
    });
    browserSync.reload();
};

export const img = () => {
    return gulp.src(paths.images.src)
        .pipe(newer(paths.images.dest))
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.stream());
};

export const folderSize = async () => {
    const size = await getFolderSize.loose(paths.browserSync.base);
    console.log(`The 'docs' folder is ${(size / 1024 / 1024).toPrecision(3)} MB large`);
};

export const watch = () => {
    browserSync.init({
        server: {
            baseDir: paths.browserSync.base
        }
    });

    gulp.watch(paths.html.src, HTML);
    gulp.watch(paths.pug.srcWatch, pug);
    gulp.watch(paths.scripts.srcWatch, scripts);
    // gulp.watch(paths.bootstrapJS.src, scripts);
    gulp.watch(paths.styles.srcWatch, styles);
    gulp.watch(paths.bootstrapSCSS.src, bsStyles);
    gulp.watch(paths.css.src, css);
    gulp.watch(paths.vendorStyles.src, vendorStyles);
    // gulp.watch(paths.vendorJS.src, vendorJS);
    gulp.watch(paths.images.src, img);
    gulp.watch(paths.fonts.src, fonts);
    folderSize();
};

export const build = gulp.series(
    clean, HTML, gulp.parallel(scripts, styles, vendorStyles, vendorJS, img, fonts), watch
);

export const buildPug = gulp.series(
    clean, pug, gulp.parallel(scripts, styles, vendorStyles, vendorJS, img, fonts), watch
);

// for testing and researching bootstrap scss
export const bootstrap = gulp.series(
    clean, gulp.parallel(bootstrapSCSS, bootstrapStyles)
);
//===========================================================================

export const purge = gulp.series(
    clean, HTML, gulp.parallel(gulp.series(gulp.parallel(SCSStoCSS, scripts, vendorJS), purgeCSS, css), vendorStyles,
        img, fonts)
);

export const bs = gulp.series(
    clean, HTML, gulp.parallel(scripts, styles, vendorStyles, vendorJS, bsStyles, img, fonts), watch
);

export const bsPug = gulp.series(
    clean, pug, gulp.parallel(scripts, styles, vendorStyles, vendorJS, bsStyles, img, fonts), watch
);

export default build;