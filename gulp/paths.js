const paths = {
    browserSync: {
        base: 'docs/'
    },
    bootstrapSCSS: {
        src: 'src/styles/bootstrapSCSS/**/*.scss',
        dest: 'src/styles/css/'
    },
    bootstrapJS: {
        src: 'src/script/bootstrapJS/bootstrap.js',
        dest: 'docs/js/'
    },
    del: {
        base: 'docs/*',
        base2: 'src/styles/css/*',
        exceptions: '!docs/images'
    },
    html: {
        src: 'src/*.html',
        dest: 'docs/'
    },
    pug: {
        src: 'src/*.pug',
        srcWatch: 'src/**/*.pug',
        dest: 'docs/'
    },
    styles: {
        src: 'src/styles/scss/style.scss',
        srcWatch: 'src/**/*.scss',
        dest: './docs/css/',
        destTemp: 'src/styles/css/'
    },
    css: {
        src: 'src/styles/css/*.css',
        dest: 'docs/css/'
    },
    vendorStyles: {
        src: 'src/styles/vendorCSS/*.css',
        dest: 'docs/css/'
    },
    vendorSCSS: {
        src: 'src/styles/vendorCSS/*.scss',
        dest: 'docs/css/'
    },
    vendorJS: {
        src: 'src/script/vendorJS/*.js',
        dest: 'docs/js/'
    },
    scripts: {
        srcWatch: 'src/**/*.js',
        src: 'src/script/**/*.js',
        dest: 'docs/js/'
    },
    images: {
        src: 'src/images/**',
        dest: 'docs/images'
    },
    fonts: {
        src: 'src/fonts/*',
        dest: 'docs/fonts'
    },
};

export default paths;