const multer = require('multer');
const countFiles=require('count-files');
//----------------------------------->

//multer configurations------------------------------>
const imageStorage = multer.diskStorage({
    destination: 'public/image',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

//--------------------------------------------------->
exports.imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
            if (!file.originalname.match(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/)) {
            return cb(new Error('Please upload an Image'))
        }
        req.file = file;
        cb(undefined, true)
    }
})

//--------------------------------------------------->
exports.addImage = async (req, res) => {
    try {
        res.status(200).json({
            status: "Success",
            img_url: `${ req.protocol + '://' + req.get('host') + req.originalUrl}${req.file.originalname}`,
        });
    } catch (err) {
        res.status(500).json({
            status: "Error 🎆",
            message: err
        });
        console.log(err);
    }
}
//--------------------------------------------------->
exports.getStats = async (req, res) => {
    try {
        countFiles('./public/image', function (err, results) {
            res.status(200).json({
                status: "Success",
                stats:results
            });
            if(err){
                throw new Error("Cannot get stats at the moment");
            }
          })
    } catch (err) {
        res.status(500).json({
            status: "Error 🎆",
            message: err
        });
        
    }
}