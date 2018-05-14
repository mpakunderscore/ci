var speedTest = require('speedtest-net');
var testSpeed = speedTest({maxTime: 5000});

testSpeed.on('data', data => {
    console.dir(data);
});

testSpeed.on('error', err => {
    console.error(err);
});