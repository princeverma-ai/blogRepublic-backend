const BlogModel = require('./../models/blogModel');

//----------------------------------------------------------------------->
exports.addBlog = async (req, res) => {
    try {

        const blogTitle = req.body.blogTitle;
        const blogCoverImage = req.body.blogCoverImage;
        const blogPostTime = req.body.blogPostTime || Date.now()
        const blogPostedBy = req.body.blogPostedBy;
        const blogText = req.body.blogText;
        const blogDescription = req.body.blogDescription;

        const blogObject = { blogTitle, blogCoverImage, blogPostTime, blogPostedBy, blogText, blogDescription };

        const blog = await BlogModel.create(blogObject);


        res.status(201).json({
            status: "Success",
            message: "made a blog",
            Blog: blog
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Error 🎆",
            message: error
        })
    }
}