const User = require('../model/user.model');
const Auction = require('../model/auction.model');

exports.getAuction = async function getAuction(req, res) {
  const user = await User.findOne({ email: req.session.passport.user.profile.emails[0].value });
  if (user && req.query.id) {
    console.log(res);
  }
};

exports.getID = async function getID(req, res) {
  try {
    const auction = await Auction.findOne({ _id: req.query.id });

    if (auction) {
      // eslint-disable-next-line no-underscore-dangle
      res.send(auction._id);
    }
  } catch (e) {
    console.log(e);
  }
};
