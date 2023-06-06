var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn')

const bagCtrl = require('../controllers/clubs')

// all routes start with /clubs
router.get('/', ensureLoggedIn, bagCtrl.index);
//router.get('/new', ensureLoggedIn, bagCtrl.new )
router.post('/', ensureLoggedIn, bagCtrl.create)

router.get('/:id', ensureLoggedIn, bagCtrl.show)

router.delete('/:id', ensureLoggedIn, bagCtrl.delete)

router.put('/:id', ensureLoggedIn, bagCtrl.update)

module.exports = router;
