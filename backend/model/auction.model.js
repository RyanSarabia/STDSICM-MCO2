const mongoose = require('../../node_modules/mongoose');
const { databaseURL } = require('../config.js');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(databaseURL, options);
mongoose.set('useCreateIndex', true);

const auctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  cutoffdate: { type: Date, required: true, default: new Date() },
  postdate: { type: Date, required: true, default: new Date() },
  startPrice: { type: Number, required: true },
  incPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  stealPrice: { type: Number, required: true },
  photo: { type: String },
  highestbidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
});

auctionSchema.index({ title: 'text' });
module.exports = mongoose.model('Auction', auctionSchema);
