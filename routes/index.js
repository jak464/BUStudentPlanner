var express = require('express');
var router = express.Router();
var db = require('../db');

var studentDashboardView = require("./studentDashboardView");
var teacherDashboardView = require("./teacherDashboardView");
var routeUser = require("./routeUser");
var saveAssignment = require("./saveAssignment");

router.get('/studentDashboardView', studentDashboardView.render);
router.get('/teacherDashboardView', teacherDashboardView.render);
router.post('/routeUser', routeUser);
router.post('/saveAssignment/:assignmentId/:studentId', saveAssignment);


/* GET home page. */
router.get('/', function(req, res, next) {
  db.query('select 1 as one', function(err, result) {
    res.render('index', { title: 'Select User '})
  });
});

module.exports = router;
