
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/secrete.js";
import { prisma } from "../config/prisma.js";
import { Role, User } from "@prisma/client";


const isAuthUser = async (req,res,next)=>{
   const token = req.headers.authorization;
   console.log(token);
   
   if(!token){
     return res.status(404).json({success: false,message: 'token not found',});;
   }
   try {
      const payload = await jwt.verify(token, SECRET);
      console.log(payload);
      
      const user =  await prisma.user.findUnique({
         where:{
            id:(payload).id
         }
      })
      console.log(user);
      
      if(!user){
         return res.status(404).json({success: false,message: 'user not found',});
      }
      req.user =user;
    
      next();
   } catch (error) {
    return res.status(403).json({success: false,message: 'invalide token',});
   }

}


export {isAuthUser};