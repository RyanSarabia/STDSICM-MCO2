require('../../node_modules/dotenv').config();
const User = require('../model/user.model');
const Auction = require('../model/auction.model');
const cloudinary = require('../../node_modules/cloudinary').v2;
const multer = require('../../node_modules/multer');
const router = require('../../node_modules/express').Router();
const userController = require('../controller/userController');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './files');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/getAuction', userController.getAuction);
router.get('/getAllAuction', userController.getAllAuction);
router.get('/getID', userController.getID);

router.post('/', upload.single('file'), (req, res) => {
  const checkPrice = (req.body.stealPrice - req.body.startPrice) % req.body.incPrice;
  // add validation for date
  if (req.body.startPrice < req.body.stealPrice && checkPrice === 0) {
    User.findOne({ email: req.session.passport.user.profile.emails[0].value })
      .populate('auctions')
      .exec(async function userAuction(err, user) {
        await cloudinary.uploader.upload(req.file.path, async (err1, result) => {
          if (err1) throw err1;
          const urlCreated = result.secure_url;

          console.log(urlCreated);
          const newAuction = new Auction({
            title: req.body.title,
            description: req.body.description,
            cutoffdate: req.body.cutoffdate,
            postdate: req.body.postdate,
            startPrice: req.body.startPrice,
            incPrice: req.body.incPrice,
            currentPrice: req.body.startPrice,
            stealPrice: req.body.stealPrice,
            photos: urlCreated,
          });
          console.log(user);
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
});

module.exports = router;
