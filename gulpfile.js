const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const minifycss = require('gulp-minify-css');
const newer = require('gulp-newer');
// const notify = require('gulp-notify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const prefixer = require('gulp-autoprefixer')

//development mode
devBuild = (process.env.NODE_ENV !=='production'),

//folders 
src = 'src/',
build = 'build/'
;


// compile sass to css Gulp_4
function style() {
   
    return gulp.src('src/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(src + 'css/'))
    .pipe(browserSync.stream())
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(prefixer())
    .pipe(gulp.dest(src + 'css/'))
    // .pipe(notify({message: 'Style task complete'}))
    ;
}
exports.style = style;

//watch task
function watch() {
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
    gulp.watch('src/sass/**/*.scss', style). on('change',browserSync.reload);
    gulp.watch('*.html'). on('change',browserSync.reload);
    gulp.watch('src/js/**/*.js'). on('change',browserSync.reload);
}
exports.watch = watch;

// Image min
function images(){
    // const out = build + 'images/';
    return gulp.src(src + 'images/**/*')
    .pipe(newer(src))
    // .pipe(newer(out))
    .pipe(imagemin({optimizationlevel: 5 }))
    .pipe(gulp.dest(src + 'imagesMIN'));
    // .pipe(gulp.dest(out));
};
exports.images = images;


gulp.task('clean',function(){
    return gulp.src(['src/styles', 'src/scripts', 'src/images'], {read:false}
    .pipe(clean()));
})
exports.clean = clean;





exports.default = gulp.series(exports.watch, exports.images, exports.clean );