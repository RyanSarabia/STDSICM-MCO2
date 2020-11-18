const router = require('../../node_modules/express').Router();
const passport = require('../../node_modules/passport');
const indexController = require('../controller/indexController');

router.get('/auth/google', indexController.signin);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const { token } = req.user;
    res.redirect(`http://localhost:3000/register?token=${token}`);
  },
);
router.get('/register', indexController.getRegister);
router.post('/register', indexController.postRegister);
module.exports = router;
