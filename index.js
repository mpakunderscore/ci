//SERVER
require('./server/config.js');

let state = {};

let api = require('./server/api.js');

api.run(state);

let services = require('./server/core/services.js');

// services.runAll();

let hardware = require('./server/core/hardware.js');

let git = require('./server/core/git.js');

let speedtest = require('./server/core/speedtest.js');
