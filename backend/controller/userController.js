const User = require('../model/user.model');
const Auction = require('../model/auction.model');

exports.getOwner = async function getOwner(req, res) {
  try {
    const auction = req.params.auctionid;
    const user = await User.findOne({ auctions: auction });
    if (user) {
      res.send(user);
    } else res.redirect('/explore');
  } catch (e) {
    console.log(e);
  }
};
exports.getAuction = async function getAuction(req, res) {
  try {
    const user = await User.findOne({ email: req.session.passport.user.profile.emails[0].value });
    if (user && req.params.auctionid) {
      const auction = await Auction.findOne({ _id: req.params.auctionid }).populate(
        'highestbidder'
      );
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
          highestbidder: auction.highestbidder,
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
  const pageNum = req.query.page;
  const itemsPerPage = 10;

  if (input) {
    try {
      const user = await User.findOne({ email: req.session.passport.user.profile.emails[0].value });
      if (user) {
        const count = await Auction.find({
          title: { $regex: input, $options: 'i' },
        }).countDocuments();
        Auction.find({ title: { $regex: input, $options: 'i' } })
          .sort({ postdate: -1 })
          .skip((pageNum - 1) * itemsPerPage)
          .limit(itemsPerPage)
          .exec(function findAuction(err, results) {
            if (err) throw err;

            if (results) {
              const result = {
                count,
                auctions: results,
              };
              console.log(count);
              res.send(result);
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
        const count = await Auction.find({}).countDocuments();
        await Auction.find({})
          .sort({ postdate: -1 })
          .skip((pageNum - 1) * itemsPerPage)
          .limit(itemsPerPage)
          .exec(function allAuction(err, results) {
            if (err) throw err;
            const result = {
              count,
              auctions: results,
            };
            console.log(count);
            res.send(result);
          });
      } else res.redirect('/explore');
    } catch (e) {
      console.log(e);
    }
  }
};

exports.postAuctionAction = async function postAuctionAction(req, res) {
  try {
    const { action } = req.params;
    const bidPrice = req.query.bid;

    const user = await User.findOne({ email: req.session.passport.user.profile.emails[0].value });
    if (user) {
      const auction = Auction.findOne({ _id: req.params.auctionid });

      if (auction) {
        if (action === 'bid') {
          if (bidPrice % auction.incPrice === 0) {
            auction.currentPrice =
              auction.currentPrice + bidPrice >= auction.stealPrice
                ? auction.stealPrice
                : auction.currentPrice + bidPrice;
          }
        } else if (action === 'steal') {
          auction.currentPrice = auction.stealPrice;
        }

        auction.highestbidder = req.user;

        await auction
          .save()
          .then(() => res.json('Auction Updated!'))
          .catch((err1) => res.status(400).json(`Error: ${err1}`));
      } else {
        res.send('No action');
      }
    }
  } catch (e) {
    console.log(e);
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

exports.getUser = async function getUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.userid });
    const currUser = await User.findOne({
      email: req.session.passport.user.profile.emails[0].value,
    });
    let isCurrUser = 0;
    if (user) {
      if (user.email === currUser.email) isCurrUser = 1;
      const userInfo = {
        user,
        isCurrUser,
      };
      res.send(userInfo);
    } else {
      res.send('No Results');
    }
  } catch (e) {
    console.log(e);
  }
};
