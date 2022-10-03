const multer = require('multer');
const fs = require('fs');
const countFiles = require('count-files');
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
            img_url: `${req.protocol + '://' + req.get('host') + req.originalUrl}${req.file.originalname}`,
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
            fs.readdir('./public/image', (err, files) => {
                const fileStats=files;
                res.status(200).json({
                    status: "Success",
                    stats: results,
                    files: fileStats
                });
              });
            if (err) {
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

//--------------------------------------------------->
exports.deleteImage = async (req, res) => {
    try {
        fs.unlink(`./public/image/${req.params.name}`, err => {
            if (err) {
              return  res.status(500).json({
                    status: "Error 🎆",
                    message: err
                });
            }
             res.status(204).json({
                status: "Success",
            });
        })
         
    } catch (err) {
        res.status(500).json({
            status: "Error 🎆",
            message: err
        });

    }
}