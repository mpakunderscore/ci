let git = require('./git.js');
let vars = require('./vars.js');

let services = [
    {name: 'node-mongo-backend', run: 'npm start heroku'},
    {name: 'node-mongo-frontend', run: 'npm run start'}
];

// {name: 'node-mongo-backend', run: 'npm start default'},
// {name: 'node-mongo-frontend', run: 'npm run start'}

let state = {};

let home = process.env.CI_HOME;

// console.log(home)

let spawn = require('child_process').spawn;

module.exports.run = function () {

    for (let i = 0; i < services.length; i++) {

        let service = services[i];

        state[service.name] = {};

        //status
        state[service.name].status = 'run';

        //logs
        state[service.name].logs = [];

        //commit
        git.show(service.name).then(show => state[service.name].commit = show);

        //vars
        state[service.name].vars = vars.get(service.name);


        // Notice how your arguments are in an array of strings
        let child = spawn(service.run.split(' ')[0],
            [service.run.split(' ')[1], service.run.split(' ')[2]],
            {cwd: home + service.name});

        child.stdin.setEncoding('utf-8');

        child.stdout.on('data', function (data) {
            process.stdout.write(data);
            state[service.name].logs.push(data.toString());
        });

        child.stderr.on('data', function (data) {
            process.stdout.write(data);
            state[service.name].logs.push(data.toString());
            state[service.name].status = 'error';
        });

        child.on('exit', function (data) {
            process.stdout.write('exit');
            state[service.name].status = 'exit';
        });
    }
};

module.exports.getState = function () {
    return state;
};