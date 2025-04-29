const User = require("../models/userSchema")
const jwt = require("jsonwebtoken");

const addUserController = async(req, res) => {
    try {
        const user = await req.body;
        console.log(user);
        const newUser = await User.create(user);
        if (!newUser) {
            res.status(400).json({
                success: false,
                message: "User not created"
            })
        }
        res.status(201).json({
            success: true,
            message: "user created",
            data: newUser,
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal sever error"
        })
    }
}

const loginUserController = async(req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const matchedUser = await User.findOne({ email: email });
        console.log(matchedUser)
        if (matchedUser) {
            if (matchedUser.password == password) {
                const token = jwt.sign({ _id: matchedUser._id, email: email, password: password }, process.env.JWT_SECRET_KEY);

                res.status(200).json({
                    token: token,
                    success: true,
                    name: matchedUser.name,
                    message: "User Logged In"
                })
            } else {
                res.status(403).json({
                    success: false,
                    mesage: "Invalid password"
                })
            }
        } else {
            res.status(403).json({
                success: false,
                message: "Invalid email"
            })
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const getAllUserController = async(req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        if (users) {
            res.status(200).json({
                success: true,
                message: 'Users fetched successfully',
                data: users
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No users found"
            })
        }

    } catch (e) {
        console.log(e);
        res.status(504).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

const getUserByIdController = async(req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const user = await User.findById(id);
        if (user) {
            console.log(user);
            res.status(200).json({
                success: true,
                message: "User found",
                data: user
            })
        } else {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

    } catch (e) {
        res.status(504).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getUserByDataController = async(req, res) => {
    try {
        const info = req.params.info;
        const user = await User.findOne({
            $or: [{
                    email: info
                },
                {
                    mobile: parseInt(info)
                },
                {
                    sic: info
                }
            ]
        });
        if (user) {
            console.log(user);
            res.status(200).json({
                success: true,
                message: "User found",
                data: user
            })
        } else {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
    } catch (e) {
        console.log(e);
        res.status(504).json({
            success: true,
            message: "Internal Server Error"
        })
    }
}

const updateUserController = async(req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, newData);
        if (updatedUser) {
            console.log(updatedUser);
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: updatedUser
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Update failed"
            })
        }
    } catch (e) {
        console.log(e);
        res.status(504).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const deleteUserController = async(req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
            res.status(200).json({
                success: true,
                message: "User Deleted successfully",
                data: deletedUser
            })
        } else {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
module.exports = { addUserController, getAllUserController, getUserByIdController, getUserByDataController, updateUserController, deleteUserController, loginUserController };