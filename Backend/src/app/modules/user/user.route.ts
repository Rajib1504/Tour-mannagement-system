import { NextFunction, Request, Response, Router } from "express";
import { UserControlers } from "./user.controller";
import { createUserZodSchema, createGoogleUserZodSchema } from './user.validation';
import { validateRequest } from "../../middlewares/validateRequest";
import AppError from "../../errorHelpers/AppError";
import jwt, { JwtPayload }  from 'jsonwebtoken';
import { Role } from "./user.interface";

const router = Router()

router.post('/register', validateRequest(createUserZodSchema), UserControlers.createUserWithCredentials);
router.post('/google-register', validateRequest(createGoogleUserZodSchema), UserControlers.createUserWithGoogle);
router.get('/all-users',(req:Request,res:Response,next:NextFunction)=>{
try {
      const accessToken = req.headers.authorization;
      if(!accessToken){
            throw new AppError(403,"No token recived","")
      }
      const varifiedToken = jwt.verify(accessToken,"secret");
      
      // console.log(varifiedToken);
      if((varifiedToken as JwtPayload).role !==Role.ADMIN){
           throw new AppError(403,'You are not permitted to view this route',"")
      }
      
      next() 
} catch (error) {
      next(error)
}
}, UserControlers.getAllUser)
export const UserRoutes = router; 