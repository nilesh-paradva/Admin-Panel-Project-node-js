const AuthSecure = (req, res, next) => ((req.isAuthenticated()) ? next() : res.redirect("/signin"));
const AuththPageSecure = (req,res,next) => ((req.isAuthenticated()) ? res.redirect("/") : next());

module.exports = {AuthSecure, AuththPageSecure};