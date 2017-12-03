const mongoose = require('mongoose');
const Mockgoose = require('mockgoose-fix').Mockgoose;
const config = require('./config');

// Use native promises for mongoose
mongoose.Promise = global.Promise;

// wrap mongoose with mockgoose
const mockgoose = new Mockgoose(mongoose);

module.exports = {
  connect: () => {
    mockgoose.prepareStorage().then(() => {
      mongoose.connect(config.db.uri);
      mongoose.connection.once('open', () => {
        console.log('Database connected successfuly!');
      })
      mongoose.connection.on('error', (err) => {
        throw err;
      });
    }).catch(err => {
      throw err;
    });
  },
}