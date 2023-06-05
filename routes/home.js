var express = require('express');
var router = express.Router();
const passport = require('passport');
const ensureLoggedIn = require('../config/ensureLoggedIn')
const HomeCtrl = require('../controllers/home')


router.get('/', HomeCtrl.index)

router.get('/:id', HomeCtrl.show)



module.exports = router;
