/**
 * Created by n0216698 on 2/3/2017.
 */
var db = require('../db');

var teacherDashboard = {};

teacherDashboard.render = function(req, res) {
    db.query(
        'select' +
        '  c.id as course_id, ' +
        '  c.course_name,  ' +
        '  c.instructor_id, ' +
        '  c.course_code, ' +
         ' c.course_announcements, ' +
        '  ast.id as assignment_id, ' +
        '  ast.assignment_description, ' +
        '  case when ast.is_published = true ' +
        ' then \'Yes\' else \'No\' end as is_published_yes_no, ' +
        '  to_char(ast.due_date, \'Day, Mon DD, YYYY\') as assignment_due_date, ' +
        '  to_char(ast.due_date, \'YYYY-MM-DD\') as date_picker_due_date,' +
        ' ast.is_published as is_published, ' +
        '  i.instructor_name ' +
        ' from course c ' +
        ' join assignment ast on c.id = ast.course_id ' +
        ' join instructor i on c.instructor_id = i.id ' +
        ' order by ast.due_date ',
        function(err, result) {
            console.log(err);
            console.log(result);

            var courses = [];
            var teacher_name = result.rows[0].instructor_name;
            var assignment_due_date_picker = result.rows[0].date_picker_due_date;

            for(var i = 0; i < result.rows.length; i++) {
                courses[result.rows[i].course_id] = {
                    course_id: result.rows[i].course_id,
                    course_code: result.rows[i].course_code,
                    course_name: result.rows[i].course_name,
                    course_announcements: result.rows[i].course_announcements,
                    assignments: []
                };
            }

            for(var i = 0; i < result.rows.length; i++) {
                courses[result.rows[i].course_id].assignments.push({
                    assignment_id: result.rows[i].assignment_id,
                    assignment_description: result.rows[i].assignment_description,
                    assignment_due_date: result.rows[i].assignment_due_date,
                    assignment_due_date_picker: result.rows[i].date_picker_due_date,
                    assignment_published_yes_no: result.rows[i].is_published_yes_no,
                    assignment_published: result.rows[i].is_published}
                );
            }
            
            res.render('teacherDashboard', {
                courses: courses,
                teacher_name : teacher_name
            });
        });
};

module.exports = teacherDashboard;
