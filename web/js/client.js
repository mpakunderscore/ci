const port = 4000;
const ip = 'localhost:' + port;

let socket = io(ip, {secure: false, path: '/ci/socket.io'});
// let socket = io(window.location.hostname, {secure: true, path: '/ci/socket.io'});


socket.on('connect', function() {
    socket.emit('color', 'test');
});

function sendColor(color) {
    console.log(color)
    socket.emit('color', color)
}

socket.on('state', (state) => {
    console.log(JSON.parse(state));
});