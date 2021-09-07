const passport = require('../../node_modules/passport');
const GoogleStrategy = require('../../node_modules/passport-google-oauth').OAuth2Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: '276325560458-bhdrtn5e72d2t1jf8puhqfdcol18dvhd.apps.googleusercontent.com',
      clientSecret: 'hym1clsI47pSwqMvNuVX4Zi1',
      callbackURL: 'https://localhost:5000/api/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      const userData = {
        profile,
        token: accessToken,
      };
      done(null, userData);
    }
  )
);
