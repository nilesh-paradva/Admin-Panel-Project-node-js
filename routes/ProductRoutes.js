const express = require("express");
const ProductRoute = express.Router();
const ProductController = require("../controllers/ProductController");
const multer = require("../middleware/ImageUploadMulter");
const auth = require("../middleware/AuthMiddleware");

ProductRoute.use(auth.AuthSecure);

ProductRoute.get("/products", ProductController.ViewProductGet);
ProductRoute.get("/ViewProduct", ProductController.ProductGet);
ProductRoute.get("/editproduct/:id", ProductController.ProductEditGet);
ProductRoute.post("/product/add", multer.single("ProductImage"), ProductController.ProductAdd);
ProductRoute.post("/product/edit/:id", multer.single("ProductImage"), ProductController.ProductEdit);
ProductRoute.get("/product/delete/:id", ProductController.ProductDelete);

module.exports = ProductRoute;