/**
 * Created by n0216698 on 2/17/2017.
 */

var db = require('../db');
var studentSettings = require('./studentSettingsView');


module.exports =
    function updateStudentSettings(req , res){
        var notifications = req.body.notifications;
        var emailAddress = req.body.emailAddress;

        if (typeof notifications != 'undefined') {
            notifications = true;
        } else  {
            notifications = false;
        }
        
        var studentId = 1;

        db.query('UPDATE student set email_address = $1, notifications = $2 WHERE id = $3',
            [emailAddress, notifications, studentId],
            function(err, results) {
                if (err)
                    console.log("Error inserting : %s ",err );
                studentSettings.render(req, res);
        });

    };
