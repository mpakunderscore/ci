const fs = require('fs');

let home = process.env.CI_HOME;

module.exports.get = function (name) {

    let contents = fs.readFileSync(home + name + '/.env.development', 'utf8');
    return contents;
}