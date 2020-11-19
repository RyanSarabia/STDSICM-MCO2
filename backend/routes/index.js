const router = require('../../node_modules/express').Router();
const indexController = require('../controller/indexController');

router.get('/auth/google', indexController.signin);
router.get('/auth/google/callback', indexController.callback, indexController.callbackSuccess);
router.get('/register', indexController.getRegister);
router.post('/register', indexController.postRegister);

router.get('/logout', indexController.logout);
module.exports = router;
