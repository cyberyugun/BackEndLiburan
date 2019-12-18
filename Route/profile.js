const router = require('express').Router();
const accountController = require('../Controller').user;
router.get('/', accountController.getProfile);

module.exports = router;