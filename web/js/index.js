let state = {};

function fillBlock(id, data) {

    document.getElementById(id).innerText = '';

    // console.log(data)

    for (let i = 0; i < data.length; i++) {

        let div = document.createElement('div');
        if (data[i] === '')
            data[i] = '\n';

        div.innerText = data[i];
        document.getElementById(id).appendChild(div);
    }
}

let onLoad = function () {

    console.log('onLoad')

    // changeColor();

    getJSON('/state', function(err, data) {

        if (err !== null) {

        } else {

            for (let id in data) {

                state[id] = {};

                // let fixedLogs = data[id].logs;

                let logsString = data[id].logs.join('').replace(/\[\d{1,2}m/g, '');

                state[id].logs = logsString.split('\n');

                state[id].commit = data[id].commit.split('\n');

                state[id].vars = data[id].vars.split('\n');

                fillBlock(id, state[id].logs);

                // document.getElementById(data)
            }
        }
    });
};

let logs = function (id) {
    fillBlock(id, state[id].logs);
};

let vars = function (id) {
    fillBlock(id, state[id].vars);
};

let commit = function (id) {
    fillBlock(id, state[id].commit);
};

function blockOk(name) {

    //TODO
    document.getElementById(name + '-progress').classList.add('ok');
    setTimeout(function () {
        document.getElementById(name + '-progress').classList.remove('ok');
        document.getElementById(name + '-progress').classList.remove('active');
    }, 500)
}

let pull = function (name) {

    document.getElementById(name + '-progress').classList.add('active');

    getJSON('/git/pull?name=' + name, function(err, data) {

        if (err !== null) {

        } else {

            console.log(data);

            fillBlock(name, data);

            blockOk(name);
        }
    });
};

let run = function (name) {

    document.getElementById(name + '-progress').classList.add('active');

    getJSON('/run?name=' + name, function(err, data) {

        if (err !== null) {

            document.getElementById(name + '-progress').classList.add('error');

        } else {

            blockOk(name);
        }
    });
};


let kill = function (name) {

    document.getElementById(name + '-progress').classList.add('active');

    getJSON('/kill?name=' + name, function(err, data) {

        if (err !== null) {

            document.getElementById(name + '-progress').classList.add('error');

        } else {

            // console.log(data);

            fillBlock(name, data);

            blockOk(name);
        }
    });
}

let getJSON = function(url, callback) {

    url = '/ci' + url;

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        let status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};