const router                = require('express').Router();
const accountController     = require('../Controller').user;
router.get('/',accountController.getProfile);
router.post('/signup', accountController.signup);
router.post('/forgot-password', accountController.forgotPassword);

module.exports = router;