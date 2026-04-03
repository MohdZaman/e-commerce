import jwt from "jsonwebtoken";

const adminAuth = (req,res,next)=>{
    try {
        const {token} = req.headers
        if(!token){
            return res.status(402).json({success:false,message:"Unauthorized login try again"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(decoded !==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.status(402).json({success:false,message:"Unauthorized login try again"})
        }
        next();

    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

export default adminAuth