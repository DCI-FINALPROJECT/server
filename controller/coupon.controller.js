const Coupon = require("../Model/Coupon.model");

const getCoupon = async (req, res) => {
    try {

      const couponNumber = req.params.couponNumber;
      console.log("try calisiyor");
      console.log(couponNumber);
      const findingCoupon = await Coupon.findOne({ couponNumber: couponNumber });
      console.log(findingCoupon);
      const isUsed = findingCoupon.isUsed
      if (!isUsed) {
        console.log("if calisiyor");
        const updatedCoupon = await Coupon.findByIdAndUpdate(
          { _id: findingCoupon._id },
          { isUsed: true }
        );
        console.log("isused", updatedCoupon);
        res.status(200).json({amount:updatedCoupon.couponAmount, message:`${updatedCoupon.couponAmount} € coupon added`})
      } else {
        res.status(300).json({ message: "This coupon has been used before" });
      }
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "Coupon Number is invalid!"
      });
    }
  };





const postCoupon = async (req, res) => {
    console.log("fonksiyon calisyor");
    try {
        console.log(" try calisyor");
      const { couponAmount, howMuchCoupon } = req.body;


      for (let i = 0; i < howMuchCoupon; i++) {
        const couponNumber = `SmS${couponAmount}-${Math.floor(Math.random() * 99999999)}`
        
        const newCoupon= {
          couponNumber,
          couponAmount,
          isUsed:false
        }
        await Coupon.create(newCoupon);
      }
  


    res.status(200).json({message:"Coupon is created"})
      
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err,
      });
    }
  };



  module.exports = {
    getCoupon,
    postCoupon
  };