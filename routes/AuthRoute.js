const express = require("express");
const AuthRoute = express.Router();
const AuthController = require("../controllers/AuthController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

AuthRoute.get("/signin", AuthMiddleware.AuththPageSecure, AuthController.LoginPage);
AuthRoute.get("/register", AuthMiddleware.AuththPageSecure, AuthController.RegisterPage);
AuthRoute.get("/logout", AuthController.Logout);
AuthRoute.get("/forgotPasswordPage", AuthMiddleware.AuththPageSecure, AuthController.ForgotPage);

AuthRoute.post("/opt-generate", AuthController.OtpGenerate);
AuthRoute.post("/opt-verify", AuthController.OtpVerify);
AuthRoute.post("/reset-password", AuthController.ResetPassword);

module.exports = AuthRoute;