//SERVER

let express = require('express');
let path = require('path');

let app = express();

//STATIC WEB
app.use(express.static(path.join(__dirname, 'web')));

let server = require('http').Server(app);

const port = process.env.PORT || 4040;

app.get('/services', function (request, response) {
    response.json(services());
});

server.listen(port);

let services = require('./server/services.js');


