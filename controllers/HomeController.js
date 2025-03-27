const UserModel = require('../models/UserModel');
const ProductModel = require('../models/ProductModel');

const HomeController = async(req, res) => {
    const products = await ProductModel.find();
    const users = await UserModel.find({_id : req.user._id});
    res.render('index', {products, users});
}

module.exports = {HomeController};