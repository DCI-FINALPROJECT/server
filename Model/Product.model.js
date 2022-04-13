const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const SchemaTypes = mongoose.Schema.Types;

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
        type: SchemaTypes.Number,
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
    reviews: { 
        type: Array
    },
    stars: { 
        type: String
    },
    timestamp: {
        type: String
    },
    sales:{
        type:Number
    },
    ["64 GB"]:{
        type:Object
    }
    ,
    ["128 GB"]:{
        type:Object
    }
    ,
    ["256 GB"]:{
        type:Object
    }
    ,
    ["512 GB"]:{
        type:Object
    }

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product