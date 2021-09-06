const router = require('../../node_modules/express').Router();
const indexController = require('../controller/indexController');

router.get('/api/auth/google', indexController.signin);
router.get('/api/auth/google/callback', indexController.callback, indexController.callbackSuccess);
router.get('/api/newuser', indexController.getRegister);
router.post('/api/newuser', indexController.postRegister);
router.get('/api/validate', indexController.userIsLoggedIn);
router.get('/api/getID', indexController.getID);
router.get('/api/logout', indexController.logout);
module.exports = router;
