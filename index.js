//SERVER

let express = require('express');
let path = require('path');

require('./server/config.js');

let app = express();

//STATIC WEB
app.use('/', express.static(path.join(__dirname, 'web')));

let server = require('http').Server(app);

let io = require('socket.io')(server);

const port = process.env.CI_PORT || 4000;



//STATIC WEB
// app.use('/', express.static(__dirname));

// app.use('/api', express.static(__dirname + '/api.html'));

// app.get('/ideas', function (request, response) {
//     response.json(forest.ideas);
// });



// let forest = {};
// forest.trees = 0;
// forest.users = {};
// forest.ideas = {};
//
// let database = require('./database.js');
// database.run(forest);


io.on('connection', (socket) => {

    console.log('connect: ' + socket.id);

    // console.log(map);

    let state = {server: true};
    socket.emit('state', JSON.stringify(state));

    // socket.emit('trees', JSON.stringify(forest.users[id]));

    socket.emit('auth', null);
    socket.on('auth', (id) => console.log(id));

    socket.on('color', (color) => console.log(color));
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });

    // socket.on('pull', () => addIdea(socket, idea));
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});




app.get('/ci/state', function (request, response) {
    response.json(services.getState());
});

app.get('/ci/git/pull', function (request, response) {

    git.pull(request.query.name).then(
        data => response.json(data)
    );
});

app.get('/ci/kill', function (request, response) {
    response.json(services.kill(request.query.name));
});

app.get('/ci/run', function (request, response) {
    response.json(services.run(request.query.name));
});

server.listen(port);

// server.listen(port);

let services = require('./server/services.js');
// services.runAll();

let git = require('./server/git.js');

// let memory = require('./server/memory.js');

// let speedtest = require('./server/speedtest.js');
