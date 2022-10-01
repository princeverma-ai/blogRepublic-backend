const UserModel = require('./../models/userModel');

//----------------------------------------------------------------------->
exports.login = async (req, res) => {
    try {
        const blogs = await BlogModel.find();
        res.status(200).json({
            status: "Success",
            blogs:blogs
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
exports.signup = async (req, res) => {
    try {

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const userPhoto = req.body.userPhoto;

        const userObject = { name, email, password, userPhoto };

        const user = await UserModel.create(userObject);

        res.status(201).json({
            status: "Success",
            message: "Signed Up",
            User: user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Error 🎆",
            message: error
        })
    }
}