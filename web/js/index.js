let onLoad = function () {

    getJSON('/ci/services', function(err, data) {

        if (err !== null) {

        } else {

            for (let id in data) {

                console.log(data[id])

                for (let i = 0; i < data[id].logs.length; i++) {
                    // console.log(data[id].logs[i])
                    // console.log(document.getElementById(id))
                    let div = document.createElement("div");
                    div.innerText = data[id].logs[i];
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