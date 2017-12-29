var express = require('express');
var passport = require('passport');

module.exports = function (app) {
    var router = express.Router();
    router.route('/google')
    .get(passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    
    router.route('/google/callback')
    .get(passport.authenticate('google'))
    
    router.route("/api/current_user")
    .get((req, res)=> {
        res.send(req.user);
    });
    
    router.route("/api/logout")
    .get((req, res)=> {
        req.logout();
        res.send(req.user);
    })
   
    return router;
}
