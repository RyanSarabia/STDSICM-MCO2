// const User = require('../model/user.model');
// const Auction = require('../model/auction.model');

// exports.getAuction = async function getAuction(req, res) {};

// exports.postCreateAuction = async function postAuction(req, res) {

//     const user = await User.findOne({ email: req.session.passport.user.profile.emails[0].value });
//     if (user){
//         const newAuction = new Auction({
//             title: req.body.title,
//             description: req.body.description,
//             cutofftime: req.body.,
//             cutoffdate: req.body.,
//             startprice: req.body.startPrice,
//             incprice: req.body.increment,
//             stealprice: req.body.stealPrice,
//             photos: req.body.photos,
//         });

//         auction = await newAuction.save();
//         user.auctions = auction;

//     }
// };
