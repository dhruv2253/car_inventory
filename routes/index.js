var express = require('express');
var router = express.Router();

// /cars
// /cars/id
// /cars/create
// /cars/id/update
// /cars/id/delete



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
