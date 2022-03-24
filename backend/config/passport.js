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
      clientID: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_SECRET,
      callbackURL: process.env.REACT_APP_GOOGLE_AUTH_CALLBACK_URL,
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
