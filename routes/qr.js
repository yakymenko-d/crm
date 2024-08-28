const express = require('express');
const controller = require('../controllers/qr');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), controller.getQrCodes)
router.post('/', passport.authenticate('jwt', {session: false}), controller.addNewQrCodes)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.removeQrCode)


module.exports = router;