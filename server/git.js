// https://github.com/RockMother/node-mongo-backend.git
// https://github.com/RockMother/node-mongo-frontend.git

// let cloneOrPull = require('git-clone-or-pull');
// let path = require('path');

let services = require('./services.js');

let git = require('simple-git');
const gitPromise = require('simple-git/promise');

let home = process.env.CI_HOME;

let message = 'git: Already up to date\n';

// 'node-mongo-backend'

module.exports.pull = async function (name) {

    // console.log('Name: ' + name)

    let update = null;
    try {
        update = await gitPromise(home + name).pull();
    }
    catch (e) {
        // handle the error
    }

    if (update.summary && update.summary.changes) {

        return update.summary.changes;

    } else {

        services.state[name].logs.push(message);
        return message;
    }
};

module.exports.show = async function (name) {

    let showText = null;
    try {
        showText = await gitPromise(home + name).show();
    }
    catch (e) {
        // handle the error
    }

    return showText;
};