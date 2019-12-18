const router            = require('express').Router();
const accountController = require('../Controller').user;

router.post('/', accountController.signin) ;
module.exports = router;