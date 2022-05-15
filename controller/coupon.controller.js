const Coupon = require("../Model/Coupon.model");

const getCoupon = async (req, res) => {
  try {
    const couponNumber = req.params.couponNumber;
    const findingCoupon = await Coupon.findOne({ couponNumber: couponNumber });
    const isUsed = findingCoupon.isUsed;
    if (!isUsed) {
      const updatedCoupon = await Coupon.findByIdAndUpdate(
        { _id: findingCoupon._id },
        { isUsed: true }
      );
      res
        .status(200)
        .json({
          amount: updatedCoupon.couponAmount,
          message: `${updatedCoupon.couponAmount} € coupon added`,
        });
    } else {
      res.status(300).json({ message: "This coupon has been used before" });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Coupon Number is invalid!",
    });
  }
};

const getGift = async (req, res) => {
try{

  const {giftNumber} = req.body
  console.log(giftNumber);
  const findingCoupon = await Coupon.findOne({ giftNumber, isUsed:false });
  console.log("findingCoupon", findingCoupon);
  res.json({couponNumber:findingCoupon.couponNumber})
}catch(err){
  res.status(404).json({
    success: false,
    message: err,
  });

}

}

const postCoupon = async (req, res) => {
  try {
    const { couponAmount, howMuchCoupon } = req.body;
    console.log(typeof(couponAmount));

    for (let i = 0; i < howMuchCoupon; i++) {
      const couponNumber = `SmS${couponAmount}-${Math.floor(
        Math.random() * 99999999
      )}`;
      const giftNumber= couponAmount==="100"?"GC100":couponAmount==="20"?"GC20":couponAmount==="25"?"GC25":"GC50"
      const newCoupon = {
        couponNumber,
        couponAmount,
        giftNumber,
        isUsed: false,
      };
      await Coupon.create(newCoupon);
    }

    res.status(200).json({ message: "Coupon is created" });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

module.exports = {
  getCoupon,
  postCoupon,
  getGift
};
