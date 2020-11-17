const User = require('../model/user.model');
const passport = require('../../node_modules/passport');
// const mongoose = require('../../node_modules/mongoose');

exports.signin = passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'],
  hostedDomain: 'dlsu.edu.ph',
});

exports.callback = passport.authenticate('google', {
  failureRedirect: '/',
});

exports.callbackSuccess = async function callbackSuccess(req, res) {
  req.session.token = req.user.token;

  await User.findOneAndUpdate(
    { email: req.session.passport.user.profile.emails[0].value },
    { dpURL: req.session.passport.user.profile.photos[0].value },
  );
  res.redirect('/verified');
};

exports.getRegister = async function getRegister(req, res) {
  console.log(req.session.passport.user.profile.photos[0].value);
  const user = await User.findOne({ email: req.session.passport.user.profile.emails[0].value });
  if (user == null) {
    res.render('register', {
      title: 'Register',
      email: req.session.passport.user.profile.emails[0].value,
      firstName: req.session.passport.user.profile.name.givenName,
      lastName: req.session.passport.user.profile.name.familyName,
    });
  } else {
    res.redirect('/verified');
  }
};

// exports.register_post = async function (req, res) {
//   try {
//     let errors = validationResult(req);

//     if (errors.isEmpty()) {
//       console.log('insde error.isEmpty()');
//       const sameContactNum = await User.countDocuments({ contactNum: req.body.phone });
//       if (sameContactNum === 0) {
//         let user = new User({
//           firstName: req.session.passport.user.profile.name.givenName,
//           lastName: req.session.passport.user.profile.name.familyName,
//           email: req.session.passport.user.profile.emails[0].value,
//           contactNum: req.body.phone,
//           dpURL: req.session.passport.user.profile.photos[0].value,
//         });

//         user = await user.save();

//         req.session.idNum = user.idNum;
//         req.session.isAdmin = user.isAdmin;
//         req.session.verified = user.verified;
//         req.session.isMonitoringAttendance = false;

//         res.redirect('/member');
//       } else {
//         if (sameIDNum > 0) errorLabels.idNumError = 'ID number already taken.';
//         if (sameContactNum > 0) errorLabels.phoneError = 'Phone number already taken.';
//         res.render('register', {
//           title: 'Register',
//           errLabels: errorLabels,
//           email: req.session.passport.user.profile.emails[0].value,
//           firstName: req.session.passport.user.profile.name.givenName,
//           lastName: req.session.passport.user.profile.name.familyName,
//         });
//       }
//     } else {
//       errors = errors.errors;
//       console.log(errors);
//       var errorLabels = {};
//       for (i = 0; i < errors.length; i++) errorLabels[`${errors[i].param}Error`] = errors[i].msg;

//       res.render('register', {
//         title: 'Register',
//         errLabels: errorLabels,
//         email: req.session.passport.user.profile.emails[0].value,
//         firstName: req.session.passport.user.profile.name.givenName,
//         lastName: req.session.passport.user.profile.name.familyName,
//       });
//     }
//   } catch (err) {
//     console.log(`Error writing to db: ${err}`);
//     res.redirect('/member');
//   }
// };
