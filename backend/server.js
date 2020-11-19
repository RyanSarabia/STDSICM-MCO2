const mongoose = require('../node_modules/mongoose');
const express = require('../node_modules/express');
const passport = require('../node_modules/passport');
// const { createProxyMiddleware } = require('../node_modules/http-proxy-middleware');
require('../node_modules/dotenv').config();

const cors = require('../node_modules/cors');

const app = express();
const port = process.env.PORT || 5000;

const UserAuth = require('./config/validation');

// routes
const indexRoute = require('./routes/index');

app.use(cors());
app.use(express.json());

// passport
app.use(passport.initialize());
require('./config/passport');

// express static
app.use(express.static('client/build'));

// Cookies and sessions
const cookieParser = require('../node_modules/cookie-parser');
const cookieSession = require('../node_modules/cookie-session');

app.use(
  cookieSession({
    name: 'session',
    keys: ['lasell'],
  })
);
app.use(cookieParser());

// path tracker middleware
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use('/', indexRoute);
app.use('/register', UserAuth.userIsLoggedIn, UserAuth.userIsNew, indexRoute);
// app.use(
//   '/api',
//   createProxyMiddleware({
//     target: 'https://localhost:5000',
//     secure: false,
//     changeOrigin: true,
//   }),
// );
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
