const {src, dest, task, series, watch, parallel} = require('gulp'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  del = require('del'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  sassGlob = require('gulp-sass-glob'),
  autoprefixer = require('gulp-autoprefixer'),
  gcmq = require('gulp-group-css-media-queries'),
  rename = require('gulp-rename'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  svgo = require('gulp-svgo'),
  svgSprite = require('gulp-svg-sprite'),
  imagemin = require('gulp-imagemin'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const {DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');

sass.compiler = require('node-sass');

// Удаление папки dist
task('clean', () => {
  return del(DIST_PATH);
});

// Копирование и сжатие html файлов
task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream: true}));
});

// Копирование php файлов
task('copy:php', () => {
  return src(`${SRC_PATH}/*.php`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream: true}));
});

// Обработка стилей
task('styles', () => {
  return src([...STYLES_LIBS, `${SRC_PATH}/css/main.scss`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('style.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env === 'dev',
      autoprefixer({cascade: false})
    ))
    .pipe(dest(DIST_PATH))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    // .pipe(gulpif(env === 'prod', rename({extname: '.min.css'})))
    .pipe(gulpif(env === 'dev',sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream: true}));
});

// Обработка скриптов
task('scripts', () => {
  return src([...JS_LIBS, `${SRC_PATH}/js/*.js`])
    .pipe(gulpif(env === 'dev',sourcemaps.init()))
    .pipe(concat('script.js'))
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream: true}));
});

// Создание svg спрайта
task('icons', () => {
  return src(`${SRC_PATH}/img/icons/*.svg`)
    .pipe(
      svgo({
        plugins: [
          {
            removeAttrs: {attrs: '(fill|stroke|style|width|height|data.*)'}
          }
        ]
      })
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {sprite: '../sprite.svg'}
        }
      })
    )
    .pipe(dest(`${DIST_PATH}/img`))
    .pipe(reload({stream: true}));
});

// Копирование картинок
task('images', () => {
  return src(`${SRC_PATH}/img/**/*.{jpg,png,gif,webp,ico}`)
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 3
    }))
    .pipe(dest(`${DIST_PATH}/img`))
    .pipe(reload({stream: true}));
});

// Обработка шрифтов
task('fonts', () => {
  src(`${SRC_PATH}/fonts/*.{woff,woff2}`)
    .pipe(dest(`${DIST_PATH}/fonts`));
  src(`${SRC_PATH}/fonts/*.ttf`)
    .pipe(ttf2woff())
    .pipe(dest(`${DIST_PATH}/fonts`));
  return src(`${SRC_PATH}/fonts/*.ttf`)
    .pipe(ttf2woff2())
    .pipe(dest(`${DIST_PATH}/fonts`));
});

// Dev сервер
task('server', () => {
  browserSync.init({
      server: {
          baseDir: `./${DIST_PATH}`
      },
      notify: false,
      open: false
  });
});

task('watch', () => {
  watch(`./${SRC_PATH}/*.html`, series('copy:html'));
  watch(`./${SRC_PATH}/*.php`, series('copy:php'));
  watch(`./${SRC_PATH}/css/**/*.scss`, series('styles'));
  watch(`./${SRC_PATH}/js/*.js`, series('scripts'));
  watch(`./${SRC_PATH}/img/**/*.{jpg,png,gif,webp}`, series('images'));
  watch(`./${SRC_PATH}/img/icons/*.svg`, series('icons'));
});

task(
  'default', 
  series('clean', 
    parallel('copy:html', 'copy:php', 'styles', 'scripts', 'fonts', 'images', 'icons'),
    parallel('watch', 'server')
  )
);

task(
  'build', 
  series('clean', 
    parallel('copy:html', 'copy:php', 'styles', 'scripts', 'fonts', 'images', 'icons')
  )
);