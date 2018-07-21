let speedTest = require('speedtest-net');
let testSpeed = speedTest({maxTime: 5000});

testSpeed.on('data', data => {
    console.dir(data.speeds.download);
    console.dir(data.speeds.upload);
    console.dir(data.server.ping);
});

testSpeed.on('error', err => {
    console.error(err);
});