/**
 * Created by n0216698 on 2/4/2017.
 */
var db = require('../db');
var studentDashboard = require('./studentDashboardView');


module.exports =
    function saveAssignment(req , res){
        var assignmentId = req.params.assignmentId;
        var studentId = req.params.studentId;
        var comments = req.body.comments;
        var completed = req.body.completed;


        if (typeof completed != 'undefined'){
            completed = true;
        }
        else {
            completed = false;
        }

        console.log('attention jack farm ')
        console.log(completed);

        db.query('UPDATE assignment_student set comments = $1, is_completed = $2 WHERE assignment_id = $3 AND student_id = $4',
            [comments, completed, assignmentId, studentId],
            function(err) {
                if (err)
                    console.log("Error inserting : %s ",err );
                studentDashboard.render(req, res);
            });
    };
