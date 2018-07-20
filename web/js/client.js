//CLIENT

let id = localStorage.getItem("id");

const port = 4000;
const ip = "localhost:" + port + "/ci";

let socket = io(ip, {secure: false});
// let socket = io(window.location.hostname, {secure: true, path: '/ci/socket.io'});

// socket.emit("auth", id);

//TODO
// socket.on("auth", () => {
    // socket.emit("auth", id);
// });

function sendColor(color) {
    console.log(color)
    socket.emit("color", color);
    socket.emit('chat message', color);
    // socket.broadcast.emit('color');
}

// socket.on("user", (user) => {
//
//     console.log(user);
//
//     if (id === null)
//         localStorage.setItem("id", user.id);
//
//     trees = user.trees;
//
//     document.getElementById("key").innerText = user.id;
// });

socket.on("state", (state) => {
    console.log(JSON.parse(state));
});
//
// function setData(forest) {
//
//     // console.log(data)
//
//     document.getElementById("forest").innerText =
//
//         forest.trees.toString()
//             .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
//
//     // document.getElementById("online").innerText = forest.online;
//
//     trees++;
//
//     if (trees > 5) {
//
//         document.title = trees.toString() + " planted";
//
//         document.getElementById("trees").innerText =
//
//             trees.toString()
//                 .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
//     }
//
//     console.log(Object.keys(forest.users).length)
//
//     // console.log(Object.keys(forest.ideas).length)
//
//     // showIdeas(forest.ideas)
// }
//

//
// socket.on("ideas", (ideas) => {
//     // showIdeas(JSON.parse(ideas));
// });