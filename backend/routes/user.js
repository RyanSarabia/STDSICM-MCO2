const path = require('path');
const DatauriParser = require('datauri/parser');
require('../../node_modules/dotenv').config();
const User = require('../model/user.model');
const Auction = require('../model/auction.model');
const cloudinary = require('../../node_modules/cloudinary').v2;
const multer = require('../../node_modules/multer');
const router = require('../../node_modules/express').Router();
const userController = require('../controller/userController');

const parser = new DatauriParser();

function convertTZ(date) {
  return new Date(
    (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
      timeZone: 'Asia/Manila',
    })
  );
}

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.get('/getAuction/:auctionid', userController.getAuction);
router.get('/getOwner/:auctionid', userController.getOwner);
router.get('/getAllAuction', userController.getAllAuction);
router.get('/getSearch', userController.getSearch);
router.get('/getID', userController.getID);
router.post('/getAuction/:auctionid/:action', userController.getAuctionAction);

router.post('/', upload.single('file'), async (req, res) => {
  const checkPrice = (req.body.stealPrice - req.body.startPrice) % req.body.incPrice;
  const file = parser.format(path.extname(req.file.originalname).toString(), req.file.buffer)
    .content;
  const postdate = convertTZ(new Date(req.body.postDate));
  const cutoffdate = convertTZ(new Date(req.body.cutoffdate));

  try {
    if (checkPrice === 0) {
      await User.findOne({ email: req.session.passport.user.profile.emails[0].value })
        .populate('auctions')
        .exec(async function userAuction(err, user) {
          await cloudinary.uploader.upload(file, async (err1, result) => {
            if (err1) throw err1;
            const urlCreated = result.secure_url;

            console.log(urlCreated);
            const newAuction = new Auction({
              title: req.body.title,
              description: req.body.description,
              cutoffdate,
              postdate,
              startPrice: req.body.startPrice,
              incPrice: req.body.incPrice,
              currentPrice: req.body.startPrice,
              highestbidder: null,
              stealPrice: req.body.stealPrice,
              photo: urlCreated,
            });
            user.auctions.push(newAuction);
            await newAuction.save();
            await user
              .save()
              .then(() => res.json('Auction Added!'))
              .catch((err2) => res.status(400).json(`Error: ${err2}`));
          });
        });
    } else {
      res.redirect('/create');
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
