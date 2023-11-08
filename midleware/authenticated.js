const jwt =require('jsonwebtoken');
require('dotenv').config();
const con=require('../config/connection');
const authenticated=async(req,res,next)=>{
    const { authorization } =req.headers;
    if(!authorization)return res.status(401).json({error : "Authorization token required"});
    const token =authorization.split(' ')[1];
    try {
        const { id } = jwt.verify(token, process.env.secretKey);
        const [rows] = await con.promise().query('SELECT id FROM users WHERE id = ?', [id]);
        if (rows.length === 0) 
            return res.status(401).json({ error: "User not found" });
        req.user = rows[0];
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({error:"request is not authorized"})
    }
}//Bearer drj3nildifkalsdjflaskdjflkasdfj 
module.exports=authenticated;