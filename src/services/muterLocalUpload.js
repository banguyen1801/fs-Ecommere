// create product support with multer, path, uuid, fs
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filesDir = 'uploads/images';
    // check if directory exists
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    if (!fs.existsSync(filesDir)) {
      // if not create directory
      fs.mkdirSync(filesDir);
    }

    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    //get file extension
    const ext = path.extname(file.originalname);
    //get random id
    const id = uuidv4();
    const filePath = `images/${id}${ext}`;

    cb(null, filePath);
  },
});
var upload = multer({ storage: storage });
// req.files for access to arrays object of files
// set filename (aka file path) as the image src in database
export default upload;
