const multer = require('multer');
//----------------------------------->

//multer configurations------------------------------>
const imageStorage = multer.diskStorage({
    destination: 'public/img',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

//--------------------------------------------------->
exports.imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Please upload an Image'))
        }
        cb(undefined, true)
    }
})

//--------------------------------------------------->
exports.addImage = async (req, res) => {
    try {
        res.status(200).json({
            status: "Success",
            message: "Image Uploaded 😁"
        });
        console.log("image uploaded succesfulyy");
    } catch (err) {
        res.status(500).json({
            status: "Error 🎆",
            message: err
        });
        console.log(err);
    }
}