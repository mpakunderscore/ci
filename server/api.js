let express = require('express');
let path = require('path');
let app = express();

//STATIC WEB
app.use('/ci', express.static(path.join(__dirname, '../web')));

let server = require('http').Server(app);

let io = require('socket.io')(server, {path: '/ci/socket.io'});

const port = process.env.CI_PORT || 4000;

// let globalState;

exports.run = function (state) {

    // globalState = state;

    server.listen(port);

    io.on('connection', (socket) => {

        console.log('connect: ' + socket.id);

        socket.emit('state', JSON.stringify(state));

        socket.on('message', function (msg) {
            console.log('message: ' + msg);
        });

        socket.on('disconnect', function () {
            console.log('disconnect');
        });
    });
};

exports.updateState = function (state) {
    io.sockets.emit('state', JSON.stringify(state));
};


// app.get('/ci/state', function (request, response) {
//     response.json(services.getState());
// });
//
// app.get('/ci/git/pull', function (request, response) {
//
//     git.pull(request.query.name).then(
//         data => response.json(data)
//     );
// });
//
// app.get('/ci/kill', function (request, response) {
//     response.json(services.kill(request.query.name));
// });
//
// app.get('/ci/run', function (request, response) {
//     response.json(services.run(request.query.name));
// });

