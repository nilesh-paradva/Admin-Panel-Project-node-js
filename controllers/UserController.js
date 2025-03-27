const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const fs = require("fs");

const UserPostAdd = async (req, res) => {
    try {
        const User = req.body;

        if (!User.username || !User.email || !User.password) return console.log("username, email, and password require");
        if (await UserModel.findOne({ email : User.email })) return console.log("User already registered");
        
        bcrypt.hash(User.password, 12, async (err, PassHash) => {
            if (!err) {
                const newUser = {
                    ...User,
                    password: PassHash,
                };

                const UserAdd = await UserModel.create(newUser);
                res.redirect("/login");
            }
        })
    } catch (err) {
        console.log("User Add Error", err.message);
    }
}

const UserPostLogin = async (req, res) => {res.redirect("/")}

const UserPutEdit = async (req, res) => {
    try {
        const User = await UserModel.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/user/profile");
    } catch (err) {
        console.log("err user Update", err.message);

    }
}

const UserProfileImg = async (req, res) => {
    try {
        if (!req.file) return console.log("No file uploaded.")
        const user = await UserModel.findById(req.params.id);
        if (!user) return console.log("User not found.");

        (user.avatar) ? fs.unlinkSync(`${user.avatar}`) : console.error("not delete old image:");
        await UserModel.findByIdAndUpdate(req.params.id, { avatar: req.file.path });

        res.redirect("/user/profile");
    } catch (err) {
        console.error("Error uploading image:", err);
    }
}

const UserProfileImgDelete = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) return console.log("User not found.");

        (user &&user.avatar) ? fs.unlinkSync(`${user.avatar}`) : null;
        await UserModel.findByIdAndUpdate(req.params.id, { avatar: null });

        res.redirect("/user/profile");
    } catch (err) {
        console.error("Error uploading image:", err);
    }
}

const UserDeleteDelete = async (req, res) => {
    const User = await UserModel.findByIdAndDelete(req.params.id);
    res.redirect("/");
}

const UserPasswordChange = async (req, res) => {
    try {
        const { OldPass, NewPass, ConfPass } = req.body;

        if (NewPass === ConfPass) {
            bcrypt.compare(OldPass, req.user.password, async (err, pass) => {
                if (!err && pass) {
                    bcrypt.hash(NewPass, 10, async (err, passHash) => {
                        if (!err && passHash) {
                            await UserModel.findByIdAndUpdate(req.params.id, { password: passHash }, req.body);
                            res.redirect("/user/profile");
                        } else {
                            console.log("password in not hash");
                        }
                    })
                } else {
                    console.log("password not match");
                }
            })
        } else {
            console.log("old and new password not match");
        }
    } catch (err) {
        console.log("User Password Change Error", err.message);
    }
}

const UserProfile = (req, res) => {res.render("pages/ProfileEdit")}

module.exports = { UserPostAdd, UserPostLogin, UserProfileImg, UserPutEdit, UserProfileImgDelete, UserDeleteDelete, UserProfile, UserPasswordChange };