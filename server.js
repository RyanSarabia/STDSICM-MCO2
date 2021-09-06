/* eslint-disable no-underscore-dangle */
/* eslint-disable no-case-declarations */
const port = process.env.PORT || 5000;
const path = require('path');
const mongoose = require('./node_modules/mongoose');
const bodyParser = require('./node_modules/body-parser');
const express = require('./node_modules/express');
const dotenv = require('./node_modules/dotenv');
const passport = require('./node_modules/passport/lib');

dotenv.config();

const cors = require('./node_modules/cors');

const app = express();

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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport
app.use(passport.initialize());
require('./backend/config/passport');

// express static
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(`${__dirname}/build`)));

  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/build/index.html`));
  });
}

// Cookies and sessions
const cookieParser = require('./node_modules/cookie-parser');
const cookieSession = require('./node_modules/cookie-session');

// Socket IO
// eslint-disable-next-line import/order
const server = require('http').createServer(app);
const io = require('./node_modules/socket.io')(server, {
  cors: {
    origin: 'https://lasell-sharp.herokuapp.com',
    methods: ['GET', 'POST'],
  },
});

server.listen(process.env.SOCKET_PORT);

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
  res.set('Cache-Control', 'no-store');
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

// async function getHighestBidder(auctionId) {
//   let highestbidderEmail = null;
//   try {
//     const auction = await Auction.findOne({ _id: auctionId }).populate('highestbidder');
//     if (auction) {
//       highestbidderEmail = auction.highestbidder.email;
//     }
//   } catch (e) {
//     console.log(e);
//   }
//   return highestbidderEmail;
// }

const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');

  // socket io stuff
  const auctionChangeStream = connection
    .collection('auctions')
    .watch([], { fullDocument: 'updateLookup' });

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
        const highestBidderId = change.fullDocument.highestbidder;
        const auctionId = change.documentKey._id;
        const updateData = {
          highestBidderId,
          auctionId,
        };

        io.of('/socket').emit('updateAuction', updateData);
        break;
      default:
        break;
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
