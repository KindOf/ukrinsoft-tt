const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
  params: {type: String, required: true},
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;