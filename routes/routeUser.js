/**
 * Created by n0216698 on 2/3/2017.
 */

var studentDashboard = require('./studentDashboardView');
var teacherDashboard = require('./teacherDashboardView');

module.exports =
    function displayView(req, res) {

        var user = req.body.role;

        if (user === "professor") {
            teacherDashboard.render(req, res);
        } else if (user === "student") {
            studentDashboard.render(req, res);
        }
    };
