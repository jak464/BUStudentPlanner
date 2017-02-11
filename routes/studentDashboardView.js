/**
 * Created by n0216698 on 2/3/2017.
 */
var db = require('../db');

var studentDashboard = {};

studentDashboard.render = function(req, res) {
    db.query('select' +
        '  c.id as course_id,' +
        '  c.course_name,' +
        '  c.instructor_id,' +
        '  c.course_code,' +
        '  asg.id as assignment_id,' +
        '  asg.assignment_description,' +
        '  to_char(asg.due_date, \'Day Mon DD, YYYY\')  as assignment_due_date, ' +
        '   case when ast.is_completed = true then \'Yes\' else \'No\' end as assignment_is_completed_yes_no,' +
        '  ast.is_completed as assignment_is_completed, ' +
        '  ast.comments, ' +
        '  s.id as student_id, ' +
        '  s.student_name ' +
        ' from student s' +
        ' left join course_student cs on s.id = cs.student_id' +
        ' left join course c on c.id = cs.course_id' +
        ' left join "assignment" asg on asg.course_id = cs.course_id' +
        ' left join assignment_student ast on ast.assignment_id = asg.id and ast.student_id = s.id ' +
        ' where ast.can_view = true ' +
        ' order by asg.due_date',
        function(err, result) {
            console.log(err);
            console.log(result);

            var courses = [];
            var student_name = result.rows[0].student_name;

            for(var i = 0; i < result.rows.length; i++) {
               courses[result.rows[i].course_id] = {
                   course_id: result.rows[i].course_id,
                   course_code: result.rows[i].course_code,
                   course_name: result.rows[i].course_name,
                   assignments: []
               };
            }

            for(var i = 0; i < result.rows.length; i++) {
                courses[result.rows[i].course_id].assignments.push({
                    assignment_id: result.rows[i].assignment_id,
                    assignment_description: result.rows[i].assignment_description,
                    assignment_due_date: result.rows[i].assignment_due_date,
                    assignment_is_completed: result.rows[i].assignment_is_completed,
                    assignment_is_completed_yes_no: result.rows[i].assignment_is_completed_yes_no,
                    assignment_comments: result.rows[i].comments,
                    student_id: result.rows[i].student_id,
                    student_name: result.rows[i].student_name}
                );
            }

            res.render('studentDashboard', {
                courses: courses,
                student_name: student_name
            });
    });
};

module.exports = studentDashboard;
