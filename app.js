var Display, display, _;

_ = require('./node_modules/underscore/underscore.js');

Display = require('./dist/module.js');

display = new Display(2);

display.print('0123456789');
