const User = require('../model/user.model');
const Auction = require('../model/auction.model');

exports.getOwner = async function getOwner(req, res) {
  try {
    const auction = req.params.auctionid;
    const user = await User.findOne({ auctions: auction });
    const currUser = await User.findOne({
      email: req.session.passport.user.profile.emails[0].value,
    });
    let isCurrUser = 0;

    if (user) {
      if (user.email === currUser.email) {
        isCurrUser = 1;
      }
      const userInfo = {
        user,
        isCurrUser,
      };
      res.send(userInfo);
    } else res.redirect('/auction/auction');
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
    const postaction = req.params.action;
    const postid = req.params.auctionid;
    // eslint-disable-next-line radix
    const bidPrice = parseInt(req.query.bid);

    const user = await User.findOne({ email: req.session.passport.user.profile.emails[0].value });
    if (user) {
      const auction = await Auction.findOne({ _id: postid });

      if (auction) {
        if (postaction === 'bid') {
          if (bidPrice % auction.incPrice === 0) {
            console.log('bid!!!');
            const tempCurrPrice = bidPrice;

            if (tempCurrPrice < auction.stealPrice) {
              auction.currentPrice = tempCurrPrice;
            } else if (tempCurrPrice >= auction.stealPrice) {
              auction.currentPrice = auction.stealPrice;
            }
          }
        } else if (postaction === 'steal') {
          auction.currentPrice = auction.stealPrice;
        }

        auction.highestbidder = user;
        console.log(auction.highestbidder);
        console.log(auction.currentPrice);

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
    const user = await User.findOne({ _id: req.params.userid }).populate('auctions');

    if (user) {
      res.send(user);
    } else {
      res.send('No Results');
    }
  } catch (e) {
    console.log(e);
  }
};

exports.postProfile = async function postProfile(req, res) {
  try {
    const user = await User.findOne({
      email: req.session.passport.user.profile.emails[0].value,
    }).populate('auctions');
    const newBio = req.body.bio;
    const newContact = req.body.contact;

    if (user) {
      if (newBio) {
        user.bio = newBio;
      }
      if (newContact) {
        user.contactNum = newContact;
      }
      const updatedUser = await user.save();
      console.log(updatedUser);
      res.send(updatedUser);
    } else {
      res.send('User not Edited');
    }
  } catch (e) {
    console.log(e);
  }
};
