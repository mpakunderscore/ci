//SERVER

let express = require('express');
let path = require('path');

let app = express();

//STATIC WEB
app.use(express.static(path.join(__dirname, 'web')));

// app.use('/submit', express.static(path.join(__dirname, 'web')));

let server = require('http').Server(app);

// let io = require('socket.io')(server);

const port = process.env.PORT || 4040;

//STATIC WEB
// app.use('/', express.static(__dirname));

// app.use('/api', express.static(__dirname + '/api.html'));

// app.get('/ideas', function (request, response) {
//     response.json(forest.ideas);
// });

server.listen(port);


let services = [
    {name: 'node-mongo-backend', run: 'npm start heroku'},
    {name: 'node-mongo-frontend', run: 'npm run start'}
    ];

// {name: 'node-mongo-frontend', run: 'npm run start'}

let home = '';

let spawn = require('child_process').spawn;

for (let i = 0; i < services.length; i++) {

    let service = services[i];

    // Notice how your arguments are in an array of strings
    service.child = spawn(service.run.split(' ')[0],
        [service.run.split(' ')[1], service.run.split(' ')[2]],
        {cwd: home + service.name});

    service.child.stdout.on('data', function (data) {
        process.stdout.write(data);
    });

    service.child.stderr.on('data', function (data) {
        process.stdout.write(data);
    });

    service.child.on('exit', function (data) {
        process.stdout.write('I\'m done!');
    });
}


