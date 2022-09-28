const BlogModel = require('./../models/blogModel');

//----------------------------------------------------------------------->
exports.getData = async (req, res) => {
    try {

        res.status(200).json({
            status: "Success",
            message: "Got Data 😁"
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: "Error 🎆",
            message: error
        })
    }
}