import jwt from 'jsonwebtoken'
export const authorisation = async(req,res,next)=>{
   try {
    
     const token = req.cookies.jwt;
     if(!token){
         return res.status(400).json({error:"No authorised User"});
     }
     const data = jwt.verify(token,process.env.JWT_SECRET_KEY);
     req.user_id = data.userId;

     
     next();
   } catch (error) {
    return res.status(400).json({error:error.message});
   }
}
