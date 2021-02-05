const User = require('../model/user.model');
const passport = require('../../node_modules/passport');

exports.signin = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
  // hostedDomain: 'dlsu.edu.ph',
});

exports.callback = passport.authenticate('google', {
  failureRedirect: '/login',
});

exports.callbackSuccess = async function callbackSuccess(req, res) {
  try {
    req.session.token = req.user.token;
    const user = await User.findOne({ email: req.session.passport.user.profile.emails[0].value });
    if (user) {
      res.redirect('http://localhost:3000/explore');
    } else {
      const { token } = req.user;
      res.redirect(`http://localhost:3000/register?token=${token}`);
    }
  } catch (e) {
    console.log(e);
  }
};

exports.getRegister = async function getRegister(req, res) {
  try {
    const user = await User.findOne({ email: req.session.passport.user.profile.emails[0].value });
    if (user == null) {
      const newUser = {
        email: req.session.passport.user.profile.emails[0].value,
        firstName: req.session.passport.user.profile.name.givenName,
        lastName: req.session.passport.user.profile.name.familyName,
        dpURL: req.session.passport.user.profile.photos[0].value,
      };

      res.send(newUser);
    } else {
      res.redirect('/login');
    }
  } catch (e) {
    console.log(e);
  }
};

exports.postRegister = async function postRegister(req, res) {
  const sameEmail = await User.countDocuments({ email: req.body.email });
  try {
    if (sameEmail === 0) {
      const newUser = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dpURL: req.body.dpURL,
        contactNum: req.body.contact,
        bio: req.body.bio,
      });
      await newUser
        .save()
        .then(() => res.json('User Added!'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    } else res.redirect('/register');
  } catch (e) {
    console.log(e);
  }
};

exports.userIsLoggedIn = function userIsLoggedIn(req, res) {
  if (req.session.token) {
    res.send('Has Session');
  } else {
    res.send('No Session');
  }
};

exports.logout = function logout(req, res) {
  if (req.session.token) {
    req.logout();
    req.session = null;
    res.send('success');
  }
  res.redirect('/login');
};

exports.getID = async function getID(req, res) {
  try {
    const user = await User.findOne({ email: req.session.passport.user.profile.emails[0].value });

    if (user) {
      // eslint-disable-next-line no-underscore-dangle
      res.send(user._id);
    }
  } catch (e) {
    console.log(e);
  }
};
