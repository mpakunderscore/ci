let free = require("free-memory");

free(function (err, info) {

    console.log('memory: ' + info);
});