'use strict';

import sassGlob from 'gulp-sass-glob';
import { src, dest } from 'gulp';
import { production, nominify, $, source, build, config } from '../config';

// CSS
const css = () => src(source.css)
    .pipe($.plumber())
    .pipe($.changed(source.css))
    .pipe($.if(!production, $.sourcemaps.init()))
    .pipe(sassGlob())
    .pipe($.sass(config.sass).on('error', $.sass.logError))
    .pipe($.autoprefixer(config.autoprefixer))
    .pipe($.combineMq(config.combineMq))
    .pipe($.if(production && !nominify, $.sass({ outputStyle: 'compressed' }).on('error', $.sass.logError)))
    .pipe($.if(!production, $.sourcemaps.write('.')))
    .pipe(dest(build.css))

export default css;