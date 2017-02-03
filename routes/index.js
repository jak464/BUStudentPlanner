var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.query('select 1 as one', function(err, result) {
    res.render('index', { title: 'Fake Login Page ' + result.rows[0].one })
  });
});

module.exports = router;
