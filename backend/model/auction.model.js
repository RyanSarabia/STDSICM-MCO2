const mongoose = require('../../node_modules/mongoose');
const { databaseURL } = require('../config.js');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(databaseURL, options);

const auctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  cutoffdate: { type: String, required: true, default: new Date() },
  postdate: { type: String, required: true, default: new Date() },
  startPrice: { type: Number, required: true },
  incPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  stealPrice: { type: Number, required: true },
  photo: { type: String },
});

module.exports = mongoose.model('Auction', auctionSchema);