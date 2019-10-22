const argv = require('./argv');

module.exports = parseInt(argv.port || process.env.EXPRESS_PORT || '3000', 10);
