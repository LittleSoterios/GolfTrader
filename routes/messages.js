var express = require('express');
var router = express.Router();
const passport = require('passport');
const ensureLoggedIn = require('../config/ensureLoggedIn')
const MsgCtrl = require('../controllers/messages')


router.get('/', ensureLoggedIn, MsgCtrl.index)
router.get('/:id', ensureLoggedIn, MsgCtrl.show)
router.put('/:id', ensureLoggedIn, MsgCtrl.update)






module.exports = router;
