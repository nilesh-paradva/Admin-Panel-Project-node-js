const ProductModel = require("../models/ProductModel");
const ProductActiveLogModel = require("../models/ActiveLogModel");
const fs = require("fs");


const ProductGet = async (req, res) => {
    try {
        const { search, category } = req.query;
        const query = {};

        if (search) query.name = { $regex: search, $options: 'i' };
        if (category) query.category = category;

        const products = await ProductModel.find(query);
        res.render("pages/ViewProduct", { products, search, category });
    } catch (err) {
        console.log("Product Get Error", err.message);
        res.status(500).send("Server Error");
    }
};


const ViewProductGet = async (req, res) => { res.render("pages/AddProduct") }

const ProductAdd = async (req, res) => {
    try {
        
        const ProductImage = req.file ? req.file.path : null;
        const productData = { ...req.body, ProductImage };

        const ProductAdd = await ProductModel.create(productData);

        await ProductActiveLogModel.create({
            productId: ProductAdd._id, 
            userId: req.user ? req.user.id : null, 
            actionTime: new Date(),  
            additionalData: {  
                action: "Product Created",
                productName: ProductAdd.name,
                description: ProductAdd.description
            }
        });

        res.redirect("/ViewProduct");

    } catch (err) {
        console.log("Product Add Error", err.message);
        res.status(500).send("Internal Server Error");  
    }
};


const ProductEditGet = async (req, res) => {
    try {
        const ProductEdit = await ProductModel.findById(req.params.id);
        res.render("pages/ProductEdit", { ProductEdit });
    } catch (err) {
        console.log("Product Edit Error", err.message);
    }
}

const ProductEdit = async (req, res) => {
    try {
        const ProductEdit = await ProductModel.findById(req.params.id);
        (req.file && ProductEdit.ProductImage) ? fs.unlinkSync(ProductEdit.ProductImage) : null;
        await ProductModel.findByIdAndUpdate(req.params.id, req.file ? { ProductImage: req.file.path, ...req.body } : req.body);
        
        await ProductActiveLogModel.create({
            productId: ProductEdit._id, 
            userId: req.user ? req.user.id : null, 
            actionTime: new Date(),  
            additionalData: {  
                action: "Product Updated",
                productName: ProductEdit.name,
                description: ProductEdit.description
            }
        });

        res.redirect("/");
    } catch (err) {
        console.log("Product Edit Error", err.message);
    }
}

const ProductDelete = async (req, res) => {
    try {


        const ProductDelete = await ProductModel.findByIdAndDelete(req.params.id);
        (ProductDelete.ProductImage) ? fs.unlinkSync(ProductDelete.ProductImage) : null;

        await ProductActiveLogModel.create({
            productId: ProductDelete._id, 
            userId: req.user ? req.user.id : null, 
            actionTime: new Date(),  
            additionalData: {  
                action: "Product Deleted",
                productName: ProductDelete.name,
                description: ProductDelete.description
            }
        });        

        res.redirect("/");
    } catch (err) {
        console.log("Product Delete Error", err.message);
    }
};


module.exports = { ProductGet, ViewProductGet, ProductEditGet, ProductAdd, ProductEdit, ProductDelete };