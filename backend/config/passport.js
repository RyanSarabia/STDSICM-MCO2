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
      clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
      callbackURL: 'https://lasell-sharp.herokuapp.com/api/auth/google/callback',
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
