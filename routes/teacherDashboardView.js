/**
 * Created by n0216698 on 2/3/2017.
 */
var db = require('../db');

var teacherDashboard = {};

teacherDashboard.render = function(req, res) {
    db.query('', function(err, result) {
        res.render('teacherDashboard', {
            data: result.rows
        });
    });
}

module.exports = teacherDashboard;
