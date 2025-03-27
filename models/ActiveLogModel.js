const mongoose = require('mongoose');

const ProductActiveLogSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'products',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users',
        required: true
    },
    actionTime: {
        type: Date,
        default: Date.now
    },
    additionalData: {
        type: Object,
        required: false
    }
}, { timestamps: true });

const ProductActiveLogModel = mongoose.model('ProductActiveLog', ProductActiveLogSchema);

module.exports = ProductActiveLogModel;