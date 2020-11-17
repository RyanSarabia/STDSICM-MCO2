const User = require('../model/user.model');

module.exports.userIsLoggedIn = function userIsLoggedIn(req, res, next) {
  if (req.session.token) next();
  else res.redirect('/login');
};

module.exports.userIsNew = function userIsNew(req, res, next) {
  try {
    User.findOne({ email: req.session.passport.user.profile.emails[0].value }, (err, user) => {
      if (err) throw err;
      if (user) {
        next();
      } else {
        res.redirect('/register');
      }
    });
  } catch (error) {
    res.redirect('/404');
  }
};
