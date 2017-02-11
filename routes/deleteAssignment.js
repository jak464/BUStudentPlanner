/**
 * Created by n0216698 on 2/9/2017.
 */

var db = require('../db');
var teacherDashboard = require('./teacherDashboardView');


module.exports =
    function deleteAssignment(req , res){
        var assignmentId = req.params.assignmentId;
        var studentId = 1;

        db.query('DELETE FROM assignment_student where assignment_id = $1 and student_id = $2',
            [assignmentId, studentId],
            function(err, results) {
                if (err)
                    console.log("Error inserting : %s ",err );
                db.query('DELETE FROM assignment where id = $1',
                    [assignmentId],
                    function(err) {
                        if (err)
                            console.log("Error inserting : %s ",err );
                        teacherDashboard.render(req, res);
                    });
            });

    };
