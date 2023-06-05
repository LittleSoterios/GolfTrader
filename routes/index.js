var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/home')
});

router.get('/auth/google', passport.authenticate(
  'google', {
    scope: ['profile', 'email']
  }
))

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    // change to what's best for your page "potentially to landing page v"
    failureRedirect: '/404'
  }
))

router.get('/logout', function(req, res){
  req.logout(function(){
    // change path to landing page
    res.redirect('/')
  })
})

router.post('/upload', function(req, res){
  console.log(req.files, typeof(req.files))
})



module.exports = router;