var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('viewer', { title: 'Book Project' });
});

module.exports = router;
