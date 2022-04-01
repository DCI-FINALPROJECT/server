const Product = require("../Model/Product.model.js")


const addProduct = async (req, res) => {

    const data = req.body;
    console.log('data',data);

    try{
        console.log(data);
        if(!(data.productName && data.category && data.brand && data.price && data.description && data.images && data.quantities) ) {
          return  res.status(401).send('missing information')
        }
    
        const product = new Product({
            productName: data.productName,
            category: data.category,
            brand: data.brand,
            price: data.price,
            description: data.description,
            images: data.images,
            quantities: data.quantities,
            reviews:data.reviews,
            stars: data.stars
        })
    
        await product.save();
       return res.status(200).send(product)
    }catch(err){
        res.send(err)
    }

}

module.exports = {addProduct} 