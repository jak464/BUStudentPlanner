/**
 * Created by n0216698 on 2/3/2017.
 */
var db = require('../db');

var studentSettings = {};

studentSettings.render = function(req, res) {
    db.query('select' +
      ' c.id as course_id, ' +
      ' c.course_name, ' +
      ' c.instructor_id, ' +
      ' c.course_code, ' +
      ' i.instructor_name ' +
      ' from student s ' +
      ' left join course_student cs on s.id = cs.student_id ' +
      ' left join course c on c.id = cs.course_id ' +
      ' left join instructor i on c.instructor_id = i.id ' +
      ' where cs.is_subscribed = false ',
        function(err, result) {
            if (err) {
                console.log(err);
            }

            var courses = [];
            var studentId = 1;

            for(var i = 0; i < result.rows.length; i++) {
                courses[result.rows[i].course_id] = {
                    course_id: result.rows[i].course_id,
                    course_code: result.rows[i].course_code,
                    course_name: result.rows[i].course_name,
                    instructor_name: result.rows[i].instructor_name
                };
            }

            db.query('select ' +
            ' id, ' +
            ' email_address, ' +
            ' notifications ' +
            ' FROM student where id = $1',
                [studentId],
                function(err, row) {
                    if (err)
                        console.log("Error inserting : %s ",err );

                    var email_address = row.rows[0].email_address;
                    var notifications = row.rows[0].notifications;

                    res.render('studentSettings', {
                        courses: courses,
                        email_address: email_address,
                        notifications: notifications
                    });
                });


        });
};

module.exports = studentSettings;
