// https://github.com/RockMother/node-mongo-backend.git
// https://github.com/RockMother/node-mongo-frontend.git

// let cloneOrPull = require('git-clone-or-pull');
// let path = require('path');

let git = require('simple-git');
const gitPromise = require('simple-git/promise');

let home = process.env.CI_HOME;

// 'node-mongo-backend'

module.exports.pull = function (name) {

    git(home + name).pull((err, update) => {

        if (update && update.summary.changes) {

            console.log(' Update')

        } else {

            console.log(' Nothing')
        }

    });
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