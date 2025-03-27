const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    //Basic Details
    name: {
        type: String,
        required: true,
        trim: true,
        // minlength: 3
    },
    description: {
        type: String,
        required: true,
        // minlength: 10,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    originalPrice: {
        type: Number,
        min: 0,
        default: 0,
    },
    category: {
        type: String,
        // required: true,
        trim: true,
        default: null
    },
    subCategory: {
        type: String,
        trim: true,
        default: null
    },

    // Stock Information
    stockQuantity: {
        type: Number,
        min: 0,
        // required: true,
        default: 0,
    },
    isInStock: {
        type: Boolean,
        default: function () {
            return this.stockQuantity > 0;
        },
    },

    // Product Images (could be an array of URLs)
    ProductImage: {
        type: String,
        //   required: true,
        default: null
    },

    // Discount Information
    discountPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
    discountStartDate: {
        type: Date,
        default: Date.now
    },
    discountEndDate: {
        type: Date,
        default: Date.now
    },

    // Rating and Review System
    ratings: {
        averageRating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        totalRatings: {
            type: Number,
            default: 0
        },

        reviews: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users',
                    default: null
                    // required: true
                },
                comment: {
                    type: String,
                    //   required: true,
                    minlength: 3,
                    default: null
                },
                rating: {
                    type: Number,
                    //   required: true,
                    min: 0,
                    max: 5,
                    default: 0
                },
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },

}, { timestamps: true });

const ProductModel = mongoose.model('products', ProductSchema);

module.exports = ProductModel;