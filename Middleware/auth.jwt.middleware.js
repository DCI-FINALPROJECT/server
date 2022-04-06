require('dotenv').config() 
const jwt = require("jsonwebtoken");

const auth = async (req,res,next)=>{

    try{

        const authFromLogin = await req.header("Authorization"); 
    
        console.log("GETTING auth:",authFromLogin);
    
        const gettingToken = authFromLogin.split(" ")[1];
    
        console.log("GETTING TOKEN:",gettingToken);

        const verifiedToken = jwt.verify(gettingToken, process.env.JWT_SECRET_KEY)
    
        console.log("Verified Token",verifiedToken);
    
        if(verifiedToken){
           return next();
        }

    }catch(err){
        res.send([]);
    }

}

module.exports = auth;


// OUR TOKEN IS READY TO USE. WE CAN USE IT OUR SECRET ROUTE. WE NEED THIS TO USE IN RELATED API ENDPOINT:
/* 
,{
    method: "GET",
    Accept: "application/json",
    headers: {
      Authorization: `Bearer ${localStorage.userToken}`,
    },
  }

 */