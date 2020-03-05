const [multer, dotenv, path] = [
  require("multer"),
  require("dotenv"),
  require("path")
];

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads/",
    filename(req, file, cb) {
      cb(
        null,
        file.originalname.replace(path.extname(file.originalname), "") +
          "_" +
          Date.now() +
          path.extname(file.originalname)
      );
    }
  }),
  limits: { fileSize: 1024 * 1024 },
  fileFilter(req, file, cb) {
    checktype(file, cb);
  }
}).single("imagename");


let checktype = (file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
};

module.exports = upload;
