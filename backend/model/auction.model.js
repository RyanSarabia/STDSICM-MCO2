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
  cutofftime: { type: String, required: true },
  cutoffdate: { type: String, required: true },
  startprice: { type: Number, required: true },
  incprice: { type: Number, required: true },
  stealprice: { type: Number, required: true },
  photos: [{ url: String }],
});

module.exports = mongoose.model('Auction', auctionSchema);
