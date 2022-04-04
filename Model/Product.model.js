const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const productSchema = new Schema({

    productName: {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    brand : {
        type: String,
        required: true
    },
    price: { 
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    },
    images: { 
        type: Array,
        required: true
    },
    quantities: { 
        type: Array,
        required: true
    },
    reviews: { 
        type: Array
    },
    stars: { 
        type: String
    },
    timestamp: {
        type: String
    }

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product