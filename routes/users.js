var express = require('express');
const { newUser } = require('../controller/user.controller');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// POST Create a new User

router.post("/newUser", newUser);

module.exports = router;
