// const si = require('systeminformation');
//
// // callback style
// si.cpu(function(data) {
//     console.log('CPU-Information:');
//     console.log(data);
// });

let api = require('../api.js');

let cpu = require('cpu-load');
let free = require("free-memory");

setInterval(function() {

    let state = {};
    state.hardware = {};

    // track the CPU load over the next 1 second
    cpu(1000, function (load) {
        console.log(load); //=> 0.03 (3%)
        state.hardware.cpu = load * 100;
    });

    free(function (err, info) {

        console.log('memory: ' + info);
        console.error('error: ' + err);
        state.hardware.memory = info;
    });

    api.updateState(state);

}, 5000);

