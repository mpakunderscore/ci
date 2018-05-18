//SERVER

let express = require('express');
let path = require('path');

require('./server/config.js');

let app = express();

//STATIC WEB
app.use('/ci', express.static(path.join(__dirname, 'web')));

let server = require('http').Server(app);

const port = process.env.CI_PORT || 4000;

app.get('/ci/state', function (request, response) {
    response.json(services.getState());
});

app.get('/ci/git/pull', function (request, response) {

    git.pull(request.query.name).then(
        data => response.json(data)
    );
});

server.listen(port);

let services = require('./server/services.js');
services.run();

let git = require('./server/git.js');

// let memory = require('./server/memory.js');

// let speedtest = require('./server/speedtest.js');
