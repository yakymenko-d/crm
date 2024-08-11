const express = require('express');
const controller = require('../controllers/profile');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), controller.getByUserId)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update)

module.exports = router;