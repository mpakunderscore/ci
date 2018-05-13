let services = [
    {name: 'node-mongo-backend', run: 'npm start heroku'},
    {name: 'node-mongo-frontend', run: 'npm run start'}
];

// {name: 'node-mongo-frontend', run: 'npm run start'}

let state = {};

let logs = {};

let home = '';

let spawn = require('child_process').spawn;

for (let i = 0; i < services.length; i++) {

    let service = services[i];

    state[service.name] = {};

    logs[service.name] = [];

    state[service.name].logs = logs[service.name];

    // Notice how your arguments are in an array of strings
    let child = spawn(service.run.split(' ')[0],
        [service.run.split(' ')[1], service.run.split(' ')[2]],
        {cwd: home + service.name});

    child.stdout.on('data', function (data) {
        process.stdout.write(data);
        logs[service.name].push(data.toString());
    });

    child.stderr.on('data', function (data) {
        process.stdout.write(data);
        logs[service.name].push(data.toString());
        state[service.name].status = 'error';
    });

    child.on('exit', function (data) {
        process.stdout.write('I\'m done!');
        state[service.name].status = 'dead';
    });
}

function getState() {

    return state;
}

module.exports = getState;