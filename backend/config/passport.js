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
      clientID: '566380691468-ur49vuf9v71l7juso330av435mttobgk.apps.googleusercontent.com',
      clientSecret: '0d1Dr1wYejWhyw9e2NhbOOZr',
      callbackURL: 'http://localhost:5000/auth/google/callback',
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