const Coupon = require("../Model/Coupon.model");

const getCoupon = async (req, res) => {
    try {
      console.log("try calisiyor");
      const { couponNumber } = req.body;
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
        res.status(200).json({amount:updatedCoupon.couponAmount})
      } else {
        res.status(300).json({ message: "Coupon not found" });
      }
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err,
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
  


    res.send('Coupon is created')
      
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