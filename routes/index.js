var express = require('express');
var router = express.Router();
var db = require('../db');

var studentDashboardView = require("./studentDashboardView");
var teacherDashboardView = require("./teacherDashboardView");
var routeUser = require("./routeUser");
var saveAssignment = require("./saveAssignment");
var createNewAssignment = require("./createNewAssignment");
var updateAssignment = require("./updateAssignment");
var updateCourseAnnouncements = require("./updateCourseAnnouncements");
var deleteAssignment = require("./deleteAssignment");
var updateOrDeleteRouter = require('./updateOrDeleteRouter');
var studentSettingsView = require('./studentSettingsView');
var subscribeToCourse = require('./subscribeToCourse');
var updatePersonalInfo = require('./updatePersonalInfo');


router.get('/studentDashboardView', studentDashboardView.render);
router.get('/teacherDashboardView', teacherDashboardView.render);
router.get('/studentSettingsView', studentSettingsView.render);
router.post('/routeUser', routeUser);
router.post('/saveAssignment/:assignmentId/:studentId', saveAssignment);
router.post('/updateCourseAnnouncements/:courseId/', updateCourseAnnouncements);
router.post('/updateAssignment/:assignmentId', updateAssignment);
router.post('/updateOrDeleteRouter/:assignmentId', updateOrDeleteRouter);
router.post('/createNewAssignment/:courseId/', createNewAssignment);
router.post('/deleteAssignment/:assignmentId/', deleteAssignment);
router.post('/subscribeToCourse/:courseId', subscribeToCourse);
router.post('/updatePersonalInfo/', updatePersonalInfo);


/* GET home page. */
router.get('/', function(req, res, next) {
  db.query('select 1 as one', function(err, result) {
    res.render('index', { title: 'Select User '})
  });
});

module.exports = router;
