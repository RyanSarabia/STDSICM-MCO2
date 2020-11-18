const User = require('../model/user.model');
const passport = require('../../node_modules/passport');
// const mongoose = require('../../node_modules/mongoose');

exports.signin = passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'],
  hostedDomain: 'dlsu.edu.ph',
});

exports.callback = passport.authenticate('google', {
  failureRedirect: '/login',
});

exports.callbackSuccess = async function callbackSuccess(req, res) {
  req.session.token = req.user.token;

  await User.findOneAndUpdate(
    { email: req.session.passport.user.profile.emails[0].value },
    { dpURL: req.session.passport.user.profile.photos[0].value },
  );
  const { token } = req.user;
  res.redirect(`http://localhost:3000?token=${token}`);
};

exports.getRegister = async function getRegister(req, res) {
  console.log(req.session.passport.user.profile.emails[0].value);
  const user = await User.findOne({ email: req.session.passport.user.profile.emails[0].value });
  if (user == null) {
    const newUser = {
      email: req.session.passport.user.profile.emails[0].value,
      firstName: req.session.passport.user.profile.name.givenName,
      lastName: req.session.passprt.user.profile.name.familyName,
      dpURL: req.session.passport.user.profile.photos[0].value,
    };

    res.send(newUser);
  } else {
    res.redirect('/login');
  }
};

exports.postRegister = async function postRegister(req, res) {
  console.log('post register');
  // add if-else for contact validation
  const newUser = new User({
    email: req.session.passport.user.profile.emails[0].value,
    firstName: req.session.passport.user.profile.name.givenName,
    lastName: req.session.passport.user.profile.name.familyName,
    dpURL: req.session.passport.user.profile.photos[0].value,
    contactNum: req.body.contactNum,
    bio: req.body.bio,
  });

  await newUser.save()
    .then(() => res.json('User added!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};
