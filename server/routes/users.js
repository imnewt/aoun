const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/aoun", { useNewUrlParser: true, useUnifiedTopology: true });
const User = require("../models/user.model");

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Images Only!!!")
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single("avatar");


// CREATE USER
router.post('/users/create', async (req, res) => {
    const { email, password, phone } = req.body;
    await User.find({ email: email }, (err, previousUsers) => {
        if(err) {
            return res.send({
                success: false,
                message: "Error while creating new user!"
            })
        }
        else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: "Email has been used for another account!"
            })
        }
        else {
            let newUser = new User();
            newUser.email = email;
            newUser.password = password;
            newUser.phone = phone;
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Error while creating new user!"
                    })
                } 
                else {
                    return res.send({
                        success: true,
                        message: "User created!"
                    })
                }
            })
        }
    })
})

// LOGIN
router.post('/users/login', async (req, res) => {
    const { email, password } = req.body;
    await User.find({ email: email }, (err, user) => {
        if(err) {
            return res.send({
                success: false,
                message: "Error while login"
            })
        }
        if (user.length === 0) {
            return res.send({
                success: false,
                message: "User does not exist"
            })
        }
        else if (user.length > 0) {
            if (user[0].password === password) {
                return res.send({
                    success: true,
                    message: "Login Success!"
                })
            }
            else {
                return res.send({
                    success: false,
                    message: "Wrong password!"
                })
            }
        }
    })
})

// GET USER DATA
router.post('/users', async (req, res) => {
    const { userEmail } = req.body;
    await User.find({ email: userEmail }, (err, user) => {
        if(err) {
            return res.send({
                success: false,
                message: "Error while getting user data 1!"
            })
        }
        else {
            if (user.length > 0) {
                // const { imageUrl } = user[0];
                // const test = require(`../public/uploads/${imageUrl}`);
                return res.send({
                    success: true,
                    user: user,
                    // imageUrl: `../public/uploads/${imageUrl}`,
                    message: "Get data success!"
                })
            }
            else {
                return res.send({
                    success: false,
                    message: "Error while getting user data 2!"
                })
            }
        }
    })
})

// UPDATE EMAIL, PHONE AND ADDRESS
router.post('/users/update', async (req, res) => {
    const { user, email, phone, address } = req.body;
    await User.findOneAndUpdate(
        { _id: user._id},
        { $set: { email: email, phone: phone, address: address }},
        (err, user) => {
            if (err) {
                res.send({
                    success: false,
                    message: "Error while updating user!"
                })
            }
            else {
                res.send({
                    success: true,
                    message: "Update success!"
                })
            }
        })
})

// UPDATE PASSWORD
router.post('/users/updatePassword', async (req, res) => {
    const { user, newPassword } = req.body;
    await User.findOneAndUpdate(
        { _id: user._id},
        { $set: { password: newPassword }},
        (err, user) => {
            if (err) {
                res.send({
                    success: false,
                    message: "Error while updating password!"
                })
            }
            else {
                res.send({
                    success: true,
                    message: "Update success!"
                })
            }
        })
})

// UPDATE AVATAR
router.post("/users/updateImage", async (req, res) => {
    upload( req, res, err => {
        const { file } = req;
        const { userEmail } = req.body;
        if (err) {
            res.send({
                success: false,
                msg: err
            })
        } else {
            User.findOneAndUpdate(
                { email: userEmail},
                { $set: { imageUrl: file.filename}},
                // { $set: { imageUrl: `http://192.168.1.8:3000/api/open_image?image_name=${file.filename}`}},
                (err, user) => {
                    if (err) {
                        res.send({
                            success: false,
                            message: "Error while updating avatar!"
                        })
                    }
                    else {
                        res.send({
                            success: true,
                            message: "Update success!"
                        })
                    }
                })
        }
    })
})

// router.post("/users/getImage", async (req, res) => {
//         const { userEmail } = req.body;
//         if (err) {
//             res.send({
//                 success: false,
//                 msg: err
//             })
//         } else {
//             await User.find({ email: userEmail }, (err, user) => {
//                 if(err) {
//                     return res.send({
//                         success: false,
//                         message: "Error while getting user data!"
//                     })
//                 }
//                 else {
//                     return res.send({
//                         success: true,
//                         user: user,
//                         message: "Get data success!"
//                     })
//                 }
//             })
//         }
// })

module.exports.getImage = async (req, res, next) => {
    let imageName = 'public/uploads/' + req.query.image_name;
    fs.readFile(imageName, (err, imageData) => {
        if (err) {
            res.send({
                success: false,
                message: `Can't read image ${err}`
            });
            return;
        }
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(imageData);
    })
};

module.exports = router;