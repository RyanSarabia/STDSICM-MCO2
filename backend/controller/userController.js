const User = require('../model/user.model');
const Auction = require('../model/auction.model');

exports.getAuction = async function getAuction(req, res) {
  try {
    const user = await User.findOne({ email: req.session.passport.user.profile.emails[0].value });
    if (user && req.query.id) {
      const auction = await Auction.findOne({ _id: req.query.id });
      if (auction) {
        const foundAuction = {
          title: auction.title,
          description: auction.description,
          startprice: auction.startPrice,
          cutoff: auction.cutoffdate,
          postdate: auction.postdate,
          startPrice: auction.startPrice,
          increment: auction.incPrice,
          currentPrice: auction.currentPrice,
          stealPrice: auction.stealPrice,
          imageurl: auction.photo,
        };
        res.send(foundAuction);
      }
    } else res.redirect('/explore');
  } catch (e) {
    console.log(e);
  }
};

exports.getAllAuction = async function getAllAuction(req, res) {
  const input = req.query.search;
  console.log(input);
  if (input) {
    try {
      const user = await User.findOne({ email: req.session.passport.user.profile.emails[0].value });
      if (user) {
        Auction.find({ title: { $regex: input } })
          .sort({ postdate: -1 })
          .exec(function findAuction(err, results) {
            if (err) throw err;

            if (results) {
              res.send(results);
            } else {
              res.send('No results');
            }
          });
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      const user = await User.findOne({ email: req.session.passport.user.profile.emails[0].value });
      if (user) {
        await Auction.find({})
          .sort({ postdate: -1 })
          .exec(function allAuction(err, results) {
            if (err) throw err;

            res.send(results);
          });
      } else res.redirect('/explore');
    } catch (e) {
      console.log(e);
    }
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

exports.getSearch = async function getSearch(req, res) {
  const input = req.query.search;
  try {
    Auction.find({ title: { $regex: input } })
      .sort({ postdate: -1 })
      .exec(function findAuction(err, results) {
        if (err) throw err;

        if (results) {
          res.send(results);
        } else {
          res.send('No results');
        }
      });
  } catch (e) {
    console.log(e);
  }
};
