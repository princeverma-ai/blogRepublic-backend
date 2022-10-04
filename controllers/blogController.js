const BlogModel = require('./../models/blogModel');

//----------------------------------------------------------------------->
exports.addBlog = async (req, res) => {
    try {

        const blogTitle = req.body.blogTitle;
        const blogCoverImage = req.body.blogCoverImage;
        const blogPostedBy = req.body.blogPostedBy;
        const blogText = req.body.blogText;
        const blogDescription = req.body.blogDescription;
        const draft = req.body.draft;

        const blogObject = { blogTitle, blogCoverImage, blogPostedBy, blogText, blogDescription,draft };

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

//----------------------------------------------------------------------->
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find().select('-__v');

        res.status(201).json({
            status: "Success",
            numberOfBlogs: blogs.length,
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

//----------------------------------------------------------------------->
exports.getBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        res.status(201).json({
            status: "Success",
            Blog: blog
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: "Error 🎆",
            message: error
        })
    }
}

//----------------------------------------------------------------------->
exports.updateBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findByIdAndUpdate(req.params.id,req.body, {
            new: true,
            runValidators: true,
          });
        res.status(201).json({
            status: "Success",
            Blog: blog
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: "Error 🎆",
            message: error
        })
    }
}

//----------------------------------------------------------------------->
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "Success",
            Blog: blog
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: "Error 🎆",
            message: error
        })
    }
}