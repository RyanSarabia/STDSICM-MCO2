/* eslint-disable func-names */
const path = require('path');

// Cookies and sessions

const cookieParser = require('./node_modules/cookie-parser');
const cookieSession = require('./node_modules/cookie-session');

// const mongoose = require('./node_modules/mongoose');
const dotenv = require('./node_modules/dotenv');
const express = require('./node_modules/express');
const passport = require('./node_modules/passport/lib');
const bodyParser = require('./node_modules/body-parser');

dotenv.config();

const cors = require('./node_modules/cors');

const app = express();
// const port = process.env.PORT || 5000;

const UserAuth = require('./backend/config/validation');

// routes
const indexRoute = require('./backend/routes/index');
const userRoute = require('./backend/routes/user');

// cloudinary
const cloudinary = require('./node_modules/cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const { createProxyMiddleware } = require('./node_modules/http-proxy-middleware');

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport
app.use(passport.initialize());
require('./backend/config/passport');

// express static
// app.use(express.static('/build'));

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

// to run react app
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/build/index.html`));
  });
}

app.use('/', indexRoute);
app.use('/register', UserAuth.userIsLoggedIn, UserAuth.userIsNew, indexRoute);
app.use('/explore', userRoute);
app.use('/upload', userRoute);
app.use('/create', userRoute);
app.use('/profile', userRoute);
app.use('/auction', userRoute);
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://localhost:5000',
    secure: false,
    changeOrigin: true,
  })
);

// mongoose.connect(process.env.ATLAS_URI);

// // When successfully connected
// mongoose.connection.on('connected', () => {
//   console.log('Established Mongoose Default Connection');
// });

// // When connection throws an error
// mongoose.connection.on('error', (err) => {
//   console.log(`Mongoose Default Connection Error : ${err}`);
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
