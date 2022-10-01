const BlogModel = require('./../models/blogModel');

//----------------------------------------------------------------------->
exports.getData = async (req, res) => {
    try {
        const blogs = await BlogModel.find().select('-__v -blogText');

        res.status(201).json({
            status: "Success",
            Blogs: blogs
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: "Error 🎆",
            message: error
        })
    }
}