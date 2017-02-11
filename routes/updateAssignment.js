/**
 * Created by n0216698 on 2/9/2017.
 */

var db = require('../db');
var teacherDashboard = require('./teacherDashboardView');


module.exports =
    function updateCourseAssignment(req , res){
        var assignmentId = req.params.assignmentId;
        var dueDate = req.body.dueDate;
        var description = req.body.description;
        var published = req.body.published;
        var canView;
        var studentId = 1;

        if (typeof published == 'undefined') {
            published = true;
        }
        canView = published;

        db.query('UPDATE assignment set assignment_description = $1, due_date = $2, is_published = $4 WHERE id = $3',
            [description, dueDate, assignmentId, published],
            function(err, results) {
                if (err)
                    console.log("Error inserting : %s ",err );
                db.query('UPDATE assignment_student set can_view = $1 WHERE student_id = $2 and assignment_id = $3',
                    [canView, studentId, assignmentId],
                    function(err) {
                        if (err)
                            console.log("Error inserting : %s ",err );
                        teacherDashboard.render(req, res);
                });
         });

    };
