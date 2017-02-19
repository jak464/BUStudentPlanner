/**
 * Created by n0216698 on 2/17/2017.
 */

var db = require('../db');
var studentDashboard = require('./studentDashboardView');

module.exports =
    function subscribeToCourse(req , res){
        var courseId= req.params.courseId;
        var studentId = 1;
        var subscribe = true;

        console.log('course id ' + courseId);

        // update course is subscribed
        db.query('UPDATE course_student set is_subscribed = $1 WHERE course_id = $2 and student_id = $3',
            [subscribe, courseId, studentId],
            function(err) {
                if (err)
                    console.log("Error inserting : %s ",err );
                studentDashboard.render(req, res);
        });
    };
