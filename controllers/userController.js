const jwt = require('jsonwebtoken');
const UserModel = require('./../models/userModel');
const BlogModel = require('./../models/blogModel');

//cookie options
const cookieOptions = {
    expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure:true
}

//signToken
const signToken = id => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

//Sign UP------------------------------------------------------------------>
exports.signup = async (req, res) => {
    try {
        //sanitizing data
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const userPhoto = req.body.userPhoto;
        const userObject = { name, email, password, userPhoto };

        //creating user
        const user = await UserModel.create(userObject);

        //signing token
        const token = signToken(user._id);

        //sending token to client
        res.cookie('jwt', token, cookieOptions);

        res.status(201).json({
            status: "Success",
            tokenData: token,
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


//----------------------------------------------------------------------->
exports.login = async (req, res) => {
    try {
        //sanitizing data
        const { email, password } = req.body;

        //if no email or password provided
        if (!email || !password) {
            return res.status(500).json({
                status: "fail",
                message: "please provide email or password"
            })
        }

        //finding the user in database
        const user = await UserModel.findOne({ email }).select('+password');

        //if user not found and password is incorrect
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: "fail",
                message: "Incorrect email or password"
            })
        }

        //signing token If user found and password is correct
        const token = signToken(user._id);

        //sending token to client
        res.cookie('jwt', token, cookieOptions);

        //sending response
        res.status(200).json({
            status: "Success",
            tokenData: token,
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

//logout------------------------------------------------------------------>
exports.logout = async (req, res) => {
    try {
        res.cookie('jwt', 'loggedout', {
            expiresIn: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        });

        res.status(200).json({
            status: "Success",
            message: "Logged out successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Error 🎆",
            message: error
        })
    }
}

//protecting routes------------------------------------------------------->
exports.protect = async (req, res, next) => {
    try {
        //getting token and check if it exists
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt
        }

        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "You are not logged in! Please log in to get access"
            })
        }
        
        //verification token
        const decoded = await jwt.verify(token, process.env.SECRET);

        //check if user still exists
        const currentUser = await UserModel.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                status: "fail",
                message: "The user belonging to this token does no longer exist"
            })
        }

        

        //Grant access to protected route
        req.user = currentUser;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Error 🎆",
            message: error
        })
    }
}


//Get all users-------------------------------------------------->
exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();

        res.status(200).json({
            status: "Success",
            data: {
                users
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Error 🎆",
            message: error
        })
    }
}

//Get user------------------------------------------------------->
exports.getUser = async (req, res) => {
    try {
        let user;
        if(req.query.blogs=='true'){
            user = await UserModel.findById(req.params.id);
            const userBlogsPromises=user.blogs.map(async id=> await BlogModel.findById(id));
            user.blogs=await Promise.all(userBlogsPromises)
        }else{
         user = await UserModel.findById(req.params.id).select('-blogs');
        }
        
        res.status(200).json({
            status: "Success",
            data: {
                user
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Error 🎆",
            message: error
        })
    }
}

//Update user--------------------------------------------------->
exports.updateUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: "Success",
            data: {
                user
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Error 🎆",
            message: error
        })
    }
}

//Delete user--------------------------------------------------->
exports.deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "Success",
            data: null
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Error 🎆",
            message: error
        })
    }
}
