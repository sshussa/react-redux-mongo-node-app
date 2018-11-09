var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Time = require('../models/Time.js');
var passport = require('passport');
require('../config/passport')(passport);

/* GET ALL TIME */
router.get('/timesheets', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
   Time.find({}, function(err, timesheets) {

    if (err)
		res.send(err);
	res.json(timesheets);

  });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* SAVE TIME */
router.post('/timesheets', passport.authenticate('jwt', { session: false}), function(req, res, next) {

let timePostObj = new Time(
        
        {   
            userDetail:req.body.row.userDetail,
            Rate:req.body.row.Rate,
            EmpId:req.body.row.EmpId,
            Hours:req.body.row.Hours,
            Notes:req.body.row.Notes,
            Phase:req.body.row.Phase,
            ProjectID:req.body.row.ProjectID,
            ProjectName:req.body.row.ProjectName,
            ResourceOwner: req.body.row.ResourceOwner,
            ResourceName: req.body.row.ResourceName,
            Weeks:req.body.row.Weeks           
        }
    );
	
 var token = getToken(req.headers);
  if (token) {
	  
	timePostObj.save(function (err,timesheets) {
        if (err) 
        res.send(err);
        res.json({timesheets});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
/* UPDATE*/

router.post('/timeUpdate', passport.authenticate('jwt', { session: false}), function(req, res, next) {
 var token = getToken(req.headers);
  if (token) {
	Time.updateOne({'_id':mongoose.Types.ObjectId(req.body.row._id)}, {$set:req.body.row}, {upsert: true}, function (err,timesheets) {
        if (err) return next(err);
		res.json(timesheets);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/*DELETE*/
router.post('/timeDelete', passport.authenticate('jwt', { session: false}), function(req, res, next) {
 var token = getToken(req.headers);
  if (token) {
  var arrId=[];
  arrId=req.body;
Time.deleteMany({"EmpId": {
 	$in: arrId
    }}, function(err, timesheets) {
     if (err) return next(err);
    res.json(timesheets);
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
