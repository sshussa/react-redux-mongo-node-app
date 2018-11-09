var mongoose = require('mongoose');
var passport = require('passport');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/User.js");
var Token = require("../models/Token.js");

router.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var user = new User({
      userfirstname: req.body.userfirstname,
      userlastname: req.body.userlastname,
      username: req.body.username,
      password: req.body.password,
      userlocation: req.body.userlocation,
      userrate: req.body.userrate
    });
    // save the user
    user.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
       // Create a verification token for this user
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the verification token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the email
            var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'timeportal.admn@gmail.com', pass: 'timeportaladmin123' } });
            var mailOptions = { from: 'timeportal.admn@gmail.com', to: user.username, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttps:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.username + '.');
            });
        });
    });
  }
});


router.post('/login', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
          var token = jwt.sign(user.toJSON(), settings.secret);
          var userDetails= user.userfirstname;
          var userrate= user.userrate;
          var userlocation= user.userlocation;
          var username= user.username;
        
            if (!isMatch) return res.status(401).send({ msg: 'Invalid email or password' });
 
            // Make sure the user has been verified
            if (!user.isVerified) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' }); 
 
            // Login successful, write token, and send back user
            res.json({success: true, token: 'JWT ' + token, userDetails:userDetails, userrate:userrate, username:username,userlocation:userlocation});
      });
    }
  });
});


router.post('/confirmation', function(req, res, next) {
    
    // Find a matching token
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    });
});


router.post('/resend', function(req, res, next) {
 
    User.findOne({ username: req.body.username }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });
 
        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the email
            var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'timeportal.admn@gmail.com', pass: 'timeportaladmin123' } });
            var mailOptions = { from: 'timeportal.admn@gmail.com', to: user.username, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttps:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.username + '.');
            });
        });
 
    });
});


router.post('/forgot', function(req, res, next) {
 
    User.findOne({ username: req.body.username }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        // Create a verification token, save it, and send email
         var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour

        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the email
            var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'timeportal.admn@gmail.com', pass: 'timeportaladmin123' } });
            var mailOptions = { from: 'timeportal.admn@gmail.com', to: user.username, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttps:\/\/' + req.headers.host + '\/reset\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.username + '.');
            });
        });
 
    });
});

router.post('/reset', function(req, res, next) {
    
    // Find a matching token
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            // Verify and save the password
           user.password = req.body.password;
           user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send("Success! Your password has been changed");
            });
        });
    });
});


module.exports = router;
