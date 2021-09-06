const { Mutex } = require('async-mutex');
const User = require('../model/user.model');
const Auction = require('../model/auction.model');
// const { ConnectionStates } = require('mongoose');
const mutex = new Mutex();

exports.getOwner = async function getOwner(req, res) {
  try {
    const userEmail = req.session.passport.user.profile.emails[0].value;
    const auction = req.params.auctionid;
    const owner = await User.findOne({ auctions: auction });
    const currUser = await User.findOne({
      email: userEmail,
    });
    let isCurrUser = 0;

    if (owner) {
      if (owner.email === currUser.email) {
        isCurrUser = 1;
      }
      const userInfo = {
        owner,
        // eslint-disable-next-line no-underscore-dangle
        userId: currUser._id,
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

function escapeRegex(string) {
  return string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

exports.getAllAuction = async function getAllAuction(req, res) {
  const input = req.query.search;
  const pageNum = req.query.page;
  const itemsPerPage = 10;
  if (input) {
    try {
      const regex = escapeRegex(input);
      const user = await User.findOne({ email: req.session.passport.user.profile.emails[0].value });
      if (user) {
        const count = await Auction.find({
          title: { $regex: regex, $options: 'i' },
        }).countDocuments();
        Auction.find({ title: { $regex: regex, $options: 'i' } })
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
            res.send(result);
          });
      } else res.redirect('/explore');
    } catch (e) {
      console.log(e);
    }
  }
};

exports.postAuctionAction = async function postAuctionAction(req, res) {
  await mutex.runExclusive(async () => {
    try {
      const postaction = req.params.action;
      const postid = req.params.auctionid;
      // eslint-disable-next-line radix
      const bidPrice = parseInt(req.query.bid);

      const user = await User.findOne({ email: req.session.passport.user.profile.emails[0].value });
      if (user) {
        const auction = await Auction.findOne({ _id: postid });

        if (
          auction &&
          bidPrice > auction.currentPrice &&
          auction.currentPrice !== auction.stealPrice
        ) {
          if (postaction === 'bid') {
            if (bidPrice % auction.incPrice === 0) {
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

          await auction
            .save()
            .then(() => res.json('Auction Updated!'))
            .catch((err1) => res.status(400).json(`Error: ${err1}`));
        } else {
          res.send('deny bid');
        }
      }
    } catch (e) {
      console.log(e);
    }
  });
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
  let input = req.query.search;
  const pageNum = req.query.page;
  const itemsPerPage = 10;

  if (!input) input = '';

  try {
    const user = await User.findOne({ _id: req.params.userid }).populate({
      path: 'auctions',
      match: { title: { $regex: input, $options: 'i' } },
      options: {
        sort: { postdate: -1 },
        limit: itemsPerPage,
        skip: (pageNum - 1) * itemsPerPage,
      },
    });

    const tempuser = await User.findOne({ _id: req.params.userid }).populate({
      path: 'auctions',
      match: {
        title: { $regex: input, $options: 'i' },
      },
    });

    const count = tempuser.auctions.length;

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
        count,
      };
      res.send(userInfo);
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
    }).populate({
      path: 'auctions',
      options: { sort: { postdate: -1 } },
    });
    const newBio = req.body.bio;
    const newContact = req.body.contact;

    if (user) {
      // if (newBio) {
      //   user.bio = newBio;
      // }
      user.bio = newBio;
      if (newContact) {
        user.contactNum = newContact;
      }
      const updatedUser = await user.save();
      res.send(updatedUser);
    } else {
      res.send('User not Edited');
    }
  } catch (e) {
    console.log(e);
  }
};
