const mongoose = require('../node_modules/mongoose');
const express = require('../node_modules/express');
const passport = require('../node_modules/passport');
require('../node_modules/dotenv').config();

const cors = require('../node_modules/cors');

const app = express();
const port = process.env.PORT || 5000;

const UserAuth = require('./config/validation');

// routes
const index = require('./routes/index');

// Cookies and sessions
const cookieParser = require('../node_modules/cookie-parser');
const cookieSession = require('../node_modules/cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['lasell2'],
}));
app.use(cookieParser());

app.use(cors());
app.use(express.json());

// passport
app.use(passport.initialize());
require('./config/passport');

app.use(express.static('client/build'));

app.use('/', index);
app.use('/register', UserAuth.userIsLoggedIn, index);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
