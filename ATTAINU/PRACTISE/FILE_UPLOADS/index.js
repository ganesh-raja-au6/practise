const [express, multer, dotenv, path, cloudinary] = [
  require("express"),
  require("multer"),
  require("dotenv"),
  require("path"),
  require("cloudinary")
];

const multerupload = require("./multer.js");

require("./cloudinary.js");

dotenv.config();

const PORT = process.env.PORT || 2020;

// const storage = multer.diskStorage({
//     destination : './public/uploads',
//     filename(req, file, cb){
//         cb(null, file.originalname.replace(path.extname(file.originalname, '') + '_' + Date.now() + path.extname(file.originalname)))
//     }
// })
// const upload = multer({
//     storage : storage,
//     limits : {fileSize: 1024 * 1024},
//     fileFilter(req, file, cb){
//         checktype(file, cb)
//     }
// }).single('imagename')

// let checktype = (file, cb)=>{
//     let extname = /jpeg|jpg|png/
//     let exists = extname.test(path.extname(file.originalname).toLowerCase())
//     let mimetype = extname.test(file.mimetype)
//     if(mimetype && exists){
//         cb(null, true)
//     }else{
//         cb('Upload Images Only!.')
//     }

// }

const app = express();

app.set("view engine", "ejs");

app.set("views", "views");

app.set(express.static("./public"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("index"));

app.post("/file", (req, res) => {
  multerupload(req, res, err => {
    if (err) {
      res.render("index", { msg: err });
    } else {
      cloudinary.v2.uploader
        .upload(req.file.path)
        .then(success => res.send(success))
        .catch(err => res.send(err));
    }
  });
});

app.listen(PORT, console.log(`Server Connected at port ${PORT}`));
