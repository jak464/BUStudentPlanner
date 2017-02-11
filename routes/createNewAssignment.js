/**
 * Created by n0216698 on 2/9/2017.
 */
var db = require('../db');
var teacherDashboard = require('./teacherDashboardView');


module.exports =
    function createNewAssignment(req , res){
        var courseId = req.params.courseId;
        var description = req.body.description;
        var dueDate = req.body.dueDate;
        var published = req.body.published;
        var canView;
        var studentId = 1;
        
        if (typeof published != 'undefined'){
            if(published) {
                published = true;
                canView = true;
            }
        }
        else {
            published = false;
            canView = false;
        }


        db.connect().then(function(client) {
            client.query('INSERT into assignment(assignment_description, due_date, is_published, course_id) VALUES($1, $2, $3, $4) returning id',
                [description, dueDate, published, courseId])
                .on('row', function(row) {
                    client.query('INSERT into assignment_student(student_id, can_view, assignment_id) VALUES($1, $2, $3)',
                        [studentId, canView, row.id],
                        function(err) {
                            if (err)
                                console.log("Error inserting : %s ",err );
                            client.release();
                            teacherDashboard.render(req, res);
                        });
                });

        })
        .catch(function(e) {
            client.release();
         });



    };
