const mongoose = require('../../node_modules/mongoose');
const { databaseURL } = require('../config.js');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(databaseURL, options);

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  contactNum: { type: Number, required: true },
  bio: { type: String, required: false, default: '' },
  dpURL: { type: String, required: true },
  auctions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Auction', default: null }],
});

module.exports = mongoose.model('User', userSchema);
