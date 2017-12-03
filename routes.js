const express = require('express');
const qs = require('qs');
const axios = require('axios');

const Request = require('./models/request');

const router = express.Router();

// Save request params to mongoDb
router.post('/', async (req, res, next) => {
  let response;
  try {
    const query = qs.stringify(req.query);
    response = await axios.get(`https://httpbin.org/get?${query}`);
  } catch (error) {
    return next(error);
  }
  let request = new Request({params: JSON.stringify(response.data)})

  request.save((err, data) => {
    if (err) return next(err);
    res.status(200).json(data);
  });
});

// Get all requests
router.get('/requests', async (req, res, next) => {
  let requests;
  try {
    requests = await Request.find();
    let parsedRequests = requests.map(request => JSON.parse(request.params));
    res.json(parsedRequests);
  } catch (error) {
    return next(err);
  }
})

module.exports = router;
