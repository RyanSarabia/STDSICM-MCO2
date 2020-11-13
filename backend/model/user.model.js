const mongoose = require('mongoose');
const { databaseURL } = require('../config.js');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(databaseURL, options);
connect(databaseURL, options);

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  contactNum: { type: Number, required: true },
  isverified:{ type: Boolean, default: false }
});

export default model('User', userSchema);
