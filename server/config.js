const fs = require('fs');
const dotenv = require('dotenv');
const envConfig = dotenv.parse(fs.readFileSync('.env.development'));
for (var k in envConfig) {
    process.env[k] = envConfig[k]
}