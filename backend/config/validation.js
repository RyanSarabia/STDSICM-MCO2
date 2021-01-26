const User = require('../model/user.model');

module.exports.userIsLoggedIn = function userIsLoggedIn(req, res, next) {
  console.log('userIsLoggedIn');
  if (req.session.token) {
    console.log('session');
    next();
  } else {
    console.log('no session');
    res.redirect('/login');
  }
};

module.exports.userIsNew = function userIsNew(req, res, next) {
  console.log('userAuth.userIsNew');
  try {
    User.findOne({ email: req.session.passport.user.profile.emails[0].value }, (err, user) => {
      if (err) throw err;
      if (user) {
        console.log('userisnew user found');
        next();
      } else {
        console.log('useris new');
        res.redirect('/register/api/newuser');
      }
    });
  } catch (error) {
    res.redirect('/404');
  }
};
