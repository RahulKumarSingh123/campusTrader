const upload = require('../middleware/uploadMiddleware');

const express = require('express');
const {
  addListingController,
  getAllListingController,
  getListingController,
  updateListingController,
  updateImageController,
  deleteListingController,
  searchListingController,
  getMyListingController,
} = require('../controllers/listingController');

const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, upload.single('img'), addListingController);
router.get('/getall', getAllListingController);
router.get('/my', authMiddleware, getMyListingController);
router.get('/get/:id', getListingController);
router.put('/update/:id', updateListingController);
router.put('/updateImage/:id', upload.single('img'), updateImageController);
router.delete('/delete/:id', deleteListingController);
router.get('/search', searchListingController);
module.exports = router;
