const User = require("../Model/User.model")


// UNCOMPLEATED POST REQ FOR USER

const newUser =async (req,res)=>{

    try{        

       res.send("uncompleated")

    }catch(err){

        res.json({
            status: "Error",
            message:err
        })
    }


}

module.exports = {newUser}