const express = require('express');
const router = express.Router();

/* GET products listing. */
router.get('/products', function(req, res, next) {
    res.send('respond with a resource');
  });