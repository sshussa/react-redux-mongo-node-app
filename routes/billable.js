var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Billable = require('../models/Billable.js');
var passport = require('passport');
require('../config/passport')(passport);

/* GET ALL TIME */
router.get('/billables', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
   Billable.find({}, function(err, billables) {

    if (err)
		res.send(err);
	res.json(billables);

  });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* SAVE TIME */
router.post('/billables', passport.authenticate('jwt', { session: false}), function(req, res, next) {

let billablePostObj = new Billable(
        
        {   
            ESAProject:req.body.row.ESAProject,
            ResID:req.body.row.ResID,
            Name:req.body.row.Name,
            BillableHour:req.body.row.BillableHour,
            LeaveVacationHour:req.body.row.LeaveVacationHour,
            HolidayHour:req.body.row.HolidayHour,
            TotalHour:req.body.row.TotalHour
            
        }
    );
	
 var token = getToken(req.headers);
  if (token) {
	  
	billablePostObj.save(function (err,billables) {
        if (err) 
        res.send(err);
        res.json({billables});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
/* UPDATE*/

router.post('/billableUpdate', passport.authenticate('jwt', { session: false}), function(req, res, next) {
 var token = getToken(req.headers);
  if (token) {
	Billable.updateOne({'_id':mongoose.Types.ObjectId(req.body.row._id)}, {$set:req.body.row}, {upsert: true}, function (err,billables) {
        if (err) return next(err);
		res.json(billables);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/*DELETE*/
router.post('/billableDelete', passport.authenticate('jwt', { session: false}), function(req, res, next) {
var token = getToken(req.headers);
  if (token) {
    var resId=[];
  resId=req.body;
  console.log(resId);
Billable.deleteMany({"ResID": {
 	$in: resId
    }}, function(err, billables) {
     if (err) return next(err);
    res.json(billables);
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
