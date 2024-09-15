import { NextFunction, Request, Response } from "express";
const errorHandler =(method)=> {
      return async (req,res,next)=>{
         try {
           await method(req,res,next);
         } catch (error) {
              console.log(error.message);
      
         }
      }
   
   }
export default errorHandler;