/* eslint-disable no-case-declarations */
const port = process.env.PORT || 5000;
const mongoose = require('../node_modules/mongoose');
const express = require('../node_modules/express');
const passport = require('../node_modules/passport');
const bodyParser = require('../node_modules/body-parser');
require('../node_modules/dotenv').config();

const cors = require('../node_modules/cors');

const app = express();

const UserAuth = require('./config/validation');

// routes
const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');

// cloudinary
const cloudinary = require('../node_modules/cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport
app.use(passport.initialize());
require('./config/passport');

// express static
app.use(express.static('client/build'));

// Cookies and sessions
const cookieParser = require('../node_modules/cookie-parser');
const cookieSession = require('../node_modules/cookie-session');

// Socket IO
// eslint-disable-next-line import/order
const server = require('http').createServer(app);
const io = require('../node_modules/socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

server.listen(4000);

io.of('/socket').on('connection', (socket) => {
  console.log('user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

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
app.use('/explore', userRoute);
app.use('/upload', userRoute);
app.use('/create', userRoute);
app.use('/profile', userRoute);
app.use('/auction', userRoute);
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

  // socket io stuff
  const auctionChangeStream = connection.collection('auctions').watch();

  auctionChangeStream.on('change', (change) => {
    switch (change.operationType) {
      case 'insert':
        console.log('saw insert');
        const auction = {
          title: change.fullDocument.title,
          description: change.fullDocument.description,
          cutoffdate: change.fullDocument.cutoffdate,
          postdate: change.fullDocument.postdate,
          startPrice: change.fullDocument.startPrice,
          incPrice: change.fullDocument.incPrice,
          currentPrice: change.fullDocument.currentPrice,
          stealPrice: change.fullDocument.stealPrice,
          photo: change.fullDocument.photo,
          highestbidder: change.fullDocument.highestbidder,
        };
        io.of('/socket').emit('newAuction', auction);
        break;
      case 'update':
        console.log('saw update');
        // eslint-disable-next-line no-underscore-dangle
        const auctionId = change.documentKey._id;
        io.of('/socket').emit('updateAuction', auctionId);
        break;
      default:
        break;
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
