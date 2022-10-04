const BlogModel = require('./../models/blogModel');

//----------------------------------------------------------------------->
exports.getData = async (req, res) => {
    try {

        //making the query object
        let query = BlogModel.find({ draft: false }).select('-__v -blogText -draft');

        //counting the number of blogs
        const numBlogs = await BlogModel.find({ draft: false }).count();


        //pagination
        const limit = 6;
        const numPages = Math.ceil((numBlogs > limit ? numBlogs : limit) / limit);
        let page = parseInt(req.query.page) || 1;
        if (page > numPages) {
            page = numPages;
        }
        query = query.skip((page - 1) * limit).limit(limit);

        const blogs = await query;
        res.status(201).json({
            status: "Success",
            numberOfBlogs: numBlogs,
            numberOfPages: numPages,
            currentPage: page,
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