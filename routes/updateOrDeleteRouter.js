/**
 * Created by n0216698 on 2/9/2017.
 */

var db = require('../db');
var updateAssignment = require('./updateAssignment');
var deleteAssignment = require('./deleteAssignment');

module.exports =
    function routeToUpdateOrDelete(req , res){
        var updateOrDelete = req.body.updateDelete;
        console.log('updateOrDelete ' + updateOrDelete);

        if (updateOrDelete === "update") {
            updateAssignment(req, res);
        } else if (updateOrDelete === "delete") {
            deleteAssignment(req, res);
        }
    };
