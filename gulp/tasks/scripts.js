'use strict';

import { src, dest } from 'gulp';
import { production, nominify, $, source, build, config } from '../config';

// Vendor scripts
export const vendorScripts = () => src(source.vendorJs)
    .pipe($.plumber())
    .pipe($.include(config.include)).on('error', (e) => console.log(e))
    .pipe($.if(production, $.uglify()))
    .pipe(dest(build.scripts))

// Scripts
export const scripts = () => src(source.js)
    .pipe($.plumber())
    .pipe($.if(!production, $.sourcemaps.init()))
    .pipe($.include(config.include)).on('error', (e) => console.log(e))
    .pipe($.babel(config.babel))
    .pipe($.if(production && !nominify, $.uglify()))
    .pipe(($.if(!production, $.sourcemaps.write('.'))))
    .pipe(dest(build.scripts))

let sourceJs = source.js.slice();
sourceJs.push(source.subJs);

// JS Lint
export const jsLint = () => src(sourceJs)
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter());