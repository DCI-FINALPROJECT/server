const Review = require("../Model/Review.model");



const getReviewById = (req,res) =>{


}


const addReview = async(req,res)=>{

    try{

        const review = await Review.create(req.body);

        res.json(review);

    }catch(err){

        res.status(404).json({
            status:404,
            message:err
        })
    }


}

module.exports = {getReviewById,addReview};