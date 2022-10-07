const BlogModel = require('./../models/blogModel');
const UserModel=require('./../models/userModel');
//----------------------------------------------------------------------->
exports.addBlog = async (req, res) => {
    try {

        const blogTitle = req.body.blogTitle;
        const blogCoverImage = req.body.blogCoverImage;
        const blogPostedByUserName = req.body.blogPostedByUserName;
        const blogPostedByUserImage = req.body.blogPostedByUserImage;
        const blogPostedByUserId = req.body.blogPostedByUserId;
        const blogText = req.body.blogText;
        const blogDescription = req.body.blogDescription;

        const draft = req.body.draft;

        const blogObject = { blogTitle, blogCoverImage, blogPostedByUserName, blogText, blogDescription, draft,blogPostedByUserImage,blogPostedByUserId };

        const blog = await BlogModel.create(blogObject);

        const user=await UserModel.findByIdAndUpdate(blogPostedByUserId,{$push:{blogs:blog._id}});  


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
        let query;
        if (req.query.search) {
            query = BlogModel.find({ blogTitle:{ "$regex": req.query.search, "$options": "i" }, draft: false }).select('-__v -draft');
        } else {
            query = BlogModel.find({ draft: false }).select('-__v -draft');
        }

        const blogs = await query;
        res.status(200).json({
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
        res.status(200).json({
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
        const blog = await BlogModel.findByIdAndUpdate(req.params.id, req.body, {
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