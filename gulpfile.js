/* gulpfile.js */

/**
* Import uswds-compile
*/
const uswds = require("@uswds/compile");

/**
* USWDS version
* Set the major version of USWDS you're using
* (Current options are the numbers 2 or 3)
*/
uswds.settings.version = 3;

/**
* Path settings
* Set as many as you need
*/
uswds.paths.dist.css = './samtools/static/assets/css';
uswds.paths.dist.theme = './samtools/static/sass/uswds';
uswds.paths.dist.js =  './samtools/static/assets/js';
uswds.paths.dist.img = './samtools/static/assets/img';
uswds.paths.dist.fonts = './samtools/static/assets/fonts';

/**
* Exports
* Add as many as you need
*/
exports.init = uswds.init;
exports.compile = uswds.compile;
exports.watch = uswds.watch;