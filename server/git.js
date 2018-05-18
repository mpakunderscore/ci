// https://github.com/RockMother/node-mongo-backend.git
// https://github.com/RockMother/node-mongo-frontend.git

// let cloneOrPull = require('git-clone-or-pull');
// let path = require('path');

let services = require('./services.js');

let git = require('simple-git');
const gitPromise = require('simple-git/promise');

let home = process.env.CI_HOME;

let message = 'Already up to date\n';

// 'node-mongo-backend'

module.exports.pull = async function (name) {

    console.log('pull: ' + name)

    let update = null;
    try {
        update = await gitPromise(home + name).pull();
    }
    catch (e) {
        // handle the error
    }

    //other sync
    module.exports.show(name).then(show => services.getState()[name].commit = show);

    if (update.summary && update.summary.changes) {

        // console.log('git: pull');
        // console.log(update.summary.changes);

        services.getState()[name].logs.push('git: ' + update.summary.toString());

        return update.summary.changes;

    } else {

        // console.log(message);

        // services.getState()[name].logs.push(message);

        return [message];
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