const fs = require('fs');
const util = require('util');

const appendFile = util.promisify(fs.appendFile);

const requestLogger = async function(req, res, next) {
  try {
    let e = await appendFile('logs/request-log.csv', `${req.method}, ${new Date()}\r\n`);
  } catch (error) {
    console.error(error);
  }
  next();
};

module.exports = {
  requestLogger
};
