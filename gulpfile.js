const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gulp = require('gulp');
const gulpPostcss = require('gulp-postcss');
const gulpSourcemaps = require('gulp-sourcemaps');
const pump = require('pump');
const sass = require('gulp-sass')(require('sass'));

const srcPath = './scss/*.scss';
const distPath = './scss/';
const mapsOut = './';

// Build Styles Task
const buildStyles = (mode) => (done) => {
  let postcssPlugins;
  if (mode === 'development') {
    postcssPlugins = [
      autoprefixer(),
    ];
  } else if (mode === 'production') {
    postcssPlugins = [
      cssnano(),
      autoprefixer(),
    ];
  }
  
  ['development', 'production'].includes(mode) ? pump([
    gulp.src(srcPath),
    gulpSourcemaps.init({ loadMaps: true }),
    sass().on('error', sass.logError),
    gulpPostcss(postcssPlugins),
    gulpSourcemaps.write(mapsOut),
    gulp.dest(distPath),
  ], done()) : undefined;
};

// Generic Task
let modeName;
const genericTask = (mode) => {
  if (mode === 'development') {
    modeName = 'Development Mode';
  } else if (mode === 'production') {
    modeName = 'Production Mode';
  } else {
    modeName = undefined;
  }
  
  const startup = (done) => {
    gulp.watch(srcPath).on('all', gulp.series(
      Object.assign(buildStyles(mode), { displayName: `Watching scss: Build - ${modeName}` }),
    ));
    done();
  };
  
  return [Object.assign(startup, { displayName: `Startup Task - ${modeName}` })];
  
};

// Default (`npm start` or `yarn start`) => Production
gulp.task('default', gulp.series(...genericTask('development')));
gulp.task('prod', gulp.series(...genericTask('production')));


