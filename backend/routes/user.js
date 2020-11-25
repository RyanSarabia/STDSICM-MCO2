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

router.post('/', upload.single('file'), (req) => {
  console.log(req.body);
  console.log(req.file);
  const user = User.findOne({ email: req.session.passport.user.profile.emails[0].value });
  if (user) {
    cloudinary.uploader.upload(req.file.path, (err, result) => {
      const urlCreated = result.secure_url;

      console.log(urlCreated);
      const newAuction = new Auction({
        title: req.body.title,
        description: req.body.description,
        cutoffdate: req.body.cutoffdate,
        startPrice: req.body.startPrice,
        incPrice: req.body.incPrice,
        stealPrice: req.body.stealPrice,
        photos: urlCreated,
      });
      const auction = newAuction.save();
      user.auctions = auction;
      user.save();
    });
    // console.log(res);
  }
});

router.get('getID', userController.getID);

module.exports = router;
