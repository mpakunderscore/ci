let onLoad = function () {

    getJSON('/ci/services', function(err, data) {

        if (err !== null) {

        } else {

            for (let id in data) {

                // let fixedLogs = data[id].logs;

                let logsString = data[id].logs.join('').replace(/\[\d{1,2}m/g, '');

                // let match = logsString.match('/[d{1,2}m/i')

                // console.log(match)

                let fixedLogs = logsString.split('\n');

                for (let i = 0; i < fixedLogs.length; i++) {

                    let div = document.createElement("div");
                    if (fixedLogs[i] === "")
                        fixedLogs[i] = "\n";

                    div.innerText = fixedLogs[i];
                    document.getElementById(id).appendChild(div);
                }

            }
        }
    });
};

let getJSON = function(url, callback) {

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