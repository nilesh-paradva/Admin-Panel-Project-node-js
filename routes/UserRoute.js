const express = require("express");
const UserRoute = express.Router();
const UserController = require("../controllers/UserController");   
const passport = require("../middleware/PassPortAuth"); 
const UserGet = require("../middleware/UserGet");
const auth = require("../middleware/AuthMiddleware");
const ImageMulter = require("../middleware/ImageUploadMulter");

UserRoute.use(UserGet.attachUser);

UserRoute.post("/user/add", UserController.UserPostAdd);

UserRoute.post("/login", passport.authenticate("local", { failureRedirect: '/login' }), UserController.UserPostLogin);

UserRoute.post("/user/edit/:id", UserController.UserPutEdit);

UserRoute.post("/user/profileImg/:id", ImageMulter.single("profileImg"), UserController.UserProfileImg);

UserRoute.use(auth.AuthSecure);

UserRoute.get("/user/delete/:id", UserController.UserDeleteDelete);

UserRoute.get("/profileimage/delete/:id", UserController.UserProfileImgDelete);

UserRoute.get("/user/profile", UserController.UserProfile);

UserRoute.post("/user/passwordChange/:id", UserController.UserPasswordChange);

module.exports = UserRoute;