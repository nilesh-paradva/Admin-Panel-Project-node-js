const UserModel = require("../models/UserModel");
const nodemailer = require("nodemailer");
const generateUniqueId = require("generate-unique-id");
const bcrypt = require("bcrypt");

const LoginPage = (req, res) => { res.render("pages/Login") }
const RegisterPage = (req, res) => { res.render("pages/Register") }
const ForgotPage = (req, res) => { res.render("pages/forgotpassword") }
const Logout = (req, res, next) => {
    req.logout((err) => {
        (err) ? next(err) : res.redirect("/signin");
    });
}

const OtpGenerate = async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
        const otp = generateUniqueId({
            length: 4,
            useLetters: false
        });

        console.log("OTP", otp);

        await UserModel.findByIdAndUpdate(user._id, { otp: otp });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port: 587,
            auth: {
                user: 'nileshparadva97@gmail.com',
                pass: 'crwbimpybvpfoccv',
            },
        });

        const mailOptions = {
            from: 'nileshparadva97@gmail.com',
            to: user.email,
            subject: 'OTP Verification - Please Use This Code',
            text: `Your OTP for account verification is: ${otp}`,
            html: `<p>Your OTP for account verification is: <strong>${otp}</strong></p>`,
        };

        await transporter.sendMail(mailOptions);

        res.render("pages/otpVarify", { user });
    }
}

const OtpVerify = async (req, res) => {
    const user = await UserModel.findOne({ _id: req.body.id });
    if (user.otp == req.body.otp) {
        res.render("pages/ResetPassword", { user });
    } else {
        res.render("pages/otpVarify", { user });
    }
}

const ResetPassword = async (req, res) => {
    const {id, newPassword, confirmPassword} = req.body
    if(newPassword === confirmPassword){
        bcrypt.hash(newPassword, 12, async (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: "Error hashing password" });
            await UserModel.findByIdAndUpdate(id, {password : hashedPassword, otp : null})
            res.redirect("/signin");
        });
    }else{
        console.log("password not forgot");
    }
}

module.exports = { LoginPage, RegisterPage, ForgotPage, Logout, OtpGenerate, OtpVerify, ResetPassword };