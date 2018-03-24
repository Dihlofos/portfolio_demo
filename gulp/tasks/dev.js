'use strict';

import { series, parallel } from 'gulp';
import clean from './clean';
import html from './html';
import css from './css';
import { vendorScripts, scripts, jsLint } from './scripts';
import assets from './assets';
import { svgSprite, pngSprite } from './sprites';
import devWatch from './watch';

// Dev
const dev = series(clean, parallel(svgSprite, pngSprite, assets, html, css, vendorScripts, scripts, jsLint), devWatch);

export default dev;