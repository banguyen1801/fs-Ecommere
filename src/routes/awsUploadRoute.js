import express from 'express';
const router = express.Router();
import upload from '../services/awsUploadServices.js';

router.post(
  '/image-upload',
  upload.array('photos', 8),
  function (req, res, next) {
    //create a dummy array to use as input for model creation
    const productImages = [];
    //each filename is set as its path in BE server
    req.files.forEach((file) => productImages.push(`${file.location}`));
    res.json(productImages);
  }
);

export default router;
