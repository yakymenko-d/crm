const express = require('express');
const controller = require('../controllers/settings');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), controller.getSettings)
router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.patch('/:settingsId', passport.authenticate('jwt', {session: false}), controller.update)

module.exports = router;