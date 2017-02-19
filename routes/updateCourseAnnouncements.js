/**
 * Created by n0216698 on 2/9/2017.
 */
var db = require('../db');
var teacherDashboard = require('./teacherDashboardView');


module.exports =
    function saveCourseAssignments(req , res){
        var courseId= req.params.courseId;
        var announcements = req.body.announcements;

        console.log('course id ' + courseId)
        console.log('announcements ' + announcements);

        db.query('UPDATE course set course_announcements = $1 WHERE id = $2',
            [announcements, courseId],
            function(err) {
                if (err)
                    console.log("Error inserting : %s ",err );
                teacherDashboard.render(req, res);
            });
    };
