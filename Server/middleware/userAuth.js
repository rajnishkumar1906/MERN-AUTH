import jwt from "jsonwebtoken";

const userAuth = async (req,res,next) =>{
    const {token} = req.cookies;

    if(!token){
        return res.json({success : false , message : 'Not Authoriszed. Login Again'})
    }

    try{
       const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
    
       if(tokenDecode.id)
       {
            res.body.userId = tokenDecode.id;
       }else
       {
            return res.json({success : false , message : 'Not authorized. Login Again'
            })
       }
       next()

    }catch(error)
    {
        res.json({success : false, message : error.message})
    }
}

export default userAuth;