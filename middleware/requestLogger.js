const fs = require('fs');
const util = require('util');

const appendFile = util.promisify(fs.appendFile);
const mkdir = util.promisify(fs.mkdir);

async function appendRequest(method) {
  try {
    await appendFile('logs/request-log.csv', `${method}, ${new Date()}\r\n`);
  } catch (error) {
    console.error(error);
  }
}

const requestLogger = function(req, res, next) {
  fs.stat('logs', async (err, stat) => {
    if (err && err.code === 'ENOENT') {
      await mkdir('logs');
      appendRequest(req.method);
    } else if (stat.isDirectory()) {
      appendRequest(req.method);
    } else {
      console.error(err);
    }
    next();
  });
};

module.exports = {
  requestLogger
};
